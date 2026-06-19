"use client"

import { WifiOff } from "lucide-react"

export function OfflineBanner() {
  return (
    <div className="mx-4 mt-3 rounded-xl border border-[#d4af37]/20 bg-[#2a2a2a]/90 px-4 py-3 text-sm text-[#f5f5f7] shadow-lg backdrop-blur">
      <div className="flex items-start gap-3">
        <WifiOff className="mt-0.5 h-4 w-4 text-[#d4af37]" />
        <div>
          <div className="font-medium text-[#d4af37]">离线模式已启用</div>
          <div className="mt-1 text-xs leading-relaxed text-[#a0a0a0]">
            当前内容优先使用本地离线数据。若配置远端资源地址，页面会自动切换到远端加载并保留本地兜底。
          </div>
        </div>
      </div>
    </div>
  )
}
