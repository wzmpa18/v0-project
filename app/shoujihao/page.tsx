"use client"

import { useState } from "react"
import { Smartphone, Star, Info, Sparkles } from "lucide-react"

const NUMBER_WUXING: Record<number, string> = {
  0: "土", 1: "水", 2: "火", 3: "木", 4: "木", 5: "土", 6: "土", 7: "金", 8: "金", 9: "水"
}

const NUMBER_MEANING: Record<number, { meaning: string; trait: string }> = {
  0: { meaning: "圆满", trait: "包容、和谐、圆满" },
  1: { meaning: "开创", trait: "独立、进取、领导" },
  2: { meaning: "合作", trait: "温和、协调、沟通" },
  3: { meaning: "创意", trait: "活泼、表达、艺术" },
  4: { meaning: "稳定", trait: "踏实、务实、稳定" },
  5: { meaning: "变化", trait: "自由、冒险、灵活" },
  6: { meaning: "财富", trait: "财富、关爱、责任" },
  7: { meaning: "智慧", trait: "智慧、思考、钻研" },
  8: { meaning: "成就", trait: "成功、权力、财富" },
  9: { meaning: "贵人", trait: "贵人、奉献、慈悲" },
}

const WUXING_COLORS: Record<string, string> = {
  "金": "text-yellow-400",
  "木": "text-green-400",
  "水": "text-blue-400",
  "火": "text-red-400",
  "土": "text-amber-400",
}

const WUXING_DESCRIPTION: Record<string, string> = {
  "金": "主贵气、果断、执行力强",
  "木": "主生机、创意、人脉广",
  "水": "主智慧、灵活、财运佳",
  "火": "主热情、活力、事业旺",
  "土": "主稳重、踏实、根基牢",
}

export default function ShouJiHaoPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)

  const analyzePhone = () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      alert("请输入11位手机号码")
      return
    }

    const digits = phoneNumber.split('').map(Number)
    
    // 计算五行分布
    const wuxingCount: Record<string, number> = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 }
    digits.forEach(d => {
      const wuxing = NUMBER_WUXING[d]
      wuxingCount[wuxing]++
    })

    // 计算数字频率
    const digitCount: Record<number, number> = {}
    digits.forEach(d => {
      digitCount[d] = (digitCount[d] || 0) + 1
    })

    // 计算特殊组合
    const specialPatterns = []
    
    // 三连号
    for (let i = 0; i < 9; i++) {
      if (digits[i] === digits[i+1] && digits[i+1] === digits[i+2]) {
        specialPatterns.push(`三连号 ${digits[i]}${digits[i+1]}${digits[i+2]}`)
      }
    }

    // 步步高
    for (let i = 0; i < 9; i++) {
      if (digits[i+1] === digits[i] + 1 && digits[i+2] === digits[i] + 2) {
        specialPatterns.push(`步步高 ${digits[i]}${digits[i+1]}${digits[i+2]}`)
      }
    }

    // 降序列
    for (let i = 0; i < 9; i++) {
      if (digits[i+1] === digits[i] - 1 && digits[i+2] === digits[i] - 2) {
        specialPatterns.push(`降序列 ${digits[i]}${digits[i+1]}${digits[i+2]}`)
      }
    }

    // 尾号分析
    const tailDigits = digits.slice(-4)
    const tailSum = tailDigits.reduce((a, b) => a + b, 0)
    const tailLuck = tailSum % 9 || 9

    // 计算评分
    let score = 60
    const maxWuxing = Object.entries(wuxingCount).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    const dominantWuxing = maxWuxing
    
    // 五行均衡加分
    const maxCount = Math.max(...Object.values(wuxingCount))
    if (maxCount <= 3) score += 20
    else if (maxCount <= 4) score += 10

    // 特殊组合加分
    score += specialPatterns.length * 5

    // 尾号吉祥加分
    if ([1, 3, 6, 8, 9].includes(tailLuck)) score += 10

    score = Math.min(100, score)

    setAnalysis({
      phoneNumber,
      wuxingCount,
      dominantWuxing,
      digitCount,
      specialPatterns,
      tailDigits: tailDigits.join(''),
      tailSum,
      tailLuck,
      score,
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-amber-400"
    return "text-red-400"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "from-green-900/40 to-green-950/60 border-green-800/30"
    if (score >= 60) return "from-amber-900/40 to-amber-950/60 border-amber-800/30"
    return "from-red-900/40 to-red-950/60 border-red-800/30"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-indigo-400">手机号分析</h1>
            <p className="text-xs text-indigo-200/60">数字能量 · 五行数理</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-950/60 rounded-xl p-4 border border-indigo-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-indigo-200/80 mb-2 block">手机号码</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                placeholder="请输入11位手机号码"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <button
              onClick={analyzePhone}
              disabled={phoneNumber.length !== 11}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              分析号码
            </button>
          </div>
        </div>

        {analysis && (
          <div className="space-y-4">
            <div className={`bg-gradient-to-br ${getScoreBg(analysis.score)} rounded-xl p-5 border`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{analysis.phoneNumber}</div>
                <div className="text-sm text-gray-400">手机号码分析</div>
                <div className="mt-3">
                  <span className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>
                    {analysis.score}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">分</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-indigo-400 mb-4">五行分布</h3>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(analysis.wuxingCount).map(([wuxing, count]) => (
                  <div key={wuxing} className="text-center p-3 bg-white/5 rounded-lg">
                    <div className={`text-xl font-bold ${WUXING_COLORS[wuxing]}`}>{count}</div>
                    <div className="text-sm text-white">{wuxing}</div>
                    <div className="text-xs text-gray-500">个</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-gray-400">
                  主导五行：<span className={WUXING_COLORS[analysis.dominantWuxing]}>{analysis.dominantWuxing}</span>
                  · {WUXING_DESCRIPTION[analysis.dominantWuxing]}
                </span>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-indigo-400 mb-4">数字频率</h3>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(analysis.digitCount).map(([digit, count]) => (
                  <div key={digit} className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-white">{digit}</div>
                    <div className="text-xs text-gray-400">出现{count}次</div>
                  </div>
                ))}
              </div>
            </div>

            {analysis.specialPatterns.length > 0 && (
              <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">特殊组合</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.specialPatterns.map((pattern: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-amber-800/30 rounded-full text-sm text-amber-200">
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-indigo-400 mb-4">尾号分析</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">尾四位</div>
                  <div className="text-xl font-bold text-white">{analysis.tailDigits}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">尾号和</div>
                  <div className="text-xl font-bold text-white">{analysis.tailSum}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">吉凶数</div>
                  <div className={`text-xl font-bold ${[1, 3, 6, 8, 9].includes(analysis.tailLuck) ? 'text-green-400' : 'text-amber-400'}`}>
                    {analysis.tailLuck}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-medium text-purple-400 mb-3">数字含义</h3>
              <div className="space-y-2">
                {Object.entries(NUMBER_MEANING).map(([num, data]) => (
                  <div key={num} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white w-6">{num}</span>
                      <span className="text-sm text-purple-300">{data.meaning}</span>
                    </div>
                    <span className="text-xs text-gray-400">{data.trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <h3 className="text-sm font-medium text-amber-400 mb-3">理论依据</h3>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            数字能量学源于易经数理，认为每个数字都具有特定的能量和含义。手机号码作为一种数字组合，
            其数理特征会对使用者产生潜移默化的影响。通过分析号码中的五行分布、数字频率和特殊组合，
            可以了解号码的能量特征和潜在影响。数字1-9分别对应不同的五行属性，其中1、6属水，2、7属火，
            3、8属木，4、9属金，5、0属土。
          </p>
        </div>
      </main>
    </div>
  )
}