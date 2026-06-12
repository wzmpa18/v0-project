// 手相学数据

// 三大主线
export const SAN_DA_ZHU_XIAN = [
  { name: "生命线", description: "主生命力、健康状况、寿命长短", characteristics: ["深长清晰", "无断裂", "色泽红润"] },
  { name: "智慧线", description: "主智慧、思维能力、学业成就", characteristics: ["深长有力", "无分叉", "走向清晰"] },
  { name: "感情线", description: "主感情生活、婚姻状况、人际关系", characteristics: ["深长清晰", "无杂纹", "末端不上扬"] },
]

// 辅助线纹
export const FU_ZHU_XIAN_WEN = [
  { name: "事业线", description: "主事业发展、职业成就、社会地位", position: "掌心中央" },
  { name: "财运线", description: "主财富积累、财运起伏、理财能力", position: "小指根部" },
  { name: "婚姻线", description: "主婚姻状况、感情经历、夫妻关系", position: "小指根部侧面" },
  { name: "健康线", description: "主身体健康、疾病预警、康复能力", position: "生命线内侧" },
  { name: "成功线", description: "主事业成功、名望地位、贵人相助", position: "无名指根部" },
]

// 手掌形状
export const SHOU_ZHANG_XING_ZHUANG = [
  { name: "方形掌", description: "性格踏实，做事稳重，适合务实工作", wuxing: "土" },
  { name: "圆形掌", description: "性格开朗，善于社交，财运较好", wuxing: "水" },
  { name: "长形掌", description: "性格聪慧，富有创意，适合艺术工作", wuxing: "木" },
  { name: "尖形掌", description: "性格敏感，直觉敏锐，适合学术研究", wuxing: "金" },
  { name: "混合掌", description: "性格多变，适应力强，多才多艺", wuxing: "火" },
]

// 手指特征
export const SHOU_ZHI_TE_ZHENG = [
  { name: "大拇指", meaning: "主意志、决断力、自我意识", goodSign: "粗壮有力", badSign: "过于短小" },
  { name: "食指", meaning: "主领导力、进取心、社交能力", goodSign: "长度适中", badSign: "过长或过短" },
  { name: "中指", meaning: "主自我意识、责任感、平衡能力", goodSign: "笔直端正", badSign: "弯曲歪斜" },
  { name: "无名指", meaning: "主艺术天赋、审美能力、创造力", goodSign: "修长秀美", badSign: "过于粗短" },
  { name: "小指", meaning: "主口才、沟通能力、商业头脑", goodSign: "长度适中", badSign: "过于短小" },
]

// 手相断语
export const SHOU_XIANG_DUAN_YU = {
  shengMingXian: {
    name: "生命线断语",
    content: "生命线深长清晰，身体健康，精力充沛；生命线短促模糊，体质较弱，需多加保养。生命线有断裂，主健康有波动；生命线有分支，主生活有变化。",
    origin: "《手相学大全》"
  },
  zhiHuiXian: {
    name: "智慧线断语",
    content: "智慧线深长有力，头脑聪明，思维敏捷；智慧线短促无力，反应较慢，学习能力较弱。智慧线有分叉，主思维活跃，兴趣广泛；智慧线平直，主性格务实，讲求实际。",
    origin: "《手相学大全》"
  },
  ganQingXian: {
    name: "感情线断语",
    content: "感情线深长清晰，感情丰富，婚姻美满；感情线短促模糊，感情淡薄，人际关系较差。感情线有岛纹，主感情有波折；感情线末端分叉，主感情不专一。",
    origin: "《手相学大全》"
  },
  shiYeXian: {
    name: "事业线断语",
    content: "事业线清晰笔直，事业顺利，成就卓著；事业线断断续续，事业起伏，多有变动。事业线起点低，主早年辛苦；事业线起点高，主少年得志。",
    origin: "《手相学大全》"
  },
}

// 手相综合分析
export function analyzeShouXiang(features: {
  shengMingXian?: string;
  zhiHuiXian?: string;
  ganQingXian?: string;
  shiYeXian?: string;
}) {
  const results: string[] = [];
  
  if (features.shengMingXian === "good") {
    results.push("生命线优良，生命力旺盛，身体健康，精力充沛。");
  } else if (features.shengMingXian === "bad") {
    results.push("生命线较弱，需注意身体健康，加强锻炼和保养。");
  }
  
  if (features.zhiHuiXian === "good") {
    results.push("智慧线优良，头脑聪明，思维敏捷，学习能力强。");
  } else if (features.zhiHuiXian === "bad") {
    results.push("智慧线较弱，需注重思维训练，培养专注力。");
  }
  
  if (features.ganQingXian === "good") {
    results.push("感情线优良，感情丰富，人际关系良好，婚姻美满。");
  } else if (features.ganQingXian === "bad") {
    results.push("感情线较弱，需注意人际关系，加强情感沟通。");
  }
  
  if (features.shiYeXian === "good") {
    results.push("事业线优良，事业发展顺利，有望取得良好成就。");
  } else if (features.shiYeXian === "bad") {
    results.push("事业线较弱，事业发展可能有起伏，需多加努力。");
  }
  
  return results.length > 0 ? results : ["请提供手相特征以便分析。"];
}