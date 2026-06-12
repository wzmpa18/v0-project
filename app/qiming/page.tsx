"use client"

import { useState } from "react"
import { Baby, Star, Sparkles, Heart, RefreshCw, Info } from "lucide-react"
import { calculateNameScore, generateNameAnalysis, getStrokeCount, CHAR_STROKES } from "@/lib/xingming-data"

const SURNAME_LIST = ["王", "李", "张", "刘", "陈", "杨", "黄", "赵", "周", "吴", "徐", "孙", "马", "朱", "胡", "郭", "何", "林", "罗", "高"]

const MALE_NAMES = [
  "伟", "强", "勇", "军", "刚", "毅", "豪", "杰", "鹏", "峰",
  "磊", "涛", "鑫", "磊", "浩", "宇", "轩", "博", "哲", "睿",
  "航", "达", "康", "健", "辉", "亮", "明", "光", "华", "伟"
]

const FEMALE_NAMES = [
  "婷", "娜", "丽", "芳", "敏", "静", "雪", "燕", "霞", "玲",
  "玉", "梅", "兰", "英", "萍", "娟", "红", "艳", "华", "蓉",
  "婷", "琪", "萱", "怡", "欣", "悦", "妍", "婧", "琪", "涵"
]

const NEUTRAL_NAMES = [
  "雨", "晨", "阳", "宇", "轩", "涵", "诺", "然", "子", "墨",
  "诗", "书", "画", "乐", "心", "月", "星", "云", "海", "风"
]

export default function QiMingPage() {
  const [surname, setSurname] = useState("")
  const [givenName, setGivenName] = useState("")
  const [gender, setGender] = useState<"男" | "女">("男")
  const [generatedNames, setGeneratedNames] = useState<{ name: string; score: number; strokes: number }[]>([])
  const [analysis, setAnalysis] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"generate" | "analyze">("generate")

  const generateNames = () => {
    if (!surname) return
    
    const namePool = gender === "男" ? MALE_NAMES : FEMALE_NAMES
    const results: { name: string; score: number; strokes: number }[] = []
    
    for (let i = 0; i < namePool.length; i++) {
      for (let j = 0; j < namePool.length; j++) {
        const name = surname + namePool[i] + namePool[j]
        const score = calculateNameScore(name)
        const strokes = getStrokeCount(namePool[i]) + getStrokeCount(namePool[j])
        results.push({ name, score, strokes })
      }
    }
    
    results.sort((a, b) => b.score - a.score)
    setGeneratedNames(results.slice(0, 20))
  }

  const analyzeName = () => {
    if (!surname || !givenName) return
    
    const fullName = surname + givenName
    const result = generateNameAnalysis(fullName, gender)
    setAnalysis(result)
  }

  const generateSingleName = () => {
    if (!surname) return
    
    const namePool = gender === "男" ? MALE_NAMES : FEMALE_NAMES
    const idx1 = Math.floor(Math.random() * namePool.length)
    const idx2 = Math.floor(Math.random() * namePool.length)
    const name = surname + namePool[idx1] + namePool[idx2]
    const score = calculateNameScore(name)
    const strokes = getStrokeCount(namePool[idx1]) + getStrokeCount(namePool[idx2])
    
    setGeneratedNames([{ name, score, strokes }, ...generatedNames].slice(0, 20))
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-amber-400"
    return "text-red-400"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-900/30 border-green-700/30"
    if (score >= 60) return "bg-amber-900/30 border-amber-700/30"
    return "bg-red-900/30 border-red-700/30"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
            <Baby className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-cyan-400">起名工具</h1>
            <p className="text-xs text-cyan-200/60">姓名学 · 五格剖象</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="flex bg-white/5 rounded-xl p-1 mb-4">
          <button
            onClick={() => setActiveTab("generate")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "generate" ? "bg-cyan-900/50 text-cyan-400" : "text-gray-400"
            }`}
          >
            智能起名
          </button>
          <button
            onClick={() => setActiveTab("analyze")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "analyze" ? "bg-cyan-900/50 text-cyan-400" : "text-gray-400"
            }`}
          >
            姓名分析
          </button>
        </div>

        {activeTab === "generate" && (
          <>
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-4 border border-cyan-800/30 mb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-cyan-200/80 mb-2 block">姓氏</label>
                  <div className="flex flex-wrap gap-1.5">
                    {SURNAME_LIST.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSurname(s)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          surname === s
                            ? "bg-cyan-600 text-white"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value.slice(0, 2))}
                    placeholder="输入姓氏"
                    className="mt-2 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-cyan-200/80 mb-2 block">性别</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGender("男")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        gender === "男"
                          ? "bg-blue-600 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      <span>♂</span> 男
                    </button>
                    <button
                      onClick={() => setGender("女")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        gender === "女"
                          ? "bg-pink-600 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      <span>♀</span> 女
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={generateNames}
                    disabled={!surname}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-4 h-4" />
                    生成名字
                  </button>
                  <button
                    onClick={generateSingleName}
                    disabled={!surname}
                    className="px-4 bg-white/10 py-3 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {generatedNames.length > 0 && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">推荐名字</span>
                </div>
                <div className="space-y-2">
                  {generatedNames.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${getScoreBg(item.score)}`}
                    >
                      <div>
                        <div className="text-lg font-bold text-white">{item.name}</div>
                        <div className="text-xs text-gray-400">{item.strokes}画</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getScoreColor(item.score)}`}>
                          {item.score}
                        </div>
                        <div className="text-xs text-gray-500">评分</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "analyze" && (
          <>
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-4 border border-cyan-800/30 mb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-cyan-200/80 mb-2 block">姓氏</label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value.slice(0, 2))}
                    placeholder="输入姓氏"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-cyan-200/80 mb-2 block">名字</label>
                  <input
                    type="text"
                    value={givenName}
                    onChange={(e) => setGivenName(e.target.value.slice(0, 10))}
                    placeholder="输入名字（不含姓氏）"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-cyan-200/80 mb-2 block">性别</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGender("男")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        gender === "男"
                          ? "bg-blue-600 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      <span>♂</span> 男
                    </button>
                    <button
                      onClick={() => setGender("女")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        gender === "女"
                          ? "bg-pink-600 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      <span>♀</span> 女
                    </button>
                  </div>
                </div>

                <button
                  onClick={analyzeName}
                  disabled={!surname || !givenName}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Heart className="w-4 h-4" />
                  分析姓名
                </button>
              </div>
            </div>

            {analysis && analysis.valid && (
              <div className="space-y-4">
                <div className={`bg-gradient-to-br ${analysis.score >= 80 ? 'from-green-900/40 to-green-950/60 border-green-800/30' : analysis.score >= 60 ? 'from-amber-900/40 to-amber-950/60 border-amber-800/30' : 'from-red-900/40 to-red-950/60 border-red-800/30'} rounded-xl p-4 border`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{analysis.name}</div>
                    <div className="text-sm text-gray-400">{analysis.gender}</div>
                    <div className="mt-3">
                      <span className={`text-4xl font-bold ${analysis.score >= 80 ? 'text-green-400' : analysis.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                        {analysis.score}
                      </span>
                      <span className="text-gray-400 text-sm ml-1">分</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-sm font-medium text-cyan-400 mb-4">五格分析</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {['tianGe', 'renGe', 'diGe', 'zongGe', 'waiGe'].map((ge, idx) => {
                      const data = analysis[ge]
                      const names = ['天格', '人格', '地格', '总格', '外格']
                      return (
                        <div key={ge} className="text-center p-2 bg-white/5 rounded-lg">
                          <div className="text-xs text-gray-400 mb-1">{names[idx]}</div>
                          <div className="text-lg font-bold text-white">{data.number}</div>
                          <div className={`text-xs mt-1 ${data.luck === '吉' ? 'text-green-400' : data.luck === '凶' ? 'text-red-400' : 'text-amber-400'}`}>
                            {data.luck}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-sm font-medium text-cyan-400 mb-4">五行分析</h3>
                  <div className="flex justify-between mb-3">
                    {Object.entries(analysis.wuxing.counts).map(([wuxing, count]) => (
                      <div key={wuxing} className="text-center">
                        <div className="text-sm font-medium text-white">{wuxing}</div>
                        <div className="text-lg font-bold text-cyan-400">{count}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    主导五行：<span className="text-white">{analysis.wuxing.dominant}</span> | 
                    五行{analysis.wuxing.balanced ? '均衡' : '失衡'}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-amber-400">姓名解读</span>
                  </div>
                  <div className="space-y-2">
                    {analysis.suggestions.map((s: string, idx: number) => (
                      <div key={idx} className="text-sm text-amber-100/80">
                        • {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-4 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
          <h3 className="text-sm font-medium text-purple-400 mb-3">理论依据</h3>
          <p className="text-xs text-purple-100/70 leading-relaxed">
            姓名学源于《周易》，通过姓名的笔画数理来判断吉凶。五格剖象法是日本学者熊崎健翁创立的姓名学理论，
            将姓名分为天格、人格、地格、总格、外格五个部分，每个部分都有对应的数理吉凶。
            天格代表父母遗传，人格代表自身能力，地格代表家庭关系，总格代表一生运势，外格代表社交能力。
          </p>
        </div>
      </main>
    </div>
  )
}