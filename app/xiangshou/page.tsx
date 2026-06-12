"use client"

import { useState } from "react"
import { Hand, BookOpen } from "lucide-react"
import { SAN_DA_ZHU_XIAN, FU_ZHU_XIAN_WEN, SHOU_ZHANG_XING_ZHUANG, SHOU_ZHI_TE_ZHENG, SHOU_XIANG_DUAN_YU, analyzeShouXiang } from "@/lib/xiangshou-data"

export default function XiangshouPage() {
  const [activeTab, setActiveTab] = useState<"zhuxian" | "fuzhu" | "shouzhang" | "shouzhi" | "guji">("zhuxian")
  const [selectedFeatures, setSelectedFeatures] = useState({
    shengMingXian: "",
    zhiHuiXian: "",
    ganQingXian: "",
    shiYeXian: ""
  })
  const [analysisResult, setAnalysisResult] = useState<string[]>([])

  const handleAnalyze = () => {
    const result = analyzeShouXiang(selectedFeatures)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16]">
      <div className="sticky top-0 z-10 bg-[#1a1410]/90 backdrop-blur border-b border-lime-800/30 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-lime-700 flex items-center justify-center">
            <Hand className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">手相学</h1>
            <p className="text-xs text-lime-200/60">掌纹解读 · 命运密码</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-lime-800/30 bg-[#1a1410]/90 backdrop-blur overflow-x-auto">
        {[
          { id: "zhuxian", label: "三大主线" },
          { id: "fuzhu", label: "辅助线纹" },
          { id: "shouzhang", label: "掌形" },
          { id: "shouzhi", label: "手指" },
          { id: "guji", label: "古籍" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-lime-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 pb-24 space-y-4">
        {activeTab === "zhuxian" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-lime-900/40 to-lime-950/60 rounded-xl p-4 border border-lime-800/30">
              <h2 className="text-sm font-bold text-lime-300 mb-3">三大主线</h2>
              <div className="space-y-3">
                {SAN_DA_ZHU_XIAN.map((xian) => (
                  <div key={xian.name} className="bg-lime-800/30 rounded-lg p-3">
                    <div className="font-medium text-lime-200 mb-1">{xian.name}</div>
                    <div className="text-xs text-lime-100/80 mb-2">{xian.description}</div>
                    <div className="flex flex-wrap gap-1">
                      {xian.characteristics.map((char, idx) => (
                        <span key={idx} className="text-xs bg-lime-700/50 text-lime-200 px-2 py-0.5 rounded">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3">手相自测</h3>
              <div className="space-y-3">
                {[
                  { key: "shengMingXian", label: "生命线" },
                  { key: "zhiHuiXian", label: "智慧线" },
                  { key: "ganQingXian", label: "感情线" },
                  { key: "shiYeXian", label: "事业线" }
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-20">{item.label}</span>
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
                className="w-full mt-4 py-3 bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-xl font-medium"
              >
                手相分析
              </button>
            </div>

            {analysisResult.length > 0 && (
              <div className="bg-gradient-to-br from-lime-900/40 to-lime-950/60 rounded-xl p-4 border border-lime-800/30">
                <h3 className="text-sm font-bold text-lime-300 mb-3">分析结果</h3>
                <div className="space-y-2">
                  {analysisResult.map((result, idx) => (
                    <div key={idx} className="text-sm text-lime-100/80">
                      • {result}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "fuzhu" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3">辅助线纹</h3>
              <div className="grid grid-cols-1 gap-3">
                {FU_ZHU_XIAN_WEN.map((wen) => (
                  <div key={wen.name} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">{wen.name}</span>
                      <span className="text-xs text-gray-500">{wen.position}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{wen.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "shouzhang" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3">手掌形状</h3>
              <div className="grid grid-cols-1 gap-3">
                {SHOU_ZHANG_XING_ZHUANG.map((zhang) => (
                  <div key={zhang.name} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">{zhang.name}</span>
                      <span className={`text-xs font-medium ${getWuxingColor(zhang.wuxing)}`}>
                        {zhang.wuxing}形
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{zhang.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "shouzhi" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3">手指特征</h3>
              <div className="grid grid-cols-1 gap-3">
                {SHOU_ZHI_TE_ZHENG.map((zhi) => (
                  <div key={zhi.name} className="bg-gray-50 rounded-xl p-3">
                    <div className="font-bold text-gray-800 mb-1">{zhi.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{zhi.meaning}</div>
                    <div className="flex gap-2">
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
                        吉：{zhi.goodSign}
                      </span>
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                        凶：{zhi.badSign}
                      </span>
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
              <BookOpen className="w-5 h-5 text-lime-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lime-200 mb-1">经典理论依据</h3>
                <p className="text-sm text-lime-200/60 leading-relaxed">
                  手相学通过观察手掌的纹路、形状和颜色来推断一个人的性格、健康和命运。
                </p>
              </div>
            </div>

            {Object.values(SHOU_XIANG_DUAN_YU).map((duanyu: any) => (
              <div key={duanyu.name} className="bg-gradient-to-br from-lime-500/10 to-green-500/10 border border-lime-500/30 rounded-xl p-4">
                <div className="text-sm font-bold text-lime-400 mb-2">{duanyu.name}</div>
                <div className="text-gray-200 text-sm leading-relaxed">{duanyu.content}</div>
                <div className="text-xs text-lime-400/60 mt-2 text-right">{duanyu.origin}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}