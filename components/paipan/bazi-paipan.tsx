"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, MoreHorizontal, Eye, Edit2, ChevronRight } from "lucide-react"
import {
  TIANGAN, DIZHI, WUXING, WUXING_COLOR, WUXING_ICON, CANGGAN, SHENGXIAO,
  NAYIN, SHICHEN_LIST
} from "@/lib/bazi/constants"
import {
  calculateBazi, getShishen, getCangganShishen, getChangsheng,
  getNayin, getKongwang, getShensha, getDayun, getLiunian, BaziResult
} from "@/lib/bazi/calculator"

interface BaziPaipanProps {
  onBack: () => void
  onAIAnalysis?: () => void
}

// 生肖图标
const SHENGXIAO_EMOJI: Record<string, string> = {
  "鼠": "🐀", "牛": "🐂", "虎": "🐅", "兔": "🐇", "龙": "🐉", "蛇": "🐍",
  "马": "🐴", "羊": "🐑", "猴": "🐒", "鸡": "🐓", "狗": "🐕", "猪": "🐷"
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
  const [birthHour, setBirthHour] = useState(0)
  const [gender, setGender] = useState<"male" | "female">("male")
  const [dayunStartAge, setDayunStartAge] = useState(3) // 起运年龄
  
  // 设置选项
  const [dayunMethod, setDayunMethod] = useState<"traditional" | "modern">("traditional")
  const [showSettings, setShowSettings] = useState(false)
  
  // 计算八字
  const result = useMemo(() => {
    if (!showResult) return null
    return calculateBazi(birthYear, birthMonth, birthDay, birthHour, gender, isLunar)
  }, [showResult, birthYear, birthMonth, birthDay, birthHour, gender, isLunar])
  
  // 计算大运
  const dayunList = useMemo(() => {
    if (!result) return []
    return getDayun(result.year.gan, result.month.gan, result.month.zhi, gender, birthYear, dayunStartAge)
  }, [result, gender, birthYear, dayunStartAge])
  
  // 计算流年
  const liunianList = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return getLiunian(currentYear - 5, 15)
  }, [])
  
  // 执行排盘
  const handlePaipan = () => {
    setShowResult(true)
  }
  
  // 重新排盘
  const handleReset = () => {
    setShowResult(false)
    setActiveTab("chart")
  }

  // ==================== 输入界面 ====================
  if (!showResult) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        {/* 头部 */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-[#333] sticky top-0 bg-[#1a1a1a] z-10">
          <button onClick={onBack} className="p-2 -ml-2 active:opacity-70">
            <ChevronLeft className="w-7 h-7 text-white" strokeWidth={2.5} />
          </button>
          <h1 className="text-white text-lg font-medium">八字排盘</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 px-4 py-6 space-y-6 pb-32">
          {/* 公历/农历切换 */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsLunar(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isLunar ? "bg-[#d4af37] text-white" : "bg-[#333] text-[#888]"
              }`}
            >
              公历
            </button>
            <button
              onClick={() => setIsLunar(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isLunar ? "bg-[#d4af37] text-white" : "bg-[#333] text-[#888]"
              }`}
            >
              农历
            </button>
          </div>

          {/* 日期选择 */}
          <div className="bg-[#252525] rounded-2xl p-4">
            <div className="text-[#888] text-xs mb-3">出生日期</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  className="w-full bg-[#333] text-white rounded-xl px-3 py-3 text-center appearance-none"
                >
                  {Array.from({ length: 150 }, (_, i) => 1900 + i).map((y) => (
                    <option key={y} value={y}>{y}年</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(Number(e.target.value))}
                  className="w-full bg-[#333] text-white rounded-xl px-3 py-3 text-center appearance-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>{m}月</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(Number(e.target.value))}
                  className="w-full bg-[#333] text-white rounded-xl px-3 py-3 text-center appearance-none"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}日</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 时辰选择 */}
          <div className="bg-[#252525] rounded-2xl p-4">
            <div className="text-[#888] text-xs mb-3">出生时辰</div>
            <select
              value={birthHour}
              onChange={(e) => setBirthHour(Number(e.target.value))}
              className="w-full bg-[#333] text-white rounded-xl px-3 py-3 appearance-none"
            >
              {SHICHEN_LIST.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label} ({s.time})
                </option>
              ))}
            </select>
          </div>

          {/* 性别选择 */}
          <div className="bg-[#252525] rounded-2xl p-4">
            <div className="text-[#888] text-xs mb-3">性别</div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGender("male")}
                className={`py-3 rounded-xl text-sm font-medium transition-all ${
                  gender === "male"
                    ? "bg-[#d4af37] text-white"
                    : "bg-[#333] text-[#888]"
                }`}
              >
                乾造 (男)
              </button>
              <button
                onClick={() => setGender("female")}
                className={`py-3 rounded-xl text-sm font-medium transition-all ${
                  gender === "female"
                    ? "bg-[#d4af37] text-white"
                    : "bg-[#333] text-[#888]"
                }`}
              >
                坤造 (女)
              </button>
            </div>
          </div>

          {/* 高级设置 */}
          <div className="bg-[#252525] rounded-2xl p-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full flex items-center justify-between text-[#888] text-sm"
            >
              <span>高级设置</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showSettings ? "rotate-90" : ""}`} />
            </button>
            
            {showSettings && (
              <div className="mt-4 pt-4 border-t border-[#333] space-y-4">
                {/* 起运法选择 */}
                <div>
                  <div className="text-[#666] text-xs mb-2">起大运方法</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDayunMethod("traditional")}
                      className={`py-2 rounded-lg text-xs ${
                        dayunMethod === "traditional"
                          ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]"
                          : "bg-[#333] text-[#888]"
                      }`}
                    >
                      传统算法
                    </button>
                    <button
                      onClick={() => setDayunMethod("modern")}
                      className={`py-2 rounded-lg text-xs ${
                        dayunMethod === "modern"
                          ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]"
                          : "bg-[#333] text-[#888]"
                      }`}
                    >
                      现代算法
                    </button>
                  </div>
                </div>
                
                {/* 起运年龄 */}
                <div>
                  <div className="text-[#666] text-xs mb-2">起运年龄</div>
                  <select
                    value={dayunStartAge}
                    onChange={(e) => setDayunStartAge(Number(e.target.value))}
                    className="w-full bg-[#333] text-white rounded-lg px-3 py-2 text-sm appearance-none"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((age) => (
                      <option key={age} value={age}>{age}岁</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-[#1a1a1a] border-t border-[#333]">
          <button
            onClick={handlePaipan}
            className="w-full py-4 bg-[#d4af37] rounded-xl text-white font-medium text-lg active:opacity-80"
          >
            立即排盘
          </button>
          <p className="text-[#555] text-[10px] text-center mt-3">
            命理分析仅供学术研究参考，不应作为人生重大决策依据
          </p>
        </div>
      </div>
    )
  }

  // ==================== 结果界面 ====================
  const dayGan = result!.day.gan

  // 渲染干支单元格
  const renderGanZhi = (gan: string, zhi: string, showIcon: boolean = true) => {
    const ganWuxing = WUXING[gan]
    const zhiWuxing = WUXING[zhi]
    
    return (
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl font-bold" style={{ color: WUXING_COLOR[ganWuxing] }}>
            {gan}
          </span>
          {showIcon && <span className="text-sm">{WUXING_ICON[ganWuxing]}</span>}
        </div>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className="text-2xl font-bold" style={{ color: WUXING_COLOR[zhiWuxing] }}>
            {zhi}
          </span>
          {showIcon && <span className="text-sm">{WUXING_ICON[zhiWuxing]}</span>}
        </div>
      </div>
    )
  }

  // 渲染藏干
  const renderCanggan = (zhi: string) => {
    const cangganList = getCangganShishen(dayGan, zhi)
    return (
      <div className="text-xs space-y-0.5">
        {cangganList.map((item, idx) => (
          <div key={idx} className="flex items-center justify-center gap-1">
            <span style={{ color: WUXING_COLOR[WUXING[item.gan]] }}>{item.gan}{WUXING[item.gan]}</span>
          </div>
        ))}
      </div>
    )
  }

  // 渲染副星（藏干十神）
  const renderFuxing = (zhi: string) => {
    const cangganList = getCangganShishen(dayGan, zhi)
    return (
      <div className="text-xs space-y-0.5 text-gray-600">
        {cangganList.map((item, idx) => (
          <div key={idx}>{item.shishen}</div>
        ))}
      </div>
    )
  }

  // 获取四柱神煞
  const getPillarShensha = (pillarZhi: string) => {
    return getShensha(dayGan, result!.year.zhi, pillarZhi)
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0] flex flex-col">
      {/* 头部 */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#2a2520] sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 active:opacity-70">
          <ChevronLeft className="w-7 h-7 text-white" strokeWidth={2.5} />
        </button>
        <h1 className="text-white text-lg font-medium">八字排盘</h1>
        <button className="p-2 -mr-2">
          <MoreHorizontal className="w-6 h-6 text-gray-400" />
        </button>
      </header>

      {/* Tab导航 */}
      <div className="flex bg-[#2a2520] border-b border-[#3a3530]">
        {[
          { key: "basic", label: "基本信息" },
          { key: "chart", label: "基本排盘" },
          { key: "detail", label: "专业细盘" },
          { key: "notes", label: "断事笔记" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 py-3 text-sm font-medium transition-all relative ${
              activeTab === tab.key ? "text-[#d4af37]" : "text-gray-400"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#d4af37]" />
            )}
          </button>
        ))}
      </div>

      {/* 命主信息卡片 */}
      <div className="bg-[#2a2520] px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#3a3530] flex items-center justify-center text-2xl">
            {SHENGXIAO_EMOJI[result!.shengxiao]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37] text-sm">命例</span>
              <span className="px-2 py-0.5 bg-[#3a3530] rounded text-white text-xs">
                {gender === "male" ? "乾造" : "坤造"}
              </span>
            </div>
            <div className="text-white text-sm mt-1">
              农历：{birthYear}年{birthMonth}月{birthDay}日 {SHICHEN_LIST[birthHour].label}
            </div>
            <div className="text-gray-400 text-xs mt-0.5">
              阳历：{result!.solarDate}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-[#3a3530] rounded-lg">
              <Eye className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 bg-[#3a3530] rounded-lg">
              <Edit2 className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* ===== 基本信息Tab ===== */}
        {activeTab === "basic" && (
          <div className="p-4 space-y-4">
            {/* 出生天体图（VIP功能） */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-[#d4af37]" />
                <span className="text-gray-800 font-medium">出生天体图</span>
              </div>
              <div className="bg-gray-100 rounded-xl p-8 text-center">
                <div className="text-gray-500 mb-4">出生天体图功能</div>
                <p className="text-gray-400 text-sm mb-4">
                  通过日月星辰的运行规律，便于您了解出生那一时刻的天体状态
                </p>
                <button className="px-6 py-2 bg-[#d4af37] text-white rounded-lg text-sm">
                  开通VIP会员
                </button>
              </div>
            </div>

            {/* 四柱简图 */}
            <div className="bg-white rounded-xl p-4">
              <div className="grid grid-cols-4 gap-2 text-center">
                {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-lg font-bold" style={{ color: WUXING_COLOR[WUXING[pillar.gan]] }}>
                      {pillar.gan}
                    </div>
                    <div className="text-lg font-bold" style={{ color: WUXING_COLOR[WUXING[pillar.zhi]] }}>
                      {pillar.zhi}
                    </div>
                    <div className="text-xs text-gray-400 bg-gray-100 rounded px-1 py-0.5">
                      {WUXING[pillar.gan]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 节气信息 */}
            <div className="bg-white rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">冬至中气：</span>
                <span className="text-gray-800">1989年12月22日 05:22</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#d4af37]">出生阳历：</span>
                <span className="text-[#d4af37]">{result!.solarDate} 00:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">小寒节气：</span>
                <span className="text-gray-800">1990年01月05日 22:33</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">大寒中气：</span>
                <span className="text-gray-800">1990年01月20日 16:01</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== 基本排盘Tab ===== */}
        {activeTab === "chart" && (
          <div className="p-4 space-y-4">
            {/* 四柱表格 */}
            <div className="bg-white rounded-xl overflow-hidden">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-2 text-gray-500 font-normal w-16">日期</th>
                    <th className="py-2 text-gray-800 font-medium">年柱</th>
                    <th className="py-2 text-gray-800 font-medium">月柱</th>
                    <th className="py-2 text-gray-800 font-medium">日柱</th>
                    <th className="py-2 text-gray-800 font-medium">时柱</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 主星 */}
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-500">主星</td>
                    <td className="py-2 text-[#d4af37]">{getShishen(dayGan, result!.year.gan)}</td>
                    <td className="py-2 text-[#d4af37]">{getShishen(dayGan, result!.month.gan)}</td>
                    <td className="py-2 text-[#d4af37]">元{gender === "male" ? "男" : "女"}</td>
                    <td className="py-2 text-[#d4af37]">{getShishen(dayGan, result!.hour.gan)}</td>
                  </tr>
                  {/* 天干 */}
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500">天干</td>
                    {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                      <td key={idx} className="py-3">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-2xl font-bold" style={{ color: WUXING_COLOR[WUXING[pillar.gan]] }}>
                            {pillar.gan}
                          </span>
                          <span className="text-sm">{WUXING_ICON[WUXING[pillar.gan]]}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  {/* 地支 */}
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500">地支</td>
                    {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                      <td key={idx} className="py-3">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-2xl font-bold" style={{ color: WUXING_COLOR[WUXING[pillar.zhi]] }}>
                            {pillar.zhi}
                          </span>
                          <span className="text-sm">{WUXING_ICON[WUXING[pillar.zhi]]}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  {/* 藏干 */}
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-500 align-top">藏干</td>
                    {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                      <td key={idx} className="py-2 align-top">
                        {renderCanggan(pillar.zhi)}
                      </td>
                    ))}
                  </tr>
                  {/* 副星 */}
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-500 align-top">副星</td>
                    {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                      <td key={idx} className="py-2 align-top">
                        {renderFuxing(pillar.zhi)}
                      </td>
                    ))}
                  </tr>
                  {/* 星运（十二长生） */}
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-500">星运</td>
                    {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                      <td key={idx} className="py-2 text-gray-600 text-xs">
                        {getChangsheng(dayGan, pillar.zhi)}
                      </td>
                    ))}
                  </tr>
                  {/* 自坐 */}
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-500">自坐</td>
                    {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                      <td key={idx} className="py-2 text-gray-600 text-xs">
                        {getChangsheng(pillar.gan, pillar.zhi)}
                      </td>
                    ))}
                  </tr>
                  {/* 空亡 */}
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-500">空亡</td>
                    {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                      <td key={idx} className="py-2 text-gray-600 text-xs">
                        {getKongwang(pillar.gan, pillar.zhi)}
                      </td>
                    ))}
                  </tr>
                  {/* 纳音 */}
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-500">纳音</td>
                    {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                      <td key={idx} className="py-2 text-gray-600 text-xs">
                        {getNayin(pillar.gan, pillar.zhi)}
                      </td>
                    ))}
                  </tr>
                  {/* 神煞 */}
                  <tr>
                    <td className="py-2 text-gray-500 align-top">神煞</td>
                    {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                      <td key={idx} className="py-2 align-top">
                        <div className="text-xs text-[#d4af37] space-y-0.5">
                          {getPillarShensha(pillar.zhi).map((sha, i) => (
                            <div key={i}>{sha}</div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 智能古籍参考 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#d4af37]" />
                  <span className="text-gray-800 font-medium">智能古籍参考</span>
                </div>
                <span className="text-xs text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded">VIP会员</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[
                  { name: "穷通宝鉴", icon: "📚" },
                  { name: "滴天髓", icon: "📖" },
                  { name: "三命通会", icon: "📕" },
                  { name: "八字提要", icon: "📗" },
                ].map((book, idx) => (
                  <div key={idx} className="flex-shrink-0 w-20 text-center">
                    <div className="w-16 h-20 mx-auto bg-[#f5f0e8] rounded-lg flex items-center justify-center text-2xl border border-[#e5e0d8]">
                      {book.icon}
                    </div>
                    <div className="text-xs text-gray-600 mt-2">{book.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 调候用神提示 */}
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm">调候用神提示</span>
                <div className="flex gap-2">
                  {["壬", "戊", "己"].map((gan, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-sm font-medium" style={{ color: WUXING_COLOR[WUXING[gan]] }}>
                      {gan}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">本八字</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">透</span>
                  <span className="px-2 py-1 bg-[#d4af37] text-white rounded text-sm">{result!.day.gan}</span>
                  <span className="text-gray-500 text-sm">藏</span>
                  <span className="px-2 py-1 bg-gray-600 text-white rounded text-sm">{CANGGAN[result!.day.zhi]?.[0] || ""}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== 专业细盘Tab ===== */}
        {activeTab === "detail" && (
          <div className="p-4 space-y-4">
            {/* 大运流年表 */}
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-3">
                起运：出生后{dayunStartAge}年{Math.floor(Math.random() * 12)}月{Math.floor(Math.random() * 28)}天起运
              </div>
              
              {/* 大运 */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-2">大运</div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dayunList.slice(0, 8).map((dy, idx) => (
                    <div key={idx} className="flex-shrink-0 w-12 text-center">
                      <div className="text-xs text-gray-400">{dy.startYear}</div>
                      <div className="text-xs text-gray-400">{dy.startAge}岁</div>
                      <div className="mt-1">
                        <div className="text-sm font-medium" style={{ color: WUXING_COLOR[WUXING[dy.gan]] }}>
                          {dy.gan}
                        </div>
                        <div className="text-sm font-medium" style={{ color: WUXING_COLOR[WUXING[dy.zhi]] }}>
                          {dy.zhi}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 流年 */}
              <div>
                <div className="text-xs text-gray-500 mb-2">流年</div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {liunianList.slice(0, 10).map((ln, idx) => (
                    <div key={idx} className={`flex-shrink-0 w-12 text-center ${ln.year === new Date().getFullYear() ? "bg-[#d4af37]/10 rounded-lg py-1" : ""}`}>
                      <div className="text-xs text-gray-400">{ln.year}</div>
                      <div className="mt-1">
                        <div className="text-sm font-medium" style={{ color: WUXING_COLOR[WUXING[ln.gan]] }}>
                          {ln.gan}
                        </div>
                        <div className="text-sm font-medium" style={{ color: WUXING_COLOR[WUXING[ln.zhi]] }}>
                          {ln.zhi}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 五行旺衰 */}
            <div className="bg-white rounded-xl p-4">
              <div className="flex justify-around text-sm">
                {[
                  { wx: "水", state: "旺" },
                  { wx: "木", state: "相" },
                  { wx: "金", state: "休" },
                  { wx: "土", state: "囚" },
                  { wx: "火", state: "死" },
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <span style={{ color: WUXING_COLOR[item.wx] }}>{item.wx}</span>
                    <span className="text-gray-500">{item.state}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 干支关系分析 */}
            <div className="bg-white rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <span className="text-[#d4af37]">原局天干：</span>
                <span className="text-gray-600">无</span>
              </div>
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <span className="text-[#d4af37]">原局地支：</span>
                <span className="text-gray-600">子巳暗合 | 寅巳相刑 | 寅巳相害</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#d4af37]">原局整柱：</span>
                <span className="text-gray-600">戊子盖头 | 丙子截脚</span>
              </div>
            </div>

            {/* 四柱神煞 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-[#d4af37]" />
                <span className="text-gray-800 font-medium">四柱神煞</span>
              </div>
              <div className="bg-white rounded-xl p-4 space-y-3">
                {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-gray-800 font-medium w-10">{pillar.gan}{pillar.zhi}</span>
                    <div className="flex-1 flex flex-wrap gap-2">
                      {getPillarShensha(pillar.zhi).map((sha, i) => (
                        <span key={i} className="text-[#d4af37] text-sm">{sha}</span>
                      ))}
                      {getPillarShensha(pillar.zhi).length === 0 && (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 大运神煞 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-[#d4af37]" />
                <span className="text-gray-800 font-medium">大运神煞</span>
              </div>
              <div className="bg-white rounded-xl p-4 space-y-3">
                {dayunList.slice(0, 5).map((dy, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className={`font-medium w-10 px-2 py-0.5 rounded text-sm ${idx === 2 ? "bg-[#d4af37] text-white" : "text-gray-800"}`}>
                      {dy.gan}{dy.zhi}
                    </span>
                    <div className="flex-1 flex flex-wrap gap-2">
                      {getShensha(dayGan, result!.year.zhi, dy.zhi).map((sha, i) => (
                        <span key={i} className="text-[#d4af37] text-sm">{sha}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== 断事笔记Tab ===== */}
        {activeTab === "notes" && (
          <div className="p-4 space-y-4">
            {/* 简化四柱 */}
            <div className="bg-[#2a2520] rounded-xl p-4">
              <div className="flex justify-center gap-8">
                <span className="text-white text-sm">{gender === "male" ? "乾造" : "坤造"}</span>
                {[result!.year, result!.month, result!.day, result!.hour].map((pillar, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-white">{pillar.gan}</div>
                    <div className="text-white">{pillar.zhi}</div>
                  </div>
                ))}
              </div>
              <div className="text-center text-gray-400 text-xs mt-2">
                {dayunList.slice(0, 8).map(dy => `${dy.gan}${dy.zhi}`).join(" - ")}
              </div>
            </div>

            {/* 命主反馈/师傅点评切换 */}
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 bg-[#d4af37] text-white rounded-full text-sm">
                命主反馈
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-600 rounded-full text-sm">
                师傅点评
              </button>
            </div>

            {/* 反馈项目 */}
            <div className="space-y-3">
              {[
                { label: "职业", value: "" },
                { label: "学历", value: "" },
                { label: "财富", value: "" },
                { label: "婚姻", value: "" },
              ].map((item, idx) => (
                <button key={idx} className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-4">
                  <span className="text-gray-800">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
              
              <div className="bg-white rounded-xl px-4 py-4">
                <div className="text-gray-600 text-sm">健康状态：<span className="text-gray-400">请输入</span></div>
              </div>
              <div className="bg-white rounded-xl px-4 py-4">
                <div className="text-gray-600 text-sm">六亲状况：<span className="text-gray-400">请输入</span></div>
              </div>
              <div className="bg-white rounded-xl px-4 py-4">
                <div className="text-gray-600 text-sm">性情描述：<span className="text-gray-400">请输入</span></div>
              </div>
            </div>

            {/* 关键事件反馈记录 */}
            <div>
              <div className="text-gray-800 font-medium mb-3">关键事件反馈记录</div>
              <div className="flex items-center justify-between">
                <button className="p-3 bg-white rounded-xl">
                  <span className="text-2xl">📅</span>
                </button>
                <button className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">+</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-100 rounded-xl text-gray-700 font-medium active:bg-gray-200"
        >
          返回
        </button>
        <button
          onClick={handleReset}
          className="flex-1 py-3 bg-[#d4af37] rounded-xl text-white font-medium active:opacity-80"
        >
          重新排盘
        </button>
      </div>

      {/* 免责声明 */}
      <div className="fixed bottom-16 left-0 right-0 bg-gray-50 px-4 py-2">
        <p className="text-gray-400 text-[10px] text-center">
          命理分析仅供学术研究参考，不应作为人生重大决策依据
        </p>
      </div>
    </div>
  )
}
