// 中医方剂数据库 - 基于经典古籍

export interface FormulaIngredient {
  name: string;
  dosage: string;
  preparation?: string;
  effect?: string;
}

export interface Formula {
  id: string;
  name: string;
  pinyin?: string;
  alias?: string[];
  source: string;
  category: string;
  ingredients: FormulaIngredient[];
  method: string;
  functions: string[];
  indications: string[];
  analysis?: string;
  classicReference?: string;
  modifications?: Array<{
    condition: string;
    change: string;
  }>;
  contraindications?: string[];
}

export const CLASSIC_FORMULAS: Formula[] = [
  {
    id: "guizhi-tang",
    name: "桂枝汤",
    pinyin: "Gui Zhi Tang",
    alias: ["阳旦汤",
    source: "《伤寒论》",
    category: "辛温解表剂",
    ingredients: [
      { name: "桂枝", dosage: "三两（9g）", preparation: "去皮" },
      { name: "芍药", dosage: "三两（9g）" },
      { name: "甘草", dosage: "二两（6g）", preparation: "炙" },
      { name: "生姜", dosage: "三两（9g）", preparation: "切" },
      { name: "大枣", dosage: "十二枚（6枚）", preparation: "擘" }
    ],
    method: "上五味，㕮咀三味，以水七升，微火煮取三升，去滓，适寒温，服一升。服已须臾，啜热稀粥一升余，以助药力。温覆令一时许，遍身漐漐微似有汗者益佳，不可令如水流漓，病必不除。若一服汗出病差，停后服，不必尽剂；若不汗，更服依前法；又不汗，后服小促其间，半日许令三服尽。",
    functions: ["解肌发表", "调和营卫"],
    indications: [
      "外感风寒表虚证。头痛发热，汗出恶风，鼻鸣干呕，苔白不渴，脉浮缓或浮弱者"
    ],
    analysis: "桂枝辛温，解肌发表，为君药；芍药酸苦微寒，敛阴和营，为臣药；生姜辛温，助桂枝解肌，又能温胃止呕；大枣甘平，益气补中，为佐药；炙甘草调和诸药，为使药。",
    classicReference: "太阳中风，阳浮而阴弱，阳浮者热自发，阴弱者汗自出，啬啬恶寒，淅淅恶风，翕翕发热，鼻鸣干呕者，桂枝汤主之。"
  },
  {
    id: "mahuang-tang",
    name: "麻黄汤",
    pinyin: "Ma Huang Tang",
    source: "《伤寒论》",
    category: "辛温解表剂",
    ingredients: [
      { name: "麻黄", dosage: "三两（9g）", preparation: "去节" },
      { name: "桂枝", dosage: "二两（6g）", preparation: "去皮" },
      { name: "杏仁", dosage: "七十个（9g）", preparation: "去皮尖" },
      { name: "甘草", dosage: "一两（3g）", preparation: "炙" }
    ],
    method: "上四味，以水九升，先煮麻黄，减二升，去上沫，内诸药，煮取二升半，去滓，温服八合。覆取微似汗，不须啜粥，余如桂枝法将息。",
    functions: ["发汗解表", "宣肺平喘"],
    indications: [
      "外感风寒表实证。恶寒发热，头身疼痛，无汗而喘，舌苔薄白，脉浮紧"
    ],
    analysis: "麻黄辛温，发汗解表，宣肺平喘，为君药；桂枝解肌发表，温通经脉，为臣药；杏仁苦降肺气，助麻黄平喘，为佐药；炙甘草调和诸药，为使药。",
    classicReference: "太阳病，头痛发热，身疼腰痛，骨节疼痛，恶风无汗而喘者，麻黄汤主之。"
  },
  {
    id: "xiaochaihu-tang",
    name: "小柴胡汤",
    pinyin: "Xiao Chai Hu Tang",
    alias: ["三禁汤",
    source: "《伤寒论》",
    category: "和解少阳剂",
    ingredients: [
      { name: "柴胡", dosage: "半斤（24g）" },
      { name: "黄芩", dosage: "三两（9g）" },
      { name: "人参", dosage: "三两（9g）" },
      { name: "半夏", dosage: "半升（9g）", preparation: "洗" },
      { name: "甘草", dosage: "三两（9g）", preparation: "炙" },
      { name: "生姜", dosage: "三两（9g）", preparation: "切" },
      { name: "大枣", dosage: "十二枚（6枚）", preparation: "擘" }
    ],
    method: "上七味，以水一斗二升，煮取六升，去滓，再煎，取三升，温服一升，日三服。",
    functions: ["和解少阳", "和胃降逆", "扶正祛邪"],
    indications: [
      "伤寒少阳证。往来寒热，胸胁苦满，嘿嘿不欲饮食，心烦喜呕，口苦，咽干，目眩，舌苔薄白，脉弦者",
      "妇人伤寒，热入血室，经水适断，寒热发作有时",
      "疟疾、黄疸等病而见少阳证者"
    ],
    analysis: "柴胡苦平，透泄少阳之邪，为君药；黄芩苦寒，清泄少阳之热，为臣药；人参、甘草益气扶正，半夏、生姜和胃降逆，大枣益气和营，共为佐药；甘草兼调和诸药，为使药。",
    classicReference: "伤寒五六日，中风，往来寒热，胸胁苦满，嘿嘿不欲饮食，心烦喜呕，或胸中烦而不呕，或渴，或腹中痛，或胁下痞硬，或心下悸、小便不利，或不渴、身有微热，或咳者，小柴胡汤主之。",
    modifications: [
      { condition: "胸中烦而不呕", change: "去半夏、人参，加栝楼实一枚" },
      { condition: "渴", change: "去半夏，加人参合前成四两半、栝楼根四两" },
      { condition: "腹中痛", change: "去黄芩，加芍药三两" },
      { condition: "胁下痞硬", change: "去大枣，加牡蛎四两" },
      { condition: "心下悸、小便不利", change: "去黄芩，加茯苓四两" },
      { condition: "不渴、外有微热", change: "去人参，加桂枝三两，温覆微汗愈" },
      { condition: "咳", change: "去人参、大枣、生姜，加五味子半升、干姜二两" }
    ]
  },
  {
    id: "dachengqi-tang",
    name: "大承气汤",
    pinyin: "Da Cheng Qi Tang",
    source: "《伤寒论》",
    category: "寒下剂",
    ingredients: [
      { name: "大黄", dosage: "四两（12g）", preparation: "酒洗" },
      { name: "厚朴", dosage: "半斤（24g）", preparation: "炙，去皮" },
      { name: "枳实", dosage: "五枚（12g）", preparation: "炙" },
      { name: "芒硝", dosage: "三合（9g）" }
    ],
    method: "上四味，以水一斗，先煮二物，取五升，去滓，内大黄，更煮取二升，去滓，内芒硝，更上微火一两沸，分温再服。得下，余勿服。",
    functions: ["峻下热结"],
    indications: [
      "阳明腑实证。大便不通，频转矢气，脘腹痞满，腹痛拒按，按之硬，甚或潮热谵语，手足濈然汗出，舌苔黄燥起刺，或焦黑燥裂，脉沉实",
      "热结旁流证。下利清水，色纯青，其气臭秽，脐腹疼痛，按之坚硬有块，口舌干燥，脉滑实",
      "里热实证之热厥、痉病或发狂等"
    ],
    analysis: "大黄苦寒泻热，荡涤肠胃，为君药；芒硝咸寒，软坚润燥，为臣药；厚朴苦温下气，除满消胀；枳实苦辛破结，导滞消痞，共为佐使药。",
    classicReference: "阳明病，脉迟，虽汗出不恶寒者，其身必重，短气腹满而喘，有潮热者，此外欲解，可攻里也，手足濈然汗出者，此大便已硬也，大承气汤主之。",
    contraindications: ["老弱、虚证慎用", "孕妇禁用"]
  },
  {
    id: "sini-tang",
    name: "四逆汤",
    pinyin: "Si Ni Tang",
    source: "《伤寒论》",
    category: "回阳救逆剂",
    ingredients: [
      { name: "附子", dosage: "一枚（15g）", preparation: "生用，去皮，破八片" },
      { name: "干姜", dosage: "一两半（6g）" },
      { name: "甘草", dosage: "二两（6g）", preparation: "炙" }
    ],
    method: "上三味，以水三升，煮取一升二合，去滓，分温再服。强人可大附子一枚，干姜三两。",
    functions: ["回阳救逆"],
    indications: [
      "少阴病。四肢厥逆，恶寒蜷卧，呕吐不渴，腹痛下利，神衰欲寐，舌苔白滑，脉微细"
    ],
    analysis: "附子大辛大热，温壮元阳，破散阴寒，回阳救逆，为君药；干姜辛热，温中散寒，助附子回阳救逆，为臣药；炙甘草甘温，益气补中，调和诸药，为佐使药。",
    classicReference: "少阴病，脉沉者，急温之，宜四逆汤。"
  },
  {
    id: "baihu-tang",
    name: "白虎汤",
    pinyin: "Bai Hu Tang",
    source: "《伤寒论》",
    category: "清气分热剂",
    ingredients: [
      { name: "石膏", dosage: "一斤（50g）", preparation: "碎，绵裹" },
      { name: "知母", dosage: "六两（18g）" },
      { name: "甘草", dosage: "二两（6g）", preparation: "炙" },
      { name: "粳米", dosage: "六合（9g）" }
    ],
    method: "上四味，以水一斗，煮米熟汤成，去滓，温服一升，日三服。",
    functions: ["清热生津"],
    indications: [
      "气分热盛证。壮热面赤，烦渴引饮，汗出恶热，脉洪大有力"
    ],
    analysis: "石膏辛甘大寒，清解气分实热，为君药；知母苦寒质润，清热生津，为臣药；粳米、甘草益胃生津，为佐使药。",
    classicReference: "伤寒脉浮滑，此以表有热，里有寒，白虎汤主之。"
  },
  {
    id: "huoxiang-zhengqi-san",
    name: "藿香正气散",
    pinyin: "Huo Xiang Zheng Qi San",
    source: "《太平惠民和剂局方》",
    category: "化湿和胃剂",
    ingredients: [
      { name: "大腹皮", dosage: "一两（5g" },
      { name: "白芷", dosage: "一两（5g" },
      { name: "紫苏", dosage: "一两（5g" },
      { name: "茯苓", dosage: "一两（5g" },
      { name: "茯苓", dosage: "一两（5g" },
      { name: "紫苏", dosage: "一两（5g" },
      { name: "白芷", dosage: "一两（5g" },
      { name: "大腹皮", dosage: "一两（5g" },
      { name: "茯苓", dosage: "一两（5g" },
      { name: "白芷", dosage: "一两（5g" },
      { name: "紫苏", dosage: "一两（5g" },
      { name: "茯苓", dosage: "一两（5g" },
      { name: "陈皮", dosage: "二两（10g）" },
      { name: "厚朴", dosage: "二两（10g）" },
      { name: "苦桔梗", dosage: "二两（10g）" },
      { name: "藿香", dosage: "三两（15g）" },
      { name: "甘草", dosage: "二两（6g）" },
      { name: "甘草", dosage: "二两（10g）" },
      { name: "甘草", dosage: "二两（10g）" },
      { name: "甘草", dosage: "二两（10g）" },
      { name: "半夏曲", dosage: "二两（10g）" },
      { name: "厚朴", dosage: "二两（10g）" },
      { name: "苦桔梗", dosage: "二两（10g）" },
      { name: "藿香", dosage: "三两（15g）" },
      { name: "紫苏叶", dosage: "二两（10g）" },
      { name: "白芷", dosage: "二两（10g）" },
      { name: "茯苓", dosage: "二两（10g）" },
      { name: "大腹皮", dosage: "一两（5g）" },
      { name: "苦桔梗", dosage: "二两（10g）" },
      { name: "厚朴", dosage: "二两（10g）" },
      { name: "半夏曲", dosage: "二两（10g）" },
      { name: "甘草", dosage: "二两（10g）" },
      { name: "生姜", dosage: "三两（9g）" },
      { name: "大枣", dosage: "三枚（5枚）" }
    ],
    method: "上为细末，每服二钱，水一盏，姜三片，枣一枚，同煎至七分，热服。如欲出汗，衣被盖，再煎并服。",
    functions: ["解表化湿", "理气和中"],
    indications: [
      "外感风寒，内伤湿滞证。霍乱吐泻，发热恶寒，头痛，胸膈满闷，脘腹疼痛，舌苔白腻"
    ],
    analysis: "藿香辛温，外散风寒，内化湿滞，为君药；紫苏、白芷助藿香外散风寒，兼芳化湿浊；半夏曲、厚朴、陈皮理气化湿，和胃止呕，共为臣药；茯苓、大腹皮、桔梗化湿利水，桔梗宣肺利膈，共为佐药；甘草、生姜、大枣调和营卫，为使药。",
    classicReference: "《太平惠民和剂局方》卷二：治伤寒头疼，憎寒壮热，上喘咳嗽，五劳七伤，八般风痰，五般膈气，心腹冷痛，反胃呕恶，气泻霍乱，脏腑虚鸣，山岚瘴气，及妇人产前产后，血气刺痛，小儿疳伤。"
  },
  {
    id: "sijunzi-tang",
    name: "四君子汤",
    pinyin: "Si Jun Zi Tang",
    source: "《太平惠民和剂局方》",
    category: "补气剂",
    ingredients: [
      { name: "人参", dosage: "一两（10g）", preparation: "去芦" },
      { name: "白术", dosage: "一两（10g）" },
      { name: "茯苓", dosage: "一两（10g）" },
      { name: "甘草", dosage: "半两（6g）", preparation: "炙" }
    ],
    method: "上为细末。每服二钱，水一盏，煎至七分，通口服，不拘时，入盐少许，白汤点亦得。",
    functions: ["益气健脾"],
    indications: [
      "脾胃气虚证。面色萎黄，语声低微，气短乏力，食少便溏，舌淡苔白，脉虚缓"
    ],
    analysis: "人参甘温益气，健脾养胃，为君药；白术苦温，健脾燥湿，加强益气助运之力，为臣药；茯苓甘淡，健脾渗湿，为佐药；炙甘草甘温，益气和中，调和诸药，为使药。",
    classicReference: "《太平惠民和剂局方》卷三：治荣卫气虚，脏腑怯弱，心腹胀满，全不思食，肠鸣泄泻，呕哕吐逆，大宜服之。"
  },
  {
    id: "shenling-baizhu-san",
    name: "参苓白术散",
    pinyin: "Shen Ling Bai Zhu San",
    source: "《太平惠民和剂局方》",
    category: "补气剂",
    ingredients: [
      { name: "莲子肉", dosage: "一斤（500g）", preparation: "去皮" },
      { name: "薏苡仁", dosage: "一斤（500g）" },
      { name: "缩砂仁", dosage: "一斤（500g）" },
      { name: "桔梗", dosage: "一斤（500g）", preparation: "炒令深黄色" },
      { name: "白扁豆", dosage: "一斤（750g）", preparation: "姜汁浸，去皮，微炒" },
      { name: "白茯苓", dosage: "二斤（1kg）" },
      { name: "人参", dosage: "二斤（1kg）" },
      { name: "甘草", dosage: "二斤（1kg）", preparation: "炒" },
      { name: "白术", dosage: "二斤（1kg）" },
      { name: "山药", dosage: "二斤（1kg）" }
    ],
    method: "上为细末。每服二钱，枣汤调下。小儿量岁数加减服之。",
    functions: ["健脾益气", "渗湿止泻"],
    indications: [
      "脾虚湿盛证。饮食不化，胸脘痞闷，肠鸣泄泻，四肢乏力，形体消瘦，面色萎黄，舌淡苔白腻，脉虚缓"
    ],
    analysis: "人参、白术、茯苓益气健脾渗湿，为君药；山药、莲子肉健脾益气，兼能止泻，为臣药；白扁豆、薏苡仁健脾渗湿，为佐药；桔梗宣肺利气，通调水道，载药上行；砂仁醒脾和胃，行气化湿；炙甘草健脾和中，调和诸药，为使药。",
    classicReference: "《太平惠民和剂局方》卷三：治脾胃虚弱，饮食不进，多困少力，中满痞噎，心忡气喘，呕吐泄泻，及伤寒咳噫。"
  },
  {
    id: "liuzhen-wan",
    name: "六神丸",
    pinyin: "Liu Shen Wan",
    source: "《中国药典》",
    category: "清热解毒剂",
    ingredients: [
      { name: "牛黄", dosage: "4.5g" },
      { name: "麝香", dosage: "3g" },
      { name: "冰片", dosage: "3g" },
      { name: "珍珠", dosage: "4.5g" },
      { name: "蟾酥", dosage: "3g" },
      { name: "雄黄", dosage: "3g" }
    ],
    method: "以上六味，各研细末，水飞或粉碎成极细粉，过筛，混匀。用酒化蟾酥泛丸，阴干，即得。每1000粒重3.125g。",
    functions: ["清热解毒", "消肿止痛"],
    indications: [
      "喉风喉痹，乳蛾，痈疽疮疖，无名肿毒"
    ],
    analysis: "牛黄清热解毒，化痰散结；麝香、冰片开窍醒神，活血散结，止痛；珍珠、雄黄清热解毒，化痰散结；蟾酥解毒消肿，止痛。",
    contraindications: ["孕妇禁用", "不宜过量久服"]
  },
  {
    id: "suhexiang-wan",
    name: "苏合香丸",
    pinyin: "Su He Xiang Wan",
    source: "《外台秘要》引《广济方》",
    category: "温开剂",
    ingredients: [
      { name: "苏合香", dosage: "30g" },
      { name: "麝香", dosage: "30g" },
      { name: "冰片", dosage: "30g" },
      { name: "安息香", dosage: "30g" },
      { name: "青木香", dosage: "30g" },
      { name: "香附", dosage: "30g" },
      { name: "白檀香", dosage: "30g" },
      { name: "丁香", dosage: "30g" },
      { name: "沉香", dosage: "30g" },
      { name: "朱砂", dosage: "30g" },
      { name: "乳香", dosage: "30g", preparation: "制" },
      { name: "荜茇", dosage: "30g" },
      { name: "白术", dosage: "30g" },
      { name: "诃子", dosage: "30g", preparation: "煨" },
      { name: "朱砂", dosage: "30g" },
      { name: "犀角", dosage: "30g" },
      { name: "朱砂", dosage: "30g" },
      { name: "麝香", dosage: "30g" },
      { name: "朱砂", dosage: "30g" }
    ],
    method: "以上二十五味，除苏合香、麝香、冰片、水牛角浓缩粉外，朱砂水飞或粉碎成极细粉；其余安息香等二十一味粉碎成细粉；将水牛角浓缩粉研细，与上述粉末配研，过筛，混匀。每100g粉末加炼蜜100～130g制成大蜜丸，即得。",
    functions: ["芳香开窍", "行气止痛"],
    indications: [
      "寒闭证。突然昏倒，牙关紧闭，不省人事，苔白，脉迟",
      "心腹猝痛，甚则昏厥"
    ],
    analysis: "苏合香、麝香、冰片、安息香芳香开窍，为君药；木香、香附、檀香、丁香、沉香、乳香行气解郁，散寒止痛，共为臣药；荜茇温中散寒；白术燥湿健脾；诃子温涩敛气；朱砂重镇安神，共为佐药。",
    contraindications: ["孕妇禁用", "热闭神昏忌用"]
  }
];
