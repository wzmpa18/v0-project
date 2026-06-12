"use client"

import { useState } from "react"
import { Compass, Grid3X3, TrendingUp, Info, BookOpen } from "lucide-react"
import {
  FEI_XING,
  ER_SHI_SI_SHAN,
  calculateFeiXingPan,
  XUAN_KONG_GE_JU,
  XUAN_KONG_INTRO,
} from "@/lib/xuankong-data"

export default function XuankongPage() {
  const [formData, setFormData] = useState({
    yun: 8,
    direction: "子山午向",
  })
  const [result, setResult] = useState<any>(null)
  const [showGeju, setShowGeju] = useState(false)

  const handleCalculate = () => {
    const panResult = calculateFeiXingPan(formData.yun, formData.direction)
    setResult(panResult)
  }

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "水": "text-blue-500",
      "土": "text-amber-600",
      "木": "text-green-500",
      "金": "text-gray-400",
      "火": "text-red-500",
    }
    return colors[wuxing] || "text-gray-500"
  }

  const getNatureColor = (nature: string) => {
    return nature === "吉" ? "text-green-500" : "text-red-500"
  }

  const getStarInfo = (number: number) => {
    return FEI_XING.find(s => s.number === number)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-purple-400">玄空风水</h1>
            <p className="text-xs text-purple-200/60">九宫飞星 · 理气风水</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-200/80">{XUAN_KONG_INTRO.description}</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Grid3X3 className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">飞星排盘</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">选择运数</label>
              <select
                value={formData.yun}
                onChange={(e) => setFormData(prev => ({ ...prev, yun: Number(e.target.value) }))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(y => (
                  <option key={y} value={y}>{y}运</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">选择坐向</label>
              <select
                value={formData.direction}
                onChange={(e) => setFormData(prev => ({ ...prev, direction: e.target.value }))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
              >
                {ER_SHI_SI_SHAN.map((shan, idx) => (
                  <option key={idx} value={`${shan.name}山`}>{shan.name}山</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold hover:from-purple-500 hover:to-purple-600 transition-all"
          >
            排盘
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-800/60 to-purple-900/40 rounded-xl p-5 border border-purple-700/30">
              <div className="text-center mb-4">
                <div className="text-sm text-purple-200/70 mb-1">{formData.yun}运飞星盘</div>
                <div className="text-xl font-bold text-white">{formData.direction}</div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[6, 9, 4].map((pos) => {
                  const star = result[pos.toString()]
                  const starInfo = getStarInfo(star)
                  return (
                    <div key={pos} className="bg-purple-800/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-purple-200/60 mb-1">{pos}宫</div>
                      <div className={`text-lg font-bold ${getNatureColor(starInfo?.nature || "")}`}>
                        {starInfo?.name}
                      </div>
                      <div className={`text-xs ${getWuxingColor(starInfo?.wuxing || "")}`}>
                        {starInfo?.wuxing}
                      </div>
                    </div>
                  )
                })}
                
                {[7, null, 3].map((pos) => {
                  if (pos === null) {
                    const centerStar = formData.yun
                    const centerInfo = getStarInfo(centerStar)
                    return (
                      <div key="center" className="bg-amber-800/30 rounded-lg p-3 text-center">
                        <div className="text-xs text-amber-200/60 mb-1">中宫</div>
                        <div className={`text-lg font-bold ${getNatureColor(centerInfo?.nature || "")}`}>
                          {centerInfo?.name}
                        </div>
                        <div className={`text-xs ${getWuxingColor(centerInfo?.wuxing || "")}`}>
                          {centerInfo?.wuxing}
                        </div>
                      </div>
                    )
                  }
                  const star = result[pos.toString()]
                  const starInfo = getStarInfo(star)
                  return (
                    <div key={pos} className="bg-purple-800/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-purple-200/60 mb-1">{pos}宫</div>
                      <div className={`text-lg font-bold ${getNatureColor(starInfo?.nature || "")}`}>
                        {starInfo?.name}
                      </div>
                      <div className={`text-xs ${getWuxingColor(starInfo?.wuxing || "")}`}>
                        {starInfo?.wuxing}
                      </div>
                    </div>
                  )
                })}
                
                {[8, 1, 2].map((pos) => {
                  const star = result[pos.toString()]
                  const starInfo = getStarInfo(star)
                  return (
                    <div key={pos} className="bg-purple-800/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-purple-200/60 mb-1">{pos}宫</div>
                      <div className={`text-lg font-bold ${getNatureColor(starInfo?.nature || "")}`}>
                        {starInfo?.name}
                      </div>
                      <div className={`text-xs ${getWuxingColor(starInfo?.wuxing || "")}`}>
                        {starInfo?.wuxing}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              onClick={() => setShowGeju(!showGeju)}
              className="w-full py-3 bg-white/10 text-purple-300 rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              {showGeju ? "隐藏格局分析" : "查看格局分析"}
            </button>
          </div>
        )}

        {showGeju && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-4 border border-green-800/30">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm font-bold text-green-300">吉格</span>
              </div>
              <div className="space-y-3">
                {XUAN_KONG_GE_JU.吉格.map((geju, idx) => (
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
                <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
                <span className="text-sm font-bold text-red-300">凶格</span>
              </div>
              <div className="space-y-3">
                {XUAN_KONG_GE_JU.凶格.map((geju, idx) => (
                  <div key={idx} className="bg-red-800/30 rounded-lg p-3">
                    <div className="font-bold text-red-200 mb-1">{geju.name}</div>
                    <div className="text-xs text-red-100/70">{geju.desc}</div>
                    <div className="text-xs text-red-400/50 mt-1">——{geju.chuchu}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">九星详解</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {FEI_XING.map((star, idx) => (
              <div key={idx} className="bg-purple-800/30 rounded-lg p-2 text-center">
                <div className="text-xs font-bold text-purple-300 mb-1">{star.name}</div>
                <div className={`text-xs ${getNatureColor(star.nature)}`}>{star.nature}</div>
                <div className={`text-xs ${getWuxingColor(star.wuxing)}`}>{star.wuxing}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">二十四山</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {ER_SHI_SI_SHAN.map((shan, idx) => (
              <div key={idx} className="bg-purple-800/30 rounded-lg p-1.5 text-center">
                <div className="text-xs font-bold text-purple-300">{shan.name}</div>
                <div className={`text-xs ${getWuxingColor(shan.wuxing)}`}>{shan.wuxing}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="text-sm font-medium text-amber-400 mb-3">玄空风水简介</div>
          <div className="space-y-2 text-xs text-amber-100/70">
            <p><strong className="text-amber-300">起源：</strong>{XUAN_KONG_INTRO.origin}</p>
            <p><strong className="text-amber-300">特点：</strong></p>
            <ul className="list-disc list-inside">
              {XUAN_KONG_INTRO.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}