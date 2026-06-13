"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const getActiveTabFromPath = (path: string): string => {
    if (path === "/") return "home"
    if (path.startsWith("/ai")) return "ai"
    if (path.startsWith("/profile")) return "profile"
    return "home"
  }

  const activeTab = getActiveTabFromPath(pathname)

  return (
    <div className="min-h-screen bg-[#1a1410] relative overflow-hidden">
      <div className="pb-20">
        {children}
      </div>
      <BottomNav activeTab={activeTab} />
    </div>
  )
}