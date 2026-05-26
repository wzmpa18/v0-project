"use client"

// 奇门遁甲完整数据库

// 九宫位置名
export const NINE_PALACES = ["坎一宫", "坤二宫", "震三宫", "巽四宫", "中五宫", "乾六宫", "兑七宫", "艮八宫", "离九宫"]

// 九宫方位（洛书数对应）
export const PALACE_POSITIONS: Record<number, { name: string; direction: string; wuxing: string }> = {
  1: { name: "坎宫", direction: "北", wuxing: "水" },
  2: { name: "坤宫", direction: "西南", wuxing: "土" },
  3: { name: "震宫", direction: "东", wuxing: "木" },
  4: { name: "巽宫", direction: "东南", wuxing: "木" },
  5: { name: "中宫", direction: "中", wuxing: "土" },
  6: { name: "乾宫", direction: "西北", wuxing: "金" },
  7: { name: "兑宫", direction: "西", wuxing: "金" },
  8: { name: "艮宫", direction: "东北", wuxing: "土" },
  9: { name: "离宫", direction: "南", wuxing: "火" }
}

// 八门
export const BA_MEN = ["休门", "生门", "伤门", "杜门", "景门", "死门", "惊门", "开门"]
export const BA_MEN_ORIGINAL: Record<number, string> = {
  1: "休门", 8: "生门", 3: "伤门", 4: "杜门",
  9: "景门", 2: "死门", 7: "惊门", 6: "开门"
}

// 九星
export const JIU_XING = ["天蓬", "天芮", "天冲", "天辅", "天禽", "天心", "天柱", "天任", "天英"]
export const JIU_XING_ORIGINAL: Record<number, string> = {
  1: "天蓬", 2: "天芮", 3: "天冲", 4: "天辅",
  5: "天禽", 6: "天心", 7: "天柱", 8: "天任", 9: "天英"
}

// 八神（阴遁顺序）
export const BA_SHEN_YIN = ["值符", "腾蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"]
// 八神（阳遁顺序）
export const BA_SHEN_YANG = ["值符", "腾蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"]

// 三奇六仪
export const SAN_QI_LIU_YI = ["戊", "己", "庚", "辛", "壬", "癸", "丁", "丙", "乙"]
// 对应：戊为值符，己为腾蛇，庚为太阴，辛为六合，壬为白虎，癸为玄武，丁为九地，丙为九天，乙为直使

// 阳遁九局地盘布局（起点戊位置）
export const YANG_DUN_DI_PAN: Record<number, number[]> = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9], // 阳一局：戊在坎一宫
  2: [2, 3, 4, 5, 6, 7, 8, 9, 1], // 阳二局：戊在坤二宫
  3: [3, 4, 5, 6, 7, 8, 9, 1, 2], // 阳三局：戊在震三宫
  4: [4, 5, 6, 7, 8, 9, 1, 2, 3], // 阳四局：戊在巽四宫
  5: [5, 6, 7, 8, 9, 1, 2, 3, 4], // 阳五局：戊在中五宫（寄坤）
  6: [6, 7, 8, 9, 1, 2, 3, 4, 5], // 阳六局：戊在乾六宫
  7: [7, 8, 9, 1, 2, 3, 4, 5, 6], // 阳七局：戊在兑七宫
  8: [8, 9, 1, 2, 3, 4, 5, 6, 7], // 阳八局：戊在艮八宫
  9: [9, 1, 2, 3, 4, 5, 6, 7, 8]  // 阳九局：戊在离九宫
}

// 阴遁九局地盘布局
export const YIN_DUN_DI_PAN: Record<number, number[]> = {
  1: [1, 9, 8, 7, 6, 5, 4, 3, 2], // 阴一局
  2: [2, 1, 9, 8, 7, 6, 5, 4, 3], // 阴二局
  3: [3, 2, 1, 9, 8, 7, 6, 5, 4], // 阴三局
  4: [4, 3, 2, 1, 9, 8, 7, 6, 5], // 阴四局
  5: [5, 4, 3, 2, 1, 9, 8, 7, 6], // 阴五局
  6: [6, 5, 4, 3, 2, 1, 9, 8, 7], // 阴六局
  7: [7, 6, 5, 4, 3, 2, 1, 9, 8], // 阴七局
  8: [8, 7, 6, 5, 4, 3, 2, 1, 9], // 阴八局
  9: [9, 8, 7, 6, 5, 4, 3, 2, 1]  // 阴九局
}

// 九宫飞布顺序（洛书顺飞）
export const FEI_BU_SHUN = [5, 6, 7, 8, 9, 1, 2, 3, 4] // 中宫起，顺飞
export const FEI_BU_NI = [5, 4, 3, 2, 1, 9, 8, 7, 6]   // 中宫起，逆飞

// 时辰地支
export const SHI_CHEN = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 根据节气判断阴阳遁
export const JIE_QI_DUN: Record<string, { dun: "阳" | "阴"; ju: number[] }> = {
  "冬至": { dun: "阳", ju: [1, 7, 4] },
  "小寒": { dun: "阳", ju: [2, 8, 5] },
  "大寒": { dun: "阳", ju: [3, 9, 6] },
  "立春": { dun: "阳", ju: [8, 5, 2] },
  "雨水": { dun: "阳", ju: [9, 6, 3] },
  "惊蛰": { dun: "阳", ju: [1, 7, 4] },
  "春分": { dun: "阳", ju: [3, 9, 6] },
  "清明": { dun: "阳", ju: [4, 1, 7] },
  "谷雨": { dun: "阳", ju: [5, 2, 8] },
  "立夏": { dun: "阳", ju: [4, 1, 7] },
  "小满": { dun: "阳", ju: [5, 2, 8] },
  "芒种": { dun: "阳", ju: [6, 3, 9] },
  "夏至": { dun: "阴", ju: [9, 3, 6] },
  "小暑": { dun: "阴", ju: [8, 2, 5] },
  "大暑": { dun: "阴", ju: [7, 1, 4] },
  "立秋": { dun: "阴", ju: [2, 5, 8] },
  "处暑": { dun: "阴", ju: [1, 4, 7] },
  "白露": { dun: "阴", ju: [9, 3, 6] },
  "秋分": { dun: "阴", ju: [7, 1, 4] },
  "寒露": { dun: "阴", ju: [6, 9, 3] },
  "霜降": { dun: "阴", ju: [5, 8, 2] },
  "立冬": { dun: "阴", ju: [6, 9, 3] },
  "小雪": { dun: "阴", ju: [5, 8, 2] },
  "大雪": { dun: "阴", ju: [4, 7, 1] }
}

// 奇门格局判断
export const QIMEN_GEJU = {
  吉格: [
    { name: "青龙返首", desc: "天盘乙奇加地盘甲戊，大吉" },
    { name: "飞鸟跌穴", desc: "天盘丙奇加地盘甲戊，吉" },
    { name: "玉女守门", desc: "天盘丁奇加休门或开门，吉" },
    { name: "三奇得使", desc: "乙丙丁加临开休生门，大吉" },
    { name: "九遁吉格", desc: "天遁、地遁、人遁、风遁、云遁、龙遁、虎遁、神遁、鬼遁" }
  ],
  凶格: [
    { name: "青龙逃走", desc: "天盘甲戊加地盘乙奇，凶" },
    { name: "白虎猖狂", desc: "天盘庚加临开门或生门，凶" },
    { name: "朱雀投江", desc: "天盘丙加九地，凶" },
    { name: "螣蛇夭矫", desc: "天盘己加腾蛇，凶" },
    { name: "入墓格", desc: "日干入墓库，凶" }
  ]
}

// 根据时辰计算值符值使
export function getZhiFuZhiShi(hourGan: string, juNumber: number, isYangDun: boolean) {
  const ganOrder = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
  const hourGanIdx = ganOrder.indexOf(hourGan)
  
  // 简化：根据时干找到对应的六仪
  // 甲子戊、甲戌己、甲申庚、甲午辛、甲辰壬、甲寅癸
  const liuYiMap: Record<string, { ganZhi: string; liuYi: string }> = {
    甲: { ganZhi: "甲子", liuYi: "戊" },
    乙: { ganZhi: "甲戌", liuYi: "己" },
    丙: { ganZhi: "甲申", liuYi: "庚" },
    丁: { ganZhi: "甲午", liuYi: "辛" },
    戊: { ganZhi: "甲辰", liuYi: "壬" },
    己: { ganZhi: "甲寅", liuYi: "癸" },
    庚: { ganZhi: "甲子", liuYi: "戊" },
    辛: { ganZhi: "甲戌", liuYi: "己" },
    壬: { ganZhi: "甲申", liuYi: "庚" },
    癸: { ganZhi: "甲午", liuYi: "辛" }
  }
  
  const zhiFu = liuYiMap[hourGan] || { ganZhi: "甲子", liuYi: "戊" }
  
  return {
    zhiFuStar: JIU_XING_ORIGINAL[juNumber] || "天蓬",
    zhiShiMen: BA_MEN_ORIGINAL[juNumber] || "休门",
    liuYi: zhiFu.liuYi
  }
}

// 计算完整奇门盘
export interface QimenPan {
  ju: number
  dunType: "阳遁" | "阴遁"
  palaces: {
    position: number
    name: string
    direction: string
    tianPan: string  // 天盘三奇六仪
    diPan: string    // 地盘三奇六仪
    jiuXing: string  // 九星
    baMen: string    // 八门
    baShen: string   // 八神
  }[]
  zhiFu: string
  zhiShi: string
}

export function calculateQimenPan(
  jieQi: string,
  yuanIndex: number, // 0上元 1中元 2下元
  hourGan: string
): QimenPan {
  const jieQiData = JIE_QI_DUN[jieQi] || JIE_QI_DUN["冬至"]
  const dunType = jieQiData.dun === "阳" ? "阳遁" : "阴遁"
  const ju = jieQiData.ju[yuanIndex] || 1
  
  const isYangDun = dunType === "阳遁"
  const diPanLayout = isYangDun ? YANG_DUN_DI_PAN[ju] : YIN_DUN_DI_PAN[ju]
  
  const { zhiFuStar, zhiShiMen, liuYi } = getZhiFuZhiShi(hourGan, ju, isYangDun)
  
  // 九宫排列顺序：坎1-坤2-震3-巽4-中5-乾6-兑7-艮8-离9
  const palaceOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  const palaces = palaceOrder.map((pos, idx) => {
    const diPanIdx = (diPanLayout[idx] - 1 + 9) % 9
    const tianPanIdx = isYangDun ? (diPanIdx + 1) % 9 : (diPanIdx - 1 + 9) % 9
    
    return {
      position: pos,
      name: PALACE_POSITIONS[pos].name,
      direction: PALACE_POSITIONS[pos].direction,
      tianPan: SAN_QI_LIU_YI[tianPanIdx % 9],
      diPan: SAN_QI_LIU_YI[diPanIdx % 9],
      jiuXing: JIU_XING[idx % 9],
      baMen: BA_MEN[idx % 8],
      baShen: isYangDun ? BA_SHEN_YANG[idx % 8] : BA_SHEN_YIN[idx % 8]
    }
  })
  
  return {
    ju,
    dunType,
    palaces,
    zhiFu: zhiFuStar,
    zhiShi: zhiShiMen
  }
}
