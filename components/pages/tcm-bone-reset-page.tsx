"use client"

import { useState } from "react"
import { ChevronLeft, RotateCcw, Bone, MoveHorizontal } from "lucide-react"

interface TCMBoneResetPageProps {
  onBack: () => void
}

type Joint = "cervical" | "lumbar"

export function TCMBoneResetPage({ onBack }: TCMBoneResetPageProps) {
  const [joint, setJoint] = useState<Joint>("cervical")
  const [offset, setOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  function dislocate() {
    const delta = joint === "cervical" ? 26 : 36
    setOffset((prev) => Math.min(prev + delta, 70))
  }

  function resetWithTween() {
    setIsAnimating(true)
    const duration = 600
    const start = performance.now()
    const from = offset

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setOffset(Math.round(from * (1 - ease)))
      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(tick)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#111827] text-[#e5e7eb] pb-24">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f2937]">
        <button onClick={onBack} className="flex items-center gap-1 text-[#d4af37]">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <h1 className="text-sm font-semibold">正骨模拟</h1>
        <div className="w-16" />
      </div>

      <div className="p-4 space-y-3">
        <div className="rounded-xl border border-[#374151] bg-[#0b1220] p-3">
          <div className="text-xs text-[#9ca3af] mb-2">关节选择</div>
          <div className="flex gap-2">
            <button onClick={() => setJoint("cervical")} className={`px-3 py-1.5 rounded text-xs border ${joint === "cervical" ? "bg-[#312e81]/40 border-[#818cf8]" : "border-[#374151]"}`}>
              颈椎
            </button>
            <button onClick={() => setJoint("lumbar")} className={`px-3 py-1.5 rounded text-xs border ${joint === "lumbar" ? "bg-[#14532d]/40 border-[#4ade80]" : "border-[#374151]"}`}>
              腰椎
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-[#374151] bg-[#0b1220] p-4">
          <div className="flex items-center gap-2 mb-3 text-sm"><Bone className="w-4 h-4" /> 骨骼偏移示意</div>
          <div className="h-36 relative rounded-lg bg-[#1f2937] overflow-hidden border border-[#374151]">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#9ca3af]">中轴</div>
            <div
              className="absolute top-1/2 -translate-y-1/2 h-5 w-24 rounded bg-gradient-to-r from-[#22d3ee] to-[#6366f1]"
              style={{ transform: `translate(${offset}px, -50%)` }}
            />
          </div>
          <div className="text-xs text-[#9ca3af] mt-2">当前偏移：{offset}px</div>
          <div className="text-xs text-[#9ca3af]">状态：{isAnimating ? "复位中" : offset > 0 ? "错位" : "正常"}</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={dislocate} className="py-2.5 rounded bg-[#7c2d12] text-white text-sm font-medium flex items-center justify-center gap-2">
            <MoveHorizontal className="w-4 h-4" /> 一键错位
          </button>
          <button onClick={resetWithTween} className="py-2.5 rounded bg-[#1d4ed8] text-white text-sm font-medium flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> 平滑复位
          </button>
        </div>
      </div>
    </div>
  )
}
