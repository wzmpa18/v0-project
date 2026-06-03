"use client"

import { Crown } from "lucide-react"

export default function YanggongPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
          <Crown className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-indigo-400">杨公风水</h1>
          <p className="text-xs text-indigo-200/60">形势派 · 杨筠松</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-950/60 rounded-xl p-4 border border-indigo-800/30">
        <h2 className="text-sm font-bold text-indigo-300 mb-3">杨公风水要素</h2>
        <div className="grid grid-cols-2 gap-2">
          {["龙", "穴", "砂", "水", "向", "明堂", "案山", "朝山"].map((item) => (
            <div key={item} className="bg-indigo-800/30 rounded-lg p-2 text-xs text-indigo-100/80 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-indigo-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}