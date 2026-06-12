"use client"

import { useState } from "react"
import { Mountain, Hash, Shuffle, BookOpen } from "lucide-react"
import { HUANG_JI_JING_SHI, YUAN_HUI_YUN_SHI, WAN_WU_GUAN_WU, XIAN_TIAN_BAGUA, getHuangJiNumber, getRandomHuangJi } from "@/lib/huangji-data"

export default function HuangJiPage() {
  const [mode, setMode] = useState<"random" | "number" | "structure" | "bagua">("random")
  const [inputNumber, setInputNumber] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleRandomDraw = () => {
    setIsCalculating(true)
    setTimeout(() => {
      const resultData = getRandomHuangJi()
      setResult(resultData)
      setIsCalculating(false)
    }, 1000)
  }

  const handleNumberDraw = () => {
    const num = parseInt(inputNumber)
    if (num >= 1 && num <= 4) {
      const resultData = getHuangJiNumber(num)
      setResult(resultData)
    } else {
      alert("请输入1-4之间的数字")
    }
  }

  const getSignLevel = (code: number) => {
    if (code === 1) return { level: "元", color: "text-purple-400", bg: "bg-purple-900/40" }
    if (code === 2) return { level: "会", color: "text-blue-400", bg: "bg-blue-900/40" }
    if (code === 3) return { level: "运", color: "text-amber-400", bg: "bg-amber-900/40" }
    return { level: "世", color: "text-green-400", bg: "bg-green-900/40" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-400">皇极经世</h1>
            <p className="text-xs text-amber-200/60">宇宙规律 · 元会运世</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-200/80">
              《皇极经世》是北宋邵雍的代表作，以'元会运世'为框架，
              构建了一个宏大的宇宙历史观，探讨宇宙起源与演化规律。
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode("random")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "random"
                  ? "bg-amber-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              随机推演
            </button>
            <button
              onClick={() => setMode("number")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "number"
                  ? "bg-amber-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              指定数文
            </button>
            <button
              onClick={() => setMode("structure")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "structure"
                  ? "bg-amber-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              元会运世
            </button>
            <button
              onClick={() => setMode("bagua")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "bagua"
                  ? "bg-amber-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              先天八卦
            </button>
          </div>

          {mode === "random" && (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-amber-600/30 to-amber-800/50 rounded-full border-2 border-amber-500/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">极</div>
                  <div className="text-xs text-gray-400">随机推演</div>
                </div>
              </div>
              <button
                onClick={handleRandomDraw}
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold text-lg hover:from-amber-500 hover:to-amber-600 transition-all disabled:opacity-50"
              >
                {isCalculating ? "推演中..." : "开始推演"}
              </button>
            </div>
          )}

          {mode === "number" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">输入数文编号</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="number"
                    min="1"
                    max="4"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    placeholder="输入数字"
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <button
                onClick={handleNumberDraw}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-500 hover:to-amber-600 transition-all"
              >
                查询数文
              </button>
              <div className="text-xs text-gray-500 text-center">
                数文范围：1-4
              </div>
            </div>
          )}

          {mode === "structure" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-bold text-amber-400 mb-2">元会运世结构</div>
                <p className="text-xs text-gray-400">{HUANG_JI_JING_SHI.description}</p>
              </div>

              <div className="space-y-3">
                {HUANG_JI_JING_SHI.structure.map((item, index) => (
                  <div key={index} className="bg-amber-800/30 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-600/50 flex items-center justify-center">
                          <span className="text-sm font-bold text-amber-300">{index + 1}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-amber-300">{item.name}</div>
                          <div className="text-xs text-amber-100/70">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-800/20 rounded-lg p-3">
                <div className="text-xs text-amber-300 font-medium mb-2">时间换算</div>
                <div className="text-xs text-amber-100/70 space-y-1">
                  <p>• 一世 = 30年</p>
                  <p>• 一运 = 12世 = 360年</p>
                  <p>• 一会 = 30运 = 10800年</p>
                  <p>• 一元 = 12会 = 129600年</p>
                </div>
              </div>
            </div>
          )}

          {mode === "bagua" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-bold text-amber-400 mb-2">先天八卦</div>
                <p className="text-xs text-gray-400">邵雍先天八卦排列</p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {XIAN_TIAN_BAGUA.map((item, index) => (
                  <div key={index} className="bg-amber-800/30 rounded-lg p-2 text-center">
                    <div className="text-2xl mb-1">{item.symbol}</div>
                    <div className="text-sm font-medium text-amber-300">{item.name}</div>
                    <div className="text-xs text-amber-100/60">{item.wuxing}</div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-800/20 rounded-lg p-3">
                <div className="text-xs text-amber-300 font-medium mb-2">万物观物</div>
                <div className="grid grid-cols-2 gap-2">
                  {WAN_WU_GUAN_WU.map((item, index) => (
                    <div key={index} className="bg-amber-900/40 rounded-lg p-2">
                      <div className="text-xs font-medium text-amber-300">{item.category}</div>
                      <div className="text-xs text-amber-100/60">{item.items.join("、")}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {mode === "random" || mode === "number" ? (result && (
          <div className={`bg-gradient-to-br ${getSignLevel(result.code).bg} rounded-xl p-5 border border-white/20`}>
            <div className="text-center mb-4">
              <div className={`text-sm ${getSignLevel(result.code).color} mb-1`}>
                {getSignLevel(result.code).level}
              </div>
              <div className="text-2xl font-bold text-white">{result.ti}</div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <div className="text-center">
                <div className="text-lg text-white italic mb-2">「{result.wen}」</div>
              </div>
            </div>

            <div className="text-sm text-white/80 leading-relaxed">
              {result.jie}
            </div>

            <button
              onClick={() => setResult(null)}
              className="mt-4 w-full py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              再推一数
            </button>
          </div>
        )) : null}

        {(mode === "random" || mode === "number") && (
          <div className="mt-4 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
            <h3 className="text-sm font-medium text-purple-400 mb-3">数文速查</h3>
            <div className="grid grid-cols-4 gap-1">
              {YUAN_HUI_YUN_SHI.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setResult(getHuangJiNumber(item.code))
                    setMode("number")
                  }}
                  className={`w-12 h-12 rounded-lg text-xs font-medium flex items-center justify-center transition-colors ${
                    result?.code === item.code
                      ? "bg-purple-600 text-white"
                      : "bg-purple-800/30 text-purple-300 hover:bg-purple-700/30"
                  }`}
                >
                  <div className="text-center">
                    <div>{item.code}</div>
                    <div className="text-xs">{item.ti.slice(-1)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 bg-gradient-to-br from-blue-900/30 to-blue-950/50 rounded-xl p-4 border border-blue-800/30">
          <h3 className="text-sm font-medium text-blue-400 mb-3">皇极经世简介</h3>
          <p className="text-xs text-blue-100/70 leading-relaxed">
            《皇极经世》是北宋著名哲学家、易学家邵雍的代表作。邵雍精研易经，
            创立了一套完整的数理推算体系。《皇极经世》以元会运世为时间框架，
            结合河图洛书和易经八卦，构建了一个宏大的宇宙历史观。它不仅探讨宇宙的起源和演化，
            也包含了对人类历史发展规律的深刻洞察，是中国古代哲学的重要著作。
          </p>
        </div>
      </main>
    </div>
  )
}