"use client"

import { useState, useEffect } from "react"
import { calculateBazi, TIAN_GAN, DI_ZHI, JIA_ZI, GAN_WUXING, ZHI_WUXING, GAN_YIN_YANG, ZHI_YIN_YANG, JIAZI_NAYIN, ZHI_CANG_GAN, getShiShen, getCangGanShiShen, getKongWang, getTaiYuan, getMingGong, getShenGong, calculateDaYun, calculateLiuNian, calculateWuxingCount, calculateWuxingWithCangGan } from "@/lib/bazi-data"
import { checkShenShaByPosition } from "@/lib/bazi-shenshe"
import { calculateWangShuai } from "@/lib/bazi-wangshuai"
import { determineGeJu } from "@/lib/bazi-geju"
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
      "木": "text-green-600 bg-green-50",
      "火": "text-red-600 bg-red-50",
      "土": "text-yellow-700 bg-yellow-50",
      "金": "text-gray-600 bg-gray-50",
      "水": "text-blue-600 bg-blue-50"
    }
    return colors[wuxing] || "text-gray-600 bg-gray-50"
  }

  const getWuxingBg = (wuxing: string) => {
    const colors: Record<string, string> = {
      "木": "bg-gradient-to-br from-green-100 to-green-200",
      "火": "bg-gradient-to-br from-red-100 to-red-200",
      "土": "bg-gradient-to-br from-yellow-100 to-yellow-200",
      "金": "bg-gradient-to-br from-gray-100 to-gray-200",
      "水": "bg-gradient-to-br from-blue-100 to-blue-200"
    }
    return colors[wuxing] || "bg-gradient-to-br from-gray-100 to-gray-200"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-24">
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* 标题 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">八字排盘</h1>
          <p className="text-sm text-gray-500">渊海子平 · 三命通会 · 滴天髓 · 子平真诠</p>
        </div>

        {/* 输入表单 */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入姓名"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  男
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  女
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">历法</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="calendarType"
                    value="solar"
                    checked={formData.calendarType === "solar"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  公历
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="calendarType"
                    value="lunar"
                    checked={formData.calendarType === "lunar"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  农历
                </label>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">年</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min={1900}
                  max={2100}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">月</label>
                <input
                  type="number"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  min={1}
                  max={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">日</label>
                <input
                  type="number"
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  min={1}
                  max={31}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">时</label>
                <input
                  type="number"
                  name="hour"
                  value={formData.hour}
                  onChange={handleInputChange}
                  min={0}
                  max={23}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? "排盘中..." : "开始排盘"}
            </button>
          </form>
        </div>

        {/* 排盘结果 */}
        {baziData && (
          <>
            {/* 基本信息 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="text-center space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {baziData.name || "未知姓名"}
                </h2>
                <p className="text-sm text-gray-600">
                  {baziData.gender === "male" ? "男命" : "女命"} · {baziData.solarDate}
                </p>
              </div>
            </div>

            {/* 四柱显示 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">四柱八字</h3>
              <div className="grid grid-cols-4 gap-2">
                {["年", "月", "日", "时"].map((zhu, idx) => {
                  const zhuData = baziData.siZhu[["year", "month", "day", "hour"][idx]]
                  const ganWuxing = GAN_WUXING[zhuData.gan]
                  const zhiWuxing = ZHI_WUXING[zhuData.zhi]
                  
                  return (
                    <div key={zhu} className="text-center">
                      <div className="text-sm text-gray-500 mb-1">{zhu}</div>
                      {/* 天干 */}
                      <div className={`text-2xl font-bold py-2 rounded-t-lg ${getWuxingBg(ganWuxing)}`}>
                        <span className={getWuxingColor(ganWuxing).split(" ")[0]}>{zhuData.gan}</span>
                      </div>
                      {/* 十神 */}
                      <div className="text-xs text-gray-600 py-1 bg-gray-50">
                        {zhuData.shiShen}
                      </div>
                      {/* 地支 */}
                      <div className={`text-2xl font-bold py-2 rounded-b-lg ${getWuxingBg(zhiWuxing)}`}>
                        <span className={getWuxingColor(zhiWuxing).split(" ")[0]}>{zhuData.zhi}</span>
                      </div>
                      {/* 藏干 */}
                      <div className="text-xs text-gray-500 mt-1">
                        {zhuData.cangGan?.map((gan: string, i: number) => (
                          <span key={i} className="mx-1">{gan}</span>
                        ))}
                      </div>
                      {/* 纳音 */}
                      <div className="text-xs text-gray-400 mt-1 truncate">
                        {zhuData.naYin}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 五行统计 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">五行统计</h3>
              <div className="grid grid-cols-5 gap-2 text-center">
                {["金", "木", "水", "火", "土"].map((wuxing) => {
                  const count = calculateWuxingCount(
                    baziData.siZhu.year.gan, baziData.siZhu.year.zhi,
                    baziData.siZhu.month.gan, baziData.siZhu.month.zhi,
                    baziData.siZhu.day.gan, baziData.siZhu.day.zhi,
                    baziData.siZhu.hour.gan, baziData.siZhu.hour.zhi
                  )
                  return (
                    <div key={wuxing} className={`p-2 rounded-lg ${getWuxingBg(wuxing)}`}>
                      <div className={`font-bold ${getWuxingColor(wuxing).split(" ")[0]}`}>{wuxing}</div>
                      <div className="text-2xl font-bold">{count[wuxing]}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 旺衰分析 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">旺衰分析</h3>
              <div className="space-y-2">
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
                      <div className="flex justify-between">
                        <span className="text-gray-600">日主</span>
                        <span className="font-semibold">{wangShuai.riZhu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">旺衰等级</span>
                        <span className="font-semibold text-blue-600">{wangShuai.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">得令</span>
                        <span className={wangShuai.deLing ? "text-green-600" : "text-gray-400"}>
                          {wangShuai.deLing ? "✓ 得令" : "✗ 不得令"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">得地</span>
                        <span className={wangShuai.deDi ? "text-green-600" : "text-gray-400"}>
                          {wangShuai.deDi ? "✓ 得地" : "✗ 不得地"}
                        </span>
                      </div>
                      <div className="flex justify-between">
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

            {/* 格局判定 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">格局判定</h3>
              <div className="space-y-2">
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
                      <div className="flex justify-between">
                        <span className="text-gray-600">格局</span>
                        <span className="font-semibold text-purple-600">{geJu.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">格局类型</span>
                        <span className="font-semibold">{geJu.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">用神</span>
                        <span className="font-semibold text-green-600">{geJu.yongShen}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">喜神</span>
                        <span className="font-semibold text-blue-600">{geJu.xiShen}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">忌神</span>
                        <span className="font-semibold text-red-600">{geJu.jiShen}</span>
                      </div>
                      <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-700">{geJu.description}</p>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>

            {/* 神煞 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">神煞</h3>
              <div className="space-y-2">
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
                    <>
                      {["年", "月", "日", "时"].map((zhu, idx) => {
                        const zhuKey = ["year", "month", "day", "hour"][idx]
                        const list = shenSha[zhuKey as keyof typeof shenSha]
                        return list.length > 0 ? (
                          <div key={zhu} className="flex items-start gap-2">
                            <span className="text-gray-500 min-w-[2rem]">{zhu}</span>
                            <div className="flex flex-wrap gap-1">
                              {list.map((sha, i) => (
                                <span
                                  key={i}
                                  className={`px-2 py-1 rounded text-xs ${
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
                        ) : null
                      })}
                    </>
                  )
                })()}
              </div>
            </div>

            {/* 格局断语 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">格局断语</h3>
              <div className="space-y-3">
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
                  const duanYu = getDuanYu(
                    baziData.siZhu.day.gan,
                    baziData.siZhu.month.zhi,
                    geJu.name
                  )
                  return duanYu.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-l-4 border-yellow-400">
                      <div className="text-sm text-gray-800 font-medium mb-1">
                        · {item.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.content}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        出处：{item.source}
                      </div>
                    </div>
                  ))
                })()}
              </div>
            </div>

            {/* 胎元命宫身宫 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">胎元命宫身宫</h3>
              <div className="space-y-2">
                {(() => {
                  const taiYuan = getTaiYuan(baziData.siZhu.month.gan, baziData.siZhu.month.zhi)
                  const mingGong = getMingGong(baziData.siZhu.month.zhi, baziData.siZhu.hour.zhi)
                  const shenGong = getShenGong(baziData.siZhu.month.zhi, baziData.siZhu.hour.zhi)
                  
                  return (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">胎元</span>
                        <span className="font-semibold">{taiYuan} ({JIAZI_NAYIN[taiYuan] || ""})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">命宫</span>
                        <span className="font-semibold">{mingGong.ganZhi} ({mingGong.naYin})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">身宫</span>
                        <span className="font-semibold">{shenGong.ganZhi} ({shenGong.naYin})</span>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>

            {/* 大运 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">大运</h3>
              <div className="overflow-x-auto">
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
                        <div key={idx} className="flex flex-col items-center min-w-[60px] p-2 bg-gray-50 rounded-lg">
                          <div className="text-xs text-gray-500">{yun.ageRange}</div>
                          <div className={`text-xl font-bold ${getWuxingColor(ganWuxing).split(" ")[0]}`}>{yun.gan}</div>
                          <div className="text-xs text-gray-600">{yun.shiShen}</div>
                          <div className={`text-xl font-bold ${getWuxingColor(zhiWuxing).split(" ")[0]}`}>{yun.zhi}</div>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </div>

            {/* 古籍引用 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">古籍参考</h3>
              <div className="space-y-2">
                {(() => {
                  const guJi = getGuJiContent(
                    baziData.siZhu.day.gan,
                    baziData.siZhu.month.zhi
                  )
                  return guJi.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <div className="text-xs font-semibold text-blue-700 mb-1">
                        {item.book}
                      </div>
                      <div className="text-sm text-gray-700 italic">
                        "{item.original}"
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {item.translation}
                      </div>
                    </div>
                  ))
                })()}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
