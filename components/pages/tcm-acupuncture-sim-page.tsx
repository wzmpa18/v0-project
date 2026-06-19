"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, Syringe, Layers, ShieldAlert } from "lucide-react"

interface TCMAcupunctureSimPageProps {
  onBack: () => void
}

type Protocol = "classic" | "dong" | "nihaixia"

const PROTOCOLS: Array<{ id: Protocol; label: string }> = [
  { id: "classic", label: "针灸大成" },
  { id: "dong", label: "董氏奇穴" },
  { id: "nihaixia", label: "倪海厦方案" },
]

const PROTOCOL_DATA: Record<Protocol, Array<{ name: string; location: string; depthMm: number; retainMin: number; pair: string[] }>> = {
  classic: [
    { name: "足三里", location: "犊鼻下3寸，胫骨前嵴外一横指", depthMm: 28, retainMin: 25, pair: ["合谷", "三阴交"] },
    { name: "关元", location: "脐中下3寸", depthMm: 22, retainMin: 30, pair: ["气海", "足三里"] },
  ],
  dong: [
    { name: "灵骨", location: "手背第一掌骨与第二掌骨间", depthMm: 10, retainMin: 20, pair: ["大白", "三重"] },
    { name: "大白", location: "手背虎口后凹陷", depthMm: 12, retainMin: 20, pair: ["灵骨", "侧三里"] },
  ],
  nihaixia: [
    { name: "天皇", location: "大腿内侧中段", depthMm: 18, retainMin: 20, pair: ["地皇", "人皇"] },
    { name: "地皇", location: "胫骨内侧缘", depthMm: 16, retainMin: 20, pair: ["天皇", "人皇"] },
  ],
}

export function TCMAcupunctureSimPage({ onBack }: TCMAcupunctureSimPageProps) {
  const [protocol, setProtocol] = useState<Protocol>("classic")
  const [selected, setSelected] = useState(0)
  const [needleDepth, setNeedleDepth] = useState(0)

  const points = useMemo(() => PROTOCOL_DATA[protocol], [protocol])
  const current = points[selected] || points[0]

  function runNeedleAnimation() {
    setNeedleDepth(0)
    const target = current.depthMm
    let frame = 0
    const total = 30
    const timer = window.setInterval(() => {
      frame += 1
      const progress = Math.min(frame / total, 1)
      setNeedleDepth(Math.round(progress * target))
      if (progress >= 1) {
        window.clearInterval(timer)
      }
    }, 16)
  }

  const layerHint = needleDepth < 6 ? "皮肤层" : needleDepth < 18 ? "肌肉层" : "深层，注意避开血管"

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0f172a] text-[#e2e8f0] pb-24">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f2a44]">
        <button onClick={onBack} className="flex items-center gap-1 text-[#d4af37]">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <h1 className="text-sm font-semibold">虚拟针灸模拟</h1>
        <div className="w-16" />
      </div>

      <div className="p-4 space-y-3">
        <div className="rounded-xl border border-[#24324f] bg-[#111827] p-3">
          <div className="text-xs text-[#94a3b8] mb-2">取穴方案</div>
          <div className="flex gap-2">
            {PROTOCOLS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setProtocol(item.id)
                  setSelected(0)
                  setNeedleDepth(0)
                }}
                className={`px-3 py-1.5 rounded text-xs border ${protocol === item.id ? "bg-[#0369a1]/35 border-[#0ea5e9]" : "border-[#334155]"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#24324f] bg-[#111827] p-3">
          <div className="text-xs text-[#94a3b8] mb-2">穴位列表</div>
          <div className="flex flex-wrap gap-2">
            {points.map((p, idx) => (
              <button
                key={p.name}
                onClick={() => {
                  setSelected(idx)
                  setNeedleDepth(0)
                }}
                className={`px-2 py-1 rounded text-xs border ${selected === idx ? "bg-[#4c1d95]/45 border-[#a78bfa]" : "border-[#334155]"}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#24324f] bg-[#0b1220] p-4">
          <div className="text-sm font-medium text-[#f8fafc] mb-1">{current.name}</div>
          <div className="text-xs text-[#94a3b8] mb-1">取穴：{current.location}</div>
          <div className="text-xs text-[#94a3b8] mb-1">进针深度：{current.depthMm}mm</div>
          <div className="text-xs text-[#94a3b8] mb-1">留针时长：{current.retainMin}分钟</div>
          <div className="text-xs text-[#94a3b8] mb-3">配伍：{current.pair.join("、")}</div>

          <div className="rounded-lg border border-[#334155] bg-[#111827] p-3 mb-3">
            <div className="flex items-center gap-2 text-xs text-[#cbd5e1] mb-2">
              <Syringe className="w-4 h-4" />
              3D刺入动画（示意）
            </div>
            <div className="h-3 bg-[#1f2937] rounded overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#22d3ee] to-[#38bdf8]" style={{ width: `${Math.min((needleDepth / Math.max(current.depthMm, 1)) * 100, 100)}%` }} />
            </div>
            <div className="text-xs text-[#94a3b8] mt-2">当前刺入：{needleDepth}mm</div>
          </div>

          <div className="rounded-lg border border-[#334155] bg-[#111827] p-3 mb-3 text-xs text-[#cbd5e1]">
            <div className="flex items-center gap-2 mb-1"><Layers className="w-4 h-4" /> 层级检测</div>
            <div>{layerHint}</div>
          </div>

          <div className="rounded-lg border border-[#7f1d1d] bg-[#450a0a]/30 p-3 mb-3 text-xs text-[#fecaca] flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 mt-0.5" />
            <div>检测到血管敏感区时会弹窗预警（当前为示意实现，后续接入真实碰撞体）。</div>
          </div>

          <button onClick={runNeedleAnimation} className="w-full py-2.5 rounded bg-gradient-to-r from-[#0ea5e9] to-[#2563eb] text-white text-sm font-medium">
            开始刺入模拟
          </button>
        </div>
      </div>
    </div>
  )
}
