"use client"

import { useState } from "react"
import { Waves, Hash, Shuffle, BookOpen } from "lucide-react"
import { HE_TU, LUO_SHU, HE_LUO_SHEN_SHU, getHeLuoNumber, getRandomHeLuo } from "@/lib/heluo-data"

export default function HeLuoPage() {
  const [mode, setMode] = useState<"random" | "number" | "hetu" | "luoshu">("random")
  const [inputNumber, setInputNumber] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleRandomDraw = () => {
    setIsCalculating(true)
    setTimeout(() => {
      const resultData = getRandomHeLuo()
      setResult(resultData)
      setIsCalculating(false)
    }, 1000)
  }

  const handleNumberDraw = () => {
    const num = parseInt(inputNumber)
    if (num >= 1 && num <= 5) {
      const resultData = getHeLuoNumber(num)
      setResult(resultData)
    } else {
      alert("请输入1-5之间的数字")
    }
  }

  const getSignLevel = (code: number) => {
    if (code <= 2) return { level: "大吉", color: "text-green-400", bg: "bg-green-900/40" }
    if (code <= 3) return { level: "吉", color: "text-blue-400", bg: "bg-blue-900/40" }
    if (code <= 4) return { level: "中吉", color: "text-amber-400", bg: "bg-amber-900/40" }
    return { level: "上上吉", color: "text-purple-400", bg: "bg-purple-900/40" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-teal-400">河洛理数</h1>
            <p className="text-xs text-teal-200/60">河图洛书 · 天地数理</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-teal-900/40 to-teal-950/60 rounded-xl p-4 border border-teal-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-teal-200/80">
              河洛理数是基于河图洛书的一种数理预测学。河图为体，洛书为用，
              通过数理推算来预测人事吉凶，是中国传统文化的重要组成部分。
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode("random")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "random"
                  ? "bg-teal-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              随机推演
            </button>
            <button
              onClick={() => setMode("number")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "number"
                  ? "bg-teal-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              指定数文
            </button>
            <button
              onClick={() => setMode("hetu")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "hetu"
                  ? "bg-teal-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              河图
            </button>
            <button
              onClick={() => setMode("luoshu")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "luoshu"
                  ? "bg-teal-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              洛书
            </button>
          </div>

          {mode === "random" && (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-teal-600/30 to-teal-800/50 rounded-full border-2 border-teal-500/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">数</div>
                  <div className="text-xs text-gray-400">随机推演</div>
                </div>
              </div>
              <button
                onClick={handleRandomDraw}
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold text-lg hover:from-teal-500 hover:to-teal-600 transition-all disabled:opacity-50"
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
                    max="5"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    placeholder="输入数字"
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none focus:border-teal-500"
                  />
                </div>
              </div>
              <button
                onClick={handleNumberDraw}
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold hover:from-teal-500 hover:to-teal-600 transition-all"
              >
                查询数文
              </button>
              <div className="text-xs text-gray-500 text-center">
                数文范围：1-5
              </div>
            </div>
          )}

          {mode === "hetu" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-bold text-teal-400 mb-2">{HE_TU.name}</div>
                <p className="text-xs text-gray-400">{HE_TU.description}</p>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {HE_TU.numbers.map((item, index) => (
                  <div key={index} className="bg-teal-800/30 rounded-lg p-2 text-center">
                    <div className={`text-lg font-bold ${
                      item.color === "red" ? "text-red-400" :
                      item.color === "black" ? "text-gray-300" :
                      item.color === "green" ? "text-green-400" :
                      item.color === "white" ? "text-white" : "text-amber-400"
                    }`}>
                      {item.number}
                    </div>
                    <div className="text-xs text-teal-200/60">{item.wuxing}</div>
                  </div>
                ))}
              </div>

              <div className="bg-teal-800/20 rounded-lg p-3">
                <div className="text-xs text-teal-300 font-medium mb-2">生成原则</div>
                {HE_TU.principles.map((principle, index) => (
                  <div key={index} className="text-xs text-teal-100/70 mb-1">• {principle}</div>
                ))}
              </div>
            </div>
          )}

          {mode === "luoshu" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-bold text-teal-400 mb-2">{LUO_SHU.name}</div>
                <p className="text-xs text-gray-400">{LUO_SHU.description}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                {LUO_SHU.magicSquare.flat().map((num, index) => {
                  const pos = LUO_SHU.numbers.find(n => n.number === num)
                  return (
                    <div key={index} className={`bg-teal-800/30 rounded-lg p-3 text-center ${num === 5 ? 'ring-2 ring-teal-500/50' : ''}`}>
                      <div className="text-xl font-bold text-white">{num}</div>
                      {pos && (
                        <div className="text-xs text-teal-200/60">{pos.wuxing}{pos.bagua}</div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="bg-teal-800/20 rounded-lg p-3">
                <div className="text-xs text-teal-300 font-medium mb-2">排列原则</div>
                {LUO_SHU.principles.map((principle, index) => (
                  <div key={index} className="text-xs text-teal-100/70 mb-1">• {principle}</div>
                ))}
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
          <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
            <h3 className="text-sm font-medium text-amber-400 mb-3">数文速查</h3>
            <div className="grid grid-cols-5 gap-1">
              {HE_LUO_SHEN_SHU.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setResult(getHeLuoNumber(item.code))
                    setMode("number")
                  }}
                  className={`w-10 h-10 rounded-lg text-xs font-medium flex items-center justify-center transition-colors ${
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
        )}

        <div className="mt-3 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
          <h3 className="text-sm font-medium text-purple-400 mb-3">河洛理数简介</h3>
          <p className="text-xs text-purple-100/70 leading-relaxed">
            河洛理数是中国古代的一种数理预测学，源于河图洛书。河图为体，洛书为用，
            二者共同构成了中国传统文化的数理基础。河图描述了宇宙生成的规律，
            洛书则展示了万物的排列秩序。通过河洛理数，可以推算人事吉凶，
            洞察宇宙奥秘。
          </p>
        </div>
      </main>
    </div>
  )
}