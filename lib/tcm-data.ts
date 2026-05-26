// 中医古籍与知识库数据
// 包含公共领域的古籍资料

// 中药数据库 - 基础结构
export interface Herb {
  name: string
  pinyin: string
  alias: string[]
  nature: string // 性味
  meridians: string[] // 归经
  functions: string[] // 功效
  indications: string[] // 主治
  dosage: string // 用量
  cautions: string[] // 注意事项
  source: string // 古籍出处
}

// 常用中药 - 来自《神农本草经》《本草纲目》等公共领域古籍
export const COMMON_HERBS: Herb[] = [
  {
    name: "人参",
    pinyin: "renshen",
    alias: ["棒锤", "山参", "园参"],
    nature: "甘、微苦，微温",
    meridians: ["脾", "肺", "心"],
    functions: ["大补元气", "复脉固脱", "补脾益肺", "生津养血", "安神益智"],
    indications: ["体虚欲脱", "肢冷脉微", "脾虚食少", "肺虚喘咳", "津伤口渴", "内热消渴", "气血亏虚", "久病虚羸", "惊悸失眠", "阳痿宫冷"],
    dosage: "3-9g，宜文火另煎",
    cautions: ["实证、热证忌服", "不宜与藜芦同用"],
    source: "《神农本草经》"
  },
  {
    name: "黄芪",
    pinyin: "huangqi",
    alias: ["绵芪", "黄耆"],
    nature: "甘，微温",
    meridians: ["脾", "肺"],
    functions: ["补气升阳", "固表止汗", "利水消肿", "生津养血", "行滞通痹", "托毒排脓", "敛疮生肌"],
    indications: ["气虚乏力", "食少便溏", "中气下陷", "久泻脱肛", "便血崩漏", "表虚自汗", "气虚水肿", "血虚萎黄", "半身不遂", "痹痛麻木", "痈疽难溃", "久溃不敛"],
    dosage: "9-30g",
    cautions: ["表实邪盛、气滞湿阻、食积内停、阴虚阳亢、痈疽初起或溃后热毒尚盛者忌服"],
    source: "《神农本草经》"
  },
  {
    name: "甘草",
    pinyin: "gancao",
    alias: ["国老", "甜草根", "蜜甘"],
    nature: "甘，平",
    meridians: ["心", "肺", "脾", "胃"],
    functions: ["补脾益气", "祛痰止咳", "缓急止痛", "清热解毒", "调和诸药"],
    indications: ["脾胃虚弱", "倦怠乏力", "心悸气短", "咳嗽痰多", "脘腹四肢挛急疼痛", "痈肿疮毒", "缓解药物毒性烈性"],
    dosage: "2-10g",
    cautions: ["湿盛胀满及水肿者慎用", "反大戟、芫花、甘遂、海藻"],
    source: "《神农本草经》"
  },
  {
    name: "当归",
    pinyin: "danggui",
    alias: ["秦归", "云归", "西当归"],
    nature: "甘、辛，温",
    meridians: ["肝", "心", "脾"],
    functions: ["补血活血", "调经止痛", "润肠通便"],
    indications: ["血虚萎黄", "眩晕心悸", "月经不调", "经闭痛经", "虚寒腹痛", "风湿痹痛", "跌扑损伤", "痈疽疮疡", "肠燥便秘"],
    dosage: "6-12g",
    cautions: ["湿盛中满、大便泄泻者慎服"],
    source: "《神农本草经》"
  },
  {
    name: "白术",
    pinyin: "baizhu",
    alias: ["于术", "冬术"],
    nature: "苦、甘，温",
    meridians: ["脾", "胃"],
    functions: ["健脾益气", "燥湿利水", "止汗", "安胎"],
    indications: ["脾虚食少", "腹胀泄泻", "痰饮眩悸", "水肿", "自汗", "胎动不安"],
    dosage: "6-12g",
    cautions: ["阴虚燥渴、气滞胀闷者忌服"],
    source: "《神农本草经》"
  },
  {
    name: "茯苓",
    pinyin: "fuling",
    alias: ["云苓", "茯灵"],
    nature: "甘、淡，平",
    meridians: ["心", "肺", "脾", "肾"],
    functions: ["利水渗湿", "健脾宁心"],
    indications: ["水肿尿少", "痰饮眩悸", "脾虚食少", "便溏泄泻", "心神不安", "惊悸失眠"],
    dosage: "10-15g",
    cautions: ["虚寒精滑或气虚下陷者忌服"],
    source: "《神农本草经》"
  },
  {
    name: "川芎",
    pinyin: "chuanxiong",
    alias: ["芎穷", "胡芎"],
    nature: "辛，温",
    meridians: ["肝", "胆", "心包"],
    functions: ["活血行气", "祛风止痛"],
    indications: ["胸痹心痛", "胸胁刺痛", "跌扑肿痛", "月经不调", "经闭痛经", "产后瘀阻", "头痛", "风湿痹痛"],
    dosage: "3-10g",
    cautions: ["阴虚火旺、上盛下虚及气弱之人忌服", "月经过多者不宜服"],
    source: "《神农本草经》"
  },
  {
    name: "熟地黄",
    pinyin: "shudihuang",
    alias: ["熟地", "大熟地"],
    nature: "甘，微温",
    meridians: ["肝", "肾"],
    functions: ["补血养阴", "填精益髓"],
    indications: ["血虚萎黄", "眩晕心悸", "月经不调", "崩漏", "肝肾阴虚", "腰膝酸软", "骨蒸潮热", "盗汗遗精", "内热消渴", "须发早白"],
    dosage: "9-15g",
    cautions: ["脾虚食少、腹满便溏者慎服"],
    source: "《本草纲目》"
  },
]

// 方剂数据库
export interface Formula {
  name: string
  source: string
  composition: { herb: string; amount: string }[]
  method: string // 用法
  functions: string[]
  indications: string[]
  analysis: string // 方解
  modifications: { condition: string; change: string }[] // 加减
}

// 经典方剂 - 来自《伤寒论》《金匮要略》等公共领域古籍
export const CLASSIC_FORMULAS: Formula[] = [
  {
    name: "四君子汤",
    source: "《太平惠民和剂局方》",
    composition: [
      { herb: "人参", amount: "9g" },
      { herb: "白术", amount: "9g" },
      { herb: "茯苓", amount: "9g" },
      { herb: "甘草", amount: "6g" },
    ],
    method: "水煎服",
    functions: ["益气健脾"],
    indications: ["脾胃气虚证", "面色萎白", "语声低微", "气短乏力", "食少便溏", "舌淡苔白", "脉虚弱"],
    analysis: "人参甘温益气，健脾养胃，为君药。白术苦温，健脾燥湿，加强益气助运之力，为臣药。茯苓甘淡，健脾渗湿，为佐药。甘草甘温，益气和中，调和诸药，为使药。四药配合，共奏益气健脾之功。",
    modifications: [
      { condition: "呕吐", change: "加半夏" },
      { condition: "腹胀", change: "加陈皮" },
      { condition: "畏寒肢冷", change: "加干姜、附子" },
    ]
  },
  {
    name: "六味地黄丸",
    source: "《小儿药证直诀》",
    composition: [
      { herb: "熟地黄", amount: "24g" },
      { herb: "山萸肉", amount: "12g" },
      { herb: "山药", amount: "12g" },
      { herb: "泽泻", amount: "9g" },
      { herb: "茯苓", amount: "9g" },
      { herb: "牡丹皮", amount: "9g" },
    ],
    method: "蜜丸，每次6-9g，日2次；或水煎服",
    functions: ["滋阴补肾"],
    indications: ["肾阴虚证", "腰膝酸软", "头晕耳鸣", "盗汗遗精", "骨蒸潮热", "手足心热", "口燥咽干", "牙齿动摇", "足跟作痛", "小便淋沥", "舌红少苔", "脉沉细数"],
    analysis: "熟地滋阴补肾，填精益髓，为君药。山萸肉补养肝肾，并能涩精，山药补益脾阴，亦能固精，共为臣药。泽泻利湿泄浊，并防熟地之滋腻恋邪；牡丹皮清泄相火，并制山萸肉之温涩；茯苓淡渗脾湿，并助山药之健运，三药为佐药。六味合用，三补三泻，以补为主，肝脾肾三阴并补，以补肾阴为主。",
    modifications: [
      { condition: "阴虚火旺", change: "加知母、黄柏（知柏地黄丸）" },
      { condition: "肝肾阴虚目暗不明", change: "加枸杞子、菊花（杞菊地黄丸）" },
      { condition: "肺肾阴虚喘咳", change: "加五味子（都气丸）" },
    ]
  },
  {
    name: "逍遥散",
    source: "《太平惠民和剂局方》",
    composition: [
      { herb: "柴胡", amount: "9g" },
      { herb: "当归", amount: "9g" },
      { herb: "白芍", amount: "9g" },
      { herb: "白术", amount: "9g" },
      { herb: "茯苓", amount: "9g" },
      { herb: "甘草", amount: "6g" },
      { herb: "薄荷", amount: "3g" },
      { herb: "生姜", amount: "3片" },
    ],
    method: "水煎服",
    functions: ["疏肝解郁", "养血健脾"],
    indications: ["肝郁血虚脾弱证", "两胁作痛", "头痛目眩", "口燥咽干", "神疲食少", "或往来寒热", "或月经不调", "乳房胀痛", "舌淡红", "脉弦而虚"],
    analysis: "柴胡疏肝解郁，使肝气得以条达，为君药。当归、白芍养血柔肝，为臣药。白术、茯苓、甘草健脾益气，为佐药。薄荷少许，疏散郁遏之气，生姜温胃和中，为使药。诸药合用，共奏疏肝解郁、养血健脾之功。",
    modifications: [
      { condition: "肝郁化火", change: "加牡丹皮、栀子（丹栀逍遥散）" },
      { condition: "血虚甚", change: "加熟地" },
      { condition: "脾虚甚", change: "加黄芪、党参" },
    ]
  },
  {
    name: "桂枝汤",
    source: "《伤寒论》",
    composition: [
      { herb: "桂枝", amount: "9g" },
      { herb: "白芍", amount: "9g" },
      { herb: "生姜", amount: "9g" },
      { herb: "大枣", amount: "3枚" },
      { herb: "甘草", amount: "6g" },
    ],
    method: "水煎服，服后须臾，啜热稀粥一升余，以助药力",
    functions: ["解肌发表", "调和营卫"],
    indications: ["外感风寒表虚证", "恶风发热", "汗出头痛", "鼻鸣干呕", "苔白不渴", "脉浮缓或浮弱"],
    analysis: "桂枝辛温，解肌发表，温通经脉，为君药。白芍酸苦微寒，敛阴和营，为臣药。生姜辛温，助桂枝解肌发表，又能温胃止呕；大枣甘平，益气补中，养血和营，共为佐药。甘草甘温，调和诸药，合桂枝辛甘化阳以实卫，合白芍酸甘化阴以和营，为使药。五药配伍，外解肌表之邪，内调营卫之气。",
    modifications: [
      { condition: "项背强几几", change: "加葛根（桂枝加葛根汤）" },
      { condition: "喘", change: "加厚朴、杏仁（桂枝加厚朴杏子汤）" },
      { condition: "下利", change: "去白芍，加附子（桂枝去芍药加附子汤）" },
    ]
  },
  {
    name: "麻黄汤",
    source: "《伤寒论》",
    composition: [
      { herb: "麻黄", amount: "9g" },
      { herb: "桂枝", amount: "6g" },
      { herb: "杏仁", amount: "9g" },
      { herb: "甘草", amount: "3g" },
    ],
    method: "先煎麻黄去上沫，后下诸药，水煎服，覆取微似汗",
    functions: ["发汗解表", "宣肺平喘"],
    indications: ["外感风寒表实证", "恶寒发热", "头身疼痛", "无汗而喘", "舌苔薄白", "脉浮紧"],
    analysis: "麻黄辛温，发汗解表，宣肺平喘，为君药。桂枝辛甘温，解肌发表，温通经脉，助麻黄解表，为臣药。杏仁苦降肺气，助麻黄平喘，为佐药。甘草甘温，调和诸药，为使药。四药相伍，发汗解表，宣肺平喘。",
    modifications: [
      { condition: "喘甚", change: "加石膏（麻杏石甘汤）" },
      { condition: "咳嗽痰多", change: "加半夏、细辛" },
      { condition: "身痛甚", change: "加羌活、独活" },
    ]
  },
]

// 经络穴位数据
export interface Acupoint {
  name: string
  pinyin: string
  meridian: string
  location: string
  functions: string[]
  indications: string[]
  method: string // 刺灸法
}

// 常用穴位 - 来自《针灸甲乙经》《针灸大成》等公共领域古籍
export const COMMON_ACUPOINTS: Acupoint[] = [
  {
    name: "足三里",
    pinyin: "zusanli",
    meridian: "足阳明胃经",
    location: "犊鼻下3寸，胫骨前嵴外一横指",
    functions: ["健脾和胃", "扶正培元", "通经活络", "升降气机"],
    indications: ["胃痛", "呕吐", "腹胀", "泄泻", "便秘", "痢疾", "乳痈", "肠痈", "下肢痿痹", "水肿", "癫狂", "脚气", "虚劳羸瘦"],
    method: "直刺1-2寸，可灸"
  },
  {
    name: "合谷",
    pinyin: "hegu",
    meridian: "手阳明大肠经",
    location: "手背，第1、2掌骨间，当第2掌骨桡侧的中点处",
    functions: ["镇静止痛", "通经活络", "清热解表"],
    indications: ["头痛", "目赤肿痛", "鼻衄", "齿痛", "牙关紧闭", "口眼歪斜", "耳聋", "痄腮", "咽喉肿痛", "热病无汗", "多汗", "腹痛", "便秘", "闭经", "滞产", "小儿惊风", "上肢不遂"],
    method: "直刺0.5-1寸，可灸。孕妇慎用"
  },
  {
    name: "中脘",
    pinyin: "zhongwan",
    meridian: "任脉",
    location: "上腹部，前正中线上，当脐中上4寸",
    functions: ["和胃健脾", "降逆利水"],
    indications: ["胃痛", "腹胀", "呕吐", "呃逆", "翻胃", "吞酸", "纳呆", "食不化", "疳积", "膨胀", "黄疸", "肠鸣", "泄泻", "便秘", "便血", "胁下坚痛", "虚劳吐血", "头痛", "失眠", "脏躁", "癫狂", "痫证", "尸厥", "惊悸", "怔忡", "产后血晕"],
    method: "直刺1-1.5寸，可灸"
  },
  {
    name: "关元",
    pinyin: "guanyuan",
    meridian: "任脉",
    location: "下腹部，前正中线上，当脐中下3寸",
    functions: ["培元固本", "补益下焦"],
    indications: ["中风脱证", "虚劳冷惫", "羸瘦无力", "少腹疼痛", "霍乱吐泻", "痢疾", "脱肛", "疝气", "便血", "溺血", "小便不利", "尿频", "尿闭", "遗精", "白浊", "阳痿", "早泄", "月经不调", "经闭", "痛经", "赤白带下", "阴挺", "崩漏", "阴门瘙痒", "恶露不止", "胞衣不下", "消渴"],
    method: "直刺1-1.5寸，可灸"
  },
  {
    name: "太冲",
    pinyin: "taichong",
    meridian: "足厥阴肝经",
    location: "足背，当第1跖骨间隙的后方凹陷处",
    functions: ["平肝息风", "清热利胆", "通经活络"],
    indications: ["头痛", "眩晕", "疝气", "月经不调", "痛经", "经闭", "带下", "崩漏", "癃闭", "遗尿", "小儿惊风", "癫狂", "痫证", "胁痛", "腹胀", "黄疸", "呕逆", "咽痛嗌干", "目赤肿痛", "膝股内侧痛", "足跗肿", "下肢痿痹"],
    method: "直刺0.5-1寸，可灸"
  },
  {
    name: "百会",
    pinyin: "baihui",
    meridian: "督脉",
    location: "头顶正中线与两耳尖连线的交叉处",
    functions: ["升阳举陷", "益气固脱", "清热开窍", "安神定志"],
    indications: ["头痛", "眩晕", "惊悸", "健忘", "尸厥", "中风不语", "癫狂", "痫证", "癔病", "耳鸣", "鼻塞", "脱肛", "痔疾", "阴挺", "泄泻"],
    method: "平刺0.5-0.8寸，可灸"
  },
]

// 体质类型
export interface Constitution {
  id: string
  name: string
  description: string
  characteristics: string[]
  susceptibility: string[] // 易患疾病
  diet: string[] // 饮食调理
  lifestyle: string[] // 生活调理
  herbs: string[] // 推荐中药
  acupoints: string[] // 推荐穴位
}

// 九种体质 - 王琦教授体质学说
export const CONSTITUTIONS: Constitution[] = [
  {
    id: "pinghe",
    name: "平和质",
    description: "阴阳气血调和，以体态适中、面色红润、精力充沛等为主要特征",
    characteristics: ["体形匀称健壮", "面色润泽", "头发稠密有光泽", "目光有神", "唇色红润", "不易疲劳", "精力充沛", "耐受寒热", "睡眠良好", "胃纳佳", "二便正常", "舌色淡红", "苔薄白", "脉和有神"],
    susceptibility: ["较少患病"],
    diet: ["饮食有节", "不偏食", "不嗜食"],
    lifestyle: ["起居规律", "劳逸结合", "坚持运动"],
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
    characteristics: ["肌肉松软不实", "平素畏冷", "手足不温", "喜热饮食", "精神不振", "舌淡胖嫩", "脉沉迟"],
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
  },
  {
    id: "shire",
    name: "湿热质",
    description: "湿热内蕴，以面垢油光、口苦、苔黄腻等湿热表现为主要特征",
    characteristics: ["形体偏胖", "面垢油光", "易生痤疮", "口苦口干", "身重困倦", "大便黏滞不畅或燥结", "小便短黄", "男性易阴囊潮湿", "女性易带下增多", "舌质偏红", "苔黄腻", "脉滑数"],
    susceptibility: ["易患疮疖", "黄疸", "热淋等"],
    diet: ["宜食清热利湿之品", "如绿豆、苦瓜、冬瓜", "忌辛辣酒烟"],
    lifestyle: ["避免湿热环境", "保持皮肤清洁"],
    herbs: ["黄芩", "黄连", "栀子", "薏苡仁", "茵陈"],
    acupoints: ["曲池", "合谷", "内庭", "阴陵泉"]
  },
  {
    id: "xueyu",
    name: "血瘀质",
    description: "血行不畅，以肤色晦暗、舌质紫暗等血瘀表现为主要特征",
    characteristics: ["肤色晦暗", "色素沉着", "容易出现瘀斑", "口唇暗淡", "舌暗或有瘀点", "舌下络脉紫暗或增粗", "脉涩"],
    susceptibility: ["易患症瘕及痛证", "血证等"],
    diet: ["宜食活血化瘀之品", "如山楂、黑木耳、醋", "忌寒凉收涩"],
    lifestyle: ["注意保暖", "促进血液循环", "适当运动"],
    herbs: ["当归", "川芎", "丹参", "桃仁", "红花"],
    acupoints: ["血海", "三阴交", "膈俞", "合谷"]
  },
  {
    id: "qiyu",
    name: "气郁质",
    description: "气机郁滞，以神情抑郁、忧虑脆弱等气郁表现为主要特征",
    characteristics: ["形体瘦者为多", "神情抑郁", "情感脆弱", "烦闷不乐", "舌淡红", "苔薄白", "脉弦"],
    susceptibility: ["易患脏躁", "梅核气", "百合病及郁证等"],
    diet: ["宜食行气解郁之品", "如玫瑰花、佛手、柑橘", "忌咖啡酒类"],
    lifestyle: ["多参加社交活动", "培养兴趣爱好", "调节情绪"],
    herbs: ["柴胡", "香附", "郁金", "佛手", "玫瑰花"],
    acupoints: ["太冲", "期门", "膻中", "内关"]
  },
  {
    id: "tebing",
    name: "特禀质",
    description: "先天失常，以生理缺陷、过敏反应等为主要特征",
    characteristics: ["过敏体质者", "常见哮喘", "风团", "咽痒", "鼻塞", "喷嚏等"],
    susceptibility: ["易患哮喘", "荨麻疹", "花粉症及药物过敏等"],
    diet: ["饮食清淡均衡", "避免过敏原", "忌辛辣发物"],
    lifestyle: ["远离过敏原", "保持环境清洁", "适度锻炼"],
    herbs: ["黄芪", "防风", "白术", "乌梅"],
    acupoints: ["足三里", "曲池", "肺俞", "大椎"]
  },
]

// 五运六气数据
export const WUYUN_LIUQI = {
  tianGan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
  diZhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
  // 五运 - 根据年干推算
  wuyun: {
    "甲己": "土运",
    "乙庚": "金运",
    "丙辛": "水运",
    "丁壬": "木运",
    "戊癸": "火运",
  },
  // 主运分布
  zhuyun: ["木运", "火运", "土运", "金运", "水运"],
  // 六气 - 根据年支推算
  sitian: {
    "子午": "少阴君火",
    "丑未": "太阴湿土",
    "寅申": "少阳相火",
    "卯酉": "阳明燥金",
    "辰戌": "太阳寒水",
    "巳亥": "厥阴风木",
  },
  zaiquan: {
    "子午": "阳明燥金",
    "丑未": "太阳寒水",
    "寅申": "厥阴风木",
    "卯酉": "少阴君火",
    "辰戌": "太阴湿土",
    "巳亥": "少阳相火",
  },
}
