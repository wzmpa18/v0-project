"use client"

// 八字完整数据库 - 神煞、纳音、十神等

// 天干
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

// 地支
export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 天干五行
export const GAN_WUXING: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水"
}

// 地支五行
export const ZHI_WUXING: Record<string, string> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
}

// 地支藏干
export const ZHI_CANG_GAN: Record<string, string[]> = {
  子: ["癸"],
  丑: ["己", "癸", "辛"],
  寅: ["甲", "丙", "戊"],
  卯: ["乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "戊", "庚"],
  午: ["丁", "己"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"]
}

// 六十甲子纳音
export const JIAZI_NAYIN: Record<string, string> = {
  "甲子": "海中金", "乙丑": "海中金",
  "丙寅": "炉中火", "丁卯": "炉中火",
  "戊辰": "大林木", "己巳": "大林木",
  "庚午": "路旁土", "辛未": "路旁土",
  "壬申": "剑锋金", "癸酉": "剑锋金",
  "甲戌": "山头火", "乙亥": "山头火",
  "丙子": "涧下水", "丁丑": "涧下水",
  "戊寅": "城头土", "己卯": "城头土",
  "庚辰": "白蜡金", "辛巳": "白蜡金",
  "壬午": "杨柳木", "癸未": "杨柳木",
  "甲申": "泉中水", "乙酉": "泉中水",
  "丙戌": "屋上土", "丁亥": "屋上土",
  "戊子": "霹雳火", "己丑": "霹雳火",
  "庚寅": "松柏木", "辛卯": "松柏木",
  "壬辰": "长流水", "癸巳": "长流水",
  "甲午": "砂中金", "乙未": "砂中金",
  "丙申": "山下火", "丁酉": "山下火",
  "戊戌": "平地木", "己亥": "平地木",
  "庚子": "壁上土", "辛丑": "壁上土",
  "壬寅": "金箔金", "癸卯": "金箔金",
  "甲辰": "覆灯火", "乙巳": "覆灯火",
  "丙午": "天河水", "丁未": "天河水",
  "戊申": "大驿土", "己酉": "大驿土",
  "庚戌": "钗钏金", "辛亥": "钗钏金",
  "壬子": "桑柘木", "癸丑": "桑柘木",
  "甲寅": "大溪水", "乙卯": "大溪水",
  "丙辰": "沙中土", "丁巳": "沙中土",
  "戊午": "天上火", "己未": "天上火",
  "庚申": "石榴木", "辛酉": "石榴木",
  "壬戌": "大海水", "癸亥": "大海水"
}

// 十神计算
export function getShiShen(dayGan: string, targetGan: string): string {
  const ganOrder = TIAN_GAN
  const dayIdx = ganOrder.indexOf(dayGan)
  const targetIdx = ganOrder.indexOf(targetGan)
  
  const dayWuxing = GAN_WUXING[dayGan]
  const targetWuxing = GAN_WUXING[targetGan]
  
  // 阴阳
  const dayYinYang = dayIdx % 2 // 0阳1阴
  const targetYinYang = targetIdx % 2
  const sameYinYang = dayYinYang === targetYinYang
  
  // 五行生克关系
  const wuxingOrder = ["木", "火", "土", "金", "水"]
  const dayWuxingIdx = wuxingOrder.indexOf(dayWuxing)
  const targetWuxingIdx = wuxingOrder.indexOf(targetWuxing)
  
  // 同我
  if (dayWuxing === targetWuxing) {
    return sameYinYang ? "比肩" : "劫财"
  }
  // 我生
  if ((dayWuxingIdx + 1) % 5 === targetWuxingIdx) {
    return sameYinYang ? "食神" : "伤官"
  }
  // 生我
  if ((targetWuxingIdx + 1) % 5 === dayWuxingIdx) {
    return sameYinYang ? "偏印" : "正印"
  }
  // 我克
  if ((dayWuxingIdx + 2) % 5 === targetWuxingIdx) {
    return sameYinYang ? "偏财" : "正财"
  }
  // 克我
  if ((targetWuxingIdx + 2) % 5 === dayWuxingIdx) {
    return sameYinYang ? "七杀" : "正官"
  }
  
  return "比肩"
}

// 神煞数据
export const SHEN_SHA = {
  // 天德贵人（按月支）
  tianDe: { 寅: "丁", 卯: "申", 辰: "壬", 巳: "辛", 午: "亥", 未: "甲", 申: "癸", 酉: "寅", 戌: "丙", 亥: "乙", 子: "巳", 丑: "庚" },
  // 月德贵人（按月支）
  yueDe: { 寅: "丙", 卯: "甲", 辰: "壬", 巳: "庚", 午: "丙", 未: "甲", 申: "壬", 酉: "庚", 戌: "丙", 亥: "甲", 子: "壬", 丑: "庚" },
  // 驿马（按年支或日支）
  yiMa: { 申: "寅", 子: "寅", 辰: "寅", 寅: "申", 午: "申", 戌: "申", 亥: "巳", 卯: "巳", 未: "巳", 巳: "亥", 酉: "亥", 丑: "亥" },
  // 桃花（按年支或日支）
  taoHua: { 申: "酉", 子: "酉", 辰: "酉", 寅: "卯", 午: "卯", 戌: "卯", 亥: "子", 卯: "子", 未: "子", 巳: "午", 酉: "午", 丑: "午" },
  // 华盖（按年支或日支）
  huaGai: { 申: "丑", 子: "辰", 辰: "辰", 寅: "戌", 午: "戌", 戌: "戌", 亥: "未", 卯: "未", 未: "未", 巳: "丑", 酉: "丑", 丑: "丑" },
  // 天医（按月支）
  tianYi: { 寅: "丑", 卯: "寅", 辰: "卯", 巳: "辰", 午: "巳", 未: "午", 申: "未", 酉: "申", 戌: "酉", 亥: "戌", 子: "亥", 丑: "子" },
  // 文昌（按年干）
  wenChang: { 甲: "巳", 乙: "午", 丙: "申", 丁: "酉", 戊: "申", 己: "酉", 庚: "亥", 辛: "子", 壬: "寅", 癸: "卯" },
  // 将星（按年支或日支）
  jiangXing: { 申: "子", 子: "子", 辰: "子", 寅: "午", 午: "午", 戌: "午", 亥: "卯", 卯: "卯", 未: "卯", 巳: "酉", 酉: "酉", 丑: "酉" }
}

// 空亡计算（按日柱）
export function getKongWang(dayGanZhi: string): string[] {
  const jiazi60 = [
    "甲子", "乙丑", "丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉",
    "甲戌", "乙亥", "丙子", "丁丑", "戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未",
    "甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳",
    "甲午", "乙未", "丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯",
    "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑",
    "甲寅", "乙卯", "丙辰", "丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌", "癸亥"
  ]
  
  const kongWangMap: Record<number, string[]> = {
    0: ["戌", "亥"], // 甲子旬
    1: ["申", "酉"], // 甲戌旬
    2: ["午", "未"], // 甲申旬
    3: ["辰", "巳"], // 甲午旬
    4: ["寅", "卯"], // 甲辰旬
    5: ["子", "丑"]  // 甲寅旬
  }
  
  const idx = jiazi60.indexOf(dayGanZhi)
  if (idx === -1) return []
  
  const xunIdx = Math.floor(idx / 10)
  return kongWangMap[xunIdx] || []
}

// 检查神煞
export function checkShenSha(bazi: { yearGan: string, yearZhi: string, monthGan: string, monthZhi: string, dayGan: string, dayZhi: string, hourGan: string, hourZhi: string }) {
  const result: string[] = []
  const allZhi = [bazi.yearZhi, bazi.monthZhi, bazi.dayZhi, bazi.hourZhi]
  const allGan = [bazi.yearGan, bazi.monthGan, bazi.dayGan, bazi.hourGan]
  
  // 天德
  const tianDeGan = SHEN_SHA.tianDe[bazi.monthZhi as keyof typeof SHEN_SHA.tianDe]
  if (tianDeGan && allGan.includes(tianDeGan)) {
    result.push("天德贵人")
  }
  
  // 月德
  const yueDeGan = SHEN_SHA.yueDe[bazi.monthZhi as keyof typeof SHEN_SHA.yueDe]
  if (yueDeGan && allGan.includes(yueDeGan)) {
    result.push("月德贵人")
  }
  
  // 驿马
  const yiMaZhi = SHEN_SHA.yiMa[bazi.yearZhi as keyof typeof SHEN_SHA.yiMa]
  if (yiMaZhi && allZhi.includes(yiMaZhi)) {
    result.push("驿马")
  }
  
  // 桃花
  const taoHuaZhi = SHEN_SHA.taoHua[bazi.yearZhi as keyof typeof SHEN_SHA.taoHua]
  if (taoHuaZhi && allZhi.includes(taoHuaZhi)) {
    result.push("桃花")
  }
  
  // 华盖
  const huaGaiZhi = SHEN_SHA.huaGai[bazi.yearZhi as keyof typeof SHEN_SHA.huaGai]
  if (huaGaiZhi && allZhi.includes(huaGaiZhi)) {
    result.push("华盖")
  }
  
  // 天医
  const tianYiZhi = SHEN_SHA.tianYi[bazi.monthZhi as keyof typeof SHEN_SHA.tianYi]
  if (tianYiZhi && allZhi.includes(tianYiZhi)) {
    result.push("天医")
  }
  
  // 文昌
  const wenChangZhi = SHEN_SHA.wenChang[bazi.yearGan as keyof typeof SHEN_SHA.wenChang]
  if (wenChangZhi && allZhi.includes(wenChangZhi)) {
    result.push("文昌")
  }
  
  // 将星
  const jiangXingZhi = SHEN_SHA.jiangXing[bazi.yearZhi as keyof typeof SHEN_SHA.jiangXing]
  if (jiangXingZhi && allZhi.includes(jiangXingZhi)) {
    result.push("将星")
  }
  
  return result
}

// 计算胎元（月干进一位 + 月支进三位）
export function getTaiYuan(monthGan: string, monthZhi: string): string {
  const ganIdx = TIAN_GAN.indexOf(monthGan)
  const zhiIdx = DI_ZHI.indexOf(monthZhi)
  
  const taiGan = TIAN_GAN[(ganIdx + 1) % 10]
  const taiZhi = DI_ZHI[(zhiIdx + 3) % 12]
  
  return taiGan + taiZhi
}

// 计算命宫
export function getMingGong(monthZhi: string, hourZhi: string): string {
  const monthIdx = DI_ZHI.indexOf(monthZhi)
  const hourIdx = DI_ZHI.indexOf(hourZhi)
  
  // 命宫地支 = 14 - 月支序数 - 时支序数
  let mingZhiIdx = (14 - monthIdx - hourIdx) % 12
  if (mingZhiIdx < 0) mingZhiIdx += 12
  
  const mingZhi = DI_ZHI[mingZhiIdx]
  
  // 命宫天干需要根据年干推算
  // 简化处理：根据地支配天干
  const zhiGanMap: Record<string, string> = {
    子: "癸", 丑: "己", 寅: "甲", 卯: "乙", 辰: "戊", 巳: "丙",
    午: "丁", 未: "己", 申: "庚", 酉: "辛", 戌: "戊", 亥: "壬"
  }
  
  return zhiGanMap[mingZhi] + mingZhi
}

// 计算身宫
export function getShenGong(monthZhi: string, hourZhi: string): string {
  const monthIdx = DI_ZHI.indexOf(monthZhi)
  const hourIdx = DI_ZHI.indexOf(hourZhi)
  
  // 身宫地支 = 月支序数 + 时支序数 - 2
  let shenZhiIdx = (monthIdx + hourIdx - 2) % 12
  if (shenZhiIdx < 0) shenZhiIdx += 12
  
  const shenZhi = DI_ZHI[shenZhiIdx]
  
  const zhiGanMap: Record<string, string> = {
    子: "癸", 丑: "己", 寅: "甲", 卯: "乙", 辰: "戊", 巳: "丙",
    午: "丁", 未: "己", 申: "庚", 酉: "辛", 戌: "戊", 亥: "壬"
  }
  
  return zhiGanMap[shenZhi] + shenZhi
}
