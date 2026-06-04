"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Calendar, MapPin, Info } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"

interface BaziInputFormProps {
  onCalculate: (data: any) => void
}

const SHI_CHEN_NAMES = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"]

export function BaziInputForm({ onCalculate }: BaziInputFormProps) {
  const [name, setName] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [calendarType, setCalendarType] = useState<"solar" | "lunar">("solar")
  const [birthDate, setBirthDate] = useState("1990-01-01")
  const [birthTime, setBirthTime] = useState("00:00")
  const [birthPlace, setBirthPlace] = useState("")
  const [timezone, setTimezone] = useState("北京时间")
  const [saveToRecord, setSaveToRecord] = useState(true)
  
  const [currentBazi, setCurrentBazi] = useState({ year: "", month: "", day: "", hour: "" })
  const [currentTime, setCurrentTime] = useState("")
  const [currentShichen, setCurrentShichen] = useState("")

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
      
      let shiIndex = Math.floor((hours + 1) / 2) % 12
      if (hours === 23) shiIndex = 0
      setCurrentShichen(SHI_CHEN_NAMES[shiIndex])
    }
    
    updateCurrentBazi()
    const interval = setInterval(updateCurrentBazi, 60000)
    return () => clearInterval(interval)
  }, [])

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
      timezone,
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
      birthPlace: "",
      timezone: "北京时间",
      saveToRecord: false,
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] pb-24">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="w-8" />
          <h1 className="text-lg font-medium text-gray-800">八字排盘</h1>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <Info className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#4a9d5b] to-[#3d8a4e] px-4 py-3">
        <div className="flex items-center justify-between text-white">
          <div>
            <div className="text-sm opacity-80">当前时辰</div>
            <div className="text-xl font-medium">{currentShichen} {currentTime}</div>
          </div>
          <button
            onClick={handleInstantCalculate}
            className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm"
          >
            即时排盘
          </button>
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <span className="text-gray-700 font-medium">姓名</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入姓名"
            className="text-right text-gray-500 bg-transparent outline-none placeholder:text-gray-300 max-w-32"
          />
        </div>

        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex bg-gray-100 rounded-full p-0.5">
            <button
              onClick={() => setGender("male")}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                gender === "male" ? "bg-gray-700 text-white" : "text-gray-600"
              }`}
            >
              男
            </button>
            <button
              onClick={() => setGender("female")}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                gender === "female" ? "bg-gray-700 text-white" : "text-gray-600"
              }`}
            >
              女
            </button>
          </div>

          <div className="flex bg-gray-100 rounded-full p-0.5">
            <button
              onClick={() => setCalendarType("solar")}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                calendarType === "solar" ? "bg-[#c9a86c] text-white" : "text-gray-600"
              }`}
            >
              公历
            </button>
            <button
              onClick={() => setCalendarType("lunar")}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                calendarType === "lunar" ? "bg-[#c9a86c] text-white" : "text-gray-600"
              }`}
            >
              农历
            </button>
          </div>
        </div>

        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <span className="text-gray-700 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            出生时间<span className="text-gray-400 text-sm ml-1">（必填）</span>
          </span>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-transparent outline-none text-gray-700 text-sm"
            />
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="bg-transparent outline-none w-20 text-gray-700 text-sm"
            />
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <span className="text-gray-700 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            出生地点
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="请输入出生地点"
              className="text-right text-gray-500 bg-transparent outline-none placeholder:text-gray-300 max-w-32 text-sm"
            />
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="px-4 py-3 flex items-center justify-between bg-gray-50">
          <div className="text-xs text-gray-500">
            <div>真太阳时：{birthDate} {birthTime}</div>
            <div>时区：{timezone}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">保存记录</span>
            <button
              onClick={() => setSaveToRecord(!saveToRecord)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                saveToRecord ? "bg-[#c9a86c]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                  saveToRecord ? "right-0.5" : "left-0.5"
                } shadow-sm`}
              />
            </button>
          </div>
        </div>

        <div className="px-4 py-4">
          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-[#1a1a1a] text-white rounded-full text-base font-medium shadow-lg shadow-black/20 active:scale-[0.98] transition-transform"
          >
            开始排盘
          </button>
        </div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm p-4">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-3">当前八字</div>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-serif text-gray-800">{currentBazi.year}</div>
              <div className="text-xs text-gray-400 mt-1">年柱</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif text-gray-800">{currentBazi.month}</div>
              <div className="text-xs text-gray-400 mt-1">月柱</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif text-gray-800">{currentBazi.day}</div>
              <div className="text-xs text-gray-400 mt-1">日柱</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif text-gray-800">{currentBazi.hour}</div>
              <div className="text-xs text-gray-400 mt-1">时柱</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-4 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#f59e0b] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">📖</span>
          </div>
          <div>
            <div className="font-medium text-gray-800">八字命理指南</div>
            <div className="text-sm text-gray-600 mt-1">
              排盘前请确认出生时间的准确性，真太阳时会影响时辰判断。建议使用出生地经纬度计算真太阳时。
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}