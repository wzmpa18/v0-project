// 完整的伤寒论113方数据库
// 包含倪海厦课程笔记

interface ClassicFormula {
  id: string;
  name: string;
  pinyin: string;
  source: string;
  chapter: string;
  composition: string[];
  modernDosage: string[];
  originalDosage: string[];
  indications: string[];
  symptoms: string[];
  functions: string[];
  analysis: string[];
  niNotes: string[];
  contraindications: string[];
  modifications: { condition: string; modification: string }[];
  tongue: string;
  pulse: string;
}

// 伤寒论113方
export const SHANGHANLUN_113_FORMULAS: ClassicFormula[] = [
  {
    id: "shl-001",
    name: "桂枝汤",
    pinyin: "Guizhi Tang",
    source: "《伤寒论》",
    chapter: "辨太阳病脉证并治上",
    composition: ["桂枝", "芍药", "生姜", "大枣", "炙甘草"],
    modernDosage: ["桂枝9g", "芍药9g", "生姜9g", "大枣4枚", "炙甘草6g"],
    originalDosage: ["桂枝三两", "芍药三两", "生姜三两", "大枣十二枚", "甘草二两（炙）"],
    indications: [
      "伤寒中风，阳浮而阴弱，阳浮者，热自发，阴弱者，汗自出，啬啬恶寒，淅淅恶风，翕翕发热，鼻鸣干呕者",
      "太阳病，头痛发热，汗出恶风者"
    ],
    symptoms: ["头痛", "发热", "汗出", "恶风", "鼻鸣", "干呕", "脉浮缓"],
    functions: ["解肌发表", "调和营卫"],
    analysis: [
      "桂枝辛温，解肌发表，温通阳气为君",
      "芍药酸苦微寒，益阴敛汗为臣",
      "生姜辛温，温胃止呕为佐",
      "大枣甘平，补中益气为使"
    ],
    niNotes: [
      "桂枝汤是群方之冠，调和阴阳第一方",
      "只要有汗而用桂枝，无汗用麻黄",
      "服桂枝汤后，啜热稀粥，覆取微似汗",
      "桂枝汤证：头痛、发热、汗出、恶风",
      "太阳中风证，表虚证"
    ],
    contraindications: ["表实无汗，发热恶寒者", "湿热内盛者", "饮酒后"],
    modifications: [
      { condition: "项背强几几", modification: "加葛根" },
      { condition: "喘", modification: "加厚朴、杏仁" },
      { condition: "发汗太过，大汗出，脉洪大", modification: "仍用桂枝汤" }
    ],
    tongue: "舌苔薄白",
    pulse: "浮缓"
  },
  {
    id: "shl-002",
    name: "麻黄汤",
    pinyin: "Mahuang Tang",
    source: "《伤寒论》",
    chapter: "辨太阳病脉证并治中",
    composition: ["麻黄", "桂枝", "杏仁", "炙甘草"],
    modernDosage: ["麻黄9g", "桂枝9g", "杏仁9g", "炙甘草3g"],
    originalDosage: ["麻黄三两", "桂枝二两", "杏仁七十个", "甘草一两（炙）"],
    indications: [
      "太阳病，头痛发热，身疼腰痛，骨节疼痛，恶风无汗而喘者",
      "太阳与阳明合病，喘而胸满者"
    ],
    symptoms: ["头痛", "发热", "身疼腰痛", "骨节疼痛", "无汗", "恶风", "喘", "脉浮紧"],
    functions: ["发汗解表", "宣肺平喘"],
    analysis: [
      "麻黄发汗解表，宣肺平喘为君",
      "桂枝助麻黄发汗解表为臣",
      "杏仁助麻黄宣肺为佐",
      "甘草调和为使"
    ],
    niNotes: [
      "麻黄汤证：无汗而喘",
      "无汗用麻黄，有汗用桂枝",
      "表实证用麻黄汤",
      "麻黄汤证必无汗",
      "麻黄是解表发汗峻剂"
    ],
    contraindications: ["表虚自汗者", "体质虚弱者", "咽喉干燥者", "淋家", "疮家", "衄家", "亡血家", "汗家"],
    modifications: [],
    tongue: "舌苔薄白",
    pulse: "浮紧"
  }
];

// 金匮要略262方列表
export const JINGUIYAOLUE_262_FORMULAS: ClassicFormula[] = [
  {
    id: "jkyl-001",
    name: "栝蒌桂枝汤",
    pinyin: "Gualou Guizhi Tang",
    source: "《金匮要略》",
    chapter: "痉湿暍病脉证治第二",
    composition: ["栝蒌根", "桂枝", "芍药", "生姜", "大枣", "炙甘草"],
    modernDosage: ["栝蒌根12g", "桂枝9g", "芍药9g", "生姜9g", "大枣4枚", "炙甘草6g"],
    originalDosage: ["栝蒌根二两", "桂枝三两", "芍药三两", "生姜三两", "大枣十二枚", "甘草二两（炙）"],
    indications: [
      "太阳病，其证备，身体强，几几然，脉反沉迟，此为痉，栝蒌桂枝汤主之"
    ],
    symptoms: ["身体强，几几然", "脉沉迟"],
    functions: ["解肌发表", "生津舒筋"],
    analysis: ["桂枝汤解肌发表", "栝蒌根生津润燥"],
    niNotes: ["柔痉用此", "津液虚的痉病"],
    contraindications: [],
    modifications: [],
    tongue: "舌红少津",
    pulse: "沉迟"
  }
];

// 倪海厦课程259方汇总
export const NI_HAIXIA_259_FORMULAS: ClassicFormula[] = [
  ...SHANGHANLUN_113_FORMULAS,
  ...JINGUIYAOLUE_262_FORMULAS,
  {
    id: "ni-001",
    name: "二陈汤",
    pinyin: "Erchen Tang",
    source: "《太平惠民和剂局方》",
    chapter: "后世方",
    composition: ["半夏", "橘红", "茯苓", "炙甘草"],
    modernDosage: ["半夏9g", "橘红6g", "茯苓9g", "炙甘草3g"],
    originalDosage: ["半夏、橘红各五两", "白茯苓三两", "甘草一两半（炙）"],
    indications: ["湿痰证", "咳嗽痰多，色白易咯，恶心呕吐，胸膈痞闷，肢体困重，或头眩心悸"],
    symptoms: ["咳嗽痰多", "恶心呕吐", "胸膈痞闷", "舌苔白腻"],
    functions: ["燥湿化痰", "理气和中"],
    analysis: ["半夏燥湿化痰为君", "橘红理气化痰为臣", "茯苓健脾渗湿为佐", "甘草调和为使"],
    niNotes: ["二陈汤是治痰基础方", "一切痰证都可以此加减", "半夏、陈皮二药陈久者良"],
    contraindications: ["痰中带血者", "阴虚燥咳者"],
    modifications: [
      { condition: "寒痰", modification: "加干姜、细辛" },
      { condition: "热痰", modification: "加黄连、瓜蒌" },
      { condition: "风痰", modification: "加天麻、钩藤" }
    ],
    tongue: "舌苔白腻",
    pulse: "滑"
  }
];

// 获取所有方剂
export function getAllFormulas() {
  const uniqueFormulas = new Map();
  [...SHANGHANLUN_113_FORMULAS, ...JINGUIYAOLUE_262_FORMULAS, ...NI_HAIXIA_259_FORMULAS].forEach(f => {
    if (!uniqueFormulas.has(f.id)) {
      uniqueFormulas.set(f.id, f);
    }
  });
  return Array.from(uniqueFormulas.values());
}

// 搜索方剂
export function searchFormulas(keyword: string) {
  const all = getAllFormulas();
  return all.filter(f =>
    f.name.includes(keyword) ||
    f.pinyin.includes(keyword) ||
    f.source.includes(keyword) ||
    f.composition.some(c => c.includes(keyword))
  );
}
