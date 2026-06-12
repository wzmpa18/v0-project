"use client"

import { useState } from "react"
import { PenTool, BookOpen, Sparkles } from "lucide-react"
import { calculateCeZi } from "@/lib/cezi-data"

export default function CeziPage() {
  const [inputChar, setInputChar] = useState("")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!inputChar.trim()) {
      setError("请输入一个汉字")
      setResult(null)
      return
    }
    
    const char = inputChar.trim().charAt(0)
    if (!/[\u4e00-\u9fa5]/.test(char)) {
      setError("请输入有效的汉字")
      setResult(null)
      return
    }
    
    setError("")
    const analysis = calculateCeZi(char)
    setResult(analysis)
  }

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "木": "text-emerald-400",
      "火": "text-red-400",
      "土": "text-amber-400",
      "金": "text-gray-300",
      "水": "text-blue-400"
    }
    return colors[wuxing] || "text-gray-300"
  }

  const getLuckColor = (luck: string) => {
    switch (luck) {
      case "吉": return "text-emerald-400 bg-emerald-900/40 border-emerald-700/30"
      case "凶": return "text-red-400 bg-red-900/40 border-red-700/30"
      default: return "text-yellow-400 bg-yellow-900/40 border-yellow-700/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-24">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <PenTool className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-teal-400">测字</h1>
            <p className="text-xs text-teal-200/60">字中玄机 · 一字定乾坤</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-teal-900/40 to-teal-950/60 rounded-xl p-4 border border-teal-800/30 mb-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-teal-200 mb-1">测字原理</h3>
              <p className="text-xs text-teal-200/60 leading-relaxed">
                测字是一种通过分析汉字的结构、笔画、五行属性来预测吉凶祸福的占卜方法。
                每个汉字都蕴含着丰富的信息和能量，通过对字形、字音、字义的解读，
                可以洞察事物的发展趋势和吉凶变化。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">输入汉字</h3>
          <input
            type="text"
            value={inputChar}
            onChange={(e) => setInputChar(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="请输入一个汉字"
            maxLength={1}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-gray-800 placeholder-gray-400 text-center text-4xl font-bold outline-none focus:border-teal-500"
          />
          
          {error && (
            <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl font-bold text-white active:scale-98 transition-transform"
          >
            开始测字
          </button>
        </div>

        {result && (
          <>
            <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30 mb-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-amber-300 mb-2">{result.character}</div>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className={`text-lg font-bold ${result.jiXiong.luck === "吉" ? "text-emerald-400" : result.jiXiong.luck === "凶" ? "text-red-400" : "text-yellow-400"}`}>
                    {result.jiXiong.luck}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30 mb-4">
              <h3 className="text-sm font-bold text-purple-200 mb-3">字理分析</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-800/30 rounded-lg p-3">
                  <div className="text-xs text-purple-200/70 mb-1">五行属性</div>
                  <div className={`text-lg font-bold ${getWuxingColor(result.wuxing)}`}>
                    {result.wuxing}
                  </div>
                </div>
                
                <div className="bg-purple-800/30 rounded-lg p-3">
                  <div className="text-xs text-purple-200/70 mb-1">笔画数</div>
                  <div className="text-lg font-bold text-purple-300">
                    {result.buShu} 画
                  </div>
                </div>
                
                <div className="bg-purple-800/30 rounded-lg p-3 col-span-2">
                  <div className="text-xs text-purple-200/70 mb-1">结构类型</div>
                  <div className="text-sm text-purple-200">{result.structure.type}</div>
                  <div className="text-xs text-purple-300/70 mt-1">{result.structure.desc}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 rounded-xl p-4 border border-blue-800/30 mb-4">
              <h3 className="text-sm font-bold text-blue-200 mb-3">数理断语</h3>
              <div className={`rounded-lg p-3 border ${getLuckColor(result.jiXiong.luck)}`}>
                <div className="text-sm text-center">{result.jiXiong.desc}</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30">
              <h3 className="text-sm font-bold text-rose-200 mb-3">温馨建议</h3>
              <ul className="space-y-2">
                {result.suggestions.map((suggestion: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-rose-100/80">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {!result && (
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-950/60 rounded-xl p-4 border border-gray-800/30">
            <h3 className="text-sm font-bold text-gray-200 mb-3">常见测字示例</h3>
            <div className="grid grid-cols-4 gap-2">
              {["福", "寿", "财", "喜", "吉", "祥", "和", "顺"].map((char) => (
                <button
                  key={char}
                  onClick={() => {
                    setInputChar(char)
                    handleSubmit()
                  }}
                  className="bg-gray-800/30 rounded-lg p-2 text-gray-200 text-center hover:bg-gray-700/40 transition-colors"
                >
                  <div className="text-xl font-bold">{char}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}