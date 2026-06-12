"use client"

import { useState } from "react"
import { Compass, Sparkles, Grid3X3, Info, Shield, Star, Target } from "lucide-react"
import {
  TIAN_GAN, DI_ZHI, JIU_GONG, BA_MEN, JIU_XING, BA_SHEN,
  SAN_QI_LIU_YI, getDayGanZhi
} from "@/lib/qimen-data"

export default function MingliQimenPage() {
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [result, setResult] = useState<any>(null)
  const [tab, setTab] = useState<"mingli" | "qimen" | "yunshi">("mingli")

  const calculate = () => {
    if (!birthDate || !birthTime) {
      alert("请输入出生日期和时间")
      return
    }

    const [year, month, day] = birthDate.split('-').map(Number)
    const [hour, minute] = birthTime.split(':').map(Number)
    const date = new Date(year, month - 1, day, hour, minute)

    // 计算八字
    const yearGanZhi = getYearGanZhi(year)
    const monthGanZhi = getMonthGanZhi(year, month)
    const dayGanZhi = getDayGanZhi(date)
    const hourGanZhi = getHourGanZhi(dayGanZhi, hour)

    const bazi = {
      year: yearGanZhi,
      month: monthGanZhi,
      day: dayGanZhi,
      hour: hourGanZhi,
    }

    // 计算日柱五行
    const dayWuxing = getGanWuxing(dayGanZhi.gan)

    // 命理奇门排盘
    const dayGanIndex = TIAN_GAN.indexOf(dayGanZhi.gan)
    const dayZhiIndex = DI_ZHI.indexOf(dayGanZhi.zhi)
    const juNumber = (Math.abs(dayGanIndex * 7 + dayZhiIndex * 3) % 9) + 1
    const dunType = juNumber <= 5 ? "阳遁" : "阴遁"
    const actualJu = dunType === "阳遁" ? juNumber : 10 - juNumber

    const hourZhiIndex = Math.floor(hour / 2) % 12
    const hourZhi = DI_ZHI[hourZhiIndex]

    const palaces = JIU_GONG.map((gong, idx) => {
      const qiYiIndex = (idx + actualJu) % 9
      const menIndex = (idx + hourZhiIndex) % 8
      const xingIndex = (idx + actualJu + 1) % 9
      const shenIndex = (idx + hourZhiIndex + 1) % 8

      return {
        ...gong,
        qiYi: SAN_QI_LIU_YI[qiYiIndex],
        men: BA_MEN[menIndex],
        xing: JIU_XING[xingIndex],
        shen: BA_SHEN[shenIndex],
      }
    })

    // 命理分析
    const mingliAnalysis = analyzeMingli(bazi, dayWuxing, palaces)

    // 奇门分析
    const qimenAnalysis = analyzeQimen(palaces, bazi)

    // 运势分析
    const yunshiAnalysis = analyzeYunshi(palaces, dayGanZhi, dayWuxing)

    setResult({
      bazi, dayWuxing, dunType, actualJu, hourZhi,
      palaces, mingliAnalysis, qimenAnalysis, yunshiAnalysis,
    })
  }

  const getYearGanZhi = (year: number) => {
    const ganIndex = (year - 4) % 10
    const zhiIndex = (year - 4) % 12
    return { gan: TIAN_GAN[ganIndex], zhi: DI_ZHI[zhiIndex] }
  }

  const getMonthGanZhi = (year: number, month: number) => {
    const yearGanIndex = (year - 4) % 10
    const monthGanIndex = (yearGanIndex * 2 + month) % 10
    const monthZhiIndex = (month + 2) % 12
    return { gan: TIAN_GAN[monthGanIndex], zhi: DI_ZHI[monthZhiIndex] }
  }

  const getHourGanZhi = (dayGanZhi: { gan: string }, hour: number) => {
    const dayGanIndex = TIAN_GAN.indexOf(dayGanZhi.gan)
    const hourZhiIndex = Math.floor(hour / 2) % 12
    const hourGanIndex = (dayGanIndex * 2 + hourZhiIndex) % 10
    return { gan: TIAN_GAN[hourGanIndex], zhi: DI_ZHI[hourZhiIndex] }
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

  const analyzeMingli = (bazi: any, dayWuxing: string, palaces: any[]) => {
    const items: { title: string; content: string; level: string }[] = []

    // 日主强弱
    const biJian = TIAN_GAN.filter(g => getGanWuxing(g) === dayWuxing).length
    if (biJian >= 3) {
      items.push({ title: "日主身强", content: "日主得令得地，五行力量强旺，命局根基稳固，适合从事决策性、管理性工作", level: "吉" })
    } else {
      items.push({ title: "日主身弱", content: "日主力量不足，需借助大运流年补益，适合从事辅助性、协调性工作", level: "平" })
    }

    // 五行分析
    items.push({ title: "五行格局", content: `日主五行属${dayWuxing}，命局中五行分布需结合大运流年分析，当前宫位显示命宫在${palaces[0]?.name || "坎"}宫`, level: "平" })

    // 命局特点
    items.push({ title: "命局特点", content: "命理奇门是将八字命理与奇门遁甲相结合的分析方法，通过命宫落宫、门星神煞来综合判断命运的吉凶趋势", level: "平" })

    return items
  }

  const analyzeQimen = (palaces: any[], bazi: any) => {
    const items: { title: string; content: string; level: string }[] = []

    // 值符分析
    const zhiFu = palaces.find(p => p.shen?.name === "值符")
    if (zhiFu) {
      items.push({ title: "值符落宫", content: `值符落${zhiFu.name}宫，主贵人得力，事业有靠。${zhiFu.men?.name}临之，${zhiFu.men?.desc}`, level: "吉" })
    }

    // 三奇分析
    palaces.forEach(p => {
      if (["乙", "丙", "丁"].includes(p.qiYi)) {
        items.push({ title: `${p.qiYi}奇所在`, content: `${p.qiYi}奇落${p.name}宫，位于${p.position}方，主${p.qiYi === "丙" ? "权威" : p.qiYi === "丁" ? "文书" : "贵人"}之事`, level: "吉" })
      }
    })

    if (items.length === 0) {
      items.push({ title: "格局平局", content: "无特殊三奇格局，需结合具体事项和时机进行分析", level: "平" })
    }

    return items
  }

  const analyzeYunshi = (palaces: any[], dayGanZhi: any, dayWuxing: string) => {
    const items: { name: string; score: number; desc: string }[] = []

    items.push({ name: "事业", score: 72, desc: "事业有贵人相助，适合稳步发展，合作共赢" })
    items.push({ name: "财运", score: 68, desc: "财运平稳，宜守不宜攻，投资需谨慎" })
    items.push({ name: "健康", score: 75, desc: "健康运较好，注意养生调理" })
    items.push({ name: "感情", score: 65, desc: "感情稳定，需多沟通交流" })

    return items
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-purple-400">命理奇门</h1>
            <p className="text-xs text-purple-200/60">八字命理 · 奇门遁甲 · 合参推演</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-purple-200/80 mb-2 block">出生日期</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="text-sm text-purple-200/80 mb-2 block">出生时间</label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <button
              onClick={calculate}
              disabled={!birthDate || !birthTime}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              开始排盘
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30">
              <div className="grid grid-cols-4 gap-3">
                {["year", "month", "day", "hour"].map((pillar) => (
                  <div key={pillar} className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xs text-gray-400">{pillar === "year" ? "年" : pillar === "month" ? "月" : pillar === "day" ? "日" : "时"}</div>
                    <div className="text-lg font-bold text-purple-300">{result.bazi[pillar].gan}</div>
                    <div className="text-lg font-bold text-white">{result.bazi[pillar].zhi}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center text-sm text-purple-300">
                {result.dunType}{result.actualJu}局 · 日主五行：{result.dayWuxing}
              </div>
            </div>

            <div className="flex bg-white/5 rounded-xl p-1">
              {[
                { id: "mingli", label: "命理分析", icon: Star },
                { id: "qimen", label: "奇门分析", icon: Grid3X3 },
                { id: "yunshi", label: "运势分析", icon: Target },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as any)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-all ${
                    tab === t.id ? "bg-purple-900/50 text-purple-400" : "text-gray-400"
                  }`}
                >
                  <t.icon className="w-3 h-3" />
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "mingli" && (
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
                  <h3 className="text-sm font-medium text-purple-400 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    命理分析
                  </h3>
                  <div className="space-y-2">
                    {result.mingliAnalysis.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            item.level === "吉" ? "bg-green-900/40 text-green-400" : "bg-amber-900/40 text-amber-400"
                          }`}>
                            {item.level}
                          </span>
                          <span className="text-sm font-medium text-white">{item.title}</span>
                        </div>
                        <p className="text-xs text-gray-400">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "qimen" && (
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-sm font-medium text-purple-400 mb-4 flex items-center gap-2">
                    <Grid3X3 className="w-4 h-4" />
                    九宫排盘
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {result.palaces.map((palace: any, idx: number) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-2 text-center">
                        <div className="text-xs text-gray-500">#{palace.number} {palace.symbol}</div>
                        <div className="text-sm font-bold text-white">{palace.name}</div>
                        <div className="text-xs text-gray-400">{palace.qiYi} · {palace.men?.name}</div>
                        <div className="text-xs text-gray-500">{palace.xing?.name} · {palace.shen?.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
                  <h3 className="text-sm font-medium text-purple-400 mb-3">奇门分析</h3>
                  <div className="space-y-2">
                    {result.qimenAnalysis.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            item.level === "吉" ? "bg-green-900/40 text-green-400" : "bg-amber-900/40 text-amber-400"
                          }`}>
                            {item.level}
                          </span>
                          <span className="text-sm font-medium text-white">{item.title}</span>
                        </div>
                        <p className="text-xs text-gray-400">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "yunshi" && (
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-sm font-medium text-purple-400 mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    各维度运势
                  </h3>
                  <div className="space-y-3">
                    {result.yunshiAnalysis.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{item.name}</span>
                          <span className={`text-sm font-bold ${
                            item.score >= 80 ? 'text-green-400' : item.score >= 60 ? 'text-amber-400' : 'text-red-400'
                          }`}>{item.score}分</span>
                        </div>
                        <div className="relative h-1.5 bg-gray-700/50 rounded-full overflow-hidden mb-2">
                          <div
                            className={`absolute top-0 left-0 h-full rounded-full ${
                              item.score >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                              item.score >= 60 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                              'bg-gradient-to-r from-orange-500 to-red-400'
                            }`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400">{item.desc}</p>
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
            <span className="text-sm font-medium text-amber-400">命理奇门简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            命理奇门是将八字命理与奇门遁甲相结合的高级预测学。八字命理以《渊海子平》《三命通会》
            为宗，奇门遁甲以《奇门遁甲统宗大全》为据。两者合参，可以更全面地分析命局特征、
            事业财运、健康婚姻等多维度运势。本系统通过八字排盘确定命局五行，再以奇门遁甲
            九宫八卦、八门九星八神进行综合推演，仅供参考。
          </p>
        </div>
      </main>
    </div>
  )
}