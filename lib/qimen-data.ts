// 奇门遁甲完整数据库 - 基于《奇门遁甲统宗大全》《奇门遁甲秘笈大全》

// 天干
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

// 地支
export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 九宫八卦
export const JIU_GONG = [
  { name: "坎", number: 1, position: "北", wuxing: "水", symbol: "☵" },
  { name: "坤", number: 2, position: "西南", wuxing: "土", symbol: "☷" },
  { name: "震", number: 3, position: "东", wuxing: "木", symbol: "☳" },
  { name: "巽", number: 4, position: "东南", wuxing: "木", symbol: "☴" },
  { name: "中", number: 5, position: "中", wuxing: "土", symbol: "☯" },
  { name: "乾", number: 6, position: "西北", wuxing: "金", symbol: "☰" },
  { name: "兑", number: 7, position: "西", wuxing: "金", symbol: "☱" },
  { name: "艮", number: 8, position: "东北", wuxing: "土", symbol: "☶" },
  { name: "离", number: 9, position: "南", wuxing: "火", symbol: "☲" },
]

// 八门
export const BA_MEN = [
  { name: "休门", nature: "吉", wuxing: "水", desc: "休息、安定、贵人" },
  { name: "生门", nature: "吉", wuxing: "土", desc: "生长、财运、健康" },
  { name: "伤门", nature: "凶", wuxing: "木", desc: "伤害、疾病、争斗" },
  { name: "杜门", nature: "平", wuxing: "木", desc: "阻塞、隐藏、保密" },
  { name: "景门", nature: "平", wuxing: "火", desc: "文书、口舌、光明" },
  { name: "死门", nature: "凶", wuxing: "土", desc: "死亡、丧事、停滞" },
  { name: "惊门", nature: "凶", wuxing: "金", desc: "惊恐、口舌、官司" },
  { name: "开门", nature: "吉", wuxing: "金", desc: "开启、事业、远行" },
]

// 九星
export const JIU_XING = [
  { name: "天蓬", nature: "凶", wuxing: "水", desc: "盗贼、冒险、变动" },
  { name: "天芮", nature: "凶", wuxing: "土", desc: "疾病、学生、医药" },
  { name: "天冲", nature: "吉", wuxing: "木", desc: "行动、冲击、竞争" },
  { name: "天辅", nature: "吉", wuxing: "木", desc: "贵人、文化、教育" },
  { name: "天禽", nature: "吉", wuxing: "土", desc: "中央、调和、稳定" },
  { name: "天心", nature: "吉", wuxing: "金", desc: "智慧、决策、医病" },
  { name: "天柱", nature: "凶", wuxing: "金", desc: "口舌、破败、权威" },
  { name: "天任", nature: "吉", wuxing: "土", desc: "承载、稳重、信任" },
  { name: "天英", nature: "凶", wuxing: "火", desc: "火灾、光明、急躁" },
]

// 八神
export const BA_SHEN = [
  { name: "值符", nature: "吉", desc: "贵人、权威、庇护" },
  { name: "螣蛇", nature: "凶", desc: "虚诈、怪异、惊恐" },
  { name: "太阴", nature: "吉", desc: "阴私、隐藏、女人" },
  { name: "六合", nature: "吉", desc: "和合、婚姻、合作" },
  { name: "白虎", nature: "凶", desc: "凶猛、血光、疾病" },
  { name: "玄武", nature: "凶", desc: "盗贼、暗昧、阴谋" },
  { name: "九地", nature: "吉", desc: "地户、稳定、隐藏" },
  { name: "九天", nature: "吉", desc: "天门、高远、行动" },
]

// 三奇六仪
export const SAN_QI_LIU_YI = ["戊", "己", "庚", "辛", "壬", "癸", "丁", "丙", "乙"]

// 二十四节气与遁局
export const JIE_QI_DUN: Record<string, { dun: string; start: number }> = {
  "冬至": { dun: "阳", start: 1 },
  "小寒": { dun: "阳", start: 2 },
  "大寒": { dun: "阳", start: 3 },
  "立春": { dun: "阳", start: 4 },
  "雨水": { dun: "阳", start: 5 },
  "惊蛰": { dun: "阳", start: 6 },
  "春分": { dun: "阳", start: 7 },
  "清明": { dun: "阳", start: 8 },
  "谷雨": { dun: "阳", start: 9 },
  "立夏": { dun: "阴", start: 9 },
  "小满": { dun: "阴", start: 8 },
  "芒种": { dun: "阴", start: 7 },
  "夏至": { dun: "阴", start: 6 },
  "小暑": { dun: "阴", start: 5 },
  "大暑": { dun: "阴", start: 4 },
  "立秋": { dun: "阴", start: 3 },
  "处暑": { dun: "阴", start: 2 },
  "白露": { dun: "阴", start: 1 },
  "秋分": { dun: "阴", start: 9 },
  "寒露": { dun: "阴", start: 8 },
  "霜降": { dun: "阴", start: 7 },
  "立冬": { dun: "阳", start: 6 },
  "小雪": { dun: "阳", start: 5 },
  "大雪": { dun: "阳", start: 4 },
}

// 节气对应的月份日期（简化）
export const JIE_QI_DATES: Record<string, { month: number; day: number }> = {
  "立春": { month: 2, day: 4 },
  "雨水": { month: 2, day: 19 },
  "惊蛰": { month: 3, day: 6 },
  "春分": { month: 3, day: 21 },
  "清明": { month: 4, day: 5 },
  "谷雨": { month: 4, day: 20 },
  "立夏": { month: 5, day: 6 },
  "小满": { month: 5, day: 21 },
  "芒种": { month: 6, day: 6 },
  "夏至": { month: 6, day: 21 },
  "小暑": { month: 7, day: 7 },
  "大暑": { month: 7, day: 23 },
  "立秋": { month: 8, day: 8 },
  "处暑": { month: 8, day: 23 },
  "白露": { month: 9, day: 8 },
  "秋分": { month: 9, day: 23 },
  "寒露": { month: 10, day: 8 },
  "霜降": { month: 10, day: 24 },
  "立冬": { month: 11, day: 8 },
  "小雪": { month: 11, day: 22 },
  "大雪": { month: 12, day: 7 },
  "冬至": { month: 12, day: 22 },
  "小寒": { month: 1, day: 6 },
  "大寒": { month: 1, day: 20 },
}

// 地盘固定排列（九宫八卦配洛书）
export const DI_PAN_GAN = {
  "1": "癸", // 坎一宫
  "2": "丁", // 坤二宫
  "3": "甲", // 震三宫
  "4": "乙", // 巽四宫
  "5": "戊", // 中五宫
  "6": "辛", // 乾六宫
  "7": "庚", // 兑七宫
  "8": "壬", // 艮八宫
  "9": "丙", // 离九宫
}

// 计算日干支（正确算法）
function getDayGanZhi(date: Date): { gan: string; zhi: string } {
  const baseDate = new Date(1900, 0, 31)
  const daysDiff = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
  
  const ganIndex = (daysDiff + 40) % 10
  const zhiIndex = (daysDiff + 40) % 12
  
  return {
    gan: TIAN_GAN[ganIndex],
    zhi: DI_ZHI[zhiIndex]
  }
}

// 计算节气
function getJieQi(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const jieQiOrder = [
    "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
    "立夏", "小满", "芒种", "夏至", "小暑", "大暑",
    "立秋", "处暑", "白露", "秋分", "寒露", "霜降",
    "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"
  ]
  
  for (let i = 0; i < jieQiOrder.length; i++) {
    const jq = jieQiOrder[i]
    const jqDate = JIE_QI_DATES[jq]
    const nextJq = jieQiOrder[(i + 1) % jieQiOrder.length]
    const nextJqDate = JIE_QI_DATES[nextJq]
    
    if (month === jqDate.month && day >= jqDate.day) {
      if (nextJqDate.month < jqDate.month) {
        if (month === 12 && day >= jqDate.day) return jq
      } else if (month === nextJqDate.month && day < nextJqDate.day) {
        return jq
      } else if (month < nextJqDate.month) {
        return jq
      }
    }
  }
  
  return "冬至"
}

// 计算旬首（六甲旬首）
function getXunShou(dayGan: string): string {
  const ganOrder = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
  const index = ganOrder.indexOf(dayGan)
  const xunShouIndex = Math.floor(index / 5) * 5
  return ganOrder[xunShouIndex]
}

// 计算时干
function getShiGan(hour: number, dayGan: string): string {
  const ganOrder = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
  const dayGanIndex = ganOrder.indexOf(dayGan)
  const shiChenIndex = Math.floor(hour / 2) % 12
  
  const shiGanStart = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8][dayGanIndex]
  return ganOrder[(shiGanStart + shiChenIndex) % 10]
}

// 计算旬首落宫
function getXunShouPalace(xunShou: string): number {
  const yiOrder = ["戊", "己", "庚", "辛", "壬", "癸", "丁", "丙", "乙"]
  const xunShouIndex = yiOrder.indexOf(xunShou)
  if (xunShouIndex === -1) return 1
  return xunShouIndex + 1
}

// 计算天盘（三奇六仪）- 完整算法
function calculateTianPan(dunJu: number, xunShou: string): { [key: string]: string } {
  const yiOrder = ["戊", "己", "庚", "辛", "壬", "癸", "丁", "丙", "乙"]
  const xunShouIndex = yiOrder.indexOf(xunShou)
  
  const result: { [key: string]: string } = {}
  
  for (let i = 0; i < 9; i++) {
    const palaceNum = i + 1
    const pos = (dunJu - 1 + i + xunShouIndex) % 9
    result[palaceNum.toString()] = yiOrder[pos]
  }
  
  return result
}

// 计算八门位置
function calculateBaMen(dunJu: number, zhiShiIndex: number): { [key: string]: string } {
  const menOrder = ["休门", "生门", "伤门", "杜门", "景门", "死门", "惊门", "开门"]
  const result: { [key: string]: string } = {}
  
  for (let i = 0; i < 9; i++) {
    const palaceNum = i + 1
    if (palaceNum === 5) {
      result["5"] = menOrder[zhiShiIndex % 8]
    } else {
      const pos = (dunJu - 1 + i - zhiShiIndex + 8) % 8
      result[palaceNum.toString()] = menOrder[pos]
    }
  }
  
  return result
}

// 计算九星位置
function calculateJiuXing(dunJu: number, zhiFuIndex: number): { [key: string]: string } {
  const xingOrder = ["天蓬", "天芮", "天冲", "天辅", "天禽", "天心", "天柱", "天任", "天英"]
  const result: { [key: string]: string } = {}
  
  for (let i = 0; i < 9; i++) {
    const palaceNum = i + 1
    const pos = (dunJu - 1 + i - zhiFuIndex + 9) % 9
    result[palaceNum.toString()] = xingOrder[pos]
  }
  
  return result
}

// 计算八神位置
function calculateBaShen(dunType: string, shiGan: string): { [key: string]: string } {
  const shenOrder = ["值符", "螣蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"]
  const ganOrder = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
  const shiGanIndex = ganOrder.indexOf(shiGan)
  
  const result: { [key: string]: string } = {}
  
  for (let i = 0; i < 9; i++) {
    const palaceNum = i + 1
    let pos: number
    if (dunType === "阳") {
      pos = (shiGanIndex + i) % 8
    } else {
      pos = (shiGanIndex - i + 8) % 8
    }
    result[palaceNum.toString()] = shenOrder[pos]
  }
  
  return result
}

// 计算阳盘奇门遁甲排盘（经典算法）
export function calculateQimenPan(date: Date) {
  const jieqi = getJieQi(date)
  const jieqiInfo = JIE_QI_DUN[jieqi] || { dun: "阳", start: 1 }
  
  const dayGanZhi = getDayGanZhi(date)
  const dayGan = dayGanZhi.gan
  const hour = date.getHours()
  const shiGan = getShiGan(hour, dayGan)
  const xunShou = getXunShou(dayGan)
  
  const tianPan = calculateTianPan(jieqiInfo.start, xunShou)
  
  const xunShouPalace = getXunShouPalace(xunShou)
  const zhiFuIndex = xunShouPalace - 1
  
  const jiuXing = calculateJiuXing(jieqiInfo.start, zhiFuIndex)
  
  const zhiShiMenIndex = BA_MEN.findIndex(m => m.name === "开门")
  const baMen = calculateBaMen(jieqiInfo.start, zhiShiMenIndex)
  
  const baShen = calculateBaShen(jieqiInfo.dun, shiGan)
  
  const palaces = JIU_GONG.map(gong => ({
    ...gong,
    tianGan: tianPan[gong.number.toString()] || "",
    diGan: DI_PAN_GAN[gong.number.toString()] || "",
    baMen: baMen[gong.number.toString()] || "",
    jiuXing: jiuXing[gong.number.toString()] || "",
    baShen: baShen[gong.number.toString()] || "",
  }))
  
  const zhiFuGong = palaces.findIndex(p => p.baShen === "值符")
  const zhiShiGong = palaces.findIndex(p => p.baMen === "开门")
  
  return {
    jieqi,
    ju: jieqiInfo.start,
    dunType: jieqiInfo.dun + "遁",
    riGan: dayGan,
    riZhi: dayGanZhi.zhi,
    shiGan,
    xunShou,
    zhiFu: palaces[zhiFuGong]?.jiuXing || "",
    zhiFuGong: zhiFuGong + 1,
    zhiShi: palaces[zhiShiGong]?.baMen || "",
    zhiShiGong: zhiShiGong + 1,
    palaces,
  }
}

// 计算阴盘奇门排盘
export function calculateYinPanQiMen(date: Date) {
  const jieqi = getJieQi(date)
  const jieqiInfo = JIE_QI_DUN[jieqi] || { dun: "阴", start: 1 }
  
  const dayGanZhi = getDayGanZhi(date)
  const dayGan = dayGanZhi.gan
  const hour = date.getHours()
  const shiGan = getShiGan(hour, dayGan)
  const xunShou = getXunShou(dayGan)
  
  const tianPan = calculateTianPan(jieqiInfo.start, xunShou)
  const baMen = BA_MEN.map(m => m.name)
  const jiuXing = JIU_XING.map(x => x.name)
  const baShen = calculateBaShen("阴", shiGan)
  
  const palaces = JIU_GONG.map((gong, i) => ({
    ...gong,
    tianGan: tianPan[gong.number.toString()] || "",
    diGan: DI_PAN_GAN[gong.number.toString()] || "",
    men: baMen[i % 8],
    star: jiuXing[i],
    shen: baShen[gong.number.toString()] || "",
    diZhi: DI_ZHI[i % 12],
  }))
  
  return {
    type: "阴盘",
    jieqi,
    dunType: jieqiInfo.dun + "遁",
    ju: jieqiInfo.start,
    riGan: dayGan,
    riZhi: dayGanZhi.zhi,
    shiGan,
    xunShou,
    palaces,
  }
}

// 奇门格局
export const QIMEN_GEJU = {
  吉格: [
    { name: "青龙回首", desc: "天盘甲木加地盘丙火，主百事皆吉，利于出行、求财、做事", chuchu: "《奇门遁甲统宗大全》" },
    { name: "飞鸟跌穴", desc: "天盘丙火加地盘甲木，主百事皆吉，尤其利于求官、求名", chuchu: "《奇门遁甲统宗大全》" },
    { name: "青龙返首", desc: "值符加日干，主事成迟而稳，需耐心等待", chuchu: "《奇门遁甲秘笈大全》" },
    { name: "云开雾散", desc: "值符开加死，主凶中有吉，坏事变好事", chuchu: "《奇门遁甲秘笈大全》" },
    { name: "三奇得使", desc: "三奇乙丙丁遇吉门，主得贵人相助，做事顺利", chuchu: "《奇门遁甲统宗大全》" },
    { name: "真诈格", desc: "真诈临身，主得意外之财或贵人相助", chuchu: "《奇门遁甲大全》" },
    { name: "假诈格", desc: "假诈临身，主虚有其表，需谨慎行事", chuchu: "《奇门遁甲大全》" },
    { name: "天遁", desc: "天盘丙奇生门合太阴，主得天助，行动机密", chuchu: "《奇门遁甲统宗大全》" },
    { name: "地遁", desc: "天盘乙奇开门合九地，主得地助，潜伏隐遁", chuchu: "《奇门遁甲统宗大全》" },
    { name: "人遁", desc: "天盘丁奇休门合太阴，主得人助，隐形遁迹", chuchu: "《奇门遁甲统宗大全》" },
  ],
  凶格: [
    { name: "白虎猖狂", desc: "天盘庚辛加地盘木，主凶灾横祸，官司缠身", chuchu: "《奇门遁甲统宗大全》" },
    { name: "螣蛇夭矫", desc: "螣蛇加地盘火，主虚惊怪异之事", chuchu: "《奇门遁甲统宗大全》" },
    { name: "朱雀投江", desc: "天盘丁加地盘坎，主文书丢失或信息不全", chuchu: "《奇门遁甲秘笈大全》" },
    { name: "太白天乙伏吟", desc: "庚辛伏吟，主事物停滞不前", chuchu: "《奇门遁甲大全》" },
    { name: "六仪击刑", desc: "六仪自刑或互刑，主凶灾疾病", chuchu: "《奇门遁甲统宗大全》" },
    { name: "五不遇时", desc: "时干克日干，主办事不顺，谋事不成", chuchu: "《奇门遁甲统宗大全》" },
    { name: "空亡", desc: "六甲空亡，主事无着落，吉事不吉，凶事不凶", chuchu: "《奇门遁甲秘笈大全》" },
    { name: "大格", desc: "天盘庚加地盘癸，主道路堵塞，出行受阻", chuchu: "《奇门遁甲统宗大全》" },
    { name: "小格", desc: "天盘庚加地盘壬，主小事阻隔，做事不顺", chuchu: "《奇门遁甲统宗大全》" },
    { name: "岁破", desc: "岁破临门，主一年不顺，办事多阻", chuchu: "《奇门遁甲大全》" },
  ]
}

// 命理奇门结合排盘
export function calculateMingLiQiMen(date: Date, gender: "male" | "female") {
  const qiMen = calculateYinPanQiMen(date)
  return { qiMen }
}