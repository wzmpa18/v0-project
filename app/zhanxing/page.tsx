"use client"

import { Globe } from "lucide-react"

export default function ZhanxingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-blue-400">占星术</h1>
          <p className="text-xs text-blue-200/60">西方占星 · 星座运势</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 rounded-xl p-4 border border-blue-800/30">
        <h2 className="text-sm font-bold text-blue-300 mb-3">十二星座</h2>
        <div className="grid grid-cols-3 gap-2">
          {["白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座", "水瓶座", "双鱼座"].map((item) => (
            <div key={item} className="bg-blue-800/30 rounded-lg p-2 text-xs text-blue-100/80 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-blue-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}