"use client"

import { Scroll } from "lucide-react"

export default function FuzhouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
          <Scroll className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-purple-400">符咒</h1>
          <p className="text-xs text-purple-200/60">灵符秘法 · 道法自然</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30">
        <h2 className="text-sm font-bold text-purple-300 mb-3">符咒分类</h2>
        <div className="grid grid-cols-2 gap-2">
          {["平安符", "招财符", "姻缘符", "健康符", "事业符", "学业符", "镇宅符", "化煞符"].map((item) => (
            <div key={item} className="bg-purple-800/30 rounded-lg p-2 text-xs text-purple-100/80 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-purple-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}