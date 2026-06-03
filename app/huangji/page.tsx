"use client"

import { Mountain } from "lucide-react"

export default function HuangjiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
          <Mountain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sky-400">皇极经世</h1>
          <p className="text-xs text-sky-200/60">宇宙规律 · 邵雍巨著</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-sky-900/40 to-sky-950/60 rounded-xl p-4 border border-sky-800/30">
        <h2 className="text-sm font-bold text-sky-300 mb-3">皇极经世简介</h2>
        <p className="text-xs text-sky-100/80 leading-relaxed">
          《皇极经世》是北宋邵雍的代表作，是一部探讨宇宙起源、演化规律的巨著。
          它以"元会运世"为框架，构建了一个宏大的宇宙历史观。
        </p>
      </div>

      <div className="mt-4 text-center text-xs text-sky-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}