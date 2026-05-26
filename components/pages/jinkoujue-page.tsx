"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, BookOpen, RotateCcw } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"
import { 
  SHI_ER_SHEN, DI_ZHI_12, TIAN_GAN_10, DI_ZHI_WUXING, TIAN_GAN_WUXING,
  JIN_KOU_JUE_DUAN_YU, ZHAN_DUAN, calculateJinKouJue
} from "@/lib/jinkoujue-data"

interface JinKouJuePageProps {
  onBack: () => void
}

// 五行颜色
const WUXING_COLORS: Record<string, string> = {
  "金": "text-amber-500",
  "木": "text-green-500", 
  "水": "text-blue-500",
  "火": "text-red-500",
  "土": "text-yellow-600",
}

const WUXING_BG: Record<string, string> = {
  "金": "bg-amber-500",
  "木": "bg-green-500", 
  "水": "bg-blue-500",
  "火": "bg-red-500",
  "土": "bg-yellow-600",
}

export function JinKouJuePage({ onBack }: JinKouJuePageProps) {
  const [activeTab, setActiveTab] = useState<"result" | "zhanduan" | "guji">("result")
  
  // 当前时间
  const now = new Date()
  const isDay = now.getHours() >= 6 && now.getHours() < 18
  
  // 农历计算
  const lunar = useMemo(() => {
    const solar = Solar.fromDate(now)
    return solar.getLunar()
  }, [])
  
  const dayGan = lunar.getDayGan()
  const dayZhi = lunar.getDayZhi()
  
  // 计算金口诀
  const result = useMemo(() => {
    return calculateJinKouJue(
      lunar.getYear(), lunar.getMonth(), lunar.getDay(),
      now.getHours(), dayGan, dayZhi, isDay
    )
  }, [lunar, dayGan, dayZhi, isDay])

  // 四位结构显示
  const renderSiWei = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="text-sm text-gray-500 mb-3">四位课体</div>
      <div className="flex flex-col items-center gap-2">
        {/* 人元 */}
        <div className="w-full flex items-center justify-center gap-4">
          <span className="text-gray-500 text-sm w-16">人元</span>
          <div className={`w-16 h-16 rounded-lg ${WUXING_BG[result.siWei.人元.wuxing]} flex items-center justify-center`}>
            <span className="text-white text-2xl font-bold">{result.siWei.人元.gan}</span>
          </div>
          <span className="text-gray-400 text-xs w-16">{result.siWei.人元.wuxing}</span>
        </div>
        {/* 贵神 */}
        <div className="w-full flex items-center justify-center gap-4">
          <span className="text-gray-500 text-sm w-16">贵神</span>
          <div className={`w-16 h-16 rounded-lg ${WUXING_BG[result.siWei.贵神.wuxing]} flex flex-col items-center justify-center`}>
            <span className="text-white text-lg font-bold">{result.siWei.贵神.name}</span>
            <span className="text-white/70 text-xs">{result.siWei.贵神.zhi}</span>
          </div>
          <span className="text-gray-400 text-xs w-16">{result.siWei.贵神.wuxing}</span>
        </div>
        {/* 将神 */}
        <div className="w-full flex items-center justify-center gap-4">
          <span className="text-gray-500 text-sm w-16">将神</span>
          <div className={`w-16 h-16 rounded-lg ${WUXING_BG[result.siWei.将神.wuxing]} flex items-center justify-center`}>
            <span className="text-white text-2xl font-bold">{result.siWei.将神.zhi}</span>
          </div>
          <span className="text-gray-400 text-xs w-16">{result.siWei.将神.wuxing}</span>
        </div>
        {/* 地分 */}
        <div className="w-full flex items-center justify-center gap-4">
          <span className="text-gray-500 text-sm w-16">地分</span>
          <div className={`w-16 h-16 rounded-lg ${WUXING_BG[result.siWei.地分.wuxing]} flex items-center justify-center`}>
            <span className="text-white text-2xl font-bold">{result.siWei.地分.zhi}</span>
          </div>
          <span className="text-gray-400 text-xs w-16">{result.siWei.地分.wuxing}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <span className="font-bold text-gray-800">金口诀</span>
        <div className="w-8" />
      </div>

      {/* 时间信息 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">日干支</span>
          <span className="text-gray-800 font-medium">{dayGan}{dayZhi}日</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-500">时辰</span>
          <span className="text-gray-800">{DI_ZHI_12[Math.floor(now.getHours() / 2)]}时（{isDay ? "昼贵" : "夜贵"}）</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-500">农历</span>
          <span className="text-gray-800">{lunar.getMonthInChinese()}月{lunar.getDayInChinese()}</span>
        </div>
      </div>

      {/* 四位课体 */}
      <div className="mx-4 mt-4">
        {renderSiWei()}
      </div>

      {/* 四位释义 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
        <div className="text-sm text-gray-500 mb-3">四位释义</div>
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="text-amber-600 font-medium w-12">人元</span>
            <span className="text-gray-600">代表自己，问事之主体</span>
          </div>
          <div className="flex gap-2">
            <span className="text-purple-600 font-medium w-12">贵神</span>
            <span className="text-gray-600">代表贵人，长辈，上级</span>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-600 font-medium w-12">将神</span>
            <span className="text-gray-600">代表所问之事，事情本身</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-600 font-medium w-12">地分</span>
            <span className="text-gray-600">代表根基，事情的基础</span>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="flex bg-white mx-4 mt-4 rounded-xl overflow-hidden shadow-sm">
        {[
          { id: "result", label: "生克分析" },
          { id: "zhanduan", label: "分类占断" },
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
            {/* 五行生克分析 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-3">五行生克关系</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">人元 → 贵神</span>
                  <span className={WUXING_COLORS[result.siWei.人元.wuxing]}>
                    {getRelation(result.siWei.人元.wuxing, result.siWei.贵神.wuxing)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">贵神 → 将神</span>
                  <span className={WUXING_COLORS[result.siWei.贵神.wuxing]}>
                    {getRelation(result.siWei.贵神.wuxing, result.siWei.将神.wuxing)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">将神 → 地分</span>
                  <span className={WUXING_COLORS[result.siWei.将神.wuxing]}>
                    {getRelation(result.siWei.将神.wuxing, result.siWei.地分.wuxing)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">地分 → 人元</span>
                  <span className={WUXING_COLORS[result.siWei.地分.wuxing]}>
                    {getRelation(result.siWei.地分.wuxing, result.siWei.人元.wuxing)}
                  </span>
                </div>
              </div>
            </div>

            {/* 课断总论 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-3">课断总论</div>
              <div className="text-gray-700 text-sm leading-relaxed">
                {generateSummary(result)}
              </div>
            </div>
          </div>
        )}

        {activeTab === "zhanduan" && (
          <div className="space-y-4">
            {Object.entries(ZHAN_DUAN).map(([category, items]) => (
              <div key={category} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-sm text-amber-600 font-medium mb-3">{category}</div>
                <div className="space-y-2">
                  {items.map((item, i) => (
                    <div key={i} className="text-gray-700 text-sm pl-2 border-l-2 border-gray-200">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "guji" && (
          <div className="space-y-4">
            {Object.entries(JIN_KOU_JUE_DUAN_YU).map(([title, content]) => (
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

// 获取五行生克关系
function getRelation(wx1: string, wx2: string): string {
  const sheng: Record<string, string> = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" }
  const ke: Record<string, string> = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" }
  
  if (wx1 === wx2) return "比和"
  if (sheng[wx1] === wx2) return "生"
  if (sheng[wx2] === wx1) return "被生"
  if (ke[wx1] === wx2) return "克"
  if (ke[wx2] === wx1) return "被克"
  return "无关"
}

// 生成课断总论
function generateSummary(result: any): string {
  const relations = [
    getRelation(result.siWei.人元.wuxing, result.siWei.贵神.wuxing),
    getRelation(result.siWei.贵神.wuxing, result.siWei.将神.wuxing),
    getRelation(result.siWei.将神.wuxing, result.siWei.地分.wuxing),
  ]
  
  let summary = `本课以${result.siWei.人元.gan}为人元，${result.siWei.贵神.name}为贵神，${result.siWei.将神.zhi}为将神，${result.siWei.地分.zhi}为地分。`
  
  if (relations.includes("生") || relations.includes("被生")) {
    summary += "课中有生，主事可成，有贵人相助。"
  }
  if (relations.includes("克") || relations.includes("被克")) {
    summary += "课中有克，主事有阻，宜谨慎行事。"
  }
  if (relations.filter(r => r === "比和").length >= 2) {
    summary += "课中多比和，主事平稳，无大起伏。"
  }
  
  return summary
}
