"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, X, BookOpen, Sparkles } from "lucide-react"
import { Solar } from "lunar-javascript"
import {
  MAIN_STARS, LUCKY_STARS, UNLUCKY_STARS,
  TIAN_GAN_SI_HUA, calculateZiWeiPan, getGongDetail
} from "@/lib/ziwei-data"

// 十二地支（索引 0=子, 1=丑, ..., 11=亥）
const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
// 十天干
const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

// 五虎遁：年干对应的寅宫天干索引（TIAN_GAN 数组中的位置）
const WU_HU_DUN: Record<string, number> = {
  "甲": 2, "己": 2,  // 丙寅起
  "乙": 4, "庚": 4,  // 戊寅起
  "丙": 6, "辛": 6,  // 庚寅起
  "丁": 8, "壬": 8,  // 壬寅起
  "戊": 0, "癸": 0,  // 甲寅起
}

// 十二时辰（含时间范围）
const SHI_CHEN = [
  { name: "子时", range: "23:00-00:59" },
  { name: "丑时", range: "01:00-02:59" },
  { name: "寅时", range: "03:00-04:59" },
  { name: "卯时", range: "05:00-06:59" },
  { name: "辰时", range: "07:00-08:59" },
  { name: "巳时", range: "09:00-10:59" },
  { name: "午时", range: "11:00-12:59" },
  { name: "未时", range: "13:00-14:59" },
  { name: "申时", range: "15:00-16:59" },
  { name: "酉时", range: "17:00-18:59" },
  { name: "戌时", range: "19:00-20:59" },
  { name: "亥时", range: "21:00-22:59" },
]

// 四化颜色
const SI_HUA_COLORS: Record<string, string> = {
  "禄": "text-green-600",
  "权": "text-blue-600",
  "科": "text-purple-600",
  "忌": "text-red-600",
}

// 星曜五行颜色
const getStarColor = (star: string): string => {
  const info = (MAIN_STARS as Record<string, { wuxing: string }>)[star] ||
               (LUCKY_STARS as Record<string, { wuxing: string }>)[star] ||
               (UNLUCKY_STARS as Record<string, { wuxing: string }>)[star]
  if (!info) return "text-gray-700"
  const colors: Record<string, string> = {
    "金": "text-amber-600",
    "木": "text-green-600",
    "水": "text-blue-600",
    "火": "text-red-600",
    "土": "text-yellow-700",
  }
  return colors[info.wuxing] || "text-gray-700"
}

// 获取星曜的四化标记
const getSiHuaMark = (
  star: string,
  siHua: { 禄: string; 权: string; 科: string; 忌: string }
): string | null => {
  if (star === siHua.禄) return "禄"
  if (star === siHua.权) return "权"
  if (star === siHua.科) return "科"
  if (star === siHua.忌) return "忌"
  return null
}

interface GongInfo {
  index: number          // 地支索引 0-11
  palaceName: string     // 宫位名（命宫、兄弟宫...）
  tianGan: string        // 宫位天干
  diZhi: string          // 宫位地支
  mainStars: string[]
  luckyStars: string[]
  unluckyStars: string[]
  isMingGong: boolean
  isShenGong: boolean
  daXian?: { startAge: number; endAge: number; startYear: number; endYear: number }
}

interface ZiWeiPageStandaloneProps {
  onBack?: () => void
}

export function ZiWeiPageStandalone({ onBack }: ZiWeiPageStandaloneProps) {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [bottomTab, setBottomTab] = useState<"common" | "sanhe" | "sihua" | "quick">("common")
  const [selectedGongIndex, setSelectedGongIndex] = useState<number | null>(null)

  // 输入表单状态
  const [name, setName] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(6)
  const [day, setDay] = useState(21)
  const [hour, setHour] = useState(0)

  // 排盘结果
  const [panResult, setPanResult] = useState<any>(null)

  // 核心排盘计算
  const computePan = (y: number, m: number, d: number, h: number) => {
    const solar = Solar.fromYmdHms(y, m, d, h, 0, 0)
    const lunar = solar.getLunar()

    const lunarYear = lunar.getYear()
    const lunarMonth = lunar.getMonth()
    const lunarDay = lunar.getDay()
    const yearGan = lunar.getYearGan()
    const yearZhi = lunar.getYearZhi()
    const monthGan = lunar.getMonthGan()
    const monthZhi = lunar.getMonthZhi()
    const dayGan = lunar.getDayGan()
    const dayZhi = lunar.getDayZhi()
    const timeGan = lunar.getTimeGan()
    const timeZhi = lunar.getTimeZhi()

    const pan = calculateZiWeiPan(lunarYear, lunarMonth, lunarDay, h, gender)
    const siHua = TIAN_GAN_SI_HUA[yearGan] || { 禄: "", 权: "", 科: "", 忌: "" }

    // 五虎遁计算各宫天干
    const yinGanIndex = WU_HU_DUN[yearGan] ?? 0

    // 构建十二宫信息
    const gongInfos: GongInfo[] = []
    for (let i = 0; i < 12; i++) {
      const mainStars: string[] = []
      const luckyStars: string[] = []
      const unluckyStars: string[] = []

      Object.entries(pan.mainStarPositions || {}).forEach(([star, pos]) => {
        if (pos === i) mainStars.push(star)
      })
      Object.entries(pan.luckyStarPositions || {}).forEach(([star, pos]) => {
        if (pos === i) luckyStars.push(star)
      })
      Object.entries(pan.unluckyStarPositions || {}).forEach(([star, pos]) => {
        if (pos === i) unluckyStars.push(star)
      })

      const tianGanIdx = (yinGanIndex + i - 2 + 10) % 10
      const palaceName = pan.palaceNames[i]
      const daXianEntry = pan.daXian?.find((dx: any) => dx.gongIndex === i)

      gongInfos.push({
        index: i,
        palaceName,
        tianGan: TIAN_GAN[tianGanIdx],
        diZhi: DI_ZHI[i],
        mainStars,
        luckyStars,
        unluckyStars,
        isMingGong: i === pan.mingGongIndex,
        isShenGong: i === pan.shenGongIndex,
        daXian: daXianEntry ? {
          startAge: daXianEntry.startAge,
          endAge: daXianEntry.endAge,
          startYear: daXianEntry.startYear,
          endYear: daXianEntry.endYear,
        } : undefined,
      })
    }

    setPanResult({
      ...pan,
      gongInfos,
      siHua,
      yearGan, yearZhi,
      monthGan, monthZhi,
      dayGan, dayZhi,
      timeGan, timeZhi,
      lunarDate: `${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
      solarDate: `${y}年${m}月${d}日`,
      displayName: name || "未命名",
      gender,
    })
    setActiveTab("result")
    setBottomTab("common")
    setSelectedGongIndex(null)
  }

  // 执行排盘
  const doPaiPan = () => {
    computePan(year, month, day, hour)
  }

  // 即时排盘
  const doNowPaiPan = () => {
    const now = new Date()
    const ny = now.getFullYear()
    const nm = now.getMonth() + 1
    const nd = now.getDate()
    const nh = now.getHours()
    setYear(ny)
    setMonth(nm)
    setDay(nd)
    setHour(nh)
    computePan(ny, nm, nd, nh)
  }

  // 选中的宫位详情（使用 useMemo 优化）
  const selectedGongDetail = useMemo(() => {
    if (selectedGongIndex === null || !panResult) return null
    const gong = panResult.gongInfos[selectedGongIndex]
    if (!gong) return null
    const detail = getGongDetail(
      gong.palaceName,
      gong.mainStars,
      gong.luckyStars,
      gong.unluckyStars,
      panResult.siHua
    )
    return { gong, detail }
  }, [selectedGongIndex, panResult])

  // === 渲染输入表单 ===
  const renderInputForm = () => (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <span className="font-bold text-gray-800">紫微斗数</span>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-4">
        {/* 基本信息卡片 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 姓名 */}
          <div className="px-4 py-3.5 border-b flex justify-between items-center">
            <span className="text-gray-700">姓名</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入姓名"
              className="text-right text-gray-800 bg-transparent outline-none w-40"
            />
          </div>

          {/* 性别 */}
          <div className="px-4 py-3.5 border-b">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">性别</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setGender("male")}
                  className={`px-6 py-1.5 rounded-lg text-sm transition-colors ${
                    gender === "male"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  男
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`px-6 py-1.5 rounded-lg text-sm transition-colors ${
                    gender === "female"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  女
                </button>
              </div>
            </div>
          </div>

          {/* 公历日期 */}
          <div className="px-4 py-3.5 border-b">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-gray-700">公历日期</span>
              <span className="text-xs text-gray-400">{year}年{month}月{day}日</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="p-2 border rounded-lg text-gray-800 text-sm text-center bg-gray-50"
              >
                {Array.from({ length: 100 }, (_, i) => 1940 + i).map(y => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="p-2 border rounded-lg text-gray-800 text-sm text-center bg-gray-50"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="p-2 border rounded-lg text-gray-800 text-sm text-center bg-gray-50"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
          </div>

          {/* 时辰 */}
          <div className="px-4 py-3.5">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-gray-700">时辰</span>
              <span className="text-xs text-gray-400">
                {SHI_CHEN[Math.floor(hour / 2) % 12].name}
              </span>
            </div>
            <select
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="w-full p-2 border rounded-lg text-gray-800 text-sm text-center bg-gray-50"
            >
              {SHI_CHEN.map((sc, i) => (
                <option key={i} value={i * 2}>
                  {sc.name}({sc.range})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 排盘按钮 */}
        <button
          onClick={doPaiPan}
          className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl text-lg font-medium shadow-md active:scale-[0.98] transition-transform"
        >
          排 盘
        </button>

        {/* 即时排盘 */}
        <button
          onClick={doNowPaiPan}
          className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-base active:scale-[0.98] transition-transform"
        >
          即时排盘
        </button>
      </div>
    </div>
  )

  // === 渲染宫位格子 ===
  const renderPalaceCell = (gongIndex: number) => {
    if (!panResult) return null
    const gong: GongInfo = panResult.gongInfos[gongIndex]
    if (!gong) return null

    const isMing = gong.isMingGong
    const isShen = gong.isShenGong
    const siHua = panResult.siHua

    return (
      <div
        key={gongIndex}
        onClick={() => setSelectedGongIndex(gongIndex)}
        className={`relative border p-1 min-h-[88px] cursor-pointer transition-colors flex flex-col
          ${isMing
            ? "bg-red-50 border-red-400 border-2"
            : isShen
              ? "bg-blue-50 border-blue-400 border-2"
              : "border-gray-200 bg-white hover:bg-gray-50"}`}
      >
        {/* 宫位头部：天干 + 宫位名 + 地支 */}
        <div className="flex justify-between items-center text-[10px] leading-tight mb-0.5">
          <span className="text-green-600 font-medium">{gong.tianGan}</span>
          <span className={`font-bold ${isMing ? "text-red-600" : isShen ? "text-blue-600" : "text-gray-700"}`}>
            {gong.palaceName}
          </span>
          <span className="text-gray-400">{gong.diZhi}</span>
        </div>

        {/* 大限标记 */}
        {gong.daXian && (
          <div className="text-[9px] text-gray-400 text-center leading-tight">
            {gong.daXian.startAge}-{gong.daXian.endAge}岁
          </div>
        )}

        {/* 星曜列表 */}
        <div className="flex-1 space-y-0.5 text-center text-[11px] leading-tight">
          {/* 主星 */}
          {gong.mainStars.map((star: string, si: number) => {
            const hua = getSiHuaMark(star, siHua)
            return (
              <div key={`m${si}`} className="flex items-center justify-center gap-0.5">
                {hua && <span className={`${SI_HUA_COLORS[hua]} font-bold text-[10px]`}>{hua}</span>}
                <span className={`font-bold ${getStarColor(star)}`}>{star}</span>
              </div>
            )
          })}

          {/* 辅星 */}
          {gong.luckyStars.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-1 text-[10px]">
              {gong.luckyStars.map((star: string, si: number) => {
                const hua = getSiHuaMark(star, siHua)
                return (
                  <span key={`l${si}`} className="flex items-center gap-0.5">
                    {hua && <span className={`${SI_HUA_COLORS[hua]} font-bold`}>{hua}</span>}
                    <span className={getStarColor(star)}>{star}</span>
                  </span>
                )
              })}
            </div>
          )}

          {/* 煞星 */}
          {gong.unluckyStars.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-1 text-[10px]">
              {gong.unluckyStars.map((star: string, si: number) => (
                <span key={`u${si}`} className={getStarColor(star)}>{star}</span>
              ))}
            </div>
          )}
        </div>

        {/* 命宫/身宫角标 */}
        {isMing && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] px-1 rounded-bl leading-tight">命</div>
        )}
        {isShen && !isMing && (
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] px-1 rounded-bl leading-tight">身</div>
        )}
      </div>
    )
  }

  // === 渲染田字格命盘 ===
  const renderPanGrid = () => {
    if (!panResult) return null

    return (
      <div className="bg-white rounded-xl p-1.5 shadow-sm">
        <div className="grid grid-cols-4 gap-0.5">
          {/* 第一行：巳 午 未 申 */}
          {renderPalaceCell(5)}
          {renderPalaceCell(6)}
          {renderPalaceCell(7)}
          {renderPalaceCell(8)}

          {/* 第二行：辰 [中宫2x2] 酉 */}
          {renderPalaceCell(4)}
          {/* 中宫信息区（占2列2行） */}
          <div className="col-span-2 row-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 flex flex-col justify-center items-center min-h-[176px] border border-gray-200">
            <div className="text-base font-bold text-gray-800 mb-1">{panResult.displayName}</div>
            <div className="text-xs text-gray-500 mb-1">{panResult.gender === "male" ? "男命" : "女命"}</div>
            <div className="text-xs text-gray-600 mb-0.5">农历 {panResult.lunarDate}</div>
            <div className="text-xs text-gray-400 mb-1">{panResult.solarDate}</div>
            <div className="text-sm font-medium text-amber-700 mb-0.5">{panResult.wuxingJu}</div>
            <div className="text-[10px] text-gray-400 mb-1.5">纳音：{panResult.nayin}</div>
            <div className="flex gap-3">
              <div className="text-xs">
                <span className="text-red-600 font-medium">命宫</span>
                <span className="text-gray-600 ml-1">{panResult.mingGongGan}{panResult.mingGongZhi}</span>
              </div>
              <div className="text-xs">
                <span className="text-blue-600 font-medium">身宫</span>
                <span className="text-gray-600 ml-1">{DI_ZHI[panResult.shenGongIndex]}</span>
              </div>
            </div>
          </div>
          {renderPalaceCell(9)}

          {/* 第三行：卯 [中宫已占] 戌 */}
          {renderPalaceCell(3)}
          {renderPalaceCell(10)}

          {/* 第四行：寅 丑 子 亥 */}
          {renderPalaceCell(2)}
          {renderPalaceCell(1)}
          {renderPalaceCell(0)}
          {renderPalaceCell(11)}
        </div>
      </div>
    )
  }

  // === 渲染大限时间轴 ===
  const renderDaXianTimeline = () => {
    if (!panResult?.daXian) return null
    const currentYear = new Date().getFullYear()

    return (
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="text-sm font-bold text-gray-800 mb-2">大限</div>
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-1">
            {panResult.daXian.map((dx: any, idx: number) => {
              const gong: GongInfo = panResult.gongInfos[dx.gongIndex]
              const isCurrent = currentYear >= dx.startYear && currentYear <= dx.endYear
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center text-xs px-3 py-2 rounded-lg min-w-[68px] border ${
                    isCurrent ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <span className="text-gray-800 font-medium">{gong?.palaceName || dx.palaceName}</span>
                  <span className="text-gray-400 mt-0.5">{dx.startAge}-{dx.endAge}岁</span>
                  <span className="text-gray-500 text-[10px]">{dx.startYear}-{dx.endYear}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // === 渲染流年时间轴 ===
  const renderLiuNianTimeline = () => {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 12 }, (_, i) => currentYear - 2 + i)

    return (
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="text-sm font-bold text-gray-800 mb-2">流年</div>
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-1">
            {years.map((y) => {
              const zhiIndex = ((y - 4) % 12 + 12) % 12
              const ganIndex = ((y - 4) % 10 + 10) % 10
              const zhi = DI_ZHI[zhiIndex]
              const gan = TIAN_GAN[ganIndex]
              const isCurrent = y === currentYear
              return (
                <div
                  key={y}
                  className={`flex flex-col items-center text-xs px-3 py-2 rounded-lg min-w-[58px] border ${
                    isCurrent ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <span className="text-gray-800 font-medium">{gan}{zhi}年</span>
                  <span className="text-gray-400 mt-0.5">{y}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // === 渲染宫位详解列表 ===
  const renderGongDetailList = () => {
    if (!panResult) return null

    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="text-sm font-bold text-gray-800 mb-3">十二宫详解</div>
        <div className="space-y-2">
          {panResult.gongInfos.map((gong: GongInfo) => (
            <div
              key={gong.index}
              onClick={() => setSelectedGongIndex(gong.index)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                gong.isMingGong ? "bg-red-50 border-red-200" :
                gong.isShenGong ? "bg-blue-50 border-blue-200" :
                "bg-gray-50 border-gray-100"
              }`}
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className={`font-bold text-sm ${
                  gong.isMingGong ? "text-red-600" :
                  gong.isShenGong ? "text-blue-600" : "text-gray-800"
                }`}>
                  {gong.tianGan}{gong.diZhi} · {gong.palaceName}
                </span>
                <div className="flex gap-1">
                  {gong.isMingGong && <span className="text-[10px] bg-red-200 text-red-700 px-1.5 py-0.5 rounded">命宫</span>}
                  {gong.isShenGong && <span className="text-[10px] bg-blue-200 text-blue-700 px-1.5 py-0.5 rounded">身宫</span>}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {gong.mainStars.map((star: string, si: number) => {
                  const hua = getSiHuaMark(star, panResult.siHua)
                  return (
                    <span key={`m${si}`} className="text-xs flex items-center gap-0.5">
                      {hua && <span className={`${SI_HUA_COLORS[hua]} font-bold`}>{hua}</span>}
                      <span className={`font-medium ${getStarColor(star)}`}>{star}</span>
                    </span>
                  )
                })}
                {gong.luckyStars.map((star: string, si: number) => (
                  <span key={`l${si}`} className={`text-xs ${getStarColor(star)}`}>{star}</span>
                ))}
                {gong.unluckyStars.map((star: string, si: number) => (
                  <span key={`u${si}`} className={`text-xs ${getStarColor(star)}`}>{star}</span>
                ))}
                {gong.mainStars.length === 0 && gong.luckyStars.length === 0 && gong.unluckyStars.length === 0 && (
                  <span className="text-xs text-gray-400">无星曜</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // === 渲染四化视图 ===
  const renderSiHuaView = () => {
    if (!panResult) return null
    const siHua = panResult.siHua
    const huaList = [
      { key: "禄", star: siHua.禄, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", desc: "主财禄、顺利、贵人相助" },
      { key: "权", star: siHua.权, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", desc: "主权势、掌控、事业发展" },
      { key: "科", star: siHua.科, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", desc: "主名声、学业、贵人提携" },
      { key: "忌", star: siHua.忌, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", desc: "主阻碍、困扰、波折是非" },
    ]

    return (
      <div className="space-y-3">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm font-bold text-gray-800 mb-3">本命四化（年干：{panResult.yearGan}）</div>
          <div className="grid grid-cols-2 gap-3">
            {huaList.map(h => (
              <div key={h.key} className={`p-3 rounded-lg border ${h.bg} ${h.border}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`${h.color} font-bold text-lg`}>化{h.key}</span>
                  <span className={`font-bold text-base ${getStarColor(h.star)}`}>{h.star}</span>
                </div>
                <div className="text-xs text-gray-500">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 四化所在宫位 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm font-bold text-gray-800 mb-3">四化所在宫位</div>
          <div className="space-y-2">
            {huaList.map(h => {
              const gong = panResult.gongInfos.find((g: GongInfo) =>
                g.mainStars.includes(h.star) || g.luckyStars.includes(h.star)
              )
              return (
                <div key={h.key} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg">
                  <span className={`${h.color} font-medium`}>化{h.key} · {h.star}</span>
                  <span className="text-gray-600">
                    {gong ? `${gong.tianGan}${gong.diZhi} ${gong.palaceName}` : "未排入"}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // === 渲染宫位详情弹窗（引经据典）===
  const renderGongPopup = () => {
    if (!selectedGongDetail || !panResult) return null
    const { gong, detail } = selectedGongDetail
    const siHua = panResult.siHua

    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* 遮罩 */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setSelectedGongIndex(null)}
        />
        {/* 弹窗内容 */}
        <div className="relative w-full max-w-md bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
          {/* 顶部拖拽指示 */}
          <div className="sticky top-0 bg-white z-10">
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="border-b px-4 py-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`font-bold text-lg ${
                  gong.isMingGong ? "text-red-600" : gong.isShenGong ? "text-blue-600" : "text-gray-800"
                }`}>
                  {gong.palaceName}
                </span>
                <span className="text-sm text-gray-500">{gong.tianGan}{gong.diZhi}</span>
                {gong.isMingGong && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">命宫</span>}
                {gong.isShenGong && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">身宫</span>}
              </div>
              <button onClick={() => setSelectedGongIndex(null)} className="p-1">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* 星曜列表 */}
            <div>
              <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 星曜
              </div>
              <div className="space-y-1.5">
                {gong.mainStars.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-400 mt-0.5 min-w-[36px]">主星</span>
                    <div className="flex flex-wrap gap-2">
                      {gong.mainStars.map((star: string, i: number) => {
                        const hua = getSiHuaMark(star, siHua)
                        return (
                          <span key={i} className="text-sm flex items-center gap-0.5">
                            {hua && <span className={`${SI_HUA_COLORS[hua]} font-bold`}>{hua}</span>}
                            <span className={`font-bold ${getStarColor(star)}`}>{star}</span>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
                {gong.luckyStars.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-400 mt-0.5 min-w-[36px]">辅星</span>
                    <div className="flex flex-wrap gap-2">
                      {gong.luckyStars.map((star: string, i: number) => {
                        const hua = getSiHuaMark(star, siHua)
                        return (
                          <span key={i} className="text-sm flex items-center gap-0.5">
                            {hua && <span className={`${SI_HUA_COLORS[hua]} font-bold`}>{hua}</span>}
                            <span className={getStarColor(star)}>{star}</span>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
                {gong.unluckyStars.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-400 mt-0.5 min-w-[36px]">煞星</span>
                    <div className="flex flex-wrap gap-2">
                      {gong.unluckyStars.map((star: string, i: number) => (
                        <span key={i} className={`text-sm ${getStarColor(star)}`}>{star}</span>
                      ))}
                    </div>
                  </div>
                )}
                {gong.mainStars.length === 0 && gong.luckyStars.length === 0 && gong.unluckyStars.length === 0 && (
                  <div className="text-sm text-gray-400">此宫无星曜坐守</div>
                )}
              </div>
            </div>

            {/* 格局判断 */}
            {detail.geju.length > 0 && (
              <div>
                <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> 格局判断
                </div>
                <div className="flex flex-wrap gap-2">
                  {detail.geju.map((g: string, i: number) => (
                    <span key={i} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 引经据典断语 */}
            {detail.duanyu.length > 0 && (
              <div>
                <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> 引经据典
                </div>
                <div className="space-y-2">
                  {detail.duanyu.map((d: { title: string; content: string; chuchu: string }, i: number) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-sm font-bold text-gray-800 mb-1">{d.title}</div>
                      <div className="text-xs text-gray-600 leading-relaxed mb-1.5">{d.content}</div>
                      <div className="text-[10px] text-gray-400 italic">—— {d.chuchu}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 综合评断 */}
            <div>
              <div className="text-xs font-bold text-gray-500 mb-2">综合评断</div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-sm text-gray-700 leading-relaxed">{detail.zonghe}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // === 渲染结果页面 ===
  const renderResult = () => (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => setActiveTab("input")} className="p-1 -ml-1">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <span className="font-bold text-gray-800">紫微斗数</span>
        <button onClick={() => setActiveTab("input")} className="text-sm text-red-600 font-medium">
          排盘
        </button>
      </div>

      <div className="p-3 space-y-3">
        {/* 四柱信息 */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="grid grid-cols-4 text-center divide-x divide-gray-100">
            <div className="px-1">
              <div className="text-[10px] text-gray-400 mb-0.5">年柱</div>
              <div className="text-base font-bold text-gray-800">{panResult?.yearGan}{panResult?.yearZhi}</div>
            </div>
            <div className="px-1">
              <div className="text-[10px] text-gray-400 mb-0.5">月柱</div>
              <div className="text-base font-bold text-gray-800">{panResult?.monthGan}{panResult?.monthZhi}</div>
            </div>
            <div className="px-1">
              <div className="text-[10px] text-gray-400 mb-0.5">日柱</div>
              <div className="text-base font-bold text-gray-800">{panResult?.dayGan}{panResult?.dayZhi}</div>
            </div>
            <div className="px-1">
              <div className="text-[10px] text-gray-400 mb-0.5">时柱</div>
              <div className="text-base font-bold text-gray-800">{panResult?.timeGan}{panResult?.timeZhi}</div>
            </div>
          </div>
        </div>

        {/* 命盘田字格 */}
        {renderPanGrid()}

        {/* 根据底部标签显示不同内容 */}
        {bottomTab === "sihua" ? (
          renderSiHuaView()
        ) : (
          <>
            {/* 大限时间轴 */}
            {renderDaXianTimeline()}
            {/* 流年时间轴 */}
            {renderLiuNianTimeline()}
            {/* 宫位详解列表 */}
            {renderGongDetailList()}
          </>
        )}
      </div>

      {/* 宫位详情弹窗 */}
      {renderGongPopup()}

      {/* 底部标签栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex">
          {[
            { id: "common", label: "常用功能" },
            { id: "sanhe", label: "三合" },
            { id: "sihua", label: "四化" },
            { id: "quick", label: "快速排盘" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "quick") {
                  setActiveTab("input")
                } else {
                  setBottomTab(tab.id as "common" | "sanhe" | "sihua")
                }
              }}
              className={`flex-1 py-3 text-sm transition-colors ${
                bottomTab === tab.id && tab.id !== "quick"
                  ? "text-red-600 font-medium border-t-2 border-red-600 -mt-0.5"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return activeTab === "input" ? renderInputForm() : renderResult()
}
