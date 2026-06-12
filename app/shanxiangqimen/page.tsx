"use client"

import { useState } from "react"
import { Compass, Sparkles, Info } from "lucide-react"

const DIRECTIONS = ["正北", "东北", "正东", "东南", "正南", "西南", "正西", "西北"]
const DIRECTION_SYMBOLS = ["☵", "☶", "☳", "☴", "☲", "☷", "☱", "☰"]

const QIMEN_GATES = ["休门", "生门", "伤门", "杜门", "景门", "死门", "惊门", "开门"]

export default function ShanXiangQiMenPage() {
  const [direction, setDirection] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateShanXiangQiMen = () => {
    if (!direction || !birthDate) {
      alert("请选择方向和输入日期")
      return
    }

    const [year, month, day] = birthDate.split('-').map(Number)
    const directionIndex = DIRECTIONS.indexOf(direction)
    const gateIndex = (year + month + day + directionIndex) % 8

    const gate = QIMEN_GATES[gateIndex]
    const symbol = DIRECTION_SYMBOLS[directionIndex]

    const analysis = generateAnalysis(direction, gate, gateIndex)

    setResult({
      direction,
      symbol,
      gate,
      analysis,
    })
  }

  const generateAnalysis = (direction: string, gate: string, gateIndex: number) => {
    const analysis: string[] = []

    analysis.push(`坐山：${direction}`)
    analysis.push(`奇门门：${gate}`)

    const goodGates = ["生门", "开门", "休门"]
    if (goodGates.includes(gate)) {
      analysis.push(`${gate}为吉门，此方向大利，诸事顺遂`)
    } else {
      analysis.push(`${gate}为平门/凶门，此方向需谨慎行事`)
    }

    return analysis
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-emerald-400">山向奇门</h1>
            <p className="text-xs text-emerald-200/60">风水与奇门结合</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 rounded-xl p-4 border border-emerald-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-emerald-200/80 mb-2 block">选择山向</label>
              <div className="grid grid-cols-4 gap-2">
                {DIRECTIONS.map((dir, idx) => (
                  <button
                    key={dir}
                    onClick={() => setDirection(dir)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      direction === dir ? "bg-emerald-800/50 border border-emerald-600/30" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-lg">{DIRECTION_SYMBOLS[idx]}</div>
                    <div className="text-xs text-gray-400">{dir}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-emerald-200/80 mb-2 block">选择日期</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <button
              onClick={calculateShanXiangQiMen}
              disabled={!direction || !birthDate}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              分析山向奇门
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 rounded-xl p-4 border border-emerald-800/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">山向</div>
                  <div className="text-2xl font-bold text-white">{result.symbol}</div>
                  <div className="text-lg font-bold text-emerald-400">{result.direction}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">奇门门</div>
                  <div className="text-2xl font-bold text-white">{result.gate}</div>
                  <div className="text-sm text-gray-500">{["生门", "开门", "休门"].includes(result.gate) ? '吉门' : '平门/凶门'}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-medium text-purple-400 mb-3">综合分析</h3>
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
            <span className="text-sm font-medium text-amber-400">山向奇门简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            山向奇门是将风水与奇门遁甲相结合的一种高级风水方法。
            通过分析住宅或墓地的山向方位，并结合奇门遁甲的八门方位，
            来判断该方向的吉凶。这种方法可以帮助选择最佳的建筑朝向，
            以达到趋吉避凶的目的。
          </p>
        </div>
      </main>
    </div>
  )
}