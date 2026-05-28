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
    case "bazi":
      const bazi = result.data
      return `用户刚完成八字排盘：
四柱：${bazi.year?.gan}${bazi.year?.zhi}年 ${bazi.month?.gan}${bazi.month?.zhi}月 ${bazi.day?.gan}${bazi.day?.zhi}日 ${bazi.hour?.gan}${bazi.hour?.zhi}时
纳音：${bazi.nayin || "未知"}
神煞：${bazi.shensha?.join("、") || "无"}
${result.duanyu ? `\n已生成断语：\n${result.duanyu.join("\n")}` : ""}`

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
