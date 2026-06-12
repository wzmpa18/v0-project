"use client"

import { useState } from "react"
import { Map, Compass, Info, MapPin } from "lucide-react"

const DIRECTIONS = ["正北", "东北", "正东", "东南", "正南", "西南", "正西", "西北"]
const DIRECTION_SYMBOLS = ["北", "艮", "东", "巽", "南", "坤", "西", "乾"]

const SHAN_TYPES = [
  { name: "贪狼星", color: "green", description: "主富贵、长寿、人丁兴旺" },
  { name: "巨门星", color: "black", description: "主官非、口舌、疾病" },
  { name: "禄存星", color: "yellow", description: "主财富、积蓄、田产" },
  { name: "文曲星", color: "white", description: "主文采、智慧、科名" },
  { name: "廉贞星", color: "red", description: "主火灾、官非、血光" },
  { name: "武曲星", color: "white", description: "主武贵、权威、事业" },
  { name: "破军星", color: "purple", description: "主变动、革新、开创" },
  { name: "左辅星", color: "green", description: "主贵人、辅佐、吉庆" },
]

export default function ShanXiangPage() {
  const [direction, setDirection] = useState("")
  const [mountainType, setMountainType] = useState("")
  const [result, setResult] = useState<any>(null)

  const analyzeShanXiang = () => {
    if (!direction || !mountainType) {
      alert("请选择方向和山形")
      return
    }

    const directionIndex = DIRECTIONS.indexOf(direction)
    const shanIndex = SHAN_TYPES.findIndex(s => s.name === mountainType)

    const analysis = generateAnalysis(direction, mountainType, directionIndex, shanIndex)

    setResult({
      direction,
      mountainType,
      symbol: DIRECTION_SYMBOLS[directionIndex],
      analysis,
    })
  }

  const generateAnalysis = (direction: string, mountain: string, dirIndex: number, shanIndex: number) => {
    const analysis: string[] = []

    analysis.push(`坐山朝向：${direction}`)
    analysis.push(`山形类型：${mountain}`)
    
    const shan = SHAN_TYPES[shanIndex]
    analysis.push(`${shan.description}`)

    if (["贪狼星", "禄存星", "文曲星", "武曲星", "左辅星"].includes(mountain)) {
      analysis.push("此山形为吉，主吉祥如意，百事顺遂")
    } else {
      analysis.push("此山形为凶，需注意化解，以免招灾")
    }

    return analysis
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
            <Map className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-green-400">山向地图</h1>
            <p className="text-xs text-green-200/60">风水定位 · 山向分析</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-4 border border-green-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-green-200/80 mb-2 block">选择方向</label>
              <div className="grid grid-cols-4 gap-2">
                {DIRECTIONS.map((dir, idx) => (
                  <button
                    key={dir}
                    onClick={() => setDirection(dir)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      direction === dir ? "bg-green-800/50 border border-green-600/30" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-lg">{DIRECTION_SYMBOLS[idx]}</div>
                    <div className="text-xs text-gray-400">{dir}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-green-200/80 mb-2 block">山形类型</label>
              <div className="grid grid-cols-2 gap-2">
                {SHAN_TYPES.map((shan) => (
                  <button
                    key={shan.name}
                    onClick={() => setMountainType(shan.name)}
                    className={`p-2 rounded-lg text-left transition-all ${
                      mountainType === shan.name ? "bg-green-800/50 border border-green-600/30" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${shan.color}-500`}></div>
                      <span className="text-sm">{shan.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={analyzeShanXiang}
              disabled={!direction || !mountainType}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MapPin className="w-4 h-4" />
              分析山向
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-4 border border-green-800/30">
              <div className="text-center">
                <div className="text-4xl mb-2">{result.symbol}</div>
                <div className="text-xl font-bold text-white">{result.direction}</div>
                <div className="text-sm text-green-300 mt-1">{result.mountainType}</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-medium text-purple-400 mb-3">山向分析</h3>
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
            <span className="text-sm font-medium text-amber-400">山向风水简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            山向风水是风水学的重要组成部分，通过分析山脉的朝向和形态来判断吉凶。
            八宅风水将八个方向对应八种山形，每种山形都有其特定的吉凶含义。
            选择合适的山向对于住宅、墓地的选址具有重要意义，能够影响居住者的运势和健康。
          </p>
        </div>
      </main>
    </div>
  )
}