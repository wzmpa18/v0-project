// 经方数据库扩展版
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
  physicianNotes?: PhysicianNote[] // 医家备注
}

export interface PhysicianNote {
  physician: string
  notes: string[]
}

// 经方分类
export const FORMULA_CATEGORIES = {
  解表剂: {
    辛温解表: ["麻黄汤", "桂枝汤", "葛根汤", "小青龙汤", "大青龙汤", "九味羌活汤", "香苏散"],
    辛凉解表: ["银翘散", "桑菊饮", "麻杏石甘汤", "柴葛解肌汤", "升麻葛根汤", "竹叶柳蒡汤"],
    扶正解表: ["败毒散", "参苏饮", "再造散", "麻黄附子细辛汤", "加减葳蕤汤"]
  },
  和解剂: {
    和解少阳: ["小柴胡汤", "大柴胡汤", "柴胡桂枝汤", "蒿芩清胆汤", "柴胡达原饮"],
    调和肝脾: ["四逆散", "逍遥散", "痛泻要方", "当归芍药散"],
    调和肠胃: ["半夏泻心汤", "生姜泻心汤", "甘草泻心汤", "黄连汤"]
  },
  泻下剂: {
    寒下: ["大承气汤", "小承气汤", "调胃承气汤", "增液承气汤", "黄龙汤", "新加黄龙汤"],
    温下: ["温脾汤", "大黄附子汤", "三物备急丸", "紫金丹"],
    润下: ["麻子仁丸", "济川煎", "五仁丸", "更衣丸"],
    逐水: ["十枣汤", "舟车丸", "控涎丹", "禹功散", "己椒苈黄丸"]
  },
  清热剂: {
    清气分热: ["白虎汤", "竹叶石膏汤", "白虎加人参汤", "白虎加桂枝汤"],
    清营凉血: ["清营汤", "犀角地黄汤", "清宫汤", "犀地连翘汤"],
    清热解毒: ["黄连解毒汤", "普济消毒饮", "仙方活命饮", "五味消毒饮", "四妙勇安汤", "牛黄解毒丸"],
    清脏腑热: ["导赤散", "龙胆泻肝汤", "左金丸", "泻白散", "清胃散", "玉女煎", "葛根芩连汤", "芍药汤", "白头翁汤", "香连丸", "苇茎汤"],
    清虚热: ["青蒿鳖甲汤", "清骨散", "当归六黄汤", "秦艽鳖甲散"]
  },
  温里剂: {
    温中祛寒: ["理中丸", "附子理中丸", "小建中汤", "大建中汤", "吴茱萸汤", "温牌散"],
    回阳救逆: ["四逆汤", "参附汤", "回阳救急汤", "真武汤", "附子汤", "茯苓四逆汤"],
    温经散寒: ["当归四逆汤", "黄芪桂枝五物汤", "阳和汤", "暖肝煎", "天台乌药散"]
  },
  补益剂: {
    补气: ["四君子汤", "参苓白术散", "补中益气汤", "玉屏风散", "生脉散", "人参蛤蚧散", "补肺汤"],
    补血: ["四物汤", "当归补血汤", "归脾汤", "炙甘草汤", "当归生姜羊肉汤"],
    气血双补: ["八珍汤", "十全大补汤", "人参养荣汤", "泰山磐石散", "保元汤"],
    补阴: ["六味地黄丸", "左归丸", "大补阴丸", "一贯煎", "百合固金汤", "益胃汤", "补心丹", "石斛夜光丸", "龟鹿二仙胶"],
    补阳: ["肾气丸", "右归丸", "二仙汤", "内补鹿茸丸", "赞育丹"],
    阴阳双补: ["地黄饮子", "龟鹿二仙胶", "还少丹", "斑龙丸"]
  },
  固涩剂: {
    固表止汗: ["玉屏风散", "牡蛎散", "当归六黄汤", "浮小麦汤"],
    敛肺止咳: ["九仙散", "人参固本丸", "补肺汤"],
    涩肠止泻: ["真人养脏汤", "四神丸", "桃花汤", "驻车丸", "诃子散", "无比山药丸"],
    涩精止遗: ["金锁固精丸", "桑螵蛸散", "缩泉丸", "萆薢分清饮", "水陆二仙丹"],
    固崩止带: ["固冲汤", "固经丸", "完带汤", "易黄汤", "清带汤", "龙牡固精丸"]
  },
  安神剂: {
    重镇安神: ["朱砂安神丸", "磁朱丸", "珍珠母丸", "生铁落饮", "桂枝甘草龙骨牡蛎汤"],
    滋养安神: ["酸枣仁汤", "天王补心丹", "甘麦大枣汤", "归脾汤", "黄连阿胶汤"]
  },
  理气剂: {
    行气: ["越鞠丸", "柴胡疏肝散", "四磨汤", "五磨饮子", "瓜蒌薤白白酒汤", "半夏厚朴汤", "厚朴温中汤", "天台乌药散", "暖肝煎", "导气汤", "金铃子散", "天台乌药散"],
    降气: ["苏子降气汤", "定喘汤", "旋覆代赭汤", "橘皮竹茹汤", "丁香柿蒂汤", "大半夏汤"]
  },
  理血剂: {
    活血祛瘀: ["桃核承气汤", "血府逐瘀汤", "补阳还五汤", "复元活血汤", "温经汤", "生化汤", "失笑散", "桂枝茯苓丸", "鳖甲煎丸", "下瘀血汤", "大黄蛰虫丸", "活络效灵丹", "七厘散"],
    止血: ["十灰散", "四生丸", "咳血方", "小蓟饮子", "槐花散", "黄土汤", "胶艾汤", "柏叶汤"]
  },
  治风剂: {
    疏散外风: ["川芎茶调散", "大秦艽汤", "小续命汤", "牵正散", "玉真散", "消风散", "当归饮子", "沙参麦冬汤"],
    平息内风: ["羚角钩藤汤", "镇肝熄风汤", "天麻钩藤饮", "大定风珠", "阿胶鸡子黄汤", "三甲复脉汤", "地黄饮子"]
  },
  祛湿剂: {
    燥湿和胃: ["平胃散", "藿香正气散", "六和汤", "不换金正气散"],
    清热祛湿: ["茵陈蒿汤", "八正散", "三仁汤", "甘露消毒丹", "二妙散", "三妙丸", "四妙丸", "宣痹汤", "藿朴夏苓汤", "黄芩滑石汤", "木防己汤"],
    利水渗湿: ["五苓散", "猪苓汤", "防己黄芪汤", "泽泻汤", "茯苓皮汤", "五皮散"],
    温化水湿: ["苓桂术甘汤", "真武汤", "实脾散", "萆薢分清饮", "茯苓导水汤"],
    祛风胜湿: ["羌活胜湿汤", "独活寄生汤", "羌活续断汤", "舒筋汤"]
  },
  祛痰剂: {
    燥湿化痰: ["二陈汤", "温胆汤", "茯苓丸", "导痰汤", "涤痰汤", "金水六君煎"],
    清热化痰: ["清气化痰丸", "小陷胸汤", "滚痰丸", "贝母瓜蒌散", "柴胡陷胸汤", "礞石滚痰丸"],
    润燥化痰: ["贝母瓜蒌散", "沙参麦冬汤", "二母散"],
    温化寒痰: ["苓甘五味姜辛汤", "三子养亲汤", "冷哮丸", "控涎丹"],
    化痰熄风: ["半夏白术天麻汤", "定痫丸", "茯苓丸", "涤痰汤"]
  },
  消食剂: {
    消食化滞: ["保和丸", "枳实导滞丸", "木香槟榔丸", "枳实消痞丸", "葛花解酲汤", "大山楂丸"],
    健脾消食: ["健脾丸", "枳术丸", "曲蘖枳术丸", "橘半枳术丸", "香砂枳术丸"]
  },
  驱虫剂: {
    驱虫: ["乌梅丸", "化虫丸", "伐木丸", "布袋丸", "肥儿丸", "理中安蛔汤", "连梅安蛔汤"]
  },
  涌吐剂: {
    涌吐: ["瓜蒂散", "盐汤探吐方", "救急稀涎散", "三圣散"]
  },
  治疡剂: {
    治阳证: ["仙方活命饮", "五味消毒饮", "银花解毒汤", "牛黄解毒丸", "金黄散", "如意金黄散"],
    治阴证: ["阳和汤", "中和汤", "小金丹", "皂角刺汤"],
    治痔疮: ["槐角丸", "地榆丸", "脏连丸", "苦参汤"]
  }
}

// 完整经方数据库 - 包含更多方剂和医家论述
export const CLASSIC_FORMULAS_EXTENDED: Record<string, ClassicFormula> = {
  // ==================== 解表剂 ====================
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
    contraindications: ["表虚自汗", "外感风热", "体虚外感", "产后血虚", "高血压患者慎用"],
    modifications: [
      { condition: "喘急痰多", modification: "加苏子、半夏" },
      { condition: "鼻塞流涕", modification: "加苍耳子、辛夷" },
      { condition: "湿困身重", modification: "加薏苡仁、苍术" },
      { condition: "咽喉肿痛", modification: "加射干、桔梗" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "麻黄汤是解表发汗的峻剂，使用时必须确认是无汗的表实证",
        "服用麻黄汤后要喝热稀粥助发汗，但不可大汗出",
        "麻黄开表，桂枝解肌，杏仁降逆，甘草和中"
      ]},
      { physician: "胡希恕", notes: [
        "麻黄汤是发汗解表的代表方",
        "用于无汗的太阳表实证"
      ]},
      { physician: "刘渡舟", notes: [
        "麻黄汤证必无汗，有汗禁用"
      ]}
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
    contraindications: ["表实无汗", "湿热内盛", "阴虚发热", "疮疡已溃"],
    modifications: [
      { condition: "汗出不止", modification: "加附子、龙骨、牡蛎" },
      { condition: "兼喘", modification: "加厚朴、杏仁" },
      { condition: "项背强几几", modification: "加葛根" },
      { condition: "素体虚弱", modification: "加黄芪" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "桂枝汤是调和营卫的基础方，用于汗出恶风的表虚证",
        "服桂枝汤后要喝热稀粥助药力，覆被取微汗",
        "桂枝汤是万方之祖，调和阴阳第一方"
      ]},
      { physician: "曹颖甫", notes: [
        "桂枝汤证以汗出恶风为主症"
      ]},
      { physician: "胡希恕", notes: [
        "桂枝汤不只治外感，内伤虚劳也可用"
      ]}
    ]
  },
  小青龙汤: {
    id: "xiao_qinglong_tang",
    name: "小青龙汤",
    origin: "《伤寒论》",
    category: "解表剂",
    composition: ["麻黄", "桂枝", "白芍", "干姜", "细辛", "半夏", "五味子", "炙甘草"],
    dosage: ["麻黄9g", "桂枝9g", "白芍9g", "干姜9g", "细辛3g", "半夏9g", "五味子6g", "炙甘草6g"],
    indications: ["外寒内饮证", "恶寒发热", "无汗", "咳嗽气喘", "痰多清稀"],
    symptoms: ["恶寒发热", "无汗", "咳嗽", "气喘", "痰多清稀", "胸痞", "干呕", "脉浮紧"],
    tongue: "舌苔白滑",
    pulse: "浮紧或弦紧",
    functions: ["解表散寒", "温肺化饮"],
    analysis: ["麻黄、桂枝发汗解表为君", "干姜、细辛温肺化饮为臣", "半夏燥湿化痰，五味子敛肺止咳为佐", "白芍益阴，甘草调和诸药为使"],
    contraindications: ["阴虚干咳", "肺热咳喘", "风热表证"],
    modifications: [
      { condition: "表寒重", modification: "重用麻黄、桂枝" },
      { condition: "里饮重", modification: "重用干姜、细辛" },
      { condition: "咳喘重", modification: "加杏仁、苏子" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "小青龙汤治外寒内饮，痰多清稀如水",
        "服用小青龙汤后可能汗出，勿再发汗"
      ]},
      { physician: "胡希恕", notes: [
        "小青龙汤是治外寒内饮的常用方"
      ]}
    ]
  },
  大青龙汤: {
    id: "da_qinglong_tang",
    name: "大青龙汤",
    origin: "《伤寒论》",
    category: "解表剂",
    composition: ["麻黄", "桂枝", "杏仁", "石膏", "生姜", "大枣", "炙甘草"],
    dosage: ["麻黄12g", "桂枝6g", "杏仁6g", "石膏30g", "生姜9g", "大枣3枚", "炙甘草6g"],
    indications: ["外感风寒，内有郁热", "恶寒发热", "无汗烦躁", "脉浮紧"],
    symptoms: ["恶寒发热", "无汗", "身疼痛", "烦躁不安", "脉浮紧"],
    tongue: "舌苔薄白或微黄",
    pulse: "浮紧",
    functions: ["发汗解表", "清热除烦"],
    analysis: ["麻黄发汗解表为君", "桂枝助麻黄加强发汗为臣", "石膏清透内热为佐", "杏仁、生姜、大枣和中调营为使"],
    contraindications: ["表虚自汗", "阴虚血少", "脉微弱者", "年老体弱者"],
    modifications: [
      { condition: "兼有咳嗽", modification: "加桔梗、前胡" },
      { condition: "烦躁明显", modification: "加重石膏用量" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "大青龙汤比小青龙汤发汗力更强，用于表实兼有内热",
        "服用后可能大汗出，要特别注意"
      ]}
    ]
  },
  葛根汤: {
    id: "gegen_tang",
    name: "葛根汤",
    origin: "《伤寒论》",
    category: "解表剂",
    composition: ["葛根", "麻黄", "桂枝", "白芍", "生姜", "大枣", "炙甘草"],
    dosage: ["葛根12g", "麻黄9g", "桂枝6g", "白芍6g", "生姜9g", "大枣3枚", "炙甘草6g"],
    indications: ["太阳病，项背强几几", "无汗恶风", "下利"],
    symptoms: ["项背强几几", "恶寒发热", "无汗", "下利", "脉浮紧"],
    tongue: "舌苔薄白",
    pulse: "浮紧",
    functions: ["发汗解表", "升津舒筋"],
    analysis: ["葛根升津舒筋为君", "麻黄、桂枝发汗解表为臣", "白芍益阴舒筋为佐", "生姜、大枣、甘草和中调营为使"],
    contraindications: ["表虚汗出", "阴虚火旺", "上盛下虚"],
    modifications: [
      { condition: "兼咳喘", modification: "加厚朴、杏仁" },
      { condition: "兼口渴", modification: "加天花粉、芦根" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "葛根汤用于项背强直，颈椎病、肩周炎常用",
        "葛根能升津液，润筋脉"
      ]},
      { physician: "胡希恕", notes: [
        "葛根汤治太阳病项背强几几，无汗恶风"
      ]}
    ]
  },
  柴葛解肌汤: {
    id: "chaige_jiejie_tang",
    name: "柴葛解肌汤",
    origin: "《伤寒六书》",
    category: "解表剂",
    composition: ["柴胡", "葛根", "黄芩", "羌活", "白芷", "白芍", "桔梗", "石膏", "甘草"],
    dosage: ["柴胡6g", "葛根9g", "黄芩9g", "羌活6g", "白芷6g", "白芍6g", "桔梗3g", "石膏15g", "甘草3g"],
    indications: ["感冒风寒，郁而化热", "恶寒渐轻", "身热增重", "头痛肢楚"],
    symptoms: ["恶寒渐轻", "身热增重", "头痛", "眼眶痛", "鼻干", "心烦", "脉浮洪"],
    tongue: "舌苔薄白或薄黄",
    pulse: "浮洪",
    functions: ["解肌清热"],
    analysis: ["柴胡、葛根解肌清热为君", "黄芩、石膏清泄里热为臣", "羌活、白芷解表散寒为佐", "桔梗、甘草利咽调和为使"],
    contraindications: ["表虚自汗", "阴虚内热", "孕妇慎用"],
    modifications: [
      { condition: "无汗恶寒", modification: "去黄芩，加麻黄" },
      { condition: "热盛伤津", modification: "加天花粉、芦根" }
    ],
    physicianNotes: [
      { physician: "陶华", notes: [
        "柴葛解肌汤解肌清热，用于三阳合病"
      ]}
    ]
  },

  // ==================== 和解剂 ====================
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
    contraindications: ["阴虚内热", "热入血室", "孕妇"],
    modifications: [
      { condition: "胸中烦而不呕", modification: "去半夏、人参，加瓜蒌" },
      { condition: "渴", modification: "去半夏，加天花粉" },
      { condition: "寒热往来，发热不退", modification: "加石膏、知母" },
      { condition: "腹中痛", modification: "去黄芩，加白芍" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "小柴胡汤是治疗少阳病的主方，用于口苦、咽干、目眩、寒热往来",
        "妇人热入血室可用小柴胡汤治疗",
        "小柴胡汤可以治疗肝胆疾病、情志疾病"
      ]},
      { physician: "胡希恕", notes: [
        "小柴胡汤是和解少阳的代表方",
        "用于半表半里证"
      ]},
      { physician: "刘渡舟", notes: [
        "小柴胡汤临床应用广泛，可用于多种疾病"
      ]}
    ]
  },
  大柴胡汤: {
    id: "dachaihu_tang",
    name: "大柴胡汤",
    origin: "《伤寒论》",
    category: "和解剂",
    composition: ["柴胡", "黄芩", "白芍", "半夏", "生姜", "枳实", "大枣", "大黄"],
    dosage: ["柴胡12g", "黄芩9g", "白芍9g", "半夏9g", "生姜15g", "枳实6g", "大枣3枚", "大黄6g"],
    indications: ["少阳阳明合病", "往来寒热", "胸胁苦满", "呕不止", "心下痞硬"],
    symptoms: ["往来寒热", "胸胁苦满", "郁郁微烦", "呕不止", "心下痞硬", "便秘或下利", "脉弦数"],
    tongue: "舌苔黄",
    pulse: "弦数",
    functions: ["和解少阳", "内泻热结"],
    analysis: ["柴胡、黄芩和解少阳为君", "大黄、枳实内泻热结为臣", "白芍、半夏、生姜和胃止呕为佐", "大枣调和诸药为使"],
    contraindications: ["阴虚内热", "孕妇", "年老体弱"],
    modifications: [
      { condition: "兼黄疸", modification: "加茵陈、栀子" },
      { condition: "胁痛重", modification: "加延胡索、川楝子" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "大柴胡汤用于少阳阳明合病，有便秘用大柴胡",
        "急性胆囊炎、胰腺炎常用大柴胡汤"
      ]}
    ]
  },
  四逆散: {
    id: "sini_san",
    name: "四逆散",
    origin: "《伤寒论》",
    category: "和解剂",
    composition: ["柴胡", "白芍", "枳实", "炙甘草"],
    dosage: ["柴胡9g", "白芍9g", "枳实9g", "炙甘草6g"],
    indications: ["阳郁厥逆证", "手足不温", "脘腹疼痛", "泄利下重"],
    symptoms: ["手足不温", "胸胁脘腹疼痛", "泄利下重", "脉弦"],
    tongue: "舌苔薄白或薄黄",
    pulse: "弦",
    functions: ["透邪解郁", "疏肝理脾"],
    analysis: ["柴胡疏肝解郁为君", "白芍柔肝止痛为臣", "枳实理气导滞为佐", "甘草调和诸药为使"],
    contraindications: ["阴虚内热", "孕妇慎用"],
    modifications: [
      { condition: "咳", modification: "加五味子、干姜" },
      { condition: "小便不利", modification: "加茯苓" },
      { condition: "心悸", modification: "加桂枝" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "四逆散治阳气内郁的四肢不温",
        "用于肝郁气滞的各种痛证"
      ]}
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
      { physician: "倪海厦", notes: [
        "逍遥散是治疗肝郁血虚脾弱的主方，用于妇人诸疾",
        "加丹皮栀子后为丹栀逍遥散，用于肝郁化热"
      ]},
      { physician: "叶天士", notes: [
        "逍遥散治肝郁血虚，妇人杂病多由此起"
      ]}
    ]
  },

  // ==================== 泻下剂 ====================
  大承气汤: {
    id: "da_chengqi_tang",
    name: "大承气汤",
    origin: "《伤寒论》",
    category: "泻下剂",
    composition: ["大黄", "芒硝", "枳实", "厚朴"],
    dosage: ["大黄12g", "芒硝9g", "枳实12g", "厚朴24g"],
    indications: ["阳明腑实证", "热结旁流证", "里热实证之热厥、痉病或发狂"],
    symptoms: ["大便秘结", "脘腹痞满", "腹痛拒按", "潮热谵语", "手足濈然汗出", "脉沉实"],
    tongue: "舌苔黄燥起刺",
    pulse: "沉实",
    functions: ["峻下热结"],
    analysis: ["大黄泻热通便，荡涤肠胃为君", "芒硝软坚润燥为臣", "枳实、厚朴行气散结，消痞除满为佐使"],
    contraindications: ["孕妇", "年老体弱", "阴虚内热", "寒实内结"],
    modifications: [
      { condition: "燥结甚", modification: "加重大黄、芒硝" },
      { condition: "痞满重", modification: "加重大黄、厚朴" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "大承气汤是泻下峻剂，用于阳明腑实证",
        "必有便秘腹痛拒按，舌苔黄燥",
        "用后便通即停，不可久服"
      ]},
      { physician: "张从正", notes: [
        "大承气汤治热结旁流，真知灼见"
      ]}
    ]
  },
  小承气汤: {
    id: "xiao_chengqi_tang",
    name: "小承气汤",
    origin: "《伤寒论》",
    category: "泻下剂",
    composition: ["大黄", "厚朴", "枳实"],
    dosage: ["大黄12g", "厚朴6g", "枳实9g"],
    indications: ["阳明腑实证", "谵语", "潮热", "大便秘结", "胸腹痞满"],
    symptoms: ["大便不通", "谵语", "潮热", "胸腹痞满", "脉滑而疾"],
    tongue: "舌苔黄",
    pulse: "滑而疾",
    functions: ["轻下热结"],
    analysis: ["大黄泻热通便为君", "厚朴、枳实行气除满为臣佐"],
    contraindications: ["孕妇", "年老体弱", "阴虚内热"],
    modifications: [
      { condition: "已汗已下", modification: "去厚朴，加甘草" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "小承气汤比大承气汤缓和，用于痞满重而燥结轻"
      ]}
    ]
  },
  麻子仁丸: {
    id: "mazi_ren_wan",
    name: "麻子仁丸（脾约丸）",
    origin: "《伤寒论》",
    category: "泻下剂",
    composition: ["麻子仁", "白芍", "枳实", "大黄", "厚朴", "杏仁"],
    dosage: ["麻子仁20g", "白芍9g", "枳实9g", "大黄12g", "厚朴9g", "杏仁10g"],
    indications: ["脾约证", "肠胃燥热", "大便秘结", "小便数"],
    symptoms: ["大便秘结", "小便频数", "舌苔微黄", "脉细涩"],
    tongue: "舌苔微黄",
    pulse: "细涩",
    functions: ["润肠泻热", "行气通便"],
    analysis: ["麻子仁润肠通便为君", "大黄、白芍泻热养阴为臣", "枳实、厚朴行气除满为佐", "杏仁润肺降气为使"],
    contraindications: ["孕妇", "血虚津亏便秘"],
    modifications: [
      { condition: "兼血虚", modification: "加当归、生地" },
      { condition: "兼气虚", modification: "加人参、黄芪" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "麻子仁丸润肠通便，用于老年性便秘、产后便秘"
      ]}
    ]
  },

  // ==================== 清热剂 ====================
  白虎汤: {
    id: "baihu_tang",
    name: "白虎汤",
    origin: "《伤寒论》",
    category: "清热剂",
    composition: ["石膏", "知母", "甘草", "粳米"],
    dosage: ["石膏30g", "知母9g", "甘草3g", "粳米9g"],
    indications: ["气分热盛证", "壮热", "烦渴引饮", "汗出恶热", "脉洪大"],
    symptoms: ["壮热", "烦渴引饮", "汗出恶热", "面红", "脉洪大"],
    tongue: "舌红苔黄燥",
    pulse: "洪大",
    functions: ["清热生津"],
    analysis: ["石膏大寒清热为君", "知母清热生津为臣", "甘草、粳米护胃和中为佐使"],
    contraindications: ["表证未解", "阴虚内热", "孕妇", "脉浮紧或沉细"],
    modifications: [
      { condition: "气虚", modification: "加人参（白虎加人参汤）" },
      { condition: "温疟", modification: "加桂枝（白虎加桂枝汤）" },
      { condition: "湿温", modification: "加苍术（白虎加苍术汤）" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "白虎汤用于阳明气分热盛，必有高热、大渴、脉洪大",
        "白虎汤四大证：身大热、口大渴、汗大出、脉洪大"
      ]}
    ]
  },
  黄连解毒汤: {
    id: "huanglian_jiedu_tang",
    name: "黄连解毒汤",
    origin: "《外台秘要》",
    category: "清热剂",
    composition: ["黄连", "黄芩", "黄柏", "栀子"],
    dosage: ["黄连9g", "黄芩6g", "黄柏6g", "栀子9g"],
    indications: ["三焦火毒热盛证", "大热烦躁", "口燥咽干", "舌红苔黄", "脉数有力"],
    symptoms: ["大热烦躁", "口燥咽干", "错语不眠", "吐衄发斑", "痈肿疔毒", "舌红苔黄", "脉数有力"],
    tongue: "舌红苔黄",
    pulse: "数有力",
    functions: ["泻火解毒"],
    analysis: ["黄连泻心火、中焦火为君", "黄芩泻上焦火为臣", "黄柏泻下焦火为佐", "栀子通泻三焦为使"],
    contraindications: ["阴虚火旺", "脾胃虚寒", "孕妇"],
    modifications: [
      { condition: "吐血衄血", modification: "加生地、丹皮" },
      { condition: "发斑", modification: "加玄参、知母" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "黄连解毒汤泻火解毒，用于一切火毒证",
        "可用于急性炎症、热性病"
      ]}
    ]
  },
  龙胆泻肝汤: {
    id: "longdan_xiegan_tang",
    name: "龙胆泻肝汤",
    origin: "《医方集解》",
    category: "清热剂",
    composition: ["龙胆草", "黄芩", "栀子", "泽泻", "木通", "车前子", "当归", "生地", "柴胡", "甘草"],
    dosage: ["龙胆草6g", "黄芩9g", "栀子9g", "泽泻12g", "木通6g", "车前子9g", "当归9g", "生地9g", "柴胡6g", "甘草6g"],
    indications: ["肝胆实火上炎证", "肝胆湿热下注证"],
    symptoms: ["头痛目赤", "胁痛口苦", "耳聋耳肿", "或阴肿阴痒", "小便淋浊", "女子带下", "舌红苔黄", "脉弦数"],
    tongue: "舌红苔黄",
    pulse: "弦数",
    functions: ["泻肝胆实火", "清下焦湿热"],
    analysis: ["龙胆草大苦大寒，泻肝胆实火为君", "黄芩、栀子助龙胆草清热为臣", "泽泻、木通、车前子清热利湿为佐", "当归、生地养血柔肝，柴胡疏肝为使"],
    contraindications: ["阴虚内热", "脾胃虚寒", "孕妇慎用"],
    modifications: [
      { condition: "头痛眩晕", modification: "加菊花、钩藤" },
      { condition: "阴肿", modification: "加苍术、黄柏" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "龙胆泻肝汤泻肝胆实火，用于胁痛、口苦、耳聋",
        "肝经湿热下注用此方，如带下、阴痒"
      ]}
    ]
  },

  // ==================== 温里剂 ====================
  理中丸: {
    id: "lizhong_wan",
    name: "理中丸",
    origin: "《伤寒论》",
    category: "温里剂",
    composition: ["人参", "干姜", "白术", "炙甘草"],
    dosage: ["人参9g", "干姜9g", "白术9g", "炙甘草9g"],
    indications: ["脾胃虚寒证", "阳虚失血证", "中焦虚寒之霍乱"],
    symptoms: ["脘腹疼痛", "喜温喜按", "自利不渴", "呕吐", "食少", "舌淡苔白", "脉沉细"],
    tongue: "舌淡苔白",
    pulse: "沉细",
    functions: ["温中散寒", "补气健脾"],
    analysis: ["干姜温中散寒为君", "人参大补元气为臣", "白术健脾燥湿为佐", "甘草调和诸药为使"],
    contraindications: ["阴虚内热", "热证", "孕妇"],
    modifications: [
      { condition: "寒甚", modification: "加附子（附子理中丸）" },
      { condition: "虚寒出血", modification: "加黄芪、当归" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "理中丸温中散寒，用于脾胃虚寒",
        "理中丸加附子为附子理中丸，温阳力更强"
      ]},
      { physician: "郑钦安", notes: [
        "理中丸治中焦虚寒，万古不易之法"
      ]}
    ]
  },
  四逆汤: {
    id: "sini_tang",
    name: "四逆汤",
    origin: "《伤寒论》",
    category: "温里剂",
    composition: ["附子", "干姜", "炙甘草"],
    dosage: ["附子15g", "干姜9g", "炙甘草6g"],
    indications: ["心肾阳虚寒盛证", "四肢厥逆", "恶寒踡卧", "呕吐腹痛", "脉沉微"],
    symptoms: ["四肢厥逆", "恶寒踡卧", "神衰欲寐", "呕吐不渴", "腹痛下利", "脉沉微"],
    tongue: "舌淡苔白",
    pulse: "沉微",
    functions: ["回阳救逆"],
    analysis: ["附子大辛大热，温肾回阳救逆为君", "干姜温中散寒为臣", "甘草益气和中，调和诸药为佐使"],
    contraindications: ["阴虚内热", "真热假寒", "孕妇"],
    modifications: [
      { condition: "寒盛", modification: "加重附子、干姜" },
      { condition: "肾阳虚", modification: "加肉桂、补骨脂" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "四逆汤是回阳救逆的代表方，用于心肾阳虚",
        "四逆汤证：脉沉微，但欲寐，四肢厥逆"
      ]},
      { physician: "郑钦安", notes: [
        "四逆汤一方，乃回阳救逆之主方"
      ]},
      { physician: "李可", notes: [
        "四逆汤是中医急救第一方"
      ]}
    ]
  },
  吴茱萸汤: {
    id: "wuzhuyu_tang",
    name: "吴茱萸汤",
    origin: "《伤寒论》",
    category: "温里剂",
    composition: ["吴茱萸", "人参", "生姜", "大枣"],
    dosage: ["吴茱萸9g", "人参9g", "生姜18g", "大枣3枚"],
    indications: ["肝胃虚寒证", "阳明寒呕", "少阴利", "厥阴头痛"],
    symptoms: ["食后欲吐", "或干呕吐涎沫", "头痛", "畏寒肢冷", "舌淡苔白", "脉沉迟"],
    tongue: "舌淡苔白",
    pulse: "沉迟",
    functions: ["温中补虚", "降逆止呕"],
    analysis: ["吴茱萸温肝暖胃，降逆止呕为君", "人参大补元气为臣", "生姜温胃散寒为佐", "大枣益气健脾为使"],
    contraindications: ["胃热呕吐", "阴虚内热", "热证头痛"],
    modifications: [
      { condition: "头痛重", modification: "加川芎、当归" },
      { condition: "呕吐甚", modification: "加半夏、丁香" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "吴茱萸汤治肝胃虚寒，巅顶头痛、吐涎沫必用",
        "吴茱萸汤用于偏头痛、胃痛、呕吐"
      ]}
    ]
  },

  // ==================== 补益剂 ====================
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
      { physician: "倪海厦", notes: [
        "四君子汤是补气的基础方，用于脾胃气虚的一切病证",
        "四君子汤合四物汤即为八珍汤，气血双补"
      ]},
      { physician: "李东垣", notes: [
        "四君子汤治脾胃气虚，百病由生"
      ]}
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
      { physician: "倪海厦", notes: [
        "四物汤是补血的基础方，用于一切血虚证",
        "妇人调经必用四物汤为基础"
      ]},
      { physician: "张仲景", notes: [
        "四物汤补血调血，妇人要方"
      ]}
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
      { physician: "倪海厦", notes: [
        "六味地黄丸是滋补肾阴的基础方，用于一切肾阴虚证",
        "现代人肾阴虚多见，与熬夜、压力大有关"
      ]},
      { physician: "钱乙", notes: [
        "六味地黄丸治小儿肾虚"
      ]}
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
      { physician: "倪海厦", notes: [
        "肾气丸是温补肾阳的主方，用于肾阳虚的一切病证",
        "现代人多肾阴阳两虚，可与六味地黄丸交替使用"
      ]},
      { physician: "郑钦安", notes: [
        "肾气丸乃温补肾阳之圣方"
      ]}
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
      { physician: "倪海厦", notes: [
        "补中益气汤用于中气下陷的一切病证，如脱肛、子宫脱垂、胃下垂",
        "此方升提之力强，高血压患者慎用"
      ]},
      { physician: "李东垣", notes: [
        "补中益气汤治脾胃气虚，中气下陷"
      ]}
    ]
  },
  炙甘草汤: {
    id: "zhigancao_tang",
    name: "炙甘草汤（复脉汤）",
    origin: "《伤寒论》",
    category: "补益剂",
    composition: ["炙甘草", "生姜", "桂枝", "人参", "生地黄", "阿胶", "麦门冬", "麻仁", "大枣"],
    dosage: ["炙甘草12g", "生姜9g", "桂枝9g", "人参6g", "生地黄30g", "阿胶6g", "麦门冬10g", "麻仁10g", "大枣3枚"],
    indications: ["阴血阳气虚弱证", "心悸", "脉结代"],
    symptoms: ["虚羸少气", "心悸", "心动悸", "虚烦失眠", "大便干结", "舌红少苔", "脉结代"],
    tongue: "舌红少苔",
    pulse: "结代",
    functions: ["益气滋阴", "通阳复脉"],
    analysis: ["炙甘草益气补中为君", "人参、大枣益气健脾为臣", "生地黄、阿胶、麦门冬、麻仁滋阴养血为佐", "桂枝、生姜通阳复脉为使"],
    contraindications: ["阴虚内热", "湿盛中满", "孕妇"],
    modifications: [
      { condition: "心悸甚", modification: "加龙骨、牡蛎" },
      { condition: "脉结代", modification: "重用炙甘草、生地黄" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "炙甘草汤治脉结代、心动悸，心律不齐常用",
        "是治疗心律失常的重要方剂"
      ]}
    ]
  },

  // ==================== 活血祛瘀剂 ====================
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
      { physician: "倪海厦", notes: [
        "血府逐瘀汤是活血化瘀的代表方，用于一切瘀血证",
        "妇人月经不调、痛经常用此方化裁"
      ]},
      { physician: "王清任", notes: [
        "血府逐瘀汤治胸中血府血瘀之证"
      ]}
    ]
  },
  补阳还五汤: {
    id: "buyang_huanwu_tang",
    name: "补阳还五汤",
    origin: "《医林改错》",
    category: "理血剂",
    composition: ["黄芪", "当归尾", "赤芍", "地龙", "川芎", "红花", "桃仁"],
    dosage: ["黄芪120g", "当归尾6g", "赤芍5g", "地龙3g", "川芎3g", "红花3g", "桃仁3g"],
    indications: ["中风后遗症", "半身不遂", "口眼歪斜", "语言謇涩"],
    symptoms: ["半身不遂", "口眼歪斜", "语言謇涩", "偏枯", "舌暗淡", "脉细缓"],
    tongue: "舌暗淡",
    pulse: "细缓",
    functions: ["补气活血", "通络"],
    analysis: ["黄芪大补元气为君", "当归尾、赤芍、川芎、红花、桃仁活血祛瘀为臣", "地龙通络活络为佐使"],
    contraindications: ["阴虚内热", "孕妇", "脑出血急性期"],
    modifications: [
      { condition: "偏瘫日久", modification: "加重黄芪用量" },
      { condition: "上肢偏废", modification: "加桂枝、桑枝" },
      { condition: "下肢偏废", modification: "加牛膝、杜仲" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "补阳还五汤用于中风后遗症，气虚血瘀证",
        "重用黄芪补气，气足则血行"
      ]},
      { physician: "王清任", notes: [
        "补阳还五汤治半身不遂，气虚血瘀"
      ]}
    ]
  },

  // ==================== 化痰止咳平喘剂 ====================
  二陈汤: {
    id: "erchen_tang",
    name: "二陈汤",
    origin: "《太平惠民和剂局方》",
    category: "祛痰剂",
    composition: ["半夏", "橘红", "茯苓", "炙甘草"],
    dosage: ["半夏9g", "橘红9g", "茯苓9g", "炙甘草3g"],
    indications: ["湿痰证", "咳嗽痰多", "胸膈痞闷", "恶心呕吐"],
    symptoms: ["咳嗽痰多", "色白易咯", "胸膈痞闷", "恶心呕吐", "舌苔白腻", "脉滑"],
    tongue: "舌苔白腻",
    pulse: "滑",
    functions: ["燥湿化痰", "理气和中"],
    analysis: ["半夏燥湿化痰为君", "橘红理气化痰为臣", "茯苓健脾渗湿为佐", "甘草调和诸药为使"],
    contraindications: ["阴虚燥咳", "痰中带血", "孕妇"],
    modifications: [
      { condition: "寒痰", modification: "加干姜、细辛" },
      { condition: "热痰", modification: "加黄芩、瓜蒌" },
      { condition: "风痰", modification: "加天麻、白附子" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "二陈汤是化痰的基本方，用于一切痰证",
        "一切痰证皆可用二陈汤加减"
      ]}
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
      { physician: "倪海厦", notes: [
        "温胆汤用于胆郁痰扰的一切病证，如失眠、眩晕、癫痫",
        "加黄连后清热化痰之力更强，用于痰热内扰"
      ]}
    ]
  },
  半夏白术天麻汤: {
    id: "banxia_baizhu_tianma_tang",
    name: "半夏白术天麻汤",
    origin: "《医学心悟》",
    category: "祛痰剂",
    composition: ["半夏", "天麻", "白术", "茯苓", "橘红", "甘草", "生姜", "大枣"],
    dosage: ["半夏9g", "天麻6g", "白术9g", "茯苓9g", "橘红6g", "甘草3g", "生姜2片", "大枣2枚"],
    indications: ["痰饮上扰证", "眩晕", "头痛", "胸膈痞闷"],
    symptoms: ["眩晕", "头痛", "胸膈痞闷", "恶心呕吐", "舌苔白腻", "脉滑"],
    tongue: "舌苔白腻",
    pulse: "滑",
    functions: ["化痰熄风", "健脾祛湿"],
    analysis: ["半夏燥湿化痰为君", "天麻平肝熄风为臣", "白术、茯苓健脾祛湿为佐", "陈皮、甘草理气和中为使"],
    contraindications: ["阴虚内热", "风痰", "孕妇"],
    modifications: [
      { condition: "眩晕重", modification: "加钩藤、菊花" },
      { condition: "头痛重", modification: "加川芎、白芷" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "半夏白术天麻汤治痰浊眩晕，美尼尔综合征常用"
      ]}
    ]
  },

  // ==================== 安神剂 ====================
  酸枣仁汤: {
    id: "suanzaoren_tang",
    name: "酸枣仁汤",
    origin: "《金匮要略》",
    category: "安神剂",
    composition: ["酸枣仁", "知母", "茯苓", "川芎", "甘草"],
    dosage: ["酸枣仁15g", "知母9g", "茯苓9g", "川芎6g", "甘草3g"],
    indications: ["肝血不足，虚热内扰证", "虚烦失眠", "心悸盗汗", "头目眩晕"],
    symptoms: ["虚烦失眠", "心悸不安", "头目眩晕", "咽干口燥", "舌红", "脉弦细"],
    tongue: "舌红",
    pulse: "弦细",
    functions: ["养血安神", "清热除烦"],
    analysis: ["酸枣仁养血安神为君", "知母清热除烦为臣", "茯苓健脾安神，川芎活血行气为佐", "甘草调和诸药为使"],
    contraindications: ["阳虚畏寒", "脾胃虚寒", "孕妇"],
    modifications: [
      { condition: "兼盗汗", modification: "加五味子、浮小麦" },
      { condition: "虚火甚", modification: "加黄连、阿胶" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "酸枣仁汤治肝血不足之虚烦失眠",
        "对于长期失眠、更年期失眠效果良好"
      ]}
    ]
  },
  天王补心丹: {
    id: "tianwang_buxin_dan",
    name: "天王补心丹",
    origin: "《摄生秘剖》",
    category: "安神剂",
    composition: ["生地黄", "人参", "丹参", "玄参", "白茯苓", "五味子", "远志", "桔梗", "当归身", "天门冬", "麦门冬", "柏子仁", "酸枣仁", "朱砂"],
    dosage: ["生地黄120g", "人参6g", "丹参6g", "玄参6g", "白茯苓6g", "五味子6g", "远志6g", "桔梗6g", "当归身60g", "天门冬60g", "麦门冬60g", "柏子仁60g", "酸枣仁60g", "朱砂9g"],
    indications: ["阴虚血少，神志不安证", "虚烦心悸", "失眠多梦", "健忘"],
    symptoms: ["虚烦心悸", "失眠多梦", "健忘", "神疲乏力", "舌红少苔", "脉细数"],
    tongue: "舌红少苔",
    pulse: "细数",
    functions: ["滋阴清热", "养血安神"],
    analysis: ["生地黄滋阴清热为君", "天冬、麦冬、玄参助生地黄滋阴清热为臣", "当归、丹参活血养血，酸枣仁、柏子仁安神为佐", "人参、茯苓、五味子、远志益气安神为使"],
    contraindications: ["脾胃虚寒", "湿盛", "孕妇"],
    modifications: [
      { condition: "失眠重", modification: "加龙骨、牡蛎" },
      { condition: "心悸重", modification: "加磁石" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "天王补心丹治心肾阴虚之失眠",
        "用于长期熬夜、用脑过度所致失眠"
      ]}
    ]
  },

  // ==================== 治风剂 ====================
  镇肝熄风汤: {
    id: "zengan_xifeng_tang",
    name: "镇肝熄风汤",
    origin: "《医学衷中参西录》",
    category: "治风剂",
    composition: ["怀牛膝", "生赭石", "生龙骨", "生牡蛎", "生龟板", "生杭芍", "玄参", "天冬", "川楝子", "生麦芽", "茵陈", "甘草"],
    dosage: ["怀牛膝30g", "生赭石30g", "生龙骨15g", "生牡蛎15g", "生龟板15g", "生杭芍15g", "玄参15g", "天冬15g", "川楝子6g", "生麦芽6g", "茵陈6g", "甘草4.5g"],
    indications: ["类中风", "头目眩晕", "目胀耳鸣", "脑部热痛", "面色如醉"],
    symptoms: ["头目眩晕", "目胀耳鸣", "脑部热痛", "面色如醉", "心中烦热", "时而噫气", "舌红苔黄", "脉弦长有力"],
    tongue: "舌红苔黄",
    pulse: "弦长有力",
    functions: ["镇肝熄风", "滋阴潜阳"],
    analysis: ["怀牛膝引血下行，补益肝肾为君", "代赭石、龙骨、牡蛎镇肝潜阳为臣", "龟板、玄参、天冬、白芍滋阴养血为佐", "川楝子、麦芽、茵陈疏肝清热为使"],
    contraindications: ["孕妇", "阴虚风动", "脾胃虚寒"],
    modifications: [
      { condition: "痰多", modification: "加胆星、竹沥" },
      { condition: "眩晕重", modification: "加天麻、钩藤" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "镇肝熄风汤用于肝阳上亢，肝风内动",
        "高血压、中风先兆常用此方"
      ]},
      { physician: "张锡纯", notes: [
        "镇肝熄风汤治类中风，肝阳上亢"
      ]}
    ]
  },
  天麻钩藤饮: {
    id: "tianma_gouteng_yin",
    name: "天麻钩藤饮",
    origin: "《中医内科杂病证治新义》",
    category: "治风剂",
    composition: ["天麻", "钩藤", "石决明", "山栀", "黄芩", "川牛膝", "杜仲", "益母草", "桑寄生", "夜交藤", "茯神"],
    dosage: ["天麻9g", "钩藤12g", "石决明18g", "山栀9g", "黄芩9g", "川牛膝12g", "杜仲9g", "益母草9g", "桑寄生9g", "夜交藤9g", "茯神9g"],
    indications: ["肝阳偏亢，肝风上扰证", "头痛", "眩晕", "失眠"],
    symptoms: ["头痛", "眩晕", "失眠", "眼花", "耳鸣", "舌红苔黄", "脉弦"],
    tongue: "舌红苔黄",
    pulse: "弦",
    functions: ["平肝熄风", "清热活血", "补益肝肾"],
    analysis: ["天麻、钩藤平肝熄风为君", "石决明、山栀、黄芩清热泻火为臣", "川牛膝、益母草活血利水，杜仲、桑寄生补益肝肾为佐", "夜交藤、茯神安神定志为使"],
    contraindications: ["阴虚内热", "孕妇", "脾胃虚寒"],
    modifications: [
      { condition: "眩晕重", modification: "加菊花、珍珠母" },
      { condition: "失眠重", modification: "加酸枣仁、合欢皮" }
    ],
    physicianNotes: [
      { physician: "倪海厦", notes: [
        "天麻钩藤饮治肝阳上亢之头痛眩晕",
        "常用于高血压、美尼尔综合征"
      ]}
    ]
  }
}

// 兼容旧版本
export const CLASSIC_FORMULAS = CLASSIC_FORMULAS_EXTENDED

// 搜索方剂
export function searchFormulas(keyword: string): string[] {
  const results: string[] = []
  Object.entries(CLASSIC_FORMULAS_EXTENDED).forEach(([key, formula]) => {
    if (key.includes(keyword) || formula.name.includes(keyword)) {
      results.push(key)
    }
  })
  return results
}

// 获取方剂详情
export function getFormulaDetail(formulaName: string) {
  return CLASSIC_FORMULAS_EXTENDED[formulaName] || CLASSIC_FORMULAS_EXTENDED[Object.keys(CLASSIC_FORMULAS_EXTENDED).find(k => k.includes(formulaName) || CLASSIC_FORMULAS_EXTENDED[k].name.includes(formulaName)) || ""]
}
