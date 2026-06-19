"use client"

/**
 * 国学传承 - 导航工具
 * 在 Capacitor WebView 和浏览器中都能正常工作的导航
 */

function isCapacitor(): boolean {
  if (typeof window === 'undefined') return false
  // Capacitor 8.x 的检测方式
  return !!(window as any).Capacitor && (window as any).Capacitor.isNative !== undefined
    ? (window as any).Capacitor.isNative
    : !!(window as any).Capacitor
}

function resolvePath(path: string): string {
  // 如果是完整URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // 标准化路径
  const normalizedPath = path.startsWith('/') ? path : '/' + path
  
  // 在 Capacitor 中，不需要 basePath
  if (isCapacitor()) {
    return normalizedPath
  }
  
  // Web 版本也不需要 basePath（已移除 basePath 配置）
  return normalizedPath
}

export function navigateTo(path: string): void {
  const fullPath = resolvePath(path)
  
  console.log('[Navigation] Navigating to:', fullPath, 'isCapacitor:', isCapacitor())
  
  try {
    // 使用 location.assign 进行导航，这在 Capacitor WebView 中最可靠
    if (typeof window !== 'undefined' && window.location) {
      window.location.assign(fullPath)
      return
    }
  } catch (e) {
    console.warn('[Navigation] location.assign failed:', e)
  }

  try {
    // 备用方案: location.href
    if (typeof window !== 'undefined' && window.location) {
      window.location.href = fullPath
      return
    }
  } catch (e) {
    console.warn('[Navigation] location.href failed:', e)
  }

  console.error('[Navigation] All navigation methods failed for:', fullPath)
}

export function getCurrentPath(): string {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname || '/'
}

export function openExternal(url: string): void {
  if (typeof window === 'undefined') return
  window.open(url, '_blank')
}
