"use client"
import { useState } from "react"
import { ChevronLeft, BookOpen, User } from "lucide-react"
import { calculateYangPanMingLi, TIAN_GAN, DI_ZHI } from "@/lib/qimen-data"
interface YangPanMingLiPageProps {
  onBack: () => void
}
export function YangPanMingLiPage({ onBack }: YangPanMingLiPageProps) {
  const [date, setDate] = useState(new Date())
  const [gender, setGender] = useState<"male" | "female">("male")
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"bazi" | "dayun" | "guji">("bazi")
  const handleCalculate = () => {
    const data = calculateYangPanMingLi(date, gender)
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
        <span className="font-bold text-gray-800">阳盘命理排盘</span>
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
            className="w-full py-3 bg-amber-500 text-white rounded-lg font-medium"
          >
            开始排盘
          </button>
        </div>
      </div>
      {/* 排盘结果 */}
      {result && (
        <>
          {/* 八字展示 */}
          <div className="bg-white mx-4 mt-4 rounded-xl p-6 shadow-sm">
            <div className="text-lg font-bold text-gray-800 mb-4 text-center">
              {gender === "male" ? "乾造" : "坤造"}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: "年柱", data: result.nianZhu },
                { name: "月柱", data: result.yueZhu },
                { name: "日柱", data: result.riZhu },
                { name: "时柱", data: result.shiZhu }
              ].map((zhu, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-2">{zhu.name}</div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {zhu.data.gan}
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {zhu.data.zhi}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 标签页 */}
          <div className="flex bg-white mx-4 mt-4 rounded-xl overflow-hidden shadow-sm">
            {[
              { id: "bazi", label: "八字" },
              { id: "dayun", label: "大运" },
              { id: "guji", label: "古籍" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-amber-500 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 pb-24">
            {activeTab === "bazi" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-bold text-gray-800 mb-2">八字解析</div>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    阳盘命理注重五行平衡、阴阳调和，通过年月日时四柱八字来分析人一生的运势走向。
                  </div>
                </div>
              </div>
            )}
            {activeTab === "dayun" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-bold text-gray-800 mb-2">大运流年</div>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    大运每十年一变，配合流年共同影响人生运势起伏。
                  </div>
                </div>
              </div>
            )}
            {activeTab === "guji" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-gray-800">渊海子平</span>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    《渊海子平》是八字命理学的经典著作，由宋代徐子平所创，
                    奠定了八字命理的理论基础。
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
