import { Solar, Lunar } from 'lunar-javascript'
import { getRuntimeConfig } from '@/lib/app-config'
import { checkShenSha, getKongWang, getMingGong, getShiShen, getShenGong, getTaiYuan } from '@/lib/bazi-data'
import { LIU_WENYUAN_PROFILE } from '@/lib/yixue/liu-wenyuan-profile'

const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

const CANG_GAN: Record<string, string[]> = {
  子: ['癸'], 丑: ['己', '癸', '辛'], 寅: ['甲', '丙', '戊'], 卯: ['乙'],
  辰: ['戊', '乙', '癸'], 巳: ['丙', '庚', '戊'], 午: ['丁', '己'], 未: ['己', '丁', '乙'],
  申: ['庚', '壬', '戊'], 酉: ['辛'], 戌: ['戊', '辛', '丁'], 亥: ['壬', '甲'],
}

const NA_YIN: Record<string, string> = {
  '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火',
  '戊辰': '大林木', '己巳': '大林木', '庚午': '路旁土', '辛未': '路旁土',
  '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
  '丙子': '涧下水', '丁丑': '涧下水', '戊寅': '城头土', '己卯': '城头土',
  '庚辰': '白蜡金', '辛巳': '白蜡金', '壬午': '杨柳木', '癸未': '杨柳木',
  '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
  '戊子': '霹雳火', '己丑': '霹雳火', '庚寅': '松柏木', '辛卯': '松柏木',
  '壬辰': '长流水', '癸巳': '长流水', '甲午': '砂石金', '乙未': '砂石金',
  '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
  '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金',
  '甲辰': '覆灯火', '乙巳': '覆灯火', '丙午': '天河水', '丁未': '天河水',
  '戊申': '大驿土', '己酉': '大驿土', '庚戌': '钗钏金', '辛亥': '钗钏金',
  '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水',
  '丙辰': '沙中土', '丁巳': '沙中土', '戊午': '天上火', '己未': '天上火',
  '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水',
}

export interface BaziEngineInput {
  name?: string
  gender: 'male' | 'female'
  calendarType: 'solar' | 'lunar'
  year: number
  month: number
  day: number
  hour: number
  useTrueSolarTime: boolean
  birthCity?: string
}

export interface BaziEngineOutput {
  lunarDate: string
  solarDate: string
  trueSolarTime?: string
  siZhu: {
    year: { gan: string; zhi: string; cangGan: string[]; shiShen: string; naYin: string }
    month: { gan: string; zhi: string; cangGan: string[]; shiShen: string; naYin: string }
    day: { gan: string; zhi: string; cangGan: string[]; shiShen: string; naYin: string }
    hour: { gan: string; zhi: string; cangGan: string[]; shiShen: string; naYin: string }
  }
  taiYuan: string
  mingGong: string
  shenGong: string
  kongWang: string[]
  shenSha: {
    year: string[]
    month: string[]
    day: string[]
    hour: string[]
  }
  daYun: Array<{ age: number; startYear: number; gan: string; zhi: string }>
  ruleSetVersion: string
  kernel: 'yuanfenju-api' | 'local-open-engine'
}

async function tryYuanfenjuApi(input: BaziEngineInput): Promise<BaziEngineOutput | null> {
  const baseUrl = process.env.NEXT_PUBLIC_YUANFENJU_API_BASE_URL
  const apiKey = process.env.NEXT_PUBLIC_YUANFENJU_API_KEY

  if (!baseUrl || !apiKey) {
    return null
  }

  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/bazi/paipan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      name: input.name || '用户',
      sex: input.gender === 'male' ? 1 : 0,
      year: input.year,
      month: input.month,
      day: input.day,
      hours: input.hour,
      true_solar_time: input.useTrueSolarTime ? 1 : 0,
      city: input.birthCity || '',
    }),
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  if (!data || !data.data) {
    return null
  }

  const payload = data.data
  if (!payload.siZhu || !payload.daYun) {
    return null
  }

  return {
    lunarDate: String(payload.lunarDate || ''),
    solarDate: String(payload.solarDate || ''),
    trueSolarTime: payload.trueSolarTime ? String(payload.trueSolarTime) : undefined,
    siZhu: payload.siZhu,
    taiYuan: String(payload.taiYuan || ''),
    mingGong: String(payload.mingGong || ''),
    shenGong: String(payload.shenGong || ''),
    kongWang: Array.isArray(payload.kongWang) ? payload.kongWang : [],
    shenSha: payload.shenSha || { year: [], month: [], day: [], hour: [] },
    daYun: Array.isArray(payload.daYun) ? payload.daYun : [],
    ruleSetVersion: process.env.NEXT_PUBLIC_BAZI_RULESET || LIU_WENYUAN_PROFILE.theoryId,
    kernel: 'yuanfenju-api',
  }
}

function calcLocalBazi(input: BaziEngineInput): BaziEngineOutput {
  let solar: ReturnType<typeof Solar.fromYmd>
  if (input.calendarType === 'lunar') {
    const lunar = Lunar.fromYmd(input.year, input.month, input.day)
    solar = lunar.getSolar()
  } else {
    solar = Solar.fromYmd(input.year, input.month, input.day)
  }

  const lunar = solar.getLunar()
  const eightChar = lunar.getEightChar()

  const yearGan = eightChar.getYearGan()
  const yearZhi = eightChar.getYearZhi()
  const monthGan = eightChar.getMonthGan()
  const monthZhi = eightChar.getMonthZhi()
  const dayGan = eightChar.getDayGan()
  const dayZhi = eightChar.getDayZhi()

  const shiChenIndex = Math.floor((input.hour + 1) % 24 / 2)
  const hourZhi = DI_ZHI[shiChenIndex]
  const dayGanIndex = TIAN_GAN.indexOf(dayGan)
  const hourGan = TIAN_GAN[((dayGanIndex % 5) * 2 + shiChenIndex) % 10]

  const yearGanZhi = `${yearGan}${yearZhi}`
  const monthGanZhi = `${monthGan}${monthZhi}`
  const dayGanZhi = `${dayGan}${dayZhi}`
  const hourGanZhi = `${hourGan}${hourZhi}`

  const allShenSha = checkShenSha({ yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi })

  const yun = eightChar.getYun(input.gender === 'male')
  const daYunList = yun.getDaYun()
  const daYun = daYunList.slice(1, 11).map((dy: any) => {
    const ganZhi = String(dy.getGanZhi())
    return {
      age: Number(dy.getStartAge()),
      startYear: input.year + Number(dy.getStartAge()),
      gan: ganZhi[0] || '甲',
      zhi: ganZhi[1] || '子',
    }
  })

  return {
    lunarDate: lunar.toString(),
    solarDate: solar.toYmd(),
    trueSolarTime: input.useTrueSolarTime ? `${input.birthCity || '默认地点'} 真太阳时` : undefined,
    siZhu: {
      year: { gan: yearGan, zhi: yearZhi, cangGan: CANG_GAN[yearZhi] || [], shiShen: getShiShen(dayGan, yearGan), naYin: NA_YIN[yearGanZhi] || '' },
      month: { gan: monthGan, zhi: monthZhi, cangGan: CANG_GAN[monthZhi] || [], shiShen: getShiShen(dayGan, monthGan), naYin: NA_YIN[monthGanZhi] || '' },
      day: { gan: dayGan, zhi: dayZhi, cangGan: CANG_GAN[dayZhi] || [], shiShen: '日主', naYin: NA_YIN[dayGanZhi] || '' },
      hour: { gan: hourGan, zhi: hourZhi, cangGan: CANG_GAN[hourZhi] || [], shiShen: getShiShen(dayGan, hourGan), naYin: NA_YIN[hourGanZhi] || '' },
    },
    taiYuan: getTaiYuan(monthGan, monthZhi),
    mingGong: getMingGong(monthZhi, hourZhi),
    shenGong: getShenGong(monthZhi, hourZhi),
    kongWang: getKongWang(dayGanZhi),
    shenSha: {
      year: allShenSha.filter((_, i) => i % 4 === 0),
      month: allShenSha.filter((_, i) => i % 4 === 1),
      day: allShenSha.filter((_, i) => i % 4 === 2),
      hour: allShenSha.filter((_, i) => i % 4 === 3),
    },
    daYun,
    ruleSetVersion: process.env.NEXT_PUBLIC_BAZI_RULESET || LIU_WENYUAN_PROFILE.theoryId,
    kernel: 'local-open-engine',
  }
}

export async function calculateBaziByCommercialKernel(input: BaziEngineInput): Promise<BaziEngineOutput> {
  const runtimeConfig = getRuntimeConfig()
  const preferredEngine = process.env.NEXT_PUBLIC_BAZI_ENGINE || 'yuanfenju'

  if (!runtimeConfig.apiBaseUrl && preferredEngine === 'yuanfenju') {
    // 无业务 API 基址时仍允许尝试专用第三方适配；失败后回退本地引擎
  }

  if (preferredEngine === 'yuanfenju') {
    try {
      const remote = await tryYuanfenjuApi(input)
      if (remote) {
        return remote
      }
    } catch {
      // 远程失败时回退本地开源引擎，保证可用性
    }
  }

  return calcLocalBazi(input)
}
