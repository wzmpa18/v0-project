"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Compass, MapPin, Check, ChevronLeft, ChevronRight, Shuffle, RotateCcw, Star, Grid3X3, Hexagon, Calendar, Mountain } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"
import { SHEN_SHA, checkShenSha } from "@/lib/bazi-data"
import { BA_MEN, JIU_XING, BA_SHEN_YANG, SAN_QI_LIU_YI } from "@/lib/qimen-data"
import { GUA_64, LIU_SHOU, getLiuQin, BA_GUA_NA_JIA } from "@/lib/liuyao-data"
import { BaziResult } from "@/components/bazi/bazi-result"
import { calculateBaziByCommercialKernel } from "@/lib/yixue/bazi-engine"
import { LIU_WENYUAN_PROFILE } from "@/lib/yixue/liu-wenyuan-profile"

// 天干
const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
// 地支
const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
// 时辰对应
const SHI_CHEN = [
  { name: "子时", range: "23:00-01:00", hours: [23, 0] },
  { name: "丑时", range: "01:00-03:00", hours: [1, 2] },
  { name: "寅时", range: "03:00-05:00", hours: [3, 4] },
  { name: "卯时", range: "05:00-07:00", hours: [5, 6] },
  { name: "辰时", range: "07:00-09:00", hours: [7, 8] },
  { name: "巳时", range: "09:00-11:00", hours: [9, 10] },
  { name: "午时", range: "11:00-13:00", hours: [11, 12] },
  { name: "未时", range: "13:00-15:00", hours: [13, 14] },
  { name: "申时", range: "15:00-17:00", hours: [15, 16] },
  { name: "酉时", range: "17:00-19:00", hours: [17, 18] },
  { name: "戌时", range: "19:00-21:00", hours: [19, 20] },
  { name: "亥时", range: "21:00-23:00", hours: [21, 22] },
]

// 十神
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

// 藏干表
const CANG_GAN: Record<string, string[]> = {
  "子": ["癸"], "丑": ["己", "癸", "辛"], "寅": ["甲", "丙", "戊"], "卯": ["乙"],
  "辰": ["戊", "乙", "癸"], "巳": ["丙", "庚", "戊"], "午": ["丁", "己"], "未": ["己", "丁", "乙"],
  "申": ["庚", "壬", "戊"], "酉": ["辛"], "戌": ["戊", "辛", "丁"], "亥": ["壬", "甲"],
}

// 纳音五行
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

// 五行属性映射
const TIAN_GAN_WUXING: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水",
}

const DI_ZHI_WUXING: Record<string, string> = {
  "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水",
}

// 五行颜色
const WUXING_COLOR: Record<string, string> = {
  "木": "#22c55e", "火": "#ef4444", "土": "#d97706", "金": "#eab308", "水": "#3b82f6",
}

const getWuxingColor = (char: string): string => {
  const wuxing = TIAN_GAN_WUXING[char] || DI_ZHI_WUXING[char]
  return WUXING_COLOR[wuxing] || "#f5f5f7"
}

// 表单选项
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 120 }, (_, i) => currentYear - i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const hours = Array.from({ length: 24 }, (_, i) => i)

interface BaZiResult {
  yearGan: string; yearZhi: string; monthGan: string; monthZhi: string
  dayGan: string; dayZhi: string; hourGan: string; hourZhi: string
  yearNaYin: string; monthNaYin: string; dayNaYin: string; hourNaYin: string
  yearCangGan: string[]; monthCangGan: string[]; dayCangGan: string[]; hourCangGan: string[]
  yearShiShen: string; monthShiShen: string; dayShiShen: string; hourShiShen: string
  daYun: Array<{ age: number; gan: string; zhi: string }>
  qiYunAge: number
  wuxingScore: Record<string, number>
  taiYuan: string  // 胎元
  mingGong: string  // 命宫
  shenGong: string  // 身宫
  kongWang: string[]  // 空亡
  shenSha: string[]  // 神煞
}

// 子标签类型
type SubTab = "bazi" | "qimen" | "liuyao"

// 排盘工具快捷入口
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
  // 子标签
  const [subTab, setSubTab] = useState<SubTab>("bazi")
  
  // 表单状态
  const [name, setName] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [calendarType, setCalendarType] = useState<"solar" | "lunar">("solar")
  const [year, setYear] = useState(1990)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [hour, setHour] = useState(12)
  const [lateZiShi, setLateZiShi] = useState(false)
  const [useTrueSolarTime, setUseTrueSolarTime] = useState(false)
  const [birthCity, setBirthCity] = useState("")
  
  // 计算结果
  const [baziResult, setBaziResult] = useState<BaZiResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showDetailResult, setShowDetailResult] = useState(false)
  const [detailResultData, setDetailResultData] = useState<any>(null)
  
  // 奇门结果
  const [qimenResult, setQimenResult] = useState<any>(null)
  const [qimenMode, setQimenMode] = useState<"zhuan" | "fei">("zhuan")
  
  // 六爻结果
  const [liuyaoResult, setLiuyaoResult] = useState<any>(null)
  const [isShaking, setIsShaking] = useState(false)

  const daYunRef = useRef<HTMLDivElement>(null)

  const maxDays = useMemo(() => {
    if (calendarType === "lunar") return 30
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31
    if ([4, 6, 9, 11].includes(month)) return 30
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    return isLeapYear ? 29 : 28
  }, [year, month, calendarType])

  const getShiShen = (dayGan: string, targetGan: string): string => {
    return SHI_SHEN_MAP[dayGan]?.[targetGan] || ""
  }

  const calculateWuxingScore = (result: Partial<BaZiResult>): Record<string, number> => {
    const score: Record<string, number> = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 }
    const gans = [result.yearGan, result.monthGan, result.dayGan, result.hourGan]
    gans.forEach(gan => { if (gan && TIAN_GAN_WUXING[gan]) score[TIAN_GAN_WUXING[gan]] += 2 })
    const zhis = [result.yearZhi, result.monthZhi, result.dayZhi, result.hourZhi]
    zhis.forEach(zhi => { if (zhi && DI_ZHI_WUXING[zhi]) score[DI_ZHI_WUXING[zhi]] += 2 })
    const allCangGan = [...(result.yearCangGan || []), ...(result.monthCangGan || []), ...(result.dayCangGan || []), ...(result.hourCangGan || [])]
    allCangGan.forEach(gan => { if (TIAN_GAN_WUXING[gan]) score[TIAN_GAN_WUXING[gan]] += 1 })
    return score
  }

  // 计算胎元
  const calcTaiYuan = (monthGan: string, monthZhi: string): string => {
    const ganIndex = TIAN_GAN.indexOf(monthGan)
    const zhiIndex = DI_ZHI.indexOf(monthZhi)
    const newGan = TIAN_GAN[(ganIndex + 1) % 10]
    const newZhi = DI_ZHI[(zhiIndex + 3) % 12]
    return newGan + newZhi
  }

  // 计算命宫
  const calcMingGong = (monthZhi: string, hourZhi: string): string => {
    const monthIndex = DI_ZHI.indexOf(monthZhi)
    const hourIndex = DI_ZHI.indexOf(hourZhi)
    const mingIndex = (14 - monthIndex - hourIndex + 12) % 12
    const ganBase = (year - 4) % 10
    const mingGan = TIAN_GAN[(ganBase * 2 + mingIndex) % 10]
    return mingGan + DI_ZHI[mingIndex]
  }

  // 计算身宫
  const calcShenGong = (monthZhi: string, hourZhi: string): string => {
    const monthIndex = DI_ZHI.indexOf(monthZhi)
    const hourIndex = DI_ZHI.indexOf(hourZhi)
    const shenIndex = (monthIndex + hourIndex + 2) % 12
    const ganBase = (year - 4) % 10
    const shenGan = TIAN_GAN[(ganBase * 2 + shenIndex) % 10]
    return shenGan + DI_ZHI[shenIndex]
  }

  // 计算空亡
  const calcKongWang = (dayGan: string, dayZhi: string): string[] => {
    const ganIndex = TIAN_GAN.indexOf(dayGan)
    const zhiIndex = DI_ZHI.indexOf(dayZhi)
    const xunIndex = Math.floor((zhiIndex - ganIndex + 12) % 12 / 2) * 2
    const kong1 = DI_ZHI[(10 + xunIndex) % 12]
    const kong2 = DI_ZHI[(11 + xunIndex) % 12]
    return [kong1, kong2]
  }

  // 计算神煞（使用库函数）
  const calcShenSha = (bazi: { yearGan: string, yearZhi: string, monthGan: string, monthZhi: string, dayGan: string, dayZhi: string, hourGan: string, hourZhi: string }): string[] => {
    const result = checkShenSha(bazi)
    return result.length > 0 ? result : ["无特殊神煞"]
  }

  // 计算八字（商用内核：缘份居API优先，本地开源引擎回退）
  const calculateBaZi = async () => {
    setIsCalculating(true)
    
    try {
      const kernelResult = await calculateBaziByCommercialKernel({
        name,
        gender,
        calendarType,
        year,
        month,
        day,
        hour,
        useTrueSolarTime,
        birthCity,
      })

      const yearGan = kernelResult.siZhu.year.gan
      const yearZhi = kernelResult.siZhu.year.zhi
      const monthGan = kernelResult.siZhu.month.gan
      const monthZhi = kernelResult.siZhu.month.zhi
      const dayGan = kernelResult.siZhu.day.gan
      const dayZhi = kernelResult.siZhu.day.zhi
      const hourGan = kernelResult.siZhu.hour.gan
      const hourZhi = kernelResult.siZhu.hour.zhi

      const flatShenSha = [
        ...(kernelResult.shenSha.year || []),
        ...(kernelResult.shenSha.month || []),
        ...(kernelResult.shenSha.day || []),
        ...(kernelResult.shenSha.hour || []),
      ]

      const daYun = kernelResult.daYun.map((dy) => ({
        age: dy.age,
        gan: dy.gan,
        zhi: dy.zhi,
      }))

      const baseResult = {
        yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi,
        yearNaYin: kernelResult.siZhu.year.naYin,
        monthNaYin: kernelResult.siZhu.month.naYin,
        dayNaYin: kernelResult.siZhu.day.naYin,
        hourNaYin: kernelResult.siZhu.hour.naYin,
        yearCangGan: kernelResult.siZhu.year.cangGan,
        monthCangGan: kernelResult.siZhu.month.cangGan,
        dayCangGan: kernelResult.siZhu.day.cangGan,
        hourCangGan: kernelResult.siZhu.hour.cangGan,
        yearShiShen: kernelResult.siZhu.year.shiShen,
        monthShiShen: kernelResult.siZhu.month.shiShen,
        dayShiShen: kernelResult.siZhu.day.shiShen,
        hourShiShen: kernelResult.siZhu.hour.shiShen,
        daYun,
        qiYunAge: daYun[0]?.age || 0,
        taiYuan: kernelResult.taiYuan,
        mingGong: kernelResult.mingGong,
        shenGong: kernelResult.shenGong,
        kongWang: kernelResult.kongWang,
        shenSha: flatShenSha,
      }
      
      setBaziResult({
        ...baseResult,
        wuxingScore: calculateWuxingScore(baseResult),
      })
      
      // 设置详情结果数据用于新的结果页面
      const currentYear = new Date().getFullYear()
      const age = currentYear - year
      setDetailResultData({
        name,
        gender,
        lunarDate: kernelResult.lunarDate,
        solarDate: kernelResult.solarDate,
        trueSolarTime: kernelResult.trueSolarTime,
        siZhu: kernelResult.siZhu,
        taiYuan: kernelResult.taiYuan,
        mingGong: kernelResult.mingGong,
        shenGong: kernelResult.shenGong,
        kongWang: kernelResult.kongWang,
        shenSha: kernelResult.shenSha,
        daYun,
        jieQi: "按内核返回节气推算",
        age,
        kernel: kernelResult.kernel,
        ruleSetVersion: kernelResult.ruleSetVersion,
        theory: LIU_WENYUAN_PROFILE.displayName,
      })
      setShowDetailResult(true)
    } catch (error) {
      console.error("计算错误:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  // 计算奇门遁甲
  const calculateQimen = () => {
    try {
      const solar = Solar.fromYmd(year, month, day)
      const lunar = solar.getLunar()
      
      // 获取节气判断阴阳遁
      const jieQi = lunar.getPrevJieQi()
      const jieQiName = jieQi?.getName() || ""
      
      // 简化局数计算（实际应根据节气精确计算）
      const yangDunJieQi = ["冬至", "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "�����"]
      const isYangDun = yangDunJieQi.some(jq => jieQiName.includes(jq.substring(0, 2)))
      
      // 根据时辰计算局数（简化版）
      const shiChenIndex = Math.floor((hour + 1) % 24 / 2)
      const juShu = isYangDun ? ((shiChenIndex % 9) + 1) : (9 - (shiChenIndex % 9))
      
      // 计算值符值使
      const zhiFuIndex = (juShu - 1) % 9
      const zhiFu = JIU_XING[zhiFuIndex]
      const zhiShi = BA_MEN[zhiFuIndex % 8]
      
      // 生成九宫格数据
      const jiuGong = Array.from({ length: 9 }, (_, i) => {
        const pos = i === 4 ? "中宫" : ["坎一", "坤二", "震三", "巽四", "中五", "乾六", "兑七", "艮八", "离九"][i]
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

  // 六爻起卦
  const shakeLiuYao = () => {
    setIsShaking(true)
    
    setTimeout(() => {
      // 生成六个爻
      const yaos = Array.from({ length: 6 }, () => {
        const coins = Array.from({ length: 3 }, () => Math.random() > 0.5 ? 3 : 2)
        const sum = coins.reduce((a, b) => a + b, 0)
        // 6=老阴(变), 7=少阳, 8=少阴, 9=老阳(变)
        return { value: sum, isYang: sum === 7 || sum === 9, isChanging: sum === 6 || sum === 9 }
      })
      
      // 计算本卦和变卦
      const benGuaBin = yaos.map(y => y.isYang ? "1" : "0").join("")
      const bianGuaBin = yaos.map(y => {
        if (y.isChanging) return y.isYang ? "0" : "1"
        return y.isYang ? "1" : "0"
      }).join("")
      
      // 匹配卦名 - 使用二进制字符串作为键
      const benGua = GUA_64[benGuaBin] || GUA_64["111111"] // 默认乾卦
      const bianGua = yaos.some(y => y.isChanging) ? (GUA_64[bianGuaBin] || GUA_64["000000"]) : null
      
      // 计算世应（根据上下卦关系）
      const upperBin = benGuaBin.slice(3, 6)
      const lowerBin = benGuaBin.slice(0, 3)
      let shiYao = 1
      if (upperBin === lowerBin) {
        shiYao = 6 // 纯卦世在上
      } else {
        // 简化计算：比较上下卦差异位置
        for (let i = 0; i < 3; i++) {
          if (upperBin[i] !== lowerBin[i]) {
            shiYao = i + 4
            break
          }
        }
      }
      const yingYao = shiYao <= 3 ? shiYao + 3 : shiYao - 3
      
      // 纳甲干支（基于八卦纳甲规则）
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
      
      // 六亲 - 基于日干五行与各爻地支五行生克
      const diZhiWuXing: Record<string, string> = {
        子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
        午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
      }
      // 用上卦的五行作为本卦五行属性
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

  const getShiChenName = (h: number) => {
    const index = Math.floor((h + 1) % 24 / 2)
    return SHI_CHEN[index]?.name || ""
  }

  const scrollDaYun = (direction: 'left' | 'right') => {
    if (daYunRef.current) {
      daYunRef.current.scrollBy({ left: direction === 'left' ? -150 : 150, behavior: 'smooth' })
    }
  }

  const getWuxingComment = (score: Record<string, number>) => {
    const total = Object.values(score).reduce((a, b) => a + b, 0)
    const sorted = Object.entries(score).sort((a, b) => b[1] - a[1])
    const strongest = sorted[0]
    const weakest = sorted[sorted.length - 1]
    const strongPercent = Math.round((strongest[1] / total) * 100)
    const weakPercent = Math.round((weakest[1] / total) * 100)
    
    if (strongPercent > 35) {
      const keMap: Record<string, string> = { "木": "金", "火": "水", "土": "木", "金": "火", "水": "土" }
      return `${strongest[0]}气过旺，宜以${keMap[strongest[0]]}克之`
    } else if (weakPercent < 10) {
      return `${weakest[0]}气偏弱，宜补${weakest[0]}以助运势`
    }
    return "五行较为均衡，气运平和"
  }

  // 大运吉凶
  const DAYUN_FORTUNE = ["吉", "平", "凶", "吉", "平", "吉", "凶", "平", "吉", "平"]

  return (
    <>
      {/* 八字详情结果页面 */}
      {showDetailResult && detailResultData && (
        <BaziResult
          result={detailResultData}
          onBack={() => setShowDetailResult(false)}
        />
      )}
      
      {/* 主页面 */}
      {!showDetailResult && (
    <div className="min-h-[calc(100vh-4rem)] pb-24 overflow-y-auto">
      {/* 页面标题 */}
      <div className="text-center py-4 px-4">
        <div className="inline-flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#d4af37]/30">
          <Compass className="w-5 h-5 text-[#d4af37]" strokeWidth={1.5} />
        </div>
        <h1 className="text-lg font-semibold text-[#f5f5f7] tracking-wider">排盘系统</h1>
      </div>

      {/* 子标签切换 */}
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

      {/* 排盘工具快捷入口 */}
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

      {/* 输入表单 */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/20 p-4">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#333]">
            <div className="w-1 h-3 bg-[#d4af37] rounded-full" />
            <span className="text-[#f5f5f7] text-sm font-medium">生辰信息</span>
          </div>

          {/* 姓名和性别 */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="姓名（选填）"
              className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-[#f5f5f7] text-sm placeholder:text-[#555] focus:outline-none focus:border-[#d4af37]/50"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-2 rounded-lg text-xs transition-all ${
                  gender === "male" ? "bg-[#c8102e] text-[#f5f5f7]" : "bg-[#1a1a1a] text-[#888] border border-[#333]"
                }`}
              >
                乾造
              </button>
              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-2 rounded-lg text-xs transition-all ${
                  gender === "female" ? "bg-[#c8102e] text-[#f5f5f7]" : "bg-[#1a1a1a] text-[#888] border border-[#333]"
                }`}
              >
                坤造
              </button>
            </div>
          </div>

          {/* 历法切换 */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setCalendarType("solar")}
              className={`flex-1 py-2 rounded-lg text-xs transition-all ${
                calendarType === "solar" ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50" : "bg-[#1a1a1a] text-[#888] border border-[#333]"
              }`}
            >
              公历
            </button>
            <button
              onClick={() => setCalendarType("lunar")}
              className={`flex-1 py-2 rounded-lg text-xs transition-all ${
                calendarType === "lunar" ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50" : "bg-[#1a1a1a] text-[#888] border border-[#333]"
              }`}
            >
              农历
            </button>
          </div>

          {/* 年月日时 */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="bg-[#1a1a1a] border border-[#333] rounded-lg px-2 py-2.5 text-[#f5f5f7] text-xs focus:outline-none">
              {years.map((y) => <option key={y} value={y}>{y}年</option>)}
            </select>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="bg-[#1a1a1a] border border-[#333] rounded-lg px-2 py-2.5 text-[#f5f5f7] text-xs focus:outline-none">
              {months.map((m) => <option key={m} value={m}>{m}月</option>)}
            </select>
            <select value={day} onChange={(e) => setDay(Number(e.target.value))} className="bg-[#1a1a1a] border border-[#333] rounded-lg px-2 py-2.5 text-[#f5f5f7] text-xs focus:outline-none">
              {days.slice(0, maxDays).map((d) => <option key={d} value={d}>{d}日</option>)}
            </select>
            <select value={hour} onChange={(e) => setHour(Number(e.target.value))} className="bg-[#1a1a1a] border border-[#333] rounded-lg px-2 py-2.5 text-[#f5f5f7] text-xs focus:outline-none">
              {hours.map((h) => <option key={h} value={h}>{h}时</option>)}
            </select>
          </div>

          {/* 选项 */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs">
            <button onClick={() => setLateZiShi(!lateZiShi)} className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${lateZiShi ? "bg-[#d4af37] border-[#d4af37]" : "border-[#555]"}`}>
                {lateZiShi && <Check className="w-2.5 h-2.5 text-[#1a1a1a]" />}
              </div>
              <span className="text-[#888]">区分早晚子时</span>
            </button>
            <button onClick={() => setUseTrueSolarTime(!useTrueSolarTime)} className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${useTrueSolarTime ? "bg-[#d4af37] border-[#d4af37]" : "border-[#555]"}`}>
                {useTrueSolarTime && <Check className="w-2.5 h-2.5 text-[#1a1a1a]" />}
              </div>
              <span className="text-[#888]">真太阳时</span>
            </button>
          </div>

          {useTrueSolarTime && (
            <div className="mb-4 flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2 border border-[#333]">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <input type="text" value={birthCity} onChange={(e) => setBirthCity(e.target.value)} placeholder="出生城市" className="flex-1 bg-transparent text-[#f5f5f7] text-sm placeholder:text-[#555] focus:outline-none" />
            </div>
          )}

          {/* 计算按钮 */}
          <button
            onClick={() => {
              if (subTab === "bazi") calculateBaZi()
              else if (subTab === "qimen") calculateQimen()
              else if (subTab === "liuyao") shakeLiuYao()
            }}
            disabled={isCalculating || isShaking}
            className="w-full py-3 rounded-lg bg-[#c8102e] text-[#f5f5f7] font-medium text-sm shadow-lg shadow-[#c8102e]/30 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {isCalculating || isShaking ? "计算中..." : subTab === "liuyao" ? "摇卦起卦" : "实时排盘"}
          </button>
        </div>
      </div>

      {/* 八字结果 */}
      {subTab === "bazi" && baziResult && (
        <div className="px-4 space-y-4">
          {/* 四柱大表 */}
          <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/30 p-4">
            <div className="text-center text-[#d4af37] text-sm mb-3 font-medium">【 四柱八字 】</div>
            <div className="flex justify-center gap-2">
              {[
                { label: "时柱", gan: baziResult.hourGan, zhi: baziResult.hourZhi, shiShen: baziResult.hourShiShen, cangGan: baziResult.hourCangGan, naYin: baziResult.hourNaYin },
                { label: "日柱", gan: baziResult.dayGan, zhi: baziResult.dayZhi, shiShen: baziResult.dayShiShen, cangGan: baziResult.dayCangGan, naYin: baziResult.dayNaYin },
                { label: "月柱", gan: baziResult.monthGan, zhi: baziResult.monthZhi, shiShen: baziResult.monthShiShen, cangGan: baziResult.monthCangGan, naYin: baziResult.monthNaYin },
                { label: "年柱", gan: baziResult.yearGan, zhi: baziResult.yearZhi, shiShen: baziResult.yearShiShen, cangGan: baziResult.yearCangGan, naYin: baziResult.yearNaYin },
              ].map((zhu, i) => (
                <div key={i} className="flex-1 text-center">
                  <div className="text-[#888] text-xs mb-2">{zhu.label}</div>
                  <div className="text-[#d4af37] text-xs mb-1">{zhu.shiShen}</div>
                  <div className="bg-[#1a1a1a] rounded-lg py-3 border border-[#333] mb-2">
                    <div className="text-2xl font-bold mb-1" style={{ color: getWuxingColor(zhu.gan) }}>{zhu.gan}</div>
                    <div className="text-2xl font-bold" style={{ color: getWuxingColor(zhu.zhi) }}>{zhu.zhi}</div>
                  </div>
                  <div className="text-[#888] text-xs mb-1">{zhu.cangGan.map((g, j) => <span key={j} style={{ color: getWuxingColor(g) }}>{g}</span>)}</div>
                  <div className="text-[#555] text-xs">{zhu.naYin}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 胎元命宫身宫空亡 */}
          <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/20 p-4">
            <div className="grid grid-cols-4 gap-3 text-center text-sm">
              <div>
                <div className="text-[#888] text-xs mb-1">胎元</div>
                <div className="text-[#d4af37] font-medium">{baziResult.taiYuan}</div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-1">命宫</div>
                <div className="text-[#d4af37] font-medium">{baziResult.mingGong}</div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-1">身宫</div>
                <div className="text-[#d4af37] font-medium">{baziResult.shenGong}</div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-1">空亡</div>
                <div className="text-[#c8102e] font-medium">{baziResult.kongWang.join(" ")}</div>
              </div>
            </div>
          </div>

          {/* 神煞 */}
          <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/20 p-4">
            <div className="text-[#888] text-xs mb-2">神煞</div>
            <div className="flex flex-wrap gap-2">
              {baziResult.shenSha.map((sha, i) => (
                <span key={i} className="px-2 py-1 bg-[#1a1a1a] rounded text-xs text-[#d4af37] border border-[#d4af37]/30">{sha}</span>
              ))}
            </div>
          </div>

          {/* 五行能量 */}
          <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/20 p-4">
            <div className="text-[#888] text-xs mb-3">五行力量</div>
            {Object.entries(baziResult.wuxingScore).map(([wx, score]) => {
              const total = Object.values(baziResult.wuxingScore).reduce((a, b) => a + b, 0)
              const percent = Math.round((score / total) * 100)
              return (
                <div key={wx} className="flex items-center gap-2 mb-2">
                  <span className="w-6 text-sm" style={{ color: WUXING_COLOR[wx] }}>{wx}</span>
                  <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#d4af37] to-[#c8102e] rounded-full transition-all" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="w-10 text-xs text-[#888] text-right">{percent}%</span>
                </div>
              )
            })}
            <div className="mt-3 p-2 bg-[#1a1a1a] rounded-lg text-xs text-[#d4af37] italic">「{getWuxingComment(baziResult.wuxingScore)}」</div>
          </div>

          {/* 大运 */}
          <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#888] text-xs">大运流年（{baziResult.qiYunAge}岁起运）</span>
              <div className="flex gap-2">
                <button onClick={() => scrollDaYun('left')} className="w-6 h-6 rounded bg-[#1a1a1a] flex items-center justify-center text-[#888]">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => scrollDaYun('right')} className="w-6 h-6 rounded bg-[#1a1a1a] flex items-center justify-center text-[#888]">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div ref={daYunRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {baziResult.daYun.map((dy, i) => (
                <div key={i} className="flex-shrink-0 w-16 bg-[#1a1a1a] rounded-lg p-2 text-center border border-[#333]">
                  <div className="text-xs text-[#888] mb-1">{dy.age}-{dy.age + 9}岁</div>
                  <div className="text-lg font-bold">
                    <span style={{ color: getWuxingColor(dy.gan) }}>{dy.gan}</span>
                    <span style={{ color: getWuxingColor(dy.zhi) }}>{dy.zhi}</span>
                  </div>
                  <div className={`text-xs mt-1 ${DAYUN_FORTUNE[i] === "吉" ? "text-[#22c55e]" : DAYUN_FORTUNE[i] === "凶" ? "text-[#ef4444]" : "text-[#888]"}`}>
                    {DAYUN_FORTUNE[i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 奇门结果 */}
      {subTab === "qimen" && qimenResult && (
        <div className="px-4 space-y-4">
          {/* 局数信息 */}
          <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/30 p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[#d4af37] text-sm font-medium">
                {qimenResult.isYangDun ? "阳遁" : "阴遁"}{qimenResult.juShu}局
              </div>
              <div className="flex gap-2">
                <button onClick={() => setQimenMode("zhuan")} className={`px-3 py-1 rounded text-xs ${qimenMode === "zhuan" ? "bg-[#d4af37]/20 text-[#d4af37]" : "bg-[#1a1a1a] text-[#888]"}`}>
                  转盘
                </button>
                <button onClick={() => setQimenMode("fei")} className={`px-3 py-1 rounded text-xs ${qimenMode === "fei" ? "bg-[#d4af37]/20 text-[#d4af37]" : "bg-[#1a1a1a] text-[#888]"}`}>
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

          {/* 九宫格 */}
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
            <div className="mt-3 flex justify-center gap-4 text-xs">
              <span className="text-[#22c55e]">天盘</span>
              <span className="text-[#3b82f6]">地盘</span>
            </div>
          </div>
        </div>
      )}

      {/* 六爻结果 */}
      {subTab === "liuyao" && liuyaoResult && (
        <div className="px-4 space-y-4">
          {/* 卦名 */}
          <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/30 p-4 text-center">
            <div className="text-[#d4af37] text-xl font-bold mb-2">{liuyaoResult.benGua.name}</div>
            {liuyaoResult.bianGua && (
              <div className="text-[#888] text-sm">之 <span className="text-[#c8102e]">{liuyaoResult.bianGua.name}</span></div>
            )}
          </div>

          {/* 六爻图 */}
          <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/30 p-4">
            <div className="space-y-2">
              {[...liuyaoResult.yaos].reverse().map((yao: any, i: number) => {
                const yaoIndex = 5 - i
                const isShiYao = yaoIndex + 1 === liuyaoResult.shiYao
                const isYingYao = yaoIndex + 1 === liuyaoResult.yingYao
                
                return (
                  <div key={i} className="flex items-center gap-3">
                    {/* 六兽 */}
                    <div className="w-12 text-xs text-[#d4af37]">{liuyaoResult.liuShou[yaoIndex]}</div>
                    {/* 六亲 */}
                    <div className="w-12 text-xs text-[#888]">{liuyaoResult.liuQin[yaoIndex]}</div>
                    {/* 爻象 */}
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
                    {/* 纳甲 */}
                    <div className="w-12 text-xs text-[#f5f5f7] text-right">{liuyaoResult.naJia[yaoIndex]}</div>
                    {/* 世应 */}
                    <div className="w-6 text-xs">
                      {isShiYao && <span className="text-[#22c55e]">世</span>}
                      {isYingYao && <span className="text-[#3b82f6]">应</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 重新起卦 */}
          <button
            onClick={shakeLiuYao}
            disabled={isShaking}
            className="w-full py-3 rounded-lg bg-[#252525] border border-[#d4af37]/30 text-[#d4af37] text-sm flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            重新起卦
          </button>
        </div>
      )}
    </div>
      )}
    </>
  )
}
