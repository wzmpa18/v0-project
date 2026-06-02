"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, BookOpen, Info } from "lucide-react"
import { calculateBazi, GAN_WUXING, ZHI_WUXING, GAN_YIN_YANG, ZHI_YIN_YANG, calculateWuxingCount } from "@/lib/bazi-data"
import { checkShenShaByPosition } from "@/lib/bazi-shenshe"
import { calculateWangShuai } from "@/lib/bazi-wangshuai"
import { determineGeJu } from "@/lib/bazi-geju"
import { getGuJiContent, getDuanYu } from "@/lib/bazi-guji-data"

export function BaziJiexiPage() {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [resultTab, setResultTab] = useState<"basic" | "geju" | "shenshe" | "dayun" | "guji">("basic")
  const [baziData, setBaziData] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    gender: "male" as const,
    calendarType: "solar" as const,
    year: 1990,
    month: 1,
    day: 15,
    hour: 12,
    minute: 0
  })

  // 初始化默认数据
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = calculateBazi(formData)
    setBaziData(result)
    setActiveTab("result")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value
    }))
  }

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "木": "text-emerald-600",
      "火": "text-red-600",
      "土": "text-amber-700",
      "金": "text-gray-600",
      "水": "text-blue-600"
    }
    return colors[wuxing] || "text-gray-600"
  }

  const getWuxingBg = (wuxing: string) => {
    const colors: Record<string, string> = {
      "木": "bg-gradient-to-br from-emerald-50 to-emerald-100",
      "火": "bg-gradient-to-br from-red-50 to-red-100",
      "土": "bg-gradient-to-br from-amber-50 to-amber-100",
      "金": "bg-gradient-to-br from-gray-50 to-gray-100",
      "水": "bg-gradient-to-br from-blue-50 to-blue-100"
    }
    return colors[wuxing] || "bg-gradient-to-br from-gray-50 to-gray-100"
  }

  const renderInputForm = () => (
    <div className="min-h-screen bg-gradient-to-b from-ink-900 to-ink-800">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-ink-900/90 backdrop-blur border-b border-ink-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <button className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-ink-300" />
          </button>
          <h1 className="text-lg font-bold text-ink-50">八字解析</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 标题说明 */}
        <div className="bg-ink-800/50 border border-ink-700 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-gold-400 mb-2">渊海子平 · 三命通会</h2>
          <p className="text-ink-400 text-sm">
            基于传统命理学经典，通过出生时间排盘分析格局、用神、大运流年
          </p>
        </div>

        {/* 输入表单 */}
        <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5 space-y-4">
          {/* 姓名 */}
          <div>
            <label className="block text-sm font-medium text-ink-300 mb-2">姓名</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 placeholder-ink-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50"
              placeholder="请输入姓名"
            />
          </div>

          {/* 性别 */}
          <div>
            <label className="block text-sm font-medium text-ink-300 mb-2">性别</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, gender: "male" }))}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  formData.gender === "male"
                    ? "bg-gold-500 text-ink-950"
                    : "bg-ink-700 text-ink-300 hover:bg-ink-600"
                }`}
              >
                男命
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, gender: "female" }))}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  formData.gender === "female"
                    ? "bg-gold-500 text-ink-950"
                    : "bg-ink-700 text-ink-300 hover:bg-ink-600"
                }`}
              >
                女命
              </button>
            </div>
          </div>

          {/* 历法 */}
          <div>
            <label className="block text-sm font-medium text-ink-300 mb-2">历法选择</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, calendarType: "solar" }))}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  formData.calendarType === "solar"
                    ? "bg-vermilion-500 text-white"
                    : "bg-ink-700 text-ink-300 hover:bg-ink-600"
                }`}
              >
                公历
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, calendarType: "lunar" }))}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  formData.calendarType === "lunar"
                    ? "bg-vermilion-500 text-white"
                    : "bg-ink-700 text-ink-300 hover:bg-ink-600"
                }`}
              >
                农历
              </button>
            </div>
          </div>

          {/* 出生时间 */}
          <div>
            <label className="block text-sm font-medium text-ink-300 mb-2">出生时间</label>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="text-xs text-ink-500 mb-1 block">年</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min={1900}
                  max={2100}
                  className="w-full px-3 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 text-center focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="text-xs text-ink-500 mb-1 block">月</label>
                <input
                  type="number"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  min={1}
                  max={12}
                  className="w-full px-3 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 text-center focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="text-xs text-ink-500 mb-1 block">日</label>
                <input
                  type="number"
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  min={1}
                  max={31}
                  className="w-full px-3 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 text-center focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="text-xs text-ink-500 mb-1 block">时</label>
                <input
                  type="number"
                  name="hour"
                  value={formData.hour}
                  onChange={handleInputChange}
                  min={0}
                  max={23}
                  className="w-full px-3 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 text-center focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* 开始排盘按钮 */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-gold-500 to-amber-500 text-ink-950 rounded-xl font-bold text-lg shadow-lg hover:from-gold-400 hover:to-amber-400 transition-all active:scale-[0.98]"
          >
            开始排盘
          </button>
        </div>

        {/* 古籍参考 */}
        <div className="bg-ink-800/30 border border-ink-700/50 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-ink-200 mb-1">经典理论依据</h3>
              <p className="text-sm text-ink-400 leading-relaxed">
                本功能参考《渊海子平》、《三命通会》、《滴天髓》等命理学经典，提供格局分析、用神判断、大运流年等完整功能
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderResult = () => {
    if (!baziData) return null

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

    const duanYu = getDuanYu(
      baziData.siZhu.day.gan,
      baziData.siZhu.month.zhi,
      geJu.name
    )

    const guJi = getGuJiContent(
      baziData.siZhu.day.gan,
      baziData.siZhu.month.zhi
    )

    const daYun = calculateDaYun(
      baziData.siZhu.year.gan,
      baziData.siZhu.month.zhi,
      baziData.siZhu.day.gan,
      baziData.siZhu.hour.zhi,
      baziData.gender
    )

    return (
      <div className="min-h-screen bg-gradient-to-b from-ink-900 to-ink-800">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-ink-900/90 backdrop-blur border-b border-ink-700">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button onClick={() => setActiveTab("input")} className="p-2 -ml-2">
                <ArrowLeft className="w-6 h-6 text-ink-300" />
              </button>
              <h1 className="text-lg font-bold text-ink-50">八字解析结果</h1>
              <div className="w-10" />
            </div>
          </div>

          {/* 标签页 */}
          <div className="flex border-b border-ink-700 px-4">
            {[
              { id: "basic", label: "基本" },
              { id: "geju", label: "格局" },
              { id: "shenshe", label: "神煞" },
              { id: "dayun", label: "大运" },
              { id: "guji", label: "古籍" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setResultTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                  resultTab === tab.id
                    ? "text-gold-400"
                    : "text-ink-400 hover:text-ink-200"
                }`}
              >
                {tab.label}
                {resultTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 pb-24 space-y-4">
          {/* 基本信息 */}
          {resultTab === "basic" && (
            <>
              {/* 个人信息 */}
              <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-bold text-ink-50">
                    {baziData.name || "未知姓名"}
                  </h2>
                  <p className="text-ink-400">
                    {baziData.gender === "male" ? "男命" : "女命"} · {baziData.solarDate}
                  </p>
                </div>
              </div>

              {/* 四柱八字 */}
              <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-ink-50 mb-4 text-center">四柱八字</h3>
                <div className="grid grid-cols-4 gap-3">
                  {["年", "月", "日", "时"].map((zhu, idx) => {
                    const zhuData = baziData.siZhu[["year", "month", "day", "hour"][idx]]
                    const ganWuxing = GAN_WUXING[zhuData.gan]
                    const zhiWuxing = ZHI_WUXING[zhuData.zhi]
                    
                    return (
                      <div key={zhu} className="text-center">
                        <div className="text-sm text-ink-400 mb-2">{zhu}</div>
                        {/* 天干 */}
                        <div className={`text-3xl font-bold py-3 rounded-t-xl ${getWuxingBg(ganWuxing)}`}>
                          <span className={getWuxingColor(ganWuxing)}>{zhuData.gan}</span>
                        </div>
                        {/* 十神 */}
                        <div className="text-xs text-ink-400 py-2 bg-ink-900/50">
                          {zhuData.shiShen}
                        </div>
                        {/* 地支 */}
                        <div className={`text-3xl font-bold py-3 rounded-b-xl ${getWuxingBg(zhiWuxing)}`}>
                          <span className={getWuxingColor(zhiWuxing)}>{zhuData.zhi}</span>
                        </div>
                        {/* 藏干 */}
                        {zhuData.cangGan && (
                          <div className="text-xs text-ink-500 mt-2">
                            {zhuData.cangGan.map((gan: string, i: number) => (
                              <span key={i} className="mx-0.5">{gan}</span>
                            ))}
                          </div>
                        )}
                        {/* 纳音 */}
                        {zhuData.naYin && (
                          <div className="text-xs text-ink-500 mt-1 truncate">
                            {zhuData.naYin}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 五行统计 */}
              <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-ink-50 mb-4">五行统计</h3>
                <div className="grid grid-cols-5 gap-2 text-center">
                  {["金", "木", "水", "火", "土"].map((wuxing) => {
                    const count = calculateWuxingCount(
                      baziData.siZhu.year.gan, baziData.siZhu.year.zhi,
                      baziData.siZhu.month.gan, baziData.siZhu.month.zhi,
                      baziData.siZhu.day.gan, baziData.siZhu.day.zhi,
                      baziData.siZhu.hour.gan, baziData.siZhu.hour.zhi
                    )
                    return (
                      <div key={wuxing} className={`p-3 rounded-xl ${getWuxingBg(wuxing)}`}>
                        <div className={`font-bold ${getWuxingColor(wuxing)}`}>{wuxing}</div>
                        <div className="text-2xl font-bold text-ink-900">{count[wuxing]}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 旺衰分析 */}
              <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-ink-50 mb-4">日主旺衰</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-ink-400">日主</span>
                    <span className="font-bold text-ink-100">{wangShuai.riZhu}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ink-400">旺衰等级</span>
                    <span className="font-bold text-gold-400">{wangShuai.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ink-400">得令</span>
                    <span className={wangShuai.deLing ? "text-emerald-400 font-medium" : "text-ink-500"}>
                      {wangShuai.deLing ? "✓ 得令" : "✗ 不得令"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ink-400">得地</span>
                    <span className={wangShuai.deDi ? "text-emerald-400 font-medium" : "text-ink-500"}>
                      {wangShuai.deDi ? "✓ 得地" : "✗ 不得地"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ink-400">得势</span>
                    <span className={wangShuai.deShi ? "text-emerald-400 font-medium" : "text-ink-500"}>
                      {wangShuai.deShi ? "✓ 得势" : "✗ 不得势"}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 格局分析 */}
          {resultTab === "geju" && (
            <>
              <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-ink-50 mb-4">格局判定</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-ink-700">
                    <span className="text-ink-400">格局名称</span>
                    <span className="font-bold text-gold-400 text-lg">{geJu.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-ink-700">
                    <span className="text-ink-400">格局类型</span>
                    <span className="font-medium text-ink-100">{geJu.type}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-ink-700">
                    <span className="text-ink-400">用神</span>
                    <span className="font-medium text-emerald-400">{geJu.yongShen}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-ink-700">
                    <span className="text-ink-400">喜神</span>
                    <span className="font-medium text-blue-400">{geJu.xiShen}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ink-400">忌神</span>
                    <span className="font-medium text-red-400">{geJu.jiShen}</span>
                  </div>
                </div>
                <div className="mt-5 p-4 bg-ink-900/50 rounded-xl">
                  <p className="text-ink-300 leading-relaxed">{geJu.description}</p>
                </div>
              </div>

              {/* 格局断语 */}
              <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-ink-50 mb-4">格局断语</h3>
                <div className="space-y-3">
                  {duanYu.map((item, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-amber-500/10 to-gold-500/10 border-l-4 border-gold-500 rounded-r-xl">
                      <div className="text-ink-200 font-medium mb-2">
                        · {item.title}
                      </div>
                      <div className="text-ink-400 text-sm leading-relaxed">
                        {item.content}
                      </div>
                      <div className="text-ink-500 text-xs mt-2">
                        出处：{item.source}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 神煞 */}
          {resultTab === "shenshe" && (
            <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-ink-50 mb-4">神煞分析</h3>
              <div className="space-y-4">
                {["年", "月", "日", "时"].map((zhu, idx) => {
                  const zhuKey = ["year", "month", "day", "hour"][idx]
                  const list = shenSha[zhuKey as keyof typeof shenSha] || []
                  return list.length > 0 ? (
                    <div key={zhu} className="flex items-start gap-3 pb-4 border-b border-ink-700 last:border-0 last:pb-0">
                      <span className="text-ink-400 min-w-[2rem] font-medium">{zhu}</span>
                      <div className="flex flex-wrap gap-2">
                        {list.map((sha, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1.5 rounded-lg text-sm ${
                              sha.includes("羊刃") || sha.includes("劫煞") || sha.includes("亡神")
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : sha.includes("空亡")
                                ? "bg-ink-600 text-ink-300 border border-ink-500"
                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            }`}
                          >
                            {sha}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          )}

          {/* 大运流年 */}
          {resultTab === "dayun" && (
            <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-ink-50 mb-4">大运走势</h3>
              <div className="overflow-x-auto -mx-5 px-5">
                <div className="flex gap-3 min-w-max">
                  {daYun.map((yun, idx) => {
                    const ganWuxing = GAN_WUXING[yun.gan]
                    const zhiWuxing = ZHI_WUXING[yun.zhi]
                    return (
                      <div key={idx} className="flex flex-col items-center min-w-[70px] p-3 bg-ink-900 rounded-xl border border-ink-700">
                        <div className="text-xs text-ink-500 mb-2">{yun.ageRange}</div>
                        <div className={`text-2xl font-bold ${getWuxingColor(ganWuxing)}`}>{yun.gan}</div>
                        <div className="text-xs text-ink-400 py-1">{yun.shiShen}</div>
                        <div className={`text-2xl font-bold ${getWuxingColor(zhiWuxing)}`}>{yun.zhi}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <p className="text-xs text-ink-500 mt-4 text-center">
                十年一大运，把握人生机遇
              </p>
            </div>
          )}

          {/* 古籍参考 */}
          {resultTab === "guji" && (
            <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-ink-50 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-400" />
                古籍参考
              </h3>
              <div className="space-y-4">
                {guJi.map((item, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                    <div className="text-xs font-bold text-blue-300 mb-2">
                      {item.book}
                    </div>
                    <div className="text-ink-200 italic mb-2">
                      "{item.original}"
                    </div>
                    <div className="text-ink-400 text-sm">
                      {item.translation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return activeTab === "input" ? renderInputForm() : renderResult()
}
