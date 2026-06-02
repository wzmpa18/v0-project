"use client"

import { Home, BookOpen, User, ShoppingBag, GraduationCap } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  {
    id: "home",
    label: "首页",
    icon: Home,
  },
  {
    id: "class",
    label: "课堂",
    icon: GraduationCap,
  },
  {
    id: "books",
    label: "书籍",
    icon: BookOpen,
  },
  {
    id: "shop",
    label: "商城",
    icon: ShoppingBag,
  },
  {
    id: "profile",
    label: "我的",
    icon: User,
  },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-300 relative group ${
                isActive ? "text-[#0891b2]" : "text-gray-500"
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
            </button>
          )
        })}
      </div>
    </nav>
  )
}
