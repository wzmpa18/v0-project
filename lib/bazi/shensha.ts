/**
 * 神煞计算模块
 *
 * 依据：《协纪辨方书》《渊海子平》传统神煞口诀
 * 排版标准：问真八字APP（干类神煞同时从年干、日干起；支类神煞从年支、日支三合局起）
 *
 * 用法：
 *   const ss = getPillarShenSha({ yearGan, monthGan, dayGan, hourGan, yearZhi, monthZhi, dayZhi, hourZhi })
 *   ss.year / ss.month / ss.day / ss.hour 各返回一个神煞字符串数组
 *
 *   单柱（用于大运、流年）：
 *   getShenShaForGanZhi(gan, zhi, baseInfo)
 */

export interface FourPillars {
  yearGan: string
  monthGan: string
  dayGan: string
  hourGan: string
  yearZhi: string
  monthZhi: string
  dayZhi: string
  hourZhi: string
}

// ---------- 干类神煞表（key=天干，value=对应地支） ----------

// 天乙贵人：甲戊庚牛羊，乙己鼠猴乡，丙丁猪鸡位，壬癸兔蛇藏，六辛逢马虎
const TIANYI: Record<string, string[]> = {
  甲: ['丑', '未'], 戊: ['丑', '未'], 庚: ['丑', '未'],
  乙: ['子', '申'], 己: ['子', '申'],
  丙: ['亥', '酉'], 丁: ['亥', '酉'],
  壬: ['卯', '巳'], 癸: ['卯', '巳'],
  辛: ['寅', '午'],
}

// 太极贵人
const TAIJI: Record<string, string[]> = {
  甲: ['子', '午'], 乙: ['子', '午'],
  丙: ['卯', '酉'], 丁: ['卯', '酉'],
  戊: ['辰', '戌', '丑', '未'], 己: ['辰', '戌', '丑', '未'],
  庚: ['寅', '亥'], 辛: ['寅', '亥'],
  壬: ['巳', '申'], 癸: ['巳', '申'],
}

// 天厨贵人（食神临官）
const TIANCHU: Record<string, string[]> = {
  甲: ['巳'], 乙: ['午'], 丙: ['巳'], 丁: ['午'], 戊: ['申'],
  己: ['酉'], 庚: ['亥'], 辛: ['子'], 壬: ['寅'], 癸: ['卯'],
}

// 福星贵人
const FUXING: Record<string, string[]> = {
  甲: ['寅', '子'], 丙: ['寅', '子'],
  乙: ['丑', '卯'], 癸: ['丑', '卯'],
  丁: ['亥'], 己: ['酉'],
  戊: ['申'], 庚: ['午'],
  辛: ['巳'], 壬: ['辰'],
}

// 文昌贵人
const WENCHANG: Record<string, string[]> = {
  甲: ['巳'], 乙: ['午'], 丙: ['申'], 丁: ['酉'], 戊: ['申'],
  己: ['酉'], 庚: ['亥'], 辛: ['子'], 壬: ['寅'], 癸: ['卯'],
}

// 国印贵人
const GUOYIN: Record<string, string[]> = {
  甲: ['戌'], 乙: ['亥'], 丙: ['丑'], 丁: ['寅'], 戊: ['丑'],
  己: ['寅'], 庚: ['辰'], 辛: ['巳'], 壬: ['未'], 癸: ['申'],
}

// 学堂（长生位）
const XUETANG: Record<string, string[]> = {
  甲: ['亥'], 乙: ['午'], 丙: ['寅'], 丁: ['酉'], 戊: ['寅'],
  己: ['酉'], 庚: ['巳'], 辛: ['子'], 壬: ['申'], 癸: ['卯'],
}

// 词馆（临官前一位/学馆）
const CIGUAN: Record<string, string[]> = {
  甲: ['寅'], 乙: ['卯'], 丙: ['巳'], 丁: ['午'], 戊: ['申'],
  己: ['酉'], 庚: ['亥'], 辛: ['子'], 壬: ['寅'], 癸: ['卯'],
}

// 禄神（临官）
const LUSHEN: Record<string, string[]> = {
  甲: ['寅'], 乙: ['卯'], 丙: ['巳'], 丁: ['午'], 戊: ['巳'],
  己: ['午'], 庚: ['申'], 辛: ['酉'], 壬: ['亥'], 癸: ['子'],
}

// 羊刃（帝旺，仅阳干显著，阴干为禄前一位）
const YANGREN: Record<string, string[]> = {
  甲: ['卯'], 乙: ['寅'], 丙: ['午'], 丁: ['巳'], 戊: ['午'],
  己: ['巳'], 庚: ['酉'], 辛: ['申'], 壬: ['子'], 癸: ['亥'],
}

// 飞刃（羊刃对冲）
const FEIREN: Record<string, string[]> = {
  甲: ['酉'], 乙: ['申'], 丙: ['子'], 丁: ['亥'], 戊: ['子'],
  己: ['亥'], 庚: ['卯'], 辛: ['寅'], 壬: ['午'], 癸: ['巳'],
}

// 红艳煞
const HONGYAN: Record<string, string[]> = {
  甲: ['午'], 乙: ['午'], 丙: ['寅'], 丁: ['未'], 戊: ['辰'],
  己: ['辰'], 庚: ['戌'], 辛: ['酉'], 壬: ['子'], 癸: ['申'],
}

// 金舆（禄前二位）
const JINYU: Record<string, string[]> = {
  甲: ['辰'], 乙: ['巳'], 丙: ['未'], 丁: ['申'], 戊: ['未'],
  己: ['申'], 庚: ['戌'], 辛: ['亥'], 壬: ['丑'], 癸: ['寅'],
}

// 流霞
const LIUXIA: Record<string, string[]> = {
  甲: ['酉'], 乙: ['戌'], 丙: ['未'], 丁: ['申'], 戊: ['巳'],
  己: ['午'], 庚: ['辰'], 辛: ['卯'], 壬: ['亥'], 癸: ['寅'],
}

// ---------- 支类神煞（按三合局，key=查神所依地支） ----------

// 三合局归类：寅午戌(火)、申子辰(水)、巳酉丑(金)、亥卯未(木)
function sanHeGroup(zhi: string): '火' | '水' | '金' | '木' {
  if (['寅', '午', '戌'].includes(zhi)) return '火'
  if (['申', '子', '辰'].includes(zhi)) return '水'
  if (['巳', '酉', '丑'].includes(zhi)) return '金'
  return '木' // 亥卯未
}

// 各三合局对应的神煞地支
const JIANGXING: Record<string, string> = { 火: '午', 水: '子', 金: '酉', 木: '卯' }
const HUAGAI: Record<string, string> = { 火: '戌', 水: '辰', 金: '丑', 木: '未' }
const YIMA: Record<string, string> = { 火: '申', 水: '寅', 金: '亥', 木: '巳' }
const TAOHUA: Record<string, string> = { 火: '卯', 水: '酉', 金: '午', 木: '子' } // 咸池
const JIESHA: Record<string, string> = { 火: '亥', 水: '巳', 金: '寅', 木: '申' }
const ZAISHA: Record<string, string> = { 火: '子', 水: '午', 金: '卯', 木: '酉' }
const WANGSHEN: Record<string, string> = { 火: '巳', 水: '亥', 金: '申', 木: '寅' }

// 红鸾（年支起）
const HONGLUAN: Record<string, string> = {
  子: '卯', 丑: '寅', 寅: '丑', 卯: '子', 辰: '亥', 巳: '戌',
  午: '酉', 未: '申', 申: '未', 酉: '午', 戌: '巳', 亥: '辰',
}
// 天喜（红鸾对冲）
const TIANXI: Record<string, string> = {
  子: '酉', 丑: '申', 寅: '未', 卯: '午', 辰: '巳', 巳: '辰',
  午: '卯', 未: '寅', 申: '丑', 酉: '子', 戌: '亥', 亥: '戌',
}

// 孤辰、寡宿（按年支三会）
function getGuChen(zhi: string): string {
  if (['亥', '子', '丑'].includes(zhi)) return '寅'
  if (['寅', '卯', '辰'].includes(zhi)) return '巳'
  if (['巳', '午', '未'].includes(zhi)) return '申'
  return '亥' // 申酉戌
}
function getGuaSu(zhi: string): string {
  if (['亥', '子', '丑'].includes(zhi)) return '戌'
  if (['寅', '卯', '辰'].includes(zhi)) return '丑'
  if (['巳', '午', '未'].includes(zhi)) return '辰'
  return '未' // 申酉戌
}

// 披麻、丧门、吊客（按年支前后位）
const ZHI_ORDER = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
function shiftZhi(zhi: string, n: number): string {
  const i = ZHI_ORDER.indexOf(zhi)
  return ZHI_ORDER[(i + n + 12) % 12]
}

// ---------- 月支类神煞 ----------

// 天德贵人（按月支）
const TIANDE: Record<string, string> = {
  寅: '丁', 卯: '申', 辰: '壬', 巳: '辛', 午: '亥', 未: '甲',
  申: '癸', 酉: '寅', 戌: '丙', 亥: '乙', 子: '巳', 丑: '庚',
}
// 天德合
const TIANDE_HE: Record<string, string> = {
  寅: '壬', 辰: '丁', 午: '寅', 申: '戊', 戌: '辛', 子: '申',
}
// 月德贵人（按月支三合局）
const YUEDE: Record<string, string> = {
  火: '丙', 水: '壬', 金: '庚', 木: '甲',
}
// 月德合
const YUEDE_HE: Record<string, string> = {
  火: '辛', 水: '丁', 金: '乙', 木: '己',
}
// 天医（月支前一位）
function getTianYi(monthZhi: string): string {
  return shiftZhi(monthZhi, -1)
}
// 血刃（按月支）
const XUEREN: Record<string, string> = {
  寅: '戌', 卯: '亥', 辰: '子', 巳: '丑', 午: '寅', 未: '卯',
  申: '辰', 酉: '巳', 戌: '午', 亥: '未', 子: '申', 丑: '酉',
}

// 德秀贵人（按月支三合局 + 天干）
// 寅午戌月：丙丁为德，戊癸为秀
// 申子辰月：壬癸戊己为德，丙辛甲己为秀（简化：戊癸为德，丙丁为秀）
// 巳酉丑月：庚辛为德，乙庚为秀
// 亥卯未月：甲乙为德，丁壬为秀
function getDeXiuGans(monthZhi: string): string[] {
  const g = sanHeGroup(monthZhi)
  switch (g) {
    case '火': return ['丙', '丁', '戊', '癸']
    case '水': return ['壬', '癸', '戊', '己', '丙', '辛']
    case '金': return ['庚', '辛', '乙']
    case '木': return ['甲', '乙', '丁', '壬']
  }
}

// 天罗地网
// 戌亥为天罗（火命/辰巳日），辰巳为地网。简化：地支见辰巳为地网，戌亥为天罗
function getLuoWang(zhi: string): string | null {
  if (zhi === '戌' || zhi === '亥') return '天罗'
  if (zhi === '辰' || zhi === '巳') return '地网'
  return null
}

interface ShenShaContext {
  yearGan: string
  dayGan: string
  monthGan: string
  yearZhi: string
  dayZhi: string
  monthZhi: string
}

/**
 * 计算某一柱（gan + zhi）的神煞
 */
export function getShenShaForGanZhi(gan: string, zhi: string, ctx: ShenShaContext): string[] {
  const result: string[] = []
  const add = (name: string) => { if (!result.includes(name)) result.push(name) }

  // ===== 干类（以年干、日干为主查地支 zhi）=====
  const refGans = [ctx.dayGan, ctx.yearGan]

  for (const rg of refGans) {
    if (TIANYI[rg]?.includes(zhi)) add('天乙贵人')
    if (TAIJI[rg]?.includes(zhi)) add('太极贵人')
    if (FUXING[rg]?.includes(zhi)) add('福星贵人')
    if (GUOYIN[rg]?.includes(zhi)) add('国印贵人')
    if (WENCHANG[rg]?.includes(zhi)) add('文昌贵人')
  }
  // 以下仅以日干为准
  if (TIANCHU[ctx.dayGan]?.includes(zhi)) add('天厨贵人')
  if (XUETANG[ctx.dayGan]?.includes(zhi)) add('学堂')
  if (CIGUAN[ctx.dayGan]?.includes(zhi)) add('词馆')
  if (LUSHEN[ctx.dayGan]?.includes(zhi)) add('禄神')
  if (YANGREN[ctx.dayGan]?.includes(zhi)) add('羊刃')
  if (FEIREN[ctx.dayGan]?.includes(zhi)) add('飞刃')
  if (HONGYAN[ctx.dayGan]?.includes(zhi)) add('红艳煞')
  if (JINYU[ctx.dayGan]?.includes(zhi)) add('金舆')
  if (LIUXIA[ctx.dayGan]?.includes(zhi)) add('流霞')

  // ===== 德秀贵人（看本柱天干是否属德秀，月支定局）=====
  if (getDeXiuGans(ctx.monthZhi).includes(gan)) add('德秀贵人')

  // ===== 月支类（查天干 gan）=====
  if (TIANDE[ctx.monthZhi] === gan) add('天德贵人')
  if (TIANDE[ctx.monthZhi] === zhi) add('天德贵人') // 天德也可能落地支
  if (TIANDE_HE[ctx.monthZhi] === gan) add('天德合')
  const yuedeGroup = sanHeGroup(ctx.monthZhi)
  if (YUEDE[yuedeGroup] === gan) add('月德贵人')
  if (YUEDE_HE[yuedeGroup] === gan) add('月德合')

  // ===== 支类（以年支、日支为主，查地支 zhi）=====
  const refZhis = [ctx.yearZhi, ctx.dayZhi]
  for (const rz of refZhis) {
    const g = sanHeGroup(rz)
    if (JIANGXING[g] === zhi) add('将星')
    if (HUAGAI[g] === zhi) add('华盖')
    if (YIMA[g] === zhi) add('驿马')
    if (TAOHUA[g] === zhi) add('桃花')
    if (JIESHA[g] === zhi) add('劫煞')
    if (ZAISHA[g] === zhi) add('灾煞')
    if (WANGSHEN[g] === zhi) add('亡神')
    if (getGuChen(rz) === zhi) add('孤辰')
    if (getGuaSu(rz) === zhi) add('寡宿')
  }

  // 红鸾、天喜（以年支起）
  if (HONGLUAN[ctx.yearZhi] === zhi) add('红鸾')
  if (TIANXI[ctx.yearZhi] === zhi) add('天喜')

  // 披麻、丧门、吊客、元辰（以年支前后位）
  if (shiftZhi(ctx.yearZhi, -3) === zhi) add('披麻')
  if (shiftZhi(ctx.yearZhi, 2) === zhi) add('丧门')
  if (shiftZhi(ctx.yearZhi, -2) === zhi) add('吊客')

  // 天医（月支前一位）
  if (getTianYi(ctx.monthZhi) === zhi) add('天医')
  // 血刃（月支）
  if (XUEREN[ctx.monthZhi] === zhi) add('血刃')

  // 天罗地网
  const lw = getLuoWang(zhi)
  if (lw) add(lw)

  return result
}

/**
 * 计算四柱神煞
 */
export function getPillarShenSha(p: FourPillars): {
  year: string[]
  month: string[]
  day: string[]
  hour: string[]
} {
  const ctx: ShenShaContext = {
    yearGan: p.yearGan, dayGan: p.dayGan, monthGan: p.monthGan,
    yearZhi: p.yearZhi, dayZhi: p.dayZhi, monthZhi: p.monthZhi,
  }
  return {
    year: getShenShaForGanZhi(p.yearGan, p.yearZhi, ctx),
    month: getShenShaForGanZhi(p.monthGan, p.monthZhi, ctx),
    day: getShenShaForGanZhi(p.dayGan, p.dayZhi, ctx),
    hour: getShenShaForGanZhi(p.hourGan, p.hourZhi, ctx),
  }
}
