export const ZERI_SHI_XIANG = {
  "青龙": { nature: "吉", desc: "宜祭祀、祈福、嫁娶、纳财", color: "green" },
  "明堂": { nature: "吉", desc: "宜修造、动土、开市、交易", color: "yellow" },
  "天刑": { nature: "凶", desc: "忌诉讼、动土、嫁娶", color: "red" },
  "朱雀": { nature: "凶", desc: "忌口舌、诉讼、出行", color: "red" },
  "金匮": { nature: "吉", desc: "宜嫁娶、纳财、开市", color: "yellow" },
  "天德": { nature: "吉", desc: "宜祭祀、祈福、修造", color: "green" },
  "白虎": { nature: "凶", desc: "忌嫁娶、出行、动土", color: "red" },
  "玉堂": { nature: "吉", desc: "宜修造、安葬、祭祀", color: "yellow" },
  "天牢": { nature: "凶", desc: "忌诉讼、嫁娶、出行", color: "red" },
  "玄武": { nature: "凶", desc: "忌出行、交易、嫁娶", color: "red" },
  "司命": { nature: "吉", desc: "宜祈福、祭祀、嫁娶", color: "green" },
  "勾陈": { nature: "凶", desc: "忌动土、嫁娶、出行", color: "red" },
}

export const ZERI_YI_JI: Record<string, { yi: string[]; ji: string[] }> = {
  "婚嫁": {
    yi: ["青龙", "明堂", "金匮", "天德", "玉堂", "司命"],
    ji: ["天刑", "朱雀", "白虎", "天牢", "玄武", "勾陈"]
  },
  "开业": {
    yi: ["青龙", "明堂", "金匮", "玉堂", "司命"],
    ji: ["天刑", "朱雀", "白虎", "天牢", "玄武"]
  },
  "搬家": {
    yi: ["青龙", "明堂", "金匮", "天德", "玉堂"],
    ji: ["天刑", "朱雀", "白虎", "天牢", "玄武"]
  },
  "动土": {
    yi: ["青龙", "明堂", "天德", "玉堂"],
    ji: ["天刑", "朱雀", "白虎", "天牢", "勾陈"]
  },
  "出行": {
    yi: ["青龙", "明堂", "金匮", "天德", "司命"],
    ji: ["天刑", "朱雀", "白虎", "玄武", "勾陈"]
  },
  "祭祀": {
    yi: ["青龙", "明堂", "天德", "玉堂", "司命"],
    ji: ["天刑", "朱雀", "白虎", "玄武"]
  },
  "安葬": {
    yi: ["明堂", "金匮", "天德", "玉堂"],
    ji: ["天刑", "朱雀", "白虎", "天牢", "玄武"]
  },
  "纳财": {
    yi: ["青龙", "明堂", "金匮", "玉堂", "司命"],
    ji: ["天刑", "朱雀", "白虎", "玄武"]
  },
}

export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

export const SHEN_XIAO = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]

export const CHONG_SHA = {
  "子": "午", "丑": "未", "寅": "申", "卯": "酉", "辰": "戌", "巳": "亥",
  "午": "子", "未": "丑", "申": "寅", "酉": "卯", "戌": "辰", "亥": "巳"
}

export function getDayShen(dayZhi: string): string {
  const idx = DI_ZHI.indexOf(dayZhi)
  const gods = ["青龙", "明堂", "天刑", "朱雀", "金匮", "天德", "白虎", "玉堂", "天牢", "玄武", "司命", "勾陈"]
  return gods[(idx + 1) % 12]
}

export function getChongSha(dayZhi: string): string {
  return CHONG_SHA[dayZhi] || ""
}

export function getShengXiao(year: number): string {
  return SHEN_XIAO[(year - 4) % 12]
}

export function isGoodDayFor(dayShen: string, event: string): boolean {
  const rules = ZERI_YI_JI[event]
  if (!rules) return false
  return rules.yi.includes(dayShen)
}

export function getDayInfo(date: Date): any {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const yearGanIndex = (year - 4) % 10
  const yearZhiIndex = (year - 4) % 12
  const dayGanIndex = (year * 365 + month * 31 + day) % 10
  const dayZhiIndex = (year * 365 + month * 31 + day) % 12
  
  const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
  const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
  
  const dayGan = TIAN_GAN[dayGanIndex]
  const dayZhi = DI_ZHI[dayZhiIndex]
  const dayShen = getDayShen(dayZhi)
  const chongSha = getChongSha(dayZhi)
  
  return {
    year,
    month,
    day,
    yearGan: TIAN_GAN[yearGanIndex],
    yearZhi: DI_ZHI[yearZhiIndex],
    dayGan,
    dayZhi,
    dayShen,
    chongSha,
    shengXiao: getShengXiao(year),
    shenInfo: ZERI_SHI_XIANG[dayShen]
  }
}

export function findGoodDays(year: number, month: number, event: string): Date[] {
  const result: Date[] = []
  const daysInMonth = new Date(year, month, 0).getDate()
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)
    const info = getDayInfo(date)
    if (isGoodDayFor(info.dayShen, event)) {
      result.push(date)
    }
  }
  
  return result
}