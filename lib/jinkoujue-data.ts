export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

export const SHI_ER_JIANG = [
  "贵人", "螣蛇", "朱雀", "六合", "勾陈", "青龙",
  "天空", "白虎", "太常", "玄武", "太阴", "天后"
]

export const JIN_KOU_JUE_DUAN_YU = {
  "青龙": "青龙入课主财喜，贵人相助百事吉",
  "白虎": "白虎入课主凶丧，官非疾病须提防",
  "朱雀": "朱雀入课主文书，口舌是非要注意",
  "玄武": "玄武入课主盗贼，失物走失需寻找",
  "勾陈": "勾陈入课主田宅，诉讼牵连难解脱",
  "螣蛇": "螣蛇入课主虚惊，怪异之事令人惊",
  "六合": "六合入课主和合，婚姻交易两相宜",
  "太阴": "太阴入课主阴私，女人之事要注意",
  "天后": "天后入课主妇女，婚姻喜事多顺遂",
  "太常": "太常入课主酒食，宴会吉庆多欢喜",
  "天空": "天空入课主虚诈，空言虚诺不可信",
  "贵人": "贵人入课主贵助，逢凶化吉有帮助",
}

export function getShiGan(hour: number, dayGan: string): string {
  const ganOrder = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
  const dayIndex = ganOrder.indexOf(dayGan)
  const hourIndex = Math.floor(hour / 2) % 12
  
  const shiGanOrder: Record<string, string[]> = {
    "甲": ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲", "乙"],
    "乙": ["丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁"],
    "丙": ["戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己"],
    "丁": ["庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛"],
    "戊": ["壬", "癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    "己": ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲", "乙"],
    "庚": ["丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁"],
    "辛": ["戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己"],
    "壬": ["庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛"],
    "癸": ["壬", "癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
  }
  
  return shiGanOrder[dayGan]?.[hourIndex] || "甲"
}

export function getTianJiang(shiGan: string, dayGan: string): string {
  const ganOrder = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
  const shiGanIndex = ganOrder.indexOf(shiGan)
  const dayGanIndex = ganOrder.indexOf(dayGan)
  
  let jiangIndex = (shiGanIndex + dayGanIndex) % 12
  return SHI_ER_JIANG[jiangIndex]
}

export function calculateJinKouJue(date: Date): any {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  
  const yearGanIndex = (year - 4) % 10
  const yearZhiIndex = (year - 4) % 12
  const dayGanIndex = (year * 365 + month * 31 + day) % 10
  const dayZhiIndex = (year * 365 + month * 31 + day) % 12
  const hourGanIndex = (dayGanIndex * 12 + Math.floor(hour / 2)) % 10
  const hourZhiIndex = Math.floor(hour / 2) % 12
  
  const yearGan = TIAN_GAN[yearGanIndex]
  const yearZhi = DI_ZHI[yearZhiIndex]
  const dayGan = TIAN_GAN[dayGanIndex]
  const dayZhi = DI_ZHI[dayZhiIndex]
  const hourGan = TIAN_GAN[hourGanIndex]
  const hourZhi = DI_ZHI[hourZhiIndex]
  
  const tianGan = getShiGan(hour, dayGan)
  const tianJiang = getTianJiang(tianGan, dayGan)
  
  return {
    year,
    month,
    day,
    hour,
    nianZhu: { gan: yearGan, zhi: yearZhi },
    yueZhu: { gan: TIAN_GAN[(yearGanIndex * 12 + month + 1) % 10], zhi: DI_ZHI[(month + 1) % 12] },
    riZhu: { gan: dayGan, zhi: dayZhi },
    shiZhu: { gan: hourGan, zhi: hourZhi },
    tianGan,
    tianJiang,
    duanYu: JIN_KOU_JUE_DUAN_YU[tianJiang] || "此课无特殊断语"
  }
}