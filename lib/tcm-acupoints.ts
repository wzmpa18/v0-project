// 经络穴位数据库

export interface Meridian {
  id: string;
  name: string;
  pinyin: string;
  type: "手三阴" | "手三阳" | "足三阴" | "足三阳" | "奇经";
  element?: "木" | "火" | "土" | "金" | "水";
  organ: string;
  pointsCount: number;
  description: string;
  circulationTime: string;
  keyPoints: string[];
}

export interface Acupoint {
  id: string;
  name: string;
  pinyin: string;
  alias?: string[];
  meridianId: string;
  meridianName: string;
  location: string;
  locationDescription: string;
  functions: string[];
  indications: string[];
  needleMethod: string;
  moxibustion?: string;
  caution?: string;
  category?: string;
}

// 十二正经
export const MERIDIANS: Meridian[] = [
  {
    id: "LU",
    name: "手太阴肺经",
    pinyin: "Shou Tai Yin Fei Jing",
    type: "手三阴",
    element: "金",
    organ: "肺",
    pointsCount: 11,
    description: "起于中焦，下络大肠，还循胃口，上膈属肺，从肺系横行至腋下，沿上肢内侧前缘下行，经肘窝，入寸口，上鱼际，出于大指内侧端。",
    circulationTime: "寅时（3-5点）",
    keyPoints: ["中府", "云门", "尺泽", "列缺", "太渊", "鱼际", "少商"]
  },
  {
    id: "LI",
    name: "手阳明大肠经",
    pinyin: "Shou Yang Ming Da Chang Jing",
    type: "手三阳",
    element: "金",
    organ: "大肠",
    pointsCount: 20,
    description: "起于食指末端，沿食指内侧上缘，经腕背，上肢外侧前缘，至肩，上颈，贯颊，入下齿中，还出挟口，交人中，左之右，右之左，上挟鼻孔。",
    circulationTime: "卯时（5-7点）",
    keyPoints: ["商阳", "合谷", "阳溪", "曲池", "肩髃", "迎香"]
  },
  {
    id: "ST",
    name: "足阳明胃经",
    pinyin: "Zu Yang Ming Wei Jing",
    type: "足三阳",
    element: "土",
    organ: "胃",
    pointsCount: 45,
    description: "起于鼻旁，上行鼻根，旁入目内眦，下循鼻外，入上齿中，还出挟口环唇，下交承浆，循颐后下廉，出大迎，循颊车，上耳前，过客主人，循发际，至额颅。其支者，从大迎前下走人迎，循喉咙，入缺盆，下膈，属胃，络脾。其直者，从缺盆下乳内廉，下挟脐，入气街中。其支者，起于胃口，下循腹里，下至气街中而合，以下髀关，抵伏兔，下膝膑中，下循胫外廉，下足跗，入中指内间。",
    circulationTime: "辰时（7-9点）",
    keyPoints: ["承泣", "四白", "地仓", "颊车", "下关", "头维", "人迎", "梁门", "天枢", "足三里", "上巨虚", "丰隆", "内庭", "厉兑"]
  },
  {
    id: "SP",
    name: "足太阴脾经",
    pinyin: "Zu Tai Yin Pi Jing",
    type: "足三阴",
    element: "土",
    organ: "脾",
    pointsCount: 21,
    description: "起于大趾末端，循趾内侧白肉际，过核骨后，上内踝前廉，上踹内，循胫骨后，交出厥阴之前，上膝股内前廉，入腹，属脾，络胃，上膈，挟咽，连舌本，散舌下。其支者，复从胃别，上膈，注心中。",
    circulationTime: "巳时（9-11点）",
    keyPoints: ["隐白", "太白", "公孙", "三阴交", "地机", "阴陵泉", "血海", "大横"]
  },
  {
    id: "HT",
    name: "手少阴心经",
    pinyin: "Shou Shao Yin Xin Jing",
    type: "手三阴",
    element: "火",
    organ: "心",
    pointsCount: 9,
    description: "起于心中，出属心系，下膈，络小肠。其支者，从心系，上挟咽，系目系。其直者，复从心系却上肺，下出腋下，循臑内后廉，行太阴、心主之后，下肘内，循臂内后廉，抵掌后锐骨之端，入掌内后廉，循小指之内，出其端。",
    circulationTime: "午时（11-13点）",
    keyPoints: ["极泉", "少海", "灵道", "通里", "神门", "少府", "少冲"]
  },
  {
    id: "SI",
    name: "手太阳小肠经",
    pinyin: "Shou Tai Yang Xiao Chang Jing",
    type: "手三阳",
    element: "火",
    organ: "小肠",
    pointsCount: 19,
    description: "起于小指之端，循手外侧上腕，出踝中，直上循臂骨下廉，出肘内侧两筋之间，上循臑外后廉，出肩解，绕肩胛，交肩上，入缺盆，络心，循咽，下膈，抵胃，属小肠。其支者，从缺盆循颈，上颊，至目锐眦，却入耳中。",
    circulationTime: "未时（13-15点）",
    keyPoints: ["少泽", "后溪", "阳谷", "养老", "支正", "小海", "天宗", "颧髎", "听宫"]
  },
  {
    id: "BL",
    name: "足太阳膀胱经",
    pinyin: "Zu Tai Yang Pang Guang Jing",
    type: "足三阳",
    element: "水",
    organ: "膀胱",
    pointsCount: 67,
    description: "起于目内眦，上额，交巅。其支者，从巅至耳上角。其直者，从巅入络脑，还出别下项，循肩膊内，挟脊抵腰中，入循膂，络肾，属膀胱。其支者，从腰中，下挟脊，贯臀，入腘中。其支者，从膊内左右别下贯胛，挟脊内，过髀枢，循髀外后廉下合腘中，以下贯踹内，出外踝之后，循京骨至小指外侧。",
    circulationTime: "申时（15-17点）",
    keyPoints: ["睛明", "攒竹", "天柱", "大杼", "风门", "肺俞", "心俞", "膈俞", "肝俞", "胆俞", "脾俞", "胃俞", "肾俞", "大肠俞", "膀胱俞", "次髎", "委中", "膏肓", "志室", "秩边", "承山", "飞扬", "昆仑", "申脉", "至阴"]
  },
  {
    id: "KI",
    name: "足少阴肾经",
    pinyin: "Zu Shao Yin Shen Jing",
    type: "足三阴",
    element: "水",
    organ: "肾",
    pointsCount: 27,
    description: "起于小指之下，邪走足心，出于然谷之下，循内踝之后，别入跟中，以上踹内，出腘内廉，上股内后廉，贯脊属肾，络膀胱。其直者，从肾上贯肝膈，入肺中，循喉咙，挟舌本。其支者，从肺出，络心，注胸中。",
    circulationTime: "酉时（17-19点）",
    keyPoints: ["涌泉", "然谷", "太溪", "大钟", "照海", "复溜", "阴谷", "横骨"]
  },
  {
    id: "PC",
    name: "手厥阴心包经",
    pinyin: "Shou Jue Yin Xin Bao Jing",
    type: "手三阴",
    element: "火",
    organ: "心包",
    pointsCount: 9,
    description: "起于胸中，出属心包络，下膈，历络三焦。其支者，循胸出胁，下腋三寸，上抵腋下，循臑内，行太阴少阴之间，入肘中，下臂，行两筋之间，入掌中，循中指，出其端。其支者，别掌中，循小指次指，出其端。",
    circulationTime: "戌时（19-21点）",
    keyPoints: ["天池", "天泉", "曲泽", "郄门", "间使", "内关", "大陵", "劳宫", "中冲"]
  },
  {
    id: "TE",
    name: "手少阳三焦经",
    pinyin: "Shou Shao Yang San Jiao Jing",
    type: "手三阳",
    element: "火",
    organ: "三焦",
    pointsCount: 23,
    description: "起于小指次指之端，上出两指之间，循手表腕，出臂外两骨之间，上贯肘，循臑外上肩，而交出足少阳之后，入缺盆，布膻中，散络心包，下膈，遍属三焦。其支者，从膻中，上出缺盆，上项，系耳后，直上出耳上角，以屈下颊至䪼。其支者，从耳后入耳中，出走耳前，过客主人前，交颊，至目锐眦。",
    circulationTime: "亥时（21-23点）",
    keyPoints: ["关冲", "液门", "中渚", "阳池", "外关", "支沟", "天井", "翳风", "角孙", "耳门", "丝竹空"]
  },
  {
    id: "GB",
    name: "足少阳胆经",
    pinyin: "Zu Shao Yang Dan Jing",
    type: "足三阳",
    element: "木",
    organ: "胆",
    pointsCount: 44,
    description: "起于目锐眦，上抵头角，下耳后，循颈，行手少阳之前，至肩上，却交出手少阳之后，入缺盆。其支者，从耳后入耳中，出走耳前，至目锐眦后。其支者，别锐眦，下大迎，合于手少阳，抵于䪼，下加颊车，下颈，合缺盆，以下胸中，贯膈，络肝，属胆，循胁里，出气街，绕毛际，横入髀厌中。其直者，从缺盆下腋，循胸，过季胁，下合髀厌中，以下循髀阳，出膝外廉，下外辅骨之前，直下抵绝骨之端，下出外踝之前，循足跗上，入小指次指之间。",
    circulationTime: "子时（23-1点）",
    keyPoints: ["瞳子髎", "听会", "率谷", "阳白", "头临泣", "风池", "肩井", "日月", "京门", "带脉", "环跳", "风市", "阳陵泉", "光明", "悬钟", "丘墟", "足临泣", "侠溪", "足窍阴"]
  },
  {
    id: "LR",
    name: "足厥阴肝经",
    pinyin: "Zu Jue Yin Gan Jing",
    type: "足三阴",
    element: "木",
    organ: "肝",
    pointsCount: 14,
    description: "起于大指丛毛之际，上循足跗上廉，去内踝一寸，上踝八寸，交出太阴之后，上腘内廉，循股阴，入毛中，过阴器，抵小腹，挟胃，属肝，络胆，上贯膈，布胁肋，循喉咙之后，上入颃颡，连目系，上出额，与督脉会于巅。其支者，从目系下颊里，环唇内。其支者，复从肝别贯膈，上注肺。",
    circulationTime: "丑时（1-3点）",
    keyPoints: ["大敦", "行间", "太冲", "中封", "蠡沟", "曲泉", "章门", "期门"]
  }
];

// 常用穴位
export const ACUPOINTS: Acupoint[] = [
  {
    id: "ST36",
    name: "足三里",
    pinyin: "Zu San Li",
    alias: ["下陵", "鬼邪"],
    meridianId: "ST",
    meridianName: "足阳明胃经",
    location: "在小腿前外侧，当犊鼻下3寸，距胫骨前缘一横指（中指）",
    locationDescription: "外膝眼下3寸，胫骨外侧约一横指处",
    functions: ["健脾和胃", "扶正培元", "通经活络", "调理气血"],
    indications: ["胃痛", "呕吐", "腹胀", "泄泻", "便秘", "痢疾", "乳痈", "肠痈", "下肢痿痹", "癫狂", "脚气", "虚劳羸瘦"],
    needleMethod: "直刺1-2寸",
    moxibustion: "可灸",
    category: "合穴"
  },
  {
    id: "LI4",
    name: "合谷",
    pinyin: "He Gu",
    alias: ["虎口"],
    meridianId: "LI",
    meridianName: "手阳明大肠经",
    location: "在手背，第1、2掌骨间，当第2掌骨桡侧的中点处",
    locationDescription: "手背，第一、二掌骨之间，约平第二掌骨中点处",
    functions: ["镇静止痛", "通经活络", "清热解表"],
    indications: ["头痛", "目赤肿痛", "鼻衄", "齿痛", "牙关紧闭", "口眼㖞斜", "耳聋", "痄腮", "咽喉肿痛", "热病无汗", "多汗", "腹痛", "便秘", "经闭", "滞产", "小儿惊风", "上肢不遂"],
    needleMethod: "直刺0.5-1寸",
    moxibustion: "可灸",
    caution: "孕妇慎用",
    category: "原穴"
  },
  {
    id: "CV12",
    name: "中脘",
    pinyin: "Zhong Wan",
    alias: ["胃脘", "太仓"],
    meridianId: "CV",
    meridianName: "任脉",
    location: "在上腹部，前正中线上，当脐中上4寸",
    locationDescription: "脐上4寸，腹中线上",
    functions: ["和胃健脾", "降逆利水"],
    indications: ["胃痛", "腹胀", "呕吐", "呃逆", "翻胃", "吞酸", "纳呆", "食不化", "疳积", "膨胀", "黄疸", "肠鸣", "泄泻", "便秘", "便血", "胁下坚痛", "虚劳吐血", "头痛", "失眠", "脏躁", "癫狂", "痫证", "尸厥", "惊悸", "怔忡", "产后血晕"],
    needleMethod: "直刺1-1.5寸",
    moxibustion: "可灸",
    category: "募穴"
  },
  {
    id: "CV4",
    name: "关元",
    pinyin: "Guan Yuan",
    alias: ["下丹田", "大中极"],
    meridianId: "CV",
    meridianName: "任脉",
    location: "在下腹部，前正中线上，当脐中下3寸",
    locationDescription: "脐下3寸，腹中线上",
    functions: ["培元固本", "补益下焦"],
    indications: ["中风脱证", "虚劳冷惫", "羸瘦无力", "少腹疼痛", "霍乱吐泻", "痢疾", "脱肛", "疝气", "便血", "溺血", "小便不利", "尿频", "尿闭", "遗精", "白浊", "阳痿", "早泄", "月经不调", "经闭", "痛经", "赤白带下", "阴挺", "崩漏", "阴门瘙痒", "恶露不止", "胞衣不下", "消渴"],
    needleMethod: "直刺1-1.5寸",
    moxibustion: "可灸",
    caution: "孕妇慎用",
    category: "募穴"
  },
  {
    id: "LR3",
    name: "太冲",
    pinyin: "Tai Chong",
    alias: ["大冲"],
    meridianId: "LR",
    meridianName: "足厥阴肝经",
    location: "在足背侧，当第1跖骨间隙的后方凹陷处",
    locationDescription: "足背，第一、二跖骨结合部之前凹陷处",
    functions: ["平肝息风", "清热利胆", "通经活络"],
    indications: ["头痛", "眩晕", "疝气", "月经不调", "痛经", "经闭", "带下", "崩漏", "癃闭", "遗尿", "小儿惊风", "癫狂", "痫证", "胁痛", "腹胀", "黄疸", "呕逆", "咽痛嗌干", "目赤肿痛", "膝股内侧痛", "足跗肿", "下肢痿痹"],
    needleMethod: "直刺0.5-1寸",
    moxibustion: "可灸",
    category: "输穴"
  },
  {
    id: "GV20",
    name: "百会",
    pinyin: "Bai Hui",
    alias: ["巅上", "泥丸宫"],
    meridianId: "GV",
    meridianName: "督脉",
    location: "在头部，当前发际正中直上5寸，或两耳尖连线中点处",
    locationDescription: "头顶正中线与两耳尖连线的交叉处",
    functions: ["升阳举陷", "益气固脱", "清热开窍", "安神定志"],
    indications: ["头痛", "眩晕", "惊悸", "健忘", "尸厥", "中风不语", "癫狂", "痫证", "癔病", "耳鸣", "鼻塞", "脱肛", "痔疾", "阴挺", "泄泻"],
    needleMethod: "平刺0.5-0.8寸",
    moxibustion: "可灸",
    category: "交会穴"
  },
  {
    id: "SP6",
    name: "三阴交",
    pinyin: "San Yin Jiao",
    alias: ["承命", "太阴"],
    meridianId: "SP",
    meridianName: "足太阴脾经",
    location: "在小腿内侧，当足内踝尖上3寸，胫骨内侧缘后方",
    locationDescription: "内踝尖上3寸，胫骨后缘处",
    functions: ["健脾和胃", "调补肝肾", "滋阴降火", "引火下行"],
    indications: ["肠鸣，腹胀，泄泻，脾胃虚弱", "月经不调，崩漏，带下，阴挺，经闭，不孕，难产", "遗精，阳痿，遗尿，疝气", "失眠，多梦，心悸，怔忡", "下肢痿痹，脚气"],
    needleMethod: "直刺1-1.5寸",
    moxibustion: "可灸",
    caution: "孕妇禁针",
    category: "交会穴"
  },
  {
    id: "KI3",
    name: "太溪",
    pinyin: "Tai Xi",
    alias: ["大溪", "吕细"],
    meridianId: "KI",
    meridianName: "足少阴肾经",
    location: "在足内侧，内踝后方，当内踝尖与跟腱之间的凹陷处",
    locationDescription: "内踝尖与跟腱之间的凹陷处",
    functions: ["滋阴益肾", "壮阳强腰", "调理冲任", "通利三焦"],
    indications: ["头痛目眩，咽喉肿痛，齿痛，耳鸣，耳聋", "咳嗽，气喘，胸痛，咯血", "消渴，月经不调，失眠，健忘", "遗精，阳痿，小便频数", "腰脊痛，下肢厥冷，内踝肿痛"],
    needleMethod: "直刺0.5-1寸",
    moxibustion: "可灸",
    category: "输穴"
  },
  {
    id: "PC6",
    name: "内关",
    pinyin: "Nei Guan",
    alias: ["阴维"],
    meridianId: "PC",
    meridianName: "手厥阴心包经",
    location: "在前臂掌侧，当曲泽与大陵的连线上，腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间",
    locationDescription: "腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间",
    functions: ["宁心安神", "和胃降逆", "宽胸理气", "镇静止痛"],
    indications: ["心痛，心悸，怔忡，胸痛", "胃痛，呕吐，呃逆", "失眠，健忘，头痛，癫狂痫证", "中风，偏瘫，肘臂挛痛"],
    needleMethod: "直刺0.5-1寸",
    moxibustion: "可灸",
    category: "络穴"
  },
  {
    id: "BL2",
    name: "攒竹",
    pinyin: "Cuan Zhu",
    alias: ["眉头", "始光"],
    meridianId: "BL",
    meridianName: "足太阳膀胱经",
    location: "在面部，当眉头陷中，眶上切迹处",
    locationDescription: "眉头内侧端凹陷处",
    functions: ["散风明目", "清热解表"],
    indications: ["头痛，目眩，目翳，目赤肿痛", "迎风流泪，近视，眼睑瞤动", "面瘫，面痛，眉棱骨痛"],
    needleMethod: "平刺0.5-0.8寸",
    moxibustion: "不宜灸",
    category: "交会穴"
  },
  {
    id: "ST4",
    name: "地仓",
    pinyin: "Di Cang",
    alias: ["会维", "胃维"],
    meridianId: "ST",
    meridianName: "足阳明胃经",
    location: "在面部，口角外侧，上直瞳孔",
    locationDescription: "口角旁0.4寸处",
    functions: ["散风活络", "止痛"],
    indications: ["口角㖞斜", "流涎", "眼睑瞤动", "齿痛", "颊肿"],
    needleMethod: "斜刺或平刺0.5-0.8寸",
    moxibustion: "可灸",
    category: "交会穴"
  },
  {
    id: "ST6",
    name: "颊车",
    pinyin: "Jia Che",
    alias: ["曲牙", "机关"],
    meridianId: "ST",
    meridianName: "足阳明胃经",
    location: "在面颊部，下颌角前上方约1横指（中指），当咀嚼时咬肌隆起，按之凹陷处",
    locationDescription: "下颌角前上方约一横指，咬肌隆起处",
    functions: ["散风通络", "消肿止痛"],
    indications: ["口眼㖞斜", "齿痛", "颊肿", "牙关紧闭", "失音", "颈项强痛"],
    needleMethod: "直刺0.3-0.5寸，平刺0.5-1寸",
    moxibustion: "可灸",
    category: "交会穴"
  },
  {
    id: "LI20",
    name: "迎香",
    pinyin: "Ying Xiang",
    alias: ["冲阳"],
    meridianId: "LI",
    meridianName: "手阳明大肠经",
    location: "在鼻翼外缘中点旁，当鼻唇沟中",
    locationDescription: "鼻翼旁开0.5寸，鼻唇沟中",
    functions: ["散风清热", "通利鼻窍"],
    indications: ["鼻塞，鼻衄，鼻渊，鼻息肉", "面痒，面肿，口㖞", "胆道蛔虫症"],
    needleMethod: "斜刺或平刺0.3-0.5寸",
    moxibustion: "不宜灸",
    category: "交会穴"
  },
  {
    id: "TE5",
    name: "外关",
    pinyin: "Wai Guan",
    alias: ["阳维"],
    meridianId: "TE",
    meridianName: "手少阳三焦经",
    location: "在前臂背侧，当阳池与肘尖的连线上，腕背横纹上2寸，尺骨与桡骨之间",
    locationDescription: "腕背横纹上2寸，尺桡骨之间",
    functions: ["疏风清热", "通络止痛"],
    indications: ["热病，头痛，目赤肿痛", "耳鸣，耳聋", "颊肿，颈项强痛", "胁痛，肘臂屈伸不利，手颤"],
    needleMethod: "直刺0.5-1寸",
    moxibustion: "可灸",
    category: "络穴"
  },
  {
    id: "GB20",
    name: "风池",
    pinyin: "Feng Chi",
    alias: ["热府"],
    meridianId: "GB",
    meridianName: "足少阳胆经",
    location: "在项部，当枕骨之下，与风府相平，胸锁乳突肌与斜方肌上端之间的凹陷处",
    locationDescription: "颈后，枕骨下，斜方肌与胸锁乳突肌之间凹陷处",
    functions: ["疏风清热", "聪耳明目", "醒脑开窍"],
    indications: ["头痛，眩晕，目赤肿痛，鼻渊，鼻衄，耳鸣，耳聋", "中风，口眼㖞斜，热病，感冒，颈项强痛"],
    needleMethod: "针尖微下，向鼻尖斜刺0.8-1.2寸",
    moxibustion: "可灸",
    caution: "深部为延髓，不可深刺",
    category: "交会穴"
  },
  {
    id: "BL40",
    name: "委中",
    pinyin: "Wei Zhong",
    alias: ["血郄", "腘中"],
    meridianId: "BL",
    meridianName: "足太阳膀胱经",
    location: "在腘横纹中点，当股二头肌腱与半腱肌肌腱的中间",
    locationDescription: "腘窝中央，两筋之间",
    functions: ["清热凉血", "舒筋活络", "通利小便"],
    indications: ["腰脊痛，下肢痿痹", "腹痛，急性吐泻", "小便不利，遗尿", "丹毒，皮肤瘙痒，疔疮"],
    needleMethod: "直刺1-1.5寸，或点刺出血",
    moxibustion: "可灸",
    category: "合穴"
  },
  {
    id: "K11",
    name: "涌泉",
    pinyin: "Yong Quan",
    alias: ["地冲"],
    meridianId: "KI",
    meridianName: "足少阴肾经",
    location: "在足底部，卷足时足前部凹陷处，约当第2、3趾趾缝纹头端与足跟连线的前1/3与后2/3交点处",
    locationDescription: "足心前1/3凹陷处",
    functions: ["滋阴益肾", "平肝息风", "开窍醒神"],
    indications: ["昏厥，眩晕，失眠，小儿惊风", "头痛，目眩，咽喉肿痛", "小便不利，便秘，奔豚气"],
    needleMethod: "直刺0.5-1寸",
    moxibustion: "可灸",
    category: "井穴"
  }
];
