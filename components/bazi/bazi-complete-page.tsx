"use client"

import { useState, useEffect } from "react"
import { calculateBazi, TIAN_GAN, DI_ZHI, JIA_ZI, GAN_WUXING, ZHI_WUXING, GAN_YIN_YANG, ZHI_YIN_YANG, JIAZI_NAYIN, ZHI_CANG_GAN, getShiShen, getCangGanShiShen, getKongWang, getTaiYuan, getMingGong, getShenGong, calculateDaYun, calculateLiuNian, calculateLiuYue, calculateWuxingCount, calculateWuxingWithCangGan, calculateQiYun, getChangShengStatusStatus } from "@/lib/bazi-data"
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
    hour: 0,
    minute: 0,
    birthPlace: "",
    group: "全部"
  })

  const [activeTab, setActiveTab] = useState("basic")

  const handleSubmit = () => {
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
    const now = new Date()
    const result = calculateBazi({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes()
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

  const getShiShenColor = (shiShen: string) => {
    if (shiShen.includes("官") || shiShen.includes("杀")) return "text-blue-600"
    if (shiShen.includes("财")) return "text-gray-600"
    if (shiShen.includes("印")) return "text-green-600"
    if (shiShen.includes("食") || shiShen.includes("伤")) return "text-red-600"
    if (shiShen.includes("比") || shiShen.includes("劫")) return "text-amber-600"
    return "text-gray-600"
  }

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  }

  const getCurrentTimeBazi = () => {
    const now = new Date()
    return calculateBazi({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes()
    })
  }

  const currentBazi = getCurrentTimeBazi()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">易</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800">问真排盘</h1>
        </div>
        <div className="w-8 h-8"></div>
      </div>

      <div className="bg-amber-50 mx-3 mt-3 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
            <span className="text-xs text-white">!</span>
          </div>
          <span className="text-sm text-amber-800">吉真紫微斗数App，包含八字排盘、紫微斗数等功能</span>
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
              <button
                onClick={() => setFormData(prev => ({ ...prev, calendarType: "solar" }))}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
              >
                四柱
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
            <span className="text-sm text-gray-500">{formatDateTime(new Date(formData.year, formData.month - 1, formData.day, formData.hour, formData.minute))}</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">出生地点</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">未知地 北京时间 -- --</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">分组</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">全部</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <div>真太阳时: {formatDateTime(new Date())}</div>
            <div>地址经纬: 北纬39.00 东经120.00</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">保存</span>
            <div className="w-10 h-5 rounded-full bg-gray-300"></div>
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

      <div className="bg-white mx-3 mt-3 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {["年", "月", "日", "时"].map((zhu, idx) => {
              const zhuData = currentBazi?.siZhu[["year", "month", "day", "hour"][idx]]
              return (
                <div key={zhu} className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{zhuData?.gan}</div>
                  <div className="text-2xl font-bold text-gray-800">{zhuData?.zhi}</div>
                </div>
              )
            })}
          </div>
          <div className="text-right">
            <div className="text-lg font-medium text-gray-800">
              {["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"][Math.floor((new Date().getHours() + 1) % 24 / 2)]}时
            </div>
            <div className="text-sm text-gray-500">{new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}</div>
            <button className="mt-2 px-4 py-1.5 border border-gray-300 rounded-full text-sm text-gray-600">
              即时排盘
            </button>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          <div>农历: {currentBazi?.lunarDate}</div>
          <div>公历: {currentBazi?.solarDate}</div>
        </div>
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
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "basic" && (
            <div className="p-4 space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">姓名</span>
                  <span className="text-sm text-gray-800">{baziData.name || "未知"}</span>
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
                  <span className="text-sm text-gray-800">{getTaiYuan(baziData.siZhu.month.gan, baziData.siZhu.month.zhi)} ({JIAZI_NAYIN[getTaiYuan(baziData.siZhu.month.gan, baziData.siZhu.month.zhi)] || ""})</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">命宫</span>
                  <span className="text-sm text-gray-800">{getMingGong(baziData.siZhu.month.zhi, baziData.siZhu.hour.zhi).ganZhi} ({getMingGong(baziData.siZhu.month.zhi, baziData.siZhu.hour.zhi).naYin})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">身宫</span>
                  <span className="text-sm text-gray-800">{getShenGong(baziData.siZhu.month.zhi, baziData.siZhu.hour.zhi).ganZhi} ({getShenGong(baziData.siZhu.month.zhi, baziData.siZhu.hour.zhi).naYin})</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "paiPan" && (
            <div className="p-4">
              <div className="grid grid-cols-5 text-center border-b border-gray-200">
                <div className="py-2 text-xs text-gray-500">日期</div>
                {["年柱", "月柱", "日柱", "时柱"].map((zhu, idx) => (
                  <div key={zhu} className="py-2 text-xs font-medium text-gray-700">{zhu}</div>
                ))}
              </div>

              <div className="grid grid-cols-5 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">主星</div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className="text-xs font-medium text-gray-700">
                    {baziData.siZhu[key].shiShen}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">天干</div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className={`text-xl font-bold ${getWuxingColor(GAN_WUXING[baziData.siZhu[key].gan])}`}>
                    {baziData.siZhu[key].gan}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">地支</div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className={`text-xl font-bold ${getWuxingColor(ZHI_WUXING[baziData.siZhu[key].zhi])}`}>
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
                {["year", "month", "day", "hour"].map((key) => {
                  const gan = baziData.siZhu[key].gan
                  const zhi = baziData.siZhu[key].zhi
                  return (
                    <div key={key} className="text-xs text-gray-600">
                      {getChangShengStatus(gan, zhi)}
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-5 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">纳音</div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className="text-xs text-gray-600">
                    {baziData.siZhu[key].naYin}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "detail" && (
            <div className="p-4">
              <div className="grid grid-cols-8 text-center border-b border-gray-200 text-xs">
                <div className="py-2 text-gray-500">日期</div>
                <div className="py-2 text-gray-500">流年</div>
                <div className="py-2 text-gray-500">大运</div>
                {["年柱", "月柱", "日柱", "时柱"].map((zhu) => (
                  <div key={zhu} className="py-2 font-medium text-gray-700">{zhu}</div>
                ))}
              </div>

              <div className="grid grid-cols-8 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">主星</div>
                <div className="text-xs text-gray-500"></div>
                <div className="text-xs text-gray-500"></div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className={`text-xs font-medium ${getShiShenColor(baziData.siZhu[key].shiShen)}`}>
                    {baziData.siZhu[key].shiShen}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-8 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">天干</div>
                <div></div>
                <div></div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className={`text-xl font-bold ${getWuxingColor(GAN_WUXING[baziData.siZhu[key].gan])}`}>
                    {baziData.siZhu[key].gan}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-8 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">地支</div>
                <div></div>
                <div></div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className={`text-xl font-bold ${getWuxingColor(ZHI_WUXING[baziData.siZhu[key].zhi])}`}>
                    {baziData.siZhu[key].zhi}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-8 py-2 border-b border-gray-100">
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

              <div className="grid grid-cols-8 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">星运</div>
                <div></div>
                <div></div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className="text-xs text-gray-600">
                    {getChangShengStatus(baziData.siZhu[key].gan, baziData.siZhu[key].zhi)}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-8 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">空亡</div>
                <div></div>
                <div></div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className="text-xs text-gray-600">
                    {getKongWang(baziData.siZhu[key].zhi)}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-8 text-center py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">纳音</div>
                <div></div>
                <div></div>
                {["year", "month", "day", "hour"].map((key) => (
                  <div key={key} className="text-xs text-gray-600">
                    {baziData.siZhu[key].naYin}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-8 py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500 text-center">神煞</div>
                <div></div>
                <div></div>
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
                  return ["year", "month", "day", "hour"].map((key) => (
                    <div key={key} className="text-xs text-amber-600 text-center">
                      {(shenSha[key as keyof typeof shenSha] || []).slice(0, 2).join(" ")}
                    </div>
                  ))
                })()}
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between text-sm">
                <div>
                  <div>起运: 出生后8年2月3天6时起运</div>
                  <div>交运: 逢戊、癸年 立春后27天 交大运</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-600">38岁</div>
                  <div className="text-blue-600">司令: 癸</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">大运</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-10 text-center text-xs">
                  <div className="row-span-2 flex items-center justify-center">
                    <span className="text-gray-500">大运</span>
                  </div>
                  {(() => {
                    const daYun = calculateDaYun(
                      baziData.siZhu.year.gan,
                      baziData.siZhu.month.zhi,
                      baziData.siZhu.day.gan,
                      baziData.siZhu.hour.zhi,
                      baziData.gender
                    )
                    return daYun.map((yun, idx) => (
                      <div key={idx}>
                        <div className="text-gray-500">{yun.ageRange}</div>
                        <div className={`font-bold ${getWuxingColor(GAN_WUXING[yun.gan])}`}>{yun.gan}</div>
                        <div className={`font-bold ${getWuxingColor(ZHI_WUXING[yun.zhi])}`}>{yun.zhi}</div>
                      </div>
                    ))
                  })()}
                </div>
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
                    {(() => {
                      const daYun = calculateDaYun(
                        baziData.siZhu.year.gan,
                        baziData.siZhu.month.zhi,
                        baziData.siZhu.day.gan,
                        baziData.siZhu.hour.zhi,
                        baziData.gender
                      )
                      return daYun.map(yun => `${yun.gan}${yun.zhi}`).join(" - ")
                    })()}
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

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">健康状态:</span>
                  <span className="text-sm text-gray-400">请输入</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">六亲状况:</span>
                  <span className="text-sm text-gray-400">请输入</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">性情描述:</span>
                  <span className="text-sm text-gray-400">请输入</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-medium text-gray-700 mb-3">关键事件反馈记录</div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 ml-3">
                    <div className="text-sm text-gray-500">暂无记录</div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center">
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-amber-600 text-white rounded-full font-medium">
                保存
              </button>
            </div>
          )}
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-2">
        <button className="flex flex-col items-center gap-1 text-amber-600">
          <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="3" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 16v4m8-8h-4M6 12H2m12-8a8 8 0 100 16 8 8 0 000-16z" />
            </svg>
          </div>
          <span className="text-xs font-medium">排盘</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500">
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-xs">记录</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500">
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xs">学堂</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500">
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-xs">设置</span>
        </button>
      </div>
    </div>
  )
}
