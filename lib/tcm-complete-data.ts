// 中医综合资源数据库

export interface Herb {
  id: string;
  name: string;
  pinyin: string;
  alias: string[];
  nature: string;
  meridians: string[];
  functions: string[];
  indications: string[];
  dosage: string;
  cautions: string[];
  source: string;
  category: string;
}

export const HERBS: Herb[] = [
  {
    id: "renshen",
    name: "人参",
    pinyin: "rén shēn",
    alias: ["棒锤", "山参", "园参"],
    nature: "甘、微苦，微温",
    meridians: ["脾", "肺", "心", "肾"],
    functions: ["大补元气", "复脉固脱", "补脾益肺", "生津养血", "安神益智"],
    indications: ["体虚欲脱", "肢冷脉微", "脾虚食少", "肺虚喘咳", "津伤口渴", "内热消渴", "气血亏虚", "久病虚羸", "惊悸失眠", "阳痿宫冷"],
    dosage: "3-9g，宜文火另煎",
    cautions: ["实证、热证忌服", "不宜与藜芦同用"],
    source: "《神农本草经》",
    category: "补气药"
  },
  {
    id: "huangqi",
    name: "黄芪",
    pinyin: "huáng qí",
    alias: ["绵芪", "黄耆"],
    nature: "甘，微温",
    meridians: ["脾", "肺"],
    functions: ["补气升阳", "固表止汗", "利水消肿", "生津养血", "行滞通痹", "托毒排脓", "敛疮生肌"],
    indications: ["气虚乏力", "食少便溏", "中气下陷", "久泻脱肛", "便血崩漏", "表虚自汗", "气虚水肿", "血虚萎黄", "半身不遂", "痹痛麻木", "痈疽难溃", "久溃不敛"],
    dosage: "9-30g",
    cautions: ["表实邪盛、气滞湿阻、食积内停、阴虚阳亢、痈疽初起或溃后热毒尚盛者忌服"],
    source: "《神农本草经》",
    category: "补气药"
  },
  {
    id: "gancao",
    name: "甘草",
    pinyin: "gān cǎo",
    alias: ["国老", "甜草根", "蜜甘"],
    nature: "甘，平",
    meridians: ["心", "肺", "脾", "胃"],
    functions: ["补脾益气", "清热解毒", "祛痰止咳", "缓急止痛", "调和诸药"],
    indications: ["脾胃虚弱", "倦怠乏力", "心悸气短", "咳嗽痰多", "脘腹四肢挛急疼痛", "痈肿疮毒", "缓解药物毒性烈性"],
    dosage: "2-10g",
    cautions: ["湿盛胀满及水肿者慎用", "反大戟、芫花、甘遂、海藻"],
    source: "《神农本草经》",
    category: "补气药"
  },
  {
    id: "danggui",
    name: "当归",
    pinyin: "dāng guī",
    alias: ["秦归", "云归", "西当归"],
    nature: "甘、辛，温",
    meridians: ["肝", "心", "脾"],
    functions: ["补血活血", "调经止痛", "润肠通便"],
    indications: ["血虚萎黄", "眩晕心悸", "月经不调", "经闭痛经", "虚寒腹痛", "风湿痹痛", "跌扑损伤", "痈疽疮疡", "肠燥便秘"],
    dosage: "6-12g",
    cautions: ["湿盛中满、大便泄泻者慎服"],
    source: "《神农本草经》",
    category: "补血药"
  },
  {
    id: "shudihuang",
    name: "熟地黄",
    pinyin: "shú dì huáng",
    alias: ["熟地", "大熟地"],
    nature: "甘，微温",
    meridians: ["肝", "肾"],
    functions: ["补血养阴", "填精益髓"],
    indications: ["血虚萎黄", "眩晕心悸", "月经不调", "崩漏", "肝肾阴虚", "腰膝酸软", "骨蒸潮热", "盗汗遗精", "内热消渴", "须发早白"],
    dosage: "9-15g",
    cautions: ["脾虚食少、腹满便溏者慎服"],
    source: "《本草纲目》",
    category: "补血药"
  },
  {
    id: "mahuang",
    name: "麻黄",
    pinyin: "má huáng",
    alias: ["龙沙", "卑相"],
    nature: "辛、微苦，温",
    meridians: ["肺", "膀胱"],
    functions: ["发汗解表", "宣肺平喘", "利水消肿"],
    indications: ["风寒感冒", "胸闷喘咳", "风水浮肿", "风湿痹痛"],
    dosage: "2-10g",
    cautions: ["体虚自汗、盗汗及虚喘者忌用"],
    source: "《神农本草经》",
    category: "辛温解表药"
  },
  {
    id: "guizhi",
    name: "桂枝",
    pinyin: "guì zhī",
    alias: ["柳桂"],
    nature: "辛、甘，温",
    meridians: ["心", "肺", "膀胱"],
    functions: ["发汗解肌", "温通经脉", "助阳化气", "平冲降逆"],
    indications: ["风寒感冒", "脘腹冷痛", "血寒经闭", "关节痹痛", "痰饮", "水肿", "心悸"],
    dosage: "3-10g",
    cautions: ["温热病忌用", "血热妄行忌用"],
    source: "《神农本草经》",
    category: "辛温解表药"
  },
  {
    id: "fuzhi",
    name: "附子",
    pinyin: "fù zǐ",
    alias: ["乌头", "附片"],
    nature: "辛、甘，大热，有毒",
    meridians: ["心", "肾", "脾"],
    functions: ["回阳救逆", "补火助阳", "散寒止痛"],
    indications: ["亡阳虚脱", "肢冷脉微", "阳痿宫冷", "心腹冷痛", "虚寒吐泻", "阴寒水肿", "阳虚外感", "寒湿痹痛"],
    dosage: "3-15g，先煎久煎",
    cautions: ["阴虚阳亢者忌用", "孕妇禁用", "不宜与半夏、瓜蒌、贝母、白蔹、白及同用"],
    source: "《神农本草经》",
    category: "温里药"
  },
  {
    id: "ganjiang",
    name: "干姜",
    pinyin: "gān jiāng",
    nature: "辛，热",
    meridians: ["脾", "胃", "肾", "心", "肺"],
    functions: ["温中散寒", "回阳通脉", "温肺化饮"],
    indications: ["脘腹冷痛", "呕吐泄泻", "亡阳厥逆", "寒饮喘咳"],
    dosage: "3-10g",
    cautions: ["阴虚内热者忌用"],
    source: "《神农本草经》",
    category: "温里药"
  }
];

export interface FormulaSimple {
  id: string;
  name: string;
  source: string;
  category: string;
  ingredients: { name: string; dosage: string }[];
  functions: string[];
  indications: string[];
}

export const FORMULAS: FormulaSimple[] = [
  {
    id: "guizhi-tang",
    name: "桂枝汤",
    source: "《伤寒论》",
    category: "辛温解表剂",
    ingredients: [
      { name: "桂枝", dosage: "9g" },
      { name: "芍药", dosage: "9g" },
      { name: "甘草", dosage: "6g" },
      { name: "生姜", dosage: "9g" },
      { name: "大枣", dosage: "6枚" }
    ],
    functions: ["解肌发表", "调和营卫"],
    indications: ["外感风寒表虚证。头痛发热，汗出恶风，鼻鸣干呕，苔白不渴，脉浮缓"]
  },
  {
    id: "mahuang-tang",
    name: "麻黄汤",
    source: "《伤寒论》",
    category: "辛温解表剂",
    ingredients: [
      { name: "麻黄", dosage: "9g" },
      { name: "桂枝", dosage: "6g" },
      { name: "杏仁", dosage: "9g" },
      { name: "甘草", dosage: "3g" }
    ],
    functions: ["发汗解表", "宣肺平喘"],
    indications: ["外感风寒表实证。恶寒发热，头身疼痛，无汗而喘，舌苔薄白，脉浮紧"]
  },
  {
    id: "sijunzi-tang",
    name: "四君子汤",
    source: "《太平惠民和剂局方》",
    category: "补气剂",
    ingredients: [
      { name: "人参", dosage: "10g" },
      { name: "白术", dosage: "10g" },
      { name: "茯苓", dosage: "10g" },
      { name: "甘草", dosage: "6g" }
    ],
    functions: ["益气健脾"],
    indications: ["脾胃气虚证。面色萎黄，语声低微，气短乏力，食少便溏，舌淡苔白，脉虚缓"]
  },
  {
    id: "sini-tang",
    name: "四逆汤",
    source: "《伤寒论》",
    category: "回阳救逆剂",
    ingredients: [
      { name: "附子", dosage: "15g" },
      { name: "干姜", dosage: "6g" },
      { name: "甘草", dosage: "6g" }
    ],
    functions: ["回阳救逆"],
    indications: ["少阴病。四肢厥逆，恶寒蜷卧，呕吐不渴，腹痛下利，神衰欲寐，舌苔白滑，脉微细"]
  }
];

export interface AcupointSimple {
  id: string;
  name: string;
  pinyin: string;
  meridian: string;
  location: string;
  functions: string[];
  indications: string[];
}

export const ACUPOINTS: AcupointSimple[] = [
  {
    id: "hegu",
    name: "合谷",
    pinyin: "hé gǔ",
    meridian: "手阳明大肠经",
    location: "在手背，第1、2掌骨间，当第2掌骨桡侧的中点处",
    functions: ["镇静止痛", "通经活络", "清热解表"],
    indications: ["头痛", "目赤肿痛", "鼻衄", "齿痛", "牙关紧闭", "口眼㖞斜", "耳聋", "痄腮", "咽喉肿痛", "腹痛", "便秘"]
  },
  {
    id: "zusanli",
    name: "足三里",
    pinyin: "zú sān lǐ",
    meridian: "足阳明胃经",
    location: "在小腿前外侧，当犊鼻下3寸，距胫骨前缘一横指（中指）",
    functions: ["健脾和胃", "扶正培元", "通经活络", "调理气血"],
    indications: ["胃痛", "呕吐", "腹胀", "泄泻", "便秘", "痢疾", "乳痈", "肠痈", "下肢痿痹", "虚劳羸瘦"]
  },
  {
    id: "sanyinjiao",
    name: "三阴交",
    pinyin: "sān yīn jiāo",
    meridian: "足太阴脾经",
    location: "在小腿内侧，当足内踝尖上3寸，胫骨内侧缘后方",
    functions: ["健脾和胃", "调补肝肾", "滋阴降火", "引火下行"],
    indications: ["肠鸣，腹胀，泄泻，脾胃虚弱", "月经不调，崩漏，带下，阴挺，经闭，不孕，难产", "遗精，阳痿，遗尿，疝气", "失眠，多梦，心悸，怔忡", "下肢痿痹，脚气"]
  },
  {
    id: "neiguan",
    name: "内关",
    pinyin: "nèi guān",
    meridian: "手厥阴心包经",
    location: "在前臂掌侧，当曲泽与大陵的连线上，腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间",
    functions: ["宁心安神", "和胃降逆", "宽胸理气", "镇静止痛"],
    indications: ["心痛，心悸，怔忡，胸痛", "胃痛，呕吐，呃逆", "失眠，健忘，头痛，癫狂痫证", "中风，偏瘫，肘臂挛痛"]
  }
];

export interface Constitution {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  susceptibility: string[];
  diet: string[];
  lifestyle: string[];
  herbs: string[];
  acupoints: string[];
}

export const CONSTITUTIONS: Constitution[] = [
  {
    id: "pinghe",
    name: "平和质",
    description: "阴阳气血调和，以体态适中、面色红润、精力充沛等为主要特征",
    characteristics: ["体形匀称健壮", "面色润泽", "头发稠密有光泽", "目光有神", "唇色红润", "不易疲劳", "精力充沛", "耐受寒热", "睡眠良好", "胃纳佳", "二便正常", "舌色淡红", "苔薄白", "脉和有神"],
    susceptibility: ["较少患病"],
    diet: ["饮食有节", "不偏食", "不嗜食"],
    lifestyle: ["起居有常", "劳逸结合", "坚持运动"],
    herbs: [],
    acupoints: ["足三里", "关元"]
  },
  {
    id: "qixu",
    name: "气虚质",
    description: "元气不足，以疲乏、气短、自汗等气虚表现为主要特征",
    characteristics: ["肌肉松软不实", "语声低弱", "气短懒言", "精神不振", "易疲劳", "易出汗", "舌淡红", "舌边有齿痕", "脉弱"],
    susceptibility: ["易患感冒", "内脏下垂等"],
    diet: ["宜食益气健脾之品", "如山药、黄芪、党参", "忌生冷油腻"],
    lifestyle: ["避免劳累", "避风寒", "适当运动如八段锦"],
    herbs: ["黄芪", "党参", "白术", "茯苓", "甘草"],
    acupoints: ["足三里", "气海", "关元", "脾俞"]
  },
  {
    id: "yangxu",
    name: "阳虚质",
    description: "阳气不足，以畏寒怕冷、手足不温等虚寒表现为主要特征",
    characteristics: ["肌肉松软不实", "平素畏寒", "手足不温", "喜热饮食", "精神不振", "舌淡胖嫩", "脉沉迟"],
    susceptibility: ["易患痰饮", "肿胀", "泄泻等"],
    diet: ["宜食温阳之品", "如羊肉、韭菜、生姜", "忌生冷寒凉"],
    lifestyle: ["避寒就温", "多晒太阳", "运动避风"],
    herbs: ["附子", "肉桂", "干姜", "杜仲", "巴戟天"],
    acupoints: ["命门", "肾俞", "关元", "气海"]
  },
  {
    id: "yinxu",
    name: "阴虚质",
    description: "阴液亏少，以口燥咽干、手足心热等虚热表现为主要特征",
    characteristics: ["体形偏瘦", "手足心热", "口燥咽干", "鼻微干", "喜冷饮", "大便干燥", "舌红少津", "脉细数"],
    susceptibility: ["易患虚劳", "失精", "不寐等"],
    diet: ["宜食滋阴之品", "如银耳、百合、枸杞", "忌辛辣燥热"],
    lifestyle: ["避免熬夜", "避暑热燥", "节制房事"],
    herbs: ["生地", "麦冬", "沙参", "玉竹", "枸杞子"],
    acupoints: ["三阴交", "太溪", "照海", "肾俞"]
  },
  {
    id: "tanshi",
    name: "痰湿质",
    description: "痰湿凝聚，以形体肥胖、腹部肥满、口黏苔腻等痰湿表现为主要特征",
    characteristics: ["体形肥胖", "腹部肥满松软", "面部皮肤油脂较多", "多汗且黏", "胸闷", "痰多", "口黏腻或甜", "喜食肥甘甜黏", "苔腻", "脉滑"],
    susceptibility: ["易患消渴", "中风", "胸痹等"],
    diet: ["宜食健脾化湿之品", "如薏苡仁、赤小豆", "忌肥甘厚味"],
    lifestyle: ["加强运动", "避免久坐", "居处干燥"],
    herbs: ["茯苓", "薏苡仁", "白术", "陈皮", "半夏"],
    acupoints: ["丰隆", "足三里", "中脘", "阴陵泉"]
  }
];
