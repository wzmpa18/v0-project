"use client"

import { Atom } from "lucide-react"

export default function QizhengPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
          <Atom className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-purple-400">七政四余</h1>
          <p className="text-xs text-purple-200/60">天文历法 · 星象推命</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 border border-purple-800/30">
        <h2 className="text-sm font-bold text-purple-300 mb-3">七政四余简介</h2>
        <p className="text-xs text-purple-100/80 leading-relaxed">
          七政四余是中国古代的一种占星术，以日月五星（七政）和四余（罗睺、计都、紫炁、月孛）为基础，
          通过观测星象来推断人的命运和世间的吉凶祸福。
        </p>
      </div>

      <div className="mt-4 text-center text-xs text-purple-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}