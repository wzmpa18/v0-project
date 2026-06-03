"use client"

import { Target } from "lucide-react"

export default function TiebanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-rose-400">铁板神数</h1>
          <p className="text-xs text-rose-200/60">宿命通 · 精准推算</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30">
        <h2 className="text-sm font-bold text-rose-300 mb-3">铁板神数简介</h2>
        <p className="text-xs text-rose-100/80 leading-relaxed">
          铁板神数是一种极为高深的算命术，相传由北宋邵雍所创。
          它通过复杂的数理推算，可以精准地预测一个人一生的命运轨迹。
        </p>
      </div>

      <div className="mt-4 text-center text-xs text-rose-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}