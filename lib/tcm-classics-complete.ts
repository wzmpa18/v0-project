// 中医经典古籍数据库
// 包含倪海厦四件套等中医经典

export interface ClassicBook {
  id: string
  name: string
  author: string
  dynasty: string
  description: string
  content: string[]  // 主要内容章节
  coreTheory: string[]  // 核心理论
  famousFormulas: string[]  // 代表方剂
  keyConcepts: string[]  // 重要概念
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
      "素问": [
        "上古天真论",
        "四气调神大论",
        "生气通天论",
        "金匮真言论",
        "阴阳应象大论",
        "阴阳离合论",
        "阴阳别论",
        "灵兰秘典论",
        "六节藏象论",
        "五脏生成论",
        "五脏别论",
        "异法方宜论",
        "移精变气论",
        "汤液醪醴论",
        "玉版论要",
        "诊要经终论",
        "脉要精微论",
        "平人气象论",
        "玉机真脏论",
        "三部九候论",
        "经脉别论",
        "脏气法时论",
        "宣明五气",
        "血气形志",
        "宝命全形论",
        "八正神明论",
        "离合真邪论",
        "通评虚实论",
        "太阴阳明论",
        "阳明脉解",
        "热论",
        "刺热",
        "评热病论",
        "逆调论",
        "疟论",
        "刺疟",
        "气厥论",
        "咳论",
        "举痛论",
        "腹中论",
        "刺腰痛",
        "风论",
        "痹论",
        "痿论",
        "厥论",
        "病能论",
        "奇病论",
        "大奇论",
        "脉解",
        "刺要论",
        "刺齐论",
        "刺禁论",
        "刺志论",
        "针解",
        "长刺节论",
        "皮部论",
        "经络论",
        "气穴论",
        "气府论",
        "骨空论",
        "水热穴论",
        "调经论",
        "缪刺论",
        "四时刺逆从论",
        "标本病传论",
        "天元纪大论",
        "五运行大论",
        "六微旨大论",
        "气交变大论",
        "五常政大论",
        "六元正纪大论",
        "刺法论",
        "本病论",
        "至真要大论",
        "著至教论",
        "示从容论",
        "疏五过论",
        "征四失论",
        "阴阳类论",
        "方盛衰论",
        "解精微论"
      ],
      "灵枢": [
        "九针十二原",
        "本输",
        "小针解",
        "邪气脏腑病形",
        "根结",
        "寿夭刚柔",
        "官针",
        "本神",
        "终始",
        "经脉",
        "经别",
        "经水",
        "经筋",
        "骨度",
        "五十营",
        "营气",
        "脉度",
        "营卫生会",
        "四时气",
        "五邪",
        "寒热病",
        "癫狂",
        "热病",
        "厥病",
        "病本",
        "杂病",
        "周痹",
        "口问",
        "师传",
        "决气",
        "肠胃",
        "平人绝谷",
        "海论",
        "五乱",
        "津液输布",
        "五癃津液别",
        "阴阳清浊",
        "贼风",
        "卫气行",
        "玉版",
        "五禁",
        "动输",
        "五味论",
        "阴阳二十五人",
        "五音五味",
        "百病始生",
        "行针",
        "上膈",
        "忧恚无言",
        "寒热",
        "邪客",
        "通天",
        "官能",
        "论疾诊尺",
        "刺节真邪",
        "卫气行",
        "九针论",
        "岁露论",
        "大惑论",
        "痈疽"
      ]
    },
    coreTheory: [
      "阴阳五行学说",
      "脏腑学说",
      "经络学说",
      "病因学说",
      "病机学说",
      "养生学说",
      "治未病"
    ],
    famousFormulas: [],  // 内经主要讲理论，方剂较少
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
    famousFormulas: [],  // 本草经主要讲单味药
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
  },
  yixuezhongzhongcanxilu: {
    id: "yixue_zhongzhong_canxi_lu",
    name: "医学衷中参西录",
    author: "张锡纯",
    dynasty: "清末民国",
    description: "中西汇通派的代表著作，主张'师古而不泥古，参西而不背中'。",
    content: [
      "医方",
      "药物",
      "医论",
      "医案"
    ],
    coreTheory: [
      "中西汇通",
      "衷中参西",
      "重元气"
    ],
    famousFormulas: [
      "镇肝熄风汤", "建瓴汤", "升陷汤", "活络效灵丹"
    ],
    keyConcepts: [
      "师古而不泥古，参西而不背中",
      "中药为主，西药为辅"
    ]
  },
  zhongzangjing: {
    id: "zhongzang_jing",
    name: "中藏经",
    author: "华佗",
    dynasty: "东汉",
    description: "托名华佗的著作，论述了阴阳、寒热、虚实等辨证要点。",
    content: [
      "阴阳大法",
      "寒热虚实辨证",
      "生死脉证",
      "各脏腑辨证"
    ],
    coreTheory: [
      "阴阳寒热辨证",
      "脏腑辨证",
      "病机分析"
    ],
    famousFormulas: [
      "麻黄汤", "大承气汤"  // 传为华佗所创
    ],
    keyConcepts: [
      "阳热在上，阴寒在下",
      "阳上而阴下"
    ]
  },
  beijiQianjinyaofang: {
    id: "beiji_qianjin_yaofang",
    name: "备急千金要方",
    author: "孙思邈",
    dynasty: "唐代",
    description: "唐代医学巨著，集唐代以前方书之大成，被誉为中国最早的临床百科全书。",
    content: [
      "妇人方上中下",
      "少小婴孺方",
      "七窍病",
      "风毒脚气",
      "诸风",
      "伤寒",
      "消渴",
      "痔漏"
    ],
    coreTheory: [
      "大医精诚",
      "治未病",
      "综合治疗"
    ],
    famousFormulas: [
      "独活寄生汤", "温胆汤", "苇茎汤", "犀角地黄汤"
    ],
    keyConcepts: [
      "大医精诚：凡大医治病，必当安神定志，无欲无求",
      "君臣佐使"
    ]
  },
  bencaoGangmu: {
    id: "bencao_gangmu",
    name: "本草纲目",
    author: "李时珍",
    dynasty: "明代",
    description: "集本草学之大成，被达尔文称为'中国古代的百科全书'。",
    content: [
      "16部60类",
      "1892种药物",
      "11096个药方",
      "1100多幅插图"
    ],
    coreTheory: [
      "药物分类",
      "四气五味",
      "归经理论",
      "升降浮沉"
    ],
    famousFormulas: [],
    keyConcepts: [
      "共为君臣佐使",
      "七情配伍"
    ]
  }
}

// 倪海厦认可的经方家
export const NI_APPROVED_PHYSICIANS = {
  // 经方派（伤寒论派）
  jingfangPai: {
    name: "经方派",
    description: "以《伤寒论》《金匮要略》为核心，强调辨证论治，用药精炼",
    representatives: [
      {
        name: "张仲景",
        title: "医圣",
        dynasty: "东汉",
        contributions: ["《伤寒论》", "《金匮要略》"],
        quotes: ["勤求古训，博采众方"]
      },
      {
        name: "倪海厦",
        title: "当代经方大师",
        dynasty: "现代",
        contributions: ["伤寒论讲座", "金匮要略讲座", "黄帝内经讲座", "神农本草经讲座"],
        quotes: ["经方是经典之方", "中医的魂在于辨证论治"]
      },
      {
        name: "胡希恕",
        title: "经方大师",
        dynasty: "现代",
        contributions: ["《胡希恕伤寒论讲座》", "《胡希恕金匮要略讲座》"],
        quotes: ["六经来自八纲", "辨证施治是中医灵魂"]
      },
      {
        name: "刘渡舟",
        title: "伤寒论专家",
        dynasty: "现代",
        contributions: ["《伤寒论十四讲》", "《新编伤寒论类方》"],
        quotes: ["善用经方，妙在心悟"]
      },
      {
        name: "陈慎吾",
        title: "经方大家",
        dynasty: "现代",
        contributions: ["伤寒论教学", "经方临床"],
        quotes: []
      },
      {
        name: "曹颖甫",
        title: "经方实验录作者",
        dynasty: "近代",
        contributions: ["《经方实验录》"],
        quotes: ["经方之效，效如桴鼓"]
      },
      {
        name: "陈修园",
        title: "医学三字经作者",
        dynasty: "清代",
        contributions: ["《医学三字经》", "《时方歌括》"],
        quotes: ["经方之妙，妙在辨证"]
      }
    ]
  },
  
  // 火神派（扶阳派）
  huoShenPai: {
    name: "火神派",
    description: "以温阳扶正为特色，擅长用附子、肉桂等温热药",
    representatives: [
      {
        name: "郑钦安",
        title: "火神派创始人",
        dynasty: "清代",
        contributions: ["《医理真传》", "《医法圆通》"],
        quotes: ["万病皆损于阳", "阳气者，若天与日"]
      },
      {
        name: "吴佩衡",
        title: "火神派大家",
        dynasty: "现代",
        contributions: ["《吴佩衡医案》"],
        quotes: ["阳气是生命之本"]
      },
      {
        name: "祝味菊",
        title: "上海火神派代表",
        dynasty: "现代",
        contributions: ["《伤寒质难》"],
        quotes: ["阳气者，精则养神，柔则养筋"]
      },
      {
        name: "李可",
        title: "当代火神派大师",
        dynasty: "现代",
        contributions: ["《李可老中医急危重症疑难病经验专辑》"],
        quotes: ["小病治脾胃，大病治肾", "万病不治，求之于脾肾"]
      },
      {
        name: "张步桃",
        title: "台湾经方家",
        dynasty: "现代",
        contributions: ["伤寒论讲座", "经方临床"],
        quotes: ["看中医要用中医思维"]
      }
    ]
  },
  
  // 温病派
  wenBingPai: {
    name: "温病派",
    description: "以温病学说为核心，注重清热养阴，用药轻灵",
    representatives: [
      {
        name: "叶天士",
        title: "温病学派奠基人",
        dynasty: "清代",
        contributions: ["《温热论》", "《临证指南医案》"],
        quotes: ["卫气营血辨证"]
      },
      {
        name: "吴鞠通",
        title: "温病学派大家",
        dynasty: "清代",
        contributions: ["《温病条辨》"],
        quotes: ["治上焦如羽，非轻不举"]
      },
      {
        name: "王孟英",
        title: "温病学派大家",
        dynasty: "清代",
        contributions: ["《温热经纬》", "《随息居饮食谱》"],
        quotes: []
      }
    ]
  },
  
  // 脾胃派
  piWeiPai: {
    name: "脾胃派",
    description: "以脾胃学说为核心，强调脾胃为后天之本",
    representatives: [
      {
        name: "李东垣",
        title: "脾胃派创始人",
        dynasty: "金代",
        contributions: ["《脾胃论》", "《内外伤辨惑论》"],
        quotes: ["内伤脾胃，百病由生", "脾胃虚则九窍不通"]
      },
      {
        name: "叶天士",
        title: "脾胃大家",
        dynasty: "清代",
        contributions: ["《临证指南医案》"],
        quotes: ["养胃阴"]
      }
    ]
  },
  
  // 中西汇通派
  zhongxiHuitong: {
    name: "中西汇通派",
    description: "主张中医为主，西医为辅，中西结合",
    representatives: [
      {
        name: "张锡纯",
        title: "中西汇通派创始人",
        dynasty: "清末民国",
        contributions: ["《医学衷中参西录》"],
        quotes: ["师古而不泥古，参西而不背中"]
      },
      {
        name: "恽铁樵",
        title: "中西汇通派大家",
        dynasty: "近代",
        contributions: ["《群经见智录》"],
        quotes: []
      }
    ]
  },
  
  // 其他著名医家
  otherFamous: {
    name: "其他著名医家",
    description: "倪海厦认可的其他经方家和医家",
    representatives: [
      {
        name: "孙思邈",
        title: "药王",
        dynasty: "唐代",
        contributions: ["《备急千金要方》", "《千金翼方》"],
        quotes: ["大医精诚", "上医治未病"]
      },
      {
        name: "华佗",
        title: "神医",
        dynasty: "东汉",
        contributions: ["《中藏经》", "五禽戏"],
        quotes: ["阴阳者，天地之道也"]
      },
      {
        name: "李时珍",
        title: "药圣",
        dynasty: "明代",
        contributions: ["《本草纲目》"],
        quotes: []
      },
      {
        name: "唐容川",
        title: "血证论作者",
        dynasty: "清代",
        contributions: ["《血证论》", "《中西汇通医书五种》"],
        quotes: ["止血、消瘀、宁血、补血"]
      },
      {
        name: "黄煌",
        title: "当代经方家",
        dynasty: "现代",
        contributions: ["《经方的魅力》", "《黄煌经方医案》"],
        quotes: ["经方惠民", "方证相应"]
      },
      {
        name: "王永炎",
        title: "中国工程院院士",
        dynasty: "现代",
        contributions: ["中医脑病学"],
        quotes: []
      },
      {
        name: "邓铁涛",
        title: "国医大师",
        dynasty: "现代",
        contributions: ["脾胃学说研究", "重症肌无力研究"],
        quotes: ["铁杆中医"]
      },
      {
        name: "朱仁康",
        title: "皮科专家",
        dynasty: "现代",
        contributions: ["《朱仁康临床经验集》"],
        quotes: []
      },
      {
        name: "门纯德",
        title: "门氏传承人",
        dynasty: "现代",
        contributions: ["《门纯德中医临证要录》"],
        quotes: []
      },
      {
        name: "赵明锐",
        title: "经方家",
        dynasty: "现代",
        contributions: ["《经方发挥》"],
        quotes: []
      },
      {
        name: "焦树德",
        title: "骨伤科专家",
        dynasty: "现代",
        contributions: ["《焦树德临床经验辑要》"],
        quotes: []
      }
    ]
  }
}

// 获取所有经典医家
export function getAllPhysicians() {
  const allPhysicians: any[] = []
  Object.values(NI_APPROVED_PHYSICIANS).forEach((school: any) => {
    allPhysicians.push(...school.representatives)
  })
  return allPhysicians
}

// 获取医家详情
export function getPhysicianDetail(name: string) {
  for (const school of Object.values(NI_APPROVED_PHYSICIANS) as any[]) {
    const physician = school.representatives.find((p: any) => p.name === name)
    if (physician) {
      return { ...physician, school: school.name, description: school.description }
    }
  }
  return null
}

// 获取经典书籍
export function getClassicBooks() {
  return { ...NI_HAI_XIA_FOUR_CLASSICS, ...OTHER_CLASSIC_BOOKS }
}

// 获取倪海厦四件套
export function getNiHaiXiaFourClassics() {
  return NI_HAI_XIA_FOUR_CLASSICS
}
