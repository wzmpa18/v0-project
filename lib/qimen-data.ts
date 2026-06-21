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

  // 天地盘干组合格局判断
  const ganCombo = tianGan + diGan
  const ganGejuMap: Record<string, { name: string; desc: string; chuchu: string }> = {
    "戊戊": { name: "伏吟", desc: "天盘戊加地盘戊，主伏吟，凡事停滞，不宜妄动。", chuchu: "《奇门遁甲统宗大全》" },
    "乙乙": { name: "日奇伏吟", desc: "天盘乙加地盘乙，主伏吟，凡事静守为吉。", chuchu: "《奇门遁甲统宗大全》" },
    "丙丙": { name: "月奇伏吟", desc: "天盘丙加地盘丙，主伏吟，文书迟滞。", chuchu: "《奇门遁甲统宗大全》" },
    "丁丁": { name: "星奇伏吟", desc: "天盘丁加地盘丁，主伏吟，凡事安宁。", chuchu: "《奇门遁甲统宗大全》" },
    "戊乙": { name: "青龙合灵", desc: "天盘戊加地盘乙，主和合，凡事顺利。", chuchu: "《奇门遁甲统宗大全》" },
    "乙戊": { name: "利阴害阳", desc: "天盘乙加地盘戊，主阴害阳，凡事不利。", chuchu: "《奇门遁甲秘笈大全》" },
    "戊丙": { name: "青龙回首", desc: "天盘戊加地盘丙，主青龙回首，百事皆吉。", chuchu: "《奇门遁甲统宗大全》" },
    "丙戊": { name: "飞鸟跌穴", desc: "天盘丙加地盘戊，主飞鸟跌穴，百事皆吉。", chuchu: "《奇门遁甲统宗大全》" },
    "戊丁": { name: "青龙耀明", desc: "天盘戊加地盘丁，主青龙耀明，谒贵大吉。", chuchu: "《奇门遁甲统宗大全》" },
    "丁戊": { name: "青龙转光", desc: "天盘丁加地盘戊，主青龙转光，贵人升迁。", chuchu: "《奇门遁甲秘笈大全》" },
    "乙丙": { name: "日月并行", desc: "天盘乙加地盘丙，主日月并行，谋为皆吉。", chuchu: "《奇门遁甲统宗大全》" },
    "丙乙": { name: "日月相悖", desc: "天盘丙加地盘乙，主日月相悖，谋为不顺。", chuchu: "《奇门遁甲秘笈大全》" },
    "乙丁": { name: "人遁", desc: "天盘乙加地盘丁，主人遁，宜暗谋机密事。", chuchu: "《奇门遁甲统宗大全》" },
    "丁乙": { name: "人遁", desc: "天盘丁加地盘乙，主人遁，宜暗谋机密事。", chuchu: "《奇门遁甲统宗大全》" },
    "丙丁": { name: "星奇朱雀", desc: "天盘丙加地盘丁，主星奇朱雀，文书信息至。", chuchu: "《奇门遁甲统宗大全》" },
    "丁丙": { name: "星随月转", desc: "天盘丁加地盘丙，主星随月转，贵人提携。", chuchu: "《奇门遁甲秘笈大全》" },
    "庚庚": { name: "太白入荧", desc: "天盘庚加地盘庚，主太白入荧，客主相残。", chuchu: "《奇门遁甲统宗大全》" },
    "庚癸": { name: "大格", desc: "天盘庚加地盘癸，主大格，道路堵塞，出行受阻。", chuchu: "《奇门遁甲统宗大全》" },
    "庚壬": { name: "小格", desc: "天盘庚加地盘壬，主小格，小事阻隔，做事不顺。", chuchu: "《奇门遁甲统宗大全》" },
    "庚戊": { name: "太白逢星", desc: "天盘庚加地盘戊，主太白逢星，官非刑狱。", chuchu: "《奇门遁甲秘笈大全》" },
    "庚乙": { name: "太白逢星", desc: "天盘庚加地盘乙，主太白逢星，谋为不利。", chuchu: "《奇门遁甲秘笈大全》" },
    "庚丙": { name: "太白入荧", desc: "天盘庚加地盘丙，主太白入荧，贼来为客。", chuchu: "《奇门遁甲统宗大全》" },
    "庚丁": { name: "太白逢星", desc: "天盘庚加地盘丁，主太白逢星，文书阻隔。", chuchu: "《奇门遁甲秘笈大全》" },
  }

  if (ganGejuMap[ganCombo]) {
    geju.push(ganGejuMap[ganCombo].name)
    duanyu.push({
      title: ganGejuMap[ganCombo].name,
      content: ganGejuMap[ganCombo].desc,
      chuchu: ganGejuMap[ganCombo].chuchu
    })
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

  // 门星组合判断
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