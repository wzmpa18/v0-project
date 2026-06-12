export const WU_YUN = {
  木: { name: "木运", description: "木气当令，风气盛行", effect: "肝气易旺，注意疏肝理气" },
  火: { name: "火运", description: "火气当令，热气盛行", effect: "心气易旺，注意清心降火" },
  土: { name: "土运", description: "土气当令，湿气盛行", effect: "脾气易旺，注意健脾祛湿" },
  金: { name: "金运", description: "金气当令，燥气盛行", effect: "肺气易旺，注意润肺生津" },
  水: { name: "水运", description: "水气当令，寒气盛行", effect: "肾气易旺，注意温肾散寒" },
}

export const LIU_QI = {
  厥阴: { name: "厥阴风木", description: "主风，对应肝经", season: "春" },
  少阴: { name: "少阴君火", description: "主热，对应心经", season: "夏初" },
  少阳: { name: "少阳相火", description: "主暑，对应三焦", season: "盛夏" },
  太阴: { name: "太阴湿土", description: "主湿，对应脾经", season: "长夏" },
  阳明: { name: "阳明燥金", description: "主燥，对应肺经", season: "秋" },
  太阳: { name: "太阳寒水", description: "主寒，对应肾经", season: "冬" },
}

export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

export const GAN_WUYUN_MAP: Record<string, string> = {
  "甲": "土", "己": "土",
  "乙": "金", "庚": "金",
  "丙": "水", "辛": "水",
  "丁": "木", "壬": "木",
  "戊": "火", "癸": "火",
}

export const ZHI_LIUQI_MAP: Record<string, string> = {
  "寅": "厥阴", "卯": "厥阴",
  "辰": "少阴", "巳": "少阴",
  "午": "少阳", "未": "少阳",
  "申": "太阴", "酉": "太阴",
  "戌": "阳明", "亥": "阳明",
  "子": "太阳", "丑": "太阳",
}

export function getYearGanZhi(year: number): { gan: string; zhi: string } {
  const ganIndex = (year - 4) % 10
  const zhiIndex = (year - 4) % 12
  return {
    gan: TIAN_GAN[ganIndex],
    zhi: DI_ZHI[zhiIndex],
  }
}

export function getYearWuYun(year: number): string {
  const yearGan = getYearGanZhi(year).gan
  return GAN_WUYUN_MAP[yearGan]
}

export function getYearLiuQi(year: number): string {
  const yearZhi = getYearGanZhi(year).zhi
  return ZHI_LIUQI_MAP[yearZhi]
}

export function calculateWuYunLiuQi(year: number) {
  const ganZhi = getYearGanZhi(year)
  const wuYun = getYearWuYun(year)
  const liuQi = getYearLiuQi(year)
  
  const yunInfo = WU_YUN[wuYun as keyof typeof WU_YUN]
  const qiInfo = LIU_QI[liuQi as keyof typeof LIU_QI]
  
  return {
    year,
    ganZhi: `${ganZhi.gan}${ganZhi.zhi}年`,
    wuYun: {
      element: wuYun,
      ...yunInfo,
    },
    liuQi: {
      name: liuQi,
      ...qiInfo,
    },
    summary: getYearSummary(year),
    healthAdvice: getHealthAdvice(wuYun, liuQi),
  }
}

export function getYearSummary(year: number): string {
  const wuYun = getYearWuYun(year)
  const liuQi = getYearLiuQi(year)
  
  const summaries: Record<string, Record<string, string>> = {
    木: {
      厥阴: `${year}年为木运风气之年，木气偏盛，易出现风邪致病，注意保护肝经。`,
      少阴: `${year}年为木运热气之年，木火相生，易出现风热病症，注意清热平肝。`,
      少阳: `${year}年为木运暑气之年，木火相煽，易出现中暑、眩晕等症。`,
      太阴: `${year}年为木运湿气之年，木克土，脾胃易受影响，注意健脾祛湿。`,
      阳明: `${year}年为木运燥气之年，金克木，肝气易郁，注意疏肝润燥。`,
      太阳: `${year}年为木运寒气之年，水生木，肾气易旺，注意温肾暖肝。`,
    },
    火: {
      厥阴: `${year}年为火运风气之年，风火相煽，易出现风热感冒、头痛等症。`,
      少阴: `${year}年为火运热气之年，火气过盛，易出现心火亢盛、口舌生疮。`,
      少阳: `${year}年为火运暑气之年，火上加火，易出现中暑、烦躁不安。`,
      太阴: `${year}年为火运湿气之年，湿热交蒸，易出现湿热病症，注意清热利湿。`,
      阳明: `${year}年为火运燥气之年，火灼金伤，肺阴易亏，注意养阴润肺。`,
      太阳: `${year}年为火运寒气之年，水火既济，阴阳调和，整体较为平和。`,
    },
    土: {
      厥阴: `${year}年为土运风气之年，木克土，脾胃易受影响，注意疏肝健脾。`,
      少阴: `${year}年为土运热气之年，火生土，脾气易旺，注意清热健脾。`,
      少阳: `${year}年为土运暑气之年，湿热交蒸，易出现脾胃湿热病症。`,
      太阴: `${year}年为土运湿气之年，土湿过盛，易出现痰湿病症，注意健脾祛湿。`,
      阳明: `${year}年为土运燥气之年，土金相生，肺气易旺，注意润燥健脾。`,
      太阳: `${year}年为土运寒气之年，土水相克，肾脾易受影响，注意温肾健脾。`,
    },
    金: {
      厥阴: `${year}年为金运风气之年，金木相克，肝气易郁，注意疏肝理气。`,
      少阴: `${year}年为金运热气之年，火克金，肺气易伤，注意清热润肺。`,
      少阳: `${year}年为金运暑气之年，火灼金伤，肺阴易亏，注意养阴清热。`,
      太阴: `${year}年为金运湿气之年，土金相生，脾气易旺，注意健脾润肺。`,
      阳明: `${year}年为金运燥气之年，金燥过盛，易出现干咳、便秘等症。`,
      太阳: `${year}年为金运寒气之年，金水相生，肾气易旺，注意温肺散寒。`,
    },
    水: {
      厥阴: `${year}年为水运风气之年，水木相生，肝气易旺，注意平肝息风。`,
      少阴: `${year}年为水运热气之年，水火既济，阴阳调和，整体较为平和。`,
      少阳: `${year}年为水运暑气之年，水火相济，注意防暑降温，保护心肾。`,
      太阴: `${year}年为水运湿气之年，水湿过盛，易出现水肿、腹泻等症。`,
      阳明: `${year}年为水运燥气之年，金生水，肾气易旺，注意润燥护肾。`,
      太阳: `${year}年为水运寒气之年，寒气过盛，易出现寒邪致病，注意保暖防寒。`,
    },
  }
  
  return summaries[wuYun]?.[liuQi] || `${year}年运气平和，身体健康。`
}

export function getHealthAdvice(wuYun: string, liuQi: string): string[] {
  const adviceMap: Record<string, Record<string, string[]>> = {
    木: {
      厥阴: ["注意保持心情舒畅，避免情绪激动", "多吃绿色蔬菜，如菠菜、芹菜", "适当进行户外活动，疏肝理气"],
      少阴: ["多喝水，保持室内通风", "少吃辛辣食物，避免上火", "可饮用菊花茶、薄荷茶"],
      少阳: ["避免长时间户外活动", "多吃西瓜、绿豆等清热食物", "保持充足睡眠"],
      太阴: ["少吃生冷油腻食物", "适当吃薏米、红豆祛湿", "保持室内干燥"],
      阳明: ["多吃润燥食物，如梨、蜂蜜", "避免过度劳累", "保持呼吸道湿润"],
      太阳: ["注意保暖，避免受凉", "适当吃温热食物", "睡前泡脚暖身"],
    },
    火: {
      厥阴: ["保持室内空气流通", "多吃清淡食物", "避免情绪激动"],
      少阴: ["多喝水，可饮用莲子心茶", "少吃油炸食品", "保持心情平静"],
      少阳: ["避免高温时段外出", "多吃清热解暑食物", "补充电解质"],
      太阴: ["少吃甜食和油腻食物", "适当吃冬瓜、赤小豆", "加强体育锻炼"],
      阳明: ["多吃银耳、百合等滋阴食物", "避免吸烟饮酒", "保持室内湿度"],
      太阳: ["平衡饮食，避免过寒过热", "适当进行温和运动", "保持规律作息"],
    },
    土: {
      厥阴: ["保持心情愉悦", "多吃健脾食物，如山药、南瓜", "饭后适当散步"],
      少阴: ["少吃辛辣食物", "适当吃绿豆、冬瓜", "饭后不宜立即躺下"],
      少阳: ["饮食清淡，少吃油腻", "多吃清热利湿食物", "适当午休"],
      太阴: ["少吃生冷食物", "多吃健脾祛湿食物", "适当进行户外活动"],
      阳明: ["多吃滋润食物", "避免暴饮暴食", "保持大便通畅"],
      太阳: ["少吃寒凉食物", "适当吃生姜、羊肉", "注意腹部保暖"],
    },
    金: {
      厥阴: ["保持心情舒畅", "多吃绿色蔬菜", "适当进行深呼吸"],
      少阴: ["多喝水，保持呼吸道湿润", "少吃辛辣食物", "避免熬夜"],
      少阳: ["避免烈日下暴晒", "多吃清热食物", "保持室内通风"],
      太阴: ["少吃生冷食物", "适当吃健脾食物", "保持室内干燥"],
      阳明: ["多吃梨、百合等润肺食物", "避免吸烟", "保持室内湿度"],
      太阳: ["注意保暖，避免感冒", "适当吃温热食物", "加强体育锻炼"],
    },
    水: {
      厥阴: ["保持心情平静", "多吃清淡食物", "避免熬夜"],
      少阴: ["平衡饮食，避免过咸", "适当进行温和运动", "保持充足睡眠"],
      少阳: ["避免高温时段外出", "多吃清热食物", "补充水分"],
      太阴: ["少吃生冷食物", "适当吃健脾食物", "保持室内干燥"],
      阳明: ["多吃滋润食物", "避免过度劳累", "保持规律作息"],
      太阳: ["注意保暖，避免受凉", "适当吃温热食物", "睡前泡脚"],
    },
  }
  
  return adviceMap[wuYun]?.[liuQi] || ["保持规律作息，均衡饮食，适当运动。"]
}

export const WUYUNLIUQI_NOTES = {
  intro: "五运六气是中医运气学说的核心内容，通过天干地支推算每年的气候变化规律及其对人体健康的影响。",
  wuyun_desc: "五运指木、火、土、金、水五种气运的变化，每年由一个运主令，影响全年的气候特征。",
  liuqi_desc: "六气指厥阴风木、少阴君火、少阳相火、太阴湿土、阳明燥金、太阳寒水六种气候的变化，每两个月由一气主令。",
  health_tips: "根据当年的运气特点，可以提前做好养生保健，预防相应的疾病发生。",
}