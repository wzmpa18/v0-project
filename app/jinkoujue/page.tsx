"use client"

import { useState } from "react"
import { Zap, ArrowLeft, BookOpen } from "lucide-react"
import { calculateJinKouJue, DI_ZHI, SHI_ER_JIANG, JIN_KOU_JUE_DUAN_YU } from "@/lib/jinkoujue-data"

export default function JinKouJuePage() {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours()
  })

  const handleSubmit = () => {
    const date = new Date(formData.year, formData.month - 1, formData.day, formData.hour)
    const panResult = calculateJinKouJue(date)
    setResult(panResult)
    setActiveTab("result")
  }

  const getJiangColor = (jiang: string) => {
    const goodJiang = ["青龙", "六合", "贵人", "太常", "天后"]
    return goodJiang.includes(jiang) ? "text-emerald-400" : "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16]">
      {activeTab === "input" && (
        <div className="min-h-screen">
          <div className="sticky top-0 z-10 bg-[#1a1410]/90 backdrop-blur border-b border-cyan-800/30 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="w-10" />
              <h1 className="text-lg font-bold text-white">金口诀</h1>
              <div className="w-10" />
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-cyan-900/30 border border-cyan-800/30 rounded-2xl p-5">
              <h2 className="text-lg font-bold text-cyan-400 mb-2">六壬金口诀 · 孙膑兵法</h2>
              <p className="text-cyan-200/70 text-sm">
                金口诀是中国古代最高层次的预测学之一，相传为战国时期军事家孙膑所创，
                又称"孙膑神课"、"大六壬金口诀"，以其快速准确而著称
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">选择年份</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-xl text-gray-800"
                >
                  {Array.from({ length: 100 }, (_, i) => 1940 + i).map(y => (
                    <option key={y} value={y}>{y}年</option>
                  ))}
                </select>
              </div>

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
                      <option key={i} value={i}>
                        {DI_ZHI[Math.floor(i / 2) % 12]}时 ({i}:00)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-cyan-500 hover:to-blue-500 transition-all"
              >
                起课
              </button>
            </div>

            <div className="bg-cyan-900/20 border border-cyan-800/30 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-cyan-200 mb-1">经典理论依据</h3>
                  <p className="text-sm text-cyan-200/60 leading-relaxed">
                    金口诀以"大六壬"为基础，结合天时、地利、人和，通过十二天将的轮转来推断吉凶祸福，
                    是古代将帅行军打仗的重要决策工具。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "result" && result && (
        <div className="min-h-screen">
          <div className="sticky top-0 z-10 bg-[#1a1410]/90 backdrop-blur border-b border-cyan-800/30">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <button onClick={() => setActiveTab("input")} className="p-2 -ml-2">
                  <ArrowLeft className="w-6 h-6 text-cyan-400" />
                </button>
                <h1 className="text-lg font-bold text-white">金口诀</h1>
                <div className="w-10" />
              </div>
            </div>
          </div>

          <div className="p-4 pb-24 space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-gray-800">金口诀课</h2>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="text-gray-600">{result.year}年{result.month}月{result.day}日</span>
                  <span className="text-gray-600">{DI_ZHI[Math.floor(result.hour / 2) % 12]}时</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-4 border border-cyan-800/30">
              <h3 className="text-sm font-bold text-cyan-200 mb-3">四柱</h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-cyan-800/30 rounded-lg p-3 text-center">
                  <div className="text-xs text-cyan-300/70 mb-1">年柱</div>
                  <div className="text-lg font-bold text-cyan-200">
                    {result.nianZhu.gan}{result.nianZhu.zhi}
                  </div>
                </div>
                <div className="bg-cyan-800/30 rounded-lg p-3 text-center">
                  <div className="text-xs text-cyan-300/70 mb-1">月柱</div>
                  <div className="text-lg font-bold text-cyan-200">
                    {result.yueZhu.gan}{result.yueZhu.zhi}
                  </div>
                </div>
                <div className="bg-cyan-800/30 rounded-lg p-3 text-center">
                  <div className="text-xs text-cyan-300/70 mb-1">日柱</div>
                  <div className="text-lg font-bold text-cyan-200">
                    {result.riZhu.gan}{result.riZhu.zhi}
                  </div>
                </div>
                <div className="bg-cyan-800/30 rounded-lg p-3 text-center">
                  <div className="text-xs text-cyan-300/70 mb-1">时柱</div>
                  <div className="text-lg font-bold text-cyan-200">
                    {result.shiZhu.gan}{result.shiZhu.zhi}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30">
              <div className="text-center">
                <div className="text-sm text-amber-300/70 mb-2">天将</div>
                <div className={`text-3xl font-bold ${getJiangColor(result.tianJiang)}`}>
                  {result.tianJiang}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-bold text-purple-200 mb-3">断语</h3>
              <p className="text-purple-100/90 text-center text-lg">{result.duanYu}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/40 to-gray-950/60 rounded-xl p-4 border border-gray-800/30">
              <h3 className="text-sm font-bold text-gray-200 mb-3">十二天将详解</h3>
              <div className="grid grid-cols-2 gap-2">
                {SHI_ER_JIANG.map((jiang) => (
                  <div
                    key={jiang}
                    className={`p-2 rounded-lg text-xs ${
                      result.tianJiang === jiang
                        ? "bg-cyan-600/40 text-cyan-200"
                        : "bg-gray-800/30 text-gray-300"
                    }`}
                  >
                    <div className="font-medium">{jiang}</div>
                    <div className="text-xs opacity-70 mt-1">{JIN_KOU_JUE_DUAN_YU[jiang]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}