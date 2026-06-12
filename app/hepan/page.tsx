"use client"

import { useState } from "react"
import { Users, Heart, Sparkles, Info, ArrowRight } from "lucide-react"

const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

const WUXING: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水",
  "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水"
}

const WUXING_SHENG: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" }
const WUXING_KE: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" }

const ZODIAC: Record<string, string> = {
  "子": "鼠", "丑": "牛", "寅": "虎", "卯": "兔", "辰": "龙", "巳": "蛇",
  "午": "马", "未": "羊", "申": "猴", "酉": "鸡", "戌": "狗", "亥": "猪"
}

export default function HePanPage() {
  const [person1, setPerson1] = useState({ name: "", year: "", month: "", day: "", time: "", gender: "男" })
  const [person2, setPerson2] = useState({ name: "", year: "", month: "", day: "", time: "", gender: "女" })
  const [result, setResult] = useState<any>(null)

  const calculateCompatibility = () => {
    if (!person1.name || !person1.year || !person2.name || !person2.year) {
      alert("请输入双方姓名和出生年份")
      return
    }

    const year1 = parseInt(person1.year)
    const year2 = parseInt(person2.year)

    const zhi1 = DIZHI[year1 % 12]
    const zhi2 = DIZHI[year2 % 12]

    const zodiac1 = ZODIAC[zhi1]
    const zodiac2 = ZODIAC[zhi2]

    const wuxing1 = WUXING[zhi1]
    const wuxing2 = WUXING[zhi2]

    let score = 50
    const analysis: string[] = []

    if (wuxing1 === wuxing2) {
      score += 15
      analysis.push(`双方同属${wuxing1}行，性格相似，容易理解对方`)
    } else if (WUXING_SHENG[wuxing1] === wuxing2) {
      score += 20
      analysis.push(`${wuxing1}生${wuxing2}，${person1.name}对${person2.name}有帮助`)
    } else if (WUXING_SHENG[wuxing2] === wuxing1) {
      score += 15
      analysis.push(`${wuxing2}生${wuxing1}，${person2.name}对${person1.name}有帮助`)
    } else if (WUXING_KE[wuxing1] === wuxing2) {
      score -= 10
      analysis.push(`${wuxing1}克${wuxing2}，需注意相处方式`)
    } else {
      score += 5
      analysis.push("五行相生相克关系一般，需多加沟通")
    }

    const zodiacCompatibility = checkZodiacCompatibility(zhi1, zhi2)
    score += zodiacCompatibility.score
    analysis.push(zodiacCompatibility.message)

    score = Math.max(0, Math.min(100, score))

    setResult({
      person1: { ...person1, zhi: zhi1, zodiac: zodiac1, wuxing: wuxing1 },
      person2: { ...person2, zhi: zhi2, zodiac: zodiac2, wuxing: wuxing2 },
      score,
      analysis,
      matchLevel: getMatchLevel(score),
    })
  }

  const checkZodiacCompatibility = (zhi1: string, zhi2: string) => {
    const hePairs = [["子", "丑"], ["寅", "亥"], ["卯", "戌"], ["辰", "酉"], ["巳", "申"], ["午", "未"]]
    const chongPairs = [["子", "午"], ["丑", "未"], ["寅", "申"], ["卯", "酉"], ["辰", "戌"], ["巳", "亥"]]

    if (hePairs.some(pair => (pair[0] === zhi1 && pair[1] === zhi2) || (pair[1] === zhi1 && pair[0] === zhi2))) {
      return { score: 25, message: `属相${ZODIAC[zhi1]}与${ZODIAC[zhi2]}相合，缘分深厚` }
    }

    if (chongPairs.some(pair => (pair[0] === zhi1 && pair[1] === zhi2) || (pair[1] === zhi1 && pair[0] === zhi2))) {
      return { score: -15, message: `属相${ZODIAC[zhi1]}与${ZODIAC[zhi2]}相冲，需多加磨合` }
    }

    return { score: 0, message: `属相${ZODIAC[zhi1]}与${ZODIAC[zhi2]}无明显冲合` }
  }

  const getMatchLevel = (score: number) => {
    if (score >= 80) return { level: "非常匹配", color: "text-green-400", desc: "天作之合，缘分深厚" }
    if (score >= 60) return { level: "比较匹配", color: "text-amber-400", desc: "相处融洽，适合发展" }
    if (score >= 40) return { level: "一般匹配", color: "text-orange-400", desc: "需要努力，多加沟通" }
    return { level: "不太匹配", color: "text-red-400", desc: "缘分较浅，需慎重考虑" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-700 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-rose-400">合盘分析</h1>
            <p className="text-xs text-rose-200/60">八字合婚 · 缘分配对</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30 mb-4">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 py-2">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-sm text-rose-300">甲方</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="姓名"
                value={person1.name}
                onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
              <select
                value={person1.gender}
                onChange={(e) => setPerson1({ ...person1, gender: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              >
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="年"
                value={person1.year}
                onChange={(e) => setPerson1({ ...person1, year: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
              <input
                type="number"
                placeholder="月"
                value={person1.month}
                onChange={(e) => setPerson1({ ...person1, month: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
              <input
                type="number"
                placeholder="日"
                value={person1.day}
                onChange={(e) => setPerson1({ ...person1, day: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
            </div>

            <div className="flex items-center justify-center gap-2 py-2">
              <div className="h-px flex-1 bg-white/20" />
              <Heart className="w-5 h-5 text-rose-400" />
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <div className="flex items-center justify-center gap-2 py-2">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-sm text-rose-300">乙方</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="姓名"
                value={person2.name}
                onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
              <select
                value={person2.gender}
                onChange={(e) => setPerson2({ ...person2, gender: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              >
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="年"
                value={person2.year}
                onChange={(e) => setPerson2({ ...person2, year: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
              <input
                type="number"
                placeholder="月"
                value={person2.month}
                onChange={(e) => setPerson2({ ...person2, month: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
              <input
                type="number"
                placeholder="日"
                value={person2.day}
                onChange={(e) => setPerson2({ ...person2, day: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
            </div>

            <button
              onClick={calculateCompatibility}
              disabled={!person1.name || !person1.year || !person2.name || !person2.year}
              className="w-full bg-gradient-to-r from-rose-600 to-pink-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              分析合盘
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className={`bg-gradient-to-br ${result.score >= 80 ? 'from-green-900/40 to-green-950/60 border-green-800/30' : result.score >= 60 ? 'from-amber-900/40 to-amber-950/60 border-amber-800/30' : 'from-red-900/40 to-red-950/60 border-red-800/30'} rounded-xl p-5 border`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {result.person1.name} + {result.person2.name}
                </div>
                <div className="text-sm text-gray-400">合盘匹配度</div>
                <div className="mt-3">
                  <span className={`text-5xl font-bold ${result.matchLevel.color}`}>
                    {result.score}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">分</span>
                </div>
                <div className={`text-lg font-medium mt-2 ${result.matchLevel.color}`}>
                  {result.matchLevel.level}
                </div>
                <div className="text-sm text-gray-400 mt-1">{result.matchLevel.desc}</div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-rose-400 mb-4">双方信息</h3>
              <div className="flex gap-4">
                <div className="flex-1 p-3 bg-white/5 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{result.person1.name}</div>
                    <div className="text-sm text-gray-400">{result.person1.gender}</div>
                    <div className="mt-2">
                      <div className="text-sm text-gray-400">生肖</div>
                      <div className="text-lg font-bold text-rose-400">{result.person1.zodiac}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">五行</div>
                      <div className="text-lg font-bold text-rose-400">{result.person1.wuxing}</div>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-500 mt-8" />
                <div className="flex-1 p-3 bg-white/5 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{result.person2.name}</div>
                    <div className="text-sm text-gray-400">{result.person2.gender}</div>
                    <div className="mt-2">
                      <div className="text-sm text-gray-400">生肖</div>
                      <div className="text-lg font-bold text-pink-400">{result.person2.zodiac}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">五行</div>
                      <div className="text-lg font-bold text-pink-400">{result.person2.wuxing}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-medium text-purple-400 mb-3">合盘分析</h3>
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
            <span className="text-sm font-medium text-amber-400">合婚简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            八字合婚是中国传统的婚姻配对方法，通过分析双方的生辰八字来判断缘分深浅。
            主要从年柱的生肖相合相冲、五行相生相克等方面进行分析。生肖相合的组合包括鼠牛、虎猪、兔狗、龙鸡、蛇猴、马羊；
            生肖相冲的组合包括鼠马、牛羊、虎猴、兔鸡、龙狗、蛇猪。五行相生为吉，相克需注意相处方式。
          </p>
        </div>
      </main>
    </div>
  )
}