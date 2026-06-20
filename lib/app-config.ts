export type RemoteResourceMode = 'bundled' | 'remote'

export interface RuntimeConfig {
  appName: string
  appId: string
  apiBaseUrl: string
  resourceBaseUrl: string
  remoteResourceMode: RemoteResourceMode
  offlineCachePrefix: string
  enableEncryptedResources: boolean
}

interface RuntimeEndpointOverride {
  apiBaseUrl?: string
  resourceBaseUrl?: string
}

const DEFAULT_CONFIG: RuntimeConfig = {
  appName: '国学综合',
  appId: 'com.getcapacitor.myapp',
  apiBaseUrl: 'https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com',
  resourceBaseUrl: 'https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com',
  remoteResourceMode: 'remote',
  offlineCachePrefix: 'guoxue-cache',
  enableEncryptedResources: false,
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
    apiBaseUrl: override.apiBaseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_CONFIG.apiBaseUrl,
    resourceBaseUrl: override.resourceBaseUrl ?? process.env.NEXT_PUBLIC_RESOURCE_BASE_URL ?? DEFAULT_CONFIG.resourceBaseUrl,
    remoteResourceMode: (process.env.NEXT_PUBLIC_REMOTE_RESOURCE_MODE as RemoteResourceMode | undefined) ?? DEFAULT_CONFIG.remoteResourceMode,
    offlineCachePrefix: process.env.NEXT_PUBLIC_OFFLINE_CACHE_PREFIX ?? DEFAULT_CONFIG.offlineCachePrefix,
    enableEncryptedResources: process.env.NEXT_PUBLIC_ENABLE_ENCRYPTED_RESOURCES === 'true',
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
