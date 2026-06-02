"use client"

// 八字完整数据库 - 神煞、纳音、十神等

// 天干
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

// 地支
export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 六十甲子
export const JIA_ZI = [
  "甲子", "乙丑", "丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉",
  "甲戌", "乙亥", "丙子", "丁丑", "戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未",
  "甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳",
  "甲午", "乙未", "丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯",
  "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑",
  "甲寅", "乙卯", "丙辰", "丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌", "癸亥"
]

// 天干五行
export const GAN_WUXING: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水"
}

// 地支五行
export const ZHI_WUXING: Record<string, string> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
}

// 天干阴阳
export const GAN_YIN_YANG: Record<string, string> = {
  甲: "阳", 乙: "阴", 丙: "阳", 丁: "阴", 戊: "阳",
  己: "阴", 庚: "阳", 辛: "阴", 壬: "阳", 癸: "阴"
}

// 地支阴阳
export const ZHI_YIN_YANG: Record<string, string> = {
  子: "阳", 丑: "阴", 寅: "阳", 卯: "阴", 辰: "阳", 巳: "阴",
  午: "阳", 未: "阴", 申: "阳", 酉: "阴", 戌: "阳", 亥: "阴"
}

// 地支藏干 - 参考《渊海子平》
export const ZHI_CANG_GAN: Record<string, { gan: string; wuxing: string; power: number }[]> = {
  子: [{ gan: "癸", wuxing: "水", power: 1 }],
  丑: [{ gan: "己", wuxing: "土", power: 0.6 }, { gan: "癸", wuxing: "水", power: 0.3 }, { gan: "辛", wuxing: "金", power: 0.1 }],
  寅: [{ gan: "甲", wuxing: "木", power: 0.6 }, { gan: "丙", wuxing: "火", power: 0.3 }, { gan: "戊", wuxing: "土", power: 0.1 }],
  卯: [{ gan: "乙", wuxing: "木", power: 1 }],
  辰: [{ gan: "戊", wuxing: "土", power: 0.6 }, { gan: "乙", wuxing: "木", power: 0.3 }, { gan: "癸", wuxing: "水", power: 0.1 }],
  巳: [{ gan: "丙", wuxing: "火", power: 0.6 }, { gan: "戊", wuxing: "土", power: 0.2 }, { gan: "庚", wuxing: "金", power: 0.2 }],
  午: [{ gan: "丁", wuxing: "火", power: 0.7 }, { gan: "己", wuxing: "土", power: 0.3 }],
  未: [{ gan: "己", wuxing: "土", power: 0.6 }, { gan: "丁", wuxing: "火", power: 0.3 }, { gan: "乙", wuxing: "木", power: 0.1 }],
  申: [{ gan: "庚", wuxing: "金", power: 0.6 }, { gan: "壬", wuxing: "水", power: 0.3 }, { gan: "戊", wuxing: "土", power: 0.1 }],
  酉: [{ gan: "辛", wuxing: "金", power: 1 }],
  戌: [{ gan: "戊", wuxing: "土", power: 0.6 }, { gan: "辛", wuxing: "金", power: 0.3 }, { gan: "丁", wuxing: "火", power: 0.1 }],
  亥: [{ gan: "壬", wuxing: "水", power: 0.7 }, { gan: "甲", wuxing: "木", power: 0.3 }]
}

// 六十甲子纳音 - 参考《渊海子平》
export const JIAZI_NAYIN: Record<string, string> = {
  "甲子": "海中金", "乙丑": "海中金",
  "丙寅": "炉中火", "丁卯": "炉中火",
  "戊辰": "大林木", "己巳": "大林木",
  "庚午": "路旁土", "辛未": "路旁土",
  "壬申": "剑锋金", "癸酉": "剑锋金",
  "甲戌": "山头火", "乙亥": "山头火",
  "丙子": "涧下水", "丁丑": "涧下水",
  "戊寅": "城头土", "己卯": "城头土",
  "庚辰": "白蜡金", "辛巳": "白蜡金",
  "壬午": "杨柳木", "癸未": "杨柳木",
  "甲申": "泉中水", "乙酉": "泉中水",
  "丙戌": "屋上土", "丁亥": "屋上土",
  "戊子": "霹雳火", "己丑": "霹雳火",
  "庚寅": "松柏木", "辛卯": "松柏木",
  "壬辰": "长流水", "癸巳": "长流水",
  "甲午": "砂中金", "乙未": "砂中金",
  "丙申": "山下火", "丁酉": "山下火",
  "戊戌": "平地木", "己亥": "平地木",
  "庚子": "壁上土", "辛丑": "壁上土",
  "壬寅": "金箔金", "癸卯": "金箔金",
  "甲辰": "覆灯火", "乙巳": "覆灯火",
  "丙午": "天河水", "丁未": "天河水",
  "戊申": "大驿土", "己酉": "大驿土",
  "庚戌": "钗钏金", "辛亥": "钗钏金",
  "壬子": "桑柘木", "癸丑": "桑柘木",
  "甲寅": "大溪水", "乙卯": "大溪水",
  "丙辰": "沙中土", "丁巳": "沙中土",
  "戊午": "天上火", "己未": "天上火",
  "庚申": "石榴木", "辛酉": "石榴木",
  "壬戌": "大海水", "癸亥": "大海水"
}

// 十二长生状态 - 参考《渊海子平》
export const SHI_ER_CHANG_SHENG: Record<string, string[]> = {
  木: ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"],
  火: ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"],
  土: ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"],
  金: ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"],
  水: ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"]
}

// 五行长生位 - 参考《渊海子平》
export const CHANG_SHENG_WEI: Record<string, string> = {
  木: "亥", 火: "寅", 土: "申", 金: "巳", 水: "申"
}

// 十神计算 - 参考《渊海子平》子平法
export function getShiShen(dayGan: string, targetGan: string): string {
  const ganOrder = TIAN_GAN
  const dayIdx = ganOrder.indexOf(dayGan)
  const targetIdx = ganOrder.indexOf(targetGan)
  
  const dayWuxing = GAN_WUXING[dayGan]
  const targetWuxing = GAN_WUXING[targetGan]
  
  const dayYinYang = dayIdx % 2
  const targetYinYang = targetIdx % 2
  const sameYinYang = dayYinYang === targetYinYang
  
  const wuxingOrder = ["木", "火", "土", "金", "水"]
  const dayWuxingIdx = wuxingOrder.indexOf(dayWuxing)
  const targetWuxingIdx = wuxingOrder.indexOf(targetWuxing)
  
  if (dayWuxing === targetWuxing) {
    return sameYinYang ? "比肩" : "劫财"
  }
  
  if ((dayWuxingIdx + 1) % 5 === targetWuxingIdx) {
    return sameYinYang ? "食神" : "伤官"
  }
  
  if ((targetWuxingIdx + 1) % 5 === dayWuxingIdx) {
    return sameYinYang ? "偏印" : "正印"
  }
  
  if ((dayWuxingIdx + 2) % 5 === targetWuxingIdx) {
    return sameYinYang ? "偏财" : "正财"
  }
  
  if ((targetWuxingIdx + 2) % 5 === dayWuxingIdx) {
    return sameYinYang ? "七杀" : "正官"
  }
  
  return "比肩"
}

// 获取地支中每个藏干的十神
export function getCangGanShiShen(dayGan: string, zhi: string): { gan: string; shiShen: string; wuxing: string; power: number }[] {
  const cangGanList = ZHI_CANG_GAN[zhi] || []
  return cangGanList.map(item => ({
    ...item,
    shiShen: getShiShen(dayGan, item.gan)
  }))
}

// 计算某五行在某地支的长生状态
export function getChangShengStatus(wuxing: string, zhi: string): string {
  const changShengIdx = DI_ZHI.indexOf(CHANG_SHENG_WEI[wuxing])
  const zhiIdx = DI_ZHI.indexOf(zhi)
  const statusIdx = (zhiIdx - changShengIdx + 12) % 12
  return SHI_ER_CHANG_SHENG[wuxing][statusIdx]
}

// 空亡计算（按日柱）- 参考《渊海子平》
export function getKongWang(dayGanZhi: string): string[] {
  const kongWangMap: Record<number, string[]> = {
    0: ["戌", "亥"],
    1: ["申", "酉"],
    2: ["午", "未"],
    3: ["辰", "巳"],
    4: ["寅", "卯"],
    5: ["子", "丑"]
  }
  
  const idx = JIA_ZI.indexOf(dayGanZhi)
  if (idx === -1) return []
  
  const xunIdx = Math.floor(idx / 10)
  return kongWangMap[xunIdx] || []
}

// 计算胎元（月干进一位 + 月支进三位）- 参考《渊海子平》
export function getTaiYuan(monthGan: string, monthZhi: string): string {
  const ganIdx = TIAN_GAN.indexOf(monthGan)
  const zhiIdx = DI_ZHI.indexOf(monthZhi)
  
  const taiGan = TIAN_GAN[(ganIdx + 1) % 10]
  const taiZhi = DI_ZHI[(zhiIdx + 3) % 12]
  
  return taiGan + taiZhi
}

// 计算命宫 - 参考《渊海子平》
export function getMingGong(monthZhi: string, hourZhi: string): { ganZhi: string; naYin: string } {
  const monthIdx = DI_ZHI.indexOf(monthZhi)
  const hourIdx = DI_ZHI.indexOf(hourZhi)
  
  let mingZhiIdx = (14 - monthIdx - hourIdx) % 12
  if (mingZhiIdx < 0) mingZhiIdx += 12
  
  const mingZhi = DI_ZHI[mingZhiIdx]
  
  const zhiGanMap: Record<string, string[]> = {
    子: ["甲", "丙", "戊", "庚", "壬"],
    丑: ["乙", "丁", "己", "辛", "癸"],
    寅: ["甲", "丙", "戊", "庚", "壬"],
    卯: ["乙", "丁", "己", "辛", "癸"],
    辰: ["甲", "丙", "戊", "庚", "壬"],
    巳: ["乙", "丁", "己", "辛", "癸"],
    午: ["甲", "丙", "戊", "庚", "壬"],
    未: ["乙", "丁", "己", "辛", "癸"],
    申: ["甲", "丙", "戊", "庚", "壬"],
    酉: ["乙", "丁", "己", "辛", "癸"],
    戌: ["甲", "丙", "戊", "庚", "壬"],
    亥: ["乙", "丁", "己", "辛", "癸"]
  }
  
  const mingGan = zhiGanMap[mingZhi][0]
  const ganZhi = mingGan + mingZhi
  
  return {
    ganZhi,
    naYin: JIAZI_NAYIN[ganZhi] || ""
  }
}

// 计算身宫 - 参考《渊海子平》
export function getShenGong(monthZhi: string, hourZhi: string): { ganZhi: string; naYin: string } {
  const monthIdx = DI_ZHI.indexOf(monthZhi)
  const hourIdx = DI_ZHI.indexOf(hourZhi)
  
  let shenZhiIdx = (monthIdx + hourIdx - 2) % 12
  if (shenZhiIdx < 0) shenZhiIdx += 12
  
  const shenZhi = DI_ZHI[shenZhiIdx]
  
  const zhiGanMap: Record<string, string[]> = {
    子: ["甲", "丙", "戊", "庚", "壬"],
    丑: ["乙", "丁", "己", "辛", "癸"],
    寅: ["甲", "丙", "戊", "庚", "壬"],
    卯: ["乙", "丁", "己", "辛", "癸"],
    辰: ["甲", "丙", "戊", "庚", "壬"],
    巳: ["乙", "丁", "己", "辛", "癸"],
    午: ["甲", "丙", "戊", "庚", "壬"],
    未: ["乙", "丁", "己", "辛", "癸"],
    申: ["甲", "丙", "戊", "庚", "壬"],
    酉: ["乙", "丁", "己", "辛", "癸"],
    戌: ["甲", "丙", "戊", "庚", "壬"],
    亥: ["乙", "丁", "己", "辛", "癸"]
  }
  
  const shenGan = zhiGanMap[shenZhi][0]
  const ganZhi = shenGan + shenZhi
  
  return {
    ganZhi,
    naYin: JIAZI_NAYIN[ganZhi] || ""
  }
}

// 大运计算 - 参考《渊海子平》
export function calculateDaYun(
  yearGan: string,
  monthZhi: string,
  dayGan: string,
  hourZhi: string,
  gender: "male" | "female"
): Array<{ startYear: number; gan: string; zhi: string; siShen: string; ageRange: string }> {
  const daYun = []
  const ganOrder = TIAN_GAN
  const zhiOrder = DI_ZHI
  
  const monthIdx = zhiOrder.indexOf(monthZhi)
  const yearGanIdx = ganOrder.indexOf(yearGan)
  
  let startGanIdx = yearGanIdx
  let startZhiIdx = monthIdx
  
  if (gender === "male") {
    startGanIdx = (yearGanIdx + 1) % 10
    startZhiIdx = (monthIdx + 1) % 12
  } else {
    startGanIdx = (yearGanIdx - 1 + 10) % 10
    startZhiIdx = (monthIdx - 1 + 12) % 12
  }
  
  for (let i = 0; i < 10; i++) {
    const gan = ganOrder[(startGanIdx + i) % 10]
    const zhi = zhiOrder[(startZhiIdx + i) % 12]
    const shiShen = getShiShen(dayGan, gan)
    
    daYun.push({
      startYear: 10 + i * 10,
      gan,
      zhi,
      shiShen,
      ageRange: `${10 + i * 10}~${20 + i * 10}岁`
    })
  }
  
  return daYun
}

// 流年计算
export function calculateLiuNian(
  startYear: number,
  dayGan: string
): Array<{ year: number; gan: string; zhi: string; shiShen: string }> {
  const liuNian = []
  const ganOrder = TIAN_GAN
  const zhiOrder = DI_ZHI
  
  for (let i = 0; i < 10; i++) {
    const year = startYear + i
    const ganIdx = year % 10
    const zhiIdx = year % 12
    
    const gan = ganOrder[ganIdx]
    const zhi = zhiOrder[zhiIdx]
    const shiShen = getShiShen(dayGan, gan)
    
    liuNian.push({ year, gan, zhi, shiShen })
  }
  
  return liuNian
}

// 计算起运年龄 - 参考《渊海子平》
export function calculateQiYunAge(
  birthMonth: number,
  birthDay: number,
  jieQiDay: number,
  gender: "male" | "female"
): { years: number; months: number; days: number } {
  let daysFromJieQi = birthDay - jieQiDay
  
  if (gender === "male") {
    daysFromJieQi = jieQiDay - birthDay
  }
  
  const totalDays = daysFromJieQi + (30 - jieQiDay)
  const years = Math.floor(totalDays / 365)
  const remainingDays = totalDays % 365
  const months = Math.floor(remainingDays / 30)
  const days = remainingDays % 30
  
  return { years: years + 1, months, days }
}

// 五行统计
export function calculateWuxingCount(
  yearGan: string, yearZhi: string,
  monthGan: string, monthZhi: string,
  dayGan: string, dayZhi: string,
  hourGan: string, hourZhi: string
): Record<string, number> {
  const count = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 }
  
  const gans = [yearGan, monthGan, dayGan, hourGan]
  gans.forEach(gan => {
    const wx = GAN_WUXING[gan]
    if (wx) count[wx]++
  })
  
  const zhis = [yearZhi, monthZhi, dayZhi, hourZhi]
  zhis.forEach(zhi => {
    const wx = ZHI_WUXING[zhi]
    if (wx) count[wx]++
  })
  
  return count
}

// 计算八字
export function calculateBazi(data: {
  name?: string;
  gender?: "male" | "female";
  calendarType?: "solar" | "lunar";
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  birthPlace?: string;
  timezone?: string;
  saveToRecord?: boolean;
}) {
  // 计算时辰
  const shiChenIndex = Math.floor((data.hour + 1) % 24 / 2)
  const hourZhi = DI_ZHI[shiChenIndex]
  
  // 这里简化计算，使用 lunar-javascript 库来计算
  // 由于我们没有完整的库，这里使用简单的计算
  // 实际项目中应该使用 lunar-javascript
  
  // 先定义一个简单的天干地支计算
  // 这只是一个示例，实际应该使用完整的农历库
  
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
  
  // 简化版八字计算 - 实际应该使用完整的农历库
  // 这里只是为了演示
  const yearGanIndex = (data.year - 4) % 10
  const yearZhiIndex = (data.year - 4) % 12
  
  const yearGan = TIAN_GAN[yearGanIndex >= 0 ? yearGanIndex : yearGanIndex + 10]
  const yearZhi = DI_ZHI[yearZhiIndex >= 0 ? yearZhiIndex : yearZhiIndex + 12]
  
  const monthGanIndex = (yearGanIndex * 2 + data.month) % 10
  const monthZhiIndex = (data.month + 1) % 12
  const monthGan = TIAN_GAN[monthGanIndex >= 0 ? monthGanIndex : monthGanIndex + 10]
  const monthZhi = DI_ZHI[monthZhiIndex >= 0 ? monthZhiIndex : monthZhiIndex + 12]
  
  // 简化版日干支计算
  const dayGanIndex = (data.day + yearGanIndex * 5) % 10
  const dayZhiIndex = (data.day + yearZhiIndex * 6) % 12
  const dayGan = TIAN_GAN[dayGanIndex >= 0 ? dayGanIndex : dayGanIndex + 10]
  const dayZhi = DI_ZHI[dayZhiIndex >= 0 ? dayZhiIndex : dayZhiIndex + 12]
  
  // 时干支计算
  const hourGanIndex = (dayGanIndex * 2 + shiChenIndex) % 10
  const hourGan = TIAN_GAN[hourGanIndex >= 0 ? hourGanIndex : hourGanIndex + 10]
  
  const getShiShen = (targetGan: string): string => {
    return SHI_SHEN_MAP[dayGan]?.[targetGan] || ""
  }
  
  const getCangGan = (zhi: string): string[] => {
    const CANG_GAN_SIMPLE: Record<string, string[]> = {
      "子": ["癸"], "丑": ["己", "癸", "辛"], "寅": ["甲", "丙", "戊"], "卯": ["乙"],
      "辰": ["戊", "乙", "癸"], "巳": ["丙", "庚", "戊"], "午": ["丁", "己"], "未": ["己", "丁", "乙"],
      "申": ["庚", "壬", "戊"], "酉": ["辛"], "戌": ["戊", "辛", "丁"], "亥": ["壬", "甲"],
    }
    return CANG_GAN_SIMPLE[zhi] || []
  }
  
  return {
    name: data.name || "未知",
    gender: data.gender || "male",
    solarDate: `${data.year}年${data.month}月${data.day}日`,
    lunarDate: `${data.year}年${data.month}月${data.day}日`,
    age: new Date().getFullYear() - data.year,
    siZhu: {
      year: {
        gan: yearGan,
        zhi: yearZhi,
        shiShen: getShiShen(yearGan),
        cangGan: getCangGan(yearZhi),
        naYin: NA_YIN[yearGan + yearZhi] || ""
      },
      month: {
        gan: monthGan,
        zhi: monthZhi,
        shiShen: getShiShen(monthGan),
        cangGan: getCangGan(monthZhi),
        naYin: NA_YIN[monthGan + monthZhi] || ""
      },
      day: {
        gan: dayGan,
        zhi: dayZhi,
        shiShen: "日主",
        cangGan: getCangGan(dayZhi),
        naYin: NA_YIN[dayGan + dayZhi] || ""
      },
      hour: {
        gan: hourGan,
        zhi: hourZhi,
        shiShen: getShiShen(hourGan),
        cangGan: getCangGan(hourZhi),
        naYin: NA_YIN[hourGan + hourZhi] || ""
      }
    }
  }
}

// 含藏干的五行统计
export function calculateWuxingWithCangGan(
  yearZhi: string, monthZhi: string, dayZhi: string, hourZhi: string
): Record<string, number> {
  const count = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 }
  
  const allZhi = [yearZhi, monthZhi, dayZhi, hourZhi]
  allZhi.forEach(zhi => {
    const cangGanList = ZHI_CANG_GAN[zhi] || []
    cangGanList.forEach(item => {
      count[item.wuxing] += item.power
    })
  })
  
  return count
}