"use client"

import { useState } from "react"
import { ChevronLeft, MoreHorizontal, Eye, Edit2, ChevronDown, ChevronUp, Settings } from "lucide-react"
import {
  calculateBazi, BaziResult, BaziOptions,
  getWuXingColor, getWuXingIcon, SHICHEN_TIMES,
  TIANGAN_WUXING, DIZHI_WUXING, SHENGXIAO_ICONS
} from "@/lib/bazi/lunar-calculator"

interface BaziPaipanProps {
  onBack: () => void
  onAIAnalysis?: () => void
}

// 天干地支列表
const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

export function BaziPaipan({ onBack }: BaziPaipanProps) {
  // Tab状态
  const [activeTab, setActiveTab] = useState<"basic" | "chart" | "detail" | "notes">("chart")
  
  // 输入模式: solar=公历, lunar=农历, sizhu=四柱
  const [inputMode, setInputMode] = useState<"solar" | "lunar" | "sizhu">("solar")
  
  // 输入状态
  const [showResult, setShowResult] = useState(false)
  const [birthYear, setBirthYear] = useState(1990)
  const [birthMonth, setBirthMonth] = useState(1)
  const [birthDay, setBirthDay] = useState(1)
  const [birthHour, setBirthHour] = useState(0) // 0=子时
  const [gender, setGender] = useState<"male" | "female">("male")
  
  // 四柱直接输入
  const [sizhuYear, setSizhuYear] = useState({ gan: 0, zhi: 0 }) // 甲子
  const [sizhuMonth, setSizhuMonth] = useState({ gan: 0, zhi: 2 }) // 甲寅
  const [sizhuDay, setSizhuDay] = useState({ gan: 0, zhi: 0 }) // 甲子
  const [sizhuHour, setSizhuHour] = useState({ gan: 0, zhi: 0 }) // 甲子
  
  // 高级设置
  const [showSettings, setShowSettings] = useState(false)
  const [sect, setSect] = useState<1 | 2>(2) // 晚子时算法
  
  // 计算结果
  const [result, setResult] = useState<BaziResult | null>(null)
  const [calcError, setCalcError] = useState<string | null>(null)
  
  // 时辰列表
  const shichenList = [
    { name: "子时", range: "23:00-01:00", value: 0 },
    { name: "丑时", range: "01:00-03:00", value: 1 },
    { name: "寅时", range: "03:00-05:00", value: 2 },
    { name: "卯时", range: "05:00-07:00", value: 3 },
    { name: "辰时", range: "07:00-09:00", value: 4 },
    { name: "巳时", range: "09:00-11:00", value: 5 },
    { name: "午时", range: "11:00-13:00", value: 6 },
    { name: "未时", range: "13:00-15:00", value: 7 },
    { name: "申时", range: "15:00-17:00", value: 8 },
    { name: "酉时", range: "17:00-19:00", value: 9 },
    { name: "戌时", range: "19:00-21:00", value: 10 },
    { name: "亥时", range: "21:00-23:00", value: 11 },
  ]
  
  // 执行排盘
  const handlePaipan = () => {
    try {
      setCalcError(null)
      
      if (inputMode === "sizhu") {
        // 四柱模式：直接使用输入的四柱创建模拟结果
        const yearGan = TIANGAN[sizhuYear.gan]
        const yearZhi = DIZHI[sizhuYear.zhi]
        const monthGan = TIANGAN[sizhuMonth.gan]
        const monthZhi = DIZHI[sizhuMonth.zhi]
        const dayGan = TIANGAN[sizhuDay.gan]
        const dayZhi = DIZHI[sizhuDay.zhi]
        const hourGan = TIANGAN[sizhuHour.gan]
        const hourZhi = DIZHI[sizhuHour.zhi]
        
        // 创建简化的结果对象
        const mockResult: BaziResult = {
          // 基本信息
          solar: { year: birthYear, month: birthMonth, day: birthDay },
          lunar: { year: birthYear, month: birthMonth, day: birthDay, isLeap: false },
          gender,
          
          // 四柱
          year: { gan: yearGan, zhi: yearZhi, ganZhi: yearGan + yearZhi },
          month: { gan: monthGan, zhi: monthZhi, ganZhi: monthGan + monthZhi },
          day: { gan: dayGan, zhi: dayZhi, ganZhi: dayGan + dayZhi },
          hour: { gan: hourGan, zhi: hourZhi, ganZhi: hourGan + hourZhi },
          
          // 十神
          shiShen: {
            year: getShiShen(dayGan, yearGan),
            month: getShiShen(dayGan, monthGan),
            day: "日主",
            hour: getShiShen(dayGan, hourGan)
          },
          
          // 藏干
          cangGan: {
            year: getCangGan(yearZhi),
            month: getCangGan(monthZhi),
            day: getCangGan(dayZhi),
            hour: getCangGan(hourZhi)
          },
          
          // 其他属性
          kongWang: { year: "戌亥", month: "申酉", day: "午未", hour: "辰巳" },
          changSheng: { year: "长生", month: "沐浴", day: "冠带", hour: "临官" },
          naYin: {
            year: getNaYin(yearGan + yearZhi),
            month: getNaYin(monthGan + monthZhi),
            day: getNaYin(dayGan + dayZhi),
            hour: getNaYin(hourGan + hourZhi)
          },
          shenSha: { year: [], month: [], day: [], hour: [] },
          
          // 大运流年
          daYun: [],
          liuNian: [],
          qiYun: { years: 0, months: 0, days: 0, direction: "顺行" },
          
          // 五行
          wuXingCount: { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 },
          wuXingStrength: { 旺: "水", 相: "木", 休: "金", 囚: "土", 死: "火" },
          
          // 关系
          ganZhiRelation: { tianGan: [], diZhi: [], zhengZhu: [] },
          jieQi: { current: "", next: "", nextDate: "" },
          tiaoHou: { yongShen: [], xiShen: [], jiShen: [] },
          shengXiao: getShengXiao(yearZhi)
        }
        
        setResult(mockResult)
        setShowResult(true)
        return
      }
      
      // 公历/农历模式
      const hourMap: Record<number, number> = {
        0: 23, 1: 1, 2: 3, 3: 5, 4: 7, 5: 9,
        6: 11, 7: 13, 8: 15, 9: 17, 10: 19, 11: 21
      }
      
      const options: BaziOptions = {
        year: birthYear,
        month: birthMonth,
        day: birthDay,
        hour: hourMap[birthHour],
        isLunar: inputMode === "lunar",
        gender,
        sect
      }
      
      const baziResult = calculateBazi(options)
      setResult(baziResult)
      setShowResult(true)
    } catch (error) {
      console.error("排盘计算错误:", error)
      setCalcError("排盘计算出错，请检查输入日期是否有效")
    }
  }
  
  // 生成年份列表
  const years = Array.from({ length: 150 }, (_, i) => 1900 + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  // 输入界面
  if (!showResult) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex flex-col">
        {/* 头部 */}
        <header className="flex items-center justify-between px-4 py-3 bg-[#2a2520] sticky top-0 z-10">
          <button onClick={onBack} className="p-2 -ml-2 active:opacity-70">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg font-medium">八字排盘</h1>
          <div className="w-10" />
        </header>
        
        {/* 输入模式切换 - 公历/农历/四柱 */}
        <div className="flex justify-center gap-2 p-4 bg-[#f8f5f0]">
          {[
            { key: "solar", label: "公历" },
            { key: "lunar", label: "农历" },
            { key: "sizhu", label: "四柱" }
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setInputMode(mode.key as "solar" | "lunar" | "sizhu")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                inputMode === mode.key
                  ? "bg-[#d4af37] text-white"
                  : "bg-white text-[#666] border border-[#e0e0e0]"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 px-4 pb-4 overflow-auto">
          {/* 四柱输入模式 */}
          {inputMode === "sizhu" ? (
            <div className="bg-white rounded-xl p-4 space-y-4">
              <h3 className="text-[#333] font-medium mb-3">直接输入四柱</h3>
              
              {/* 年柱 */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-[#666]">年柱：</span>
                <select
                  value={sizhuYear.gan}
                  onChange={(e) => setSizhuYear({ ...sizhuYear, gan: parseInt(e.target.value) })}
                  className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                >
                  {TIANGAN.map((g, i) => <option key={i} value={i}>{g}</option>)}
                </select>
                <select
                  value={sizhuYear.zhi}
                  onChange={(e) => setSizhuYear({ ...sizhuYear, zhi: parseInt(e.target.value) })}
                  className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                >
                  {DIZHI.map((z, i) => <option key={i} value={i}>{z}</option>)}
                </select>
              </div>
              
              {/* 月柱 */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-[#666]">月柱：</span>
                <select
                  value={sizhuMonth.gan}
                  onChange={(e) => setSizhuMonth({ ...sizhuMonth, gan: parseInt(e.target.value) })}
                  className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                >
                  {TIANGAN.map((g, i) => <option key={i} value={i}>{g}</option>)}
                </select>
                <select
                  value={sizhuMonth.zhi}
                  onChange={(e) => setSizhuMonth({ ...sizhuMonth, zhi: parseInt(e.target.value) })}
                  className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                >
                  {DIZHI.map((z, i) => <option key={i} value={i}>{z}</option>)}
                </select>
              </div>
              
              {/* 日柱 */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-[#666]">日柱：</span>
                <select
                  value={sizhuDay.gan}
                  onChange={(e) => setSizhuDay({ ...sizhuDay, gan: parseInt(e.target.value) })}
                  className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                >
                  {TIANGAN.map((g, i) => <option key={i} value={i}>{g}</option>)}
                </select>
                <select
                  value={sizhuDay.zhi}
                  onChange={(e) => setSizhuDay({ ...sizhuDay, zhi: parseInt(e.target.value) })}
                  className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                >
                  {DIZHI.map((z, i) => <option key={i} value={i}>{z}</option>)}
                </select>
              </div>
              
              {/* 时柱 */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-[#666]">时柱：</span>
                <select
                  value={sizhuHour.gan}
                  onChange={(e) => setSizhuHour({ ...sizhuHour, gan: parseInt(e.target.value) })}
                  className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                >
                  {TIANGAN.map((g, i) => <option key={i} value={i}>{g}</option>)}
                </select>
                <select
                  value={sizhuHour.zhi}
                  onChange={(e) => setSizhuHour({ ...sizhuHour, zhi: parseInt(e.target.value) })}
                  className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                >
                  {DIZHI.map((z, i) => <option key={i} value={i}>{z}</option>)}
                </select>
              </div>
              
              {/* 性别选择 */}
              <div className="flex items-center gap-3 pt-2">
                <span className="w-16 text-[#666]">性别：</span>
                <div className="flex gap-3 flex-1">
                  <button
                    onClick={() => setGender("male")}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      gender === "male"
                        ? "bg-[#d4af37] text-white"
                        : "bg-[#f8f5f0] text-[#666]"
                    }`}
                  >
                    乾造(男)
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      gender === "female"
                        ? "bg-[#d4af37] text-white"
                        : "bg-[#f8f5f0] text-[#666]"
                    }`}
                  >
                    坤造(女)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* 公历/农历输入模式 */
            <div className="space-y-4">
              {/* 出生日期 */}
              <div className="bg-white rounded-xl p-4">
                <h3 className="text-[#333] font-medium mb-3">
                  出生日期（{inputMode === "solar" ? "公历" : "农历"}）
                </h3>
                <div className="flex gap-2">
                  <select
                    value={birthYear}
                    onChange={(e) => setBirthYear(parseInt(e.target.value))}
                    className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                  >
                    {years.map((y) => <option key={y} value={y}>{y}年</option>)}
                  </select>
                  <select
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(parseInt(e.target.value))}
                    className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                  >
                    {months.map((m) => <option key={m} value={m}>{m}月</option>)}
                  </select>
                  <select
                    value={birthDay}
                    onChange={(e) => setBirthDay(parseInt(e.target.value))}
                    className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                  >
                    {days.map((d) => <option key={d} value={d}>{d}日</option>)}
                  </select>
                </div>
              </div>
              
              {/* 出生时辰 */}
              <div className="bg-white rounded-xl p-4">
                <h3 className="text-[#333] font-medium mb-3">出生时辰</h3>
                <div className="grid grid-cols-4 gap-2">
                  {shichenList.map((sc) => (
                    <button
                      key={sc.value}
                      onClick={() => setBirthHour(sc.value)}
                      className={`py-2 px-1 rounded-lg text-center transition-all ${
                        birthHour === sc.value
                          ? "bg-[#d4af37] text-white"
                          : "bg-[#f8f5f0] text-[#666]"
                      }`}
                    >
                      <div className="text-sm font-medium">{sc.name}</div>
                      <div className="text-[10px] opacity-70">{sc.range}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 性别选择 */}
              <div className="bg-white rounded-xl p-4">
                <h3 className="text-[#333] font-medium mb-3">性别</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setGender("male")}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      gender === "male"
                        ? "bg-[#d4af37] text-white"
                        : "bg-[#f8f5f0] text-[#666]"
                    }`}
                  >
                    乾造(男)
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      gender === "female"
                        ? "bg-[#d4af37] text-white"
                        : "bg-[#f8f5f0] text-[#666]"
                    }`}
                  >
                    坤造(女)
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* 高级设置 */}
          <div className="mt-4 bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#999]" />
                <span className="text-[#333]">高级设置</span>
              </div>
              {showSettings ? (
                <ChevronUp className="w-5 h-5 text-[#999]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#999]" />
              )}
            </button>
            {showSettings && (
              <div className="px-4 pb-4 space-y-3 border-t border-[#f0f0f0]">
                <div className="pt-3">
                  <p className="text-sm text-[#666] mb-2">晚子时（23:00-01:00）日柱算法：</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSect(1)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm ${
                        sect === 1
                          ? "bg-[#d4af37] text-white"
                          : "bg-[#f8f5f0] text-[#666]"
                      }`}
                    >
                      算当天
                    </button>
                    <button
                      onClick={() => setSect(2)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm ${
                        sect === 2
                          ? "bg-[#d4af37] text-white"
                          : "bg-[#f8f5f0] text-[#666]"
                      }`}
                    >
                      算次日（推荐）
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 错误提示 */}
          {calcError && (
            <div className="mt-4 p-3 bg-red-50 rounded-xl text-red-600 text-sm">
              {calcError}
            </div>
          )}
          
          {/* 排盘按钮 */}
          <button
            onClick={handlePaipan}
            className="w-full mt-6 py-4 bg-[#d4af37] text-white rounded-xl font-medium text-lg active:opacity-80 transition-all shadow-lg"
          >
            立即排盘
          </button>
          
          {/* 免责声明 */}
          <p className="mt-4 text-center text-[#999] text-xs">
            命理分析仅供学术研究参考，不应作为人生重大决策依据
          </p>
        </div>
      </div>
    )
  }

  // 结果界面
  if (!result) return null
  
  const dayGan = result.day.gan
  const shengxiao = result.shengXiao || getShengXiao(result.year.zhi)

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex flex-col pb-20">
      {/* 头部 */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#2a2520] sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 active:opacity-70">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-lg font-medium">八字排盘</h1>
        <button className="p-2 -mr-2">
          <MoreHorizontal className="w-5 h-5 text-white/60" />
        </button>
      </header>
      
      {/* Tab导航 */}
      <div className="flex bg-[#2a2520] px-2 pb-2">
        {[
          { key: "basic", label: "基本信息" },
          { key: "chart", label: "基本排盘" },
          { key: "detail", label: "专业细盘" },
          { key: "notes", label: "断事笔记" }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 py-2 text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                : "text-white/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* 命主信息卡片 */}
      <div className="bg-[#2a2520] px-4 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#3a3530] flex items-center justify-center text-2xl">
            {SHENGXIAO_ICONS[shengxiao] || "🐲"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white/80">命例</span>
              <span className="px-2 py-0.5 bg-[#d4af37]/20 text-[#d4af37] text-xs rounded">
                {gender === "male" ? "乾造" : "坤造"}
              </span>
            </div>
            <div className="text-white/60 text-sm mt-1">
              农历：{result.lunar.year}年{result.lunar.month}月{result.lunar.day}日
            </div>
            <div className="text-white/40 text-xs">
              阳历：{result.solar.year}年{String(result.solar.month).padStart(2, '0')}月{String(result.solar.day).padStart(2, '0')}日
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-[#3a3530] rounded-full">
              <Eye className="w-4 h-4 text-white/60" />
            </button>
            <button className="p-2 bg-[#3a3530] rounded-full">
              <Edit2 className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="flex-1 overflow-auto">
        {/* 基本排盘Tab */}
        {activeTab === "chart" && (
          <div className="p-4 space-y-4">
            {/* 四柱表格 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              {/* 表头 */}
              <div className="grid grid-cols-5 border-b border-[#f0f0f0]">
                <div className="p-3 text-center text-[#999] text-sm">日期</div>
                <div className="p-3 text-center text-[#333] text-sm font-medium">年柱</div>
                <div className="p-3 text-center text-[#333] text-sm font-medium">月柱</div>
                <div className="p-3 text-center text-[#333] text-sm font-medium">日柱</div>
                <div className="p-3 text-center text-[#333] text-sm font-medium">时柱</div>
              </div>
              
              {/* 主星 */}
              <div className="grid grid-cols-5 border-b border-[#f0f0f0]">
                <div className="p-3 text-center text-[#999] text-sm">主星</div>
                {[result.shiShen.year, result.shiShen.month, result.shiShen.day, result.shiShen.hour].map((ss, i) => (
                  <div key={i} className="p-3 text-center text-[#d4af37] text-sm">{ss || "-"}</div>
                ))}
              </div>
              
              {/* 天干 */}
              <div className="grid grid-cols-5 border-b border-[#f0f0f0]">
                <div className="p-3 text-center text-[#999] text-sm">天干</div>
                {[result.year.gan, result.month.gan, result.day.gan, result.hour.gan].map((gan, i) => {
                  const wuxing = TIANGAN_WUXING[gan]
                  const color = getWuXingColor(wuxing)
                  const icon = getWuXingIcon(wuxing)
                  return (
                    <div key={i} className="p-3 text-center">
                      <span className="text-2xl font-bold" style={{ color }}>{gan}</span>
                      <span className="ml-1">{icon}</span>
                    </div>
                  )
                })}
              </div>
              
              {/* 地支 */}
              <div className="grid grid-cols-5 border-b border-[#f0f0f0]">
                <div className="p-3 text-center text-[#999] text-sm">地支</div>
                {[result.year.zhi, result.month.zhi, result.day.zhi, result.hour.zhi].map((zhi, i) => {
                  const wuxing = DIZHI_WUXING[zhi]
                  const color = getWuXingColor(wuxing)
                  const icon = getWuXingIcon(wuxing)
                  return (
                    <div key={i} className="p-3 text-center">
                      <span className="text-2xl font-bold" style={{ color }}>{zhi}</span>
                      <span className="ml-1">{icon}</span>
                    </div>
                  )
                })}
              </div>
              
              {/* 藏干 */}
              <div className="grid grid-cols-5 border-b border-[#f0f0f0]">
                <div className="p-3 text-center text-[#999] text-sm">藏干</div>
                {[result.cangGan.year, result.cangGan.month, result.cangGan.day, result.cangGan.hour].map((cg, i) => (
                  <div key={i} className="p-2 text-center">
                    {cg.map((g, j) => {
                      const wuxing = TIANGAN_WUXING[g]
                      const color = getWuXingColor(wuxing)
                      return (
                        <div key={j} className="text-xs" style={{ color }}>
                          {g}{wuxing}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              
              {/* 副星（藏干十神） */}
              <div className="grid grid-cols-5 border-b border-[#f0f0f0]">
                <div className="p-3 text-center text-[#999] text-sm">副星</div>
                {[result.cangGan.year, result.cangGan.month, result.cangGan.day, result.cangGan.hour].map((cg, i) => (
                  <div key={i} className="p-2 text-center">
                    {cg.map((g, j) => (
                      <div key={j} className="text-xs text-[#666]">
                        {getShiShen(dayGan, g)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              
              {/* 星运 */}
              <div className="grid grid-cols-5 border-b border-[#f0f0f0]">
                <div className="p-3 text-center text-[#999] text-sm">星运</div>
                {[result.changSheng.year, result.changSheng.month, result.changSheng.day, result.changSheng.hour].map((cs, i) => (
                  <div key={i} className="p-3 text-center text-[#666] text-sm">{cs}</div>
                ))}
              </div>
              
              {/* 空亡 */}
              <div className="grid grid-cols-5 border-b border-[#f0f0f0]">
                <div className="p-3 text-center text-[#999] text-sm">空亡</div>
                {[result.kongWang.year, result.kongWang.month, result.kongWang.day, result.kongWang.hour].map((kw, i) => (
                  <div key={i} className="p-3 text-center text-[#666] text-sm">{kw}</div>
                ))}
              </div>
              
              {/* 纳音 */}
              <div className="grid grid-cols-5 border-b border-[#f0f0f0]">
                <div className="p-3 text-center text-[#999] text-sm">纳音</div>
                {[result.naYin.year, result.naYin.month, result.naYin.day, result.naYin.hour].map((ny, i) => (
                  <div key={i} className="p-3 text-center text-[#666] text-xs">{ny}</div>
                ))}
              </div>
              
              {/* 神煞 */}
              <div className="grid grid-cols-5">
                <div className="p-3 text-center text-[#999] text-sm">神煞</div>
                {[result.shenSha.year, result.shenSha.month, result.shenSha.day, result.shenSha.hour].map((ss, i) => (
                  <div key={i} className="p-2 text-center">
                    {(ss || []).slice(0, 3).map((s, j) => (
                      <div key={j} className="text-xs text-[#d4af37]">{s}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 智能干支图示 & AI指令 */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-white rounded-xl text-[#333] font-medium shadow-sm">
                智能干支图示 &gt;
              </button>
              <button className="flex-1 py-3 bg-white rounded-xl text-[#333] font-medium shadow-sm">
                AI指令 &gt;
              </button>
            </div>
            
            {/* 干支关系 */}
            <div className="bg-white rounded-xl p-4 space-y-2 shadow-sm">
              <div className="flex">
                <span className="text-[#d4af37] w-20">原局天干：</span>
                <span className="text-[#333] flex-1">
                  {result.ganZhiRelation?.tianGan?.length ? result.ganZhiRelation.tianGan.join(" | ") : "无"}
                </span>
              </div>
              <div className="flex">
                <span className="text-[#d4af37] w-20">原局地支：</span>
                <span className="text-[#333] flex-1">
                  {result.ganZhiRelation?.diZhi?.length ? result.ganZhiRelation.diZhi.join(" | ") : "无"}
                </span>
              </div>
              <div className="flex">
                <span className="text-[#d4af37] w-20">原局整柱：</span>
                <span className="text-[#333] flex-1">
                  {result.ganZhiRelation?.zhengZhu?.length ? result.ganZhiRelation.zhengZhu.join(" | ") : "无"}
                </span>
              </div>
            </div>
            
            {/* 智能古籍参考 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#333] font-medium flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#d4af37] rounded"></span>
                  智能古籍参考
                </h3>
                <span className="text-xs text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded">VIP会员</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {["穷通宝鉴", "滴天髓", "三命通会", "八字提要"].map((book) => (
                  <div key={book} className="flex-shrink-0 w-16 text-center">
                    <div className="w-16 h-20 bg-[#f8f5f0] rounded-lg flex items-center justify-center text-[#d4af37] text-xs font-medium border border-[#e8e0d0]">
                      {book}
                    </div>
                    <div className="text-xs text-[#666] mt-1">{book}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 调候用神提示 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#666]">调候用神提示</span>
                <span className="text-[#d4af37]">
                  {result.tiaoHou?.yongShen?.join(" ") || "壬 戊 己"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666]">本八字</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#666]">透</span>
                  <span className="px-2 py-1 bg-[#2a2520] text-white rounded text-sm">
                    {result.day.gan}
                  </span>
                  <span className="text-[#666]">藏</span>
                  <span className="px-2 py-1 bg-[#2a2520] text-white rounded text-sm">戊</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 基本信息Tab */}
        {activeTab === "basic" && (
          <div className="p-4 space-y-4">
            {/* 出生天体图 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-[#333] font-medium flex items-center gap-2 mb-3">
                <span className="w-1 h-4 bg-[#d4af37] rounded"></span>
                出生天体图
              </h3>
              <div className="bg-[#f8f5f0] rounded-xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[#666] mb-2">出生天体图功能</p>
                  <p className="text-[#999] text-sm mb-4">通过日月星辰的运行规律，便于您了解出生那一时刻的天体状态</p>
                  <button className="px-6 py-2 bg-[#d4af37] text-white rounded-full">
                    开通VIP会员
                  </button>
                </div>
              </div>
            </div>
            
            {/* 四柱简图 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-center gap-4">
                {[
                  { gan: result.year.gan, zhi: result.year.zhi, label: "木" },
                  { gan: result.month.gan, zhi: result.month.zhi, label: "地" },
                  { gan: result.day.gan, zhi: result.day.zhi, label: "月" },
                  { gan: result.hour.gan, zhi: result.hour.zhi, label: "地" }
                ].map((pillar, i) => {
                  const ganWuxing = TIANGAN_WUXING[pillar.gan]
                  const zhiWuxing = DIZHI_WUXING[pillar.zhi]
                  return (
                    <div key={i} className="w-16 p-3 bg-[#f8f5f0] rounded-xl text-center border border-[#e8e0d0]">
                      <div className="text-xl font-bold" style={{ color: getWuXingColor(ganWuxing) }}>
                        {pillar.gan}
                      </div>
                      <div className="text-xl font-bold" style={{ color: getWuXingColor(zhiWuxing) }}>
                        {pillar.zhi}
                      </div>
                      <div className="mt-2 px-2 py-1 bg-[#d4af37] text-white text-xs rounded">
                        {pillar.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* 节气信息 */}
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-[#666]">冬至中气：</span>
                <span className="text-[#333]">{result.jieQi?.current || "待计算"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d4af37]">出生阳历：</span>
                <span className="text-[#d4af37]">
                  {result.solar.year}年{String(result.solar.month).padStart(2, '0')}月{String(result.solar.day).padStart(2, '0')}日
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666]">下一节气：</span>
                <span className="text-[#333]">{result.jieQi?.next || "待计算"}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* 专业细盘Tab */}
        {activeTab === "detail" && (
          <div className="p-4 space-y-4">
            {/* 起运信息 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-[#666]">
                起运：出生后{result.qiYun?.years || 0}年{result.qiYun?.months || 0}月{result.qiYun?.days || 0}天起运
              </p>
              <p className="text-[#999] text-sm mt-1">
                {result.qiYun?.direction === "顺行" ? "大运顺行" : "大运逆行"}
              </p>
            </div>
            
            {/* 大运列表 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-[#333] font-medium mb-3">大运</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {(result.daYun || []).slice(0, 10).map((dy, i) => (
                  <div
                    key={i}
                    className={`flex-shrink-0 px-3 py-2 rounded-lg text-center ${
                      i === 3 ? "bg-[#d4af37] text-white" : "bg-[#f8f5f0]"
                    }`}
                  >
                    <div className="text-xs opacity-70">{dy.startYear}</div>
                    <div className="text-xs opacity-70">{dy.startAge}岁</div>
                    <div className="text-lg font-bold mt-1">
                      <span style={{ color: i === 3 ? 'white' : getWuXingColor(TIANGAN_WUXING[dy.gan]) }}>
                        {dy.gan}
                      </span>
                      <span style={{ color: i === 3 ? 'white' : getWuXingColor(DIZHI_WUXING[dy.zhi]) }}>
                        {dy.zhi}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 流年列表 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-[#333] font-medium mb-3">流年</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {(result.liuNian || []).slice(-10).map((ln, i) => {
                  const isCurrent = ln.year === new Date().getFullYear()
                  return (
                    <div
                      key={i}
                      className={`flex-shrink-0 px-3 py-2 rounded-lg text-center ${
                        isCurrent ? "bg-[#d4af37] text-white" : "bg-[#f8f5f0]"
                      }`}
                    >
                      <div className="text-xs opacity-70">{ln.year}</div>
                      <div className="text-lg font-bold mt-1">
                        <span style={{ color: isCurrent ? 'white' : getWuXingColor(TIANGAN_WUXING[ln.gan]) }}>
                          {ln.gan}
                        </span>
                        <span style={{ color: isCurrent ? 'white' : getWuXingColor(DIZHI_WUXING[ln.zhi]) }}>
                          {ln.zhi}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* 五行旺衰 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-[#333] font-medium mb-3">五行旺衰</h3>
              <div className="flex justify-around">
                {Object.entries(result.wuXingStrength || {}).map(([state, wx]) => (
                  <div key={state} className="text-center">
                    <div className="text-sm text-[#666]">{wx as string}{state}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 干支关系 */}
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
              <div className="flex">
                <span className="text-[#d4af37] w-20">原局天干：</span>
                <span className="text-[#333]">
                  {result.ganZhiRelation?.tianGan?.length ? result.ganZhiRelation.tianGan.join(" | ") : "无"}
                </span>
              </div>
              <div className="flex">
                <span className="text-[#d4af37] w-20">原局地支：</span>
                <span className="text-[#333]">
                  {result.ganZhiRelation?.diZhi?.length ? result.ganZhiRelation.diZhi.join(" | ") : "无"}
                </span>
              </div>
              <div className="flex">
                <span className="text-[#d4af37] w-20">原局整柱：</span>
                <span className="text-[#333]">
                  {result.ganZhiRelation?.zhengZhu?.length ? result.ganZhiRelation.zhengZhu.join(" | ") : "无"}
                </span>
              </div>
            </div>
            
            {/* 四柱神煞 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-[#333] font-medium mb-3">四柱神煞</h3>
              {[
                { label: result.year.ganZhi, shenSha: result.shenSha?.year || [] },
                { label: result.month.ganZhi, shenSha: result.shenSha?.month || [] },
                { label: result.day.ganZhi, shenSha: result.shenSha?.day || [] },
                { label: result.hour.ganZhi, shenSha: result.shenSha?.hour || [] }
              ].map((item, i) => (
                <div key={i} className="flex items-start py-2 border-b border-[#f0f0f0] last:border-0">
                  <span className="w-12 text-[#333] font-medium">{item.label}</span>
                  <div className="flex-1 flex flex-wrap gap-2">
                    {item.shenSha.map((ss, j) => (
                      <span key={j} className="text-[#d4af37] text-sm">{ss}</span>
                    ))}
                    {item.shenSha.length === 0 && <span className="text-[#999] text-sm">无</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 断事笔记Tab */}
        {activeTab === "notes" && (
          <div className="p-4 space-y-4">
            {/* 四柱简图 */}
            <div className="bg-[#2a2520] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#d4af37]">{gender === "male" ? "乾造" : "坤造"}</span>
              </div>
              <div className="flex justify-center gap-6 text-white text-xl">
                <div className="text-center">
                  <div>{result.year.gan}</div>
                  <div>{result.year.zhi}</div>
                </div>
                <div className="text-center">
                  <div>{result.month.gan}</div>
                  <div>{result.month.zhi}</div>
                </div>
                <div className="text-center">
                  <div>{result.day.gan}</div>
                  <div>{result.day.zhi}</div>
                </div>
                <div className="text-center">
                  <div>{result.hour.gan}</div>
                  <div>{result.hour.zhi}</div>
                </div>
              </div>
              <div className="text-white/60 text-xs text-center mt-2">
                {result.daYun?.slice(0, 8).map(dy => dy.ganZhi).join(" - ")}
              </div>
            </div>
            
            {/* 反馈类型切换 */}
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 bg-[#d4af37] text-white rounded-full">
                命主反馈
              </button>
              <button className="px-6 py-2 bg-white text-[#666] rounded-full border border-[#e0e0e0]">
                师傅点评
              </button>
            </div>
            
            {/* 反馈项目 */}
            <div className="bg-white rounded-xl divide-y divide-[#f0f0f0] shadow-sm">
              {[
                { label: "职业", value: "" },
                { label: "学历", value: "" },
                { label: "财富", value: "" },
                { label: "婚姻", value: "" }
              ].map((item) => (
                <button key={item.label} className="w-full flex items-center justify-between p-4">
                  <span className="text-[#333]">{item.label}</span>
                  <ChevronDown className="w-5 h-5 text-[#999] rotate-[-90deg]" />
                </button>
              ))}
            </div>
            
            {/* 其他信息 */}
            <div className="bg-white rounded-xl p-4 space-y-3 shadow-sm">
              <div className="flex justify-between">
                <span className="text-[#666]">健康状态：</span>
                <span className="text-[#999]">请输入</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666]">六亲状况：</span>
                <span className="text-[#999]">请输入</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666]">性情描述：</span>
                <span className="text-[#999]">请输入</span>
              </div>
            </div>
            
            {/* 关键事件 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#333] font-medium">关键事件反馈记录</span>
                <button className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center text-white text-xl">
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e0e0] px-4 py-3 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-[#f0f0f0] rounded-xl text-[#666] font-medium"
        >
          返回
        </button>
        <button
          onClick={() => setShowResult(false)}
          className="flex-1 py-3 bg-[#d4af37] rounded-xl text-white font-medium"
        >
          重新排盘
        </button>
      </div>
    </div>
  )
}

// 辅助函数：计算十神
function getShiShen(dayGan: string, gan: string): string {
  if (dayGan === gan) return "比肩"
  
  const shiShenTable: Record<string, Record<string, string>> = {
    '甲': { '甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官', '戊': '偏财', '己': '正财', '庚': '七杀', '辛': '正官', '壬': '偏印', '癸': '正印' },
    '乙': { '甲': '劫财', '乙': '比肩', '丙': '伤官', '丁': '食神', '戊': '正财', '己': '偏财', '庚': '正官', '辛': '七杀', '壬': '正印', '癸': '偏印' },
    '丙': { '甲': '偏印', '乙': '正印', '丙': '比肩', '丁': '劫财', '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财', '壬': '七杀', '癸': '正官' },
    '丁': { '甲': '正印', '乙': '偏印', '丙': '劫财', '丁': '比肩', '戊': '伤官', '己': '食神', '庚': '正财', '辛': '偏财', '壬': '正官', '癸': '七杀' },
    '戊': { '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印', '戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官', '壬': '偏财', '癸': '正财' },
    '己': { '甲': '正官', '乙': '七杀', '丙': '正印', '丁': '偏印', '戊': '劫财', '己': '比肩', '庚': '伤官', '辛': '食神', '壬': '正财', '癸': '偏财' },
    '庚': { '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官', '戊': '偏印', '己': '正印', '庚': '比肩', '辛': '劫财', '壬': '食神', '癸': '伤官' },
    '辛': { '甲': '正财', '乙': '偏财', '丙': '正官', '丁': '七杀', '戊': '正印', '己': '偏印', '庚': '劫财', '辛': '比肩', '壬': '伤官', '癸': '食神' },
    '壬': { '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财', '戊': '七杀', '己': '正官', '庚': '偏印', '辛': '正印', '壬': '比肩', '癸': '劫财' },
    '癸': { '甲': '伤官', '乙': '食神', '丙': '正财', '丁': '偏财', '戊': '正官', '己': '七杀', '庚': '正印', '辛': '偏印', '壬': '劫财', '癸': '比肩' }
  }
  
  return shiShenTable[dayGan]?.[gan] || ""
}

// 辅助函数：获取藏干
function getCangGan(zhi: string): string[] {
  const cangGanTable: Record<string, string[]> = {
    '子': ['癸'],
    '丑': ['己', '癸', '辛'],
    '寅': ['甲', '丙', '戊'],
    '卯': ['乙'],
    '辰': ['戊', '乙', '癸'],
    '巳': ['丙', '庚', '戊'],
    '午': ['丁', '己'],
    '未': ['己', '丁', '乙'],
    '申': ['庚', '壬', '戊'],
    '酉': ['辛'],
    '戌': ['戊', '辛', '丁'],
    '亥': ['壬', '甲']
  }
  return cangGanTable[zhi] || []
}

// 辅助函数：获取纳音
function getNaYin(ganZhi: string): string {
  const naYinTable: Record<string, string> = {
    '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火',
    '戊辰': '大林木', '己巳': '大林木', '庚午': '路旁土', '辛未': '路旁土',
    '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
    '丙子': '涧下水', '丁丑': '涧下水', '戊寅': '城头土', '己卯': '城头土',
    '庚辰': '白蜡金', '辛巳': '白蜡金', '壬午': '杨柳木', '癸未': '杨柳木',
    '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
    '戊子': '霹雳火', '己丑': '霹雳火', '庚寅': '松柏木', '辛卯': '松柏木',
    '壬辰': '长流水', '癸巳': '长流水', '甲午': '沙中金', '乙未': '沙中金',
    '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
    '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金',
    '甲辰': '覆灯火', '乙巳': '覆灯火', '丙午': '天河水', '丁未': '天河水',
    '戊申': '大驿土', '己酉': '大驿土', '庚戌': '钗钏金', '辛亥': '钗钏金',
    '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水',
    '丙辰': '沙中土', '丁巳': '沙中土', '戊午': '天上火', '己未': '天上火',
    '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
  }
  return naYinTable[ganZhi] || ''
}

// 辅助函数：获取生肖
function getShengXiao(zhi: string): string {
  const shengXiaoTable: Record<string, string> = {
    '子': '鼠', '丑': '牛', '寅': '虎', '卯': '兔',
    '辰': '龙', '巳': '蛇', '午': '马', '未': '羊',
    '申': '猴', '酉': '鸡', '戌': '狗', '亥': '猪'
  }
  return shengXiaoTable[zhi] || '龙'
}
