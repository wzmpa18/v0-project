"use client"

import { useState, useEffect } from "react"
import { BottomNav } from "@/components/bottom-nav"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState("/")

  useEffect(() => {
    // 在客户端获取当前路径，避免 usePathname 在静态导出中返回 null
    setPathname(window.location.pathname || "/")

    // 监听 popstate 事件，支持浏览器前进/后退
    const handlePopState = () => {
      setPathname(window.location.pathname || "/")
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const getActiveTabFromPath = (path: string): string => {
    // 移除 basePath 前缀（如 /app）以获取实际路由
    const normalizedPath = path.replace(/^\/app/, '') || '/'
    if (normalizedPath === "/") return "home"
    if (normalizedPath.startsWith("/ai")) return "ai"
    if (normalizedPath.startsWith("/profile")) return "profile"
    return "home"
  }

  return (
    <div className="min-h-screen bg-[#1a1410] relative overflow-hidden">
      <div className="pb-20">
        {children}
      </div>
      <BottomNav activeTab={getActiveTabFromPath(pathname)} />
    </div>
  )
}