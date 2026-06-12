// 玄空飞星数据 - 基于《玄空风水》

// 九宫飞星
export const FEI_XING = [
  { name: "一白", number: 1, wuxing: "水", nature: "吉", desc: "贪狼星，主智慧、学业、桃花" },
  { name: "二黑", number: 2, wuxing: "土", nature: "凶", desc: "巨门星，主疾病、阻碍、灾厄" },
  { name: "三碧", number: 3, wuxing: "木", nature: "凶", desc: "禄存星，主争斗、是非、口舌" },
  { name: "四绿", number: 4, wuxing: "木", nature: "吉", desc: "文曲星，主学业、文采、贵人" },
  { name: "五黄", number: 5, wuxing: "土", nature: "凶", desc: "廉贞星，主灾厄、变化、意外" },
  { name: "六白", number: 6, wuxing: "金", nature: "吉", desc: "武曲星，主权力、财富、事业" },
  { name: "七赤", number: 7, wuxing: "金", nature: "凶", desc: "破军星，主口舌、艺术、破败" },
  { name: "八白", number: 8, wuxing: "土", nature: "吉", desc: "左辅星，主财富、稳定、贵人" },
  { name: "九紫", number: 9, wuxing: "火", nature: "吉", desc: "右弼星，主喜庆、文明、姻缘" },
]

// 二十四山
export const ER_SHI_SI_SHAN = [
  { name: "壬", direction: "北", degree: "337.5-352.5", wuxing: "水" },
  { name: "子", direction: "北", degree: "352.5-7.5", wuxing: "水" },
  { name: "癸", direction: "北", degree: "7.5-22.5", wuxing: "水" },
  { name: "丑", direction: "东北", degree: "22.5-37.5", wuxing: "土" },
  { name: "艮", direction: "东北", degree: "37.5-52.5", wuxing: "土" },
  { name: "寅", direction: "东北", degree: "52.5-67.5", wuxing: "木" },
  { name: "甲", direction: "东", degree: "67.5-82.5", wuxing: "木" },
  { name: "卯", direction: "东", degree: "82.5-97.5", wuxing: "木" },
  { name: "乙", direction: "东", degree: "97.5-112.5", wuxing: "木" },
  { name: "辰", direction: "东南", degree: "112.5-127.5", wuxing: "土" },
  { name: "巽", direction: "东南", degree: "127.5-142.5", wuxing: "木" },
  { name: "巳", direction: "东南", degree: "142.5-157.5", wuxing: "火" },
  { name: "丙", direction: "南", degree: "157.5-172.5", wuxing: "火" },
  { name: "午", direction: "南", degree: "172.5-187.5", wuxing: "火" },
  { name: "丁", direction: "南", degree: "187.5-202.5", wuxing: "火" },
  { name: "未", direction: "西南", degree: "202.5-217.5", wuxing: "土" },
  { name: "坤", direction: "西南", degree: "217.5-232.5", wuxing: "土" },
  { name: "申", direction: "西南", degree: "232.5-247.5", wuxing: "金" },
  { name: "庚", direction: "西", degree: "247.5-262.5", wuxing: "金" },
  { name: "酉", direction: "西", degree: "262.5-277.5", wuxing: "金" },
  { name: "辛", direction: "西", degree: "277.5-292.5", wuxing: "金" },
  { name: "戌", direction: "西北", degree: "292.5-307.5", wuxing: "土" },
  { name: "乾", direction: "西北", degree: "307.5-322.5", wuxing: "金" },
  { name: "亥", direction: "西北", degree: "322.5-337.5", wuxing: "水" },
]

// 计算飞星盘
export function calculateFeiXingPan(yun: number, direction: string): { [key: string]: number } {
  // 基于运数和坐向计算飞星位置
  const pan: { [key: string]: number } = {}
  
  // 简化算法：根据运数确定入中宫的星
  const centerStar = yun
  
  // 顺飞算法
  const flyOrder = [5, 6, 7, 8, 9, 1, 2, 3, 4] // 从中宫开始顺飞
  
  for (let i = 0; i < 9; i++) {
    const star = (centerStar + i - 1) % 9 + 1
    pan[(i + 1).toString()] = star
  }
  
  return pan
}

// 玄空格局
export const XUAN_KONG_GE_JU = {
  吉格: [
    { name: "旺山旺向", desc: "山星、向星当运，主丁财两旺", chuchu: "《玄空风水》" },
    { name: "双星会坐", desc: "山星、向星同到坐山，主旺丁不旺财", chuchu: "《玄空风水》" },
    { name: "双星会向", desc: "山星、向星同到向方，主旺财不旺丁", chuchu: "《玄空风水》" },
    { name: "父母三般卦", desc: "一二三、三四五等连珠卦，主大吉", chuchu: "《玄空秘旨》" },
    { name: "七星打劫", desc: "特殊格局，主大富大贵", chuchu: "《玄空风水》" },
  ],
  凶格: [
    { name: "上山下水", desc: "山星到向、向星到山，主丁财两败", chuchu: "《玄空风水》" },
    { name: "反吟伏吟", desc: "星盘与地盘相反或相同，主凶灾", chuchu: "《玄空风水》" },
    { name: "五黄入中", desc: "五黄星入中宫，主灾厄意外", chuchu: "《玄空秘旨》" },
    { name: "二五交加", desc: "二黑五黄同宫，主重病灾厄", chuchu: "《玄空风水》" },
    { name: "三七叠至", desc: "三碧七赤同宫，主口舌争斗", chuchu: "《玄空风水》" },
  ]
}

// 玄空简介
export const XUAN_KONG_INTRO = {
  title: "玄空风水",
  origin: "《玄空风水》《玄空秘旨》",
  description: "玄空风水是风水学的重要流派，以九宫飞星为核心，结合三元九运时间框架，通过分析星盘布局来判断风水吉凶。",
  features: [
    "以九宫飞星为核心",
    "结合三元九运",
    "注重时间变化",
    "分析星盘格局",
  ],
}