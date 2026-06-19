import { getRuntimeConfig } from '@/lib/app-config'

interface FetchPolicy {
  timeoutMs?: number
  retryTimes?: number
  retryDelayMs?: number
  rateLimitPerMinute?: number
  authToken?: string
  authHeaderName?: string
  scope?: string
}

interface FetchJsonOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
  policy?: FetchPolicy
  signal?: AbortSignal
}

type RateLimiterState = {
  minuteStamp: number
  count: number
}

const RATE_LIMITER = new Map<string, RateLimiterState>()

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function ensureRateLimit(scope: string, limitPerMinute: number): void {
  if (limitPerMinute <= 0) {
    return
  }

  const minuteStamp = Math.floor(Date.now() / 60000)
  const current = RATE_LIMITER.get(scope)

  if (!current || current.minuteStamp !== minuteStamp) {
    RATE_LIMITER.set(scope, { minuteStamp, count: 1 })
    return
  }

  if (current.count >= limitPerMinute) {
    throw new Error('请求过于频繁，请稍后再试')
  }

  current.count += 1
}

function buildHeaders(token: string, authHeaderName: string, customHeaders?: Record<string, string>): Headers {
  const headers = new Headers(customHeaders)
  headers.set('Content-Type', 'application/json')

  if (token) {
    headers.set(authHeaderName, `Bearer ${token}`)
  }

  return headers
}

function mergeAbortSignals(externalSignal?: AbortSignal): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController()

  if (!externalSignal) {
    return { signal: controller.signal, cleanup: () => undefined }
  }

  if (externalSignal.aborted) {
    controller.abort(externalSignal.reason)
    return { signal: controller.signal, cleanup: () => undefined }
  }

  const onAbort = () => controller.abort(externalSignal.reason)
  externalSignal.addEventListener('abort', onAbort)

  return {
    signal: controller.signal,
    cleanup: () => externalSignal.removeEventListener('abort', onAbort),
  }
}

export async function fetchJsonWithResilience<T>(url: string, options: FetchJsonOptions = {}): Promise<T> {
  const runtimeConfig = getRuntimeConfig()
  const policy = options.policy || {}
  const timeoutMs = policy.timeoutMs ?? runtimeConfig.apiTimeoutMs
  const retryTimes = policy.retryTimes ?? runtimeConfig.apiRetryTimes
  const retryDelayMs = policy.retryDelayMs ?? 600
  const rateLimitPerMinute = policy.rateLimitPerMinute ?? runtimeConfig.apiRateLimitPerMinute
  const authToken = policy.authToken ?? runtimeConfig.apiAuthToken
  const authHeaderName = policy.authHeaderName ?? 'Authorization'
  const scope = policy.scope ?? url

  ensureRateLimit(scope, rateLimitPerMinute)

  let lastError: unknown

  for (let attempt = 0; attempt <= retryTimes; attempt += 1) {
    const { signal, cleanup } = mergeAbortSignals(options.signal)
    const timeoutId = setTimeout(() => {
      if (!signal.aborted) {
        try {
          ;(signal as AbortSignal & { throwIfAborted?: () => void }).throwIfAborted?.()
        } catch {
          // noop
        }
      }
    }, timeoutMs)

    const timeoutController = new AbortController()
    const timeoutAbort = setTimeout(() => timeoutController.abort('timeout'), timeoutMs)

    const linkedController = new AbortController()
    const forwardAbort = () => linkedController.abort(signal.reason)
    const forwardTimeoutAbort = () => linkedController.abort(timeoutController.signal.reason)

    signal.addEventListener('abort', forwardAbort)
    timeoutController.signal.addEventListener('abort', forwardTimeoutAbort)

    try {
      const response = await fetch(url, {
        method: options.method ?? 'GET',
        headers: buildHeaders(authToken, authHeaderName, options.headers),
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: linkedController.signal,
      })

      if (response.status === 401 || response.status === 403) {
        throw new Error('鉴权失败，请检查 Token 配置')
      }

      if (response.status === 429) {
        throw new Error('请求限流，请稍后重试')
      }

      if (!response.ok) {
        throw new Error(`请求失败(${response.status})`)
      }

      return (await response.json()) as T
    } catch (error) {
      lastError = error
      if (attempt >= retryTimes) {
        break
      }
      await wait(retryDelayMs * (attempt + 1))
    } finally {
      clearTimeout(timeoutId)
      clearTimeout(timeoutAbort)
      signal.removeEventListener('abort', forwardAbort)
      timeoutController.signal.removeEventListener('abort', forwardTimeoutAbort)
      cleanup()
    }
  }

  throw lastError instanceof Error ? lastError : new Error('请求失败')
}
