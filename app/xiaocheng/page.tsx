"use client"

import { useState } from "react"
import { Target, Sparkles, Info, RotateCcw } from "lucide-react"

const GUA_NAMES = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"]
const GUA_SYMBOLS = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"]

const PALACES = ["乾", "坎", "艮", "震", "巽", "离", "坤", "兑"]

const GUA_MEANINGS: Record<string, { element: string; direction: string; person: string }> = {
  "乾": { element: "金", direction: "西北", person: "父" },
  "兑": { element: "金", direction: "西方", person: "少女" },
  "离": { element: "火", direction: "南方", person: "中女" },
  "震": { element: "木", direction: "东方", person: "长男" },
  "巽": { element: "木", direction: "东南", person: "长女" },
  "坎": { element: "水", direction: "北方", person: "中男" },
  "艮": { element: "土", direction: "东北", person: "少男" },
  "坤": { element: "土", direction: "西南", person: "母" },
}

export default function XiaoChengPage() {
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateXiaoCheng = () => {
    if (!birthDate || !birthTime) {
      alert("请输入出生日期和时间")
      return
    }

    const [year, month, day] = birthDate.split('-').map(Number)
    const [hour] = birthTime.split(':').map(Number)

    const total = year + month + day + hour
    const startIndex = total % 8

    const flyingSequence: { palace: string; gua: string; symbol: string; position: number }[] = []
    
    for (let i = 0; i < 8; i++) {
      const guaIndex = (startIndex + i) % 8
      flyingSequence.push({
        palace: PALACES[i],
        gua: GUA_NAMES[guaIndex],
        symbol: GUA_SYMBOLS[guaIndex],
        position: i + 1,
      })
    }

    const dayGuaIndex = (year + month + day) % 8
    const timeGuaIndex = hour % 8

    const dayGua = GUA_NAMES[dayGuaIndex]
    const timeGua = GUA_NAMES[timeGuaIndex]

    const analysis = generateAnalysis(flyingSequence, dayGua, timeGua)

    setResult({
      birthDate,
      birthTime,
      flyingSequence,
      dayGua,
      timeGua,
      analysis,
    })
  }

  const generateAnalysis = (sequence: { palace: string; gua: string }[], dayGua: string, timeGua: string) => {
    const analysis: string[] = []
    
    const dayPalace = sequence.find(s => s.gua === dayGua)
    const timePalace = sequence.find(s => s.gua === timeGua)

    if (dayPalace) {
      analysis.push(`日主落${dayPalace.palace}宫，${GUA_MEANINGS[dayGua].person}主事`)
    }
    if (timePalace) {
      analysis.push(`时干落${timePalace.palace}宫，${GUA_MEANINGS[timeGua].person}助力`)
    }

    const guaCount: Record<string, number> = {}
    sequence.forEach(s => {
      guaCount[s.gua] = (guaCount[s.gua] || 0) + 1
    })

    const maxGua = Object.entries(guaCount).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    analysis.push(`卦气以${maxGua}为主，${GUA_MEANINGS[maxGua].element}行较旺`)

    return analysis
  }

  const reset = () => {
    setBirthDate("")
    setBirthTime("")
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-500 to-stone-700 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-stone-400">小成图</h1>
            <p className="text-xs text-stone-200/60">周易小成图 · 简易占卜</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-stone-900/40 to-stone-950/60 rounded-xl p-4 border border-stone-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-stone-200/80 mb-2 block">出生日期</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-stone-500/50"
              />
            </div>

            <div>
              <label className="text-sm text-stone-200/80 mb-2 block">出生时间</label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-stone-500/50"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={calculateXiaoCheng}
                disabled={!birthDate || !birthTime}
                className="flex-1 bg-gradient-to-r from-stone-600 to-gray-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                起局分析
              </button>
              <button
                onClick={reset}
                className="px-4 bg-white/10 py-3 rounded-xl flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-stone-900/40 to-stone-950/60 rounded-xl p-4 border border-stone-800/30">
              <h3 className="text-sm font-medium text-stone-400 mb-4">小成图排盘</h3>
              <div className="grid grid-cols-4 gap-2">
                {result.flyingSequence.map((item: { palace: string; gua: string; symbol: string; position: number }, idx: number) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-center ${
                      item.gua === result.dayGua || item.gua === result.timeGua
                        ? "bg-stone-800/50 border border-stone-600/30"
                        : "bg-white/5"
                    }`}
                  >
                    <div className="text-xl font-bold text-white mb-1">{item.symbol}</div>
                    <div className="text-sm text-stone-300">{item.gua}</div>
                    <div className="text-xs text-gray-500">{item.palace}宫</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-stone-400 mb-4">日时二卦</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">日卦</div>
                  <div className="text-2xl font-bold text-stone-400">{GUA_SYMBOLS[GUA_NAMES.indexOf(result.dayGua)]}</div>
                  <div className="text-lg font-bold text-white">{result.dayGua}</div>
                  <div className="text-xs text-gray-500 mt-1">{GUA_MEANINGS[result.dayGua].element} · {GUA_MEANINGS[result.dayGua].direction}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">时卦</div>
                  <div className="text-2xl font-bold text-stone-400">{GUA_SYMBOLS[GUA_NAMES.indexOf(result.timeGua)]}</div>
                  <div className="text-lg font-bold text-white">{result.timeGua}</div>
                  <div className="text-xs text-gray-500 mt-1">{GUA_MEANINGS[result.timeGua].element} · {GUA_MEANINGS[result.timeGua].direction}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-medium text-purple-400 mb-3">分析结果</h3>
              <div className="space-y-2">
                {result.analysis.map((text: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span className="text-sm text-purple-100/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">小成图简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            小成图是一种简化版的周易占卜方法，由当代易学大师霍斐然先生所创。
            它以八卦为基础，将六十四卦简化为八个基本卦，通过时间起卦的方式，
            排列出八个方位的卦象，从而进行吉凶判断。小成图方法简单易懂，
            不需要复杂的排盘，是一种非常实用的占卜工具。
          </p>
        </div>
      </main>
    </div>
  )
}