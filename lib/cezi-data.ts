export const CEZI_WUXING: Record<string, string> = {
  "一": "土", "二": "火", "三": "火", "四": "火", "五": "土",
  "六": "水", "七": "金", "八": "木", "九": "金", "十": "土",
  "人": "金", "大": "火", "小": "金", "口": "木", "日": "火",
  "月": "水", "木": "木", "火": "火", "土": "土", "金": "金",
  "水": "水", "山": "土", "石": "土", "田": "土", "力": "火",
  "心": "火", "手": "金", "足": "火", "目": "水", "耳": "火",
  "口": "木", "舌": "火", "牙": "木", "鼻": "水", "眉": "水",
  "天": "火", "地": "土", "风": "木", "雷": "火", "电": "火",
  "雨": "水", "雪": "水", "云": "水", "雾": "水", "霜": "水",
  "江": "水", "河": "水", "湖": "水", "海": "水", "波": "水",
  "龙": "火", "凤": "火", "虎": "水", "马": "火", "牛": "土",
  "鸡": "金", "犬": "火", "猪": "水", "鼠": "水", "兔": "木",
  "蛇": "火", "羊": "土", "猴": "金", "鱼": "水", "鸟": "火",
}

export const CEZI_BU_SHU: Record<string, number> = {
  "一": 1, "二": 2, "三": 3, "四": 5, "五": 4, "六": 4, "七": 2, "八": 2, "九": 2, "十": 2,
  "人": 2, "大": 3, "小": 3, "口": 3, "日": 4, "月": 4, "木": 4, "火": 4, "土": 3, "金": 8,
  "水": 4, "山": 3, "石": 5, "田": 5, "力": 2, "心": 4, "手": 4, "足": 7, "目": 5, "耳": 6,
  "舌": 6, "牙": 4, "鼻": 14, "眉": 9, "天": 4, "地": 6, "风": 4, "雷": 13, "电": 5,
  "雨": 8, "雪": 11, "云": 4, "雾": 13, "霜": 17, "江": 6, "河": 8, "湖": 12, "海": 10,
  "波": 8, "龙": 16, "凤": 14, "虎": 8, "马": 3, "牛": 4, "鸡": 7, "犬": 4, "猪": 11,
  "鼠": 13, "兔": 8, "蛇": 11, "羊": 6, "猴": 12, "鱼": 8, "鸟": 5,
}

export const CEZI_JI_XIONG: Record<number, { luck: string; desc: string }> = {
  1: { luck: "吉", desc: "太极之数，万物开泰，生发无穷，利禄亨通" },
  2: { luck: "吉", desc: "两仪之数，混沌未开，进退保守，志望难达" },
  3: { luck: "吉", desc: "三才之数，天地人和，大事大业，繁荣昌隆" },
  4: { luck: "凶", desc: "四象之数，待于生发，万事慎重，不具营谋" },
  5: { luck: "吉", desc: "五行俱权，循环相生，圆通畅达，福祉无穷" },
  6: { luck: "吉", desc: "六爻之数，发展变化，天赋美德，吉祥安泰" },
  7: { luck: "吉", desc: "七政之数，精悍严谨，天赋之力，吉星照耀" },
  8: { luck: "吉", desc: "八卦之数，乾坎艮震，巽离坤兑，无穷无尽" },
  9: { luck: "凶", desc: "大成之数，蕴涵凶险，或成或败，难以把握" },
  10: { luck: "凶", desc: "终结之数，雪暗飘零，偶或有成，回顾茫然" },
  11: { luck: "吉", desc: "万物更新，调顺发达，恢弘泽世，繁荣富贵" },
  12: { luck: "凶", desc: "掘井无泉，意志薄弱，难酬志向，百事难成" },
  13: { luck: "吉", desc: "智略超群，博学多才，持之以恒，必成大业" },
  14: { luck: "凶", desc: "破兆，家庭缘薄，孤独遭难，谋事不达" },
  15: { luck: "吉", desc: "福寿圆满，富贵荣誉，涵养雅量，德高望重" },
  16: { luck: "吉", desc: "厚重载德，安富尊荣，财官双美，功成名就" },
  17: { luck: "吉", desc: "刚强进取，突破万难，如能容忍，必获成功" },
  18: { luck: "吉", desc: "铁镜重磨，权威显达，博得名利，且养柔德" },
  19: { luck: "凶", desc: "风云蔽日，辛苦重来，虽有智谋，万事挫折" },
  20: { luck: "凶", desc: "非业破运，灾难重重，进退维谷，万事难成" },
  21: { luck: "吉", desc: "明月光照，体质刚健，独立权威，能为首领" },
  22: { luck: "凶", desc: "秋草逢霜，意志薄弱，百事不如意，徒劳无功" },
  23: { luck: "吉", desc: "壮丽壮观，权威旺盛，首领之运，女性不宜" },
  24: { luck: "吉", desc: "掘藏得金，家门余庆，金钱丰盈，白手成家" },
  25: { luck: "吉", desc: "资性英敏，才能奇特，克服傲慢，尚可成功" },
  26: { luck: "凶", desc: "变怪奇异，豪杰气概，义气侠情，不利女性" },
  27: { luck: "凶", desc: "增长多变，欲望无止，自我强烈，多受毁谤" },
  28: { luck: "凶", desc: "阔水浮萍，豪杰气概，四海漂泊，终世浮躁" },
  29: { luck: "吉", desc: "智谋优秀，财力归集，名闻海内，成就大业" },
  30: { luck: "凶", desc: "沉浮不定，凶吉难辨，若明若暗，大成大败" },
}

export const CEZI_STRUCTURE: Record<string, string> = {
  "独体": "独体为一，纯粹专一，做事执着，性格单纯",
  "左右": "左右结构，善于沟通，人际关系良好",
  "上下": "上下结构，稳重踏实，有上进心",
  "包围": "包围结构，心胸宽广，包容性强",
  "品字": "品字结构，善于合作，有领导才能",
}

export function getCharacterWuxing(char: string): string {
  return CEZI_WUXING[char] || "土"
}

export function getCharacterBuShu(char: string): number {
  return CEZI_BU_SHU[char] || char.length * 2
}

export function getCharacterStructure(char: string): { type: string; desc: string } {
  const len = char.length
  if (len === 1) {
    return { type: "独体", desc: CEZI_STRUCTURE["独体"] }
  } else if (len === 2) {
    return { type: "左右", desc: CEZI_STRUCTURE["左右"] }
  } else if (len === 3) {
    if (char[0] === char[1] && char[1] === char[2]) {
      return { type: "品字", desc: CEZI_STRUCTURE["品字"] }
    }
    return { type: "上下", desc: CEZI_STRUCTURE["上下"] }
  }
  return { type: "包围", desc: CEZI_STRUCTURE["包围"] }
}

export function calculateCeZi(char: string): any {
  const wuxing = getCharacterWuxing(char)
  const buShu = getCharacterBuShu(char)
  const structure = getCharacterStructure(char)
  
  const total = buShu % 30 || 30
  const jiXiong = CEZI_JI_XIONG[total] || { luck: "平", desc: "数理寻常，吉凶参半" }
  
  const suggestions: string[] = []
  
  if (jiXiong.luck === "吉") {
    suggestions.push("此字为吉，运势顺畅，宜积极进取")
    suggestions.push("把握时机，事业有望取得成功")
  } else if (jiXiong.luck === "凶") {
    suggestions.push("此字为凶，需谨慎行事，三思而后行")
    suggestions.push("宜静不宜动，守成稳健为上")
  } else {
    suggestions.push("此字吉凶参半，需审时度势")
    suggestions.push("保持中庸之道，可保平安")
  }
  
  return {
    character: char,
    wuxing,
    buShu,
    structure,
    jiXiong,
    suggestions,
  }
}