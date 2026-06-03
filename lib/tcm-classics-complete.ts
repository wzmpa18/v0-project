// 中医经典古籍数据库
// 包含倪海厦四件套等中医经典

export interface ClassicBook {
  id: string
  name: string
  author: string
  dynasty: string
  description: string
  content: string[]
  coreTheory: string[]
  famousFormulas: string[]
  keyConcepts: string[]
}

// 倪海厦四件套 - 中医必读经典
export const NI_HAI_XIA_FOUR_CLASSICS: Record<string, ClassicBook> = {
  shanghanLun: {
    id: "shanghan_lun",
    name: "伤寒论",
    author: "张仲景",
    dynasty: "东汉",
    description: "中医学四大经典之一，系统阐述了外感热病的辨证论治规律，创立方药配合的辨证论治典范。",
    content: [
      "辨太阳病脉证并治",
      "辨阳明病脉证并治",
      "辨少阳病脉证并治",
      "辨太阴病脉证并治",
      "辨少阴病脉证并治",
      "辨厥阴病脉证并治"
    ],
    coreTheory: [
      "六经辨证",
      "八纲辨证",
      "辨证论治",
      "方证对应"
    ],
    famousFormulas: [
      "桂枝汤", "麻黄汤", "小柴胡汤", "大承气汤", "四逆汤",
      "理中汤", "白虎汤", "真武汤", "附子汤", "葛根汤"
    ],
    keyConcepts: [
      "太阳病：脉浮，头项强痛而恶寒",
      "阳明病：胃家实",
      "少阳病：口苦，咽干，目眩",
      "太阴病：腹满而吐，食不下",
      "少阴病：脉微细，但欲寐",
      "厥阴病：消渴，气上撞心"
    ]
  },
  jinguiYaolue: {
    id: "jingui_yaolue",
    name: "金匮要略",
    author: "张仲景",
    dynasty: "东汉",
    description: "中医学四大经典之一，系统阐述了内伤杂病的辨证论治，是中国最早的临床医学百科全书。",
    content: [
      "脏腑经络先后病脉证",
      "痉湿暍病脉证治",
      "百合狐惑阴阳毒病证治",
      "疟病脉证并治",
      "中风历节病脉证并治",
      "血痹虚劳病脉证并治",
      "肺痿肺痈咳嗽上气病脉证治",
      "胸痹心痛短气病脉证治",
      "腹满寒疝宿食病脉证治",
      "五脏风寒积聚病脉证并治",
      "痰饮咳嗽病脉证并治",
      "消渴小便不利淋病脉证并治",
      "水气病脉证并治",
      "黄疸病脉证并治",
      "惊悸吐衄下血胸满瘀血病脉证治",
      "呕吐哕下利病脉证治",
      "疮痈肠痈浸淫病脉证并治",
      "趺蹶手指臂肿转筋阴狐疝蛔虫病脉证治"
    ],
    coreTheory: [
      "脏腑辨证",
      "病因学说",
      "病机分析",
      "方证结合"
    ],
    famousFormulas: [
      "金匮肾气丸", "当归芍药散", "桂枝茯苓丸", "酸枣仁汤",
      "黄芪建中汤", "麦门冬汤", "葶苈大枣泻肺汤", "甘草干姜汤"
    ],
    keyConcepts: [
      "上工治未病",
      "五脏元真通畅",
      "千般疢难，不越三条",
      "四季脾旺不受邪"
    ]
  },
  huangdiNeijing: {
    id: "huangdi_neijing",
    name: "黄帝内经",
    author: "托名黄帝",
    dynasty: "战国至秦汉",
    description: "中医学四大经典之首，全面系统地阐述了中医学的理论体系和学术思想，为中医理论之渊薮。",
    content: [
      "素问：上古天真论",
      "素问：四气调神大论",
      "素问：生气通天论",
      "素问：阴阳应象大论",
      "素问：灵兰秘典论",
      "素问：六节藏象论",
      "素问：五脏别论",
      "素问：脉要精微论",
      "素问：平人气象论",
      "素问：玉机真脏论",
      "素问：三部九候论",
      "素问：经脉别论",
      "素问：脏气法时论",
      "素问：宣明五气",
      "素问：通评虚实论",
      "素问：太阴阳明论",
      "素问：热论",
      "素问：咳论",
      "素问：举痛论",
      "素问：风论",
      "素问：痹论",
      "素问：痿论",
      "素问：厥论",
      "素问：调经论",
      "素问：缪刺论",
      "素问：标本病传论",
      "素问：天元纪大论",
      "素问：五运行大论",
      "素问：六微旨大论",
      "素问：气交变大论",
      "素问：五常政大论",
      "素问：六元正纪大论",
      "素问：至真要大论",
      "灵枢：九针十二原",
      "灵枢：本输",
      "灵枢：邪气脏腑病形",
      "灵枢：经脉",
      "灵枢：经别",
      "灵枢：经水",
      "灵枢：经筋",
      "灵枢：骨度",
      "灵枢：五十营",
      "灵枢：营气",
      "灵枢：营卫生会",
      "灵枢：四时气",
      "灵枢：五邪",
      "灵枢：寒热病",
      "灵枢：癫狂",
      "灵枢：热病",
      "灵枢：厥病",
      "灵枢：杂病",
      "灵枢：周痹",
      "灵枢：师传",
      "灵枢：决气",
      "灵枢：肠胃",
      "灵枢：海论",
      "灵枢：五乱",
      "灵枢：五癃津液别",
      "灵枢：贼风",
      "灵枢：卫气行",
      "灵枢：玉版",
      "灵枢：五禁",
      "灵枢：动输",
      "灵枢：五味论",
      "灵枢：阴阳二十五人",
      "灵枢：五音五味",
      "灵枢：百病始生",
      "灵枢：邪客",
      "灵枢：通天",
      "灵枢：官能",
      "灵枢：刺节真邪",
      "灵枢：九针论",
      "灵枢：岁露论",
      "灵枢：大惑论",
      "灵枢：痈疽"
    ],
    coreTheory: [
      "阴阳五行学说",
      "脏腑学说",
      "经络学说",
      "病因学说",
      "病机学说",
      "养生学说",
      "治未病"
    ],
    famousFormulas: [],
    keyConcepts: [
      "阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也",
      "正气存内，邪不可干",
      "邪之所凑，其气必虚",
      "治病必求于本",
      "春夏养阳，秋冬养阴",
      "上工治未病"
    ]
  },
  shennongBencaoJing: {
    id: "shennong_bencao_jing",
    name: "神农本草经",
    author: "托名神农",
    dynasty: "秦汉时期",
    description: "中医学四大经典之一，是现存最早的中药学著作，奠定了中药学的基础。",
    content: [
      "上药一百二十种为君，主养命以应天，无毒，多服久服不伤人",
      "中药一百二十种为臣，主养性以应人，无毒有毒，斟酌其宜",
      "下药一百二十五种为佐使，主治病以应地，多毒，不可久服"
    ],
    coreTheory: [
      "四气五味",
      "君臣佐使",
      "七情合和",
      "升降浮沉",
      "归经理论"
    ],
    famousFormulas: [],
    keyConcepts: [
      "药有酸咸甘苦辛五味",
      "药有寒热温凉四气",
      "疗寒以热药，疗热以寒药",
      "上药养命，中药养性，下药治病"
    ]
  }
}

// 其他中医经典
export const OTHER_CLASSIC_BOOKS: Record<string, ClassicBook> = {
  zhenjiuJiayiJing: {
    id: "zhenjiu_jiayi_jing",
    name: "针灸甲乙经",
    author: "皇甫谧",
    dynasty: "西晋",
    description: "现存最早的针灸学专著，系统总结了晋以前的针灸学成就。",
    content: [
      "脏腑络属",
      "俞穴部位",
      "针灸方法",
      "各类病证针灸治疗"
    ],
    coreTheory: [
      "经络学说",
      "俞穴理论",
      "针灸操作"
    ],
    famousFormulas: [],
    keyConcepts: [
      "针灸治未病",
      "经脉穴位"
    ]
  },
  shiqiZhongmingXueming: {
    id: "shiqi_zhongming_xueming",
    name: "脾胃论",
    author: "李东垣",
    dynasty: "金代",
    description: "脾胃学说的代表著作，提出'内伤脾胃，百病由生'的著名论点。",
    content: [
      "脾胃虚实传变论",
      "脾胃胜衰论",
      "肺胃隐气下行坠",
      "调理脾胃治验",
      "脾胃损则诸病丛生"
    ],
    coreTheory: [
      "脾胃为后天之本",
      "内伤脾胃，百病由生",
      "升清降浊"
    ],
    famousFormulas: [
      "补中益气汤", "调中益气汤", "升阳益胃汤", "补脾胃泻阴火升阳汤"
    ],
    keyConcepts: [
      "元气之充足，皆由脾胃之气无所伤",
      "脾胃之气既伤，而元气亦不能充"
    ]
  }
}

// 获取所有经典医家
export function getAllPhysicians() {
  return [
    { name: "张仲景", title: "医圣", dynasty: "东汉", contributions: ["《伤寒论》", "《金匮要略》"], quotes: ["勤求古训，博采众方"], school: "经方派" },
    { name: "倪海厦", title: "当代经方大师", dynasty: "现代", contributions: ["伤寒论讲座", "金匮要略讲座", "黄帝内经讲座", "神农本草经讲座"], quotes: ["经方是经典之方", "中医的魂在于辨证论治"], school: "经方派" },
    { name: "胡希恕", title: "经方大师", dynasty: "现代", contributions: ["《胡希恕伤寒论讲座》", "《胡希恕金匮要略讲座》"], quotes: ["六经来自八纲", "辨证施治是中医灵魂"], school: "经方派" },
    { name: "刘渡舟", title: "伤寒论专家", dynasty: "现代", contributions: ["《伤寒论十四讲》", "《新编伤寒论类方》"], quotes: ["善用经方，妙在心悟"], school: "经方派" },
    { name: "曹颖甫", title: "经方实验录作者", dynasty: "近代", contributions: ["《经方实验录》"], quotes: ["经方之效，效如桴鼓"], school: "经方派" },
    { name: "陈修园", title: "医学三字经作者", dynasty: "清代", contributions: ["《医学三字经》", "《时方歌括》"], quotes: ["经方之妙，妙在辨证"], school: "经方派" },
    { name: "郑钦安", title: "火神派创始人", dynasty: "清代", contributions: ["《医理真传》", "《医法圆通》"], quotes: ["万病皆损于阳", "阳气者，若天与日"], school: "火神派" },
    { name: "吴佩衡", title: "火神派大家", dynasty: "现代", contributions: ["《吴佩衡医案》"], quotes: ["阳气是生命之本"], school: "火神派" },
    { name: "李可", title: "当代火神派大师", dynasty: "现代", contributions: ["《李可老中医急危重症疑难病经验专辑》"], quotes: ["小病治脾胃，大病治肾", "万病不治，求之于脾肾"], school: "火神派" },
    { name: "叶天士", title: "温病学派奠基人", dynasty: "清代", contributions: ["《温热论》", "《临证指南医案》"], quotes: ["卫气营血辨证"], school: "温病派" },
    { name: "吴鞠通", title: "温病学派大家", dynasty: "清代", contributions: ["《温病条辨》"], quotes: ["治上焦如羽，非轻不举"], school: "温病派" },
    { name: "李东垣", title: "脾胃派创始人", dynasty: "金代", contributions: ["《脾胃论》", "《内外伤辨惑论》"], quotes: ["内伤脾胃，百病由生", "脾胃虚则九窍不通"], school: "脾胃派" },
    { name: "张锡纯", title: "中西汇通派创始人", dynasty: "清末民国", contributions: ["《医学衷中参西录》"], quotes: ["师古而不泥古，参西而不背中"], school: "中西汇通派" },
    { name: "孙思邈", title: "药王", dynasty: "唐代", contributions: ["《备急千金要方》", "《千金翼方》"], quotes: ["大医精诚", "上医治未病"], school: "其他" },
    { name: "华佗", title: "神医", dynasty: "东汉", contributions: ["《中藏经》", "五禽戏"], quotes: ["阴阳者，天地之道也"], school: "其他" },
    { name: "李时珍", title: "药圣", dynasty: "明代", contributions: ["《本草纲目》"], quotes: [], school: "其他" },
    { name: "唐容川", title: "血证论作者", dynasty: "清代", contributions: ["《血证论》", "《中西汇通医书五种》"], quotes: ["止血、消瘀、宁血、补血"], school: "其他" },
    { name: "黄煌", title: "当代经方家", dynasty: "现代", contributions: ["《经方的魅力》", "《黄煌经方医案》"], quotes: ["经方惠民", "方证相应"], school: "其他" },
    { name: "邓铁涛", title: "国医大师", dynasty: "现代", contributions: ["脾胃学说研究", "重症肌无力研究"], quotes: ["铁杆中医"], school: "其他" }
  ]
}

// 获取医家详情
export function getPhysicianDetail(name: string) {
  const all = getAllPhysicians()
  return all.find(p => p.name === name) || null
}

// 获取经典书籍
export function getClassicBooks() {
  return { ...NI_HAI_XIA_FOUR_CLASSICS, ...OTHER_CLASSIC_BOOKS }
}

// 获取倪海厦四件套
export function getNiHaiXiaFourClassics() {
  return NI_HAI_XIA_FOUR_CLASSICS
}

// 搜索医家
export function searchPhysicians(keyword: string) {
  const all = getAllPhysicians()
  return all.filter(p =>
    p.name.includes(keyword) ||
    p.title.includes(keyword) ||
    p.school.includes(keyword)
  )
}

// 获取所有经典
export function getAllClassics() {
  const books = getClassicBooks()
  return Object.values(books)
}
