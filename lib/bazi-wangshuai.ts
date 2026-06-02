"use client"

import { GAN_WUXING, ZHI_WUXING, ZHI_CANG_GAN, TIAN_GAN, DI_ZHI } from "./bazi-data"

// 旺衰等级
export type WangShuaiLevel = "极旺" | "太旺" | "偏旺" | "中和" | "偏弱" | "太弱" | "极弱"

// 五行旺相休囚死 - 参考《滴天髓》
export const WUXING_WANGXIANG: Record<string, Record<string, string>> = {
  木: { 春: "旺", 夏: "休", 秋: "死", 冬: "相", 四季: "囚" },
  火: { 春: "相", 夏: "旺", 秋: "休", 冬: "死", 四季: "相" },
  土: { 春: "死", 夏: "相", 秋: "旺", 冬: "休", 四季: "旺" },
  金: { 春: "囚", 夏: "死", 秋: "相", 冬: "旺", 四季: "休" },
  水: { 春: "休", 夏: "相", 秋: "囚", 冬: "死", 四季: "死" }
}

// 月令力量权重
const YUE_LING_WEIGHT = 50
const OTHER_ZHI_WEIGHT = 15
const CANG_GAN_WEIGHT = 5
const TIAN_GAN_WEIGHT = 10

// 获取季节
function getSeason(monthZhi: string): string {
  const spring = ["寅", "卯", "辰"]
  const summer = ["巳", "午", "未"]
  const autumn = ["申", "酉", "戌"]
  const winter = ["亥", "子", "丑"]
  
  if (spring.includes(monthZhi)) return "春"
  if (summer.includes(monthZhi)) return "夏"
  if (autumn.includes(monthZhi)) return "秋"
  if (winter.includes(monthZhi)) return "冬"
  return "四季"
}

// 计算某五行的得分
function calculateWuxingScore(
  wuxing: string,
  dayGan: string,
  yearGan: string, yearZhi: string,
  monthGan: string, monthZhi: string,
  dayZhi: string,
  hourGan: string, hourZhi: string
): number {
  let score = 0
  
  // 防御性检查
  if (!wuxing || !dayGan || !yearGan || !yearZhi || !monthGan || !monthZhi || !dayZhi || !hourGan || !hourZhi) {
    return score
  }
  
  const season = getSeason(monthZhi)
  const wangxiang = WUXING_WANGXIANG[wuxing]?.[season]
  
  // 月令得令加分
  if (wangxiang === "旺") score += YUE_LING_WEIGHT
  else if (wangxiang === "相") score += YUE_LING_WEIGHT * 0.7
  else if (wangxiang === "休") score += YUE_LING_WEIGHT * 0.3
  else if (wangxiang === "囚") score += YUE_LING_WEIGHT * 0.1
  // 死不加
  
  // 天干助力
  const gans = [yearGan, monthGan, hourGan]
  gans.forEach(gan => {
    if (GAN_WUXING[gan] === wuxing) {
      score += TIAN_GAN_WEIGHT
    }
  })
  
  // 日干本身
  if (GAN_WUXING[dayGan] === wuxing) {
    score += TIAN_GAN_WEIGHT * 1.5
  }
  
  // 地支助力（含藏干）
  const zhis = [yearZhi, monthZhi, dayZhi, hourZhi]
  zhis.forEach(zhi => {
    // 地支本气
    if (ZHI_WUXING[zhi] === wuxing) {
      score += OTHER_ZHI_WEIGHT
    }
    
    // 藏干
    const cangGanList = ZHI_CANG_GAN[zhi] || []
    cangGanList.forEach(cangGan => {
      if (cangGan.wuxing === wuxing) {
        score += CANG_GAN_WEIGHT * cangGan.power
      }
    })
  })
  
  return score
}

// 计算日主旺衰
export function calculateDayGanWangShuai(
  dayGan: string,
  yearGan: string, yearZhi: string,
  monthGan: string, monthZhi: string,
  dayZhi: string,
  hourGan: string, hourZhi: string
): { level: WangShuaiLevel; score: number; details: string[] } {
  // 防御性检查
  if (!dayGan || !yearGan || !yearZhi || !monthGan || !monthZhi || !dayZhi || !hourGan || !hourZhi) {
    return { level: "中和", score: 0, details: ["数据不完整，无法计算旺衰"] }
  }
  
  const dayWuxing = GAN_WUXING[dayGan] || ""
  const score = calculateWuxingScore(
    dayWuxing, dayGan,
    yearGan, yearZhi,
    monthGan, monthZhi,
    dayZhi,
    hourGan, hourZhi
  )
  
  const level = getWangShuaiLevel(score)
  const details = generateWangShuaiDetails(
    dayGan, dayWuxing, score,
    yearGan, yearZhi,
    monthGan, monthZhi,
    dayZhi,
    hourGan, hourZhi
  )
  
  return { level, score, details }
}

// 获取旺衰等级
function getWangShuaiLevel(score: number): WangShuaiLevel {
  if (score >= 80) return "极旺"
  if (score >= 65) return "太旺"
  if (score >= 50) return "偏旺"
  if (score >= 35) return "中和"
  if (score >= 20) return "偏弱"
  if (score >= 10) return "太弱"
  return "极弱"
}

// 生成旺衰分析详情
function generateWangShuaiDetails(
  dayGan: string, dayWuxing: string, score: number,
  yearGan: string, yearZhi: string,
  monthGan: string, monthZhi: string,
  dayZhi: string,
  hourGan: string, hourZhi: string
): string[] {
  const details: string[] = []
  
  // 防御性检查
  if (!dayGan || !dayWuxing || !yearGan || !yearZhi || !monthGan || !monthZhi || !dayZhi || !hourGan || !hourZhi) {
    details.push("数据不完整，无法分析")
    return details
  }
  
  const season = getSeason(monthZhi)
  const wangxiang = WUXING_WANGXIANG[dayWuxing]?.[season]
  
  details.push(`${dayGan}日主，${dayWuxing}命，生于${season}季`)
  
  if (wangxiang === "旺") {
    details.push("月令得令，气势旺盛")
  } else if (wangxiang === "相") {
    details.push("月令得地，气势不弱")
  } else if (wangxiang === "休") {
    details.push("月令休囚，气势稍弱")
  } else if (wangxiang === "囚") {
    details.push("月令受制，气势衰弱")
  } else {
    details.push("月令处死地，气势最弱")
  }
  
  // 检查天干助力
  const validGans = [yearGan, monthGan, hourGan].filter(gan => gan && GAN_WUXING[gan])
  const ganHelpers = validGans.filter(gan => GAN_WUXING[gan] === dayWuxing)
  if (ganHelpers.length > 0) {
    details.push(`天干得${ganHelpers.join("、")}助力，增力${ganHelpers.length * 10}分`)
  }
  
  // 检查地支助力
  const validZhis = [yearZhi, monthZhi, dayZhi, hourZhi].filter(zhi => zhi && ZHI_WUXING[zhi])
  const zhiHelpers = validZhis.filter(zhi => ZHI_WUXING[zhi] === dayWuxing)
  if (zhiHelpers.length > 0) {
    details.push(`地支得${zhiHelpers.join("、")}助力`)
  }
  
  // 检查藏干助力
  let cangGanHelpers: string[] = []
  validZhis.forEach(zhi => {
    const cangGanList = ZHI_CANG_GAN[zhi] || []
    cangGanList.forEach(cangGan => {
      if (cangGan.wuxing === dayWuxing) {
        cangGanHelpers.push(`${zhi}中藏${cangGan.gan}`)
      }
    })
  })
  if (cangGanHelpers.length > 0) {
    details.push(`藏干得${cangGanHelpers.join("、")}助力`)
  }
  
  details.push(`综合得分：${score.toFixed(1)}分，判定为${getWangShuaiLevel(score)}`)
  
  return details
}

// 滴天髓论五行 - 参考《滴天髓》
export const DI_TIAN_SUI_WUXING: Record<string, { description: string; characteristics: string[] }> = {
  木: {
    description: "甲木参天，脱胎要火。春不容金，秋不容土。火炽乘龙，水宕骑虎。地润天和，植立千古。",
    characteristics: [
      "木主仁，其性直，其情和",
      "木旺之人面色青白，身材修长",
      "木盛则体健神清，骨格修长",
      "木衰则个子瘦小，毛发稀少"
    ]
  },
  火: {
    description: "丙火猛烈，欺霜侮雪。能煅庚金，逢辛反怯。土众成慈，水猖显节。虎马犬乡，甲来焚灭。",
    characteristics: [
      "火主礼，其性急，其情恭",
      "火旺之人面色红润，精神饱满",
      "火盛则热情洋溢，积极向上",
      "火衰则性格急躁，缺乏耐心"
    ]
  },
  土: {
    description: "戊土固重，既中且正。静翕动辟，万物司命。水润物生，火燥喜病。若在艮坤，怕冲宜静。",
    characteristics: [
      "土主信，其性重，其情厚",
      "土旺之人面色黄润，身材敦厚",
      "土盛则诚实守信，稳重踏实",
      "土衰则性格内向，反应迟钝"
    ]
  },
  金: {
    description: "庚金带煞，刚健为最。得水而清，得火而锐。土润则生，土干则脆。能赢甲兄，输于乙妹。",
    characteristics: [
      "金主义，其性刚，其情烈",
      "金旺之人面色白净，骨骼清秀",
      "金盛则刚毅果断，讲义气",
      "金衰则性格懦弱，优柔寡断"
    ]
  },
  水: {
    description: "壬水通河，能泄金气。刚中之德，周流不滞。通根透癸，冲天奔地。化则有情，从则相济。",
    characteristics: [
      "水主智，其性聪，其情善",
      "水旺之人面色黑中带青，头脑灵活",
      "水盛则足智多谋，聪明好学",
      "水衰则胆小怕事，缺乏主见"
    ]
  }
}

// 十干体性 - 参考《滴天髓》
export const DI_TIAN_SUI_GAN: Record<string, string> = {
  甲: "甲木参天，脱胎要火。春不容金，秋不容土。火炽乘龙，水宕骑虎。地润天和，植立千古。",
  乙: "乙木虽柔，刲羊解牛。怀丁抱丙，跨凤乘猴。虚湿之地，骑马亦忧。藤萝系甲，可春可秋。",
  丙: "丙火猛烈，欺霜侮雪。能煅庚金，逢辛反怯。土众成慈，水猖显节。虎马犬乡，甲来焚灭。",
  丁: "丁火柔中，内性昭融。抱乙而孝，合壬而忠。旺而不烈，衰而不穷。如有嫡母，可秋可冬。",
  戊: "戊土固重，既中且正。静翕动辟，万物司命。水润物生，火燥喜病。若在艮坤，怕冲宜静。",
  己: "己土卑湿，中正蓄藏。不愁木盛，不畏水狂。火少火晦，金多金光。若要物旺，宜助宜帮。",
  庚: "庚金带煞，刚健为最。得水而清，得火而锐。土润则生，土干则脆。能赢甲兄，输于乙妹。",
  辛: "辛金软弱，温润而清。畏土之叠，乐水之盈。能扶社稷，能救生灵。热则喜母，寒则喜丁。",
  壬: "壬水通河，能泄金气。刚中之德，周流不滞。通根透癸，冲天奔地。化则有情，从则相济。",
  癸: "癸水至弱，达于天津。得龙而润，功化斯神。不愁火土，不论庚辛。合戊见火，化象斯真。"
}

// 五行生克关系描述
export const WUXING_SHENGKE_DESCRIPTIONS: Record<string, Record<string, string>> = {
  木: { 火: "木生火", 土: "木克土", 水: "水生木", 金: "金克木" },
  火: { 土: "火生土", 金: "火克金", 木: "木生火", 水: "水克火" },
  土: { 金: "土生金", 水: "土克水", 火: "火生土", 木: "木克土" },
  金: { 水: "金生水", 木: "金克木", 土: "土生金", 火: "火克金" },
  水: { 木: "水生木", 火: "水克火", 金: "金生水", 土: "土克水" }
}

// 同党异党分析
export function analyzeTongDangYiDang(
  dayGan: string,
  yearGan: string, yearZhi: string,
  monthGan: string, monthZhi: string,
  dayZhi: string,
  hourGan: string, hourZhi: string
): { tongDang: number; yiDang: number; tongDangWuxing: string[]; yiDangWuxing: string[] } {
  const dayWuxing = GAN_WUXING[dayGan]
  
  const wuxingOrder = ["木", "火", "土", "金", "水"]
  const dayIdx = wuxingOrder.indexOf(dayWuxing)
  
  const tongDangWuxing = [
    dayWuxing,
    wuxingOrder[(dayIdx - 1 + 5) % 5]
  ]
  
  const yiDangWuxing = wuxingOrder.filter(wx => !tongDangWuxing.includes(wx))
  
  let tongDangScore = 0
  let yiDangScore = 0
  
  const allElements = [
    { type: "gan", value: yearGan, weight: 1 },
    { type: "gan", value: monthGan, weight: 1 },
    { type: "gan", value: dayGan, weight: 1.5 },
    { type: "gan", value: hourGan, weight: 1 },
    { type: "zhi", value: yearZhi, weight: 1 },
    { type: "zhi", value: monthZhi, weight: 2 },
    { type: "zhi", value: dayZhi, weight: 1 },
    { type: "zhi", value: hourZhi, weight: 1 }
  ]
  
  allElements.forEach(element => {
    const wuxing = element.type === "gan" ? GAN_WUXING[element.value] : ZHI_WUXING[element.value]
    if (tongDangWuxing.includes(wuxing)) {
      tongDangScore += element.weight
    } else {
      yiDangScore += element.weight
    }
  })
  
  const total = tongDangScore + yiDangScore
  
  return {
    tongDang: Math.round((tongDangScore / total) * 100),
    yiDang: Math.round((yiDangScore / total) * 100),
    tongDangWuxing,
    yiDangWuxing
  }
}