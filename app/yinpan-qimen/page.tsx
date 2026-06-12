"use client"

import { useState } from "react"
import { Moon, Sparkles, Grid3X3, Info } from "lucide-react"
import {
  TIAN_GAN, DI_ZHI, JIU_GONG, BA_MEN, JIU_XING, BA_SHEN,
  SAN_QI_LIU_YI, JIE_QI_DUN, getDayGanZhi, getJieQi
} from "@/lib/qimen-data"

export default function YinpanQimenPage() {
  const [queryDate, setQueryDate] = useState("")
  const [queryTime, setQueryTime] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateYinpan = () => {
    if (!queryDate || !queryTime) {
      alert("请输入日期和时间")
      return
    }

    const [year, month, day] = queryDate.split('-').map(Number)
    const [hour, minute] = queryTime.split(':').map(Number)
    const date = new Date(year, month - 1, day, hour, minute)

    const dayGanZhi = getDayGanZhi(date)
    const dayGan = dayGanZhi.gan
    const dayZhi = dayGanZhi.zhi

    const jieQi = getJieQi(date)
    const dunInfo = JIE_QI_DUN[jieQi] || { dun: "阴", start: 9 }

    // 阴盘算法：以日柱定局，阴遁顺推
    const dayGanIndex = TIAN_GAN.indexOf(dayGan)
    const dayZhiIndex = DI_ZHI.indexOf(dayZhi)
    const baseJu = ((dayGanIndex + dayZhiIndex) % 9) + 1

    const dunType = dunInfo.dun === "阴" ? "阴遁" : "阳遁"
    const juNumber = dunType === "阴遁" ? ((dunInfo.start + baseJu - 1) % 9) + 1 : baseJu

    const hourZhiIndex = Math.floor(hour / 2) % 12
    const hourZhi = DI_ZHI[hourZhiIndex]

    // 阴盘排盘：不同于阳盘的顺逆顺序
    const palaces = JIU_GONG.map((gong, idx) => {
      const reverseIdx = dunType === "阴遁" ? (8 - idx) % 9 : idx
      const qiYiIndex = (reverseIdx + juNumber) % 9
      const menIndex = (reverseIdx + hourZhiIndex) % 8
      const xingIndex = (reverseIdx + juNumber + 2) % 9
      const shenIndex = (reverseIdx + hourZhiIndex + 2) % 8

      return {
        ...gong,
        qiYi: SAN_QI_LIU_YI[qiYiIndex],
        men: BA_MEN[menIndex],
        xing: JIU_XING[xingIndex],
        shen: BA_SHEN[shenIndex],
        isKey: idx === 0 || idx === 4 || idx === 8,
      }
    })

    // 格局分析
    const patterns = analyzeYinpanPatterns(palaces, dayGan, dayZhi)

    setResult({
      dunType, juNumber, jieQi,
      dayGan, dayZhi, hourZhi,
      palaces, patterns,
    })
  }

  const analyzeYinpanPatterns = (palaces: any[], dayGan: string, dayZhi: string) => {
    const patterns: { name: string; type: string; desc: string }[] = []

    // 三奇入墓
    palaces.forEach(p => {
      if (p.qiYi === "乙" && p.number === 6) patterns.push({ name: "乙奇入墓", type: "凶格", desc: "贵人受阻，事多不顺" })
      if (p.qiYi === "丙" && p.number === 8) patterns.push({ name: "丙奇入墓", type: "凶格", desc: "权威受损，注意小人" })
      if (p.qiYi === "丁" && p.number === 8) patterns.push({ name: "丁奇入墓", type: "凶格", desc: "文书有误，需谨慎" })
    })

    // 玉女守门
    if (palaces.some(p => p.qiYi === "丁" && p.men?.name === "生门")) {
      patterns.push({ name: "玉女守门", type: "吉格", desc: "财运亨通，事业顺利" })
    }

    // 三奇得使
    if (palaces.some(p => p.qiYi === "乙" && p.men?.nature === "吉")) {
      patterns.push({ name: "乙奇得使", type: "吉格", desc: "贵人相助，诸事通达" })
    }

    // 五不遇时
    if (palaces.some(p => p.shen?.name === "白虎" && p.men?.nature === "凶")) {
      patterns.push({ name: "白虎临门", type: "凶格", desc: "谨慎行事，防口舌是非" })
    }

    if (patterns.length === 0) {
      patterns.push({ name: "平局", type: "平格", desc: "无特殊格局，需结合具体事项分析" })
    }

    return patterns
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
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center">
            <Moon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-indigo-400">阴盘奇门</h1>
            <p className="text-xs text-indigo-200/60">阴盘奇门 · 遁甲玄机</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-950/60 rounded-xl p-4 border border-indigo-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-indigo-200/80 mb-2 block">日期</label>
              <input
                type="date"
                value={queryDate}
                onChange={(e) => setQueryDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
            <div>
              <label className="text-sm text-indigo-200/80 mb-2 block">时间</label>
              <input
                type="time"
                value={queryTime}
                onChange={(e) => setQueryTime(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
            <button
              onClick={calculateYinpan}
              disabled={!queryDate || !queryTime}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              阴盘排盘
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-950/60 rounded-xl p-4 border border-indigo-800/30">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="text-xs text-gray-400">遁局</div>
                  <div className="text-xl font-bold text-indigo-400">{result.dunType}{result.juNumber}局</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="text-xs text-gray-400">节气</div>
                  <div className="text-xl font-bold text-indigo-400">{result.jieQi}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="text-xs text-gray-400">时辰</div>
                  <div className="text-xl font-bold text-white">{result.dayGan}{result.dayZhi}日 {result.hourZhi}时</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-indigo-400 mb-4 flex items-center gap-2">
                <Grid3X3 className="w-4 h-4" />
                九宫排盘
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {result.palaces.map((palace: any, idx: number) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-3 text-center ${
                      palace.isKey ? "bg-indigo-900/30 border border-indigo-700/30" : "bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">#{palace.number}</span>
                      <span className="text-xl">{palace.symbol}</span>
                    </div>
                    <div className="text-sm font-bold text-white mb-1">{palace.name}</div>
                    <div className="text-xs text-gray-400 mb-2">{palace.wuxing}</div>
                    <div className="space-y-1">
                      <div className="text-xs bg-white/10 rounded px-1 py-0.5">
                        <span className="text-gray-400">六仪：</span>
                        <span className="text-indigo-300">{palace.qiYi}</span>
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

            <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-950/50 rounded-xl p-4 border border-indigo-800/30">
              <h3 className="text-sm font-medium text-indigo-400 mb-3">格局分析</h3>
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

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">阴盘奇门简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            阴盘奇门是奇门遁甲的一个重要分支，与阳盘奇门相对。阴盘以阴遁为主，
            起局方法与阳盘略有不同，注重阴遁顺推、顺逆有别。阴盘奇门出自
            《奇门遁甲大全》《奇门遁甲统宗大全》等古籍，以年月日时起局，
            注重时空信息，九宫八卦，以阴阳二遁为基，九星八门八神配局，
            可断吉凶祸福，运筹帷幄。本系统基于古籍算法实现，仅供参考。
          </p>
        </div>
      </main>
    </div>
  )
}