"use client"

import {
  TIANGAN, DIZHI, WUXING, CANGGAN, SHISHEN_MAP, CHANGSHENG, CHANGSHENG_START,
  NAYIN, YEAR_GAN_MONTH_START, DAY_GAN_HOUR_START, SHENGXIAO, SHENSHA_DATA
} from './constants'

export interface BaziPillar {
  gan: string
  zhi: string
}

export interface BaziResult {
  year: BaziPillar
  month: BaziPillar
  day: BaziPillar
  hour: BaziPillar
  // 元信息
  solarDate: string
  lunarDate: string
  shengxiao: string
  gender: "male" | "female"
}

// 节气时间数据（简化版，实际应使用天文算法）
// 这里使用1900-2100年的节气数据查表
const JIEQI_BASE_YEAR = 1900
const JIEQI_DATA: number[][] = [
  // 每年24节气的日期（简化为日期，实际应精确到分钟）
  // 格式：[小寒日, 大寒日, 立春日, ...]
  // 这里需要精确的节气表
]

/**
 * 获取节气时间（简化算法）
 * 实际应用中应使用VSOP87天文算法或查询精确数据表
 */
function getJieqiDate(year: number, jieqiIndex: number): Date {
  // 节气平均间隔约15.22天
  // 这是简化算法，实际节气时间需要精确计算
  const baseDate = new Date(year, 0, 6) // 小寒约在1月6日
  const avgInterval = 15.22
  const dayOffset = jieqiIndex * avgInterval
  return new Date(baseDate.getTime() + dayOffset * 24 * 60 * 60 * 1000)
}

/**
 * 根据公历日期获取对应的节气月份
 */
function getJieqiMonth(year: number, month: number, day: number): number {
  // 节气月：以立春为正月（寅月=1）
  // 立春通常在2月4日左右
  const jieqiMonthDays = [
    { month: 1, jieqi: "小寒", day: 6, monthZhi: 12 },   // 丑月
    { month: 2, jieqi: "立春", day: 4, monthZhi: 1 },    // 寅月
    { month: 3, jieqi: "惊蛰", day: 6, monthZhi: 2 },    // 卯月
    { month: 4, jieqi: "清明", day: 5, monthZhi: 3 },    // 辰月
    { month: 5, jieqi: "立夏", day: 6, monthZhi: 4 },    // 巳月
    { month: 6, jieqi: "芒种", day: 6, monthZhi: 5 },    // 午月
    { month: 7, jieqi: "小暑", day: 7, monthZhi: 6 },    // 未月
    { month: 8, jieqi: "立秋", day: 8, monthZhi: 7 },    // 申月
    { month: 9, jieqi: "白露", day: 8, monthZhi: 8 },    // 酉月
    { month: 10, jieqi: "寒露", day: 8, monthZhi: 9 },   // 戌月
    { month: 11, jieqi: "立冬", day: 8, monthZhi: 10 },  // 亥月
    { month: 12, jieqi: "大雪", day: 7, monthZhi: 11 },  // 子月
  ]
  
  // 找到当前日期所在的节气月
  for (let i = jieqiMonthDays.length - 1; i >= 0; i--) {
    const jq = jieqiMonthDays[i]
    if (month > jq.month || (month === jq.month && day >= jq.day)) {
      return jq.monthZhi
    }
  }
  
  // 如果在小寒之前，属于上一年的丑月
  return 12
}

/**
 * 计算干支历年柱
 * 以立春为界，立春前属于上一年
 */
function getYearPillar(year: number, month: number, day: number): BaziPillar {
  // 判断是否在立春之前
  const lichunMonth = 2
  const lichunDay = 4 // 立春大约在2月4日
  
  let actualYear = year
  if (month < lichunMonth || (month === lichunMonth && day < lichunDay)) {
    actualYear = year - 1
  }
  
  // 计算年干支
  // 以1984年甲子年为基准
  const baseYear = 1984
  const diff = actualYear - baseYear
  const ganIndex = ((diff % 10) + 10) % 10
  const zhiIndex = ((diff % 12) + 12) % 12
  
  return {
    gan: TIANGAN[ganIndex],
    zhi: DIZHI[zhiIndex]
  }
}

/**
 * 计算干支历月柱
 * 以节气为界
 */
function getMonthPillar(yearGan: string, year: number, month: number, day: number): BaziPillar {
  // 获取节气月份
  const jieqiMonth = getJieqiMonth(year, month, day)
  
  // 月支
  const monthZhi = DIZHI[(jieqiMonth + 1) % 12] // 寅月=1对应寅支
  
  // 月干：根据年干推算（年上起月法）
  const yearGanIndex = TIANGAN.indexOf(yearGan)
  const monthGanStartIndex = YEAR_GAN_MONTH_START[yearGan]
  const monthGanIndex = (monthGanStartIndex + jieqiMonth - 1) % 10
  
  return {
    gan: TIANGAN[monthGanIndex],
    zhi: monthZhi
  }
}

/**
 * 计算日柱
 * 使用蔡勒公式的变体
 */
function getDayPillar(year: number, month: number, day: number): BaziPillar {
  // 以1900年1月31日（甲戌日）为基准
  // 计算从基准日到目标日的天数
  const baseDate = new Date(1900, 0, 31) // 1900年1月31日
  const targetDate = new Date(year, month - 1, day)
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (24 * 60 * 60 * 1000))
  
  // 1900年1月31日是甲戌日，甲=0，戌=10
  const baseGanIndex = 0  // 甲
  const baseZhiIndex = 10 // 戌
  
  const ganIndex = ((baseGanIndex + diffDays) % 10 + 10) % 10
  const zhiIndex = ((baseZhiIndex + diffDays) % 12 + 12) % 12
  
  return {
    gan: TIANGAN[ganIndex],
    zhi: DIZHI[zhiIndex]
  }
}

/**
 * 计算时柱
 * 根据日干和时辰
 */
function getHourPillar(dayGan: string, hourIndex: number): BaziPillar {
  // 时支
  const hourZhi = DIZHI[hourIndex]
  
  // 时干：根据日干推算（日上起时法）
  const hourGanStartIndex = DAY_GAN_HOUR_START[dayGan]
  const hourGanIndex = (hourGanStartIndex + hourIndex) % 10
  
  return {
    gan: TIANGAN[hourGanIndex],
    zhi: hourZhi
  }
}

/**
 * 主排盘函数
 */
export function calculateBazi(
  year: number,
  month: number,
  day: number,
  hourIndex: number,
  gender: "male" | "female",
  isLunar: boolean = false
): BaziResult {
  // 如果是农历，需要先转换为公历
  // 这里暂时假设输入的是公历
  let solarYear = year
  let solarMonth = month
  let solarDay = day
  
  // 计算四柱
  const yearPillar = getYearPillar(solarYear, solarMonth, solarDay)
  const monthPillar = getMonthPillar(yearPillar.gan, solarYear, solarMonth, solarDay)
  const dayPillar = getDayPillar(solarYear, solarMonth, solarDay)
  const hourPillar = getHourPillar(dayPillar.gan, hourIndex)
  
  // 生肖
  const shengxiaoIndex = DIZHI.indexOf(yearPillar.zhi)
  const shengxiao = SHENGXIAO[shengxiaoIndex]
  
  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    solarDate: `${solarYear}年${String(solarMonth).padStart(2, '0')}月${String(solarDay).padStart(2, '0')}日`,
    lunarDate: `${solarYear}年${solarMonth}月${solarDay}日`, // 需要农历转换库
    shengxiao,
    gender
  }
}

/**
 * 获取十神
 */
export function getShishen(dayGan: string, targetGan: string): string {
  return SHISHEN_MAP[dayGan]?.[targetGan] || ""
}

/**
 * 获取藏干的十神
 */
export function getCangganShishen(dayGan: string, zhi: string): { gan: string; shishen: string }[] {
  const cangganList = CANGGAN[zhi] || []
  return cangganList.map(gan => ({
    gan,
    shishen: getShishen(dayGan, gan)
  }))
}

/**
 * 获取十二长生
 */
export function getChangsheng(dayGan: string, zhi: string): string {
  const config = CHANGSHENG_START[dayGan]
  if (!config) return ""
  
  const zhiIndex = DIZHI.indexOf(zhi)
  const startZhiIndex = config.start
  
  let diff: number
  if (config.direction === 1) {
    // 阳干顺行
    diff = (zhiIndex - startZhiIndex + 12) % 12
  } else {
    // 阴干逆行
    diff = (startZhiIndex - zhiIndex + 12) % 12
  }
  
  return CHANGSHENG[diff]
}

/**
 * 获取纳音
 */
export function getNayin(gan: string, zhi: string): string {
  return NAYIN[gan + zhi] || ""
}

/**
 * 获取空亡
 */
export function getKongwang(dayGan: string, dayZhi: string): string {
  const ganIndex = TIANGAN.indexOf(dayGan)
  const zhiIndex = DIZHI.indexOf(dayZhi)
  
  // 计算旬首
  const xunStartZhiIndex = (zhiIndex - ganIndex + 12) % 12
  
  // 每旬的空亡
  const kongwangMap: Record<number, string> = {
    0: "戌亥",  // 甲子旬
    2: "申酉",  // 甲寅旬
    4: "午未",  // 甲辰旬
    6: "辰巳",  // 甲午旬
    8: "寅卯",  // 甲申旬
    10: "子丑"  // 甲戌旬
  }
  
  return kongwangMap[xunStartZhiIndex] || ""
}

/**
 * 获取神煞（简化版）
 */
export function getShensha(dayGan: string, yearZhi: string, pillarZhi: string): string[] {
  const shensha: string[] = []
  
  // 天乙贵人
  const tianyiZhi = SHENSHA_DATA.tianyi[dayGan]
  if (tianyiZhi?.includes(pillarZhi)) {
    shensha.push("天乙贵人")
  }
  
  // 文昌贵人
  if (SHENSHA_DATA.wenchang[dayGan] === pillarZhi) {
    shensha.push("文昌贵人")
  }
  
  // 驿马
  const yimaGroups = ["申子辰", "寅午戌", "巳酉丑", "亥卯未"]
  for (const group of yimaGroups) {
    if (group.includes(yearZhi) && SHENSHA_DATA.yima[group as keyof typeof SHENSHA_DATA.yima] === pillarZhi) {
      shensha.push("驿马")
      break
    }
  }
  
  // 桃花
  for (const group of yimaGroups) {
    if (group.includes(yearZhi) && SHENSHA_DATA.taohua[group as keyof typeof SHENSHA_DATA.taohua] === pillarZhi) {
      shensha.push("桃花")
      break
    }
  }
  
  // 华盖
  for (const group of yimaGroups) {
    if (group.includes(yearZhi) && SHENSHA_DATA.huagai[group as keyof typeof SHENSHA_DATA.huagai] === pillarZhi) {
      shensha.push("华盖")
      break
    }
  }
  
  return shensha
}

/**
 * 计算大运
 */
export function getDayun(
  yearGan: string,
  monthGan: string,
  monthZhi: string,
  gender: "male" | "female",
  birthYear: number,
  startAge: number = 1
): { gan: string; zhi: string; startAge: number; startYear: number }[] {
  const dayunList: { gan: string; zhi: string; startAge: number; startYear: number }[] = []
  
  // 判断大运顺逆
  // 阳年男命、阴年女命顺行；阴年男命、阳年女命逆行
  const yearGanIndex = TIANGAN.indexOf(yearGan)
  const isYangYear = yearGanIndex % 2 === 0
  const isShun = (isYangYear && gender === "male") || (!isYangYear && gender === "female")
  
  const monthGanIndex = TIANGAN.indexOf(monthGan)
  const monthZhiIndex = DIZHI.indexOf(monthZhi)
  
  // 生成10步大运
  for (let i = 1; i <= 10; i++) {
    let ganIndex: number
    let zhiIndex: number
    
    if (isShun) {
      ganIndex = (monthGanIndex + i) % 10
      zhiIndex = (monthZhiIndex + i) % 12
    } else {
      ganIndex = (monthGanIndex - i + 10) % 10
      zhiIndex = (monthZhiIndex - i + 12) % 12
    }
    
    const age = startAge + (i - 1) * 10
    
    dayunList.push({
      gan: TIANGAN[ganIndex],
      zhi: DIZHI[zhiIndex],
      startAge: age,
      startYear: birthYear + age
    })
  }
  
  return dayunList
}

/**
 * 计算流年
 */
export function getLiunian(startYear: number, count: number = 10): { gan: string; zhi: string; year: number }[] {
  const liunianList: { gan: string; zhi: string; year: number }[] = []
  
  for (let i = 0; i < count; i++) {
    const year = startYear + i
    const baseYear = 1984 // 甲子年
    const diff = year - baseYear
    const ganIndex = ((diff % 10) + 10) % 10
    const zhiIndex = ((diff % 12) + 12) % 12
    
    liunianList.push({
      gan: TIANGAN[ganIndex],
      zhi: DIZHI[zhiIndex],
      year
    })
  }
  
  return liunianList
}
