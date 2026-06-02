"use client"
import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Calendar, BookOpen, Clock } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"
import {
  TIAN_GAN, DI_ZHI, SHENG_XIAO, NONG_LI_MONTHS, NONG_LI_DAYS,
  SHI_CHEN, WEEK_DAYS, GAN_ZHI_WUXING,
  getYearGanZhi, getMonthGanZhi, getDayGanZhi, getShiChenGanZhi,
  getShengXiao, getHuangLiInfo
} from "@/lib/wannianli-data"
interface WanNianLiPageProps {
  onBack: () => void
}
export function WanNianLiPage({ onBack }: WanNianLiPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState<"calendar" | "huangli" | "shichen">("calendar")
  // 计算日期信息
  const dateInfo = useMemo(() => {
    const solar = Solar.fromDate(selectedDate)
    const lunar = solar.getLunar()
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth() + 1
    const day = selectedDate.getDate()
    const yearGanZhi = getYearGanZhi(year)
    const monthGanZhi = getMonthGanZhi(year, lunar.getMonth())
    const dayGanZhi = getDayGanZhi(selectedDate)
    const currentHour = new Date().getHours()
    const currentShiChenIndex = Math.floor((currentHour + 1) / 2) % 12
    const shiChenGanZhi = getShiChenGanZhi(dayGanZhi.gan, currentShiChenIndex)
    const huangli = getHuangLiInfo(selectedDate)
    return {
      year,
      month,
      day,
      weekDay: WEEK_DAYS[selectedDate.getDay()],
      yearGanZhi,
      monthGanZhi,
      dayGanZhi,
      shiChenGanZhi,
      shengXiao: getShengXiao(year),
      lunarMonth: lunar.getMonthInChinese(),
      lunarDay: lunar.getDayInChinese(),
      isLeapMonth: lunar.isLeapMonth(),
      lunarYear: lunar.getYearInGanZhi(),
      huangli,
      currentShiChenIndex
    }
  }, [selectedDate])
  // 生成日历网格
  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    // 当月第一天
    const firstDay = new Date(year, month, 1)
    // 当月最后一天
    const lastDay = new Date(year, month + 1, 0)
    
    // 第一个需要显示的日期（包含上个月的）
    const startDay = new Date(firstDay)
    startDay.setDate(startDay.getDate() - firstDay.getDay())
    
    const days = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDay)
      date.setDate(startDay.getDate() + i)
      const lunar = Solar.fromDate(date).getLunar()
      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
        lunarDay: lunar.getDayInChinese(),
        lunarMonth: lunar.getMonthInChinese()
      })
    }
    return days
  }, [currentDate, selectedDate])
  // 上一个月
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }
  // 下一个月
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }
  // 回到今天
  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <span className="font-bold text-gray-800">万年历</span>
        <button onClick={goToToday} className="text-sm text-amber-600 font-medium">
          今天
        </button>
      </div>
      {/* 日历头部 */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-xl font-bold text-gray-800">
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
          </div>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        {/* 星期标题 */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEK_DAYS.map((day, i) => (
            <div
              key={day}
              className={`text-center text-sm py-2 font-medium ${
                i === 0 || i === 6 ? "text-red-500" : "text-gray-600"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        {/* 日期网格 */}
        <div className="grid grid-cols-7 gap-1">
          {calendarGrid.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(item.date)}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-lg
                ${!item.isCurrentMonth ? "opacity-30" : ""}
                ${item.isToday ? "bg-amber-100" : ""}
                ${item.isSelected ? "bg-amber-500 text-white" : ""}
                ${!item.isSelected && !item.isToday ? "hover:bg-gray-100" : ""}
              `}
            >
              <span className={`text-sm font-medium ${item.isSelected ? "text-white" : "text-gray-800"}`}>
                {item.date.getDate()}
              </span>
              <span className={`text-xs ${item.isSelected ? "text-amber-100" : "text-gray-500"}`}>
                {item.lunarDay === "初一" ? item.lunarMonth : item.lunarDay}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* 选中日期的详细信息 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-gray-800">
            {dateInfo.month}月{dateInfo.day}日
          </div>
          <div className="text-gray-500 mt-1">
            星期{dateInfo.weekDay} · {dateInfo.lunarMonth}{dateInfo.lunarDay}
          </div>
          {dateInfo.isLeapMonth && (
            <div className="text-amber-600 text-sm mt-1">闰月</div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">干支年</div>
            <div className="font-medium text-gray-800">
              {dateInfo.yearGanZhi.gan}{dateInfo.yearGanZhi.zhi}年
            </div>
            <div className="text-xs text-gray-500">
              【{dateInfo.shengXiao}年】
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">干支月</div>
            <div className="font-medium text-gray-800">
              {dateInfo.monthGanZhi.gan}{dateInfo.monthGanZhi.zhi}月
            </div>
            <div className="text-xs text-gray-500">
              {GAN_ZHI_WUXING[dateInfo.monthGanZhi.gan]}{GAN_ZHI_WUXING[dateInfo.monthGanZhi.zhi]}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">干支日</div>
            <div className="font-medium text-gray-800">
              {dateInfo.dayGanZhi.gan}{dateInfo.dayGanZhi.zhi}日
            </div>
            <div className="text-xs text-gray-500">
              {GAN_ZHI_WUXING[dateInfo.dayGanZhi.gan]}{GAN_ZHI_WUXING[dateInfo.dayGanZhi.zhi]}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">干支时</div>
            <div className="font-medium text-gray-800">
              {dateInfo.shiChenGanZhi.gan}{dateInfo.shiChenGanZhi.zhi}时
            </div>
            <div className="text-xs text-gray-500">
              {SHI_CHEN[dateInfo.currentShiChenIndex].name}时
            </div>
          </div>
        </div>
      </div>
      {/* 标签页 */}
      <div className="flex bg-white mx-4 mt-4 rounded-xl overflow-hidden shadow-sm">
        {[
          { id: "huangli", label: "黄历", icon: Calendar },
          { id: "shichen", label: "时辰", icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                activeTab === tab.id ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="p-4 pb-24">
        {activeTab === "huangli" && (
          <div className="space-y-4">
            {/* 宜忌 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="text-green-600 font-medium mb-2">宜</div>
                  <div className="flex flex-wrap gap-2">
                    {dateInfo.huangli.yi.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-red-600 font-medium mb-2">忌</div>
                  <div className="flex flex-wrap gap-2">
                    {dateInfo.huangli.ji.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-red-50 text-red-700 rounded text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* 神煞 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-3">神煞</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">冲煞：</span>
                  <span className="text-gray-800">{dateInfo.huangli.chongSha}</span>
                </div>
                <div>
                  <span className="text-gray-600">胎神：</span>
                  <span className="text-gray-800">{dateInfo.huangli.taiShen}</span>
                </div>
              </div>
            </div>
            {/* 彭祖百忌 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span className="font-medium text-gray-800">彭祖百忌</span>
              </div>
              <div className="text-gray-700 text-sm leading-relaxed">
                {dateInfo.huangli.pengZu}
              </div>
            </div>
          </div>
        )}
        {activeTab === "shichen" && (
          <div className="space-y-3">
            {SHI_CHEN.map((chen, index) => {
              const isCurrent = index === dateInfo.currentShiChenIndex
              const shiChenGanZhi = getShiChenGanZhi(dateInfo.dayGanZhi.gan, index)
              return (
                <div
                  key={chen.name}
                  className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
                    isCurrent ? "border-amber-500 bg-amber-50" : "border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCurrent ? "bg-amber-500" : "bg-gray-100"
                      }`}>
                        <span className={`text-xl ${isCurrent ? "text-white" : "text-gray-800"}`}>
                          {chen.zodiac}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">
                          {chen.name}时 {shiChenGanZhi.gan}{chen.name}
                        </div>
                        <div className="text-sm text-gray-500">{chen.time}</div>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="px-3 py-1 bg-amber-500 text-white text-sm rounded-full">
                        当前
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {GAN_ZHI_WUXING[shiChenGanZhi.gan]}{GAN_ZHI_WUXING[shiChenGanZhi.zhi]}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
