export const BA_ZHAI_DIRECTIONS = {
  "坎": { direction: "正北", wuxing: "水", number: 1, goodFor: ["中男", "财帛"], badFor: ["火灾"] },
  "离": { direction: "正南", wuxing: "火", number: 9, goodFor: ["中女", "名声"], badFor: ["水灾"] },
  "震": { direction: "正东", wuxing: "木", number: 3, goodFor: ["长男", "事业"], badFor: ["金属伤害"] },
  "兑": { direction: "正西", wuxing: "金", number: 7, goodFor: ["少女", "口才"], badFor: ["口角"] },
  "巽": { direction: "东南", wuxing: "木", number: 4, goodFor: ["长女", "文昌"], badFor: ["风灾"] },
  "乾": { direction: "西北", wuxing: "金", number: 6, goodFor: ["老父", "贵人"], badFor: ["意外"] },
  "坤": { direction: "西南", wuxing: "土", number: 2, goodFor: ["老母", "健康"], badFor: ["疾病"] },
  "艮": { direction: "东北", wuxing: "土", number: 8, goodFor: ["少男", "学业"], badFor: ["阻碍"] },
}

export const BA_ZHAI_GUA = [
  { name: "坎", symbol: "☵", direction: "正北", wuxing: "水", family: "中男" },
  { name: "离", symbol: "☲", direction: "正南", wuxing: "火", family: "中女" },
  { name: "震", symbol: "☳", direction: "正东", wuxing: "木", family: "长男" },
  { name: "兑", symbol: "☱", direction: "正西", wuxing: "金", family: "少女" },
  { name: "巽", symbol: "☴", direction: "东南", wuxing: "木", family: "长女" },
  { name: "乾", symbol: "☰", direction: "西北", wuxing: "金", family: "老父" },
  { name: "坤", symbol: "☷", direction: "西南", wuxing: "土", family: "老母" },
  { name: "艮", symbol: "☶", direction: "东北", wuxing: "土", family: "少男" },
]

export const XUAN_KONG_STARS = [
  { number: 1, name: "一白贪狼星", nature: "吉", wuxing: "水", effect: "官贵、智慧、桃花" },
  { number: 2, name: "二黑巨门星", nature: "凶", wuxing: "土", effect: "病符、灾祸" },
  { number: 3, name: "三碧禄存星", nature: "凶", wuxing: "木", effect: "是非、争斗" },
  { number: 4, name: "四绿文昌星", nature: "吉", wuxing: "木", effect: "文昌、学业" },
  { number: 5, name: "五黄廉贞星", nature: "凶", wuxing: "土", effect: "灾祸、病厄" },
  { number: 6, name: "六白武曲星", nature: "吉", wuxing: "金", effect: "权贵、财富" },
  { number: 7, name: "七赤破军星", nature: "凶", wuxing: "金", effect: "盗贼、口舌" },
  { number: 8, name: "八白左辅星", nature: "吉", wuxing: "土", effect: "财富、田产" },
  { number: 9, name: "九紫右弼星", nature: "吉", wuxing: "火", effect: "喜庆、婚姻" },
]

export const FENG_SHUI_TIPS = [
  { category: "入门", tip: "大门不宜正对电梯或楼梯，易犯冲煞" },
  { category: "入门", tip: "大门宜明亮整洁，象征家运兴旺" },
  { category: "客厅", tip: "客厅宜宽敞明亮，不宜阴暗潮湿" },
  { category: "客厅", tip: "沙发不宜背门，宜有靠山" },
  { category: "卧室", tip: "床头不宜正对镜子或窗户" },
  { category: "卧室", tip: "床位不宜横梁压顶" },
  { category: "厨房", tip: "厨房不宜靠近卧室，火气太盛" },
  { category: "厨房", tip: "灶台不宜正对水槽，水火相冲" },
  { category: "卫生间", tip: "卫生间不宜正对大门或卧室" },
  { category: "卫生间", tip: "卫生间宜保持干燥通风" },
  { category: "书房", tip: "书桌宜面向窗户，采光良好" },
  { category: "书房", tip: "文昌位宜摆放书桌或书架" },
]

export const BA_ZHAI_HOUSE_TYPES = [
  { name: "东四宅", guas: ["坎", "离", "震", "巽"], description: "适合东四命的人居住" },
  { name: "西四宅", guas: ["乾", "坤", "艮", "兑"], description: "适合西四命的人居住" },
]

export function calculateBaZhaiMing(gender: string, year: number): { ming: string; gua: string } {
  let base = gender === "男" ? 100 : 99
  let remainder = (base - year % 100) % 9
  if (remainder === 0) remainder = 9
  
  const guaMap: Record<number, string> = {
    1: "坎", 2: "坤", 3: "震", 4: "巽", 5: gender === "男" ? "坤" : "艮",
    6: "乾", 7: "兑", 8: "艮", 9: "离"
  }
  
  const gua = guaMap[remainder]
  const ming = ["坎", "离", "震", "巽"].includes(gua) ? "东四命" : "西四命"
  
  return { ming, gua }
}

export function getHouseType(mainDoorDirection: string): string {
  const eastFourGua = ["坎", "离", "震", "巽"]
  const directionMap: Record<string, string> = {
    "正北": "坎", "正南": "离", "正东": "震", "正西": "兑",
    "东南": "巽", "西北": "乾", "西南": "坤", "东北": "艮"
  }
  const gua = directionMap[mainDoorDirection] || "坎"
  return eastFourGua.includes(gua) ? "东四宅" : "西四宅"
}

export function isMatchingHouse(ming: string, houseType: string): boolean {
  return (ming === "东四命" && houseType === "东四宅") || 
         (ming === "西四命" && houseType === "西四宅")
}

export function calculateXuanKongFeiXing(year: number): number[] {
  const period = Math.floor((year - 1864) / 20) + 1
  const flyingStars: number[] = []
  
  for (let i = 1; i <= 9; i++) {
    let star = (period - i + 9) % 9
    flyingStars.push(star === 0 ? 9 : star)
  }
  
  return flyingStars
}