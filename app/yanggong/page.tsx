"use client"

import { useState } from "react"
import { Compass, Mountain, Droplets, Info, BookOpen } from "lucide-react"
import {
  YANG_GONG_INTRO,
  LONG_MAI,
  SHA_SHUI,
  XUE_WEI,
  SHUI_FA,
  DAO_ZHANG_FA,
  YANG_GONG_DUAN_YU,
} from "@/lib/yanggong-data"

export default function YanggongPage() {
  const [showDuanYu, setShowDuanYu] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-teal-400">杨公风水</h1>
            <p className="text-xs text-teal-200/60">形势派风水 · 撼龙疑龙</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-teal-900/40 to-teal-950/60 rounded-xl p-4 border border-teal-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-teal-200/80">{YANG_GONG_INTRO.description}</span>
          </div>
          <div className="bg-teal-800/30 rounded-lg p-3 mt-3">
            <div className="text-xs text-teal-200/60 mb-1">创始人</div>
            <div className="text-sm font-bold text-teal-300">{YANG_GONG_INTRO.master}</div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Mountain className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-400">龙脉类型</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {LONG_MAI.map((long, idx) => (
              <div key={idx} className="bg-teal-800/30 rounded-lg p-3">
                <div className="font-bold text-teal-300 mb-1">{long.name}</div>
                <div className="text-xs text-teal-100/70">{long.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-400">砂水配合</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {SHA_SHUI.map((sha, idx) => (
              <div key={idx} className="bg-teal-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-teal-300">{sha.name}</div>
                  <div className="text-xs text-teal-200/60">{sha.position}方</div>
                </div>
                <div className="text-xs text-teal-100/70">{sha.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Mountain className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-400">穴位类型</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {XUE_WEI.map((xue, idx) => (
              <div key={idx} className="bg-teal-800/30 rounded-lg p-3">
                <div className="font-bold text-teal-300 mb-1">{xue.name}</div>
                <div className="text-xs text-teal-100/70">{xue.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-400">水法</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {SHUI_FA.map((shui, idx) => (
              <div key={idx} className="bg-teal-800/30 rounded-lg p-3">
                <div className="font-bold text-teal-300 mb-1">{shui.name}</div>
                <div className="text-xs text-teal-100/70">{shui.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-400">十二倒杖法</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {DAO_ZHANG_FA.map((fa, idx) => (
              <div key={idx} className="bg-teal-800/30 rounded-lg p-2 text-center">
                <div className="text-xs font-bold text-teal-300">{fa.name}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowDuanYu(!showDuanYu)}
          className="w-full py-3 bg-white/10 text-teal-300 rounded-xl font-medium hover:bg-white/20 transition-colors mb-4"
        >
          {showDuanYu ? "隐藏断语" : "查看杨公断语"}
        </button>

        {showDuanYu && (
          <div className="space-y-4 mb-4">
            <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-4 border border-green-800/30">
              <div className="text-sm font-bold text-green-300 mb-3">吉地断语</div>
              <div className="space-y-2">
                {YANG_GONG_DUAN_YU.吉地.map((duan, idx) => (
                  <div key={idx} className="bg-green-800/30 rounded-lg p-3">
                    <div className="font-bold text-green-200 mb-1">{duan.name}</div>
                    <div className="text-xs text-green-100/70">{duan.desc}</div>
                    <div className="text-xs text-green-400/50 mt-1">——{duan.chuchu}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-4 border border-red-800/30">
              <div className="text-sm font-bold text-red-300 mb-3">凶地断语</div>
              <div className="space-y-2">
                {YANG_GONG_DUAN_YU.凶地.map((duan, idx) => (
                  <div key={idx} className="bg-red-800/30 rounded-lg p-3">
                    <div className="font-bold text-red-200 mb-1">{duan.name}</div>
                    <div className="text-xs text-red-100/70">{duan.desc}</div>
                    <div className="text-xs text-red-400/50 mt-1">——{duan.chuchu}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="text-sm font-medium text-amber-400 mb-3">杨公风水简介</div>
          <div className="space-y-2 text-xs text-amber-100/70">
            <p><strong className="text-amber-300">起源：</strong>{YANG_GONG_INTRO.origin}</p>
            <p><strong className="text-amber-300">特点：</strong></p>
            <ul className="list-disc list-inside">
              {YANG_GONG_INTRO.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}