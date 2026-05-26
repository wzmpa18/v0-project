// 金口诀数据库

// 十二神
export const SHI_ER_SHEN = [
  { name: "登明", diZhi: "亥", wuxing: "水", nature: "贵人" },
  { name: "河魁", diZhi: "戌", wuxing: "土", nature: "天空" },
  { name: "从魁", diZhi: "酉", wuxing: "金", nature: "太阴" },
  { name: "传送", diZhi: "申", wuxing: "金", nature: "太常" },
  { name: "小吉", diZhi: "未", wuxing: "土", nature: "六合" },
  { name: "胜光", diZhi: "午", wuxing: "火", nature: "朱雀" },
  { name: "太乙", diZhi: "巳", wuxing: "火", nature: "腾蛇" },
  { name: "天罡", diZhi: "辰", wuxing: "土", nature: "天魁" },
  { name: "太冲", diZhi: "卯", wuxing: "木", nature: "六合" },
  { name: "功曹", diZhi: "寅", wuxing: "木", nature: "青龙" },
  { name: "大吉", diZhi: "丑", wuxing: "土", nature: "贵人" },
  { name: "神后", diZhi: "子", wuxing: "水", nature: "天后" },
]

// 十二地支
export const DI_ZHI_12 = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 十干
export const TIAN_GAN_10 = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

// 地支五行
export const DI_ZHI_WUXING: Record<string, string> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
}

// 天干五行
export const TIAN_GAN_WUXING: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水"
}

// 贵神起法
export const GUI_SHEN_QI_FA: Record<string, { 昼: string, 夜: string }> = {
  甲: { 昼: "丑", 夜: "未" },
  乙: { 昼: "子", 夜: "申" },
  丙: { 昼: "亥", 夜: "酉" },
  丁: { 昼: "亥", 夜: "酉" },
  戊: { 昼: "丑", 夜: "未" },
  己: { 昼: "子", 夜: "申" },
  庚: { 昼: "丑", 夜: "未" },
  辛: { 昼: "寅", 夜: "午" },
  壬: { 昼: "卯", 夜: "巳" },
  癸: { 昼: "巳", 夜: "卯" },
}

// 金口诀四位
export const SI_WEI = {
  人元: { desc: "代表自己，问事之主体" },
  贵神: { desc: "代表贵人，长辈，上级" },
  将神: { desc: "代表所问之事，事情本身" },
  地分: { desc: "代表根基，事情的基础" },
}

// 古籍断语
export const JIN_KOU_JUE_DUAN_YU = {
  总论: {
    原文: "金口诀者，又名大六壬金口诀，乃太公之遗法也。以人元为主，贵神为客，将神为事，地分为基。",
    译文: "金口诀又称大六壬金口诀，是姜太公留传的预测方法。以人元代表自己，贵神代表对方或贵人，将神代表所问的事情，地分代表事情的根基。",
    出处: "《六壬神课金口诀》"
  },
  用神: {
    原文: "用神者，课中之主也。问何事，即以何神为用。问财以财爻为用，问官以官爻为用，问婚以妻财为用。",
    译文: "用神是课中的主体，问什么事就以什么为用神。问财运以财爻为用神，问官运以官爻为用神，问婚姻以妻财为用神。",
    出处: "《六壬神课金口诀》"
  },
  生克: {
    原文: "上生下泄我之气，下生上助我之力。上克下我制彼，下克上彼制我。比和为不动。",
    译文: "上面的生下面的会泄自己的气，下面的生上面的会帮助自己。上面的克下面的表示我可以制服对方，下面的克上面的表示对方制服我。五行相同为比和，表示不动。",
    出处: "《六壬神课金口诀》"
  },
  三动: {
    原文: "三动者，人元动、贵神动、将神动也。人元动主己身有动，贵神动主贵人有动，将神动主事情有动。",
    译文: "三动指人元动、贵神动、将神动。人元动表示自己要行动，贵神动表示贵人要行动，将神动表示所问的事情会有变化。",
    出处: "《六壬神课金口诀》"
  },
  空亡: {
    原文: "空亡者，诸事不成也。人元空亡己身虚，贵神空亡贵人远，将神空亡事难成，地分空亡根基无。",
    译文: "遇到空亡表示事情难成。人元空亡表示自己处于虚弱状态，贵神空亡表示贵人难以帮助，将神空亡表示事情难以成功，地分空亡表示根基不稳。",
    出处: "《六壬神课金口诀》"
  },
}

// 占断类别
export const ZHAN_DUAN = {
  求财: [
    "财爻旺相，求财可得。",
    "财爻休囚，求财不易。",
    "财爻空亡，财难到手。",
    "贵神生财，有贵人助财。",
    "将神克财，财有破耗。",
  ],
  婚姻: [
    "妻财旺相，婚姻可成。",
    "妻财休囚，婚姻多阻。",
    "贵神为媒，有人牵线。",
    "六合临课，婚姻和美。",
    "白虎临课，防有变故。",
  ],
  出行: [
    "贵神顺行，出行顺利。",
    "贵神逆行，出行多阻。",
    "驿马临课，宜速行。",
    "太岁临课，宜缓行。",
    "空亡临课，出行无益。",
  ],
  疾病: [
    "用神旺相，病可愈。",
    "用神休囚，病难愈。",
    "鬼爻旺动，病情重。",
    "贵神扶持，有医缘。",
    "空亡临病，虚惊一场。",
  ],
}

// 金口诀起课计算
export function calculateJinKouJue(
  year: number, month: number, day: number, hour: number,
  dayGan: string, dayZhi: string, isDay: boolean
) {
  // 地分（时支）
  const hourZhiIndex = Math.floor(hour / 2) % 12
  const diFen = DI_ZHI_12[hourZhiIndex]
  
  // 贵神起法
  const guiQi = GUI_SHEN_QI_FA[dayGan]
  const guiShenZhi = isDay ? guiQi.昼 : guiQi.夜
  const guiShenIndex = DI_ZHI_12.indexOf(guiShenZhi)
  
  // 将神（月将加时）
  const yueJiangIndex = (13 - month) % 12
  const jiangShenIndex = (yueJiangIndex + hourZhiIndex) % 12
  const jiangShen = DI_ZHI_12[jiangShenIndex]
  
  // 贵神（从贵人起顺数到时支）
  const guiShenFinalIndex = (guiShenIndex + hourZhiIndex) % 12
  const guiShenName = SHI_ER_SHEN[guiShenFinalIndex].name
  
  // 人元（日干）
  const renYuan = dayGan
  
  return {
    diFen,
    jiangShen,
    guiShen: guiShenName,
    guiShenZhi: DI_ZHI_12[guiShenFinalIndex],
    renYuan,
    siWei: {
      人元: { gan: renYuan, wuxing: TIAN_GAN_WUXING[renYuan] },
      贵神: { name: guiShenName, zhi: DI_ZHI_12[guiShenFinalIndex], wuxing: DI_ZHI_WUXING[DI_ZHI_12[guiShenFinalIndex]] },
      将神: { zhi: jiangShen, wuxing: DI_ZHI_WUXING[jiangShen] },
      地分: { zhi: diFen, wuxing: DI_ZHI_WUXING[diFen] },
    }
  }
}
