"use client"

import { useState, useEffect } from "react"
import { Droplets, Clock, Heart, Info } from "lucide-react"

const JING_LUO = [
  { name: "胆经", time: "子时", zhi: "子", hours: [23, 0], description: "胆主决断，此时应入眠，养胆气", health: "利胆排毒，预防胆结石" },
  { name: "肝经", time: "丑时", zhi: "丑", hours: [1, 2], description: "肝主藏血，此时深度睡眠养肝", health: "疏肝理气，预防肝病" },
  { name: "肺经", time: "寅时", zhi: "寅", hours: [3, 4], description: "肺主气，此时肺经最旺，易咳嗽", health: "润肺化痰，预防肺病" },
  { name: "大肠经", time: "卯时", zhi: "卯", hours: [5, 6], description: "大肠主传导，此时宜排便", health: "润肠通便，预防便秘" },
  { name: "胃经", time: "辰时", zhi: "辰", hours: [7, 8], description: "胃主受纳，此时宜吃早餐", health: "养胃健脾，预防胃病" },
  { name: "脾经", time: "巳时", zhi: "巳", hours: [9, 10], description: "脾主运化，此时消化最旺", health: "健脾祛湿，预防脾虚" },
  { name: "心经", time: "午时", zhi: "午", hours: [11, 12], description: "心主神明，此时宜小憩养心", health: "清心降火，预防心脏病" },
  { name: "小肠经", time: "未时", zhi: "未", hours: [13, 14], description: "小肠主分清泌浊，此时消化午餐", health: "调理肠道，预防肠炎" },
  { name: "膀胱经", time: "申时", zhi: "申", hours: [15, 16], description: "膀胱主气化，此时宜喝水排尿", health: "利水通淋，预防膀胱炎" },
  { name: "肾经", time: "酉时", zhi: "酉", hours: [17, 18], description: "肾主藏精，此时宜休息养肾", health: "补肾益精，预防肾病" },
  { name: "心包经", time: "戌时", zhi: "戌", hours: [19, 20], description: "心包主喜乐，此时宜放松心情", health: "养心安神，预防心悸" },
  { name: "三焦经", time: "亥时", zhi: "亥", hours: [21, 22], description: "三焦主气化，此时宜准备入眠", health: "调和三焦，预防失眠" },
]

const JING_LUO_COLORS: Record<string, string> = {
  "胆经": "from-green-800/60 to-green-900/40",
  "肝经": "from-blue-800/60 to-blue-900/40",
  "肺经": "from-white/20 to-gray-800/40",
  "大肠经": "from-amber-800/60 to-amber-900/40",
  "胃经": "from-orange-800/60 to-orange-900/40",
  "脾经": "from-yellow-800/60 to-yellow-900/40",
  "心经": "from-red-800/60 to-red-900/40",
  "小肠经": "from-pink-800/60 to-pink-900/40",
  "膀胱经": "from-cyan-800/60 to-cyan-900/40",
  "肾经": "from-indigo-800/60 to-indigo-900/40",
  "心包经": "from-purple-800/60 to-purple-900/40",
  "三焦经": "from-teal-800/60 to-teal-900/40",
}

const JING_LUO_SYMBOLS: Record<string, string> = {
  "胆经": "☰",
  "肝经": "☵",
  "肺经": "☱",
  "大肠经": "☲",
  "胃经": "☷",
  "脾经": "☳",
  "心经": "☴",
  "小肠经": "☶",
  "膀胱经": "☵",
  "肾经": "☷",
  "心包经": "☴",
  "三焦经": "☰",
}

export default function ZiwuliuPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedJingLuo, setSelectedJingLuo] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const currentHour = currentTime.getHours()
  const currentMinute = currentTime.getMinutes()
  const currentJingLuo = JING_LUO.find(jl => jl.hours.includes(currentHour))

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
  }

  const getTimeProgress = () => {
    const minutes = currentHour * 60 + currentMinute
    const totalMinutes = 24 * 60
    return (minutes / totalMinutes) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-lime-700 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-lime-400">子午流注</h1>
            <p className="text-xs text-lime-200/60">针灸时辰 · 经络气血</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-lime-900/40 to-lime-950/60 rounded-xl p-4 border border-lime-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-lime-400" />
            <span className="text-sm text-lime-200/80">
              子午流注是中医针灸学的重要理论，根据十二时辰与十二经络的对应关系，
              指导针灸治疗和养生保健。
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 rounded-xl p-5 border border-blue-800/30 mb-4">
          <div className="text-center mb-4">
            <div className="text-sm text-blue-200/70 mb-1">{formatDate(currentTime)}</div>
            <div className="text-4xl font-bold text-white font-mono">{formatTime(currentTime)}</div>
          </div>

          <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden mb-2">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-600"
              style={{ width: `${getTimeProgress()}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span>子时 23:00</span>
            <span>午时 12:00</span>
            <span>亥时 22:00</span>
          </div>
        </div>

        {currentJingLuo && (
          <div className={`bg-gradient-to-br ${JING_LUO_COLORS[currentJingLuo.name]} rounded-xl p-5 border border-white/20 mb-4`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">{JING_LUO_SYMBOLS[currentJingLuo.name]}</span>
                </div>
                <div>
                  <div className="text-sm text-white/70">当前时辰</div>
                  <div className="text-xl font-bold text-white">{currentJingLuo.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/70">当令经络</div>
                <div className="text-xl font-bold text-white">{currentJingLuo.name}</div>
              </div>
            </div>
            <p className="text-sm text-white/80 mb-3">{currentJingLuo.description}</p>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300">{currentJingLuo.health}</span>
            </div>
          </div>
        )}

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-lime-400" />
            <span className="text-sm font-medium text-lime-400">十二时辰经络对应表</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {JING_LUO.map((jingLuo) => {
              const isCurrent = currentJingLuo?.name === jingLuo.name
              const isSelected = selectedJingLuo === jingLuo.name
              
              return (
                <button
                  key={jingLuo.name}
                  onClick={() => setSelectedJingLuo(isSelected ? null : jingLuo.name)}
                  className={`relative rounded-xl p-3 transition-all ${
                    isCurrent 
                      ? `bg-gradient-to-br ${JING_LUO_COLORS[jingLuo.name]} ring-2 ring-white/50` 
                      : isSelected 
                        ? `bg-gradient-to-br ${JING_LUO_COLORS[jingLuo.name]} opacity-70`
                        : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-xs text-white">●</span>
                    </div>
                  )}
                  <div className="text-xs text-white/60 mb-1">{jingLuo.time}</div>
                  <div className="text-sm font-bold text-white">{jingLuo.name}</div>
                </button>
              )
            })}
          </div>
        </div>

        {selectedJingLuo && (
          <div className={`mt-4 bg-gradient-to-br ${JING_LUO_COLORS[selectedJingLuo]} rounded-xl p-4 border border-white/20`}>
            {JING_LUO.filter(jl => jl.name === selectedJingLuo).map(jl => (
              <div key={jl.name}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{JING_LUO_SYMBOLS[jl.name]}</span>
                  <h3 className="text-lg font-bold text-white">{jl.name}</h3>
                </div>
                <div className="text-sm text-white/70 mb-2">
                  <span className="font-medium">对应时辰：</span>{jl.time} ({jl.hours[0]}:00 - {jl.hours[1] + 1}:00)
                </div>
                <p className="text-sm text-white/80 mb-3">{jl.description}</p>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                  <Heart className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-200">{jl.health}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <h3 className="text-sm font-medium text-amber-400 mb-3">养生要点</h3>
          <ul className="space-y-2 text-xs text-amber-100/70">
            <li>• <strong className="text-amber-300">子时</strong>：宜入眠，养胆气</li>
            <li>• <strong className="text-amber-300">丑时</strong>：深度睡眠，养肝血</li>
            <li>• <strong className="text-amber-300">寅时</strong>：易醒者多为肺气不足</li>
            <li>• <strong className="text-amber-300">卯时</strong>：起床排便，喝温水</li>
            <li>• <strong className="text-amber-300">辰时</strong>：吃早餐，养胃气</li>
            <li>• <strong className="text-amber-300">巳时</strong>：工作学习，脾运化</li>
            <li>• <strong className="text-amber-300">午时</strong>：小憩片刻，养心</li>
            <li>• <strong className="text-amber-300">未时</strong>：消化午餐，多喝水</li>
            <li>• <strong className="text-amber-300">申时</strong>：膀胱排毒，运动</li>
            <li>• <strong className="text-amber-300">酉时</strong>：休息养肾，忌过劳</li>
            <li>• <strong className="text-amber-300">戌时</strong>：放松心情，与家人交流</li>
            <li>• <strong className="text-amber-300">亥时</strong>：准备入眠，养阴</li>
          </ul>
        </div>

        <div className="mt-3 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
          <h3 className="text-sm font-medium text-purple-400 mb-3">理论依据</h3>
          <p className="text-xs text-purple-100/70 leading-relaxed">
            子午流注理论源于《黄帝内经》，认为人体气血在十二经络中按照一定的时间规律循环流动。
            每个时辰有一条经络气血最旺盛，称为"当令"。根据这个规律进行针灸治疗或养生，
            可以达到事半功倍的效果。子时（23:00-01:00）胆经当令，丑时（01:00-03:00）肝经当令，
            以此类推，形成一个完整的气血循环周期。
          </p>
        </div>
      </main>
    </div>
  )
}