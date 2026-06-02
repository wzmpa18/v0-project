"use client"

import { useState, useMemo } from "react"
import { Compass, MapPin, Check, ChevronLeft, ChevronRight, Star, Grid3X3, Hexagon, Calendar, Mountain } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"
import { SHEN_SHA, checkShenSha } from "@/lib/bazi-data"
import { BA_MEN, JIU_XING, BA_SHEN_YANG, SAN_QI_LIU_YI } from "@/lib/qimen-data"
import { GUA_64, LIU_SHOU, getLiuQin, BA_GUA_NA_JIA } from "@/lib/liuyao-data"
import { BaziInputForm } from "@/components/bazi/bazi-input-form"
import { BaziResult } from "@/components/bazi/bazi-result"

const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

const SHI_SHEN_MAP: Record<string, Record<string, string>> = {
  "甲": { "甲": "比肩", "乙": "劫财", "丙": "食神", "丁": "伤官", "戊": "偏财", "己": "正财", "庚": "七杀", "辛": "正官", "壬": "偏印", "癸": "正印" },
  "乙": { "甲": "劫财", "乙": "比肩", "丙": "伤官", "丁": "食神", "戊": "正财", "己": "偏财", "庚": "正官", "辛": "七杀", "壬": "正印", "癸": "偏印" },
  "丙": { "甲": "偏印", "乙": "正印", "丙": "比肩", "丁": "劫财", "戊": "食神", "己": "伤官", "庚": "偏财", "辛": "正财", "壬": "七杀", "癸": "正官" },
  "丁": { "甲": "正印", "乙": "偏印", "丙": "劫财", "丁": "比肩", "戊": "伤官", "己": "食神", "庚": "正财", "辛": "偏财", "壬": "正官", "癸": "七杀" },
  "戊": { "甲": "七杀", "乙": "正官", "丙": "偏印", "丁": "正印", "戊": "比肩", "己": "劫财", "庚": "食神", "辛": "伤官", "壬": "偏财", "癸": "正财" },
  "己": { "甲": "正官", "乙": "七杀", "丙": "正印", "丁": "偏印", "戊": "劫财", "己": "比肩", "庚": "伤官", "辛": "食神", "壬": "正财", "癸": "偏财" },
  "庚": { "甲": "偏财", "乙": "正财", "丙": "七杀", "丁": "正官", "戊": "偏印", "己": "正印", "庚": "比肩", "辛": "劫财", "壬": "食神", "癸": "伤官" },
  "辛": { "甲": "正财", "乙": "偏财", "丙": "正官", "丁": "七杀", "戊": "正印", "己": "偏印", "庚": "劫财", "辛": "比肩", "壬": "伤官", "癸": "食神" },
  "壬": { "甲": "食神", "乙": "伤官", "丙": "偏财", "丁": "正财", "戊": "七杀", "己": "正官", "庚": "偏印", "辛": "正印", "壬": "比肩", "癸": "劫财" },
  "癸": { "甲": "伤官", "乙": "食神", "丙": "正财", "丁": "偏财", "戊": "正官", "己": "七杀", "庚": "正印", "辛": "偏印", "壬": "劫财", "癸": "比肩" },
}

const CANG_GAN: Record<string, string[]> = {
  "子": ["癸"], "丑": ["己", "癸", "辛"], "寅": ["甲", "丙", "戊"], "卯": ["乙"],
  "辰": ["戊", "乙", "癸"], "巳": ["丙", "庚", "戊"], "午": ["丁", "己"], "未": ["己", "丁", "乙"],
  "申": ["庚", "壬", "戊"], "酉": ["辛"], "戌": ["戊", "辛", "丁"], "亥": ["壬", "甲"],
}

const NA_YIN: Record<string, string> = {
  "甲子": "海中金", "乙丑": "海中金", "丙寅": "炉中火", "丁卯": "炉中火",
  "戊辰": "大林木", "己巳": "大林木", "庚午": "路旁土", "辛未": "路旁土",
  "壬申": "剑锋金", "癸酉": "剑锋金", "甲戌": "山头火", "乙亥": "山头火",
  "丙子": "涧下水", "丁丑": "涧下水", "戊寅": "城头土", "己卯": "城头土",
  "庚辰": "白蜡金", "辛巳": "白蜡金", "壬午": "杨柳木", "癸未": "杨柳木",
  "甲申": "泉中水", "乙酉": "泉中水", "丙戌": "屋上土", "丁亥": "屋上土",
  "戊子": "霹雳火", "己丑": "霹雳火", "庚寅": "松柏木", "辛卯": "松柏木",
  "壬辰": "长流水", "癸巳": "长流水", "甲午": "砂石金", "乙未": "砂石金",
  "丙申": "山下火", "丁酉": "山下火", "戊戌": "平地木", "己亥": "平地木",
  "庚子": "壁上土", "辛丑": "壁上土", "壬寅": "金箔金", "癸卯": "金箔金",
  "甲辰": "覆灯火", "乙巳": "覆灯火", "丙午": "天河水", "丁未": "天河水",
  "戊申": "大驿土", "己酉": "大驿土", "庚戌": "钗钏金", "辛亥": "钗钏金",
  "壬子": "桑柘木", "癸丑": "桑柘木", "甲寅": "大溪水", "乙卯": "大溪水",
  "丙辰": "沙中土", "丁巳": "沙中土", "戊午": "天上火", "己未": "天上火",
  "庚申": "石榴木", "辛酉": "石榴木", "壬戌": "大海水", "癸亥": "大海水",
}

const TIAN_GAN_WUXING: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水",
}

const DI_ZHI_WUXING: Record<string, string> = {
  "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水",
}

const WUXING_COLOR: Record<string, string> = {
  "木": "#22c55e", "火": "#ef4444", "土": "#d97706", "金": "#eab308", "水": "#3b82f6",
}

const getWuxingColor = (char: string): string => {
  const wuxing = TIAN_GAN_WUXING[char] || DI_ZHI_WUXING[char]
  return WUXING_COLOR[wuxing] || "#f5f5f7"
}

type SubTab = "bazi" | "qimen" | "liuyao"

const PAIPAN_TOOLS = [
  { id: "ziwei", name: "紫微斗数", icon: Star, color: "#8b5cf6" },
  { id: "liuren", name: "大六壬", icon: Grid3X3, color: "#0891b2" },
  { id: "meihua", name: "梅花易数", icon: Hexagon, color: "#f59e0b" },
  { id: "xuankong", name: "玄空飞星", icon: Mountain, color: "#22c55e" },
  { id: "luopan", name: "电子罗盘", icon: Compass, color: "#ef4444" },
]

interface PaipanPageProps {
  onNavigateToTool?: (toolId: string) => void
}

export function PaipanPage({ onNavigateToTool }: PaipanPageProps = {}) {
  const [subTab, setSubTab] = useState<SubTab>("bazi")
  const [showBaziInput, setShowBaziInput] = useState(true)
  const [baziResultData, setBaziResultData] = useState<any>(null)

  const [qimenResult, setQimenResult] = useState<any>(null)
  const [qimenMode, setQimenMode] = useState<"zhuan" | "fei">("zhuan")
  
  const [liuyaoResult, setLiuyaoResult] = useState<any>(null)
  const [isShaking, setIsShaking] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    gender: "male" as "male" | "female",
    calendarType: "solar" as "solar" | "lunar",
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    birthPlace: "",
    timezone: "北京时间",
    saveToRecord: true,
  })

  const handleBaziCalculate = (data: any) => {
    setFormData({
      name: data.name,
      gender: data.gender,
      calendarType: data.calendarType,
      year: data.year,
      month: data.month,
      day: data.day,
      hour: data.hour,
      minute: data.minute,
      birthPlace: data.birthPlace,
      timezone: data.timezone,
      saveToRecord: data.saveToRecord,
    })

    let solar: typeof Solar.prototype
    if (data.calendarType === "lunar") {
      const lunar = Lunar.fromYmd(data.year, data.month, data.day)
      solar = lunar.getSolar()
    } else {
      solar = Solar.fromYmd(data.year, data.month, data.day)
    }
    
    const lunar = solar.getLunar()
    const eightChar = lunar.getEightChar()
    
    const yearGan = eightChar.getYearGan()
    const yearZhi = eightChar.getYearZhi()
    const monthGan = eightChar.getMonthGan()
    const monthZhi = eightChar.getMonthZhi()
    const dayGan = eightChar.getDayGan()
    const dayZhi = eightChar.getDayZhi()
    
    const shiChenIndex = Math.floor((data.hour + 1) % 24 / 2)
    const hourZhi = DI_ZHI[shiChenIndex]
    const dayGanIndex = TIAN_GAN.indexOf(dayGan)
    const hourGanIndex = (dayGanIndex % 5) * 2 + shiChenIndex
    const hourGan = TIAN_GAN[hourGanIndex % 10]
    
    const getShiShen = (targetGan: string) => SHI_SHEN_MAP[dayGan]?.[targetGan] || ""
    
    setBaziResultData({
      name: data.name,
      gender: data.gender,
      lunarDate: lunar.toString(),
      solarDate: solar.toYmd(),
      age: new Date().getFullYear() - data.year,
      siZhu: {
        year: { gan: yearGan, zhi: yearZhi, shiShen: getShiShen(yearGan), cangGan: CANG_GAN[yearZhi] || [], naYin: NA_YIN[yearGan + yearZhi] || "" },
        month: { gan: monthGan, zhi: monthZhi, shiShen: getShiShen(monthGan), cangGan: CANG_GAN[monthZhi] || [], naYin: NA_YIN[monthGan + monthZhi] || "" },
        day: { gan: dayGan, zhi: dayZhi, shiShen: "日主", cangGan: CANG_GAN[dayZhi] || [], naYin: NA_YIN[dayGan + dayZhi] || "" },
        hour: { gan: hourGan, zhi: hourZhi, shiShen: getShiShen(hourGan), cangGan: CANG_GAN[hourZhi] || [], naYin: NA_YIN[hourGan + hourZhi] || "" },
      },
    })
    
    setShowBaziInput(false)
  }

  const handleBackToInput = () => {
    setShowBaziInput(true)
    setBaziResultData(null)
  }

  const calculateQimen = () => {
    try {
      const solar = Solar.fromYmd(formData.year, formData.month, formData.day)
      const lunar = solar.getLunar()
      
      const jieQi = lunar.getPrevJieQi()
      const jieQiName = jieQi?.getName() || ""
      
      const yangDunJieQi = ["冬至", "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种"]
      const isYangDun = yangDunJieQi.some(jq => jieQiName.includes(jq.substring(0, 2)))
      
      const shiChenIndex = Math.floor((formData.hour + 1) % 24 / 2)
      const juShu = isYangDun ? ((shiChenIndex % 9) + 1) : (9 - (shiChenIndex % 9))
      
      const zhiFuIndex = (juShu - 1) % 9
      const zhiFu = JIU_XING[zhiFuIndex]
      const zhiShi = BA_MEN[zhiFuIndex % 8]
      
      const jiuGong = Array.from({ length: 9 }, (_, i) => {
        const pos = ["坎一", "坤二", "震三", "巽四", "中五", "乾六", "兑七", "艮八", "离九"][i]
        const tianPanIndex = qimenMode === "zhuan" ? (i + juShu - 1) % 9 : i
        const diPanIndex = i
        
        return {
          position: pos,
          tianPan: SAN_QI_LIU_YI[tianPanIndex % 9],
          diPan: SAN_QI_LIU_YI[diPanIndex % 9],
          men: BA_MEN[i % 8],
          xing: JIU_XING[i],
          shen: BA_SHEN_YANG[i % 8],
        }
      })
      
      setQimenResult({
        isYangDun,
        juShu,
        zhiFu,
        zhiShi,
        jiuGong,
        jieQi: jieQiName,
      })
    } catch (error) {
      console.error("奇门计算错误:", error)
    }
  }

  const shakeLiuYao = () => {
    setIsShaking(true)
    
    setTimeout(() => {
      const yaos = Array.from({ length: 6 }, () => {
        const coins = Array.from({ length: 3 }, () => Math.random() > 0.5 ? 3 : 2)
        const sum = coins.reduce((a, b) => a + b, 0)
        return { value: sum, isYang: sum === 7 || sum === 9, isChanging: sum === 6 || sum === 9 }
      })
      
      const benGuaBin = yaos.map(y => y.isYang ? "1" : "0").join("")
      const bianGuaBin = yaos.map(y => {
        if (y.isChanging) return y.isYang ? "0" : "1"
        return y.isYang ? "1" : "0"
      }).join("")
      
      const benGua = GUA_64[benGuaBin] || GUA_64["111111"]
      const bianGua = yaos.some(y => y.isChanging) ? (GUA_64[bianGuaBin] || GUA_64["000000"]) : null
      
      const shiYao = 3
      const yingYao = 6
      
      const guaMap: Record<string, string> = {
        "111": "乾", "000": "坤", "100": "震", "011": "巽",
        "010": "坎", "101": "离", "001": "艮", "110": "兑"
      }
      const upperGuaName = guaMap[benGuaBin.slice(3, 6)] || "乾"
      const lowerGuaName = guaMap[benGuaBin.slice(0, 3)] || "坤"
      
      const naJia = yaos.map((_, i) => {
        const isUpper = i >= 3
        const guaName = isUpper ? upperGuaName : lowerGuaName
        const guaNaJia = BA_GUA_NA_JIA[guaName]
        if (!guaNaJia) return "甲子"
        const gan = guaNaJia.gan[0]
        const zhiIndex = isUpper ? i - 3 : i
        const zhi = guaNaJia.zhi[zhiIndex] || "子"
        return gan + zhi
      })
      
      const diZhiWuXing: Record<string, string> = {
        子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
        午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
      }
      const guaWuXingMap: Record<string, string> = {
        乾: "金", 兑: "金", 离: "火", 震: "木", 巽: "木", 坎: "水", 艮: "土", 坤: "土"
      }
      const benGuaWuXing = guaWuXingMap[upperGuaName] || "土"
      const liuQin = naJia.map((nj) => {
        const zhi = nj[1]
        const yaoWuXing = diZhiWuXing[zhi] || "土"
        return getLiuQin(benGuaWuXing, yaoWuXing)
      })
      
      setLiuyaoResult({
        yaos,
        benGua,
        bianGua,
        shiYao,
        yingYao,
        naJia,
        liuQin,
        liuShou: LIU_SHOU,
      })
      setIsShaking(false)
    }, 1500)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] overflow-y-auto">
      {subTab === "bazi" && showBaziInput && (
        <BaziInputForm onCalculate={handleBaziCalculate} />
      )}

      {subTab === "bazi" && !showBaziInput && baziResultData && (
        <BaziResult result={baziResultData} onBack={handleBackToInput} />
      )}

      {subTab !== "bazi" && (
        <div className="min-h-[calc(100vh-4rem)] bg-[#f5f5f0] pb-24">
          <div className="text-center py-4 px-4">
            <div className="inline-flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#d4af37]/30">
              <Compass className="w-5 h-5 text-[#d4af37]" strokeWidth={1.5} />
            </div>
            <h1 className="text-lg font-semibold text-[#f5f5f7] tracking-wider">排盘系统</h1>
          </div>

          <div className="flex justify-center gap-2 px-4 mb-4">
            {[
              { id: "bazi", label: "八字子平" },
              { id: "qimen", label: "奇门遁甲" },
              { id: "liuyao", label: "六爻纳甲" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as SubTab)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  subTab === tab.id
                    ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50"
                    : "bg-[#252525] text-[#888] border border-[#333]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="px-4 mb-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {PAIPAN_TOOLS.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => onNavigateToTool?.(tool.id)}
                  className="flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2 bg-[#252525] rounded-xl border border-[#333] hover:border-[#d4af37]/50 transition-all"
                >
                  <tool.icon className="w-5 h-5" style={{ color: tool.color }} />
                  <span className="text-xs text-[#888]">{tool.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 mb-4">
            <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/20 p-4">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#333]">
                <div className="w-1 h-3 bg-[#d4af37] rounded-full" />
                <span className="text-[#f5f5f7] text-sm font-medium">生辰信息</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="姓名（选填）"
                  className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-[#f5f5f7] text-sm placeholder:text-[#555] focus:outline-none focus:border-[#d4af37]/50"
                />
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg text-xs bg-[#c8102e] text-[#f5f5f7]">
                    乾造
                  </button>
                  <button className="flex-1 py-2 rounded-lg text-xs bg-[#1a1a1a] text-[#888] border border-[#333]">
                    坤造
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mb-3">
                <button className="flex-1 py-2 rounded-lg text-xs bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50">
                  公历
                </button>
                <button className="flex-1 py-2 rounded-lg text-xs bg-[#1a1a1a] text-[#888] border border-[#333]">
                  农历
                </button>
              </div>

              <div className="flex gap-2 mb-3">
                <button className="flex-1 py-3 bg-[#c8102e] text-[#f5f5f7] font-medium text-sm rounded-lg" onClick={subTab === "qimen" ? calculateQimen : shakeLiuYao}>
                  {subTab === "qimen" ? "起局" : "摇卦起卦"}
                </button>
              </div>
            </div>
          </div>

          {subTab === "qimen" && qimenResult && (
            <div className="px-4 space-y-4">
              <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/30 p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-[#d4af37] text-sm font-medium">
                    {qimenResult.isYangDun ? "阳遁" : "阴遁"}{qimenResult.juShu}局
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setQimenMode("zhuan")} className="px-3 py-1 rounded text-xs" style={qimenMode === "zhuan" ? { backgroundColor: "rgba(212, 175, 60, 0.2)", color: "#d4af37" } : { backgroundColor: "#1a1a1a", color: "#888" }}>
                      转盘
                    </button>
                    <button onClick={() => setQimenMode("fei")} className="px-3 py-1 rounded text-xs" style={qimenMode === "fei" ? { backgroundColor: "rgba(212, 175, 60, 0.2)", color: "#d4af37" } : { backgroundColor: "#1a1a1a", color: "#888" }}>
                      飞盘
                    </button>
                  </div>
                </div>
                <div className="flex justify-around text-center text-sm">
                  <div>
                    <div className="text-[#888] text-xs">值符</div>
                    <div className="text-[#f5f5f7]">{qimenResult.zhiFu}</div>
                  </div>
                  <div>
                    <div className="text-[#888] text-xs">值使</div>
                    <div className="text-[#f5f5f7]">{qimenResult.zhiShi}</div>
                  </div>
                  <div>
                    <div className="text-[#888] text-xs">节气</div>
                    <div className="text-[#f5f5f7]">{qimenResult.jieQi || "未知"}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/30 p-3">
                <div className="text-center text-[#d4af37] text-sm mb-3 font-medium">【 九宫奇门盘 】</div>
                <div className="grid grid-cols-3 gap-1">
                  {[3, 8, 1, 2, 4, 6, 7, 0, 5].map((idx) => {
                    const gong = qimenResult.jiuGong[idx]
                    return (
                      <div key={idx} className="bg-[#1a1a1a] rounded-lg p-2 text-center border border-[#333] min-h-[80px]">
                        <div className="text-[#d4af37] text-xs mb-1">{gong.shen}</div>
                        <div className="text-[#f5f5f7] text-sm font-bold">{gong.men}</div>
                        <div className="text-[#888] text-xs">{gong.xing}</div>
                        <div className="flex justify-center gap-1 mt-1">
                          <span className="text-[#22c55e] text-xs">{gong.tianPan}</span>
                          <span className="text-[#888] text-xs">/</span>
                          <span className="text-[#3b82f6] text-xs">{gong.diPan}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {subTab === "liuyao" && liuyaoResult && (
            <div className="px-4 space-y-4">
              <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/30 p-4 text-center">
                <div className="text-[#d4af37] text-xl font-bold mb-2">{liuyaoResult.benGua.name}</div>
                {liuyaoResult.bianGua && (
                  <div className="text-[#888] text-sm">之 <span className="text-[#c8102e]">{liuyaoResult.bianGua.name}</span></div>
                )}
              </div>

              <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/30 p-4">
                <div className="space-y-2">
                  {[...liuyaoResult.yaos].reverse().map((yao: any, i: number) => {
                    const yaoIndex = 5 - i
                    const isShiYao = yaoIndex + 1 === liuyaoResult.shiYao
                    const isYingYao = yaoIndex + 1 === liuyaoResult.yingYao
                    
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-12 text-xs text-[#d4af37]">{liuyaoResult.liuShou[yaoIndex]}</div>
                        <div className="w-12 text-xs text-[#888]">{liuyaoResult.liuQin[yaoIndex]}</div>
                        <div className="flex-1 flex justify-center gap-2">
                          {yao.isYang ? (
                            <div className="flex-1 h-3 bg-[#d4af37] rounded" />
                          ) : (
                            <>
                              <div className="flex-1 h-3 bg-[#d4af37] rounded" />
                              <div className="w-4" />
                              <div className="flex-1 h-3 bg-[#d4af37] rounded" />
                            </>
                          )}
                          {yao.isChanging && <span className="text-[#c8102e] text-xs ml-1">×</span>}
                        </div>
                        <div className="w-12 text-xs text-[#f5f5f7] text-right">{liuyaoResult.naJia[yaoIndex]}</div>
                        <div className="w-6 text-xs">
                          {isShiYao && <span className="text-[#22c55e]">世</span>}
                          {isYingYao && <span className="text-[#3b82f6]">应</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <button className="w-full py-3 rounded-lg bg-[#252525] border border-[#d4af37]/30 text-[#d4af37] text-sm">
                重新起卦
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}