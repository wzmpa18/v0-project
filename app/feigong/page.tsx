"use client"

import { useState } from "react"
import { Compass, Sparkles, Clock, Info, RotateCcw } from "lucide-react"

const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

const MEN = ["休门", "生门", "伤门", "杜门", "景门", "死门", "惊门", "开门"]
const SHEN = ["值符", "螣蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"]

const FLYING_PALACES = ["坎一宫", "坤二宫", "震三宫", "巽四宫", "中五宫", "乾六宫", "兑七宫", "艮八宫", "离九宫"]

const PALACE_SYMBOLS: Record<string, string> = {
  "坎一宫": "☵",
  "坤二宫": "☷",
  "震三宫": "☳",
  "巽四宫": "☴",
  "中五宫": "○",
  "乾六宫": "☰",
  "兑七宫": "☱",
  "艮八宫": "☶",
  "离九宫": "☲",
}

const PALACE_ELEMENTS: Record<string, string> = {
  "坎一宫": "水",
  "坤二宫": "土",
  "震三宫": "木",
  "巽四宫": "木",
  "中五宫": "土",
  "乾六宫": "金",
  "兑七宫": "金",
  "艮八宫": "土",
  "离九宫": "火",
}

export default function FeiGongPage() {
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateFeiGong = () => {
    if (!birthDate || !birthTime) {
      alert("请输入出生日期和时间")
      return
    }

    const [year, month, day] = birthDate.split('-').map(Number)
    const [hour] = birthTime.split(':').map(Number)

    const dayIndex = (year + month + day) % 9
    const hourIndex = hour % 9

    const startPalace = FLYING_PALACES[dayIndex]
    const timePalace = FLYING_PALACES[hourIndex]

    const gateIndex = (dayIndex + hourIndex) % 8
    const spiritIndex = (dayIndex + hourIndex + 1) % 8

    const gate = MEN[gateIndex]
    const spirit = SHEN[spiritIndex]

    const dayGanIndex = (year + month + day) % 10
    const dayGan = TIANGAN[dayGanIndex]

    const resultData = {
      birthDate,
      birthTime,
      startPalace,
      timePalace,
      gate,
      spirit,
      dayGan,
      flyingSequence: generateFlyingSequence(dayIndex),
      analysis: generateAnalysis(startPalace, timePalace, gate, spirit, dayGan),
    }

    setResult(resultData)
  }

  const generateFlyingSequence = (startIndex: number) => {
    const sequence: { palace: string; position: number }[] = []
    for (let i = 0; i < 9; i++) {
      const index = (startIndex + i) % 9
      sequence.push({ palace: FLYING_PALACES[index], position: i + 1 })
    }
    return sequence
  }

  const generateAnalysis = (startPalace: string, timePalace: string, gate: string, spirit: string, dayGan: string) => {
    const analysis: string[] = []
    
    if (["生门", "开门", "休门"].includes(gate)) {
      analysis.push(`今日得${gate}吉门，主事业顺利，财运亨通`)
    } else {
      analysis.push(`今日得${gate}，宜谨慎行事，三思而后行`)
    }

    if (spirit === "值符") {
      analysis.push("值符临身，贵人相助，遇事有贵人提携")
    } else if (spirit === "青龙") {
      analysis.push("青龙临身，主喜庆之事，财运将至")
    } else if (spirit === "白虎") {
      analysis.push("白虎临身，主有惊吓之事，需注意安全")
    }

    analysis.push(`日干为${dayGan}，${getGanDescription(dayGan)}`)
    
    return analysis
  }

  const getGanDescription = (gan: string) => {
    const descriptions: Record<string, string> = {
      "甲": "甲木参天，主旺盛之气，利于行动",
      "乙": "乙木柔和，主仁慈之心，利于人际关系",
      "丙": "丙火光明，主智慧显露，利于学习",
      "丁": "丁火温暖，主文雅之气，利于创作",
      "戊": "戊土厚重，主稳重踏实，利于积累",
      "己": "己土柔顺，主包容之心，利于合作",
      "庚": "庚金锐利，主果断决策，利于决断",
      "辛": "辛金秀气，主精致细腻，利于技艺",
      "壬": "壬水流动，主灵活变通，利于适应",
      "癸": "癸水滋润，主智慧深沉，利于思考",
    }
    return descriptions[gan] || ""
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
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-lime-700 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-lime-400">飞宫小奇门</h1>
            <p className="text-xs text-lime-200/60">掌上奇门 · 快速起局</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-lime-900/40 to-lime-950/60 rounded-xl p-4 border border-lime-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-lime-200/80 mb-2 block">出生日期</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-500/50"
              />
            </div>

            <div>
              <label className="text-sm text-lime-200/80 mb-2 block">出生时间</label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-500/50"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={calculateFeiGong}
                disabled={!birthDate || !birthTime}
                className="flex-1 bg-gradient-to-r from-lime-600 to-green-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="bg-gradient-to-br from-lime-900/40 to-lime-950/60 rounded-xl p-4 border border-lime-800/30">
              <h3 className="text-sm font-medium text-lime-400 mb-4">基本信息</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400">出生日期</div>
                  <div className="text-lg font-bold text-white">{result.birthDate}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400">出生时间</div>
                  <div className="text-lg font-bold text-white">{result.birthTime}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400">日干</div>
                  <div className="text-lg font-bold text-white">{result.dayGan}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400">值符</div>
                  <div className="text-lg font-bold text-white">{result.spirit}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-lime-400 mb-4">宫位分布</h3>
              <div className="grid grid-cols-3 gap-2">
                {result.flyingSequence.map((item: { palace: string; position: number }, idx: number) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-center ${
                      item.palace === result.startPalace || item.palace === result.timePalace
                        ? "bg-lime-900/40 border border-lime-700/30"
                        : "bg-white/5"
                    }`}
                  >
                    <div className="text-xl">{PALACE_SYMBOLS[item.palace]}</div>
                    <div className="text-xs text-white mt-1">{item.palace.replace('宫', '')}</div>
                    <div className="text-xs text-gray-500">#{item.position}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">时宫与门</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">时宫</div>
                  <div className="text-xl font-bold text-lime-400">{result.timePalace}</div>
                  <div className="text-xs text-gray-500 mt-1">{PALACE_ELEMENTS[result.timePalace]}属性</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">八门</div>
                  <div className="text-xl font-bold text-amber-400">{result.gate}</div>
                  <div className="text-xs text-gray-500 mt-1">{["生门", "开门", "休门"].includes(result.gate) ? '吉门' : '平门/凶门'}</div>
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
            <span className="text-sm font-medium text-amber-400">飞宫小奇门简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            飞宫小奇门是一种简化版的奇门遁甲，也称为"掌上奇门"。它不需要复杂的排盘，
            只需根据出生日期和时间，通过简单的计算即可得出八门、八神的位置，从而进行吉凶判断。
            飞宫小奇门以九宫飞布为基础，以日干为核心，结合八门、八神进行综合分析，
            是一种快速便捷的预测方法。
          </p>
        </div>
      </main>
    </div>
  )
}