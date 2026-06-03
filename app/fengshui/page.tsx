"use client"

import { Wind } from "lucide-react"

export default function FengshuiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
          <Wind className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-cyan-400">风水堪舆</h1>
          <p className="text-xs text-cyan-200/60">环境调理 · 气场优化</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-4 border border-cyan-800/30">
        <h2 className="text-sm font-bold text-cyan-300 mb-3">风水流派</h2>
        <div className="grid grid-cols-2 gap-2">
          {["形势派", "理气派", "玄空派", "八宅派", "杨公派", "三元派", "三合派", "金锁玉关"].map((item) => (
            <div key={item} className="bg-cyan-800/30 rounded-lg p-2 text-xs text-cyan-100/80 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-cyan-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}
