"use client"

import { createContext, useContext, useState, ReactNode } from "react"

// 排盘结果类型
export interface PaipanResult {
  type: string // bazi, ziwei, qimen, liuyao 等
  timestamp: number
  data: any
  duanyu?: string[]
}

// 上下文类型
interface PaipanContextType {
  lastResult: PaipanResult | null
  setLastResult: (result: PaipanResult | null) => void
  clearResult: () => void
}

// 创建上下文
const PaipanContext = createContext<PaipanContextType | null>(null)

// Provider组件
export function PaipanProvider({ children }: { children: ReactNode }) {
  const [lastResult, setLastResult] = useState<PaipanResult | null>(null)

  const clearResult = () => setLastResult(null)

  return (
    <PaipanContext.Provider value={{ lastResult, setLastResult, clearResult }}>
      {children}
    </PaipanContext.Provider>
  )
}

// Hook
export function usePaipanContext() {
  const context = useContext(PaipanContext)
  if (!context) {
    throw new Error("usePaipanContext must be used within PaipanProvider")
  }
  return context
}

// 格式化排盘结果为AI可理解的文本
export function formatPaipanForAI(result: PaipanResult): string {
  if (!result) return ""
  
  switch (result.type) {
    case "bazi": {
      const b = result.data
      const pillar = (p: any) => `${p?.gan ?? ""}${p?.zhi ?? ""}`
      const ss = b.shenSha || {}
      const naYin = b.naYin || {}
      const dayunStr = (b.daYun || [])
        .slice(0, 8)
        .map((d: any) => `${d.startAge}岁起 ${d.ganZhi}`)
        .join("、")
      return `以下是用户真实排出的八字命盘数据（已用专业算法计算，请严格依据这些数据分析，不得编造数据）：

【四柱】
年柱：${pillar(b.year)}（${b.shiShen?.year ?? ""}，纳音${naYin.year ?? ""}）
月柱：${pillar(b.month)}（${b.shiShen?.month ?? ""}，纳音${naYin.month ?? ""}）
日柱：${pillar(b.day)}（日主，纳音${naYin.day ?? ""}）
时柱：${pillar(b.hour)}（${b.shiShen?.hour ?? ""}，纳音${naYin.hour ?? ""}）
性别：${b.gender === "male" ? "男（乾造）" : "女（坤造）"}

【日主与调候】
日主：${b.day?.gan ?? ""}
调候用神：${(b.tiaoHou?.yongShen || []).join("、") || "无"}${b.tiaoHou?.xiShen?.length ? `，喜神：${b.tiaoHou.xiShen.join("、")}` : ""}

【藏干十神】
年：${(b.cangGanShiShen?.year || []).join("、")} ｜ 月：${(b.cangGanShiShen?.month || []).join("、")} ｜ 日：${(b.cangGanShiShen?.day || []).join("、")} ｜ 时：${(b.cangGanShiShen?.hour || []).join("、")}

【四柱神煞】
年柱：${(ss.year || []).join("、") || "无"}
月柱：${(ss.month || []).join("、") || "无"}
日柱：${(ss.day || []).join("、") || "无"}
时柱：${(ss.hour || []).join("、") || "无"}

【大运】${dayunStr || "无"}

【原局干支关系】天干：${(b.ganZhiRelation?.tianGan || []).join("、") || "无"}；地支：${(b.ganZhiRelation?.diZhi || []).join("、") || "无"}
${result.duanyu?.length ? `\n【已生成断语】\n${result.duanyu.join("\n")}` : ""}`
    }

    case "ziwei":
      return `用户刚完成紫微斗数排盘，请根据紫微斗数的原理进行解读。`

    case "qimen":
      return `用户刚完成奇门遁甲排盘，请根据奇门遁甲的原理进行解读。`

    case "liuyao":
      return `用户刚完成六爻排盘，请根据六爻的原理进行解读。`

    case "liuren":
      return `用户刚完成大六壬排盘，请根据大六壬的原理进行解读。`

    default:
      return `用户刚完成${result.type}排盘，请帮助解读。`
  }
}
