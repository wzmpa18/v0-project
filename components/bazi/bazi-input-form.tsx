"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Save } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"

interface BaziInputFormProps {
  onCalculate: (data: any) => void
}

// 时辰名称
const SHI_CHEN_NAMES = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"]

export function BaziInputForm({ onCalculate }: BaziInputFormProps) {
  const [name, setName] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [calendarType, setCalendarType] = useState<"solar" | "lunar" | "sizhu">("solar")
  const [birthDate, setBirthDate] = useState("1990-01-01")
  const [birthTime, setBirthTime] = useState("00:00")
  const [birthPlace, setBirthPlace] = useState("未知地")
  const [timezone, setTimezone] = useState("北京时间")
  const [group, setGroup] = useState("全部")
  const [saveToRecord, setSaveToRecord] = useState(true)
  
  // 当前时间的八字
  const [currentBazi, setCurrentBazi] = useState({ year: "", month: "", day: "", hour: "" })
  const [currentTime, setCurrentTime] = useState("")
  const [currentShichen, setCurrentShichen] = useState("")

  // 计算当前时间八字
  useEffect(() => {
    const updateCurrentBazi = () => {
      const now = new Date()
      const solar = Solar.fromDate(now)
      const lunar = solar.getLunar()
      const eightChar = lunar.getEightChar()
      
      setCurrentBazi({
        year: eightChar.getYear(),
        month: eightChar.getMonth(),
        day: eightChar.getDay(),
        hour: eightChar.getTime(),
      })
      
      const hours = now.getHours()
      const minutes = now.getMinutes()
      setCurrentTime(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`)
      
      // 计算时辰
      let shiIndex = Math.floor((hours + 1) / 2) % 12
      if (hours === 23) shiIndex = 0
      setCurrentShichen(SHI_CHEN_NAMES[shiIndex])
    }
    
    updateCurrentBazi()
    const interval = setInterval(updateCurrentBazi, 60000)
    return () => clearInterval(interval)
  }, [])

  // 计算真太阳时
  const getTrueSolarTime = () => {
    return `${birthDate} ${birthTime}`
  }

  // 计算经纬度（简化）
  const getCoordinates = () => {
    return "北纬39.00 东经120.00"
  }

  const handleCalculate = () => {
    const [year, month, day] = birthDate.split("-").map(Number)
    const [hour, minute] = birthTime.split(":").map(Number)
    
    onCalculate({
      name: name || "案例",
      gender,
      calendarType,
      year,
      month,
      day,
      hour,
      minute,
      birthPlace,
      saveToRecord,
    })
  }

  const handleInstantCalculate = () => {
    const now = new Date()
    onCalculate({
      name: "即时排盘",
      gender,
      calendarType: "solar",
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      birthPlace: "未知地",
      saveToRecord: false,
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] pb-24">
      {/* 顶部标题栏 */}
      <div className="bg-[#f5f5f0] px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="w-8" />
        <h1 className="text-lg font-medium text-gray-800">问真排盘</h1>
        <div className="w-8" />
      </div>

      {/* 广告横幅占位 */}
      <div className="mx-4 mt-3 bg-white rounded-lg p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <span className="text-lg">🔊</span>
          <span className="text-sm">吉真紫微斗数App，包...</span>
        </div>
        <button className="text-gray-400 text-xl">×</button>
      </div>

      {/* 输入表单卡片 */}
      <div className="mx-4 mt-3 bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* 姓名 */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <span className="text-gray-700 font-medium">姓名</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入姓名"
            className="text-right text-gray-400 bg-transparent outline-none placeholder:text-gray-300"
          />
        </div>

        {/* 性别和历法选择 */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
          {/* 性别切换 */}
          <div className="flex bg-gray-100 rounded-full p-0.5">
            <button
              onClick={() => setGender("male")}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                gender === "male" ? "bg-gray-700 text-white" : "text-gray-500"
              }`}
            >
              男
            </button>
            <button
              onClick={() => setGender("female")}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                gender === "female" ? "bg-gray-700 text-white" : "text-gray-500"
              }`}
            >
              女
            </button>
          </div>

          {/* 历法切换 */}
          <div className="flex bg-gray-100 rounded-full p-0.5">
            <button
              onClick={() => setCalendarType("solar")}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                calendarType === "solar" ? "bg-[#c9a86c] text-white" : "text-gray-500"
              }`}
            >
              公历
            </button>
            <button
              onClick={() => setCalendarType("lunar")}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                calendarType === "lunar" ? "bg-[#c9a86c] text-white" : "text-gray-500"
              }`}
            >
              农历
            </button>
            <button
              onClick={() => setCalendarType("sizhu")}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                calendarType === "sizhu" ? "bg-[#c9a86c] text-white" : "text-gray-500"
              }`}
            >
              四柱
            </button>
          </div>
        </div>

        {/* 出生时间 */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <span className="text-gray-700">
            出生时间<span className="text-gray-400 text-sm">（必填）</span>
          </span>
          <div className="flex items-center gap-1 text-gray-500">
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-transparent outline-none text-right"
            />
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="bg-transparent outline-none w-20"
            />
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* 出生地点 */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <span className="text-gray-700">出生地点</span>
          <div className="flex items-center gap-1 text-gray-500">
            <span>{birthPlace}</span>
            <span>{timezone}</span>
            <span>--</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* 分组 */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <span className="text-gray-700">分组</span>
          <div className="flex items-center gap-1 text-gray-500">
            <span>{group}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* 真太阳时信息 */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xs text-gray-400 space-y-0.5">
            <div>真太阳时：{getTrueSolarTime()}</div>
            <div>地址经纬：{getCoordinates()}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">保存</span>
            <button
              onClick={() => setSaveToRecord(!saveToRecord)}
              className={`w-12 h-6 rounded-full transition-all ${
                saveToRecord ? "bg-[#c9a86c]" : "bg-gray-300"
              } relative`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                  saveToRecord ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 开始排盘按钮 */}
        <div className="px-4 pb-4">
          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-[#1a1a1a] text-white rounded-full text-base font-medium"
          >
            开始排盘
          </button>
        </div>
      </div>

      {/* 即时排盘卡片 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          {/* 当前八字 */}
          <div>
            <div className="flex gap-4 text-xl font-serif">
              <div className="text-center">
                <div>{currentBazi.year[0]}</div>
                <div>{currentBazi.year[1]}</div>
              </div>
              <div className="text-center">
                <div>{currentBazi.month[0]}</div>
                <div>{currentBazi.month[1]}</div>
              </div>
              <div className="text-center">
                <div>{currentBazi.day[0]}</div>
                <div>{currentBazi.day[1]}</div>
              </div>
              <div className="text-center">
                <div>{currentBazi.hour[0]}</div>
                <div>{currentBazi.hour[1]}</div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              <div>农历：{new Date().getFullYear()}年</div>
              <div>公历：{new Date().toLocaleDateString("zh-CN")}</div>
            </div>
          </div>

          {/* 当前时辰 */}
          <div className="text-right">
            <div className="text-2xl font-light text-gray-700">{currentShichen} {currentTime}</div>
            <button
              onClick={handleInstantCalculate}
              className="mt-2 px-6 py-2 border border-gray-300 rounded-full text-sm text-gray-600"
            >
              即时排盘
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
