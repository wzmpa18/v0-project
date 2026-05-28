"use client"

import { useState, useMemo, useEffect } from "react"
import { ChevronLeft, MoreHorizontal, Eye, Edit2, ChevronRight, ChevronDown, Settings, HelpCircle } from "lucide-react"
import {
  calculateBazi, BaziResult, BaziOptions,
  getWuXingColor, getWuXingIcon, SHICHEN_TIMES,
  TIANGAN_WUXING, DIZHI_WUXING, SHENGXIAO_ICONS
} from "@/lib/bazi/lunar-calculator"

interface BaziPaipanProps {
  onBack: () => void
  onAIAnalysis?: () => void
}

export function BaziPaipan({ onBack, onAIAnalysis }: BaziPaipanProps) {
  // Tab状态
  const [activeTab, setActiveTab] = useState<"basic" | "chart" | "detail" | "notes">("chart")
  
  // 输入状态
  const [showResult, setShowResult] = useState(false)
  const [isLunar, setIsLunar] = useState(false)
  const [birthYear, setBirthYear] = useState(1990)
  const [birthMonth, setBirthMonth] = useState(1)
  const [birthDay, setBirthDay] = useState(1)
  const [birthHour, setBirthHour] = useState(0) // 0=子时
  const [gender, setGender] = useState<"male" | "female">("male")
  
  // 高级设置
  const [showSettings, setShowSettings] = useState(false)
  const [sect, setSect] = useState<1 | 2>(2) // 1=晚子时日柱算当天，2=晚子时日柱算明天
  const [useTrueSolarTime, setUseTrueSolarTime] = useState(false)
  
  // 四柱选择展开状态
  const [expandedSizhu, setExpandedSizhu] = useState<string | null>(null)
  
  // 计算八字结果
  const [result, setResult] = useState<BaziResult | null>(null)
  const [calcError, setCalcError] = useState<string | null>(null)
  
  // 执行排盘
  const handlePaipan = () => {
    try {
      setCalcError(null)
      const hourMap: Record<number, number> = {
        0: 23, // 子时
        1: 1,  // 丑时
        2: 3,  // 寅时
        3: 5,  // 卯时
        4: 7,  // 辰时
        5: 9,  // 巳时
        6: 11, // 午时
        7: 13, // 未时
        8: 15, // 申时
        9: 17, // 酉时
        10: 19, // 戌时
        11: 21  // 亥时
      }
      
      const options: BaziOptions = {
        year: birthYear,
        month: birthMonth,
        day: birthDay,
        hour: hourMap[birthHour],
        isLunar,
        gender,
        sect,
        useTrueSolarTime
      }
      
      const baziResult = calculateBazi(options)
      setResult(baziResult)
      setShowResult(true)
    } catch (error) {
      console.error("[v0] Bazi calculation error:", error)
      setCalcError("排盘计算出错，请检查输入日期是否有效")
    }
  }
  
  // 时辰列表
  const shichenList = [
    { name: "子时", time: "23:00-01:00", index: 0 },
    { name: "丑时", time: "01:00-03:00", index: 1 },
    { name: "寅时", time: "03:00-05:00", index: 2 },
    { name: "卯时", time: "05:00-07:00", index: 3 },
    { name: "辰时", time: "07:00-09:00", index: 4 },
    { name: "巳时", time: "09:00-11:00", index: 5 },
    { name: "午时", time: "11:00-13:00", index: 6 },
    { name: "未时", time: "13:00-15:00", index: 7 },
    { name: "申时", time: "15:00-17:00", index: 8 },
    { name: "酉时", time: "17:00-19:00", index: 9 },
    { name: "戌时", time: "19:00-21:00", index: 10 },
    { name: "亥时", time: "21:00-23:00", index: 11 },
  ]

  // 生成年份选项
  const years = Array.from({ length: 150 }, (_, i) => new Date().getFullYear() - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  // 输入界面
  if (!showResult) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        {/* 头部 */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-[#333] sticky top-0 bg-[#1a1a1a] z-10">
          <button onClick={onBack} className="p-2 -ml-2 active:opacity-70 flex items-center justify-center">
            <ChevronLeft className="w-7 h-7 text-white" strokeWidth={2.5} />
          </button>
          <h1 className="text-white text-lg font-medium">八字排盘</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 p-4 space-y-6 overflow-auto pb-32">
          {/* 公历/农历切换 */}
          <div className="flex justify-center">
            <div className="inline-flex bg-[#252525] rounded-full p-1">
              <button
                onClick={() => setIsLunar(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  !isLunar ? "bg-[#d4af37] text-white" : "text-gray-400"
                }`}
              >
                公历
              </button>
              <button
                onClick={() => setIsLunar(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  isLunar ? "bg-[#d4af37] text-white" : "text-gray-400"
                }`}
              >
                农历
              </button>
            </div>
          </div>

          {/* 出生日期选择 */}
          <div className="bg-[#252525] rounded-2xl p-4">
            <div className="text-[#999] text-sm mb-3">出生日期</div>
            <div className="flex gap-2">
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value))}
                className="flex-1 bg-[#333] text-white px-3 py-3 rounded-xl text-center appearance-none"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(Number(e.target.value))}
                className="flex-1 bg-[#333] text-white px-3 py-3 rounded-xl text-center appearance-none"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(Number(e.target.value))}
                className="flex-1 bg-[#333] text-white px-3 py-3 rounded-xl text-center appearance-none"
              >
                {days.map((d) => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
          </div>

          {/* 出生时辰选择 */}
          <div className="bg-[#252525] rounded-2xl p-4">
            <div className="text-[#999] text-sm mb-3">出生时辰</div>
            <div className="grid grid-cols-3 gap-2">
              {shichenList.map((item) => (
                <button
                  key={item.index}
                  onClick={() => setBirthHour(item.index)}
                  className={`px-2 py-3 rounded-xl text-sm transition-colors ${
                    birthHour === item.index
                      ? "bg-[#d4af37] text-white"
                      : "bg-[#333] text-gray-300"
                  }`}
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-[10px] opacity-70">{item.time}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 性别选择 */}
          <div className="bg-[#252525] rounded-2xl p-4">
            <div className="text-[#999] text-sm mb-3">性别</div>
            <div className="flex gap-3">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-3 rounded-xl text-center transition-colors ${
                  gender === "male"
                    ? "bg-[#d4af37] text-white"
                    : "bg-[#333] text-gray-300"
                }`}
              >
                乾造 (男)
              </button>
              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-3 rounded-xl text-center transition-colors ${
                  gender === "female"
                    ? "bg-[#d4af37] text-white"
                    : "bg-[#333] text-gray-300"
                }`}
              >
                坤造 (女)
              </button>
            </div>
          </div>

          {/* 高级设置 */}
          <div className="bg-[#252525] rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full flex items-center justify-between px-4 py-3 text-[#999]"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="text-sm">高级设置</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSettings ? "rotate-180" : ""}`} />
            </button>
            
            {showSettings && (
              <div className="px-4 pb-4 space-y-4">
                {/* 早晚子时设置 */}
                <div>
                  <div className="flex items-center gap-1 text-[#888] text-xs mb-2">
                    <span>子时算法</span>
                    <HelpCircle className="w-3 h-3" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSect(2)}
                      className={`flex-1 py-2 rounded-lg text-xs transition-colors ${
                        sect === 2 ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]" : "bg-[#333] text-gray-400"
                      }`}
                    >
                      晚子时算次日
                    </button>
                    <button
                      onClick={() => setSect(1)}
                      className={`flex-1 py-2 rounded-lg text-xs transition-colors ${
                        sect === 1 ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]" : "bg-[#333] text-gray-400"
                      }`}
                    >
                      晚子时算当日
                    </button>
                  </div>
                </div>
                
                {/* 真太阳时设置 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#888] text-xs">
                    <span>真太阳时校准</span>
                    <HelpCircle className="w-3 h-3" />
                  </div>
                  <button
                    onClick={() => setUseTrueSolarTime(!useTrueSolarTime)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      useTrueSolarTime ? "bg-[#d4af37]" : "bg-[#444]"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      useTrueSolarTime ? "translate-x-6" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 错误提示 */}
          {calcError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm text-center">
              {calcError}
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1a1a1a] border-t border-[#333]">
          <button
            onClick={handlePaipan}
            className="w-full py-4 bg-[#d4af37] text-white rounded-2xl font-medium text-lg active:opacity-80"
          >
            立即排盘
          </button>
          <p className="text-[#666] text-[10px] text-center mt-3">
            命理分析仅供学术研究参考，不应作为人生重大决策依据
          </p>
        </div>
      </div>
    )
  }

  // 结果页面
  if (!result) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center">
        <div className="text-gray-500">计算中...</div>
      </div>
    )
  }

  // Tab内容渲染
  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return <BasicInfoTab result={result} />
      case "chart":
        return <ChartTab result={result} onClickSizhu={setExpandedSizhu} expandedSizhu={expandedSizhu} />
      case "detail":
        return <DetailTab result={result} />
      case "notes":
        return <NotesTab result={result} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0] flex flex-col pb-20">
      {/* 头部 */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#2a2520] sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 active:opacity-70 flex items-center justify-center">
          <ChevronLeft className="w-7 h-7 text-white" strokeWidth={2.5} />
        </button>
        <h1 className="text-white text-lg font-medium">八字排盘</h1>
        <button className="p-2 -mr-2">
          <MoreHorizontal className="w-6 h-6 text-[#a0a0a0]" />
        </button>
      </header>

      {/* Tab栏 */}
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
            className={`flex-1 py-2 text-sm font-medium transition-colors relative ${
              activeTab === tab.key ? "text-[#d4af37]" : "text-[#888]"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#d4af37] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 命主信息头部 */}
      <div className="bg-[#2a2520] px-4 py-3 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#3a3530] flex items-center justify-center text-2xl">
          {result.shengxiaoIcon || "🐍"}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[#d4af37] text-sm">命例</span>
            <span className="px-2 py-0.5 bg-[#d4af37]/20 rounded text-[#d4af37] text-xs">{result.gender}</span>
          </div>
          <div className="text-white text-sm mt-0.5">
            农历：{result.lunarDate} {shichenList[birthHour]?.name}
          </div>
          <div className="text-[#888] text-xs">
            阳历：{result.solarDate}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-[#3a3530] flex items-center justify-center">
            <Eye className="w-4 h-4 text-[#888]" />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#3a3530] flex items-center justify-center">
            <Edit2 className="w-4 h-4 text-[#888]" />
          </button>
        </div>
      </div>

      {/* Tab内容 */}
      <div className="flex-1 overflow-auto">
        {renderTabContent()}
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-3 z-20">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-100 rounded-xl text-gray-700 font-medium active:bg-gray-200"
        >
          返回
        </button>
        <button
          onClick={() => setShowResult(false)}
          className="flex-1 py-3 bg-[#d4af37] rounded-xl text-white font-medium active:opacity-80"
        >
          重新排盘
        </button>
      </div>
    </div>
  )
}

// 基本信息Tab
function BasicInfoTab({ result }: { result: BaziResult }) {
  return (
    <div className="p-4 space-y-4">
      {/* 出生天体图 */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#d4af37] rounded-full" />
            <span className="font-medium text-gray-800">出生天体图</span>
          </div>
          <span className="text-xs text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded">VIP会员</span>
        </div>
        <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-2">出生天体图功能</div>
            <div className="text-gray-500 text-xs">通过日月星辰的运行规律，便于您了解出生那一时刻的天体状态</div>
            <button className="mt-4 px-6 py-2 bg-[#d4af37] text-white rounded-full text-sm">
              开通VIP会员
            </button>
          </div>
        </div>
      </div>

      {/* 四柱简图 */}
      <div className="bg-white rounded-xl p-4">
        <div className="text-gray-500 text-xs text-center mb-2">注：采用现代天文观测法，日月星辰轨迹按逆时针方向运动</div>
        <div className="flex justify-center gap-3 py-4">
          {[result.year, result.month, result.day, result.hour].map((zhu, idx) => (
            <div key={idx} className="w-16 text-center">
              <div className="text-2xl font-medium mb-1" style={{ color: getWuXingColor(zhu.gan) }}>
                {zhu.gan}
              </div>
              <div className="text-2xl font-medium mb-2" style={{ color: getWuXingColor(zhu.zhi) }}>
                {zhu.zhi}
              </div>
              <div className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                {TIANGAN_WUXING[zhu.gan]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 节气信息 */}
      <div className="bg-white rounded-xl p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">{result.jieQi.prevJie}：</span>
            <span className="text-gray-800">{result.jieQi.prevJieDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#d4af37]">出生阳历：</span>
            <span className="text-[#d4af37]">{result.solarDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{result.jieQi.nextJie}：</span>
            <span className="text-gray-800">{result.jieQi.nextJieDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 基本排盘Tab（主要的四柱表格）
function ChartTab({ result, onClickSizhu, expandedSizhu }: { 
  result: BaziResult
  onClickSizhu: (key: string | null) => void
  expandedSizhu: string | null
}) {
  const columns = [
    { key: "year", label: "年柱", data: result.year },
    { key: "month", label: "月柱", data: result.month },
    { key: "day", label: "日柱", data: result.day },
    { key: "hour", label: "时柱", data: result.hour }
  ]

  return (
    <div className="p-4 space-y-4">
      {/* 四柱表格 */}
      <div className="bg-white rounded-xl overflow-hidden">
        {/* 表头 */}
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="py-2 text-center text-gray-500 text-sm">日期</div>
          {columns.map((col) => (
            <div key={col.key} className="py-2 text-center text-gray-800 text-sm font-medium">
              {col.label}
            </div>
          ))}
        </div>

        {/* 主星 */}
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="py-2 text-center text-gray-500 text-sm">主星</div>
          <div className="py-2 text-center text-[#d4af37] text-sm">{result.shiShen.year}</div>
          <div className="py-2 text-center text-[#d4af37] text-sm">{result.shiShen.month}</div>
          <div className="py-2 text-center text-[#d4af37] text-sm">{result.shiShen.day}</div>
          <div className="py-2 text-center text-[#d4af37] text-sm">{result.shiShen.hour}</div>
        </div>

        {/* 天干 */}
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="py-3 text-center text-gray-500 text-sm">天干</div>
          {columns.map((col) => (
            <div key={col.key} className="py-2 text-center">
              <span className="text-2xl font-bold" style={{ color: getWuXingColor(col.data.gan) }}>
                {col.data.gan}
              </span>
              <span className="ml-1">{getWuXingIcon(col.data.gan)}</span>
            </div>
          ))}
        </div>

        {/* 地支 */}
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="py-3 text-center text-gray-500 text-sm">地支</div>
          {columns.map((col) => (
            <div key={col.key} className="py-2 text-center">
              <span className="text-2xl font-bold" style={{ color: getWuXingColor(col.data.zhi) }}>
                {col.data.zhi}
              </span>
              <span className="ml-1">{getWuXingIcon(col.data.zhi)}</span>
            </div>
          ))}
        </div>

        {/* 藏干 */}
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="py-2 text-center text-gray-500 text-sm flex items-center justify-center gap-1">
            藏干
            <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">?</span>
          </div>
          {["year", "month", "day", "hour"].map((key) => (
            <div key={key} className="py-2 text-center text-sm leading-relaxed">
              {result.cangGan[key as keyof typeof result.cangGan].map((g, i) => (
                <div key={i}>
                  <span style={{ color: getWuXingColor(g) }}>{g}</span>
                  <span className="text-gray-400">{TIANGAN_WUXING[g]}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 副星（藏干十神） */}
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="py-2 text-center text-gray-500 text-sm">副星</div>
          {["year", "month", "day", "hour"].map((key) => (
            <div key={key} className="py-2 text-center text-sm text-gray-600 leading-relaxed">
              {result.cangGanShiShen[key as keyof typeof result.cangGanShiShen].map((ss, i) => (
                <div key={i}>{ss}</div>
              ))}
            </div>
          ))}
        </div>

        {/* 星运（十二长生） */}
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="py-2 text-center text-gray-500 text-sm">星运</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.changSheng.year}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.changSheng.month}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.changSheng.day}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.changSheng.hour}</div>
        </div>

        {/* 自坐 */}
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="py-2 text-center text-gray-500 text-sm">自坐</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.ziZuo.year}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.ziZuo.month}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.ziZuo.day}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.ziZuo.hour}</div>
        </div>

        {/* 空亡 */}
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="py-2 text-center text-gray-500 text-sm">空亡</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.kongWang.year}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.kongWang.month}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.kongWang.day}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.kongWang.hour}</div>
        </div>

        {/* 纳音 */}
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="py-2 text-center text-gray-500 text-sm">纳音</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.naYin.year}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.naYin.month}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.naYin.day}</div>
          <div className="py-2 text-center text-sm text-gray-700">{result.naYin.hour}</div>
        </div>

        {/* 神煞 */}
        <div className="grid grid-cols-5">
          <div className="py-2 text-center text-gray-500 text-sm">神煞</div>
          {["year", "month", "day", "hour"].map((key) => (
            <div key={key} className="py-2 px-1 text-center text-xs text-[#d4af37] leading-relaxed">
              {result.shenSha[key as keyof typeof result.shenSha].slice(0, 5).map((ss, i) => (
                <div key={i}>{ss}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 智能干支图示 & AI指令 */}
      <div className="flex gap-3">
        <button className="flex-1 py-3 bg-white rounded-xl text-gray-700 font-medium flex items-center justify-center gap-1">
          智能干支图示
          <ChevronRight className="w-4 h-4" />
        </button>
        <button className="flex-1 py-3 bg-white rounded-xl text-gray-700 font-medium flex items-center justify-center gap-1">
          AI指令
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 干支关系 */}
      <div className="bg-white rounded-xl p-4 space-y-2">
        <div className="flex">
          <span className="text-[#d4af37] text-sm w-20 shrink-0">原局天干：</span>
          <span className="text-gray-700 text-sm">{result.ganZhiRelation.tianGan.join(" | ") || "无"}</span>
        </div>
        <div className="flex">
          <span className="text-[#d4af37] text-sm w-20 shrink-0">原局地支：</span>
          <span className="text-gray-700 text-sm">{result.ganZhiRelation.diZhi.join(" | ") || "无"}</span>
        </div>
        <div className="flex">
          <span className="text-[#d4af37] text-sm w-20 shrink-0">原局整柱：</span>
          <span className="text-gray-700 text-sm">{result.ganZhiRelation.zhengZhu.join(" | ") || "无"}</span>
        </div>
      </div>

      {/* 智能古籍参考 */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#d4af37] rounded-full" />
            <span className="font-medium text-gray-800">智能古籍参考</span>
          </div>
          <span className="text-xs text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded">VIP会员</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {["穷通宝鉴", "滴天髓", "三命通会", "八字提要"].map((book) => (
            <div key={book} className="shrink-0 w-16 text-center">
              <div className="w-16 h-20 bg-[#f5f0e6] rounded-lg flex items-center justify-center border border-[#e5dcd0] mb-1">
                <span className="text-[#8b7355] text-xs writing-vertical">{book}</span>
              </div>
              <span className="text-xs text-gray-600">{book}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 调候用神提示 */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            调候用神提示
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex gap-1">
            {result.tiaoHou.yongShen.map((ys, i) => (
              <span key={i} className="text-[#d4af37] font-medium">{ys}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">本八字</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">透</span>
            {result.tiaoHou.yongShen.filter(ys => 
              [result.year.gan, result.month.gan, result.day.gan, result.hour.gan].includes(ys)
            ).map((ys, i) => (
              <span key={i} className="px-2 py-1 rounded text-white text-xs" style={{ backgroundColor: getWuXingColor(ys) }}>
                {ys}
              </span>
            ))}
            <span className="text-gray-500">藏</span>
            {result.tiaoHou.yongShen.filter(ys => 
              ![result.year.gan, result.month.gan, result.day.gan, result.hour.gan].includes(ys)
            ).map((ys, i) => (
              <span key={i} className="px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs">
                {ys}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 免责声明 */}
      <div className="text-center">
        <p className="text-gray-400 text-[10px]">
          命理分析仅供学术研究参考，不应作为人生重大决策依据
        </p>
      </div>
    </div>
  )
}

// 专业细盘Tab
function DetailTab({ result }: { result: BaziResult }) {
  const [expandedDayun, setExpandedDayun] = useState<string | null>(null)
  const currentYear = new Date().getFullYear()

  return (
    <div className="p-4 space-y-4">
      {/* 大运 */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-[#d4af37] rounded-full" />
          <span className="font-medium text-gray-800">大运</span>
        </div>
        <div className="text-sm text-gray-600 mb-3">
          起运：出生后{result.qiYun.years}年{result.qiYun.months}月{result.qiYun.days}天起运，{result.qiYun.direction}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {result.daYun.slice(0, 10).map((dy, idx) => (
            <div
              key={idx}
              className={`shrink-0 px-3 py-2 rounded-lg text-center ${
                dy.startYear <= currentYear && (result.daYun[idx + 1]?.startYear || 9999) > currentYear
                  ? "bg-[#d4af37]/10 border border-[#d4af37]"
                  : "bg-gray-50"
              }`}
            >
              <div className="text-xs text-gray-500">{dy.startYear}</div>
              <div className="text-xs text-gray-400">{dy.startAge}岁</div>
              <div className="font-medium mt-1">
                <span style={{ color: getWuXingColor(dy.gan) }}>{dy.gan}</span>
                <span style={{ color: getWuXingColor(dy.zhi) }}>{dy.zhi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 流年 */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-[#d4af37] rounded-full" />
          <span className="font-medium text-gray-800">流年</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {result.liuNian.slice(-15).map((ln, idx) => (
            <div
              key={idx}
              className={`shrink-0 px-3 py-2 rounded-lg text-center ${
                ln.year === currentYear
                  ? "bg-[#d4af37]/10 border border-[#d4af37]"
                  : "bg-gray-50"
              }`}
            >
              <div className="text-xs text-gray-500">{ln.year}</div>
              <div className="font-medium mt-1">
                <span style={{ color: getWuXingColor(ln.gan) }}>{ln.gan}</span>
                <span style={{ color: getWuXingColor(ln.zhi) }}>{ln.zhi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 五行旺衰 */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-[#d4af37] rounded-full" />
          <span className="font-medium text-gray-800">五行旺衰</span>
        </div>
        <div className="flex justify-around">
          {[
            { label: `${result.wuXingStrength.wang}旺`, color: getWuXingColor(result.month.zhi) },
            { label: `${result.wuXingStrength.xiang}相`, color: "#22c55e" },
            { label: `${result.wuXingStrength.xiu}休`, color: "#d4af37" },
            { label: `${result.wuXingStrength.qiu}囚`, color: "#d4a574" },
            { label: `${result.wuXingStrength.si}死`, color: "#ef4444" }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-1 h-8 mx-auto rounded-full mb-1" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 干支关系分析 */}
      <div className="bg-white rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-4 bg-[#d4af37] rounded-full" />
          <span className="font-medium text-gray-800">干支关系</span>
        </div>
        <div className="flex">
          <span className="text-[#d4af37] text-sm w-20 shrink-0">原局天干：</span>
          <span className="text-gray-700 text-sm">{result.ganZhiRelation.tianGan.join(" | ") || "无"}</span>
        </div>
        <div className="flex">
          <span className="text-[#d4af37] text-sm w-20 shrink-0">原局地支：</span>
          <span className="text-gray-700 text-sm">{result.ganZhiRelation.diZhi.join(" | ") || "无"}</span>
        </div>
        <div className="flex">
          <span className="text-[#d4af37] text-sm w-20 shrink-0">原局整柱：</span>
          <span className="text-gray-700 text-sm">{result.ganZhiRelation.zhengZhu.join(" | ") || "无"}</span>
        </div>
      </div>

      {/* 四柱神煞 */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-[#d4af37] rounded-full" />
          <span className="font-medium text-gray-800">四柱神煞</span>
        </div>
        <div className="space-y-3">
          {[
            { label: result.year.ganZhi, shenshas: result.shenSha.year },
            { label: result.month.ganZhi, shenshas: result.shenSha.month },
            { label: result.day.ganZhi, shenshas: result.shenSha.day },
            { label: result.hour.ganZhi, shenshas: result.shenSha.hour }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start">
              <span className="text-gray-800 font-medium w-12 shrink-0">{item.label}</span>
              <div className="flex flex-wrap gap-1">
                {item.shenshas.map((ss, i) => (
                  <span key={i} className="text-[#d4af37] text-sm">{ss}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 大运神煞 */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#d4af37] rounded-full" />
            <span className="font-medium text-gray-800">大运神煞</span>
          </div>
        </div>
        <div className="space-y-2">
          {result.daYun.slice(0, 8).map((dy, idx) => (
            <div key={idx} className="flex items-start">
              <span className={`font-medium w-12 shrink-0 ${
                dy.startYear <= currentYear && (result.daYun[idx + 1]?.startYear || 9999) > currentYear
                  ? "text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded"
                  : "text-gray-800"
              }`}>
                {dy.ganZhi}
              </span>
              <span className="text-[#d4af37] text-sm">
                {dy.shenSha?.join(" ") || "天乙贵人 福星贵人 德秀贵人"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 断事笔记Tab
function NotesTab({ result }: { result: BaziResult }) {
  const [activeSubTab, setActiveSubTab] = useState<"feedback" | "review">("feedback")

  return (
    <div className="p-4 space-y-4">
      {/* 命主信息简图 */}
      <div className="bg-[#2a2520] rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#d4af37]">{result.gender}</span>
          <div className="flex gap-2">
            {[result.year, result.month, result.day, result.hour].map((zhu, idx) => (
              <span key={idx} className="text-white text-lg font-medium">
                {zhu.gan}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {[result.year, result.month, result.day, result.hour].map((zhu, idx) => (
            <span key={idx} className="text-white text-lg font-medium">
              {zhu.zhi}
            </span>
          ))}
        </div>
        <div className="text-[#888] text-xs mt-2">
          {result.daYun.slice(0, 8).map(dy => dy.ganZhi).join(" - ")}
        </div>
      </div>

      {/* 子Tab切换 */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setActiveSubTab("feedback")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeSubTab === "feedback" ? "bg-[#d4af37] text-white" : "text-gray-500"
            }`}
          >
            命主反馈
          </button>
          <button
            onClick={() => setActiveSubTab("review")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeSubTab === "review" ? "bg-[#d4af37] text-white" : "text-gray-500"
            }`}
          >
            师傅点评
          </button>
        </div>
      </div>

      {/* 反馈内容 */}
      <div className="bg-white rounded-xl p-4 space-y-4">
        {[
          { label: "职业", value: "" },
          { label: "学历", value: "" },
          { label: "财富", value: "" },
          { label: "婚姻", value: "" }
        ].map((item) => (
          <button key={item.label} className="w-full flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-gray-800">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        ))}
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">健康状态：</span>
            <span className="text-gray-400 text-sm">请输入</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">六亲状况：</span>
            <span className="text-gray-400 text-sm">请输入</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">性情描述：</span>
            <span className="text-gray-400 text-sm">请输入</span>
          </div>
        </div>
      </div>

      {/* 关键事件反馈记录 */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-800 font-medium">关键事件反馈记录</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 bg-[#d4af37]/10 rounded-lg flex items-center justify-center">
            <span className="text-[#d4af37]">📅</span>
          </div>
          <button className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center text-white text-xl">
            +
          </button>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex gap-3">
        <button className="flex-1 py-3 bg-[#d4af37] rounded-xl text-white font-medium">
          保存
        </button>
        <button className="w-12 h-12 bg-[#d4af37]/10 rounded-xl flex items-center justify-center">
          <span className="text-[#d4af37]">⬡</span>
        </button>
      </div>
    </div>
  )
}
