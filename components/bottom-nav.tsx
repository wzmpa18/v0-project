"use client"

import { Compass, BookOpen, User, Stethoscope, Sparkles } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  {
    id: "paipan",
    label: "排盘",
    icon: Compass,
  },
  {
    id: "tcm",
    label: "中医",
    icon: Stethoscope,
  },
  {
    id: "herbal",
    label: "经方",
    icon: BookOpen,
  },
  {
    id: "ai",
    label: "AI",
    icon: Sparkles,
  },
  {
    id: "profile",
    label: "我的",
    icon: User,
  },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-[#3a3a3a] pb-safe">
      {/* 顶部金色装饰线 */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
      
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-300 relative group ${
                isActive ? "text-[#d4af37]" : "text-[#a0a0a0]"
              }`}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              {/* 激活状态下的背景光晕 */}
              {isActive && (
                <div className="absolute inset-x-2 top-1 bottom-1 bg-[#d4af37]/10 rounded-lg" />
              )}
              
              <div className="relative">
                <Icon 
                  className={`w-5 h-5 mb-1 transition-all duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {/* 激活指示点 */}
                {isActive && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#c8102e] rounded-full" />
                )}
              </div>
              
              <span className={`text-xs transition-all duration-300 ${
                isActive ? "font-medium" : "font-normal"
              }`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
