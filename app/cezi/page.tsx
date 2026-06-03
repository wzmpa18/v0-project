"use client"

import { PenTool } from "lucide-react"

export default function CeziPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
          <PenTool className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-teal-400">测字</h1>
          <p className="text-xs text-teal-200/60">字中玄机 · 一字定乾坤</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-teal-900/40 to-teal-950/60 rounded-xl p-4 border border-teal-800/30">
        <h2 className="text-sm font-bold text-teal-300 mb-3">功能介绍</h2>
        <p className="text-xs text-teal-100/80 leading-relaxed">
          测字是一种通过分析汉字的结构、笔画来预测吉凶祸福的占卜方法。
          每个汉字都蕴含着丰富的信息和能量。
        </p>
      </div>

      <div className="mt-4 bg-gradient-to-br from-teal-900/40 to-teal-950/60 rounded-xl p-4 border border-teal-800/30">
        <h2 className="text-sm font-bold text-teal-300 mb-3">输入汉字</h2>
        <input
          type="text"
          placeholder="请输入一个汉字"
          maxLength={1}
          className="w-full bg-teal-800/30 border border-teal-700/30 rounded-lg p-3 text-teal-100 placeholder-teal-500 text-center text-2xl font-bold"
        />
        <button className="mt-3 w-full bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg py-3 text-white font-medium">
          开始测字
        </button>
      </div>

      <div className="mt-4 text-center text-xs text-teal-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}