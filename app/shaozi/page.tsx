"use client"

import { Brain } from "lucide-react"

export default function ShaoziPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-lime-700 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-lime-400">邵子神数</h1>
          <p className="text-xs text-lime-200/60">邵雍真传 · 皇极数</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-lime-900/40 to-lime-950/60 rounded-xl p-4 border border-lime-800/30">
        <h2 className="text-sm font-bold text-lime-300 mb-3">邵子神数简介</h2>
        <p className="text-xs text-lime-100/80 leading-relaxed">
          邵子神数又称皇极神数，是北宋邵雍所创的一种高层次预测学。
          它以《皇极经世》为理论基础，结合易经数理，推算人的命运。
        </p>
      </div>

      <div className="mt-4 text-center text-xs text-lime-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}