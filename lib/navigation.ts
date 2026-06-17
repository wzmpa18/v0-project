"use client"

/**
 * 国学传承 - 导航工具
 * 在 Capacitor WebView 和浏览器中都能正常工作的导航
 */

// 获取当前路径
export function getCurrentPath(): string {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname || '/'
}

// 导航到指定页面
export function navigateTo(path: string): void {
  if (typeof window === 'undefined') return
  window.location.href = path
}

// 打开外部链接
export function openExternal(url: string): void {
  if (typeof window === 'undefined') return
  window.open(url, '_blank')
}