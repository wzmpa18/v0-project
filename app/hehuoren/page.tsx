"use client"

import { useState } from "react"
import { Users, Heart, Sparkles, Info, ArrowRight } from "lucide-react"

const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

const WUXING: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水",
  "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水"
}

const ZODIAC: Record<string, string> = {
  "子": "鼠", "丑": "牛", "寅": "虎", "卯": "兔", "辰": "龙", "巳": "蛇",
  "午": "马", "未": "羊", "申": "猴", "酉": "鸡", "戌": "狗", "亥": "猪"
}

export default function HeHuoRenPage() {
  const [person1, setPerson1] = useState({ name: "", year: "", month: "", day: "", gender: "男" })
  const [person2, setPerson2] = useState({ name: "", year: "", month: "", day: "", gender: "女" })
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
      score += 20
      analysis.push(`双方同属${wuxing1}行，性格相似，理念相近，容易达成共识`)
    } else if (isSheng(wuxing1, wuxing2)) {
      score += 25
      analysis.push(`${wuxing1}生${wuxing2}，${person1.name}对${person2.name}有助力，事业上能提供支持`)
    } else if (isSheng(wuxing2, wuxing1)) {
      score += 20
      analysis.push(`${wuxing2}生${wuxing1}，${person2.name}对${person1.name}有助力，财运上能带来帮助`)
    } else if (isKe(wuxing1, wuxing2)) {
      score -= 10
      analysis.push(`${wuxing1}克${wuxing2}，需注意沟通方式，避免意见冲突`)
    } else {
      score += 5
      analysis.push("五行关系一般，需要共同努力，相互包容")
    }

    const zodiacScore = checkZodiacCompatibility(zhi1, zhi2)
    score += zodiacScore.score
    analysis.push(zodiacScore.message)

    score = Math.max(0, Math.min(100, score))

    const matchLevel = getMatchLevel(score)

    setResult({
      person1: { ...person1, zhi: zhi1, zodiac: zodiac1, wuxing: wuxing1 },
      person2: { ...person2, zhi: zhi2, zodiac: zodiac2, wuxing: wuxing2 },
      score,
      analysis,
      matchLevel,
      suggestions: generateSuggestions(score),
    })
  }

  const isSheng = (w1: string, w2: string) => {
    const sheng: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" }
    return sheng[w1] === w2
  }

  const isKe = (w1: string, w2: string) => {
    const ke: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" }
    return ke[w1] === w2
  }

  const checkZodiacCompatibility = (zhi1: string, zhi2: string) => {
    const hePairs = [["子", "丑"], ["寅", "亥"], ["卯", "戌"], ["辰", "酉"], ["巳", "申"], ["午", "未"]]
    const chongPairs = [["子", "午"], ["丑", "未"], ["寅", "申"], ["卯", "酉"], ["辰", "戌"], ["巳", "亥"]]
    const sanHeGroups = [["申", "子", "辰"], ["亥", "卯", "未"], ["寅", "午", "戌"], ["巳", "酉", "丑"]]

    if (hePairs.some(pair => (pair[0] === zhi1 && pair[1] === zhi2) || (pair[1] === zhi1 && pair[0] === zhi2))) {
      return { score: 20, message: `生肖${ZODIAC[zhi1]}与${ZODIAC[zhi2]}相合，合作默契，事业顺遂` }
    }

    if (chongPairs.some(pair => (pair[0] === zhi1 && pair[1] === zhi2) || (pair[1] === zhi1 && pair[0] === zhi2))) {
      return { score: -15, message: `生肖${ZODIAC[zhi1]}与${ZODIAC[zhi2]}相冲，需加强沟通，化解矛盾` }
    }

    if (sanHeGroups.some(group => group.includes(zhi1) && group.includes(zhi2))) {
      return { score: 15, message: `生肖${ZODIAC[zhi1]}与${ZODIAC[zhi2]}三合，合作顺利，财运亨通` }
    }

    return { score: 0, message: `生肖${ZODIAC[zhi1]}与${ZODIAC[zhi2]}无明显冲合，需主动维护合作关系` }
  }

  const getMatchLevel = (score: number) => {
    if (score >= 80) return { level: "黄金搭档", color: "text-yellow-400", desc: "天作之合，事业腾飞" }
    if (score >= 60) return { level: "良好伙伴", color: "text-green-400", desc: "志同道合，共创辉煌" }
    if (score >= 40) return { level: "需要磨合", color: "text-amber-400", desc: "互补性强，需多沟通" }
    return { level: "谨慎合作", color: "text-red-400", desc: "差异较大，需谨慎决策" }
  }

  const generateSuggestions = (score: number) => {
    const suggestions: string[] = []
    
    if (score >= 80) {
      suggestions.push("恭喜！你们是难得的黄金搭档，建议尽快携手合作，共创事业高峰")
      suggestions.push("可考虑共同投资、合伙创业，成功概率极高")
      suggestions.push("注意事项：保持沟通，避免因成功而产生分歧")
    } else if (score >= 60) {
      suggestions.push("你们是良好的合作伙伴，具有共同的目标和理念")
      suggestions.push("建议明确分工，发挥各自优势")
      suggestions.push("注意事项：定期沟通，及时解决问题")
    } else if (score >= 40) {
      suggestions.push("你们具有互补性，但需要更多的磨合和沟通")
      suggestions.push("建议先从小项目合作开始，逐步建立信任")
      suggestions.push("注意事项：明确权责，签订详细合作协议")
    } else {
      suggestions.push("合作存在一定挑战，建议谨慎考虑")
      suggestions.push("如决定合作，建议引入第三方调解机制")
      suggestions.push("注意事项：充分了解彼此，谨慎决策")
    }

    return suggestions
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-indigo-400">合伙人匹配</h1>
            <p className="text-xs text-indigo-200/60">八字命理 · 合作伙伴</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-950/60 rounded-xl p-4 border border-indigo-800/30 mb-4">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 py-2">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-sm text-indigo-300">甲方</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="姓名"
                value={person1.name}
                onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <select
                value={person1.gender}
                onChange={(e) => setPerson1({ ...person1, gender: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
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
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <input
                type="number"
                placeholder="月"
                value={person1.month}
                onChange={(e) => setPerson1({ ...person1, month: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <input
                type="number"
                placeholder="日"
                value={person1.day}
                onChange={(e) => setPerson1({ ...person1, day: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div className="flex items-center justify-center gap-2 py-2">
              <div className="h-px flex-1 bg-white/20" />
              <Heart className="w-5 h-5 text-indigo-400" />
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <div className="flex items-center justify-center gap-2 py-2">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-sm text-indigo-300">乙方</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="姓名"
                value={person2.name}
                onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <select
                value={person2.gender}
                onChange={(e) => setPerson2({ ...person2, gender: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
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
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <input
                type="number"
                placeholder="月"
                value={person2.month}
                onChange={(e) => setPerson2({ ...person2, month: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <input
                type="number"
                placeholder="日"
                value={person2.day}
                onChange={(e) => setPerson2({ ...person2, day: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <button
              onClick={calculateCompatibility}
              disabled={!person1.name || !person1.year || !person2.name || !person2.year}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              分析合作匹配度
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className={`bg-gradient-to-br ${result.score >= 80 ? 'from-yellow-900/40 to-yellow-950/60 border-yellow-800/30' : result.score >= 60 ? 'from-green-900/40 to-green-950/60 border-green-800/30' : result.score >= 40 ? 'from-amber-900/40 to-amber-950/60 border-amber-800/30' : 'from-red-900/40 to-red-950/60 border-red-800/30'} rounded-xl p-5 border`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {result.person1.name} + {result.person2.name}
                </div>
                <div className="text-sm text-gray-400">合伙人匹配度</div>
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
              <h3 className="text-sm font-medium text-indigo-400 mb-4">双方信息</h3>
              <div className="flex gap-4">
                <div className="flex-1 p-3 bg-white/5 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{result.person1.name}</div>
                    <div className="text-sm text-gray-400">{result.person1.gender}</div>
                    <div className="mt-2">
                      <div className="text-sm text-gray-400">生肖</div>
                      <div className="text-lg font-bold text-indigo-400">{result.person1.zodiac}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">五行</div>
                      <div className="text-lg font-bold text-indigo-400">{result.person1.wuxing}</div>
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
                      <div className="text-lg font-bold text-purple-400">{result.person2.zodiac}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">五行</div>
                      <div className="text-lg font-bold text-purple-400">{result.person2.wuxing}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-medium text-purple-400 mb-3">匹配分析</h3>
              <div className="space-y-2">
                {result.analysis.map((text: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span className="text-sm text-purple-100/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
              <h3 className="text-sm font-medium text-amber-400 mb-3">合作建议</h3>
              <div className="space-y-2">
                {result.suggestions.map((text: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span className="text-sm text-amber-100/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">合伙人匹配简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            合伙人匹配是基于传统八字命理学的合作关系分析方法。通过分析双方的生辰八字，
            从五行相生相克、生肖合冲等角度评估合作潜力。五行相生为吉，相克需注意沟通；
            生肖相合为吉，相冲需谨慎。本分析仅供参考，实际合作还需综合考虑双方的价值观、能力互补等因素。
          </p>
        </div>
      </main>
    </div>
  )
}