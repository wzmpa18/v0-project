// 3D人体经络穴位数据库
// 基于国家标准穴位的三维相对坐标

// 十二正经 + 任督二脉
export const MERIDIAN_LIST = [
  { id: "LU", name: "手太阴肺经", color: "#ffffff", element: "金", points: 11 },
  { id: "LI", name: "手阳明大肠经", color: "#ffffff", element: "金", points: 20 },
  { id: "ST", name: "足阳明胃经", color: "#d97706", element: "土", points: 45 },
  { id: "SP", name: "足太阴脾经", color: "#d97706", element: "土", points: 21 },
  { id: "HT", name: "手少阴心经", color: "#ef4444", element: "火", points: 9 },
  { id: "SI", name: "手太阳小肠经", color: "#ef4444", element: "火", points: 19 },
  { id: "BL", name: "足太阳膀胱经", color: "#3b82f6", element: "水", points: 67 },
  { id: "KI", name: "足少阴肾经", color: "#3b82f6", element: "水", points: 27 },
  { id: "PC", name: "手厥阴心包经", color: "#ef4444", element: "火", points: 9 },
  { id: "TE", name: "手少阳三焦经", color: "#ef4444", element: "火", points: 23 },
  { id: "GB", name: "足少阳胆经", color: "#22c55e", element: "木", points: 44 },
  { id: "LR", name: "足厥阴肝经", color: "#22c55e", element: "木", points: 14 },
  { id: "DU", name: "督脉", color: "#d4af37", element: "阳", points: 28 },
  { id: "RN", name: "任脉", color: "#9ca3af", element: "阴", points: 24 },
]

// 常用穴位三维坐标数据 (相对坐标系，以人体中心为原点)
// X: 左右 (-1 左, +1 右)
// Y: 上下 (0 脚底, 1 头顶)  
// Z: 前后 (-1 背, +1 前)
export interface AcupointData {
  id: string
  name: string
  pinyin: string
  meridian: string
  position: { x: number; y: number; z: number }
  depth: number // 进针深度(寸)
  angle: number // 进针角度(度)
  indications: string[] // 主治
  methods: string[] // 刺法
  caution?: string // 注意事项
}

export const ACUPOINTS: AcupointData[] = [
  // 手太阴肺经 (LU)
  {
    id: "LU1",
    name: "中府",
    pinyin: "Zhongfu",
    meridian: "LU",
    position: { x: 0.15, y: 0.82, z: 0.12 },
    depth: 0.5,
    angle: 45,
    indications: ["咳嗽", "气喘", "胸满", "胸痛", "肩背痛"],
    methods: ["向外斜刺0.5-0.8寸"],
    caution: "不宜深刺，以免伤及肺脏"
  },
  {
    id: "LU2",
    name: "云门",
    pinyin: "Yunmen",
    meridian: "LU",
    position: { x: 0.16, y: 0.84, z: 0.10 },
    depth: 0.5,
    angle: 45,
    indications: ["咳嗽", "气喘", "胸痛", "肩痛"],
    methods: ["向外斜刺0.5-0.8寸"],
    caution: "不宜深刺"
  },
  {
    id: "LU5",
    name: "尺泽",
    pinyin: "Chize",
    meridian: "LU",
    position: { x: 0.28, y: 0.62, z: 0.08 },
    depth: 0.8,
    angle: 90,
    indications: ["咳嗽", "气喘", "咽喉肿痛", "肘臂挛痛"],
    methods: ["直刺0.8-1.2寸，或点刺出血"]
  },
  {
    id: "LU7",
    name: "列缺",
    pinyin: "Lieque",
    meridian: "LU",
    position: { x: 0.32, y: 0.52, z: 0.06 },
    depth: 0.5,
    angle: 15,
    indications: ["头痛", "项强", "咳嗽", "气喘", "咽喉肿痛"],
    methods: ["向上斜刺0.3-0.5寸"]
  },
  {
    id: "LU9",
    name: "太渊",
    pinyin: "Taiyuan",
    meridian: "LU",
    position: { x: 0.35, y: 0.48, z: 0.04 },
    depth: 0.3,
    angle: 90,
    indications: ["咳嗽", "气喘", "咽痛", "胸痛", "腕痛"],
    methods: ["避开桡动脉，直刺0.2-0.3寸"]
  },
  {
    id: "LU11",
    name: "少商",
    pinyin: "Shaoshang",
    meridian: "LU",
    position: { x: 0.40, y: 0.42, z: 0.02 },
    depth: 0.1,
    angle: 90,
    indications: ["咽喉肿痛", "咳嗽", "鼻衄", "发热", "昏迷"],
    methods: ["浅刺0.1寸，或点刺出血"]
  },
  
  // 手阳明大肠经 (LI)
  {
    id: "LI4",
    name: "合谷",
    pinyin: "Hegu",
    meridian: "LI",
    position: { x: 0.38, y: 0.46, z: 0.02 },
    depth: 1.0,
    angle: 90,
    indications: ["头痛", "目赤肿痛", "鼻衄", "齿痛", "面肿", "咽喉肿痛", "发热恶寒"],
    methods: ["直刺0.5-1寸"],
    caution: "孕妇禁针"
  },
  {
    id: "LI10",
    name: "手三里",
    pinyin: "Shousanli",
    meridian: "LI",
    position: { x: 0.30, y: 0.56, z: 0.04 },
    depth: 1.2,
    angle: 90,
    indications: ["手臂麻痛", "肘挛不伸", "腹痛", "腹泻", "齿痛"],
    methods: ["直刺0.8-1.2寸"]
  },
  {
    id: "LI11",
    name: "曲池",
    pinyin: "Quchi",
    meridian: "LI",
    position: { x: 0.28, y: 0.60, z: 0.02 },
    depth: 1.5,
    angle: 90,
    indications: ["手臂痹痛", "上肢不遂", "热病", "高血压", "癫狂"],
    methods: ["直刺1-1.5寸"]
  },
  {
    id: "LI20",
    name: "迎香",
    pinyin: "Yingxiang",
    meridian: "LI",
    position: { x: 0.03, y: 0.90, z: 0.14 },
    depth: 0.3,
    angle: 45,
    indications: ["鼻塞", "鼻衄", "口歪", "面痒", "面肿"],
    methods: ["略向内上方斜刺0.3-0.5寸"]
  },
  
  // 足阳明胃经 (ST)
  {
    id: "ST2",
    name: "四白",
    pinyin: "Sibai",
    meridian: "ST",
    position: { x: 0.04, y: 0.89, z: 0.12 },
    depth: 0.3,
    angle: 90,
    indications: ["目赤痛痒", "目翳", "眼睑瞤动", "面痛", "口眼歪斜"],
    methods: ["直刺0.2-0.3寸，不宜深刺"]
  },
  {
    id: "ST6",
    name: "颊车",
    pinyin: "Jiache",
    meridian: "ST",
    position: { x: 0.08, y: 0.87, z: 0.02 },
    depth: 0.5,
    angle: 90,
    indications: ["齿痛", "面痛", "口噤", "口歪", "颊肿"],
    methods: ["直刺0.3-0.5寸，或向地仓方向透刺"]
  },
  {
    id: "ST25",
    name: "天枢",
    pinyin: "Tianshu",
    meridian: "ST",
    position: { x: 0.06, y: 0.58, z: 0.15 },
    depth: 1.5,
    angle: 90,
    indications: ["腹胀", "腹痛", "腹泻", "便秘", "痢疾", "月经不调"],
    methods: ["直刺1-1.5寸"]
  },
  {
    id: "ST36",
    name: "足三里",
    pinyin: "Zusanli",
    meridian: "ST",
    position: { x: 0.10, y: 0.28, z: 0.08 },
    depth: 1.5,
    angle: 90,
    indications: ["胃痛", "腹胀", "腹泻", "痢疾", "便秘", "乳痈", "下肢痹痛", "虚劳羸瘦"],
    methods: ["直刺1-2寸"]
  },
  {
    id: "ST40",
    name: "丰隆",
    pinyin: "Fenglong",
    meridian: "ST",
    position: { x: 0.12, y: 0.22, z: 0.06 },
    depth: 1.5,
    angle: 90,
    indications: ["头痛", "眩晕", "痰多", "咳嗽", "气喘", "癫狂"],
    methods: ["直刺1-1.5寸"]
  },
  
  // 足太阴脾经 (SP)
  {
    id: "SP6",
    name: "三阴交",
    pinyin: "Sanyinjiao",
    meridian: "SP",
    position: { x: -0.08, y: 0.18, z: -0.02 },
    depth: 1.5,
    angle: 90,
    indications: ["月经不调", "带下", "阴挺", "不孕", "难产", "遗精", "阳痿", "遗尿", "腹痛腹胀"],
    methods: ["直刺1-1.5寸"],
    caution: "孕妇禁针"
  },
  {
    id: "SP9",
    name: "阴陵泉",
    pinyin: "Yinlingquan",
    meridian: "SP",
    position: { x: -0.06, y: 0.26, z: -0.04 },
    depth: 1.5,
    angle: 90,
    indications: ["腹胀", "腹泻", "水肿", "黄疸", "小便不利", "膝痛"],
    methods: ["直刺1-2寸"]
  },
  
  // 手少阴心经 (HT)
  {
    id: "HT7",
    name: "神门",
    pinyin: "Shenmen",
    meridian: "HT",
    position: { x: -0.34, y: 0.48, z: 0.02 },
    depth: 0.5,
    angle: 90,
    indications: ["心痛", "心烦", "惊悸", "怔忡", "失眠", "健忘", "癫狂"],
    methods: ["直刺0.3-0.5寸"]
  },
  
  // 手太阳小肠经 (SI)
  {
    id: "SI3",
    name: "后溪",
    pinyin: "Houxi",
    meridian: "SI",
    position: { x: -0.40, y: 0.44, z: -0.02 },
    depth: 0.8,
    angle: 90,
    indications: ["头项强痛", "目赤", "耳聋", "咽喉肿痛", "腰背痛", "手指及肘臂挛痛"],
    methods: ["直刺0.5-1寸"]
  },
  
  // 足太阳膀胱经 (BL)
  {
    id: "BL2",
    name: "攒竹",
    pinyin: "Cuanzhu",
    meridian: "BL",
    position: { x: 0.025, y: 0.92, z: 0.10 },
    depth: 0.5,
    angle: 15,
    indications: ["头痛", "目眩", "目赤肿痛", "迎风流泪", "目视不明", "眼睑瞤动"],
    methods: ["向眉中或向下平刺0.5-0.8寸"]
  },
  {
    id: "BL13",
    name: "肺俞",
    pinyin: "Feishu",
    meridian: "BL",
    position: { x: 0.04, y: 0.78, z: -0.12 },
    depth: 0.8,
    angle: 45,
    indications: ["咳嗽", "气喘", "胸满", "骨蒸潮热", "盗汗"],
    methods: ["向脊柱方向斜刺0.5-0.8寸"]
  },
  {
    id: "BL15",
    name: "心俞",
    pinyin: "Xinshu",
    meridian: "BL",
    position: { x: 0.04, y: 0.76, z: -0.12 },
    depth: 0.8,
    angle: 45,
    indications: ["心痛", "惊悸", "失眠", "健忘", "癫痫", "咳嗽"],
    methods: ["向脊柱方向斜刺0.5-0.8寸"]
  },
  {
    id: "BL18",
    name: "肝俞",
    pinyin: "Ganshu",
    meridian: "BL",
    position: { x: 0.04, y: 0.72, z: -0.12 },
    depth: 0.8,
    angle: 45,
    indications: ["黄疸", "胁痛", "目赤", "目眩", "雀目", "癫狂"],
    methods: ["向脊柱方向斜刺0.5-0.8寸"]
  },
  {
    id: "BL20",
    name: "脾俞",
    pinyin: "Pishu",
    meridian: "BL",
    position: { x: 0.04, y: 0.68, z: -0.12 },
    depth: 0.8,
    angle: 45,
    indications: ["腹胀", "腹泻", "痢疾", "呕吐", "黄疸", "水肿"],
    methods: ["向脊柱方向斜刺0.5-0.8寸"]
  },
  {
    id: "BL23",
    name: "肾俞",
    pinyin: "Shenshu",
    meridian: "BL",
    position: { x: 0.04, y: 0.62, z: -0.12 },
    depth: 1.0,
    angle: 45,
    indications: ["遗尿", "遗精", "阳痿", "月经不调", "带下", "腰痛", "耳鸣", "耳聋"],
    methods: ["向脊柱方向斜刺0.5-1寸"]
  },
  {
    id: "BL40",
    name: "委中",
    pinyin: "Weizhong",
    meridian: "BL",
    position: { x: 0.06, y: 0.30, z: -0.08 },
    depth: 1.5,
    angle: 90,
    indications: ["腰痛", "下肢痿痹", "腹痛", "吐泻", "小便不利", "遗尿"],
    methods: ["直刺1-1.5寸，或用三棱针点刺出血"]
  },
  
  // 足少阴肾经 (KI)
  {
    id: "KI1",
    name: "涌泉",
    pinyin: "Yongquan",
    meridian: "KI",
    position: { x: 0.04, y: 0.02, z: -0.02 },
    depth: 0.5,
    angle: 90,
    indications: ["头痛", "头晕", "失眠", "癫狂", "小儿惊风", "昏厥"],
    methods: ["直刺0.5-1寸"]
  },
  {
    id: "KI3",
    name: "太溪",
    pinyin: "Taixi",
    meridian: "KI",
    position: { x: -0.10, y: 0.08, z: -0.04 },
    depth: 0.5,
    angle: 90,
    indications: ["头痛目眩", "咽喉肿痛", "齿痛", "耳鸣耳聋", "咳嗽气喘", "月经不调", "失眠", "遗精阳痿", "腰脊痛"],
    methods: ["直刺0.5-0.8寸"]
  },
  
  // 手厥阴心包经 (PC)
  {
    id: "PC6",
    name: "内关",
    pinyin: "Neiguan",
    meridian: "PC",
    position: { x: -0.30, y: 0.50, z: 0.04 },
    depth: 1.0,
    angle: 90,
    indications: ["心痛", "心悸", "胸闷", "胃痛", "呕吐", "失眠", "癫狂"],
    methods: ["直刺0.5-1寸"]
  },
  {
    id: "PC8",
    name: "劳宫",
    pinyin: "Laogong",
    meridian: "PC",
    position: { x: -0.36, y: 0.44, z: 0.02 },
    depth: 0.5,
    angle: 90,
    indications: ["中风昏迷", "中暑", "心痛", "癫狂", "口疮", "口臭"],
    methods: ["直刺0.3-0.5寸"]
  },
  
  // 手少阳三焦经 (TE)
  {
    id: "TE5",
    name: "外关",
    pinyin: "Waiguan",
    meridian: "TE",
    position: { x: -0.30, y: 0.52, z: -0.04 },
    depth: 1.0,
    angle: 90,
    indications: ["热病", "头痛", "目赤肿痛", "耳鸣耳聋", "胁肋痛", "上肢痹痛"],
    methods: ["直刺0.5-1寸"]
  },
  
  // 足少阳胆经 (GB)
  {
    id: "GB20",
    name: "风池",
    pinyin: "Fengchi",
    meridian: "GB",
    position: { x: 0.06, y: 0.88, z: -0.08 },
    depth: 1.0,
    angle: 45,
    indications: ["头痛", "眩晕", "颈项强痛", "目赤肿痛", "鼻渊", "耳鸣", "中风", "热病", "感冒"],
    methods: ["针尖向对侧眼球方向刺0.8-1.2寸"]
  },
  {
    id: "GB21",
    name: "肩井",
    pinyin: "Jianjing",
    meridian: "GB",
    position: { x: 0.12, y: 0.82, z: -0.04 },
    depth: 0.8,
    angle: 90,
    indications: ["头痛项强", "肩背痹痛", "手臂不举", "乳痈", "难产"],
    methods: ["直刺0.5-0.8寸"],
    caution: "不宜深刺，孕妇禁针"
  },
  {
    id: "GB34",
    name: "阳陵泉",
    pinyin: "Yanglingquan",
    meridian: "GB",
    position: { x: 0.14, y: 0.26, z: 0.04 },
    depth: 1.5,
    angle: 90,
    indications: ["胁肋痛", "口苦", "呕吐", "黄疸", "下肢痿痹", "膝膑肿痛"],
    methods: ["直刺1-1.5寸"]
  },
  
  // 足厥阴肝经 (LR)
  {
    id: "LR3",
    name: "太冲",
    pinyin: "Taichong",
    meridian: "LR",
    position: { x: -0.06, y: 0.06, z: 0.06 },
    depth: 0.8,
    angle: 90,
    indications: ["头痛", "眩晕", "目赤肿痛", "胁肋痛", "月经不调", "癃闭", "遗尿", "下肢痿痹"],
    methods: ["直刺0.5-0.8寸"]
  },
  
  // 督脉 (DU)
  {
    id: "DU4",
    name: "命门",
    pinyin: "Mingmen",
    meridian: "DU",
    position: { x: 0, y: 0.62, z: -0.14 },
    depth: 0.8,
    angle: 90,
    indications: ["腰脊强痛", "遗尿", "泄泻", "遗精", "阳痿", "赤白带下", "月经不调"],
    methods: ["直刺0.5-1寸"]
  },
  {
    id: "DU14",
    name: "大椎",
    pinyin: "Dazhui",
    meridian: "DU",
    position: { x: 0, y: 0.84, z: -0.12 },
    depth: 1.0,
    angle: 45,
    indications: ["热病", "疟疾", "咳嗽", "气喘", "骨蒸潮热", "项强", "脊痛", "癫狂"],
    methods: ["向上斜刺0.5-1寸"]
  },
  {
    id: "DU20",
    name: "百会",
    pinyin: "Baihui",
    meridian: "DU",
    position: { x: 0, y: 0.98, z: 0 },
    depth: 0.5,
    angle: 15,
    indications: ["头痛", "眩晕", "中风不语", "癫狂", "脱肛", "阴挺", "失眠"],
    methods: ["平刺0.5-0.8寸"]
  },
  {
    id: "DU26",
    name: "水沟",
    pinyin: "Shuigou",
    meridian: "DU",
    position: { x: 0, y: 0.91, z: 0.15 },
    depth: 0.3,
    angle: 45,
    indications: ["昏迷", "晕厥", "癫狂", "急慢惊风", "口眼歪斜", "牙关紧闭", "腰脊强痛"],
    methods: ["向上斜刺0.3-0.5寸"]
  },
  
  // 任脉 (RN)
  {
    id: "RN4",
    name: "关元",
    pinyin: "Guanyuan",
    meridian: "RN",
    position: { x: 0, y: 0.52, z: 0.14 },
    depth: 1.5,
    angle: 90,
    indications: ["中风脱症", "虚劳冷惫", "遗尿", "遗精", "阳痿", "月经不调", "痛经", "带下"],
    methods: ["直刺1-1.5寸"],
    caution: "孕妇慎用"
  },
  {
    id: "RN6",
    name: "气海",
    pinyin: "Qihai",
    meridian: "RN",
    position: { x: 0, y: 0.54, z: 0.14 },
    depth: 1.5,
    angle: 90,
    indications: ["虚脱", "腹痛", "泄泻", "遗尿", "遗精", "阳痿", "月经不调", "痛经"],
    methods: ["直刺1-1.5寸"]
  },
  {
    id: "RN12",
    name: "中脘",
    pinyin: "Zhongwan",
    meridian: "RN",
    position: { x: 0, y: 0.60, z: 0.14 },
    depth: 1.5,
    angle: 90,
    indications: ["胃痛", "呕吐", "吞酸", "腹胀", "泄泻", "黄疸"],
    methods: ["直刺1-1.5寸"]
  },
  {
    id: "RN17",
    name: "膻中",
    pinyin: "Tanzhong",
    meridian: "RN",
    position: { x: 0, y: 0.70, z: 0.14 },
    depth: 0.5,
    angle: 15,
    indications: ["咳嗽", "气喘", "胸闷", "心痛", "乳少", "呕吐"],
    methods: ["平刺0.3-0.5寸"]
  },
]

// 特殊穴位组合
export const SPECIAL_POINT_GROUPS = {
  "四总穴": ["LI4", "ST36", "BL40", "LU7"],
  "回阳九针": ["DU26", "RN4", "ST36", "PC6", "KI1", "LI4", "RN12", "BL23", "DU4"],
  "马丹阳天星十二穴": ["ST36", "GB34", "SP6", "BL40", "LI11", "LI4", "TE5", "SI3", "PC6", "GB20", "DU26", "RN12"],
}

// 计算经络路径点
export function getMeridianPath(meridianId: string): { x: number; y: number; z: number }[] {
  const points = ACUPOINTS.filter(p => p.meridian === meridianId)
  return points.map(p => p.position)
}

// 根据ID获取穴位
export function getAcupointById(id: string): AcupointData | undefined {
  return ACUPOINTS.find(p => p.id === id)
}

// 根据主治症状搜索穴位
export function searchAcupointsByIndication(keyword: string): AcupointData[] {
  return ACUPOINTS.filter(p => 
    p.indications.some(i => i.includes(keyword)) ||
    p.name.includes(keyword) ||
    p.pinyin.toLowerCase().includes(keyword.toLowerCase())
  )
}
