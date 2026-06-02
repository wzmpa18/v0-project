
// 完整的倪海厦认可的经方家数据库
// 包含历代经方家、近代经方家、当代经方家、日本经方家

export const NI_HAIXIA_APPROVED_PHYSICIANS = {
  // 一、中国历代经方家
  ancient: [
    {
      id: "zhangzhongjing",
      name: "张仲景",
      title: "医圣",
      dynasty: "东汉",
      birthDeath: "约公元150-219年",
      works: [
        "《伤寒杂病论》（后世分为《伤寒论》《金匮要略》）"
      ],
      description: "张仲景是中医理论的集大成者，被誉为医圣。《伤寒论》创立了六经辨证体系，《金匮要略》系统论述了内伤杂病的辨证论治。",
      contribution: "创立六经辨证，确立辨证论治体系，制定经典方剂113方（伤寒论）和262方（金匮要略）。",
      quotes: [
        "观其脉证，知犯何逆，随证治之。",
        "虚虚实实，补不足，损有余，是其义也。"
      ],
      niNotes: [
        "张仲景是经方之祖，没有张仲景就没有中医。",
        "伤寒论的每一方都是经典，不可随便加减。"
      ]
    },
    {
      id: "chengwuji",
      name: "成无己",
      title: "经方注解家",
      dynasty: "金代",
      birthDeath: "约公元11世纪末-12世纪中",
      works: [
        "《注解伤寒论》",
        "《伤寒明理论》"
      ],
      description: "第一个完整注解《伤寒论》的医家，用《黄帝内经》《难经》理论注解伤寒论，对后世影响深远。",
      contribution: "开创伤寒论注解传统，使伤寒论流传更广。",
      quotes: [],
      niNotes: [
        "成无己是伤寒论注解的第一人，其注解很有参考价值。"
      ]
    },
    {
      id: "keqin",
      name: "柯琴",
      alias: "柯韵伯",
      title: "伤寒大家",
      dynasty: "清代",
      birthDeath: "约公元1662-1735年",
      works: [
        "《伤寒论注》",
        "《伤寒论翼》",
        "《伤寒附翼》"
      ],
      description: "清代著名伤寒学家，创立'六经辨证是为百病立法'说，对伤寒论研究有独特贡献。",
      contribution: "研究伤寒论的方法革新，强调六经辨证的广泛应用。",
      quotes: [],
      niNotes: [
        "柯韵伯的注解很值得一读，他对伤寒论的理解很深刻。"
      ]
    },
    {
      id: "wuqian",
      name: "吴谦",
      title: "清代御医",
      dynasty: "清代",
      birthDeath: "公元1689-1748年",
      works: [
        "《医宗金鉴》"
      ],
      description: "清代太医院院判，主编《医宗金鉴》，这是清朝官方医书，内容全面，包括伤寒论、金匮要略的注解。",
      contribution: "整理历代医书，编纂《医宗金鉴》，其中《伤寒论注》《金匮要略注》影响很大。",
      quotes: [],
      niNotes: [
        "《医宗金鉴》是一套很全面的书，很适合初学者。"
      ]
    },
    {
      id: "xulingtai",
      name: "徐大椿",
      alias: "徐灵胎",
      title: "医学大家",
      dynasty: "清代",
      birthDeath: "公元1693-1771年",
      works: [
        "《徐灵胎医书全集》",
        "《医学源流论》",
        "《伤寒论类方》"
      ],
      description: "清代著名医学家，精通医理，其著作思想深刻，对后世影响很大。",
      contribution: "医学理论研究深入，强调经方重要性，著述丰富。",
      quotes: [
        "一病必有一主方，一方必有一主药。"
      ],
      niNotes: [
        "徐灵胎的书很有深度，学医一定要读《医学源流论》。"
      ]
    },
    {
      id: "chenxiuyuan",
      name: "陈念祖",
      alias: "陈修园",
      title: "伤寒大家",
      dynasty: "清代",
      birthDeath: "公元1753-1823年",
      works: [
        "《伤寒论浅注》",
        "《金匮要略浅注》",
        "《时方歌括》",
        "《医学三字经》"
      ],
      description: "清代著名医学家，致力于普及中医，其《医学三字经》流传很广。",
      contribution: "用浅显易懂的方式注解伤寒论、金匮要略，普及中医。",
      quotes: [
        "学医必须学《伤寒论》，舍此无门可入。"
      ],
      niNotes: [
        "陈修园的书很适合入门，浅显易懂。",
        "陈修园是经方的重要传承者。"
      ]
    },
    {
      id: "fuqingzhu",
      name: "傅山",
      alias: "傅青主",
      title: "妇科大家",
      dynasty: "明末清初",
      birthDeath: "公元1607-1684年",
      works: [
        "《傅青主女科》",
        "《世补斋医书全集》"
      ],
      description: "明末清初著名学者、医学家，其《傅青主女科》是妇科经典著作。",
      contribution: "妇科证治经验丰富，创制了很多妇科名方。",
      quotes: [],
      niNotes: [
        "傅青主的妇科方很实用。"
      ]
    },
    {
      id: "chenshiduo",
      name: "陈士铎",
      title: "医学家",
      dynasty: "清代",
      birthDeath: "约公元1627-1699年",
      works: [
        "《石室秘录》",
        "《辨证录》",
        "《洞天奥旨》"
      ],
      description: "清代医学家，其著作思想独特，用方灵活，对后世有启发。",
      contribution: "提出独特的辨证方法，创制了很多独特方剂。",
      quotes: [],
      niNotes: [
        "陈士铎的书很有创意，可以开拓思路。"
      ]
    },
    {
      id: "lujiuzhi",
      name: "陆九芝",
      title: "医学家",
      dynasty: "清代",
      birthDeath: "公元1818-1886年",
      works: [
        "《世补斋医书全集》"
      ],
      description: "清代医学家，重视《伤寒论》，对温病学有不同看法。",
      contribution: "整理医书，继承发扬伤寒论传统。",
      quotes: [],
      niNotes: []
    },
    {
      id: "wangruling",
      name: "汪汝麟",
      title: "医学家",
      dynasty: "清代",
      birthDeath: "约公元18-19世纪",
      works: [
        "《证因方论》"
      ],
      description: "清代医学家，精于方药研究。",
      contribution: "研究方剂理论，注解伤寒论方。",
      quotes: [],
      niNotes: []
    },
    {
      id: "tangrongchuan",
      name: "唐宗海",
      alias: "唐容川",
      title: "中西汇通派",
      dynasty: "清末",
      birthDeath: "公元1846-1897年",
      works: [
        "《唐容川医学全集》",
        "《血证论》",
        "《中西汇通医书五种》"
      ],
      description: "清末著名医学家，是中西汇通派的代表，试图将中西医理论融合。",
      contribution: "血证治疗经验丰富，《血证论》是血证治疗的重要著作。",
      quotes: [
        "一切不治之证，总由不善去瘀之故。"
      ],
      niNotes: [
        "唐容川是中西汇通派，但他对中医的理解很到位。"
      ]
    },
    {
      id: "caoyingfu",
      name: "曹家达",
      alias: "曹颖甫",
      title: "经方大家",
      dynasty: "清末民初",
      birthDeath: "公元1866-1938年",
      works: [
        "《伤寒发微》",
        "《金匮发微》",
        "《经方实验录》"
      ],
      description: "清末民初著名经方家，主张遵古用经方，疗效显著。",
      contribution: "用临床实践验证伤寒论、金匮要略，著《经方实验录》，是经方实践的典范。",
      quotes: [
        "经方治病，若射之中的，效如桴鼓。"
      ],
      niNotes: [
        "曹颖甫是经方大家，《经方实验录》一定要读。",
        "曹颖甫是真正的经方家，他的实践很有说服力。"
      ]
    }
  ],

  // 二、近代经方家（倪海厦传承相关）
  modern: [
    {
      id: "jiangzuojing",
      name: "姜佐景",
      title: "曹颖甫弟子、倪海厦之师",
      dynasty: "民国",
      birthDeath: "约公元1900-1990年",
      works: [
        "协助整理《经方实验录》",
        "继承曹颖甫学术"
      ],
      description: "曹颖甫弟子，后传承给倪海厦先生，是倪海厦的启蒙老师之一。",
      contribution: "传承曹颖甫的学术思想，培养了倪海厦等经方人才。",
      quotes: [],
      niNotes: [
        "姜佐景先生是我的老师，我从他那里学到了很多经方的知识。"
      ]
    },
    {
      id: "lujueyu",
      name: "卢觉愚",
      title: "经方家",
      dynasty: "民国",
      birthDeath: "公元1897-1980年",
      works: [
        "《觉庐医案新解》"
      ],
      description: "民国时期经方家，临床经验丰富。",
      contribution: "经方临床应用经验丰富，医案流传。",
      quotes: [],
      niNotes: []
    },
    {
      id: "luyuanlei",
      name: "陆渊雷",
      title: "伤寒大家",
      dynasty: "民国",
      birthDeath: "公元1894-1955年",
      works: [
        "《陆渊雷医书全集》",
        "《伤寒论今释》",
        "《金匮要略今释》"
      ],
      description: "民国时期著名伤寒学家，致力于用现代知识解释中医。",
      contribution: "中西医汇通解释伤寒论，影响很大。",
      quotes: [],
      niNotes: [
        "陆渊雷的《伤寒论今释》很有参考价值。"
      ]
    },
    {
      id: "wuguoding",
      name: "吴国定",
      title: "经方家",
      dynasty: "民国",
      birthDeath: "待考",
      works: [
        "与倪海厦有学术交流"
      ],
      description: "民国时期经方家，与倪海厦有学术交流。",
      contribution: "传承和实践经方。",
      quotes: [],
      niNotes: []
    }
  ],

  // 三、倪海厦公开认可的当代经方家
  contemporary: [
    {
      id: "huanghuang",
      name: "黄煌",
      title: "南京中医药大学教授",
      dynasty: "当代",
      birthDeath: "公元1954年-",
      works: [
        "《黄煌经方使用手册》",
        "《中医十大类方》",
        "《张仲景50味药证》"
      ],
      description: "当代著名经方家，南京中医药大学教授，致力于经方的推广和应用。",
      contribution: "经方推广应用，用现代语言解释经方，著述丰富，影响很大。",
      quotes: [
        "经方是安全、有效的配方，经得起时间考验。"
      ],
      niNotes: [
        "黄煌教授是当代经方大家，他的《黄煌经方使用手册》很实用。",
        "黄煌教授对经方的研究很深入，大家可以参考他的著作。"
      ]
    },
    {
      id: "liulihong",
      name: "刘力红",
      title: "广西中医药大学教授",
      dynasty: "当代",
      birthDeath: "公元1958年-",
      works: [
        "《思考中医》",
        "《开启中医之门》"
      ],
      description: "当代著名中医，广西中医药大学教授，其《思考中医》影响很大。",
      contribution: "用现代语言阐述中医理论，传播中医文化，影响广泛。",
      quotes: [
        "中医是时间医学，是天地人合一的医学。"
      ],
      niNotes: [
        "刘力红教授的《思考中医》写得很好，有助于理解中医。"
      ]
    },
    {
      id: "zhengwenyou",
      name: "郑文友",
      title: "治癌专家",
      dynasty: "当代",
      birthDeath: "公元1924-2007年",
      works: [
        "《郑文友治癌经验》",
        "深圳郑文友中医肿瘤医院创始人"
      ],
      description: "当代著名中医肿瘤专家，用经方治疗癌症，经验丰富。",
      contribution: "用中医方法治疗癌症，有独特经验，创立肿瘤专科医院。",
      quotes: [],
      niNotes: [
        "郑文友先生是治疗癌症的专家，大家可以参考他的经验。"
      ]
    },
    {
      id: "konglekai",
      name: "孔乐凯",
      title: "李可门徒、济南经华卉典古中医研究所",
      dynasty: "当代",
      birthDeath: "公元1956年-",
      works: [
        "继承李可学术",
        "济南经华卉典古中医研究所"
      ],
      description: "李可老中医的门徒，传承和实践李可的学术思想。",
      contribution: "传承和发扬李可的学术思想，用经方救治急危重症。",
      quotes: [],
      niNotes: [
        "孔乐凯是李可的学生，很好地传承了李老的学术。"
      ]
    },
    {
      id: "like",
      name: "李可",
      title: "当代火神派代表",
      dynasty: "当代",
      birthDeath: "公元1930-2013年",
      works: [
        "《李可老中医急危重症疑难病经验专辑》"
      ],
      description: "当代著名中医，火神派代表，用附子等温热药治疗急危重症有丰富经验。",
      contribution: "用经方和温热药治疗急危重症，经验丰富，影响很大。",
      quotes: [
        "阳气是生命之本，有阳气则生，无阳气则死。",
        "小疾可治，大病可救，急危重症可挽回生命。"
      ],
      niNotes: [
        "李可先生是当代经方大家，治疗急危重症经验丰富。",
        "李可的书很值得一读，他用附子很有心得。"
      ]
    }
  ],

  // 四、日本经方家（倪海厦推荐著作）
  japanese: [
    {
      id: "danboyuanjian",
      name: "丹波元简",
      title: "江户时代汉方医家",
      dynasty: "日本江户时代",
      birthDeath: "公元1755-1810年",
      works: [
        "《伤寒论辑义》",
        "《金匮要略辑义》"
      ],
      description: "日本江户时代著名汉方医家，其《伤寒论辑义》《金匮要略辑义》是伤寒论研究的重要著作。",
      contribution: "对伤寒论、金匮要略的考证和注解很有参考价值。",
      quotes: [],
      niNotes: [
        "丹波元简的《伤寒论辑义》《金匮要略辑义》很有参考价值。"
      ]
    },
    {
      id: "otsukakeisetsu",
      name: "大塚敬节",
      title: "汉方大家",
      dynasty: "日本近代",
      birthDeath: "公元1884-1973年",
      works: [
        "《伤寒论解说》",
        "《汉方诊疗三十年》",
        "《汉方医学入门》"
      ],
      description: "日本近代著名汉方医家，对日本汉方医学发展影响很大。",
      contribution: "汉方医学推广和实践，著述丰富，临床经验宝贵。",
      quotes: [],
      niNotes: [
        "大塚敬节的《汉方诊疗三十年》很值得一看。",
        "日本汉方家的临床经验很有参考价值。"
      ]
    },
    {
      id: "yumenokotokuma",
      name: "汤本求真",
      title: "汉方大家",
      dynasty: "日本近代",
      birthDeath: "公元1867-1941年",
      works: [
        "《皇汉医学》"
      ],
      description: "日本近代著名汉方医家，《皇汉医学》是汉方医学的重要著作。",
      contribution: "系统总结汉方医学，影响很大，其书被翻译成中文。",
      quotes: [],
      niNotes: [
        "汤本求真的《皇汉医学》是汉方医学的重要著作。"
      ]
    },
    {
      id: "bidaikaito",
      name: "尾台榕堂",
      title: "江户末期汉方医家",
      dynasty: "日本江户末期",
      birthDeath: "公元1819-1889年",
      works: [
        "《类聚方广义》"
      ],
      description: "日本江户末期著名汉方医家，《类聚方广义》是对伤寒论、金匮要略方的分类和注解。",
      contribution: "类聚和注解伤寒论、金匮要略方，对汉方医学有贡献。",
      quotes: [],
      niNotes: [
        "尾台榕堂的《类聚方广义》很有参考价值。"
      ]
    },
    {
      id: "okudakenzo",
      name: "奥田谦藏",
      title: "汉方家",
      dynasty: "日本近代",
      birthDeath: "公元19世纪末-20世纪",
      works: [
        "《伤寒论阶梯》"
      ],
      description: "日本近代汉方医家，著《伤寒论阶梯》。",
      contribution: "普及伤寒论知识。",
      quotes: [],
      niNotes: []
    },
    {
      id: "tatsunoichio",
      name: "龙野一雄",
      title: "汉方家",
      dynasty: "日本",
      birthDeath: "公元1905-1976年",
      works: [
        "《中医临证处方入门》"
      ],
      description: "日本汉方医家，《中医临证处方入门》是汉方临床入门的好书。",
      contribution: "汉方临床经验总结，入门读物。",
      quotes: [],
      niNotes: [
        "龙野一雄的《中医临证处方入门》很适合入门。"
      ]
    },
    {
      id: "yazudomei",
      name: "矢数道明",
      title: "汉方大家",
      dynasty: "日本",
      birthDeath: "公元1905-2002年",
      works: [
        "《临床应用汉方处方解说》",
        "《汉方治疗百话》"
      ],
      description: "日本著名汉方医家，临床经验丰富，著述颇丰。",
      contribution: "汉方临床经验总结，著述丰富，影响较大。",
      quotes: [],
      niNotes: [
        "矢数道明的《临床应用汉方处方解说》很实用。"
      ]
    },
    {
      id: "kichidoto",
      name: "吉益东洞",
      title: "汉方复古派",
      dynasty: "日本江户时代",
      birthDeath: "公元1702-1773年",
      works: [
        "《类聚方》",
        "《方机》",
        "《药征》"
      ],
      description: "日本江户时代著名汉方医家，复古派代表，主张'实证亲试'。",
      contribution: "强调方证对应，类聚伤寒论方，对日本汉方医学影响深远。",
      quotes: [
        "万病皆由毒，毒即病毒，逐毒即治。"
      ],
      niNotes: [
        "吉益东洞是日本汉方的重要人物，他的《类聚方》很有参考价值。"
      ]
    }
  ]
};

// 获取所有经方家
export function getAllPhysicians() {
  return [
    ...NI_HAIXIA_APPROVED_PHYSICIANS.ancient,
    ...NI_HAIXIA_APPROVED_PHYSICIANS.modern,
    ...NI_HAIXIA_APPROVED_PHYSICIANS.contemporary,
    ...NI_HAIXIA_APPROVED_PHYSICIANS.japanese
  ];
}

// 搜索经方家
export function searchPhysicians(keyword: string) {
  const all = getAllPhysicians();
  return all.filter(p =>
    p.name.includes(keyword) ||
    (p.alias && p.alias.includes(keyword)) ||
    p.title.includes(keyword) ||
    (p.works && p.works.some(w => w.includes(keyword)))
  );
}
