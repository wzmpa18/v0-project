// 太乙神数基础数据
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 太乙九宫
export const TAI_YI_JIU_GONG = [
  { position: 1, name: "乾宫", wuxing: "金", direction: "西北", symbol: "☰" },
  { position: 2, name: "离宫", wuxing: "火", direction: "南方", symbol: "☲" },
  { position: 3, name: "艮宫", wuxing: "土", direction: "东北", symbol: "☶" },
  { position: 4, name: "震宫", wuxing: "木", direction: "东方", symbol: "☳" },
  { position: 5, name: "中宫", wuxing: "土", direction: "中央", symbol: "☷" },
  { position: 6, name: "巽宫", wuxing: "木", direction: "东南", symbol: "☴" },
  { position: 7, name: "坤宫", wuxing: "土", direction: "西南", symbol: "☷" },
  { position: 8, name: "兑宫", wuxing: "金", direction: "西方", symbol: "☱" },
  { position: 9, name: "坎宫", wuxing: "水", direction: "北方", symbol: "☵" },
]

// 太乙十神
export const TAI_YI_SHI_SHEN = [
  { name: "太乙", nature: "贵神", description: "至尊之神，主祥瑞" },
  { name: "文昌", nature: "文星", description: "主文章、学业" },
  { name: "天辅", nature: "辅星", description: "主辅佐、贵人" },
  { name: "天冲", nature: "武将", description: "主武勇、征战" },
  { name: "天任", nature: "财星", description: "主财富、田宅" },
  { name: "天英", nature: "将星", description: "主权贵、名声" },
  { name: "天芮", nature: "病星", description: "主疾病、医药" },
  { name: "天柱", nature: "刑星", description: "主刑狱、诉讼" },
  { name: "天心", nature: "吉星", description: "主智慧、谋略" },
  { name: "天蓬", nature: "盗星", description: "主盗贼、变动" },
]

// 太乙八门
export const TAI_YI_BA_MEN = [
  { name: "休门", direction: "北方", nature: "吉", description: "主休息、安宁" },
  { name: "生门", direction: "东北", nature: "吉", description: "主生长、财富" },
  { name: "伤门", direction: "东方", nature: "凶", description: "主伤害、争斗" },
  { name: "杜门", direction: "东南", nature: "平", description: "主闭塞、阻隔" },
  { name: "景门", direction: "南方", nature: "平", description: "主文书、消息" },
  { name: "死门", direction: "西南", nature: "凶", description: "主死亡、丧事" },
  { name: "惊门", direction: "西方", nature: "凶", description: "主惊恐、口舌" },
  { name: "开门", direction: "西北", nature: "吉", description: "主开启、事业" },
]

// 太乙格局
export const TAI_YI_GE_JU = {
  jiGe: [
    { name: "太乙居明堂", description: "太乙居中宫，百事吉昌", origin: "《太乙金镜式经》" },
    { name: "文昌聚会", description: "文昌与太乙同宫，主文星高照", origin: "《太乙金镜式经》" },
    { name: "天辅相助", description: "天辅临身，贵人相助", origin: "《太乙金镜式经》" },
    { name: "八门皆吉", description: "八门相生，诸事顺遂", origin: "《太乙金镜式经》" },
  ],
  xiongGe: [
    { name: "太乙入囚", description: "太乙被囚，主灾厄", origin: "《太乙金镜式经》" },
    { name: "天芮临身", description: "天芮为病星，主疾病", origin: "《太乙金镜式经》" },
    { name: "天柱行刑", description: "天柱为刑星，主官非", origin: "《太乙金镜式经》" },
    { name: "八门相克", description: "八门相克，主不顺", origin: "《太乙金镜式经》" },
  ],
}

// 获取日干支
function getDayGanZhi(date: Date): { gan: string; zhi: string } {
  const startDate = new Date(1984, 0, 24);
  const diffDays = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const ganIndex = diffDays % 10;
  const zhiIndex = diffDays % 12;
  return { gan: TIAN_GAN[ganIndex], zhi: DI_ZHI[zhiIndex] };
}

// 计算太乙积年
function calculateTaiYiJiNian(year: number): number {
  const baseYear = 2012;
  const cycle = 60;
  return ((year - baseYear + cycle) % cycle) * 360 + 1;
}

// 计算太乙入宫
function calculateTaiYiRuGong(jinian: number): number {
  return (jinian % 9) || 9;
}

// 计算文昌入宫
function calculateWenChangRuGong(jinian: number): number {
  return ((jinian + 2) % 9) || 9;
}

// 计算始击入宫
function calculateShiJiRuGong(jinian: number): number {
  return ((jinian + 6) % 9) || 9;
}

// 计算八门位置
function calculateBaMenPositions(startGong: number): Record<string, number> {
  const result: Record<string, number> = {};
  const menOrder = ["开门", "休门", "生门", "伤门", "杜门", "景门", "死门", "惊门"];
  
  menOrder.forEach((men, index) => {
    const position = ((startGong - 1 + index) % 9) + 1;
    result[men] = position;
  });
  
  return result;
}

// 主排盘函数
export function calculateTaiYi(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  
  const dayInfo = getDayGanZhi(date);
  const jinian = calculateTaiYiJiNian(year);
  
  const taiYiGong = calculateTaiYiRuGong(jinian);
  const wenChangGong = calculateWenChangRuGong(jinian);
  const shiJiGong = calculateShiJiRuGong(jinian);
  
  const baMenPositions = calculateBaMenPositions(taiYiGong);
  
  return {
    type: "太乙神数",
    year,
    month,
    day,
    hour,
    dayGan: dayInfo.gan,
    dayZhi: dayInfo.zhi,
    jinian,
    taiYiGong,
    wenChangGong,
    shiJiGong,
    baMenPositions,
    taiYiInfo: TAI_YI_JIU_GONG.find(g => g.position === taiYiGong),
    wenChangInfo: TAI_YI_JIU_GONG.find(g => g.position === wenChangGong),
    shiJiInfo: TAI_YI_JIU_GONG.find(g => g.position === shiJiGong),
  };
}

// 太乙古籍断语
export const TAI_YI_DUAN_YU = {
  taiYi: {
    name: "太乙",
    description: "太乙者，至尊之神也，居中央而临八方，主天下之吉凶",
    origin: "《太乙金镜式经》"
  },
  wenChang: {
    name: "文昌",
    description: "文昌者，文星也，主文章科举，贵人相助",
    origin: "《太乙金镜式经》"
  },
  shiJi: {
    name: "始击",
    description: "始击者，凶神也，主征战杀伐，灾祸临身",
    origin: "《太乙金镜式经》"
  },
};