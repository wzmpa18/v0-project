// 占星术数据 - 十二星座运势分析

// 十二星座
export const SHI_ER_XING_ZUO = [
  { name: "白羊座", symbol: "♈", english: "Aries", date: "3.21-4.19", element: "火", ruler: "火星", desc: "热情、勇敢、冲动" },
  { name: "金牛座", symbol: "♉", english: "Taurus", date: "4.20-5.20", element: "土", ruler: "金星", desc: "稳重、务实、固执" },
  { name: "双子座", symbol: "♊", english: "Gemini", date: "5.21-6.21", element: "风", ruler: "水星", desc: "聪明、多变、善辩" },
  { name: "巨蟹座", symbol: "♋", english: "Cancer", date: "6.22-7.22", element: "水", ruler: "月亮", desc: "敏感、温柔、多疑" },
  { name: "狮子座", symbol: "♌", english: "Leo", date: "7.23-8.22", element: "火", ruler: "太阳", desc: "自信、慷慨、霸道" },
  { name: "处女座", symbol: "♍", english: "Virgo", date: "8.23-9.22", element: "土", ruler: "水星", desc: "细致、完美主义、挑剔" },
  { name: "天秤座", symbol: "♎", english: "Libra", date: "9.23-10.23", element: "风", ruler: "金星", desc: "优雅、公正、犹豫" },
  { name: "天蝎座", symbol: "♏", english: "Scorpio", date: "10.24-11.22", element: "水", ruler: "冥王星", desc: "神秘、执着、多疑" },
  { name: "射手座", symbol: "♐", english: "Sagittarius", date: "11.23-12.21", element: "火", ruler: "木星", desc: "乐观、自由、粗心" },
  { name: "摩羯座", symbol: "♑", english: "Capricorn", date: "12.22-1.19", element: "土", ruler: "土星", desc: "务实、野心、保守" },
  { name: "水瓶座", symbol: "♒", english: "Aquarius", date: "1.20-2.18", element: "风", ruler: "天王星", desc: "独立、创新、叛逆" },
  { name: "双鱼座", symbol: "♓", english: "Pisces", date: "2.19-3.20", element: "水", ruler: "海王星", desc: "浪漫、敏感、梦幻" },
]

// 星座运势
export const XING_ZUO_YUN_SHI: Record<string, {
  overall: string
  love: string
  career: string
  wealth: string
  health: string
  lucky: { number: number; color: string; direction: string }
}> = {
  "白羊座": {
    overall: "今日运势旺盛，适合开展新项目，但需注意冲动行事。",
    love: "感情运势良好，单身者有机会遇到心仪对象。",
    career: "工作顺利，适合展现领导才能，但需注意团队合作。",
    wealth: "财运平稳，不宜大额投资，适合稳健理财。",
    health: "精力充沛，但需注意休息，避免过度劳累。",
    lucky: { number: 9, color: "红色", direction: "东方" },
  },
  "金牛座": {
    overall: "今日运势平稳，适合处理财务事务，不宜冒险。",
    love: "感情稳定，已婚者家庭和睦，单身者需主动出击。",
    career: "工作踏实，适合处理细节事务，不宜跳槽。",
    wealth: "财运良好，适合投资理财，但需谨慎决策。",
    health: "身体状况良好，但需注意饮食健康。",
    lucky: { number: 6, color: "绿色", direction: "东南" },
  },
  "双子座": {
    overall: "今日运势活跃，适合社交沟通，但需注意言行。",
    love: "感情多变，需保持稳定心态，不宜轻易改变。",
    career: "工作顺利，适合创意工作，但需专注执行。",
    wealth: "财运波动，不宜大额消费，适合小额投资。",
    health: "精神状态良好，但需注意睡眠质量。",
    lucky: { number: 5, color: "黄色", direction: "南方" },
  },
  "巨蟹座": {
    overall: "今日运势温和，适合家庭事务，不宜远行。",
    love: "感情温馨，适合与家人相处，单身者需耐心等待。",
    career: "工作稳定，适合处理人际关系，不宜独断。",
    wealth: "财运平稳，适合储蓄，不宜冲动消费。",
    health: "情绪敏感，需注意心理调节。",
    lucky: { number: 2, color: "白色", direction: "北方" },
  },
  "狮子座": {
    overall: "今日运势旺盛，适合展现才华，但需注意谦虚。",
    love: "感情热烈，适合表达爱意，但需尊重对方。",
    career: "工作顺利，适合领导决策，但需听取建议。",
    wealth: "财运良好，适合投资创业，但需谨慎。",
    health: "精力充沛，但需注意心脏健康。",
    lucky: { number: 1, color: "金色", direction: "东方" },
  },
  "处女座": {
    overall: "今日运势细致，适合处理细节，但需注意放松。",
    love: "感情谨慎，需放下完美主义，接受不完美。",
    career: "工作认真，适合精细工作，但需避免过度挑剔。",
    wealth: "财运稳健，适合理财规划，不宜冒险。",
    health: "身体状况良好，但需注意消化系统。",
    lucky: { number: 5, color: "蓝色", direction: "西方" },
  },
  "天秤座": {
    overall: "今日运势优雅，适合社交活动，但需果断决策。",
    love: "感情和谐，适合沟通协商，但需避免犹豫。",
    career: "工作顺利，适合团队合作，但需明确目标。",
    wealth: "财运平稳，适合平衡收支，不宜借贷。",
    health: "身体状况良好，但需注意皮肤保养。",
    lucky: { number: 6, color: "粉色", direction: "南方" },
  },
  "天蝎座": {
    overall: "今日运势神秘，适合深入研究，但需注意情绪。",
    love: "感情深沉，适合深度交流，但需避免猜疑。",
    career: "工作专注，适合独立工作，但需注意合作。",
    wealth: "财运隐秘，适合低调理财，不宜炫耀。",
    health: "精神状态良好，但需注意内分泌。",
    lucky: { number: 8, color: "黑色", direction: "北方" },
  },
  "射手座": {
    overall: "今日运势乐观，适合外出旅行，但需注意安全。",
    love: "感情自由，适合追求浪漫，但需承担责任。",
    career: "工作顺利，适合拓展业务，但需脚踏实地。",
    wealth: "财运波动，适合冒险投资，但需谨慎。",
    health: "精力充沛，但需注意运动安全。",
    lucky: { number: 3, color: "紫色", direction: "东南" },
  },
  "摩羯座": {
    overall: "今日运势务实，适合规划未来，但需注意放松。",
    love: "感情稳定，适合长远规划，但需表达情感。",
    career: "工作顺利，适合晋升发展，但需注意休息。",
    wealth: "财运良好，适合储蓄投资，不宜消费。",
    health: "身体状况良好，但需注意骨骼健康。",
    lucky: { number: 4, color: "棕色", direction: "北方" },
  },
  "水瓶座": {
    overall: "今日运势独立，适合创新思考，但需注意沟通。",
    love: "感情独特，适合精神交流，但需关注现实。",
    career: "工作顺利，适合创意工作，但需注意执行。",
    wealth: "财运平稳，适合科技投资，不宜传统。",
    health: "精神状态良好，但需注意神经系统。",
    lucky: { number: 7, color: "青色", direction: "西方" },
  },
  "双鱼座": {
    overall: "今日运势浪漫，适合艺术创作，但需注意现实。",
    love: "感情梦幻，适合浪漫表达，但需脚踏实地。",
    career: "工作顺利，适合创意工作，但需注意细节。",
    wealth: "财运波动，适合艺术投资，不宜理财。",
    health: "情绪敏感，需注意心理调节。",
    lucky: { number: 7, color: "海蓝色", direction: "南方" },
  },
}

// 星座配对
export const XING_ZUO_PEI_DU: Record<string, Record<string, { score: number; desc: string }>> = {
  "白羊座": {
    "狮子座": { score: 95, desc: "火象星座配对，热情相投" },
    "射手座": { score: 90, desc: "火象星座配对，自由相配" },
    "双子座": { score: 85, desc: "互补配对，活力十足" },
    "天秤座": { score: 70, desc: "对立配对，需互相理解" },
    "摩羯座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "金牛座": {
    "处女座": { score: 95, desc: "土象星座配对，稳重相投" },
    "摩羯座": { score: 90, desc: "土象星座配对，务实相配" },
    "巨蟹座": { score: 85, desc: "互补配对，温馨和谐" },
    "天蝎座": { score: 70, desc: "对立配对，需互相理解" },
    "狮子座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "双子座": {
    "天秤座": { score: 95, desc: "风象星座配对，优雅相投" },
    "水瓶座": { score: 90, desc: "风象星座配对，创新相配" },
    "白羊座": { score: 85, desc: "互补配对，活力十足" },
    "射手座": { score: 70, desc: "对立配对，需互相理解" },
    "巨蟹座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "巨蟹座": {
    "天蝎座": { score: 95, desc: "水象星座配对，深情相投" },
    "双鱼座": { score: 90, desc: "水象星座配对，浪漫相配" },
    "金牛座": { score: 85, desc: "互补配对，温馨和谐" },
    "摩羯座": { score: 70, desc: "对立配对，需互相理解" },
    "白羊座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "狮子座": {
    "白羊座": { score: 95, desc: "火象星座配对，热情相投" },
    "射手座": { score: 90, desc: "火象星座配对，自由相配" },
    "双子座": { score: 85, desc: "互补配对，活力十足" },
    "水瓶座": { score: 70, desc: "对立配对，需互相理解" },
    "金牛座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "处女座": {
    "金牛座": { score: 95, desc: "土象星座配对，稳重相投" },
    "摩羯座": { score: 90, desc: "土象星座配对，务实相配" },
    "巨蟹座": { score: 85, desc: "互补配对，温馨和谐" },
    "双鱼座": { score: 70, desc: "对立配对，需互相理解" },
    "双子座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "天秤座": {
    "双子座": { score: 95, desc: "风象星座配对，优雅相投" },
    "水瓶座": { score: 90, desc: "风象星座配对，创新相配" },
    "狮子座": { score: 85, desc: "互补配对，活力十足" },
    "白羊座": { score: 70, desc: "对立配对，需互相理解" },
    "天蝎座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "天蝎座": {
    "巨蟹座": { score: 95, desc: "水象星座配对，深情相投" },
    "双鱼座": { score: 90, desc: "水象星座配对，浪漫相配" },
    "处女座": { score: 85, desc: "互补配对，细致和谐" },
    "金牛座": { score: 70, desc: "对立配对，需互相理解" },
    "天秤座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "射手座": {
    "白羊座": { score: 95, desc: "火象星座配对，热情相投" },
    "狮子座": { score: 90, desc: "火象星座配对，自由相配" },
    "天秤座": { score: 85, desc: "互补配对，活力十足" },
    "双子座": { score: 70, desc: "对立配对，需互相理解" },
    "摩羯座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "摩羯座": {
    "金牛座": { score: 95, desc: "土象星座配对，稳重相投" },
    "处女座": { score: 90, desc: "土象星座配对，务实相配" },
    "天蝎座": { score: 85, desc: "互补配对，深沉和谐" },
    "巨蟹座": { score: 70, desc: "对立配对，需互相理解" },
    "射手座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "水瓶座": {
    "双子座": { score: 95, desc: "风象星座配对，优雅相投" },
    "天秤座": { score: 90, desc: "风象星座配对，创新相配" },
    "射手座": { score: 85, desc: "互补配对，自由和谐" },
    "狮子座": { score: 70, desc: "对立配对，需互相理解" },
    "巨蟹座": { score: 50, desc: "性格差异大，需磨合" },
  },
  "双鱼座": {
    "巨蟹座": { score: 95, desc: "水象星座配对，深情相投" },
    "天蝎座": { score: 90, desc: "水象星座配对，浪漫相配" },
    "摩羯座": { score: 85, desc: "互补配对，现实浪漫" },
    "处女座": { score: 70, desc: "对立配对，需互相理解" },
    "水瓶座": { score: 50, desc: "性格差异大，需磨合" },
  },
}

// 根据日期获取星座
export function getXingZuo(month: number, day: number): string {
  const dates = [
    { start: [1, 20], end: [2, 18], name: "水瓶座" },
    { start: [2, 19], end: [3, 20], name: "双鱼座" },
    { start: [3, 21], end: [4, 19], name: "白羊座" },
    { start: [4, 20], end: [5, 20], name: "金牛座" },
    { start: [5, 21], end: [6, 21], name: "双子座" },
    { start: [6, 22], end: [7, 22], name: "巨蟹座" },
    { start: [7, 23], end: [8, 22], name: "狮子座" },
    { start: [8, 23], end: [9, 22], name: "处女座" },
    { start: [9, 23], end: [10, 23], name: "天秤座" },
    { start: [10, 24], end: [11, 22], name: "天蝎座" },
    { start: [11, 23], end: [12, 21], name: "射手座" },
    { start: [12, 22], end: [1, 19], name: "摩羯座" },
  ]
  
  for (const d of dates) {
    if (d.end[0] < d.start[0]) {
      // 跨年的情况（摩羯座）
      if ((month === d.start[0] && day >= d.start[1]) || month === d.end[0] && day <= d.end[1]) {
        return d.name
      }
    } else {
      if ((month === d.start[0] && day >= d.start[1]) || (month === d.end[0] && day <= d.end[1]) || (month > d.start[0] && month < d.end[0])) {
        return d.name
      }
    }
  }
  
  return "摩羯座" // 默认
}