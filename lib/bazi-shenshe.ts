"use client"

import { TIAN_GAN, DI_ZHI } from "./bazi-data"

// 神煞数据库 - 参考《三命通会》

// 天德贵人（按月支）
export const SHEN_SHA_TIAN_DE: Record<string, string> = {
  寅: "丁", 卯: "申", 辰: "壬", 巳: "辛", 午: "亥", 未: "甲",
  申: "癸", 酉: "寅", 戌: "丙", 亥: "乙", 子: "巳", 丑: "庚"
}

// 月德贵人（按月支）
export const SHEN_SHA_YUE_DE: Record<string, string> = {
  寅: "丙", 卯: "甲", 辰: "壬", 巳: "庚", 午: "丙", 未: "甲",
  申: "壬", 酉: "庚", 戌: "丙", 亥: "甲", 子: "壬", 丑: "庚"
}

// 天德合
export const SHEN_SHA_TIAN_DE_HE: Record<string, string> = {
  寅: "壬", 卯: "己", 辰: "丁", 巳: "丙", 午: "寅", 未: "己",
  申: "戊", 酉: "亥", 戌: "辛", 亥: "庚", 子: "申", 丑: "乙"
}

// 月德合
export const SHEN_SHA_YUE_DE_HE: Record<string, string> = {
  寅: "辛", 卯: "己", 辰: "丁", 巳: "乙", 午: "辛", 未: "己",
  申: "丁", 酉: "乙", 戌: "辛", 亥: "己", 子: "丁", 丑: "乙"
}

// 天乙贵人（按年干或日干）
export const SHEN_SHA_TIAN_YI: Record<string, string[]> = {
  甲: ["丑", "未"], 乙: ["子", "申"], 丙: ["亥", "酉"], 丁: ["亥", "酉"],
  戊: ["丑", "未"], 己: ["子", "申"], 庚: ["午", "寅"], 辛: ["午", "寅"],
  壬: ["巳", "卯"], 癸: ["巳", "卯"]
}

// 文昌贵人（按年干或日干）
export const SHEN_SHA_WEN_CHANG: Record<string, string> = {
  甲: "巳", 乙: "午", 丙: "申", 丁: "酉", 戊: "申", 己: "酉",
  庚: "亥", 辛: "子", 壬: "寅", 癸: "卯"
}

// 文曲星（按年干或日干）
export const SHEN_SHA_WEN_QU: Record<string, string> = {
  甲: "子", 乙: "亥", 丙: "寅", 丁: "卯", 戊: "寅", 己: "卯",
  庚: "午", 辛: "巳", 壬: "申", 癸: "酉"
}

// 将星（按年支或日支）
export const SHEN_SHA_JIANG_XING: Record<string, string> = {
  申: "子", 子: "子", 辰: "子", 寅: "午", 午: "午", 戌: "午",
  亥: "卯", 卯: "卯", 未: "卯", 巳: "酉", 酉: "酉", 丑: "酉"
}

// 华盖（按年支或日支）
export const SHEN_SHA_HUA_GAI: Record<string, string> = {
  申: "丑", 子: "辰", 辰: "辰", 寅: "戌", 午: "戌", 戌: "戌",
  亥: "未", 卯: "未", 未: "未", 巳: "丑", 酉: "丑", 丑: "丑"
}

// 驿马（按年支或日支）
export const SHEN_SHA_YI_MA: Record<string, string> = {
  申: "寅", 子: "寅", 辰: "寅", 寅: "申", 午: "申", 戌: "申",
  亥: "巳", 卯: "巳", 未: "巳", 巳: "亥", 酉: "亥", 丑: "亥"
}

// 桃花（按年支或日支）
export const SHEN_SHA_TAO_HUA: Record<string, string> = {
  申: "酉", 子: "酉", 辰: "酉", 寅: "卯", 午: "卯", 戌: "卯",
  亥: "子", 卯: "子", 未: "子", 巳: "午", 酉: "午", 丑: "午"
}

// 红鸾（按年支）
export const SHEN_SHA_HONG_LUAN: Record<string, string> = {
  子: "卯", 丑: "寅", 寅: "丑", 卯: "子", 辰: "亥", 巳: "戌",
  午: "酉", 未: "申", 申: "未", 酉: "午", 戌: "巳", 亥: "辰"
}

// 天喜（按年支）
export const SHEN_SHA_TIAN_XI: Record<string, string> = {
  子: "酉", 丑: "申", 寅: "未", 卯: "午", 辰: "巳", 巳: "辰",
  午: "卯", 未: "寅", 申: "丑", 酉: "子", 戌: "亥", 亥: "戌"
}

// 金舆（按年干）
export const SHEN_SHA_JIN_YU: Record<string, string> = {
  甲: "辰", 乙: "巳", 丙: "未", 丁: "申", 戊: "未", 己: "申",
  庚: "戌", 辛: "亥", 壬: "丑", 癸: "寅"
}

// 天医（按月支）
export const SHEN_SHA_TIAN_YI_SHU: Record<string, string> = {
  寅: "丑", 卯: "寅", 辰: "卯", 巳: "辰", 午: "巳", 未: "午",
  申: "未", 酉: "申", 戌: "酉", 亥: "戌", 子: "亥", 丑: "子"
}

// 福星贵人（按年干）
export const SHEN_SHA_FU_XING: Record<string, string> = {
  甲: "寅", 乙: "申", 丙: "午", 丁: "酉", 戊: "申", 己: "酉",
  庚: "子", 辛: "寅", 壬: "亥", 癸: "卯"
}

// 太极贵人（按年干或日干）
export const SHEN_SHA_TAI_JI: Record<string, string[]> = {
  甲: ["子", "午"], 乙: ["卯", "酉"], 丙: ["子", "午"], 丁: ["卯", "酉"],
  戊: ["子", "午"], 己: ["卯", "酉"], 庚: ["子", "午"], 辛: ["卯", "酉"],
  壬: ["子", "午"], 癸: ["卯", "酉"]
}

// 国印贵人（按年干）
export const SHEN_SHA_GUO_YIN: Record<string, string> = {
  甲: "戌", 乙: "亥", 丙: "丑", 丁: "寅", 戊: "丑", 己: "寅",
  庚: "辰", 辛: "巳", 壬: "未", 癸: "申"
}

// 德秀贵人（按年干）
export const SHEN_SHA_DE_XIU: Record<string, string[]> = {
  甲: ["寅", "午"], 乙: ["卯", "巳"], 丙: ["子", "申"], 丁: ["酉", "亥"],
  戊: ["寅", "午"], 己: ["卯", "巳"], 庚: ["子", "申"], 辛: ["酉", "亥"],
  壬: ["寅", "午"], 癸: ["卯", "巳"]
}

// 天厨贵人（按年干）
export const SHEN_SHA_TIAN_CHU: Record<string, string> = {
  甲: "巳", 乙: "午", 丙: "辰", 丁: "巳", 戊: "午", 己: "未",
  庚: "申", 辛: "酉", 壬: "亥", 癸: "子"
}

// 词馆（按年干）
export const SHEN_SHA_CI_GUAN: Record<string, string> = {
  甲: "寅", 乙: "卯", 丙: "巳", 丁: "午", 戊: "巳", 己: "午",
  庚: "申", 辛: "酉", 壬: "亥", 癸: "子"
}

// 学堂（按年干）
export const SHEN_SHA_XUE_TANG: Record<string, string> = {
  甲: "亥", 乙: "寅", 丙: "申", 丁: "酉", 戊: "申", 己: "酉",
  庚: "子", 辛: "亥", 壬: "寅", 癸: "卯"
}

// 禄神（按日干）
export const SHEN_SHA_LU: Record<string, string> = {
  甲: "寅", 乙: "卯", 丙: "巳", 丁: "午", 戊: "巳", 己: "午",
  庚: "申", 辛: "酉", 壬: "亥", 癸: "子"
}

// 羊刃（按日干）
export const SHEN_SHA_YANG_REN: Record<string, string> = {
  甲: "卯", 乙: "寅", 丙: "午", 丁: "巳", 戊: "午", 己: "巳",
  庚: "酉", 辛: "申", 壬: "子", 癸: "亥"
}

// 劫煞（按年支或日支）
export const SHEN_SHA_JIE_SHA: Record<string, string> = {
  申: "巳", 子: "巳", 辰: "巳", 寅: "亥", 午: "亥", 戌: "亥",
  亥: "申", 卯: "申", 未: "申", 巳: "寅", 酉: "寅", 丑: "寅"
}

// 亡神（按年支或日支）
export const SHEN_SHA_WANG_SHEN: Record<string, string> = {
  申: "亥", 子: "亥", 辰: "亥", 寅: "巳", 午: "巳", 戌: "巳",
  亥: "寅", 卯: "寅", 未: "寅", 巳: "申", 酉: "申", 丑: "申"
}

// 勾绞（按年支或日支）
export const SHEN_SHA_GOU_JIAO: Record<string, string> = {
  子: "卯", 丑: "辰", 寅: "巳", 卯: "午", 辰: "未", 巳: "申",
  午: "酉", 未: "戌", 申: "亥", 酉: "子", 戌: "丑", 亥: "寅"
}

// 孤辰（按年支或日支）
export const SHEN_SHA_GU_CHEN: Record<string, string> = {
  申: "寅", 子: "寅", 辰: "寅", 寅: "戌", 午: "戌", 戌: "戌",
  亥: "巳", 卯: "巳", 未: "巳", 巳: "亥", 酉: "亥", 丑: "亥"
}

// 寡宿（按年支或日支）
export const SHEN_SHA_GUA_SU: Record<string, string> = {
  申: "戌", 子: "戌", 辰: "戌", 寅: "辰", 午: "辰", 戌: "辰",
  亥: "丑", 卯: "丑", 未: "丑", 巳: "未", 酉: "未", 丑: "未"
}

// 阴差阳错（按日柱）
export const SHEN_SHA_YIN_CHA_YANG_CUO: string[] = [
  "丙子", "丁丑", "戊寅", "辛卯", "壬辰", "癸巳",
  "丙午", "丁未", "戊申", "辛酉", "壬戌", "癸亥"
]

// 元辰（按年干或日干）
export const SHEN_SHA_YUAN_CHEN: Record<string, string> = {
  甲: "未", 乙: "辰", 丙: "丑", 丁: "子", 戊: "亥", 己: "戌",
  庚: "酉", 辛: "申", 壬: "未", 癸: "午"
}

// 飞刃（按日干）
export const SHEN_SHA_FEI_REN: Record<string, string> = {
  甲: "酉", 乙: "申", 丙: "子", 丁: "亥", 戊: "子", 己: "亥",
  庚: "卯", 辛: "寅", 壬: "午", 癸: "巳"
}

// 披麻（按年支）
export const SHEN_SHA_PI_MA: Record<string, string[]> = {
  子: ["寅", "巳"], 丑: ["卯", "午"], 寅: ["辰", "未"], 卯: ["巳", "申"],
  辰: ["午", "酉"], 巳: ["未", "戌"], 午: ["申", "亥"], 未: ["酉", "子"],
  申: ["戌", "丑"], 酉: ["亥", "寅"], 戌: ["子", "卯"], 亥: ["丑", "辰"]
}

// 丧门（按年支）
export const SHEN_SHA_SANG_MEN: Record<string, string[]> = {
  子: ["卯", "午"], 丑: ["辰", "未"], 寅: ["巳", "申"], 卯: ["午", "酉"],
  辰: ["未", "戌"], 巳: ["申", "亥"], 午: ["酉", "子"], 未: ["戌", "丑"],
  申: ["亥", "寅"], 酉: ["子", "卯"], 戌: ["丑", "辰"], 亥: ["寅", "巳"]
}

// 神煞分类
export const SHEN_SHA_CATEGORIES = {
  吉神: [
    "天德贵人", "月德贵人", "天德合", "月德合", "天乙贵人", "文昌贵人",
    "文曲星", "将星", "华盖", "驿马", "桃花", "红鸾", "天喜", "金舆",
    "天医", "福星贵人", "太极贵人", "国印贵人", "德秀贵人", "天厨贵人",
    "词馆", "学堂", "禄神"
  ],
  凶神: [
    "羊刃", "劫煞", "亡神", "勾绞", "孤辰", "寡宿", "阴差阳错",
    "元辰", "飞刃", "披麻", "丧门", "空亡"
  ]
}

// 检查单个神煞
function checkSingleShenSha(
  bazi: { yearGan: string; yearZhi: string; monthGan: string; monthZhi: string; dayGan: string; dayZhi: string; hourGan: string; hourZhi: string },
  name: string,
  type: 'gan' | 'zhi' | 'ganzhi',
  data: Record<string, string | string[]>
): boolean {
  const allGan = [bazi.yearGan, bazi.monthGan, bazi.dayGan, bazi.hourGan]
  const allZhi = [bazi.yearZhi, bazi.monthZhi, bazi.dayZhi, bazi.hourZhi]
  const allGanZhi = [
    bazi.yearGan + bazi.yearZhi,
    bazi.monthGan + bazi.monthZhi,
    bazi.dayGan + bazi.dayZhi,
    bazi.hourGan + bazi.hourZhi
  ]

  let keys: string[] = []
  let values: (string | string[])[] = []

  if (type === 'gan') {
    keys = [bazi.yearGan, bazi.dayGan]
    values = keys.map(k => data[k])
  } else if (type === 'zhi') {
    keys = [bazi.yearZhi, bazi.dayZhi]
    values = keys.map(k => data[k])
  } else {
    keys = [bazi.dayGan + bazi.dayZhi]
    values = keys.map(k => data[k])
  }

  for (const value of values) {
    if (!value) continue
    
    if (Array.isArray(value)) {
      for (const v of value) {
        if (type === 'gan') {
          if (allGan.includes(v)) return true
        } else if (type === 'zhi') {
          if (allZhi.includes(v)) return true
        } else {
          if (allGanZhi.includes(v)) return true
        }
      }
    } else {
      if (type === 'gan') {
        if (allGan.includes(value)) return true
      } else if (type === 'zhi') {
        if (allZhi.includes(value)) return true
      } else {
        if (allGanZhi.includes(value)) return true
      }
    }
  }
  
  return false
}

// 检查神煞（按柱位）
export function checkShenShaByPosition(
  bazi: { yearGan: string; yearZhi: string; monthGan: string; monthZhi: string; dayGan: string; dayZhi: string; hourGan: string; hourZhi: string }
): Record<string, string[]> {
  const result: Record<string, string[]> = {
    year: [],
    month: [],
    day: [],
    hour: []
  }

  const allGan = [bazi.yearGan, bazi.monthGan, bazi.dayGan, bazi.hourGan]
  const allZhi = [bazi.yearZhi, bazi.monthZhi, bazi.dayZhi, bazi.hourZhi]
  const dayGanZhi = bazi.dayGan + bazi.dayZhi

  // 年柱神煞
  if (SHEN_SHA_TIAN_YI[bazi.yearGan]) {
    const tianYiZhi = SHEN_SHA_TIAN_YI[bazi.yearGan]
    if (tianYiZhi.some(z => allZhi.includes(z))) {
      result.year.push("天乙贵人")
    }
  }

  if (SHEN_SHA_WEN_CHANG[bazi.yearGan] && allZhi.includes(SHEN_SHA_WEN_CHANG[bazi.yearGan])) {
    result.year.push("文昌贵人")
  }

  if (SHEN_SHA_WEN_QU[bazi.yearGan] && allZhi.includes(SHEN_SHA_WEN_QU[bazi.yearGan])) {
    result.year.push("文曲星")
  }

  if (SHEN_SHA_JIANG_XING[bazi.yearZhi] && allZhi.includes(SHEN_SHA_JIANG_XING[bazi.yearZhi])) {
    result.year.push("将星")
  }

  if (SHEN_SHA_HUA_GAI[bazi.yearZhi] && allZhi.includes(SHEN_SHA_HUA_GAI[bazi.yearZhi])) {
    result.year.push("华盖")
  }

  if (SHEN_SHA_YI_MA[bazi.yearZhi] && allZhi.includes(SHEN_SHA_YI_MA[bazi.yearZhi])) {
    result.year.push("驿马")
  }

  if (SHEN_SHA_TAO_HUA[bazi.yearZhi] && allZhi.includes(SHEN_SHA_TAO_HUA[bazi.yearZhi])) {
    result.year.push("桃花")
  }

  if (SHEN_SHA_HONG_LUAN[bazi.yearZhi] && allZhi.includes(SHEN_SHA_HONG_LUAN[bazi.yearZhi])) {
    result.year.push("红鸾")
  }

  if (SHEN_SHA_TIAN_XI[bazi.yearZhi] && allZhi.includes(SHEN_SHA_TIAN_XI[bazi.yearZhi])) {
    result.year.push("天喜")
  }

  if (SHEN_SHA_JIN_YU[bazi.yearGan] && allZhi.includes(SHEN_SHA_JIN_YU[bazi.yearGan])) {
    result.year.push("金舆")
  }

  if (SHEN_SHA_FU_XING[bazi.yearGan] && allZhi.includes(SHEN_SHA_FU_XING[bazi.yearGan])) {
    result.year.push("福星贵人")
  }

  if (SHEN_SHA_TAI_JI[bazi.yearGan]) {
    const taiJiZhi = SHEN_SHA_TAI_JI[bazi.yearGan]
    if (taiJiZhi.some(z => allZhi.includes(z))) {
      result.year.push("太极贵人")
    }
  }

  if (SHEN_SHA_GUO_YIN[bazi.yearGan] && allZhi.includes(SHEN_SHA_GUO_YIN[bazi.yearGan])) {
    result.year.push("国印贵人")
  }

  if (SHEN_SHA_DE_XIU[bazi.yearGan]) {
    const deXiuZhi = SHEN_SHA_DE_XIU[bazi.yearGan]
    if (deXiuZhi.some(z => allZhi.includes(z))) {
      result.year.push("德秀贵人")
    }
  }

  if (SHEN_SHA_TIAN_CHU[bazi.yearGan] && allZhi.includes(SHEN_SHA_TIAN_CHU[bazi.yearGan])) {
    result.year.push("天厨贵人")
  }

  if (SHEN_SHA_CI_GUAN[bazi.yearGan] && allZhi.includes(SHEN_SHA_CI_GUAN[bazi.yearGan])) {
    result.year.push("词馆")
  }

  if (SHEN_SHA_XUE_TANG[bazi.yearGan] && allZhi.includes(SHEN_SHA_XUE_TANG[bazi.yearGan])) {
    result.year.push("学堂")
  }

  // 月柱神煞
  if (SHEN_SHA_TIAN_DE[bazi.monthZhi] && allGan.includes(SHEN_SHA_TIAN_DE[bazi.monthZhi])) {
    result.month.push("天德贵人")
  }

  if (SHEN_SHA_YUE_DE[bazi.monthZhi] && allGan.includes(SHEN_SHA_YUE_DE[bazi.monthZhi])) {
    result.month.push("月德贵人")
  }

  if (SHEN_SHA_TIAN_DE_HE[bazi.monthZhi] && allGan.includes(SHEN_SHA_TIAN_DE_HE[bazi.monthZhi])) {
    result.month.push("天德合")
  }

  if (SHEN_SHA_YUE_DE_HE[bazi.monthZhi] && allGan.includes(SHEN_SHA_YUE_DE_HE[bazi.monthZhi])) {
    result.month.push("月德合")
  }

  if (SHEN_SHA_TIAN_YI_SHU[bazi.monthZhi] && allZhi.includes(SHEN_SHA_TIAN_YI_SHU[bazi.monthZhi])) {
    result.month.push("天医")
  }

  // 日柱神煞
  if (SHEN_SHA_YIN_CHA_YANG_CUO.includes(dayGanZhi)) {
    result.day.push("阴差阳错")
  }

  if (SHEN_SHA_TIAN_YI[bazi.dayGan]) {
    const tianYiZhi = SHEN_SHA_TIAN_YI[bazi.dayGan]
    if (tianYiZhi.some(z => allZhi.includes(z))) {
      result.day.push("天乙贵人")
    }
  }

  if (SHEN_SHA_LU[bazi.dayGan] && allZhi.includes(SHEN_SHA_LU[bazi.dayGan])) {
    result.day.push("禄神")
  }

  if (SHEN_SHA_YANG_REN[bazi.dayGan] && allZhi.includes(SHEN_SHA_YANG_REN[bazi.dayGan])) {
    result.day.push("羊刃")
  }

  if (SHEN_SHA_YUAN_CHEN[bazi.dayGan] && allZhi.includes(SHEN_SHA_YUAN_CHEN[bazi.dayGan])) {
    result.day.push("元辰")
  }

  if (SHEN_SHA_FEI_REN[bazi.dayGan] && allZhi.includes(SHEN_SHA_FEI_REN[bazi.dayGan])) {
    result.day.push("飞刃")
  }

  // 时柱神煞
  if (SHEN_SHA_TAI_JI[bazi.hourGan]) {
    const taiJiZhi = SHEN_SHA_TAI_JI[bazi.hourGan]
    if (taiJiZhi.some(z => allZhi.includes(z))) {
      result.hour.push("太极贵人")
    }
  }

  if (SHEN_SHA_WEN_CHANG[bazi.hourGan] && allZhi.includes(SHEN_SHA_WEN_CHANG[bazi.hourGan])) {
    result.hour.push("文昌贵人")
  }

  if (SHEN_SHA_TIAN_CHU[bazi.hourGan] && allZhi.includes(SHEN_SHA_TIAN_CHU[bazi.hourGan])) {
    result.hour.push("天厨贵人")
  }

  if (SHEN_SHA_TIAN_YI[bazi.hourGan]) {
    const tianYiZhi = SHEN_SHA_TIAN_YI[bazi.hourGan]
    if (tianYiZhi.some(z => allZhi.includes(z))) {
      result.hour.push("天乙贵人")
    }
  }

  if (SHEN_SHA_FU_XING[bazi.hourGan] && allZhi.includes(SHEN_SHA_FU_XING[bazi.hourGan])) {
    result.hour.push("福星贵人")
  }

  // 空亡
  const kongWang = getKongWang(dayGanZhi)
  if (kongWang.length > 0) {
    if (kongWang.includes(bazi.yearZhi)) result.year.push("空亡")
    if (kongWang.includes(bazi.monthZhi)) result.month.push("空亡")
    if (kongWang.includes(bazi.dayZhi)) result.day.push("空亡")
    if (kongWang.includes(bazi.hourZhi)) result.hour.push("空亡")
  }

  // 劫煞
  if (SHEN_SHA_JIE_SHA[bazi.dayZhi] && allZhi.includes(SHEN_SHA_JIE_SHA[bazi.dayZhi])) {
    result.day.push("劫煞")
  }

  // 亡神
  if (SHEN_SHA_WANG_SHEN[bazi.dayZhi] && allZhi.includes(SHEN_SHA_WANG_SHEN[bazi.dayZhi])) {
    result.day.push("亡神")
  }

  // 孤辰寡宿
  if (SHEN_SHA_GU_CHEN[bazi.dayZhi] && allZhi.includes(SHEN_SHA_GU_CHEN[bazi.dayZhi])) {
    result.day.push("孤辰")
  }
  if (SHEN_SHA_GUA_SU[bazi.dayZhi] && allZhi.includes(SHEN_SHA_GUA_SU[bazi.dayZhi])) {
    result.day.push("寡宿")
  }

  return result
}

// 获取空亡
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
    0: ["戌", "亥"],
    1: ["申", "酉"],
    2: ["午", "未"],
    3: ["辰", "巳"],
    4: ["寅", "卯"],
    5: ["子", "丑"]
  }

  const idx = jiazi60.indexOf(dayGanZhi)
  if (idx === -1) return []

  const xunIdx = Math.floor(idx / 10)
  return kongWangMap[xunIdx] || []
}