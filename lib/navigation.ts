"use client"

/**
 * 国学传承 - 导航工具
 * 在 Capacitor WebView 和浏览器中都能正常工作的导航
 */

function getBasePath(): string {
  if (typeof window === 'undefined') return ''
  const pathname = window.location.pathname
  if (pathname.startsWith('/app/') || pathname === '/app') return '/app'
  return ''
}

function resolvePath(path: string): string {
  const basePath = getBasePath()
  const normalizedPath = path.startsWith('/') ? path : '/' + path
  
  // 如果是完整URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  return basePath + normalizedPath
}

export function navigateTo(path: string): void {
  const fullPath = resolvePath(path)
  
  // 检查是否在 Capacitor WebView 中
  const isCapacitor = typeof window !== 'undefined' && (window as any).Capacitor
  
  try {
    if (isCapacitor) {
      // 在 Capacitor 中，直接使用 location.replace 更可靠
      window.location.replace(fullPath)
      return
    }
  } catch (e) {
    console.warn('Capacitor navigation failed:', e)
  }

  try {
    // 策略1: 使用 location.replace 直接替换，不保留历史记录
    if (typeof window !== 'undefined' && window.location) {
      window.location.replace(fullPath)
      return
    }
  } catch (e) {
    console.warn('location.replace failed:', e)
  }

  try {
    // 策略2: history.replaceState + 刷新
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState({}, '', fullPath)
      window.location.reload()
      return
    }
  } catch (e) {
    console.warn('history.replaceState failed:', e)
  }

  try {
    // 策略3: 直接设置 href
    if (typeof window !== 'undefined' && window.location) {
      window.location.href = fullPath
      return
    }
  } catch (e) {
    console.warn('location.href failed:', e)
  }

  console.error('All navigation methods failed for:', fullPath)
}

export function getCurrentPath(): string {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname || '/'
}

export function openExternal(url: string): void {
  if (typeof window === 'undefined') return
  window.open(url, '_blank')
}
