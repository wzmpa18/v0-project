"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal, Eye, Pencil, Plus, X, Camera, Copy, Check, ChevronDown, Calendar } from "lucide-react"
import { 
  QIONG_TONG_BAO_JIAN, 
  DI_TIAN_SUI, 
  GUJI_MINGLI, 
  AI_PROMPT_TEMPLATES,
  CHENG_GU_DATA,
  analyzeGanZhiRelations 
} from "@/lib/bazi-guji-data"

// 五行颜色映射 - 匹配问真八字
const WUXING_COLOR: Record<string, string> = {
  "木": "#22c55e", "火": "#ef4444", "土": "#a16207", "金": "#ca8a04", "水": "#3b82f6",
}

// 天干五行
const TIAN_GAN_WUXING: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水",
}

// 地支五行
const DI_ZHI_WUXING: Record<string, string> = {
  "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水",
}

// 五行emoji
const WUXING_EMOJI: Record<string, string> = {
  "木": "🌲", "火": "🔥", "土": "⛰️", "金": "🪙", "水": "💧",
}

const getGanColor = (gan: string) => WUXING_COLOR[TIAN_GAN_WUXING[gan]] || "#333"
const getZhiColor = (zhi: string) => WUXING_COLOR[DI_ZHI_WUXING[zhi]] || "#333"
const getGanEmoji = (gan: string) => WUXING_EMOJI[TIAN_GAN_WUXING[gan]] || ""
const getZhiEmoji = (zhi: string) => WUXING_EMOJI[DI_ZHI_WUXING[zhi]] || ""

// 十神颜色
const getShiShenColor = (shiShen: string): string => {
  const colorMap: Record<string, string> = {
    "印": "#ef4444", "枭": "#ef4444", "偏印": "#ef4444",
    "杀": "#ef4444", "七杀": "#ef4444",
    "官": "#3b82f6", "正官": "#3b82f6",
    "财": "#ca8a04", "正财": "#ca8a04", "才": "#a16207", "偏财": "#a16207",
    "食": "#a16207", "食神": "#a16207",
    "伤": "#a16207", "伤官": "#a16207",
    "比": "#22c55e", "比肩": "#22c55e",
    "劫": "#ef4444", "劫财": "#ef4444",
  }
  return colorMap[shiShen] || "#666"
}

interface BaziResultProps {
  result: any
  onBack: () => void
}

export function BaziResult({ result, onBack }: BaziResultProps) {
  const [activeTab, setActiveTab] = useState<"info" | "basic" | "pro" | "notes">("basic")
  const [notesTab, setNotesTab] = useState<"feedback" | "comment">("feedback")
  const [wuxingTab, setWuxingTab] = useState<"count" | "canggan" | "shishen">("count")
  const [gujiTextTab, setGujiTextTab] = useState<"yuanwen" | "yiwen" | "duizhao">("yuanwen")
  const [showAiModal, setShowAiModal] = useState(false)
  const [aiCategory, setAiCategory] = useState("全项")
  const [copied, setCopied] = useState(false)
  
  // 断事笔记数据
  const [noteData, setNoteData] = useState({
    career: "",
    education: "",
    wealth: "",
    marriage: "",
    health: "",
    family: "",
    personality: "",
    intro: ""
  })

  // 四柱数据
  const siZhu = result?.siZhu || {
    year: { gan: "己", zhi: "巳", shiShen: "伤官", cangGan: ["丙", "庚", "戊"], naYin: "大林木" },
    month: { gan: "丙", zhi: "子", shiShen: "比肩", cangGan: ["癸"], naYin: "涧下水" },
    day: { gan: "丙", zhi: "寅", shiShen: "元男", cangGan: ["甲", "丙", "戊"], naYin: "炉中火" },
    hour: { gan: "戊", zhi: "子", shiShen: "食神", cangGan: ["癸"], naYin: "霹雳火" },
  }

  const dayGan = siZhu.day.gan
  const monthZhi = siZhu.month.zhi

  // 获取穷通宝鉴内容
  const qiongTongContent = QIONG_TONG_BAO_JIAN[dayGan]?.[monthZhi] || {
    yuanwen: "暂无此日主月支的穷通宝鉴论述。",
    yiwen: "暂无白话译文。"
  }

  // 获取滴天髓内容
  const diTianSuiContent = DI_TIAN_SUI[dayGan] || "暂无此日主的滴天髓论述。"

  // 分析干支关系
  const ganZhiRelations = analyzeGanZhiRelations({
    yearGan: siZhu.year.gan, yearZhi: siZhu.year.zhi,
    monthGan: siZhu.month.gan, monthZhi: siZhu.month.zhi,
    dayGan: siZhu.day.gan, dayZhi: siZhu.day.zhi,
    hourGan: siZhu.hour.gan, hourZhi: siZhu.hour.zhi
  })

  // 神煞数据
  const shenShaData = {
    year: ["天厨贵人", "德秀贵人", "天德贵人", "禄神", "亡神"],
    month: ["太极贵人", "月德合", "桃花", "天喜", "披麻"],
    day: ["阴差阳错", "天乙贵人", "德秀贵人", "元辰"],
    hour: ["太极贵人", "文昌贵人", "天厨贵人", "天乙贵人", "福星贵人", "空亡", "飞刃", "劫煞", "驿马", "词馆"]
  }

  // 大运数据
  const daYunData = result?.daYun || [
    { year: 1990, ageRange: "2~10岁", gan: "小", zhi: "运" },
    { year: 1998, ageRange: "10岁", gan: "乙", zhi: "亥", s1: "印", s2: "杀" },
    { year: 2008, ageRange: "20岁", gan: "甲", zhi: "戌", s1: "枭", s2: "食" },
    { year: 2018, ageRange: "30岁", gan: "癸", zhi: "酉", s1: "官", s2: "财", highlight: true },
    { year: 2028, ageRange: "40岁", gan: "壬", zhi: "申", s1: "杀", s2: "才" },
    { year: 2038, ageRange: "50岁", gan: "辛", zhi: "未", s1: "财", s2: "伤" },
    { year: 2048, ageRange: "60岁", gan: "庚", zhi: "午", s1: "才", s2: "劫" },
    { year: 2058, ageRange: "70岁", gan: "己", zhi: "巳", s1: "伤", s2: "比" },
    { year: 2068, ageRange: "80岁", gan: "戊", zhi: "辰", s1: "食", s2: "食" },
    { year: 2078, ageRange: "90岁", gan: "丁", zhi: "卯", s1: "劫", s2: "印" },
  ]

  // 流年数据
  const liuNianData = [
    { year: 2018, gan: "戊", zhi: "戌", s1: "食", s2: "食", xiaoYun: "己未" },
    { year: 2019, gan: "己", zhi: "亥", s1: "伤", s2: "杀", xiaoYun: "戊午" },
    { year: 2020, gan: "庚", zhi: "子", s1: "才", s2: "官", xiaoYun: "丁巳" },
    { year: 2021, gan: "辛", zhi: "丑", s1: "财", s2: "伤", xiaoYun: "丙辰" },
    { year: 2022, gan: "壬", zhi: "寅", s1: "杀", s2: "枭", xiaoYun: "乙卯" },
    { year: 2023, gan: "癸", zhi: "卯", s1: "官", s2: "印", xiaoYun: "甲寅" },
    { year: 2024, gan: "甲", zhi: "辰", s1: "枭", s2: "食", xiaoYun: "癸丑" },
    { year: 2025, gan: "乙", zhi: "巳", s1: "印", s2: "比", xiaoYun: "王子" },
    { year: 2026, gan: "丙", zhi: "午", s1: "比", s2: "劫", xiaoYun: "辛亥", highlight: true },
    { year: 2027, gan: "丁", zhi: "未", s1: "劫", s2: "伤", xiaoYun: "庚戌" },
  ]

  // 流月数据
  const liuYueData = [
    { name: "立春", date: "2/4", gan: "庚", zhi: "寅", s1: "才", s2: "枭" },
    { name: "惊蛰", date: "3/5", gan: "辛", zhi: "卯", s1: "财", s2: "印" },
    { name: "清明", date: "4/5", gan: "壬", zhi: "辰", s1: "杀", s2: "食" },
    { name: "立夏", date: "5/5", gan: "癸", zhi: "巳", s1: "官", s2: "比" },
    { name: "芒种", date: "6/5", gan: "甲", zhi: "午", s1: "枭", s2: "劫" },
    { name: "小暑", date: "7/7", gan: "乙", zhi: "未", s1: "印", s2: "伤" },
    { name: "立秋", date: "8/7", gan: "丙", zhi: "申", s1: "比", s2: "才" },
    { name: "白露", date: "9/7", gan: "丁", zhi: "酉", s1: "劫", s2: "财" },
    { name: "寒露", date: "10/8", gan: "戊", zhi: "戌", s1: "食", s2: "食" },
    { name: "立冬", date: "11/7", gan: "己", zhi: "亥", s1: "伤", s2: "杀" },
  ]

  // 五行统计 - 基于真实八字计算
  const calculateWuxingCount = () => {
    const count = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 }
    
    // 统计天干五行
    const gans = [siZhu.year.gan, siZhu.month.gan, siZhu.day.gan, siZhu.hour.gan]
    gans.forEach(gan => {
      const wx = TIAN_GAN_WUXING[gan]
      if (wx) count[wx as keyof typeof count]++
    })
    
    // 统计地支五行
    const zhis = [siZhu.year.zhi, siZhu.month.zhi, siZhu.day.zhi, siZhu.hour.zhi]
    zhis.forEach(zhi => {
      const wx = DI_ZHI_WUXING[zhi]
      if (wx) count[wx as keyof typeof count]++
    })
    
    return count
  }
  
  // 含藏干统计
  const calculateCangGanCount = () => {
    const count = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 }
    const allCangGan = [
      ...(siZhu.year.cangGan || []),
      ...(siZhu.month.cangGan || []),
      ...(siZhu.day.cangGan || []),
      ...(siZhu.hour.cangGan || [])
    ]
    allCangGan.forEach(gan => {
      const wx = TIAN_GAN_WUXING[gan]
      if (wx) count[wx as keyof typeof count]++
    })
    return count
  }
  
  // 十神统计
  const shishenCount = {
    "比劫": 1, "财才": 1, "食伤": 5, "官杀": 2, "印枭": 0
  }
  
  const wuxingCount = calculateWuxingCount()
  const cangGanCount = calculateCangGanCount()
  const totalCount = Object.values(wuxingCount).reduce((a, b) => a + b, 0)
  
  // 计算同党异党比例
  const dayGanWuxing = TIAN_GAN_WUXING[dayGan]
  const tongDangWuxing = dayGanWuxing === "木" ? ["木", "水"] :
    dayGanWuxing === "火" ? ["火", "木"] :
    dayGanWuxing === "土" ? ["土", "火"] :
    dayGanWuxing === "金" ? ["金", "土"] :
    ["水", "金"]
  
  const tongDangCount = tongDangWuxing.reduce((sum, wx) => sum + wuxingCount[wx as keyof typeof wuxingCount], 0)
  const yiDangCount = totalCount - tongDangCount
  const tongDang = Math.round((tongDangCount / totalCount) * 100 * 10) / 10
  const yiDang = Math.round((yiDangCount / totalCount) * 100 * 10) / 10

  // 称骨数据
  const chengGuWeight = "四两九钱"
  const chengGuData = CHENG_GU_DATA["四两九"] || { weight: chengGuWeight, verse: "此命推来福不轻，自成自立显门庭，从来富贵人钦敬，使婢差奴过一生。" }

  // 复制AI指令
  const copyAiPrompt = () => {
    const baziStr = `${siZhu.year.gan}${siZhu.year.zhi} ${siZhu.month.gan}${siZhu.month.zhi} ${siZhu.day.gan}${siZhu.day.zhi} ${siZhu.hour.gan}${siZhu.hour.zhi}`
    const template = AI_PROMPT_TEMPLATES[aiCategory]
    const prompt = template
      .replace("{bazi}", baziStr)
      .replace("{gender}", result?.gender === "male" ? "男" : "女")
      .replace("{datetime}", result?.solarDate || "")
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 古籍书籍数据 - 扩展完整
  const gujiBooks = [
    { name: "穷通宝鉴", icon: "穷通\n宝鉴", id: "qiongtong" },
    { name: "滴天髓", icon: "滴天\n髓", id: "ditianshui" },
    { name: "三命通会", icon: "三命\n通会", id: "sanming" },
    { name: "八字提要", icon: "八字\n提要", id: "bazitiyao" },
    { name: "渊海子平", icon: "渊海\n子平", id: "yuanhai" },
    { name: "神峰通考", icon: "神峰\n通考", id: "shenfeng" },
    { name: "子平真诠", icon: "子平\n真诠", id: "zipingzhenquan" },
    { name: "命理约言", icon: "命理\n约言", id: "mingliyu" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-medium">问真八字</h1>
        <button className="p-1">
          <MoreHorizontal className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Tab导航 - 绿色高亮 */}
      <div className="flex bg-[#4a9d5b] text-white">
        {[
          { id: "info", label: "基本信息" },
          { id: "basic", label: "基本排盘" },
          { id: "pro", label: "专业细盘" },
          { id: "notes", label: "断事笔记" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "text-white" : "text-white/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 基本信息Tab */}
      {activeTab === "info" && (
        <div className="pb-20">
          {/* 头部信息卡片 */}
          <div className="bg-[#1a1a1a] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                  <span className="text-2xl">🐍</span>
                </div>
                <div>
                  <div className="text-[#f5f5f7] font-medium">{result?.name || "案例4"}</div>
                  <button className="text-xs text-[#d4af37] border border-[#d4af37]/50 px-2 py-0.5 rounded mt-1">
                    请编辑名称
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#f5f5f7]/80 text-sm">生肖：蛇</div>
                <div className="text-[#f5f5f7]/80 text-sm">{result?.age || 38}岁 {result?.gender === "male" ? "男" : "女"}</div>
              </div>
            </div>
          </div>

          {/* 详细信息列表 */}
          <div className="divide-y divide-gray-100">
            <InfoRow label="农历" value={result?.lunarDate || "1989年腊月初五 子时 (阴 乾造)"} labelColor="#a16207" />
            <InfoRow label="阳历" value={result?.solarDate || "1990-01-01 00:00"} />
            <InfoRow label="真太阳时" value="1990-01-01 00:00" />
            <InfoRow label="出生地区" value="未知地（真太阳时默认为北京时间）" labelColor="#a16207" />
            <InfoRow label="人元司令分野" value="癸水用事" labelColor="#a16207" />
            <InfoRow label="出生节气" value={<>出生于大雪后<span className="text-[#22c55e]">24</span>天12小时，小寒前<span className="text-[#22c55e]">4</span>天22小时</>} labelColor="#a16207" />
            <div className="flex px-4 py-3">
              <div className="w-1/2">
                <span className="text-gray-700 text-sm">大雪：</span>
                <span className="text-gray-800 text-sm">1989-12-07 11:20:57</span>
              </div>
              <div className="w-1/2">
                <span className="text-gray-700 text-sm">小寒：</span>
                <span className="text-gray-800 text-sm">1990-01-05 22:33:14</span>
              </div>
            </div>
            <div className="flex px-4 py-3">
              <div className="w-1/2">
                <span className="text-gray-700 text-sm">星座：</span>
                <span className="text-gray-800 text-sm">摩羯座 (Capricorn)</span>
              </div>
              <div className="w-1/2">
                <span className="text-gray-700 text-sm">星宿：</span>
                <span className="text-gray-800 text-sm">心宿东方苍龙</span>
              </div>
            </div>
            <div className="flex px-4 py-3">
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">胎元：</span>
                <span className="text-gray-800 text-sm">丁卯 (炉中火)</span>
              </div>
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">空亡：</span>
                <span className="text-gray-800 text-sm">戌亥 戌亥</span>
              </div>
            </div>
            <div className="flex px-4 py-3">
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">命宫：</span>
                <span className="text-gray-800 text-sm">己巳 (大林木)</span>
              </div>
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">胎息：</span>
                <span className="text-gray-800 text-sm">辛亥 (钗钏金)</span>
              </div>
            </div>
            <div className="flex px-4 py-3">
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">身宫：</span>
                <span className="text-gray-800 text-sm">丁丑 (涧下水)</span>
              </div>
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">命卦：</span>
                <span className="text-gray-800 text-sm">坤卦 (西四命)</span>
              </div>
            </div>
          </div>

          {/* 小真智能系统 */}
          <div className="bg-gray-50 py-2 px-4 flex items-center justify-center gap-2 text-gray-700 text-sm">
            <span>🤖</span>
            <span>小真智能系统</span>
          </div>

          {/* 日主属性 */}
          <div className="px-4 py-3 flex">
            <div className="w-1/2">
              <span className="text-gray-700 text-sm">日主属性：</span>
              <span className="text-[#ef4444] text-sm">丙火</span>
            </div>
            <div className="w-1/2">
              <span className="text-gray-700 text-sm">阴阳参考：</span>
              <span className="text-gray-600 text-sm">🔒</span>
            </div>
          </div>
          <div className="px-4 py-3 flex">
            <div className="w-1/2">
              <span className="text-gray-700 text-sm">旺衰参考：</span>
              <span className="text-gray-600 text-sm">🔒</span>
            </div>
            <div className="w-1/2">
              <span className="text-gray-700 text-sm">格局参考：</span>
              <span className="text-gray-600 text-sm">🔒</span>
            </div>
          </div>

          {/* 同党异党进度条 */}
          <div className="px-4 py-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">同党</span>
              <div className="flex-1 flex h-6 rounded overflow-hidden">
                <div className="bg-[#d4af37] flex items-center justify-center text-white text-xs" style={{ width: `${tongDang}%` }}>
                  {tongDang}%
                </div>
                <div className="bg-[#3b82f6] flex items-center justify-center text-white text-xs" style={{ width: `${yiDang}%` }}>
                  {yiDang}%
                </div>
              </div>
              <span className="text-sm">异党</span>
              <button className="w-8 h-8 rounded bg-[#d4af37]/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>
          </div>

          {/* 五行统计Tab */}
          <div className="px-4">
            <div className="flex border rounded-full overflow-hidden">
              {[
                { id: "count", label: "五行个数" },
                { id: "canggan", label: "含藏干数" },
                { id: "shishen", label: "十神个数" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setWuxingTab(tab.id as any)}
                  className={`flex-1 py-2 text-sm ${
                    wuxingTab === tab.id 
                      ? "bg-white text-gray-800 font-medium" 
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 五行统计内容 */}
          <div className="px-4 py-4 flex">
            <div className="w-1/2 space-y-2">
              {Object.entries(wuxingCount).map(([wx, count]) => (
                <div key={wx} className="flex items-center gap-2">
                  <span className="w-6 text-gray-800 font-medium">{wx}</span>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: WUXING_COLOR[wx] }} />
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${(count / 10) * 100}%`,
                        backgroundColor: WUXING_COLOR[wx]
                      }} 
                    />
                  </div>
                  <span className="text-sm w-12 text-gray-800">{count}个</span>
                  <span className="text-sm text-gray-700">比劫</span>
                </div>
              ))}
            </div>
            <div className="w-1/2 flex items-center justify-center">
              {/* 简化的饼图 */}
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="#3b82f6" />
                  <path d="M50,50 L50,10 A40,40 0 0,1 85,65 Z" fill="#ef4444" />
                  <path d="M50,50 L85,65 A40,40 0 0,1 50,90 Z" fill="#22c55e" />
                </svg>
                <div className="absolute top-0 right-0 text-xs text-[#ef4444]">27.66%</div>
                <div className="absolute bottom-0 right-0 text-xs text-[#22c55e]">3.83%</div>
                <div className="absolute bottom-0 left-0 text-xs text-[#3b82f6]">68.51%</div>
              </div>
            </div>
          </div>

          {/* 旺衰状态 */}
          <div className="px-4 py-2 flex justify-around text-sm text-gray-800 font-medium">
            <span>水旺</span>
            <span>木相</span>
            <span>金休</span>
            <span>土囚</span>
            <span>火死</span>
          </div>

          {/* 袁天罡称骨 */}
          <div className="mx-4 mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">⬡</span>
                <span className="font-medium">袁天罡称骨</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">重量:</span>
                <span className="font-medium">{chengGuWeight}</span>
              </div>
            </div>
            <div className="text-sm text-gray-800">
              <p className="mb-1 font-medium">歌诀</p>
              <p className="whitespace-pre-line">{chengGuData.verse}</p>
            </div>
          </div>
        </div>
      )}

      {/* 基本排盘Tab */}
      {activeTab === "basic" && (
        <div className="pb-20">
          {/* 头部信息 */}
          <div className="bg-[#1a1a1a] p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                <span className="text-2xl">🐍</span>
              </div>
              <div className="flex-1">
                <div className="text-[#f5f5f7] font-medium">{result?.name || "案例4"}</div>
                <div className="text-[#f5f5f7]/60 text-sm">农历：1989年腊月初五 子时 乾造</div>
                <div className="text-[#f5f5f7]/60 text-sm">阳历：1990年01月01日 00:00</div>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center">
                  <Eye className="w-4 h-4 text-[#d4af37]" />
                </button>
                <button className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center">
                  <Pencil className="w-4 h-4 text-[#d4af37]" />
                </button>
              </div>
            </div>
          </div>

          {/* 排盘表格 */}
          <div className="overflow-x-auto">
            <table className="w-full text-center text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="py-2 px-2 border-b font-normal">日期</th>
                  <th className="py-2 px-2 border-b font-normal">年柱</th>
                  <th className="py-2 px-2 border-b font-normal">月柱</th>
                  <th className="py-2 px-2 border-b font-normal">日柱</th>
                  <th className="py-2 px-2 border-b font-normal">时柱</th>
                </tr>
              </thead>
              <tbody>
                {/* 主星 */}
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">主星</td>
                  <td className="py-2">{siZhu.year.shiShen || "伤官"}</td>
                  <td className="py-2">{siZhu.month.shiShen || "比肩"}</td>
                  <td className="py-2">元男</td>
                  <td className="py-2">{siZhu.hour.shiShen || "食神"}</td>
                </tr>
                {/* 天干 */}
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">天干</td>
                  <td className="py-3">
                    <span className="text-2xl font-bold" style={{ color: getGanColor(siZhu.year.gan) }}>
                      {siZhu.year.gan}
                    </span>
                    <span className="ml-1">{getGanEmoji(siZhu.year.gan)}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-2xl font-bold" style={{ color: getGanColor(siZhu.month.gan) }}>
                      {siZhu.month.gan}
                    </span>
                    <span className="ml-1">{getGanEmoji(siZhu.month.gan)}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-2xl font-bold" style={{ color: getGanColor(siZhu.day.gan) }}>
                      {siZhu.day.gan}
                    </span>
                    <span className="ml-1">{getGanEmoji(siZhu.day.gan)}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-2xl font-bold" style={{ color: getGanColor(siZhu.hour.gan) }}>
                      {siZhu.hour.gan}
                    </span>
                    <span className="ml-1">{getGanEmoji(siZhu.hour.gan)}</span>
                  </td>
                </tr>
                {/* 地支 */}
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">地支</td>
                  <td className="py-3">
                    <span className="text-2xl font-bold" style={{ color: getZhiColor(siZhu.year.zhi) }}>
                      {siZhu.year.zhi}
                    </span>
                    <span className="ml-1">{getZhiEmoji(siZhu.year.zhi)}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-2xl font-bold" style={{ color: getZhiColor(siZhu.month.zhi) }}>
                      {siZhu.month.zhi}
                    </span>
                    <span className="ml-1">{getZhiEmoji(siZhu.month.zhi)}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-2xl font-bold" style={{ color: getZhiColor(siZhu.day.zhi) }}>
                      {siZhu.day.zhi}
                    </span>
                    <span className="ml-1">{getZhiEmoji(siZhu.day.zhi)}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-2xl font-bold" style={{ color: getZhiColor(siZhu.hour.zhi) }}>
                      {siZhu.hour.zhi}
                    </span>
                    <span className="ml-1">{getZhiEmoji(siZhu.hour.zhi)}</span>
                  </td>
                </tr>
                {/* 藏干 */}
                <tr className="border-b">
                  <td className="py-2 text-[#a16207] align-top">
                    <div>藏干</div>
                    <div className="mt-1">⭐</div>
                  </td>
                  <td className="py-2 align-top">
                    <div className="space-y-0.5 text-xs">
                      <div><span style={{ color: WUXING_COLOR["火"] }}>丙</span>火</div>
                      <div><span style={{ color: WUXING_COLOR["金"] }}>庚</span>金</div>
                      <div><span style={{ color: WUXING_COLOR["土"] }}>戊</span>土</div>
                    </div>
                  </td>
                  <td className="py-2 align-top">
                    <div className="text-xs">
                      <div><span style={{ color: WUXING_COLOR["水"] }}>癸</span>水</div>
                    </div>
                  </td>
                  <td className="py-2 align-top">
                    <div className="space-y-0.5 text-xs">
                      <div><span style={{ color: WUXING_COLOR["木"] }}>甲</span>木</div>
                      <div><span style={{ color: WUXING_COLOR["火"] }}>丙</span>火</div>
                      <div><span style={{ color: WUXING_COLOR["土"] }}>戊</span>土</div>
                    </div>
                  </td>
                  <td className="py-2 align-top">
                    <div className="text-xs">
                      <div><span style={{ color: WUXING_COLOR["水"] }}>癸</span>水</div>
                    </div>
                  </td>
                </tr>
                {/* 副星 */}
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">副星</td>
                  <td className="py-2 text-xs">
                    <div>比肩</div>
                    <div>偏财</div>
                    <div>食神</div>
                  </td>
                  <td className="py-2 text-xs">
                    <div>正官</div>
                  </td>
                  <td className="py-2 text-xs">
                    <div>偏印</div>
                    <div>比肩</div>
                    <div>食神</div>
                  </td>
                  <td className="py-2 text-xs">
                    <div>正官</div>
                  </td>
                </tr>
                {/* 星运 */}
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">星运</td>
                  <td className="py-2 text-gray-800">临官</td>
                  <td className="py-2 text-gray-800">胎</td>
                  <td className="py-2 text-gray-800">长生</td>
                  <td className="py-2 text-gray-800">胎</td>
                </tr>
                {/* 自坐 */}
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">自坐</td>
                  <td className="py-2 text-gray-800">帝旺</td>
                  <td className="py-2 text-gray-800">胎</td>
                  <td className="py-2 text-gray-800">长生</td>
                  <td className="py-2 text-gray-800">胎</td>
                </tr>
                {/* 空亡 */}
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">空亡</td>
                  <td className="py-2 text-gray-800">戌亥</td>
                  <td className="py-2 text-gray-800">申酉</td>
                  <td className="py-2 text-gray-800">戌亥</td>
                  <td className="py-2 text-gray-800">午未</td>
                </tr>
                {/* 纳音 */}
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">纳音</td>
                  <td className="py-2 text-gray-800">{siZhu.year.naYin || "大林木"}</td>
                  <td className="py-2 text-gray-800">{siZhu.month.naYin || "涧下水"}</td>
                  <td className="py-2 text-gray-800">{siZhu.day.naYin || "炉中火"}</td>
                  <td className="py-2 text-gray-800">{siZhu.hour.naYin || "霹雳火"}</td>
                </tr>
                {/* 神煞 */}
                <tr>
                  <td className="py-2 text-[#a16207] align-top">神煞</td>
                  <td className="py-2 align-top">
                    <div className="space-y-0.5 text-xs text-[#a16207]">
                      {shenShaData.year.slice(0, 5).map((ss, i) => (
                        <div key={i}>{ss}</div>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 align-top">
                    <div className="space-y-0.5 text-xs text-[#a16207]">
                      {shenShaData.month.slice(0, 6).map((ss, i) => (
                        <div key={i}>{ss}</div>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 align-top">
                    <div className="space-y-0.5 text-xs text-[#a16207]">
                      {shenShaData.day.slice(0, 4).map((ss, i) => (
                        <div key={i}>{ss}</div>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 align-top">
                    <div className="space-y-0.5 text-xs text-[#a16207]">
                      {shenShaData.hour.map((ss, i) => (
                        <div key={i}>{ss}</div>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 智能干支图示 / AI指令 */}
          <div className="px-4 py-4 flex gap-3">
            <button className="flex-1 py-3 border rounded-lg text-gray-700 flex items-center justify-center gap-1">
              智能干支图示 <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowAiModal(true)}
              className="px-6 py-3 border rounded-lg text-gray-700 flex items-center justify-center gap-1"
            >
              AI指令 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 原局分析 */}
          <div className="px-4 space-y-2 text-sm">
            <div className="flex">
              <span className="text-[#a16207] w-20">原局天干：</span>
              <span>{ganZhiRelations.tianGan.length > 0 ? ganZhiRelations.tianGan.join(" | ") : "无特殊关系"}</span>
            </div>
            <div className="flex">
              <span className="text-[#a16207] w-20">原局地支：</span>
              <span>{ganZhiRelations.diZhi.length > 0 ? ganZhiRelations.diZhi.join(" | ") : "无特殊关系"}</span>
            </div>
            <div className="flex">
              <span className="text-[#a16207] w-20">原局整柱：</span>
              <span>{ganZhiRelations.zhengZhu.length > 0 ? ganZhiRelations.zhengZhu.join(" | ") : "无特殊组合"}</span>
            </div>
          </div>

          {/* 智能古籍参考 */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-[#d4af37]" />
                <span className="font-medium">智能古籍参考</span>
              </div>
              <span className="text-xs px-2 py-0.5 bg-[#d4af37]/20 text-[#d4af37] rounded">VIP会员</span>
            </div>

            {/* 古籍书籍轮播 */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {gujiBooks.map((book) => (
                <div key={book.name} className="flex-shrink-0 w-20 text-center">
                  <div className="w-16 h-20 mx-auto bg-[#3b4f6b] rounded flex items-center justify-center text-white text-xs whitespace-pre-line border border-[#5a6f8b]">
                    {book.icon}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">{book.name}</div>
                </div>
              ))}
            </div>

            {/* 调候用神提示 */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm">调候用神提示</span>
                  <span className="text-gray-600 text-xs">?</span>
                </div>
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <span>庚</span>
                  <span>甲</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">本八字</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">透</span>
                  <span className="px-2 py-0.5 bg-[#d4af37] text-white text-sm rounded">庚</span>
                  <span className="text-sm">藏</span>
                  <span className="px-2 py-0.5 bg-[#d4af37] text-white text-sm rounded">甲</span>
                </div>
              </div>
            </div>
          </div>

          {/* 论X生Y月 */}
          <div className="px-4 py-4">
            <div className="text-[#a16207] font-medium mb-3 border-b-2 border-[#d4af37] inline-block pb-1">
              论{dayGan}生{monthZhi}月
            </div>

            {/* 原文/译文/对照Tab */}
            <div className="flex gap-2 mb-4">
              {[
                { id: "yuanwen", label: "原文" },
                { id: "yiwen", label: "译文" },
                { id: "duizhao", label: "对照" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setGujiTextTab(tab.id as any)}
                  className={`px-4 py-1.5 rounded-full text-sm ${
                    gujiTextTab === tab.id 
                      ? "bg-[#d4af37] text-white" 
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 古籍内容 */}
            <div className="text-sm leading-relaxed text-gray-700">
              {gujiTextTab === "yuanwen" && (
                <p className="whitespace-pre-line">{qiongTongContent.yuanwen}</p>
              )}
              {gujiTextTab === "yiwen" && (
                <p className="whitespace-pre-line">{qiongTongContent.yiwen}</p>
              )}
              {gujiTextTab === "duizhao" && (
                <div className="space-y-4">
                  <div>
                    <div className="text-[#a16207] mb-1">【原文】</div>
                    <p>{qiongTongContent.yuanwen}</p>
                  </div>
                  <div>
                    <div className="text-[#a16207] mb-1">【译文】</div>
                    <p>{qiongTongContent.yiwen}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 古籍命例 */}
          <div className="px-4 py-4">
            <div className="text-[#a16207] font-medium mb-3">古籍命例参考</div>
            <div className="space-y-4">
              {GUJI_MINGLI.slice(0, 3).map((ml, i) => (
                <div key={i} className="text-sm">
                  <div className="text-[#a16207] mb-1">{ml.bazi} ♀</div>
                  <p className="text-gray-600 leading-relaxed">{ml.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 专业细盘Tab */}
      {activeTab === "pro" && (
        <div className="pb-20">
          {/* 简化版专业细盘表格 - 和图片一致 */}
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="py-2 px-1 border-b font-normal">日期</th>
                  <th className="py-2 px-1 border-b font-normal">流年</th>
                  <th className="py-2 px-1 border-b font-normal">大运</th>
                  <th className="py-2 px-1 border-b font-normal">年柱</th>
                  <th className="py-2 px-1 border-b font-normal">月柱</th>
                  <th className="py-2 px-1 border-b font-normal">日柱</th>
                  <th className="py-2 px-1 border-b font-normal">时柱</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-1 text-[#a16207]">主星</td>
                  <td className="py-1">比肩</td>
                  <td className="py-1">正官</td>
                  <td className="py-1">伤官</td>
                  <td className="py-1">比肩</td>
                  <td className="py-1">元男</td>
                  <td className="py-1">食神</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1 text-[#a16207]">天干</td>
                  <td className="py-2"><span className="text-xl font-bold text-[#ef4444]">丙</span></td>
                  <td className="py-2"><span className="text-xl font-bold text-[#3b82f6]">癸</span></td>
                  <td className="py-2"><span className="text-xl font-bold text-[#a16207]">己</span></td>
                  <td className="py-2"><span className="text-xl font-bold text-[#ef4444]">丙</span></td>
                  <td className="py-2"><span className="text-xl font-bold text-[#ef4444]">丙</span></td>
                  <td className="py-2"><span className="text-xl font-bold text-[#a16207]">戊</span></td>
                </tr>
                <tr className="border-b">
                  <td className="py-1 text-[#a16207]">地支</td>
                  <td className="py-2"><span className="text-xl font-bold text-[#ef4444]">午</span></td>
                  <td className="py-2"><span className="text-xl font-bold text-[#ca8a04]">酉</span></td>
                  <td className="py-2"><span className="text-xl font-bold text-[#ef4444]">巳</span></td>
                  <td className="py-2"><span className="text-xl font-bold text-[#3b82f6]">子</span></td>
                  <td className="py-2"><span className="text-xl font-bold text-[#22c55e]">寅</span></td>
                  <td className="py-2"><span className="text-xl font-bold text-[#3b82f6]">子</span></td>
                </tr>
                <tr className="border-b">
                  <td className="py-1 text-[#a16207] align-top">藏干<br/><span className="text-gray-600">⭐</span></td>
                  <td className="py-1 align-top text-xs"><span className="text-[#ef4444]">丁</span>劫财<br/><span className="text-[#a16207]">己</span>伤官</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#ca8a04]">辛</span>正财</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#ef4444]">丙</span>比肩<br/><span className="text-[#ca8a04]">庚</span>偏财<br/><span className="text-[#a16207]">戊</span>食神</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#3b82f6]">癸</span>正官</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#22c55e]">甲</span>偏印<br/><span className="text-[#ef4444]">丙</span>比肩<br/><span className="text-[#a16207]">戊</span>食神</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#3b82f6]">癸</span>正官</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1 text-[#a16207]">星运</td>
                  <td className="py-1 text-gray-800">帝旺</td>
                  <td className="py-1 text-gray-800">死</td>
                  <td className="py-1 text-gray-800">临官</td>
                  <td className="py-1 text-gray-800">胎</td>
                  <td className="py-1 text-gray-800">长生</td>
                  <td className="py-1 text-gray-800">胎</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1 text-[#a16207]">自坐</td>
                  <td className="py-1 text-gray-800">帝旺</td>
                  <td className="py-1 text-gray-800">病</td>
                  <td className="py-1 text-gray-800">帝旺</td>
                  <td className="py-1 text-gray-800">胎</td>
                  <td className="py-1 text-gray-800">长生</td>
                  <td className="py-1 text-gray-800">胎</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1 text-[#a16207]">空亡</td>
                  <td className="py-1 text-gray-800">寅卯</td>
                  <td className="py-1 text-gray-800">戌亥</td>
                  <td className="py-1 text-gray-800">戌亥</td>
                  <td className="py-1 text-gray-800">申酉</td>
                  <td className="py-1 text-gray-800">戌亥</td>
                  <td className="py-1 text-gray-800">午未</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1 text-[#a16207]">纳音</td>
                  <td className="py-1 text-gray-800">天河水</td>
                  <td className="py-1 text-gray-800">剑锋金</td>
                  <td className="py-1 text-gray-800">大林木</td>
                  <td className="py-1 text-gray-800">涧下水</td>
                  <td className="py-1 text-gray-800">炉中火</td>
                  <td className="py-1 text-gray-800">霹雳火</td>
                </tr>
                <tr>
                  <td className="py-1 text-[#a16207] align-top">神煞 ▼</td>
                  <td className="py-1 text-[#a16207] align-top text-xs">德秀贵人</td>
                  <td className="py-1 text-[#a16207] align-top text-xs">文昌贵人</td>
                  <td className="py-1 text-[#a16207] align-top text-xs">天厨贵人</td>
                  <td className="py-1 text-[#a16207] align-top text-xs">天乙贵人</td>
                  <td className="py-1 text-[#a16207] align-top text-xs">国印贵人</td>
                  <td className="py-1 text-[#a16207] align-top text-xs">天乙贵人</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 起运信息 */}
          <div className="px-4 py-3 border-t text-sm">
            <div className="flex justify-between items-center">
              <div>
                <div>起运：出生后8年2月3天6时起运</div>
                <div>交运：逢戊、癸年 立春后27天 交大运</div>
              </div>
              <div className="flex items-center gap-2">
                <span>38岁</span>
                <span className="text-[#a16207]">司令：<span className="text-[#22c55e]">癸</span></span>
                <button className="w-8 h-8 rounded border flex items-center justify-center">
                  <span className="text-sm">令</span>
                </button>
              </div>
            </div>
          </div>

          {/* 大运 */}
          <div className="border-t">
            <div className="flex items-center px-4 py-2">
              <div className="w-10 text-center">
                <div className="text-sm font-medium">大</div>
                <div className="text-sm font-medium">运</div>
                <div className="mt-1 w-4 h-4 rounded-full border mx-auto" />
              </div>
              <div className="flex-1 overflow-x-auto">
                <div className="flex">
                  {daYunData.map((dy, i) => (
                    <div 
                      key={i} 
                      className={`flex-shrink-0 w-14 text-center py-2 ${dy.highlight ? 'bg-gray-100 rounded' : ''}`}
                    >
                      <div className="text-xs text-gray-700">{dy.year}</div>
                      <div className="text-xs text-gray-700">{dy.ageRange}</div>
                      <div className="mt-1">
                        <span style={{ color: getGanColor(dy.gan) }} className="font-medium">{dy.gan}</span>
                        {dy.s1 && <span className="text-xs ml-0.5" style={{ color: getShiShenColor(dy.s1) }}>{dy.s1}</span>}
                      </div>
                      <div>
                        <span style={{ color: getZhiColor(dy.zhi) }} className="font-medium">{dy.zhi}</span>
                        {dy.s2 && <span className="text-xs ml-0.5" style={{ color: getShiShenColor(dy.s2) }}>{dy.s2}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 流年 */}
          <div className="border-t">
            <div className="flex items-center px-4 py-2">
              <div className="w-10 text-center">
                <div className="text-sm font-medium">流</div>
                <div className="text-sm font-medium">年</div>
                <div className="text-xs text-gray-600 mt-1">小运</div>
              </div>
              <div className="flex-1 overflow-x-auto">
                <div className="flex">
                  {liuNianData.map((ln, i) => (
                    <div 
                      key={i} 
                      className={`flex-shrink-0 w-14 text-center py-2 ${ln.highlight ? 'bg-gray-100 rounded' : ''}`}
                    >
                      <div className={`text-xs ${ln.highlight ? 'font-bold' : 'text-gray-700'}`}>{ln.year}</div>
                      <div className="mt-1">
                        <span style={{ color: getGanColor(ln.gan) }} className="font-medium">{ln.gan}</span>
                        <span className="text-xs ml-0.5" style={{ color: getShiShenColor(ln.s1) }}>{ln.s1}</span>
                      </div>
                      <div>
                        <span style={{ color: getZhiColor(ln.zhi) }} className="font-medium">{ln.zhi}</span>
                        <span className="text-xs ml-0.5" style={{ color: getShiShenColor(ln.s2) }}>{ln.s2}</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5">{ln.xiaoYun}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center py-1">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                </div>
              </div>
            </div>
          </div>

          {/* 流月 */}
          <div className="border-t">
            <div className="flex items-center px-4 py-2">
              <div className="w-10 text-center">
                <div className="text-sm font-medium">流</div>
                <div className="text-sm font-medium">月</div>
              </div>
              <div className="flex-1 overflow-x-auto">
                <div className="flex">
                  {liuYueData.map((ly, i) => (
                    <div key={i} className="flex-shrink-0 w-14 text-center py-2">
                      <div className="text-xs text-gray-700">{ly.name}</div>
                      <div className="text-xs text-gray-600">{ly.date}</div>
                      <div className="mt-1">
                        <span style={{ color: getGanColor(ly.gan) }} className="font-medium">{ly.gan}</span>
                        <span className="text-xs ml-0.5" style={{ color: getShiShenColor(ly.s1) }}>{ly.s1}</span>
                      </div>
                      <div>
                        <span style={{ color: getZhiColor(ly.zhi) }} className="font-medium">{ly.zhi}</span>
                        <span className="text-xs ml-0.5" style={{ color: getShiShenColor(ly.s2) }}>{ly.s2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 断事笔记Tab */}
      {activeTab === "notes" && (
        <div className="pb-20">
          {/* 头部八字摘要 */}
          <div className="bg-[#1a1a1a] p-4">
            <div className="flex items-center gap-4">
              <span className="text-[#d4af37]">乾造</span>
              <div className="flex gap-4 text-[#f5f5f7] text-lg">
                <div className="text-center">
                  <div>{siZhu.year.gan}</div>
                  <div>{siZhu.year.zhi}</div>
                </div>
                <div className="text-center">
                  <div>{siZhu.month.gan}</div>
                  <div>{siZhu.month.zhi}</div>
                </div>
                <div className="text-center">
                  <div>{siZhu.day.gan}</div>
                  <div>{siZhu.day.zhi}</div>
                </div>
                <div className="text-center">
                  <div>{siZhu.hour.gan}</div>
                  <div>{siZhu.hour.zhi}</div>
                </div>
              </div>
            </div>
            <div className="mt-2 text-[#f5f5f7]/60 text-sm">
              {daYunData.filter(d => d.gan !== "小").map(d => `${d.gan}${d.zhi}`).join(" - ")}
            </div>
          </div>

          {/* 命主反馈 / 师傅点评 */}
          <div className="flex justify-center py-3">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setNotesTab("feedback")}
                className={`px-6 py-1.5 rounded-full text-sm ${
                  notesTab === "feedback" ? "bg-white shadow" : ""
                }`}
              >
                命主反馈
              </button>
              <button
                onClick={() => setNotesTab("comment")}
                className={`px-6 py-1.5 rounded-full text-sm ${
                  notesTab === "comment" ? "bg-white shadow" : ""
                }`}
              >
                师傅点评
              </button>
            </div>
          </div>

          {/* 表单区域 */}
          <div className="px-4 space-y-4">
            {/* 下拉选择项 */}
            {[
              { label: "职业", key: "career" },
              { label: "学历", key: "education" },
              { label: "财富", key: "wealth" },
              { label: "婚姻", key: "marriage" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-700">{item.label}</span>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>点击选择</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            ))}

            {/* 文本输入项 */}
            {[
              { label: "健康状况", key: "health" },
              { label: "六亲状况", key: "family" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-700">{item.key === "health" ? "健康状态" : item.label}</span>
                <input
                  type="text"
                  placeholder="请输入"
                  className="text-right text-gray-600 bg-transparent outline-none"
                  value={noteData[item.key as keyof typeof noteData]}
                  onChange={(e) => setNoteData(prev => ({ ...prev, [item.key]: e.target.value }))}
                />
              </div>
            ))}

            {/* 情况简介 */}
            <div className="py-3">
              <textarea
                placeholder="请输入情况简介"
                className="w-full h-24 p-3 bg-gray-50 rounded-lg text-sm outline-none resize-none"
                value={noteData.intro}
                onChange={(e) => setNoteData(prev => ({ ...prev, intro: e.target.value }))}
              />
            </div>

            {/* 图片上传区域 */}
            <div className="flex gap-4">
              {["五官图片", "手掌图片", "其他图片"].map((label) => (
                <div 
                  key={label}
                  className="flex-1 aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2"
                >
                  <Camera className="w-8 h-8 text-gray-300" />
                  <span className="text-xs text-gray-600">{label}</span>
                </div>
              ))}
            </div>

            {/* 关键事件反馈记录 */}
            <div className="py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">关键事件反馈记录</span>
              </div>
              <div className="flex items-center justify-between py-3 border rounded-lg px-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-gray-600">点击选择时间</span>
                </div>
                <button className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* 底部保存按钮 */}
          <div className="fixed bottom-20 left-4 right-4 flex gap-3">
            <button className="flex-1 py-3 bg-[#d4af37] text-white rounded-full font-medium">
              保存
            </button>
            <button className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
              <span className="text-[#d4af37]">⬡</span>
            </button>
          </div>
        </div>
      )}

      {/* AI指令弹窗 */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-medium">AI指令复制</span>
              <button onClick={() => setShowAiModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <p className="text-sm text-[#a16207] mb-3">
                （请复制以下AI提示词，粘贴到 DeepSeek、ChatGPT、豆包等第三方AI大模型中使用）
              </p>

              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mb-4">
                <p>建议开启"深度思考"模式，并关闭"联网搜索"功能，以便模型更专注地进行盘面分析或相关训练。</p>
                <p className="mt-2">温馨提示：目前AI在易学领域仍处于早期探索阶段，生成内容可能存在不准确或主观推测的情况，请保持理性判断，结果仅供学术参考与娱乐使用。</p>
              </div>

              {/* 分类选择 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {["全项", "事业", "财运", "婚恋"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setAiCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      aiCategory === cat 
                        ? "bg-[#d4af37] text-white" 
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {["子女", "六亲", "健康", "学业"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setAiCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      aiCategory === cat 
                        ? "bg-[#d4af37] text-white" 
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* 复制按钮 */}
              <button
                onClick={copyAiPrompt}
                className="w-full py-3 bg-[#d4af37] text-white rounded-full font-medium flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    复制AI指令
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 信息行组件
function InfoRow({ label, value, labelColor }: { label: string; value: React.ReactNode; labelColor?: string }) {
  return (
    <div className="flex px-4 py-3">
      <span className="text-sm" style={{ color: labelColor || "#6b7280" }}>{label}：</span>
      <span className="text-sm text-gray-800 flex-1">{value}</span>
    </div>
  )
}
