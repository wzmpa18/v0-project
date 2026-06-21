// 紫微斗数数据库 - 包含十四主星、辅星、四化、十二宫位等完整数据

// 十四主星
export const MAIN_STARS = {
  "紫微": { wuxing: "土", nature: "帝王之星", desc: "尊贵、领导、自尊心强" },
  "天机": { wuxing: "木", nature: "智慧之星", desc: "聪明、善变、多思虑" },
  "太阳": { wuxing: "火", nature: "光明之星", desc: "热情、博爱、积极向上" },
  "武曲": { wuxing: "金", nature: "财星", desc: "刚毅、果断、重财务" },
  "天同": { wuxing: "水", nature: "福星", desc: "温和、享乐、懒散" },
  "廉贞": { wuxing: "火", nature: "囚星", desc: "桃花、是非、感情丰富" },
  "天府": { wuxing: "土", nature: "财库之星", desc: "稳重、保守、善理财" },
  "太阴": { wuxing: "水", nature: "富星", desc: "阴柔、内敛、重感情" },
  "贪狼": { wuxing: "木", nature: "桃花之星", desc: "欲望、才艺、多变" },
  "巨门": { wuxing: "水", nature: "暗星", desc: "口才、是非、研究" },
  "天相": { wuxing: "水", nature: "印星", desc: "助力、服务、正直" },
  "天梁": { wuxing: "土", nature: "荫星", desc: "清高、孤独、宗教缘" },
  "七杀": { wuxing: "金", nature: "将星", desc: "魄力、冒险、孤独" },
  "破军": { wuxing: "水", nature: "耗星", desc: "变动、开创、破坏" },
}

// 六吉星
export const LUCKY_STARS = {
  "文昌": { wuxing: "金", nature: "科甲之星", desc: "学业、文书、考试" },
  "文曲": { wuxing: "水", nature: "才艺之星", desc: "艺术、口才、异性缘" },
  "左辅": { wuxing: "土", nature: "贵人之星", desc: "助力、人缘、贵人" },
  "右弼": { wuxing: "水", nature: "贵人之星", desc: "助力、人缘、贵人" },
  "天魁": { wuxing: "火", nature: "阳贵人", desc: "男贵人、长辈提携" },
  "天钺": { wuxing: "火", nature: "阴贵人", desc: "女贵人、暗中相助" },
}

// 六煞星
export const UNLUCKY_STARS = {
  "擎羊": { wuxing: "金", nature: "刑星", desc: "刑伤、是非、手术" },
  "陀罗": { wuxing: "金", nature: "暗星", desc: "拖延、纠缠、慢性病" },
  "火星": { wuxing: "火", nature: "暴星", desc: "急躁、冲动、意外" },
  "铃星": { wuxing: "火", nature: "暴星", desc: "急躁、暴躁、意外" },
  "地空": { wuxing: "火", nature: "空星", desc: "空虚、想象、宗教" },
  "地劫": { wuxing: "火", nature: "劫星", desc: "破败、损失、不稳定" },
}

// 四化星
export const SI_HUA = {
  "化禄": { nature: "财禄", desc: "进财、顺利、贵人" },
  "化权": { nature: "权势", desc: "权力、掌控、事业" },
  "化科": { nature: "名声", desc: "名誉、学业、贵人" },
  "化忌": { nature: "困扰", desc: "阻碍、是非、破财" },
}

// 十二宫位
export const TWELVE_PALACES = [
  { name: "命宫", desc: "代表本人的性格、外貌、才能、命运的总体情况" },
  { name: "兄弟宫", desc: "代表兄弟姐妹的情况，以及朋友、同事关系" },
  { name: "夫妻宫", desc: "代表配偶的情况，婚姻状况，感情运势" },
  { name: "子女宫", desc: "代表子女的情况，生育能力，下属关系" },
  { name: "财帛宫", desc: "代表财运、收入、理财能力" },
  { name: "疾厄宫", desc: "代表健康状况、疾病类型、身体弱点" },
  { name: "迁移宫", desc: "代表外出运、旅行、外地发展" },
  { name: "交友宫", desc: "代表人际关系、下属、朋友" },
  { name: "官禄宫", desc: "代表事业、工作、社会地位" },
  { name: "田宅宫", desc: "代表不动产、家庭、居住环境" },
  { name: "福德宫", desc: "代表精神生活、思想、福气" },
  { name: "父母宫", desc: "代表父母的情况，长辈关系，遗传" },
]

// 天干四化表
export const TIAN_GAN_SI_HUA: Record<string, { 禄: string, 权: string, 科: string, 忌: string }> = {
  "甲": { 禄: "廉贞", 权: "破军", 科: "武曲", 忌: "太阳" },
  "乙": { 禄: "天机", 权: "天梁", 科: "紫微", 忌: "太阴" },
  "丙": { 禄: "天同", 权: "天机", 科: "文昌", 忌: "廉贞" },
  "丁": { 禄: "太阴", 权: "天同", 科: "天机", 忌: "巨门" },
  "戊": { 禄: "贪狼", 权: "太阴", 科: "右弼", 忌: "天机" },
  "己": { 禄: "武曲", 权: "贪狼", 科: "天梁", 忌: "文曲" },
  "庚": { 禄: "太阳", 权: "武曲", 科: "太阴", 忌: "天同" },
  "辛": { 禄: "巨门", 权: "太阳", 科: "文曲", 忌: "文昌" },
  "壬": { 禄: "天梁", 权: "紫微", 科: "左辅", 忌: "武曲" },
  "癸": { 禄: "破军", 权: "巨门", 科: "太阴", 忌: "贪狼" },
}

// 紫微斗数古籍断语
export const ZIWEI_DUAN_YU = {
  // 命宫主星断语
  命宫: {
    "紫微": {
      原文: "紫微帝座，在人命，在官禄，最为祥瑞。主人忠厚，为人和气，志气轩昂。",
      译文: "紫微星坐命宫，是最吉祥的格局。命主为人忠厚诚实，待人温和有礼，志向高远，气度不凡。",
      出处: "《紫微斗数全书》"
    },
    "天机": {
      原文: "天机入命，主人聪明机巧，能言善辩，精于筹划谋略。",
      译文: "天机星坐命宫，命主聪明伶俐，善于言辞和辩论，精于计划和谋略。",
      出处: "《紫微斗数全书》"
    },
    "太阳": {
      原文: "太阳入命，光明磊落，心胸开阔，热情洋溢，乐于助人。",
      译文: "太阳星坐命宫，命主为人光明正大，心胸宽广，热情积极，乐善好施。",
      出处: "《紫微斗数全书》"
    },
    "武曲": {
      原文: "武曲入命，主人刚毅果断，财运亨通，适合经商理财。",
      译文: "武曲星坐命宫，命主性格刚强果断，财运较好，适合从事商业或财务工作。",
      出处: "《紫微斗数全书》"
    },
    "天同": {
      原文: "天同入命，福厚安康，为人和善，不喜争斗，多享清福。",
      译文: "天同星坐命宫，命主福气深厚，性格温和善良，不喜与人争斗，一生清闲安乐。",
      出处: "《紫微斗数全书》"
    },
    "廉贞": {
      原文: "廉贞入命，聪明秀丽，能言善辩，多才多艺，感情丰富。",
      译文: "廉贞星坐命宫，命主聪明俊秀，口才好，多才多艺，感情世界丰富。",
      出处: "《紫微斗数全书》"
    },
    "天府": {
      原文: "天府入命，稳重厚实，善于理财，一生衣食无忧。",
      译文: "天府星坐命宫，命主为人稳重踏实，善于理财持家，一生物质生活充裕。",
      出处: "《紫微斗数全书》"
    },
    "太阴": {
      原文: "太阴入命，聪明文雅，富贵优裕，性格阴柔内敛。",
      译文: "太阴星坐命宫，命主聪明文雅，生活富裕，性格内敛柔和。",
      出处: "《紫微斗数全书》"
    },
    "贪狼": {
      原文: "贪狼入命，多才多艺，社交广泛，欲望强烈，人生多变。",
      译文: "贪狼星坐命宫，命主才华横溢，交际能力强，欲望较重，人生经历丰富多变。",
      出处: "《紫微斗数全书》"
    },
    "巨门": {
      原文: "巨门入命，口才出众，善于研究，然多是非口舌。",
      译文: "巨门星坐命宫，命主口才极佳，善于研究分析，但容易招惹是非口舌。",
      出处: "《紫微斗数全书》"
    },
    "天相": {
      原文: "天相入命，正直忠厚，乐于助人，有贵人相助之运。",
      译文: "天相星坐命宫，命主为人正直忠诚，乐于帮助他人，一生多有贵人相助。",
      出处: "《紫微斗数全书》"
    },
    "天梁": {
      原文: "天梁入命，清高自傲，心善好施，有宗教修行之缘。",
      译文: "天梁星坐命宫，命主性格清高，乐善好施，与宗教修行有缘。",
      出处: "《紫微斗数全书》"
    },
    "七杀": {
      原文: "七杀入命，性格刚烈，勇敢果断，有将帅之风。",
      译文: "七杀星坐命宫，命主性格刚强勇猛，决断力强，有领袖气质。",
      出处: "《紫微斗数全书》"
    },
    "破军": {
      原文: "破军入命，变动不居，开创进取，人生多波折。",
      译文: "破军星坐命宫，命主喜欢变化，具有开创精神，但人生起伏较大。",
      出处: "《紫微斗数全书》"
    },
  },
  // 格局断语
  格局: {
    "紫府同宫": {
      原文: "紫府同宫格，大富大贵，一生荣华，位极人臣。",
      译文: "紫微与天府同宫是大吉格局，主大富大贵，一生荣华富贵，地位显赫。",
      出处: "《紫微斗数全书》"
    },
    "日月同辉": {
      原文: "日月同辉格，声名远播，事业有成，光明正大。",
      译文: "太阳太阴同宫或相照的格局，主名声远扬，事业成功，为人光明磊落。",
      出处: "《紫微斗数全书》"
    },
    "府相朝垣": {
      原文: "府相朝垣格，财官双美，一生顺遂，富贵绑身。",
      译文: "天府天相朝向命宫的格局，主财运和事业都好，一生顺利富贵。",
      出处: "《紫微斗数全书》"
    },
    "机月同梁": {
      原文: "机月同梁格，聪明才智，文职显达，宜从事学术研究。",
      译文: "天机、太阴、天同、天梁组合的格局，主聪明睿智，适合从事文职或学术工作。",
      出处: "《紫微斗数全书》"
    },
    "杀破狼": {
      原文: "杀破狼格，变动不居，开创事业，人生精彩但波折。",
      译文: "七杀、破军、贪狼组合的格局，主人生变化多端，有开创能力，但起伏较大。",
      出处: "《紫微斗数全书》"
    },
  }
}

// 十二地支（用于命宫计算，索引0=子）
const DI_ZHI_12 = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 天干列表
const TIAN_GAN_10 = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

// 五虎遁：年干对应的寅宫天干起始
const WU_HU_DUN: Record<string, number> = {
  "甲": 2, "己": 2,  // 丙寅起
  "乙": 4, "庚": 4,  // 戊寅起
  "丙": 6, "辛": 6,  // 庚寅起
  "丁": 8, "壬": 8,  // 壬寅起
  "戊": 0, "癸": 0,  // 甲寅起
}

// 纳音五行表（六十甲子纳音）
// 索引 = 天干索引 * 12 + 地支索引，每两个甲子对应一种纳音
const NAYIN_TABLE: string[] = [
  "海中金", "海中金", "炉中火", "炉中火", "大林木", "大林木", "路旁土", "路旁土", "剑锋金", "剑锋金", "山头火", "山头火",
  "涧下水", "涧下水", "城墙土", "城墙土", "白蜡金", "白蜡金", "杨柳木", "杨柳木", "泉中水", "泉中水", "屋上土", "屋上土",
  "霹雳火", "霹雳火", "松柏木", "松柏木", "长流水", "长流水", "沙中金", "沙中金", "山下火", "山下火", "平地木", "平地木",
  "壁上土", "壁上土", "金箔金", "金箔金", "覆灯火", "覆灯火", "天河水", "天河水", "大驿土", "大驿土", "钗钏金", "钗钏金",
  "桑柘木", "桑柘木", "大溪水", "大溪水", "沙中土", "沙中土", "天上火", "天上火", "石榴木", "石榴木", "大海水", "大海水",
]

// 纳音五行对应的局
function nayinToJu(nayin: string): string {
  const wuxing = nayin.slice(-1)
  const juMap: Record<string, string> = {
    "金": "金四局",
    "木": "木三局",
    "水": "水二局",
    "火": "火六局",
    "土": "土五局",
  }
  return juMap[wuxing] || "土五局"
}

// 紫微星起星表：根据农历日和五行局数查紫微星所在宫位（地支索引）
// 行=局数(2,3,4,5,6)，列=农历日(1-30)
const ZIWEI_POSITION_TABLE: Record<number, number[]> = {
  2: [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6], // 水二局
  3: [2,4,6,8,10,12,2,4,6,8,10,12,2,4,6,8,10,12,2,4,6,8,10,12,2,4,6,8,10,12], // 木三局
  4: [3,6,9,12,3,6,9,12,3,6,9,12,3,6,9,12,3,6,9,12,3,6,9,12,3,6,9,12,3,6], // 金四局
  5: [4,8,12,4,8,12,4,8,12,4,8,12,4,8,12,4,8,12,4,8,12,4,8,12,4,8,12,4,8,12], // 土五局
  6: [5,10,3,8,1,6,11,4,9,2,7,12,5,10,3,8,1,6,11,4,9,2,7,12,5,10,3,8,1,6], // 火六局
}

// 将1-12的宫位编号转换为地支索引(0-11)
function gongNumToZhiIndex(gongNum: number): number {
  return gongNum - 1  // 1=子(0), 2=丑(1), ..., 12=亥(11)
}

// 根据农历年月日时计算紫微斗数命盘
export function calculateZiWeiPan(lunarYear: number, lunarMonth: number, lunarDay: number, hour: number, gender: "male" | "female") {
  const shiChenIndex = Math.floor(hour / 2) % 12  // 时辰索引 0-11
  
  // 计算命宫位置（地支索引0-11）
  // 从寅宫(索引2)起正月，顺数到生月
  // 从生月宫起子时，逆数到生时
  const mingGongIndex = ((lunarMonth + 1) - shiChenIndex + 12) % 12
  
  // 计算身宫位置
  // 从寅宫(索引2)起正月，顺数到生月
  // 从生月宫起子时，顺数到生时
  const shenGongIndex = ((lunarMonth + 1) + shiChenIndex) % 12
  
  // 年干
  const yearGanIndex = (lunarYear - 4) % 10
  const yearGan = TIAN_GAN_10[yearGanIndex]
  
  // 用五虎遁确定命宫天干
  const yinGanIndex = WU_HU_DUN[yearGan] ?? 0
  const mingGongGanIndex = (yinGanIndex + mingGongIndex - 2 + 10) % 10
  const mingGongGan = TIAN_GAN_10[mingGongGanIndex]
  const mingGongZhi = DI_ZHI_12[mingGongIndex]
  
  // 计算纳音五行
  const nayinIndex = mingGongGanIndex * 12 + mingGongIndex
  const nayin = NAYIN_TABLE[nayinIndex]
  const wuxingJu = nayinToJu(nayin)
  
  // 计算紫微星所在宫位
  const juNum = parseInt(wuxingJu.match(/\d/)?.[0] || "5")
  const ziweiGongNum = ZIWEI_POSITION_TABLE[juNum][lunarDay - 1] || 1
  const ziweiGong = gongNumToZhiIndex(ziweiGongNum)
  
  // 安十四主星
  const mainStarPositions = arrangeMainStars(ziweiGong)
  
  // 安辅星（六吉星）
  const luckyStarPositions = arrangeLuckyStars(lunarYear, mingGongIndex, shiChenIndex)
  
  // 安煞星（六煞星）
  const unluckyStarPositions = arrangeUnluckyStars(lunarYear, mingGongIndex, shiChenIndex)
  
  // 计算大限
  const daXian = calculateDaXian(mingGongIndex, wuxingJu, gender, lunarYear)
  
  // 确定十二宫名（从命宫开始逆时针排列）
  const palaceNames = getPalaceNames(mingGongIndex)
  
  return {
    mingGong: TWELVE_PALACES[0].name,
    mingGongIndex,
    shenGong: TWELVE_PALACES[0].name,
    shenGongIndex,
    wuxingJu,
    nayin,
    mingGongGan,
    mingGongZhi,
    yearGan,
    ziweiGong,
    mainStarPositions,
    luckyStarPositions,
    unluckyStarPositions,
    daXian,
    palaceNames,
  }
}

// 获取十二宫名（从命宫开始，逆时针）
function getPalaceNames(mingGongIndex: number): string[] {
  const names = ["命宫", "兄弟宫", "夫妻宫", "子女宫", "财帛宫", "疾厄宫", "迁移宫", "交友宫", "官禄宫", "田宅宫", "福德宫", "父母宫"]
  const result: string[] = new Array(12)
  for (let i = 0; i < 12; i++) {
    result[(mingGongIndex + i) % 12] = names[i]
  }
  return result
}

// 安排十四主星位置
function arrangeMainStars(ziweiGong: number) {
  const positions: Record<string, number> = {}
  
  // 紫微系星辰排列（逆时针）
  positions["紫微"] = ziweiGong
  positions["天机"] = (ziweiGong + 11) % 12  // 逆一位
  positions["太阳"] = (ziweiGong + 9) % 12   // 逆三位
  positions["武曲"] = (ziweiGong + 10) % 12  // 逆二位
  positions["天同"] = (ziweiGong + 8) % 12   // 逆四位
  positions["廉贞"] = (ziweiGong + 4) % 12   // 逆八位
  
  // 天府系星辰排列（天府与紫微在寅申线对称）
  // 天府位置 = (4 - ziweiGong + 12) % 12，即以寅(2)为对称轴
  const tianfuGong = (4 - ziweiGong + 12) % 12
  positions["天府"] = tianfuGong
  positions["太阴"] = (tianfuGong + 1) % 12
  positions["贪狼"] = (tianfuGong + 2) % 12
  positions["巨门"] = (tianfuGong + 3) % 12
  positions["天相"] = (tianfuGong + 4) % 12
  positions["天梁"] = (tianfuGong + 5) % 12
  positions["七杀"] = (tianfuGong + 6) % 12
  positions["破军"] = (tianfuGong + 10) % 12
  
  return positions
}

// 安排六吉星
function arrangeLuckyStars(year: number, mingGongIndex: number, shiChenIndex: number): Record<string, number> {
  const positions: Record<string, number> = {}
  const yearGanIndex = (year - 4) % 10
  const yearGan = TIAN_GAN_10[yearGanIndex]
  
  // 左辅：从辰宫起正月，顺数到生月
  const month = Math.floor((mingGongIndex + shiChenIndex - 1 + 12) / 2)  // 简化推算生月
  positions["左辅"] = (4 + (month - 1)) % 12  // 辰=4
  
  // 右弼：从戌宫起正月，逆数到生月
  positions["右弼"] = (10 - (month - 1) + 12) % 12  // 戌=10
  
  // 文昌：从戌宫起子时，逆数到生时
  positions["文昌"] = (10 - shiChenIndex + 12) % 12
  
  // 文曲：从辰宫起子时，顺数到生时
  positions["文曲"] = (4 + shiChenIndex) % 12
  
  // 天魁：根据年干决定
  const tianKuiMap: Record<string, number> = {
    "甲": 1, "戊": 1, "庚": 1,  // 丑
    "乙": 12, "己": 12, "辛": 12,  // 子
    "丙": 11, "丁": 11,  // 亥
    "壬": 3, "癸": 3,  // 卯
  }
  positions["天魁"] = tianKuiMap[yearGan] ?? 0
  
  // 天钺：根据年干决定（与天魁对称）
  const tianYueMap: Record<string, number> = {
    "甲": 6, "戊": 6, "庚": 6,  // 未
    "乙": 7, "己": 7, "辛": 7,  // 申
    "丙": 8, "丁": 8,  // 酉
    "壬": 10, "癸": 10,  // 亥
  }
  positions["天钺"] = tianYueMap[yearGan] ?? 0
  
  return positions
}

// 安排六煞星
function arrangeUnluckyStars(year: number, mingGongIndex: number, shiChenIndex: number): Record<string, number> {
  const positions: Record<string, number> = {}
  const yearGanIndex = (year - 4) % 10
  const yearGan = TIAN_GAN_10[yearGanIndex]
  
  // 擎羊：从年干宫起，顺数到卯宫（偏前一位）
  const qingYangMap: Record<string, number> = {
    "甲": 3, "己": 3,  // 卯
    "乙": 4, "庚": 4,  // 辰
    "丙": 5, "辛": 5,  // 巳
    "丁": 6, "壬": 6,  // 午
    "戊": 7, "癸": 7,  // 未
  }
  positions["擎羊"] = qingYangMap[yearGan] ?? 3
  
  // 陀罗：与擎羊对称（偏后一位）
  const tuoLuoMap: Record<string, number> = {
    "甲": 1, "己": 1,  // 丑
    "乙": 2, "庚": 2,  // 寅
    "丙": 3, "辛": 3,  // 卯
    "丁": 4, "壬": 4,  // 辰
    "戊": 5, "癸": 5,  // 巳
  }
  positions["陀罗"] = tuoLuoMap[yearGan] ?? 1
  
  // 火星：从寅宫起子时，顺数到生时，再根据年支调整
  positions["火星"] = (2 + shiChenIndex) % 12
  
  // 铃星：从戌宫起子时，逆数到生时
  positions["铃星"] = (10 - shiChenIndex + 12) % 12
  
  // 地空：从亥宫起子时，逆数到生时
  positions["地空"] = (11 - shiChenIndex + 12) % 12
  
  // 地劫：从亥宫起子时，顺数到生时
  positions["地劫"] = (11 + shiChenIndex) % 12
  
  return positions
}

// 计算大限
function calculateDaXian(mingGongIndex: number, wuxingJu: string, gender: "male" | "female", birthYear: number): any[] {
  const juNum = parseInt(wuxingJu.match(/\d/)?.[0] || "5")
  // 阳男阴女顺行，阴男阳女逆行
  const yearGanIndex = (birthYear - 4) % 10
  const isYang = yearGanIndex % 2 === 0  // 甲丙戊庚壬为阳
  const isMale = gender === "male"
  const forward = (isYang && isMale) || (!isYang && !isMale)
  
  const daXianList = []
  for (let i = 0; i < 12; i++) {
    const gongIndex = forward 
      ? (mingGongIndex + i) % 12 
      : (mingGongIndex - i + 12) % 12
    const startAge = juNum + i * 10
    const endAge = startAge + 9
    daXianList.push({
      gongIndex,
      palaceName: TWELVE_PALACES[i].name,
      startAge,
      endAge,
      startYear: birthYear + startAge - 1,
      endYear: birthYear + endAge - 1,
    })
  }
  return daXianList
}

// 获取命宫主星断语
export function getMingGongDuanYu(mainStar: string) {
  return ZIWEI_DUAN_YU.命宫[mainStar as keyof typeof ZIWEI_DUAN_YU.命宫] || {
    原文: "此星入命，各有所主。",
    译文: "此星坐命宫，具有独特的命理特征。",
    出处: "《紫微斗数全书》"
  }
}

// 获取宫位详解（引经据典）
export function getGongDetail(palaceName: string, mainStars: string[], luckyStars: string[], unluckyStars: string[], siHua: any): {
  geju: string[]
  duanyu: { title: string; content: string; chuchu: string }[]
  zonghe: string
} {
  const geju: string[] = []
  const duanyu: { title: string; content: string; chuchu: string }[] = []
  
  // 判断格局
  if (mainStars.includes("紫微") && mainStars.includes("天府")) {
    geju.push("紫府同宫")
    duanyu.push({
      title: "紫府同宫格",
      content: "紫微与天府同宫，为大富大贵之格。主人志气高远，能力出众，一生荣华富贵，位极人臣。",
      chuchu: "《紫微斗数全书·诸星问答论》"
    })
  }
  if (mainStars.includes("太阳") && mainStars.includes("太阴")) {
    geju.push("日月同辉")
    duanyu.push({
      title: "日月同辉格",
      content: "太阳与太阴同宫或对照，主声名远播，事业有成，为人光明正大，阴阳调和。",
      chuchu: "《紫微斗数全书·诸星问答论》"
    })
  }
  if (mainStars.includes("七杀") && mainStars.includes("破军") && mainStars.includes("贪狼")) {
    geju.push("杀破狼")
    duanyu.push({
      title: "杀破狼格",
      content: "七杀、破军、贪狼三足鼎立，主变动不居，开创进取，人生精彩但波折较大。",
      chuchu: "《紫微斗数全书·诸星问答论》"
    })
  }
  if (mainStars.includes("天机") && mainStars.includes("太阴") && mainStars.includes("天同") && mainStars.includes("天梁")) {
    geju.push("机月同梁")
    duanyu.push({
      title: "机月同梁格",
      content: "天机、太阴、天同、天梁组合，主聪明才智，适合文职或学术研究，做事按部就班。",
      chuchu: "《紫微斗数全书·诸星问答论》"
    })
  }
  if (mainStars.includes("天府") && mainStars.includes("天相")) {
    geju.push("府相朝垣")
    duanyu.push({
      title: "府相朝垣格",
      content: "天府与天相朝垣，主财官双美，一生顺遂，富贵双全。",
      chuchu: "《紫微斗数全书·诸星问答论》"
    })
  }
  
  // 单星断语
  mainStars.forEach(star => {
    const info = MAIN_STARS[star as keyof typeof MAIN_STARS]
    if (info) {
      duanyu.push({
        title: `${star}入${palaceName}`,
        content: `${info.desc}。${star}为${info.nature}，五行属${info.wuxing}。`,
        chuchu: "《紫微斗数全书》"
      })
    }
  })
  
  // 四化断语
  if (siHua) {
    Object.entries(siHua).forEach(([hua, star]) => {
      if (mainStars.includes(star as string)) {
        const huaName = `化${hua}`
        const huaInfo = SI_HUA[huaName as keyof typeof SI_HUA]
        if (huaInfo) {
          duanyu.push({
            title: `${star}${huaName}`,
            content: `${star}化${hua}，主${huaInfo.desc}。此四化入${palaceName}，对该宫位影响显著。`,
            chuchu: "《紫微斗数全书·四化星论》"
          })
        }
      }
    })
  }
  
  // 煞星影响
  if (unluckyStars.length > 0) {
    const shaDesc = unluckyStars.map(s => {
      const info = UNLUCKY_STARS[s as keyof typeof UNLUCKY_STARS]
      return info ? `${s}(${info.desc})` : s
    }).join("、")
    duanyu.push({
      title: "煞星影响",
      content: `此宫有${shaDesc}，需注意其负面影响。`,
      chuchu: "《紫微斗数全书·煞星论》"
    })
  }
  
  // 综合评断
  let zonghe = `${palaceName}有${mainStars.join("、") || "无主星"}坐守`
  if (luckyStars.length > 0) zonghe += `，得${luckyStars.join("、")}辅佐`
  if (unluckyStars.length > 0) zonghe += `，受${unluckyStars.join("、")}侵扰`
  if (geju.length > 0) zonghe += `，成${geju.join("、")}之格`
  zonghe += "。"
  
  return { geju, duanyu, zonghe }
}
