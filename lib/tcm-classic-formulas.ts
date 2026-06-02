// 经方数据库
// 基于《伤寒论》《金匮要略》及倪海厦等经方家临床经验

export interface ClassicFormula {
  id: string
  name: string
  origin: string  // 出处
  category: string // 分类
  composition: string[] // 组成
  dosage: string[] // 剂量（现代常用量）
  indications: string[] // 主治
  symptoms: string[] // 适应症状
  tongue: string // 舌象
  pulse: string // 脉象
  functions: string[] // 功效
  analysis: string[] // 方解
  contraindications: string[] // 禁忌
  modifications: { condition: string; modification: string }[] // 加减法
  physicianNotes?: string[] // 医家备注（倪海厦等）
}

// 经方分类
export const FORMULA_CATEGORIES = {
  解表剂: {
    辛温解表: ["麻黄汤", "桂枝汤", "葛根汤", "小青龙汤", "大青龙汤"],
    辛凉解表: ["银翘散", "桑菊饮", "麻杏石甘汤", "柴葛解肌汤"],
    扶正解表: ["败毒散", "参苏饮", "再造散"]
  },
  和解剂: {
    和解少阳: ["小柴胡汤", "大柴胡汤", "柴胡桂枝汤", "蒿芩清胆汤"],
   调和肝脾: ["四逆散", "逍遥散", "痛泻要方"],
   调和肠胃: ["半夏泻心汤", "生姜泻心汤", "甘草泻心汤"]
  },
  泻下剂: {
    寒下: ["大承气汤", "小承气汤", "调胃承气汤", "增液承气汤"],
    温下: ["温脾汤", "大黄附子汤"],
    润下: ["麻子仁丸", "济川煎"],
    逐水: ["十枣汤", "舟车丸"]
  },
  清热剂: {
    清气分热: ["白虎汤", "竹叶石膏汤"],
    清营凉血: ["清营汤", "犀角地黄汤"],
    清热解毒: ["黄连解毒汤", "普济消毒饮", "仙方活命饮"],
    清脏腑热: ["导赤散", "龙胆泻肝汤", "左金丸", "泻白散", "清胃散", "玉女煎", "葛根芩连汤", "芍药汤", "白头翁汤"],
    清虚热: ["青蒿鳖甲汤", "清骨散", "当归六黄汤"]
  },
  温里剂: {
    温中祛寒: ["理中丸", "附子理中丸", "小建中汤", "大建中汤", "吴茱萸汤"],
    回阳救逆: ["四逆汤", "参附汤", "回阳救急汤"],
    温经散寒: ["当归四逆汤", "黄芪桂枝五物汤", "阳和汤"]
  },
  补益剂: {
    补气: ["四君子汤", "参苓白术散", "补中益气汤", "玉屏风散", "生脉散"],
    补血: ["四物汤", "当归补血汤", "归脾汤", "炙甘草汤"],
    气血双补: ["八珍汤", "十全大补汤", "人参养荣汤"],
    补阴: ["六味地黄丸", "左归丸", "大补阴丸", "一贯煎", "百合固金汤", "益胃汤"],
    补阳: ["肾气丸", "右归丸", "二仙汤"],
    阴阳双补: ["地黄饮子", "龟鹿二仙胶"]
  },
  固涩剂: {
    固表止汗: ["玉屏风散", "牡蛎散"],
    敛肺止咳: ["九仙散"],
    涩肠止泻: ["真人养脏汤", "四神丸", "桃花汤", "驻车丸"],
    涩精止遗: ["金锁固精丸", "桑螵蛸散", "缩泉丸"],
    固崩止带: ["固冲汤", "固经丸", "完带汤", "易黄汤"]
  },
  安神剂: {
    重镇安神: ["朱砂安神丸", "磁朱丸", "珍珠母丸"],
    滋养安神: ["酸枣仁汤", "天王补心丹", "甘麦大枣汤"]
  },
  理气剂: {
    行气: ["越鞠丸", "柴胡疏肝散", "四磨汤", "五磨饮子", "瓜蒌薤白白酒汤", "半夏厚朴汤", "厚朴温中汤", "天台乌药散", "暖肝煎"],
    降气: ["苏子降气汤", "定喘汤", "旋覆代赭汤", "橘皮竹茹汤"]
  },
  理血剂: {
    活血祛瘀: ["桃核承气汤", "血府逐瘀汤", "补阳还五汤", "复元活血汤", "温经汤", "生化汤", "失笑散", "桂枝茯苓丸", "鳖甲煎丸"],
    止血: ["十灰散", "四生丸", "咳血方", "小蓟饮子", "槐花散", "黄土汤"]
  },
  治风剂: {
    疏散外风: ["川芎茶调散", "大秦艽汤", "小续命汤", "牵正散", "玉真散", "消风散"],
    平息内风: ["羚角钩藤汤", "镇肝熄风汤", "天麻钩藤饮", "大定风珠", "阿胶鸡子黄汤"]
  },
  祛湿剂: {
    燥湿和胃: ["平胃散", "藿香正气散"],
    清热祛湿: ["茵陈蒿汤", "八正散", "三仁汤", "甘露消毒丹", "二妙散", "三妙丸", "四妙丸", "利水渗湿", "五苓散", "猪苓汤", "防己黄芪汤", "泽泻汤"],
    温化水湿: ["苓桂术甘汤", "真武汤", "实脾散", "萆薢分清饮"],
    祛风胜湿: ["羌活胜湿汤", "独活寄生汤"]
  },
  祛痰剂: {
    燥湿化痰: ["二陈汤", "温胆汤", "茯苓丸"],
    清热化痰: ["清气化痰丸", "小陷胸汤", "滚痰丸", "贝母瓜蒌散"],
    润燥化痰: ["贝母瓜蒌散"],
    温化寒痰: ["苓甘五味姜辛汤", "三子养亲汤"],
    化痰熄风: ["半夏白术天麻汤", "定痫丸"]
  },
  消食剂: {
    消食化滞: ["保和丸", "枳实导滞丸", "木香槟榔丸"],
    健脾消食: ["健脾丸", "枳实消痞丸", "葛花解酲汤"]
  },
  驱虫剂: {
    驱虫: ["乌梅丸", "化虫丸", "伐木丸", "布袋丸", "肥儿丸"]
  },
  涌吐剂: {
    涌吐: ["瓜蒂散", "盐汤探吐方", "救急稀涎散"]
  }
}

// 经方详情
export const CLASSIC_FORMULAS: Record<string, ClassicFormula> = {
  麻黄汤: {
    id: "mahuang_tang",
    name: "麻黄汤",
    origin: "《伤寒论》",
    category: "解表剂",
    composition: ["麻黄", "桂枝", "杏仁", "炙甘草"],
    dosage: ["麻黄9g", "桂枝9g", "杏仁9g", "炙甘草3g"],
    indications: ["外感风寒表实证", "恶寒发热", "头痛身疼", "无汗而喘"],
    symptoms: ["恶寒发热", "头痛", "身痛", "腰痛", "骨节疼痛", "无汗", "气喘", "脉浮紧"],
    tongue: "舌苔薄白",
    pulse: "浮紧",
    functions: ["发汗解表", "宣肺平喘"],
    analysis: ["麻黄发汗解表，宣肺平喘为君", "桂枝解肌发表，温通经脉为臣", "杏仁降利肺气，助麻黄平喘为佐", "甘草调和诸药为使"],
    contraindications: ["表虚自汗", "外感风热", "体虚外感", "产后血虚"],
    modifications: [
      { condition: "喘急痰多", modification: "加苏子、半夏" },
      { condition: "鼻塞流涕", modification: "加苍耳子、辛夷" },
      { condition: "湿困身重", modification: "加薏苡仁、苍术" }
    ],
    physicianNotes: [
      "倪海厦：麻黄汤是解表发汗的峻剂，使用时必须确认是无汗的表实证",
      "倪海厦：服用麻黄汤后要喝热稀粥助发汗，但不可大汗出"
    ]
  },
  桂枝汤: {
    id: "guizhi_tang",
    name: "桂枝汤",
    origin: "《伤寒论》",
    category: "解表剂",
    composition: ["桂枝", "白芍", "生姜", "大枣", "炙甘草"],
    dosage: ["桂枝9g", "白芍9g", "生姜9g", "大枣3枚", "炙甘草6g"],
    indications: ["外感风寒表虚证", "恶寒发热", "汗出恶风", "鼻鸣干呕"],
    symptoms: ["头痛发热", "汗出恶风", "鼻鸣干呕", "脉浮缓"],
    tongue: "舌苔薄白",
    pulse: "浮缓",
    functions: ["解肌发表", "调和营卫"],
    analysis: ["桂枝解肌发表为君", "白芍益阴敛汗为臣", "生姜散寒止呕为佐", "大枣健脾和胃为使", "甘草调和诸药"],
    contraindications: ["表实无汗", "湿热内盛", "阴虚发热"],
    modifications: [
      { condition: "汗出不止", modification: "加附子、龙骨、牡蛎" },
      { condition: "兼喘", modification: "加厚朴、杏仁" },
      { condition: "项背强几几", modification: "加葛根" }
    ],
    physicianNotes: [
      "倪海厦：桂枝汤是调和营卫的基础方，用于汗出恶风的表虚证",
      "倪海厦：服桂枝汤后要喝热稀粥助药力，覆被取微汗"
    ]
  },
  小柴胡汤: {
    id: "xiaochaihu_tang",
    name: "小柴胡汤",
    origin: "《伤寒论》",
    category: "和解剂",
    composition: ["柴胡", "黄芩", "人参", "半夏", "炙甘草", "生姜", "大枣"],
    dosage: ["柴胡12g", "黄芩9g", "人参9g", "半夏9g", "炙甘草6g", "生姜9g", "大枣3枚"],
    indications: ["少阳证", "胸胁苦满", "默默不欲饮食", "心烦喜呕"],
    symptoms: ["寒热往来", "胸胁苦满", "默默不欲饮食", "心烦喜呕", "口苦咽干目眩", "脉弦"],
    tongue: "舌苔薄白或薄黄",
    pulse: "弦",
    functions: ["和解少阳", "疏肝和胃"],
    analysis: ["柴胡透散少阳之邪为君", "黄芩清泄少阳之热为臣", "人参、半夏、生姜、大枣和胃降逆为佐", "甘草调和诸药为使"],
    contraindications: ["阴虚内热", "热入血室"],
    modifications: [
      { condition: "胸中烦而不呕", modification: "去半夏、人参，加瓜蒌" },
      { condition: "渴", modification: "去半夏，加天花粉" },
      { condition: "寒热往来，发热不退", modification: "加石膏、知母" }
    ],
    physicianNotes: [
      "倪海厦：小柴胡汤是治疗少阳病的主方，用于口苦、咽干、目眩、寒热往来",
      "倪海厦：妇人热入血室可用小柴胡汤治疗"
    ]
  },
  四君子汤: {
    id: "sijunzi_tang",
    name: "四君子汤",
    origin: "《太平惠民和剂局方》",
    category: "补益剂",
    composition: ["人参", "白术", "茯苓", "炙甘草"],
    dosage: ["人参12g", "白术9g", "茯苓9g", "炙甘草6g"],
    indications: ["脾胃气虚证", "面色萎白", "语声低微", "气短乏力"],
    symptoms: ["面色萎白", "语声低微", "气短乏力", "食少便溏", "舌淡苔白", "脉虚弱"],
    tongue: "舌淡苔白",
    pulse: "虚弱",
    functions: ["益气健脾"],
    analysis: ["人参大补元气为君", "白术健脾燥湿为臣", "茯苓健脾渗湿为佐", "甘草调和诸药为使"],
    contraindications: ["实热内盛", "阴虚火旺"],
    modifications: [
      { condition: "泄泻", modification: "加扁豆、莲子肉" },
      { condition: "痰湿", modification: "加陈皮、半夏" },
      { condition: "食少腹胀", modification: "加木香、砂仁" }
    ],
    physicianNotes: [
      "倪海厦：四君子汤是补气的基础方，用于脾胃气虚的一切病证",
      "倪海厦：四君子汤合四物汤即为八珍汤，气血双补"
    ]
  },
  四物汤: {
    id: "siwu_tang",
    name: "四物汤",
    origin: "《太平惠民和剂局方》",
    category: "补益剂",
    composition: ["熟地黄", "当归", "白芍", "川芎"],
    dosage: ["熟地黄12g", "当归10g", "白芍12g", "川芎8g"],
    indications: ["营血虚滞证", "头晕心悸", "面色无华", "月经不调"],
    symptoms: ["头晕心悸", "面色无华", "唇甲色淡", "月经不调", "经量少", "腹痛", "脉细弦或细涩"],
    tongue: "舌淡苔白",
    pulse: "细弦或细涩",
    functions: ["补血调经", "活血止痛"],
    analysis: ["熟地滋阴补血为君", "当归补血活血为臣", "白芍养血柔肝为佐", "川芎活血行气为使"],
    contraindications: ["脾胃阳虚", "湿盛纳呆", "月经过多"],
    modifications: [
      { condition: "血热", modification: "熟地改生地，加丹皮、黄芩" },
      { condition: "血瘀", modification: "加重当归、川芎用量" },
      { condition: "气虚", modification: "加人参、黄芪" }
    ],
    physicianNotes: [
      "倪海厦：四物汤是补血的基础方，用于一切血虚证",
      "倪海厦：妇人调经必用四物汤为基础"
    ]
  },
  逍遥散: {
    id: "xiaoyao_san",
    name: "逍遥散",
    origin: "《太平惠民和剂局方》",
    category: "和解剂",
    composition: ["柴胡", "当归", "白芍", "白术", "茯苓", "炙甘草", "薄荷", "生姜"],
    dosage: ["柴胡9g", "当归9g", "白芍9g", "白术9g", "茯苓9g", "炙甘草6g", "薄荷3g", "生姜3片"],
    indications: ["肝郁血虚脾弱证", "两胁作痛", "头痛目眩", "月经不调"],
    symptoms: ["两胁作痛", "头痛目眩", "神疲食少", "月经不调", "乳房胀痛", "脉弦而虚"],
    tongue: "舌淡苔薄",
    pulse: "弦而虚",
    functions: ["疏肝解郁", "养血健脾"],
    analysis: ["柴胡疏肝解郁为君", "当归、白芍养血柔肝为臣", "白术、茯苓、甘草健脾祛湿为佐", "薄荷、生姜助柴胡疏泄为使"],
    contraindications: ["阴虚内热", "实热内盛"],
    modifications: [
      { condition: "肝郁化热", modification: "加丹皮、栀子（丹栀逍遥散）" },
      { condition: "血虚甚", modification: "加熟地（黑逍遥散）" },
      { condition: "肝郁气滞", modification: "加香附、郁金" }
    ],
    physicianNotes: [
      "倪海厦：逍遥散是治疗肝郁血虚脾弱的主方，用于妇人诸疾",
      "倪海厦：加丹皮栀子后为丹栀逍遥散，用于肝郁化热"
    ]
  },
  六味地黄丸: {
    id: "liuwei_dihuang_wan",
    name: "六味地黄丸",
    origin: "《小儿药证直诀》",
    category: "补益剂",
    composition: ["熟地黄", "山茱萸", "山药", "泽泻", "茯苓", "丹皮"],
    dosage: ["熟地黄24g", "山茱萸12g", "山药12g", "泽泻9g", "茯苓9g", "丹皮9g"],
    indications: ["肾阴虚证", "腰膝酸软", "头晕目眩", "耳鸣耳聋"],
    symptoms: ["腰膝酸软", "头晕目眩", "耳鸣耳聋", "盗汗遗精", "消渴", "骨蒸潮热", "舌红少苔", "脉沉细数"],
    tongue: "舌红少苔",
    pulse: "沉细数",
    functions: ["滋阴补肾"],
    analysis: ["熟地滋阴补肾为君", "山茱萸、山药补肝脾肾为臣", "泽泻、茯苓、丹皮泻浊利湿为佐"],
    contraindications: ["脾虚泄泻", "阳虚内寒", "感冒发热"],
    modifications: [
      { condition: "阴虚火旺", modification: "加知母、黄柏（知柏地黄丸）" },
      { condition: "肺肾阴虚", modification: "加麦冬、五味子（麦味地黄丸）" },
      { condition: "目昏干涩", modification: "加枸杞子、菊花（杞菊地黄丸）" }
    ],
    physicianNotes: [
      "倪海厦：六味地黄丸是滋补肾阴的基础方，用于一切肾阴虚证",
      "倪海厦：现代人肾阴虚多见，与熬夜、压力大有关"
    ]
  },
  肾气丸: {
    id: "shenqi_wan",
    name: "肾气丸（金匮肾气丸）",
    origin: "《金匮要略》",
    category: "补益剂",
    composition: ["附子", "桂枝", "熟地黄", "山茱萸", "山药", "泽泻", "茯苓", "丹皮"],
    dosage: ["附子3g", "桂枝3g", "熟地黄24g", "山茱萸12g", "山药12g", "泽泻9g", "茯苓9g", "丹皮9g"],
    indications: ["肾阳虚证", "腰痛脚软", "小便不利", "痰饮消渴"],
    symptoms: ["腰痛脚软", "小便不利或反多", "夜尿多", "阳痿早泄", "痰饮", "消渴", "舌淡胖苔白", "脉沉弱"],
    tongue: "舌淡胖苔白",
    pulse: "沉弱",
    functions: ["温补肾阳"],
    analysis: ["附子、桂枝温补肾阳为君", "熟地黄滋阴补肾为臣", "山茱萸、山药补肝脾为佐", "泽泻、茯苓、丹皮泻浊利湿为使"],
    contraindications: ["阴虚内热", "实热证", "感冒发热"],
    modifications: [
      { condition: "阳痿", modification: "加淫羊藿、巴戟天" },
      { condition: "水肿", modification: "加重茯苓、泽泻用量" },
      { condition: "喘咳", modification: "加补骨脂、五味子" }
    ],
    physicianNotes: [
      "倪海厦：肾气丸是温补肾阳的主方，用于肾阳虚的一切病证",
      "倪海厦：现代人多肾阴阳两虚，可与六味地黄丸交替使用"
    ]
  },
  补中益气汤: {
    id: "buzhong_yiqi_tang",
    name: "补中益气汤",
    origin: "《脾胃论》",
    category: "补益剂",
    composition: ["黄芪", "人参", "白术", "炙甘草", "当归", "陈皮", "升麻", "柴胡"],
    dosage: ["黄芪18g", "人参6g", "白术9g", "炙甘草9g", "当归3g", "陈皮9g", "升麻6g", "柴胡6g"],
    indications: ["脾胃气虚证", "中气下陷证", "气虚发热证"],
    symptoms: ["体倦乏力", "食少便溏", "久泻久痢", "脱肛", "子宫脱垂", "胃下垂", "发热自汗", "脉洪而虚"],
    tongue: "舌淡苔白",
    pulse: "洪而虚",
    functions: ["补中益气", "升阳举陷"],
    analysis: ["黄芪补中益气为君", "人参、白术、炙甘草健脾益气为臣", "当归养血，陈皮理气为佐", "升麻、柴胡升阳举陷为使"],
    contraindications: ["阴虚发热", "实热内盛", "高血压患者慎用"],
    modifications: [
      { condition: "久泻脱肛", modification: "加枳壳、五味子" },
      { condition: "子宫脱垂", modification: "加艾叶、阿胶" },
      { condition: "气虚外感", modification: "加苏叶、葛根" }
    ],
    physicianNotes: [
      "倪海厦：补中益气汤用于中气下陷的一切病证，如脱肛、子宫脱垂、胃下垂",
      "倪海厦：此方升提之力强，高血压患者慎用"
    ]
  },
  血府逐瘀汤: {
    id: "xuefu_zuyu_tang",
    name: "血府逐瘀汤",
    origin: "《医林改错》",
    category: "理血剂",
    composition: ["桃仁", "红花", "当归", "生地黄", "川芎", "赤芍", "牛膝", "桔梗", "柴胡", "枳壳", "甘草"],
    dosage: ["桃仁12g", "红花9g", "当归9g", "生地黄9g", "川芎6g", "赤芍6g", "牛膝9g", "桔梗5g", "柴胡3g", "枳壳6g", "甘草3g"],
    indications: ["胸中血瘀证", "胸痛头痛", "心悸失眠", "内热烦闷"],
    symptoms: ["胸痛头痛", "痛如针刺", "心悸失眠", "急躁易怒", "内热烦闷", "呃逆干呕", "舌暗红或有瘀斑", "脉涩"],
    tongue: "舌暗红或有瘀斑",
    pulse: "涩",
    functions: ["活血祛瘀", "行气止痛"],
    analysis: ["桃仁、红花活血祛瘀为君", "当归、川芎、赤芍、牛膝助君药活血为臣", "生地黄清热凉血为佐", "柴胡、枳壳、桔梗、甘草行气宽胸为使"],
    contraindications: ["孕妇忌用", "月经过多", "出血性疾病"],
    modifications: [
      { condition: "胁痛", modification: "加郁金、香附" },
      { condition: "头痛", modification: "加天麻、钩藤" },
      { condition: "失眠", modification: "加酸枣仁、茯神" }
    ],
    physicianNotes: [
      "倪海厦：血府逐瘀汤是活血化瘀的代表方，用于一切瘀血证",
      "倪海厦：妇人月经不调、痛经常用此方化裁"
    ]
  },
  温胆汤: {
    id: "wendan_tang",
    name: "温胆汤",
    origin: "《三因极一病证方论》",
    category: "祛痰剂",
    composition: ["半夏", "竹茹", "枳实", "陈皮", "茯苓", "甘草", "生姜", "大枣"],
    dosage: ["半夏6g", "竹茹6g", "枳实6g", "陈皮9g", "茯苓5g", "甘草3g", "生姜5片", "大枣1枚"],
    indications: ["胆郁痰扰证", "胆怯易惊", "虚烦不眠", "眩晕呕吐"],
    symptoms: ["胆怯易惊", "虚烦不眠", "心悸不安", "眩晕呕吐", "癫痫", "舌苔白腻", "脉弦滑"],
    tongue: "舌苔白腻",
    pulse: "弦滑",
    functions: ["理气化痰", "清胆和胃"],
    analysis: ["半夏、竹茹化痰清热为君", "陈皮、枳实理气降逆为臣", "茯苓、生姜、大枣健脾祛湿为佐", "甘草调和诸药为使"],
    contraindications: ["阴虚内热", "燥痰", "孕妇慎用"],
    modifications: [
      { condition: "痰热内扰", modification: "加黄连（黄连温胆汤）" },
      { condition: "虚烦不眠", modification: "加酸枣仁、五味子" },
      { condition: "眩晕", modification: "加天麻、钩藤" }
    ],
    physicianNotes: [
      "倪海厦：温胆汤用于胆郁痰扰的一切病证，如失眠、眩晕、癫痫",
      "倪海厦：加黄连后清热化痰之力更强，用于痰热内扰"
    ]
  },
  柴胡桂枝汤: {
    id: "chaihu_guizhi_tang",
    name: "柴胡桂枝汤",
    origin: "《伤寒论》",
    category: "和解剂",
    composition: ["柴胡", "黄芩", "人参", "半夏", "桂枝", "白芍", "炙甘草", "大枣", "生姜"],
    dosage: ["柴胡12g", "黄芩4.5g", "人参4.5g", "半夏6g", "桂枝4.5g", "白芍4.5g", "炙甘草3g", "大枣3枚", "生姜3片"],
    indications: ["太阳少阳合病", "发热微恶寒", "肢节烦疼", "微呕心下支结"],
    symptoms: ["发热微恶寒", "肢节烦疼", "微呕心下支结", "胸胁苦满", "食欲不振", "脉弦"],
    tongue: "舌苔薄白",
    pulse: "弦",
    functions: ["和解少阳", "解表散邪"],
    analysis: ["小柴胡汤和解少阳为君", "桂枝汤解肌发表为臣", "二方合用太少双解"],
    contraindications: ["阴虚内热", "热入血室"],
    modifications: [
      { condition: "往来寒热", modification: "加青蒿、草果" },
      { condition: "胸胁苦满", modification: "加郁金、香附" },
      { condition: "食欲不振", modification: "加神曲、山楂" }
    ],
    physicianNotes: [
      "倪海厦：柴胡桂枝汤用于太阳少阳合病，既有表证又有少阳证",
      "倪海厦：此方应用广泛，可用于感冒后食欲不振、疲劳综合征"
    ]
  }
}

// 常用药物功效
export const HERB_PROPERTIES: Record<string, { nature: string; flavor: string; meridian: string; functions: string[] }> = {
  麻黄: { nature: "温", flavor: "辛、微苦", meridian: "肺、膀胱", functions: ["发汗解表", "宣肺平喘", "利水消肿"] },
  桂枝: { nature: "温", flavor: "辛、甘", meridian: "肺、心、膀胱", functions: ["发汗解肌", "温通经脉", "助阳化气"] },
  白芍: { nature: "微寒", flavor: "苦、酸", meridian: "肝、脾", functions: ["养血敛阴", "柔肝止痛", "平抑肝阳"] },
  当归: { nature: "温", flavor: "甘、辛", meridian: "肝、心、脾", functions: ["补血活血", "调经止痛", "润肠通便"] },
  柴胡: { nature: "微寒", flavor: "苦、辛", meridian: "肝、胆", functions: ["疏散退热", "疏肝解郁", "升举阳气"] },
  黄芪: { nature: "微温", flavor: "甘", meridian: "脾、肺", functions: ["补气升阳", "益卫固表", "利水消肿"] },
  人参: { nature: "平", flavor: "甘、微苦", meridian: "脾、肺、心", functions: ["大补元气", "复脉固脱", "补脾益肺", "生津养血"] },
  附子: { nature: "热", flavor: "辛、甘", meridian: "心、肾、脾", functions: ["回阳救逆", "补火助阳", "散寒止痛"] },
  地黄: { nature: "寒", flavor: "甘、苦", meridian: "心、肝、肾", functions: ["清热凉血", "养阴生津"] },
  半夏: { nature: "温", flavor: "辛", meridian: "脾、胃、肺", functions: ["燥湿化痰", "降逆止呕", "消痞散结"] },
}

// 医家流派
export const PHYSICIAN_SCHOOLS = {
  经方派: {
    name: "经方派",
    description: "以《伤寒论》《金匮要略》为基础，强调辨证论治，用药精炼",
    representatives: ["张仲景", "倪海厦", "胡希恕", "刘渡舟"],
   特点: ["药简力宏", "辨证精确", "重视阳气", "强调扶正"]
  },
  温病派: {
    name: "温病派",
    description: "以温病学说为核心，注重清热养阴，用药轻灵",
    representatives: ["叶天士", "吴鞠通", "王孟英", "薛生白"],
    特点: ["卫气营血辨证", "用药轻清", "重视养阴", "强调透邪"]
  },
  火神派: {
    name: "火神派",
    description: "以温阳扶正为特色，擅长用附子、肉桂等温热药",
    representatives: ["郑钦安", "吴佩衡", "祝味菊", "李可"],
    特点: ["重视阳气", "擅用温药", "附子为将", "强调扶阳"]
  }
}

// 获取方剂详情
export function getFormulaDetail(formulaName: string): ClassicFormula | undefined {
  return CLASSIC_FORMULAS[formulaName]
}

// 搜索方剂
export function searchFormulas(keyword: string): string[] {
  const results: string[] = []
  Object.entries(CLASSIC_FORMULAS).forEach(([key, formula]) => {
    if (key.includes(keyword) || formula.name.includes(keyword)) {
      results.push(key)
    }
  })
  return results
}
