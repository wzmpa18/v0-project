"use client"

/**
 * 国学传承 - 黄历/干支历法计算模块
 * 使用正确的农历历法算法
 */

const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
const SHENG_XIAO = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"]

// 二十四节气日期（简化版，近似值）
// 每个节气的近似日期（月, 日），从立春开始
const JIE_QI_DATES: [number, number][] = [
  [2, 4],   // 立春
  [2, 19],  // 雨水
  [3, 6],   // 惊蛰
  [3, 21],  // 春分
  [4, 5],   // 清明
  [4, 20],  // 谷雨
  [5, 6],   // 立夏
  [5, 21],  // 小满
  [6, 6],   // 芒种
  [6, 21],  // 夏至
  [7, 7],   // 小暑
  [7, 23],  // 大暑
  [8, 7],   // 立秋
  [8, 23],  // 处暑
  [9, 8],   // 白露
  [9, 23],  // 秋分
  [10, 8],  // 寒露
  [10, 23], // 霜降
  [11, 7],  // 立冬
  [11, 22], // 小雪
  [12, 7],  // 大雪
  [12, 22], // 冬至
  [1, 6],   // 小寒
  [1, 20],  // 大寒
]

/**
 * 计算从1900年1月1日到指定日期的天数
 * 1900年1月1日 = 甲戌日 (干支索引 = 10)
 */
function daysSince1900(year: number, month: number, day: number): number {
  // 使用更精确的计算
  // 计算从1900年1月1日到 (year-1)年12月31日的天数
  let totalDays = 0
  for (let y = 1900; y < year; y++) {
    totalDays += isLeapYear(y) ? 366 : 365
  }
  // 加上当年的天数
  const monthDays = isLeapYear(year)
    ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  for (let m = 0; m < month - 1; m++) {
    totalDays += monthDays[m]
  }
  totalDays += day - 1
  return totalDays
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function getDayOfYear(year: number, month: number, day: number): number {
  const monthDays = isLeapYear(year)
    ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let doy = day
  for (let m = 0; m < month - 1; m++) {
    doy += monthDays[m]
  }
  return doy
}

/**
 * 计算年干支
 * 公式: (year - 4) % 60，甲子年从4开始
 */
export function getYearGanZhi(year: number): { gan: string; zhi: string; ganZhi: string; shengXiao: string } {
  const index = (year - 4) % 60
  if (index < 0) {
    const fixed = ((year - 4) % 60 + 60) % 60
    return {
      gan: TIAN_GAN[fixed % 10],
      zhi: DI_ZHI[fixed % 12],
      ganZhi: TIAN_GAN[fixed % 10] + DI_ZHI[fixed % 12],
      shengXiao: SHENG_XIAO[fixed % 12],
    }
  }
  return {
    gan: TIAN_GAN[index % 10],
    zhi: DI_ZHI[index % 12],
    ganZhi: TIAN_GAN[index % 10] + DI_ZHI[index % 12],
    shengXiao: SHENG_XIAO[index % 12],
  }
}

/**
 * 根据日期确定节气月（0=寅月, 1=卯月, ..., 11=丑月）
 * 节气月以"节"为分界：
 * 立春(2/4)寅月, 惊蛰(3/6)卯月, 清明(4/5)辰月, 立夏(5/6)巳月,
 * 芒种(6/6)午月, 小暑(7/7)未月, 立秋(8/7)申月, 白露(9/8)酉月,
 * 寒露(10/8)戌月, 立冬(11/7)亥月, 大雪(12/7)子月, 小寒(1/6)丑月
 */
function getJieQiMonth(month: number, day: number): number {
  const jieQiBoundaries: [number, number, number][] = [
    [1, 6, 11],   // 小寒 1/6 -> 丑月(11)
    [2, 4, 0],    // 立春 2/4 -> 寅月(0)
    [3, 6, 1],    // 惊蛰 3/6 -> 卯月(1)
    [4, 5, 2],    // 清明 4/5 -> 辰月(2)
    [5, 6, 3],    // 立夏 5/6 -> 巳月(3)
    [6, 6, 4],    // 芒种 6/6 -> 午月(4)
    [7, 7, 5],    // 小暑 7/7 -> 未月(5)
    [8, 7, 6],    // 立秋 8/7 -> 申月(6)
    [9, 8, 7],    // 白露 9/8 -> 酉月(7)
    [10, 8, 8],   // 寒露 10/8 -> 戌月(8)
    [11, 7, 9],   // 立冬 11/7 -> 亥月(9)
    [12, 7, 10],  // 大雪 12/7 -> 子月(10)
  ]
  
  // 从最近的节气开始查找
  for (let i = jieQiBoundaries.length - 1; i >= 0; i--) {
    const [jieMonth, jieDay, jieQiMonth] = jieQiBoundaries[i]
    if (month > jieMonth || (month === jieMonth && day >= jieDay)) {
      return jieQiMonth
    }
  }
  // 1月6日之前，属于上一年的丑月(11)
  return 11
}

/**
 * 计算月干支（基于节气）
 * 年上起月法：
 * 甲己年 -> 丙寅月 (起始月干=丙=2)
 * 乙庚年 -> 戊寅月 (起始月干=戊=4)
 * 丙辛年 -> 庚寅月 (起始月干=庚=6)
 * 丁壬年 -> 壬寅月 (起始月干=壬=8)
 * 戊癸年 -> 甲寅月 (起始月干=甲=0)
 */
export function getMonthGanZhi(year: number, month: number, day: number): { gan: string; zhi: string; ganZhi: string } {
  const yearGan = TIAN_GAN[((year - 4) % 60 + 60) % 60 % 10]
  
  const startMonthGanMap: Record<string, number> = {
    "甲": 2, "己": 2,
    "乙": 4, "庚": 4,
    "丙": 6, "辛": 6,
    "丁": 8, "壬": 8,
    "戊": 0, "癸": 0,
  }
  
  const startGan = startMonthGanMap[yearGan] ?? 0
  const jieQiMonth = getJieQiMonth(month, day)
  
  // 月支 = 寅月(0)对应地支寅(2)，所以月支索引 = (节气月 + 2) % 12
  const monthZhiIndex = (jieQiMonth + 2) % 12
  // 月干 = (起始月干 + 节气月编号) % 10
  const monthGanIndex = (startGan + jieQiMonth) % 10
  
  return {
    gan: TIAN_GAN[monthGanIndex],
    zhi: DI_ZHI[monthZhiIndex],
    ganZhi: TIAN_GAN[monthGanIndex] + DI_ZHI[monthZhiIndex],
  }
}

/**
 * 计算日干支
 * 公式: 日干支 = (从1900-01-01到当日的天数 + 10) % 60
 * 1900年1月1日 = 甲戌日 = 干支索引 10
 */
export function getDayGanZhi(year: number, month: number, day: number): { gan: string; zhi: string; ganZhi: string } {
  const days = daysSince1900(year, month, day)
  // 1900-01-01是甲戌日（索引10）
  const index = (days + 10) % 60
  const fixedIndex = index < 0 ? index + 60 : index
  return {
    gan: TIAN_GAN[fixedIndex % 10],
    zhi: DI_ZHI[fixedIndex % 12],
    ganZhi: TIAN_GAN[fixedIndex % 10] + DI_ZHI[fixedIndex % 12],
  }
}

/**
 * 计算时干支
 * 日上起时法（五鼠遁）：
 * 甲己日 -> 甲子时 (起始时干=甲=0)
 * 乙庚日 -> 丙子时 (起始时干=丙=2)
 * 丙辛日 -> 戊子时 (起始时干=戊=4)
 * 丁壬日 -> 庚子时 (起始时干=庚=6)
 * 戊癸日 -> 壬子时 (起始时干=壬=8)
 */
export function getHourGanZhi(hour: number, dayGan: string): { gan: string; zhi: string; ganZhi: string } {
  const startHourGanMap: Record<string, number> = {
    "甲": 0, "己": 0,
    "乙": 2, "庚": 2,
    "丙": 4, "辛": 4,
    "丁": 6, "壬": 6,
    "戊": 8, "癸": 8,
  }
  
  const startGan = startHourGanMap[dayGan] ?? 0
  
  // 时辰：23-1点为子时(0), 1-3点为丑时(1), ...
  // 0-1点也为子时(0)
  let shiChen: number
  if (hour === 23) {
    shiChen = 0 // 子时
  } else if (hour === 0) {
    shiChen = 0 // 子时  
  } else {
    shiChen = Math.floor((hour + 1) / 2) // 1-2=丑(1), 3-4=寅(2), ...
  }
  
  const hourZhiIndex = shiChen % 12
  const hourGanIndex = (startGan + shiChen) % 10
  
  return {
    gan: TIAN_GAN[hourGanIndex],
    zhi: DI_ZHI[hourZhiIndex],
    ganZhi: TIAN_GAN[hourGanIndex] + DI_ZHI[hourZhiIndex],
  }
}

/**
 * 获取完整的当日黄历信息
 */
export interface CalendarInfo {
  year: number
  month: number
  day: number
  weekDay: string
  yearGan: string
  yearZhi: string
  yearGanZhi: string
  yearShengXiao: string
  monthGan: string
  monthZhi: string
  monthGanZhi: string
  dayGan: string
  dayZhi: string
  dayGanZhi: string
  hourGanZhi: string
  yi: string[]
  ji: string[]
  dailyFortune: string
}

/**
 * 根据日干支获取宜忌
 */
function getYiJiByDay(dayGan: string, dayZhi: string): { yi: string[]; ji: string[]; fortune: string } {
  // 建除十二神简化版
  // 根据日支确定建除
  const jianChuMap: Record<string, { yi: string[]; ji: string[]; fortune: string }> = {
    "子": { yi: ["祭祀", "祈福", "上任", "出行"], ji: ["开仓", "动土", "安葬"], fortune: "宜静不宜动，可处理文书事宜" },
    "丑": { yi: ["祭祀", "修造", "嫁娶", "入宅"], ji: ["开市", "出行", "移徙"], fortune: "稳固之时，宜内务" },
    "寅": { yi: ["出行", "上任", "嫁娶", "开市"], ji: ["动土", "安葬", "伐木"], fortune: "生机勃发，宜开展新事务" },
    "卯": { yi: ["祈福", "祭祀", "出行", "纳采"], ji: ["动土", "安葬", "修造"], fortune: "柔顺之时，宜人际交往" },
    "辰": { yi: ["祭祀", "祈福", "嫁娶", "修造"], ji: ["出行", "移徙", "开市"], fortune: "稳重之时，宜守不宜攻" },
    "巳": { yi: ["出行", "嫁娶", "开市", "纳财"], ji: ["安葬", "修造", "动土"], fortune: "火旺之时，宜快速行动" },
    "午": { yi: ["祭祀", "上任", "会友", "纳采"], ji: ["动土", "开仓", "移徙"], fortune: "阳盛之时，宜社交活动" },
    "未": { yi: ["修造", "入宅", "祭祀", "嫁娶"], ji: ["出行", "开市", "伐木"], fortune: "宜处理家事，理顺关系" },
    "申": { yi: ["出行", "开市", "纳财", "上任"], ji: ["安葬", "动土", "嫁娶"], fortune: "灵动之时，宜商业活动" },
    "酉": { yi: ["祭祀", "祈福", "嫁娶", "会友"], ji: ["开市", "出行", "动土"], fortune: "收敛之时，宜修身养性" },
    "戌": { yi: ["祭祀", "祈福", "修造", "入宅"], ji: ["嫁娶", "移徙", "开市"], fortune: "宜斋戒祭祀，不宜大喜" },
    "亥": { yi: ["祭祀", "祈福", "纳财", "出行"], ji: ["动土", "安葬", "嫁娶"], fortune: "归藏之时，宜储蓄规划" },
  }
  
  return jianChuMap[dayZhi] || { yi: ["祭祀", "祈福"], ji: ["动土", "安葬"], fortune: "宜静不宜动" }
}

export function getTodayCalendar(): CalendarInfo {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hour = now.getHours()
  const weekDay = WEEK_DAYS[now.getDay()]

  const yearInfo = getYearGanZhi(year)
  const monthInfo = getMonthGanZhi(year, month, day)
  const dayInfo = getDayGanZhi(year, month, day)
  const hourInfo = getHourGanZhi(hour, dayInfo.gan)
  const yiJi = getYiJiByDay(dayInfo.gan, dayInfo.zhi)

  return {
    year,
    month,
    day,
    weekDay,
    yearGan: yearInfo.gan,
    yearZhi: yearInfo.zhi,
    yearGanZhi: yearInfo.ganZhi,
    yearShengXiao: yearInfo.shengXiao,
    monthGan: monthInfo.gan,
    monthZhi: monthInfo.zhi,
    monthGanZhi: monthInfo.ganZhi,
    dayGan: dayInfo.gan,
    dayZhi: dayInfo.zhi,
    dayGanZhi: dayInfo.ganZhi,
    hourGanZhi: hourInfo.ganZhi,
    yi: yiJi.yi,
    ji: yiJi.ji,
    dailyFortune: yiJi.fortune,
  }
}

/**
 * 保存用户八字到 localStorage
 */
export interface BaziRecord {
  id: string
  name: string
  yearGanZhi: string
  monthGanZhi: string
  dayGanZhi: string
  hourGanZhi: string
  gender: string
  savedAt: string
}

export function saveBazi(bazi: Omit<BaziRecord, "id" | "savedAt">): void {
  const records = getSavedBaziList()
  const record: BaziRecord = {
    ...bazi,
    id: Date.now().toString(),
    savedAt: new Date().toISOString(),
  }
  records.push(record)
  localStorage.setItem("bazi_records", JSON.stringify(records))
}

export function getSavedBaziList(): BaziRecord[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("bazi_records")
  return data ? JSON.parse(data) : []
}

export function deleteBazi(id: string): void {
  let records = getSavedBaziList()
  records = records.filter(r => r.id !== id)
  localStorage.setItem("bazi_records", JSON.stringify(records))
}

/**
 * 根据八字计算明日运势
 */
export function getTomorrowFortune(bazi: BaziRecord): {
  tomorrowGanZhi: string
  fortune: string
  yi: string[]
  ji: string[]
  score: number
} {
  const now = new Date()
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const dayInfo = getDayGanZhi(tomorrow.getFullYear(), tomorrow.getMonth() + 1, tomorrow.getDate())
  const yiJi = getYiJiByDay(dayInfo.gan, dayInfo.zhi)
  
  // 简单的运势评分：明日日干与八字日干的关系
  const baziDayGan = bazi.dayGanZhi[0]
  const tomorrowDayGan = dayInfo.gan
  
  const ganIndex: Record<string, number> = { "甲": 0, "乙": 1, "丙": 2, "丁": 3, "戊": 4, "己": 5, "庚": 6, "辛": 7, "壬": 8, "癸": 9 }
  const baziIdx = ganIndex[baziDayGan] ?? 0
  const tomorrowIdx = ganIndex[tomorrowDayGan] ?? 0
  
  // 相生相合关系
  let score = 60
  const diff = (tomorrowIdx - baziIdx + 10) % 10
  // 比和
  if (diff === 0) score = 70
  // 相生（明日生八字）
  else if (diff === 1 || diff === 3 || diff === 5 || diff === 7 || diff === 9) score = 80
  // 相克
  else if (diff === 2 || diff === 7) score = 45
  // 相合
  else if ((baziIdx + tomorrowIdx) % 10 === 0) score = 75
  
  let fortuneText = ""
  if (score >= 80) fortuneText = "明日运势极佳，诸事顺利，宜积极行动"
  else if (score >= 65) fortuneText = "明日运势平稳，按部就班，可处理日常事务"
  else if (score >= 50) fortuneText = "明日运势一般，宜谨慎行事，避免重大决策"
  else fortuneText = "明日运势欠佳，宜静不宜动，注意口舌是非"
  
  return {
    tomorrowGanZhi: dayInfo.ganZhi,
    fortune: fortuneText,
    yi: yiJi.yi,
    ji: yiJi.ji,
    score,
  }
}