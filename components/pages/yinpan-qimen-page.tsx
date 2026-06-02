"use client"
import { useState } from "react"
import { ChevronLeft, Calendar, BookOpen } from "lucide-react"
import { calculateYinPanQiMen, JIU_GONG, BA_MEN, JIU_XING, BA_SHEN } from "@/lib/qimen-data"
interface YinPanQiMenPageProps {
  onBack: () => void
}
export function YinPanQiMenPage({ onBack }: YinPanQiMenPageProps) {
  const [date, setDate] = useState(new Date())
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"pan" | "jiexi" | "guji">("pan")
  const handleCalculate = () => {
    const data = calculateYinPanQiMen(date)
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
        <span className="font-bold text-gray-800">阴盘奇门遁甲</span>
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
          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-gray-800 text-white rounded-lg font-medium"
          >
            开始排盘
          </button>
        </div>
      </div>
      {/* 排盘结果 */}
      {result && (
        <>
          {/* 九宫格 */}
          <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
            <div className="text-lg font-bold text-gray-800 mb-4">阴盘奇门格局</div>
            <div className="grid grid-cols-3 gap-2">
              {[4, 9, 2, 3, 5, 7, 8, 1, 6].map((num, index) => {
                const palace = result.palace.find((p: any) => p.number === num)
                return (
                  <div key={num} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-xs text-gray-500">{palace?.name}宫</div>
                    <div className="font-bold text-gray-800">{palace?.tianGan}{palace?.diZhi}</div>
                    <div className="text-xs text-amber-600">{palace?.men}</div>
                    <div className="text-xs text-blue-600">{palace?.star}</div>
                    <div className="text-xs text-purple-600">{palace?.shen}</div>
                  </div>
                )
              })}
            </div>
          </div>
          {/* 标签页 */}
          <div className="flex bg-white mx-4 mt-4 rounded-xl overflow-hidden shadow-sm">
            {[
              { id: "pan", label: "格局" },
              { id: "jiexi", label: "解析" },
              { id: "guji", label: "古籍" },
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
            {activeTab === "jiexi" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-bold text-gray-800 mb-2">奇门解析</div>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    阴盘奇门遁甲为道家真传，注重天地人神的配合，
                    通过九宫、八门、九星、八神的组合来预测事物的发展趋势。
                  </div>
                </div>
              </div>
            )}
            {activeTab === "guji" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-gray-800">奇门遁甲·阴盘</span>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    《阴盘奇门遁甲》源于道家内部传承，与传统阳盘奇门不同，
                    其排盘方式独特，断事精妙，素有"学会奇门遁，来人不用问"之说。
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
