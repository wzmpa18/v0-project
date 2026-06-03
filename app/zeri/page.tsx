"use client"

import { Calendar } from "lucide-react"

export default function ZeriPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-amber-400">择日</h1>
          <p className="text-xs text-amber-200/60">黄道吉日 · 趋吉避凶</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30">
        <h2 className="text-sm font-bold text-amber-300 mb-3">择日事项</h2>
        <div className="grid grid-cols-2 gap-2">
          {["婚嫁", "开业", "搬家", "动土", "出行", "祭祀", "安葬", "纳财"].map((item) => (
            <button key={item} className="bg-amber-800/30 rounded-lg p-2 text-xs text-amber-100/80 text-center">
              择{item}吉日
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-amber-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}