"use client"

import { useState } from "react"
import { ChevronLeft, Search, Info, Zap, Clock } from "lucide-react"
import { HumanBody3D, ALL_ACUPOINTS, MERIDIAN_COLORS } from "@/components/tcm/human-body-3d"
import { SHICHEN_JINGLUO, getCurrentShichen } from "@/lib/meridian-data"

// 经络列表
const MERIDIANS = [
  { id: "all", name: "全部", count: ALL_ACUPOINTS.length },
  { id: "督脉", name: "督脉", count: ALL_ACUPOINTS.filter(p => p.meridian === "督脉").length },
  { id: "任脉", name: "任脉", count: ALL_ACUPOINTS.filter(p => p.meridian === "任脉").length },
  { id: "胆经", name: "胆经", count: ALL_ACUPOINTS.filter(p => p.meridian === "胆经").length },
  { id: "肝经", name: "肝经", count: ALL_ACUPOINTS.filter(p => p.meridian === "肝经").length },
  { id: "肺经", name: "肺经", count: ALL_ACUPOINTS.filter(p => p.meridian === "肺经").length },
  { id: "大肠经", name: "大肠经", count: ALL_ACUPOINTS.filter(p => p.meridian === "大肠经").length },
  { id: "胃经", name: "胃经", count: ALL_ACUPOINTS.filter(p => p.meridian === "胃经").length },
  { id: "脾经", name: "脾经", count: ALL_ACUPOINTS.filter(p => p.meridian === "脾经").length },
  { id: "心经", name: "心经", count: ALL_ACUPOINTS.filter(p => p.meridian === "心经").length },
  { id: "心包经", name: "心包经", count: ALL_ACUPOINTS.filter(p => p.meridian === "心包经").length },
  { id: "膀胱经", name: "膀胱经", count: ALL_ACUPOINTS.filter(p => p.meridian === "膀胱经").length },
  { id: "肾经", name: "肾经", count: ALL_ACUPOINTS.filter(p => p.meridian === "肾经").length },
  { id: "小肠经", name: "小肠经", count: ALL_ACUPOINTS.filter(p => p.meridian === "小肠经").length },
  { id: "三焦经", name: "三焦经", count: ALL_ACUPOINTS.filter(p => p.meridian === "三焦经").length },
  { id: "董氏奇穴", name: "董氏奇穴", count: ALL_ACUPOINTS.filter(p => p.meridian === "董氏奇穴").length },
  { id: "经外奇穴", name: "经外奇穴", count: ALL_ACUPOINTS.filter(p => p.meridian === "经外奇穴").length },
]

interface JingluoPageProps {
  onBack?: () => void
}

export function JingluoPage({ onBack }: JingluoPageProps) {
  const [selectedMeridian, setSelectedMeridian] = useState<string | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<typeof ALL_ACUPOINTS[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showPointList, setShowPointList] = useState(false)
  
  const currentShichen = getCurrentShichen()
  
  // 过滤穴位
  const filteredPoints = ALL_ACUPOINTS.filter(point => {
    const matchMeridian = !selectedMeridian || selectedMeridian === "all" || point.meridian === selectedMeridian
    const matchSearch = !searchQuery || 
      point.name.includes(searchQuery) || 
      point.meridian.includes(searchQuery) ||
      point.effect.includes(searchQuery)
    return matchMeridian && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-20 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#4a4a4a]">
        <div className="flex items-center gap-3 px-4 py-3">
          {onBack && (
            <button onClick={onBack} className="text-[#e5e5e5]">
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-[#f5f5f5] font-bold text-lg flex-1">经络穴位</h1>
          <button 
            onClick={() => setShowPointList(!showPointList)}
            className="px-3 py-1.5 bg-[#252525] text-[#d4af37] text-sm rounded-lg border border-[#4a4a4a]"
          >
            {showPointList ? "3D视图" : "列表"}
          </button>
        </div>
        
        {/* 搜索栏 */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 bg-[#252525] rounded-xl px-3 py-2.5 border border-[#4a4a4a]">
            <Search className="w-4 h-4 text-[#888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索穴位名称、经络、功效..."
              className="flex-1 bg-transparent text-[#f5f5f5] text-sm placeholder:text-[#888] outline-none"
            />
          </div>
        </div>
        
        {/* 经络选择 */}
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {MERIDIANS.filter(m => m.count > 0).map(meridian => (
              <button
                key={meridian.id}
                onClick={() => setSelectedMeridian(meridian.id === "all" ? null : meridian.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  (meridian.id === "all" && !selectedMeridian) || selectedMeridian === meridian.id
                    ? "text-[#1a1a1a]"
                    : "bg-[#252525] text-[#c5c5c5] border border-[#4a4a4a]"
                }`}
                style={{
                  backgroundColor: (meridian.id === "all" && !selectedMeridian) || selectedMeridian === meridian.id
                    ? (MERIDIAN_COLORS[meridian.id] || "#d4af37")
                    : undefined
                }}
              >
                {meridian.name}
                <span className="opacity-70">({meridian.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 当前时辰提示 */}
      <div className="px-4 py-3">
        <div className="bg-gradient-to-r from-[#d4af37]/20 to-[#c8102e]/20 rounded-xl p-3 border border-[#d4af37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[#d4af37] font-bold">{currentShichen.shichen}</span>
                <span className="text-[#c5c5c5] text-sm">({currentShichen.time})</span>
              </div>
              <div className="text-[#e5e5e5] text-sm mt-0.5">
                <span className="font-medium">{currentShichen.jingluo}</span>当令 · {currentShichen.yangsheng}
              </div>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#4a4a4a]/50 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[#c5c5c5] text-xs">推荐开穴：{currentShichen.kaoxue}</span>
          </div>
        </div>
      </div>
      
      {/* 主体内容 */}
      {showPointList ? (
        /* 穴位列表视图 */
        <div className="px-4 pb-24">
          <div className="text-[#888] text-xs mb-2">
            共 {filteredPoints.length} 个穴位
          </div>
          <div className="space-y-2">
            {filteredPoints.map(point => (
              <button
                key={point.id}
                onClick={() => setSelectedPoint(point)}
                className={`w-full bg-[#252525] rounded-xl p-3 border transition-all text-left ${
                  selectedPoint?.id === point.id
                    ? "border-[#d4af37]"
                    : "border-[#4a4a4a]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[#1a1a1a] font-bold"
                    style={{ backgroundColor: MERIDIAN_COLORS[point.meridian] || "#d4af37" }}
                  >
                    {point.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[#f5f5f5] font-medium">{point.name}</span>
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: `${MERIDIAN_COLORS[point.meridian]}20`,
                          color: MERIDIAN_COLORS[point.meridian]
                        }}
                      >
                        {point.meridian}
                      </span>
                    </div>
                    <div className="text-[#c5c5c5] text-sm mt-0.5 truncate">{point.effect}</div>
                  </div>
                  <Info className="w-4 h-4 text-[#888]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* 3D人体模型视图 */
        <div className="px-4 pb-24">
          <HumanBody3D
            selectedMeridian={selectedMeridian}
            onSelectPoint={setSelectedPoint}
            height="450px"
          />
          
          {/* 穴位快捷列表 */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#c5c5c5] text-sm font-medium">
                {selectedMeridian ? `${selectedMeridian}穴位` : "常用穴位"}
              </span>
              <span className="text-[#888] text-xs">{filteredPoints.length}个</span>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {filteredPoints.slice(0, 10).map(point => (
                <button
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm transition-all ${
                    selectedPoint?.id === point.id
                      ? "bg-[#d4af37] text-[#1a1a1a] font-medium"
                      : "bg-[#252525] text-[#e5e5e5] border border-[#4a4a4a]"
                  }`}
                >
                  {point.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* 穴位详情弹窗 */}
      {selectedPoint && showPointList && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
          <div className="w-full bg-[#1a1a1a] rounded-t-3xl max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1a1a1a] px-4 py-4 border-b border-[#4a4a4a] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-[#1a1a1a]"
                  style={{ backgroundColor: MERIDIAN_COLORS[selectedPoint.meridian] || "#d4af37" }}
                >
                  {selectedPoint.name}
                </div>
                <div>
                  <h3 className="text-[#f5f5f5] font-bold text-lg">{selectedPoint.name}</h3>
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: `${MERIDIAN_COLORS[selectedPoint.meridian]}20`,
                      color: MERIDIAN_COLORS[selectedPoint.meridian]
                    }}
                  >
                    {selectedPoint.meridian}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPoint(null)}
                className="text-[#888] hover:text-[#f5f5f5] transition-colors text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="bg-[#252525] rounded-xl p-4 border border-[#4a4a4a]">
                <h4 className="text-[#d4af37] text-sm font-medium mb-2">主要功效</h4>
                <p className="text-[#e5e5e5] leading-relaxed">{selectedPoint.effect}</p>
              </div>
              
              <div className="bg-[#252525] rounded-xl p-4 border border-[#4a4a4a]">
                <h4 className="text-[#d4af37] text-sm font-medium mb-2">定位取穴</h4>
                <p className="text-[#c5c5c5] text-sm leading-relaxed">
                  请参考3D人体模型中的穴位标记位置，结合传统取穴方法准确定位。
                </p>
              </div>
              
              <div className="bg-[#252525] rounded-xl p-4 border border-[#4a4a4a]">
                <h4 className="text-[#d4af37] text-sm font-medium mb-2">临床应用</h4>
                <p className="text-[#c5c5c5] text-sm leading-relaxed">
                  {selectedPoint.meridian}穴位"{selectedPoint.name}"常用于{selectedPoint.effect}相关病症的治疗。
                  具体应用需结合辨证论治，建议在专业人士指导下进行。
                </p>
              </div>
              
              <button className="w-full py-3 bg-[#d4af37] text-[#1a1a1a] font-medium rounded-xl">
                收藏此穴位
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
