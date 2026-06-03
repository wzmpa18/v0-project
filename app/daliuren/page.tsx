"use client"

import { Swords } from "lucide-react"

export default function DaliurenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
          <Swords className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-red-400">六壬神课</h1>
          <p className="text-xs text-red-200/60">大六壬 · 高级预测</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-4 border border-red-800/30">
        <h2 className="text-sm font-bold text-red-300 mb-3">六壬简介</h2>
        <p className="text-xs text-red-100/80 leading-relaxed">
          大六壬是中国古代最高层次的预测学之一，被誉为"三式之首"。
          它以天地人三才之道为理论基础，通过复杂的演算来预测事物的发展趋势。
        </p>
      </div>

      <div className="mt-4 bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-4 border border-red-800/30">
        <h2 className="text-sm font-bold text-red-300 mb-3">六壬要素</h2>
        <div className="grid grid-cols-2 gap-2">
          {["天盘", "地盘", "四课", "三传", "天将", "贵神", "遁干", "寄宫"].map((item) => (
            <div key={item} className="bg-red-800/30 rounded-lg p-2 text-xs text-red-100/80 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-red-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}