"use client"

import { useState } from "react"
import { Cloud, Search, BookOpen, Sparkles } from "lucide-react"
import { JIE_MENG_DATA, DREAM_CATEGORIES, searchDream } from "@/lib/jiemeng-data"

export default function JiemengPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDream, setSelectedDream] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError("请输入梦境关键词")
      setResult(null)
      return
    }
    
    const dream = searchDream(searchQuery.trim())
    if (dream) {
      setResult(dream)
      setError("")
    } else {
      setError("暂未收录该梦境解析，请尝试其他关键词")
      setResult(null)
    }
  }

  const handleSelectDream = (dream: string) => {
    setSelectedDream(dream)
    setSearchQuery(dream)
    const result = searchDream(dream)
    if (result) {
      setResult(result)
      setError("")
    }
  }

  const getMeaningColor = (meaning: string) => {
    switch (meaning) {
      case "吉": return "text-emerald-400 bg-emerald-900/40 border-emerald-700/30"
      case "凶": return "text-red-400 bg-red-900/40 border-red-700/30"
      default: return "text-yellow-400 bg-yellow-900/40 border-yellow-700/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-24">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sky-400">解梦</h1>
            <p className="text-xs text-sky-200/60">周公解梦 · 梦境解析</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-sky-900/40 to-sky-950/60 rounded-xl p-4 border border-sky-800/30 mb-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sky-200 mb-1">解梦原理</h3>
              <p className="text-xs text-sky-200/60 leading-relaxed">
                《周公解梦》是中国古代著名的解梦典籍，通过对梦境中各种事物的象征意义进行解读，
                帮助人们理解梦境所蕴含的吉凶预兆。梦是潜意识的反映，通过解梦可以洞察内心的想法和未来的趋势。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="输入梦境关键词，如：蛇、飞翔、水..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 outline-none focus:border-sky-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-3 bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl font-medium text-white"
            >
              查询
            </button>
          </div>
          
          {error && (
            <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="space-y-4 mb-4">
            <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-amber-300">{searchQuery}</h2>
                  <p className="text-xs text-amber-200/60">梦境解析</p>
                </div>
                <div className={`px-3 py-1.5 rounded-full border text-sm font-medium ${getMeaningColor(result.meaning)}`}>
                  {result.meaning === "吉" ? "吉祥" : result.meaning === "凶" ? "凶险" : "平和"}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 rounded-xl p-4 border border-blue-800/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold text-blue-200">详细解析</h3>
              </div>
              <p className="text-blue-100/90 leading-relaxed">{result.detail}</p>
              <div className="mt-3 text-xs text-blue-300/60 text-right">
                —— {result.source}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-bold text-purple-200 mb-3">温馨提示</h3>
              <p className="text-xs text-purple-100/80">
                梦境解析仅供参考，命运掌握在自己手中。保持积极心态，努力奋斗，好运自然会降临。
              </p>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-900/40 to-gray-950/60 rounded-xl p-4 border border-gray-800/30">
          <h3 className="text-sm font-bold text-gray-200 mb-3">常见梦境</h3>
          {DREAM_CATEGORIES.map((category) => (
            <div key={category.name} className="mb-4">
              <div className="text-xs text-gray-400 mb-2">{category.name}</div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSelectDream(item)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedDream === item
                        ? "bg-sky-600 text-white"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    梦见{item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}