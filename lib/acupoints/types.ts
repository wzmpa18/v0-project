// 穴位数据类型定义

export interface Acupoint {
  id: string
  name: string
  pinyin: string
  code?: string // 国际代码如 LU1, ST36
  position: [number, number, number] // 3D坐标 [x, y, z]
  meridian: string
  category: "正经" | "奇经" | "董氏" | "经外奇穴"
  location: string // 取穴位置描述
  effect: string // 功效主治
  method?: string // 针刺方法
  depth?: string // 针刺深度
  caution?: string // 注意事项
  dongSection?: string // 董氏奇穴分部（一一部位到十十部位）
}

// 经络信息类型
export interface MeridianInfo {
  name: string
  shortName: string
  englishCode: string
  pointCount: number
  flowTime: string // 当令时辰
  element: string // 五行属性
  yin_yang: "阴" | "阳"
  paired: string // 表里经
  description: string
}

// 十二正经信息
export const TWELVE_MERIDIAN_INFO: MeridianInfo[] = [
  { name: "手太阴肺经", shortName: "肺经", englishCode: "LU", pointCount: 11, flowTime: "寅时 03:00-05:00", element: "金", yin_yang: "阴", paired: "大肠经", description: "起于中焦，下络大肠，还循胃口，上膈属肺" },
  { name: "手阳明大肠经", shortName: "大肠经", englishCode: "LI", pointCount: 20, flowTime: "卯时 05:00-07:00", element: "金", yin_yang: "阳", paired: "肺经", description: "起于食指末端，上行至肩，入缺盆络肺" },
  { name: "足阳明胃经", shortName: "胃经", englishCode: "ST", pointCount: 45, flowTime: "辰时 07:00-09:00", element: "土", yin_yang: "阳", paired: "脾经", description: "起于鼻翼旁，循行面部、胸腹、下肢前外侧" },
  { name: "足太阴脾经", shortName: "脾经", englishCode: "SP", pointCount: 21, flowTime: "巳时 09:00-11:00", element: "土", yin_yang: "阴", paired: "胃经", description: "起于足大趾内侧端，沿下肢内侧上行至腹胸" },
  { name: "手少阴心经", shortName: "心经", englishCode: "HT", pointCount: 9, flowTime: "午时 11:00-13:00", element: "火", yin_yang: "阴", paired: "小肠经", description: "起于心中，出属心系，下膈络小肠" },
  { name: "手太阳小肠经", shortName: "小肠经", englishCode: "SI", pointCount: 19, flowTime: "未时 13:00-15:00", element: "火", yin_yang: "阳", paired: "心经", description: "起于小指外侧端，循上肢外侧后缘上行至肩、面" },
  { name: "足太阳膀胱经", shortName: "膀胱经", englishCode: "BL", pointCount: 67, flowTime: "申时 15:00-17:00", element: "水", yin_yang: "阳", paired: "肾经", description: "起于目内眦，上额交巅，循背下行至足" },
  { name: "足少阴肾经", shortName: "肾经", englishCode: "KI", pointCount: 27, flowTime: "酉时 17:00-19:00", element: "水", yin_yang: "阴", paired: "膀胱经", description: "起于足小趾下，斜走足心，循下肢内侧后缘上行" },
  { name: "手厥阴心包经", shortName: "心包经", englishCode: "PC", pointCount: 9, flowTime: "戌时 19:00-21:00", element: "火", yin_yang: "阴", paired: "三焦经", description: "起于胸中，出属心包络，下膈历络三焦" },
  { name: "手少阳三焦经", shortName: "三焦经", englishCode: "TE", pointCount: 23, flowTime: "亥时 21:00-23:00", element: "火", yin_yang: "阳", paired: "心包经", description: "起于无名指末端，循上肢外侧中线上行至头面" },
  { name: "足少阳胆经", shortName: "胆经", englishCode: "GB", pointCount: 44, flowTime: "子时 23:00-01:00", element: "木", yin_yang: "阳", paired: "肝经", description: "起于目外眦，循头、身侧下行至足" },
  { name: "足厥阴肝经", shortName: "肝经", englishCode: "LR", pointCount: 14, flowTime: "丑时 01:00-03:00", element: "木", yin_yang: "阴", paired: "胆经", description: "起于足大趾外侧端，循下肢内侧上行至肝" },
]

// 奇经八脉信息
export const EIGHT_EXTRA_MERIDIAN_INFO = [
  { name: "督脉", shortName: "督", englishCode: "DU", pointCount: 28, description: "阳脉之海，总督诸阳经" },
  { name: "任脉", shortName: "任", englishCode: "RN", pointCount: 24, description: "阴脉之海，总任诸阴经" },
  { name: "冲脉", shortName: "冲", englishCode: "CV", pointCount: 0, description: "十二经脉之海，为血海" },
  { name: "带脉", shortName: "带", englishCode: "DAI", pointCount: 0, description: "约束纵行诸脉" },
  { name: "阴维脉", shortName: "阴维", englishCode: "YIN", pointCount: 0, description: "维络诸阴经" },
  { name: "阳维脉", shortName: "阳维", englishCode: "YANG", pointCount: 0, description: "维络诸阳经" },
  { name: "阴跷脉", shortName: "阴跷", englishCode: "YQ", pointCount: 0, description: "主一身左右之阴" },
  { name: "阳跷脉", shortName: "阳跷", englishCode: "YAQ", pointCount: 0, description: "主一身左右之阳" },
]

// 董氏奇穴分部信息
export const DONG_SECTIONS = [
  { id: "11", name: "一一部位", area: "手指部", description: "大指、食指、中指、无名指、小指" },
  { id: "22", name: "二二部位", area: "手掌部", description: "手掌正面及背面" },
  { id: "33", name: "三三部位", area: "前臂部", description: "腕至肘之间" },
  { id: "44", name: "四四部位", area: "上臂部", description: "肘至肩之间" },
  { id: "55", name: "五五部位", area: "足趾部", description: "各足趾" },
  { id: "66", name: "六六部位", area: "足掌部", description: "足背及足底" },
  { id: "77", name: "七七部位", area: "小腿部", description: "踝至膝之间" },
  { id: "88", name: "八八部位", area: "大腿部", description: "膝至髋之间" },
  { id: "99", name: "九九部位", area: "耳部", description: "耳廓各部" },
  { id: "1010", name: "十十部位", area: "头面颈项部", description: "头面及颈项" },
  { id: "back", name: "后背部位", area: "背部", description: "背腰部" },
  { id: "chest", name: "前胸部位", area: "胸腹部", description: "胸腹部" },
]
