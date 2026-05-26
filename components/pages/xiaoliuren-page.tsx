"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, BookOpen, RotateCcw } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"
import { XIAO_LIU_REN, XIAO_LIU_REN_DUAN_YU, calculateXiaoLiuRen } from "@/lib/xiaoliuren-data"

interface XiaoLiuRenPageProps {
  onBack: () => void
}

// 六神颜色
const SHEN_COLORS: Record<string, string> = {
  "大安": "bg-green-600",
  "留连": "bg-gray-700",
  "速喜": "bg-red-600",
  "赤口": "bg-amber-500",
  "小吉": "bg-emerald-500",
  "空亡": "bg-slate-600",
}

const SHEN_TEXT_COLORS: Record<string, string> = {
  "大安": "text-green-600",
  "留连": "text-gray-500",
  "速喜": "text-red-600",
  "赤口": "text-amber-600",
  "小吉": "text-emerald-600",
  "空亡": "text-slate-500",
}

export function XiaoLiuRenPage({ onBack }: XiaoLiuRenPageProps) {
  const [activeTab, setActiveTab] = useState<"result" | "detail" | "guji">("result")
  const [customTime, setCustomTime] = useState<Date | null>(null)
  
  // 当前时间或自定义时间
  const currentTime = customTime || new Date()
  const lunar = useMemo(() => {
    const solar = Solar.fromDate(currentTime)
    return solar.getLunar()
  }, [currentTime])
  
  // 计算小六壬结果
  const result = useMemo(() => {
    const month = lunar.getMonth()
    const day = lunar.getDay()
    const hour = Math.floor(currentTime.getHours() / 2) // 转换为时辰
    return calculateXiaoLiuRen(month, day, hour)
  }, [lunar, currentTime])
  
  // 重新起卦
  const resetGua = () => {
    setCustomTime(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <span className="font-bold text-gray-800">小六壬</span>
        <button onClick={resetGua} className="p-1">
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* 时间信息 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">农历时间</span>
          <span className="text-gray-800 font-medium">
            {lunar.getMonthInChinese()}月{lunar.getDayInChinese()} {["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"][Math.floor(currentTime.getHours() / 2)]}时
          </span>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-500">公历时间</span>
          <span className="text-gray-800">
            {currentTime.getFullYear()}年{currentTime.getMonth() + 1}月{currentTime.getDate()}日 {currentTime.getHours()}:{String(currentTime.getMinutes()).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* 起卦过程 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
        <div className="text-sm text-gray-500 mb-3">起卦过程</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600">1</span>
            <span className="text-gray-700">{result.process.monthStep}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600">2</span>
            <span className="text-gray-700">{result.process.dayStep}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600">3</span>
            <span className="text-gray-700">{result.process.hourStep}</span>
          </div>
        </div>
      </div>

      {/* 卦象结果 */}
      <div className={`mx-4 mt-4 rounded-xl p-6 shadow-sm text-white ${SHEN_COLORS[result.finalGua.name]}`}>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{result.finalGua.name}</div>
          <div className="text-white/80 text-sm">{result.finalGua.jixiong === "吉" ? "吉卦" : "凶卦"} | {result.finalGua.wuxing} | {result.finalGua.direction}</div>
          <div className="mt-4 text-sm leading-relaxed opacity-90">{result.finalGua.summary}</div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="flex bg-white mx-4 mt-4 rounded-xl overflow-hidden shadow-sm">
        {[
          { id: "result", label: "占断详解" },
          { id: "detail", label: "六神总览" },
          { id: "guji", label: "古籍参考" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 pb-24">
        {activeTab === "result" && (
          <div className="space-y-4">
            {/* 占诗 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">占诗</div>
              <div className="text-gray-800 leading-relaxed text-sm">{result.finalGua.poem}</div>
            </div>

            {/* 分类占断 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-3">分类占断</div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(result.finalGua.details).map(([category, content]) => (
                  <div key={category} className="bg-gray-50 rounded-lg p-3">
                    <div className={`text-xs font-medium mb-1 ${SHEN_TEXT_COLORS[result.finalGua.name]}`}>{category}</div>
                    <div className="text-gray-700 text-sm">{content}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 基本属性 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-3">基本属性</div>
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                <div>
                  <div className="text-gray-400 text-xs">五行</div>
                  <div className="text-gray-800 font-medium">{result.finalGua.wuxing}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">阴阳</div>
                  <div className="text-gray-800 font-medium">{result.finalGua.yinYang}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">方位</div>
                  <div className="text-gray-800 font-medium">{result.finalGua.direction}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">神煞</div>
                  <div className="text-gray-800 font-medium">{result.finalGua.shenshen}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "detail" && (
          <div className="space-y-3">
            {XIAO_LIU_REN.map((shen, index) => (
              <div 
                key={shen.name} 
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
                  result.finalGua.name === shen.name ? "border-amber-500" : "border-transparent"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${SHEN_COLORS[shen.name]}`}>
                      {index + 1}
                    </span>
                    <span className="text-gray-800 font-bold">{shen.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${shen.jixiong === "吉" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                      {shen.jixiong}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs">{shen.wuxing} | {shen.direction}</span>
                </div>
                <div className="text-gray-600 text-sm leading-relaxed">{shen.summary}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "guji" && (
          <div className="space-y-4">
            {Object.entries(XIAO_LIU_REN_DUAN_YU).map(([title, content]) => (
              <div key={title} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-gray-800">{title}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-800 text-sm">【原文】{content.原文}</div>
                  <div className="text-gray-600 text-sm">【译文】{content.译文}</div>
                  <div className="text-gray-400 text-xs mt-2">——{content.出处}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
