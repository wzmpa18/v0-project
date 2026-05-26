"use client"

import { useState } from "react"
import { ChevronLeft, Compass } from "lucide-react"
import { 
  JIU_XING, SHAN_XIANG, SAN_YUAN_JIU_YUN, XUAN_KONG_DUANYU,
  FANG_WEI_NAMES, calcFeiXingPan, getCurrentYunXing
} from "@/lib/xuankong-data"

interface XuanKongPageProps {
  onBack: () => void
}

export function XuanKongPage({ onBack }: XuanKongPageProps) {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const [shanXiang, setShanXiang] = useState("子山午向")
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"pan" | "detail" | "guji">("pan")
  
  // 排盘计算
  const calculate = () => {
    const yunXing = getCurrentYunXing(year)
    const yunPan = calcFeiXingPan(yunXing, true)
    const yunInfo = SAN_YUAN_JIU_YUN[yunXing as keyof typeof SAN_YUAN_JIU_YUN]
    
    setResult({
      yunXing,
      yunPan,
      yunInfo,
      shanXiang,
    })
  }

  const getStarColor = (star: number) => {
    const info = JIU_XING[star as keyof typeof JIU_XING]
    if (info.nature === "大吉") return "text-green-600"
    if (info.nature === "吉") return "text-blue-600"
    if (info.nature === "大凶") return "text-red-600"
    return "text-orange-600"
  }

  const getStarBg = (star: number) => {
    const info = JIU_XING[star as keyof typeof JIU_XING]
    if (info.nature === "大吉") return "bg-green-50 border-green-200"
    if (info.nature === "吉") return "bg-blue-50 border-blue-200"
    if (info.nature === "大凶") return "bg-red-50 border-red-200"
    return "bg-orange-50 border-orange-200"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <div className="bg-[#1a1a1a] text-white px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-medium">玄空飞星</span>
        <div className="w-6" />
      </div>
      
      {/* 输入表单 */}
      <div className="p-4 space-y-4">
        {/* 年份 */}
        <div className="flex items-center justify-between py-3 border-b">
          <span className="text-gray-800 font-medium">建造年份</span>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value) || currentYear)}
            className="text-right text-gray-800 font-medium w-24 outline-none"
          />
        </div>
        
        {/* 山向 */}
        <div className="py-3 border-b">
          <span className="text-gray-800 font-medium mb-2 block">山向</span>
          <select
            value={shanXiang}
            onChange={(e) => setShanXiang(e.target.value)}
            className="w-full py-2 px-3 border rounded-lg text-gray-800 font-medium"
          >
            {Object.keys(SHAN_XIANG).map((sx) => (
              <option key={sx} value={sx}>{sx}</option>
            ))}
          </select>
        </div>
        
        {/* 排盘按钮 */}
        <button
          onClick={calculate}
          className="w-full py-4 bg-[#c8102e] text-white rounded-xl font-medium text-lg flex items-center justify-center gap-2"
        >
          <Compass className="w-5 h-5" />
          开始排盘
        </button>
      </div>
      
      {/* 结果显示 */}
      {result && (
        <div className="border-t">
          {/* Tab切换 */}
          <div className="flex border-b bg-[#1a1a1a]">
            {[
              { id: "pan", label: "飞星盘" },
              { id: "detail", label: "方位详解" },
              { id: "guji", label: "古籍断语" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? "text-[#22c55e] border-b-2 border-[#22c55e]"
                    : "text-gray-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* 飞星盘 */}
          {activeTab === "pan" && (
            <div className="p-4">
              {/* 运星信息 */}
              <div className="bg-[#fffef0] border border-[#d4af37]/30 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">当前元运</div>
                    <div className="text-xl font-bold text-[#d4af37]">
                      {result.yunInfo.yuan}{result.yunInfo.yun}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">运星</div>
                    <div className="text-xl font-bold text-[#d4af37]">
                      {JIU_XING[result.yunXing as keyof typeof JIU_XING].name}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 mt-2">
                  年份范围：{result.yunInfo.years}
                </div>
              </div>
              
              {/* 九宫飞星盘 */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { pos: "东南", row: 0, col: 0 },
                  { pos: "南", row: 0, col: 1 },
                  { pos: "西南", row: 0, col: 2 },
                  { pos: "东", row: 1, col: 0 },
                  { pos: "中宫", row: 1, col: 1 },
                  { pos: "西", row: 1, col: 2 },
                  { pos: "东北", row: 2, col: 0 },
                  { pos: "北", row: 2, col: 1 },
                  { pos: "西北", row: 2, col: 2 },
                ].map((item, i) => {
                  const star = result.yunPan[item.row][item.col]
                  const starInfo = JIU_XING[star as keyof typeof JIU_XING]
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg p-2 flex flex-col items-center justify-center border ${getStarBg(star)}`}
                    >
                      <div className="text-xs text-gray-600">{item.pos}</div>
                      <div className={`text-2xl font-bold ${getStarColor(star)}`}>
                        {star}
                      </div>
                      <div className="text-xs text-gray-700 text-center">
                        {starInfo.name.slice(2)}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* 图例 */}
              <div className="flex justify-center gap-4 mt-4 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-100 border border-green-200 rounded" />
                  <span className="text-gray-700">大吉</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-blue-100 border border-blue-200 rounded" />
                  <span className="text-gray-700">吉</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-orange-100 border border-orange-200 rounded" />
                  <span className="text-gray-700">凶</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-100 border border-red-200 rounded" />
                  <span className="text-gray-700">大凶</span>
                </span>
              </div>
            </div>
          )}
          
          {/* 方位详解 */}
          {activeTab === "detail" && (
            <div className="p-4 space-y-3">
              {[1,2,3,4,5,6,7,8,9].map((star) => {
                const starInfo = JIU_XING[star as keyof typeof JIU_XING]
                return (
                  <div key={star} className={`p-3 rounded-lg border ${getStarBg(star)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`text-lg font-bold ${getStarColor(star)}`}>
                        {starInfo.name}
                      </div>
                      <div className={`text-sm px-2 py-0.5 rounded ${
                        starInfo.nature.includes("吉") 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {starInfo.nature}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">
                      五行：{starInfo.wuxing} | {starInfo.desc}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          
          {/* 古籍断语 */}
          {activeTab === "guji" && (
            <div className="p-4 space-y-4">
              {Object.entries(XUAN_KONG_DUANYU).map(([key, value]) => (
                <div key={key} className="bg-[#fffef0] border border-[#d4af37]/30 rounded-xl p-4">
                  <div className="text-sm text-[#a16207] mb-2 font-medium">{key}</div>
                  <div className="text-gray-800 font-medium">{value.原文}</div>
                  <div className="text-sm text-gray-700 mt-2">【译文】{value.译文}</div>
                  <div className="text-xs text-gray-600 mt-2 text-right">——{value.出处}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
