"use client"
import { useState } from "react"
import { ChevronLeft, BookOpen, User } from "lucide-react"
import { calculateMingLiQiMen } from "@/lib/qimen-data"
interface MingLiQiMenPageProps {
  onBack: () => void
}
export function MingLiQiMenPage({ onBack }: MingLiQiMenPageProps) {
  const [date, setDate] = useState(new Date())
  const [gender, setGender] = useState<"male" | "female">("male")
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"hebing" | "mingli" | "qimen">("hebing")
  const handleCalculate = () => {
    const data = calculateMingLiQiMen(date, gender)
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
        <span className="font-bold text-gray-800">命理奇门结合</span>
        <div className="w-8" />
      </div>
      {/* 输入表单 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">出生日期</label>
            <input
              type="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
            <div className="flex gap-4">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-2 rounded-lg border-2 flex items-center justify-center gap-2 ${
                  gender === "male" 
                    ? "border-blue-500 bg-blue-50 text-blue-700" 
                    : "border-gray-200 text-gray-600"
                }`}
              >
                <User className="w-4 h-4" />
                男
              </button>
              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-2 rounded-lg border-2 flex items-center justify-center gap-2 ${
                  gender === "female" 
                    ? "border-pink-500 bg-pink-50 text-pink-700" 
                    : "border-gray-200 text-gray-600"
                }`}
              >
                <User className="w-4 h-4" />
                女
              </button>
            </div>
          </div>
          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium"
          >
            开始合参
          </button>
        </div>
      </div>
      {/* 排盘结果 */}
      {result && (
        <>
          {/* 合参概览 */}
          <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
            <div className="text-lg font-bold text-gray-800 mb-4 text-center">
              命理奇门合参
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">命理</div>
                <div className="text-gray-600 text-sm">以八字分析先天命格</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">奇门</div>
                <div className="text-gray-600 text-sm">以奇门分析后天运势</div>
              </div>
            </div>
          </div>
          {/* 标签页 */}
          <div className="flex bg-white mx-4 mt-4 rounded-xl overflow-hidden shadow-sm">
            {[
              { id: "hebing", label: "合参" },
              { id: "mingli", label: "命理" },
              { id: "qimen", label: "奇门" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 pb-24">
            {activeTab === "hebing" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="font-bold text-gray-800 mb-2">合参解析</div>
                <div className="text-gray-600 text-sm leading-relaxed">
                  命理奇门结合，先天命局配合后天时空，综合分析更精准。
                </div>
              </div>
            )}
            {activeTab === "mingli" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="font-bold text-gray-800 mb-2">命理分析</div>
                <div className="text-gray-600 text-sm leading-relaxed">
                  八字命理分析，五行强弱，十神配置。
                </div>
              </div>
            )}
            {activeTab === "qimen" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-gray-800">奇门格局</span>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  奇门遁甲排盘，分析当前时空状态。
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
