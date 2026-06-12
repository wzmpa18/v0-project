"use client"

import { useState } from "react"
import { Brain, Hash, Shuffle, BookOpen } from "lucide-react"
import { SHAOZI_SHEN_SHU, getShaoZiNumber, getRandomShaoZi, SHAOZI_WEN } from "@/lib/shaozi-data"

export default function ShaoZiPage() {
  const [mode, setMode] = useState<"random" | "number">("random")
  const [inputNumber, setInputNumber] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleRandomDraw = () => {
    setIsCalculating(true)
    setTimeout(() => {
      const resultData = getRandomShaoZi()
      setResult(resultData)
      setIsCalculating(false)
    }, 1000)
  }

  const handleNumberDraw = () => {
    const num = parseInt(inputNumber)
    if (num >= 1 && num <= 10) {
      const resultData = getShaoZiNumber(num)
      setResult(resultData)
    } else {
      alert("请输入1-10之间的数字")
    }
  }

  const getSignLevel = (code: number) => {
    if (code <= 3) return { level: "大吉", color: "text-green-400", bg: "bg-green-900/40" }
    if (code <= 7) return { level: "吉", color: "text-blue-400", bg: "bg-blue-900/40" }
    if (code <= 9) return { level: "中吉", color: "text-amber-400", bg: "bg-amber-900/40" }
    return { level: "上上吉", color: "text-purple-400", bg: "bg-purple-900/40" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-lime-700 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-lime-400">邵子神数</h1>
            <p className="text-xs text-lime-200/60">邵雍真传 · 皇极神数</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-lime-900/40 to-lime-950/60 rounded-xl p-4 border border-lime-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-lime-400" />
            <span className="text-sm text-lime-200/80">
              邵子神数又称皇极神数，是北宋邵雍所创的高层次预测学。
              它以《皇极经世》为理论基础，结合易经数理，推算人的命运和世事变迁。
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode("random")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "random"
                  ? "bg-lime-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              随机推算
            </button>
            <button
              onClick={() => setMode("number")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "number"
                  ? "bg-lime-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              指定数文
            </button>
          </div>

          {mode === "random" && (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-lime-600/30 to-lime-800/50 rounded-full border-2 border-lime-500/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">数</div>
                  <div className="text-xs text-gray-400">随机推算</div>
                </div>
              </div>
              <button
                onClick={handleRandomDraw}
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-lime-600 to-lime-700 text-white rounded-xl font-bold text-lg hover:from-lime-500 hover:to-lime-600 transition-all disabled:opacity-50"
              >
                {isCalculating ? "推算中..." : "开始推算"}
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
                    max="10"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    placeholder="输入数字"
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none focus:border-lime-500"
                  />
                </div>
              </div>
              <button
                onClick={handleNumberDraw}
                className="w-full py-3 bg-gradient-to-r from-lime-600 to-lime-700 text-white rounded-xl font-bold hover:from-lime-500 hover:to-lime-600 transition-all"
              >
                查询数文
              </button>
              <div className="text-xs text-gray-500 text-center">
                数文范围：1-10
              </div>
            </div>
          )}
        </div>

        {result && (
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
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <h3 className="text-sm font-medium text-amber-400 mb-3">数文速查</h3>
          <div className="grid grid-cols-10 gap-1">
            {SHAOZI_SHEN_SHU.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  setResult(getShaoZiNumber(item.code))
                  setMode("number")
                }}
                className={`w-7 h-7 rounded-lg text-xs font-medium flex items-center justify-center transition-colors ${
                  result?.code === item.code
                    ? "bg-amber-600 text-white"
                    : "bg-amber-800/30 text-amber-300 hover:bg-amber-700/30"
                }`}
              >
                {item.code}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
          <h3 className="text-sm font-medium text-purple-400 mb-3">邵子神数简介</h3>
          <p className="text-xs text-purple-100/70 leading-relaxed">
            邵子神数又称皇极神数，是北宋著名哲学家、易学家邵雍所创。
            邵雍精研易经，著有《皇极经世》一书，创立了一套完整的数理推算体系。
            邵子神数以元会运世为时间框架，结合河图洛书和易经八卦，
            能够推算宇宙万物的变化规律和人生的命运轨迹。其特点是理论高深，
            推算严密，是中国古代预测学的巅峰之作。
          </p>
        </div>

        <div className="mt-3 bg-gradient-to-br from-blue-900/30 to-blue-950/50 rounded-xl p-4 border border-blue-800/30">
          <h3 className="text-sm font-medium text-blue-400 mb-3">核心原理</h3>
          <div className="grid grid-cols-2 gap-2">
            {SHAOZI_WEN.principles.map((item, index) => (
              <div key={index} className="bg-blue-800/30 rounded-lg p-2">
                <div className="text-xs font-medium text-blue-300">{item.name}</div>
                <div className="text-xs text-blue-100/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}