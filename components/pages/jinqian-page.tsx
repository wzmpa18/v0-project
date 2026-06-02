"use client"
import { useState, useCallback } from "react"
import { ChevronLeft, RotateCcw, BookOpen, Coins } from "lucide-react"
import { castGua, getGuaInfo, getYaoName, BA_GUA } from "@/lib/jinqian-data"
interface JinQianPageProps {
  onBack: () => void
}
export function JinQianPage({ onBack }: JinQianPageProps) {
  const [result, setResult] = useState<any>(null)
  const [isCasting, setIsCasting] = useState(false)
  const [activeTab, setActiveTab] = useState<"gua" | "xiang" | "guji">("gua")
  const handleCast = useCallback(() => {
    setIsCasting(true)
    setTimeout(() => {
      const guaResult = castGua()
      setResult(guaResult)
      setIsCasting(false)
    }, 800)
  }, [])
  const guaInfo = result ? getGuaInfo(result.guaIndex) : null
  const bianGuaInfo = result ? getGuaInfo(result.bianGuaIndex) : null
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <span className="font-bold text-gray-800">金钱课占卜</span>
        <button 
          onClick={() => setResult(null)} 
          className="p-1 text-gray-600"
          disabled={isCasting}
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
      {!result ? (
        <div className="p-4 flex flex-col items-center justify-center min-h-[70vh]">
          <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mb-8">
            <Coins className="w-16 h-16 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">诚心问卜</h2>
          <p className="text-gray-500 text-center mb-8 max-w-xs">
            静心诚意，默想所问之事，然后点击下方按钮开始起卦
          </p>
          <button
            onClick={handleCast}
            disabled={isCasting}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              isCasting 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-amber-500 text-white hover:bg-amber-600 shadow-lg"
            }`}
          >
            {isCasting ? "起卦中..." : "开始起卦"}
          </button>
        </div>
      ) : (
        <div className="pb-24">
          {/* 卦象展示 */}
          <div className="bg-white mx-4 mt-4 rounded-xl p-6 shadow-sm">
            <div className="flex justify-center gap-12">
              {/* 本卦 */}
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">本卦</div>
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  {guaInfo?.name}
                </div>
                <div className="flex flex-col items-center gap-2">
                  {/* 上卦 */}
                  <div className="text-4xl">{guaInfo?.shangGua.symbol}</div>
                  <div className="text-xs text-gray-500">
                    {guaInfo?.shangGua.name}卦
                  </div>
                  {/* 六爻 */}
                  <div className="flex flex-col-reverse gap-1 mt-4">
                    {result.yaoList.map((yao: number, index: number) => {
                      const isBian = result.bianYaoList.includes(index)
                      const yaoType = yao % 2
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <div className="text-xs text-gray-500 w-8">
                            {getYaoName(yaoType, index)}
                          </div>
                          <div className={`flex items-center gap-1 ${
                            isBian ? "text-amber-600" : "text-gray-800"
                          }`}>
                            {yaoType === 1 ? (
                              <div className="w-20 h-2 bg-gray-800 rounded" />
                            ) : (
                              <>
                                <div className="w-9 h-2 bg-gray-800 rounded" />
                                <div className="w-9 h-2 bg-gray-800 rounded" />
                              </>
                            )}
                            {isBian && (
                              <span className="text-xs font-bold">×</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {/* 下卦 */}
                  <div className="mt-4 text-xs text-gray-500">
                    {guaInfo?.xiaGua.name}卦
                  </div>
                  <div className="text-4xl">{guaInfo?.xiaGua.symbol}</div>
                </div>
              </div>
              {/* 变卦 */}
              {result.bianYaoList.length > 0 && (
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">变卦</div>
                  <div className="text-2xl font-bold text-gray-800 mb-4">
                    {bianGuaInfo?.name}
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    {/* 上卦 */}
                    <div className="text-4xl">{bianGuaInfo?.shangGua.symbol}</div>
                    <div className="text-xs text-gray-500">
                      {bianGuaInfo?.shangGua.name}卦
                    </div>
                    {/* 六爻 */}
                    <div className="flex flex-col-reverse gap-1 mt-4">
                      {result.yaoList.map((yao: number, index: number) => {
                        const isBian = result.bianYaoList.includes(index)
                        let yaoType = yao % 2
                        if (isBian) {
                          yaoType = 1 - yaoType
                        }
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <div className="text-xs text-gray-500 w-8">
                              {getYaoName(yaoType, index)}
                            </div>
                            <div className={isBian ? "text-green-600" : "text-gray-800"}>
                              {yaoType === 1 ? (
                                <div className="w-20 h-2 bg-gray-800 rounded" />
                              ) : (
                                <>
                                  <div className="w-9 h-2 bg-gray-800 rounded" />
                                  <div className="w-9 h-2 bg-gray-800 rounded" />
                                </>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {/* 下卦 */}
                    <div className="mt-4 text-xs text-gray-500">
                      {bianGuaInfo?.xiaGua.name}卦
                    </div>
                    <div className="text-4xl">{bianGuaInfo?.xiaGua.symbol}</div>
                  </div>
                </div>
              )}
            </div>
            {/* 变爻提示 */}
            {result.bianYaoList.length > 0 && (
              <div className="mt-6 pt-4 border-t text-center">
                <div className="text-sm text-amber-600 font-medium">
                  变爻：{result.bianYaoList.map((i: number) => getYaoName(result.yaoList[i] % 2, i)).join("、")}
                </div>
              </div>
            )}
          </div>
          {/* 标签页 */}
          <div className="flex bg-white mx-4 mt-4 rounded-xl overflow-hidden shadow-sm">
            {[
              { id: "gua", label: "卦辞" },
              { id: "xiang", label: "象传" },
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
          <div className="p-4">
            {activeTab === "gua" && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-lg font-bold text-gray-800 mb-2">卦辞</div>
                <div className="text-gray-700 leading-relaxed">
                  {guaInfo?.ci}
                </div>
              </div>
            )}
            {activeTab === "xiang" && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-lg font-bold text-gray-800 mb-2">象传</div>
                <div className="text-gray-700 leading-relaxed">
                  {guaInfo?.xiang}
                </div>
              </div>
            )}
            {activeTab === "guji" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-gray-800">周易·上经</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    《周易》为群经之首，大道之源，是中国最古老的占卜典籍，
                    通过六十四卦来模拟天地万物的变化规律。
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <div className="text-sm text-amber-700">
                    【占卜须知】<br/>
                    1. 心诚则灵，问卦前应静心诚意<br/>
                    2. 一事一问，不可同时问多件事情<br/>
                    3. 占卜结果仅供参考，命运掌握在自己手中
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* 重新起卦按钮 */}
          <div className="p-4">
            <button
              onClick={handleCast}
              disabled={isCasting}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isCasting 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-amber-500 text-white hover:bg-amber-600"
              }`}
            >
              {isCasting ? "起卦中..." : "重新起卦"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
