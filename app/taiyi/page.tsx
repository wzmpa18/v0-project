"use client"

import { useState } from "react"
import { Sun, ArrowLeft, BookOpen } from "lucide-react"
import { calculateTaiYi, TAI_YI_JIU_GONG, TAI_YI_SHI_SHEN, TAI_YI_BA_MEN, TAI_YI_GE_JU, TAI_YI_DUAN_YU, DI_ZHI } from "@/lib/taiyi-data"

export default function TaiYiPage() {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [resultTab, setResultTab] = useState<"pan" | "shen" | "men" | "guji">("pan")
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours()
  })

  const handleSubmit = () => {
    const date = new Date(formData.year, formData.month - 1, formData.day, formData.hour)
    const panResult = calculateTaiYi(date)
    setResult(panResult)
    setActiveTab("result")
  }

  const renderInputForm = () => (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-900/50 to-gray-900">
      <div className="sticky top-0 z-10 bg-fuchsia-900/90 backdrop-blur border-b border-fuchsia-700/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-10" />
          <h1 className="text-lg font-bold text-white">太乙神数</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-fuchsia-900/30 border border-fuchsia-700/30 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-fuchsia-400 mb-2">太乙神数 · 帝王之学</h2>
          <p className="text-fuchsia-200/70 text-sm">
            基于《太乙金镜式经》，包含太乙九宫、十神、八门、格局分析
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
            className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-fuchsia-500 hover:to-purple-500 transition-all"
          >
            起局
          </button>
        </div>

        <div className="bg-fuchsia-900/20 border border-fuchsia-700/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-fuchsia-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-fuchsia-200 mb-1">经典理论依据</h3>
              <p className="text-sm text-fuchsia-200/60 leading-relaxed">
                太乙神数为三式之一，源于《太乙金镜式经》，以太乙九宫为基础，结合十神八门推衍吉凶
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderResult = () => {
    if (!result) return null

    return (
      <div className="min-h-screen bg-gradient-to-b from-fuchsia-900/50 to-gray-900">
        <div className="sticky top-0 z-10 bg-fuchsia-900/90 backdrop-blur border-b border-fuchsia-700/30">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button onClick={() => setActiveTab("input")} className="p-2 -ml-2">
                <ArrowLeft className="w-6 h-6 text-fuchsia-400" />
              </button>
              <h1 className="text-lg font-bold text-white">太乙神数</h1>
              <div className="w-10" />
            </div>
          </div>

          <div className="flex border-b border-fuchsia-700/30 px-4">
            {[
              { id: "pan", label: "九宫" },
              { id: "shen", label: "十神" },
              { id: "men", label: "八门" },
              { id: "guji", label: "古籍" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setResultTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                  resultTab === tab.id
                    ? "text-fuchsia-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.label}
                {resultTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-fuchsia-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 pb-24 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-gray-800">太乙神数</h2>
              <div className="flex justify-center gap-4 text-sm">
                <span className="text-gray-600">日：{result.dayGan}{result.dayZhi}</span>
                <span className="text-gray-600">积年：{result.jinian}</span>
              </div>
            </div>
          </div>

          {resultTab === "pan" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">太乙九宫</h3>
              <div className="grid grid-cols-3 gap-3">
                {TAI_YI_JIU_GONG.map((gong) => (
                  <div
                    key={gong.position}
                    className={`p-3 rounded-xl text-center border ${
                      gong.position === result.taiYiGong
                        ? "bg-fuchsia-100 border-fuchsia-400"
                        : gong.position === result.wenChangGong
                        ? "bg-blue-100 border-blue-400"
                        : gong.position === result.shiJiGong
                        ? "bg-red-100 border-red-400"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="text-2xl">{gong.symbol}</div>
                    <div className="text-sm font-bold text-gray-800">{gong.name}</div>
                    <div className="text-xs text-gray-500">{gong.direction}</div>
                    {gong.position === result.taiYiGong && (
                      <div className="text-xs text-fuchsia-600 mt-1">太乙</div>
                    )}
                    {gong.position === result.wenChangGong && (
                      <div className="text-xs text-blue-600 mt-1">文昌</div>
                    )}
                    {gong.position === result.shiJiGong && (
                      <div className="text-xs text-red-600 mt-1">始击</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultTab === "shen" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">太乙十神</h3>
              <div className="grid grid-cols-2 gap-3">
                {TAI_YI_SHI_SHEN.map((shen) => (
                  <div key={shen.name} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">{shen.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        shen.nature === "贵神" || shen.nature === "吉星" || shen.nature === "文星"
                          ? "bg-green-100 text-green-600"
                          : shen.nature === "武将" || shen.nature === "将星"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {shen.nature}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{shen.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultTab === "men" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">太乙八门</h3>
              <div className="grid grid-cols-2 gap-3">
                {TAI_YI_BA_MEN.map((men) => (
                  <div key={men.name} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">{men.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        men.nature === "吉"
                          ? "bg-green-100 text-green-600"
                          : men.nature === "凶"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}>
                        {men.nature}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{men.direction}</div>
                    <div className="text-xs text-gray-500">{men.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultTab === "guji" && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-fuchsia-500" />
                  太乙断语
                </h3>
                <div className="space-y-3">
                  {Object.values(TAI_YI_DUAN_YU).map((duanyu: any) => (
                    <div key={duanyu.name} className="bg-fuchsia-50 rounded-xl p-4">
                      <div className="font-bold text-fuchsia-600 mb-2">{duanyu.name}</div>
                      <div className="text-gray-800">{duanyu.description}</div>
                      <div className="text-xs text-gray-400 mt-2">{duanyu.origin}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-green-600 mb-4">吉格</h3>
                <div className="space-y-3">
                  {TAI_YI_GE_JU.jiGe.map((geju, idx) => (
                    <div key={idx} className="bg-green-50 rounded-xl p-3">
                      <div className="font-bold text-green-700">{geju.name}</div>
                      <div className="text-sm text-gray-600">{geju.description}</div>
                      <div className="text-xs text-gray-400">{geju.origin}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-red-600 mb-4">凶格</h3>
                <div className="space-y-3">
                  {TAI_YI_GE_JU.xiongGe.map((geju, idx) => (
                    <div key={idx} className="bg-red-50 rounded-xl p-3">
                      <div className="font-bold text-red-700">{geju.name}</div>
                      <div className="text-sm text-gray-600">{geju.description}</div>
                      <div className="text-xs text-gray-400">{geju.origin}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return activeTab === "input" ? renderInputForm() : renderResult()
}