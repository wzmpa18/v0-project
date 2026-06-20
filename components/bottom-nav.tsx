"use client"

import { useState } from "react"
import { Home, BookOpen, User, ShoppingBag, Sparkles, Leaf, Heart, Star } from "lucide-react"
import { navigateTo } from "@/lib/navigation"

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

  const handleDropdownClick = (dropdown: "study" | "shop") => {
    if (showDropdown === dropdown) {
      setShowDropdown(null)
    } else {
      setShowDropdown(dropdown)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-b from-[#1a1410] to-[#241c16] border-t border-amber-800/30 pb-safe">
      {/* 学习下拉菜单 */}
      {showDropdown === "study" && (
        <div className="absolute bottom-16 left-0 right-0 bg-gradient-to-b from-[#241c16] to-[#1a1410] border-t border-amber-800/30 py-4">
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto px-4">
            <button
              onClick={() => { setShowDropdown(null); navigateTo("/yi-xue") }}
              className="flex flex-col items-center gap-2 bg-amber-800/30 px-4 py-4 rounded-xl border border-amber-700/30 active:scale-95 transition-all"
            >
              <BookOpen className="w-7 h-7 text-amber-400" />
              <span className="text-sm font-medium text-amber-200">易学</span>
            </button>
            <button
              onClick={() => { setShowDropdown(null); navigateTo("/herbal") }}
              className="flex flex-col items-center gap-2 bg-emerald-800/30 px-4 py-4 rounded-xl border border-emerald-700/30 active:scale-95 transition-all"
            >
              <Leaf className="w-7 h-7 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-200">中医</span>
            </button>
            <button
              onClick={() => { setShowDropdown(null); navigateTo("/study") }}
              className="flex flex-col items-center gap-2 bg-rose-800/30 px-4 py-4 rounded-xl border border-rose-700/30 active:scale-95 transition-all"
            >
              <Star className="w-7 h-7 text-rose-400" />
              <span className="text-sm font-medium text-rose-200">讲堂</span>
            </button>
            <button
              onClick={() => { setShowDropdown(null); navigateTo("/classics") }}
              className="flex flex-col items-center gap-2 bg-purple-800/30 px-4 py-4 rounded-xl border border-purple-700/30 active:scale-95 transition-all"
            >
              <BookOpen className="w-7 h-7 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">古籍</span>
            </button>
            <button
              onClick={() => { setShowDropdown(null); navigateTo("/meridian") }}
              className="flex flex-col items-center gap-2 bg-cyan-800/30 px-4 py-4 rounded-xl border border-cyan-700/30 active:scale-95 transition-all"
            >
              <Sparkles className="w-7 h-7 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-200">经络</span>
            </button>
            <button
              onClick={() => { setShowDropdown(null); navigateTo("/tcm") }}
              className="flex flex-col items-center gap-2 bg-teal-800/30 px-4 py-4 rounded-xl border border-teal-700/30 active:scale-95 transition-all"
            >
              <Heart className="w-7 h-7 text-teal-400" />
              <span className="text-sm font-medium text-teal-200">养生</span>
            </button>
          </div>
        </div>
      )}

      {/* 商城下拉菜单 */}
      {showDropdown === "shop" && (
        <div className="absolute bottom-16 left-0 right-0 bg-gradient-to-b from-[#241c16] to-[#1a1410] border-t border-amber-800/30 py-4">
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto px-4">
            <button
              onClick={() => { setShowDropdown(null); navigateTo("/zaixian") }}
              className="flex flex-col items-center gap-2 bg-orange-800/30 px-4 py-4 rounded-xl border border-orange-700/30 active:scale-95 transition-all"
            >
              <Sparkles className="w-7 h-7 text-orange-400" />
              <span className="text-sm font-medium text-orange-200">在线咨询</span>
            </button>
            <button
              onClick={() => { setShowDropdown(null); navigateTo("/hehuoren") }}
              className="flex flex-col items-center gap-2 bg-yellow-800/30 px-4 py-4 rounded-xl border border-yellow-700/30 active:scale-95 transition-all"
            >
              <User className="w-7 h-7 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-200">合伙人</span>
            </button>
            <button
              onClick={() => { setShowDropdown(null); navigateTo("/shoujihao") }}
              className="flex flex-col items-center gap-2 bg-blue-800/30 px-4 py-4 rounded-xl border border-blue-700/30 active:scale-95 transition-all"
            >
              <BookOpen className="w-7 h-7 text-blue-400" />
              <span className="text-sm font-medium text-blue-200">号码分析</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.href)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-300 relative group ${
                isActive ? "text-amber-400" : "text-gray-400"
              }`}
              aria-label={tab.label}
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

        <button
          onClick={() => handleDropdownClick("study")}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-300 relative group ${
            showDropdown === "study" ? "text-amber-400" : "text-gray-400"
          }`}
          aria-label="学习"
        >
          <BookOpen className="w-6 h-6 mb-1" />
          <span className="text-xs">学习</span>
        </button>

        <button
          onClick={() => handleDropdownClick("shop")}
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