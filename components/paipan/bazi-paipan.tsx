"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Eye, Pencil, Plus, Calendar, HelpCircle, Settings, Lock, Tv } from "lucide-react"
import {
  calculateBazi, BaziResult, BaziOptions,
  getWuXingColor, getGanZhiRelation,
  TIANGAN_WUXING, DIZHI_WUXING, SHENGXIAO_ICONS
} from "@/lib/bazi/lunar-calculator"
import { getTiaoHouText, getYongShenStatus } from "@/lib/bazi/tiaohou-text"
import { computeExtraInfo } from "@/lib/bazi/extra-info"
import { usePaipanContext } from "@/lib/paipan-context"

// 天干地支列表
const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 五行图标
const WUXING_ICONS: Record<string, string> = {
  '木': '🌲', '火': '🔥', '土': '⛰️', '金': '🪙', '水': '💧'
}

// 时辰名称
const SHICHEN_MAP: Record<number, string> = {
  0: '子', 1: '丑', 2: '寅', 3: '卯', 4: '辰', 5: '巳',
  6: '午', 7: '未', 8: '申', 9: '酉', 10: '戌', 11: '亥'
}

// 时辰列表（含时间范围），索引 0=子 ... 11=亥
const SHICHEN_LIST: { name: string; range: string }[] = [
  { name: '子', range: '23-1' },
  { name: '丑', range: '1-3' },
  { name: '寅', range: '3-5' },
  { name: '卯', range: '5-7' },
  { name: '辰', range: '7-9' },
  { name: '巳', range: '9-11' },
  { name: '午', range: '11-13' },
  { name: '未', range: '13-15' },
  { name: '申', range: '15-17' },
  { name: '酉', range: '17-19' },
  { name: '戌', range: '19-21' },
  { name: '亥', range: '21-23' },
]

// 基本信息表格：行
function InfoRow({ children, striped, index }: { children: React.ReactNode; striped?: boolean; index?: number }) {
  const bg = striped && (index ?? 0) % 2 === 1 ? "bg-[#f3f3f3]" : "bg-white"
  return <div className={`flex ${bg} px-4 py-3`}>{children}</div>
}

// 基本信息表格：单元格
function InfoCell({ label, value, full }: { label: string; value: React.ReactNode; full?: boolean }) {
  return (
    <div className={`flex items-baseline gap-2 ${full ? "w-full" : "w-1/2"}`}>
      <span className="text-[#999] whitespace-nowrap">{label}：</span>
      <span className="text-[#333] break-all">{value}</span>
    </div>
  )
}

// 古籍列表
const CLASSICS = [
  { name: '穷通宝鉴', short: '穷通宝鉴' },
  { name: '滴天髓', short: '滴天髓' },
  { name: '三命通会', short: '三命通会' },
  { name: '八字提要', short: '八字提要' }
]

// 流月节气
const LIUYUE_JIEQI = [
  { name: '立春', date: '2/4' }, { name: '惊蛰', date: '3/5' },
  { name: '清明', date: '4/5' }, { name: '立夏', date: '5/5' },
  { name: '芒种', date: '6/5' }, { name: '小暑', date: '7/7' },
  { name: '立秋', date: '8/7' }, { name: '白露', date: '9/7' },
  { name: '寒露', date: '10/8' }, { name: '立冬', date: '11/7' }
]

interface BaziPaipanProps {
  onBack: () => void
  onAIAnalysis?: () => void
}

export function BaziPaipan({ onBack, onAIAnalysis }: BaziPaipanProps) {
  const { setLastResult } = usePaipanContext()
  
  // Tab状态
  const [activeTab, setActiveTab] = useState<"basic" | "chart" | "detail" | "notes">("chart")
  // 古籍原文/译文切换
  const [classicView, setClassicView] = useState<"yuanwen" | "yiwen">("yuanwen")
  
  // 输入模式
  const [inputMode, setInputMode] = useState<"solar" | "lunar" | "sizhu">("solar")
  
  // 出生日期
  const [birthYear, setBirthYear] = useState(1990)
  const [birthMonth, setBirthMonth] = useState(1)
  const [birthDay, setBirthDay] = useState(1)
  const [birthHour, setBirthHour] = useState(0)
  const [gender, setGender] = useState<"male" | "female">("male")
  
  // 高级设置
  const [showSettings, setShowSettings] = useState(false)
  const [sect, setSect] = useState<1 | 2>(2)
  
  // 四柱直接输入
  const [sizhuYear, setSizhuYear] = useState({ gan: 0, zhi: 0 })
  const [sizhuMonth, setSizhuMonth] = useState({ gan: 0, zhi: 2 })
  const [sizhuDay, setSizhuDay] = useState({ gan: 0, zhi: 0 })
  const [sizhuHour, setSizhuHour] = useState({ gan: 0, zhi: 0 })
  
  // 断事笔记
  const [notesTab, setNotesTab] = useState<"feedback" | "review">("feedback")
  const [showLiunianShensha, setShowLiunianShensha] = useState(false)
  // 五行能量Tab（基本信息页）
  const [wuxingTab, setWuxingTab] = useState<"energy" | "count" | "cangGan">("energy")
  
  // 结果
  const [result, setResult] = useState<BaziResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  // 时辰列表（子=0 ... 亥=11）
  const shichenList = SHICHEN_LIST

  // 年月日列表
  const years = useMemo(() => Array.from({ length: 150 }, (_, i) => 2050 - i), [])
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), [])
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), [])

  // 排盘计算
  const handlePaipan = () => {
    try {
      const hourMap: Record<number, number> = {
        0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 10,
        6: 12, 7: 14, 8: 16, 9: 18, 10: 20, 11: 22
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
      
      setLastResult({
        type: "bazi",
        timestamp: Date.now(),
        data: baziResult
      })
    } catch (error) {
      console.error("[v0] 排盘计算错误:", error)
      alert("排盘计算失败，请检查输入日期是否正确")
    }
  }

  // 获取当前大运
  const getCurrentDayun = () => {
    if (!result?.daYun) return null
    const currentYear = new Date().getFullYear()
    for (let i = result.daYun.length - 1; i >= 0; i--) {
      if (result.daYun[i].startYear <= currentYear) {
        return result.daYun[i]
      }
    }
    return result.daYun[0]
  }

  // 获取当前流年
  const getCurrentLiunian = () => {
    const currentYear = new Date().getFullYear()
    const found = result?.liuNian?.find((ln) => ln.year === currentYear)
    if (found) return found
    const ganIndex = (currentYear - 4) % 10
    const zhiIndex = (currentYear - 4) % 12
    return {
      year: currentYear,
      gan: TIANGAN[ganIndex],
      zhi: DIZHI[zhiIndex],
      ganZhi: TIANGAN[ganIndex] + DIZHI[zhiIndex],
      age: 0,
      ganShiShen: "",
      zhiShiShen: "",
    }
  }

  // 输入界面
  if (!showResult) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex flex-col pb-6">
        {/* 顶部导航 */}
        <header className="flex items-center justify-between px-4 py-3 bg-[#2a2520] sticky top-0 z-10">
          <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg font-medium">问真八字</h1>
          <div className="w-10" />
        </header>

        {/* 输入模式切换 */}
        <div className="flex justify-center gap-2 p-4">
          {[
            { key: "solar", label: "公历" },
            { key: "lunar", label: "农历" },
            { key: "sizhu", label: "四柱" }
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setInputMode(mode.key as typeof inputMode)}
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
          {inputMode === "sizhu" ? (
            <div className="bg-white rounded-xl p-4 space-y-4">
              <h3 className="text-[#333] font-medium">直接输入四柱</h3>
              {[
                { label: "年柱", state: sizhuYear, setState: setSizhuYear },
                { label: "月柱", state: sizhuMonth, setState: setSizhuMonth },
                { label: "日柱", state: sizhuDay, setState: setSizhuDay },
                { label: "时柱", state: sizhuHour, setState: setSizhuHour }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="w-14 text-[#666]">{item.label}：</span>
                  <select
                    value={item.state.gan}
                    onChange={(e) => item.setState({ ...item.state, gan: parseInt(e.target.value) })}
                    className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                  >
                    {TIANGAN.map((g, i) => <option key={i} value={i}>{g}</option>)}
                  </select>
                  <select
                    value={item.state.zhi}
                    onChange={(e) => item.setState({ ...item.state, zhi: parseInt(e.target.value) })}
                    className="flex-1 p-3 bg-[#f8f5f0] rounded-lg text-[#333] text-center"
                  >
                    {DIZHI.map((z, i) => <option key={i} value={i}>{z}</option>)}
                  </select>
                </div>
              ))}
            </div>
          ) : (
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
                  {shichenList.map((sc, i) => (
                    <button
                      key={i}
                      onClick={() => setBirthHour(i)}
                      className={`py-2 px-1 rounded-lg text-center transition-all ${
                        birthHour === i
                          ? "bg-[#d4af37] text-white"
                          : "bg-[#f8f5f0] text-[#666]"
                      }`}
                    >
                      <div className="text-sm font-medium">{sc.name}时</div>
                      <div className="text-[10px] opacity-70">{sc.range}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 性别选择 */}
          <div className="bg-white rounded-xl p-4 mt-4">
            <h3 className="text-[#333] font-medium mb-3">性别</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  gender === "male" ? "bg-[#d4af37] text-white" : "bg-[#f8f5f0] text-[#666]"
                }`}
              >
                乾造(男)
              </button>
              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  gender === "female" ? "bg-[#d4af37] text-white" : "bg-[#f8f5f0] text-[#666]"
                }`}
              >
                坤造(女)
              </button>
            </div>
          </div>

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
              {showSettings ? <ChevronUp className="w-5 h-5 text-[#999]" /> : <ChevronDown className="w-5 h-5 text-[#999]" />}
            </button>
            {showSettings && (
              <div className="px-4 pb-4 border-t border-[#f0f0f0]">
                <div className="pt-3">
                  <p className="text-sm text-[#666] mb-2">晚子时日柱算法：</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSect(1)}
                      className={`flex-1 py-2 rounded-lg text-sm ${sect === 1 ? "bg-[#d4af37] text-white" : "bg-[#f8f5f0] text-[#666]"}`}
                    >
                      算当天
                    </button>
                    <button
                      onClick={() => setSect(2)}
                      className={`flex-1 py-2 rounded-lg text-sm ${sect === 2 ? "bg-[#d4af37] text-white" : "bg-[#f8f5f0] text-[#666]"}`}
                    >
                      算次日
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 排盘按钮 */}
          <button
            onClick={handlePaipan}
            className="w-full mt-6 py-4 bg-[#d4af37] text-white rounded-xl font-medium text-lg shadow-lg"
          >
            立即排盘
          </button>

          <p className="mt-4 text-center text-[#999] text-xs">
            命理分析仅供学术研究参考，不应作为人生重大决策依据
          </p>
        </div>
      </div>
    )
  }

  // 结果界面
  if (!result) return null

  const shengxiao = result.shengxiao || result.shengXiao || "龙"
  const currentDayun = getCurrentDayun()
  const currentLiunian = getCurrentLiunian()
  const extra = computeExtraInfo(result, gender, birthHour)
  const ganZhuLabel = gender === "male" ? "乾造" : "坤造"
  const yinYangLabel = gender === "male" ? "阳" : "阴"

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex flex-col">
      {/* 顶部导航 */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#2a2520] sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-lg font-medium">问真八字</h1>
        <button className="p-2 -mr-2 text-white/60">•••</button>
      </header>

      {/* Tab栏 - 随内容滚动 */}
      <div className="bg-[#d4af37]/10 border-b border-[#d4af37]/20">
        <div className="flex">
          {[
            { key: "basic", label: "基本信息" },
            { key: "chart", label: "基本命盘" },
            { key: "detail", label: "专业细盘" },
            { key: "notes", label: "断事笔记" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 py-3 text-sm font-medium relative ${
                activeTab === tab.key ? "text-[#d4af37]" : "text-[#666]"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#d4af37]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 命主信息卡片 */}
      {(activeTab === "chart" || activeTab === "detail") && (
        <div className="bg-[#2a2520] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#3a3530] flex items-center justify-center border-2 border-[#d4af37]/30">
              <span className="text-2xl">{SHENGXIAO_ICONS[shengxiao] || "🐲"}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm">案例</span>
                <span className="text-[#d4af37] text-sm">({gender === "male" ? "乾造" : "坤造"})</span>
              </div>
              <div className="text-white text-sm mt-1">
                农历：{result.lunarDate} {SHICHEN_MAP[birthHour]}时
              </div>
              <div className="text-white/60 text-xs">
                阳历：{result.solarDate} {String(birthHour * 2).padStart(2, '0')}:00
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-[#3a3530] flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white/60" />
                </button>
                <button className="w-8 h-8 rounded-full bg-[#3a3530] flex items-center justify-center">
                  <Pencil className="w-4 h-4 text-white/60" />
                </button>
              </div>
              <div className="flex items-center gap-1 text-white/60 text-xs">
                <span>胎命身</span>
                <div className="w-8 h-4 bg-[#3a3530] rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 基本信息Tab */}
      {activeTab === "basic" && (
        <div className="flex-1 bg-[#f5f5f5] pb-24">
          {/* 头像 + 姓名（居中） */}
          <div className="bg-[#2a2520] px-4 pt-6 pb-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#3a3530] flex items-center justify-center border-2 border-[#d4af37]/50">
              <span className="text-4xl">{SHENGXIAO_ICONS[shengxiao] || "🐲"}</span>
            </div>
            <div className="text-[#d4af37] text-xl font-semibold mt-3">命主</div>
          </div>

          {/* 详细资料表 */}
          <div className="bg-white -mt-3 rounded-t-2xl overflow-hidden text-[15px]">
            <InfoRow striped index={0}>
              <InfoCell label="姓名" value={<span>命主 <span className="text-[#c8102e]">（{yinYangLabel} {ganZhuLabel}）</span></span>} />
              <InfoCell label="性别" value={gender === "male" ? "男" : "女"} />
            </InfoRow>
            <InfoRow striped index={1}>
              <InfoCell label="农历" value={`${result.lunarDate} ${SHICHEN_MAP[birthHour]}时`} />
              <InfoCell label="生肖" value={shengxiao} />
            </InfoRow>
            <InfoRow striped index={2}>
              <InfoCell full label="阳历" value={`${result.solarDate} ${String(birthHour * 2).padStart(2, "0")}:00:00`} />
            </InfoRow>
            <InfoRow striped index={3}>
              <InfoCell full label="真太阳时" value={`${extra.trueSolarTime} ${String(birthHour * 2).padStart(2, "0")}:00:00`} />
            </InfoRow>
            <InfoRow striped index={4}>
              <InfoCell full label="出生地区" value="未知地区-即北京时间" />
            </InfoRow>
            <InfoRow striped index={5}>
              <InfoCell full label="人元司令分野" value={extra.siLing || "—"} />
            </InfoRow>
            <InfoRow striped index={6}>
              <InfoCell full label="出生节气" value={extra.jieQiText || "—"} />
            </InfoRow>
            <InfoRow striped index={7}>
              <InfoCell label={extra.prevJie || "立冬"} value={extra.prevJieDate} />
              <InfoCell label={extra.nextJie || "大雪"} value={extra.nextJieDate} />
            </InfoRow>
            <InfoRow striped index={8}>
              <InfoCell label="星座" value={extra.xingZuo} />
              <InfoCell label="星宿" value={extra.xingXiu} />
            </InfoRow>
            <InfoRow striped index={9}>
              <InfoCell label="胎元" value={`${extra.taiYuan}（${extra.taiYuanNaYin}）`} />
              <InfoCell label="空亡" value={`${result.kongWang?.year || ""} ${result.kongWang?.day || ""}`} />
            </InfoRow>
            <InfoRow striped index={10}>
              <InfoCell label="命宫" value={`${extra.mingGong}（${extra.mingGongNaYin}）`} />
              <InfoCell label="胎息" value={`${extra.taiXi}（${extra.taiXiNaYin}）`} />
            </InfoRow>
            <InfoRow striped index={11}>
              <InfoCell label="身宫" value={`${extra.shenGong}（${extra.shenGongNaYin}）`} />
              <InfoCell label="命卦" value={`${extra.mingGua} (${extra.mingGuaDirection})`} />
            </InfoRow>
          </div>

          {/* 小真智能系统 */}
          <div className="bg-[#ededed] mt-2 px-4 py-3">
            <div className="flex items-center justify-center gap-2 text-[#555] font-medium">
              <Tv className="w-5 h-5 text-[#d4af37]" />
              小真智能系统
            </div>
          </div>
          <div className="bg-white px-4 py-4">
            <div className="grid grid-cols-2 gap-y-4 text-[15px]">
              <div className="flex items-center gap-2">
                <span className="text-[#999]">日主属性：</span>
                <span className="text-[#d4af37] font-medium">{result.day.gan}{TIANGAN_WUXING[result.day.gan]}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#999]">阴阳参考：</span>
                <Lock className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#999]">旺衰参考：</span>
                <Lock className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#999]">格局参考：</span>
                <Lock className="w-4 h-4 text-[#d4af37]" />
              </div>
            </div>
            <div className="mt-4 h-7 rounded-full bg-[#f0f0f0] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-1/4 bg-[#f3d9d9]" />
                <div className="w-1/4 bg-[#d9e4f3]" />
                <div className="w-1/2 bg-[#f0f0f0]" />
              </div>
              <Lock className="w-4 h-4 text-[#d4af37] relative z-10" />
            </div>
          </div>

          {/* 五行能量 / 五行个数 / 含藏干数 */}
          <div className="bg-white mt-2 px-3 py-4">
            <div className="relative bg-[#f5f5f5] rounded-xl p-1 flex">
              <span className="absolute -top-0 -left-0 bg-[#c9a227] text-white text-[10px] px-1.5 py-0.5 rounded-tl-xl rounded-br-lg z-10">VIP</span>
              {[
                { key: "energy", label: "五行能量" },
                { key: "count", label: "五行个数" },
                { key: "cangGan", label: "含藏干数" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setWuxingTab(t.key as typeof wuxingTab)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${wuxingTab === t.key ? "bg-white text-[#333] shadow-sm" : "text-[#888]"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-4">
              {wuxingTab === "energy" ? (
                <div className="bg-[#fafafa] rounded-xl p-5 text-center">
                  <p className="text-[#555] text-sm leading-relaxed text-balance">
                    五行能量综合计算了五行个数、干支比重、藏干深浅、宫位力量、刑冲破害合等因素影响后的量化结果，是喜用神判断的重要参考指标
                  </p>
                  <button className="mt-5 px-10 py-3 bg-[#c9a227] text-white rounded-full font-medium">
                    开通VIP会员
                  </button>
                </div>
              ) : (
                <div className="bg-[#fafafa] rounded-xl p-4">
                  {(() => {
                    const order = ["金", "木", "水", "火", "土"]
                    const counts = result.wuXingCount || {}
                    const max = Math.max(1, ...order.map((w) => counts[w] || 0))
                    return order.map((w) => (
                      <div key={w} className="flex items-center gap-3 py-1.5">
                        <span className="w-6 text-center font-medium" style={{ color: getWuXingColor(w === "金" ? "庚" : w === "木" ? "甲" : w === "水" ? "壬" : w === "火" ? "丙" : "戊") }}>{w}</span>
                        <div className="flex-1 h-3 bg-[#eee] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${((counts[w] || 0) / max) * 100}%`, backgroundColor: getWuXingColor(w === "金" ? "庚" : w === "木" ? "甲" : w === "水" ? "壬" : w === "火" ? "丙" : "戊") }} />
                        </div>
                        <span className="w-8 text-right text-[#666] text-sm">{counts[w] || 0}</span>
                      </div>
                    ))
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* 五行旺相条 */}
          <div className="flex text-sm text-white mt-2">
            {[
              { wx: result.wuXingStrength?.wang, s: "旺" },
              { wx: result.wuXingStrength?.xiang, s: "相" },
              { wx: result.wuXingStrength?.xiu, s: "休" },
              { wx: result.wuXingStrength?.qiu, s: "囚" },
              { wx: result.wuXingStrength?.si, s: "死" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex-1 py-2.5 text-center font-medium"
                style={{ backgroundColor: getWuXingColor(item.wx === "金" ? "庚" : item.wx === "木" ? "甲" : item.wx === "水" ? "壬" : item.wx === "火" ? "丙" : "戊") }}
              >
                {item.wx}{item.s}
              </div>
            ))}
          </div>

          {/* 袁天罡称骨 */}
          <div className="mt-2 bg-white">
            <div className="bg-[#3a2f1e] py-6 flex items-center justify-center relative">
              <span className="px-5 py-2 border border-[#d4af37]/60 rounded-full text-[#d4af37] font-medium tracking-wide">袁天罡称骨</span>
              <span className="absolute top-2 right-0 bg-[#c8102e] text-white text-[10px] px-3 py-0.5 -rotate-0">评语</span>
            </div>
            <div className="px-4 py-4">
              <h3 className="text-[#333] font-semibold mb-3">袁天罡称骨</h3>
              <div className="flex gap-6 mb-3">
                <span className="text-[#333]">重量</span>
                <span className="text-[#333] font-medium">{extra.chenGuWeight}</span>
              </div>
              <div className="text-[#555] leading-relaxed text-[15px] space-y-1">
                {extra.chenGuPoem.split("：").length > 1 ? (
                  <>
                    <p className="text-[#999] text-sm">{extra.chenGuPoem.split("：")[0]}</p>
                    {extra.chenGuPoem.split("：")[1].split("，").map((line, i) => (
                      <p key={i}>{line.replace(/。$/, "")}{line.endsWith("。") ? "。" : "，"}</p>
                    ))}
                  </>
                ) : (
                  <p>{extra.chenGuPoem}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 基本排盘Tab */}
      {activeTab === "chart" && (
        <div className="flex-1 bg-white pb-24">
          {/* 提示文字 */}
          <div className="text-center py-2 text-[#d4af37] text-xs border-b border-[#f0f0f0]">
            以下小字内容可点击 神煞、十神等小知识弹窗。 <span className="text-[#999]">✕</span>
          </div>

          {/* 四柱表格 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#f0f0f0]">
                  <th className="py-2 px-1 text-[#999] font-normal text-left w-8">日期</th>
                  <th className="py-2 px-1 text-[#333] font-medium text-center">年柱</th>
                  <th className="py-2 px-1 text-[#333] font-medium text-center">月柱</th>
                  <th className="py-2 px-1 text-[#333] font-medium text-center">日柱</th>
                  <th className="py-2 px-1 text-[#333] font-medium text-center">时柱</th>
                </tr>
              </thead>
              <tbody>
                {/* 主星 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-1 px-1 text-[#999]">主星</td>
                  <td className="py-1 px-1 text-center text-[#333]">{result.shiShen?.year || "—"}</td>
                  <td className="py-1 px-1 text-center text-[#333]">{result.shiShen?.month || "—"}</td>
                  <td className="py-1 px-1 text-center text-[#c8102e] font-medium">{gender === "male" ? "元男" : "元女"}</td>
                  <td className="py-1 px-1 text-center text-[#333]">{result.shiShen?.hour || "—"}</td>
                </tr>
                {/* 天干 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-1.5 px-2 text-[#999]">天干</td>
                  {[result.year, result.month, result.day, result.hour].map((pillar, i) => (
                    <td key={i} className="py-1.5 px-2 text-center">
                      <span className="text-2xl font-bold" style={{ color: getWuXingColor(TIANGAN_WUXING[pillar.gan]) }}>
                        {pillar.gan}
                      </span>
                    </td>
                  ))}
                </tr>
                {/* 地支 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-1.5 px-2 text-[#999]">地支</td>
                  {[result.year, result.month, result.day, result.hour].map((pillar, i) => (
                    <td key={i} className="py-1.5 px-2 text-center">
                      <span className="text-2xl font-bold" style={{ color: getWuXingColor(DIZHI_WUXING[pillar.zhi]) }}>
                        {pillar.zhi}
                      </span>
                    </td>
                  ))}
                </tr>
                {/* 藏干 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-1.5 px-2 text-[#999] align-top">藏干</td>
                  {(["year", "month", "day", "hour"] as const).map((key, i) => (
                    <td key={i} className="py-1 px-2 text-center align-top">
                      <div className="space-y-0.5">
                        {(result.cangGan?.[key] || []).map((gan: string, j: number) => {
                          const wx = TIANGAN_WUXING[gan] || ""
                          return (
                            <div key={j} className="text-xs">
                              <span style={{ color: getWuXingColor(wx) }}>{gan}{wx}</span>
                            </div>
                          )
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* 副星 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-1 px-2 text-[#999] align-top">副星</td>
                  {(["year", "month", "day", "hour"] as const).map((key, i) => (
                    <td key={i} className="py-1 px-2 text-center align-top">
                      <div className="space-y-0.5 text-xs text-[#666]">
                        {(result.cangGanShiShen?.[key] || []).map((ss: string, j: number) => (
                          <div key={j}>{ss}</div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* 星运 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-1 px-2 text-[#999]">星运</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.changSheng?.year || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.changSheng?.month || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.changSheng?.day || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.changSheng?.hour || "—"}</td>
                </tr>
                {/* 自坐 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-1 px-2 text-[#999]">自坐</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.ziZuo?.year || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.ziZuo?.month || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.ziZuo?.day || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.ziZuo?.hour || "—"}</td>
                </tr>
                {/* 空亡 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-1 px-2 text-[#999]">空亡</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.kongWang?.year || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.kongWang?.month || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.kongWang?.day || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333]">{result.kongWang?.hour || "—"}</td>
                </tr>
                {/* 纳音 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-1 px-2 text-[#999]">纳音</td>
                  <td className="py-1 px-2 text-center text-[#333] text-xs">{result.naYin?.year || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333] text-xs">{result.naYin?.month || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333] text-xs">{result.naYin?.day || "—"}</td>
                  <td className="py-1 px-2 text-center text-[#333] text-xs">{result.naYin?.hour || "—"}</td>
                </tr>
                {/* 神煞 */}
                <tr>
                  <td className="py-1 px-2 text-[#999] align-top">神煞</td>
                  {(["year", "month", "day", "hour"] as const).map((key, i) => (
                    <td key={i} className="py-1 px-2 text-center align-top">
                      <div className="space-y-0.5">
                        {(result.shenSha?.[key] || []).map((ss: string, j: number) => (
                          <div key={j} className="text-xs text-[#d4af37]">{ss}</div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* 智能四柱图示 / AI指令 */}
          <div className="flex gap-2 mx-4 my-4">
            <button className="flex-1 py-3 bg-[#f8f5f0] rounded-xl text-[#333] font-medium flex items-center justify-center gap-1">
              智能四柱图示 <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAIAnalysis?.()}
              className="flex-1 py-3 bg-[#f8f5f0] rounded-xl text-[#333] font-medium flex items-center justify-center gap-1"
            >
              AI指令 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 天干留意 / 地支留意 */}
          <div className="px-4 py-3 space-y-3 border-t border-[#f0f0f0]">
            <div className="flex items-start gap-3">
              <span className="shrink-0 px-2.5 py-1 rounded-md bg-[#f3eddf] text-[#b8902f] text-sm">天干留意</span>
              <span className="text-[#333] leading-relaxed">{result.ganZhiRelation?.tianGan?.length ? result.ganZhiRelation.tianGan.join(";") : "无"}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 px-2.5 py-1 rounded-md bg-[#f3eddf] text-[#b8902f] text-sm">地支留意</span>
              <span className="text-[#333] leading-relaxed">{result.ganZhiRelation?.diZhi?.length ? result.ganZhiRelation.diZhi.join(";") : "无"}</span>
            </div>
          </div>

          {/* 智能古籍参考 */}
          <div className="mt-2 relative">
            <div className="bg-[#3a2f1e] py-3 text-center text-white/90 font-medium relative">
              智能古籍参考
              <span className="absolute top-0 right-0 bg-[#c9a227] text-white text-[10px] px-3 py-1 rounded-bl-lg">VIP会员</span>
            </div>
            <div className="flex gap-3 overflow-x-auto px-4 py-4 bg-white">
              {CLASSICS.map((book, i) => (
                <div key={i} className="flex flex-col items-center shrink-0">
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center ${i === 0 ? "bg-white border border-[#eee] shadow-sm" : "bg-[#6b5836]"}`}>
                    <div className={`text-sm font-medium ${i === 0 ? "text-[#b8902f]" : "text-white"}`}>{book.short}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-1 pb-2 bg-white">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
              <span className="w-2 h-2 rounded-full bg-[#e5e5e5]"></span>
              <span className="w-2 h-2 rounded-full bg-[#e5e5e5]"></span>
            </div>
          </div>

          {(() => {
            const yongShen = result.tiaoHou?.yongShen || []
            const xiShen = result.tiaoHou?.xiShen || []
            const ganList = [result.year.gan, result.month.gan, result.day.gan, result.hour.gan]
            const cangGanList = [
              ...(result.cangGan?.year || []),
              ...(result.cangGan?.month || []),
              ...(result.cangGan?.day || []),
              ...(result.cangGan?.hour || []),
            ]
            const statuses = getYongShenStatus(yongShen, ganList, cangGanList)
            const text = getTiaoHouText(result.day.gan, result.month.zhi, yongShen, xiShen)
            return (
              <>
                {/* 调候用神提示（依真实八字） */}
                <div className="mx-3 mb-4 bg-white rounded-xl border border-[#f0f0f0] overflow-hidden shadow-sm">
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-[#333] font-medium">调候用神提示</span>
                      <HelpCircle className="w-4 h-4 text-[#999]" />
                    </div>
                    <div className="flex gap-1.5 text-[#d4af37] font-medium">
                      {yongShen.length ? yongShen.map((g, i) => <span key={i}>{g}</span>) : <span className="text-[#999]">中和</span>}
                    </div>
                  </div>
                  <div className="px-3 pb-3 flex items-center justify-between border-t border-[#f0f0f0] pt-3 flex-wrap gap-2">
                    <span className="text-[#333] shrink-0">本八字</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {statuses.map((s, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className={`px-2 py-1 rounded text-sm text-white ${s.status === "透" ? "bg-[#d4af37]" : s.status === "藏" ? "bg-[#888]" : "bg-[#ccc]"}`}>{s.gan}</span>
                          <span className="text-[#666] text-xs">{s.status}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 论X生X月（依真实日主月令动态生成） */}
                <div className="px-3 pb-6">
                  <div className="text-[#d4af37] font-medium mb-3">{text.title}</div>
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setClassicView("yuanwen")}
                      className={`px-4 py-1.5 rounded-full text-sm ${classicView === "yuanwen" ? "bg-[#d4af37] text-white" : "bg-[#f5f5f5] text-[#666]"}`}
                    >原文</button>
                    <button
                      onClick={() => setClassicView("yiwen")}
                      className={`px-4 py-1.5 rounded-full text-sm ${classicView === "yiwen" ? "bg-[#d4af37] text-white" : "bg-[#f5f5f5] text-[#666]"}`}
                    >译文</button>
                  </div>
                  <div className="text-[#333] leading-relaxed text-sm space-y-2 bg-[#faf9f7] p-3 rounded-xl">
                    {(classicView === "yuanwen" ? text.yuanWen : text.yiWen).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <p className="text-[#999] text-xs mt-2">* 依据《穷通宝鉴》调候用神原理，结合本命日主与月令实时推演</p>
                </div>
              </>
            )
          })()}
        </div>
      )}

      {/* 专业细盘Tab */}
      {activeTab === "detail" && (
        <div className="flex-1 bg-white pb-24">
          {/* 扩展表格 - 包含流年、大运 */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[500px]">
              <thead>
                <tr className="border-b border-[#f0f0f0]">
                  <th className="py-2 px-1 text-[#999] font-normal text-left w-8">日期</th>
                  <th className="py-2 px-1 text-[#333] font-medium text-center">流年</th>
                  <th className="py-2 px-1 text-[#333] font-medium text-center">大运</th>
                  <th className="py-2 px-1 text-[#333] font-medium text-center">年柱</th>
                  <th className="py-2 px-1 text-[#333] font-medium text-center">月柱</th>
                  <th className="py-2 px-1 text-[#333] font-medium text-center">日柱</th>
                  <th className="py-2 px-1 text-[#333] font-medium text-center">时柱</th>
                </tr>
              </thead>
              <tbody>
                {/* 主星 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-1 px-1 text-[#999]">主星</td>
                  <td className="py-1 px-1 text-center text-[#333]">{currentLiunian.ganShiShen || "—"}</td>
                  <td className="py-1 px-1 text-center text-[#333]">{currentDayun?.ganShiShen || "—"}</td>
                  <td className="py-1 px-1 text-center text-[#333]">{result.shiShen?.year || "—"}</td>
                  <td className="py-1 px-1 text-center text-[#333]">{result.shiShen?.month || "—"}</td>
                  <td className="py-1 px-1 text-center text-[#c8102e] font-medium">{gender === "male" ? "元男" : "元女"}</td>
                  <td className="py-1 px-1 text-center text-[#333]">{result.shiShen?.hour || "—"}</td>
                </tr>
                {/* 天干 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-2 px-1 text-[#999]">天干</td>
                  <td className="py-2 px-1 text-center">
                    <span className="text-lg font-bold text-[#c8102e]">{currentLiunian.gan}</span>
                    <span className="ml-0.5">{WUXING_ICONS[TIANGAN_WUXING[currentLiunian.gan]]}</span>
                  </td>
                  <td className="py-2 px-1 text-center">
                    <span className="text-lg font-bold text-[#d4af37]">{currentDayun?.gan || "癸"}</span>
                    <span className="ml-0.5">{WUXING_ICONS[TIANGAN_WUXING[currentDayun?.gan || "癸"]]}</span>
                  </td>
                  {[result.year, result.month, result.day, result.hour].map((pillar, i) => (
                    <td key={i} className="py-2 px-1 text-center">
                      <span className="text-lg font-bold" style={{ color: getWuXingColor(TIANGAN_WUXING[pillar.gan]) }}>
                        {pillar.gan}
                      </span>
                      <span className="ml-0.5">{WUXING_ICONS[TIANGAN_WUXING[pillar.gan]]}</span>
                    </td>
                  ))}
                </tr>
                {/* 地支 */}
                <tr className="border-b border-[#f0f0f0]">
                  <td className="py-2 px-1 text-[#999]">地支</td>
                  <td className="py-2 px-1 text-center">
                    <span className="text-lg font-bold text-[#c8102e]">{currentLiunian.zhi}</span>
                    <span className="ml-0.5">{WUXING_ICONS[DIZHI_WUXING[currentLiunian.zhi]]}</span>
                  </td>
                  <td className="py-2 px-1 text-center">
                    <span className="text-lg font-bold text-[#d4af37]">{currentDayun?.zhi || "酉"}</span>
                    <span className="ml-0.5">{WUXING_ICONS[DIZHI_WUXING[currentDayun?.zhi || "酉"]]}</span>
                  </td>
                  {[result.year, result.month, result.day, result.hour].map((pillar, i) => (
                    <td key={i} className="py-2 px-1 text-center">
                      <span className="text-lg font-bold" style={{ color: getWuXingColor(DIZHI_WUXING[pillar.zhi]) }}>
                        {pillar.zhi}
                      </span>
                      <span className="ml-0.5">{WUXING_ICONS[DIZHI_WUXING[pillar.zhi]]}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* 大运行 */}
          <div className="border-b border-[#f0f0f0] overflow-x-auto">
            <div className="flex items-center min-w-[500px] text-xs">
              <span className="text-[#999] px-1 w-8 shrink-0">大运</span>
              {(result.daYun || []).slice(0, 10).map((dy, i) => (
                <div key={i} className="flex-1 text-center py-1 border-l border-[#f0f0f0]">
                  <div className="text-[#999] text-[10px]">{dy.startAge}岁</div>
                  <div>
                    <span style={{ color: getWuXingColor(TIANGAN_WUXING[dy.gan]) }}>{dy.gan}</span>
                    <span className="text-[#666] ml-0.5">{dy.ganShiShen?.slice(-1) || ""}</span>
                  </div>
                  <div>
                    <span style={{ color: getWuXingColor(DIZHI_WUXING[dy.zhi]) }}>{dy.zhi}</span>
                    <span className="text-[#666] ml-0.5">{dy.zhiShiShen?.slice(-1) || ""}</span>
                  </div>
                  <div className="text-[#999] text-[10px]">{dy.startYear}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 小运行 */}
          <div className="border-b border-[#f0f0f0] overflow-x-auto">
            <div className="flex items-center min-w-[500px] text-xs">
              <span className="text-[#999] px-1 w-8 shrink-0">小运</span>
              {(result.xiaoYun || []).length > 0 ? (
                (result.xiaoYun || []).slice(0, 10).map((xy, i) => (
                  <div key={i} className="flex-1 text-center py-1.5 border-l border-[#f0f0f0]">
                    <div className="text-[#999] text-[10px]">{xy.age}岁</div>
                    <span style={{ color: getWuXingColor(TIANGAN_WUXING[xy.gan]) }}>{xy.gan}</span>
                    <span className="text-[#666] ml-0.5">{xy.ganShiShen?.slice(-1) || ""}</span>
                    <br />
                    <span style={{ color: getWuXingColor(DIZHI_WUXING[xy.zhi]) }}>{xy.zhi}</span>
                    <span className="text-[#666] ml-0.5">{xy.zhiShiShen?.slice(-1) || ""}</span>
                  </div>
                ))
              ) : (
                <span className="text-[#999] px-2 py-2">—</span>
              )}
            </div>
          </div>

          {/* 流月行（当前流年） */}
          <div className="border-b border-[#f0f0f0] overflow-x-auto">
            <div className="flex items-center min-w-[500px] text-xs">
              <span className="text-[#999] px-1 w-8 shrink-0">流月</span>
              {LIUYUE_JIEQI.map((jq, i) => {
                // 五虎遁：依当前流年天干推正月(寅)起干
                const yinStartMap: Record<string, number> = { 甲: 2, 己: 2, 乙: 4, 庚: 4, 丙: 6, 辛: 6, 丁: 8, 壬: 8, 戊: 0, 癸: 0 }
                const base = yinStartMap[currentLiunian.gan] ?? 0
                const ganIndex = (base + i) % 10
                const zhiIndex = (2 + i) % 12
                const g = TIANGAN[ganIndex]
                const z = DIZHI[zhiIndex]
                return (
                  <div key={i} className="flex-1 text-center py-1 border-l border-[#f0f0f0]">
                    <div className="text-[#999]">{jq.name}</div>
                    <div className="text-[#999] text-[10px]">{jq.date}</div>
                    <div className="mt-0.5">
                      <span style={{ color: getWuXingColor(TIANGAN_WUXING[g]) }}>{g}</span>
                    </div>
                    <div>
                      <span style={{ color: getWuXingColor(DIZHI_WUXING[z]) }}>{z}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 五行旺衰条 */}
          <div className="flex text-xs text-white">
            <div className="flex-1 py-1.5 text-center bg-[#1a73e8]">水旺</div>
            <div className="flex-1 py-1.5 text-center bg-[#34a853]">木相</div>
            <div className="flex-1 py-1.5 text-center bg-[#d4af37]">金休</div>
            <div className="flex-1 py-1.5 text-center bg-[#a67c52]">土囚</div>
            <div className="flex-1 py-1.5 text-center bg-[#c8102e]">火死</div>
          </div>

          {/* 智能干支图示 / AI指令 */}
          <div className="flex gap-2 mx-4 my-4">
            <button className="flex-1 py-3 bg-[#f8f5f0] rounded-xl text-[#333] font-medium flex items-center justify-center gap-1 text-sm">
              智能干支图示 <ChevronRight className="w-4 h-4" />
            </button>
            <button className="flex-1 py-3 bg-[#f8f5f0] rounded-xl text-[#333] font-medium flex items-center justify-center gap-1 text-sm">
              AI指令 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 岁运关系 */}
          <div className="px-4 py-3 space-y-2 border-t border-[#f0f0f0] text-sm">
            <div className="flex">
              <span className="text-[#d4af37] w-20 shrink-0">岁运天干：</span>
              <span className="text-[#333]">戊癸相克 | 戊癸合化火</span>
            </div>
            <div className="flex">
              <span className="text-[#d4af37] w-20 shrink-0">岁运地支：</span>
              <span className="text-[#333]">巳酉半合金局 | 巳酉暗合 | 寅午暗合 | 子午相冲 | 子酉相破</span>
            </div>
            <div className="flex">
              <span className="text-[#d4af37] w-20 shrink-0">岁运整柱：</span>
              <span className="text-[#333]">无</span>
            </div>
          </div>

          {/* 原局关系 */}
          <div className="px-4 py-3 space-y-2 border-t border-[#f0f0f0] text-sm">
            <div className="flex">
              <span className="text-[#d4af37] w-20 shrink-0">原局天干：</span>
              <span className="text-[#333]">{result.ganZhiRelation?.tianGan?.length ? result.ganZhiRelation.tianGan.join(" | ") : "无"}</span>
            </div>
            <div className="flex">
              <span className="text-[#d4af37] w-20 shrink-0">原局地支：</span>
              <span className="text-[#333]">{result.ganZhiRelation?.diZhi?.length ? result.ganZhiRelation.diZhi.join(" | ") : "无"}</span>
            </div>
            <div className="flex">
              <span className="text-[#d4af37] w-20 shrink-0">原局整柱：</span>
              <span className="text-[#333]">{result.ganZhiRelation?.zhengZhu?.length ? result.ganZhiRelation.zhengZhu.join(" | ") : "无"}</span>
            </div>
          </div>

          {/* 四柱神煞 */}
          <div className="border-t border-[#f0f0f0]">
            <div className="bg-[#f8f5f0] px-4 py-2 font-medium text-[#333]">四柱神煞</div>
            <div className="px-4 py-3 space-y-3 text-sm">
              {(["year", "month", "day", "hour"] as const).map((key, i) => {
                const pillar = [result.year, result.month, result.day, result.hour][i]
                const ss = result.shenSha?.[key] || []
                return (
                  <div key={i} className="flex">
                    <span className="text-[#333] w-12 shrink-0 font-medium">{pillar.ganZhi}</span>
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                      {ss.length ? ss.map((s: string, j: number) => (
                        <span key={j} className="text-[#d4af37]">{s}</span>
                      )) : <span className="text-[#999]">无</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 大运神煞 */}
          <div className="border-t border-[#f0f0f0]">
            <div className="bg-[#f8f5f0] px-4 py-2 font-medium text-[#333]">大运神煞</div>
            <div className="px-4 py-3 space-y-3 text-sm">
              {(result.daYun || []).slice(0, 10).map((dy: { ganZhi: string }, i: number) => {
                const isCurrentDy = currentDayun?.ganZhi === dy.ganZhi
                const ssList = ["天乙贵人", "空亡", "驿马", "天医", "劫煞", "学堂"]
                return (
                  <div key={i} className="flex">
                    <span className={`w-12 shrink-0 font-medium ${isCurrentDy ? "text-white bg-[#d4af37] px-2 py-0.5 rounded" : "text-[#333]"}`}>
                      {dy.ganZhi}
                    </span>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 ml-2">
                      {ssList.map((s, j) => (
                        <span key={j} className="text-[#d4af37]">{s}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 流年神煞 */}
          <div className="border-t border-[#f0f0f0]">
            <button
              onClick={() => setShowLiunianShensha(!showLiunianShensha)}
              className="w-full bg-[#f8f5f0] px-4 py-2 font-medium text-[#333] flex items-center justify-between"
            >
              <span>流年神煞</span>
              <span className="text-[#d4af37] flex items-center gap-1 text-sm">
                {showLiunianShensha ? "收起" : "展开"}
                {showLiunianShensha ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </span>
            </button>
            {showLiunianShensha && (
              <div className="px-4 py-3 text-sm">
                <div className="flex">
                  <span className="w-12 shrink-0 font-medium text-white bg-[#d4af37] px-2 py-0.5 rounded">
                    {currentLiunian.ganZhi}
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 ml-2">
                    {["德秀贵人", "羊刃", "桃花", "血刃", "将星"].map((s, j) => (
                      <span key={j} className="text-[#d4af37]">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 起运信息 */}
          <div className="px-4 py-3 border-t border-[#f0f0f0] text-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#333]">起运：出生后</span>
                <span className="text-[#333] font-medium">{result.qiYun?.years || 8}年{result.qiYun?.months || 2}月{result.qiYun?.days || 3}天{result.qiYun?.hours || 6}时</span>
                <span className="text-[#333]">起运</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#333]">{new Date().getFullYear() - birthYear}岁</span>
                <button className="w-8 h-8 border border-[#e5e5e5] rounded flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#999]" />
                </button>
              </div>
            </div>
            <div className="text-[#666] mt-1">
              交运：逢戊、癸年 立春后27天 交大运 &nbsp;&nbsp; 司令：<span className="text-[#d4af37]">癸</span>
            </div>
          </div>

          {/* 大运列表 */}
          <div className="border-t border-[#f0f0f0] overflow-x-auto">
            <div className="flex min-w-[500px] text-xs">
              <div className="w-10 shrink-0 p-2">
                <div className="text-[#999]">大运</div>
                <div className="mt-1">
                  <div className="w-4 h-4 rounded-full border border-[#999]"></div>
                </div>
              </div>
              {(result.daYun || []).slice(0, 10).map((dy: { ganZhi: string; startYear: number; startAge: number; gan: string; zhi: string }, i: number) => {
                const isCurrentDy = currentDayun?.ganZhi === dy.ganZhi
                return (
                  <div key={i} className={`flex-1 text-center py-2 border-l border-[#f0f0f0] ${isCurrentDy ? "bg-[#d4af37]/10" : ""}`}>
                    <div className={`${isCurrentDy ? "text-[#d4af37] font-bold" : "text-[#999]"}`}>{dy.startYear}</div>
                    <div className={`${isCurrentDy ? "text-[#d4af37] font-bold" : "text-[#999]"}`}>{dy.startAge}岁</div>
                    <div className="mt-1">
                      <span className={isCurrentDy ? "text-[#d4af37] font-bold" : ""} style={{ color: isCurrentDy ? undefined : getWuXingColor(TIANGAN_WUXING[dy.gan]) }}>
                        {dy.gan}
                      </span>
                      <span className="text-[#c8102e] ml-0.5">官</span>
                    </div>
                    <div>
                      <span className={isCurrentDy ? "text-[#d4af37] font-bold" : ""} style={{ color: isCurrentDy ? undefined : getWuXingColor(DIZHI_WUXING[dy.zhi]) }}>
                        {dy.zhi}
                      </span>
                      <span className="text-[#c8102e] ml-0.5">财</span>
                    </div>
                    {isCurrentDy && <div className="w-1.5 h-1.5 rounded-full bg-[#34a853] mx-auto mt-1"></div>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 流年列表 */}
          <div className="border-t border-[#f0f0f0] overflow-x-auto">
            <div className="flex min-w-[500px] text-xs">
              <div className="w-10 shrink-0 p-2">
                <div className="text-[#999]">流年</div>
                <div className="text-[#999] mt-1">小运</div>
              </div>
              {Array.from({ length: 10 }, (_, i) => {
                const baseYear = currentDayun?.startYear || 2018
                const year = baseYear + i
                const ganIndex = (year - 4) % 10
                const zhiIndex = (year - 4) % 12
                const isCurrentYear = year === new Date().getFullYear()
                return (
                  <div key={i} className={`flex-1 text-center py-2 border-l border-[#f0f0f0] ${isCurrentYear ? "bg-[#c8102e]/10" : ""}`}>
                    <div className={isCurrentYear ? "text-[#c8102e] font-bold" : "text-[#999]"}>{year}</div>
                    <div className="mt-1">
                      <span className={isCurrentYear ? "text-[#c8102e] font-bold" : ""} style={{ color: isCurrentYear ? undefined : getWuXingColor(TIANGAN_WUXING[TIANGAN[ganIndex]]) }}>
                        {TIANGAN[ganIndex]}
                      </span>
                      <span className="text-[#c8102e] ml-0.5">食</span>
                    </div>
                    <div>
                      <span className={isCurrentYear ? "text-[#c8102e] font-bold" : ""} style={{ color: isCurrentYear ? undefined : getWuXingColor(DIZHI_WUXING[DIZHI[zhiIndex]]) }}>
                        {DIZHI[zhiIndex]}
                      </span>
                      <span className="text-[#c8102e] ml-0.5">食</span>
                    </div>
                    {isCurrentYear && <div className="w-1.5 h-1.5 rounded-full bg-[#34a853] mx-auto mt-1"></div>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* 断事笔记Tab */}
      {activeTab === "notes" && (
        <div className="flex-1 flex flex-col">
          {/* 四柱头部 */}
          <div className="bg-[#2a2520] px-4 py-4">
            <div className="flex items-center justify-center gap-6">
              <span className="text-[#d4af37]">{gender === "male" ? "乾造" : "坤造"}</span>
              {[result.year, result.month, result.day, result.hour].map((pillar, i) => (
                <div key={i} className="text-center">
                  <div className="text-white text-lg">{pillar.gan}</div>
                  <div className="text-white text-lg">{pillar.zhi}</div>
                </div>
              ))}
            </div>
            <div className="text-white/60 text-xs text-center mt-3 flex flex-wrap justify-center gap-1">
              {(result.daYun || []).slice(0, 8).map((dy: { ganZhi: string }, i: number) => (
                <span key={i}>{dy.ganZhi}{i < 7 ? " - " : ""}</span>
              ))}
            </div>
          </div>

          {/* 命主反馈/师傅点评切换 */}
          <div className="flex justify-center py-4">
            <div className="flex bg-[#f5f5f5] rounded-full p-1">
              <button
                onClick={() => setNotesTab("feedback")}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  notesTab === "feedback" ? "bg-[#d4af37] text-white" : "text-[#666]"
                }`}
              >
                命主反馈
              </button>
              <button
                onClick={() => setNotesTab("review")}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  notesTab === "review" ? "bg-[#d4af37] text-white" : "text-[#666]"
                }`}
              >
                师傅点评
              </button>
            </div>
          </div>

          {/* 信息输入 */}
          <div className="flex-1 px-4 space-y-1">
            {[
              { label: "职业", hasArrow: true },
              { label: "学历", hasArrow: true },
              { label: "财富", hasArrow: true },
              { label: "婚姻", hasArrow: true },
              { label: "健康状态", placeholder: "请输入" },
              { label: "六亲状况", placeholder: "请输入" },
              { label: "性情描述", placeholder: "请输入" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#f0f0f0]">
                <span className="text-[#333]">{item.label}</span>
                {item.hasArrow ? (
                  <ChevronRight className="w-5 h-5 text-[#999]" />
                ) : (
                  <span className="text-[#999]">{item.placeholder}</span>
                )}
              </div>
            ))}

            {/* 关键事件反馈记录 */}
            <div className="pt-4">
              <div className="text-[#333] font-medium mb-3">关键事件反馈记录</div>
              <div className="flex items-center justify-between">
                <button className="w-12 h-12 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-[#d4af37]" />
                </button>
                <button className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg">
                  <Plus className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* 底部保存按钮 */}
          <div className="p-4 flex gap-3 bg-white border-t border-[#f0f0f0]">
            <button className="flex-1 py-4 bg-[#d4af37] text-white font-medium rounded-xl">
              保存
            </button>
            <button className="w-14 h-14 bg-[#f5f5f5] rounded-xl flex items-center justify-center">
              <span className="text-[#d4af37] text-2xl">◇</span>
            </button>
          </div>
        </div>
      )}

      {/* 底部操作栏 */}
      {(activeTab === "chart" || activeTab === "detail" || activeTab === "basic") && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#f0f0f0] px-4 py-3 flex gap-3 z-10">
          <button
            onClick={() => setShowResult(false)}
            className="flex-1 py-3 border border-[#d4af37] text-[#d4af37] rounded-xl font-medium"
          >
            返回
          </button>
          <button
            onClick={() => setShowResult(false)}
            className="flex-1 py-3 bg-[#d4af37] text-white rounded-xl font-medium"
          >
            重新排盘
          </button>
        </div>
      )}
    </div>
  )
}
