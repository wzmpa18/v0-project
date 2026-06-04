"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal, Eye, Pencil, Plus, X, Copy, Check, ChevronDown, Calendar } from "lucide-react"
import { 
  QIONG_TONG_BAO_JIAN, 
  DI_TIAN_SUI, 
  GUJI_MINGLI, 
  AI_PROMPT_TEMPLATES,
  CHENG_GU_DATA,
  analyzeGanZhiRelations 
} from "@/lib/bazi-guji-data"
import { calculateDayGanWangShuai, analyzeTongDangYiDang } from "@/lib/bazi-wangshuai"
import { determineGeJu, analyzeYongShen } from "@/lib/bazi-geju"
import { checkShenShaByPosition } from "@/lib/bazi-shenshe"
import { calculateDaYun, calculateLiuNian, getTaiYuan, getMingGong, getShenGong, getKongWang, ZHI_CANG_GAN } from "@/lib/bazi-data"

const WUXING_COLOR: Record<string, string> = {
  "木": "#22c55e", "火": "#ef4444", "土": "#a16207", "金": "#ca8a04", "水": "#3b82f6",
}

const TIAN_GAN_WUXING: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水",
}

const DI_ZHI_WUXING: Record<string, string> = {
  "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水",
}

const getGanColor = (gan: string) => WUXING_COLOR[TIAN_GAN_WUXING[gan]] || "#333"
const getZhiColor = (zhi: string) => WUXING_COLOR[DI_ZHI_WUXING[zhi]] || "#333"

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

  const noteData = useState({
    career: "", education: "", wealth: "", marriage: "", health: "", family: "", personality: "", intro: ""
  })[0]

  const siZhu = result?.siZhu || {
    year: { gan: "己", zhi: "巳", shiShen: "伤官", cangGan: ["丙", "庚", "戊"], naYin: "大林木" },
    month: { gan: "丙", zhi: "子", shiShen: "比肩", cangGan: ["癸"], naYin: "涧下水" },
    day: { gan: "丙", zhi: "寅", shiShen: "元男", cangGan: ["甲", "丙", "戊"], naYin: "炉中火" },
    hour: { gan: "戊", zhi: "子", shiShen: "食神", cangGan: ["癸"], naYin: "霹雳火" },
  }

  const dayGan = siZhu.day.gan
  const monthZhi = siZhu.month.zhi

  const qiongTongContent = QIONG_TONG_BAO_JIAN[dayGan]?.[monthZhi] || {
    yuanwen: "暂无此日主月支的穷通宝鉴论述。",
    yiwen: "暂无白话译文。"
  }

  const diTianSuiContent = DI_TIAN_SUI[dayGan] || "暂无此日主的滴天髓论述。"

  const ganZhiRelations = analyzeGanZhiRelations({
    yearGan: siZhu.year.gan, yearZhi: siZhu.year.zhi,
    monthGan: siZhu.month.gan, monthZhi: siZhu.month.zhi,
    dayGan: siZhu.day.gan, dayZhi: siZhu.day.zhi,
    hourGan: siZhu.hour.gan, hourZhi: siZhu.hour.zhi
  })

  const shenShaData = checkShenShaByPosition({
    yearGan: siZhu.year.gan, yearZhi: siZhu.year.zhi,
    monthGan: siZhu.month.gan, monthZhi: siZhu.month.zhi,
    dayGan: siZhu.day.gan, dayZhi: siZhu.day.zhi,
    hourGan: siZhu.hour.gan, hourZhi: siZhu.hour.zhi
  })

  const wangShuaiResult = calculateDayGanWangShuai(
    siZhu.day.gan,
    siZhu.year.gan, siZhu.year.zhi,
    siZhu.month.gan, siZhu.month.zhi,
    siZhu.day.zhi,
    siZhu.hour.gan, siZhu.hour.zhi
  )

  const geJuResult = determineGeJu(
    siZhu.day.gan,
    siZhu.year.gan, siZhu.year.zhi,
    siZhu.month.gan, siZhu.month.zhi,
    siZhu.day.zhi,
    siZhu.hour.gan, siZhu.hour.zhi,
    wangShuaiResult.level
  )

  const yongShenResult = analyzeYongShen(geJuResult, siZhu.day.gan, wangShuaiResult.level)

  const tongDangYiDang = analyzeTongDangYiDang(
    siZhu.day.gan,
    siZhu.year.gan, siZhu.year.zhi,
    siZhu.month.gan, siZhu.month.zhi,
    siZhu.day.zhi,
    siZhu.hour.gan, siZhu.hour.zhi
  )

  const daYunData = calculateDaYun(
    siZhu.year.gan, siZhu.month.zhi, siZhu.day.gan, siZhu.hour.zhi, result?.gender || "male"
  )

  const currentYear = new Date().getFullYear()
  const liuNianData = calculateLiuNian(currentYear, siZhu.day.gan)

  const calculateWuxingCount = () => {
    const count = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 }
    const gans = [siZhu.year.gan, siZhu.month.gan, siZhu.day.gan, siZhu.hour.gan]
    gans.forEach(gan => {
      const wx = TIAN_GAN_WUXING[gan]
      if (wx) count[wx as keyof typeof count]++
    })
    const zhis = [siZhu.year.zhi, siZhu.month.zhi, siZhu.day.zhi, siZhu.hour.zhi]
    zhis.forEach(zhi => {
      const wx = DI_ZHI_WUXING[zhi]
      if (wx) count[wx as keyof typeof count]++
    })
    return count
  }

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

  const wuxingCount = calculateWuxingCount()
  const cangGanCount = calculateCangGanCount()

  const chengGuWeight = "四两九钱"
  const chengGanData = CHENG_GU_DATA["四两九"] || { weight: chengGuWeight, verse: "此命推来福不轻，自成自立显门庭，从来富贵人钦敬，使婢差奴过一生。" }

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

  const zodiac = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
  const currentZodiac = zodiac[(new Date().getFullYear() - 1984) % 12]

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-medium text-gray-800">八字排盘</h1>
        <button className="p-1">
          <MoreHorizontal className="w-6 h-6 text-gray-600" />
        </button>
      </div>

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
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? "text-white" : "text-white/70"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      {activeTab === "info" && (
        <div className="pb-20">
          <div className="bg-[#1a1a1a] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                  <span className="text-2xl">🐍</span>
                </div>
                <div>
                  <div className="text-[#f5f5f7] font-medium">{result?.name || "案例"}</div>
                  <button className="text-xs text-[#d4af37] border border-[#d4af37]/50 px-2 py-0.5 rounded mt-1">
                    请编辑名称
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#f5f5f7]/80 text-sm">生肖：{currentZodiac}</div>
                <div className="text-[#f5f5f7]/80 text-sm">{result?.age || 38}岁 {result?.gender === "male" ? "男" : "女"}</div>
              </div>
            </div>
          </div>

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
                <span className="text-gray-800 text-sm">{getTaiYuan(siZhu.month.gan, siZhu.month.zhi)} (炉中火)</span>
              </div>
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">空亡：</span>
                <span className="text-gray-800 text-sm">{getKongWang(siZhu.day.gan + siZhu.day.zhi).join(" ")}</span>
              </div>
            </div>
            <div className="flex px-4 py-3">
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">命宫：</span>
                <span className="text-gray-800 text-sm">{getMingGong(siZhu.month.zhi, siZhu.hour.zhi).ganZhi} ({getMingGong(siZhu.month.zhi, siZhu.hour.zhi).naYin})</span>
              </div>
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">胎息：</span>
                <span className="text-gray-800 text-sm">辛亥 (钗钏金)</span>
              </div>
            </div>
            <div className="flex px-4 py-3">
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">身宫：</span>
                <span className="text-gray-800 text-sm">{getShenGong(siZhu.month.zhi, siZhu.hour.zhi).ganZhi} ({getShenGong(siZhu.month.zhi, siZhu.hour.zhi).naYin})</span>
              </div>
              <div className="w-1/2">
                <span className="text-[#a16207] text-sm">命卦：</span>
                <span className="text-gray-800 text-sm">坤卦 (西四命)</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 py-2 px-4 flex items-center justify-center gap-2 text-gray-700 text-sm">
            <span>🤖</span>
            <span>小真智能系统</span>
          </div>

          <div className="px-4 py-3 flex">
            <div className="w-1/2">
              <span className="text-gray-700 text-sm">日主属性：</span>
              <span className="text-[#ef4444] text-sm">{dayGan}{TIAN_GAN_WUXING[dayGan]}</span>
            </div>
            <div className="w-1/2">
              <span className="text-gray-700 text-sm">旺衰：</span>
              <span className="text-gray-600 text-sm">{wangShuaiResult.level}</span>
            </div>
          </div>
          <div className="px-4 py-3 flex">
            <div className="w-1/2">
              <span className="text-gray-700 text-sm">格局：</span>
              <span className="text-gray-600 text-sm">{geJuResult.name}</span>
            </div>
            <div className="w-1/2">
              <span className="text-gray-700 text-sm">用神：</span>
              <span className="text-gray-600 text-sm">{yongShenResult.yongShen}</span>
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">同党</span>
              <div className="flex-1 flex h-6 rounded overflow-hidden">
                <div className="bg-[#d4af37] flex items-center justify-center text-white text-xs" style={{ width: `${tongDangYiDang.tongDang}%` }}>
                  {tongDangYiDang.tongDang}%
                </div>
                <div className="bg-[#3b82f6] flex items-center justify-center text-white text-xs" style={{ width: `${tongDangYiDang.yiDang}%` }}>
                  {tongDangYiDang.yiDang}%
                </div>
              </div>
              <span className="text-sm">异党</span>
              <button className="w-8 h-8 rounded bg-[#d4af37]/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>
          </div>

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

          <div className="px-4 py-4">
            {wuxingTab === "count" && (
              <div className="space-y-3">
                {Object.entries(wuxingCount).map(([wx, count]) => (
                  <div key={wx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: WUXING_COLOR[wx] }}>
                      <span className="text-white text-xs font-medium">{wx}</span>
                    </div>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(count / 8) * 100}%`,
                          backgroundColor: WUXING_COLOR[wx]
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-700 w-8 text-right">{count}个</span>
                  </div>
                ))}
              </div>
            )}
            {wuxingTab === "canggan" && (
              <div className="space-y-3">
                {Object.entries(cangGanCount).map(([wx, count]) => (
                  <div key={wx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: WUXING_COLOR[wx] }}>
                      <span className="text-white text-xs font-medium">{wx}</span>
                    </div>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(count / 12) * 100}%`,
                          backgroundColor: WUXING_COLOR[wx]
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-700 w-8 text-right">{count}个</span>
                  </div>
                ))}
              </div>
            )}
            {wuxingTab === "shishen" && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "比劫", count: 1, color: "#22c55e" },
                  { name: "财才", count: 1, color: "#ca8a04" },
                  { name: "食伤", count: 2, color: "#a16207" },
                  { name: "官杀", count: 2, color: "#3b82f6" },
                  { name: "印枭", count: 1, color: "#ef4444" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                    <span style={{ color: item.color }} className="font-medium">{item.name}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full" style={{ width: `${(item.count / 4) * 100}%`, backgroundColor: item.color }} />
                    </div>
                    <span className="text-xs text-gray-600">{item.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-4 py-2 flex justify-around text-sm text-gray-800 font-medium">
            <span>水旺</span>
            <span>木相</span>
            <span>金休</span>
            <span>土囚</span>
            <span>火死</span>
          </div>

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
              <p className="whitespace-pre-line">{chengGanData.verse}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "basic" && (
        <div className="pb-20">
          <div className="bg-[#1a1a1a] p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                <span className="text-2xl">🐍</span>
              </div>
              <div className="flex-1">
                <div className="text-[#f5f5f7] font-medium">{result?.name || "案例"}</div>
                <div className="text-[#f5f5f7]/60 text-sm">农历：{result?.lunarDate || "1989年腊月初五 子时 乾造"}</div>
                <div className="text-[#f5f5f7]/60 text-sm">阳历：{result?.solarDate || "1990年01月01日 00:00"}</div>
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
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">主星</td>
                  <td className="py-2">{siZhu.year.shiShen}</td>
                  <td className="py-2">{siZhu.month.shiShen}</td>
                  <td className="py-2">元男</td>
                  <td className="py-2">{siZhu.hour.shiShen}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">天干</td>
                  <td className="py-3"><span className="text-2xl font-bold" style={{ color: getGanColor(siZhu.year.gan) }}>{siZhu.year.gan}</span></td>
                  <td className="py-3"><span className="text-2xl font-bold" style={{ color: getGanColor(siZhu.month.gan) }}>{siZhu.month.gan}</span></td>
                  <td className="py-3"><span className="text-2xl font-bold" style={{ color: getGanColor(siZhu.day.gan) }}>{siZhu.day.gan}</span></td>
                  <td className="py-3"><span className="text-2xl font-bold" style={{ color: getGanColor(siZhu.hour.gan) }}>{siZhu.hour.gan}</span></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">地支</td>
                  <td className="py-3"><span className="text-2xl font-bold" style={{ color: getZhiColor(siZhu.year.zhi) }}>{siZhu.year.zhi}</span></td>
                  <td className="py-3"><span className="text-2xl font-bold" style={{ color: getZhiColor(siZhu.month.zhi) }}>{siZhu.month.zhi}</span></td>
                  <td className="py-3"><span className="text-2xl font-bold" style={{ color: getZhiColor(siZhu.day.zhi) }}>{siZhu.day.zhi}</span></td>
                  <td className="py-3"><span className="text-2xl font-bold" style={{ color: getZhiColor(siZhu.hour.zhi) }}>{siZhu.hour.zhi}</span></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#a16207] align-top">藏干</td>
                  <td className="py-2 align-top text-xs space-y-0.5">
                    {siZhu.year.cangGan.map((gan, i) => (
                      <div key={i}><span style={{ color: getGanColor(gan) }}>{gan}</span>{TIAN_GAN_WUXING[gan]}</div>
                    ))}
                  </td>
                  <td className="py-2 align-top text-xs">
                    {siZhu.month.cangGan.map((gan, i) => (
                      <div key={i}><span style={{ color: getGanColor(gan) }}>{gan}</span>{TIAN_GAN_WUXING[gan]}</div>
                    ))}
                  </td>
                  <td className="py-2 align-top text-xs space-y-0.5">
                    {siZhu.day.cangGan.map((gan, i) => (
                      <div key={i}><span style={{ color: getGanColor(gan) }}>{gan}</span>{TIAN_GAN_WUXING[gan]}</div>
                    ))}
                  </td>
                  <td className="py-2 align-top text-xs">
                    {siZhu.hour.cangGan.map((gan, i) => (
                      <div key={i}><span style={{ color: getGanColor(gan) }}>{gan}</span>{TIAN_GAN_WUXING[gan]}</div>
                    ))}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#a16207]">纳音</td>
                  <td className="py-2 text-gray-800">{siZhu.year.naYin}</td>
                  <td className="py-2 text-gray-800">{siZhu.month.naYin}</td>
                  <td className="py-2 text-gray-800">{siZhu.day.naYin}</td>
                  <td className="py-2 text-gray-800">{siZhu.hour.naYin}</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#a16207] align-top">神煞</td>
                  <td className="py-2 align-top text-xs text-[#a16207] space-y-0.5">
                    {shenShaData.year?.slice(0, 3).map((ss, i) => <div key={i}>{ss}</div>)}
                  </td>
                  <td className="py-2 align-top text-xs text-[#a16207] space-y-0.5">
                    {shenShaData.month?.slice(0, 3).map((ss, i) => <div key={i}>{ss}</div>)}
                  </td>
                  <td className="py-2 align-top text-xs text-[#a16207] space-y-0.5">
                    {shenShaData.day?.slice(0, 3).map((ss, i) => <div key={i}>{ss}</div>)}
                  </td>
                  <td className="py-2 align-top text-xs text-[#a16207] space-y-0.5">
                    {shenShaData.hour?.slice(0, 3).map((ss, i) => <div key={i}>{ss}</div>)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

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

          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-[#d4af37]" />
                <span className="font-medium">智能古籍参考</span>
              </div>
              <span className="text-xs px-2 py-0.5 bg-[#d4af37]/20 text-[#d4af37] rounded">VIP会员</span>
            </div>

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

          <div className="px-4 py-4">
            <div className="text-[#a16207] font-medium mb-3 border-b-2 border-[#d4af37] inline-block pb-1">
              论{dayGan}生{monthZhi}月
            </div>

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

          <div className="px-4 py-4">
            <div className="text-[#a16207] font-medium mb-3">古籍命例参考</div>
            <div className="space-y-4">
              {GUJI_MINGLI.slice(0, 3).map((ml, i) => (
                <div key={i} className="text-sm">
                  <div className="text-[#a16207] mb-1">{ml.bazi}</div>
                  <p className="text-gray-600 leading-relaxed">{ml.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "pro" && (
        <div className="pb-20">
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
                  <td className="py-1 text-[#a16207] align-top">藏干</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#ef4444]">丁</span>劫财<br/><span className="text-[#a16207]">己</span>伤官</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#ca8a04]">辛</span>正财</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#ef4444]">丙</span>比肩<br/><span className="text-[#ca8a04]">庚</span>偏财<br/><span className="text-[#a16207]">戊</span>食神</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#3b82f6]">癸</span>正官</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#22c55e]">甲</span>偏印<br/><span className="text-[#ef4444]">丙</span>比肩<br/><span className="text-[#a16207]">戊</span>食神</td>
                  <td className="py-1 align-top text-xs"><span className="text-[#3b82f6]">癸</span>正官</td>
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
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t text-sm">
            <div className="flex justify-between items-center">
              <div>
                <div>起运：出生后8年2月3天6时起运</div>
                <div>交运：逢戊、癸年 立春后27天 交大运</div>
              </div>
              <div className="flex items-center gap-2">
                <span>{result?.age || 38}岁</span>
                <span className="text-[#a16207]">司令：<span className="text-[#22c55e]">癸</span></span>
              </div>
            </div>
          </div>

          <div className="border-t">
            <div className="flex items-center px-4 py-2">
              <div className="w-10 text-center">
                <div className="text-sm font-medium">大</div>
                <div className="text-sm font-medium">运</div>
              </div>
              <div className="flex-1 overflow-x-auto">
                <div className="flex gap-2">
                  {daYunData.map((dy, i) => (
                    <div key={i} className="flex-shrink-0 w-14 text-center py-2">
                      <div className="text-xs text-gray-700">{dy.startYear}~{dy.startYear + 9}岁</div>
                      <div className="mt-1">
                        <span style={{ color: getGanColor(dy.gan) }} className="font-medium">{dy.gan}</span>
                        <span className="text-xs ml-0.5" style={{ color: getShiShenColor(dy.siShen) }}>{dy.siShen}</span>
                      </div>
                      <div>
                        <span style={{ color: getZhiColor(dy.zhi) }} className="font-medium">{dy.zhi}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t">
            <div className="flex items-center px-4 py-2">
              <div className="w-10 text-center">
                <div className="text-sm font-medium">流</div>
                <div className="text-sm font-medium">年</div>
              </div>
              <div className="flex-1 overflow-x-auto">
                <div className="flex">
                  {liuNianData.map((ln, i) => (
                    <div key={i} className="flex-shrink-0 w-14 text-center py-2">
                      <div className="text-xs text-gray-700">{ln.year}</div>
                      <div className="mt-1">
                        <span style={{ color: getGanColor(ln.gan) }} className="font-medium">{ln.gan}</span>
                        <span className="text-xs ml-0.5" style={{ color: getShiShenColor(ln.shiShen) }}>{ln.shiShen}</span>
                      </div>
                      <div>
                        <span style={{ color: getZhiColor(ln.zhi) }} className="font-medium">{ln.zhi}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "notes" && (
        <div className="pb-20">
          <div className="bg-[#1a1a1a] p-4">
            <div className="flex items-center gap-4">
              <span className="text-[#d4af37]">{result?.gender === "male" ? "乾造" : "坤造"}</span>
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
              {daYunData.map(d => `${d.gan}${d.zhi}`).join(" - ")}
            </div>
          </div>

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

          <div className="px-4 space-y-4">
            {[
              { label: "职业", key: "career" },
              { label: "学历", key: "education" },
              { label: "财富", key: "wealth" },
              { label: "婚姻", key: "marriage" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700">{item.label}</span>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>点击选择</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            ))}

            {[
              { label: "健康状况", key: "health" },
              { label: "六亲状况", key: "family" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700">{item.label}</span>
                <input
                  type="text"
                  placeholder="请输入"
                  className="text-right text-gray-600 bg-transparent outline-none"
                  value={noteData[item.key as keyof typeof noteData]}
                />
              </div>
            ))}

            <div className="py-3">
              <textarea
                placeholder="请输入情况简介"
                className="w-full h-24 p-3 bg-gray-50 rounded-lg text-sm outline-none resize-none"
                value={noteData.intro}
              />
            </div>

            <div className="flex gap-4">
              {["五官图片", "手掌图片", "其他图片"].map((label) => (
                <div
                  key={label}
                  className="flex-1 aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2"
                >
                  <Plus className="w-8 h-8 text-gray-300" />
                  <span className="text-xs text-gray-600">{label}</span>
                </div>
              ))}
            </div>

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

function InfoRow({ label, value, labelColor }: { label: string; value: React.ReactNode; labelColor?: string }) {
  return (
    <div className="flex px-4 py-3">
      <span className="text-sm" style={{ color: labelColor || "#6b7280" }}>{label}：</span>
      <span className="text-sm text-gray-800 flex-1">{value}</span>
    </div>
  )
}