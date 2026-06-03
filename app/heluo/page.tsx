"use client"

import { Waves } from "lucide-react"

export default function HeluoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
          <Waves className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-teal-400">河洛理数</h1>
          <p className="text-xs text-teal-200/60">天地数理 · 河图洛书</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-teal-900/40 to-teal-950/60 rounded-xl p-4 border border-teal-800/30">
        <h2 className="text-sm font-bold text-teal-300 mb-3">河图洛书</h2>
        <p className="text-xs text-teal-100/80 leading-relaxed">
          河图洛书是中国古代流传下来的两幅神秘图案，蕴含着宇宙数理的奥秘。
          河图为体，洛书为用，二者共同构成了中国传统文化的数理基础。
        </p>
      </div>

      <div className="mt-4 text-center text-xs text-teal-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}