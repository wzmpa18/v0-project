"use client"

import { useState } from "react"
import { Ruler, Grid3X3, Info } from "lucide-react"

const PALACES = ["坎", "坤", "震", "巽", "中", "乾", "兑", "艮", "离"]
const PALACE_SYMBOLS = ["☵", "☷", "☳", "☴", "○", "☰", "☱", "☶", "☲"]

const DIRECTIONS = ["北", "西南", "东", "东南", "中", "西北", "西", "东北", "南"]

export default function LiJiChiPage() {
  const [facing, setFacing] = useState("")
  const [sitting, setSitting] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateLiJiChi = () => {
    if (!facing || !sitting) {
      alert("请选择坐向")
      return
    }

    const facingIndex = DIRECTIONS.indexOf(facing)
    const sittingIndex = DIRECTIONS.indexOf(sitting)

    const facingPalace = PALACES[facingIndex]
    const sittingPalace = PALACES[sittingIndex]

    const analysis = generateAnalysis(facing, sitting, facingPalace, sittingPalace)

    setResult({
      facing,
      sitting,
      facingPalace,
      sittingPalace,
      facingSymbol: PALACE_SYMBOLS[facingIndex],
      sittingSymbol: PALACE_SYMBOLS[sittingIndex],
      analysis,
    })
  }

  const generateAnalysis = (facing: string, sitting: string, facingPalace: string, sittingPalace: string) => {
    const analysis: string[] = []

    analysis.push(`坐山：${sitting}(${sittingPalace})`)
    analysis.push(`朝向：${facing}(${facingPalace})`)

    const goodDirections = [
      ["南", "北"], ["北", "南"], ["东", "西"], ["西", "东"],
      ["东南", "西北"], ["西北", "东南"], ["东北", "西南"], ["西南", "东北"]
    ]

    if (goodDirections.some(d => d[0] === facing && d[1] === sitting)) {
      analysis.push("此坐向为吉，符合风水正局")
    } else if (facing === sitting) {
      analysis.push("坐向相同，为凶，需调整")
    } else {
      analysis.push("此坐向为平，需结合其他因素综合判断")
    }

    return analysis
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <Ruler className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-emerald-400">立极尺</h1>
            <p className="text-xs text-emerald-200/60">风水测量 · 立极定向</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 rounded-xl p-4 border border-emerald-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-emerald-200/80 mb-2 block">坐山</label>
              <div className="grid grid-cols-3 gap-2">
                {DIRECTIONS.map((dir, idx) => (
                  <button
                    key={dir}
                    onClick={() => setSitting(dir)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      sitting === dir ? "bg-emerald-800/50 border border-emerald-600/30" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-lg">{PALACE_SYMBOLS[idx]}</div>
                    <div className="text-xs text-gray-400">{dir}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-emerald-200/80 mb-2 block">朝向</label>
              <div className="grid grid-cols-3 gap-2">
                {DIRECTIONS.map((dir, idx) => (
                  <button
                    key={dir}
                    onClick={() => setFacing(dir)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      facing === dir ? "bg-emerald-800/50 border border-emerald-600/30" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-lg">{PALACE_SYMBOLS[idx]}</div>
                    <div className="text-xs text-gray-400">{dir}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateLiJiChi}
              disabled={!facing || !sitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Grid3X3 className="w-4 h-4" />
              立极分析
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 rounded-xl p-4 border border-emerald-800/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">坐山</div>
                  <div className="text-2xl font-bold text-white">{result.sittingSymbol}</div>
                  <div className="text-lg font-bold text-emerald-400">{result.sitting}</div>
                  <div className="text-sm text-gray-500">{result.sittingPalace}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">朝向</div>
                  <div className="text-2xl font-bold text-white">{result.facingSymbol}</div>
                  <div className="text-lg font-bold text-emerald-400">{result.facing}</div>
                  <div className="text-sm text-gray-500">{result.facingPalace}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-medium text-purple-400 mb-3">立极分析</h3>
              <div className="space-y-2">
                {result.analysis.map((text: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span className="text-sm text-purple-100/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">立极尺简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            立极尺是风水测量的重要工具，用于确定住宅或建筑物的坐向。
            通过确定坐山和朝向，可以分析该建筑物的风水格局。
            立极尺通常与罗盘配合使用，是风水师必备的工具之一。
            正确的立极对于判断房屋的吉凶方位具有重要意义。
          </p>
        </div>
      </main>
    </div>
  )
}