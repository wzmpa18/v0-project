"use client"

import { useState } from "react"
import { Compass, Crosshair, Info, BookOpen } from "lucide-react"
import {
  LUO_PAN_INTRO,
  LUO_PAN_CENG_CI,
  BA_GUA_FANG_WEI,
  LUO_PAN_SHI_YONG,
  FANG_WEI_JI_XIONG,
} from "@/lib/luopan-data"

export default function LuopanPage() {
  const [showUsage, setShowUsage] = useState(false)
  const [showJiXiong, setShowJiXiong] = useState(false)

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "金": "text-gray-400",
      "土": "text-amber-600",
      "木": "text-green-500",
      "水": "text-blue-500",
      "火": "text-red-500",
    }
    return colors[wuxing] || "text-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-cyan-400">风水罗盘</h1>
            <p className="text-xs text-cyan-200/60">方位测量 · 风水工具</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-4 border border-cyan-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-200/80">{LUO_PAN_INTRO.description}</span>
          </div>
        </div>

        {/* 简化罗盘展示 */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Crosshair className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">罗盘示意</span>
          </div>

          <div className="relative w-full aspect-square max-w-[300px] mx-auto">
            {/* 简化罗盘SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* 外圈 */}
              <circle cx="100" cy="100" r="95" fill="none" stroke="#0e7490" strokeWidth="2" />
              {/* 中圈 */}
              <circle cx="100" cy="100" r="70" fill="none" stroke="#0e7490" strokeWidth="1" />
              {/* 内圈 */}
              <circle cx="100" cy="100" r="45" fill="none" stroke="#0e7490" strokeWidth="1" />
              {/* 天池 */}
              <circle cx="100" cy="100" r="20" fill="#164e63" stroke="#0e7490" strokeWidth="1" />
              
              {/* 方位文字 */}
              <text x="100" y="15" textAnchor="middle" fill="#22d3ee" fontSize="12">南</text>
              <text x="100" y="190" textAnchor="middle" fill="#22d3ee" fontSize="12">北</text>
              <text x="185" y="105" textAnchor="middle" fill="#22d3ee" fontSize="12">东</text>
              <text x="15" y="105" textAnchor="middle" fill="#22d3ee" fontSize="12">西</text>
              
              {/* 八卦符号 */}
              <text x="100" y="35" textAnchor="middle" fill="#fbbf24" fontSize="10">☲</text>
              <text x="100" y="170" textAnchor="middle" fill="#3b82f6" fontSize="10">☵</text>
              <text x="170" y="105" textAnchor="middle" fill="#22c55e" fontSize="10">☳</text>
              <text x="30" y="105" textAnchor="middle" fill="#a3a3a3" fontSize="10">☱</text>
              
              {/* 指针 */}
              <line x1="100" y1="85" x2="100" y2="115" stroke="#ef4444" strokeWidth="2" />
              <polygon points="100,80 95,90 105,90" fill="#ef4444" />
            </svg>
          </div>

          <div className="text-center mt-4 text-xs text-cyan-200/60">
            红色指针指向南方（离卦）
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">罗盘层次</span>
          </div>

          <div className="space-y-2">
            {LUO_PAN_CENG_CI.map((ceng, idx) => (
              <div key={idx} className="bg-cyan-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-cyan-300">{ceng.name}</div>
                  <div className="text-xs text-cyan-200/60">第{ceng.number}层</div>
                </div>
                <div className="text-xs text-cyan-100/70">{ceng.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">八卦方位</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {BA_GUA_FANG_WEI.map((gua, idx) => (
              <div key={idx} className="bg-cyan-800/30 rounded-lg p-2 text-center">
                <div className="text-lg mb-1">{gua.symbol}</div>
                <div className="text-xs font-bold text-cyan-300">{gua.name}</div>
                <div className={`text-xs ${getWuxingColor(gua.wuxing)}`}>{gua.wuxing}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowUsage(!showUsage)}
          className="w-full py-3 bg-white/10 text-cyan-300 rounded-xl font-medium hover:bg-white/20 transition-colors mb-4"
        >
          {showUsage ? "隐藏使用方法" : "查看使用方法"}
        </button>

        {showUsage && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
            <div className="space-y-2">
              {LUO_PAN_SHI_YONG.map((step, idx) => (
                <div key={idx} className="bg-cyan-800/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-cyan-600 flex items-center justify-center text-xs text-white">
                      {step.step}
                    </div>
                    <div className="font-bold text-cyan-300">{step.name}</div>
                  </div>
                  <div className="text-xs text-cyan-100/70 ml-7">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowJiXiong(!showJiXiong)}
          className="w-full py-3 bg-white/10 text-cyan-300 rounded-xl font-medium hover:bg-white/20 transition-colors mb-4"
        >
          {showJiXiong ? "隐藏方位吉凶" : "查看方位吉凶"}
        </button>

        {showJiXiong && (
          <div className="space-y-4 mb-4">
            <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-4 border border-green-800/30">
              <div className="text-sm font-bold text-green-300 mb-3">吉方位</div>
              <div className="space-y-2">
                {FANG_WEI_JI_XIONG.吉方位.map((fang, idx) => (
                  <div key={idx} className="bg-green-800/30 rounded-lg p-3">
                    <div className="font-bold text-green-200 mb-1">{fang.name}</div>
                    <div className="text-xs text-green-100/70">{fang.desc}</div>
                    <div className="text-xs text-green-400/50 mt-1">——{fang.chuchu}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-4 border border-red-800/30">
              <div className="text-sm font-bold text-red-300 mb-3">凶方位</div>
              <div className="space-y-2">
                {FANG_WEI_JI_XIONG.凶方位.map((fang, idx) => (
                  <div key={idx} className="bg-red-800/30 rounded-lg p-3">
                    <div className="font-bold text-red-200 mb-1">{fang.name}</div>
                    <div className="text-xs text-red-100/70">{fang.desc}</div>
                    <div className="text-xs text-red-400/50 mt-1">——{fang.chuchu}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="text-sm font-medium text-amber-400 mb-3">风水罗盘简介</div>
          <div className="space-y-2 text-xs text-amber-100/70">
            <p><strong className="text-amber-300">起源：</strong>{LUO_PAN_INTRO.origin}</p>
            <p><strong className="text-amber-300">特点：</strong></p>
            <ul className="list-disc list-inside">
              {LUO_PAN_INTRO.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}