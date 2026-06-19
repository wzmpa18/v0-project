export type RemoteResourceMode = 'bundled' | 'remote'

export interface RuntimeConfig {
  appName: string
  appId: string
  appShellUrl: string
  apiBaseUrl: string
  aiBaseUrl: string
  resourceBaseUrl: string
  duanziBatchApiPath: string
  remoteResourceMode: RemoteResourceMode
  offlineCachePrefix: string
  enableEncryptedResources: boolean
  apiAuthToken: string
  aiAuthToken: string
  apiTimeoutMs: number
  apiRetryTimes: number
  apiRateLimitPerMinute: number
}

interface RuntimeEndpointOverride {
  apiBaseUrl?: string
  resourceBaseUrl?: string
}

const DEFAULT_CONFIG: RuntimeConfig = {
  appName: '国学综合',
  appId: 'com.getcapacitor.myapp',
  appShellUrl: 'https://app.guoxueyun.com',
  apiBaseUrl: '',
  aiBaseUrl: '',
  resourceBaseUrl: '',
  duanziBatchApiPath: '/api/v1/duanzi/batch-generate',
  remoteResourceMode: 'remote',
  offlineCachePrefix: 'guoxue-cache',
  enableEncryptedResources: false,
  apiAuthToken: '',
  aiAuthToken: '',
  apiTimeoutMs: 12000,
  apiRetryTimes: 2,
  apiRateLimitPerMinute: 50,
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value || '', 10)
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback
  }

  return parsed
}

function getRuntimeEndpointOverride(): RuntimeEndpointOverride {
  if (typeof window === 'undefined') {
    return {}
  }

  return {
    apiBaseUrl: window.localStorage.getItem('RUNTIME_API_BASE_URL') || undefined,
    resourceBaseUrl: window.localStorage.getItem('RUNTIME_RESOURCE_BASE_URL') || undefined,
  }
}

export function getRuntimeConfig(): RuntimeConfig {
  const override = getRuntimeEndpointOverride()

  return {
    ...DEFAULT_CONFIG,
    appShellUrl: process.env.NEXT_PUBLIC_APP_SHELL_URL ?? DEFAULT_CONFIG.appShellUrl,
    apiBaseUrl: override.apiBaseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_CONFIG.apiBaseUrl,
    aiBaseUrl: process.env.NEXT_PUBLIC_AI_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_CONFIG.aiBaseUrl,
    resourceBaseUrl: override.resourceBaseUrl ?? process.env.NEXT_PUBLIC_RESOURCE_BASE_URL ?? DEFAULT_CONFIG.resourceBaseUrl,
    duanziBatchApiPath: process.env.NEXT_PUBLIC_DUANZI_BATCH_API_PATH ?? DEFAULT_CONFIG.duanziBatchApiPath,
    remoteResourceMode: (process.env.NEXT_PUBLIC_REMOTE_RESOURCE_MODE as RemoteResourceMode | undefined) ?? DEFAULT_CONFIG.remoteResourceMode,
    offlineCachePrefix: process.env.NEXT_PUBLIC_OFFLINE_CACHE_PREFIX ?? DEFAULT_CONFIG.offlineCachePrefix,
    enableEncryptedResources: process.env.NEXT_PUBLIC_ENABLE_ENCRYPTED_RESOURCES === 'true',
    apiAuthToken: process.env.NEXT_PUBLIC_API_AUTH_TOKEN ?? DEFAULT_CONFIG.apiAuthToken,
    aiAuthToken: process.env.NEXT_PUBLIC_AI_AUTH_TOKEN ?? DEFAULT_CONFIG.aiAuthToken,
    apiTimeoutMs: parsePositiveInt(process.env.NEXT_PUBLIC_API_TIMEOUT_MS, DEFAULT_CONFIG.apiTimeoutMs),
    apiRetryTimes: parsePositiveInt(process.env.NEXT_PUBLIC_API_RETRY_TIMES, DEFAULT_CONFIG.apiRetryTimes),
    apiRateLimitPerMinute: parsePositiveInt(process.env.NEXT_PUBLIC_API_RATE_LIMIT_PER_MINUTE, DEFAULT_CONFIG.apiRateLimitPerMinute),
  }
}

export function setRuntimeEndpointOverride(override: RuntimeEndpointOverride): void {
  if (typeof window === 'undefined') {
    return
  }

  if (override.apiBaseUrl === undefined) {
    window.localStorage.removeItem('RUNTIME_API_BASE_URL')
  } else {
    window.localStorage.setItem('RUNTIME_API_BASE_URL', override.apiBaseUrl)
  }

  if (override.resourceBaseUrl === undefined) {
    window.localStorage.removeItem('RUNTIME_RESOURCE_BASE_URL')
  } else {
    window.localStorage.setItem('RUNTIME_RESOURCE_BASE_URL', override.resourceBaseUrl)
  }
}

export function buildResourceUrl(path: string): string {
  const config = getRuntimeConfig()
  const cleanedPath = path.replace(/^\/+/, '')

  if (!config.resourceBaseUrl) {
    return `/${cleanedPath}`
  }

  return `${config.resourceBaseUrl.replace(/\/+$/, '')}/${cleanedPath}`
}

export function buildApiUrl(path: string): string {
  const config = getRuntimeConfig()
  const cleanedPath = path.replace(/^\/+/, '')

  if (!config.apiBaseUrl) {
    return `/${cleanedPath}`
  }

  return `${config.apiBaseUrl.replace(/\/+$/, '')}/${cleanedPath}`
}
