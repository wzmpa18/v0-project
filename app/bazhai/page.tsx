"use client"

import { useState } from "react"
import { Compass, Calendar, TrendingUp, Info, BookOpen } from "lucide-react"
import {
  BA_ZHAI,
  BA_ZHAI_FANG_WEI,
  BA_XING,
  calculateMingGua,
  BA_ZHAI_INTRO,
} from "@/lib/bazhai-data"

export default function BazhaiPage() {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    gender: "male" as "male" | "female",
  })
  const [result, setResult] = useState<any>(null)

  const handleCalculate = () => {
    const mingGua = calculateMingGua(formData.year, formData.gender)
    const isEastFour = mingGua.includes("东四命")
    
    setResult({
      mingGua,
      isEastFour,
      fangwei: isEastFour ? BA_ZHAI[0].fangwei : BA_ZHAI[1].fangwei,
    })
  }

  const getNatureColor = (nature: string) => {
    return nature === "吉" ? "text-green-500" : "text-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-orange-400">八宅风水</h1>
            <p className="text-xs text-orange-200/60">命卦匹配 · 住宅风水</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-orange-900/40 to-orange-950/60 rounded-xl p-4 border border-orange-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-200/80">{BA_ZHAI_INTRO.description}</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">计算命卦</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">出生年份</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
              >
                {Array.from({ length: 100 }, (_, i) => 1940 + i).map(y => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">性别</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as "male" | "female" }))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
              >
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-bold hover:from-orange-500 hover:to-orange-600 transition-all"
          >
            计算命卦
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-800/60 to-orange-900/40 rounded-xl p-5 border border-orange-700/30">
              <div className="text-center mb-4">
                <div className="text-sm text-orange-200/70 mb-1">命卦结果</div>
                <div className="text-2xl font-bold text-white">{result.mingGua}</div>
              </div>

              <div className="bg-orange-800/30 rounded-lg p-3 mb-3">
                <div className="text-xs text-orange-200/60 mb-1">适合方位</div>
                <div className="flex gap-2">
                  {result.fangwei.map((f: string) => (
                    <span key={f} className="bg-orange-700/30 rounded-lg px-2 py-1 text-sm text-orange-300">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">八星详解</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {BA_XING.map((xing, idx) => (
              <div key={idx} className="bg-orange-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-orange-300">{xing.name}</div>
                  <div className={`text-xs ${getNatureColor(xing.nature)}`}>{xing.nature}</div>
                </div>
                <div className="text-xs text-orange-100/70">{xing.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">东四命西四命</span>
          </div>

          <div className="space-y-3">
            {BA_ZHAI.map((zhai, idx) => (
              <div key={idx} className="bg-orange-800/30 rounded-lg p-3">
                <div className="font-bold text-orange-300 mb-2">{zhai.name}</div>
                <div className="flex gap-1.5 mb-2">
                  {zhai.fangwei.map((f) => (
                    <span key={f} className="bg-orange-700/30 rounded-lg px-2 py-1 text-xs text-orange-200">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-orange-100/70">{zhai.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="text-sm font-medium text-amber-400 mb-3">八宅风水简介</div>
          <div className="space-y-2 text-xs text-amber-100/70">
            <p><strong className="text-amber-300">起源：</strong>{BA_ZHAI_INTRO.origin}</p>
            <p><strong className="text-amber-300">特点：</strong></p>
            <ul className="list-disc list-inside">
              {BA_ZHAI_INTRO.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}