"use client"

import { useState } from "react"
import { Wind, BookOpen, Sparkles, Home, Star } from "lucide-react"
import {
  BA_ZHAI_GUA,
  XUAN_KONG_STARS,
  FENG_SHUI_TIPS,
  BA_ZHAI_HOUSE_TYPES,
  calculateBaZhaiMing,
  getHouseType,
  isMatchingHouse,
  calculateXuanKongFeiXing
} from "@/lib/fengshui-data"

export default function FengshuiPage() {
  const [activeTab, setActiveTab] = useState<"bazhai" | "xuankong" | "tips">("bazhai")
  const [gender, setGender] = useState<string>("男")
  const [birthYear, setBirthYear] = useState<string>("")
  const [doorDirection, setDoorDirection] = useState<string>("正北")
  const [baZhaiResult, setBaZhaiResult] = useState<any>(null)

  const directions = ["正北", "正南", "正东", "正西", "东南", "西北", "西南", "东北"]

  const handleCalculate = () => {
    if (!birthYear) return
    
    const year = parseInt(birthYear)
    const mingResult = calculateBaZhaiMing(gender, year)
    const houseType = getHouseType(doorDirection)
    const isMatch = isMatchingHouse(mingResult.ming, houseType)
    
    setBaZhaiResult({
      ...mingResult,
      houseType,
      isMatch,
      flyingStars: calculateXuanKongFeiXing(year)
    })
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

  const getStarColor = (nature: string) => {
    return nature === "吉" ? "text-emerald-400" : "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-24">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
            <Wind className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-cyan-400">风水堪舆</h1>
            <p className="text-xs text-cyan-200/60">八宅风水 · 玄空飞星</p>
          </div>
        </div>
      </header>

      <div className="flex border-b border-cyan-800/30 bg-[#1a1410]/90 backdrop-blur">
        {[
          { id: "bazhai", label: "八宅风水" },
          { id: "xuankong", label: "玄空飞星" },
          { id: "tips", label: "风水贴士" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-cyan-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
            )}
          </button>
        ))}
      </div>

      <main className="px-4 py-4">
        {activeTab === "bazhai" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-4 border border-cyan-800/30">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-cyan-200 mb-1">八宅风水原理</h3>
                  <p className="text-xs text-cyan-200/60 leading-relaxed">
                    八宅风水是中国传统风水流派之一，将住宅分为东四宅和西四宅，
                    根据人的出生年份计算命卦，判断人与住宅的匹配程度，以达到趋吉避凶的目的。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3">风水测算</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-2">性别</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGender("男")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        gender === "男"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      男
                    </button>
                    <button
                      onClick={() => setGender("女")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        gender === "女"
                          ? "bg-pink-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      女
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2">出生年份</label>
                  <input
                    type="number"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    placeholder="请输入出生年份"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-800 placeholder-gray-400 text-sm outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2">大门朝向</label>
                  <select
                    value={doorDirection}
                    onChange={(e) => setDoorDirection(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-800 text-sm outline-none focus:border-cyan-500"
                  >
                    {directions.map(dir => (
                      <option key={dir} value={dir}>{dir}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl font-medium text-white"
                >
                  开始测算
                </button>
              </div>
            </div>

            {baZhaiResult && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30">
                  <div className="text-center">
                    <div className="text-xl font-bold text-amber-300 mb-2">命卦分析</div>
                    <div className="flex justify-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-amber-400">{baZhaiResult.gua}</div>
                        <div className="text-xs text-amber-200/70">命卦</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${baZhaiResult.isMatch ? "text-emerald-400" : "text-red-400"}`}>
                          {baZhaiResult.ming}
                        </div>
                        <div className="text-xs text-amber-200/70">命宫</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${baZhaiResult.isMatch ? "text-emerald-400" : "text-red-400"}`}>
                          {baZhaiResult.houseType}
                        </div>
                        <div className="text-xs text-amber-200/70">宅型</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-xl p-4 border ${
                  baZhaiResult.isMatch 
                    ? "bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 border-emerald-800/30"
                    : "bg-gradient-to-br from-red-900/40 to-red-950/60 border-red-800/30"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className={`w-4 h-4 ${baZhaiResult.isMatch ? "text-emerald-500" : "text-red-500"}`} />
                    <span className={`font-medium ${baZhaiResult.isMatch ? "text-emerald-200" : "text-red-200"}`}>
                      {baZhaiResult.isMatch ? "匹配良好" : "匹配不佳"}
                    </span>
                  </div>
                  <p className="text-sm">
                    {baZhaiResult.isMatch 
                      ? "您的命卦与住宅类型匹配，居住在此宅中会有良好的风水效果。"
                      : "您的命卦与住宅类型不匹配，建议选择适合您命卦的住宅，或进行风水调理。"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30">
                  <h3 className="text-sm font-bold text-purple-200 mb-3">八宅方位</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {BA_ZHAI_GUA.map((gua) => (
                      <div key={gua.name} className="bg-purple-800/30 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{gua.symbol}</span>
                          <div>
                            <div className="text-sm font-medium text-purple-200">{gua.name}</div>
                            <div className="text-xs text-purple-300/70">{gua.direction}</div>
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-purple-300/70">
                          {gua.wuxing}·{gua.family}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-gray-900/40 to-gray-950/60 rounded-xl p-4 border border-gray-800/30">
              <h3 className="text-sm font-bold text-gray-200 mb-3">八宅类型说明</h3>
              {BA_ZHAI_HOUSE_TYPES.map((house) => (
                <div key={house.name} className="mb-2">
                  <div className="font-medium text-gray-300">{house.name}</div>
                  <div className="text-xs text-gray-400">{house.description}</div>
                  <div className="text-xs text-gray-500 mt-1">八卦：{house.guas.join("、")}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "xuankong" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30">
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-purple-200 mb-1">玄空飞星原理</h3>
                  <p className="text-xs text-purple-200/60 leading-relaxed">
                    玄空飞星是风水的高级技法，将九星根据时间流转分布于九宫之中，
                    通过分析各星的吉凶性质和方位关系，判断宅运的盛衰。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 rounded-xl p-4 border border-blue-800/30">
              <h3 className="text-sm font-bold text-blue-200 mb-3">九星详解</h3>
              <div className="grid grid-cols-3 gap-2">
                {XUAN_KONG_STARS.map((star) => (
                  <div key={star.number} className="bg-blue-800/30 rounded-lg p-2 text-center">
                    <div className={`text-xl font-bold ${getStarColor(star.nature)}`}>
                      {star.number}
                    </div>
                    <div className="text-xs text-blue-200 mt-1">{star.name}</div>
                    <div className="text-xs text-blue-300/70 mt-0.5">{star.effect}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 border border-amber-800/30">
              <h3 className="text-sm font-bold text-amber-200 mb-3">九宫飞布</h3>
              <div className="grid grid-cols-3 gap-2">
                {[6, 7, 8, 9, 5, 1, 2, 3, 4].map((pos, idx) => (
                  <div key={idx} className="aspect-square bg-amber-800/30 rounded-lg flex flex-col items-center justify-center">
                    <div className="text-2xl">
                      {pos === 1 ? "坎" : pos === 2 ? "坤" : pos === 3 ? "震" : 
                       pos === 4 ? "巽" : pos === 5 ? "中" : pos === 6 ? "乾" :
                       pos === 7 ? "兑" : pos === 8 ? "艮" : "离"}
                    </div>
                    <div className="text-xs text-amber-300/70">{pos}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "tips" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30">
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-rose-200 mb-1">居家风水贴士</h3>
                  <p className="text-xs text-rose-200/60 leading-relaxed">
                    风水是环境科学的一种，通过调整家居布局，可以改善居住环境的气场，
                    促进身心健康和家庭和谐。
                  </p>
                </div>
              </div>
            </div>

            {["入门", "客厅", "卧室", "厨房", "卫生间", "书房"].map((category) => (
              <div key={category} className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-bold text-gray-700 mb-3">{category}</h3>
                <div className="space-y-2">
                  {FENG_SHUI_TIPS.filter(tip => tip.category === category).map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{tip.tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}