"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Bell,
  BookOpen,
  Leaf,
  Calendar,
  ChevronRight,
  Star,
  Flame,
  Mountain,
  User,
  Zap,
  BookMarked,
  Compass,
  Hexagon,
  Feather,
  Moon,
} from "lucide-react"
import { navigateTo } from "@/lib/navigation"

export function HomePage() {
  const [todayInfo, setTodayInfo] = useState<any>(null)

  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const weekDays = ["日", "一", "二", "三", "四", "五", "六"]
    const weekDay = weekDays[now.getDay()]

    const tianGan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
    const diZhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
    const shengXiao = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]

    const yearIndex = (year - 4) % 60
    const yearGan = tianGan[yearIndex % 10]
    const yearZhi = diZhi[yearIndex % 12]
    const yearShengXiao = shengXiao[yearIndex % 12]

    const monthIndex = (year - 4) % 60
    const monthGan = tianGan[(monthIndex * 2 + month - 1) % 10]
    const monthZhi = diZhi[(month + 1) % 12]

    const dayIndex = Math.floor((Date.UTC(year, month - 1, day) + 10) / 86400000)
    const dayGan = tianGan[(dayIndex + 9) % 10]
    const dayZhi = diZhi[(dayIndex + 11) % 12]

    const yiList = ["祭祀", "祈福", "出行", "纳财", "嫁娶", "开市"]
    const jiList = ["动土", "开仓", "安葬", "伐木", "行丧", "栽种"]

    setTodayInfo({
      year,
      month,
      day,
      weekDay,
      yearGanZhi: yearGan + yearZhi,
      yearShengXiao,
      monthGanZhi: monthGan + monthZhi,
      dayGanZhi: dayGan + dayZhi,
      yi: yiList,
      ji: jiList,
    })
  }, [])

  const quickTools = [
    { id: "bazi", label: "八字", icon: Star, color: "amber" },
    { id: "ziwei", label: "紫微", icon: Compass, color: "purple" },
    { id: "qimen", label: "奇门", icon: Hexagon, color: "teal" },
    { id: "liuyao", label: "六爻", icon: Zap, color: "red" },
    { id: "meihua", label: "梅花", icon: Feather, color: "pink" },
    { id: "wannianli", label: "黄历", icon: Calendar, color: "orange" },
  ]

  const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
    amber: { bg: "bg-amber-800/30", icon: "text-amber-400", border: "border-amber-700/30" },
    purple: { bg: "bg-purple-800/30", icon: "text-purple-400", border: "border-purple-700/30" },
    teal: { bg: "bg-teal-800/30", icon: "text-teal-400", border: "border-teal-700/30" },
    red: { bg: "bg-red-800/30", icon: "text-red-400", border: "border-red-700/30" },
    pink: { bg: "bg-pink-800/30", icon: "text-pink-400", border: "border-pink-700/30" },
    orange: { bg: "bg-orange-800/30", icon: "text-orange-400", border: "border-orange-700/30" },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-400">医易命理</h1>
              <p className="text-xs text-amber-200/60">传承千年智慧 · 国学综合平台</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-amber-900/40 flex items-center justify-center">
              <Search className="w-5 h-5 text-amber-300" />
            </button>
            <button className="w-10 h-10 rounded-full bg-amber-900/40 flex items-center justify-center">
              <Bell className="w-5 h-5 text-amber-300" />
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-lg p-2 flex items-center justify-between border border-amber-800/30">
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs text-amber-100/80">医易命理APP v1.0正式上线</span>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-600" />
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => navigateTo("/yi-xue")}
            className="bg-gradient-to-br from-amber-800/80 to-amber-900/60 rounded-xl p-3.5 flex flex-col items-center gap-1 border border-amber-700/30 shadow-lg shadow-amber-900/20 active:scale-95 transition-transform w-full"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center border border-amber-500/30">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-sm font-bold text-amber-300">易学</span>
            <span className="text-xs text-amber-200/60">命理排盘</span>
          </button>
          <button
            onClick={() => navigateTo("/herbal")}
            className="bg-gradient-to-br from-emerald-800/80 to-emerald-900/60 rounded-xl p-3.5 flex flex-col items-center gap-1 border border-emerald-700/30 shadow-lg shadow-emerald-900/20 active:scale-95 transition-transform w-full"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/30">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-sm font-bold text-emerald-300">中医</span>
            <span className="text-xs text-emerald-200/60">经方本草</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-3 mb-2.5 border border-amber-800/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-amber-200">今日黄历</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400/70">{todayInfo?.yearGanZhi}年</span>
              <span className="text-xs text-amber-400/50">·</span>
              <span className="text-xs text-amber-400/70">属{todayInfo?.yearShengXiao}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="text-center">
              <div className="text-2.5xl font-bold text-amber-300">{todayInfo?.day || new Date().getDate()}</div>
              <div className="text-xs text-amber-200/60">周{todayInfo?.weekDay}</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-amber-100 mb-0.5">
                {todayInfo?.year}年{todayInfo?.month}月{todayInfo?.day}日
              </div>
              <div className="text-xs text-amber-300">
                {todayInfo?.yearGanZhi}年 {todayInfo?.monthGanZhi}月 {todayInfo?.dayGanZhi}日
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-medium text-emerald-400">宜</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {todayInfo?.yi?.map((item: string, idx: number) => (
                  <span key={idx} className="text-xs bg-emerald-900/40 text-emerald-200 px-1.5 py-0.5 rounded-full border border-emerald-700/30">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-1 h-1 rounded-full bg-red-500"></div>
                <span className="text-xs font-medium text-red-400">忌</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {todayInfo?.ji?.map((item: string, idx: number) => (
                  <span key={idx} className="text-xs bg-red-900/40 text-red-200 px-1.5 py-0.5 rounded-full border border-red-700/30">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2.5">
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-3 border border-purple-800/30">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-bold text-purple-200">五运六气</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-purple-100/70">岁运：<span className="text-purple-300">太角</span></div>
              <div className="text-xs text-purple-100/70">主气：<span className="text-purple-300">少阳相火</span></div>
              <div className="text-xs text-purple-100/70">客气：<span className="text-purple-300">阳明燥金</span></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-3 border border-rose-800/30">
            <div className="flex items-center gap-1.5 mb-2">
              <Flame className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-bold text-rose-200">地母经</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-rose-100/70">太岁：<span className="text-rose-300">丙午</span></div>
              <div className="text-xs text-rose-100/70">节气：<span className="text-rose-300">芒种</span></div>
              <div className="text-xs text-rose-100/70">地母：<span className="text-rose-300">利南方</span></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-3 border border-amber-800/30 mb-2.5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-bold text-amber-200">快捷工具</span>
            <button onClick={() => navigateTo("/yi-xue")} className="flex items-center gap-0.5 text-xs text-amber-400/70">
              更多 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {quickTools.map((tool) => {
              const colors = colorClasses[tool.color] || colorClasses.amber
              const Icon = tool.icon
              return (
                <button
                  key={tool.id}
                  onClick={() => navigateTo(`/${tool.id}`)}
                  className={`${colors.bg} rounded-lg p-2 flex flex-col items-center gap-1 border ${colors.border} active:scale-95 transition-transform`}
                >
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                  <span className="text-xs text-white/80">{tool.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/50 rounded-xl p-3 border border-blue-800/30 mb-2.5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-bold text-blue-200">每日运势</span>
            <span className="text-xs text-blue-400/70">丙午日</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-blue-800/30 rounded-lg p-2 text-center border border-blue-700/30">
              <div className="text-xs text-blue-200/70 mb-1">事业</div>
              <div className="flex justify-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
            <div className="bg-blue-800/30 rounded-lg p-2 text-center border border-blue-700/30">
              <div className="text-xs text-blue-200/70 mb-1">财运</div>
              <div className="flex justify-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="bg-blue-800/30 rounded-lg p-2 text-center border border-blue-700/30">
              <div className="text-xs text-blue-200/70 mb-1">健康</div>
              <div className="flex justify-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
            <div className="bg-blue-800/30 rounded-lg p-2 text-center border border-blue-700/30">
              <div className="text-xs text-blue-200/70 mb-1">感情</div>
              <div className="flex justify-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-gray-600" />
                <Star className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-900/30 to-rose-950/50 rounded-xl p-3 border border-rose-800/30 mt-2.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Flame className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-bold text-rose-200">国学经典</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-rose-800/30 rounded-lg p-2 text-center border border-rose-700/30">
              <span className="text-xs text-rose-100/80">《易经》</span>
            </div>
            <div className="bg-rose-800/30 rounded-lg p-2 text-center border border-rose-700/30">
              <span className="text-xs text-rose-100/80">《道德经》</span>
            </div>
            <div className="bg-rose-800/30 rounded-lg p-2 text-center border border-rose-700/30">
              <span className="text-xs text-rose-100/80">《黄帝内经》</span>
            </div>
            <div className="bg-rose-800/30 rounded-lg p-2 text-center border border-rose-700/30">
              <span className="text-xs text-rose-100/80">《伤寒论》</span>
            </div>
            <div className="bg-rose-800/30 rounded-lg p-2 text-center border border-rose-700/30">
              <span className="text-xs text-rose-100/80">《金匮要略》</span>
            </div>
            <div className="bg-rose-800/30 rounded-lg p-2 text-center border border-rose-700/30">
              <span className="text-xs text-rose-100/80">《本草纲目》</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}