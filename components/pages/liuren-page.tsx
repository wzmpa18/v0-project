"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  ChevronLeft, ChevronRight, RotateCcw, Settings, 
  HelpCircle, Calendar, Clock, RefreshCw, Grid3X3,
  FileText, Star, MessageSquare, Folder, Menu
} from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"
import {
  TIAN_JIANG, DI_ZHI, TIAN_GAN, JIA_ZI_60, XUN_KONG,
  KE_GE, SHEN_SHA, DUAN_YU, GU_JI, QI_KE_FA, DEFAULT_SETTINGS
} from "@/lib/liuren-complete-data"

// 本地存储键
const STORAGE_KEY = "liuren_user_settings"
const HISTORY_KEY = "liuren_history"

interface LiurenResult {
  // 四柱
  siZhu: { year: string; month: string; day: string; hour: string }
  // 月将
  yueJiang: string
  // 十二天盘
  tianPan: string[]
  // 四课
  siKe: { gan: string; zhi: string; shen: string; jiang: string }[]
  // 三传
  sanChuan: { chu: string; zhong: string; mo: string }
  // 课格
  keGe: string
  // 旬空
  xunKong: string[]
  // 日空、时空
  riKong: string[]
  shiKong: string[]
  // 本命、行年
  benMing: string
  xingNian: string
  // 神煞
  shenSha: { name: string; zhi: string }[]
}

interface LiurenPageProps {
  onBack?: () => void
}

export function LiurenPage({ onBack }: LiurenPageProps) {
  // 用户设置（带记忆）
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  
  // 输入参数
  const [qiKeFa, setQiKeFa] = useState("zhengshi")
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  })
  const [selectedTime, setSelectedTime] = useState(() => {
    const now = new Date()
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  })
  const [birthYear, setBirthYear] = useState(1980)
  const [gender, setGender] = useState<"male" | "female">("male")
  const [yueJiangXuanQu, setYueJiangXuanQu] = useState("auto")
  const [guiRenQiFa, setGuiRenQiFa] = useState("甲戊庚牛羊")
  const [guiRenXuanQu, setGuiRenXuanQu] = useState("auto")
  const [sheHaiQuFa, setSheHaiQuFa] = useState("depth")
  
  // 展示状态
  const [showMoreParams, setShowMoreParams] = useState(false)
  const [activeTab, setActiveTab] = useState<"panmian" | "fuzhu" | "shensha" | "pingzhu" | "dangan">("panmian")
  const [result, setResult] = useState<LiurenResult | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedGong, setSelectedGong] = useState<number | null>(null)
  
  // 从本地存储加载设置
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setSettings(prev => ({ ...prev, ...parsed }))
        setQiKeFa(parsed.qiKeFa || "zhengshi")
        setYueJiangXuanQu(parsed.yueJiangXuanQu || "auto")
        setGuiRenQiFa(parsed.guiRenQiFa || "甲戊庚牛羊")
        setGuiRenXuanQu(parsed.guiRenXuanQu || "auto")
        setSheHaiQuFa(parsed.sheHaiQuFa || "depth")
      }
    } catch (e) {
      console.error("Failed to load settings", e)
    }
  }, [])
  
  // 保存设置到本地存储
  const saveSettings = useCallback(() => {
    try {
      const toSave = {
        ...settings,
        qiKeFa,
        yueJiangXuanQu,
        guiRenQiFa,
        guiRenXuanQu,
        sheHaiQuFa,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (e) {
      console.error("Failed to save settings", e)
    }
  }, [settings, qiKeFa, yueJiangXuanQu, guiRenQiFa, guiRenXuanQu, sheHaiQuFa])
  
  // 设置变更时保存
  useEffect(() => {
    saveSettings()
  }, [saveSettings])
  
  // 获取时辰
  const getShiChen = (hour: number): string => {
    const shiChenList = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
    if (hour === 23 || hour === 0) return "子"
    return shiChenList[Math.floor((hour + 1) / 2)]
  }
  
  // 获取生肖
  const getShengXiao = (year: number): string => {
    const animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
    return animals[(year - 4) % 12]
  }
  
  // 起盘计算
  const calculatePan = () => {
    const [year, month, day] = selectedDate.split("-").map(Number)
    const [hour, minute] = selectedTime.split(":").map(Number)
    
    // 使用lunar-javascript计算干支
    const solar = Solar.fromYmd(year, month, day)
    const lunar = solar.getLunar()
    
    const yearGanZhi = lunar.getYearInGanZhiExact()
    const monthGanZhi = lunar.getMonthInGanZhiExact()
    const dayGanZhi = lunar.getDayInGanZhi()
    
    // 计算时辰干支
    const shiChen = getShiChen(hour)
    const dayGanIndex = TIAN_GAN.findIndex(g => g.name === dayGanZhi[0])
    const shiGanIndex = (dayGanIndex % 5) * 2 + DI_ZHI.findIndex(z => z.name === shiChen)
    const shiGan = TIAN_GAN[shiGanIndex % 10].name
    const hourGanZhi = shiGan + shiChen
    
    // 计算月将（简化：根据月份）
    const yueJiangList = ["亥", "戌", "酉", "申", "未", "午", "巳", "辰", "卯", "寅", "丑", "子"]
    const yueJiang = yueJiangList[(month - 1) % 12]
    
    // 计算天盘（月将加时）
    const diZhiOrder = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
    const yueJiangIndex = diZhiOrder.indexOf(yueJiang)
    const shiChenIndex = diZhiOrder.indexOf(shiChen)
    const offset = (yueJiangIndex - shiChenIndex + 12) % 12
    
    const tianPan = diZhiOrder.map((_, i) => diZhiOrder[(i + offset) % 12])
    
    // 计算四课
    const dayGan = dayGanZhi[0]
    const dayZhi = dayGanZhi[1]
    const dayZhiIndex = diZhiOrder.indexOf(dayZhi)
    
    // 第一课：日干上神
    const ke1Zhi = tianPan[dayZhiIndex]
    // 第二课：日干上神的上神
    const ke1ZhiIndex = diZhiOrder.indexOf(ke1Zhi)
    const ke2Zhi = tianPan[ke1ZhiIndex]
    // 第三课：日支上神
    const ke3Zhi = tianPan[dayZhiIndex]
    // 第四课：日支上神的上神
    const ke3ZhiIndex = diZhiOrder.indexOf(ke3Zhi)
    const ke4Zhi = tianPan[ke3ZhiIndex]
    
    const siKe = [
      { gan: dayGan, zhi: dayZhi, shen: ke1Zhi, jiang: getTianJiang(ke1Zhi, dayGan) },
      { gan: ke1Zhi, zhi: "", shen: ke2Zhi, jiang: getTianJiang(ke2Zhi, dayGan) },
      { gan: dayZhi, zhi: "", shen: ke3Zhi, jiang: getTianJiang(ke3Zhi, dayGan) },
      { gan: ke3Zhi, zhi: "", shen: ke4Zhi, jiang: getTianJiang(ke4Zhi, dayGan) },
    ]
    
    // 简化三传计算（取发用）
    const sanChuan = {
      chu: ke1Zhi,
      zhong: ke2Zhi,
      mo: ke3Zhi,
    }
    
    // 判断课格
    const keGe = "遥克" // 简化，实际需要复杂判断
    
    // 计算旬空
    const dayJiaZiIndex = JIA_ZI_60.indexOf(dayGanZhi)
    const xunIndex = Math.floor(dayJiaZiIndex / 10) * 10
    const xunShou = JIA_ZI_60[xunIndex]
    const xunKong = XUN_KONG[xunShou] || ["戌", "亥"]
    
    // 计算本命
    const benMingIndex = (birthYear - 4) % 60
    const benMing = JIA_ZI_60[benMingIndex] || "庚申"
    
    // 计算行年
    const age = year - birthYear
    const xingNianIndex = (benMingIndex + age) % 60
    const xingNian = JIA_ZI_60[xingNianIndex] || "壬子"
    
    // 计算神煞
    const shenSha = [
      { name: "太歲", zhi: diZhiOrder[(year - 4) % 12] },
      { name: "月建", zhi: diZhiOrder[(month + 1) % 12] },
      { name: "日建", zhi: dayZhi },
      { name: "月破", zhi: diZhiOrder[(month + 7) % 12] },
      { name: "日德", zhi: getDeDe(dayGan) },
      { name: "日祿", zhi: getLu(dayGan) },
      { name: "日馬", zhi: getMa(dayZhi) },
    ]
    
    setResult({
      siZhu: {
        year: yearGanZhi,
        month: monthGanZhi,
        day: dayGanZhi,
        hour: hourGanZhi,
      },
      yueJiang,
      tianPan,
      siKe,
      sanChuan,
      keGe,
      xunKong,
      riKong: xunKong,
      shiKong: xunKong,
      benMing,
      xingNian,
      shenSha,
    })
    
    // 保存到历史
    saveToHistory()
  }
  
  // 获取天将
  const getTianJiang = (zhi: string, dayGan: string): string => {
    // 简化版天将排布
    const jiangOrder = ["貴", "蛇", "朱", "合", "勾", "龍", "空", "虎", "常", "玄", "陰", "后"]
    const zhiIndex = DI_ZHI.findIndex(d => d.name === zhi)
    return jiangOrder[zhiIndex % 12]
  }
  
  // 获取日德
  const getDeDe = (gan: string): string => {
    const deMap: Record<string, string> = { "甲": "寅", "乙": "卯", "丙": "巳", "丁": "午", "戊": "巳", "己": "午", "庚": "申", "辛": "酉", "壬": "亥", "癸": "子" }
    return deMap[gan] || "子"
  }
  
  // 获取日禄
  const getLu = (gan: string): string => {
    const luMap: Record<string, string> = { "甲": "寅", "乙": "卯", "丙": "巳", "丁": "午", "戊": "巳", "己": "午", "庚": "申", "辛": "酉", "壬": "亥", "癸": "子" }
    return luMap[gan] || "子"
  }
  
  // 获取驿马
  const getMa = (zhi: string): string => {
    const maMap: Record<string, string> = { "寅": "申", "午": "申", "戌": "申", "申": "寅", "子": "寅", "辰": "寅", "巳": "亥", "酉": "亥", "丑": "亥", "亥": "巳", "卯": "巳", "未": "巳" }
    return maMap[zhi] || "寅"
  }
  
  // 保存到历史
  const saveToHistory = () => {
    try {
      const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]")
      history.unshift({
        date: selectedDate,
        time: selectedTime,
        birthYear,
        gender,
        timestamp: Date.now(),
      })
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)))
    } catch (e) {
      console.error("Failed to save history", e)
    }
  }
  
  // 重置
  const handleReset = () => {
    const now = new Date()
    setSelectedDate(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`)
    setSelectedTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`)
    setResult(null)
  }
  
  // 获取五行颜色
  const getWuxingColor = (zhi: string): string => {
    const wuxingColors: Record<string, string> = {
      "子": "#1E88E5", "亥": "#42A5F5", // 水-蓝
      "寅": "#43A047", "卯": "#66BB6A", // 木-绿
      "巳": "#EF5350", "午": "#F44336", // 火-红
      "丑": "#8D6E63", "辰": "#A1887F", "未": "#BCAAA4", "戌": "#8D6E63", // 土-棕
      "申": "#FFC107", "酉": "#FFD54F", // 金-黄
    }
    return wuxingColors[zhi] || "#666"
  }
  
  // 获取天将颜色
  const getJiangColor = (jiang: string): string => {
    const jiangColors: Record<string, string> = {
      "貴": "#FFD700", "蛇": "#FF6B6B", "朱": "#FF4444", "合": "#4CAF50",
      "勾": "#795548", "龍": "#2196F3", "空": "#03A9F4", "虎": "#9E9E9E",
      "常": "#8BC34A", "玄": "#212121", "陰": "#9E9E9E", "后": "#9C27B0",
    }
    return jiangColors[jiang] || "#666"
  }

  // 获取农历信息
  const getLunarInfo = () => {
    const [year, month, day] = selectedDate.split("-").map(Number)
    const solar = Solar.fromYmd(year, month, day)
    const lunar = solar.getLunar()
    return {
      lunarDate: `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
      jieQi: lunar.getJieQi() || "",
      nextJieQi: lunar.getNextJieQi()?.getName() || "",
    }
  }

  const lunarInfo = getLunarInfo()
  const shengXiao = getShengXiao(birthYear)
  const [hour] = selectedTime.split(":").map(Number)
  const shiChen = getShiChen(hour)

  // 如果还没有结果，显示输入界面
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#e8f4f8] to-[#d4e8e0]">
        {/* 顶部导航 */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <button onClick={onBack} className="p-2 -ml-2">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">起六壬</h1>
          <button onClick={() => setShowSettings(true)} className="p-2 -mr-2">
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* 新建资料卡片 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-600 text-white px-4 py-3 flex items-center justify-between">
              <span className="font-medium">新建资料</span>
              <HelpCircle className="w-5 h-5 text-white/70" />
            </div>
            
            <div className="divide-y divide-gray-100">
              {/* 起课法 */}
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-gray-700">起课法</span>
                <select
                  value={qiKeFa}
                  onChange={e => setQiKeFa(e.target.value)}
                  className="bg-transparent text-right text-[#0891b2] font-medium focus:outline-none cursor-pointer"
                >
                  {QI_KE_FA.map(qk => (
                    <option key={qk.id} value={qk.id}>{qk.name}</option>
                  ))}
                </select>
              </div>
              
              {/* 日期 */}
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-gray-700">日期</span>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="bg-transparent text-right text-gray-800 font-medium focus:outline-none"
                  />
                  <Calendar className="w-5 h-5 text-[#0891b2]" />
                </div>
              </div>
              
              {/* 时间 */}
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-gray-700">时间</span>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={e => setSelectedTime(e.target.value)}
                    className="bg-transparent text-right text-gray-800 font-medium focus:outline-none"
                  />
                  <Clock className="w-5 h-5 text-[#0891b2]" />
                </div>
              </div>
              
              {/* 出生年 */}
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-gray-700">出生年</span>
                <select
                  value={birthYear}
                  onChange={e => setBirthYear(Number(e.target.value))}
                  className="bg-transparent text-right text-gray-800 font-medium focus:outline-none cursor-pointer"
                >
                  {Array.from({ length: 100 }, (_, i) => 2024 - i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              
              {/* 性别 */}
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-gray-700">性别</span>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value as "male" | "female")}
                  className="bg-transparent text-right text-gray-800 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
              </div>
              
              {/* 按钮 */}
              <div className="px-4 py-4 flex gap-4">
                <button
                  onClick={calculatePan}
                  className="flex-1 bg-white border-2 border-[#0891b2] text-[#0891b2] py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#0891b2]/5 transition-colors"
                >
                  <Grid3X3 className="w-5 h-5" />
                  起盘
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-white border-2 border-[#0891b2] text-[#0891b2] py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#0891b2]/5 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  重置
                </button>
              </div>
            </div>
          </div>
          
          {/* 更多参数 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setShowMoreParams(!showMoreParams)}
              className="w-full bg-gray-600 text-white px-4 py-3 flex items-center justify-center gap-2"
            >
              <span className="font-medium">更多参数</span>
              <ChevronRight className={`w-5 h-5 transition-transform ${showMoreParams ? 'rotate-90' : ''}`} />
            </button>
            
            {showMoreParams && (
              <div className="divide-y divide-gray-100">
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-gray-700">月将选取</span>
                  <select
                    value={yueJiangXuanQu}
                    onChange={e => setYueJiangXuanQu(e.target.value)}
                    className="bg-transparent text-right text-[#0891b2] font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="auto">自动</option>
                    <option value="zhongqi">中气</option>
                    <option value="jieqi">节气</option>
                  </select>
                </div>
                
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-gray-700">贵人起法</span>
                  <select
                    value={guiRenQiFa}
                    onChange={e => setGuiRenQiFa(e.target.value)}
                    className="bg-transparent text-right text-[#0891b2] font-medium focus:outline-none cursor-pointer text-sm"
                  >
                    <option value="甲戊庚牛羊">甲戊庚牛羊(壬癸蛇兔)</option>
                    <option value="甲戊兼牛羊">甲戊兼牛羊</option>
                  </select>
                </div>
                
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-gray-700">贵人选取</span>
                  <select
                    value={guiRenXuanQu}
                    onChange={e => setGuiRenXuanQu(e.target.value)}
                    className="bg-transparent text-right text-[#0891b2] font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="auto">自动</option>
                    <option value="day">昼贵</option>
                    <option value="night">夜贵</option>
                  </select>
                </div>
                
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-gray-700">涉害取法</span>
                  <select
                    value={sheHaiQuFa}
                    onChange={e => setSheHaiQuFa(e.target.value)}
                    className="bg-transparent text-right text-[#0891b2] font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="depth">根据深度</option>
                    <option value="count">根据数量</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // 显示盘面
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f4f8] to-[#f5f5dc]">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => setResult(null)} className="text-[#0891b2]">
          <ChevronLeft className="w-7 h-7" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">六壬盤面</h1>
        <div className="flex items-center gap-2">
          <button className="p-1 text-[#0891b2]"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={handleReset} className="p-1 text-[#0891b2]"><RefreshCw className="w-5 h-5" /></button>
          <button className="p-1 text-[#0891b2]"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      
      {/* 日期时间显示 */}
      <div className="px-4 py-2 text-center text-sm text-gray-600">
        <div>{selectedDate} {selectedTime}</div>
        <div>二〇二六年 {lunarInfo.lunarDate} {shiChen}时</div>
        {lunarInfo.jieQi && <div className="text-xs text-gray-500">{lunarInfo.jieQi}</div>}
      </div>
      
      {/* 主盘面区域 */}
      <div className="px-2 flex gap-2">
        {/* 左侧信息栏 */}
        <div className="w-24 text-xs space-y-2">
          {/* 四柱 */}
          <div className="bg-[#e8e8d0] rounded border border-gray-300">
            <div className="grid grid-cols-4 text-center border-b border-gray-300">
              <span className="bg-[#d0d0b0] py-1 text-gray-700">年</span>
              <span className="bg-[#d0d0b0] py-1 text-gray-700">月</span>
              <span className="bg-[#d0d0b0] py-1 text-gray-700">日</span>
              <span className="bg-[#d0d0b0] py-1 text-gray-700">時</span>
            </div>
            <div className="grid grid-cols-4 text-center py-1">
              <div>
                <div style={{ color: getWuxingColor(result.siZhu.year[1]) }}>{result.siZhu.year[0]}</div>
                <div style={{ color: getWuxingColor(result.siZhu.year[1]) }}>{result.siZhu.year[1]}</div>
              </div>
              <div>
                <div style={{ color: getWuxingColor(result.siZhu.month[1]) }}>{result.siZhu.month[0]}</div>
                <div style={{ color: getWuxingColor(result.siZhu.month[1]) }}>{result.siZhu.month[1]}</div>
              </div>
              <div>
                <div style={{ color: getWuxingColor(result.siZhu.day[1]) }}>{result.siZhu.day[0]}</div>
                <div style={{ color: getWuxingColor(result.siZhu.day[1]) }}>{result.siZhu.day[1]}</div>
              </div>
              <div>
                <div style={{ color: getWuxingColor(result.siZhu.hour[1]) }}>{result.siZhu.hour[0]}</div>
                <div style={{ color: getWuxingColor(result.siZhu.hour[1]) }}>{result.siZhu.hour[1]}</div>
              </div>
            </div>
          </div>
          
          {/* 用户信息 */}
          <div className="bg-[#e8e8d0] rounded border border-gray-300 p-2">
            <div className="text-gray-800 font-medium">{shengXiao}({birthYear}) {gender === "male" ? "男" : "女"}</div>
            <div className="mt-1 space-y-0.5">
              <div className="flex justify-between">
                <span className="bg-[#d0d0b0] px-1">本命</span>
                <span className="text-red-500 font-medium">{result.benMing}</span>
              </div>
              <div className="flex justify-between">
                <span className="bg-[#d0d0b0] px-1">行年</span>
                <span className="text-blue-500 font-medium">{result.xingNian}</span>
              </div>
            </div>
          </div>
          
          {/* 月将 */}
          <div className="bg-[#e8e8d0] rounded border border-gray-300 p-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">月將</span>
              <span className="text-red-500 font-bold text-lg">{result.yueJiang}</span>
            </div>
          </div>
          
          {/* 空亡 */}
          <div className="bg-[#e8e8d0] rounded border border-gray-300 p-2 space-y-1">
            <div className="flex justify-between">
              <span className="bg-[#d0d0b0] px-1">日空</span>
              <span className="text-green-600">{result.riKong.join(" ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="bg-[#d0d0b0] px-1">時空</span>
              <span className="text-green-600">{result.shiKong.join(" ")}</span>
            </div>
          </div>
          
          {/* 神煞列表 */}
          <div className="bg-[#e8e8d0] rounded border border-gray-300 p-2 space-y-1">
            {result.shenSha.slice(0, 8).map((sha, i) => (
              <div key={i} className="flex justify-between">
                <span className={sha.name.includes("破") || sha.name.includes("煞") ? "text-red-600" : "text-gray-700"}>{sha.name}</span>
                <span className="text-red-500 font-medium">{sha.zhi}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 右侧十二宫盘面 */}
        <div className="flex-1">
          {/* 三传与四课 */}
          <div className="bg-[#e8e8d0] rounded border border-gray-300 mb-2">
            <div className="grid grid-cols-4 text-center text-sm">
              {/* 四课顶行 */}
              <div className="border-r border-b border-gray-300 p-1">
                <div className="text-gray-500 text-xs">官</div>
                <div className="text-gray-600">父</div>
              </div>
              <div className="border-r border-b border-gray-300 p-1">
                <div style={{ color: getWuxingColor(result.siKe[1]?.shen || "") }}>{result.siKe[1]?.jiang}</div>
                <div style={{ color: getWuxingColor(result.siKe[1]?.shen || "") }}>{result.siKe[1]?.shen}</div>
              </div>
              <div className="border-r border-b border-gray-300 p-1 bg-yellow-50">
                <div className="text-red-500 font-bold text-lg">{result.sanChuan.chu}</div>
                <div style={{ color: getWuxingColor(result.sanChuan.chu) }}>{result.siKe[0]?.shen}</div>
              </div>
              <div className="border-b border-gray-300 p-1 text-gray-500">
                <div>初</div>
                <div>中</div>
                <div>末</div>
              </div>
            </div>
          </div>
          
          {/* 十二宫格 */}
          <div className="bg-[#e8e8d0] rounded border border-gray-300">
            <div className="grid grid-cols-4 text-center text-sm">
              {/* 第一行 */}
              {[3, 2, 1, 0].map(i => {
                const zhi = result.tianPan[i + 3] || DI_ZHI[i + 3].name
                const diZhi = DI_ZHI[i + 3].name
                const jiang = getTianJiang(zhi, result.siZhu.day[0])
                return (
                  <div key={i} className="border-r border-b border-gray-300 p-1 last:border-r-0">
                    <div style={{ color: getJiangColor(jiang) }} className="text-xs">{jiang}</div>
                    <div style={{ color: getWuxingColor(zhi) }} className="font-bold">{zhi}</div>
                    <div className="text-gray-500 text-xs">{diZhi}</div>
                  </div>
                )
              })}
              
              {/* 第二行 */}
              <div className="border-r border-b border-gray-300 p-1">
                <div style={{ color: getJiangColor(getTianJiang(result.tianPan[7], result.siZhu.day[0])) }} className="text-xs">{getTianJiang(result.tianPan[7], result.siZhu.day[0])}</div>
                <div style={{ color: getWuxingColor(result.tianPan[7]) }} className="font-bold">{result.tianPan[7]}</div>
                <div className="text-gray-500 text-xs">未</div>
              </div>
              <div className="col-span-2 border-r border-b border-gray-300 p-2 bg-white/50">
                <div className="text-center">
                  <div className="text-gray-800 font-medium">{result.siZhu.day}日</div>
                  <div className="text-gray-600">第十课</div>
                  <div className="text-[#0891b2] font-bold">{result.keGe}</div>
                </div>
              </div>
              <div className="border-b border-gray-300 p-1">
                <div style={{ color: getJiangColor(getTianJiang(result.tianPan[0], result.siZhu.day[0])) }} className="text-xs">{getTianJiang(result.tianPan[0], result.siZhu.day[0])}</div>
                <div style={{ color: getWuxingColor(result.tianPan[0]) }} className="font-bold">{result.tianPan[0]}</div>
                <div className="text-gray-500 text-xs">子</div>
              </div>
              
              {/* 第三行 */}
              <div className="border-r border-b border-gray-300 p-1">
                <div style={{ color: getJiangColor(getTianJiang(result.tianPan[8], result.siZhu.day[0])) }} className="text-xs">{getTianJiang(result.tianPan[8], result.siZhu.day[0])}</div>
                <div style={{ color: getWuxingColor(result.tianPan[8]) }} className="font-bold">{result.tianPan[8]}</div>
                <div className="text-gray-500 text-xs">申</div>
              </div>
              <div className="col-span-2 border-r border-b border-gray-300 p-1" />
              <div className="border-b border-gray-300 p-1">
                <div style={{ color: getJiangColor(getTianJiang(result.tianPan[11], result.siZhu.day[0])) }} className="text-xs">{getTianJiang(result.tianPan[11], result.siZhu.day[0])}</div>
                <div style={{ color: getWuxingColor(result.tianPan[11]) }} className="font-bold">{result.tianPan[11]}</div>
                <div className="text-gray-500 text-xs">亥</div>
              </div>
              
              {/* 第四行 */}
              {[9, 10, 11, 0].map((i, idx) => {
                const actualIndex = i === 0 ? 1 : i === 11 ? 2 : i - 8
                const zhi = result.tianPan[9 + idx] || DI_ZHI[9 + idx]?.name || ""
                const diZhi = ["酉", "戌", "亥", "子"][idx]
                const jiang = getTianJiang(zhi, result.siZhu.day[0])
                return (
                  <div key={idx} className="border-r border-gray-300 p-1 last:border-r-0">
                    <div style={{ color: getJiangColor(jiang) }} className="text-xs">{jiang}</div>
                    <div style={{ color: getWuxingColor(zhi) }} className="font-bold">{zhi}</div>
                    <div className="text-gray-500 text-xs">{diZhi}</div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* 提示 */}
          <div className="mt-2 text-center text-xs text-[#0891b2]">
            点击12宫位和中宫可看更多信息
          </div>
          <div className="text-center text-xs text-gray-500">
            贵人[{guiRenQiFa}]--自动
          </div>
        </div>
      </div>
      
      {/* 底部Tab */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex">
        {[
          { id: "panmian", label: "盤面", icon: Grid3X3 },
          { id: "fuzhu", label: "輔助", icon: HelpCircle },
          { id: "shensha", label: "神煞", icon: Star },
          { id: "pingzhu", label: "評註", icon: MessageSquare },
          { id: "dangan", label: "檔案", icon: Folder },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-[#0891b2] border-t-2 border-[#0891b2]' : 'text-gray-500'}`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* 底部留白 */}
      <div className="h-20" />
    </div>
  )
}
