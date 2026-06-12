"use client"

import { useState } from "react"
import { Calendar, CheckCircle, XCircle, Info, BookOpen } from "lucide-react"
import {
  QIMEN_ZEJI_INTRO,
  SHI_YI_SHI_XIANG,
  JI_SHI_PAN_DUAN,
  calculateQimenZeji,
} from "@/lib/qimenzeji-data"

export default function QimenzejiPage() {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours(),
    shixiang: "婚嫁",
  })
  const [result, setResult] = useState<any>(null)
  const [showJishi, setShowJishi] = useState(false)

  const handleCalculate = () => {
    const date = new Date(formData.year, formData.month - 1, formData.day, formData.hour)
    const zejiResult = calculateQimenZeji(date, formData.shixiang)
    setResult(zejiResult)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-indigo-400">奇门择吉</h1>
            <p className="text-xs text-indigo-200/60">奇门遁甲择日 · 吉时选择</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-950/60 rounded-xl p-4 border border-indigo-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-200/80">{QIMEN_ZEJI_INTRO.description}</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-400">择吉查询</span>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-400 mb-2">选择事项</label>
            <select
              value={formData.shixiang}
              onChange={(e) => setFormData(prev => ({ ...prev, shixiang: e.target.value }))}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
            >
              {SHI_YI_SHI_XIANG.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">年份</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
              >
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(y => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">月份</label>
              <select
                value={formData.month}
                onChange={(e) => setFormData(prev => ({ ...prev, month: Number(e.target.value) }))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">日期</label>
              <select
                value={formData.day}
                onChange={(e) => setFormData(prev => ({ ...prev, day: Number(e.target.value) }))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">时辰</label>
              <select
                value={formData.hour}
                onChange={(e) => setFormData(prev => ({ ...prev, hour: Number(e.target.value) }))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>{i}:00</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-bold hover:from-indigo-500 hover:to-indigo-600 transition-all"
          >
            查询吉凶
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className={`rounded-xl p-5 border ${
              result.suitable 
                ? "bg-gradient-to-br from-green-800/60 to-green-900/40 border-green-700/30" 
                : "bg-gradient-to-br from-red-800/60 to-red-900/40 border-red-700/30"
            }`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                {result.suitable ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400" />
                )}
                <div className="text-2xl font-bold text-white">
                  {result.suitable ? "适宜" : "不宜"}
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-3 mb-3">
                <div className="text-xs text-white/60 mb-1">格局</div>
                <div className="text-sm font-bold text-white">{result.geju}</div>
              </div>

              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs text-white/60 mb-1">说明</div>
                <div className="text-sm text-white">{result.desc}</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-400">适宜事项</span>
          </div>

          <div className="space-y-2">
            {SHI_YI_SHI_XIANG.map((s, idx) => (
              <div key={idx} className="bg-indigo-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-indigo-300">{s.name}</div>
                  <div className="text-xs text-indigo-200/60">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowJishi(!showJishi)}
          className="w-full py-3 bg-white/10 text-indigo-300 rounded-xl font-medium hover:bg-white/20 transition-colors mb-4"
        >
          {showJishi ? "隐藏吉凶时辰" : "查看吉凶时辰"}
        </button>

        {showJishi && (
          <div className="space-y-4 mb-4">
            <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-4 border border-green-800/30">
              <div className="text-sm font-bold text-green-300 mb-3">吉时</div>
              <div className="space-y-2">
                {JI_SHI_PAN_DUAN.吉时.map((shi, idx) => (
                  <div key={idx} className="bg-green-800/30 rounded-lg p-3">
                    <div className="font-bold text-green-200 mb-1">{shi.name}</div>
                    <div className="text-xs text-green-100/70">{shi.desc}</div>
                    <div className="text-xs text-green-400/50 mt-1">——{shi.chuchu}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-xl p-4 border border-red-800/30">
              <div className="text-sm font-bold text-red-300 mb-3">凶时</div>
              <div className="space-y-2">
                {JI_SHI_PAN_DUAN.凶时.map((shi, idx) => (
                  <div key={idx} className="bg-red-800/30 rounded-lg p-3">
                    <div className="font-bold text-red-200 mb-1">{shi.name}</div>
                    <div className="text-xs text-red-100/70">{shi.desc}</div>
                    <div className="text-xs text-red-400/50 mt-1">——{shi.chuchu}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="text-sm font-medium text-amber-400 mb-3">奇门择吉简介</div>
          <div className="space-y-2 text-xs text-amber-100/70">
            <p><strong className="text-amber-300">起源：</strong>{QIMEN_ZEJI_INTRO.origin}</p>
            <p><strong className="text-amber-300">特点：</strong></p>
            <ul className="list-disc list-inside">
              {QIMEN_ZEJI_INTRO.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}