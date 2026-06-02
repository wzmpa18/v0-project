// 奇门遁甲基础数据
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
// 九宫
export const JIU_GONG = [
  { name: "坎", number: 1, position: "北" },
  { name: "坤", number: 2, position: "西南" },
  { name: "震", number: 3, position: "东" },
  { name: "巽", number: 4, position: "东南" },
  { name: "中", number: 5, position: "中" },
  { name: "乾", number: 6, position: "西北" },
  { name: "兑", number: 7, position: "西" },
  { name: "艮", number: 8, position: "东北" },
  { name: "离", number: 9, position: "南" },
]
// 八门
export const BA_MEN = ["休门", "生门", "伤门", "杜门", "景门", "死门", "惊门", "开门"]
// 九星
export const JIU_XING = ["天蓬", "天芮", "天冲", "天辅", "天禽", "天心", "天柱", "天任", "天英"]
// 八神
export const BA_SHEN = ["值符", "螣蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"]
// 计算阴盘奇门排盘
export function calculateYinPanQiMen(date: Date) {
  // 简化的阴盘奇门排盘
  return {
    type: "阴盘",
    palace: Array(9).fill(null).map((_, i) => ({
      ...JIU_GONG[i],
      tianGan: TIAN_GAN[Math.floor(Math.random() * 10)],
      diZhi: DI_ZHI[Math.floor(Math.random() * 12)],
      men: BA_MEN[Math.floor(Math.random() * 8)],
      star: JIU_XING[Math.floor(Math.random() * 9)],
      shen: BA_SHEN[Math.floor(Math.random() * 8)]
    }))
  }
}
// 计算阳盘命理排盘
export function calculateYangPanMingLi(date: Date, gender: "male" | "female") {
  return {
    type: "阳盘",
    gender,
    nianZhu: { gan: TIAN_GAN[0], zhi: DI_ZHI[0] },
    yueZhu: { gan: TIAN_GAN[1], zhi: DI_ZHI[1] },
    riZhu: { gan: TIAN_GAN[2], zhi: DI_ZHI[2] },
    shiZhu: { gan: TIAN_GAN[3], zhi: DI_ZHI[3] }
  }
}
// 二十四节气与遁局
export const JIE_QI_DUN = {
  "冬至": { dun: "阳", start: 1 },
  "小寒": { dun: "阳", start: 1 },
  "大寒": { dun: "阳", start: 1 },
  "立春": { dun: "阳", start: 4 },
  "雨水": { dun: "阳", start: 4 },
  "惊蛰": { dun: "阳", start: 4 },
  "春分": { dun: "阳", start: 7 },
  "清明": { dun: "阳", start: 7 },
  "谷雨": { dun: "阳", start: 7 },
  "立夏": { dun: "阴", start: 4 },
  "小满": { dun: "阴", start: 4 },
  "芒种": { dun: "阴", start: 4 },
  "夏至": { dun: "阴", start: 1 },
  "小暑": { dun: "阴", start: 1 },
  "大暑": { dun: "阴", start: 1 },
  "立秋": { dun: "阴", start: 7 },
  "处暑": { dun: "阴", start: 7 },
  "白露": { dun: "阴", start: 7 },
  "秋分": { dun: "阴", start: 7 },
  "寒露": { dun: "阴", start: 6 },
  "霜降": { dun: "阴", start: 6 },
  "立冬": { dun: "阴", start: 3 },
  "小雪": { dun: "阴", start: 3 },
  "大雪": { dun: "阴", start: 3 },
}

// 计算奇门遁甲排盘
export function calculateQimenPan(jieqi: string, dayGan: number, shi: string) {
  const jieqiInfo = JIE_QI_DUN[jieqi as keyof typeof JIE_QI_DUN] || { dun: "阳", start: 1 }
  
  return {
    ju: jieqiInfo.start,
    dunType: jieqiInfo.dun + "遁",
    zhiFu: JIU_XING[Math.floor(Math.random() * 9)],
    zhiShi: BA_MEN[Math.floor(Math.random() * 8)],
    palaces: JIU_GONG.map((gong, i) => ({
      ...gong,
      baShen: BA_SHEN[i % 8],
      jiuXing: JIU_XING[i % 9],
      baMen: BA_MEN[i % 8],
      tianGan: TIAN_GAN[i % 10],
      diZhi: DI_ZHI[i % 12],
    })),
  }
}

// 命理奇门结合排盘
export function calculateMingLiQiMen(date: Date, gender: "male" | "female") {
  const mingLi = calculateYangPanMingLi(date, gender)
  const qiMen = calculateYinPanQiMen(date)
  return { mingLi, qiMen }
}
