"use client"

import { useState } from "react"
import { PenTool, User, Sparkles, Star, Info } from "lucide-react"
import { generateNameAnalysis } from "@/lib/xingming-data"

export default function XingMingPage() {
  const [name, setName] = useState("")
  const [gender, setGender] = useState<"男" | "女">("男")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const handleAnalyze = () => {
    if (!name.trim()) {
      setError("请输入姓名")
      return
    }
    if (name.length < 2) {
      setError("姓名至少需要2个字符")
      return
    }
    
    setError("")
    const analysis = generateNameAnalysis(name, gender)
    if (analysis.valid) {
      setResult(analysis)
    } else {
      setError(analysis.message)
    }
  }

  const getLuckColor = (luck: string) => {
    switch (luck) {
      case "吉": return "text-emerald-400"
      case "凶": return "text-red-400"
      default: return "text-yellow-400"
    }
  }

  const getLuckBg = (luck: string) => {
    switch (luck) {
      case "吉": return "bg-emerald-900/40 border-emerald-700/30"
      case "凶": return "bg-red-900/40 border-red-700/30"
      default: return "bg-yellow-900/40 border-yellow-700/30"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-24">
      {/* 顶部标题栏 */}
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center">
            <PenTool className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-pink-400">姓名解析</h1>
            <p className="text-xs text-pink-200/60">五格数理 · 五行分析</p>
          </div>
        </div>
      </header>

      {/* 输入区域 */}
      <main className="px-4">
        <div className="bg-gradient-to-br from-pink-900/40 to-pink-950/60 rounded-xl p-4 border border-pink-800/30 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-pink-200 mb-2">姓名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入姓名（至少2个字）"
              className="w-full bg-[#2d2420] border border-pink-900/50 rounded-xl py-3 px-4 text-pink-100 placeholder-pink-700 outline-none focus:border-pink-600"
              maxLength={10}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-pink-200 mb-2">性别</label>
            <div className="flex gap-3">
              <button
                onClick={() => setGender("男")}
                className={`flex-1 py-3 rounded-xl border transition-all ${
                  gender === "男"
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-blue-900/40 border-blue-800/50 text-blue-200"
                }`}
              >
                男
              </button>
              <button
                onClick={() => setGender("女")}
                className={`flex-1 py-3 rounded-xl border transition-all ${
                  gender === "女"
                    ? "bg-pink-600 border-pink-500 text-white"
                    : "bg-pink-900/40 border-pink-800/50 text-pink-200"
                }`}
              >
                女
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 px-3 py-2 bg-red-900/40 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            className="w-full py-3 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl font-bold text-white active:scale-98 transition-transform"
          >
            开始解析
          </button>
        </div>

        {/* 解析结果 */}
        {result && (
          <>
            {/* 评分 */}
            <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30 mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>{result.score}</span>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-800 rounded-full text-xs text-amber-300">
                    姓名评分
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-amber-300 mb-1">{result.name}</div>
                  <div className="text-sm text-amber-200/70">
                    {result.gender === "男" ? "男性" : "女性"}姓名分析报告
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className={`text-sm font-medium ${getScoreColor(result.score)}`}>
                      {result.score >= 80 ? "吉名" : result.score >= 60 ? "中吉" : "需优化"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 五格分析 */}
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30 mb-4">
              <div className="flex items-center gap-1.5 mb-4">
                <Star className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-bold text-purple-200">五格数理分析</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* 天格 */}
                <div className={`rounded-xl p-3 border ${getLuckBg(result.tianGe.luck)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-purple-200/70">天格</span>
                    <span className={`text-sm font-bold ${getLuckColor(result.tianGe.luck)}`}>
                      {result.tianGe.number} · {result.tianGe.luck}
                    </span>
                  </div>
                  <p className="text-xs text-purple-100/80 line-clamp-2">{result.tianGe.desc}</p>
                </div>

                {/* 人格 */}
                <div className={`rounded-xl p-3 border ${getLuckBg(result.renGe.luck)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-purple-200/70">人格</span>
                    <span className={`text-sm font-bold ${getLuckColor(result.renGe.luck)}`}>
                      {result.renGe.number} · {result.renGe.luck}
                    </span>
                  </div>
                  <p className="text-xs text-purple-100/80 line-clamp-2">{result.renGe.desc}</p>
                </div>

                {/* 地格 */}
                <div className={`rounded-xl p-3 border ${getLuckBg(result.diGe.luck)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-purple-200/70">地格</span>
                    <span className={`text-sm font-bold ${getLuckColor(result.diGe.luck)}`}>
                      {result.diGe.number} · {result.diGe.luck}
                    </span>
                  </div>
                  <p className="text-xs text-purple-100/80 line-clamp-2">{result.diGe.desc}</p>
                </div>

                {/* 总格 */}
                <div className={`rounded-xl p-3 border ${getLuckBg(result.zongGe.luck)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-purple-200/70">总格</span>
                    <span className={`text-sm font-bold ${getLuckColor(result.zongGe.luck)}`}>
                      {result.zongGe.number} · {result.zongGe.luck}
                    </span>
                  </div>
                  <p className="text-xs text-purple-100/80 line-clamp-2">{result.zongGe.desc}</p>
                </div>
              </div>

              {/* 外格 */}
              <div className={`mt-2 rounded-xl p-3 border ${getLuckBg(result.waiGe.luck)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-purple-200/70">外格</span>
                  <span className={`text-sm font-bold ${getLuckColor(result.waiGe.luck)}`}>
                    {result.waiGe.number} · {result.waiGe.luck}
                  </span>
                </div>
                <p className="text-xs text-purple-100/80">{result.waiGe.desc}</p>
              </div>
            </div>

            {/* 五行分析 */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-4 border border-cyan-800/30 mb-4">
              <div className="flex items-center gap-1.5 mb-3">
                <User className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-bold text-cyan-200">五行分布</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {Object.entries(result.wuxing.counts).map(([wuxing, count]) => (
                  <div key={wuxing} className="text-center">
                    <div className="text-lg font-bold text-cyan-300">{wuxing}</div>
                    <div className="text-sm text-cyan-200/70">{count}</div>
                    <div className="w-full bg-cyan-800/30 rounded-full mt-1">
                      <div
                        className="bg-cyan-500 rounded-full h-1 transition-all"
                        style={{ width: `${(count / result.name.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-cyan-200/70">主导五行：</span>
                <span className="text-sm font-medium text-cyan-300">{result.wuxing.dominant}</span>
                <span className={`text-xs ${result.wuxing.balanced ? "text-emerald-400" : "text-yellow-400"}`}>
                  {result.wuxing.balanced ? "（平衡）" : "（偏旺）"}
                </span>
              </div>
            </div>

            {/* 建议 */}
            <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30">
              <div className="flex items-center gap-1.5 mb-3">
                <Info className="w-4 h-4 text-rose-500" />
                <span className="text-sm font-bold text-rose-200">温馨建议</span>
              </div>

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

        {/* 五格说明 */}
        {!result && (
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-950/60 rounded-xl p-4 border border-gray-800/30">
            <h3 className="text-sm font-bold text-gray-200 mb-3">五格数理简介</h3>
            <div className="space-y-2 text-xs text-gray-300/70">
              <p><span className="text-amber-400">天格：</span>姓氏笔画+1，代表父母运势</p>
              <p><span className="text-amber-400">人格：</span>姓+名首字笔画，代表自身主运</p>
              <p><span className="text-amber-400">地格：</span>名字笔画总和，代表前运（36岁前）</p>
              <p><span className="text-amber-400">总格：</span>姓名总笔画，代表后运（36岁后）</p>
              <p><span className="text-amber-400">外格：</span>总格-人格+1，代表社交与外部运势</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}