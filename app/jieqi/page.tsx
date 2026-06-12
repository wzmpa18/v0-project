"use client"

import { useState, useEffect } from "react"
import { Calendar, Sun, CloudRain, Snowflake, Wind, Leaf, Info } from "lucide-react"

const JIE_QI = [
  { name: "立春", solarTerm: "lichun", date: "02-04", season: "spring", description: "春季开始，万物复苏", health: "养肝护肝，适当运动" },
  { name: "雨水", solarTerm: "yushui", date: "02-19", season: "spring", description: "降雨增多，滋润万物", health: "健脾祛湿，注意保暖" },
  { name: "惊蛰", solarTerm: "jingzhe", date: "03-06", season: "spring", description: "春雷惊醒，蛰虫活动", health: "疏肝理气，清淡饮食" },
  { name: "春分", solarTerm: "chunfen", date: "03-21", season: "spring", description: "昼夜平分，春暖花开", health: "平衡阴阳，户外踏青" },
  { name: "清明", solarTerm: "qingming", date: "04-05", season: "spring", description: "天气晴朗，草木繁茂", health: "养肝清肺，慎食发物" },
  { name: "谷雨", solarTerm: "guyu", date: "04-20", season: "spring", description: "雨生百谷，谷物生长", health: "健脾养胃，祛湿排毒" },
  
  { name: "立夏", solarTerm: "lixia", date: "05-06", season: "summer", description: "夏季开始，气温升高", health: "养心安神，清淡饮食" },
  { name: "小满", solarTerm: "xiaoman", date: "05-21", season: "summer", description: "麦类饱满，雨水增多", health: "清热利湿，防暑降温" },
  { name: "芒种", solarTerm: "mangzhong", date: "06-06", season: "summer", description: "麦类成熟，忙于耕种", health: "清热解暑，益气养阴" },
  { name: "夏至", solarTerm: "xiazhi", date: "06-22", season: "summer", description: "白天最长，阳气最盛", health: "养心防暑，晚睡早起" },
  { name: "小暑", solarTerm: "xiaoshu", date: "07-07", season: "summer", description: "天气炎热，开始伏天", health: "清热泻火，防暑降温" },
  { name: "大暑", solarTerm: "dashu", date: "07-23", season: "summer", description: "一年最热，暴雨频繁", health: "防暑降温，清淡饮食" },
  
  { name: "立秋", solarTerm: "liqiu", date: "08-08", season: "autumn", description: "秋季开始，气温下降", health: "养肺润燥，收敛神气" },
  { name: "处暑", solarTerm: "chushu", date: "08-23", season: "autumn", description: "炎热结束，天气转凉", health: "滋阴润燥，健脾养胃" },
  { name: "白露", solarTerm: "bailu", date: "09-08", season: "autumn", description: "露水变白，天气转凉", health: "润肺生津，早睡早起" },
  { name: "秋分", solarTerm: "qiufen", date: "09-23", season: "autumn", description: "昼夜平分，秋高气爽", health: "养阴润肺，调和阴阳" },
  { name: "寒露", solarTerm: "hanlu", date: "10-08", season: "autumn", description: "露水寒冷，即将结冰", health: "滋阴保暖，适度进补" },
  { name: "霜降", solarTerm: "shuangjiang", date: "10-24", season: "autumn", description: "开始结霜，气温骤降", health: "防寒保暖，温补脾肾" },
  
  { name: "立冬", solarTerm: "lidong", date: "11-08", season: "winter", description: "冬季开始，天气寒冷", health: "养肾防寒，适当进补" },
  { name: "小雪", solarTerm: "xiaoxue", date: "11-22", season: "winter", description: "开始降雪，雪量较小", health: "温补脾肾，防寒保暖" },
  { name: "大雪", solarTerm: "daxue", date: "12-07", season: "winter", description: "降雪增多，天气更冷", health: "保暖御寒，滋补肝肾" },
  { name: "冬至", solarTerm: "dongzhi", date: "12-22", season: "winter", description: "白天最短，阴气最盛", health: "温补阳气，冬至进补" },
  { name: "小寒", solarTerm: "xiaohan", date: "01-06", season: "winter", description: "天气寒冷，即将最冷", health: "防寒保暖，养肾藏精" },
  { name: "大寒", solarTerm: "dahan", date: "01-20", season: "winter", description: "一年最冷，天寒地冻", health: "保暖御寒，固护阳气" },
]

const SEASON_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  spring: { bg: "from-green-900/40 to-green-950/60", text: "text-green-400", border: "border-green-800/30" },
  summer: { bg: "from-red-900/40 to-red-950/60", text: "text-red-400", border: "border-red-800/30" },
  autumn: { bg: "from-amber-900/40 to-amber-950/60", text: "text-amber-400", border: "border-amber-800/30" },
  winter: { bg: "from-blue-900/40 to-blue-950/60", text: "text-blue-400", border: "border-blue-800/30" },
}

const SEASON_NAMES: Record<string, string> = {
  spring: "春季",
  summer: "夏季",
  autumn: "秋季",
  winter: "冬季",
}

export default function JieQiPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedSeason, setSelectedSeason] = useState<string>("all")
  const [selectedJieQi, setSelectedJieQi] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const getCurrentJieQi = () => {
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    
    for (let i = 0; i < JIE_QI.length; i++) {
      const current = JIE_QI[i]
      const next = JIE_QI[(i + 1) % JIE_QI.length]
      
      if (dateStr >= current.date && dateStr < next.date) {
        return current
      }
    }
    return JIE_QI[0]
  }

  const currentJieQi = getCurrentJieQi()

  const filteredJieQi = selectedSeason === "all" 
    ? JIE_QI 
    : JIE_QI.filter(jq => jq.season === selectedSeason)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
  }

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case "spring": return Leaf
      case "summer": return Sun
      case "autumn": return CloudRain
      case "winter": return Snowflake
      default: return Wind
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-teal-400">节气查询</h1>
            <p className="text-xs text-teal-200/60">二十四节气 · 时令养生</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 rounded-xl p-4 border border-blue-800/30 mb-4">
          <div className="text-center">
            <div className="text-sm text-blue-200/70 mb-1">{formatDate(currentDate)}</div>
            <div className="text-xl font-bold text-white mt-2">当前节气</div>
          </div>
        </div>

        {currentJieQi && (
          <div className={`bg-gradient-to-br ${SEASON_COLORS[currentJieQi.season].bg} rounded-xl p-5 border ${SEASON_COLORS[currentJieQi.season].border} mb-4`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  {(() => {
                    const Icon = getSeasonIcon(currentJieQi.season)
                    return <Icon className={`w-6 h-6 ${SEASON_COLORS[currentJieQi.season].text}`} />
                  })()}
                </div>
                <div>
                  <div className="text-sm text-white/70">今日节气</div>
                  <div className="text-2xl font-bold text-white">{currentJieQi.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/70">对应日期</div>
                <div className="text-lg font-bold text-white">{currentJieQi.date}</div>
              </div>
            </div>
            <p className="text-sm text-white/80 mb-3">{currentJieQi.description}</p>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
              <Info className={`w-4 h-4 ${SEASON_COLORS[currentJieQi.season].text}`} />
              <span className="text-sm text-white/80">{currentJieQi.health}</span>
            </div>
          </div>
        )}

        <div className="flex bg-white/5 rounded-xl p-1 mb-4">
          <button
            onClick={() => setSelectedSeason("all")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedSeason === "all" ? "bg-teal-900/50 text-teal-400" : "text-gray-400"
            }`}
          >
            全部
          </button>
          {Object.entries(SEASON_NAMES).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setSelectedSeason(key)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedSeason === key ? `${SEASON_COLORS[key].bg.replace('/40', '').replace('/60', '')} ${SEASON_COLORS[key].text}` : "text-gray-400"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="grid grid-cols-3 gap-2">
            {filteredJieQi.map((jieQi) => {
              const isCurrent = currentJieQi?.name === jieQi.name
              const isSelected = selectedJieQi === jieQi.name
              const Icon = getSeasonIcon(jieQi.season)
              
              return (
                <button
                  key={jieQi.name}
                  onClick={() => setSelectedJieQi(isSelected ? null : jieQi.name)}
                  className={`relative rounded-xl p-3 transition-all ${
                    isCurrent 
                      ? `bg-gradient-to-br ${SEASON_COLORS[jieQi.season].bg} ring-2 ring-white/50` 
                      : isSelected 
                        ? `bg-gradient-to-br ${SEASON_COLORS[jieQi.season].bg} opacity-70`
                        : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-xs text-white">●</span>
                    </div>
                  )}
                  <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-2 mx-auto`}>
                    <Icon className={`w-4 h-4 ${SEASON_COLORS[jieQi.season].text}`} />
                  </div>
                  <div className="text-sm font-bold text-white text-center">{jieQi.name}</div>
                  <div className="text-xs text-gray-400 text-center">{jieQi.date}</div>
                </button>
              )
            })}
          </div>
        </div>

        {selectedJieQi && (
          <div className={`mt-4 bg-gradient-to-br ${SEASON_COLORS[JIE_QI.find(jq => jq.name === selectedJieQi)?.season || 'spring'].bg} rounded-xl p-4 border ${SEASON_COLORS[JIE_QI.find(jq => jq.name === selectedJieQi)?.season || 'spring'].border}`}>
            {JIE_QI.filter(jq => jq.name === selectedJieQi).map(jq => (
              <div key={jq.name}>
                <div className="flex items-center gap-2 mb-2">
                  {(() => {
                    const Icon = getSeasonIcon(jq.season)
                    return <Icon className={`w-5 h-5 ${SEASON_COLORS[jq.season].text}`} />
                  })()}
                  <h3 className="text-lg font-bold text-white">{jq.name}</h3>
                  <span className="text-sm text-white/60">{jq.date}</span>
                </div>
                <p className="text-sm text-white/80 mb-3">{jq.description}</p>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                  <Info className={`w-4 h-4 ${SEASON_COLORS[jq.season].text}`} />
                  <span className="text-sm text-white/80">养生要点：{jq.health}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <h3 className="text-sm font-medium text-amber-400 mb-3">节气简介</h3>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            二十四节气是中国古代订立的一种用来指导农事的补充历法，是中华民族劳动人民长期经验的积累成果和智慧的结晶。
            它起源于黄河流域，远在春秋时代，就定出仲春、仲夏、仲秋和仲冬等四个节气。以后不断地改进与完善，
            到秦汉年间，二十四节气已完全确立。公元前104年，由邓平等制定的《太初历》，正式把二十四节气订于历法，
            明确了二十四节气的天文位置。
          </p>
        </div>

        <div className="mt-3 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
          <h3 className="text-sm font-medium text-purple-400 mb-3">节气诗词</h3>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm font-medium text-purple-300">立春</div>
              <div className="text-xs text-purple-100/70 italic">
                "东风带雨逐西风，大地阳和暖气生。万物苏萌山水醒，农家岁首又谋耕。"
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm font-medium text-purple-300">清明</div>
              <div className="text-xs text-purple-100/70 italic">
                "清明时节雨纷纷，路上行人欲断魂。借问酒家何处有，牧童遥指杏花村。"
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm font-medium text-purple-300">冬至</div>
              <div className="text-xs text-purple-100/70 italic">
                "天时人事日相催，冬至阳生春又来。刺绣五纹添弱线，吹葭六琯动浮灰。"
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}