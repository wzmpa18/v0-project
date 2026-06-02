// 中医完整数据库 - 基于《黄帝内经》《伤寒论》《金匮要略》等经典古籍

// ========== 基础理论 ==========

// 五行生克关系
export const WU_XING = {
  木: {
    sheng: "火",
    ke: "土",
    zang: "肝",
    fu: "胆",
    se: "青",
    wei: "酸",
    qi: "风",
    ji: "筋",
    qiao: "目",
    zhi: "怒",
    ye: "泪"
  },
  火: {
    sheng: "土",
    ke: "金",
    zang: "心",
    fu: "小肠",
    se: "赤",
    wei: "苦",
    qi: "暑",
    ji: "脉",
    qiao: "舌",
    zhi: "喜",
    ye: "汗"
  },
  土: {
    sheng: "金",
    ke: "水",
    zang: "脾",
    fu: "胃",
    se: "黄",
    wei: "甘",
    qi: "湿",
    ji: "肉",
    qiao: "口",
    zhi: "思",
    ye: "涎"
  },
  金: {
    sheng: "水",
    ke: "木",
    zang: "肺",
    fu: "大肠",
    se: "白",
    wei: "辛",
    qi: "燥",
    ji: "皮",
    qiao: "鼻",
    zhi: "悲",
    ye: "涕"
  },
  水: {
    sheng: "木",
    ke: "火",
    zang: "肾",
    fu: "膀胱",
    se: "黑",
    wei: "咸",
    qi: "寒",
    ji: "骨",
    qiao: "耳",
    zhi: "恐",
    ye: "唾"
  }
}

// 十二正经
export const SHI_ER_JING = [
  { name: "手太阴肺经", shouxu: "手", yin: "阴", zangfu: "肺", liujing: "太阴" },
  { name: "手阳明大肠经", shouxu: "手", yin: "阳", zangfu: "大肠", liujing: "阳明" },
  { name: "足阳明胃经", shouxu: "足", yin: "阳", zangfu: "胃", liujing: "阳明" },
  { name: "足太阴脾经", shouxu: "足", yin: "阴", zangfu: "脾", liujing: "太阴" },
  { name: "手少阴心经", shouxu: "手", yin: "阴", zangfu: "心", liujing: "少阴" },
  { name: "手太阳小肠经", shouxu: "手", yin: "阳", zangfu: "小肠", liujing: "太阳" },
  { name: "足太阳膀胱经", shouxu: "足", yin: "阳", zangfu: "膀胱", liujing: "太阳" },
  { name: "足少阴肾经", shouxu: "足", yin: "阴", zangfu: "肾", liujing: "少阴" },
  { name: "手厥阴心包经", shouxu: "手", yin: "阴", zangfu: "心包", liujing: "厥阴" },
  { name: "手少阳三焦经", shouxu: "手", yin: "阳", zangfu: "三焦", liujing: "少阳" },
  { name: "足少阳胆经", shouxu: "足", yin: "阳", zangfu: "胆", liujing: "少阳" },
  { name: "足厥阴肝经", shouxu: "足", yin: "阴", zangfu: "肝", liujing: "厥阴" }
]

// 奇经八脉
export const QI_JING_BA_MAI = [
  { name: "任脉", zuoyong: "阴脉之海，主胞胎", xuewei: 24 },
  { name: "督脉", zuoyong: "阳脉之海，主一身之阳", xuewei: 28 },
  { name: "冲脉", zuoyong: "十二经脉之海，血海", xuewei: 0 },
  { name: "带脉", zuoyong: "约束诸经，主带下", xuewei: 0 },
  { name: "阴维脉", zuoyong: "维络诸阴", xuewei: 0 },
  { name: "阳维脉", zuoyong: "维络诸阳", xuewei: 0 },
  { name: "阴跷脉", zuoyong: "主目瞑，主下肢运动", xuewei: 0 },
  { name: "阳跷脉", zuoyong: "主目张，主下肢运动", xuewei: 0 }
]

// ========== 完整中药数据库 ==========

export interface HerbComplete {
  id: string
  name: string
  pinyin: string
  alias: string[]
  nature: string
  meridians: string[]
  functions: string[]
  indications: string[]
  dosage: string
  cautions: string[]
  source: string
  category: string
  origin?: string
  processing?: string
}

export const HERBAL_COMPLETE: HerbComplete[] = [
  // 解表药
  { id: "mahuang", name: "麻黄", pinyin: "mahuang", alias: ["龙沙", "卑相"], nature: "辛、微苦，温", meridians: ["肺", "膀胱"], functions: ["发汗解表", "宣肺平喘", "利水消肿"], indications: ["风寒感冒", "胸闷喘咳", "风水浮肿", "风湿痹痛"], dosage: "2-10g", cautions: ["体虚自汗、盗汗者忌用", "虚喘者忌用"], source: "《神农本草经》", category: "解表药-辛温解表" },
  { id: "guizhi", name: "桂枝", pinyin: "guizhi", alias: ["柳桂"], nature: "辛、甘，温", meridians: ["心", "肺", "膀胱"], functions: ["发汗解肌", "温通经脉", "助阳化气", "平冲降逆"], indications: ["风寒感冒", "脘腹冷痛", "血寒经闭", "关节痹痛", "痰饮", "水肿", "心悸"], dosage: "3-10g", cautions: ["温热病忌用", "血热妄行忌用"], source: "《神农本草经》", category: "解表药-辛温解表" },
  { id: "fangfeng", name: "防风", pinyin: "fangfeng", alias: ["铜芸", "回草"], nature: "辛、甘，微温", meridians: ["膀胱", "肝", "脾"], functions: ["祛风解表", "胜湿止痛", "止痉"], indications: ["感冒头痛", "风湿痹痛", "风疹瘙痒", "破伤风"], dosage: "5-10g", cautions: ["阴血亏虚者慎服"], source: "《神农本草经》", category: "解表药-辛温解表" },
  { id: "jingjie", name: "荆芥", pinyin: "jingjie", alias: ["假苏"], nature: "辛，微温", meridians: ["肺", "肝"], functions: ["解表散风", "透疹，消疮"], indications: ["感冒", "头痛", "麻疹不透", "风疹瘙痒", "疮疡初起"], dosage: "5-10g", cautions: ["表虚自汗者忌服"], source: "《神农本草经》", category: "解表药-辛温解表" },
  { id: "qianghuo", name: "羌活", pinyin: "qianghuo", alias: ["羌青", "护羌使者"], nature: "辛、苦，温", meridians: ["膀胱", "肾"], functions: ["解表散寒", "祛风除湿", "止痛"], indications: ["风寒感冒", "头痛项强", "风湿痹痛", "肩背酸痛"], dosage: "3-10g", cautions: ["阴血亏虚者慎服"], source: "《神农本草经》", category: "解表药-辛温解表" },
  { id: "baizhi", name: "白芷", pinyin: "baizhi", alias: ["芳香", "泽芬"], nature: "辛，温", meridians: ["胃", "大肠", "肺"], functions: ["解表散寒", "祛风止痛", "通鼻窍", "燥湿止带", "消肿排脓"], indications: ["感冒头痛", "眉棱骨痛", "鼻塞流涕", "鼻鼽鼻渊", "牙痛", "带下", "疮疡肿痛"], dosage: "3-10g", cautions: ["阴虚血热者忌服"], source: "《神农本草经》", category: "解表药-辛温解表" },
  { id: "xixin", name: "细辛", pinyin: "xixin", alias: ["小辛", "少辛"], nature: "辛，温", meridians: ["心", "肺", "肾"], functions: ["解表散寒", "祛风止痛", "通窍", "温肺化饮"], indications: ["风寒感冒", "头痛", "牙痛", "鼻塞流涕", "鼻鼽鼻渊", "风湿痹痛", "痰饮咳喘"], dosage: "1-3g", cautions: ["气虚多汗者忌用", "阴虚阳亢者忌用"], source: "《神农本草经》", category: "解表药-辛温解表" },
  { id: "gaoben", name: "藁本", pinyin: "gaoben", alias: ["鬼卿", "地新"], nature: "辛，温", meridians: ["膀胱"], functions: ["祛风散寒", "除湿止痛"], indications: ["风寒感冒", "巅顶疼痛", "风湿痹痛"], dosage: "3-10g", cautions: ["阴血亏虚者慎服"], source: "《神农本草经》", category: "解表药-辛温解表" },
  { id: "cangerzi", name: "苍耳子", pinyin: "cangerzi", alias: ["胡苍子", "老鼠愁"], nature: "辛、苦，温；有小毒", meridians: ["肺"], functions: ["散风寒", "通鼻窍", "祛风湿", "止痛"], indications: ["风寒头痛", "鼻塞流涕", "鼻鼽鼻渊", "风疹瘙痒", "湿痹拘挛"], dosage: "3-10g", cautions: ["血虚头痛者忌服"], source: "《神农本草经》", category: "解表药-辛温解表" },
  { id: "xinyi", name: "辛夷", pinyin: "xinyi", alias: ["木笔", "望春花"], nature: "辛，温", meridians: ["肺", "胃"], functions: ["散风寒", "通鼻窍"], indications: ["风寒头痛", "鼻塞流涕", "鼻鼽鼻渊"], dosage: "3-10g", cautions: ["阴虚火旺者忌服"], source: "《神农本草经》", category: "解表药-辛温解表" },
  { id: "bohe", name: "薄荷", pinyin: "bohe", alias: ["南薄荷", "土薄荷"], nature: "辛，凉", meridians: ["肺", "肝"], functions: ["疏散风热", "清利头目", "利咽透疹", "疏肝行气"], indications: ["风热感冒", "风温初起", "头痛", "目赤", "喉痹", "口疮", "风疹", "麻疹", "胸胁胀闷"], dosage: "3-6g，后下", cautions: ["体虚多汗者不宜使用"], source: "《新修本草》", category: "解表药-辛凉解表" },
  { id: "niubangzi", name: "牛蒡子", pinyin: "niubangzi", alias: ["恶实", "鼠粘子"], nature: "辛、苦，寒", meridians: ["肺", "胃"], functions: ["疏散风热", "宣肺透疹", "解毒利咽"], indications: ["风热感冒", "咳嗽痰多", "麻疹，风疹", "咽喉肿痛，痄腮，丹毒，痈肿疮毒"], dosage: "6-12g", cautions: ["气虚便溏者忌用"], source: "《名医别录》", category: "解表药-辛凉解表" },
  { id: "chantui", name: "蝉蜕", pinyin: "chantui", alias: ["蝉衣", "蝉壳"], nature: "甘，寒", meridians: ["肺", "肝"], functions: ["疏散风热", "利咽开音", "透疹，明目退翳，息风止痉"], indications: ["风热感冒", "咽痛音哑", "麻疹不透，风疹瘙痒", "目赤翳障", "惊风抽搐，破伤风"], dosage: "3-6g", cautions: ["孕妇慎服"], source: "《神农本草经》", category: "解表药-辛凉解表" },
  { id: "sangye", name: "桑叶", pinyin: "sangye", alias: ["冬桑叶", "霜桑叶"], nature: "甘、苦，寒", meridians: ["肺", "肝"], functions: ["疏散风热", "清肺润燥", "平肝明目"], indications: ["风热感冒，温病初起", "肺热咳嗽，燥热咳嗽", "肝阳上亢，头痛眩晕", "目赤肿痛，目暗昏花"], dosage: "5-10g", cautions: [], source: "《神农本草经》", category: "解表药-辛凉解表" },
  { id: "juhua", name: "菊花", pinyin: "juhua", alias: ["甘菊", "白菊花"], nature: "甘、苦，微寒", meridians: ["肺", "肝"], functions: ["疏散风热", "平抑肝阳", "清肝明目", "清热解毒"], indications: ["风热感冒，温病初起", "肝阳上亢，头痛眩晕", "目赤肿痛，眼目昏花", "疮痈肿毒"], dosage: "5-10g", cautions: [], source: "《神农本草经》", category: "解表药-辛凉解表" },
  { id: "manjingzi", name: "蔓荆子", pinyin: "manjingzi", alias: ["京子", "万荆子"], nature: "辛、苦，微寒", meridians: ["膀胱", "肝", "胃"], functions: ["疏散风热", "清利头目"], indications: ["风热感冒，头痛", "目赤肿痛，目昏多泪", "齿龈肿痛"], dosage: "5-10g", cautions: ["血虚有火之头痛目眩者慎服"], source: "《神农本草经》", category: "解表药-辛凉解表" },
  { id: "chaihu", name: "柴胡", pinyin: "chaihu", alias: ["地熏", "山菜"], nature: "辛、苦，微寒", meridians: ["肝", "胆", "肺"], functions: ["疏散退热", "疏肝解郁", "升举阳气"], indications: ["感冒发热", "寒热往来，胸胁胀痛，月经不调", "子宫脱垂，脱肛"], dosage: "3-10g", cautions: ["阴虚阳亢者忌服"], source: "《神农本草经》", category: "解表药-辛凉解表" },
  { id: "shengma", name: "升麻", pinyin: "shengma", alias: ["周麻", "鸡骨升麻"], nature: "辛、微甘，微寒", meridians: ["肺", "脾", "胃", "大肠"], functions: ["发表透疹", "清热解毒", "升举阳气"], indications: ["风热感冒，发热头痛", "麻疹不透", "齿痛，口疮，咽喉肿痛，阳毒发斑", "气虚下陷，脱肛，子宫脱垂，崩漏下血"], dosage: "3-10g", cautions: ["麻疹已透者忌用", "阴虚火旺者忌用"], source: "《神农本草经》", category: "解表药-辛凉解表" },
  { id: "gegen", name: "葛根", pinyin: "gegen", alias: ["干葛", "粉葛"], nature: "甘、辛，凉", meridians: ["脾", "胃", "肺"], functions: ["解肌退热", "生津止渴，透疹，升阳止泻，通经活络，解酒毒"], indications: ["外感发热头痛，项背强痛", "口渴，消渴", "麻疹不透", "热痢，泄泻", "眩晕头痛，中风偏瘫，胸痹心痛", "酒毒伤中"], dosage: "10-15g", cautions: ["胃寒者慎用"], source: "《神农本草经》", category: "解表药-辛凉解表" },
  { id: "dantouye", name: "淡豆豉", pinyin: "dantouchi", alias: ["香豉", "淡豉"], nature: "苦、辛，凉", meridians: ["肺", "胃"], functions: ["解表，除烦，宣发郁热"], indications: ["感冒，寒热头痛", "烦躁胸闷，虚烦不眠"], dosage: "6-12g", cautions: [], source: "《名医别录》", category: "解表药-辛凉解表" },
  
  // 清热药
  { id: "shigao", name: "石膏", pinyin: "shigao", alias: ["细石", "细理石"], nature: "甘、辛，大寒", meridians: ["肺", "胃"], functions: ["生用：清热泻火，除烦止渴；煅用：收湿，生肌，敛疮，止血"], indications: ["外感热病，高热烦渴", "肺热喘咳", "胃火亢盛，头痛，牙痛，内热消渴", "溃疡不敛，湿疹瘙痒，水火烫伤，外伤出血"], dosage: "15-60g，先煎", cautions: ["脾胃虚寒及血虚、阴虚发热者忌服"], source: "《神农本草经》", category: "清热药-清热泻火" },
  { id: "zhimu", name: "知母", pinyin: "zhimu", alias: ["连母", "水参"], nature: "苦、甘，寒", meridians: ["肺", "胃", "肾"], functions: ["清热泻火，滋阴润燥"], indications: ["外感热病，高热烦渴", "肺热咳嗽，阴虚燥咳", "骨蒸潮热", "内热消渴", "肠燥便秘"], dosage: "6-12g", cautions: ["脾胃虚寒，大便溏泻者忌服"], source: "《神农本草经》", category: "清热药-清热泻火" },
  { id: "lugen", name: "芦根", pinyin: "lugen", alias: ["苇茎", "苇根"], nature: "甘，寒", meridians: ["肺", "胃"], functions: ["清热泻火，生津止渴，除烦，止呕，利尿"], indications: ["热病烦渴", "肺热咳嗽，肺痈吐脓", "胃热呕哕", "热淋涩痛"], dosage: "15-30g", cautions: ["脾胃虚寒者慎服"], source: "《名医别录》", category: "清热药-清热泻火" },
  { id: "tianhuafen", name: "天花粉", pinyin: "tianhuafen", alias: ["瓜蒌根", "花粉"], nature: "甘、微苦，微寒", meridians: ["肺", "胃"], functions: ["清热泻火，生津止渴，消肿排脓"], indications: ["热病烦渴", "肺热燥咳", "内热消渴", "疮疡肿毒"], dosage: "10-15g", cautions: ["孕妇慎用", "不宜与川乌、草乌、附子同用"], source: "《神农本草经》", category: "清热药-清热泻火" },
  { id: "zhuye", name: "竹叶", pinyin: "zhuye", alias: ["淡竹叶", "苦竹叶"], nature: "甘、辛、淡，寒", meridians: ["心", "胃", "小肠"], functions: ["清热泻火，除烦，生津，利尿"], indications: ["热病烦渴", "口疮尿赤"], dosage: "6-15g", cautions: ["脾胃虚寒者慎服"], source: "《名医别录》", category: "清热药-清热泻火" },
  { id: "danzuye", name: "淡竹叶", pinyin: "danzuye", alias: ["竹叶门冬青", "迷身草"], nature: "甘、淡，寒", meridians: ["心", "胃", "小肠"], functions: ["清热泻火，除烦，利尿"], indications: ["热病烦渴", "口疮尿赤，热淋涩痛"], dosage: "6-10g", cautions: ["脾胃虚寒者慎服"], source: "《本草纲目》", category: "清热药-清热泻火" },
  { id: "yazhicao", name: "鸭跖草", pinyin: "yazhicao", alias: ["碧竹草", "竹叶菜"], nature: "甘、淡，寒", meridians: ["肺", "胃", "小肠"], functions: ["清热泻火，解毒，利水消肿"], indications: ["风热感冒，热病发热", "咽喉肿痛，痈肿疔毒", "水肿尿少，热淋涩痛"], dosage: "15-30g", cautions: ["脾胃虚寒者慎服"], source: "《本草拾遗》", category: "清热药-清热泻火" },
  { id: "zhizi", name: "栀子", pinyin: "zhizi", alias: ["山栀子", "黄栀子"], nature: "苦，寒", meridians: ["心", "肺", "三焦"], functions: ["泻火除烦，清热利湿，凉血解毒；外用消肿止痛"], indications: ["热病心烦", "湿热黄疸", "淋证涩痛", "血热吐衄", "目赤肿痛", "火毒疮疡", "外治扭挫伤痛"], dosage: "6-10g", cautions: ["脾胃虚寒者慎服"], source: "《神农本草经》", category: "清热药-清热泻火" },
  { id: "xiaji", name: "夏枯草", pinyin: "xiakucao", alias: ["棒槌草", "夏枯头"], nature: "辛、苦，寒", meridians: ["肝", "胆"], functions: ["清肝泻火，明目，散结消肿"], indications: ["目赤肿痛，目珠夜痛，头痛眩晕", "瘰疬，瘿瘤，乳痈，乳癖，乳房胀痛"], dosage: "9-15g", cautions: ["脾胃虚寒者慎服"], source: "《神农本草经》", category: "清热药-清热泻火" },
  { id: "juhua", name: "菊花", pinyin: "juhua", alias: ["甘菊", "白菊花"], nature: "甘、苦，微寒", meridians: ["肺", "肝"], functions: ["疏散风热，平抑肝阳，清肝明目，清热解毒"], indications: ["风热感冒，温病初起", "肝阳上亢，头痛眩晕", "目赤肿痛，眼目昏花", "疮痈肿毒"], dosage: "5-10g", cautions: [], source: "《神农本草经》", category: "清热药-清热泻火" },
  { id: "manjingzi", name: "蔓荆子", pinyin: "manjingzi", alias: ["京子", "万荆子"], nature: "辛、苦，微寒", meridians: ["膀胱", "肝", "胃"], functions: ["疏散风热，清利头目"], indications: ["风热感冒，头痛", "目赤肿痛，目昏多泪", "齿龈肿痛"], dosage: "5-10g", cautions: ["血虚有火之头痛目眩者慎服"], source: "《神农本草经》", category: "清热药-清热泻火" },
  { id: "huanglian", name: "黄连", pinyin: "huanglian", alias: ["味连", "川连"], nature: "苦，寒", meridians: ["心", "脾", "胃", "肝", "胆", "大肠"], functions: ["清热燥湿，泻火解毒"], indications: ["湿热痞满，呕吐吞酸", "泻痢", "高热神昏，心烦不寐，血热吐衄", "痈肿疖疮，目赤牙痛", "消渴", "外治湿疹、湿疮、耳道流脓"], dosage: "2-5g", cautions: ["脾胃虚寒者忌用", "阴虚津伤者慎用"], source: "《神农本草经》", category: "清热药-清热燥湿" },
  { id: "huangqin", name: "黄芩", pinyin: "huangqin", alias: ["条芩", "子芩"], nature: "苦，寒", meridians: ["肺", "胆", "脾", "大肠", "小肠"], functions: ["清热燥湿，泻火解毒，止血，安胎"], indications: ["湿温、暑湿，胸闷呕恶，湿热痞满，泻痢，黄疸", "肺热咳嗽，高热烦渴", "血热吐衄", "痈肿疮毒", "胎动不安"], dosage: "3-10g", cautions: ["脾胃虚寒者不宜使用"], source: "《神农本草经》", category: "清热药-清热燥湿" },
  { id: "huangbo", name: "黄柏", pinyin: "huangbo", alias: ["檗木", "檗皮"], nature: "苦，寒", meridians: ["肾", "膀胱", "大肠"], functions: ["清热燥湿，泻火除蒸，解毒疗疮"], indications: ["湿热泻痢，带下阴痒，热淋涩痛，脚气痿躄", "骨蒸劳热，盗汗，遗精", "疮疡肿毒，湿疹湿疮"], dosage: "3-12g", cautions: ["脾胃虚寒者忌用"], source: "《神农本草经》", category: "清热药-清热燥湿" },
  { id: "longdan", name: "龙胆", pinyin: "longdan", alias: ["龙胆草", "胆草"], nature: "苦，寒", meridians: ["肝", "胆"], functions: ["清热燥湿，泻肝胆火"], indications: ["湿热黄疸，阴肿阴痒，带下，湿疹瘙痒", "肝火头痛，目赤肿痛，耳聋耳鸣，胁痛口苦，强中，惊风抽搐"], dosage: "3-6g", cautions: ["脾胃虚寒者忌用", "阴虚津伤者慎用"], source: "《神农本草经》", category: "清热药-清热燥湿" },
  { id: "qinjiao", name: "秦艽", pinyin: "qinjiao", alias: ["秦糺", "秦爪"], nature: "辛、苦，平", meridians: ["胃", "肝", "胆"], functions: ["祛风湿，清湿热，止痹痛，退虚热"], indications: ["风湿痹痛，筋脉拘挛，骨节酸痛", "中风半身不遂", "湿热黄疸", "骨蒸潮热，小儿疳积发热"], dosage: "3-10g", cautions: [], source: "《神农本草经》", category: "清热药-清热燥湿" },
  { id: "baitaixian", name: "白鲜皮", pinyin: "baitaiyuan", alias: ["北鲜皮", "白膻"], nature: "苦，寒", meridians: ["脾", "胃", "膀胱"], functions: ["清热燥湿，祛风解毒"], indications: ["湿热疮毒，黄水淋漓，湿疹，风疹，疥癣疮癞，风湿热痹，黄疸尿赤"], dosage: "5-10g", cautions: ["脾胃虚寒者慎用"], source: "《神农本草经》", category: "清热药-清热燥湿" },
  { id: "kushen", name: "苦参", pinyin: "kushen", alias: ["地槐", "水槐"], nature: "苦，寒", meridians: ["心", "肝", "胃", "大肠", "膀胱"], functions: ["清热燥湿，杀虫止痒，利尿"], indications: ["湿热泻痢，便血，黄疸，赤白带下，阴肿阴痒，湿疹湿疮，皮肤瘙痒，疥癣麻风，滴虫性阴道炎，湿热淋痛，尿闭不通"], dosage: "4.5-9g", cautions: ["脾胃虚寒者忌用", "不宜与藜芦同用"], source: "《神农本草经》", category: "清热药-清热燥湿" },
  { id: "shengdihuang", name: "生地黄", pinyin: "shengdihuang", alias: ["干地黄", "原生地"], nature: "甘、苦，寒", meridians: ["心", "肝", "肾"], functions: ["清热凉血，养阴生津"], indications: ["热入营血，温毒发斑，吐血衄血，热病伤阴，舌绛烦渴，津伤便秘，阴虚发热，骨蒸劳热，内热消渴"], dosage: "10-15g", cautions: ["脾虚湿滞，腹满便溏者不宜使用"], source: "《神农本草经》", category: "清热药-清热凉血" },
  { id: "xuanshen", name: "玄参", pinyin: "xuanshen", alias: ["元参", "黑参"], nature: "甘、苦、咸，微寒", meridians: ["肺", "胃", "肾"], functions: ["清热凉血，滋阴降火，解毒散结"], indications: ["热入营血，温毒发斑，热病伤阴，舌绛烦渴，津伤便秘，骨蒸劳嗽，目赤，咽痛，白喉，瘰疬，痈肿疮毒"], dosage: "9-15g", cautions: ["脾胃虚寒，食少便溏者不宜服用", "不宜与藜芦同用"], source: "《神农本草经》", category: "清热药-清热凉血" },
  { id: "danpi", name: "牡丹皮", pinyin: "mudanpi", alias: ["丹皮", "粉丹皮"], nature: "苦、辛，微寒", meridians: ["心", "肝", "肾"], functions: ["清热凉血，活血化瘀"], indications: ["热入营血，温毒发斑，吐血衄血，夜热早凉，无汗骨蒸，经闭痛经，跌扑伤痛，痈肿疮毒"], dosage: "6-12g", cautions: ["血虚有寒，月经过多及孕妇不宜使用"], source: "《神农本草经》", category: "清热药-清热凉血" },
  { id: "chishaoyao", name: "赤芍", pinyin: "chishao", alias: ["赤芍药", "草芍药"], nature: "苦、微寒", meridians: ["肝经"], functions: ["清热凉血，散瘀止痛"], indications: ["热入营血，温毒发斑，吐血衄血，目赤肿痛，肝郁胁痛，经闭痛经，癥瘕腹痛，跌扑损伤，痈肿疮疡"], dosage: "6-12g", cautions: ["血寒经闭者不宜使用", "不宜与藜芦同用"], source: "《神农本草经》", category: "清热药-清热凉血" },
  { id: "zicao", name: "紫草", pinyin: "zicao", alias: ["紫丹", "紫草根"], nature: "甘、咸，寒", meridians: ["心", "肝"], functions: ["清热凉血，活血解毒，透疹消斑"], indications: ["血热毒盛，斑疹紫黑，麻疹不透，疮疡，湿疹，水火烫伤"], dosage: "5-10g", cautions: ["脾虚便溏者忌服"], source: "《神农本草经》", category: "清热药-清热凉血" },
  { id: "yinhua", name: "金银花", pinyin: "jinyinhua", alias: ["忍冬花", "双花"], nature: "甘，寒", meridians: ["肺", "心", "胃"], functions: ["清热解毒，疏散风热"], indications: ["痈肿疔疮，喉痹，丹毒，热毒血痢，风热感冒，温病发热"], dosage: "6-15g", cautions: ["脾胃虚寒及气虚疮疡脓清者忌用"], source: "《名医别录》", category: "清热药-清热解毒" },
  { id: "lianjiao", name: "连翘", pinyin: "lianqiao", alias: ["连壳", "落翘"], nature: "苦，微寒", meridians: ["肺", "心", "小肠"], functions: ["清热解毒，消肿散结，疏散风热"], indications: ["痈疽，瘰疬，乳痈，丹毒，风热感冒，温病初起，温热入营，高热烦渴，神昏发斑，热淋涩痛"], dosage: "6-15g", cautions: ["脾胃虚寒及气虚脓清者不宜用"], source: "《神农本草经》", category: "清热药-清热解毒" },
  { id: "pugongying", name: "蒲公英", pinyin: "pugongying", alias: ["黄花地丁", "婆婆丁"], nature: "苦、甘，寒", meridians: ["肝", "胃"], functions: ["清热解毒，消肿散结，利湿通淋"], indications: ["疔疮肿毒，乳痈，瘰疬，目赤，咽痛，肺痈，肠痈，湿热黄疸，热淋涩痛"], dosage: "10-15g", cautions: ["用量过大，可致缓泻"], source: "《新修本草》", category: "清热药-清热解毒" },
  { id: "zihuadiding", name: "紫花地丁", pinyin: "zihuadiding", alias: ["地丁", "铧头草"], nature: "苦、辛，寒", meridians: ["心", "肝"], functions: ["清热解毒，凉血消肿"], indications: ["疔疮肿毒，痈疽发背，丹毒，乳痈，肠痈，毒蛇咬伤"], dosage: "15-30g", cautions: ["体质虚寒者忌服"], source: "《本草纲目》", category: "清热药-清热解毒" },
  { id: "yexingju", name: "野菊花", pinyin: "yejuhua", alias: ["苦薏", "路边菊"], nature: "苦、辛，微寒", meridians: ["肝", "心"], functions: ["清热解毒，泻火平肝"], indications: ["疔疮痈肿，咽喉肿痛，目赤肿痛，头痛眩晕"], dosage: "9-15g", cautions: [], source: "《本草正》", category: "清热药-清热解毒" },
  { id: "banlangen", name: "板蓝根", pinyin: "banlangen", alias: ["靛青根", "蓝靛根"], nature: "苦，寒", meridians: ["心", "胃"], functions: ["清热解毒，凉血利咽"], indications: ["温疫时毒，发热咽痛，温毒发斑，痄腮，烂喉丹痧，大头瘟疫，丹毒，痈肿"], dosage: "9-15g", cautions: ["体虚而无实火热毒者忌服", "脾胃虚寒者慎用"], source: "《新修本草》", category: "清热药-清热解毒" },
  { id: "nangdaiqing", name: "青黛", pinyin: "qingdai", alias: ["靛花", "靛沫花"], nature: "咸，寒", meridians: ["肝", "肺"], functions: ["清热解毒，凉血消斑，泻火定惊"], indications: ["温毒发斑，血热吐衄，胸痛咳血，口疮，痄腮，喉痹，小儿惊痫"], dosage: "1-3g，宜入丸散用", cautions: ["胃寒者慎用"], source: "《药性论》", category: "清热药-清热解毒" },
  { id: "guanzhong", name: "贯众", pinyin: "guanzhong", alias: ["绵马贯众", "贯节"], nature: "苦，微寒；有小毒", meridians: ["肝", "胃"], functions: ["清热解毒，止血，杀虫"], indications: ["时疫感冒，风热头痛，温毒发斑，疮疡肿毒，崩漏下血，虫积腹痛"], dosage: "5-10g", cautions: ["脾胃虚寒者慎用", "孕妇慎用"], source: "《神农本草经》", category: "清热药-清热解毒" },
  { id: "yuxingcao", name: "鱼腥草", pinyin: "yuxingcao", alias: ["蕺菜", "臭菜"], nature: "辛，微寒", meridians: ["肺"], functions: ["清热解毒，消痈排脓，利尿通淋"], indications: ["肺痈吐脓，痰热喘咳，热痢，热淋，痈肿疮毒"], dosage: "15-25g", cautions: ["虚寒证及阴性疮疡忌服"], source: "《名医别录》", category: "清热药-清热解毒" },
  { id: "jiegucao", name: "金荞麦", pinyin: "jinqiaomai", alias: ["苦荞麦", "野荞麦"], nature: "微辛、涩，凉", meridians: ["肺"], functions: ["清热解毒，排脓祛瘀"], indications: ["肺痈吐脓，肺热喘咳，乳蛾肿痛"], dosage: "15-45g", cautions: [], source: "《新修本草》", category: "清热药-清热解毒" },
  { id: "hongteng", name: "大血藤", pinyin: "daxueteng", alias: ["红藤", "血通"], nature: "苦，平", meridians: ["大肠", "肝"], functions: ["清热解毒，活血，祛风止痛"], indications: ["肠痈腹痛，热毒疮疡，经闭，痛经，跌扑肿痛，风湿痹痛"], dosage: "9-15g", cautions: ["孕妇慎服"], source: "《本草纲目拾遗》", category: "清热药-清热解毒" },
  { id: "baishecao", name: "败酱草", pinyin: "baijiangcao", alias: ["黄花败酱", "黄花龙芽"], nature: "辛、苦，微寒", meridians: ["胃", "大肠", "肝"], functions: ["清热解毒，消痈排脓，祛瘀止痛"], indications: ["肠痈肺痈，痈肿疮毒，产后瘀阻腹痛"], dosage: "6-15g", cautions: ["脾胃虚弱，食少泄泻者忌服"], source: "《神农本草经》", category: "清热药-清热解毒" },
  { id: "shegan", name: "射干", pinyin: "shegan", alias: ["乌扇", "黄远"], nature: "苦，寒", meridians: ["肺"], functions: ["清热解毒，消痰，利咽"], indications: ["热毒痰火郁结，咽喉肿痛，痰涎壅盛，咳嗽气喘"], dosage: "3-9g", cautions: ["孕妇慎用"], source: "《神农本草经》", category: "清热药-清热解毒" },
  { id: "shandougen", name: "山豆根", pinyin: "shandougen", alias: ["广豆根", "苦豆根"], nature: "苦，寒；有毒", meridians: ["肺", "胃"], functions: ["清热解毒，消肿利咽"], indications: ["火毒蕴结，乳蛾喉痹，咽喉肿痛，齿龈肿痛，口舌生疮"], dosage: "3-6g", cautions: ["脾胃虚寒者慎用", "有毒，不宜过量服用"], source: "《开宝本草》", category: "清热药-清热解毒" },
  { id: "mabo", name: "马勃", pinyin: "mabo", alias: ["灰包", "马粪包"], nature: "辛，平", meridians: ["肺"], functions: ["清肺利咽，止血"], indications: ["风热郁肺咽痛，音哑，咳嗽，衄血，创伤出血"], dosage: "2-6g", cautions: ["风寒劳咳失音者忌用"], source: "《名医别录》", category: "清热药-清热解毒" },
  { id: "baiwei", name: "白薇", pinyin: "baiwei", alias: ["春草", "白幕"], nature: "苦、咸，寒", meridians: ["胃", "肝", "肾"], functions: ["清热凉血，利尿通淋，解毒疗疮"], indications: ["阴虚发热，骨蒸劳热，产后血虚发热，温邪伤营发热，热淋，血淋，痈疽肿毒，毒蛇咬伤"], dosage: "5-10g", cautions: ["脾胃虚寒者慎服"], source: "《神农本草经》", category: "清热药-清虚热" },
  { id: "digu", name: "地骨皮", pinyin: "digu", alias: ["杞根", "地节"], nature: "甘，寒", meridians: ["肺", "肝", "肾"], functions: ["凉血除蒸，清肺降火"], indications: ["阴虚潮热，骨蒸盗汗，肺热咳嗽，咯血，衄血，内热消渴"], dosage: "9-15g", cautions: ["外感风寒发热及脾虚便溏者不宜用"], source: "《神农本草经》", category: "清热药-清虚热" },
  { id: "yinchaihu", name: "银柴胡", pinyin: "yinchaihu", alias: ["银胡", "土参"], nature: "甘，微寒", meridians: ["肝", "胃"], functions: ["清虚热，除疳热"], indications: ["阴虚发热，骨蒸劳热，小儿疳热"], dosage: "3-10g", cautions: ["外感风寒，血虚无热者忌用"], source: "《本草纲目》", category: "清热药-清虚热" },
  { id: "huhuanglian", name: "胡黄连", pinyin: "huhuanglian", alias: ["割孤露泽", "胡连"], nature: "苦，寒", meridians: ["肝", "胃", "大肠"], functions: ["退虚热，除疳热，清湿热"], indications: ["骨蒸潮热，小儿疳热，湿热泻痢，黄疸尿赤，痔疮肿痛"], dosage: "3-10g", cautions: ["脾胃虚弱者慎用"], source: "《新修本草》", category: "清热药-清虚热" },
  
  // 泻下药
  { id: "dahuang", name: "大黄", pinyin: "dahuang", alias: ["将军", "锦纹"], nature: "苦，寒", meridians: ["脾", "胃", "大肠", "肝", "心包"], functions: ["泻下攻积，清热泻火，凉血解毒，逐瘀通经，利湿退黄"], indications: ["实热积滞便秘，血热吐衄，目赤咽肿，痈肿疔疮，肠痈腹痛，瘀血经闭，产后瘀阻，跌打损伤，湿热痢疾，黄疸尿赤，淋证，水肿，外治烧烫伤"], dosage: "3-15g，用于泻下不宜久煎", cautions: ["孕妇及月经期、哺乳期慎用"], source: "《神农本草经》", category: "泻下药-攻下药" },
  { id: "mangxiao", name: "芒硝", pinyin: "mangxiao", alias: ["朴硝", "皮硝"], nature: "咸、苦，寒", meridians: ["胃", "大肠"], functions: ["泻下通便，润燥软坚，清火消肿"], indications: ["实热积滞，腹满胀痛，大便燥结，肠痈肿痛，外治乳痈，痔疮肿痛"], dosage: "6-12g，一般不入煎剂，待汤剂煎得后，溶入汤液中服用", cautions: ["孕妇慎用", "不宜与硫黄、三棱同用"], source: "《神农本草经》", category: "泻下药-攻下药" },
  { id: "fanzixie", name: "番泻叶", pinyin: "fanxieye", alias: ["旃那叶", "泡竹叶"], nature: "甘、苦，寒", meridians: ["大肠"], functions: ["泻热行滞，通便，利水"], indications: ["热结积滞，便秘腹痛，水肿胀满"], dosage: "2-6g，后下，或开水泡服", cautions: ["孕妇慎用", "哺乳期、月经期慎用"], source: "《饮片新参》", category: "泻下药-攻下药" },
  { id: "luhui", name: "芦荟", pinyin: "luhui", alias: ["卢会", "讷会"], nature: "苦，寒", meridians: ["肝", "胃", "大肠"], functions: ["泻下通便，清肝泻火，杀虫疗疳"], indications: ["热结便秘，惊痫抽搐，小儿疳积，癣疮"], dosage: "2-5g，宜入丸散服", cautions: ["脾胃虚弱，食少便溏者及孕妇忌用"], source: "《药性论》", category: "泻下药-攻下药" },
  { id: "huoma", name: "火麻仁", pinyin: "huomaren", alias: ["麻子仁", "大麻仁"], nature: "甘，平", meridians: ["脾", "胃", "大肠"], functions: ["润肠通便"], indications: ["血虚津亏，肠燥便秘"], dosage: "10-15g", cautions: [], source: "《神农本草经》", category: "泻下药-润下药" },
  { id: "yuliren", name: "郁李仁", pinyin: "yuliren", alias: ["李仁", "郁子"], nature: "辛、苦、甘，平", meridians: ["脾", "大肠", "小肠"], functions: ["润肠通便，下气利水"], indications: ["津枯肠燥，食积气滞，腹胀便秘，水肿，脚气，小便不利"], dosage: "6-10g", cautions: ["孕妇慎用"], source: "《神农本草经》", category: "泻下药-润下药" },
  { id: "baiziren", name: "柏子仁", pinyin: "baiziren", alias: ["柏实", "柏子"], nature: "甘，平", meridians: ["心", "肾", "大肠"], functions: ["养心安神，润肠通便，止汗"], indications: ["阴血不足，虚烦失眠，心悸怔忡，肠燥便秘，阴虚盗汗"], dosage: "3-10g", cautions: ["便溏及痰多者慎服"], source: "《神农本草经》", category: "泻下药-润下药" },
  { id: "suizi", name: "松子仁", pinyin: "songziren", alias: ["海松子", "新罗松子"], nature: "甘，温", meridians: ["肺", "肝", "大肠"], functions: ["润肠通便，润肺止咳"], indications: ["肠燥便秘，肺燥干咳"], dosage: "10-15g", cautions: ["脾虚便溏，湿痰者禁用"], source: "《开宝本草》", category: "泻下药-润下药" },
  { id: "gansui", name: "甘遂", pinyin: "gansui", alias: ["甘藁", "主田"], nature: "苦，寒；有毒", meridians: ["肺", "肾", "大肠"], functions: ["泻水逐饮，消肿散结"], indications: ["水肿胀满，胸腹积水，痰饮积聚，气逆咳喘，二便不利，风痰癫痫，痈肿疮毒"], dosage: "0.5-1.5g，炮制后多入丸散用", cautions: ["孕妇禁用", "不宜与甘草同用"], source: "《神农本草经》", category: "泻下药-峻下逐水" },
  { id: "daji", name: "京大戟", pinyin: "jingdaji", alias: ["大戟", "龙虎草"], nature: "苦，寒；有毒", meridians: ["肺", "脾", "肾"], functions: ["泻水逐饮，消肿散结"], indications: ["水肿胀满，胸腹积水，痰饮积聚，气逆咳喘，二便不利，痈肿疮毒，瘰疬痰核"], dosage: "1.5-3g，入丸散服，每次1g", cautions: ["孕妇禁用", "不宜与甘草同用"], source: "《神农本草经》", category: "泻下药-峻下逐水" },
  { id: "yuanhua", name: "芫花", pinyin: "yuanhua", alias: ["去水", "杜芫"], nature: "苦、辛，温；有毒", meridians: ["肺", "脾", "肾"], functions: ["泻水逐饮，外用杀虫疗疮"], indications: ["水肿胀满，胸腹积水，痰饮积聚，气逆咳喘，二便不利，外治疥癣秃疮，痈肿，冻疮"], dosage: "1.5-3g。醋芫花研末吞服，一次0.6-0.9g，一日1次", cautions: ["孕妇禁用", "不宜与甘草同用"], source: "《神农本草经》", category: "泻下药-峻下逐水" },
  { id: "shanglu", name: "商陆", pinyin: "shanglu", alias: ["商六", "章陆"], nature: "苦，寒；有毒", meridians: ["肺", "脾", "肾", "大肠"], functions: ["逐水消肿，通利二便；外用解毒散结"], indications: ["水肿胀满，二便不通，外治痈肿疮毒"], dosage: "3-9g", cautions: ["孕妇禁用"], source: "《神农本草经》", category: "泻下药-峻下逐水" },
  { id: "qianniu", name: "牵牛子", pinyin: "qianniuzi", alias: ["黑丑", "白丑"], nature: "苦，寒；有毒", meridians: ["肺", "肾", "大肠"], functions: ["泻水通便，消痰涤饮，杀虫攻积"], indications: ["水肿胀满，二便不通，痰饮积聚，气逆喘咳，虫积腹痛"], dosage: "3-6g，入丸散服，每次1.5-3g", cautions: ["孕妇禁用", "不宜与巴豆、巴豆霜同用"], source: "《名医别录》", category: "泻下药-峻下逐水" },
  { id: "badou", name: "巴豆", pinyin: "badou", alias: ["巴菽", "刚子"], nature: "辛，热；有大毒", meridians: ["胃", "大肠经"], functions: ["外用蚀疮"], indications: ["恶疮疥癣，疣痣，白喉，疟疾，肠梗阻"], dosage: ["外用适量，研末涂患处，或捣烂以纱布包擦患处"], cautions: ["孕妇禁用", "不宜与牵牛子同用"], source: "《神农本草经》", category: "泻下药-峻下逐水" },
  
  // 祛风湿药
  { id: "duhuo", name: "独活", pinyin: "duhuo", alias: ["独摇草", "独滑"], nature: "辛、苦，微温", meridians: ["肾", "膀胱"], functions: ["祛风除湿，通痹止痛，解表"], indications: ["风寒湿痹，腰膝疼痛，少阴伏风头痛，风寒挟湿头痛"], dosage: "3-10g", cautions: [], source: "《神农本草经》", category: "祛风湿药-祛风湿散寒" },
  { id: "weilingxian", name: "威灵仙", pinyin: "weilingxian", alias: ["灵仙", "黑脚威灵仙"], nature: "辛、咸，温", meridians: ["膀胱"], functions: ["祛风湿，通经络，消骨鲠"], indications: ["风湿痹痛，肢体麻木，筋脉拘挛，屈伸不利，骨鲠咽喉"], dosage: "6-10g", cautions: [], source: "《新修本草》", category: "祛风湿药-祛风湿散寒" },
  { id: "chuanshan", name: "川乌", pinyin: "chuanwu", alias: ["乌头", "鹅儿花"], nature: "辛、苦，热；有大毒", meridians: ["心", "肝", "肾", "脾"], functions: ["祛风除湿，温经止痛"], indications: ["风寒湿痹，关节疼痛，心腹冷痛，寒疝作痛及麻醉止痛"], dosage: "一般炮制后用", cautions: ["生品内服宜慎", "孕妇禁用", "不宜与贝母类、半夏、白及、白蔹、天花粉、瓜蒌类同用"], source: "《神农本草经》", category: "祛风湿药-祛风湿散寒" },
  { id: "caowu", name: "草乌", pinyin: "caowu", alias: ["乌喙", "土附子"], nature: "辛、苦，热；有大毒", meridians: ["心", "肝", "肾", "脾"], functions: ["祛风除湿，温经止痛"], indications: ["风寒湿痹，关节疼痛，心腹冷痛，寒疝作痛及麻醉止痛"], dosage: ["一般炮制后用"], cautions: ["生品内服宜慎", "孕妇禁用", "不宜与贝母类、半夏、白及、白蔹、天花粉、瓜蒌类同用"], source: "《神农本草经》", category: "祛风湿药-祛风湿散寒" },
  { id: "xixian", name: "蕲蛇", pinyin: "qishe", alias: ["大白花蛇", "五步蛇"], nature: "甘、咸，温；有毒", meridians: ["肝经"], functions: ["祛风，通络，止痉"], indications: ["风湿顽痹，麻木拘挛，中风口眼㖞斜，半身不遂，抽搐痉挛，破伤风，麻风疥癣"], dosage: "3-9g，研末吞服，一次1-1.5g，一日2-3次", cautions: ["阴虚内热者忌服"], source: "《雷公炮炙论》", category: "祛风湿药-祛风湿散寒" },
  { id: "wugong", name: "乌梢蛇", pinyin: "wushaoshe", alias: ["乌蛇", "青蛇"], nature: "甘，平", meridians: ["肝经"], functions: ["祛风，通络，止痉"], indications: ["风湿顽痹，麻木拘挛，中风口眼㖞斜，半身不遂，抽搐痉挛，破伤风，麻风疥癣，瘰疬恶疮"], dosage: "6-12g，研末吞服，一次1-1.5g，一日2-3次", cautions: [], source: "《药性论》", category: "祛风湿药-祛风湿散寒" },
  { id: "mugua", name: "木瓜", pinyin: "mugua", alias: ["贴梗海棠", "皱皮木瓜"], nature: "酸，温", meridians: ["肝", "脾"], functions: ["舒筋活络，和胃化湿"], indications: ["湿痹拘挛，腰膝关节酸重疼痛，暑湿吐泻，转筋挛痛，脚气水肿"], dosage: "6-9g", cautions: [], source: "《名医别录》", category: "祛风湿药-祛风湿散寒" },
  { id: "cansha", name: "蚕沙", pinyin: "cansha", alias: ["原蚕沙", "晚蚕沙"], nature: "甘、辛，温", meridians: ["肝", "脾", "胃"], functions: ["祛风除湿，和胃化湿"], indications: ["风湿痹痛，肢体不遂，风疹瘙痒，吐泻转筋，闭经，崩漏"], dosage: "5-15g，宜布包煎", cautions: [], source: "《名医别录》", category: "祛风湿药-祛风湿散寒" },
  { id: "shenjincao", name: "伸筋草", pinyin: "shenjincao", alias: ["石松", "狮子草"], nature: "微苦、辛，温", meridians: ["肝", "脾", "肾"], functions: ["祛风除湿，舒筋活络"], indications: ["关节酸痛，屈伸不利"], dosage: "3-12g", cautions: ["孕妇慎用"], source: "《本草拾遗》", category: "祛风湿药-祛风湿散寒" },
  { id: "xungufeng", name: "寻骨风", pinyin: "xungufeng", alias: ["毛风草", "白毛藤"], nature: "辛、苦，平", meridians: ["肝"], functions: ["祛风除湿，通络止痛"], indications: ["风湿痹痛，肢体麻木，跌打损伤"], dosage: "9-15g", cautions: [], source: "《植物名实图考》", category: "祛风湿药-祛风湿散寒" },
  { id: "sangzhi", name: "桑枝", pinyin: "sangzhi", alias: ["桑条"], nature: "微苦，平", meridians: ["肝经"], functions: ["祛风湿，利关节"], indications: ["风湿痹痛，肩臂、关节酸痛麻木"], dosage: "9-15g", cautions: [], source: "《本草图经》", category: "祛风湿药-祛风湿清热" },
  { id: "xiguan", name: "豨莶草", pinyin: "xixiancao", alias: ["猪膏草", "粘糊菜"], nature: "辛、苦，寒", meridians: ["肝", "肾"], functions: ["祛风湿，利关节，解毒"], indications: ["风湿痹痛，筋骨无力，腰膝酸软，四肢麻痹，半身不遂，风疹湿疮"], dosage: "9-12g", cautions: [], source: "《新修本草》", category: "祛风湿药-祛风湿清热" },
  { id: "chouwu", name: "臭梧桐", pinyin: "chouwutong", alias: ["海州常山", "矮桐子"], nature: "辛、苦、甘，凉", meridians: ["肝经"], functions: ["祛风湿，通经络，平肝"], indications: ["风湿痹痛，半身不遂，风疹湿疮，头痛眩晕"], dosage: "5-15g", cautions: [], source: "《本草图经》", category: "祛风湿药-祛风湿清热" },
  { id: "haifengteng", name: "海桐皮", pinyin: "haitongpi", alias: ["刺桐", "山芙蓉"], nature: "苦、辛，平", meridians: ["肝", "肾"], functions: ["祛风湿，通络止痛，杀虫止痒"], indications: ["风湿痹痛，四肢拘挛，腰膝酸痛，疥癣，湿疹"], dosage: "5-15g", cautions: [], source: "《海药本草》", category: "祛风湿药-祛风湿清热" },
  { id: "luoshiteng", name: "络石藤", pinyin: "luoshiteng", alias: ["白花藤", "络石草"], nature: "苦，微寒", meridians: ["心", "肝", "肾"], functions: ["祛风通络，凉血消肿"], indications: ["风湿热痹，筋脉拘挛，腰膝酸痛，喉痹，痈肿，跌扑损伤"], dosage: "6-12g", cautions: [], source: "《神农本草经》", category: "祛风湿药-祛风湿清热" },
  { id: "sangjisheng", name: "桑寄生", pinyin: "sangjisheng", alias: ["桑上寄生", "寄生"], nature: "苦、甘，平", meridians: ["肝", "肾"], functions: ["祛风湿，补肝肾，强筋骨，安胎元"], indications: ["风湿痹痛，腰膝酸软，筋骨无力，崩漏经多，妊娠漏血，胎动不安，头晕目眩"], dosage: "9-15g", cautions: [], source: "《神农本草经》", category: "祛风湿药-祛风湿强筋骨" },
  { id: "dushuo", name: "五加皮", pinyin: "wujiapi", alias: ["南五加皮", "五加"], nature: "辛、苦，温", meridians: ["肝", "肾"], functions: ["祛风除湿，补益肝肾，强筋壮骨，利水消肿"], indications: ["风湿痹病，筋骨痿软，小儿行迟，体虚乏力，水肿，脚气"], dosage: "5-10g", cautions: [], source: "《神农本草经》", category: "祛风湿药-祛风湿强筋骨" },
  { id: "gouji", name: "狗脊", pinyin: "gouji", alias: ["金毛狗脊", "金狗脊"], nature: "苦、甘，温", meridians: ["肝", "肾"], functions: ["祛风湿，补肝肾，强腰膝"], indications: ["风湿痹痛，腰膝酸软，下肢无力，遗尿，尿频，带下过多"], dosage: "6-12g", cautions: ["肾虚有热，小便不利，或短涩黄赤者慎服"], source: "《神农本草经》", category: "祛风湿药-祛风湿强筋骨" },
  { id: "qiannian", name: "千年健", pinyin: "qiannianjian", alias: ["一包针", "千年见"], nature: "苦、辛，温", meridians: ["肝", "肾"], functions: ["祛风湿，壮筋骨"], indications: ["风寒湿痹，腰膝冷痛，下肢拘挛麻木"], dosage: "5-10g", cautions: [], source: "《本草纲目拾遗》", category: "祛风湿药-祛风湿强筋骨" },
  { id: "xuefeng", name: "雪莲花", pinyin: "xuelianhua", alias: ["雪莲", "雪荷花"], nature: "甘、微苦，温", meridians: ["肝", "肾"], functions: ["祛风湿，强筋骨，补肾阳，调经止血"], indications: ["风湿痹证，阳痿，月经不调，经闭痛经，崩漏带下"], dosage: "6-12g", cautions: ["孕妇忌服"], source: "《本草纲目拾遗》", category: "祛风湿药-祛风湿强筋骨" },
  
  // 化湿药
  { id: "huoxiang", name: "广藿香", pinyin: "guanghuoxiang", alias: ["藿香", "枝香"], nature: "辛，微温", meridians: ["脾", "胃", "肺"], functions: ["芳香化浊，和中止呕，发表解暑"], indications: ["湿浊中阻，脘痞呕吐，暑湿表证，湿温初起，发热倦怠，胸闷不舒，寒湿闭暑，腹痛吐泻，鼻渊头痛"], dosage: "3-10g", cautions: [], source: "《名医别录》", category: "化湿药" },
  { id: "peilan", name: "佩兰", pinyin: "peilan", alias: ["兰草", "大泽兰"], nature: "辛，平", meridians: ["脾", "胃", "肺"], functions: ["芳香化湿，醒脾开胃，发表解暑"], indications: ["湿浊中阻，脘痞呕恶，口中甜腻，口臭，多涎，暑湿表证，湿温初起，发热倦怠，胸闷不舒"], dosage: "3-10g", cautions: [], source: "《神农本草经》", category: "化湿药" },
  { id: "cangzhu", name: "苍术", pinyin: "cangzhu", alias: ["赤术", "仙术"], nature: "辛、苦，温", meridians: ["脾", "胃", "肝经"], functions: ["燥湿健脾，祛风散寒，明目"], indications: ["湿阻中焦，脘腹胀满，泄泻，水肿，脚气痿躄，风湿痹痛，风寒感冒，夜盲，眼目昏涩"], dosage: "3-9g", cautions: ["阴虚内热、气虚多汗者忌用"], source: "《神农本草经》", category: "化湿药" },
  { id: "houpo", name: "厚朴", pinyin: "houpo", alias: ["重皮", "赤朴"], nature: "苦、辛，温", meridians: ["脾", "胃", "肺", "大肠"], functions: ["燥湿消痰，下气除满"], indications: ["湿滞伤中，脘痞吐泻，食积气滞，腹胀便秘，痰饮喘咳"], dosage: "3-10g", cautions: ["孕妇慎用"], source: "《神农本草经》", category: "化湿药" },
  { id: "sharen", name: "砂仁", pinyin: "sharen", alias: ["缩砂仁", "缩砂"], nature: "辛，温", meridians: ["脾", "胃", "肾"], functions: ["化湿开胃，温脾止泻，理气安胎"], indications: ["湿浊中阻，脘痞不饥，脾胃虚寒，呕吐泄泻，妊娠恶阻，胎动不安"], dosage: "3-6g，后下", cautions: ["阴虚血燥者慎用"], source: "《药性论》", category: "化湿药" },
  { id: "doukou", name: "豆蔻", pinyin: "doukou", alias: ["白豆蔻", "圆豆蔻"], nature: "辛，温", meridians: ["肺", "脾", "胃"], functions: ["化湿行气，温中止呕，开胃消食"], indications: ["湿浊中阻，不思饮食，湿温初起，胸闷不饥，寒湿呕逆，胸腹胀痛，食积不消"], dosage: "3-6g，后下", cautions: ["阴虚血燥者慎用"], source: "《开宝本草》", category: "化湿药" },
  { id: "caodoukou", name: "草豆蔻", pinyin: "caodoukou", alias: ["草蔻", "草蔻仁"], nature: "辛，温", meridians: ["脾", "胃"], functions: ["燥湿行气，温中止呕"], indications: ["寒湿内阻，脘腹胀满冷痛，嗳气呕逆，不思饮食"], dosage: "3-6g", cautions: ["阴虚血燥者慎用"], source: "《雷公炮炙论》", category: "化湿药" },
  { id: "caoguo", name: "草果", pinyin: "caoguo", alias: ["草果仁", "草果子"], nature: "辛，温", meridians: ["脾", "胃"], functions: ["燥湿温中，截疟除痰"], indications: ["寒湿内阻，脘腹胀痛，痞满呕吐，疟疾寒热，瘟疫发热"], dosage: "3-6g", cautions: ["阴虚血燥者慎用"], source: "《饮膳正要》", category: "化湿药" },
  
  // 利水渗湿药
  { id: "fuling", name: "茯苓", pinyin: "fuling", alias: ["云苓", "茯菟"], nature: "甘、淡，平", meridians: ["心", "肺", "脾", "肾"], functions: ["利水渗湿，健脾，宁心"], indications: ["水肿尿少，痰饮眩悸，脾虚食少，便溏泄泻，心神不安，惊悸失眠"], dosage: "10-15g", cautions: [], source: "《神农本草经》", category: "利水渗湿药-利水消肿" },
  { id: "zhuling", name: "猪苓", pinyin: "zhuling", alias: ["野猪粪", "猪屎苓"], nature: "甘、淡，平", meridians: ["肾", "膀胱"], functions: ["利水渗湿"], indications: ["小便不利，水肿，泄泻，淋浊，带下"], dosage: "6-12g", cautions: [], source: "《神农本草经》", category: "利水渗湿药-利水消肿" },
  { id: "zexie", name: "泽泻", pinyin: "zexie", alias: ["水泻", "泽芝"], nature: "甘、淡，寒", meridians: ["肾", "膀胱"], functions: ["利水渗湿，泄热，化浊降脂"], indications: ["小便不利，水肿胀满，泄泻尿少，痰饮眩晕，热淋涩痛，高脂血症"], dosage: "6-10g", cautions: [], source: "《神农本草经》", category: "利水渗湿药-利水消肿" },
  { id: "yiyiren", name: "薏苡仁", pinyin: "yiyiren", alias: ["薏米", "苡仁"], nature: "甘、淡，凉", meridians: ["脾", "胃", "肺"], functions: ["利水渗湿，健脾止泻，除痹，排脓