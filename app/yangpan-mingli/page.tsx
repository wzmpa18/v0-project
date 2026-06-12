"use client"

import { useState } from "react"
import { Sun, Sparkles, Grid3X3, Info, ChevronDown, ChevronUp } from "lucide-react"
import {
  TIAN_GAN, DI_ZHI, JIU_GONG, BA_MEN, JIU_XING, BA_SHEN,
  SAN_QI_LIU_YI, JIE_QI_DUN, JIE_QI_DATES, getDayGanZhi, getJieQi,
  QIMEN_GEJU
} from "@/lib/qimen-data"

export default function YangpanMingliPage() {
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [result, setResult] = useState<any>(null)
  const [analysisTab, setAnalysisTab] = useState<"palace" | "life" | "fortune">("palace")

  const calculateYangpan = () => {
    if (!birthDate || !birthTime) {
      alert("请输入出生日期和时间")
      return
    }

    const [year, month, day] = birthDate.split('-').map(Number)
    const [hour, minute] = birthTime.split(':').map(Number)
    const date = new Date(year, month - 1, day, hour, minute)

    // 计算日干支
    const dayGanZhi = getDayGanZhi(date)
    const dayGan = dayGanZhi.gan
    const dayZhi = dayGanZhi.zhi

    // 计算节气
    const jieQi = getJieQi(date)
    const dunInfo = JIE_QI_DUN[jieQi] || { dun: "阳", start: 1 }

    // 计算时辰符头
    const hourZhiIndex = Math.floor(hour / 2) % 12
    const hourZhi = DI_ZHI[hourZhiIndex]

    // 阳盘用日柱定局数
    const dayGanIndex = TIAN_GAN.indexOf(dayGan)
    const dayZhiIndex = DI_ZHI.indexOf(dayZhi)
    const baseJu = Math.abs((dayGanIndex * 12 + dayZhiIndex) % 9) + 1

    // 阳盘排盘
    const dunType = dunInfo.dun === "阳" ? "阳遁" : "阴遁"
    const juNumber = ((baseJu + dunInfo.start - 1) % 9) + 1

    // 值符值使
    const timeGanIndex = (dayGanIndex * 2 + hourZhiIndex) % 10
    const timeGan = TIAN_GAN[timeGanIndex]

    // 生成九宫排盘
    const palaces = JIU_GONG.map((gong, idx) => {
      const qiYiIndex = (idx + juNumber) % 9
      const menIndex = (idx + hourZhiIndex) % 8
      const xingIndex = (idx + juNumber + 1) % 9
      const shenIndex = (idx + hourZhiIndex + 1) % 8

      return {
        ...gong,
        qiYi: SAN_QI_LIU_YI[qiYiIndex],
        men: BA_MEN[menIndex],
        xing: JIU_XING[xingIndex],
        shen: BA_SHEN[shenIndex],
        isKey: idx === 0 || idx === 4 || idx === 8,
      }
    })

    // 命宫分析
    const lifePalace = palaces[dayZhiIndex % 9]
    const timePalace = palaces[hourZhiIndex % 9]

    // 格局分析
    const patterns = analyzePatterns(palaces, lifePalace, timePalace, dayGan, timeGan)

    // 运势分析
    const fortune = analyzeFortune(palaces, lifePalace, dayGan, dayZhi, juNumber)

    setResult({
      birthDate, birthTime,
      dunType, juNumber,
      dayGan, dayZhi, timeGan, hourZhi,
      palaces,
      lifePalace, timePalace,
      patterns,
      fortune,
      jieQi,
    })
  }

  const analyzePatterns = (palaces: any[], lifePalace: any, timePalace: any, dayGan: string, timeGan: string) => {
    const patterns: { name: string; type: string; desc: string }[] = []

    // 青龙返首
    if (palaces.some(p => p.qiYi === "戊" && p.men?.nature === "吉")) {
      patterns.push({ name: "青龙返首", type: "吉格", desc: "贵人相助，事业有成，宜求财、求官" })
    }

    // 飞鸟跌穴
    if (palaces.some(p => p.qiYi === "丙" && p.men?.nature === "吉")) {
      patterns.push({ name: "飞鸟跌穴", type: "吉格", desc: "百事顺遂，万事如意，出行大利" })
    }

    // 三奇得使
    const sanQi = ["乙", "丙", "丁"]
    sanQi.forEach(qi => {
      if (palaces.some(p => p.qiYi === qi && p.men?.nature === "吉")) {
        patterns.push({ name: `${qi}奇得使`, type: "吉格", desc: "贵人相助，诸事通达，适合求财问事" })
      }
    })

    // 玉女守门
    if (palaces.some(p => p.qiYi === "丁" && p.men?.name === "开门")) {
      patterns.push({ name: "玉女守门", type: "吉格", desc: "财源广进，婚姻美满，百事亨通" })
    }

    // 天遁
    if (palaces.some(p => p.qiYi === "丙" && p.men?.name === "生门")) {
      patterns.push({ name: "天遁", type: "吉格", desc: "事业通达，升迁有期，遇难成祥" })
    }

    // 人遁
    if (palaces.some(p => p.qiYi === "丁" && p.men?.name === "休门")) {
      patterns.push({ name: "人遁", type: "吉格", desc: "人际关系良好，贵人相助，合作顺利" })
    }

    // 地遁
    if (palaces.some(p => p.qiYi === "乙" && p.men?.name === "开门")) {
      patterns.push({ name: "地遁", type: "吉格", desc: "根基稳固，财运亨通，事业有成" })
    }

    // 日时相生
    const dayWuxing = getGanWuxing(dayGan)
    const timeWuxing = getGanWuxing(timeGan)
    if (isSheng(dayWuxing, timeWuxing)) {
      patterns.push({ name: "日时相生", type: "吉格", desc: "自身与时机相合，做事情容易成功" })
    } else if (isKe(dayWuxing, timeWuxing)) {
      patterns.push({ name: "日时相克", type: "凶格", desc: "自身与时机不合，需谨慎行事" })
    }

    if (patterns.length === 0) {
      patterns.push({ name: "平局", type: "平格", desc: "无特殊格局，需结合具体事项分析" })
    }

    return patterns
  }

  const analyzeFortune = (palaces: any[], lifePalace: any, dayGan: string, dayZhi: string, juNumber: number) => {
    const dayWuxing = getGanWuxing(dayGan)
    const lifeWuxing = lifePalace?.wuxing || "土"

    let overallScore = 60
    const aspects: { name: string; score: number; desc: string }[] = []

    // 事业运
    if (isSheng(lifeWuxing, dayWuxing) || lifeWuxing === dayWuxing) {
      aspects.push({ name: "事业运", score: 80, desc: "事业根基稳固，适合发挥专长，创业或升职均有成功机会" })
      overallScore += 10
    } else {
      aspects.push({ name: "事业运", score: 50, desc: "事业需稳扎稳打，不宜冒进，多积累经验" })
    }

    // 财运
    const caiMen = palaces.find(p => p.men?.name === "生门")
    if (caiMen?.men?.nature === "吉") {
      aspects.push({ name: "财运", score: 75, desc: "财运亨通，适合投资理财，但需谨慎选择" })
      overallScore += 10
    } else {
      aspects.push({ name: "财运", score: 50, desc: "财运平稳，宜守不宜攻，中正平和" })
    }

    // 健康运
    if (lifePalace?.men?.nature === "吉") {
      aspects.push({ name: "健康运", score: 80, desc: "体质较好，注意日常保养，可保持健康" })
      overallScore += 5
    } else {
      aspects.push({ name: "健康运", score: 60, desc: "需注意养生，关注身体变化，预防为主" })
    }

    // 感情运
    aspects.push({ name: "感情运", score: 65, desc: "感情稳定，单身者有机会遇到合适对象，已婚者需注意沟通" })

    overallScore = Math.min(100, Math.max(30, overallScore))

    return { overallScore, aspects }
  }

  const getGanWuxing = (gan: string) => {
    const map: Record<string, string> = {
      "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土",
      "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水"
    }
    return map[gan] || "土"
  }

  const isSheng = (w1: string, w2: string) => {
    const sheng: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" }
    return sheng[w1] === w2
  }

  const isKe = (w1: string, w2: string) => {
    const ke: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" }
    return ke[w1] === w2
  }

  const getNatureColor = (nature: string) => {
    if (nature === "吉") return "text-green-400"
    if (nature === "凶") return "text-red-400"
    return "text-amber-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-orange-400">阳盘命理</h1>
            <p className="text-xs text-orange-200/60">阳盘奇门 · 命理推演</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-orange-900/40 to-orange-950/60 rounded-xl p-4 border border-orange-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-orange-200/80 mb-2 block">出生日期</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            <div>
              <label className="text-sm text-orange-200/80 mb-2 block">出生时间</label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            <button
              onClick={calculateYangpan}
              disabled={!birthDate || !birthTime}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              阳盘排盘
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-900/40 to-orange-950/60 rounded-xl p-4 border border-orange-800/30">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400">遁局</div>
                  <div className="text-xl font-bold text-orange-400">{result.dunType}{result.juNumber}局</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400">节气</div>
                  <div className="text-xl font-bold text-orange-400">{result.jieQi}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400">日干</div>
                  <div className="text-xl font-bold text-white">{result.dayGan}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400">时干</div>
                  <div className="text-xl font-bold text-white">{result.timeGan}</div>
                </div>
              </div>
            </div>

            <div className="flex bg-white/5 rounded-xl p-1 mb-4">
              {[
                { id: "palace", label: "九宫排盘" },
                { id: "life", label: "命宫分析" },
                { id: "fortune", label: "运势分析" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAnalysisTab(tab.id as any)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    analysisTab === tab.id ? "bg-orange-900/50 text-orange-400" : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {analysisTab === "palace" && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-sm font-medium text-orange-400 mb-4">
                  <Grid3X3 className="w-4 h-4 inline mr-1" />
                  九宫排盘
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {result.palaces.map((palace: any, idx: number) => (
                    <div
                      key={idx}
                      className={`rounded-xl p-3 text-center ${
                        palace.isKey ? "bg-orange-900/30 border border-orange-700/30" : "bg-white/5"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">#{palace.number}</span>
                        <span className="text-xl">{palace.symbol}</span>
                      </div>
                      <div className="text-sm font-bold text-white mb-1">{palace.name}</div>
                      <div className="text-xs text-gray-400 mb-2">{palace.wuxing} · {palace.position}</div>
                      <div className="space-y-1">
                        <div className="text-xs bg-white/10 rounded px-1 py-0.5">
                          <span className="text-gray-400">六仪：</span>
                          <span className="text-orange-300">{palace.qiYi}</span>
                        </div>
                        <div className="text-xs bg-white/10 rounded px-1 py-0.5">
                          <span className="text-gray-400">门：</span>
                          <span className={getNatureColor(palace.men?.nature)}>{palace.men?.name}</span>
                        </div>
                        <div className="text-xs bg-white/10 rounded px-1 py-0.5">
                          <span className="text-gray-400">星：</span>
                          <span className={getNatureColor(palace.xing?.nature)}>{palace.xing?.name}</span>
                        </div>
                        <div className="text-xs bg-white/10 rounded px-1 py-0.5">
                          <span className="text-gray-400">神：</span>
                          <span className={getNatureColor(palace.shen?.nature)}>{palace.shen?.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysisTab === "life" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-900/40 to-orange-950/60 rounded-xl p-4 border border-orange-800/30">
                  <h3 className="text-sm font-medium text-orange-400 mb-4">命宫分析</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 rounded-lg text-center">
                      <div className="text-xs text-gray-400 mb-1">命宫</div>
                      <div className="text-xl">{result.lifePalace?.symbol}</div>
                      <div className="text-lg font-bold text-white">{result.lifePalace?.name}</div>
                      <div className="text-sm text-orange-300">{result.lifePalace?.wuxing}</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg text-center">
                      <div className="text-xs text-gray-400 mb-1">时宫</div>
                      <div className="text-xl">{result.timePalace?.symbol}</div>
                      <div className="text-lg font-bold text-white">{result.timePalace?.name}</div>
                      <div className="text-sm text-orange-300">{result.timePalace?.wuxing}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
                  <h3 className="text-sm font-medium text-purple-400 mb-3">格局分析</h3>
                  <div className="space-y-2">
                    {result.patterns.map((pattern: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg">
                        <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                          pattern.type === "吉格" ? "bg-green-900/40 text-green-400" :
                          pattern.type === "凶格" ? "bg-red-900/40 text-red-400" :
                          "bg-amber-900/40 text-amber-400"
                        }`}>
                          {pattern.type}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{pattern.name}</div>
                          <div className="text-xs text-gray-400 mt-1">{pattern.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {analysisTab === "fortune" && (
              <div className="space-y-4">
                <div className={`bg-gradient-to-br ${
                  result.fortune.overallScore >= 80 ? 'from-green-900/40 to-green-950/60 border-green-800/30' :
                  result.fortune.overallScore >= 60 ? 'from-amber-900/40 to-amber-950/60 border-amber-800/30' :
                  'from-red-900/40 to-red-950/60 border-red-800/30'
                } rounded-xl p-5 border text-center`}>
                  <div className="text-sm text-gray-400 mb-1">综合运势</div>
                  <div className={`text-5xl font-bold ${
                    result.fortune.overallScore >= 80 ? 'text-green-400' :
                    result.fortune.overallScore >= 60 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {result.fortune.overallScore}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">分</div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-sm font-medium text-orange-400 mb-4">各维度运势</h3>
                  <div className="space-y-3">
                    {result.fortune.aspects.map((aspect: any, idx: number) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{aspect.name}</span>
                          <span className={`text-sm font-bold ${
                            aspect.score >= 80 ? 'text-green-400' :
                            aspect.score >= 60 ? 'text-amber-400' : 'text-red-400'
                          }`}>
                            {aspect.score}分
                          </span>
                        </div>
                        <div className="relative h-1.5 bg-gray-700/50 rounded-full overflow-hidden mb-2">
                          <div
                            className={`absolute top-0 left-0 h-full rounded-full ${
                              aspect.score >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                              aspect.score >= 60 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                              'bg-gradient-to-r from-orange-500 to-red-400'
                            }`}
                            style={{ width: `${aspect.score}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400">{aspect.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">阳盘命理简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            阳盘命理是奇门遁甲的一个重要分支，采用阳遁排盘方法，结合命理学原理，
            分析个人的命局格局和运势走向。阳盘起局以节气为基础，以日柱定局数，
            以时辰排盘，通过九宫八卦、八门九星八神的分布，推演人生运势。
            本系统基于《奇门遁甲统宗大全》《奇门遁甲秘笈大全》等古籍算法，
            仅供参考，不可轻信。
          </p>
        </div>
      </main>
    </div>
  )
}