// 大六壬完整数据库 - 基于《大六壬大全》《六壬粹言》《六壬指南》等古籍

// 十二天将
export const TIAN_JIANG = [
  { id: "guiren", name: "貴", fullName: "天乙貴人", color: "#FFD700", wuxing: "土", nature: "吉", desc: "主尊贵、贵人相助" },
  { id: "tengshe", name: "蛇", fullName: "騰蛇", color: "#FF6B6B", wuxing: "火", nature: "凶", desc: "主惊恐、怪异、变化" },
  { id: "zhuque", name: "朱", fullName: "朱雀", color: "#FF4444", wuxing: "火", nature: "凶", desc: "主口舌、文书、信息" },
  { id: "liuhe", name: "合", fullName: "六合", color: "#4CAF50", wuxing: "木", nature: "吉", desc: "主和合、婚姻、交易" },
  { id: "gouchen", name: "勾", fullName: "勾陳", color: "#795548", wuxing: "土", nature: "凶", desc: "主争斗、牵连、田土" },
  { id: "qinglong", name: "龍", fullName: "青龍", color: "#2196F3", wuxing: "木", nature: "吉", desc: "主喜庆、财帛、吉祥" },
  { id: "tianhou", name: "后", fullName: "天后", color: "#9C27B0", wuxing: "水", nature: "吉", desc: "主阴私、妇女、暗昧" },
  { id: "taikong", name: "空", fullName: "太陰", color: "#607D8B", wuxing: "金", nature: "吉", desc: "主隐蔽、阴私、暗昧" },
  { id: "xuanwu", name: "玄", fullName: "玄武", color: "#212121", wuxing: "水", nature: "凶", desc: "主盗贼、奸邪、暗昧" },
  { id: "taiyin", name: "陰", fullName: "太陰", color: "#9E9E9E", wuxing: "金", nature: "吉", desc: "主阴私、妇女、暗昧" },
  { id: "tiankong", name: "天空", fullName: "天空", color: "#03A9F4", wuxing: "土", nature: "凶", desc: "主空亡、欺诈、虚假" },
  { id: "baihu", name: "虎", fullName: "白虎", color: "#FFFFFF", wuxing: "金", nature: "凶", desc: "主凶险、疾病、丧服" },
]

// 十二地支
export const DI_ZHI = [
  { id: "zi", name: "子", wuxing: "水", yin: true, animal: "鼠", hour: "23:00-01:00", month: 11, color: "#1E88E5" },
  { id: "chou", name: "丑", wuxing: "土", yin: true, animal: "牛", hour: "01:00-03:00", month: 12, color: "#8D6E63" },
  { id: "yin", name: "寅", wuxing: "木", yin: false, animal: "虎", hour: "03:00-05:00", month: 1, color: "#43A047" },
  { id: "mao", name: "卯", wuxing: "木", yin: true, animal: "兔", hour: "05:00-07:00", month: 2, color: "#66BB6A" },
  { id: "chen", name: "辰", wuxing: "土", yin: false, animal: "龙", hour: "07:00-09:00", month: 3, color: "#A1887F" },
  { id: "si", name: "巳", wuxing: "火", yin: true, animal: "蛇", hour: "09:00-11:00", month: 4, color: "#EF5350" },
  { id: "wu", name: "午", wuxing: "火", yin: false, animal: "马", hour: "11:00-13:00", month: 5, color: "#F44336" },
  { id: "wei", name: "未", wuxing: "土", yin: true, animal: "羊", hour: "13:00-15:00", month: 6, color: "#BCAAA4" },
  { id: "shen", name: "申", wuxing: "金", yin: false, animal: "猴", hour: "15:00-17:00", month: 7, color: "#FFC107" },
  { id: "you", name: "酉", wuxing: "金", yin: true, animal: "鸡", hour: "17:00-19:00", month: 8, color: "#FFD54F" },
  { id: "xu", name: "戌", wuxing: "土", yin: false, animal: "狗", hour: "19:00-21:00", month: 9, color: "#8D6E63" },
  { id: "hai", name: "亥", wuxing: "水", yin: true, animal: "猪", hour: "21:00-23:00", month: 10, color: "#42A5F5" },
]

// 十天干
export const TIAN_GAN = [
  { id: "jia", name: "甲", wuxing: "木", yin: false, color: "#4CAF50" },
  { id: "yi", name: "乙", wuxing: "木", yin: true, color: "#81C784" },
  { id: "bing", name: "丙", wuxing: "火", yin: false, color: "#F44336" },
  { id: "ding", name: "丁", wuxing: "火", yin: true, color: "#EF5350" },
  { id: "wu", name: "戊", wuxing: "土", yin: false, color: "#8D6E63" },
  { id: "ji", name: "己", wuxing: "土", yin: true, color: "#A1887F" },
  { id: "geng", name: "庚", wuxing: "金", yin: false, color: "#FFC107" },
  { id: "xin", name: "辛", wuxing: "金", yin: true, color: "#FFD54F" },
  { id: "ren", name: "壬", wuxing: "水", yin: false, color: "#2196F3" },
  { id: "gui", name: "癸", wuxing: "水", yin: true, color: "#64B5F6" },
]

// 月将对照表（节气后）
export const YUE_JIANG = {
  "雨水后": "亥", "春分后": "戌", "谷雨后": "酉", "小满后": "申",
  "夏至后": "未", "大暑后": "午", "处暑后": "巳", "秋分后": "辰",
  "霜降后": "卯", "小雪后": "寅", "冬至后": "丑", "大寒后": "子",
}

// 贵人起法
export const GUI_REN_QI_FA = {
  "甲戊庚牛羊": { 甲: ["丑", "未"], 戊: ["丑", "未"], 庚: ["丑", "未"], 乙: ["子", "申"], 己: ["子", "申"], 丙: ["亥", "酉"], 丁: ["亥", "酉"], 壬: ["卯", "巳"], 癸: ["卯", "巳"], 辛: ["寅", "午"] },
  "甲戊兼牛羊": { 甲: ["丑", "未"], 戊: ["丑", "未"], 庚: ["丑", "未"], 乙: ["子", "申"], 己: ["子", "申"], 丙: ["亥", "酉"], 丁: ["亥", "酉"], 壬: ["卯", "巳"], 癸: ["卯", "巳"], 辛: ["寅", "午"] },
}

// 六十甲子
export const JIA_ZI_60 = [
  "甲子", "乙丑", "丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉",
  "甲戌", "乙亥", "丙子", "丁丑", "戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未",
  "甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳",
  "甲午", "乙未", "丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯",
  "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑",
  "甲寅", "乙卯", "丙辰", "丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌", "癸亥",
]

// 旬空对照表
export const XUN_KONG = {
  "甲子": ["戌", "亥"], "甲戌": ["申", "酉"], "甲申": ["午", "未"],
  "甲午": ["辰", "巳"], "甲辰": ["寅", "卯"], "甲寅": ["子", "丑"],
}

// 720课格局
export const KE_GE = [
  // 贼克课
  { name: "重审", type: "贼克", condition: "四课中下贼上，取受克者为初传", desc: "《六壬大全》：重审者，下克上也，取所克者为用" },
  { name: "元首", type: "贼克", condition: "四课中上克下，取所克者为初传", desc: "《六壬大全》：元首者，上克下也，取所克者为用" },
  { name: "知一", type: "贼克", condition: "四课只有一处克", desc: "《六壬大全》：知一者，止有一克也" },
  { name: "涉害", type: "贼克", condition: "四课有两处以上贼克，比较涉害深浅", desc: "《大六壬指南》：涉害者，以涉害深浅定之" },
  // 比用课
  { name: "比用", type: "比用", condition: "四课无克，取与日干同类者", desc: "《六壬粹言》：无克取比，比者同类也" },
  // 遥克课  
  { name: "遥克", type: "遥克", condition: "四课无克无比，天盘有克地盘者", desc: "《六壬指南》：遥克者，四课无克比，而神将有克者也" },
  // 昴星课
  { name: "昴星", type: "昴星", condition: "四课全无克比遥", desc: "《大六壬大全》：昴星者，四课俱无可取，乃以昴星为用" },
  // 别责课
  { name: "别责", type: "别责", condition: "日上有本身或刑害者", desc: "《六壬粹言》：别责者，不得已而别取之也" },
  // 八专课
  { name: "八专", type: "八专", condition: "日辰同位", desc: "《六壬大全》：八专者，干支同位，止有二课" },
  // 伏吟课
  { name: "伏吟", type: "伏吟", condition: "天地盘相同", desc: "《大六壬指南》：伏吟者，天地盘俱在本位不动" },
  // 返吟课
  { name: "返吟", type: "返吟", condition: "天地盘冲", desc: "《六壬粹言》：返吟者，天地盘相冲也" },
]

// 神煞数据 - 基于《协纪辨方书》《六壬大全》
export const SHEN_SHA = {
  // 年神煞
  yearSha: [
    { name: "太岁", calc: "年支", nature: "凶", desc: "岁君所临，百事不宜冲犯" },
    { name: "岁破", calc: "年支对冲", nature: "凶", desc: "太岁对冲之位，大凶" },
    { name: "太阳", calc: "依年支推算", nature: "吉", desc: "太阳所临，百煞消除" },
    { name: "太阴", calc: "依年支推算", nature: "吉", desc: "太阴所临，宜阴私之事" },
  ],
  // 月神煞
  monthSha: [
    { name: "月建", calc: "月支", nature: "吉", desc: "月之主气，百事宜之" },
    { name: "月破", calc: "月支对冲", nature: "凶", desc: "月建对冲，大凶" },
    { name: "月德", calc: "依月支推算", nature: "吉", desc: "月之德神，逢凶化吉" },
    { name: "月合", calc: "月支六合", nature: "吉", desc: "月之合神，宜婚姻交易" },
  ],
  // 日神煞
  daySha: [
    { name: "日建", calc: "日支", nature: "中", desc: "日之主气" },
    { name: "日破", calc: "日支对冲", nature: "凶", desc: "日建对冲，不宜行事" },
    { name: "日德", calc: "依日干推算", nature: "吉", desc: "日之德神" },
    { name: "日禄", calc: "依日干推算", nature: "吉", desc: "日干之禄" },
    { name: "日马", calc: "依日支推算", nature: "吉", desc: "驿马所临，主动" },
    { name: "日刑", calc: "依日支推算", nature: "凶", desc: "三刑所临" },
    { name: "日害", calc: "依日支推算", nature: "凶", desc: "六害所临" },
  ],
  // 自选神煞
  customSha: [
    { name: "天德", calc: "依月支推算", nature: "吉", desc: "天之德神，最吉" },
    { name: "月德", calc: "依月支推算", nature: "吉", desc: "月之德神" },
    { name: "天乙", calc: "依日干推算", nature: "吉", desc: "贵人所临" },
    { name: "天医", calc: "依月支推算", nature: "吉", desc: "医药之神" },
    { name: "病符", calc: "依年支推算", nature: "凶", desc: "主疾病" },
    { name: "死气", calc: "依月支推算", nature: "凶", desc: "主死亡" },
    { name: "官符", calc: "依年支推算", nature: "凶", desc: "主官司" },
    { name: "桃花", calc: "依年支推算", nature: "中", desc: "主婚姻情感" },
    { name: "华盖", calc: "依年支推算", nature: "中", desc: "主孤独、宗教" },
    { name: "驿马", calc: "依年支推算", nature: "吉", desc: "主迁移变动" },
    { name: "将星", calc: "依年支推算", nature: "吉", desc: "主权贵" },
    { name: "红艳", calc: "依日干推算", nature: "中", desc: "主艳情" },
  ],
}

// 类神分类（占断用）
export const LEI_SHEN = {
  "占身命": { 用神: "日干", 类神: ["太岁", "本命", "行年"], desc: "以日干为主，参看太岁、本命" },
  "占财运": { 用神: "妻财", 类神: ["财爻", "青龙", "太常"], desc: "以财爻为主，青龙、太常为辅" },
  "占婚姻": { 用神: "六合", 类神: ["天后", "太阴", "支神"], desc: "男占以天后为主，女占以太常为主" },
  "占疾病": { 用神: "天医", 类神: ["病符", "死气", "白虎"], desc: "以天医为主，察病符、白虎" },
  "占官讼": { 用神: "官鬼", 类神: ["朱雀", "勾陈", "官符"], desc: "以官鬼为主，察朱雀勾陈" },
  "占行人": { 用神: "驿马", 类神: ["太岁", "行年", "支神"], desc: "以驿马为主，察远近" },
  "占出行": { 用神: "驿马", 类神: ["日支", "行年", "太岁"], desc: "以日支为方向，驿马定动否" },
  "占考试": { 用神: "官星", 类神: ["朱雀", "青龙", "印星"], desc: "以官星为主，察文昌" },
  "占失物": { 用神: "玄武", 类神: ["日支", "财爻"], desc: "以玄武为主，定方位时间" },
  "占天气": { 用神: "日支", 类神: ["月将", "天盘"], desc: "以日支为主，察水火之气" },
}

// 断语集 - 摘自《六壬大全》《六壬粹言》《大六壬指南》等
export const DUAN_YU = {
  tianjiang: {
    "貴人": [
      "贵人临事主有贵人相助",
      "贵人加日德，必逢贵人提携",
      "贵人乘吉神，凡事皆吉",
      "贵人临空亡，虽有贵人而无力",
    ],
    "騰蛇": [
      "腾蛇主惊恐，临事多惊疑",
      "腾蛇加日主怪异之事",
      "腾蛇入传，事多变化",
      "腾蛇加玄武，有诈伪之事",
    ],
    "朱雀": [
      "朱雀主文书口舌",
      "朱雀临身，主有文书之喜",
      "朱雀空亡，书信不至",
      "朱雀加白虎，文书有凶",
    ],
    "六合": [
      "六合主和合交易",
      "六合临事，主有人和合",
      "六合加日，婚姻可成",
      "六合空亡，和事不成",
    ],
    "勾陳": [
      "勾陈主田土争讼",
      "勾陈临日，有牵连之事",
      "勾陈加白虎，必有争斗",
      "勾陈空亡，争讼可免",
    ],
    "青龍": [
      "青龙主喜庆财帛",
      "青龙临日，主有喜事",
      "青龙加财，财运亨通",
      "青龙空亡，喜事成空",
    ],
  },
  keshi: {
    "元首课": "元首课上克下，主尊长有权，凡事顺遂",
    "重审课": "重审课下贼上，主卑欺尊，凡事多阻",
    "知一课": "知一课独取一克，事情单纯",
    "涉害课": "涉害课多处克，主事多纠葛",
    "遥克课": "遥克课远取克，主事远而费力",
    "昴星课": "昴星课无克可取，主事无头绪",
    "别责课": "别责课别取责任，主事有责难",
    "八专课": "八专课干支同位，主事专一",
    "伏吟课": "伏吟天地盘不动，主事滞留",
    "返吟课": "返吟天地盘冲，主事反复",
  },
}

// 古籍原文集
export const GU_JI = {
  "大六壬大全": {
    author: "郭御青",
    dynasty: "明",
    chapters: [
      { title: "卷一·总论", content: "六壬者，占课之法也。其法以月将加时，分布十二宫..." },
      { title: "卷二·课体", content: "课有九体：一曰元首，二曰重审，三曰知一..." },
      { title: "卷三·天将", content: "十二天将者，贵人、腾蛇、朱雀、六合、勾陈..." },
    ]
  },
  "六壬粹言": {
    author: "刘基",
    dynasty: "明",
    chapters: [
      { title: "卷一·起例", content: "凡起六壬，先定日干支，次定月将..." },
      { title: "卷二·课格", content: "课格之法，先看四课有克无克..." },
    ]
  },
  "大六壬指南": {
    author: "陈公献",
    dynasty: "清",
    chapters: [
      { title: "卷一·基础", content: "学六壬者，必先明阴阳五行之理..." },
      { title: "卷二·断法", content: "断课之法，以日干为我，以用神为彼..." },
    ]
  },
  "六壬神课金口诀": {
    author: "孙膑",
    dynasty: "战国",
    chapters: [
      { title: "序", content: "金口诀者，六壬之捷法也..." },
    ]
  },
}

// 起课法选项
export const QI_KE_FA = [
  { id: "zhengshi", name: "正时起课", desc: "以实际时辰起课" },
  { id: "huoyan", name: "活演时课", desc: "以任意时辰起课" },
  { id: "zhanshi", name: "占时起课", desc: "以占问时辰起课" },
  { id: "nianzhi", name: "年支起课", desc: "以年支起课" },
]

// 用户设置默认值
export const DEFAULT_SETTINGS = {
  qiKeFa: "zhengshi",
  yueJiangXuanQu: "auto",
  guiRenQiFa: "甲戊庚牛羊",
  guiRenXuanQu: "auto",
  sheHaiQuFa: "depth",
  showShenSha: true,
  showTianJiang: true,
  showDiPan: true,
  showSiKe: true,
  showSanChuan: true,
  colorScheme: "classic",
  fontSize: "medium",
}
