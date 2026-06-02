"use client"

import { GAN_WUXING, ZHI_WUXING, ZHI_CANG_GAN, TIAN_GAN, DI_ZHI, getShiShen } from "./bazi-data"
import { WangShuaiLevel } from "./bazi-wangshuai"

// 格局类型
export type GeJuType = 
  | "正官格" | "偏官格" | "正财格" | "偏财格"
  | "正印格" | "偏印格" | "食神格" | "伤官格"
  | "建禄格" | "月刃格"
  | "从强格" | "从弱格" | "化气格"
  | "专旺格" | "杂气格" | "变格"

// 格局结果
export interface GeJuResult {
  type: GeJuType
  name: string
  description: string
  yongShen: string[]
  xiShen: string[]
  jiShen: string[]
  notes: string[]
}

// 十神对应格局
const SHI_SHEN_TO_GE_JU: Record<string, GeJuType> = {
  "正官": "正官格",
  "七杀": "偏官格",
  "正财": "正财格",
  "偏财": "偏财格",
  "正印": "正印格",
  "偏印": "偏印格",
  "食神": "食神格",
  "伤官": "伤官格"
}

// 格局名称映射
const GE_JU_NAMES: Record<GeJuType, string> = {
  "正官格": "正官格",
  "偏官格": "偏官格（七杀格）",
  "正财格": "正财格",
  "偏财格": "偏财格",
  "正印格": "正印格",
  "偏印格": "偏印格（枭神格）",
  "食神格": "食神格",
  "伤官格": "伤官格",
  "建禄格": "建禄格",
  "月刃格": "月刃格",
  "从强格": "从强格",
  "从弱格": "从弱格",
  "化气格": "化气格",
  "专旺格": "专旺格",
  "杂气格": "杂气格",
  "变格": "变格"
}

// 格局描述
const GE_JU_DESCRIPTIONS: Record<GeJuType, string> = {
  "正官格": "月令提纲为正官，为人正直，做事稳重，具有领导才能。",
  "偏官格": "月令提纲为七杀，性格刚强，果断勇敢，具有决断力。",
  "正财格": "月令提纲为正财，勤俭务实，善于理财，重视物质享受。",
  "偏财格": "月令提纲为偏财，慷慨大方，善于交际，财运亨通。",
  "正印格": "月令提纲为正印，仁慈善良，学识渊博，注重精神修养。",
  "偏印格": "月令提纲为偏印，思维敏捷，直觉敏锐，具有独特见解。",
  "食神格": "月令提纲为食神，聪明才智，乐观开朗，多才多艺。",
  "伤官格": "月令提纲为伤官，才华横溢，创造力强，思想前卫。",
  "建禄格": "月令提纲为日主之禄，身强体健，自立自强。",
  "月刃格": "月令提纲为日主之刃，性格刚强，易冲动。",
  "从强格": "日主极强，从其气势，顺其旺势。",
  "从弱格": "日主极弱，从其衰弱，顺势而为。",
  "化气格": "天干相合化气，格局清纯。",
  "专旺格": "五行专旺，气势纯粹。",
  "杂气格": "月令藏干复杂，需仔细分析。",
  "变格": "格局变化，需灵活判定。"
}

// 判断是否为建禄格
function isJianLuGe(dayGan: string, monthZhi: string): boolean {
  const luMap: Record<string, string> = {
    甲: "寅", 乙: "卯", 丙: "巳", 丁: "午", 戊: "巳", 己: "午",
    庚: "申", 辛: "酉", 壬: "亥", 癸: "子"
  }
  return luMap[dayGan] === monthZhi
}

// 判断是否为月刃格
function isYueRenGe(dayGan: string, monthZhi: string): boolean {
  const renMap: Record<string, string> = {
    甲: "卯", 乙: "寅", 丙: "午", 丁: "巳", 戊: "午", 己: "巳",
    庚: "酉", 辛: "申", 壬: "子", 癸: "亥"
  }
  return renMap[dayGan] === monthZhi
}

// 判断是否为从强格
function isCongQiangGe(wangShuaiLevel: WangShuaiLevel): boolean {
  return wangShuaiLevel === "极旺" || wangShuaiLevel === "太旺"
}

// 判断是否为从弱格
function isCongRuoGe(wangShuaiLevel: WangShuaiLevel): boolean {
  return wangShuaiLevel === "极弱" || wangShuaiLevel === "太弱"
}

// 判断是否为化气格
function isHuaQiGe(
  yearGan: string, yearZhi: string,
  monthGan: string, monthZhi: string,
  dayGan: string, dayZhi: string,
  hourGan: string, hourZhi: string
): { isHuaQi: boolean; huaWei: string } {
  const hePairs = [
    { gan1: "甲", gan2: "己", huaWei: "土" },
    { gan1: "己", gan2: "甲", huaWei: "土" },
    { gan1: "乙", gan2: "庚", huaWei: "金" },
    { gan1: "庚", gan2: "乙", huaWei: "金" },
    { gan1: "丙", gan2: "辛", huaWei: "水" },
    { gan1: "辛", gan2: "丙", huaWei: "水" },
    { gan1: "丁", gan2: "壬", huaWei: "木" },
    { gan1: "壬", gan2: "丁", huaWei: "木" },
    { gan1: "戊", gan2: "癸", huaWei: "火" },
    { gan1: "癸", gan2: "戊", huaWei: "火" }
  ]

  const allGan = [yearGan, monthGan, dayGan, hourGan]
  
  for (const pair of hePairs) {
    if (allGan.includes(pair.gan1) && allGan.includes(pair.gan2)) {
      return { isHuaQi: true, huaWei: pair.huaWei }
    }
  }
  
  return { isHuaQi: false, huaWei: "" }
}

// 判断是否为专旺格
function isZhuanWangGe(
  yearGan: string, yearZhi: string,
  monthGan: string, monthZhi: string,
  dayGan: string, dayZhi: string,
  hourGan: string, hourZhi: string
): boolean {
  const wuxingCount: Record<string, number> = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 }
  
  const gans = [yearGan, monthGan, dayGan, hourGan]
  gans.forEach(gan => {
    const wx = GAN_WUXING[gan]
    if (wx) wuxingCount[wx]++
  })
  
  const zhis = [yearZhi, monthZhi, dayZhi, hourZhi]
  zhis.forEach(zhi => {
    const wx = ZHI_WUXING[zhi]
    if (wx) wuxingCount[wx]++
  })
  
  const maxCount = Math.max(...Object.values(wuxingCount))
  return maxCount >= 5
}

// 获取月令透干十神
function getYueLingTouGan(
  monthGan: string,
  monthZhi: string,
  dayGan: string
): string | null {
  // 月干直接是十神
  const monthShiShen = getShiShen(dayGan, monthGan)
  if (monthShiShen && monthShiShen !== "比肩" && monthShiShen !== "劫财") {
    return monthShiShen
  }
  
  // 月支藏干透出
  const cangGanList = ZHI_CANG_GAN[monthZhi] || []
  const allGan = [monthGan, dayGan]
  
  for (const cangGan of cangGanList) {
    if (allGan.includes(cangGan.gan)) {
      const shiShen = getShiShen(dayGan, cangGan.gan)
      if (shiShen !== "比肩" && shiShen !== "劫财") {
        return shiShen
      }
    }
  }
  
  return null
}

// 判定格局
export function determineGeJu(
  dayGan: string,
  yearGan: string, yearZhi: string,
  monthGan: string, monthZhi: string,
  dayZhi: string,
  hourGan: string, hourZhi: string,
  wangShuaiLevel: WangShuaiLevel
): GeJuResult {
  // 先判断特殊格局
  if (isJianLuGe(dayGan, monthZhi)) {
    return {
      type: "建禄格",
      name: GE_JU_NAMES["建禄格"],
      description: GE_JU_DESCRIPTIONS["建禄格"],
      yongShen: ["财", "官", "食伤"],
      xiShen: ["财星", "官杀", "食伤"],
      jiShen: ["比劫"],
      notes: ["建禄格身强，喜财官食伤"]
    }
  }
  
  if (isYueRenGe(dayGan, monthZhi)) {
    return {
      type: "月刃格",
      name: GE_JU_NAMES["月刃格"],
      description: GE_JU_DESCRIPTIONS["月刃格"],
      yongShen: ["官杀", "食伤"],
      xiShen: ["官杀", "食伤"],
      jiShen: ["比劫", "印星"],
      notes: ["月刃格身强，喜官杀制刃或食伤泄秀"]
    }
  }
  
  // 判断从化格局
  const huaQiResult = isHuaQiGe(yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi)
  if (huaQiResult.isHuaQi) {
    return {
      type: "化气格",
      name: GE_JU_NAMES["化气格"],
      description: GE_JU_DESCRIPTIONS["化气格"],
      yongShen: [huaQiResult.huaWei],
      xiShen: ["化神"],
      jiShen: ["克制化神之物"],
      notes: [`化气格，化神为${huaQiResult.huaWei}，喜化神得地`]
    }
  }
  
  // 判断专旺格
  if (isZhuanWangGe(yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi)) {
    return {
      type: "专旺格",
      name: GE_JU_NAMES["专旺格"],
      description: GE_JU_DESCRIPTIONS["专旺格"],
      yongShen: [GAN_WUXING[dayGan]],
      xiShen: ["专旺之五行"],
      jiShen: ["克制专旺之物"],
      notes: ["专旺格顺势而行，不宜破格"]
    }
  }
  
  // 判断从格
  if (isCongQiangGe(wangShuaiLevel)) {
    return {
      type: "从强格",
      name: GE_JU_NAMES["从强格"],
      description: GE_JU_DESCRIPTIONS["从强格"],
      yongShen: ["比劫", "印星"],
      xiShen: ["比劫", "印星"],
      jiShen: ["官杀", "财星"],
      notes: ["从强格顺其旺势，喜比劫印星相助"]
    }
  }
  
  if (isCongRuoGe(wangShuaiLevel)) {
    return {
      type: "从弱格",
      name: GE_JU_NAMES["从弱格"],
      description: GE_JU_DESCRIPTIONS["从弱格"],
      yongShen: ["官杀", "财星", "食伤"],
      xiShen: ["官杀", "财星", "食伤"],
      jiShen: ["比劫", "印星"],
      notes: ["从弱格顺其弱势，喜官杀财星食伤"]
    }
  }
  
  // 判断正格
  const yueLingShiShen = getYueLingTouGan(monthGan, monthZhi, dayGan)
  if (yueLingShiShen && SHI_SHEN_TO_GE_JU[yueLingShiShen]) {
    const geJuType = SHI_SHEN_TO_GE_JU[yueLingShiShen]
    return generateZhengGeResult(geJuType, yueLingShiShen, wangShuaiLevel)
  }
  
  // 杂气格
  return {
    type: "杂气格",
    name: GE_JU_NAMES["杂气格"],
    description: GE_JU_DESCRIPTIONS["杂气格"],
    yongShen: [],
    xiShen: [],
    jiShen: [],
    notes: ["月令藏干复杂，需结合透干情况分析"]
  }
}

// 生成正格结果
function generateZhengGeResult(
  geJuType: GeJuType,
  shiShen: string,
  wangShuaiLevel: WangShuaiLevel
): GeJuResult {
  const baseResult: Record<GeJuType, { yongShen: string[]; xiShen: string[]; jiShen: string[]; notes: string[] }> = {
    "正官格": {
      yongShen: wangShuaiLevel === "偏弱" || wangShuaiLevel === "太弱" ? ["印星"] : ["财星"],
      xiShen: ["财星", "印星"],
      jiShen: ["伤官", "七杀"],
      notes: ["官星喜财生、印护，忌伤官见官"]
    },
    "偏官格": {
      yongShen: ["食神"],
      xiShen: ["食神", "印星"],
      jiShen: ["比劫", "财星"],
      notes: ["七杀喜食神制、印星化，忌财星生杀"]
    },
    "正财格": {
      yongShen: wangShuaiLevel === "偏弱" ? ["印星"] : ["官杀"],
      xiShen: ["官杀", "食神"],
      jiShen: ["比劫", "印星"],
      notes: ["财星喜食神生、官杀护，忌比劫夺财"]
    },
    "偏财格": {
      yongShen: ["食神", "伤官"],
      xiShen: ["食神", "伤官", "比劫"],
      jiShen: ["比劫"],
      notes: ["偏财喜食伤生、比劫助，忌比劫夺财"]
    },
    "正印格": {
      yongShen: ["官杀"],
      xiShen: ["官杀", "印星"],
      jiShen: ["财星", "食伤"],
      notes: ["印星喜官杀生、比劫助，忌财星破印"]
    },
    "偏印格": {
      yongShen: ["财星"],
      xiShen: ["财星", "比劫"],
      jiShen: ["食神"],
      notes: ["枭神喜财星制、比劫化，忌食神相见"]
    },
    "食神格": {
      yongShen: ["财星"],
      xiShen: ["财星", "比劫"],
      jiShen: ["印星"],
      notes: ["食神喜财星泄秀、比劫助身，忌印星夺食"]
    },
    "伤官格": {
      yongShen: ["财星"],
      xiShen: ["财星", "印星"],
      jiShen: ["官杀"],
      notes: ["伤官喜财星泄秀、印星制伤，忌官杀见伤"]
    },
    "建禄格": { yongShen: [], xiShen: [], jiShen: [], notes: [] },
    "月刃格": { yongShen: [], xiShen: [], jiShen: [], notes: [] },
    "从强格": { yongShen: [], xiShen: [], jiShen: [], notes: [] },
    "从弱格": { yongShen: [], xiShen: [], jiShen: [], notes: [] },
    "化气格": { yongShen: [], xiShen: [], jiShen: [], notes: [] },
    "专旺格": { yongShen: [], xiShen: [], jiShen: [], notes: [] },
    "杂气格": { yongShen: [], xiShen: [], jiShen: [], notes: [] },
    "变格": { yongShen: [], xiShen: [], jiShen: [], notes: [] }
  }
  
  const result = baseResult[geJuType]
  
  return {
    type: geJuType,
    name: GE_JU_NAMES[geJuType],
    description: GE_JU_DESCRIPTIONS[geJuType],
    yongShen: result.yongShen,
    xiShen: result.xiShen,
    jiShen: result.jiShen,
    notes: result.notes
  }
}

// 子平真诠论格局 - 参考《子平真诠》
export const ZI_PING_ZHEN_QUAN: Record<GeJuType, string[]> = {
  "正官格": [
    "官星要纯，不宜混杂",
    "官星喜透干，得财生印护",
    "官星怕见伤官，谓之伤官见官",
    "官杀混杂，需取清"
  ],
  "偏官格": [
    "七杀要制，宜食神制杀",
    "七杀得制，化为权柄",
    "七杀无制，为凶神",
    "杀印相生，贵不可言"
  ],
  "正财格": [
    "财星要得位，不宜太旺",
    "财星喜食神生",
    "财星怕比劫夺",
    "财多身弱，富屋穷人"
  ],
  "偏财格": [
    "偏财宜露不宜藏",
    "偏财喜食伤生",
    "偏财逢比劫，破财之象",
    "偏财得地，富甲一方"
  ],
  "正印格": [
    "印星要清，不宜杂乱",
    "印星喜官杀生",
    "印星怕财星破",
    "印多身强，宜财星制印"
  ],
  "偏印格": [
    "枭神宜制，用财星制枭",
    "枭神夺食，为凶",
    "枭神得用，智慧过人",
    "枭神忌见食神"
  ],
  "食神格": [
    "食神要纯，不宜混杂",
    "食神喜财星泄秀",
    "食神怕印星夺食",
    "食神得地，福禄丰厚"
  ],
  "伤官格": [
    "伤官宜泄不宜制",
    "伤官喜财星化",
    "伤官怕官星见",
    "伤官得用，才华横溢"
  ],
  "建禄格": [
    "建禄身强，喜财官",
    "建禄忌比劫太多",
    "建禄得财官，富贵双全"
  ],
  "月刃格": [
    "月刃喜官杀制",
    "月刃忌比劫助",
    "月刃得制，贵气十足"
  ],
  "从强格": [
    "从强顺其势",
    "从强喜比劫印星",
    "从强忌官杀财星"
  ],
  "从弱格": [
    "从弱顺其势",
    "从弱喜官杀财星",
    "从弱忌比劫印星"
  ],
  "化气格": [
    "化气要纯",
    "化神要得地",
    "化气忌破格"
  ],
  "专旺格": [
    "专旺顺势",
    "专旺喜助",
    "专旺忌破"
  ],
  "杂气格": [
    "杂气要取清",
    "透干为贵",
    "要看司令"
  ],
  "变格": [
    "变格需灵活",
    "要看全局气势",
    "不可拘泥一格"
  ]
}

// 用神分析
export function analyzeYongShen(
  geJu: GeJuResult,
  dayGan: string,
  wangShuaiLevel: WangShuaiLevel
): { yongShen: string; xiShen: string[]; jiShen: string[]; explanation: string } {
  const dayWuxing = GAN_WUXING[dayGan]
  
  let yongShen = ""
  let xiShen: string[] = []
  let jiShen: string[] = []
  let explanation = ""
  
  // 根据格局和旺衰确定用神
  if (geJu.type === "从强格") {
    yongShen = dayWuxing
    xiShen = [dayWuxing, "印星"]
    jiShen = ["官杀", "财星"]
    explanation = "日主极旺，从强格，用神为日主同类及印星"
  } else if (geJu.type === "从弱格") {
    yongShen = "克泄耗日主之物"
    xiShen = ["官杀", "财星", "食伤"]
    jiShen = ["比劫", "印星"]
    explanation = "日主极弱，从弱格，用神为官杀、财星、食伤"
  } else if (geJu.type === "化气格") {
    yongShen = geJu.yongShen[0] || dayWuxing
    xiShen = geJu.xiShen
    jiShen = geJu.jiShen
    explanation = `化气格，化神为${yongShen}，喜化神得地`
  } else if (geJu.type === "专旺格") {
    yongShen = dayWuxing
    xiShen = [dayWuxing]
    jiShen = ["克制日主之物"]
    explanation = "五行专旺，用神为专旺之五行"
  } else {
    // 正格
    if (wangShuaiLevel === "偏弱" || wangShuaiLevel === "太弱") {
      yongShen = "印星"
      xiShen = ["印星", "比劫"]
      jiShen = ["官杀", "财星"]
      explanation = "日主偏弱，用神为印星生身"
    } else if (wangShuaiLevel === "偏旺" || wangShuaiLevel === "太旺") {
      yongShen = "官杀"
      xiShen = ["官杀", "食伤"]
      jiShen = ["印星", "比劫"]
      explanation = "日主偏旺，用神为官杀制身"
    } else {
      // 中和
      if (geJu.yongShen.length > 0) {
        yongShen = geJu.yongShen[0]
      } else {
        yongShen = "需结合全局分析"
      }
      xiShen = geJu.xiShen
      jiShen = geJu.jiShen
      explanation = "日主中和，用神需结合格局确定"
    }
  }
  
  return { yongShen, xiShen, jiShen, explanation }
}

// 简化版本的格局判定
export function determineGeJu(bazi: {
  yearGan: string; yearZhi: string;
  monthGan: string; monthZhi: string;
  dayGan: string; dayZhi: string;
  hourGan: string; hourZhi: string;
}) {
  const monthShiShen = getShiShen(bazi.dayGan, bazi.monthGan)
  let name = "正格"
  let type = "正格"
  let description = "需结合月令藏干透干情况综合判断"
  
  if (monthShiShen && monthShiShen !== "比肩" && monthShiShen !== "劫财") {
    if (monthShiShen === "正官") {
      name = "正官格"
      type = "正官格"
      description = "月令正官得用，为人正直，适合公职"
    } else if (monthShiShen === "七杀") {
      name = "偏官格"
      type = "偏官格"
      description = "月令七杀得用，性格果断，适合武职"
    } else if (monthShiShen === "正印") {
      name = "正印格"
      type = "正印格"
      description = "月令正印得用，仁慈善良，学识渊博"
    } else if (monthShiShen === "偏印") {
      name = "偏印格"
      type = "偏印格"
      description = "月令偏印得用，思维敏捷，具有独特见解"
    } else if (monthShiShen === "食神") {
      name = "食神格"
      type = "食神格"
      description = "月令食神得用，聪明才智，多才多艺"
    } else if (monthShiShen === "伤官") {
      name = "伤官格"
      type = "伤官格"
      description = "月令伤官得用，才华横溢，创造力强"
    } else if (monthShiShen === "正财") {
      name = "正财格"
      type = "正财格"
      description = "月令正财得用，勤俭务实，善于理财"
    } else if (monthShiShen === "偏财") {
      name = "偏财格"
      type = "偏财格"
      description = "月令偏财得用，慷慨大方，财运亨通"
    }
  }
  
  return {
    name,
    type,
    description,
    yongShen: "需结合旺衰分析",
    xiShen: "需结合格局分析",
    jiShen: "需结合格局分析"
  }
}