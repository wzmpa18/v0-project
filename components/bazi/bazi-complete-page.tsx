"use client"

import { useState, useEffect } from "react"
import { calculateBazi, TIAN_GAN, DI_ZHI, JIA_ZI, GAN_WUXING, ZHI_WUXING, GAN_YIN_YANG, ZHI_YIN_YANG, JIAZI_NAYIN, ZHI_CANG_GAN, getShiShen, getCangGanShiShen, getKongWang, getTaiYuan, getMingGong, getShenGong, calculateDaYun, calculateLiuNian, calculateWuxingCount, calculateWuxingWithCangGan } from "@/lib/bazi-data"
import { checkShenShaByPosition } from "@/lib/bazi-shenshe"
import { calculateWangShuai } from "@/lib/bazi-wangshuai"
import { determineGeJuSimple as determineGeJu } from "@/lib/bazi-geju"
import { getGuJiContent, getDuanYu } from "@/lib/bazi-guji-data"

export default function BaziCompletePage() {
  const [baziData, setBaziData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    gender: "male" as const,
    calendarType: "solar" as const,
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const result = calculateBazi(formData)
      setBaziData(result)
      setLoading(false)
    }, 500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value
    }))
  }

  useEffect(() => {
    const result = calculateBazi({
      year: 1990,
      month: 1,
      day: 15,
      hour: 12,
      minute: 0
    })
    setBaziData(result)
  }, [])

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "木": "text-green-600",
      "火": "text-red-600",
      "土": "text-amber-600",
      "金": "text-gray-600",
      "水": "text-blue-600"
    }
    return colors[wuxing] || "text-gray-600"
  }

  const getGanZhiBg = (wuxing: string) => {
    const colors: Record<string, string> = {
      "木": "bg-green-100",
      "火": "bg-red-100",
      "土": "bg-amber-100",
      "金": "bg-gray-100",
      "水": "bg-blue-100"
    }
    return colors[wuxing] || "bg-gray-100"
  }

  return (
    <div className="min-h-screen bg-white pb-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-500 px-4 py-3">
          <h1 className="text-lg font-bold text-white text-center">问真八字</h1>
          <p className="text-xs text-white/80 text-center">渊海子平 · 三命通会 · 滴天髓 · 子平真诠</p>
        </div>

        <div className="p-3">
          <div className="bg-gray-50 rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 w-16">姓名</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="请输入姓名"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700 w-16">性别</span>
              <div className="flex gap-3">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-amber-600"
                  />
                  <span className="text-sm text-gray-700">男</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-amber-600"
                  />
                  <span className="text-sm text-gray-700">女</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700 w-16">历法</span>
              <div className="flex gap-3">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="calendarType"
                    value="solar"
                    checked={formData.calendarType === "solar"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-amber-600"
                  />
                  <span className="text-sm text-gray-700">公历</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="calendarType"
                    value="lunar"
                    checked={formData.calendarType === "lunar"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-amber-600"
                  />
                  <span className="text-sm text-gray-700">农历</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 w-16">出生日期</span>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min={1900}
                max={2100}
                className="w-20 px-2 py-2 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="年"
              />
              <span className="text-gray-400">年</span>
              <input
                type="number"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                min={1}
                max={12}
                className="w-14 px-2 py-2 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="月"
              />
              <span className="text-gray-400">月</span>
              <input
                type="number"
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                min={1}
                max={31}
                className="w-14 px-2 py-2 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="日"
              />
              <span className="text-gray-400">日</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 w-16">出生时辰</span>
              <select
                name="hour"
                value={formData.hour}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              >
                {[
                  { value: 23, label: "子时 23:00-01:00" },
                  { value: 1, label: "丑时 01:00-03:00" },
                  { value: 3, label: "寅时 03:00-05:00" },
                  { value: 5, label: "卯时 05:00-07:00" },
                  { value: 7, label: "辰时 07:00-09:00" },
                  { value: 9, label: "巳时 09:00-11:00" },
                  { value: 11, label: "午时 11:00-13:00" },
                  { value: 13, label: "未时 13:00-15:00" },
                  { value: 15, label: "申时 15:00-17:00" },
                  { value: 17, label: "酉时 17:00-19:00" },
                  { value: 19, label: "戌时 19:00-21:00" },
                  { value: 21, label: "亥时 21:00-23:00" },
                ].map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-gray-800 text-white rounded-xl font-semibold text-sm hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "排盘中..." : "开始排盘"}
            </button>
          </div>
        </div>

        {baziData && (
          <div className="p-3 space-y-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-gray-800">{baziData.name || "未知姓名"}</div>
              <div className="text-sm text-gray-600 mt-1">{baziData.gender === "male" ? "男命" : "女命"} · {baziData.solarDate}</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-700">四柱八字</h3>
              </div>
              <div className="grid grid-cols-4">
                {["年", "月", "日", "时"].map((zhu, idx) => {
                  const zhuData = baziData.siZhu[["year", "month", "day", "hour"][idx]]
                  const ganWuxing = GAN_WUXING[zhuData.gan]
                  const zhiWuxing = ZHI_WUXING[zhuData.zhi]
                  
                  return (
                    <div key={zhu} className="text-center py-3 border-r border-gray-100 last:border-r-0">
                      <div className="text-xs text-gray-500 mb-1">{zhu}</div>
                      <div className={`text-2xl font-bold py-1 ${getWuxingColor(ganWuxing)}`}>{zhuData.gan}</div>
                      <div className="text-xs text-gray-600 py-0.5">{zhuData.shiShen}</div>
                      <div className={`text-2xl font-bold py-1 ${getWuxingColor(zhiWuxing)}`}>{zhuData.zhi}</div>
                      <div className="text-xs text-gray-400 mt-1 truncate">{zhuData.naYin}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-700">五行统计</h3>
              </div>
              <div className="grid grid-cols-5">
                {["金", "木", "水", "火", "土"].map((wuxing) => {
                  const count = calculateWuxingCount(
                    baziData.siZhu.year.gan, baziData.siZhu.year.zhi,
                    baziData.siZhu.month.gan, baziData.siZhu.month.zhi,
                    baziData.siZhu.day.gan, baziData.siZhu.day.zhi,
                    baziData.siZhu.hour.gan, baziData.siZhu.hour.zhi
                  )
                  return (
                    <div key={wuxing} className="text-center py-2">
                      <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-sm font-bold ${getGanZhiBg(wuxing)} ${getWuxingColor(wuxing)}`}>
                        {wuxing}
                      </div>
                      <div className="text-sm font-bold text-gray-800 mt-1">{count[wuxing]}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-700">旺衰分析</h3>
              </div>
              <div className="px-3 py-2 space-y-1.5">
                {(() => {
                  const wangShuai = calculateWangShuai({
                    yearGan: baziData.siZhu.year.gan,
                    yearZhi: baziData.siZhu.year.zhi,
                    monthGan: baziData.siZhu.month.gan,
                    monthZhi: baziData.siZhu.month.zhi,
                    dayGan: baziData.siZhu.day.gan,
                    dayZhi: baziData.siZhu.day.zhi,
                    hourGan: baziData.siZhu.hour.gan,
                    hourZhi: baziData.siZhu.hour.zhi
                  })
                  return (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">日主</span>
                        <span className="font-semibold text-gray-800">{wangShuai.riZhu}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">旺衰等级</span>
                        <span className="font-semibold text-blue-600">{wangShuai.level}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">得令</span>
                        <span className={wangShuai.deLing ? "text-green-600" : "text-gray-400"}>
                          {wangShuai.deLing ? "✓ 得令" : "✗ 不得令"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">得地</span>
                        <span className={wangShuai.deDi ? "text-green-600" : "text-gray-400"}>
                          {wangShuai.deDi ? "✓ 得地" : "✗ 不得地"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">得势</span>
                        <span className={wangShuai.deShi ? "text-green-600" : "text-gray-400"}>
                          {wangShuai.deShi ? "✓ 得势" : "✗ 不得势"}
                        </span>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-700">格局判定</h3>
              </div>
              <div className="px-3 py-2 space-y-1.5">
                {(() => {
                  const geJu = determineGeJu({
                    yearGan: baziData.siZhu.year.gan,
                    yearZhi: baziData.siZhu.year.zhi,
                    monthGan: baziData.siZhu.month.gan,
                    monthZhi: baziData.siZhu.month.zhi,
                    dayGan: baziData.siZhu.day.gan,
                    dayZhi: baziData.siZhu.day.zhi,
                    hourGan: baziData.siZhu.hour.gan,
                    hourZhi: baziData.siZhu.hour.zhi
                  })
                  return (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">格局</span>
                        <span className="font-semibold text-purple-600">{geJu.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">用神</span>
                        <span className="font-semibold text-green-600">{geJu.yongShen}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">喜神</span>
                        <span className="font-semibold text-blue-600">{geJu.xiShen}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">忌神</span>
                        <span className="font-semibold text-red-600">{geJu.jiShen}</span>
                      </div>
                      <div className="pt-2 mt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-600">{geJu.description}</p>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-700">神煞</h3>
              </div>
              <div className="px-3 py-2">
                {(() => {
                  const shenSha = checkShenShaByPosition({
                    yearGan: baziData.siZhu.year.gan,
                    yearZhi: baziData.siZhu.year.zhi,
                    monthGan: baziData.siZhu.month.gan,
                    monthZhi: baziData.siZhu.month.zhi,
                    dayGan: baziData.siZhu.day.gan,
                    dayZhi: baziData.siZhu.day.zhi,
                    hourGan: baziData.siZhu.hour.gan,
                    hourZhi: baziData.siZhu.hour.zhi
                  })
                  return (
                    <div className="space-y-1">
                      {["year", "month", "day", "hour"].map((zhuKey, idx) => {
                        const list = shenSha[zhuKey as keyof typeof shenSha]
                        const zhuNames = ["年柱", "月柱", "日柱", "时柱"]
                        if (list.length === 0) return null
                        return (
                          <div key={zhuKey} className="flex items-start gap-2">
                            <span className="text-xs text-gray-500 min-w-[3rem]">{zhuNames[idx]}</span>
                            <div className="flex flex-wrap gap-1">
                              {list.map((sha, i) => (
                                <span
                                  key={i}
                                  className={`px-2 py-0.5 rounded text-xs ${
                                    sha.includes("羊刃") || sha.includes("劫煞") || sha.includes("亡神")
                                      ? "bg-red-100 text-red-700"
                                      : sha.includes("空亡")
                                      ? "bg-gray-100 text-gray-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {sha}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-700">胎元命宫身宫</h3>
              </div>
              <div className="px-3 py-2 space-y-1.5">
                {(() => {
                  const taiYuan = getTaiYuan(baziData.siZhu.month.gan, baziData.siZhu.month.zhi)
                  const mingGong = getMingGong(baziData.siZhu.month.zhi, baziData.siZhu.hour.zhi)
                  const shenGong = getShenGong(baziData.siZhu.month.zhi, baziData.siZhu.hour.zhi)
                  
                  return (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">胎元</span>
                        <span className="font-semibold">{taiYuan} ({JIAZI_NAYIN[taiYuan] || ""})</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">命宫</span>
                        <span className="font-semibold">{mingGong.ganZhi} ({mingGong.naYin})</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">身宫</span>
                        <span className="font-semibold">{shenGong.ganZhi} ({shenGong.naYin})</span>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-700">大运</h3>
              </div>
              <div className="px-3 py-2 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  {(() => {
                    const daYun = calculateDaYun(
                      baziData.siZhu.year.gan,
                      baziData.siZhu.month.zhi,
                      baziData.siZhu.day.gan,
                      baziData.siZhu.hour.zhi,
                      baziData.gender
                    )
                    return daYun.map((yun, idx) => {
                      const ganWuxing = GAN_WUXING[yun.gan]
                      const zhiWuxing = ZHI_WUXING[yun.zhi]
                      return (
                        <div key={idx} className="text-center min-w-[50px]">
                          <div className="text-xs text-gray-500">{yun.ageRange}</div>
                          <div className={`text-lg font-bold ${getWuxingColor(ganWuxing)}`}>{yun.gan}</div>
                          <div className="text-xs text-gray-600">{yun.shiShen}</div>
                          <div className={`text-lg font-bold ${getWuxingColor(zhiWuxing)}`}>{yun.zhi}</div>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-700">古籍参考</h3>
              </div>
              <div className="px-3 py-2 space-y-2">
                {(() => {
                  const guJi = getGuJiContent(
                    baziData.siZhu.day.gan,
                    baziData.siZhu.month.zhi
                  )
                  return guJi.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="p-2 bg-blue-50 rounded-lg">
                      <div className="text-xs font-semibold text-blue-700">{item.book}</div>
                      <div className="text-xs text-gray-700 italic mt-1">"{item.original}"</div>
                      <div className="text-xs text-gray-600 mt-1">{item.translation}</div>
                    </div>
                  ))
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
