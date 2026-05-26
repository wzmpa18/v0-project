"use client"

import { useState } from "react"
import { ChevronLeft, Sparkles } from "lucide-react"
import { ZHUGE_GUJI, calcQianHao, getQianWen } from "@/lib/zhuge-data"

interface ZhuGePageProps {
  onBack: () => void
}

export function ZhuGePage({ onBack }: ZhuGePageProps) {
  const [chars, setChars] = useState(["", "", ""])
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"qian" | "guji">("qian")
  
  // 求签
  const qiuQian = () => {
    if (chars.some(c => !c.trim())) {
      alert("请输入三个字")
      return
    }
    
    const hao = calcQianHao(chars)
    const qianwen = getQianWen(hao)
    
    setResult({
      hao,
      ...qianwen
    })
  }
  
  // 随机起卦
  const randomQian = () => {
    const hao = Math.floor(Math.random() * 384) + 1
    const qianwen = getQianWen(hao)
    setResult({
      hao,
      ...qianwen
    })
  }

  const getJixiongColor = (jixiong: string) => {
    if (jixiong.includes("上上")) return "text-green-600 bg-green-50"
    if (jixiong.includes("上")) return "text-blue-600 bg-blue-50"
    if (jixiong.includes("中")) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <div className="bg-[#1a1a1a] text-white px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-medium">诸葛神数</span>
        <div className="w-6" />
      </div>
      
      {/* 输入区 */}
      <div className="p-4">
        <div className="bg-[#fffef0] border border-[#d4af37]/30 rounded-xl p-4 mb-4">
          <div className="text-sm text-gray-700 mb-3">
            心诚则灵，请默念所求之事，然后随意写下三个字：
          </div>
          <div className="flex gap-3 justify-center">
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={chars[i]}
                onChange={(e) => {
                  const newChars = [...chars]
                  newChars[i] = e.target.value
                  setChars(newChars)
                }}
                className="w-16 h-16 text-center text-2xl font-bold border-2 border-[#d4af37] rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                placeholder="字"
              />
            ))}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={qiuQian}
            className="flex-1 py-4 bg-[#c8102e] text-white rounded-xl font-medium text-lg flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            求签
          </button>
          <button
            onClick={randomQian}
            className="px-6 py-4 bg-gray-100 text-gray-800 rounded-xl font-medium"
          >
            随机
          </button>
        </div>
      </div>
      
      {/* 结果显示 */}
      {result && (
        <div className="border-t">
          {/* Tab切换 */}
          <div className="flex border-b bg-[#1a1a1a]">
            {[
              { id: "qian", label: "签文解读" },
              { id: "guji", label: "古籍说明" },
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
          
          {/* 签文解读 */}
          {activeTab === "qian" && (
            <div className="p-4 space-y-4">
              {/* 签号和吉凶 */}
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-sm text-gray-600">签号</div>
                  <div className="text-4xl font-bold text-[#d4af37]">
                    第{result.hao}签
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg font-bold ${getJixiongColor(result.jixiong)}`}>
                  {result.jixiong}
                </div>
              </div>
              
              {/* 签文 */}
              <div className="bg-[#fffef0] border border-[#d4af37]/30 rounded-xl p-4">
                <div className="text-sm text-[#a16207] mb-2 font-medium">签文</div>
                <div className="text-lg text-gray-800 font-medium leading-relaxed text-center">
                  {result.qian}
                </div>
              </div>
              
              {/* 解签 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-[#a16207] mb-2 font-medium">解签</div>
                <div className="text-gray-800 leading-relaxed">
                  {result.jie}
                </div>
              </div>
            </div>
          )}
          
          {/* 古籍说明 */}
          {activeTab === "guji" && (
            <div className="p-4 space-y-4">
              {Object.entries(ZHUGE_GUJI).map(([key, value]) => (
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
