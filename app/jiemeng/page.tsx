"use client"

import { Cloud } from "lucide-react"

export default function JiemengPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
          <Cloud className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sky-400">解梦</h1>
          <p className="text-xs text-sky-200/60">周公解梦 · 梦境解析</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-sky-900/40 to-sky-950/60 rounded-xl p-4 border border-sky-800/30">
        <h2 className="text-sm font-bold text-sky-300 mb-3">常见梦境</h2>
        <div className="grid grid-cols-2 gap-2">
          {["梦见蛇", "梦见水", "梦见火", "梦见飞翔", "梦见坠落", "梦见牙齿脱落", "梦见棺材", "梦见考试"].map((item) => (
            <button key={item} className="bg-sky-800/30 rounded-lg p-2 text-xs text-sky-100/80 text-center">
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-sky-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}