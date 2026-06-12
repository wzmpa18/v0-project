"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Sun, Moon, Wind, Sparkles } from "lucide-react"
import {
  TIAN_GAN,
  DI_ZHI,
  SHENG_XIAO,
  NONG_LI_MONTHS,
  NONG_LI_DAYS,
  JIE_QI,
  WEEK_DAYS,
  GAN_ZHI_WUXING,
  getYearGanZhi,
  getMonthGanZhi,
  getDayGanZhi,
  getShengXiao,
  getHuangLiInfo
} from "@/lib/wannianli-data"

export default function WanNianLiRoute() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [selectedDate, setSelectedDate] = useState(today)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const day = currentDate.getDate()

  const yearGanZhi = getYearGanZhi(year)
  const monthGanZhi = getMonthGanZhi(year, month + 1)
  const dayGanZhi = getDayGanZhi(selectedDate)
  const shengXiao = getShengXiao(year)
  const huangLiInfo = getHuangLiInfo(selectedDate)

  const TWELVE_GODS = ["青龙", "明堂", "天刑", "朱雀", "金匮", "天德", "白虎", "玉堂", "天牢", "玄武", "司命", "勾陈"]
  const dayZhiIndex = DI_ZHI.indexOf(dayGanZhi.zhi)
  const todayGod = TWELVE_GODS[(dayZhiIndex + 1) % 12]

  // 计算当月天数
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  // 获取当月第一天是星期几
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  
  // 生成日历数据
  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i)
    const dayInfo = getDayGanZhi(date)
    calendarDays.push({
      day: i,
      date,
      ganZhi: `${dayInfo.gan}${dayInfo.zhi}`,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: date.toDateString() === selectedDate.toDateString()
    })
  }

  // 切换月份
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToday = () => {
    setCurrentDate(today)
    setSelectedDate(today)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-24">
      {/* 顶部标题栏 */}
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-400">万年历</h1>
              <p className="text-xs text-amber-200/60">择吉择日 · 趋吉避凶</p>
            </div>
          </div>
          <button
            onClick={goToday}
            className="px-3 py-1.5 bg-amber-900/40 rounded-lg text-xs text-amber-300 border border-amber-700/30"
          >
            今日
          </button>
        </div>

        {/* 年月选择 */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={prevMonth}
            className="w-10 h-10 rounded-full bg-amber-900/40 flex items-center justify-center border border-amber-700/30"
          >
            <ChevronLeft className="w-5 h-5 text-amber-300" />
          </button>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-300">
              {year}年{month + 1}月
            </div>
            <div className="text-xs text-amber-200/70">
              {yearGanZhi.gan}{yearGanZhi.zhi}年 · 属{shengXiao}
            </div>
          </div>
          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-full bg-amber-900/40 flex items-center justify-center border border-amber-700/30"
          >
            <ChevronRight className="w-5 h-5 text-amber-300" />
          </button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="px-4">
        {/* 选中日期详情 */}
        <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30 mb-3">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-300">{selectedDate.getDate()}</div>
              <div className="text-xs text-amber-200/60">周{WEEK_DAYS[selectedDate.getDay()]}</div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-amber-100 mb-1">
                {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
              </div>
              <div className="text-base font-bold text-amber-300">
                {dayGanZhi.gan}{dayGanZhi.zhi}日 · {NONG_LI_MONTHS[(selectedDate.getMonth() + 2) % 12]}{NONG_LI_DAYS[(selectedDate.getDate() - 1) % 30]}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="text-xs text-purple-300">{todayGod}</span>
                <span className="text-xs text-amber-200/50">·</span>
                <span className="text-xs text-red-300">{huangLiInfo.chongSha}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 宜忌 */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 rounded-xl p-3 border border-emerald-800/30">
            <div className="flex items-center gap-1.5 mb-2">
              <Sun className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-emerald-200">宜</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {huangLiInfo.yi.map((item, idx) => (
                <span key={idx} className="text-xs bg-emerald-800/40 text-emerald-100 px-2 py-1 rounded-full border border-emerald-700/30">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-3 border border-red-800/30">
            <div className="flex items-center gap-1.5 mb-2">
              <Moon className="w-4 h-4 text-red-500" />
              <span className="text-sm font-bold text-red-200">忌</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {huangLiInfo.ji.map((item, idx) => (
                <span key={idx} className="text-xs bg-red-800/40 text-red-100 px-2 py-1 rounded-full border border-red-700/30">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 彭祖百忌 */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/50 rounded-xl p-3 border border-blue-800/30 mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Wind className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-bold text-blue-200">彭祖百忌</span>
          </div>
          <p className="text-xs text-blue-100/80">{huangLiInfo.pengZu}</p>
        </div>

        {/* 日历网格 */}
        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-3 border border-amber-800/30">
          {/* 星期标题 */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEK_DAYS.map((day) => (
              <div key={day} className="text-center text-xs text-amber-400/70 font-medium py-2">
                周{day}
              </div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dayInfo, idx) => {
              if (!dayInfo) return <div key={idx} className="aspect-square" />
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(dayInfo.date)}
                  className={`relative aspect-square rounded-lg flex flex-col items-center justify-center transition-all ${
                    dayInfo.isSelected
                      ? "bg-amber-600 text-white"
                      : dayInfo.isToday
                        ? "bg-amber-900/60 border border-amber-600/50 text-amber-300"
                        : "bg-amber-900/30 text-amber-100/80 hover:bg-amber-800/40"
                  }`}
                >
                  <span className="text-sm font-medium">{dayInfo.day}</span>
                  <span className="text-xs opacity-70">{dayInfo.ganZhi.charAt(0)}</span>
                  {dayInfo.isToday && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-red-500" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* 十二神 */}
        <div className="mt-3 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-3 border border-purple-800/30">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-bold text-purple-200">十二神煞</span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {TWELVE_GODS.map((god, idx) => (
              <div
                key={idx}
                className={`text-xs text-center py-1.5 rounded-lg ${
                  god === todayGod
                    ? "bg-purple-600 text-white"
                    : "bg-purple-800/30 text-purple-200/70"
                }`}
              >
                {god}
              </div>
            ))}
          </div>
        </div>

        {/* 五行信息 */}
        <div className="mt-3 bg-gradient-to-br from-cyan-900/30 to-cyan-950/50 rounded-xl p-3 border border-cyan-800/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-cyan-200">今日五行</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {["木", "火", "土", "金", "水"].map((wuxing) => (
              <div key={wuxing} className="text-center">
                <div className="text-sm font-bold text-cyan-300">{wuxing}</div>
                <div className="text-xs text-cyan-200/60">
                  {GAN_ZHI_WUXING[dayGanZhi.gan] === wuxing || GAN_ZHI_WUXING[dayGanZhi.zhi] === wuxing ? "旺" : "平"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 二十四节气 */}
        <div className="mt-3 bg-gradient-to-br from-rose-900/30 to-rose-950/50 rounded-xl p-3 border border-rose-800/30">
          <div className="flex items-center gap-1.5 mb-2">
            <Sun className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-bold text-rose-200">二十四节气</span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {JIE_QI.map((jieqi, idx) => (
              <div key={idx} className="text-xs text-center py-1.5 rounded-lg bg-rose-800/30 text-rose-200/80">
                {jieqi}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}