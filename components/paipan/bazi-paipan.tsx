"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, MoreHorizontal, Eye, Edit2, Sparkles, ChevronRight } from "lucide-react"

interface BaziPaipanProps {
  onBack: () => void
  onAIAnalysis?: () => void
}

// 天干
const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
// 地支
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
// 生肖
const SHENGXIAO = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
const SHENGXIAO_EMOJI: Record<string, string> = {
  "鼠": "🐀", "牛": "🐂", "虎": "🐅", "兔": "🐇", "龙": "🐉", "蛇": "🐍",
  "马": "🐴", "羊": "🐑", "猴": "🐒", "鸡": "🐓", "狗": "🐕", "猪": "🐷"
}
// 五行
const WUXING: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土", 己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水",
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火", 午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
}
// 五行颜色
const WUXING_COLOR: Record<string, string> = { 木: "#22c55e", 火: "#ef4444", 土: "#d4a574", 金: "#d4af37", 水: "#3b82f6" }
// 五行图标
const WUXING_ICON: Record<string, string> = { 木: "🌲", 火: "🔥", 土: "⛰️", 金: "🪙", 水: "💧" }
// 藏干表
const CANGGAN: Record<string, string[]> = {
  子: ["癸"], 丑: ["己", "癸", "辛"], 寅: ["甲", "丙", "戊"], 卯: ["乙"],
  辰: ["戊", "乙", "癸"], 巳: ["丙", "庚", "戊"], 午: ["丁", "己"], 未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"], 酉: ["辛"], 戌: ["戊", "辛", "丁"], 亥: ["壬", "甲"]
}
// 十神
const SHISHEN_MAP: Record<string, Record<string, string>> = {
  甲: { 甲: "比肩", 乙: "劫财", 丙: "食神", 丁: "伤官", 戊: "偏财", 己: "正财", 庚: "七杀", 辛: "正官", 壬: "偏印", 癸: "正印" },
  乙: { 甲: "劫财", 乙: "比肩", 丙: "伤官", 丁: "食神", 戊: "正财", 己: "偏财", 庚: "正官", 辛: "七杀", 壬: "正印", 癸: "偏印" },
  丙: { 甲: "偏印", 乙: "正印", 丙: "比肩", 丁: "劫财", 戊: "食神", 己: "伤官", 庚: "偏财", 辛: "正财", 壬: "七杀", 癸: "正官" },
  丁: { 甲: "正印", 乙: "偏印", 丙: "劫财", 丁: "比肩", 戊: "伤官", 己: "食神", 庚: "正财", 辛: "偏财", 壬: "正官", 癸: "七杀" },
  戊: { 甲: "七杀", 乙: "正官", 丙: "偏印", 丁: "正印", 戊: "比肩", 己: "劫财", 庚: "食神", 辛: "伤官", 壬: "偏财", 癸: "正财" },
  己: { 甲: "正官", 乙: "七杀", 丙: "正印", 丁: "偏印", 戊: "劫财", 己: "比肩", 庚: "伤官", 辛: "食神", 壬: "正财", 癸: "偏财" },
  庚: { 甲: "偏财", 乙: "正财", 丙: "七杀", 丁: "正官", 戊: "偏印", 己: "正印", 庚: "比肩", 辛: "劫财", 壬: "食神", 癸: "伤官" },
  辛: { 甲: "正财", 乙: "偏财", 丙: "正官", 丁: "七杀", 戊: "正印", 己: "偏印", 庚: "劫财", 辛: "比肩", 壬: "伤官", 癸: "食神" },
  壬: { 甲: "食神", 乙: "伤官", 丙: "偏财", 丁: "正财", 戊: "七杀", 己: "正官", 庚: "偏印", 辛: "正印", 壬: "比肩", 癸: "劫财" },
  癸: { 甲: "伤官", 乙: "食神", 丙: "正财", 丁: "偏财", 戊: "正官", 己: "七杀", 庚: "正印", 辛: "偏印", 壬: "劫财", 癸: "比肩" }
}
// 十二长生
const CHANGSHENG = ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"]
const CHANGSHENG_START: Record<string, number> = { 甲: 0, 丙: 2, 戊: 2, 庚: 8, 壬: 8, 乙: 6, 丁: 6, 己: 6, 辛: 2, 癸: 4 }
// 纳音
const NAYIN: Record<string, string> = {
  "甲子": "海中金", "乙丑": "海中金", "丙寅": "炉中火", "丁卯": "炉中火", "戊辰": "大林木", "己巳": "大林木",
  "庚午": "路旁土", "辛未": "路旁土", "壬申": "剑锋金", "癸酉": "剑锋金", "甲戌": "山头火", "乙亥": "山头火",
  "丙子": "涧下水", "丁丑": "涧下水", "戊寅": "城头土", "己卯": "城头土", "庚辰": "白蜡金", "辛巳": "白蜡金",
  "壬午": "杨柳木", "癸未": "杨柳木", "甲申": "泉中水", "乙酉": "泉中水", "丙戌": "屋上土", "丁亥": "屋上土",
  "戊子": "霹雳火", "己丑": "霹雳火", "庚寅": "松柏木", "辛卯": "松柏木", "壬辰": "长流水", "癸巳": "长流水",
  "甲午": "沙中金", "乙未": "沙中金", "丙申": "山下火", "丁酉": "山下火", "戊戌": "平地木", "己亥": "平地木",
  "庚子": "壁上土", "辛丑": "壁上土", "壬寅": "金箔金", "癸卯": "金箔金", "甲辰": "覆灯火", "乙巳": "覆灯火",
  "丙午": "天河水", "丁未": "天河水", "戊申": "大驿土", "己酉": "大驿土", "庚戌": "钗钏金", "辛亥": "钗钏金",
  "壬子": "桑拓木", "癸丑": "桑拓木", "甲寅": "大溪水", "乙卯": "大溪水", "丙辰": "沙中土", "丁巳": "沙中土",
  "戊午": "天上火", "己未": "天上火", "庚申": "石榴木", "辛酉": "石榴木", "壬戌": "大海水", "癸亥": "大海水"
}
// 空亡表（简化）
const getKongwang = (gan: string, zhi: string): string => {
  const ganIdx = TIANGAN.indexOf(gan)
  const zhiIdx = DIZHI.indexOf(zhi)
  const xunIdx = Math.floor((zhiIdx - ganIdx + 12) % 12 / 2) * 2
  const kongwangPairs = ["戌亥", "申酉", "午未", "辰巳", "寅卯", "子丑"]
  return kongwangPairs[Math.floor(ganIdx / 2)] || "戌亥"
}

// 时辰列表
const SHICHEN_LIST = [
  { value: 0, label: "子时", time: "23:00-01:00" },
  { value: 1, label: "丑时", time: "01:00-03:00" },
  { value: 2, label: "寅时", time: "03:00-05:00" },
  { value: 3, label: "卯时", time: "05:00-07:00" },
  { value: 4, label: "辰时", time: "07:00-09:00" },
  { value: 5, label: "巳时", time: "09:00-11:00" },
  { value: 6, label: "午时", time: "11:00-13:00" },
  { value: 7, label: "未时", time: "13:00-15:00" },
  { value: 8, label: "申时", time: "15:00-17:00" },
  { value: 9, label: "酉时", time: "17:00-19:00" },
  { value: 10, label: "戌时", time: "19:00-21:00" },
  { value: 11, label: "亥时", time: "21:00-23:00" },
]

interface BaziResult {
  year: { gan: string; zhi: string }
  month: { gan: string; zhi: string }
  day: { gan: string; zhi: string }
  hour: { gan: string; zhi: string }
}

export function BaziPaipan({ onBack, onAIAnalysis }: BaziPaipanProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "chart" | "detail" | "notes">("chart")
  const [birthYear, setBirthYear] = useState(1990)
  const [birthMonth, setBirthMonth] = useState(1)
  const [birthDay, setBirthDay] = useState(1)
  const [birthHour, setBirthHour] = useState(0)
  const [gender, setGender] = useState<"male" | "female">("male")
  const [isLunar, setIsLunar] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<BaziResult | null>(null)

  // 计算八字
  const calculateBazi = () => {
    // 年干支（简化计算）
    const yearGanIndex = (birthYear - 4) % 10
    const yearZhiIndex = (birthYear - 4) % 12
    
    // 月干支（简化计算）
    const monthZhiIndex = (birthMonth + 1) % 12
    const monthGanIndex = ((yearGanIndex % 5) * 2 + birthMonth - 1) % 10
    
    // 日干支（简化，实际需要查表）
    const baseDate = new Date(1900, 0, 1)
    const targetDate = new Date(birthYear, birthMonth - 1, birthDay)
    const daysDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
    const dayGanIndex = (daysDiff + 10) % 10
    const dayZhiIndex = (daysDiff + 12) % 12
    
    // 时干支
    const hourZhiIndex = birthHour
    const hourGanIndex = ((dayGanIndex % 5) * 2 + birthHour) % 10
    
    setResult({
      year: { gan: TIANGAN[yearGanIndex], zhi: DIZHI[yearZhiIndex] },
      month: { gan: TIANGAN[monthGanIndex], zhi: DIZHI[monthZhiIndex] },
      day: { gan: TIANGAN[dayGanIndex], zhi: DIZHI[dayZhiIndex] },
      hour: { gan: TIANGAN[hourGanIndex], zhi: DIZHI[hourZhiIndex] },
    })
    setShowResult(true)
  }

  // 获取十神
  const getShishen = (dayGan: string, targetGan: string) => {
    return SHISHEN_MAP[dayGan]?.[targetGan] || ""
  }

  // 获取十二长生
  const getChangsheng = (dayGan: string, zhi: string) => {
    const start = CHANGSHENG_START[dayGan] || 0
    const zhiIndex = DIZHI.indexOf(zhi)
    const isYang = TIANGAN.indexOf(dayGan) % 2 === 0
    const index = isYang ? (zhiIndex - start + 12) % 12 : (start - zhiIndex + 12) % 12
    return CHANGSHENG[index]
  }

  // 获取藏干十神
  const getCangganWithShishen = (dayGan: string, zhi: string) => {
    const cangganList = CANGGAN[zhi] || []
    return cangganList.map(cg => ({
      gan: cg,
      shishen: getShishen(dayGan, cg),
      wuxing: WUXING[cg]
    }))
  }

  // 获取生肖
  const getShengxiao = (zhi: string) => {
    const idx = DIZHI.indexOf(zhi)
    return SHENGXIAO[idx]
  }

  // 输入界面
  if (!showResult) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        {/* 头部 */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-[#333]">
          <button onClick={onBack} className="p-2 -ml-2 active:opacity-70">
            <ChevronLeft className="w-6 h-6 text-[#f5f5f7]" />
          </button>
          <h1 className="text-[#f5f5f7] text-lg font-medium">八字排盘</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 overflow-auto px-4 py-4">
          {/* 日历类型 */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setIsLunar(false)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${!isLunar ? "bg-[#d4af37] text-[#1a1a1a]" : "bg-[#252525] text-[#888] border border-[#444]"}`}
            >
              公历
            </button>
            <button
              onClick={() => setIsLunar(true)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${isLunar ? "bg-[#d4af37] text-[#1a1a1a]" : "bg-[#252525] text-[#888] border border-[#444]"}`}
            >
              农历
            </button>
          </div>

          {/* 年月日选择 */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="text-[#888] text-xs mb-1.5 block">年</label>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value))}
                className="w-full bg-[#252525] border border-[#444] rounded-xl px-3 py-3 text-[#f5f5f7] text-center"
              >
                {Array.from({ length: 100 }, (_, i) => 2024 - i).map(y => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#888] text-xs mb-1.5 block">月</label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(Number(e.target.value))}
                className="w-full bg-[#252525] border border-[#444] rounded-xl px-3 py-3 text-[#f5f5f7] text-center"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#888] text-xs mb-1.5 block">日</label>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(Number(e.target.value))}
                className="w-full bg-[#252525] border border-[#444] rounded-xl px-3 py-3 text-[#f5f5f7] text-center"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
          </div>

          {/* 时辰选择 */}
          <div className="mb-4">
            <label className="text-[#888] text-xs mb-1.5 block">时辰</label>
            <select
              value={birthHour}
              onChange={(e) => setBirthHour(Number(e.target.value))}
              className="w-full bg-[#252525] border border-[#444] rounded-xl px-4 py-3 text-[#f5f5f7]"
            >
              {SHICHEN_LIST.map((s) => (
                <option key={s.value} value={s.value}>{s.label} ({s.time})</option>
              ))}
            </select>
          </div>

          {/* 性别选择 */}
          <div className="mb-6">
            <label className="text-[#888] text-xs mb-1.5 block">性别</label>
            <div className="flex gap-3">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-3 rounded-xl text-center transition-colors ${gender === "male" ? "bg-[#3b82f6] text-white font-medium" : "bg-[#252525] text-[#888] border border-[#444]"}`}
              >
                乾造 (男)
              </button>
              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-3 rounded-xl text-center transition-colors ${gender === "female" ? "bg-[#ec4899] text-white font-medium" : "bg-[#252525] text-[#888] border border-[#444]"}`}
              >
                坤造 (女)
              </button>
            </div>
          </div>

          {/* 排盘按钮 */}
          <button
            onClick={calculateBazi}
            className="w-full bg-[#d4af37] text-[#1a1a1a] font-bold py-4 rounded-xl text-lg active:opacity-80"
          >
            立即排盘
          </button>

          <p className="text-[#666] text-xs text-center mt-4">
            命理分析仅供学术研究，不应作为人生重大决策依据
          </p>
        </div>
      </div>
    )
  }

  // 结果界面
  const dayGan = result!.day.gan
  const shengxiao = getShengxiao(result!.year.zhi)

  return (
    <div className="min-h-screen bg-[#f8f6f0] flex flex-col">
      {/* 头部 */}
      <header className="flex items-center justify-between px-4 py-3 bg-white">
        <button onClick={onBack} className="p-2 -ml-2 active:opacity-70">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-gray-800 text-lg font-medium">八字排盘</h1>
        <button className="p-2 -mr-2">
          <MoreHorizontal className="w-6 h-6 text-gray-400" />
        </button>
      </header>

      {/* Tab导航 */}
      <div className="flex bg-[#2a2520]">
        {[
          { id: "basic", label: "基本信息" },
          { id: "chart", label: "基本排盘" },
          { id: "detail", label: "专业细盘" },
          { id: "notes", label: "断事笔记" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-3 text-sm transition-colors ${
              activeTab === tab.id
                ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                : "text-[#a0a0a0]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 命主信息卡片 */}
      <div className="bg-[#2a2520] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#3a3530] flex items-center justify-center text-2xl border-2 border-[#d4af37]">
            {SHENGXIAO_EMOJI[shengxiao]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37] text-sm">命例</span>
              <span className="text-[#d4af37] text-xs px-2 py-0.5 bg-[#d4af37]/20 rounded">
                {gender === "male" ? "乾造" : "坤造"}
              </span>
            </div>
            <div className="text-white text-sm mt-1">
              农历：{birthYear}年{birthMonth}月{birthDay}日 {SHICHEN_LIST[birthHour].label}
            </div>
            <div className="text-[#a0a0a0] text-xs mt-0.5">
              阳历：{birthYear}年{String(birthMonth).padStart(2, "0")}月{String(birthDay).padStart(2, "0")}日
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-[#3a3530] flex items-center justify-center">
              <Eye className="w-4 h-4 text-[#a0a0a0]" />
            </button>
            <button 
              onClick={() => setShowResult(false)}
              className="w-8 h-8 rounded-full bg-[#3a3530] flex items-center justify-center"
            >
              <Edit2 className="w-4 h-4 text-[#a0a0a0]" />
            </button>
          </div>
        </div>
      </div>

      {/* 四柱表格 - 问真八字风格 */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full text-center text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-2.5 text-gray-500 font-normal w-14 text-xs">日期</th>
              <th className="py-2.5 text-gray-700 font-medium text-xs">年柱</th>
              <th className="py-2.5 text-gray-700 font-medium text-xs">月柱</th>
              <th className="py-2.5 text-gray-700 font-medium text-xs">日柱</th>
              <th className="py-2.5 text-gray-700 font-medium text-xs">时柱</th>
            </tr>
          </thead>
          <tbody>
            {/* 主星（十神） */}
            <tr className="border-b border-gray-100">
              <td className="py-2 text-gray-400 text-xs">主星</td>
              <td className="py-2 text-[#b8860b] text-xs">{getShishen(dayGan, result!.year.gan)}</td>
              <td className="py-2 text-[#b8860b] text-xs">{getShishen(dayGan, result!.month.gan)}</td>
              <td className="py-2 text-[#b8860b] text-xs">元{gender === "male" ? "男" : "女"}</td>
              <td className="py-2 text-[#b8860b] text-xs">{getShishen(dayGan, result!.hour.gan)}</td>
            </tr>
            {/* 天干 */}
            <tr className="border-b border-gray-100">
              <td className="py-3 text-gray-400 text-xs">天干</td>
              {[result!.year, result!.month, result!.day, result!.hour].map((pillar, i) => (
                <td key={i} className="py-3">
                  <span className="text-2xl font-semibold" style={{ color: WUXING_COLOR[WUXING[pillar.gan]] }}>
                    {pillar.gan}
                  </span>
                  <span className="ml-0.5 text-sm">{WUXING_ICON[WUXING[pillar.gan]]}</span>
                </td>
              ))}
            </tr>
            {/* 地支 */}
            <tr className="border-b border-gray-100">
              <td className="py-3 text-gray-400 text-xs">地支</td>
              {[result!.year, result!.month, result!.day, result!.hour].map((pillar, i) => (
                <td key={i} className="py-3">
                  <span className="text-2xl font-semibold" style={{ color: WUXING_COLOR[WUXING[pillar.zhi]] }}>
                    {pillar.zhi}
                  </span>
                  <span className="ml-0.5 text-sm">{WUXING_ICON[WUXING[pillar.zhi]]}</span>
                </td>
              ))}
            </tr>
            {/* 藏干 */}
            <tr className="border-b border-gray-100">
              <td className="py-2 text-gray-400 text-xs align-top pt-3">藏干</td>
              {[result!.year, result!.month, result!.day, result!.hour].map((pillar, i) => (
                <td key={i} className="py-2 align-top pt-2">
                  <div className="flex flex-col items-center gap-0.5">
                    {getCangganWithShishen(dayGan, pillar.zhi).map((cg, j) => (
                      <span key={j} style={{ color: WUXING_COLOR[cg.wuxing] }} className="text-xs">
                        {cg.gan}{cg.wuxing}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            {/* 副星 */}
            <tr className="border-b border-gray-100">
              <td className="py-2 text-gray-400 text-xs align-top pt-3">副星</td>
              {[result!.year, result!.month, result!.day, result!.hour].map((pillar, i) => (
                <td key={i} className="py-2 align-top pt-2">
                  <div className="flex flex-col items-center gap-0.5 text-xs text-gray-600">
                    {getCangganWithShishen(dayGan, pillar.zhi).map((cg, j) => (
                      <span key={j}>{cg.shishen}</span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            {/* 星运 */}
            <tr className="border-b border-gray-100">
              <td className="py-2 text-gray-400 text-xs">星运</td>
              {[result!.year, result!.month, result!.day, result!.hour].map((pillar, i) => (
                <td key={i} className="py-2 text-gray-600 text-xs">{getChangsheng(dayGan, pillar.zhi)}</td>
              ))}
            </tr>
            {/* 自坐 */}
            <tr className="border-b border-gray-100">
              <td className="py-2 text-gray-400 text-xs">自坐</td>
              {[result!.year, result!.month, result!.day, result!.hour].map((pillar, i) => (
                <td key={i} className="py-2 text-gray-600 text-xs">{getChangsheng(pillar.gan, pillar.zhi)}</td>
              ))}
            </tr>
            {/* 空亡 */}
            <tr className="border-b border-gray-100">
              <td className="py-2 text-gray-400 text-xs">空亡</td>
              {[result!.year, result!.month, result!.day, result!.hour].map((pillar, i) => (
                <td key={i} className="py-2 text-gray-600 text-xs">{getKongwang(pillar.gan, pillar.zhi)}</td>
              ))}
            </tr>
            {/* 纳音 */}
            <tr className="border-b border-gray-100">
              <td className="py-2 text-gray-400 text-xs">纳音</td>
              {[result!.year, result!.month, result!.day, result!.hour].map((pillar, i) => (
                <td key={i} className="py-2 text-gray-600 text-[10px]">{NAYIN[pillar.gan + pillar.zhi] || ""}</td>
              ))}
            </tr>
            {/* 神煞 */}
            <tr>
              <td className="py-2 text-gray-400 text-xs align-top pt-3">神煞</td>
              <td className="py-2 text-[#b8860b] text-[10px] align-top pt-2">
                <div className="flex flex-col gap-0.5">
                  <span>天乙贵人</span>
                  <span>德秀贵人</span>
                  <span>天德贵人</span>
                </div>
              </td>
              <td className="py-2 text-[#b8860b] text-[10px] align-top pt-2">
                <div className="flex flex-col gap-0.5">
                  <span>天乙贵人</span>
                  <span>福星贵人</span>
                  <span>德秀贵人</span>
                </div>
              </td>
              <td className="py-2 text-[#b8860b] text-[10px] align-top pt-2">
                <div className="flex flex-col gap-0.5">
                  <span>国印贵人</span>
                  <span>福星贵人</span>
                  <span>德秀贵人</span>
                  <span>红艳煞</span>
                </div>
              </td>
              <td className="py-2 text-[#b8860b] text-[10px] align-top pt-2">
                <div className="flex flex-col gap-0.5">
                  <span>天乙贵人</span>
                  <span>福星贵人</span>
                  <span>德秀贵人</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* AI分析入口 */}
        <div className="px-4 py-4 flex gap-3">
          <button className="flex-1 py-3 bg-gray-100 rounded-xl text-gray-700 text-sm flex items-center justify-center gap-2 active:bg-gray-200">
            智能干支图示
            <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={onAIAnalysis}
            className="flex-1 py-3 bg-[#d4af37]/10 border border-[#d4af37] rounded-xl text-[#b8860b] text-sm flex items-center justify-center gap-2 active:bg-[#d4af37]/20"
          >
            <Sparkles className="w-4 h-4" />
            AI指令
          </button>
        </div>

        {/* 原局分析 */}
        <div className="px-4 pb-4">
          <div className="text-[#b8860b] text-sm mb-2">原局天干：<span className="text-gray-700">无</span></div>
          <div className="text-[#b8860b] text-sm mb-2">原局地支：<span className="text-gray-700">子丑暗合 | 寅巳相刑</span></div>
          <div className="text-[#b8860b] text-sm">原局整柱：<span className="text-gray-700">戊子盖头 | 丙子截脚</span></div>
        </div>

        {/* 古籍参考 */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#d4af37] rounded-full" />
              <span className="text-gray-800 font-medium text-sm">智能古籍参考</span>
            </div>
            <span className="text-[10px] text-[#b8860b] bg-[#d4af37]/10 px-2 py-1 rounded">VIP会员</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {["穷通宝鉴", "滴天髓", "三命通会", "八字提要"].map((book) => (
              <div key={book} className="flex-shrink-0 w-16">
                <div className="w-16 h-20 bg-[#f5f0e5] rounded-lg flex items-center justify-center border border-[#d4af37]/30">
                  <span className="text-[#8b7355] text-xs font-medium" style={{ writingMode: "vertical-rl" }}>{book}</span>
                </div>
                <p className="text-[10px] text-gray-500 text-center mt-1">{book}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 调候用神提示 */}
        <div className="mx-4 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-xs">调候用神提示</span>
            <div className="flex gap-1">
              <span className="text-[#b8860b] text-sm">壬</span>
              <span className="text-[#b8860b] text-sm">戊</span>
              <span className="text-[#b8860b] text-sm">己</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-xs">本八字</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">透</span>
              <span className="w-6 h-6 bg-[#22c55e] rounded text-white text-xs flex items-center justify-center">己</span>
              <span className="text-xs text-gray-500">藏</span>
              <span className="w-6 h-6 bg-[#d4a574] rounded text-white text-xs flex items-center justify-center">戊</span>
              <span className="w-6 h-6 bg-[#d4a574] rounded text-white text-xs flex items-center justify-center">戊</span>
            </div>
          </div>
        </div>

        {/* 免责声明 */}
        <div className="px-4 py-3 bg-gray-50">
          <p className="text-gray-400 text-[10px] text-center">
            命理分析仅供学术研究参考，不应作为人生重大决策依据
          </p>
        </div>
      </div>
    </div>
  )
}
