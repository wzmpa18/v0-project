"use client"

import { useState, useEffect } from "react"
import { BaziInputForm } from "@/components/bazi/bazi-input-form"
import { BaziResult } from "@/components/bazi/bazi-result"
import { calculateBazi } from "@/lib/bazi-data"

export default function TestBaziPage() {
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleCalculate = (data: any) => {
    console.log("开始计算八字:", data)
    try {
      const baziResult = calculateBazi(data)
      console.log("八字计算结果:", baziResult)
      setResult(baziResult)
      setShowResult(true)
    } catch (error) {
      console.error("八字计算错误:", error)
      alert("计算出错了，请检查输入")
    }
  }

  const handleBack = () => {
    setShowResult(false)
    setResult(null)
  }

  const handleInstantTest = () => {
    const now = new Date()
    handleCalculate({
      name: "测试用户",
      gender: "male",
      calendarType: "solar",
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      birthPlace: "",
      timezone: "北京时间",
      saveToRecord: false,
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-medium text-gray-800">八字测试页面</h1>
          <button
            onClick={handleInstantTest}
            className="px-4 py-2 bg-gradient-to-r from-[#4a9d5b] to-[#3d8a4e] text-white rounded-full text-sm font-medium"
          >
            立即测试
          </button>
        </div>
      </div>

      <div className="pt-16 pb-24">
        {!showResult ? (
          <div className="px-4 py-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">测试说明</h2>
              <p className="text-gray-600 text-sm mb-2">1. 点击右上角的"立即测试"按钮</p>
              <p className="text-gray-600 text-sm mb-2">2. 或者使用下方表单填写出生信息</p>
              <p className="text-gray-600 text-sm">3. 查看完整的八字排盘结果</p>
            </div>
            
            <BaziInputForm onCalculate={handleCalculate} />
          </div>
        ) : (
          <BaziResult result={result} onBack={handleBack} />
        )}
      </div>
    </div>
  )
}
