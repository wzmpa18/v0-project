"use client"

import { useState } from "react"
import { Scroll, Sparkles, Info, BookOpen, AlertTriangle } from "lucide-react"
import {
  FU_ZHOU_INTRO,
  FU_ZHOU_FEN_LEI,
  CHANG_JIAN_FU_ZHOU,
  CHANG_JIAN_ZHOU_YU,
  FU_ZHOU_JIN_JI,
} from "@/lib/fuzhou-data"

export default function FuzhouPage() {
  const [showZhouYu, setShowZhouYu] = useState(false)
  const [showJinJi, setShowJinJi] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center">
            <Scroll className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-yellow-400">道家符咒</h1>
            <p className="text-xs text-yellow-200/60">符箓咒语 · 道教法术</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-950/60 rounded-xl p-4 border border-yellow-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-200/80">{FU_ZHOU_INTRO.description}</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">符咒分类</span>
          </div>

          <div className="space-y-3">
            {FU_ZHOU_FEN_LEI.map((fenlei, idx) => (
              <div key={idx} className="bg-yellow-800/30 rounded-lg p-3">
                <div className="font-bold text-yellow-300 mb-2">{fenlei.name}</div>
                <div className="text-xs text-yellow-100/70 mb-2">{fenlei.desc}</div>
                <div className="flex gap-1.5">
                  {fenlei.examples.map((ex) => (
                    <span key={ex} className="bg-yellow-700/30 rounded-lg px-2 py-1 text-xs text-yellow-200">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Scroll className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">常见符箓</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {CHANG_JIAN_FU_ZHOU.map((fu, idx) => (
              <div key={idx} className="bg-yellow-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-yellow-300">{fu.name}</div>
                  <div className="text-xs text-yellow-200/60">{fu.type}</div>
                </div>
                <div className="text-xs text-yellow-100/70 mb-1">{fu.desc}</div>
                <div className="text-xs text-yellow-400/50">——{fu.chuchu}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowZhouYu(!showZhouYu)}
          className="w-full py-3 bg-white/10 text-yellow-300 rounded-xl font-medium hover:bg-white/20 transition-colors mb-4"
        >
          {showZhouYu ? "隐藏咒语" : "查看常见咒语"}
        </button>

        {showZhouYu && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">常见咒语</span>
            </div>

            <div className="space-y-3">
              {CHANG_JIAN_ZHOU_YU.map((zhou, idx) => (
                <div key={idx} className="bg-yellow-800/30 rounded-lg p-3">
                  <div className="font-bold text-yellow-300 mb-1">{zhou.name}</div>
                  <div className="text-xs text-yellow-100/70 mb-2">{zhou.desc}</div>
                  <div className="bg-yellow-900/40 rounded-lg p-2 mb-2">
                    <div className="text-xs text-yellow-200 leading-relaxed">{zhou.content}</div>
                  </div>
                  <div className="text-xs text-yellow-400/50">——{zhou.chuchu}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowJinJi(!showJinJi)}
          className="w-full py-3 bg-white/10 text-yellow-300 rounded-xl font-medium hover:bg-white/20 transition-colors mb-4"
        >
          {showJinJi ? "隐藏禁忌" : "查看符咒禁忌"}
        </button>

        {showJinJi && (
          <div className="bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-4 border border-red-800/30 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold text-red-300">符咒禁忌</span>
            </div>

            <div className="space-y-2">
              {FU_ZHOU_JIN_JI.map((jinji, idx) => (
                <div key={idx} className="bg-red-800/30 rounded-lg p-3">
                  <div className="font-bold text-red-200 mb-1">{jinji.name}</div>
                  <div className="text-xs text-red-100/70">{jinji.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="text-sm font-medium text-amber-400 mb-3">道家符咒简介</div>
          <div className="space-y-2 text-xs text-amber-100/70">
            <p><strong className="text-amber-300">起源：</strong>{FU_ZHOU_INTRO.origin}</p>
            <p><strong className="text-amber-300">特点：</strong></p>
            <ul className="list-disc list-inside">
              {FU_ZHOU_INTRO.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}