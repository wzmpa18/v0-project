"use client"

import { useState } from "react"
import { Atom, Calendar, Star, BookOpen, Info } from "lucide-react"
import {
  QI_ZHENG,
  SI_YU,
  SHI_ER_GONG,
  calculateMingGong,
  calculateQiZhengPosition,
  QI_ZHENG_GE_JU,
  QI_ZHENG_INTRO,
} from "@/lib/qizheng-data"

export default function QizhengPage() {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours(),
  })
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"input" | "result" | "geju">("input")

  const handleSubmit = () => {
    const date = new Date(formData.year, formData.month - 1, formData.day, formData.hour)
    const mingGong = calculateMingGong(formData.hour, formData.month)
    const positions = calculateQiZhengPosition(date)
    
    setResult({
      mingGong,
      positions,
      date,
    })
    setActiveTab("result")
  }

  const getGongName = (index: number) => {
    return SHI_ER_GONG[index - 1]?.name || `${index}宫`
  }

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "火": "text-red-500",
      "水": "text-blue-500",
      "木": "text-green-500",
      "金": "text-amber-500",
      "土": "text-yellow-600",
    }
    return colors[wuxing] || "text-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <Atom className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-purple-400">七政四余</h1>
            <p className="text-xs text-purple-200/60">天文历法 · 星象推命</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-200/80">{QI_ZHENG_INTRO.description}</span>
          </div>
        </div>

        {activeTab === "input" && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">输入出生信息</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">年份</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
                >
                  {Array.from({ length: 100 }, (_, i) => 1940 + i).map(y => (
                    <option key={y} value={y}>{y}年</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">月份</label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData(prev => ({ ...prev, month: Number(e.target.value) }))}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                    <option key={m} value={m}>{m}月</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">日期</label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData(prev => ({ ...prev, day: Number(e.target.value) }))}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}日</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">时辰</label>
                <select
                  value={formData.hour}
                  onChange={(e) => setFormData(prev => ({ ...prev, hour: Number(e.target.value) }))}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>{i}:00</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold hover:from-purple-500 hover:to-purple-600 transition-all"
            >
              开始推命
            </button>
          </div>
        )}

        {activeTab === "result" && result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-800/60 to-purple-900/40 rounded-xl p-5 border border-purple-700/30">
              <div className="text-center mb-4">
                <div className="text-sm text-purple-200/70 mb-1">命宫位置</div>
                <div className="text-2xl font-bold text-white">{getGongName(result.mingGong)}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xs text-purple-200/60 mb-1">出生日期</div>
                  <div className="text-sm text-white">
                    {formData.year}年{formData.month}月{formData.day}日
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xs text-purple-200/60 mb-1">出生时辰</div>
                  <div className="text-sm text-white">{formData.hour}:00</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">七政位置</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {QI_ZHENG.map((star) => {
                  const position = result.positions[star.name]
                  return (
                    <div key={star.name} className="bg-purple-800/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{star.symbol}</span>
                          <span className={`font-bold ${getWuxingColor(star.wuxing)}`}>{star.name}</span>
                        </div>
                        <span className="text-xs text-purple-300">{getGongName(position)}</span>
                      </div>
                      <div className="text-xs text-purple-100/60">{star.desc}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Atom className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">四余位置</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {SI_YU.map((star) => {
                  const position = result.positions[star.name]
                  return (
                    <div key={star.name} className="bg-purple-800/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{star.symbol}</span>
                          <span className={`font-bold ${getWuxingColor(star.wuxing)}`}>{star.name}</span>
                        </div>
                        <span className="text-xs text-purple-300">{getGongName(position)}</span>
                      </div>
                      <div className="text-xs text-purple-100/60">{star.desc}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              onClick={() => setActiveTab("geju")}
              className="w-full py-3 bg-white/10 text-purple-300 rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              查看格局分析
            </button>

            <button
              onClick={() => setActiveTab("input")}
              className="w-full py-3 bg-white/5 text-gray-400 rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              重新推命
            </button>
          </div>
        )}

        {activeTab === "geju" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-4 border border-green-800/30">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-green-400" />
                <span className="text-sm font-bold text-green-300">吉格</span>
              </div>
              <div className="space-y-3">
                {QI_ZHENG_GE_JU.吉格.map((geju, idx) => (
                  <div key={idx} className="bg-green-800/30 rounded-lg p-3">
                    <div className="font-bold text-green-200 mb-1">{geju.name}</div>
                    <div className="text-xs text-green-100/70">{geju.desc}</div>
                    <div className="text-xs text-green-400/50 mt-1">——{geju.chuchu}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-4 border border-red-800/30">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-red-400" />
                <span className="text-sm font-bold text-red-300">凶格</span>
              </div>
              <div className="space-y-3">
                {QI_ZHENG_GE_JU.凶格.map((geju, idx) => (
                  <div key={idx} className="bg-red-800/30 rounded-lg p-3">
                    <div className="font-bold text-red-200 mb-1">{geju.name}</div>
                    <div className="text-xs text-red-100/70">{geju.desc}</div>
                    <div className="text-xs text-red-400/50 mt-1">——{geju.chuchu}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab("result")}
              className="w-full py-3 bg-white/10 text-purple-300 rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              返回结果
            </button>
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">十二宫位</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {SHI_ER_GONG.map((gong) => (
              <div key={gong.number} className="bg-amber-800/30 rounded-lg p-2 text-center">
                <div className="text-xs font-medium text-amber-300">{gong.name}</div>
                <div className="text-xs text-amber-100/60">{gong.number}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 bg-gradient-to-br from-blue-900/30 to-blue-950/50 rounded-xl p-4 border border-blue-800/30">
          <div className="text-sm font-medium text-blue-400 mb-3">七政四余简介</div>
          <div className="space-y-2 text-xs text-blue-100/70">
            <p><strong className="text-blue-300">起源：</strong>{QI_ZHENG_INTRO.origin}</p>
            <p><strong className="text-blue-300">特点：</strong></p>
            <ul className="list-disc list-inside">
              {QI_ZHENG_INTRO.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}