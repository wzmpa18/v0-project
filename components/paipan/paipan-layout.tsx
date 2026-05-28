"use client"

import { useState, useCallback } from "react"
import { ChevronLeft, Settings, HelpCircle, ThumbsUp, ThumbsDown, X, ChevronRight, BookOpen, FileText, Copy, Share2 } from "lucide-react"

// 显示模式类型
export type DisplayMode = "simple" | "normal" | "detailed"

// 通用排盘页面Props
interface PaipanLayoutProps {
  title: string
  onBack: () => void
  children: React.ReactNode
  duanyu?: string[]
  onAIAnalysis?: () => void
  showModeSwitch?: boolean
  currentMode?: DisplayMode
  onModeChange?: (mode: DisplayMode) => void
}

// 显示模式配置
const DISPLAY_MODES = [
  { id: "simple" as DisplayMode, name: "简洁", desc: "核心结果" },
  { id: "normal" as DisplayMode, name: "普通", desc: "结果+断语" },
  { id: "detailed" as DisplayMode, name: "详细", desc: "完整详解" },
]

// 断语反馈类型
interface DuanyuFeedback {
  id: string
  useful: boolean | null
}

export function PaipanLayout({
  title,
  onBack,
  children,
  duanyu = [],
  onAIAnalysis,
  showModeSwitch = true,
  currentMode = "normal",
  onModeChange,
}: PaipanLayoutProps) {
  const [showDuanyu, setShowDuanyu] = useState(false)
  const [showModePanel, setShowModePanel] = useState(false)
  const [feedbacks, setFeedbacks] = useState<Record<string, boolean | null>>({})

  const handleFeedback = (index: number, useful: boolean) => {
    setFeedbacks(prev => ({
      ...prev,
      [index]: prev[index] === useful ? null : useful
    }))
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
      {/* 顶部导航 */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-[#3a3a3a] bg-[#1a1a1a]">
        <button onClick={onBack} className="flex items-center gap-1 text-[#d4af37]">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <h1 className="text-[#f5f5f7] font-medium">{title}</h1>
        <div className="flex items-center gap-2">
          {showModeSwitch && (
            <button 
              onClick={() => setShowModePanel(!showModePanel)}
              className="p-2 rounded-lg bg-[#252525] border border-[#3a3a3a]"
            >
              <Settings className="w-4 h-4 text-[#888]" />
            </button>
          )}
        </div>
      </div>

      {/* 显示模式切换面板 */}
      {showModePanel && (
        <div className="absolute top-14 right-4 z-50 bg-[#252525] rounded-xl border border-[#3a3a3a] shadow-xl overflow-hidden">
          <div className="px-3 py-2 border-b border-[#3a3a3a]">
            <span className="text-[#888] text-xs">显示模式</span>
          </div>
          {DISPLAY_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                onModeChange?.(mode.id)
                setShowModePanel(false)
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 hover:bg-[#2a2a2a] transition-colors ${
                currentMode === mode.id ? "bg-[#2a2a2a]" : ""
              }`}
            >
              <div>
                <div className={`text-sm ${currentMode === mode.id ? "text-[#d4af37]" : "text-[#f5f5f7]"}`}>
                  {mode.name}
                </div>
                <div className="text-[#666] text-[10px]">{mode.desc}</div>
              </div>
              {currentMode === mode.id && (
                <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* 主内容区域 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {children}
      </div>

      {/* 底部断语/笔记按钮 */}
      {duanyu.length > 0 && (
        <button
          onClick={() => setShowDuanyu(true)}
          className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg z-40"
        >
          <FileText className="w-5 h-5 text-[#1a1a1a]" />
        </button>
      )}

      {/* AI分析按钮 */}
      {onAIAnalysis && (
        <button
          onClick={onAIAnalysis}
          className="fixed bottom-20 right-20 w-12 h-12 rounded-full bg-[#4a90d9] flex items-center justify-center shadow-lg z-40"
        >
          <span className="text-white text-xs font-bold">AI</span>
        </button>
      )}

      {/* 断语半窗弹出 */}
      {showDuanyu && (
        <div className="fixed inset-0 z-50">
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDuanyu(false)}
          />
          
          {/* 半窗内容 */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[60vh] bg-[#1e1e1e] rounded-t-3xl border-t border-[#3a3a3a] overflow-hidden">
            {/* 拖动条 */}
            <div className="flex justify-center py-2">
              <div className="w-10 h-1 bg-[#555] rounded-full" />
            </div>

            {/* 标题栏 */}
            <div className="flex items-center justify-between px-4 pb-3 border-b border-[#3a3a3a]">
              <h3 className="text-[#f5f5f7] font-medium">断语解读</h3>
              <button onClick={() => setShowDuanyu(false)}>
                <X className="w-5 h-5 text-[#888]" />
              </button>
            </div>

            {/* 断语列表 */}
            <div className="overflow-y-auto max-h-[calc(60vh-80px)] p-4 space-y-3">
              {duanyu.map((item, index) => (
                <div key={index} className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]">
                  <p className="text-[#c5c5c5] text-sm leading-relaxed">{item}</p>
                  
                  {/* 反馈按钮 */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#333]">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleFeedback(index, true)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                          feedbacks[index] === true 
                            ? "bg-[#4a9d5c]/20 text-[#4a9d5c]" 
                            : "bg-[#333] text-[#888] hover:text-[#4a9d5c]"
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="text-xs">有用</span>
                      </button>
                      <button
                        onClick={() => handleFeedback(index, false)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                          feedbacks[index] === false 
                            ? "bg-[#c8102e]/20 text-[#c8102e]" 
                            : "bg-[#333] text-[#888] hover:text-[#c8102e]"
                        }`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span className="text-xs">无用</span>
                      </button>
                    </div>
                    <button className="p-1.5 rounded-lg bg-[#333] text-[#888] hover:text-[#d4af37]">
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 详情弹窗组件（双击/长按时显示）
interface DetailPopupProps {
  visible: boolean
  onClose: () => void
  title: string
  data: {
    canggan?: string[]
    angan?: string[]
    shishen?: string
    changsheng?: string
    shensha?: string[]
    kongwang?: string
    nayin?: string
    duanyu?: string[]
  }
  onViewTheory?: () => void
}

export function DetailPopup({ visible, onClose, title, data, onViewTheory }: DetailPopupProps) {
  const [activeTab, setActiveTab] = useState<string>("canggan")

  if (!visible) return null

  const tabs = [
    { id: "canggan", label: "藏干" },
    { id: "shishen", label: "十神" },
    { id: "changsheng", label: "长生" },
    { id: "shensha", label: "神煞" },
    { id: "kongwang", label: "空亡" },
    { id: "nayin", label: "纳音" },
  ]

  return (
    <div className="fixed inset-0 z-50">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* 半窗内容 */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] bg-[#1e1e1e] rounded-t-3xl border-t border-[#3a3a3a] overflow-hidden">
        {/* 拖动条 */}
        <div className="flex justify-center py-2">
          <div className="w-10 h-1 bg-[#555] rounded-full" />
        </div>

        {/* 标题栏 */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-[#3a3a3a]">
          <h3 className="text-[#f5f5f7] font-medium">{title} 详解</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-[#888]" />
          </button>
        </div>

        {/* Tab切换 */}
        <div className="flex overflow-x-auto px-4 py-2 gap-2 border-b border-[#333]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[#d4af37] text-[#1a1a1a]"
                  : "bg-[#333] text-[#888]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 内容区域 */}
        <div className="overflow-y-auto max-h-[calc(70vh-140px)] p-4">
          {activeTab === "canggan" && (
            <div className="space-y-2">
              <div className="text-[#888] text-xs mb-2">藏干</div>
              {data.canggan?.map((gan, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#252525] rounded-xl">
                  <span className="text-[#f5f5f7]">{gan}</span>
                  <HelpCircle className="w-4 h-4 text-[#666]" />
                </div>
              )) || <div className="text-[#666] text-sm">暂无数据</div>}
              
              {data.angan && data.angan.length > 0 && (
                <>
                  <div className="text-[#888] text-xs mt-4 mb-2">暗干</div>
                  {data.angan.map((gan, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#252525] rounded-xl">
                      <span className="text-[#f5f5f7]">{gan}</span>
                      <HelpCircle className="w-4 h-4 text-[#666]" />
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {activeTab === "shishen" && (
            <div className="p-4 bg-[#252525] rounded-xl">
              <div className="text-[#d4af37] text-lg font-medium mb-2">{data.shishen || "正印"}</div>
              <p className="text-[#888] text-sm leading-relaxed">
                {data.shishen === "正印" ? "代表学业、文书、长辈、母亲。主聪明好学，文雅端庄。" : "代表特定的六亲关系和性格特征。"}
              </p>
            </div>
          )}

          {activeTab === "changsheng" && (
            <div className="p-4 bg-[#252525] rounded-xl">
              <div className="text-[#d4af37] text-lg font-medium mb-2">{data.changsheng || "长生"}</div>
              <p className="text-[#888] text-sm leading-relaxed">
                十二长生之一，代表五行在不同地支的状态强弱。
              </p>
            </div>
          )}

          {activeTab === "shensha" && (
            <div className="space-y-2">
              {data.shensha?.map((sha, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#252525] rounded-xl">
                  <span className="text-[#f5f5f7]">{sha}</span>
                  <HelpCircle className="w-4 h-4 text-[#666]" />
                </div>
              )) || <div className="text-[#666] text-sm">暂无神煞</div>}
            </div>
          )}

          {activeTab === "kongwang" && (
            <div className="p-4 bg-[#252525] rounded-xl">
              <div className="text-[#d4af37] text-lg font-medium mb-2">{data.kongwang || "无"}</div>
              <p className="text-[#888] text-sm leading-relaxed">
                空亡代表该宫位或地支的气场暂时被遮蔽，需要结合具体情况分析。
              </p>
            </div>
          )}

          {activeTab === "nayin" && (
            <div className="p-4 bg-[#252525] rounded-xl">
              <div className="text-[#d4af37] text-lg font-medium mb-2">{data.nayin || "海中金"}</div>
              <p className="text-[#888] text-sm leading-relaxed">
                纳音五行是干支组合的五行属性，用于判断命主的本质特征。
              </p>
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="p-4 border-t border-[#333]">
          <button
            onClick={onViewTheory}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-medium"
          >
            <BookOpen className="w-4 h-4" />
            查看详细理论
          </button>
        </div>
      </div>
    </div>
  )
}

// 导出工具函数
export function useLongPress(callback: () => void, ms = 500) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const start = useCallback(() => {
    const t = setTimeout(callback, ms)
    setTimer(t)
  }, [callback, ms])

  const stop = useCallback(() => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
  }, [timer])

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  }
}
