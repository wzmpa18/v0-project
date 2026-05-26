// 子午流注与经络数据

// 十二时辰经络表
export const SHICHEN_JINGLUO = [
  {
    shichen: "子时",
    time: "23:00-01:00",
    jingluo: "胆经",
    wuxing: "木",
    yangsheng: "此时宜安睡养胆，胆主决断，睡眠好则精神好。",
    kaoxue: "丘墟、足临泣",
    jingfang: "小柴胡汤和解少阳，疏利胆气。",
  },
  {
    shichen: "丑时",
    time: "01:00-03:00",
    jingluo: "肝经",
    wuxing: "木",
    yangsheng: "肝藏血，此时深睡养肝血，熬夜最伤肝。",
    kaoxue: "太冲、行间",
    jingfang: "柴胡疏肝散疏肝理气，当归芍药散养肝血。",
  },
  {
    shichen: "寅时",
    time: "03:00-05:00",
    jingluo: "肺经",
    wuxing: "金",
    yangsheng: "肺朝百脉，此时宜深睡或静坐调息，养肺气。",
    kaoxue: "太渊、列缺",
    jingfang: "麻黄汤宣肺解表，麻杏石甘汤清热宣肺。",
  },
  {
    shichen: "卯时",
    time: "05:00-07:00",
    jingluo: "大肠经",
    wuxing: "金",
    yangsheng: "大肠主传导，此时宜排便，清除肠道垃圾。",
    kaoxue: "合谷、曲池",
    jingfang: "大承气汤泻热通便，麻子仁丸润肠通便。",
  },
  {
    shichen: "辰时",
    time: "07:00-09:00",
    jingluo: "胃经",
    wuxing: "土",
    yangsheng: "胃主受纳，此时宜进早餐，营养吸收最佳。",
    kaoxue: "足三里、内庭",
    jingfang: "半夏泻心汤和胃降逆，理中汤温中健脾。",
  },
  {
    shichen: "巳时",
    time: "09:00-11:00",
    jingluo: "脾经",
    wuxing: "土",
    yangsheng: "脾主运化，此时工作学习效率高。",
    kaoxue: "三阴交、公孙",
    jingfang: "四君子汤健脾益气，参苓白术散补脾渗湿。",
  },
  {
    shichen: "午时",
    time: "11:00-13:00",
    jingluo: "心经",
    wuxing: "火",
    yangsheng: "心主神明，此时宜小憩养心，阴阳交接。",
    kaoxue: "神门、少府",
    jingfang: "黄连阿胶汤清心安神，归脾汤养心安神。",
  },
  {
    shichen: "未时",
    time: "13:00-15:00",
    jingluo: "小肠经",
    wuxing: "火",
    yangsheng: "小肠主分清泌浊，此时多喝水利于吸收。",
    kaoxue: "后溪、养老",
    jingfang: "导赤散清心利小肠，五苓散温阳化气利水。",
  },
  {
    shichen: "申时",
    time: "15:00-17:00",
    jingluo: "膀胱经",
    wuxing: "水",
    yangsheng: "膀胱主津液，此时多饮水排毒最佳。",
    kaoxue: "委中、昆仑",
    jingfang: "五苓散温阳化气，猪苓汤利水滋阴。",
  },
  {
    shichen: "酉时",
    time: "17:00-19:00",
    jingluo: "肾经",
    wuxing: "水",
    yangsheng: "肾藏精，此时宜休息养肾，不宜过劳。",
    kaoxue: "太溪、涌泉",
    jingfang: "六味地黄丸滋阴补肾，金匮肾气丸温补肾阳。",
  },
  {
    shichen: "戌时",
    time: "19:00-21:00",
    jingluo: "心包经",
    wuxing: "火",
    yangsheng: "心包主喜乐，此时宜散步娱乐，舒畅心情。",
    kaoxue: "内关、大陵",
    jingfang: "血府逐瘀汤活血化瘀，炙甘草汤养心复脉。",
  },
  {
    shichen: "亥时",
    time: "21:00-23:00",
    jingluo: "三焦经",
    wuxing: "火",
    yangsheng: "三焦主通调水道，此时宜泡脚入睡。",
    kaoxue: "外关、支沟",
    jingfang: "小柴胡汤疏利三焦，温胆汤理气化痰。",
  },
]

// 灵龟八法开穴
export const LING_GUI_BA_FA = {
  子: { xue: "公孙", jing: "脾经", zhu: "心胸胃" },
  丑: { xue: "内关", jing: "心包经", zhu: "心胸胃" },
  寅: { xue: "临泣", jing: "胆经", zhu: "目眶头项" },
  卯: { xue: "外关", jing: "三焦经", zhu: "目眶头项" },
  辰: { xue: "后溪", jing: "小肠经", zhu: "肩胛耳目" },
  巳: { xue: "申脉", jing: "膀胱经", zhu: "肩胛耳目" },
  午: { xue: "列缺", jing: "肺经", zhu: "胸肺喉咙" },
  未: { xue: "照海", jing: "肾经", zhu: "胸肺喉咙" },
  申: { xue: "公孙", jing: "脾经", zhu: "心胸胃" },
  酉: { xue: "内关", jing: "心包经", zhu: "心胸胃" },
  戌: { xue: "临泣", jing: "胆经", zhu: "目眶头项" },
  亥: { xue: "外关", jing: "三焦经", zhu: "目眶头项" },
}

// 获取当前时辰
export function getCurrentShichen(): typeof SHICHEN_JINGLUO[0] {
  const hour = new Date().getHours()
  const shiIndex = Math.floor(((hour + 1) % 24) / 2)
  return SHICHEN_JINGLUO[shiIndex]
}

// 获取当前灵龟八法开穴
export function getCurrentLingGui(): { xue: string; jing: string; zhu: string } {
  const diZhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
  const hour = new Date().getHours()
  const shiIndex = Math.floor(((hour + 1) % 24) / 2)
  return LING_GUI_BA_FA[diZhi[shiIndex] as keyof typeof LING_GUI_BA_FA]
}

// 辨证症状映射
export const ZHENG_ZHUANG_MAP = {
  头部: ["头痛", "眩晕", "头重如裹", "目眩", "耳鸣", "口苦", "咽干"],
  胸腹: ["胸闷", "心悸", "腹痛", "腹胀", "恶心", "呕吐", "嗳气"],
  四肢: ["肢体倦怠", "四肢冰冷", "关节疼痛", "肢体麻木", "下肢浮肿"],
  全身: ["恶寒", "发热", "自汗", "盗汗", "乏力", "失眠", "多梦"],
  二便: ["大便稀溏", "大便秘结", "小便频数", "小便短赤", "夜尿频多"],
  舌脉: ["舌红苔黄", "舌淡苔白", "舌紫暗", "脉浮", "脉沉", "脉弦", "脉滑"],
}

// 六经辨证规则
export const LIU_JING_BIAN_ZHENG = {
  太阳病: {
    zhengzhuang: ["恶寒", "发热", "头痛", "脉浮"],
    tezheng: "恶寒发热，头项强痛，脉浮",
    fangji: ["桂枝汤", "麻黄汤", "葛根汤"],
    yuanze: "发汗解表",
  },
  阳明病: {
    zhengzhuang: ["发热", "大便秘结", "口渴", "舌红苔黄"],
    tezheng: "身热汗出，不恶寒反恶热，大便秘结",
    fangji: ["白虎汤", "大承气汤", "调胃承气汤"],
    yuanze: "清热泻火，通腑泄热",
  },
  少阳病: {
    zhengzhuang: ["口苦", "咽干", "目眩", "胸闷"],
    tezheng: "口苦咽干目眩，寒热往来，胸胁苦满",
    fangji: ["小柴胡汤", "大柴胡汤"],
    yuanze: "和解少阳",
  },
  太阴病: {
    zhengzhuang: ["腹痛", "腹胀", "大便稀溏", "肢体倦怠"],
    tezheng: "腹满而吐，食不下，自利益甚",
    fangji: ["理中汤", "四逆汤", "附子理中汤"],
    yuanze: "温中散寒，健脾燥湿",
  },
  少阴病: {
    zhengzhuang: ["乏力", "四肢冰冷", "嗜睡", "脉沉"],
    tezheng: "脉微细，但欲寐，四肢厥冷",
    fangji: ["四逆汤", "真武汤", "附子汤"],
    yuanze: "回阳救逆，温补肾阳",
  },
  厥阴病: {
    zhengzhuang: ["心悸", "口渴", "四肢冰冷", "腹痛"],
    tezheng: "消渴，气上撞心，心中疼热，饥而不欲食",
    fangji: ["乌梅丸", "当归四逆汤"],
    yuanze: "清上温下，调和寒热",
  },
}

// 智能辨证函数
export function smartBianZheng(symptoms: string[]): {
  zhengxing: string
  tezheng: string
  fangji: string[]
  yuanze: string
  matchScore: number
} {
  let bestMatch = {
    zhengxing: "太阳病",
    tezheng: "",
    fangji: [] as string[],
    yuanze: "",
    matchScore: 0,
  }

  for (const [zhengxing, data] of Object.entries(LIU_JING_BIAN_ZHENG)) {
    const matchCount = symptoms.filter(s => data.zhengzhuang.includes(s)).length
    const score = matchCount / data.zhengzhuang.length
    
    if (score > bestMatch.matchScore) {
      bestMatch = {
        zhengxing,
        tezheng: data.tezheng,
        fangji: data.fangji,
        yuanze: data.yuanze,
        matchScore: score,
      }
    }
  }

  return bestMatch
}
