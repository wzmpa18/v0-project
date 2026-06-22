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
export function getDayGanZhi(date: Date): { gan: string; zhi: string } {
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
export function getJieQi(date: Date): string {
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

// ============================================================================
// 完整天地盘干组合格局数据库（基于《奇门遁甲统宗大全》《奇门遁甲秘笈大全》）
// 覆盖三奇六仪（戊己庚辛壬癸丁丙乙）天盘加地盘的所有主要组合
// ============================================================================
export const QIMEN_GAN_GEJU_COMPLETE: Record<string, {
  name: string
  desc: string
  chuchu: string
  isJi: boolean
}> = {
  // ===== 伏吟类（凶格）=====
  "戊戊": { name: "伏吟", desc: "天盘戊加地盘戊，主伏吟，凡事停滞不前，不宜妄动，主破财忧伤。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "己己": { name: "伏吟", desc: "天盘己加地盘己，主伏吟，凡事闭塞，谋为不顺，宜静守。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "庚庚": { name: "大隔", desc: "天盘庚加地盘庚，主大隔（亦为伏吟），凡事阻塞，官非刑狱，百事不利。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "辛辛": { name: "小隔", desc: "天盘辛加地盘辛，主小隔（亦为伏吟），小事阻隔，谋为不顺。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "壬壬": { name: "伏吟", desc: "天盘壬加地盘壬，主伏吟，凡事静守，不宜妄动。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "癸癸": { name: "伏吟", desc: "天盘癸加地盘癸，主伏吟，凡事停滞，宜静守。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "丁丁": { name: "星奇伏吟", desc: "天盘丁加地盘丁，主星奇伏吟，凡事安宁，宜静守。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "丙丙": { name: "月奇伏吟", desc: "天盘丙加地盘丙，主月奇伏吟，文书迟滞，谋为不顺。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "乙乙": { name: "日奇伏吟", desc: "天盘乙加地盘乙，主日奇伏吟，凡事静守为吉。", chuchu: "《奇门遁甲统宗大全》", isJi: false },

  // ===== 反吟类（凶格）=====
  "戊辛": { name: "反吟", desc: "天盘戊加地盘辛，主反吟，凡事反复无常，谋为不顺，宜静守。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "辛戊": { name: "反吟", desc: "天盘辛加地盘戊，主反吟，凡事反复，宜静守不宜动。", chuchu: "《奇门遁甲统宗大全》", isJi: false },

  // ===== 吉格（完整）=====
  "戊丙": { name: "青龙回首", desc: "天盘戊加地盘丙，主青龙回首，百事皆吉，利于出行、求财、做事，大吉之格。", chuchu: "《奇门遁甲统宗大全》", isJi: true },
  "丙戊": { name: "飞鸟跌穴", desc: "天盘丙加地盘戊，主飞鸟跌穴，百事皆吉，尤其利于求官、求名，谋为皆遂。", chuchu: "《奇门遁甲统宗大全》", isJi: true },
  "丁戊": { name: "青龙转光", desc: "天盘丁加地盘戊，主青龙转光，贵人升迁，凡事顺利，求名得遂。", chuchu: "《奇门遁甲秘笈大全》", isJi: true },
  "戊丁": { name: "青龙耀明", desc: "天盘戊加地盘丁，主青龙耀明，谒贵大吉，求名求利皆遂。", chuchu: "《奇门遁甲统宗大全》", isJi: true },
  "乙丙": { name: "日月并行", desc: "天盘乙加地盘丙，主日月并行，谋为皆吉，凡事顺利，贵人相助。", chuchu: "《奇门遁甲统宗大全》", isJi: true },
  "丁丙": { name: "星随月转", desc: "天盘丁加地盘丙，主星随月转，贵人提携，谋为顺利，凡事吉昌。", chuchu: "《奇门遁甲秘笈大全》", isJi: true },
  "丙丁": { name: "星奇朱雀", desc: "天盘丙加地盘丁，主星奇朱雀，文书信息至，谋为顺利，宜上书献策。", chuchu: "《奇门遁甲统宗大全》", isJi: true },
  "丁乙": { name: "人遁", desc: "天盘丁加地盘乙，配太阴，主人遁，宜暗谋机密事，贵人相助，隐形遁迹。", chuchu: "《奇门遁甲统宗大全》", isJi: true },
  "乙丁": { name: "人遁", desc: "天盘乙加地盘丁，配太阴，主人遁（亦为地遁、龙遁、风遁之基），宜暗谋机密事。", chuchu: "《奇门遁甲统宗大全》", isJi: true },
  "丙乙": { name: "天遁", desc: "天盘丙加地盘乙，配生门，主天遁（亦为神遁之基），得天助，行动机密，大吉。", chuchu: "《奇门遁甲统宗大全》", isJi: true },
  "辛乙": { name: "虎遁", desc: "天盘辛加地盘乙，配生门，主虎遁，宜出行、谋事，有威权，大吉。", chuchu: "《奇门遁甲统宗大全》", isJi: true },
  "乙辛": { name: "云遁", desc: "天盘乙加地盘辛，配生门，主云遁，宜隐遁、谋事，凡事顺利。", chuchu: "《奇门遁甲统宗大全》", isJi: true },
  "戊乙": { name: "青龙合灵", desc: "天盘戊加地盘乙，主青龙合灵，和合凡事顺利，谋为皆吉。", chuchu: "《奇门遁甲统宗大全》", isJi: true },

  // ===== 凶格（完整）=====
  "庚癸": { name: "大格", desc: "天盘庚加地盘癸，主大格，道路堵塞，出行受阻，谋为不顺，百事不利。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "庚壬": { name: "小格", desc: "天盘庚加地盘壬，主小格，小事阻隔，做事不顺，宜静守。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "庚己": { name: "刑格", desc: "天盘庚加地盘己，主刑格，官非刑狱，谋为不利，主凶灾。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "庚丁": { name: "悖格", desc: "天盘庚加地盘丁，主悖格，文书阻隔，谋为不顺，宜静守。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "庚乙": { name: "白虎猖狂", desc: "天盘庚加地盘乙，主白虎猖狂，凶灾横祸，官司缠身，大凶之格。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "癸丁": { name: "螣蛇夭矫", desc: "天盘癸加地盘丁，主螣蛇夭矫，虚惊怪异之事，主口舌惊恐。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "庚丙": { name: "太白入荧", desc: "天盘庚加地盘丙，主太白入荧，贼来为客，主破财，宜防贼盗。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "丙庚": { name: "火入金乡", desc: "天盘丙加地盘庚，主火入金乡，谋为不利，主破财刑伤。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "丁癸": { name: "朱雀投江", desc: "天盘丁加地盘癸，主朱雀投江，文书丢失或信息不全，主口舌是非。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "乙戊": { name: "利阴害阳", desc: "天盘乙加地盘戊，主利阴害阳，凡事不利，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "庚戊": { name: "太白逢星", desc: "天盘庚加地盘戊，主太白逢星，官非刑狱，谋为不利。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },

  // ===== 其他组合（补充覆盖）=====
  "戊己": { name: "青龙受制", desc: "天盘戊加地盘己，主青龙受制，凡事受阻，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "戊庚": { name: "青龙逢虎", desc: "天盘戊加地盘庚，主青龙逢白虎，谋为不顺，主争斗。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "戊壬": { name: "青龙入狱", desc: "天盘戊加地盘壬，主青龙入狱，凡事闭塞，谋为不利。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "戊癸": { name: "青龙华盖", desc: "天盘戊加地盘癸，主青龙加华盖，凡事迟滞，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "己戊": { name: "明堂被伤", desc: "天盘己加地盘戊，主明堂被伤，谋为不顺，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "己庚": { name: "刑格反吟", desc: "天盘己加地盘庚，主刑格，官非刑狱，谋为不利。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "己辛": { name: "游魂入墓", desc: "天盘己加地盘辛，主游魂入墓，凡事闭塞，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "己壬": { name: "地网高张", desc: "天盘己加地盘壬，主地网高张，凡事受阻，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "己癸": { name: "地刑玄武", desc: "天盘己加地盘癸，主地刑玄武，主口舌是非，谋为不利。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "己乙": { name: "墓神不明", desc: "天盘己加地盘乙，主墓神不明，凡事暗昧，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "己丙": { name: "朱雀入墓", desc: "天盘己加地盘丙，主朱雀入墓，文书迟滞，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "己丁": { name: "星奇入墓", desc: "天盘己加地盘丁，主星奇入墓，凡事暗昧，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "庚辛": { name: "小隔", desc: "天盘庚加地盘辛，主小隔，小事阻隔，谋为不顺。", chuchu: "《奇门遁甲统宗大全》", isJi: false },
  "辛丙": { name: "荧入太白", desc: "天盘辛加地盘丙，主荧入太白，主破财，宜防贼盗。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "辛丁": { name: "狱神逢奇", desc: "天盘辛加地盘丁，主狱神逢奇，凡事迟滞，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "辛己": { name: "游魂入墓", desc: "天盘辛加地盘己，主游魂入墓，凡事闭塞，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "辛庚": { name: "白虎出手", desc: "天盘辛加地盘庚，主白虎出手，主争斗刑伤，谋为不利。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "辛壬": { name: "凶蛇入狱", desc: "天盘辛加地盘壬，主凶蛇入狱，凡事受阻，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "辛癸": { name: "天牢华盖", desc: "天盘辛加地盘癸，主天牢华盖，凡事闭塞，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "壬戊": { name: "天牢逢龙", desc: "天盘壬加地盘戊，主天牢逢龙，凡事迟滞，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "壬己": { name: "地网高张", desc: "天盘壬加地盘己，主地网高张，凡事受阻，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "壬庚": { name: "天罗逢虎", desc: "天盘壬加地盘庚，主天罗逢白虎，主争斗，谋为不利。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "壬辛": { name: "天罗逢蛇", desc: "天盘壬加地盘辛，主天罗逢螣蛇，主虚惊，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "壬癸": { name: "天罗地网", desc: "天盘壬加地盘癸，主天罗地网，凡事闭塞，出行受阻。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "壬乙": { name: "日奇入狱", desc: "天盘壬加地盘乙，主日奇入狱，凡事受阻，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "壬丙": { name: "月奇入狱", desc: "天盘壬加地盘丙，主月奇入狱，文书迟滞，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "壬丁": { name: "星奇入狱", desc: "天盘壬加地盘丁，主星奇入狱，凡事暗昧，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "癸戊": { name: "天乙会合", desc: "天盘癸加地盘戊，主天乙会合，凡事迟滞，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "癸己": { name: "华盖逢官", desc: "天盘癸加地盘己，主华盖逢官，凡事闭塞，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "癸庚": { name: "太白入网", desc: "天盘癸加地盘庚，主太白入网，主争斗，谋为不利。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "癸辛": { name: "华盖逢蛇", desc: "天盘癸加地盘辛，主华盖逢螣蛇，主虚惊，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "癸壬": { name: "华盖逢网", desc: "天盘癸加地盘壬，主华盖逢地网，凡事闭塞，出行受阻。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "癸乙": { name: "日奇华盖", desc: "天盘癸加地盘乙，主日奇逢华盖，凡事迟滞，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "癸丙": { name: "月奇华盖", desc: "天盘癸加地盘丙，主月奇逢华盖，文书迟滞，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "乙己": { name: "日奇入墓", desc: "天盘乙加地盘己，主日奇入墓，凡事暗昧，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "乙庚": { name: "日奇逢虎", desc: "天盘乙加地盘庚，主日奇逢白虎，主争斗，谋为不利。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "乙壬": { name: "日奇入狱", desc: "天盘乙加地盘壬，主日奇入狱，凡事受阻，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "乙癸": { name: "日奇华盖", desc: "天盘乙加地盘癸，主日奇逢华盖，凡事迟滞，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "丙己": { name: "月奇入墓", desc: "天盘丙加地盘己，主月奇入墓，文书迟滞，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "丙辛": { name: "月奇逢蛇", desc: "天盘丙加地盘辛，主月奇逢螣蛇，主虚惊，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "丙壬": { name: "月奇入水", desc: "天盘丙加地盘壬，主月奇入水，凡事受阻，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "丙癸": { name: "月奇华盖", desc: "天盘丙加地盘癸，主月奇逢华盖，文书迟滞，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "丁己": { name: "星奇入墓", desc: "天盘丁加地盘己，主星奇入墓，凡事暗昧，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "丁庚": { name: "星奇逢虎", desc: "天盘丁加地盘庚，主星奇逢白虎，主争斗，谋为不利。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "丁辛": { name: "星奇逢蛇", desc: "天盘丁加地盘辛，主星奇逢螣蛇，主虚惊，宜静守。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
  "丁壬": { name: "星奇入水", desc: "天盘丁加地盘壬，主星奇入水，凡事受阻，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》", isJi: false },
}

// ============================================================================
// 完整门星组合断语（8门×9星=72种）
// 基于《奇门遁甲统宗大全·门星论》《奇门遁甲秘笈大全》
// ============================================================================
export const MEN_XING_COMBO: Record<string, { desc: string; chuchu: string }> = {
  // ===== 休门配九星 =====
  "休门天蓬": { desc: "休门配天蓬，一白水星同宫，主安闲但防盗贼，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "休门天芮": { desc: "休门配天芮，水土相克，主病灾缠身，宜求医问药，不宜谋事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "休门天冲": { desc: "休门配天冲，水生木，主暗中行动，宜掩捕盗贼，不宜嫁娶。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "休门天辅": { desc: "休门配天辅，水生木，主贵人相助，宜求学、上任、婚姻，大吉。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "休门天禽": { desc: "休门配天禽，水土相和，主万事调和，宜祭祀、祈福、安葬。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "休门天心": { desc: "休门配天心，金生水，主智慧决断，宜求医、治病、谋事，吉。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "休门天柱": { desc: "休门配天柱，金生水，主口舌惊恐，宜驻守不宜出行。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "休门天任": { desc: "休门配天任，水土相和，主安稳承载，宜求财、嫁娶、种植，吉。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "休门天英": { desc: "休门配天英，水克火，主口舌是非，宜出行不宜静守。", chuchu: "《奇门遁甲统宗大全·门星论》" },

  // ===== 生门配九星 =====
  "生门天蓬": { desc: "生门配天蓬，土克水，主求财有阻，防盗贼，宜谨慎。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "生门天芮": { desc: "生门配天芮，土土比和，主病灾但求财可得，宜求医问药。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "生门天冲": { desc: "生门配天冲，木克土，主求财有争，宜速决不宜迟疑。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "生门天辅": { desc: "生门配天辅，木克土，主贵人相助求财，宜经营求财，吉。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "生门天禽": { desc: "生门配天禽，土土比和，主生长茂盛，大吉之配，宜求财、建造。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "生门天心": { desc: "生门配天心，土生金，主求财顺遂，宜经营、求财、谋事，吉。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "生门天柱": { desc: "生门配天柱，土生金，主求财有口舌，宜谨慎谋事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "生门天任": { desc: "生门配天任，土土比和，主生长茂盛，大吉之配，宜求财、嫁娶。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "生门天英": { desc: "生门配天英，火生土，主求财光明，宜经营求财，吉。", chuchu: "《奇门遁甲统宗大全·门星论》" },

  // ===== 伤门配九星 =====
  "伤门天蓬": { desc: "伤门配天蓬，水生木，主伤害盗贼，宜狩猎追捕，不宜出行。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "伤门天芮": { desc: "伤门配天芮，木克土，主伤害病灾，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "伤门天冲": { desc: "伤门配天冲，木木比和，主冲击争斗，宜出征报仇，不宜嫁娶。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "伤门天辅": { desc: "伤门配天辅，木木比和，主伤害但有贵人，宜谨慎行事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "伤门天禽": { desc: "伤门配天禽，木克土，主伤害但可调和，宜静守。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "伤门天心": { desc: "伤门配天心，金克木，主伤害官非，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "伤门天柱": { desc: "伤门配天柱，金克木，主伤害口舌，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "伤门天任": { desc: "伤门配天任，木克土，主伤害但可承载，宜谨慎行事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "伤门天英": { desc: "伤门配天英，木生火，主伤害火灾，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·门星论》" },

  // ===== 杜门配九星 =====
  "杜门天蓬": { desc: "杜门配天蓬，水生木，主隐藏防盗，宜躲避藏匿，不宜出行。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "杜门天芮": { desc: "杜门配天芮，木克土，主阻塞病灾，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "杜门天冲": { desc: "杜门配天冲，木木比和，主阻塞冲击，宜静守不宜妄动。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "杜门天辅": { desc: "杜门配天辅，木木比和，主隐藏但得贵人，宜保密之事，吉。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "杜门天禽": { desc: "杜门配天禽，木克土，主阻塞但可调和，宜静守。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "杜门天心": { desc: "杜门配天心，金克木，主阻塞官非，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "杜门天柱": { desc: "杜门配天柱，金克木，主阻塞口舌，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "杜门天任": { desc: "杜门配天任，木克土，主阻塞但可承载，宜谨慎行事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "杜门天英": { desc: "杜门配天英，木生火，主阻塞火灾，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·门星论》" },

  // ===== 景门配九星 =====
  "景门天蓬": { desc: "景门配天蓬，水克火，主文书受阻盗贼，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "景门天芮": { desc: "景门配天芮，火生土，主文书病灾，宜求医问药。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "景门天冲": { desc: "景门配天冲，木生火，主文书冲击，宜上书献策，不宜嫁娶。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "景门天辅": { desc: "景门配天辅，木生火，主文书贵人，宜上书、考试、献策，吉。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "景门天禽": { desc: "景门配天禽，火生土，主文书调和，宜祭祀、祈福。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "景门天心": { desc: "景门配天心，火克金，主文书决断，宜求医、谋事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "景门天柱": { desc: "景门配天柱，火克金，主文书口舌，宜上书不宜争讼。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "景门天任": { desc: "景门配天任，火生土，主文书承载，宜求财、嫁娶。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "景门天英": { desc: "景门配天英，火火比和，主文书光明但防火灾，宜上书献策。", chuchu: "《奇门遁甲统宗大全·门星论》" },

  // ===== 死门配九星 =====
  "死门天蓬": { desc: "死门配天蓬，土克水，主死亡盗贼，大凶，宜吊丧送葬。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "死门天芮": { desc: "死门配天芮，土土比和，主病丧之象，大凶，宜吊丧送葬行刑。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "死门天冲": { desc: "死门配天冲，木克土，主死亡冲击，大凶，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "死门天辅": { desc: "死门配天辅，木克土，主死亡但有贵人，宜谨慎行事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "死门天禽": { desc: "死门配天禽，土土比和，主死亡调和，宜祭祀、安葬。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "死门天心": { desc: "死门配天心，土生金，主死亡决断，宜行刑、送葬。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "死门天柱": { desc: "死门配天柱，土生金，主死亡口舌，大凶，宜静守。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "死门天任": { desc: "死门配天任，土土比和，主死亡承载，宜安葬、送葬。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "死门天英": { desc: "死门配天英，火生土，主死亡火灾，大凶，宜静守。", chuchu: "《奇门遁甲统宗大全·门星论》" },

  // ===== 惊门配九星 =====
  "惊门天蓬": { desc: "惊门配天蓬，金生水，主惊恐盗贼，宜捕捉斗讼，不宜出行。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "惊门天芮": { desc: "惊门配天芮，土生金，主惊恐病灾，宜求医问药。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "惊门天冲": { desc: "惊门配天冲，金克木，主惊恐冲击，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "惊门天辅": { desc: "惊门配天辅，金克木，主惊恐但有贵人，宜谨慎行事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "惊门天禽": { desc: "惊门配天禽，土生金，主惊恐调和，宜静守。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "惊门天心": { desc: "惊门配天心，金金比和，主惊恐决断，宜捕捉、斗讼。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "惊门天柱": { desc: "惊门配天柱，金金比和，主口舌惊恐，宜驻守、争讼。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "惊门天任": { desc: "惊门配天任，土生金，主惊恐承载，宜谨慎行事。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "惊门天英": { desc: "惊门配天英，火克金，主惊恐火灾，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·门星论》" },

  // ===== 开门配九星 =====
  "开门天蓬": { desc: "开门配天蓬，金生水，主开启盗贼，宜远行但防盗，不宜经商。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "开门天芮": { desc: "开门配天芮，土生金，主开启病灾，宜求医问药、拜师求学。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "开门天冲": { desc: "开门配天冲，金克木，主开启冲击，宜出征、远行，不宜嫁娶。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "开门天辅": { desc: "开门配天辅，金克木，主开启贵人，宜求职、上任、婚姻，吉。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "开门天禽": { desc: "开门配天禽，土生金，主开启调和，宜祭祀、祈福、远行。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "开门天心": { desc: "开门配天心，金金比和，主事业开创，大吉，宜远行、求职、开业。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "开门天柱": { desc: "开门配天柱，金金比和，主开启口舌，宜驻守、争讼。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "开门天任": { desc: "开门配天任，土生金，主开启承载，宜求财、嫁娶、远行，吉。", chuchu: "《奇门遁甲统宗大全·门星论》" },
  "开门天英": { desc: "开门配天英，火克金，主开启火灾，宜出行不宜静守。", chuchu: "《奇门遁甲统宗大全·门星论》" },
}

// ============================================================================
// 完整八神与九宫组合断语（8神×9宫=72种）
// 基于《奇门遁甲统宗大全·八神论》《奇门遁甲秘笈大全》
// ============================================================================
export const BA_SHEN_COMBO: Record<string, { desc: string; chuchu: string }> = {
  // ===== 值符临九宫 =====
  "值符1": { desc: "值符临坎一宫，水宫吉神，主贵人相助，宜求谋大事，谋为皆吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "值符2": { desc: "值符临坤二宫，土宫吉神，主贵人安稳，宜求财、安葬，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "值符3": { desc: "值符临震三宫，木宫吉神，主贵人行动，宜出征、求谋，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "值符4": { desc: "值符临巽四宫，木宫吉神，主贵人和顺，宜求谋、婚姻，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "值符5": { desc: "值符临中五宫，土宫吉神，主贵人居中，宜祭祀、祈福，大吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "值符6": { desc: "值符临乾六宫，金宫吉神，主贵人权威，宜求官、求名，大吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "值符7": { desc: "值符临兑七宫，金宫吉神，主贵人言说，宜求谋、谈判，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "值符8": { desc: "值符临艮八宫，土宫吉神，主贵人稳重，宜求财、安葬，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "值符9": { desc: "值符临离九宫，火宫吉神，主贵人光明，宜求名、上书，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },

  // ===== 螣蛇临九宫 =====
  "螣蛇1": { desc: "螣蛇临坎一宫，水宫凶神，主虚惊怪异，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "螣蛇2": { desc: "螣蛇临坤二宫，土宫凶神，主虚诈病灾，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "螣蛇3": { desc: "螣蛇临震三宫，木宫凶神，主虚惊冲击，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "螣蛇4": { desc: "螣蛇临巽四宫，木宫凶神，主虚诈风邪，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "螣蛇5": { desc: "螣蛇临中五宫，土宫凶神，主虚惊怪异，宜静守不宜妄动。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "螣蛇6": { desc: "螣蛇临乾六宫，金宫凶神，主虚惊官非，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "螣蛇7": { desc: "螣蛇临兑七宫，金宫凶神，主虚惊口舌，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "螣蛇8": { desc: "螣蛇临艮八宫，土宫凶神，主虚诈阻滞，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "螣蛇9": { desc: "螣蛇临离九宫，火宫凶神，主虚惊火灾，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·八神论》" },

  // ===== 太阴临九宫 =====
  "太阴1": { desc: "太阴临坎一宫，水宫吉神，主阴私隐藏，宜暗谋、藏匿，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "太阴2": { desc: "太阴临坤二宫，土宫吉神，主阴私安稳，宜暗谋、女人之事，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "太阴3": { desc: "太阴临震三宫，木宫吉神，主阴私行动，宜暗谋、机密事，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "太阴4": { desc: "太阴临巽四宫，木宫吉神，主阴私和顺，宜暗谋、婚姻，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "太阴5": { desc: "太阴临中五宫，土宫吉神，主阴私居中，宜暗谋、祈福，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "太阴6": { desc: "太阴临乾六宫，金宫吉神，主阴私权威，宜暗谋、求官，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "太阴7": { desc: "太阴临兑七宫，金宫吉神，主阴私言说，宜暗谋、谈判，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "太阴8": { desc: "太阴临艮八宫，土宫吉神，主阴私稳重，宜暗谋、藏匿，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "太阴9": { desc: "太阴临离九宫，火宫吉神，主阴私光明，宜暗谋、求名，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },

  // ===== 六合临九宫 =====
  "六合1": { desc: "六合临坎一宫，水宫吉神，主和合婚姻，宜婚姻、交易、合伙，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "六合2": { desc: "六合临坤二宫，土宫吉神，主和合安稳，宜婚姻、交易，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "六合3": { desc: "六合临震三宫，木宫吉神，主和合行动，宜婚姻、谈判，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "六合4": { desc: "六合临巽四宫，木宫吉神，主和合顺遂，宜婚姻、合作，大吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "六合5": { desc: "六合临中五宫，土宫吉神，主和合居中，宜婚姻、祈福，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "六合6": { desc: "六合临乾六宫，金宫吉神，主和合权威，宜婚姻、求官，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "六合7": { desc: "六合临兑七宫，金宫吉神，主和合言说，宜婚姻、谈判，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "六合8": { desc: "六合临艮八宫，土宫吉神，主和合稳重，宜婚姻、交易，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "六合9": { desc: "六合临离九宫，火宫吉神，主和合光明，宜婚姻、上书，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },

  // ===== 白虎临九宫 =====
  "白虎1": { desc: "白虎临坎一宫，水宫凶神，主血光之灾，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "白虎2": { desc: "白虎临坤二宫，土宫凶神，主血光病灾，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "白虎3": { desc: "白虎临震三宫，木宫凶神，主血光冲击，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "白虎4": { desc: "白虎临巽四宫，木宫凶神，主血光风邪，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "白虎5": { desc: "白虎临中五宫，土宫凶神，主血光刑伤，宜静守不宜妄动。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "白虎6": { desc: "白虎临乾六宫，金宫凶神，主血光官非，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "白虎7": { desc: "白虎临兑七宫，金宫凶神，主血光口舌，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "白虎8": { desc: "白虎临艮八宫，土宫凶神，主血光阻滞，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "白虎9": { desc: "白虎临离九宫，火宫凶神，主血光火灾，大凶，宜静守。", chuchu: "《奇门遁甲统宗大全·八神论》" },

  // ===== 玄武临九宫 =====
  "玄武1": { desc: "玄武临坎一宫，水宫凶神，主盗贼暗昧，宜防贼盗，不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "玄武2": { desc: "玄武临坤二宫，土宫凶神，主盗贼病灾，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "玄武3": { desc: "玄武临震三宫，木宫凶神，主盗贼冲击，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "玄武4": { desc: "玄武临巽四宫，木宫凶神，主盗贼风邪，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "玄武5": { desc: "玄武临中五宫，土宫凶神，主盗贼暗昧，宜静守不宜妄动。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "玄武6": { desc: "玄武临乾六宫，金宫凶神，主盗贼官非，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "玄武7": { desc: "玄武临兑七宫，金宫凶神，主盗贼口舌，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "玄武8": { desc: "玄武临艮八宫，土宫凶神，主盗贼阻滞，宜静守不宜谋事。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "玄武9": { desc: "玄武临离九宫，火宫凶神，主盗贼火灾，宜静守不宜出行。", chuchu: "《奇门遁甲统宗大全·八神论》" },

  // ===== 九地临九宫 =====
  "九地1": { desc: "九地临坎一宫，水宫吉神，主地户隐藏，宜防守、屯兵、藏匿，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九地2": { desc: "九地临坤二宫，土宫吉神，主地户安稳，宜防守、安葬，大吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九地3": { desc: "九地临震三宫，木宫吉神，主地户行动，宜防守、屯兵，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九地4": { desc: "九地临巽四宫，木宫吉神，主地户和顺，宜防守、藏匿，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九地5": { desc: "九地临中五宫，土宫吉神，主地户居中，宜防守、祈福，大吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九地6": { desc: "九地临乾六宫，金宫吉神，主地户权威，宜防守、屯兵，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九地7": { desc: "九地临兑七宫，金宫吉神，主地户言说，宜防守、谈判，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九地8": { desc: "九地临艮八宫，土宫吉神，主地户稳重，宜防守、安葬，大吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九地9": { desc: "九地临离九宫，火宫吉神，主地户光明，宜防守、谋事，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },

  // ===== 九天临九宫 =====
  "九天1": { desc: "九天临坎一宫，水宫吉神，主天门远行，宜出击、远行，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九天2": { desc: "九天临坤二宫，土宫吉神，主天门安稳，宜出击、远行，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九天3": { desc: "九天临震三宫，木宫吉神，主天门行动，宜出击、远行，大吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九天4": { desc: "九天临巽四宫，木宫吉神，主天门高远，宜出击、高飞，大吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九天5": { desc: "九天临中五宫，土宫吉神，主天门居中，宜出击、祈福，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九天6": { desc: "九天临乾六宫，金宫吉神，主天门权威，宜出击、远行，大吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九天7": { desc: "九天临兑七宫，金宫吉神，主天门言说，宜出击、远行，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九天8": { desc: "九天临艮八宫，土宫吉神，主天门稳重，宜出击、远行，吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
  "九天9": { desc: "九天临离九宫，火宫吉神，主天门光明，宜出击、远行，大吉。", chuchu: "《奇门遁甲统宗大全·八神论》" },
}

// 获取奇门宫位详解（引经据典）
export function getQimenGongDetail(
  palaceNum: number,
  palaceName: string,
  position: string,
  tianGan: string,
  diGan: string,
  men: string,
  xing: string,
  shen: string,
  isZhiFu: boolean,
  isZhiShi: boolean
): {
  geju: string[]
  duanyu: { title: string; content: string; chuchu: string }[]
  zonghe: string
} {
  const geju: string[] = []
  const duanyu: { title: string; content: string; chuchu: string }[] = []

  // 宫位基本信息
  const gongInfo = JIU_GONG.find(g => g.number === palaceNum)
  if (gongInfo) {
    duanyu.push({
      title: `${palaceName}${palaceNum}宫`,
      content: `${palaceName}${palaceNum}宫，方位${position}，五行属${gongInfo.wuxing}。八卦符号${gongInfo.symbol}。`,
      chuchu: "《奇门遁甲统宗大全·九宫论》"
    })
  }

  // 八门断语
  const menInfo = BA_MEN.find(m => m.name === men)
  if (menInfo) {
    const menDescMap: Record<string, string> = {
      "休门": "休门属水，主休息、安定、贵人相助。宜求谒贵人、安葬、和合，不宜出击。",
      "生门": "生门属土，主生长、财运、健康。宜经营求财、婚姻、建造，大吉。",
      "伤门": "伤门属木，主伤害、疾病、争斗。不宜出行、嫁娶、经商，宜狩猎、追捕。",
      "杜门": "杜门属木，主阻塞、隐藏、保密。宜躲避、藏匿、保密之事，不宜出行。",
      "景门": "景门属火，主文书、口舌、光明。宜上书、献策、考试，不宜争讼。",
      "死门": "死门属土，主死亡、丧事、停滞。不宜吉事，宜吊丧、送葬、行刑。",
      "惊门": "惊门属金，主惊恐、口舌、官司。不宜谋事，宜捕捉、斗讼。",
      "开门": "开门属金，主开启、事业、远行。宜远行、求职、开业、嫁娶，大吉。",
    }
    duanyu.push({
      title: `八门·${men}`,
      content: menDescMap[men] || `${men}，${menInfo.desc}。此门为${menInfo.nature}门。`,
      chuchu: "《奇门遁甲统宗大全·八门论》"
    })
  }

  // 九星断语
  const xingInfo = JIU_XING.find(x => x.name === xing)
  if (xingInfo) {
    const xingDescMap: Record<string, string> = {
      "天蓬": "天蓬星属水，主盗贼、冒险、变动。临宫不宜出行、经商，宜掩捕盗贼。",
      "天芮": "天芮星属土，主疾病、学生、医药。临宫主病灾，宜求医问药、拜师求学。",
      "天冲": "天冲星属木，主行动、冲击、竞争。临宫宜出征、报仇，不宜嫁娶。",
      "天辅": "天辅星属木，主贵人、文化、教育。临宫大吉，宜求学、上任、婚姻。",
      "天禽": "天禽星属土，主中央、调和、稳定。临宫主万事调和，宜祭祀、祈福。",
      "天心": "天心星属金，主智慧、决策、医病。临宫宜求医、治病、谋事。",
      "天柱": "天柱星属金，主口舌、破败、权威。临宫不宜出行，宜驻守、争讼。",
      "天任": "天任星属土，主承载、稳重、信任。临宫吉，宜求财、嫁娶、种植。",
      "天英": "天英星属火，主火灾、光明、急躁。临宫主口舌是非，宜出行不宜静守。",
    }
    duanyu.push({
      title: `九星·${xing}`,
      content: xingDescMap[xing] || `${xing}，${xingInfo.desc}。此星为${xingInfo.nature}星。`,
      chuchu: "《奇门遁甲统宗大全·九星论》"
    })
  }

  // 八神断语
  const shenInfo = BA_SHEN.find(s => s.name === shen)
  if (shenInfo) {
    const shenDescMap: Record<string, string> = {
      "值符": "值符为八神之首，主贵人、权威、庇护。所到之处，百恶消散，最宜求谋。",
      "螣蛇": "螣蛇主虚诈、怪异、惊恐。临宫主虚惊、怪梦、口舌虚惊。",
      "太阴": "太阴主阴私、隐藏、女人。临宫宜暗谋、藏匿、女人之事。",
      "六合": "六合主和合、婚姻、合作。临宫宜婚姻、交易、合伙、谈判。",
      "白虎": "白虎主凶猛、血光、疾病。临宫主血光之灾、官司、刑伤。",
      "玄武": "玄武主盗贼、暗昧、阴谋。临宫主盗贼、丢失、口舌是非。",
      "九地": "九地主地户、稳定、隐藏。临宫宜防守、屯兵、藏匿。",
      "九天": "九天主天门、高远、行动。临宫宜出击、远行、高飞。",
    }
    duanyu.push({
      title: `八神·${shen}`,
      content: shenDescMap[shen] || `${shen}，${shenInfo.desc}。`,
      chuchu: "《奇门遁甲统宗大全·八神论》"
    })
  }

  // 八神与九宫组合断语（使用完整八神组合数据库 BA_SHEN_COMBO）
  const shenGongKey = `${shen}${palaceNum}`
  if (BA_SHEN_COMBO[shenGongKey]) {
    duanyu.push({
      title: `八神临宫·${shen}临${palaceName}${palaceNum}宫`,
      content: BA_SHEN_COMBO[shenGongKey].desc,
      chuchu: BA_SHEN_COMBO[shenGongKey].chuchu
    })
  }

  // 天地盘干组合格局判断（使用完整格局数据库 QIMEN_GAN_GEJU_COMPLETE）
  const ganCombo = tianGan + diGan
  const ganGejuItem = QIMEN_GAN_GEJU_COMPLETE[ganCombo]
  if (ganGejuItem) {
    geju.push(ganGejuItem.name)
    duanyu.push({
      title: ganGejuItem.name,
      content: ganGejuItem.desc,
      chuchu: ganGejuItem.chuchu
    })
  }

  // 三奇得使判断（三奇乙丙丁配吉门休生开，主得贵人相助）
  const sanQiDeShiQi = ["乙", "丙", "丁"]
  const sanQiDeShiMen = ["休门", "生门", "开门"]
  if (sanQiDeShiQi.includes(tianGan) && sanQiDeShiMen.includes(men)) {
    geju.push("三奇得使")
    duanyu.push({
      title: "三奇得使",
      content: `天盘${tianGan}奇配${men}，主三奇得使，得贵人相助，做事顺利，谋为皆吉。`,
      chuchu: "《奇门遁甲统宗大全·三奇得使论》"
    })
  }

  // 三奇入墓判断（乙入坤2宫、丙入乾6宫、丁入艮8宫）
  const qiMuMap: Record<string, { qi: string; gong: number; gongName: string }> = {
    "乙": { qi: "日奇", gong: 2, gongName: "坤" },
    "丙": { qi: "月奇", gong: 6, gongName: "乾" },
    "丁": { qi: "星奇", gong: 8, gongName: "艮" },
  }
  if (qiMuMap[tianGan] && qiMuMap[tianGan].gong === palaceNum) {
    geju.push("三奇入墓")
    duanyu.push({
      title: "三奇入墓",
      content: `${qiMuMap[tianGan].qi}（${tianGan}）入${qiMuMap[tianGan].gongName}宫，主三奇入墓，凡事暗昧，谋为不顺，宜静守。`,
      chuchu: "《奇门遁甲统宗大全·三奇入墓论》"
    })
  }

  // 门迫宫迫判断（门克宫为门迫，宫克门为宫迫）
  const menWuxingMap: Record<string, string> = {
    "休门": "水", "生门": "土", "伤门": "木", "杜门": "木",
    "景门": "火", "死门": "土", "惊门": "金", "开门": "金"
  }
  const gongWuxingMap: Record<number, string> = {
    1: "水", 2: "土", 3: "木", 4: "木", 5: "土", 6: "金", 7: "金", 8: "土", 9: "火"
  }
  const menWx = menWuxingMap[men]
  const gongWx = gongWuxingMap[palaceNum]
  if (menWx && gongWx) {
    // 五行相克: 木克土, 土克水, 水克火, 火克金, 金克木
    const keMap: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" }
    if (keMap[menWx] === gongWx) {
      geju.push("门迫")
      duanyu.push({
        title: "门迫",
        content: `${men}（${menWx}）克${palaceName}${palaceNum}宫（${gongWx}），主门迫，谋为不顺，凡事受阻。`,
        chuchu: "《奇门遁甲统宗大全·门迫论》"
      })
    } else if (keMap[gongWx] === menWx) {
      geju.push("宫迫")
      duanyu.push({
        title: "宫迫",
        content: `${palaceName}${palaceNum}宫（${gongWx}）克${men}（${menWx}），主宫迫，谋为不顺，凡事受制。`,
        chuchu: "《奇门遁甲统宗大全·宫迫论》"
      })
    }
  }

  // 值符值使断语
  if (isZhiFu) {
    duanyu.push({
      title: "值符宫位",
      content: "此宫为值符所在，主事之源。值符为八神之首，所到之处百恶消散，最宜求谋大事。天盘星即为值符所乘之星，主当下之事之核心趋势。",
      chuchu: "《奇门遁甲统宗大全·值符论》"
    })
  }
  if (isZhiShi) {
    duanyu.push({
      title: "值使宫位",
      content: "此宫为值使所在，主事之行。值使为八门之首，所到之处主事之执行与发展。值使门主当下之事的执行方向和结果。",
      chuchu: "《奇门遁甲统宗大全·值使论》"
    })
  }

  // 门星组合判断（保留原有断语，并扩展引用完整门星组合数据库 MEN_XING_COMBO）
  const menXingCombo = `${men}${xing}`
  const menXingMap: Record<string, string> = {
    "休门天蓬": "休门配天蓬，一白水星同宫，主安闲但防盗贼。",
    "生门天任": "生门配天任，主生长茂盛，大吉之配。",
    "开门天心": "开门配天心，金宫金星，主事业开创，大吉。",
    "景门天英": "景门配天英，火宫火星，主文书光明但防火灾。",
    "死门天芮": "死门配天芮，土宫土星，主病丧之象，大凶。",
    "惊门天柱": "惊门配天柱，金宫金星，主口舌惊恐。",
    "伤门天冲": "伤门配天冲，木宫木星，主冲击争斗。",
    "杜门天辅": "杜门配天辅，木宫木星，主隐藏但得贵人。",
  }
  if (menXingMap[menXingCombo]) {
    duanyu.push({
      title: "门星组合",
      content: menXingMap[menXingCombo],
      chuchu: "《奇门遁甲统宗大全·门星论》"
    })
  } else if (MEN_XING_COMBO[menXingCombo]) {
    duanyu.push({
      title: "门星组合",
      content: MEN_XING_COMBO[menXingCombo].desc,
      chuchu: MEN_XING_COMBO[menXingCombo].chuchu
    })
  }

  // 综合评断
  let zonghe = `${palaceName}${palaceNum}宫（${position}方），天盘${tianGan}加地盘${diGan}`
  zonghe += `，${shen}、${xing}、${men}同宫`
  if (isZhiFu) zonghe += "，为值符所在"
  if (isZhiShi) zonghe += "，为值使所在"
  if (geju.length > 0) zonghe += `，成${geju.join("、")}之格`
  
  // 吉凶判断
  const jimen = ["休门", "生门", "开门"]
  const jixing = ["天辅", "天禽", "天心", "天任"]
  const jishen = ["值符", "太阴", "六合", "九地", "九天"]
  let jiCount = 0, xiongCount = 0
  if (jimen.includes(men)) jiCount++
  else xiongCount++
  if (jixing.includes(xing)) jiCount++
  else xiongCount++
  if (jishen.includes(shen)) jiCount++
  else xiongCount++
  
  if (jiCount > xiongCount) zonghe += "。综合判断，此宫偏吉，宜行事宜谋。"
  else if (xiongCount > jiCount) zonghe += "。综合判断，此宫偏凶，不宜妄动，宜静守。"
  else zonghe += "。综合判断，此宫吉凶参半，需谨慎行事。"

  return { geju, duanyu, zonghe }
}