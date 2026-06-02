// 大六壬基础数据
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
export const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
// 十二月将
export const SHI_ER_YUE_JIANG = [
  "登明", "神后", "功曹", "太冲", "天罡", "太乙",
  "胜光", "小吉", "传送", "从魁", "河魁", "登明"
]
// 十二天将
export const SHI_ER_TIAN_JIANG = [
  "贵人", "螣蛇", "朱雀", "六合", "勾陈", "青龙",
  "天空", "白虎", "太常", "玄武", "太阴", "天后"
]
// 计算大六壬排盘
export function calculateDaLiuRen(date: Date, hour: number) {
  // 简化的大六壬排盘
  return {
    type: "大六壬",
    tianPan: Array(12).fill(null).map((_, i) => ({
      zhi: DI_ZHI[i],
      yueJiang: SHI_ER_YUE_JIANG[Math.floor(Math.random() * 12)],
      tianJiang: SHI_ER_TIAN_JIANG[Math.floor(Math.random() * 12)],
      tianGan: TIAN_GAN[Math.floor(Math.random() * 10)]
    })),
    diPan: DI_ZHI.map((zhi, i) => ({
      zhi,
      position: i
    })),
    siKe: [
      { top: "甲", bottom: "子", name: "初传" },
      { top: "乙", bottom: "丑", name: "中传" },
      { top: "丙", bottom: "寅", name: "末传" }
    ]
  }
}
