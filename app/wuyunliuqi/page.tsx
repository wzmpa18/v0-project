"use client"

import { useState } from "react"
import { Flame, Calendar, Heart, ChevronRight, Info } from "lucide-react"
import {
  calculateWuYunLiuQi,
  WU_YUN,
  LIU_QI,
  WUYUNLIUQI_NOTES,
} from "@/lib/wuyunliuqi-data"

export default function WuyunliuqiPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [result, setResult] = useState(calculateWuYunLiuQi(new Date().getFullYear()))

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
    setResult(calculateWuYunLiuQi(year))
  }

  const wuYunColor = {
    木: { bg: "from-green-800/60 to-green-900/40", text: "text-green-400", border: "border-green-700/30" },
    火: { bg: "from-red-800/60 to-red-900/40", text: "text-red-400", border: "border-red-700/30" },
    土: { bg: "from-amber-800/60 to-amber-900/40", text: "text-amber-400", border: "border-amber-700/30" },
    金: { bg: "from-gray-600/60 to-gray-700/40", text: "text-gray-300", border: "border-gray-500/30" },
    水: { bg: "from-blue-800/60 to-blue-900/40", text: "text-blue-400", border: "border-blue-700/30" },
  }

  const currentWuYunColor = wuYunColor[result.wuYun.element as keyof typeof wuYunColor] || wuYunColor.土

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-rose-400">五运六气</h1>
            <p className="text-xs text-rose-200/60">运气推算 · 中医理论</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-rose-400" />
            <span className="text-sm text-rose-200/80">{WUYUNLIUQI_NOTES.intro}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-400">选择年份</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleYearChange(selectedYear - 1)}
              className="w-8 h-8 rounded-full bg-gray-800/60 flex items-center justify-center text-gray-300 hover:bg-gray-700/60"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <span className="text-lg font-bold text-white w-20 text-center">{selectedYear}年</span>
            <button
              onClick={() => handleYearChange(selectedYear + 1)}
              className="w-8 h-8 rounded-full bg-gray-800/60 flex items-center justify-center text-gray-300 hover:bg-gray-700/60"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className={`bg-gradient-to-br ${currentWuYunColor.bg} rounded-xl p-5 border ${currentWuYunColor.border} mb-4`}>
          <div className="text-center mb-4">
            <div className="text-sm text-gray-300/70 mb-1">{result.ganZhi}</div>
            <div className="text-2xl font-bold text-white">
              {result.wuYun.name} · {result.liuQi.name}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xs text-gray-300/60 mb-1">五运特点</div>
              <div className="text-sm text-white">{result.wuYun.description}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xs text-gray-300/60 mb-1">六气特点</div>
              <div className="text-sm text-white">{result.liuQi.description}</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">年度运气概要</span>
          </div>
          <p className="text-sm text-gray-200/80 leading-relaxed">{result.summary}</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">养生建议</span>
          </div>
          <ul className="space-y-2">
            {result.healthAdvice.map((advice, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-gray-200/80">{advice}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="text-sm font-medium text-amber-400 mb-3">五运详解</div>
          <div className="grid grid-cols-5 gap-1.5">
            {Object.entries(WU_YUN).map(([key, value]) => (
              <div
                key={key}
                className={`bg-amber-800/30 rounded-lg p-2 text-center cursor-pointer transition-all ${
                  result.wuYun.element === key ? "ring-2 ring-amber-500/50" : ""
                }`}
                onClick={() => setResult(calculateWuYunLiuQi(selectedYear))}
              >
                <div className="text-lg font-bold text-amber-300">{key}</div>
                <div className="text-xs text-amber-100/60">{value.name.slice(0, 2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
          <div className="text-sm font-medium text-purple-400 mb-3">六气详解</div>
          <div className="grid grid-cols-3 gap-1.5">
            {Object.entries(LIU_QI).map(([key, value]) => (
              <div
                key={key}
                className={`bg-purple-800/30 rounded-lg p-2 text-center ${
                  result.liuQi.name === key ? "ring-2 ring-purple-500/50" : ""
                }`}
              >
                <div className="text-xs text-purple-300">{value.name}</div>
                <div className="text-xs text-purple-100/60 mt-0.5">{value.season}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-br from-blue-900/30 to-blue-950/50 rounded-xl p-4 border border-blue-800/30">
          <div className="text-sm font-medium text-blue-400 mb-3">运气理论说明</div>
          <div className="space-y-3 text-xs text-blue-100/70">
            <p><strong className="text-blue-300">五运：</strong>{WUYUNLIUQI_NOTES.wuyun_desc}</p>
            <p><strong className="text-blue-300">六气：</strong>{WUYUNLIUQI_NOTES.liuqi_desc}</p>
            <p><strong className="text-blue-300">养生原则：</strong>{WUYUNLIUQI_NOTES.health_tips}</p>
          </div>
        </div>
      </main>
    </div>
  )
}