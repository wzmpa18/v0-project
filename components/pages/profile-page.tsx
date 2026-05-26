"use client"

import { User } from "lucide-react"

export function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 text-center">
      {/* 装饰背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-[#d4af37]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-36 h-36 bg-[#c8102e]/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative">
        {/* 图标容器 */}
        <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#d4af37]/30 flex items-center justify-center shadow-lg shadow-[#d4af37]/10">
          <User className="w-10 h-10 text-[#d4af37]" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-2xl font-semibold text-[#f5f5f7] mb-3 tracking-wider">
          我的
        </h1>
        
        <p className="text-[#a0a0a0] text-sm leading-relaxed max-w-xs">
          个人中心与应用设置
          <br />
          定制专属国学之旅
        </p>
        
        {/* 装饰线 */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/50" />
          <div className="w-2 h-2 rotate-45 border border-[#d4af37]/50" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/50" />
        </div>
      </div>
    </div>
  )
}
