"use client"

import { TreePine } from "lucide-react"

export default function SanyuanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
          <TreePine className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-green-400">三元风水</h1>
          <p className="text-xs text-green-200/60">时空风水 · 三元九运</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-4 border border-green-800/30">
        <h2 className="text-sm font-bold text-green-300 mb-3">三元九运</h2>
        <div className="grid grid-cols-3 gap-2">
          {["一白贪狼", "二黑巨门", "三碧禄存", "四绿文曲", "五黄廉贞", "六白武曲", "七赤破军", "八白左辅", "九紫右弼"].map((item) => (
            <div key={item} className="bg-green-800/30 rounded-lg p-2 text-xs text-green-100/80 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-green-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}