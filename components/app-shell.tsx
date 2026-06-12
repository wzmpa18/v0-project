"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  // Determine active tab from current path
  const getActiveTabFromPath = (path: string): string => {
    if (path === "/") return "home"
    if (path.startsWith("/tcm-study") || path.startsWith("/study")) return "study"
    if (path.startsWith("/ai")) return "ai"
    if (path.startsWith("/shop")) return "shop"
    if (path.startsWith("/profile")) return "profile"
    return "home"
  }

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath(pathname))

  // Sync activeTab with route changes
  useEffect(() => {
    setActiveTab(getActiveTabFromPath(pathname))
  }, [pathname])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
    switch (tab) {
      case "home":
        router.push("/")
        break
      case "study":
        // 学习 tab shows dropdown in BottomNav, no navigation needed
        break
      case "ai":
        router.push("/ai-analysis")
        break
      case "shop":
        // 商城 tab shows dropdown in BottomNav, no navigation needed
        break
      case "profile":
        router.push("/profile")
        break
    }
  }, [router])

  const handleNavigateToYiXue = useCallback(() => {
    setActiveTab("home")
    router.push("/yi-xue")
  }, [router])

  const handleNavigateToHerbal = useCallback(() => {
    setActiveTab("home")
    router.push("/herbal")
  }, [router])

  return (
    <div className="min-h-screen bg-[#1a1410] relative overflow-hidden">
      <div className="pb-20">
        {children}
      </div>
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onNavigateToYiXue={handleNavigateToYiXue}
        onNavigateToHerbal={handleNavigateToHerbal}
      />
    </div>
  )
}