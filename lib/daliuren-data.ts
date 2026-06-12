// 大六壬基础数据
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 十二月将
export const SHI_ER_YUE_JIANG = [
  { name: "登明", zhi: "亥", month: 1 },
  { name: "神后", zhi: "子", month: 2 },
  { name: "功曹", zhi: "寅", month: 3 },
  { name: "太冲", zhi: "卯", month: 4 },
  { name: "天罡", zhi: "辰", month: 5 },
  { name: "太乙", zhi: "巳", month: 6 },
  { name: "胜光", zhi: "午", month: 7 },
  { name: "小吉", zhi: "未", month: 8 },
  { name: "传送", zhi: "申", month: 9 },
  { name: "从魁", zhi: "酉", month: 10 },
  { name: "河魁", zhi: "戌", month: 11 },
  { name: "征明", zhi: "亥", month: 12 },
]

// 十二天将
export const SHI_ER_TIAN_JIANG = [
  { name: "贵人", wuxing: "土", nature: "贵神" },
  { name: "螣蛇", wuxing: "火", nature: "虚诈" },
  { name: "朱雀", wuxing: "火", nature: "文书" },
  { name: "六合", wuxing: "木", nature: "和合" },
  { name: "勾陈", wuxing: "土", nature: "争斗" },
  { name: "青龙", wuxing: "木", nature: "财帛" },
  { name: "天空", wuxing: "土", nature: "空亡" },
  { name: "白虎", wuxing: "金", nature: "杀伤" },
  { name: "太常", wuxing: "土", nature: "酒食" },
  { name: "玄武", wuxing: "水", nature: "盗贼" },
  { name: "太阴", wuxing: "金", nature: "阴私" },
  { name: "天后", wuxing: "水", nature: "恩泽" },
]

// 天干寄宫
export const GAN_JI_GONG: Record<string, string> = {
  "甲": "寅", "乙": "辰", "丙": "巳", "丁": "未",
  "戊": "巳", "己": "未", "庚": "申", "辛": "酉",
  "壬": "亥", "癸": "丑"
}

// 地盘位置（固定）
export const DI_PAN = [
  { position: 0, zhi: "子", direction: "北方" },
  { position: 1, zhi: "丑", direction: "东北" },
  { position: 2, zhi: "寅", direction: "东北" },
  { position: 3, zhi: "卯", direction: "东方" },
  { position: 4, zhi: "辰", direction: "东南" },
  { position: 5, zhi: "巳", direction: "东南" },
  { position: 6, zhi: "午", direction: "南方" },
  { position: 7, zhi: "未", direction: "西南" },
  { position: 8, zhi: "申", direction: "西南" },
  { position: 9, zhi: "酉", direction: "西方" },
  { position: 10, zhi: "戌", direction: "西北" },
  { position: 11, zhi: "亥", direction: "西北" },
]

// 获取日干支
function getDayGanZhi(date: Date): { gan: string; zhi: string } {
  const startDate = new Date(1984, 0, 24); // 甲子日
  const diffDays = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const ganIndex = diffDays % 10;
  const zhiIndex = diffDays % 12;
  return { gan: TIAN_GAN[ganIndex], zhi: DI_ZHI[zhiIndex] };
}

// 获取时干支
function getHourGanZhi(date: Date): { gan: string; zhi: string } {
  const dayGan = getDayGanZhi(date).gan;
  const hour = date.getHours();
  const zhiIndex = Math.floor(hour / 2) % 12;
  const ganIndex = (TIAN_GAN.indexOf(dayGan) * 2 + zhiIndex) % 10;
  return { gan: TIAN_GAN[ganIndex], zhi: DI_ZHI[zhiIndex] };
}

// 获取月将
function getYueJiang(month: number) {
  return SHI_ER_YUE_JIANG[(month - 1 + 11) % 12];
}

// 计算天盘
function calculateTianPan(month: number, dayGan: string, dayZhi: string) {
  const yueJiang = getYueJiang(month);
  const tianPan: Array<{ zhi: string; yueJiang: string; position: number }> = [];
  
  const diPanIndex = DI_ZHI.indexOf(dayZhi);
  const yueJiangIndex = DI_ZHI.indexOf(yueJiang.zhi);
  
  for (let i = 0; i < 12; i++) {
    const idx = (diPanIndex + i - yueJiangIndex + 12) % 12;
    tianPan.push({
      zhi: DI_ZHI[idx],
      yueJiang: SHI_ER_YUE_JIANG[idx].name,
      position: i
    });
  }
  
  return tianPan;
}

// 计算四课
function calculateSiKe(tianPan: Array<{ zhi: string; yueJiang: string; position: number }>, dayGan: string, dayZhi: string, hourGan: string, hourZhi: string) {
  const dayZhiIndex = DI_ZHI.indexOf(dayZhi);
  const hourZhiIndex = DI_ZHI.indexOf(hourZhi);
  
  const dayTianGan = GAN_JI_GONG[dayGan];
  const hourTianGan = GAN_JI_GONG[hourGan];
  
  const dayTianPan = tianPan.find(t => t.position === dayZhiIndex);
  const hourTianPan = tianPan.find(t => t.position === hourZhiIndex);
  
  return {
    ke1: { name: "第一课（干上）", gan: dayGan, tianZhi: dayTianPan?.zhi || "", diZhi: dayZhi, tianJiang: dayTianPan?.yueJiang || "" },
    ke2: { name: "第二课（支上）", gan: "", tianZhi: hourTianPan?.zhi || "", diZhi: hourZhi, tianJiang: hourTianPan?.yueJiang || "" },
    ke3: { name: "第三课（干阴）", gan: dayTianGan, tianZhi: tianPan.find(t => t.position === DI_ZHI.indexOf(dayTianPan?.zhi || ""))?.zhi || "", diZhi: dayTianPan?.zhi || "", tianJiang: "" },
    ke4: { name: "第四课（支阴）", gan: hourTianGan, tianZhi: tianPan.find(t => t.position === DI_ZHI.indexOf(hourTianPan?.zhi || ""))?.zhi || "", diZhi: hourTianPan?.zhi || "", tianJiang: "" },
  };
}

// 计算三传
function calculateSanChuan(siKe: any, dayGan: string) {
  const ganIndex = TIAN_GAN.indexOf(dayGan);
  const chuan1Zhi = siKe.ke1.tianZhi;
  const chuan2Zhi = siKe.ke3.tianZhi;
  const chuan3Zhi = siKe.ke4.tianZhi;
  
  return [
    { name: "初传", zhi: chuan1Zhi, gan: TIAN_GAN[(ganIndex + 1) % 10] },
    { name: "中传", zhi: chuan2Zhi, gan: TIAN_GAN[(ganIndex + 2) % 10] },
    { name: "末传", zhi: chuan3Zhi, gan: TIAN_GAN[(ganIndex + 3) % 10] },
  ];
}

// 计算十二天将
function calculateTianJiang(sanChuan: any[], dayGan: string) {
  const ganIndex = TIAN_GAN.indexOf(dayGan);
  const jiangOrder = SHI_ER_TIAN_JIANG;
  const result: Record<string, string> = {};
  
  sanChuan.forEach((chuan, idx) => {
    const jiangIndex = (ganIndex + idx) % 12;
    result[chuan.name] = jiangOrder[jiangIndex].name;
  });
  
  return result;
}

// 主排盘函数
export function calculateDaLiuRen(date: Date) {
  const dayInfo = getDayGanZhi(date);
  const hourInfo = getHourGanZhi(date);
  const month = date.getMonth() + 1;
  
  const tianPan = calculateTianPan(month, dayInfo.gan, dayInfo.zhi);
  const siKe = calculateSiKe(tianPan, dayInfo.gan, dayInfo.zhi, hourInfo.gan, hourInfo.zhi);
  const sanChuan = calculateSanChuan(siKe, dayInfo.gan);
  const tianJiang = calculateTianJiang(sanChuan, dayInfo.gan);
  
  return {
    type: "大六壬",
    date: date.toLocaleDateString(),
    dayGan: dayInfo.gan,
    dayZhi: dayInfo.zhi,
    hourGan: hourInfo.gan,
    hourZhi: hourInfo.zhi,
    month,
    tianPan,
    diPan: DI_PAN,
    siKe,
    sanChuan,
    tianJiang,
    yueJiang: getYueJiang(month).name,
  };
}

// 大六壬古籍断语
export const DA_LIU_REN_DUAN_YU = {
  guiRen: {
    name: "贵人",
    description: "贵人临身，诸事吉昌，有贵人相助",
    origin: "《六壬大全》"
  },
  tengShe: {
    name: "螣蛇",
    description: "螣蛇缠绕，虚惊怪异，主虚诈之事",
    origin: "《壬归》"
  },
  zhuQue: {
    name: "朱雀",
    description: "朱雀临卦，文书口舌，主消息往来",
    origin: "《六壬金口诀》"
  },
  liuHe: {
    name: "六合",
    description: "六合和合，婚姻喜庆，主和合之事",
    origin: "《六壬大全》"
  },
  gouChen: {
    name: "勾陈",
    description: "勾陈争斗，官非诉讼，主田宅之事",
    origin: "《壬归》"
  },
  qingLong: {
    name: "青龙",
    description: "青龙得位，财帛丰盈，主喜庆之事",
    origin: "《六壬大全》"
  },
};

// 三传断语
export const SAN_CHUAN_DUAN_YU = {
  chuZhuan: {
    name: "初传",
    description: "初传为发端，主事之始，吉凶之兆",
    origin: "《六壬大全》"
  },
  zhongZhuan: {
    name: "中传",
    description: "中传为发展，主事之中，变化之象",
    origin: "《壬归》"
  },
  moZhuan: {
    name: "末传",
    description: "末传为结果，主事之终，成败之局",
    origin: "《六壬大全》"
  },
};