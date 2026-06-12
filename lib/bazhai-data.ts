// 八宅风水数据 - 基于《八宅明镜》

// 八宅方位
export const BA_ZHAI = [
  { name: "东四命", fangwei: ["东", "东南", "北", "南"], desc: "适合东四宅居住" },
  { name: "西四命", fangwei: ["西", "西北", "西南", "东北"], desc: "适合西四宅居住" },
]

// 八宅吉凶方位
export const BA_ZHAI_FANG_WEI = {
  东四宅: {
    东: { name: "震宅", ji: ["生气", "天医", "延年", "伏位"], xiong: ["绝命", "五鬼", "六煞", "祸害"] },
    东南: { name: "巽宅", ji: ["生气", "天医", "延年", "伏位"], xiong: ["绝命", "五鬼", "六煞", "祸害"] },
    北: { name: "坎宅", ji: ["生气", "天医", "延年", "伏位"], xiong: ["绝命", "五鬼", "六煞", "祸害"] },
    南: { name: "离宅", ji: ["生气", "天医", "延年", "伏位"], xiong: ["绝命", "五鬼", "六煞", "祸害"] },
  },
  西四宅: {
    西: { name: "兑宅", ji: ["生气", "天医", "延年", "伏位"], xiong: ["绝命", "五鬼", "六煞", "祸害"] },
    西北: { name: "乾宅", ji: ["生气", "天医", "延年", "伏位"], xiong: ["绝命", "五鬼", "六煞", "祸害"] },
    西南: { name: "坤宅", ji: ["生气", "天医", "延年", "伏位"], xiong: ["绝命", "五鬼", "六煞", "祸害"] },
    东北: { name: "艮宅", ji: ["生气", "天医", "延年", "伏位"], xiong: ["绝命", "五鬼", "六煞", "祸害"] },
  },
}

// 八星详解
export const BA_XING = [
  { name: "生气", nature: "吉", desc: "大吉之星，主财运、事业、健康" },
  { name: "天医", nature: "吉", desc: "次吉之星，主健康、贵人、学业" },
  { name: "延年", nature: "吉", desc: "吉星，主长寿、婚姻、和谐" },
  { name: "伏位", nature: "吉", desc: "小吉之星，主稳定、平安、安详" },
  { name: "绝命", nature: "凶", desc: "大凶之星，主灾厄、疾病、破财" },
  { name: "五鬼", nature: "凶", desc: "次凶之星，主火灾、官司、意外" },
  { name: "六煞", nature: "凶", desc: "凶星，主口舌、是非、破败" },
  { name: "祸害", nature: "凶", desc: "小凶之星，主疾病、阻碍、灾厄" },
]

// 计算命卦
export function calculateMingGua(year: number, gender: "male" | "female"): string {
  // 简化算法：根据出生年份和性别计算命卦
  const baseYear = year % 9
  
  if (gender === "male") {
    // 男命卦计算
    const guaNumber = (11 - baseYear) % 9 || 9
    return getGuaName(guaNumber)
  } else {
    // 女命卦计算
    const guaNumber = (baseYear + 4) % 9 || 9
    return getGuaName(guaNumber)
  }
}

function getGuaName(number: number): string {
  const guaNames: Record<number, string> = {
    1: "坎命（东四命）",
    2: "坤命（西四命）",
    3: "震命（东四命）",
    4: "巽命（东四命）",
    6: "乾命（西四命）",
    7: "兑命（西四命）",
    8: "艮命（西四命）",
    9: "离命（东四命）",
  }
  return guaNames[number] || "未知"
}

// 八宅简介
export const BA_ZHAI_INTRO = {
  title: "八宅风水",
  origin: "《八宅明镜》",
  description: "八宅风水是风水学的重要流派，以命卦为核心，将住宅分为东四宅和西四宅，通过匹配命卦与宅卦来判断风水吉凶。",
  features: [
    "以命卦为核心",
    "分为东四宅西四宅",
    "八星判断吉凶",
    "适合住宅风水",
  ],
}