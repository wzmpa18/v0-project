"use client"

import { useState } from "react"
import { Calendar, Sparkles, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import { getDayInfo, findGoodDays, ZERI_SHI_XIANG, DI_ZHI } from "@/lib/zeri-data"

export default function ZeriPage() {
  const today = new Date()
  const [selectedEvent, setSelectedEvent] = useState<string>("婚嫁")
  const [currentDate, setCurrentDate] = useState(today)
  const [goodDays, setGoodDays] = useState<Date[]>([])
  const [selectedDateInfo, setSelectedDateInfo] = useState<any>(getDayInfo(today))

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  const handleEventChange = (event: string) => {
    setSelectedEvent(event)
    const days = findGoodDays(year, month, event)
    setGoodDays(days)
  }

  const handlePrevMonth = () => {
    const newDate = new Date(year, month - 2, 1)
    setCurrentDate(newDate)
    const days = findGoodDays(newDate.getFullYear(), newDate.getMonth() + 1, selectedEvent)
    setGoodDays(days)
  }

  const handleNextMonth = () => {
    const newDate = new Date(year, month, 1)
    setCurrentDate(newDate)
    const days = findGoodDays(newDate.getFullYear(), newDate.getMonth() + 1, selectedEvent)
    setGoodDays(days)
  }

  const handleDateSelect = (day: number) => {
    const date = new Date(year, month - 1, day)
    setSelectedDateInfo(getDayInfo(date))
  }

  const getShenColor = (nature: string) => {
    return nature === "吉" ? "text-emerald-400 bg-emerald-900/40 border-emerald-700/30" : "text-red-400 bg-red-900/40 border-red-700/30"
  }

  const isGoodDay = (day: number) => {
    return goodDays.some(d => d.getDate() === day)
  }

  const daysInMonth = new Date(year, month, 0).getDate()
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay()

  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isGood: isGoodDay(i),
      isToday: new Date(year, month - 1, i).toDateString() === today.toDateString()
    })
  }

  const events = ["婚嫁", "开业", "搬家", "动土", "出行", "祭祀", "安葬", "纳财"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-24">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-400">择日</h1>
            <p className="text-xs text-amber-200/60">黄道吉日 · 趋吉避凶</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30 mb-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-200 mb-1">择日原理</h3>
              <p className="text-xs text-amber-200/60 leading-relaxed">
                择日是中国传统择吉文化的重要组成部分，根据十二神煞的轮转，结合天干地支的五行生克，
                选择适宜的吉日进行各种活动，以达到趋吉避凶、事半功倍的效果。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">选择事项</h3>
          <div className="grid grid-cols-4 gap-2">
            {events.map((event) => (
              <button
                key={event}
                onClick={() => handleEventChange(event)}
                className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                  selectedEvent === event
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {event}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 rounded-xl p-4 border border-blue-800/30 mb-4">
          <h3 className="text-sm font-bold text-blue-200 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {selectedEvent}吉日
          </h3>
          
          {goodDays.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {goodDays.map((date, idx) => (
                <div
                  key={idx}
                  onClick={() => handleDateSelect(date.getDate())}
                  className="px-4 py-2 bg-blue-800/40 rounded-lg cursor-pointer hover:bg-blue-700/40 transition-colors"
                >
                  <span className="text-blue-200">{date.getDate()}日</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-blue-300/70 text-sm">本月暂无{selectedEvent}吉日</p>
          )}
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30 mb-4">
          <h3 className="text-sm font-bold text-purple-200 mb-3">十二神煞</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(ZERI_SHI_XIANG).map(([name, info]) => (
              <div
                key={name}
                className={`p-2 rounded-lg text-xs ${info.nature === "吉" ? "bg-green-900/30 text-green-200" : "bg-red-900/30 text-red-200"}`}
              >
                <div className="font-medium">{name}</div>
                <div className="text-xs opacity-70">{info.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30 mb-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={handlePrevMonth} className="w-8 h-8 rounded-full bg-amber-800/40 flex items-center justify-center">
              <ChevronLeft className="w-4 h-4 text-amber-300" />
            </button>
            <div className="text-center">
              <div className="text-lg font-bold text-amber-300">{year}年{month}月</div>
            </div>
            <button onClick={handleNextMonth} className="w-8 h-8 rounded-full bg-amber-800/40 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
              <div key={day} className="text-center text-xs text-amber-400/70 py-1">
                周{day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dayInfo, idx) => {
              if (!dayInfo) return <div key={idx} className="aspect-square" />
              return (
                <button
                  key={idx}
                  onClick={() => handleDateSelect(dayInfo.day)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all ${
                    dayInfo.isGood
                      ? "bg-emerald-600 text-white"
                      : dayInfo.isToday
                        ? "bg-amber-700/60 text-amber-300 border border-amber-500/50"
                        : "bg-amber-900/30 text-amber-100/80 hover:bg-amber-800/40"
                  }`}
                >
                  <span className="font-medium">{dayInfo.day}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">当日详情</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-xs text-gray-500">日期</span>
              <span className="text-sm font-medium text-gray-800">
                {selectedDateInfo.year}年{selectedDateInfo.month}月{selectedDateInfo.day}日
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-xs text-gray-500">干支</span>
              <span className="text-sm font-medium text-gray-800">
                {selectedDateInfo.dayGan}{selectedDateInfo.dayZhi}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-xs text-gray-500">生肖</span>
              <span className="text-sm font-medium text-gray-800">{selectedDateInfo.shengXiao}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-xs text-gray-500">值日神</span>
              <span className={`text-sm font-medium px-2 py-1 rounded ${getShenColor(selectedDateInfo.shenInfo?.nature || "凶")}`}>
                {selectedDateInfo.dayShen}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-xs text-gray-500">冲煞</span>
              <span className="text-sm text-red-600">冲{selectedDateInfo.chongSha}</span>
            </div>
            <div className="py-2">
              <span className="text-xs text-gray-500">宜</span>
              <div className="mt-1 text-sm text-gray-700">{selectedDateInfo.shenInfo?.desc}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}