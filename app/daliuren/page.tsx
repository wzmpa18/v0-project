"use client"

import { useState } from "react"
import { Swords, ArrowLeft, BookOpen } from "lucide-react"
import { calculateDaLiuRen, DI_ZHI, SHI_ER_YUE_JIANG, SHI_ER_TIAN_JIANG, DA_LIU_REN_DUAN_YU, SAN_CHUAN_DUAN_YU } from "@/lib/daliuren-data"

export default function DaliurenPage() {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [resultTab, setResultTab] = useState<"pan" | "sike" | "sanchuan" | "guji">("pan")
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours()
  })

  const handleSubmit = () => {
    const date = new Date(formData.year, formData.month - 1, formData.day, formData.hour)
    const panResult = calculateDaLiuRen(date)
    setResult(panResult)
    setActiveTab("result")
  }

  const renderInputForm = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16]">
      <div className="sticky top-0 z-10 bg-[#1a1410]/90 backdrop-blur border-b border-red-800/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-10" />
          <h1 className="text-lg font-bold text-white">六壬神课</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-red-900/30 border border-red-800/30 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-red-400 mb-2">大六壬 · 三式之首</h2>
          <p className="text-red-200/70 text-sm">
            基于《六壬大全》《壬归》《六壬金口诀》，包含天盘、地盘、四课、三传、十二天将
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
            className="w-full py-4 bg-black text-red-400 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors"
          >
            起课
          </button>
        </div>

        <div className="bg-red-900/20 border border-red-800/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-200 mb-1">经典理论依据</h3>
              <p className="text-sm text-red-200/60 leading-relaxed">
                大六壬为三式之首，源于《周易》，以天地人三才之道为理论基础，通过天盘、地盘、人盘、神盘四盘推演事物发展
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
      <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16]">
        <div className="sticky top-0 z-10 bg-[#1a1410]/90 backdrop-blur border-b border-red-800/30">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button onClick={() => setActiveTab("input")} className="p-2 -ml-2">
                <ArrowLeft className="w-6 h-6 text-red-400" />
              </button>
              <h1 className="text-lg font-bold text-white">六壬神课</h1>
              <div className="w-10" />
            </div>
          </div>

          <div className="flex border-b border-red-800/30 px-4">
            {[
              { id: "pan", label: "天盘" },
              { id: "sike", label: "四课" },
              { id: "sanchuan", label: "三传" },
              { id: "guji", label: "古籍" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setResultTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                  resultTab === tab.id
                    ? "text-red-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.label}
                {resultTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 pb-24 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-gray-800">大六壬</h2>
              <div className="flex justify-center gap-4 text-sm">
                <span className="text-gray-600">日：{result.dayGan}{result.dayZhi}</span>
                <span className="text-gray-600">时：{result.hourGan}{result.hourZhi}</span>
                <span className="text-gray-600">月将：{result.yueJiang}</span>
              </div>
            </div>
          </div>

          {resultTab === "pan" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">天盘十二宫</h3>
              <div className="grid grid-cols-3 gap-3">
                {result.tianPan.map((item: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">{DI_ZHI[idx]}宫</div>
                    <div className="text-lg font-bold text-gray-800">{item.zhi}</div>
                    <div className="text-xs text-red-600">{item.yueJiang}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultTab === "sike" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">四课详解</h3>
              <div className="space-y-3">
                {Object.values(result.siKe).map((ke: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{ke.name}</span>
                    </div>
                    <div className="grid grid-cols-4 text-center text-sm">
                      <div>
                        <div className="text-xs text-gray-500">天干</div>
                        <div className="font-bold text-gray-800">{ke.gan || "-"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">天盘</div>
                        <div className="font-bold text-blue-600">{ke.tianZhi}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">地盘</div>
                        <div className="font-bold text-green-600">{ke.diZhi}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">天将</div>
                        <div className="font-bold text-red-600">{ke.tianJiang || "-"}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultTab === "sanchuan" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">三传</h3>
              <div className="space-y-3">
                {result.sanChuan.map((chuan: any, idx: number) => (
                  <div key={idx} className="bg-gradient-to-r from-red-50 to-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-bold text-gray-800">{chuan.name}</div>
                        <div className="text-sm text-gray-600">{chuan.gan}{chuan.zhi}</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        天将：{result.tianJiang[chuan.name] || "-"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultTab === "guji" && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-500" />
                  十二天将断语
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(DA_LIU_REN_DUAN_YU).map((duanyu: any) => (
                    <div key={duanyu.name} className="bg-gray-50 rounded-xl p-3">
                      <div className="font-bold text-gray-800">{duanyu.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{duanyu.description}</div>
                      <div className="text-xs text-gray-400">{duanyu.origin}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4">三传断语</h3>
                <div className="space-y-3">
                  {Object.values(SAN_CHUAN_DUAN_YU).map((duanyu: any) => (
                    <div key={duanyu.name} className="bg-gray-50 rounded-xl p-3">
                      <div className="font-bold text-gray-800">{duanyu.name}</div>
                      <div className="text-sm text-gray-600">{duanyu.description}</div>
                      <div className="text-xs text-gray-400">{duanyu.origin}</div>
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