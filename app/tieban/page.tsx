"use client"

import { useState } from "react"
import { Target, Hash, Shuffle, BookOpen } from "lucide-react"
import { TIEBAN_SHEN_SHU, getTieBanNumber, calculateTieBanCode, getRandomTieBan } from "@/lib/tieban-data"

export default function TieBanPage() {
  const [mode, setMode] = useState<"random" | "number" | "bazi">("random")
  const [inputNumber, setInputNumber] = useState("")
  const [baziInput, setBaziInput] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleRandomDraw = () => {
    setIsCalculating(true)
    setTimeout(() => {
      const resultData = getRandomTieBan()
      setResult(resultData)
      setIsCalculating(false)
    }, 1000)
  }

  const handleNumberDraw = () => {
    const num = parseInt(inputNumber)
    if (num >= 1 && num <= 20) {
      const resultData = getTieBanNumber(num)
      setResult(resultData)
    } else {
      alert("请输入1-20之间的数字")
    }
  }

  const handleBaziDraw = () => {
    const bazi = baziInput.trim()
    if (bazi.length >= 8) {
      const code = calculateTieBanCode(bazi)
      const resultData = getTieBanNumber(code)
      setResult(resultData)
    } else {
      alert("请输入完整的八字（如：甲子 乙丑 丙寅 丁卯）")
    }
  }

  const getSignLevel = (code: number) => {
    if (code <= 5) return { level: "大吉", color: "text-green-400", bg: "bg-green-900/40" }
    if (code <= 12) return { level: "吉", color: "text-blue-400", bg: "bg-blue-900/40" }
    if (code <= 18) return { level: "中吉", color: "text-amber-400", bg: "bg-amber-900/40" }
    return { level: "小吉", color: "text-gray-400", bg: "bg-gray-800/40" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-rose-400">铁板神数</h1>
            <p className="text-xs text-rose-200/60">宿命通 · 数理推算</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span className="text-sm text-rose-200/80">
              铁板神数相传为北宋邵雍所创，以《皇极经世》为理论基础，
              结合易经数理，通过复杂的计算方法推算人的命运轨迹，被誉为"宿命通"。
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode("random")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "random"
                  ? "bg-rose-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              随机推算
            </button>
            <button
              onClick={() => setMode("number")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "number"
                  ? "bg-rose-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              指定数文
            </button>
            <button
              onClick={() => setMode("bazi")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "bazi"
                  ? "bg-rose-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              八字推算
            </button>
          </div>

          {mode === "random" && (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-rose-600/30 to-rose-800/50 rounded-full border-2 border-rose-500/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">数</div>
                  <div className="text-xs text-gray-400">随机推算</div>
                </div>
              </div>
              <button
                onClick={handleRandomDraw}
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-xl font-bold text-lg hover:from-rose-500 hover:to-rose-600 transition-all disabled:opacity-50"
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
                    max="20"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    placeholder="输入数字"
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none focus:border-rose-500"
                  />
                </div>
              </div>
              <button
                onClick={handleNumberDraw}
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-xl font-bold hover:from-rose-500 hover:to-rose-600 transition-all"
              >
                查询数文
              </button>
              <div className="text-xs text-gray-500 text-center">
                数文范围：1-20
              </div>
            </div>
          )}

          {mode === "bazi" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">输入八字</label>
                <input
                  type="text"
                  value={baziInput}
                  onChange={(e) => setBaziInput(e.target.value)}
                  placeholder="例如：甲子 乙丑 丙寅 丁卯"
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-rose-500"
                />
              </div>
              <button
                onClick={handleBaziDraw}
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-xl font-bold hover:from-rose-500 hover:to-rose-600 transition-all"
              >
                八字推算
              </button>
              <div className="text-xs text-gray-500 text-center">
                请输入完整八字，格式如：甲子 乙丑 丙寅 丁卯
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
            {TIEBAN_SHEN_SHU.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  setResult(getTieBanNumber(item.code))
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
          <h3 className="text-sm font-medium text-purple-400 mb-3">铁板神数简介</h3>
          <p className="text-xs text-purple-100/70 leading-relaxed">
            铁板神数是中国古代最高层次的预测学之一，相传为北宋邵雍所创。
            它以《皇极经世》为理论基础，结合易经数理和河洛之学，
            通过复杂的计算方法推算人的命运轨迹。铁板神数以其精准著称，
            能推算出人的一生吉凶祸福、富贵贫贱，被誉为"宿命通"。
            其特点是计算严密，结果精准，非精通易学者难以掌握。
          </p>
        </div>
      </main>
    </div>
  )
}