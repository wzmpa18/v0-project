"use client"

import { useState } from "react"
import { Shield, Shuffle, Hash, BookOpen, ChevronRight } from "lucide-react"
import { ZHUGE_QIAN_WEN, getZhuGeQian, getRandomQian, calculateQianByInput } from "@/lib/zhuge-data"

export default function ZhuGePage() {
  const [mode, setMode] = useState<"random" | "number" | "input">("random")
  const [inputNumber, setInputNumber] = useState("")
  const [inputText, setInputText] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isShaking, setIsShaking] = useState(false)

  const handleRandomDraw = () => {
    setIsShaking(true)
    setTimeout(() => {
      const qian = getRandomQian()
      setResult(qian)
      setIsShaking(false)
    }, 1500)
  }

  const handleNumberDraw = () => {
    const num = parseInt(inputNumber)
    if (num >= 1 && num <= 50) {
      const qian = getZhuGeQian(num)
      setResult(qian)
    } else {
      alert("请输入1-50之间的数字")
    }
  }

  const handleInputDraw = () => {
    if (inputText.trim()) {
      const num = calculateQianByInput(inputText)
      const qian = getZhuGeQian(num)
      setResult(qian)
    } else {
      alert("请输入您想询问的问题")
    }
  }

  const getSignLevel = (qian: number) => {
    if (qian <= 5) return { level: "上上签", color: "text-green-400", bg: "bg-green-900/40" }
    if (qian <= 15) return { level: "上签", color: "text-blue-400", bg: "bg-blue-900/40" }
    if (qian <= 30) return { level: "中签", color: "text-amber-400", bg: "bg-amber-900/40" }
    if (qian <= 45) return { level: "下签", color: "text-orange-400", bg: "bg-orange-900/40" }
    return { level: "下下签", color: "text-red-400", bg: "bg-red-900/40" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-red-400">诸葛神数</h1>
            <p className="text-xs text-red-200/60">武侯灵感 · 50签</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-4 border border-red-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-200/80">
              诸葛神数又称武侯灵感神数，传为诸葛亮所创，共50签，
              用于占卜吉凶、指点迷津。诚心默念问题，求得灵签。
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode("random")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "random"
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              随机抽签
            </button>
            <button
              onClick={() => setMode("number")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "number"
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              指定签数
            </button>
            <button
              onClick={() => setMode("input")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "input"
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              问事抽签
            </button>
          </div>

          {mode === "random" && (
            <div className="text-center">
              <div className={`relative w-40 h-40 mx-auto mb-4 ${isShaking ? "animate-bounce" : ""}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-red-800/50 rounded-full border-2 border-red-500/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-2">签</div>
                    <div className="text-sm text-gray-400">点击抽签</div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleRandomDraw}
                disabled={isShaking}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg hover:from-red-500 hover:to-red-600 transition-all disabled:opacity-50"
              >
                {isShaking ? "摇签中..." : "开始抽签"}
              </button>
            </div>
          )}

          {mode === "number" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">输入签数</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    placeholder="输入数字"
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none focus:border-red-500"
                  />
                </div>
              </div>
              <button
                onClick={handleNumberDraw}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-500 hover:to-red-600 transition-all"
              >
                查询签文
              </button>
              <div className="text-xs text-gray-500 text-center">
                签数范围：1-50
              </div>
            </div>
          )}

          {mode === "input" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">心中默念您想询问的问题</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="例如：事业发展、感情婚姻、健康状况..."
                  rows={3}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-red-500 resize-none"
                />
              </div>
              <button
                onClick={handleInputDraw}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-500 hover:to-red-600 transition-all"
              >
                求得灵签
              </button>
            </div>
          )}
        </div>

        {result && (
          <div className={`bg-gradient-to-br ${getSignLevel(result.qian).bg} rounded-xl p-5 border border-white/20`}>
            <div className="text-center mb-4">
              <div className={`text-sm ${getSignLevel(result.qian).color} mb-1`}>
                {getSignLevel(result.qian).level}
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
              再求一签
            </button>
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <h3 className="text-sm font-medium text-amber-400 mb-3">签数速查</h3>
          <div className="grid grid-cols-10 gap-1">
            {ZHUGE_QIAN_WEN.map((item) => (
              <button
                key={item.qian}
                onClick={() => {
                  setResult(getZhuGeQian(item.qian))
                  setMode("number")
                }}
                className={`w-7 h-7 rounded-lg text-xs font-medium flex items-center justify-center transition-colors ${
                  result?.qian === item.qian
                    ? "bg-amber-600 text-white"
                    : "bg-amber-800/30 text-amber-300 hover:bg-amber-700/30"
                }`}
              >
                {item.qian}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
          <h3 className="text-sm font-medium text-purple-400 mb-3">诸葛神数简介</h3>
          <p className="text-xs text-purple-100/70 leading-relaxed">
            诸葛神数相传为三国时期诸葛亮所创，共50签。诸葛亮上知天文、下知地理，
            精通奇门遁甲之术。此神数灵验异常，流传至今。求签时需心诚意正，默念所问之事，
            求得之签文即为神明指引。签文多取自经典诗词名言，寓意深远，需细细品味。
          </p>
        </div>
      </main>
    </div>
  )
}