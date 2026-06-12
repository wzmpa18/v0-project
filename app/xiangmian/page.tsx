"use client"

import { useState } from "react"
import { Eye, BookOpen } from "lucide-react"
import { MIAN_XIANG_SHI_ER_GONG, WU_GUAN, MIAN_BU_XING_ZHUANG, QI_SE, MIAN_XIANG_DUAN_YU, analyzeMianXiang } from "@/lib/xiangmian-data"

export default function XiangmianPage() {
  const [activeTab, setActiveTab] = useState<"gong" | "wuguan" | "xingzhuang" | "qise" | "guji">("gong")
  const [selectedFeatures, setSelectedFeatures] = useState({
    mingGong: "",
    caiBo: "",
    qiQie: "",
    fuDe: ""
  })
  const [analysisResult, setAnalysisResult] = useState<string[]>([])

  const handleAnalyze = () => {
    const result = analyzeMianXiang(selectedFeatures)
    setAnalysisResult(result)
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

  const getQiseBg = (color: string) => {
    const colors: Record<string, string> = {
      "青色": "bg-green-500",
      "红色": "bg-red-500",
      "黄色": "bg-yellow-500",
      "白色": "bg-gray-300",
      "黑色": "bg-gray-800"
    }
    return colors[color] || "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16]">
      <div className="sticky top-0 z-10 bg-[#1a1410]/90 backdrop-blur border-b border-rose-800/30 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">面相学</h1>
            <p className="text-xs text-rose-200/60">观相识人 · 洞察命运</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-rose-800/30 bg-[#1a1410]/90 backdrop-blur overflow-x-auto">
        {[
          { id: "gong", label: "十二宫" },
          { id: "wuguan", label: "五官" },
          { id: "xingzhuang", label: "面形" },
          { id: "qise", label: "气色" },
          { id: "guji", label: "古籍" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-rose-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-400" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 pb-24 space-y-4">
        {activeTab === "gong" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30">
              <h2 className="text-sm font-bold text-rose-300 mb-3">面相十二宫</h2>
              <div className="grid grid-cols-3 gap-2">
                {MIAN_XIANG_SHI_ER_GONG.map((gong) => (
                  <button
                    key={gong.name}
                    className="bg-rose-800/30 rounded-lg p-2 text-xs text-rose-100/80 text-center hover:bg-rose-700/40 transition-colors"
                  >
                    <div className="font-medium">{gong.name}</div>
                    <div className="text-xs opacity-70">{gong.position}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3">面相自测</h3>
              <div className="space-y-3">
                {[
                  { key: "mingGong", label: "命宫（印堂）" },
                  { key: "caiBo", label: "财帛宫（鼻头）" },
                  { key: "qiQie", label: "妻妾宫（鱼尾）" },
                  { key: "fuDe", label: "福德宫（天仓）" }
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-24">{item.label}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedFeatures(prev => ({ ...prev, [item.key]: "good" }))}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedFeatures[item.key as keyof typeof selectedFeatures] === "good"
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        吉
                      </button>
                      <button
                        onClick={() => setSelectedFeatures(prev => ({ ...prev, [item.key]: "bad" }))}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedFeatures[item.key as keyof typeof selectedFeatures] === "bad"
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        凶
                      </button>
                      <button
                        onClick={() => setSelectedFeatures(prev => ({ ...prev, [item.key]: "" }))}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedFeatures[item.key as keyof typeof selectedFeatures] === ""
                            ? "bg-gray-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        平
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAnalyze}
                className="w-full mt-4 py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xl font-medium"
              >
                面相分析
              </button>
            </div>

            {analysisResult.length > 0 && (
              <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/60 rounded-xl p-4 border border-rose-800/30">
                <h3 className="text-sm font-bold text-rose-300 mb-3">分析结果</h3>
                <div className="space-y-2">
                  {analysisResult.map((result, idx) => (
                    <div key={idx} className="text-sm text-rose-100/80">
                      • {result}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "wuguan" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3">五官详解</h3>
              <div className="space-y-3">
                {WU_GUAN.map((guan) => (
                  <div key={guan.name} className="bg-gray-50 rounded-xl p-3">
                    <div className="font-bold text-gray-800 mb-1">{guan.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{guan.description}</div>
                    <div className="flex flex-wrap gap-1">
                      {guan.characteristics.map((char, idx) => (
                        <span key={idx} className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "xingzhuang" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3">面部形状</h3>
              <div className="grid grid-cols-1 gap-3">
                {MIAN_BU_XING_ZHUANG.map((xing) => (
                  <div key={xing.name} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">{xing.name}</span>
                      <span className={`text-xs font-medium ${getWuxingColor(xing.wuxing)}`}>
                        {xing.wuxing}形
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{xing.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "qise" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3">气色判断</h3>
              <div className="grid grid-cols-1 gap-3">
                {QI_SE.map((se) => (
                  <div key={se.color} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${getQiseBg(se.color)}`}></div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">{se.color}</div>
                        <div className="text-sm text-gray-600">{se.meaning}</div>
                        <div className="text-xs text-gray-500 mt-1">主见于：{se.location.join("、")}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "guji" && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-rose-200 mb-1">经典理论依据</h3>
                <p className="text-sm text-rose-200/60 leading-relaxed">
                  面相学源于《麻衣相法》《柳庄相法》等经典著作，通过观察面部特征来推断性格、命运和健康状况。
                </p>
              </div>
            </div>

            {Object.values(MIAN_XIANG_DUAN_YU).map((duanyu: any) => (
              <div key={duanyu.name} className="bg-gradient-to-br from-rose-500/10 to-red-500/10 border border-rose-500/30 rounded-xl p-4">
                <div className="text-sm font-bold text-rose-400 mb-2">{duanyu.name}</div>
                <div className="text-gray-200 text-sm leading-relaxed">{duanyu.content}</div>
                <div className="text-xs text-rose-400/60 mt-2 text-right">{duanyu.origin}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}