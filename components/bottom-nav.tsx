"use client"

import { useState } from "react"
import { Home, BookOpen, User, ShoppingBag, Sparkles, Leaf } from "lucide-react"

interface BottomNavProps {
  activeTab: string
}

const tabs = [
  { id: "home", label: "首页", icon: Home, href: "/" },
  { id: "ai", label: "AI", icon: Sparkles, href: "/ai-analysis" },
  { id: "profile", label: "我的", icon: User, href: "/profile" },
]

export function BottomNav({ activeTab }: BottomNavProps) {
  const [showDropdown, setShowDropdown] = useState<"study" | "shop" | null>(null)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-b from-[#1a1410] to-[#241c16] border-t border-amber-800/30 pb-safe">
      {showDropdown && (
        <div className="absolute bottom-16 left-0 right-0 bg-gradient-to-b from-[#241c16] to-[#1a1410] border-t border-amber-800/30 py-4">
          <div className="flex items-center justify-around max-w-lg mx-auto px-4">
            <a
              href="/yi-xue"
              className="flex flex-col items-center gap-2 bg-amber-800/30 px-6 py-3 rounded-xl border border-amber-700/30 active:bg-amber-800/50 transition-all"
              onClick={() => setShowDropdown(null)}
            >
              <BookOpen className="w-6 h-6 text-amber-400" />
              <span className="text-sm font-medium text-amber-200">易学</span>
            </a>
            <a
              href="/herbal"
              className="flex flex-col items-center gap-2 bg-emerald-800/30 px-6 py-3 rounded-xl border border-emerald-700/30 active:bg-emerald-800/50 transition-all"
              onClick={() => setShowDropdown(null)}
            >
              <Leaf className="w-6 h-6 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-200">中医</span>
            </a>
          </div>
        </div>
      )}

      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <a
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-300 relative group ${
                isActive ? "text-amber-400" : "text-gray-400"
              }`}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 mb-1 transition-all duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={`text-xs transition-all duration-300 ${
                isActive ? "font-medium" : "font-normal"
              }`}>
                {tab.label}
              </span>
            </a>
          )
        })}

        <button
          onClick={() => setShowDropdown(showDropdown === "study" ? null : "study")}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-300 relative group ${
            showDropdown === "study" ? "text-amber-400" : "text-gray-400"
          }`}
          aria-label="学习"
        >
          <BookOpen className="w-6 h-6 mb-1" />
          <span className="text-xs">学习</span>
        </button>

        <button
          onClick={() => setShowDropdown(showDropdown === "shop" ? null : "shop")}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-300 relative group ${
            showDropdown === "shop" ? "text-amber-400" : "text-gray-400"
          }`}
          aria-label="商城"
        >
          <ShoppingBag className="w-6 h-6 mb-1" />
          <span className="text-xs">商城</span>
        </button>
      </div>
    </nav>
  )
}