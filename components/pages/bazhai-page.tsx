"use client"

import { useState } from "react"
import { ChevronLeft, Home, User } from "lucide-react"
import { 
  BA_GUA_DIRECTION, ZHAI_GUA, YOU_NIAN_BA_XING, BA_ZHAI_PAN,
  BA_ZHAI_DUANYU, calcMingGua, getDongXiMing
} from "@/lib/bazhai-data"

interface BaZhaiPageProps {
  onBack: () => void
}

const DIRECTIONS = ["坎", "艮", "震", "巽", "离", "坤", "兑", "乾"]
const DIRECTION_NAMES = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"]

export function BaZhaiPage({ onBack }: BaZhaiPageProps) {
  const [year, setYear] = useState(1990)
  const [gender, setGender] = useState<"male" | "female">("male")
  const [zuoXiang, setZuoXiang] = useState("坐北朝南")
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"ming" | "zhai" | "guji">("ming")
  
  // 排盘计算
  const calculate = () => {
    const mingGua = calcMingGua(year, gender)
    const dongXiMing = getDongXiMing(mingGua)
    const zhaiGua = ZHAI_GUA[zuoXiang as keyof typeof ZHAI_GUA]
    const zhaiDongXi = getDongXiMing(zhaiGua)
    const isMatch = dongXiMing === zhaiDongXi
    
    // 获取八方位吉凶
    const fangWeiJiXiong = BA_ZHAI_PAN[mingGua] || {}
    
    setResult({
      mingGua,
      dongXiMing,
      zhaiGua,
      zhaiDongXi,
      isMatch,
      fangWeiJiXiong
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <div className="bg-[#1a1a1a] text-white px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-medium">八宅排盘</span>
        <div className="w-6" />
      </div>
      
      {/* 输入表单 */}
      <div className="p-4 space-y-4">
        {/* 出生年份 */}
        <div className="flex items-center justify-between py-3 border-b">
          <span className="text-gray-800 font-medium">出生年份</span>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value) || 1990)}
            className="text-right text-gray-800 font-medium w-24 outline-none"
          />
        </div>
        
        {/* 性别 */}
        <div className="flex items-center justify-between py-3 border-b">
          <span className="text-gray-800 font-medium">性别</span>
          <div className="flex gap-2">
            <button
              onClick={() => setGender("male")}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                gender === "male" ? "bg-[#d4af37] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              男
            </button>
            <button
              onClick={() => setGender("female")}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                gender === "female" ? "bg-[#d4af37] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              女
            </button>
          </div>
        </div>
        
        {/* 坐向 */}
        <div className="py-3 border-b">
          <span className="text-gray-800 font-medium mb-2 block">房屋坐向</span>
          <select
            value={zuoXiang}
            onChange={(e) => setZuoXiang(e.target.value)}
            className="w-full py-2 px-3 border rounded-lg text-gray-800 font-medium"
          >
            {Object.keys(ZHAI_GUA).map((zx) => (
              <option key={zx} value={zx}>{zx}</option>
            ))}
          </select>
        </div>
        
        {/* 排盘按钮 */}
        <button
          onClick={calculate}
          className="w-full py-4 bg-[#c8102e] text-white rounded-xl font-medium text-lg"
        >
          开始排盘
        </button>
      </div>
      
      {/* 结果显示 */}
      {result && (
        <div className="border-t">
          {/* Tab切换 */}
          <div className="flex border-b bg-[#1a1a1a]">
            {[
              { id: "ming", label: "命卦分析" },
              { id: "zhai", label: "宅盘方位" },
              { id: "guji", label: "古籍断语" },
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
          
          {/* 命卦分析 */}
          {activeTab === "ming" && (
            <div className="p-4 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 rounded-xl p-4 text-center">
                  <User className="w-8 h-8 mx-auto mb-2 text-[#d4af37]" />
                  <div className="text-sm text-gray-600">命卦</div>
                  <div className="text-3xl font-bold text-[#d4af37] my-2">{result.mingGua}</div>
                  <div className={`text-sm font-medium ${
                    result.dongXiMing === "东四命" ? "text-[#22c55e]" : "text-[#3b82f6]"
                  }`}>
                    {result.dongXiMing}
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-4 text-center">
                  <Home className="w-8 h-8 mx-auto mb-2 text-[#d4af37]" />
                  <div className="text-sm text-gray-600">宅卦</div>
                  <div className="text-3xl font-bold text-[#d4af37] my-2">{result.zhaiGua}</div>
                  <div className={`text-sm font-medium ${
                    result.zhaiDongXi === "东四命" ? "text-[#22c55e]" : "text-[#3b82f6]"
                  }`}>
                    {result.zhaiDongXi.replace("命", "宅")}
                  </div>
                </div>
              </div>
              
              {/* 命宅配合 */}
              <div className={`p-4 rounded-xl text-center ${
                result.isMatch ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}>
                <div className={`text-lg font-bold ${result.isMatch ? "text-green-700" : "text-red-700"}`}>
                  {result.isMatch ? "命宅相配 - 吉" : "命宅不配 - 凶"}
                </div>
                <div className={`text-sm mt-2 ${result.isMatch ? "text-green-600" : "text-red-600"}`}>
                  {result.isMatch 
                    ? "命卦与宅卦同属一类，相得益彰，大吉大利"
                    : "命卦与宅卦分属不同类型，宜调整或化解"
                  }
                </div>
              </div>
            </div>
          )}
          
          {/* 宅盘方位 */}
          {activeTab === "zhai" && (
            <div className="p-4">
              {/* 九宫格 */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { gua: "巽", dir: "东南" },
                  { gua: "离", dir: "南" },
                  { gua: "坤", dir: "西南" },
                  { gua: "震", dir: "东" },
                  { gua: "", dir: "中宫" },
                  { gua: "兑", dir: "西" },
                  { gua: "艮", dir: "东北" },
                  { gua: "坎", dir: "北" },
                  { gua: "乾", dir: "西北" },
                ].map((item, i) => {
                  const xing = item.gua ? result.fangWeiJiXiong[item.gua] : ""
                  const xingInfo = xing ? YOU_NIAN_BA_XING[xing as keyof typeof YOU_NIAN_BA_XING] : null
                  const isJi = xingInfo?.jixiong.includes("吉")
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg p-2 flex flex-col items-center justify-center ${
                        !item.gua ? "bg-gray-200" :
                        isJi ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <div className="text-xs text-gray-600">{item.dir}</div>
                      {item.gua && (
                        <>
                          <div className={`text-lg font-bold ${isJi ? "text-green-700" : "text-red-700"}`}>
                            {xing}
                          </div>
                          <div className="text-xs text-gray-700">{item.gua}卦</div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
              
              {/* 方位详解 */}
              <div className="space-y-2">
                {Object.entries(result.fangWeiJiXiong).map(([gua, xing]) => {
                  const xingInfo = YOU_NIAN_BA_XING[xing as keyof typeof YOU_NIAN_BA_XING]
                  const isJi = xingInfo?.jixiong.includes("吉")
                  const direction = BA_GUA_DIRECTION[gua as keyof typeof BA_GUA_DIRECTION]?.direction
                  
                  return (
                    <div key={gua} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-12 text-center">
                        <div className="text-sm text-gray-600">{direction}</div>
                        <div className="font-medium text-gray-800">{gua}</div>
                      </div>
                      <div className={`px-2 py-0.5 rounded text-sm font-medium ${
                        isJi ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {xing as string}
                      </div>
                      <div className="flex-1 text-sm text-gray-700">{xingInfo?.desc}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          
          {/* 古籍断语 */}
          {activeTab === "guji" && (
            <div className="p-4 space-y-4">
              {Object.entries(BA_ZHAI_DUANYU).map(([key, value]) => (
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
