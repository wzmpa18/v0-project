"use client"

import { Gift } from "lucide-react"

export default function QimenzejiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
          <Gift className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-red-400">奇门择吉</h1>
          <p className="text-xs text-red-200/60">最佳时机 · 趋吉避凶</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-4 border border-red-800/30">
        <h2 className="text-sm font-bold text-red-300 mb-3">择吉事项</h2>
        <div className="grid grid-cols-2 gap-2">
          {["开业", "婚嫁", "出行", "动土", "搬家", "祭祀", "考试", "签约"].map((item) => (
            <button key={item} className="bg-red-800/30 rounded-lg p-2 text-xs text-red-100/80 text-center">
              {item}择吉
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-red-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}