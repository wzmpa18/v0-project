"use client"

import { Eye } from "lucide-react"

export default function XiangmianPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center">
          <Eye className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-rose-400">面相学</h1>
          <p className="text-xs text-rose-200/60">观相识人 · 洞察命运</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30">
        <h2 className="text-sm font-bold text-rose-300 mb-3">功能介绍</h2>
        <p className="text-xs text-rose-100/80 leading-relaxed">
          面相学是通过观察人的面部特征来推断其性格、命运和健康状况的传统学问。
          包括五官分析、十二宫位解读、气色判断等内容。
        </p>
      </div>

      <div className="mt-4 bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30">
        <h2 className="text-sm font-bold text-rose-300 mb-3">面相十二宫</h2>
        <div className="grid grid-cols-3 gap-2">
          {["命宫", "财帛宫", "兄弟宫", "田宅宫", "子女宫", "奴仆宫", "妻妾宫", "疾厄宫", "迁移宫", "官禄宫", "福德宫", "父母宫"].map((item) => (
            <div key={item} className="bg-rose-800/30 rounded-lg p-2 text-xs text-rose-100/80 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-rose-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}