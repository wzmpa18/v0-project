"use client"
import { useState } from "react"
import { ChevronLeft, BookOpen, Clock } from "lucide-react"
import { calculateDaLiuRen, SHI_ER_YUE_JIANG, SHI_ER_TIAN_JIANG, DI_ZHI } from "@/lib/daliuren-data"
interface DaLiuRenPageProps {
  onBack: () => void
}
export function DaLiuRenPage({ onBack }: DaLiuRenPageProps) {
  const [date, setDate] = useState(new Date())
  const [hour, setHour] = useState(new Date().getHours())
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"pan" | "sike" | "guji">("pan")
  const handleCalculate = () => {
    const data = calculateDaLiuRen(date, hour)
    setResult(data)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <span className="font-bold text-gray-800">大六壬排盘</span>
        <div className="w-8" />
      </div>
      {/* 输入表单 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择日期</label>
            <input
              type="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择时辰</label>
            <select
              value={hour}
              onChange={(e) => setHour(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {Array(24).fill(0).map((_, i) => (
                <option key={i} value={i}>
                  {i.toString().padStart(2, '0')}:00 - {((i + 1) % 24).toString().padStart(2, '0')}:00
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-medium"
          >
            开始起课
          </button>
        </div>
      </div>
      {/* 排盘结果 */}
      {result && (
        <>
          {/* 天地盘 */}
          <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
            <div className="text-lg font-bold text-gray-800 mb-4">大六壬课式</div>
            <div className="grid grid-cols-4 gap-2">
              {result.tianPan.slice(0, 12).map((item: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                  <div className="text-xs text-gray-500">{item.zhi}</div>
                  <div className="text-sm font-bold text-gray-800">{item.tianGan}</div>
                  <div className="text-xs text-red-600">{item.tianJiang}</div>
                  <div className="text-xs text-amber-600">{item.yueJiang}</div>
                </div>
              ))}
            </div>
          </div>
          {/* 四课三传 */}
          <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
            <div className="text-lg font-bold text-gray-800 mb-4">四课三传</div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">三传</div>
                <div className="flex justify-center gap-8">
                  {result.siKe.map((ke: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-gray-800">{ke.top}</div>
                      <div className="text-sm text-gray-600">{ke.bottom}</div>
                      <div className="text-xs text-amber-600">{ke.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* 标签页 */}
          <div className="flex bg-white mx-4 mt-4 rounded-xl overflow-hidden shadow-sm">
            {[
              { id: "pan", label: "天地盘" },
              { id: "sike", label: "四课三传" },
              { id: "guji", label: "古籍" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 pb-24">
            {activeTab === "sike" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-bold text-gray-800 mb-2">四课解析</div>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    四课为六壬之骨架，以日干为中心，天盘地盘相配，主客动静分明。
                  </div>
                </div>
              </div>
            )}
            {activeTab === "guji" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-gray-800">大六壬·指南</span>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    《大六壬指南》为六壬经典，与奇门遁甲、太乙神数并称三式，
                    六壬为三式之首，占断精准，流传千古。
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
