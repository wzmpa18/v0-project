// 面相学数据 - 基于《麻衣相法》《柳庄相法》

// 面相十二宫
export const MIAN_XIANG_SHI_ER_GONG = [
  { name: "命宫", position: "印堂", description: "主一生祸福、命运吉凶", reference: "《麻衣相法》卷一" },
  { name: "财帛宫", position: "鼻头", description: "主财富、财运、积蓄", reference: "《麻衣相法》卷一" },
  { name: "兄弟宫", position: "眉", description: "主兄弟关系、手足情深", reference: "《麻衣相法》卷一" },
  { name: "田宅宫", position: "眼", description: "主家庭、房产、不动产", reference: "《麻衣相法》卷一" },
  { name: "子女宫", position: "眼下", description: "主子女数量、子女运势", reference: "《麻衣相法》卷一" },
  { name: "奴仆宫", position: "地阁", description: "主下属、仆人、朋友", reference: "《麻衣相法》卷一" },
  { name: "妻妾宫", position: "鱼尾", description: "主婚姻、配偶、感情", reference: "《麻衣相法》卷一" },
  { name: "疾厄宫", position: "山根", description: "主健康、疾病、寿命", reference: "《麻衣相法》卷一" },
  { name: "迁移宫", position: "额角", description: "主外出、旅行、迁居", reference: "《麻衣相法》卷一" },
  { name: "官禄宫", position: "中正", description: "主官职、事业、地位", reference: "《麻衣相法》卷一" },
  { name: "福德宫", position: "天仓", description: "主福气、德行、享受", reference: "《麻衣相法》卷一" },
  { name: "父母宫", position: "日月角", description: "主父母健康、缘分", reference: "《麻衣相法》卷一" },
]

// 五官详解
export const WU_GUAN = [
  { name: "眼", description: "心灵之窗，主智慧、性格、健康", characteristics: ["黑白分明", "眼神清澈", "眼形端正"] },
  { name: "耳", description: "采听官，主智慧、寿命、财运", characteristics: ["轮廓分明", "垂珠朝口", "色泽红润"] },
  { name: "鼻", description: "审辨官，主财运、健康、地位", characteristics: ["鼻梁挺直", "鼻头圆润", "山根丰隆"] },
  { name: "口", description: "出纳官，主口才、食禄、福气", characteristics: ["唇红齿白", "嘴角上扬", "口形方正"] },
  { name: "眉", description: "保寿官，主寿命、兄弟、感情", characteristics: ["眉形清秀", "疏密适中", "眉尾上扬"] },
]

// 面部形状
export const MIAN_BU_XING_ZHUANG = [
  { name: "方形脸", description: "性格坚毅，办事果断，事业有成", wuxing: "土" },
  { name: "圆形脸", description: "性格温和，待人亲切，财运亨通", wuxing: "水" },
  { name: "长形脸", description: "性格沉稳，思虑周全，智慧过人", wuxing: "木" },
  { name: "瓜子脸", description: "性格细腻，情感丰富，才艺出众", wuxing: "金" },
  { name: "三角形脸", description: "性格机敏，思维敏捷，创造力强", wuxing: "火" },
]

// 气色判断
export const QI_SE = [
  { color: "青色", meaning: "主惊恐、忧虑、疾病", location: ["印堂", "山根"] },
  { color: "红色", meaning: "主喜庆、热情、烦躁", location: ["额头", "两颊"] },
  { color: "黄色", meaning: "主富贵、吉祥、健康", location: ["印堂", "鼻头"] },
  { color: "白色", meaning: "主悲伤、忧愁、失血", location: ["面部"] },
  { color: "黑色", meaning: "主凶险、疾病、灾难", location: ["山根", "眼下"] },
]

// 古籍断语
export const MIAN_XIANG_DUAN_YU = {
  mingGong: {
    name: "命宫断语",
    content: "印堂光明如镜，学问皆通；山根不断，福禄如山。印堂狭窄，一生多忧；山根低陷，命运坎坷。",
    origin: "《麻衣相法》"
  },
  caiBo: {
    name: "财帛断语",
    content: "鼻如悬胆，家财万贯；鼻头圆润，财运亨通。鼻孔朝天，漏财之相；鼻梁歪斜，财库不稳。",
    origin: "《柳庄相法》"
  },
  qiE: {
    name: "妻妾断语",
    content: "鱼尾丰满，婚姻美满；奸门光润，夫妻和睦。鱼尾纹多，感情波折；奸门低陷，婚姻不顺。",
    origin: "《麻衣相法》"
  },
  fuDe: {
    name: "福德断语",
    content: "天仓饱满，福泽深厚；地阁方圆，晚景荣华。天仓凹陷，福分浅薄；地阁尖削，晚年凄凉。",
    origin: "《柳庄相法》"
  },
}

// 面相综合分析
export function analyzeMianXiang(features: {
  mingGong?: string;
  caiBo?: string;
  xiongDi?: string;
  tianZhai?: string;
  ziNv?: string;
  nuPu?: string;
  qiQie?: string;
  jiE?: string;
  qianYi?: string;
  guanLu?: string;
  fuDe?: string;
  fuMu?: string;
}) {
  const results: string[] = [];
  
  if (features.mingGong === "good") {
    results.push("命宫饱满，一生运势平稳，福泽深厚。");
  } else if (features.mingGong === "bad") {
    results.push("命宫有缺陷，需注意人生起伏，多加修德。");
  }
  
  if (features.caiBo === "good") {
    results.push("财帛宫丰隆，财运亨通，善于理财。");
  } else if (features.caiBo === "bad") {
    results.push("财帛宫薄弱，需注意理财，避免浪费。");
  }
  
  if (features.qiQie === "good") {
    results.push("妻妾宫美满，婚姻幸福，家庭和睦。");
  } else if (features.qiQie === "bad") {
    results.push("妻妾宫需注意，感情方面宜多加经营。");
  }
  
  if (features.fuDe === "good") {
    results.push("福德宫饱满，晚年享福，子孙孝顺。");
  } else if (features.fuDe === "bad") {
    results.push("福德宫需积德修善，方能福寿绵长。");
  }
  
  return results.length > 0 ? results : ["请提供面部特征以便分析。"];
}