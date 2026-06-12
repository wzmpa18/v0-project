// 三元九运数据 - 基于《三元地理》

// 三元
export const SAN_YUAN = [
  { name: "上元", period: "1864-1923", desc: "上元一运至三运，共60年" },
  { name: "中元", period: "1924-1983", desc: "中元四运至六运，共60年" },
  { name: "下元", period: "1984-2043", desc: "下元七运至九运，共60年" },
]

// 九运
export const JIU_YUN = [
  { name: "一运", number: 1, period: "1864-1883", star: "一白贪狼", wuxing: "水", desc: "一运坎水当令，主智慧、学业" },
  { name: "二运", number: 2, period: "1884-1903", star: "二黑巨门", wuxing: "土", desc: "二运坤土当令，主疾病、阻碍" },
  { name: "三运", number: 3, period: "1904-1923", star: "三碧禄存", wuxing: "木", desc: "三运震木当令，主争斗、是非" },
  { name: "四运", number: 4, period: "1924-1943", star: "四绿文曲", wuxing: "木", desc: "四运巽木当令，主学业、文采" },
  { name: "五运", number: 5, period: "1944-1963", star: "五黄廉贞", wuxing: "土", desc: "五运中宫当令，主灾厄、变化" },
  { name: "六运", number: 6, period: "1964-1983", star: "六白武曲", wuxing: "金", desc: "六运乾金当令，主权力、财富" },
  { name: "七运", number: 7, period: "1984-2003", star: "七赤破军", wuxing: "金", desc: "七运兑金当令，主口舌、艺术" },
  { name: "八运", number: 8, period: "2004-2023", star: "八白左辅", wuxing: "土", desc: "八运艮土当令，主财富、稳定" },
  { name: "九运", number: 9, period: "2024-2043", star: "九紫右弼", wuxing: "火", desc: "九运离火当令，主喜庆、文明" },
]

// 九星
export const JIU_XING_FENG_SHUI = [
  { name: "一白贪狼", number: 1, wuxing: "水", nature: "吉", desc: "主智慧、学业、桃花" },
  { name: "二黑巨门", number: 2, wuxing: "土", nature: "凶", desc: "主疾病、阻碍、灾厄" },
  { name: "三碧禄存", number: 3, wuxing: "木", nature: "凶", desc: "主争斗、是非、口舌" },
  { name: "四绿文曲", number: 4, wuxing: "木", nature: "吉", desc: "主学业、文采、贵人" },
  { name: "五黄廉贞", number: 5, wuxing: "土", nature: "凶", desc: "主灾厄、变化、意外" },
  { name: "六白武曲", number: 6, wuxing: "金", nature: "吉", desc: "主权力、财富、事业" },
  { name: "七赤破军", number: 7, wuxing: "金", nature: "凶", desc: "主口舌、艺术、破败" },
  { name: "八白左辅", number: 8, wuxing: "土", nature: "吉", desc: "主财富、稳定、贵人" },
  { name: "九紫右弼", number: 9, wuxing: "火", nature: "吉", desc: "主喜庆、文明、姻缘" },
]

// 计算当前运
export function getCurrentYun(year: number): { yun: typeof JIU_YUN[0]; yuan: typeof SAN_YUAN[0] } {
  let yunIndex = 0
  let yuanIndex = 0
  
  if (year >= 1864 && year <= 1923) {
    yuanIndex = 0 // 上元
    yunIndex = Math.floor((year - 1864) / 20)
  } else if (year >= 1924 && year <= 1983) {
    yuanIndex = 1 // 中元
    yunIndex = Math.floor((year - 1924) / 20) + 3
  } else if (year >= 1984 && year <= 2043) {
    yuanIndex = 2 // 下元
    yunIndex = Math.floor((year - 1984) / 20) + 6
  } else {
    // 默认返回当前运
    yunIndex = 7 // 八运
    yuanIndex = 2 // 下元
  }
  
  return {
    yun: JIU_YUN[yunIndex] || JIU_YUN[7],
    yuan: SAN_YUAN[yuanIndex] || SAN_YUAN[2],
  }
}

// 三元九运简介
export const SAN_YUAN_INTRO = {
  title: "三元九运",
  origin: "《三元地理》",
  description: "三元九运是玄空风水的时间框架，以180年为一个周期，分为上元、中元、下元三个阶段，每元60年，每元又分为三运，每运20年。",
  features: [
    "以180年为周期",
    "分为三元九运",
    "每运20年",
    "结合飞星风水",
  ],
  principles: [
    { name: "三元", desc: "上元、中元、下元各60年" },
    { name: "九运", desc: "每运20年，共180年" },
    { name: "九星", desc: "一白至九紫九星轮值" },
    { name: "飞星", desc: "结合玄空飞星布局" },
  ],
}