"use client"

import { useState } from "react"

export default function XiaoLiuRenPage() {
  const [result, setResult] = useState<string | null>(null)
  
  const gong = ['大安', '留连', '速喜', '赤口', '小吉', '空亡']
  
  const handleQiKe = () => {
    const index = Math.floor(Math.random() * 6)
    setResult(gong[index])
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-gray-900 text-white pb-24">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-green-400">小六壬</h1>
          <p className="text-gray-400 text-sm mt-1">马前课 · 快速占卜</p>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {gong.map((name, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-4 text-center">
              <div className="text-lg font-semibold text-green-300">{name}</div>
            </div>
          ))}
        </div>
        
        <button
          onClick={handleQiKe}
          className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-semibold text-lg"
        >
          随机起课
        </button>
        
        {result && (
          <div className="bg-gray-800/50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{result}</div>
            <div className="text-gray-300 text-sm">
              【古籍引用】出自《小六壬马前课》，以大安、留连、速喜、赤口、小吉、空亡六宫占断吉凶。
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
