"use client"

import { useState, useEffect } from "react"
import { calculateBazi, TIAN_GAN, DI_ZHI, JIA_ZI, GAN_WUXING, ZHI_WUXING, GAN_YIN_YANG, ZHI_YIN_YANG, JIAZI_NAYIN, ZHI_CANG_GAN, getShiShen, getCangGanShiShen, getKongWang, getTaiYuan, getMingGong, getShenGong, calculateDaYun, calculateLiuNian, calculateLiuYue, calculateWuxingCount, calculateWuxingWithCangGan, calculateQiYun, getChangShengStatus } from "@/lib/bazi-data"
import { checkShenShaByPosition } from "@/lib/bazi-shenshe"
import { calculateWangShuai } from "@/lib/bazi-wangshuai"
import { determineGeJuSimple as determineGeJu } from "@/lib/bazi-geju"
import { getGuJiContent, getDuanYu } from "@/lib/bazi-guji-data"
import { Solar, Lunar } from "lunar-javascript"

export default function BaziCompletePage() {
  const [baziData, setBaziData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    gender: "male" as const,
    calendarType: "solar" as const,
    year: 1996,
    month: 6,
    day: 19,
    hour: 0,
    minute: 0,
    birthPlace: "",
    group: "全部"
  })

  const [activeTab, setActiveTab] = useState("detail")
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      let lunar: any
      if (formData.calendarType === "solar") {
        const solar = Solar.fromYmd(formData.year, formData.month, formData.day)
        lunar = solar.getLunar()
      } else {
        lunar = Lunar.fromYmd(formData.year, formData.month, formData.day)
      }
      
      const lunarYear = lunar.getYear()
      const lunarMonth = lunar.getMonth()
      const lunarDay = lunar.getDay()
      const hourZhi = DI_ZHI[Math.floor(formData.hour / 2)]
      
      const yearGan = lunar.getYearGan()
      const yearZhi = lunar.getYearZhi()
      const monthGan = lunar.getMonthGan()
      const monthZhi = lunar.getMonthZhi()
      const dayGan = lunar.getDayGan()
      const dayZhi = lunar.getDayZhi()
      
      const hourGanIndex = (TIAN_GAN.indexOf(dayGan) * 2 + DI_ZHI.indexOf(hourZhi)) % 10
      const hourGan = TIAN_GAN[hourGanIndex]

      const siZhu = {
        year: { gan: yearGan, zhi: yearZhi },
        month: { gan: monthGan, zhi: monthZhi },
        day: { gan: dayGan, zhi: dayZhi },
        hour: { gan: hourGan, zhi: hourZhi }
      }

      const daYun = calculateDaYun(yearGan, monthZhi, dayGan, hourZhi, formData.gender)
      
      const qiYunResult = calculateQiYun(lunar, formData.gender)

      const shenSha = checkShenShaByPosition({
        yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi
      })

      const result = {
        name: formData.name || "未知",
        gender: formData.gender,
        solarDate: `${formData.year}年${formData.month}月${formData.day}日 ${formData.hour}:${String(formData.minute).padStart(2, '0')}`,
        lunarDate: `${lunar.getYearInChinese()}${lunar.getMonthInChinese()}${lunar.getDayInChinese()}`,
        siZhu,
        daYun,
        qiYun: qiYunResult,
        shenSha,
        taiYuan: getTaiYuan(monthGan, monthZhi),
        mingGong: getMingGong(monthZhi, hourZhi),
        shenGong: getShenGong(monthZhi, hourZhi),
        age: new Date().getFullYear() - formData.year
      }

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
    const now = new Date()
    handleAutoPaiPan(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes())
  }, [])

  const handleAutoPaiPan = (year: number, month: number, day: number, hour: number, minute: number) => {
    const solar = Solar.fromYmd(year, month, day)
    const lunar = solar.getLunar()
    
    const lunarYear = lunar.getYear()
    const lunarMonth = lunar.getMonth()
    const lunarDay = lunar.getDay()
    const hourZhi = DI_ZHI[Math.floor(hour / 2)]
    
    const yearGan = lunar.getYearGan()
    const yearZhi = lunar.getYearZhi()
    const monthGan = lunar.getMonthGan()
    const monthZhi = lunar.getMonthZhi()
    const dayGan = lunar.getDayGan()
    const dayZhi = lunar.getDayZhi()
    
    const hourGanIndex = (TIAN_GAN.indexOf(dayGan) * 2 + DI_ZHI.indexOf(hourZhi)) % 10
    const hourGan = TIAN_GAN[hourGanIndex]

    const siZhu = {
      year: { gan: yearGan, zhi: yearZhi },
      month: { gan: monthGan, zhi: monthZhi },
      day: { gan: dayGan, zhi: dayZhi },
      hour: { gan: hourGan, zhi: hourZhi }
    }

    const daYun = calculateDaYun(yearGan, monthZhi, dayGan, hourZhi, "male")
    const qiYunResult = calculateQiYun(lunar, "male")

    const shenSha = checkShenShaByPosition({
      yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi
    })

    const result = {
      name: "未知",
      gender: "male" as const,
      solarDate: `${year}年${month}月${day}日 ${hour}:${String(minute).padStart(2, '0')}`,
      lunarDate: `${lunar.getYearInChinese()}${lunar.getMonthInChinese()}${lunar.getDayInChinese()}`,
      siZhu,
      daYun,
      qiYun: qiYunResult,
      shenSha,
      taiYuan: getTaiYuan(monthGan, monthZhi),
      mingGong: getMingGong(monthZhi, hourZhi),
      shenGong: getShenGong(monthZhi, hourZhi),
      age: new Date().getFullYear() - year
    }

    setBaziData(result)
  }

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "木": "text-green-600",
      "火": "text-red-600",
      "土": "text-amber-700",
      "金": "text-gray-700",
      "水": "text-blue-600"
    }
    return colors[wuxing] || "text-gray-700"
  }

  const getGanColor = (gan: string) => {
    return GAN_YIN_YANG[gan] === "阳" ? "text-red-600" : "text-amber-700"
  }

  const getShiShenColor = (shiShen: string) => {
    if (shiShen.includes("官") || shiShen.includes("杀")) return "text-blue-600"
    if (shiShen.includes("财")) return "text-gray-600"
    if (shiShen.includes("印")) return "text-green-600"
    if (shiShen.includes("食") || shiShen.includes("伤")) return "text-red-600"
    if (shiShen.includes("比") || shiShen.includes("劫")) return "text-amber-700"
    return "text-gray-600"
  }

  const getChangShengStatusForGan = (gan: string, zhi: string) => {
    const wuxing = GAN_WUXING[gan]
    return getChangShengStatus(wuxing, zhi)
  }

  const getLiuNianForYear = (targetYear: number, dayGan: string) => {
    const ganIdx = (targetYear - 4) % 10
    const zhiIdx = (targetYear - 4) % 12
    const gan = TIAN_GAN[ganIdx >= 0 ? ganIdx : ganIdx + 10]
    const zhi = DI_ZHI[zhiIdx >= 0 ? zhiIdx : zhiIdx + 12]
    return { year: targetYear, gan, zhi, shiShen: getShiShen(dayGan, gan) }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">易</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800">八字排盘</h1>
        </div>
        <div className="w-8 h-8"></div>
      </div>

      <div className="bg-amber-50 mx-3 mt-3 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
            <span className="text-xs text-white">!</span>
          </div>
          <span className="text-sm text-amber-800">八字排盘 - 基于《渊海子平》《三命通会》《滴天髓》《子平真诠》</span>
        </div>
        <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <span className="text-xs text-gray-500">×</span>
        </button>
      </div>

      <div className="bg-white mx-3 mt-3 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full text-gray-800 placeholder-gray-400 outline-none"
            placeholder="请输入姓名"
          />
        </div>

        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">性别</label>
            <div className="flex gap-2 ml-2">
              <button
                onClick={() => setFormData(prev => ({ ...prev, gender: "male" }))}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  formData.gender === "male"
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                男
              </button>
              <button
                onClick={() => setFormData(prev => ({ ...prev, gender: "female" }))}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  formData.gender === "female"
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                女
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">历法</label>
            <div className="flex gap-2 ml-2">
              <button
                onClick={() => setFormData(prev => ({ ...prev, calendarType: "solar" }))}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  formData.calendarType === "solar"
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                公历
              </button>
              <button
                onClick={() => setFormData(prev => ({ ...prev, calendarType: "lunar" }))}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  formData.calendarType === "lunar"
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                农历
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">出生时间</span>
            <span className="text-xs text-amber-500">(必填)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {formData.year}-{String(formData.month).padStart(2, '0')}-{String(formData.day).padStart(2, '0')} {String(formData.hour).padStart(2, '0')}:{String(formData.minute).padStart(2, '0')}
            </span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-gray-100">
          <div className="grid grid-cols-5 gap-2">
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-amber-500"
            >
              {Array.from({ length: 100 }, (_, i) => 1940 + i).map(y => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
            <select
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-amber-500"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>{m}月</option>
              ))}
            </select>
            <select
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-amber-500"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>{d}日</option>
              ))}
            </select>
            <select
              name="hour"
              value={formData.hour}
              onChange={handleInputChange}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-amber-500"
            >
              {Array.from({ length: 24 }, (_, i) => i).map(h => (
                <option key={h} value={h}>{h}时</option>
              ))}
            </select>
            <select
              name="minute"
              value={formData.minute}
              onChange={handleInputChange}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-amber-500"
            >
              {[0, 15, 30, 45].map(m => (
                <option key={m} value={m}>{m}分</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mx-4 my-4 py-3.5 bg-black text-amber-400 rounded-full font-semibold text-base hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "排盘中..." : "开始排盘"}
        </button>
      </div>

      {baziData && (
        <div className="bg-white mx-3 mt-3 rounded-xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            {[
              { key: "basic", label: "基本信息" },
              { key: "paiPan", label: "基本排盘" },
              { key: "detail", label: "专业细盘" },
              { key: "notes", label: "断事笔记" }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key
                    ? "text-amber-600"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "basic" && (
            <div className="p-4 space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">姓名</span>
                  <span className="text-sm text-gray-800">{baziData.name}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">性别</span>
                  <span className="text-sm text-gray-800">{baziData.gender === "male" ? "男命" : "女命"}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">出生日期</span>
                  <span className="text-sm text-gray-800">{baziData.solarDate}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">农历</span>
                  <span className="text-sm text-gray-800">{baziData.lunarDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">四柱八字</span>
                  <span className="text-sm font-bold text-gray-800">
                    {baziData.siZhu.year.gan}{baziData.siZhu.year.zhi} {baziData.siZhu.month.gan}{baziData.siZhu.month.zhi} {baziData.siZhu.day.gan}{baziData.siZhu.day.zhi} {baziData.siZhu.hour.gan}{baziData.siZhu.hour.zhi}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">胎元</span>
                  <span className="text-sm text-gray-800">{baziData.taiYuan} ({JIAZI_NAYIN[baziData.taiYuan] || ""})</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">命宫</span>
                  <span className="text-sm text-gray-800">{baziData.mingGong.ganZhi} ({baziData.mingGong.naYin})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">身宫</span>
                  <span className="text-sm text-gray-800">{baziData.shenGong.ganZhi} ({baziData.shenGong.naYin})</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "paiPan" && (
            <div className="p-4">
              <div className="grid grid-cols-5 text-center border-b border-gray-200">
                <div className="py-2 text-xs text-gray-500">日期</div>
                {["年柱", "月柱", "日柱", "时柱"].map((zhu) => (
                  <div key={zhu} className="py-2 text-xs font-medium text-gray-700">{zhu}</div>
                ))}
              </div>

              <div className="grid grid-cols-5 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">主星</div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className="text-xs font-medium text-gray-700">
                    {key === "day" ? "元男" : getShiShen(baziData.siZhu.day.gan, baziData.siZhu[key].gan)}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">天干</div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className={`text-xl font-bold ${getGanColor(baziData.siZhu[key].gan)}`}>
                    {baziData.siZhu[key].gan}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">地支</div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className={`text-xl font-bold ${getGanColor(baziData.siZhu[key].zhi)}`}>
                    {baziData.siZhu[key].zhi}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500 text-center">藏干</div>
                {["year", "month", "day", "hour"].map((key) => {
                  const cangGan = ZHI_CANG_GAN[baziData.siZhu[key].zhi] || []
                  return (
                    <div key={key} className="space-y-0.5">
                      {cangGan.map((cg, idx) => (
                        <div key={idx} className="text-xs text-gray-600 text-center">
                          {cg.gan}{getShiShen(baziData.siZhu.day.gan, cg.gan)}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-5 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">星运</div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className="text-xs text-gray-600">
                    {getChangShengStatusForGan(baziData.siZhu[key].gan, baziData.siZhu[key].zhi)}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">纳音</div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className="text-xs text-gray-600">
                    {JIAZI_NAYIN[baziData.siZhu[key].gan + baziData.siZhu[key].zhi]}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "detail" && (
            <div className="p-4">
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="grid grid-cols-7 text-center text-xs border-b border-gray-200">
                  <div className="py-2 text-gray-500">日期</div>
                  <div className="py-2 text-gray-500">流年</div>
                  <div className="py-2 text-gray-500">大运</div>
                  {["年柱", "月柱", "日柱", "时柱"].map((zhu) => (
                    <div key={zhu} className="py-2 font-medium text-gray-700">{zhu}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-center py-2 border-b border-gray-100">
                  <div className="text-xs text-gray-500">主星</div>
                  <div className="text-xs text-gray-500"></div>
                  <div className="text-xs text-gray-500"></div>
                  {["year", "month", "day", "hour"].map((key) => (
                    <div key={key} className={`text-xs font-medium ${getShiShenColor(getShiShen(baziData.siZhu.day.gan, baziData.siZhu[key].gan))}`}>
                      {key === "day" ? "元男" : getShiShen(baziData.siZhu.day.gan, baziData.siZhu[key].gan)}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-center py-2 border-b border-gray-100">
                  <div className="text-xs text-gray-500">天干</div>
                  <div></div>
                  <div></div>
                  {["year", "month", "day", "hour"].map((key) => (
                    <div key={key} className={`text-xl font-bold ${getGanColor(baziData.siZhu[key].gan)}`}>
                      {baziData.siZhu[key].gan}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-center py-2 border-b border-gray-100">
                  <div className="text-xs text-gray-500">地支</div>
                  <div></div>
                  <div></div>
                  {["year", "month", "day", "hour"].map((key) => (
                    <div key={key} className={`text-xl font-bold ${getGanColor(baziData.siZhu[key].zhi)}`}>
                      {baziData.siZhu[key].zhi}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 py-2 border-b border-gray-100">
                  <div className="text-xs text-gray-500 text-center">藏干</div>
                  <div></div>
                  <div></div>
                  {["year", "month", "day", "hour"].map((key) => {
                    const cangGan = ZHI_CANG_GAN[baziData.siZhu[key].zhi] || []
                    return (
                      <div key={key} className="space-y-0.5">
                        {cangGan.map((cg, idx) => (
                          <div key={idx} className="text-xs text-gray-600 text-center">
                            {cg.gan}{getShiShen(baziData.siZhu.day.gan, cg.gan)}
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>

                <div className="grid grid-cols-7 text-center py-2 border-b border-gray-100">
                  <div className="text-xs text-gray-500">星运</div>
                  <div></div>
                  <div></div>
                  {["year", "month", "day", "hour"].map((key) => (
                    <div key={key} className="text-xs text-gray-600">
                      {getChangShengStatusForGan(baziData.siZhu[key].gan, baziData.siZhu[key].zhi)}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-center py-2 border-b border-gray-100">
                  <div className="text-xs text-gray-500">自坐</div>
                  <div></div>
                  <div></div>
                  {["year", "month", "day", "hour"].map((key) => (
                    <div key={key} className="text-xs text-gray-600">
                      {getChangShengStatusForGan(baziData.siZhu[key].gan, baziData.siZhu[key].zhi)}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-center py-2 border-b border-gray-100">
                  <div className="text-xs text-gray-500">空亡</div>
                  <div></div>
                  <div></div>
                  {["year", "month", "day", "hour"].map((key) => (
                    <div key={key} className="text-xs text-gray-600">
                      {(getKongWang(baziData.siZhu[key].zhi) || []).join(" ")}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-center py-2 border-b border-gray-100">
                  <div className="text-xs text-gray-500">纳音</div>
                  <div></div>
                  <div></div>
                  {["year", "month", "day", "hour"].map((key) => (
                    <div key={key} className="text-xs text-gray-600">
                      {JIAZI_NAYIN[baziData.siZhu[key].gan + baziData.siZhu[key].zhi]}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 py-2 border-b border-gray-100">
                  <div className="text-xs text-gray-500 text-center">神煞</div>
                  <div></div>
                  <div></div>
                  {["year", "month", "day", "hour"].map((key) => {
                    const shaList = baziData.shenSha[key as keyof typeof baziData.shenSha] || []
                    return (
                      <div key={key} className="text-xs text-amber-700 text-center">
                        {shaList.slice(0, 4).join("\n")}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between text-sm">
                <div>
                  <div>起运: 出生后{baziData.qiYun?.years || 5}年{baziData.qiYun?.months || 1}月{baziData.qiYun?.days || 13}天{baziData.qiYun?.hours || 6}时起运</div>
                  <div>交运: 逢壬、丁年 寒露后27天 交大运</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-600">30岁</div>
                  <div className="text-blue-600">司令: 辛</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-gray-700">大运</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-11 text-center text-xs">
                  <div className="row-span-2 flex flex-col justify-center">
                    <span className="text-gray-500">大运</span>
                  </div>
                  {baziData.daYun?.slice(0, 10).map((yun: any, idx: number) => (
                    <div key={idx}>
                      <div className="text-gray-500">{yun.startYear}-{yun.startYear + 9}岁</div>
                      <div className={`font-bold ${getGanColor(yun.gan)}`}>{yun.gan}</div>
                      <div className={`font-bold ${getGanColor(yun.zhi)}`}>{yun.zhi}</div>
                      <div className="text-xs text-gray-500">{yun.shiShen}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-gray-700">流年</span>
                  <input
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="w-20 px-2 py-1 bg-gray-100 border border-gray-200 rounded text-sm text-center"
                  />
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-11 text-center text-xs">
                  <div className="row-span-3 flex flex-col justify-center">
                    <span className="text-gray-500">流年</span>
                  </div>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = selectedYear + i
                    const liuNian = getLiuNianForYear(year, baziData.siZhu.day.gan)
                    return (
                      <div key={i}>
                        <div className="text-gray-700 font-medium">{year}</div>
                        <div className={`font-bold ${getGanColor(liuNian.gan)}`}>{liuNian.gan}{getShiShenColor(liuNian.shiShen).replace('text-', '')}{liuNian.shiShen}</div>
                        <div className={`font-bold ${getGanColor(liuNian.zhi)}`}>{liuNian.zhi}</div>
                        <div className="text-xs text-gray-500">小运</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                <div className="text-sm text-amber-800 font-medium">流年提示: 岁运并临</div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="p-4">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-amber-400 text-sm mb-1">{baziData.gender === "male" ? "乾造" : "坤造"}</div>
                  <div className="text-white text-2xl font-bold space-x-2">
                    {baziData.siZhu.year.gan}{baziData.siZhu.year.zhi}
                    {baziData.siZhu.month.gan}{baziData.siZhu.month.zhi}
                    {baziData.siZhu.day.gan}{baziData.siZhu.day.zhi}
                    {baziData.siZhu.hour.gan}{baziData.siZhu.hour.zhi}
                  </div>
                  <div className="text-gray-400 text-xs mt-2">
                    {baziData.daYun?.map((yun: any) => `${yun.gan}${yun.zhi}`).join(" - ")}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button className="flex-1 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium">
                  命主反馈
                </button>
                <button className="flex-1 py-2 border border-amber-600 text-amber-600 rounded-lg text-sm font-medium">
                  师傅点评
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-700">职业</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-700">学历</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-700">财富</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-700">婚姻</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-amber-600 text-white rounded-full font-medium">
                保存
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}