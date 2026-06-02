// 万年历相关数据
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
export const SHENG_XIAO = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
export const NONG_LI_MONTHS = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"]
export const NONG_LI_DAYS = [
  "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"
]
export const SHI_CHEN = [
  { name: "子", time: "23:00-01:00", zodiac: "鼠" },
  { name: "丑", time: "01:00-03:00", zodiac: "牛" },
  { name: "寅", time: "03:00-05:00", zodiac: "虎" },
  { name: "卯", time: "05:00-07:00", zodiac: "兔" },
  { name: "辰", time: "07:00-09:00", zodiac: "龙" },
  { name: "巳", time: "09:00-11:00", zodiac: "蛇" },
  { name: "午", time: "11:00-13:00", zodiac: "马" },
  { name: "未", time: "13:00-15:00", zodiac: "羊" },
  { name: "申", time: "15:00-17:00", zodiac: "猴" },
  { name: "酉", time: "17:00-19:00", zodiac: "鸡" },
  { name: "戌", time: "19:00-21:00", zodiac: "狗" },
  { name: "亥", time: "21:00-23:00", zodiac: "猪" },
]
export const JIE_QI = [
  "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
  "立夏", "小满", "芒种", "夏至", "小暑", "大暑",
  "立秋", "处暑", "白露", "秋分", "寒露", "霜降",
  "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"
]
export const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"]
// 天干地支五行
export const GAN_ZHI_WUXING: Record<string, string> = {
  "甲": "木", "乙": "木",
  "丙": "火", "丁": "火",
  "戊": "土", "己": "土",
  "庚": "金", "辛": "金",
  "壬": "水", "癸": "水",
  "子": "水", "丑": "土", "寅": "木", "卯": "木",
  "辰": "土", "巳": "火", "午": "火", "未": "土",
  "申": "金", "酉": "金", "戌": "土", "亥": "水"
}
// 计算年干支
export function getYearGanZhi(year: number): { gan: string; zhi: string } {
  const ganIndex = (year - 4) % 10
  const zhiIndex = (year - 4) % 12
  return {
    gan: TIAN_GAN[ganIndex < 0 ? ganIndex + 10 : ganIndex],
    zhi: DI_ZHI[zhiIndex < 0 ? zhiIndex + 12 : zhiIndex]
  }
}
// 计算月干支
export function getMonthGanZhi(year: number, month: number): { gan: string; zhi: string } {
  const yearGan = getYearGanZhi(year).gan
  const yearGanIndex = TIAN_GAN.indexOf(yearGan)
  
  // 年干起月诀：甲己之年丙作首，乙庚之年戊为头
  const monthGanStart = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0][yearGanIndex]
  const monthGan = TIAN_GAN[(monthGanStart + month - 1) % 10]
  const monthZhi = DI_ZHI[(month + 1) % 12] // 正月建寅
  
  return { gan: monthGan, zhi: monthZhi }
}
// 计算日干支（简化版）
export function getDayGanZhi(date: Date): { gan: string; zhi: string } {
  const baseDate = new Date(1900, 0, 31)
  const daysDiff = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
  
  const ganIndex = (daysDiff + 40) % 10
  const zhiIndex = (daysDiff + 40) % 12
  
  return {
    gan: TIAN_GAN[ganIndex],
    zhi: DI_ZHI[zhiIndex]
  }
}
// 计算时辰干支
export function getShiChenGanZhi(dayGan: string, shiChenIndex: number): { gan: string; zhi: string } {
  const dayGanIndex = TIAN_GAN.indexOf(dayGan)
  
  // 日干支起时诀：甲己还加甲，乙庚丙作初
  const shiGanStart = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8][dayGanIndex]
  const shiGan = TIAN_GAN[(shiGanStart + shiChenIndex) % 10]
  
  return { gan: shiGan, zhi: DI_ZHI[shiChenIndex] }
}
// 获取生肖
export function getShengXiao(year: number): string {
  const index = (year - 4) % 12
  return SHENG_XIAO[index < 0 ? index + 12 : index]
}
// 宜忌数据
export const YI_JI_DATA = {
  "宜": ["祭祀", "祈福", "求嗣", "开光", "出行", "嫁娶", "订盟", "纳采", "裁衣", "安床", "修造", "动土", "移徙", "入宅", "开市", "交易", "立券", "纳财", "安葬"],
  "忌": ["嫁娶", "开市", "安床", "安葬", "动土", "破土"]
}
// 黄历数据
export function getHuangLiInfo(date: Date): {
  yi: string[]
  ji: string[]
  chongSha: string
  taiShen: string
  pengZu: string
} {
  const dayZhi = getDayGanZhi(date).zhi
  const dayZhiIndex = DI_ZHI.indexOf(dayZhi)
  
  // 简单的冲煞计算
  const chongZhiIndex = (dayZhiIndex + 6) % 12
  const chongShengXiao = SHENG_XIAO[chongZhiIndex]
  
  // 随机选择宜忌
  const yiCount = 3 + Math.floor(Math.random() * 4)
  const jiCount = 2 + Math.floor(Math.random() * 3)
  
  const yi = [...YI_JI_DATA.宜].sort(() => Math.random() - 0.5).slice(0, yiCount)
  const ji = [...YI_JI_DATA.忌].sort(() => Math.random() - 0.5).slice(0, jiCount)
  
  return {
    yi,
    ji,
    chongSha: `冲${chongShengXiao}煞${["东", "南", "西", "北", "中"][Math.floor(Math.random() * 5)]}`,
    taiShen: "占门碓外东南",
    pengZu: "甲不开仓财物耗散，子不问卜自惹祸殃"
  }
}
