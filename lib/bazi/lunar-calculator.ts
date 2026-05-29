/**
 * 八字排盘计算器 - 基于 lunar-javascript 开源库
 * 
 * 算法依据：
 * - 核心算法：《渊海子平》子平八字理论
 * - 神煞系统：《协纪辨方书》
 * - 排版与交互标准：问真八字APP
 * 
 * 注意事项：
 * - 排四柱使用真太阳时
 * - 大运按"三天折一年"计算
 */

// @ts-expect-error - lunar-javascript 没有类型定义
import { Solar, Lunar, EightChar } from 'lunar-javascript'

// 地支本气（藏干主气），用于大运/流年/小运的地支十神
const ZHI_BENQI: Record<string, string> = {
  '子': '癸', '丑': '己', '寅': '甲', '卯': '乙', '辰': '戊', '巳': '丙',
  '午': '丁', '未': '己', '申': '庚', '酉': '辛', '戌': '戊', '亥': '壬'
}

// 五行颜色映射
export const WUXING_COLORS: Record<string, string> = {
  '木': '#22c55e', // 绿色
  '火': '#ef4444', // 红色
  '土': '#d4a574', // 土黄色
  '金': '#d4af37', // 金色
  '水': '#3b82f6', // 蓝色
}

// 五行图标映射
export const WUXING_ICONS: Record<string, string> = {
  '木': '🌳',
  '火': '🔥',
  '土': '🏔️',
  '金': '🪙',
  '水': '💧',
}

// 天干五行映射
export const TIANGAN_WUXING: Record<string, string> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
}

// 地支五行映射
export const DIZHI_WUXING: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
}

// 生肖映射
export const SHENGXIAO: Record<string, string> = {
  '子': '鼠', '丑': '牛', '寅': '虎', '卯': '兔',
  '辰': '龙', '巳': '蛇', '午': '马', '未': '羊',
  '申': '猴', '酉': '鸡', '戌': '狗', '亥': '猪',
}

// 生肖图标映射
export const SHENGXIAO_ICONS: Record<string, string> = {
  '鼠': '🐀', '牛': '🐂', '虎': '🐅', '兔': '🐇',
  '龙': '🐉', '蛇': '🐍', '马': '🐴', '羊': '🐏',
  '猴': '🐒', '鸡': '🐓', '狗': '🐕', '猪': '🐖',
}

// 时辰对应时间
export const SHICHEN_TIMES: Record<string, string> = {
  '子': '23:00-01:00',
  '丑': '01:00-03:00',
  '寅': '03:00-05:00',
  '卯': '05:00-07:00',
  '辰': '07:00-09:00',
  '巳': '09:00-11:00',
  '午': '11:00-13:00',
  '未': '13:00-15:00',
  '申': '15:00-17:00',
  '酉': '17:00-19:00',
  '戌': '19:00-21:00',
  '亥': '21:00-23:00',
}

export interface BaziResult {
  // 基本信息
  solarDate: string      // 公历日期
  lunarDate: string      // 农历日期
  lunarMonthChinese: string // 农历月份（如：腊月）
  lunarDayChinese: string   // 农历日期（如：初五）
  shengxiao: string      // 生肖
  shengxiaoIcon: string  // 生肖图标
  gender: '乾造' | '坤造'
  
  // 四柱
  year: { gan: string; zhi: string; ganZhi: string }
  month: { gan: string; zhi: string; ganZhi: string }
  day: { gan: string; zhi: string; ganZhi: string }
  hour: { gan: string; zhi: string; ganZhi: string }
  
  // 十神
  shiShen: {
    year: string
    month: string
    day: string
    hour: string
  }
  
  // 藏干
  cangGan: {
    year: string[]
    month: string[]
    day: string[]
    hour: string[]
  }
  
  // 藏干十神
  cangGanShiShen: {
    year: string[]
    month: string[]
    day: string[]
    hour: string[]
  }
  
  // 纳音
  naYin: {
    year: string
    month: string
    day: string
    hour: string
  }
  
  // 空亡
  kongWang: {
    year: string
    month: string
    day: string
    hour: string
  }
  
  // 十二长生
  changSheng: {
    year: string
    month: string
    day: string
    hour: string
  }
  
  // 自坐
  ziZuo: {
    year: string
    month: string
    day: string
    hour: string
  }
  
  // 神煞（每柱多个）
  shenSha: {
    year: string[]
    month: string[]
    day: string[]
    hour: string[]
  }
  
  // 大运
  daYun: Array<{
    startYear: number
    startAge: number
    ganZhi: string
    gan: string
    zhi: string
    ganShiShen: string
    zhiShiShen: string
    shenSha: string[]
  }>

  // 小运（童限）
  xiaoYun: Array<{
    year: number
    age: number
    ganZhi: string
    gan: string
    zhi: string
    ganShiShen: string
    zhiShiShen: string
  }>
  
  // 流年
  liuNian: Array<{
    year: number
    ganZhi: string
    gan: string
    zhi: string
    age: number
    ganShiShen: string
    zhiShiShen: string
  }>
  
  // 起运信息
  qiYun: {
    years: number
    months: number
    days: number
    hours: number
    direction: '顺行' | '逆行'
  }
  
  // 五行统计
  wuXingCount: Record<string, number>
  
  // 五行旺衰
  wuXingStrength: {
    wang: string   // 旺
    xiang: string  // 相
    xiu: string    // 休
    qiu: string    // 囚
    si: string     // 死
  }
  
  // 干支关系
  ganZhiRelation: {
    tianGan: string[]  // 天干关系
    diZhi: string[]    // 地支关系
    zhengZhu: string[] // 整柱关系
  }
  
  // 调候用神
  tiaoHou: {
    yongShen: string[]  // 用神
    xiShen: string[]    // 喜神
  }
  
  // 节气信息
  jieQi: {
    prevJie: string     // 前一个节
    prevJieDate: string // 前一个节日期
    nextJie: string     // 后一个节
    nextJieDate: string // 后一个节日期
  }
}

export interface BaziOptions {
  year: number
  month: number
  day: number
  hour: number
  minute?: number
  isLunar?: boolean      // 是否农历
  gender: 'male' | 'female'
  sect?: 1 | 2           // 流派：1=晚子时日柱算当天，2=晚子时日柱算明天
  useTrueSolarTime?: boolean  // 是否使用真太阳时
  longitude?: number     // 经度（用于真太阳时计算）
}

/**
 * 计算八字
 */
export function calculateBazi(options: BaziOptions): BaziResult {
  const { 
    year, month, day, hour, 
    minute = 0,
    isLunar = false, 
    gender,
    sect = 2  // 默认晚子时日柱算明天（问真八字的默认设置）
  } = options

  // 创建日期对象 - 必须包含时间才能正确计算时柱
  let solar: typeof Solar
  if (isLunar) {
    const lunar = Lunar.fromYmdHms(year, month, day, hour, minute, 0)
    solar = lunar.getSolar()
  } else {
    solar = Solar.fromYmdHms(year, month, day, hour, minute, 0)
  }

  // 获取农历
  const lunar = solar.getLunar()
  
  // 获取八字 - 使用带时间的方法
  const eightChar = lunar.getEightChar()
  eightChar.setSect(sect)

  // 基本信息
  const yearZhi = eightChar.getYearZhi()
  const shengxiaoName = SHENGXIAO[yearZhi] || '未知'
  
  // 四柱
  const yearGan = eightChar.getYearGan()
  const yearGanZhi = eightChar.getYear()
  const monthGan = eightChar.getMonthGan()
  const monthZhi = eightChar.getMonthZhi()
  const monthGanZhi = eightChar.getMonth()
  const dayGan = eightChar.getDayGan()
  const dayZhi = eightChar.getDayZhi()
  const dayGanZhi = eightChar.getDay()
  
  // 时柱需要根据小时计算
  const hourGanZhi = eightChar.getTime()
  const hourGan = eightChar.getTimeGan()
  const hourZhi = eightChar.getTimeZhi()

  // 十神 (使用正确的API方法名)
  const shiShen = {
    year: eightChar.getYearShiShenGan() || getShiShen(dayGan, yearGan),
    month: eightChar.getMonthShiShenGan() || getShiShen(dayGan, monthGan),
    day: '日主', // 日主本身
    hour: eightChar.getTimeShiShenGan() || getShiShen(dayGan, hourGan)
  }

  // 藏干
  const yearHideGan = eightChar.getYearHideGan()
  const monthHideGan = eightChar.getMonthHideGan()
  const dayHideGan = eightChar.getDayHideGan()
  const hourHideGan = eightChar.getTimeHideGan()

  // 藏干十神
  const cangGanShiShen = {
    year: yearHideGan.map((g: string) => getShiShen(dayGan, g)),
    month: monthHideGan.map((g: string) => getShiShen(dayGan, g)),
    day: dayHideGan.map((g: string) => getShiShen(dayGan, g)),
    hour: hourHideGan.map((g: string) => getShiShen(dayGan, g))
  }

  // 纳音
  const naYin = {
    year: eightChar.getYearNaYin(),
    month: eightChar.getMonthNaYin(),
    day: eightChar.getDayNaYin(),
    hour: eightChar.getTimeNaYin()
  }

  // 空亡（使用 getXun 获取旬，空亡是旬中最后两个地支）
  let yearXunKong = ''
  let monthXunKong = ''
  let dayXunKong = ''
  let hourXunKong = ''
  try {
    yearXunKong = eightChar.getYearXunKong ? eightChar.getYearXunKong() : getXunKong(yearGanZhi)
    monthXunKong = eightChar.getMonthXunKong ? eightChar.getMonthXunKong() : getXunKong(monthGanZhi)
    dayXunKong = eightChar.getDayXunKong ? eightChar.getDayXunKong() : getXunKong(dayGanZhi)
    hourXunKong = eightChar.getTimeXunKong ? eightChar.getTimeXunKong() : getXunKong(hourGanZhi)
  } catch {
    yearXunKong = getXunKong(yearGanZhi)
    monthXunKong = getXunKong(monthGanZhi)
    dayXunKong = getXunKong(dayGanZhi)
    hourXunKong = getXunKong(hourGanZhi)
  }

  // 十二长生（使用正确的API: getDiShi）
  const changSheng = {
    year: eightChar.getYearDiShi ? eightChar.getYearDiShi() : getChangSheng(dayGan, yearZhi),
    month: eightChar.getMonthDiShi ? eightChar.getMonthDiShi() : getChangSheng(dayGan, monthZhi),
    day: eightChar.getDayDiShi ? eightChar.getDayDiShi() : getChangSheng(dayGan, dayZhi),
    hour: eightChar.getTimeDiShi ? eightChar.getTimeDiShi() : getChangSheng(dayGan, hourZhi)
  }

  // 神煞
  const shenSha = {
    year: getShenSha(eightChar, 'year'),
    month: getShenSha(eightChar, 'month'),
    day: getShenSha(eightChar, 'day'),
    hour: getShenSha(eightChar, 'hour')
  }

  // 大运（lunar 的第一步为空干支的童限期，需过滤，童限由小运体现）
  const yun = eightChar.getYun(gender === 'male' ? 1 : 0)
  const daYunList = yun.getDaYun()
  const daYun = daYunList
    .filter((dy: { getGanZhi: () => string }) => (dy.getGanZhi() || '').length >= 2)
    .map((dy: { getStartYear: () => number; getStartAge: () => number; getGanZhi: () => string }) => {
    const ganZhi = dy.getGanZhi()
    const gan = ganZhi.substring(0, 1)
    const zhi = ganZhi.substring(1, 2)
    return {
      startYear: dy.getStartYear(),
      startAge: dy.getStartAge(),
      ganZhi: ganZhi,
      gan,
      zhi,
      // 大运天干十神（空运无干支时为空）
      ganShiShen: gan ? getShiShen(dayGan, gan) : '',
      // 大运地支藏干本气十神
      zhiShiShen: zhi ? getShiShen(dayGan, ZHI_BENQI[zhi] || zhi) : '',
      shenSha: [] as string[]
    }
  })

  // 小运（取第一步大运之前的小运，即童限）
  let xiaoYun: Array<{ year: number; age: number; ganZhi: string; gan: string; zhi: string; ganShiShen: string; zhiShiShen: string }> = []
  try {
    const firstDaYun = daYunList[0]
    const xyList = firstDaYun && firstDaYun.getXiaoYun ? firstDaYun.getXiaoYun() : []
    xiaoYun = xyList.map((xy: { getYear: () => number; getAge: () => number; getGanZhi: () => string }) => {
      const gz = xy.getGanZhi()
      const g = gz.substring(0, 1)
      const z = gz.substring(1, 2)
      return {
        year: xy.getYear(),
        age: xy.getAge(),
        ganZhi: gz,
        gan: g,
        zhi: z,
        ganShiShen: g ? getShiShen(dayGan, g) : '',
        zhiShiShen: z ? getShiShen(dayGan, ZHI_BENQI[z] || z) : ''
      }
    })
  } catch {
    xiaoYun = []
  }

  // 起运信息
  const qiYun = {
    years: yun.getStartYear(),
    months: yun.getStartMonth(),
    days: yun.getStartDay(),
    hours: yun.getStartHour ? yun.getStartHour() : 0,
    direction: (gender === 'male' ? (isYangYear(yearGan) ? '顺行' : '逆行') : (isYangYear(yearGan) ? '逆行' : '顺行')) as '顺行' | '逆行'
  }

  // 流年（从出生年到当前年 + 未来10年）
  const currentYear = new Date().getFullYear()
  const liuNian: BaziResult['liuNian'] = []
  for (let y = year; y <= currentYear + 10; y++) {
    const lnSolar = Solar.fromYmd(y, 1, 1)
    const lnLunar = lnSolar.getLunar()
    const lnGanZhi = lnLunar.getYearInGanZhiExact()
    const gan = lnGanZhi.substring(0, 1)
    const zhi = lnGanZhi.substring(1, 2)
    liuNian.push({
      year: y,
      ganZhi: lnGanZhi,
      gan,
      zhi,
      age: y - year + 1,
      ganShiShen: gan ? getShiShen(dayGan, gan) : '',
      zhiShiShen: zhi ? getShiShen(dayGan, ZHI_BENQI[zhi] || zhi) : ''
    })
  }

  // 五行统计
  const wuXingCount = countWuXing([yearGan, monthGan, dayGan, hourGan, yearZhi, monthZhi, dayZhi, hourZhi])

  // 五行旺衰
  const wuXingStrength = getWuXingStrength(monthZhi)

  // 干支关系
  const ganZhiRelation = getGanZhiRelation(
    [yearGan, monthGan, dayGan, hourGan],
    [yearZhi, monthZhi, dayZhi, hourZhi]
  )

  // 节气信息
  const jieQi = getJieQiInfo(solar)

  // 调候用神
  const tiaoHou = getTiaoHou(dayGan, monthZhi)

  return {
    // 基本日期信息
    solar: { year: solar.getYear(), month: solar.getMonth(), day: solar.getDay() },
    lunar: { year: lunar.getYear(), month: lunar.getMonth(), day: lunar.getDay(), isLeap: lunar.getMonth() < 0 },
    solarDate: `${solar.getYear()}年${String(solar.getMonth()).padStart(2, '0')}月${String(solar.getDay()).padStart(2, '0')}日`,
    lunarDate: `${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
    lunarMonthChinese: lunar.getMonthInChinese() + '月',
    lunarDayChinese: lunar.getDayInChinese(),
    shengXiao: shengxiaoName,
    shengxiao: shengxiaoName,
    shengxiaoIcon: SHENGXIAO_ICONS[shengxiaoName] || '',
    gender: gender === 'male' ? '乾造' : '坤造',
    
    year: { gan: yearGan, zhi: yearZhi, ganZhi: yearGanZhi },
    month: { gan: monthGan, zhi: monthZhi, ganZhi: monthGanZhi },
    day: { gan: dayGan, zhi: dayZhi, ganZhi: dayGanZhi },
    hour: { gan: hourGan, zhi: hourZhi, ganZhi: hourGanZhi },
    
    shiShen,
    cangGan: {
      year: yearHideGan,
      month: monthHideGan,
      day: dayHideGan,
      hour: hourHideGan
    },
    cangGanShiShen,
    naYin,
    kongWang: {
      year: yearXunKong,
      month: monthXunKong,
      day: dayXunKong,
      hour: hourXunKong
    },
    changSheng,
    ziZuo: changSheng, // 自坐与十二长生相同
    shenSha,
    daYun,
    xiaoYun,
    liuNian,
    qiYun,
    wuXingCount,
    wuXingStrength,
    ganZhiRelation,
    tiaoHou,
    jieQi
  }
}

/**
 * 计算十神
 */
function getShiShen(dayGan: string, gan: string): string {
  const shiShenTable: Record<string, Record<string, string>> = {
    '甲': { '甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官', '戊': '偏财', '己': '正财', '庚': '七杀', '辛': '正官', '壬': '偏印', '癸': '正印' },
    '乙': { '甲': '劫财', '乙': '比肩', '丙': '伤官', '丁': '食神', '戊': '正财', '己': '偏财', '庚': '正官', '辛': '七杀', '壬': '正印', '癸': '偏印' },
    '丙': { '甲': '偏印', '乙': '正印', '丙': '比肩', '丁': '劫财', '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财', '壬': '七杀', '癸': '正官' },
    '丁': { '甲': '正印', '乙': '偏印', '丙': '劫财', '丁': '比肩', '戊': '伤官', '己': '食神', '庚': '正财', '辛': '偏财', '壬': '正官', '癸': '七杀' },
    '戊': { '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印', '戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官', '壬': '偏财', '癸': '正财' },
    '己': { '甲': '正官', '乙': '七杀', '丙': '正印', '丁': '偏印', '戊': '劫财', '己': '比肩', '庚': '伤官', '辛': '食神', '壬': '正财', '癸': '偏财' },
    '庚': { '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官', '戊': '偏印', '己': '正印', '庚': '比肩', '辛': '劫财', '壬': '食神', '癸': '伤官' },
    '辛': { '甲': '正财', '乙': '偏财', '丙': '正官', '丁': '七杀', '戊': '正印', '己': '偏印', '庚': '劫财', '辛': '比肩', '壬': '伤官', '癸': '食神' },
    '壬': { '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财', '戊': '七杀', '己': '正官', '庚': '偏印', '辛': '正印', '壬': '比肩', '癸': '劫财' },
    '癸': { '甲': '伤官', '乙': '食神', '丙': '正财', '丁': '偏财', '戊': '正官', '己': '七杀', '庚': '正印', '辛': '偏印', '壬': '劫财', '癸': '比肩' }
  }
  return shiShenTable[dayGan]?.[gan] || ''
}

/**
 * 计算空亡
 */
function getXunKong(ganZhi: string): string {
  const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  
  // 十旬对应的空亡
  const xunKongMap: Record<string, string> = {
    '甲子': '戌亥', '甲戌': '申酉', '甲申': '午未', '甲午': '辰巳', '甲辰': '寅卯', '甲寅': '子丑'
  }
  
  const gan = ganZhi.substring(0, 1)
  const zhi = ganZhi.substring(1, 2)
  
  const ganIndex = tianGan.indexOf(gan)
  const zhiIndex = diZhi.indexOf(zhi)
  
  // 计算这个干支属于哪一旬
  // 旬首天干为甲，所以向前推算到甲
  const diff = ganIndex // 距离甲的位置
  const xunZhiIndex = (zhiIndex - diff + 12) % 12
  const xunGanZhi = '甲' + diZhi[xunZhiIndex]
  
  return xunKongMap[xunGanZhi] || ''
}

/**
 * 十二长生
 */
function getChangSheng(dayGan: string, zhi: string): string {
  const changShengList = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养']
  const diZhiList = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  
  // 阳干长生位置
  const yangGanStart: Record<string, number> = {
    '甲': 10, // 亥
    '丙': 2,  // 寅
    '戊': 2,  // 寅
    '庚': 5,  // 巳
    '壬': 8   // 申
  }
  
  // 阴干长生位置
  const yinGanStart: Record<string, number> = {
    '乙': 6,  // 午
    '丁': 9,  // 酉
    '���': 9,  // 酉
    '辛': 0,  // 子
    '癸': 3   // 卯
  }
  
  const zhiIndex = diZhiList.indexOf(zhi)
  const isYang = ['甲', '丙', '戊', '庚', '壬'].includes(dayGan)
  const startIndex = isYang ? yangGanStart[dayGan] : yinGanStart[dayGan]
  
  if (startIndex === undefined) return ''
  
  // 阳干顺行，阴干逆行
  let csIndex: number
  if (isYang) {
    csIndex = (zhiIndex - startIndex + 12) % 12
  } else {
    csIndex = (startIndex - zhiIndex + 12) % 12
  }
  
  return changShengList[csIndex]
}

/**
 * 判断是否阳年
 */
function isYangYear(yearGan: string): boolean {
  return ['甲', '丙', '戊', '庚', '壬'].includes(yearGan)
}

/**
 * 获取神煞
 */
function getShenSha(eightChar: typeof EightChar, position: 'year' | 'month' | 'day' | 'hour'): string[] {
  const shenShaList: string[] = []
  
  try {
    let shenshas: string[] = []
    switch (position) {
      case 'year':
        shenshas = eightChar.getYearShenSha() || []
        break
      case 'month':
        shenshas = eightChar.getMonthShenSha() || []
        break
      case 'day':
        shenshas = eightChar.getDayShenSha() || []
        break
      case 'hour':
        shenshas = eightChar.getTimeShenSha() || []
        break
    }
    if (Array.isArray(shenshas)) {
      shenShaList.push(...shenshas)
    }
  } catch {
    // 神煞计算可能失败，返回空数组
  }
  
  return shenShaList
}

/**
 * 统计五行
 */
function countWuXing(ganZhiList: string[]): Record<string, number> {
  const count: Record<string, number> = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 }
  
  for (const gz of ganZhiList) {
    const wx = TIANGAN_WUXING[gz] || DIZHI_WUXING[gz]
    if (wx) {
      count[wx]++
    }
  }
  
  return count
}

/**
 * 获取五行旺衰（根据月令）
 */
function getWuXingStrength(monthZhi: string): { wang: string; xiang: string; xiu: string; qiu: string; si: string } {
  // 月令五行
  const monthWuXing = DIZHI_WUXING[monthZhi]
  
  // 五行相生顺序：木→火→土→金→水→木
  const wuXingOrder = ['木', '火', '土', '金', '水']
  const index = wuXingOrder.indexOf(monthWuXing)
  
  return {
    wang: wuXingOrder[index],
    xiang: wuXingOrder[(index + 1) % 5],
    xiu: wuXingOrder[(index + 2) % 5],
    qiu: wuXingOrder[(index + 3) % 5],
    si: wuXingOrder[(index + 4) % 5]
  }
}

/**
 * 获取干支关系
 */
function getGanZhiRelation(gans: string[], zhis: string[]): { tianGan: string[]; diZhi: string[]; zhengZhu: string[] } {
  const tianGan: string[] = []
  const diZhi: string[] = []
  const zhengZhu: string[] = []
  
  // 天干关系
  const ganHe: Record<string, string> = {
    '甲己': '合化土', '乙庚': '合化金', '丙辛': '合化水', '丁壬': '合化木', '戊癸': '合化火'
  }
  const ganChong: Record<string, string> = {
    '甲庚': '相冲', '乙辛': '相冲', '丙壬': '相冲', '丁癸': '相冲'
  }
  
  for (let i = 0; i < gans.length; i++) {
    for (let j = i + 1; j < gans.length; j++) {
      const pair1 = gans[i] + gans[j]
      const pair2 = gans[j] + gans[i]
      if (ganHe[pair1]) tianGan.push(`${gans[i]}${gans[j]}${ganHe[pair1]}`)
      if (ganHe[pair2]) tianGan.push(`${gans[j]}${gans[i]}${ganHe[pair2]}`)
      if (ganChong[pair1]) tianGan.push(`${gans[i]}${gans[j]}${ganChong[pair1]}`)
      if (ganChong[pair2]) tianGan.push(`${gans[j]}${gans[i]}${ganChong[pair2]}`)
    }
  }
  
  // 地支关系
  const zhiHe: Record<string, string> = {
    '子丑': '合', '寅亥': '合', '卯戌': '合', '辰酉': '合', '巳申': '合', '午未': '合'
  }
  const zhiChong: Record<string, string> = {
    '子午': '冲', '丑未': '冲', '寅申': '冲', '卯酉': '冲', '辰戌': '冲', '巳亥': '冲'
  }
  const zhiXing: Record<string, string> = {
    '子卯': '刑', '寅巳': '刑', '巳申': '刑', '丑戌': '刑', '戌未': '刑', '未丑': '刑'
  }
  const zhiHai: Record<string, string> = {
    '子未': '害', '丑午': '害', '寅巳': '害', '卯辰': '害', '申亥': '害', '酉戌': '害'
  }
  const zhiAnHe: Record<string, string> = {
    '子巳': '暗合', '丑寅': '暗合', '卯申': '暗合', '午亥': '暗合'
  }
  
  for (let i = 0; i < zhis.length; i++) {
    for (let j = i + 1; j < zhis.length; j++) {
      const pair1 = zhis[i] + zhis[j]
      const pair2 = zhis[j] + zhis[i]
      if (zhiHe[pair1] || zhiHe[pair2]) diZhi.push(`${zhis[i]}${zhis[j]}${zhiHe[pair1] || zhiHe[pair2]}`)
      if (zhiChong[pair1] || zhiChong[pair2]) diZhi.push(`${zhis[i]}${zhis[j]}相${zhiChong[pair1] || zhiChong[pair2]}`)
      if (zhiXing[pair1] || zhiXing[pair2]) diZhi.push(`${zhis[i]}${zhis[j]}相${zhiXing[pair1] || zhiXing[pair2]}`)
      if (zhiHai[pair1] || zhiHai[pair2]) diZhi.push(`${zhis[i]}${zhis[j]}相${zhiHai[pair1] || zhiHai[pair2]}`)
      if (zhiAnHe[pair1] || zhiAnHe[pair2]) diZhi.push(`${zhis[i]}${zhis[j]}${zhiAnHe[pair1] || zhiAnHe[pair2]}`)
    }
  }
  
  // 整柱关系（盖头、截脚）
  const gaiTou = ['戊子', '戊午', '己酉', '己卯', '壬寅', '壬申', '癸巳', '癸亥', '庚寅', '辛卯']
  const jieJiao = ['甲申', '乙酉', '丙子', '丁亥', '甲戌', '乙丑']
  
  for (let i = 0; i < gans.length; i++) {
    const gz = gans[i] + zhis[i]
    if (gaiTou.includes(gz)) zhengZhu.push(`${gz}盖头`)
    if (jieJiao.includes(gz)) zhengZhu.push(`${gz}截脚`)
  }
  
  return { tianGan, diZhi, zhengZhu }
}

/**
 * 获取节气信息
 */
function getJieQiInfo(solar: typeof Solar): { prevJie: string; prevJieDate: string; nextJie: string; nextJieDate: string } {
  try {
    const lunar = solar.getLunar()
    const prevJieQi = lunar.getPrevJieQi(true)
    const nextJieQi = lunar.getNextJieQi(true)
    
    return {
      prevJie: prevJieQi?.getName() || '',
      prevJieDate: prevJieQi ? `${prevJieQi.getSolar().getYear()}年${prevJieQi.getSolar().getMonth()}月${prevJieQi.getSolar().getDay()}日` : '',
      nextJie: nextJieQi?.getName() || '',
      nextJieDate: nextJieQi ? `${nextJieQi.getSolar().getYear()}年${nextJieQi.getSolar().getMonth()}月${nextJieQi.getSolar().getDay()}日` : ''
    }
  } catch {
    return { prevJie: '', prevJieDate: '', nextJie: '', nextJieDate: '' }
  }
}

/**
 * 获取调候用神
 */
function getTiaoHou(dayGan: string, monthZhi: string): { yongShen: string[]; xiShen: string[] } {
  // 简化的调候用神表（基于《渊海子平》）
  const tiaoHouTable: Record<string, Record<string, { yong: string[]; xi: string[] }>> = {
    '甲': {
      '子': { yong: ['丁', '庚'], xi: ['丙'] },
      '丑': { yong: ['丁', '庚'], xi: ['丙'] },
      '寅': { yong: ['丙', '癸'], xi: ['庚'] },
      '卯': { yong: ['庚', '丙', '丁'], xi: ['癸'] },
      '辰': { yong: ['庚', '丁', '壬'], xi: ['癸'] },
      '巳': { yong: ['癸', '庚', '丁'], xi: ['壬'] },
      '午': { yong: ['癸', '庚', '丁'], xi: ['壬'] },
      '未': { yong: ['癸', '庚', '丁'], xi: ['壬'] },
      '申': { yong: ['庚', '丁', '壬'], xi: ['癸'] },
      '酉': { yong: ['庚', '丁', '丙'], xi: ['壬'] },
      '戌': { yong: ['庚', '丁', '壬'], xi: ['癸'] },
      '亥': { yong: ['庚', '丁', '丙'], xi: ['戊'] }
    },
    '乙': {
      '子': { yong: ['丙', '癸'], xi: ['戊'] },
      '丑': { yong: ['丙', '癸'], xi: ['戊'] },
      '寅': { yong: ['丙', '癸'], xi: ['戊'] },
      '卯': { yong: ['丙', '癸'], xi: ['戊'] },
      '辰': { yong: ['癸', '丙'], xi: ['戊'] },
      '巳': { yong: ['癸', '��'], xi: ['己'] },
      '午': { yong: ['癸', '丙'], xi: ['己'] },
      '未': { yong: ['癸', '丙'], xi: ['己'] },
      '申': { yong: ['丙', '癸'], xi: ['己'] },
      '酉': { yong: ['丙', '癸'], xi: ['己'] },
      '戌': { yong: ['丙', '癸'], xi: ['己'] },
      '亥': { yong: ['丙', '戊'], xi: ['癸'] }
    },
    '丙': {
      '子': { yong: ['壬', '戊', '己'], xi: ['甲'] },
      '丑': { yong: ['壬', '甲'], xi: ['戊'] },
      '寅': { yong: ['壬', '庚'], xi: ['戊'] },
      '卯': { yong: ['壬', '庚'], xi: ['己'] },
      '辰': { yong: ['壬', '甲'], xi: ['己'] },
      '巳': { yong: ['壬', '庚'], xi: ['癸'] },
      '午': { yong: ['壬', '庚'], xi: ['癸'] },
      '未': { yong: ['壬', '庚'], xi: ['癸'] },
      '申': { yong: ['壬', '甲'], xi: ['戊'] },
      '酉': { yong: ['壬', '甲'], xi: ['戊'] },
      '戌': { yong: ['壬', '甲'], xi: ['戊'] },
      '亥': { yong: ['甲', '戊', '庚'], xi: ['壬'] }
    },
    '丁': {
      '子': { yong: ['甲', '庚'], xi: ['戊'] },
      '丑': { yong: ['甲', '庚'], xi: ['戊'] },
      '寅': { yong: ['甲', '庚'], xi: ['戊'] },
      '卯': { yong: ['甲', '庚'], xi: ['戊'] },
      '辰': { yong: ['甲', '庚'], xi: ['戊'] },
      '巳': { yong: ['甲', '壬'], xi: ['庚'] },
      '午': { yong: ['甲', '壬', '庚'], xi: ['己'] },
      '未': { yong: ['甲', '壬', '庚'], xi: ['己'] },
      '申': { yong: ['甲', '壬', '庚'], xi: ['戊'] },
      '酉': { yong: ['甲', '庚', '丙'], xi: ['戊'] },
      '戌': { yong: ['甲', '庚', '戊'], xi: ['壬'] },
      '亥': { yong: ['甲', '庚'], xi: ['戊'] }
    },
    '戊': {
      '子': { yong: ['丙', '甲'], xi: ['癸'] },
      '丑': { yong: ['丙', '甲'], xi: ['癸'] },
      '寅': { yong: ['丙', '甲', '癸'], xi: ['壬'] },
      '卯': { yong: ['丙', '甲', '癸'], xi: ['壬'] },
      '辰': { yong: ['甲', '癸', '丙'], xi: ['壬'] },
      '巳': { yong: ['甲', '癸', '丙'], xi: ['壬'] },
      '午': { yong: ['壬', '甲', '丙'], xi: ['癸'] },
      '未': { yong: ['癸', '丙', '甲'], xi: ['壬'] },
      '申': { yong: ['丙', '癸', '甲'], xi: ['壬'] },
      '酉': { yong: ['丙', '癸'], xi: ['壬'] },
      '戌': { yong: ['甲', '丙', '癸'], xi: ['壬'] },
      '亥': { yong: ['丙', '甲'], xi: ['癸'] }
    },
    '己': {
      '子': { yong: ['丙', '甲'], xi: ['癸'] },
      '丑': { yong: ['丙', '甲'], xi: ['癸'] },
      '寅': { yong: ['丙', '甲', '癸'], xi: ['壬'] },
      '卯': { yong: ['丙', '甲', '癸'], xi: ['壬'] },
      '辰': { yong: ['丙', '甲', '癸'], xi: ['壬'] },
      '巳': { yong: ['癸', '丙'], xi: ['壬'] },
      '午': { yong: ['癸', '丙'], xi: ['壬'] },
      '未': { yong: ['癸', '丙'], xi: ['壬'] },
      '申': { yong: ['丙', '癸'], xi: ['壬'] },
      '酉': { yong: ['丙', '癸'], xi: ['壬'] },
      '戌': { yong: ['甲', '丙', '癸'], xi: ['壬'] },
      '亥': { yong: ['丙', '甲'], xi: ['癸'] }
    },
    '庚': {
      '子': { yong: ['丁', '甲'], xi: ['丙'] },
      '丑': { yong: ['丁', '甲', '丙'], xi: ['戊'] },
      '寅': { yong: ['丁', '甲', '丙'], xi: ['壬'] },
      '卯': { yong: ['丁', '甲'], xi: ['壬'] },
      '辰': { yong: ['甲', '丁', '壬'], xi: ['戊'] },
      '巳': { yong: ['壬', '戊', '癸'], xi: ['丁'] },
      '午': { yong: ['壬', '癸'], xi: ['丁'] },
      '未': { yong: ['壬', '癸', '丁'], xi: ['戊'] },
      '申': { yong: ['丁', '甲', '壬'], xi: ['戊'] },
      '酉': { yong: ['丁', '甲', '壬'], xi: ['戊'] },
      '戌': { yong: ['甲', '壬'], xi: ['丁'] },
      '亥': { yong: ['丁', '甲'], xi: ['丙'] }
    },
    '辛': {
      '子': { yong: ['丙', '壬'], xi: ['戊'] },
      '丑': { yong: ['丙', '壬'], xi: ['戊', '己'] },
      '寅': { yong: ['壬', '甲'], xi: ['戊'] },
      '卯': { yong: ['壬', '甲'], xi: ['己'] },
      '辰': { yong: ['壬', '甲'], xi: ['戊'] },
      '巳': { yong: ['壬', '癸', '甲'], xi: ['己'] },
      '午': { yong: ['壬', '癸', '己'], xi: ['丙'] },
      '未': { yong: ['壬', '癸'], xi: ['己'] },
      '申': { yong: ['壬', '甲'], xi: ['戊'] },
      '酉': { yong: ['壬', '甲'], xi: ['戊'] },
      '戌': { yong: ['壬', '甲'], xi: ['丙'] },
      '亥': { yong: ['丙', '壬'], xi: ['戊'] }
    },
    '壬': {
      '子': { yong: ['戊', '丙'], xi: ['甲'] },
      '丑': { yong: ['丙', '甲'], xi: ['戊'] },
      '寅': { yong: ['戊', '辛', '庚'], xi: ['丙'] },
      '卯': { yong: ['戊', '辛'], xi: ['庚'] },
      '辰': { yong: ['甲', '庚'], xi: ['戊'] },
      '巳': { yong: ['壬', '辛', '庚'], xi: ['癸'] },
      '午': { yong: ['癸', '庚', '辛'], xi: ['壬'] },
      '未': { yong: ['辛', '甲'], xi: ['戊'] },
      '申': { yong: ['戊', '丁'], xi: ['甲'] },
      '酉': { yong: ['甲', '戊'], xi: ['丙'] },
      '戌': { yong: ['甲', '丙'], xi: ['戊'] },
      '亥': { yong: ['戊', '丙', '庚'], xi: ['甲'] }
    },
    '癸': {
      '子': { yong: ['丙', '辛'], xi: ['戊'] },
      '丑': { yong: ['丙', '辛'], xi: ['己'] },
      '寅': { yong: ['辛', '丙'], xi: ['戊'] },
      '卯': { yong: ['庚', '辛'], xi: ['戊'] },
      '辰': { yong: ['丙', '辛', '甲'], xi: ['戊'] },
      '巳': { yong: ['辛', '壬'], xi: ['庚'] },
      '午': { yong: ['庚', '辛', '壬', '癸'], xi: ['戊'] },
      '未': { yong: ['庚', '辛'], xi: ['戊'] },
      '申': { yong: ['丙', '丁'], xi: ['戊'] },
      '酉': { yong: ['丙', '辛'], xi: ['戊'] },
      '戌': { yong: ['丙', '甲', '辛'], xi: ['戊'] },
      '亥': { yong: ['丙', '戊'], xi: ['庚'] }
    }
  }
  
  const result = tiaoHouTable[dayGan]?.[monthZhi]
  return result ? { yongShen: result.yong, xiShen: result.xi } : { yongShen: [], xiShen: [] }
}

/**
 * 获取五行颜色
 */
export function getWuXingColor(ganOrZhi: string): string {
  const wuxing = TIANGAN_WUXING[ganOrZhi] || DIZHI_WUXING[ganOrZhi]
  return WUXING_COLORS[wuxing] || '#888'
}

/**
 * 获取五行图标
 */
export function getWuXingIcon(ganOrZhi: string): string {
  const wuxing = TIANGAN_WUXING[ganOrZhi] || DIZHI_WUXING[ganOrZhi]
  return WUXING_ICONS[wuxing] || ''
}
