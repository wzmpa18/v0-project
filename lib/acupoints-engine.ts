// 穴位智能推荐引擎
// 基于循经取穴、表里经配伍、对症选穴三种策略

import { ACUPOINTS_FOURTEEN, type AcupointFull } from "./acupoints-fourteen"
import { ACUPOINTS_EXTRA, type AcupointExtra } from "./acupoints-extra"

// 统一穴位类型
export interface UnifiedAcupoint {
  id: string
  name: string
  pinyin: string
  meridian: string
  system: "fourteen" | "extra" | "dong"
  category: string
  locationDesc: string
  indications: string[]
  needling: string
  coordinates: [number, number, number]
}

// 合并所有穴位数据
export const ALL_ACUPOINTS: UnifiedAcupoint[] = [
  ...ACUPOINTS_FOURTEEN.map(p => ({ ...p, system: "fourteen" as const })),
  ...ACUPOINTS_EXTRA.map(p => ({ ...p, system: p.system as "extra" | "dong" })),
]

// 经络代码到中文名映射
export const MERIDIAN_NAMES: Record<string, string> = {
  LU: "手太阴肺经", LI: "手阳明大肠经", ST: "足阳明胃经", SP: "足太阴脾经",
  HT: "手少阴心经", SI: "手太阳小肠经", BL: "足太阳膀胱经", KI: "足少阴肾经",
  PC: "手厥阴心包经", TE: "手少阳三焦经", GB: "足少阳胆经", LR: "足厥阴肝经",
  CV: "任脉", GV: "督脉", EX: "经外奇穴", DONG: "董氏奇穴",
}

// 经络颜色映射
export const MERIDIAN_COLORS: Record<string, string> = {
  LU: "#FFD700", LI: "#FFA500", ST: "#FFEC8B", SP: "#8B4513",
  HT: "#FF0000", SI: "#FF6347", BL: "#4169E1", KI: "#000080",
  PC: "#8B0000", TE: "#9370DB", GB: "#228B22", LR: "#006400",
  CV: "#FF69B4", GV: "#FF1493", EX: "#00CED1", DONG: "#FF8C00",
}

// 表里经关系
export const BIAOLI_PAIRS: Record<string, string> = {
  LU: "LI", LI: "LU",
  SP: "ST", ST: "SP",
  HT: "SI", SI: "HT",
  KI: "BL", BL: "KI",
  PC: "TE", TE: "PC",
  LR: "GB", GB: "LR",
}

// 身体部位定义
export interface BodyPart {
  id: string
  name: string
  meridians: string[]  // 该部位经过的经络
  region: string  // 区域分类
}

// 身体部位到经络的映射
export const BODY_PARTS: BodyPart[] = [
  { id: "head", name: "头面部", meridians: ["ST", "BL", "GB", "GV", "CV", "DU"], region: "头部" },
  { id: "forehead", name: "前额部", meridians: ["BL", "GB", "GV"], region: "头部" },
  { id: "eye", name: "眼部", meridians: ["BL", "GB", "ST", "LR"], region: "头部" },
  { id: "nose", name: "鼻部", meridians: ["LI", "ST", "BL"], region: "头部" },
  { id: "ear", name: "耳部", meridians: ["TE", "GB", "SI"], region: "头部" },
  { id: "mouth", name: "口唇部", meridians: ["ST", "CV", "GV"], region: "头部" },
  { id: "neck", name: "颈项部", meridians: ["LI", "ST", "TE", "BL", "GV"], region: "颈部" },
  { id: "chest", name: "胸腹部", meridians: ["LU", "PC", "HT", "ST", "SP", "KI", "CV"], region: "躯干" },
  { id: "abdomen", name: "腹部", meridians: ["ST", "SP", "KI", "CV", "LR"], region: "躯干" },
  { id: "back", name: "腰背部", meridians: ["BL", "GV", "SI"], region: "躯干" },
  { id: "shoulder", name: "肩臂部", meridians: ["LI", "TE", "SI", "PC"], region: "上肢" },
  { id: "arm", name: "上肢部", meridians: ["LU", "LI", "HT", "SI", "PC", "TE"], region: "上肢" },
  { id: "hand", name: "手部", meridians: ["LU", "LI", "HT", "SI", "PC", "TE"], region: "上肢" },
  { id: "hip", name: "髋臀部", meridians: ["BL", "GB", "LR"], region: "下肢" },
  { id: "thigh", name: "大腿部", meridians: ["ST", "SP", "BL", "KI", "GB", "LR"], region: "下肢" },
  { id: "knee", name: "膝部", meridians: ["ST", "SP", "BL", "GB", "LR"], region: "下肢" },
  { id: "leg", name: "小腿部", meridians: ["ST", "SP", "BL", "KI", "GB", "LR"], region: "下肢" },
  { id: "foot", name: "足部", meridians: ["ST", "SP", "BL", "KI", "GB", "LR"], region: "下肢" },
]

// 症状定义
export interface Symptom {
  id: string
  name: string
  category: string
}

export const SYMPTOMS: Symptom[] = [
  { id: "suan", name: "酸", category: "感觉" },
  { id: "ma", name: "麻", category: "感觉" },
  { id: "zhang", name: "胀", category: "感觉" },
  { id: "tong", name: "痛", category: "感觉" },
  { id: "re", name: "热", category: "温度" },
  { id: "liang", name: "凉", category: "温度" },
  { id: "chenzhong", name: "沉重", category: "感觉" },
  { id: "wuli", name: "无力", category: "运动" },
  { id: "citong", name: "刺痛", category: "疼痛" },
  { id: "duntong", name: "钝痛", category: "疼痛" },
  { id: "zhuotong", name: "灼痛", category: "疼痛" },
  { id: "choutong", name: "抽痛", category: "疼痛" },
]

// 推荐结果
export interface Recommendation {
  acupoint: UnifiedAcupoint
  reason: string
  strategy: "meridian" | "biaoli" | "symptom"
}

// 各经络的关键穴位（五输穴、原穴、络穴等特定穴）
const KEY_POINTS_BY_MERIDIAN: Record<string, string[]> = {
  LU: ["LU5", "LU7", "LU9", "LU11"],        // 尺泽、列缺、太渊、少商
  LI: ["LI4", "LI11", "LI1", "LI3"],         // 合谷、曲池、商阳、三间
  ST: ["ST36", "ST44", "ST45", "ST40"],      // 足三里、内庭、厉兑、丰隆
  SP: ["SP6", "SP9", "SP1", "SP3"],          // 三阴交、阴陵泉、隐白、太白
  HT: ["HT3", "HT7", "HT9", "HT1"],          // 少海、神门、少冲、极泉
  SI: ["SI3", "SI8", "SI1", "SI6"],          // 后溪、小海、少泽、养老
  BL: ["BL40", "BL60", "BL67", "BL23"],      // 委中、昆仑、至阴、肾俞
  KI: ["KI3", "KI10", "KI1", "KI6"],         // 太溪、阴谷、涌泉、照海
  PC: ["PC3", "PC6", "PC9", "PC4"],          // 曲泽、内关、中冲、郄门
  TE: ["TE5", "TE10", "TE1", "TE3"],         // 外关、天井、关冲、中渚
  GB: ["GB34", "GB43", "GB44", "GB20"],      // 阳陵泉、足临泣、足窍阴、风池
  LR: ["LR3", "LR8", "LR1", "LR2"],          // 太冲、曲泉、大敦、行间
  CV: ["CV4", "CV6", "CV12", "CV17"],        // 关元、气海、中脘、膻中
  GV: ["GV20", "GV14", "GV26", "GV4"],       // 百会、大椎、水沟、命门
}

// 症状到推荐穴位的映射
const SYMPTOM_POINT_MAP: Record<string, string[]> = {
  // 酸 → 补气健脾
  suan: ["ST36", "SP6", "CV12", "CV6", "BL20", "BL21"],
  // 麻 → 活血通络
  ma: ["LR3", "GB34", "LI11", "ST36", "SP6", "BL17"],
  // 胀 → 行气消胀
  zhang: ["CV12", "ST25", "ST36", "PC6", "LR3", "SP15"],
  // 痛 → 通经止痛
  tong: ["LI4", "LR3", "ST36", "BL60", "TE5", "PC6"],
  // 热 → 清热泻火
  re: ["LI11", "GV14", "BL13", "BL40", "HT7", "PC3"],
  // 凉 → 温阳散寒
  liang: ["CV4", "CV6", "BL23", "BL20", "ST36", "KI3"],
  // 沉重 → 健脾化湿
  chenzhong: ["SP9", "ST36", "SP6", "BL20", "BL22", "CV9"],
  // 无力 → 补益气血
  wuli: ["ST36", "SP6", "CV4", "CV6", "BL23", "BL20", "BL21"],
  // 刺痛 → 活血化瘀
  citong: ["BL17", "SP10", "LR3", "LI11", "PC6", "SP6"],
  // 钝痛 → 温通经脉
  duntong: ["CV4", "ST36", "BL23", "BL20", "LR3", "KI3"],
  // 灼痛 → 清热凉血
  zhuotong: ["LI11", "BL40", "HT7", "PC3", "SP10", "BL13"],
  // 抽痛 → 熄风止痉
  choutong: ["LR3", "GB34", "GV20", "BL18", "PC6", "TE5"],
}

// 获取经络的关键穴位
function getKeyPointsByMeridian(meridian: string): UnifiedAcupoint[] {
  const ids = KEY_POINTS_BY_MERIDIAN[meridian] || []
  return ids
    .map(id => ALL_ACUPOINTS.find(p => p.id === id))
    .filter((p): p is UnifiedAcupoint => p !== undefined)
}

// 搜索穴位
export function searchAcupoints(query: string): UnifiedAcupoint[] {
  if (!query.trim()) return []
  const q = query.trim().toLowerCase()
  return ALL_ACUPOINTS.filter(p =>
    p.name.includes(query) ||
    p.pinyin.toLowerCase().includes(q) ||
    p.id.toLowerCase().includes(q) ||
    p.indications.some(i => i.includes(query))
  ).slice(0, 50)
}

// 按体系筛选
export function filterBySystem(system: "all" | "fourteen" | "extra" | "dong"): UnifiedAcupoint[] {
  if (system === "all") return ALL_ACUPOINTS
  return ALL_ACUPOINTS.filter(p => p.system === system)
}

// 按经络筛选
export function filterByMeridian(meridian: string): UnifiedAcupoint[] {
  return ALL_ACUPOINTS.filter(p => p.meridian === meridian)
}

// 智能推荐：根据身体部位和症状推荐穴位
export function recommendAcupoints(
  bodyPartId: string,
  symptomIds: string[]
): Recommendation[] {
  const recommendations: Recommendation[] = []
  const seenIds = new Set<string>()

  const bodyPart = BODY_PARTS.find(p => p.id === bodyPartId)
  if (!bodyPart) return recommendations

  // 策略1：循经取穴 — 根据部位所在经络推荐关键穴位
  bodyPart.meridians.forEach(meridian => {
    const keyPoints = getKeyPointsByMeridian(meridian)
    keyPoints.forEach(point => {
      if (!seenIds.has(point.id)) {
        seenIds.add(point.id)
        recommendations.push({
          acupoint: point,
          reason: `${bodyPart.name}属${MERIDIAN_NAMES[meridian] || meridian}循行部位，取本经${point.category || '要穴'}${point.name}疏通经气`,
          strategy: "meridian",
        })
      }
    })
  })

  // 策略2：表里经配伍 — 取表里经的关键穴位
  bodyPart.meridians.forEach(meridian => {
    const pair = BIAOLI_PAIRS[meridian]
    if (pair) {
      const pairPoints = getKeyPointsByMeridian(pair)
      pairPoints.slice(0, 2).forEach(point => {
        if (!seenIds.has(point.id)) {
          seenIds.add(point.id)
          recommendations.push({
            acupoint: point,
            reason: `${MERIDIAN_NAMES[meridian]}与${MERIDIAN_NAMES[pair]}相表里，配取${point.name}以加强疗效`,
            strategy: "biaoli",
          })
        }
      })
    }
  })

  // 策略3：对症选穴 — 根据症状推荐针对性穴位
  symptomIds.forEach(symId => {
    const pointIds = SYMPTOM_POINT_MAP[symId] || []
    pointIds.forEach(pid => {
      const point = ALL_ACUPOINTS.find(p => p.id === pid)
      if (point && !seenIds.has(point.id)) {
        seenIds.add(point.id)
        const symptom = SYMPTOMS.find(s => s.id === symId)
        recommendations.push({
          acupoint: point,
          reason: `针对"${symptom?.name || symId}"症状，取${point.name}（${MERIDIAN_NAMES[point.meridian] || point.meridian}）对症治疗`,
          strategy: "symptom",
        })
      }
    })
  })

  // 按策略优先级排序：循经 > 表里 > 对症
  const priority = { meridian: 0, biaoli: 1, symptom: 2 }
  recommendations.sort((a, b) => priority[a.strategy] - priority[b.strategy])

  return recommendations.slice(0, 15)
}

// 获取穴位详情
export function getAcupointDetail(id: string): UnifiedAcupoint | undefined {
  return ALL_ACUPOINTS.find(p => p.id === id)
}

// 获取穴位配伍建议
export function getAcupointCombination(id: string): UnifiedAcupoint[] {
  const point = ALL_ACUPOINTS.find(p => p.id === id)
  if (!point) return []

  const combos: UnifiedAcupoint[] = []

  // 同经络的其他关键穴位
  const sameMeridian = ALL_ACUPOINTS.filter(p =>
    p.meridian === point.meridian && p.id !== id
  ).slice(0, 3)
  combos.push(...sameMeridian)

  // 表里经穴位
  const pair = BIAOLI_PAIRS[point.meridian]
  if (pair) {
    const pairPoints = getKeyPointsByMeridian(pair).slice(0, 2)
    combos.push(...pairPoints)
  }

  return combos.slice(0, 5)
}

// 统计信息
export function getAcupointStats() {
  return {
    total: ALL_ACUPOINTS.length,
    fourteen: ALL_ACUPOINTS.filter(p => p.system === "fourteen").length,
    extra: ALL_ACUPOINTS.filter(p => p.system === "extra").length,
    dong: ALL_ACUPOINTS.filter(p => p.system === "dong").length,
  }
}
