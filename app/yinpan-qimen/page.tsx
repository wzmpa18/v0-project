"use client"

import { useState, useEffect } from "react"

export default function YinpanQimenPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const mockResult = {
        ju: '阳遁一局',
        palace: 1,
        tiangan: '甲子',
        dizhi: '子',
      }
      setResult(mockResult)
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-24">
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* 标题 */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-amber-400">阴盘奇门</h1>
          <p className="text-gray-400 text-sm mt-1">基于阴盘奇门遁甲经典古籍</p>
        </div>

        {/* 输入表单 */}
        <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
          <h2 className="text-lg font-semibold text-amber-400">起课信息</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">日期</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">时间</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-amber-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? '起课中...' : '开始起课'}
            </button>
          </form>
        </div>

        {/* 结果展示 */}
        {result && (
          <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
            <h2 className="text-lg font-semibold text-amber-400">排盘结果</h2>
            <div className="space-y-3">
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-400">局数</div>
                <div className="text-xl font-semibold text-amber-400">{result.ju}</div>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-400">宫位</div>
                <div className="text-xl font-semibold text-amber-400">{result.palace}宫</div>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-400">天干地支</div>
                <div className="text-xl font-semibold text-amber-400">{result.tiangan} {result.dizhi}</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-900/30 rounded-lg border border-amber-600/50">
              <p className="text-amber-300 text-sm">
                【古籍引用】阴盘奇门遁甲，出自《奇门遁甲大全》。以年月日时起局，注重时空信息，
                九宫八卦，以阴阳二遁为基，九星八门八神配局，可断吉凶祸福，运筹帷幄。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
