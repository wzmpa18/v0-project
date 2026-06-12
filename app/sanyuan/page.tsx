"use client"

import { useState } from "react"
import { Compass, Calendar, TrendingUp, Info, BookOpen } from "lucide-react"
import {
  SAN_YUAN,
  JIU_YUN,
  JIU_XING_FENG_SHUI,
  getCurrentYun,
  SAN_YUAN_INTRO,
} from "@/lib/sanyuan-data"

export default function SanyuanPage() {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
  })
  const [result, setResult] = useState<any>(null)

  const handleCalculate = () => {
    const yunResult = getCurrentYun(formData.year)
    setResult(yunResult)
  }

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "水": "text-blue-500",
      "土": "text-amber-600",
      "木": "text-green-500",
      "金": "text-gray-400",
      "火": "text-red-500",
    }
    return colors[wuxing] || "text-gray-500"
  }

  const getNatureColor = (nature: string) => {
    return nature === "吉" ? "text-green-500" : "text-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-green-400">三元风水</h1>
            <p className="text-xs text-green-200/60">三元九运 · 玄空时间</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-4 border border-green-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-200/80">{SAN_YUAN_INTRO.description}</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">查询年份运势</span>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-400 mb-2">选择年份</label>
            <select
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
            >
              {Array.from({ length: 200 }, (_, i) => 1864 + i).map(y => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-500 hover:to-green-600 transition-all"
          >
            查询运势
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-800/60 to-green-900/40 rounded-xl p-5 border border-green-700/30">
              <div className="text-center mb-4">
                <div className="text-sm text-green-200/70 mb-1">{formData.year}年运势</div>
                <div className="text-2xl font-bold text-white">{result.yuan.name} · {result.yun.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xs text-green-200/60 mb-1">当运星</div>
                  <div className="text-sm font-bold text-white">{result.yun.star}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xs text-green-200/60 mb-1">五行属性</div>
                  <div className={`text-sm font-medium ${getWuxingColor(result.yun.wuxing)}`}>
                    {result.yun.wuxing}当令
                  </div>
                </div>
              </div>

              <div className="bg-green-800/30 rounded-lg p-3">
                <div className="text-xs text-green-200/60 mb-1">运势特点</div>
                <div className="text-sm text-white">{result.yun.desc}</div>
              </div>

              <div className="mt-3 bg-green-800/30 rounded-lg p-3">
                <div className="text-xs text-green-200/60 mb-1">时间范围</div>
                <div className="text-sm text-white">{result.yun.period}</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">三元时间表</span>
          </div>

          <div className="space-y-3">
            {SAN_YUAN.map((yuan, idx) => (
              <div key={idx} className="bg-green-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-green-300">{yuan.name}</div>
                  <div className="text-xs text-green-100/60">{yuan.period}</div>
                </div>
                <div className="text-xs text-green-100/70">{yuan.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">九运详情</span>
          </div>

          <div className="space-y-2">
            {JIU_YUN.map((yun, idx) => (
              <div key={idx} className="bg-green-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-green-300">{yun.name}</div>
                  <div className="text-xs text-green-100/60">{yun.period}</div>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${getWuxingColor(yun.wuxing)}`}>
                    {yun.wuxing}
                  </span>
                  <span className="text-xs text-green-100/60">|</span>
                  <span className="text-xs text-green-100/70">{yun.star}</span>
                </div>
                <div className="text-xs text-green-100/70">{yun.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">九星属性</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {JIU_XING_FENG_SHUI.map((star, idx) => (
              <div key={idx} className="bg-green-800/30 rounded-lg p-2 text-center">
                <div className="text-xs font-bold text-green-300 mb-1">{star.name}</div>
                <div className={`text-xs ${getNatureColor(star.nature)}`}>{star.nature}</div>
                <div className={`text-xs ${getWuxingColor(star.wuxing)}`}>{star.wuxing}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="text-sm font-medium text-amber-400 mb-3">三元九运简介</div>
          <div className="space-y-2 text-xs text-amber-100/70">
            <p><strong className="text-amber-300">起源：</strong>{SAN_YUAN_INTRO.origin}</p>
            <p><strong className="text-amber-300">特点：</strong></p>
            <ul className="list-disc list-inside">
              {SAN_YUAN_INTRO.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}