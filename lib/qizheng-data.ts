// 七政四余数据 - 基于《星学大成》《果老星宗》

// 七政（日月五星）
export const QI_ZHENG = [
  { name: "日", symbol: "☉", english: "Sun", nature: "阳", wuxing: "火", desc: "太阳，主父亲、事业、权威" },
  { name: "月", symbol: "☽", english: "Moon", nature: "阴", wuxing: "水", desc: "太阴，主母亲、情感、家庭" },
  { name: "木", symbol: "♃", english: "Jupiter", nature: "阳", wuxing: "木", desc: "岁星，主仁慈、学业、贵人" },
  { name: "火", symbol: "♂", english: "Mars", nature: "阳", wuxing: "火", desc: "荧惑，主武勇、冲动、争斗" },
  { name: "土", symbol: "♄", english: "Saturn", nature: "阴", wuxing: "土", desc: "镇星，主稳重、阻碍、延迟" },
  { name: "金", symbol: "♀", english: "Venus", nature: "阴", wuxing: "金", desc: "太白，主财富、美貌、艺术" },
  { name: "水", symbol: "☿", english: "Mercury", nature: "阴", wuxing: "水", desc: "辰星，主智慧、沟通、学习" },
]

// 四余（虚星）
export const SI_YU = [
  { name: "罗睺", symbol: "☊", nature: "阳", wuxing: "火", desc: "蚀神，主灾厄、阻碍、变化" },
  { name: "计都", symbol: "☋", nature: "阴", wuxing: "土", desc: "蚀尾，主灾厄、阻碍、变化" },
  { name: "紫炁", symbol: "⚕", nature: "阳", wuxing: "木", desc: "月孛，主吉祥、贵人、福运" },
  { name: "月孛", symbol: "⚸", nature: "阴", wuxing: "水", desc: "暗月，主隐秘、灾厄、变化" },
]

// 十二宫位
export const SHI_ER_GONG = [
  { name: "命宫", number: 1, desc: "主性格、外貌、命运总体" },
  { name: "财帛宫", number: 2, desc: "主财富、收入、物质" },
  { name: "兄弟宫", number: 3, desc: "主兄弟姐妹、朋友、社交" },
  { name: "田宅宫", number: 4, desc: "主家庭、房产、根基" },
  { name: "男女宫", number: 5, desc: "主子女、后代、创造" },
  { name: "奴仆宫", number: 6, desc: "主下属、工作、健康" },
  { name: "妻妾宫", number: 7, desc: "主婚姻、配偶、合作" },
  { name: "疾厄宫", number: 8, desc: "主疾病、灾厄、死亡" },
  { name: "迁移宫", number: 9, desc: "主出行、远方、学业" },
  { name: "官禄宫", number: 10, desc: "主事业、地位、名声" },
  { name: "福德宫", number: 11, desc: "主福气、愿望、理想" },
  { name: "相貌宫", number: 12, desc: "主外貌、隐秘、精神" },
]

// 计算命宫
export function calculateMingGong(hour: number, month: number): number {
  // 基于时辰和月份计算命宫
  const shiChenIndex = Math.floor(hour / 2) % 12
  const monthIndex = month - 1
  
  // 命宫公式：从卯宫起，顺数至时辰，逆数至月份
  const mingGongIndex = (shiChenIndex + monthIndex) % 12
  return mingGongIndex + 1
}

// 计算七政四余位置（简化版）
export function calculateQiZhengPosition(date: Date): { [key: string]: number } {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // 简化算法：基于年月日计算各星位置
  const positions: { [key: string]: number } = {}
  
  // 太阳位置（基于节气）
  positions["日"] = Math.floor(month + day / 30) % 12 + 1
  
  // 月亮位置（基于农历）
  positions["月"] = Math.floor(day % 12) + 1
  
  // 五星位置（基于年干）
  const yearGan = (year - 4) % 10
  positions["木"] = (yearGan * 2 + month) % 12 + 1
  positions["火"] = (yearGan * 3 + month) % 12 + 1
  positions["土"] = (yearGan * 4 + month) % 12 + 1
  positions["金"] = (yearGan * 5 + month) % 12 + 1
  positions["水"] = (yearGan * 6 + month) % 12 + 1
  
  // 四余位置
  positions["罗睺"] = (year % 12) + 1
  positions["计都"] = ((year + 6) % 12) + 1
  positions["紫炁"] = ((year + 3) % 12) + 1
  positions["月孛"] = ((year + 9) % 12) + 1
  
  return positions
}

// 七政四余格局
export const QI_ZHENG_GE_JU = {
  吉格: [
    { name: "日月并明", desc: "日月同宫或相照，主聪明富贵", chuchu: "《果老星宗》" },
    { name: "金木相会", desc: "金星与木星同宫，主财富学业", chuchu: "《星学大成》" },
    { name: "日月夹命", desc: "日月夹命宫，主大贵", chuchu: "《果老星宗》" },
    { name: "五星环拱", desc: "五星环绕命宫，主大富大贵", chuchu: "《星学大成》" },
    { name: "禄马同乡", desc: "禄星与马星同宫，主事业顺利", chuchu: "《果老星宗》" },
  ],
  凶格: [
    { name: "日月反背", desc: "日月相对冲，主命运起伏", chuchu: "《果老星宗》" },
    { name: "火土相克", desc: "火星与土星同宫，主灾厄阻碍", chuchu: "《星学大成》" },
    { name: "罗计夹命", desc: "罗睺计都夹命宫，主灾厄", chuchu: "《果老星宗》" },
    { name: "五星逆行", desc: "五星逆行入命宫，主命运坎坷", chuchu: "《星学大成》" },
    { name: "空亡守命", desc: "命宫无星守照，主命运漂泊", chuchu: "《果老星宗》" },
  ]
}

// 七政四余简介
export const QI_ZHENG_INTRO = {
  title: "七政四余",
  origin: "《果老星宗》《星学大成》",
  description: "七政四余是中国古代的一种占星术，以日月五星（七政）和四余（罗睺、计都、紫炁、月孛）为基础，通过观测星象来推断人的命运和世间的吉凶祸福。",
  features: [
    "以日月五星为基础",
    "结合十二宫位",
    "运用星象推命",
    "预测命运吉凶",
  ],
  principles: [
    { name: "七政", desc: "日月五星，主命运吉凶" },
    { name: "四余", desc: "虚星，主灾厄变化" },
    { name: "十二宫", desc: "命宫、财帛宫等十二宫位" },
    { name: "星象格局", desc: "吉格凶格判断命运" },
  ],
}