export function createCacheKey(prefix: string, scope: string): string {
  return `${prefix}:${scope}`
}

export function saveCacheValue(key: string, value: unknown): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export function readCacheValue<T>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null
  }

  const rawValue = window.localStorage.getItem(key)
  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as T
  } catch {
    return null
  }
}
