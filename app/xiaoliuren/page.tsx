"use client"

import { useState } from "react"
import { Clock, ArrowLeft, BookOpen } from "lucide-react"
import { calculateXiaoLiuRen, XIAO_LIU_REN, XIAO_LIU_REN_DETAIL } from "@/lib/xiaoliuren-data"

export default function XiaoLiuRenPage() {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours()
  })

  const handleSubmit = () => {
    const panResult = calculateXiaoLiuRen(formData.month, formData.day, formData.hour)
    setResult(panResult)
    setActiveTab("result")
  }

  const getNatureColor = (nature: string) => {
    switch (nature) {
      case "吉": return "text-emerald-400 bg-emerald-900/40 border-emerald-700/30"
      case "凶": return "text-red-400 bg-red-900/40 border-red-700/30"
      default: return "text-yellow-400 bg-yellow-900/40 border-yellow-700/30"
    }
  }

  const getNatureLabel = (nature: string) => {
    switch (nature) {
      case "吉": return "吉祥"
      case "凶": return "凶险"
      default: return "平和"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16]">
      {activeTab === "input" && (
        <div className="min-h-screen">
          <div className="sticky top-0 z-10 bg-[#1a1410]/90 backdrop-blur border-b border-indigo-800/30 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="w-10" />
              <h1 className="text-lg font-bold text-white">小六壬</h1>
              <div className="w-10" />
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-indigo-900/30 border border-indigo-800/30 rounded-2xl p-5">
              <h2 className="text-lg font-bold text-indigo-400 mb-2">小六壬 · 马前课</h2>
              <p className="text-indigo-200/70 text-sm">
                小六壬是中国古代民间流传的一种简单快捷的预测方法，
                相传为三国时期诸葛亮所创，又称"马前课"，因其简单易用而广为流传
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">月份</label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData(prev => ({ ...prev, month: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 rounded-xl text-gray-800"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                      <option key={m} value={m}>{m}月</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">日期</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData(prev => ({ ...prev, day: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 rounded-xl text-gray-800"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                      <option key={d} value={d}>{d}日</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">时辰</label>
                  <select
                    value={formData.hour}
                    onChange={(e) => setFormData(prev => ({ ...prev, hour: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 rounded-xl text-gray-800"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{i}:00</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all"
              >
                起卦
              </button>
            </div>

            <div className="bg-indigo-900/20 border border-indigo-800/30 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-indigo-200 mb-1">起卦方法</h3>
                  <p className="text-sm text-indigo-200/60 leading-relaxed">
                    心中默念要问的事情，然后按农历月份、日期、时辰，
                    用（月+日+时）÷6取余数，余数为0时取6，对应小六壬的六个位置。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/40 to-gray-950/60 rounded-xl p-4 border border-gray-800/30">
              <h3 className="text-sm font-bold text-gray-200 mb-3">小六壬详解</h3>
              <div className="grid grid-cols-2 gap-2">
                {XIAO_LIU_REN.map((item) => (
                  <div
                    key={item.name}
                    className={`p-2 rounded-lg text-xs ${
                      item.nature === "吉" ? "bg-green-900/30 text-green-200" : 
                      item.nature === "凶" ? "bg-red-900/30 text-red-200" : 
                      "bg-yellow-900/30 text-yellow-200"
                    }`}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-70 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "result" && result && (
        <div className="min-h-screen">
          <div className="sticky top-0 z-10 bg-[#1a1410]/90 backdrop-blur border-b border-indigo-800/30">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <button onClick={() => setActiveTab("input")} className="p-2 -ml-2">
                  <ArrowLeft className="w-6 h-6 text-indigo-400" />
                </button>
                <h1 className="text-lg font-bold text-white">小六壬</h1>
                <div className="w-10" />
              </div>
            </div>
          </div>

          <div className="p-4 pb-24 space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-gray-800">小六壬卦</h2>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="text-gray-600">{result.month}月{result.day}日</span>
                  <span className="text-gray-600">{result.hour}:00</span>
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-6 border ${getNatureColor(result.result.nature)}`}>
              <div className="text-center">
                <div className="text-sm opacity-70 mb-2">卦象</div>
                <div className="text-4xl font-bold">{result.result.name}</div>
                <div className="mt-2 px-4 py-1 rounded-full text-sm font-medium bg-white/10">
                  {getNatureLabel(result.result.nature)}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30">
              <p className="text-amber-100/90 text-center">{result.result.desc}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-bold text-purple-200 mb-3">卦象解析</h3>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-xs text-purple-300">含义</span>
                  <span className="text-sm text-purple-100">{result.detail.meaning}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-xs text-purple-300">建议</span>
                  <span className="text-sm text-purple-100">{result.detail.advice}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 rounded-xl p-4 border border-emerald-800/30">
                <h3 className="text-sm font-bold text-emerald-200 mb-3">适宜</h3>
                <div className="flex flex-wrap gap-2">
                  {result.detail.suitable.map((item: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-800/30 rounded-full text-xs text-emerald-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-4 border border-red-800/30">
                <h3 className="text-sm font-bold text-red-200 mb-3">不宜</h3>
                <div className="flex flex-wrap gap-2">
                  {result.detail.unsuitable.map((item: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-red-800/30 rounded-full text-xs text-red-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}