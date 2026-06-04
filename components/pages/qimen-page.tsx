"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, TrendingUp } from "lucide-react"
import {
  JIE_QI_DUN,
  QIMEN_GEJU,
  JIU_GONG,
  BA_MEN,
  JIU_XING,
  BA_SHEN,
  TIAN_GAN,
  DI_ZHI,
  calculateQimenPan,
  calculateYinPanQiMen
} from "@/lib/qimen-data"

export function QimenPage() {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [resultTab, setResultTab] = useState<"pan" | "geju" | "guji">("pan")
  const [qimenData, setQimenData] = useState<any>(null)
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours(),
    panType: "yang" as "yang" | "yin"
  })

  const handleSubmit = () => {
    const date = new Date(formData.year, formData.month - 1, formData.day, formData.hour)
    let result
    
    if (formData.panType === "yin") {
      result = calculateYinPanQiMen(date)
    } else {
      result = calculateQimenPan(date)
    }
    
    setQimenData(result)
    setActiveTab("result")
  }

  const renderInputForm = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16]">
      <div className="sticky top-0 z-10 bg-[#1a1410]/90 backdrop-blur border-b border-amber-800/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <button className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-amber-400" />
          </button>
          <h1 className="text-lg font-bold text-white">奇门遁甲</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-amber-900/30 border border-amber-800/30 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-amber-400 mb-2">奇门遁甲 · 帝王之学</h2>
          <p className="text-amber-200/70 text-sm">
            基于《奇门遁甲统宗大全》《奇门遁甲秘笈大全》，包含天盘、地盘、人盘、神盘，九星八门八神三奇六仪
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">排盘类型</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFormData(prev => ({ ...prev, panType: "yang" }))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.panType === "yang"
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                阳盘
              </button>
              <button
                onClick={() => setFormData(prev => ({ ...prev, panType: "yin" }))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.panType === "yin"
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                阴盘
              </button>
            </div>
          </div>

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
            className="w-full py-4 bg-black text-amber-400 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors"
          >
            起局
          </button>
        </div>

        <div className="bg-amber-900/20 border border-amber-800/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-200 mb-1">经典理论依据</h3>
              <p className="text-sm text-amber-200/60 leading-relaxed">
                奇门遁甲为古代三式之首，源于《周易》，包含天盘、地盘、人盘、神盘，
                及九星、八门、八神、三奇六仪，为古代帝王行军布阵之学
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderResult = () => {
    if (!qimenData) return null

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16]">
        <div className="sticky top-0 z-10 bg-[#1a1410]/90 backdrop-blur border-b border-amber-800/30">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button onClick={() => setActiveTab("input")} className="p-2 -ml-2">
                <ArrowLeft className="w-6 h-6 text-amber-400" />
              </button>
              <h1 className="text-lg font-bold text-white">奇门遁甲局</h1>
              <div className="w-10" />
            </div>
          </div>

          <div className="flex border-b border-amber-800/30 px-4">
            {[
              { id: "pan", label: "命盘" },
              { id: "geju", label: "格局" },
              { id: "guji", label: "古籍" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setResultTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                  resultTab === tab.id
                    ? "text-amber-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.label}
                {resultTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 pb-24 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-gray-800">
                {qimenData.type === "阴盘" ? "阴盘奇门" : qimenData.dunType} · {qimenData.ju}局
              </h2>
              <div className="flex justify-center gap-4 text-sm">
                <span className="text-gray-600">节气：{qimenData.jieqi}</span>
                <span className="text-gray-600">旬首：{qimenData.xunShou}</span>
              </div>
              <div className="flex justify-center gap-4 text-sm">
                <span className="text-gray-600">日干：{qimenData.riGan}</span>
                <span className="text-gray-600">时干：{qimenData.shiGan}</span>
              </div>
            </div>
          </div>

          {resultTab === "pan" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">奇门遁甲盘</h3>
              
              <div className="grid grid-cols-3 gap-2">
                {[6, 9, 4].map((pos) => {
                  const palace = qimenData.palaces.find((p: any) => p.number === pos)
                  return palace ? <QimenPalace key={pos} palace={palace} /> : null
                })}
                
                {[7, null, 3].map((pos) => {
                  if (pos === null) {
                    return (
                      <div key="center" className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-amber-600">☯</div>
                        <div className="text-xs text-amber-700 mt-1">中五宫</div>
                      </div>
                    )
                  }
                  const palace = qimenData.palaces.find((p: any) => p.number === pos)
                  return palace ? <QimenPalace key={pos} palace={palace} /> : null
                })}
                
                {[8, 1, 2].map((pos) => {
                  const palace = qimenData.palaces.find((p: any) => p.number === pos)
                  return palace ? <QimenPalace key={pos} palace={palace} /> : null
                })}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500/30 rounded"></div>
                  <span className="text-gray-600">天盘三奇六仪</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500/30 rounded"></div>
                  <span className="text-gray-600">地盘</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500/30 rounded"></div>
                  <span className="text-gray-600">九星</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500/30 rounded"></div>
                  <span className="text-gray-600">八门八神</span>
                </div>
              </div>
            </div>
          )}

          {resultTab === "geju" && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  吉格
                </h3>
                <div className="space-y-3">
                  {QIMEN_GEJU.吉格.map((geju, idx) => (
                    <div key={idx} className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="font-bold text-green-700 mb-2">{geju.name}</div>
                      <div className="text-sm text-gray-600">{geju.desc}</div>
                      <div className="text-xs text-gray-400 mt-1">——{geju.chuchu}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 rotate-180" />
                  凶格
                </h3>
                <div className="space-y-3">
                  {QIMEN_GEJU.凶格.map((geju, idx) => (
                    <div key={idx} className="p-4 bg-red-50 rounded-xl border border-red-200">
                      <div className="font-bold text-red-700 mb-2">{geju.name}</div>
                      <div className="text-sm text-gray-600">{geju.desc}</div>
                      <div className="text-xs text-gray-400 mt-1">——{geju.chuchu}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {resultTab === "guji" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                古籍参考
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-xs font-bold text-blue-600 mb-2">《奇门遁甲统宗大全》</div>
                  <div className="text-gray-800 italic mb-2">
                    "阴阳顺逆妙难穷，二至还乡一九宫。若能了达阴阳理，天地都在一掌中。"
                  </div>
                  <div className="text-gray-600 text-sm">
                    阴阳顺逆之理深奥难穷，冬至夏至是阴阳二气的转折点，
                    一宫九宫是阴阳的起点终点。如能明了阴阳变化之理，天地变化皆在掌握之中。
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="text-xs font-bold text-purple-600 mb-2">《烟波钓叟歌》</div>
                  <div className="text-gray-800 italic mb-2">
                    "六甲元号六仪名，三奇即是乙丙丁。戊己庚辛壬癸配，六甲隐遁在其中。"
                  </div>
                  <div className="text-gray-600 text-sm">
                    六甲就是六仪，三奇是乙丙丁。戊己庚辛壬癸依次配合，
                    六甲隐藏在六仪之中，不显其形。
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-xs font-bold text-green-600 mb-2">《遁甲演义》</div>
                  <div className="text-gray-800 italic mb-2">
                    "天有九星，地有九宫，人有八门，神有八神。四盘既定，吉凶可断。"
                  </div>
                  <div className="text-gray-600 text-sm">
                    天上有九星，地上有九宫，人间有八门，神界有八神。
                    天盘地盘人盘神盘四盘确定之后，吉凶祸福就可以判断了。
                  </div>
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

function QimenPalace({ palace }: { palace: any }) {
  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "水": "text-blue-600",
      "火": "text-red-600",
      "土": "text-yellow-700",
      "金": "text-gray-600",
      "木": "text-green-600",
    }
    return colors[wuxing] || "text-gray-600"
  }

  return (
    <div className="p-3 rounded-xl border border-gray-200 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-600">{palace.name}</span>
        <span className="text-xs text-gray-400">{palace.number}</span>
      </div>

      <div className="text-center mb-1">
        <span className="text-lg font-bold text-gray-800">{palace.symbol}</span>
      </div>

      <div className="text-center mb-1">
        <span className="text-sm font-bold text-purple-600">{palace.shen || palace.baShen}</span>
      </div>

      <div className="text-center mb-1">
        <span className={`text-lg font-bold ${getWuxingColor(palace.wuxing)} bg-gray-100 px-2 py-0.5 rounded`}>
          {palace.tianGan}
        </span>
      </div>

      <div className="text-center mb-1">
        <span className="text-xs font-medium text-green-600">{palace.star || palace.jiuXing}</span>
      </div>

      <div className="text-center mb-1">
        <span className="text-xs font-medium text-blue-600">{palace.men || palace.baMen}</span>
      </div>

      <div className="text-center">
        <span className="text-xs text-gray-500">{palace.diZhi}</span>
      </div>
    </div>
  )
}