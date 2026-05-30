// 调候断语生成：基于真实日主、月令、调候用神，动态生成"论X生X月"原文与译文
// 依据《穷通宝鉴》《渊海子平》调候用神原理，内容随用户八字变化

const GAN_WUXING: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水",
}

// 月令对应的节气气候
const MONTH_CLIMATE: Record<string, { season: string; desc: string }> = {
  寅: { season: "孟春正月", desc: "余寒未尽，木嫩气虚，喜火暖局" },
  卯: { season: "仲春二月", desc: "木气当旺，阳和渐盛" },
  辰: { season: "季春三月", desc: "木气渐退，土旺司令，湿土养木" },
  巳: { season: "孟夏四月", desc: "火气渐炎，万物向荣，喜水润泽" },
  午: { season: "仲夏五月", desc: "火势炎炎，燥热当令，最喜水来调候" },
  未: { season: "季夏六月", desc: "暑气未消，土旺金伏，喜水解炎" },
  申: { season: "孟秋七月", desc: "金气司令，凉风渐起" },
  酉: { season: "仲秋八月", desc: "金气专旺，肃杀之气盛" },
  戌: { season: "季秋九月", desc: "土旺燥金，秋深气燥" },
  亥: { season: "孟冬十月", desc: "水气渐旺，寒气初生" },
  子: { season: "仲冬十一月", desc: "天寒地冻，一阳来复，最喜火暖" },
  丑: { season: "季冬十二月", desc: "严寒未退，湿土冻结，喜火解冻" },
}

// 十神关系：日主 vs 某天干
function getRelation(dayGan: string, target: string): string {
  const dayWx = GAN_WUXING[dayGan]
  const tWx = GAN_WUXING[target]
  const dayYang = "甲丙戊庚壬".includes(dayGan)
  const tYang = "甲丙戊庚壬".includes(target)
  const sameYin = dayYang === tYang
  const order = ["木", "火", "土", "金", "水"]
  const di = order.indexOf(dayWx)
  const ti = order.indexOf(tWx)
  if (dayWx === tWx) return sameYin ? "比肩" : "劫财"
  if ((di + 1) % 5 === ti) return sameYin ? "食神" : "伤官" // 日主生
  if ((di + 2) % 5 === ti) return sameYin ? "偏财" : "正财" // 日主克
  if ((ti + 1) % 5 === di) return sameYin ? "偏印" : "正印" // 生日主
  if ((ti + 2) % 5 === di) return sameYin ? "七杀" : "正官" // 克日主
  return ""
}

// 某天干对日主的调候作用描述
function getYongRole(dayGan: string, yong: string): string {
  const dayWx = GAN_WUXING[dayGan]
  const yWx = GAN_WUXING[yong]
  const rel = getRelation(dayGan, yong)
  let action = ""
  if (yWx === "水" && (dayWx === "火" || dayWx === "土")) action = "润燥降温、调候解炎"
  else if (yWx === "火" && (dayWx === "水" || dayWx === "金" || dayWx === "木")) action = "暖局解寒、温养日元"
  else if (yWx === "木" && dayWx === "火") action = "生扶火势、引化生机"
  else if (yWx === "金" && dayWx === "木") action = "修削成器、去芜存精"
  else if (yWx === "土" && dayWx === "水") action = "止水固堤、培根纳气"
  else if (yWx === "木" && dayWx === "土") action = "疏松土性、通达气机"
  else action = "扶抑调和、补偏救弊"
  return `${yong}（${yWx}，${rel}）${action}`
}

export interface TiaoHouText {
  title: string
  yuanWen: string[] // 原文（精要）
  yiWen: string[] // 译文
}

export function getTiaoHouText(
  dayGan: string,
  monthZhi: string,
  yongShen: string[],
  xiShen: string[],
): TiaoHouText {
  const dayWx = GAN_WUXING[dayGan] || ""
  const climate = MONTH_CLIMATE[monthZhi] || { season: monthZhi + "月", desc: "" }
  const yongStr = yongShen.join("、")
  const xiStr = xiShen.join("、")

  const yuanWen = [
    `${dayGan}日生于${monthZhi}月（${climate.season}），${climate.desc}。`,
    yongShen.length
      ? `调候之法，首取${yongShen[0]}为用${yongShen.length > 1 ? `，次取${yongShen.slice(1).join("、")}佐之` : ""}${xiShen.length ? `，更得${xiStr}为喜则气象和谐` : ""}。`
      : `此月${dayGan}火候平和，以中和为贵。`,
    `盖${dayGan}属${dayWx}，生于${monthZhi}月，需观全局寒暖燥湿，取${yongStr || "中和"}以归于平衡，方为上格。`,
  ]

  const yiWen = [
    `您的日主为${dayGan}（${dayWx}），出生在${climate.season}（${monthZhi}月）。此时${climate.desc}。`,
    yongShen.length
      ? `根据调候原理，您八字最需要的是【${yongStr}】。其中：${yongShen.map((y) => "　• " + getYongRole(dayGan, y)).join("；")}。`
      : `此月日主气候较为平和，重在五行流通与中和。`,
    xiShen.length
      ? `若命局或大运流年中出现【${xiStr}】为喜神相助，则更能调和气候、提升格局层次。`
      : `命局以${yongStr || "中和"}得用为佳。`,
    `判断用神是否有力，要看上述干支是否在四柱中透出（天干可见）或藏于地支之中——透出者力显，藏者力含。`,
  ]

  return {
    title: `论${dayGan}生${monthZhi}月`,
    yuanWen,
    yiWen,
  }
}

// 判断某用神在命局中是透（天干）、藏（地支藏干）还是无
export function getYongShenStatus(
  yongShen: string[],
  ganList: string[],
  cangGanList: string[],
): { gan: string; status: "透" | "藏" | "无" }[] {
  return yongShen.map((y) => {
    if (ganList.includes(y)) return { gan: y, status: "透" as const }
    if (cangGanList.includes(y)) return { gan: y, status: "藏" as const }
    return { gan: y, status: "无" as const }
  })
}
