"use client"

import { Droplets } from "lucide-react"

export default function ZiwuliuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-lime-700 flex items-center justify-center">
          <Droplets className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-lime-400">子午流注</h1>
          <p className="text-xs text-lime-200/60">针灸时辰 · 经络气血</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-lime-900/40 to-lime-950/60 rounded-xl p-4 border border-lime-800/30">
        <h2 className="text-sm font-bold text-lime-300 mb-3">十二经络与时辰</h2>
        <div className="grid grid-cols-3 gap-2">
          {["胆经(子时)", "肝经(丑时)", "肺经(寅时)", "大肠经(卯时)", "胃经(辰时)", "脾经(巳时)", "心经(午时)", "小肠经(未时)", "膀胱经(申时)", "肾经(酉时)", "心包经(戌时)", "三焦经(亥时)"].map((item) => (
            <div key={item} className="bg-lime-800/30 rounded-lg p-2 text-xs text-lime-100/80 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-lime-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}