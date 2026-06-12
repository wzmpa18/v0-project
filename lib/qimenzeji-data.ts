// 奇门择吉数据 - 基于《奇门遁甲择日》

// 奇门择吉简介
export const QIMEN_ZEJI_INTRO = {
  title: "奇门择吉",
  origin: "《奇门遁甲择日》",
  description: "奇门择吉是利用奇门遁甲的原理来选择吉日良辰，通过分析天盘、地盘、人盘、神盘的配合，判断某一时辰的吉凶。",
  features: [
    "利用奇门遁甲原理",
    "选择吉日良辰",
    "分析四盘配合",
    "判断时辰吉凶",
  ],
}

// 适宜事项
export const SHI_YI_SHI_XIANG = [
  { name: "婚嫁", desc: "结婚、订婚、相亲等", suitable: ["青龙回首", "飞鸟跌穴", "三奇得使"] },
  { name: "开业", desc: "开店、开业、签约等", suitable: ["开门临吉", "生门临吉", "青龙回首"] },
  { name: "出行", desc: "远行、出差、旅游等", suitable: ["开门临吉", "九天临吉", "三奇临吉"] },
  { name: "求职", desc: "面试、求职、考试等", suitable: ["天辅临吉", "天心临吉", "三奇临吉"] },
  { name: "搬家", desc: "搬家、入宅、装修等", suitable: ["生门临吉", "开门临吉", "八门吉"] },
  { name: "求财", desc: "投资、理财、借贷等", suitable: ["生门临吉", "青龙回首", "飞鸟跌穴"] },
  { name: "治病", desc: "看病、手术、治疗等", suitable: ["天心临吉", "天乙临吉", "三奇临吉"] },
  { name: "诉讼", desc: "官司、仲裁、调解等", suitable: ["开门临吉", "天心临吉", "三奇临吉"] },
]

// 吉时判断
export const JI_SHI_PAN_DUAN = {
  吉时: [
    { name: "青龙回首时", desc: "天盘甲木加地盘丙火，大吉之时", chuchu: "《奇门遁甲择日》" },
    { name: "飞鸟跌穴时", desc: "天盘丙火加地盘甲木，大吉之时", chuchu: "《奇门遁甲择日》" },
    { name: "三奇得使时", desc: "三奇乙丙丁遇吉门，大吉之时", chuchu: "《奇门遁甲择日》" },
    { name: "天遁时", desc: "天盘丙奇生门合太阴，吉时", chuchu: "《奇门遁甲择日》" },
    { name: "地遁时", desc: "天盘乙奇开门合九地，吉时", chuchu: "《奇门遁甲择日》" },
    { name: "人遁时", desc: "天盘丁奇休门合太阴，吉时", chuchu: "《奇门遁甲择日》" },
  ],
  凶时: [
    { name: "白虎猖狂时", desc: "天盘庚辛加地盘木，大凶之时", chuchu: "《奇门遁甲择日》" },
    { name: "螣蛇夭矫时", desc: "螣蛇加地盘火，凶时", chuchu: "《奇门遁甲择日》" },
    { name: "五不遇时", desc: "时干克日干，办事不顺之时", chuchu: "《奇门遁甲择日》" },
    { name: "六仪击刑时", desc: "六仪自刑或互刑，凶时", chuchu: "《奇门遁甲择日》" },
    { name: "空亡时", desc: "六甲空亡，事无着落之时", chuchu: "《奇门遁甲择日》" },
    { name: "大格时", desc: "天盘庚加地盘癸，出行受阻之时", chuchu: "《奇门遁甲择日》" },
  ],
}

// 计算择吉结果
export function calculateQimenZeji(date: Date, shixiang: string): {
  suitable: boolean
  geju: string
  desc: string
} {
  // 简化算法：根据日期和事项判断吉凶
  const hour = date.getHours()
  const day = date.getDate()
  
  // 基于时辰和日期的简单判断
  const isGoodHour = hour >= 6 && hour <= 18 && (day % 3 === 0 || day % 5 === 0)
  
  const shixiangData = SHI_YI_SHI_XIANG.find(s => s.name === shixiang)
  
  if (isGoodHour && shixiangData) {
    return {
      suitable: true,
      geju: shixiangData.suitable[0],
      desc: `${shixiang}事宜，适合在此时进行`,
    }
  } else {
    return {
      suitable: false,
      geju: "五不遇时",
      desc: `${shixiang}事不宜，建议另择吉日`,
    }
  }
}