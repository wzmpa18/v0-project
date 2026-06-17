"use client"

/**
 * 国学传承 - 导航工具
 * 在 Capacitor WebView 和浏览器中都能正常工作的导航
 * 使用多种回退策略确保导航可靠
 */

export function navigateTo(path: string): void {
  try {
    // 策略1: 直接设置 location.href
    if (typeof window !== 'undefined' && window.location) {
      window.location.href = path
      return
    }
  } catch (e) {
    // 继续尝试其他方法
  }

  try {
    // 策略2: document.location
    if (typeof document !== 'undefined' && document.location) {
      document.location.href = path
      return
    }
  } catch (e) {
    // 继续尝试
  }

  try {
    // 策略3: location.assign
    if (typeof location !== 'undefined') {
      location.assign(path)
      return
    }
  } catch (e) {
    // 继续尝试
  }

  try {
    // 策略4: window.open (self)
    if (typeof window !== 'undefined') {
      window.open(path, '_self')
      return
    }
  } catch (e) {
    console.error('All navigation methods failed:', e)
  }
}

// 获取当前路径
export function getCurrentPath(): string {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname || '/'
}

// 打开外部链接
export function openExternal(url: string): void {
  if (typeof window === 'undefined') return
  window.open(url, '_blank')
}