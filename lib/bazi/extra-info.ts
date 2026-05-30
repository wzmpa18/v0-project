// 计算"基本信息"页所需的经典命理字段：
// 星座、星宿、胎元、胎息、命宫、身宫、命卦、人元司令分野、出生节气、袁天罡称骨

import { NAYIN } from "./constants"
import { BaziResult } from "./lunar-calculator"

const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
const GAN_WUXING: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水",
}

// 年干起月干（五虎遁）：寅月天干索引
const YEAR_GAN_YIN_START: Record<string, number> = {
  甲: 2, 己: 2, 乙: 4, 庚: 4, 丙: 6, 辛: 6, 丁: 8, 壬: 8, 戊: 0, 癸: 0,
}

// 地支序（命宫/身宫用：寅=1 ... 亥=10, 子=11, 丑=12）
const ZHI_ORDER: Record<string, number> = {
  寅: 1, 卯: 2, 辰: 3, 巳: 4, 午: 5, 未: 6,
  申: 7, 酉: 8, 戌: 9, 亥: 10, 子: 11, 丑: 12,
}
const ORDER_ZHI: Record<number, string> = Object.fromEntries(
  Object.entries(ZHI_ORDER).map(([z, o]) => [o, z]),
)

// 五合 / 六合
const WU_HE: Record<string, string> = { 甲: "己", 己: "甲", 乙: "庚", 庚: "乙", 丙: "辛", 辛: "丙", 丁: "壬", 壬: "丁", 戊: "癸", 癸: "戊" }
const LIU_HE: Record<string, string> = { 子: "丑", 丑: "子", 寅: "亥", 亥: "寅", 卯: "戌", 戌: "卯", 辰: "酉", 酉: "辰", 巳: "申", 申: "巳", 午: "未", 未: "午" }

// 二十八宿（顺序）与方位神兽
const XIU_28 = [
  "角", "亢", "氐", "房", "心", "尾", "箕", // 东方青龙
  "斗", "牛", "女", "虚", "危", "室", "壁", // 北方玄武
  "奎", "娄", "胃", "昴", "毕", "觜", "参", // 西方白虎
  "井", "鬼", "柳", "星", "张", "翼", "轸", // 南方朱雀
]
function getXiuFangwei(idx: number): string {
  if (idx <= 6) return "东方青龙"
  if (idx <= 13) return "北方玄武"
  if (idx <= 20) return "西方白虎"
  return "南方朱雀"
}

// 人元司令分野（节后第 n 日累计边界）
const SILING_RANGES: Record<string, { gan: string; end: number }[]> = {
  子: [{ gan: "壬", end: 10 }, { gan: "癸", end: 30 }],
  丑: [{ gan: "癸", end: 9 }, { gan: "辛", end: 12 }, { gan: "己", end: 30 }],
  寅: [{ gan: "戊", end: 7 }, { gan: "丙", end: 14 }, { gan: "甲", end: 30 }],
  卯: [{ gan: "甲", end: 10 }, { gan: "乙", end: 30 }],
  辰: [{ gan: "乙", end: 9 }, { gan: "癸", end: 12 }, { gan: "戊", end: 30 }],
  巳: [{ gan: "戊", end: 5 }, { gan: "庚", end: 14 }, { gan: "丙", end: 30 }],
  午: [{ gan: "丙", end: 10 }, { gan: "己", end: 19 }, { gan: "丁", end: 30 }],
  未: [{ gan: "丁", end: 9 }, { gan: "乙", end: 12 }, { gan: "己", end: 30 }],
  申: [{ gan: "戊", end: 10 }, { gan: "壬", end: 13 }, { gan: "庚", end: 30 }],
  酉: [{ gan: "庚", end: 10 }, { gan: "辛", end: 30 }],
  戌: [{ gan: "辛", end: 9 }, { gan: "丁", end: 12 }, { gan: "戊", end: 30 }],
  亥: [{ gan: "戊", end: 7 }, { gan: "甲", end: 14 }, { gan: "壬", end: 30 }],
}

function dayNum(y: number, m: number, d: number): number {
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000)
}

function reduceOrder(n: number): number {
  let x = n
  while (x > 12) x -= 12
  while (x < 1) x += 12
  return x
}

function nayin(ganZhi: string): string {
  return NAYIN[ganZhi] || ""
}

// 星座
function getXingZuo(month: number, day: number): string {
  const arr: [number, string][] = [
    [120, "摩羯座"], [219, "水瓶座"], [321, "双鱼座"], [420, "白羊座"],
    [521, "金牛座"], [622, "双子座"], [723, "巨蟹座"], [823, "狮子座"],
    [923, "处女座"], [1024, "天秤座"], [1123, "天蝎座"], [1222, "射手座"], [1232, "摩羯座"],
  ]
  const md = month * 100 + day
  for (const [bound, name] of arr) {
    if (md < bound) return name
  }
  return "摩羯座"
}

// 星宿（以 1988-11-29 = 翼 校准，index 26）
function getXingXiu(y: number, m: number, d: number): string {
  const anchor = dayNum(1988, 11, 29)
  const anchorIdx = 26
  const idx = (((dayNum(y, m, d) - anchor) % 28) + anchorIdx + 28 * 100) % 28
  const name = XIU_28[idx]
  return `${name}宿${getXiuFangwei(idx)}`
}

export interface ExtraInfo {
  xingZuo: string
  xingXiu: string
  taiYuan: string
  taiYuanNaYin: string
  taiXi: string
  taiXiNaYin: string
  mingGong: string
  mingGongNaYin: string
  shenGong: string
  shenGongNaYin: string
  mingGua: string
  mingGuaDirection: string
  siLing: string
  jieQiText: string
  prevJie: string
  prevJieDate: string
  nextJie: string
  nextJieDate: string
  chenGuWeight: string
  chenGuPoem: string
  trueSolarTime: string
}

export function computeExtraInfo(
  result: BaziResult,
  gender: "male" | "female",
  birthHourIndex: number,
): ExtraInfo {
  const yearGan = result.year.gan
  const monthGan = result.month.gan
  const monthZhi = result.month.zhi
  const dayGan = result.day.gan
  const dayZhi = result.day.zhi
  const hourZhi = result.hour.zhi

  // 胎元
  const taiYuanGan = TIANGAN[(TIANGAN.indexOf(monthGan) + 1) % 10]
  const taiYuanZhi = DIZHI[(DIZHI.indexOf(monthZhi) + 3) % 12]
  const taiYuan = taiYuanGan + taiYuanZhi

  // 胎息
  const taiXi = (WU_HE[dayGan] || dayGan) + (LIU_HE[dayZhi] || dayZhi)

  // 命宫 / 身宫
  const mOrder = ZHI_ORDER[monthZhi] ?? 1
  const hOrder = ZHI_ORDER[hourZhi] ?? 1
  const mgOrder = reduceOrder(26 - (mOrder + hOrder))
  const sgOrder = reduceOrder(mOrder + hOrder + 2)
  const yinStart = YEAR_GAN_YIN_START[yearGan] ?? 0
  const mgZhi = ORDER_ZHI[mgOrder]
  const sgZhi = ORDER_ZHI[sgOrder]
  const mgGan = TIANGAN[(yinStart + (mgOrder - 1)) % 10]
  const sgGan = TIANGAN[(yinStart + (sgOrder - 1)) % 10]
  const mingGong = mgGan + mgZhi
  const shenGong = sgGan + sgZhi

  // 命卦
  const y = result.solar.year
  let digitSum = String(y).split("").reduce((a, c) => a + Number(c), 0)
  while (digitSum > 9) digitSum = String(digitSum).split("").reduce((a, c) => a + Number(c), 0)
  let guaNum: number
  if (gender === "male") {
    guaNum = y >= 2000 ? 9 - digitSum : 11 - digitSum
  } else {
    guaNum = y >= 2000 ? digitSum + 6 : digitSum + 4
  }
  while (guaNum > 9) guaNum -= 9
  if (guaNum <= 0) guaNum += 9
  let guaName = ""
  if (guaNum === 5) {
    guaName = gender === "male" ? "坤" : "艮"
    guaNum = gender === "male" ? 2 : 8
  } else {
    const map: Record<number, string> = { 1: "坎", 2: "坤", 3: "震", 4: "巽", 6: "乾", 7: "兑", 8: "艮", 9: "离" }
    guaName = map[guaNum] || "坎"
  }
  const east = new Set([1, 3, 4, 9])
  const mingGua = guaName + "卦"
  const mingGuaDirection = east.has(guaNum) ? "东四命" : "西四命"

  // 人元司令分野 + 出生节气
  let siLing = ""
  let jieQiText = ""
  const ranges = SILING_RANGES[monthZhi] || []
  let daysAfter = 0
  let daysToNext = 0
  const prevMatch = (result.jieQi.prevJieDate || "").match(/(\d+)年(\d+)月(\d+)日/)
  const nextMatch = (result.jieQi.nextJieDate || "").match(/(\d+)年(\d+)月(\d+)日/)
  const solarNum = dayNum(result.solar.year, result.solar.month, result.solar.day)
  if (prevMatch) {
    const pNum = dayNum(Number(prevMatch[1]), Number(prevMatch[2]), Number(prevMatch[3]))
    daysAfter = solarNum - pNum
  }
  if (nextMatch) {
    const nNum = dayNum(Number(nextMatch[1]), Number(nextMatch[2]), Number(nextMatch[3]))
    daysToNext = nNum - solarNum
  }
  // 司令天干：按节后第几日落入哪一段
  const dayPos = Math.max(1, daysAfter)
  let siLingGan = ranges.length ? ranges[ranges.length - 1].gan : ""
  for (const r of ranges) {
    if (dayPos <= r.end) { siLingGan = r.gan; break }
  }
  if (siLingGan) siLing = `${siLingGan}${GAN_WUXING[siLingGan]}用事`
  if (result.jieQi.prevJie && result.jieQi.nextJie) {
    jieQiText = `出生于${result.jieQi.prevJie}后${daysAfter}天，${result.jieQi.nextJie}前${daysToNext}天`
  }

  // 袁天罡称骨
  const { weight, poem } = calcChenGu(result, birthHourIndex)

  return {
    xingZuo: getXingZuo(result.solar.month, result.solar.day),
    xingXiu: getXingXiu(result.solar.year, result.solar.month, result.solar.day),
    taiYuan,
    taiYuanNaYin: nayin(taiYuan),
    taiXi,
    taiXiNaYin: nayin(taiXi),
    mingGong,
    mingGongNaYin: nayin(mingGong),
    shenGong,
    shenGongNaYin: nayin(shenGong),
    mingGua,
    mingGuaDirection,
    siLing,
    jieQiText,
    prevJie: result.jieQi.prevJie,
    prevJieDate: result.jieQi.prevJieDate,
    nextJie: result.jieQi.nextJie,
    nextJieDate: result.jieQi.nextJieDate,
    chenGuWeight: weight,
    chenGuPoem: poem,
    trueSolarTime: result.solarDate,
  }
}

// ===== 袁天罡称骨 =====
// 年（六十甲子）
const CHENGU_YEAR: Record<string, number> = {
  甲子: 1.2, 乙丑: 0.9, 丙寅: 0.6, 丁卯: 0.7, 戊辰: 1.2, 己巳: 0.5,
  庚午: 0.9, 辛未: 0.8, 壬申: 0.7, 癸酉: 0.8, 甲戌: 1.5, 乙亥: 0.9,
  丙子: 1.6, 丁丑: 0.8, 戊寅: 0.8, 己卯: 1.9, 庚辰: 1.2, 辛巳: 0.6,
  壬午: 0.8, 癸未: 0.7, 甲申: 0.5, 乙酉: 1.5, 丙戌: 0.6, 丁亥: 1.6,
  戊子: 1.5, 己丑: 0.7, 庚寅: 0.9, 辛卯: 1.2, 壬辰: 1.0, 癸巳: 0.7,
  甲午: 1.5, 乙未: 0.6, 丙申: 0.5, 丁酉: 1.4, 戊戌: 1.4, 己亥: 0.9,
  庚子: 0.7, 辛丑: 0.7, 壬寅: 0.9, 癸卯: 1.2, 甲辰: 0.8, 乙巳: 0.7,
  丙午: 1.3, 丁未: 0.5, 戊申: 1.4, 己酉: 0.5, 庚戌: 0.9, 辛亥: 1.7,
  壬子: 0.5, 癸丑: 0.7, 甲寅: 1.2, 乙卯: 0.8, 丙辰: 0.8, 丁巳: 0.6,
  戊午: 1.9, 己未: 0.6, 庚申: 0.8, 辛酉: 1.6, 壬戌: 1.0, 癸亥: 0.6,
}
// 月（农历）
const CHENGU_MONTH = [0, 0.6, 0.7, 1.8, 0.9, 0.5, 1.6, 0.9, 1.5, 1.8, 0.8, 0.9, 0.5]
// 日（农历 初一~三十）
const CHENGU_DAY = [
  0, 0.5, 1.0, 0.8, 1.5, 1.6, 1.5, 0.8, 1.6, 0.8, 1.6,
  0.9, 1.7, 0.8, 1.7, 1.0, 0.8, 0.9, 1.8, 0.5, 1.5,
  1.0, 0.9, 0.8, 0.9, 1.5, 1.8, 0.7, 0.8, 1.6, 0.6,
]
// 时（子~亥）
const CHENGU_HOUR = [1.6, 0.6, 0.7, 1.0, 0.9, 1.6, 1.0, 0.8, 0.8, 0.9, 0.6, 0.6]

const NUM_CN = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
function weightToChinese(total: number): string {
  const liang = Math.floor(total + 1e-6)
  const qian = Math.round((total - liang) * 10)
  let s = `${NUM_CN[liang] || liang}两`
  if (qian > 0) s += `${NUM_CN[qian]}钱`
  return s
}

function calcChenGu(result: BaziResult, hourIndex: number): { weight: string; poem: string } {
  const yw = CHENGU_YEAR[result.year.ganZhi] ?? 0
  const mw = CHENGU_MONTH[result.lunar.month] ?? 0
  const dw = CHENGU_DAY[result.lunar.day] ?? 0
  const hw = CHENGU_HOUR[hourIndex] ?? 0
  const total = Math.round((yw + mw + dw + hw) * 10) / 10
  const key = total.toFixed(1)
  return { weight: weightToChinese(total), poem: CHENGU_POEMS[key] || "命格独特，福泽自来，详批可咨询专业命理师。" }
}

const CHENGU_POEMS: Record<string, string> = {
  "2.1": "终身行乞孤苦之命：身寒骨冷苦伶仃，此命推来骨肉轻，求谋作事事难成，妻儿兄弟应难许，别处他乡作散人。",
  "2.2": "一生劳碌之命：身寒骨冷苦伶仃，此命推来用力耕，劳劳碌碌无度日，中年打拱过平生。",
  "2.3": "终身困苦之命：此命推来骨肉轻，求谋作事事难成，妻儿兄弟应难许，别处他乡作散人。",
  "2.4": "一生薄苦劳碌之命：此命推来福禄无，门庭困苦总难营，可怜白手成家计，到得那时令运通。",
  "2.5": "六亲骨肉冷淡之命：此命推来祖业微，门庭营度似稀奇，六亲骨肉如冰炭，一生勤劳自把持。",
  "2.6": "平生衣禄苦中求之命：平生衣禄苦中求，独自经营事不休，离祖出门宜早计，晚来衣禄自无忧。",
  "2.7": "一生自成自立兴家立业之命：一生作事少商量，难靠祖宗作主张，独马单枪空做去，早年晚岁总无长。",
  "2.8": "财禄无足天命之人：一生作事似飘蓬，祖宗产业在梦中，若不过房改名姓，也当移徙二三通。",
  "2.9": "初年苦末年富足之命：初年运限未曾享，纵有功名在后头，须过四旬绕事吉，方知衣禄是天财。",
  "3.0": "技艺平平且渡平生之命：劳劳碌碌苦中求，东奔西走何日休，若使终身勤与俭，老来稍可免忧愁。",
  "3.1": "性巧过人衣禄保守之命：忙忙碌碌苦中求，何日云开见日头，难得祖基家可立，中年衣食渐无忧。",
  "3.2": "为僧为道之命：初年运蹇事难谋，渐有财源如水流，到得中年衣食旺，那时名利一齐周。",
  "3.3": "钱财进退自如成败不一之命：早年做事事难成，百年勤劳枉费心，半世自如流水去，后来运到得黄金。",
  "3.4": "白手成家性巧无依靠之命：此命福气果如何，僧道门中衣禄多，离祖出家方为妙，朝晚拜佛念弥陀。",
  "3.5": "先苦后甜渐至佳境之命：生平福量不周全，祖业根基觉少传，营事生涯宜守旧，时来衣食胜从前。",
  "3.6": "不须劳碌过平生，独自成家福不轻，早有福星常照命，任君行去百般成。",
  "3.7": "财禄丰盈生涯虽苦后年丰盛之命：此命般般事不成，弟兄少力自孤行，虽然祖业须微有，来日成家立大门。",
  "3.8": "技艺随身做事必成名利之命：一生骨肉最清高，早入黉门姓名标，待看年将三十六，蓝衫脱去换红袍。",
  "3.9": "和身做事必成名利之命：此命终身运不通，劳劳作事尽成空，苦心竭力成家计，到得那时在梦中。",
  "4.0": "做事有头无尾劳心费力之命：平生衣禄是绵长，件件心中自主张，前面风霜多受过，后来必定享安康。",
  "4.1": "智勇双全白手成家之命：此命推来事不同，为人能干异凡庸，中年还有逍遥福，不比前年云遮月。",
  "4.2": "做事按部就班晚景昌隆之命：得宽怀处且宽怀，何用愁眉皱眼来，若使中年命运济，那时名利一起来。",
  "4.3": "财源滚滚智勇双全之命：为人心性最聪明，作事轩昂近贵人，衣禄一生天注定，不须劳碌是丰享。",
  "4.4": "金玉满堂福禄两全之命：万事由天莫强求，须知福禄勿须谋，金玉满堂随时长，富贵荣华不待求。",
  "4.5": "福禄丰厚极有口福之命：名利双全福禄丰，知君大限四五中，钱财积聚多富贵，浪荡乾坤处处通。",
  "4.6": "夫妻齐眉福禄鸳鸯之命：东西南北尽皆通，出姓移居更觉隆，衣禄无亏天数定，中年晚景一般同。",
  "4.7": "操持后定兴隆兴家立业之命：此命推来旺末年，妻荣子贵福双全，生计稳固财源茂，正是人间有福仙。",
  "4.8": "幼年勤俭克勤渐有名望之命：初年运道未曾通，万事仇人不及功，须到中年衣食旺，比那前番自不同。",
  "4.9": "克己助人福禄丰厚之命：此命推来福不轻，自成自立显门庭，从来富贵人钦敬，使婢差奴过一生。",
  "5.0": "为人慷慨富贵长寿之命：为名为利终日劳，中年福禄也多遭，老来自有财星照，不比前番这次高。",
  "5.1": "聪明俊秀近贵富厚之命：一世荣华事事通，不须劳碌自亨通，兄弟叔侄皆如意，家业成时福禄宏。",
  "5.2": "国家栋梁财禄丰盈之命：一世荣华事事能，不须劳苦自然丰，宗族亲戚皆钦敬，奴婢成行家道丰。",
  "5.3": "百事如意富贵之命：此格推来气象真，光宗耀祖立功勋，肯把家财兴大业，错综财帛达三江。",
  "5.4": "权高位重官运亨通富贵荣华之命：此命推来福不穷，读书必定显门风，紫衣玉带为卿相，富贵荣华皆可同。",
  "5.5": "官星明，金榜题名之命：策马扬鞭争前程，文武功名定可成，待看年至三十六，财禄丰盈百事亨。",
  "5.6": "出将入相一品当朝之命：此格推来礼义通，一身福禄旺门风，财源滚滚平生足，富贵荣华显祖宗。",
  "5.7": "官居极品之命：此命生来福不穷，读书必定显亲宗，紫袍金带为卿相，富贵荣华皆可同。",
  "5.8": "一品当朝万人之上之命：平生衣禄随身满，富贵荣华皆可同，福禄寿星天上照，到老犹如返老童。",
  "5.9": "极品之贵巨富之命：细推此命福不轻，安国安邦极品人，文绣雕梁政威省，威风凛凛佐朝堂。",
  "6.0": "公侯将相之命：一朝金榜快题名，显祖荣宗换门庭，从此门前生瑞气，方知白屋出公卿。",
  "6.1": "兵权在手万人之上之命：不作朝中金榜客，定为世上一财翁，聪明天赋经书熟，名显高科自是荣。",
  "6.2": "官职高显荣华富贵之命：此命推来福禄宏，文武皆能显门庭，将相公侯前世定，宗祖蒙荫受皇恩。",
  "6.3": "进退两难惟智可解之命：命主为官福禄长，得来富贵实非常，名题金塔传金榜，定中高科天下扬。",
  "6.4": "官高极品威权无比之命：此格世上谁人有，年年并月旺财源，处处通明无阻挡，定是天上紫微星。",
  "6.5": "受职高位万人敬仰之命：细推此命运不穷，必定才高礼义通，甲第之中应有分，扬鞭走马显威荣。",
  "6.6": "权重位高足智多谋之命：此命生来福自宏，田园家业最高隆，平生衣食丰盛足，一世荣华万事通。",
  "6.7": "受职高位万人景仰之命：此命推来天下闻，必定才高礼义通，一世荣华真富贵，定是人间一伟人。",
  "6.8": "国家栋梁声名显赫之命：富贵由天莫苦求，万金家计不须谋，十年寒窗读书苦，方信男儿大丈夫。",
  "6.9": "受职清显威权无比之命：君是人间衣禄星，一生福贵众人钦，纵然福禄由天定，安享荣华过一生。",
  "7.0": "一品光禄大夫之命：此命推来福不轻，生平安享太平春，墓门吉地朝天子，富贵荣华世罕闻。",
  "7.1": "国家栋梁权重位高之命：此命推来福不穷，堆金积玉满堂红，福禄寿星三照命，富贵荣华直到终。",
  "7.2": "宰相之命：此命终身福不穷，富贵荣华直到终，一世为官清如水，万民称颂贺政通。",
}
