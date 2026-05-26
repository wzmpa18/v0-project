// 玄空飞星数据库

// 九星
export const JIU_XING = {
  1: { name: "一白贪狼", wuxing: "水", nature: "吉", desc: "主官运、桃花、智慧" },
  2: { name: "二黑巨门", wuxing: "土", nature: "凶", desc: "主疾病、孤寡、丧亡" },
  3: { name: "三碧禄存", wuxing: "木", nature: "凶", desc: "主是非、口舌、官讼" },
  4: { name: "四绿文曲", wuxing: "木", nature: "吉", desc: "主文昌、学业、桃花" },
  5: { name: "五黄廉贞", wuxing: "土", nature: "大凶", desc: "主灾祸、死亡、破败" },
  6: { name: "六白武曲", wuxing: "金", nature: "吉", desc: "主权贵、财运、升迁" },
  7: { name: "七赤破军", wuxing: "金", nature: "凶", desc: "主盗窃、口舌、破财" },
  8: { name: "八白左辅", wuxing: "土", nature: "大吉", desc: "主财运、置业、喜庆" },
  9: { name: "九紫右弼", wuxing: "火", nature: "吉", desc: "主喜庆、桃花、升迁" },
}

// 九宫飞星顺序（洛书）
export const LUO_SHU = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6]
]

// 九宫方位
export const JIU_GONG_FANG_WEI = {
  "西北": 0, "北": 1, "东北": 2,
  "西": 3, "中": 4, "东": 5,
  "西南": 6, "南": 7, "东南": 8
}

export const FANG_WEI_NAMES = ["西北", "北", "东北", "西", "中", "东", "西南", "南", "东南"]

// 三元九运
export const SAN_YUAN_JIU_YUN = {
  1: { years: "1864-1883", yuan: "上元", yun: "一运" },
  2: { years: "1884-1903", yuan: "上元", yun: "二运" },
  3: { years: "1904-1923", yuan: "上元", yun: "三运" },
  4: { years: "1924-1943", yuan: "中元", yun: "四运" },
  5: { years: "1944-1963", yuan: "中元", yun: "五运" },
  6: { years: "1964-1983", yuan: "中元", yun: "六运" },
  7: { years: "1984-2003", yuan: "下元", yun: "七运" },
  8: { years: "2004-2023", yuan: "下元", yun: "八运" },
  9: { years: "2024-2043", yuan: "下元", yun: "九运" },
}

// 山向对照
export const SHAN_XIANG = {
  "子山午向": { shan: "子", xiang: "午", degree: 0 },
  "癸山丁向": { shan: "癸", xiang: "丁", degree: 7.5 },
  "丑山未向": { shan: "丑", xiang: "未", degree: 22.5 },
  "艮山坤向": { shan: "艮", xiang: "坤", degree: 37.5 },
  "寅山申向": { shan: "寅", xiang: "申", degree: 52.5 },
  "甲山庚向": { shan: "甲", xiang: "庚", degree: 67.5 },
  "卯山酉向": { shan: "卯", xiang: "酉", degree: 82.5 },
  "乙山辛向": { shan: "乙", xiang: "辛", degree: 97.5 },
  "辰山戌向": { shan: "辰", xiang: "戌", degree: 112.5 },
  "巽山乾向": { shan: "巽", xiang: "乾", degree: 127.5 },
  "巳山亥向": { shan: "巳", xiang: "亥", degree: 142.5 },
  "丙山壬向": { shan: "丙", xiang: "壬", degree: 157.5 },
  "午山子向": { shan: "午", xiang: "子", degree: 172.5 },
  "丁山癸向": { shan: "丁", xiang: "癸", degree: 187.5 },
  "未山丑向": { shan: "未", xiang: "丑", degree: 202.5 },
  "坤山艮向": { shan: "坤", xiang: "艮", degree: 217.5 },
  "申山寅向": { shan: "申", xiang: "寅", degree: 232.5 },
  "庚山甲向": { shan: "庚", xiang: "甲", degree: 247.5 },
  "酉山卯向": { shan: "酉", xiang: "卯", degree: 262.5 },
  "辛山乙向": { shan: "辛", xiang: "乙", degree: 277.5 },
  "戌山辰向": { shan: "戌", xiang: "辰", degree: 292.5 },
  "乾山巽向": { shan: "乾", xiang: "巽", degree: 307.5 },
  "亥山巳向": { shan: "亥", xiang: "巳", degree: 322.5 },
  "壬山丙向": { shan: "壬", xiang: "丙", degree: 337.5 },
}

// 古籍断语
export const XUAN_KONG_DUANYU = {
  总论: {
    原文: "三元九运，气运流转。当运之星为旺，退运之星为衰，未来之星为生。",
    译文: "三元九运中，气运不断流转。当前运势的星为旺星，已过的为衰星，将来的为生星。",
    出处: "《沈氏玄空学》"
  },
  山星: {
    原文: "山管人丁水管财，山星旺则人丁兴，山星衰则人丁弱。",
    译文: "山主人丁，水主财运。山星旺盛则人丁兴旺，山星衰弱则人丁不旺。",
    出处: "《玄空本义》"
  },
  向星: {
    原文: "向星管财，向星当旺，财源广进；向星失令，财运不济。",
    译文: "向星主管财运，向星当旺时财源广进，向星失令时财运不佳。",
    出处: "《玄空本义》"
  },
  五黄: {
    原文: "五黄煞最凶，所到之处，主有大灾。宜静不宜动，犯之必有祸患。",
    译文: "五黄煞是最凶的煞气，所到的方位主大灾难。这个方位宜静不宜动，冲犯必有祸患。",
    出处: "《沈氏玄空学》"
  },
  二黑: {
    原文: "二黑病符星，主疾病灾厄，老人尤忌。宜化解，不可冲动。",
    译文: "二黑是病符星，主疾病和灾祸，老年人尤其要避开。应当化解，不可冲动此方位。",
    出处: "《玄空秘旨》"
  },
}

// 计算飞星盘
export function calcFeiXingPan(yunStar: number, isShun: boolean = true) {
  const pan: number[][] = [[0,0,0], [0,0,0], [0,0,0]]
  const order = isShun 
    ? [4, 3, 8, 9, 5, 1, 2, 7, 6] // 洛书顺飞顺序
    : [4, 5, 6, 3, 7, 9, 8, 1, 2] // 洛书逆飞顺序
  
  const startIndex = order.indexOf(yunStar)
  
  for (let i = 0; i < 9; i++) {
    const row = Math.floor(i / 3)
    const col = i % 3
    const starIndex = (startIndex + i) % 9
    pan[row][col] = order[starIndex]
  }
  
  return pan
}

// 获取当前运星
export function getCurrentYunXing(year: number): number {
  if (year >= 2024) return 9
  if (year >= 2004) return 8
  if (year >= 1984) return 7
  if (year >= 1964) return 6
  if (year >= 1944) return 5
  if (year >= 1924) return 4
  if (year >= 1904) return 3
  if (year >= 1884) return 2
  return 1
}
