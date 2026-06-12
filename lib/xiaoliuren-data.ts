export const XIAO_LIU_REN = [
  { name: "大安", nature: "吉", desc: "大安事事昌，求谋在东方，失物去不远，宅舍保平安" },
  { name: "留连", nature: "平", desc: "留连事难成，求谋日未明，官事只宜缓，去者未回程" },
  { name: "速喜", nature: "吉", desc: "速喜喜来临，求财向南行，失物申午未，逢人路上寻" },
  { name: "赤口", nature: "凶", desc: "赤口主口舌，官非切要防，失物急寻找，行人有惊慌" },
  { name: "小吉", nature: "吉", desc: "小吉最吉昌，路上好商量，阴人来报喜，失物在坤方" },
  { name: "空亡", nature: "凶", desc: "空亡事不祥，阴人多乖张，求财无利益，行人有灾殃" },
]

export const XIAO_LIU_REN_DETAIL = {
  "大安": {
    meaning: "平安、顺利",
    advice: "宜静不宜动，守旧为吉，不宜急于求成",
    suitable: ["寻人", "问病", "家宅"],
    unsuitable: ["出行", "求财", "嫁娶"]
  },
  "留连": {
    meaning: "拖延、纠缠",
    advice: "耐心等待，不宜冲动，静观其变",
    suitable: ["等待消息", "商议事情"],
    unsuitable: ["急办之事", "投资"]
  },
  "速喜": {
    meaning: "快速、喜庆",
    advice: "速战速决，把握时机，积极行动",
    suitable: ["求财", "出行", "嫁娶", "考试"],
    unsuitable: ["诉讼", "动土"]
  },
  "赤口": {
    meaning: "口舌、是非",
    advice: "谨言慎行，避免争执，谨防小人",
    suitable: ["诉讼"],
    unsuitable: ["交友", "合作", "婚嫁"]
  },
  "小吉": {
    meaning: "小吉、顺利",
    advice: "积极进取，把握机会，可获小利",
    suitable: ["求财", "出行", "交友", "问病"],
    unsuitable: ["大事"]
  },
  "空亡": {
    meaning: "空亡、虚耗",
    advice: "不宜冒险，保守为上，谨防损失",
    suitable: ["安葬"],
    unsuitable: ["投资", "出行", "重要决策"]
  },
}

export function calculateXiaoLiuRen(month: number, day: number, hour: number): any {
  const startIndex = (month + day + hour) % 6
  const result = XIAO_LIU_REN[startIndex]
  
  return {
    month,
    day,
    hour,
    result,
    detail: XIAO_LIU_REN_DETAIL[result.name]
  }
}

export function calculateXiaoLiuRenByTime(date: Date): any {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  
  return calculateXiaoLiuRen(month, day, hour)
}