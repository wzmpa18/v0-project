"use client"

import { useState } from "react"
import { ChevronLeft, X, BookOpen, ScrollText, Sparkles } from "lucide-react"
import { Solar } from "lunar-javascript"
import { TIAN_GAN, DI_ZHI, calculateQimenPan, getQimenGongDetail } from "@/lib/qimen-data"

// 九宫洛书布局
// 巽4 离9 坤2
// 震3 中5 兑7
// 艮8 坎1 乾6
const LUO_SHU_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
]

// 宫位五行颜色
const getGongColor = (num: number): string => {
  const colors: Record<number, string> = {
    1: "text-blue-600",   // 坎一宫 水
    2: "text-yellow-700", // 坤二宫 土
    3: "text-green-600",  // 震三宫 木
    4: "text-green-700",  // 巽四宫 木
    5: "text-amber-700",  // 中五宫 土
    6: "text-gray-600",   // 乾六宫 金
    7: "text-gray-500",   // 兑七宫 金
    8: "text-yellow-600", // 艮八宫 土
    9: "text-red-600",    // 离九宫 火
  }
  return colors[num] || "text-gray-700"
}

// 计算旬空（基于时干支）
function getXunKong(shiGan: string, shiZhi: string): string {
  const ganIndex = TIAN_GAN.indexOf(shiGan)
  const zhiIndex = DI_ZHI.indexOf(shiZhi)
  if (ganIndex === -1 || zhiIndex === -1) return "戌亥"
  let index = -1
  for (let i = 0; i < 60; i++) {
    if (i % 10 === ganIndex && i % 12 === zhiIndex) {
      index = i
      break
    }
  }
  if (index === -1) return "戌亥"
  const xun = Math.floor(index / 10)
  const xunShouZhi = (xun * 10) % 12
  const k1 = (xunShouZhi - 2 + 12) % 12
  const k2 = (xunShouZhi - 1 + 12) % 12
  return DI_ZHI[k1] + DI_ZHI[k2]
}

// 计算马星（基于日支）
function getMaXing(riZhi: string): string {
  const map: Record<string, string> = {
    "申": "寅", "子": "寅", "辰": "寅",
    "寅": "申", "午": "申", "戌": "申",
    "巳": "亥", "酉": "亥", "丑": "亥",
    "亥": "巳", "卯": "巳", "未": "巳",
  }
  return map[riZhi] || "寅"
}

interface QimenPageStandaloneProps {
  onBack?: () => void
}

export function QimenPageStandalone({ onBack }: QimenPageStandaloneProps) {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [resultTab, setResultTab] = useState<"jushi" | "duoju" | "yanxi" | "anli">("jushi")

  // 输入表单
  const [questionContent, setQuestionContent] = useState("")
  const [panType, setPanType] = useState<"maoshan" | "yinpan">("maoshan")
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(6)
  const [day, setDay] = useState(21)
  const [hour, setHour] = useState(0)
  const [useTrueSun, setUseTrueSun] = useState(false)

  // 计算结果
  const [panResult, setPanResult] = useState<any>(null)
  // 选中的宫位（弹窗）
  const [selectedPalace, setSelectedPalace] = useState<any>(null)

  // 获取四柱干支信息（使用 lunar-javascript）
  const getGanZhiInfo = (y: number, m: number, d: number, h: number) => {
    const solar = Solar.fromDate(new Date(y, m - 1, d, h, 0, 0))
    const lunar = solar.getLunar()
    return {
      yearGan: lunar.getYearGan(),
      yearZhi: lunar.getYearZhi(),
      monthGan: lunar.getMonthGan(),
      monthZhi: lunar.getMonthZhi(),
      dayGan: lunar.getDayGan(),
      dayZhi: lunar.getDayZhi(),
      shiGan: lunar.getTimeGan(),
      shiZhi: lunar.getTimeZhi(),
    }
  }

  // 执行起局
  const doQiJu = () => {
    const date = new Date(year, month - 1, day, hour)
    const result = calculateQimenPan(date)
    const gz = getGanZhiInfo(year, month, day, hour)
    setPanResult({ ...result, gz })
    setActiveTab("result")
    setResultTab("jushi")
  }

  // 即时起局
  const doNowQiJu = () => {
    const now = new Date()
    setYear(now.getFullYear())
    setMonth(now.getMonth() + 1)
    setDay(now.getDate())
    setHour(now.getHours())
    const result = calculateQimenPan(now)
    const gz = getGanZhiInfo(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours()
    )
    setPanResult({ ...result, gz })
    setActiveTab("result")
    setResultTab("jushi")
  }

  // 点击宫位，弹出引经据典详解
  const handlePalaceClick = (palace: any) => {
    if (!panResult) return
    const isZhiFu = palace.number === panResult.zhiFuGong
    const isZhiShi = palace.number === panResult.zhiShiGong
    const detail = getQimenGongDetail(
      palace.number,
      palace.name,
      palace.position,
      palace.tianGan,
      palace.diGan,
      palace.baMen,
      palace.jiuXing,
      palace.baShen,
      isZhiFu,
      isZhiShi
    )
    setSelectedPalace({ ...palace, isZhiFu, isZhiShi, detail })
  }

  // ===== 起局设置页面 =====
  const renderInputForm = () => (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航栏 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <span className="font-bold text-gray-800 text-lg">奇门遁甲</span>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-4">
        {/* 问事内容 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-700 mb-2 font-medium">问事内容（选填）</div>
          <textarea
            value={questionContent}
            onChange={(e) => setQuestionContent(e.target.value)}
            placeholder="请输入您想问的事..."
            className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none resize-none h-20 focus:border-red-300"
          />
        </div>

        {/* 起局方式 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-700 mb-3 font-medium">起局方式</div>
          <div className="flex gap-3">
            <button
              onClick={() => setPanType("maoshan")}
              className={`flex-1 py-3 rounded-lg text-sm border transition-colors ${
                panType === "maoshan"
                  ? "bg-red-500 text-white border-red-500 font-medium"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              时家茅山转盘
            </button>
            <button
              onClick={() => setPanType("yinpan")}
              className={`flex-1 py-3 rounded-lg text-sm border transition-colors ${
                panType === "yinpan"
                  ? "bg-red-500 text-white border-red-500 font-medium"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              时家阴盘奇门
            </button>
          </div>
        </div>

        {/* 日期时间选择 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-700 mb-3 font-medium">日期时间</div>

          {/* 年 */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">年</span>
              <span className="text-sm text-gray-700 font-medium">{year}年</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {Array.from({ length: 11 }, (_, i) => year - 5 + i).map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    y === year
                      ? "bg-red-500 text-white font-medium"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* 月 */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">月</span>
              <span className="text-sm text-gray-700 font-medium">{month}月</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <button
                  key={m}
                  onClick={() => setMonth(m)}
                  className={`py-2 rounded-lg text-sm transition-colors ${
                    m === month
                      ? "bg-red-500 text-white font-medium"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* 日 */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">日</span>
              <span className="text-sm text-gray-700 font-medium">{day}日</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={`py-2 rounded-lg text-sm transition-colors ${
                    d === day
                      ? "bg-red-500 text-white font-medium"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* 时辰 */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">时辰</span>
              <span className="text-sm text-gray-700 font-medium">
                {DI_ZHI[Math.floor(hour / 2) % 12]}时
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {DI_ZHI.map((zhi, i) => (
                <button
                  key={zhi}
                  onClick={() => setHour(i * 2)}
                  className={`py-2 rounded-lg text-sm transition-colors ${
                    Math.floor(hour / 2) % 12 === i
                      ? "bg-red-500 text-white font-medium"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {zhi}时
                </button>
              ))}
            </div>
          </div>

          {/* 真太阳时 */}
          <div className="flex justify-between items-center pt-3 border-t">
            <div>
              <div className="text-sm text-gray-700">真太阳时</div>
              <div className="text-xs text-gray-400 mt-0.5">根据出生地经度校正时间</div>
            </div>
            <button
              onClick={() => setUseTrueSun(!useTrueSun)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                useTrueSun ? "bg-red-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${
                  useTrueSun ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 当前起局时间预览 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">起局时间</div>
            <div className="text-lg font-bold text-gray-800">
              {year}年{month}月{day}日 {DI_ZHI[Math.floor(hour / 2) % 12]}时
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {(() => {
                const gz = getGanZhiInfo(year, month, day, hour)
                return `${gz.yearGan}${gz.yearZhi}年 ${gz.monthGan}${gz.monthZhi}月 ${gz.dayGan}${gz.dayZhi}日 ${gz.shiGan}${gz.shiZhi}时`
              })()}
            </div>
          </div>
        </div>

        {/* 起局按钮 */}
        <button
          onClick={doQiJu}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl text-lg font-medium shadow-md active:scale-[0.98] transition-transform"
        >
          起 局
        </button>

        {/* 即时起局 */}
        <button
          onClick={doNowQiJu}
          className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-base active:scale-[0.98] transition-transform"
        >
          即时起局（现在）
        </button>
      </div>
    </div>
  )

  // ===== 九宫格排盘 =====
  const renderJiuGongGrid = () => {
    if (!panResult?.palaces) return null

    return (
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="grid grid-cols-3 gap-1.5">
          {LUO_SHU_LAYOUT.flat().map((gongNum, i) => {
            const palace = panResult.palaces.find((p: any) => p.number === gongNum)
            if (!palace) return <div key={i} />

            const isZhiFu = palace.number === panResult.zhiFuGong
            const isZhiShi = palace.number === panResult.zhiShiGong
            const isCenter = palace.number === 5

            return (
              <div
                key={i}
                onClick={() => handlePalaceClick(palace)}
                className={`border rounded-lg p-2 min-h-[120px] cursor-pointer transition-all active:scale-95 ${
                  isZhiFu || isZhiShi
                    ? "bg-amber-50 border-amber-300"
                    : isCenter
                    ? "bg-yellow-50 border-yellow-200"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                {/* 顶部行：地盘干(绿色) + 宫名+宫数(五行颜色) + 方位(灰色) */}
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-green-600 font-medium">{palace.diGan}</span>
                  <span className={`font-bold ${getGongColor(palace.number)}`}>
                    {palace.name}{palace.number}宫
                  </span>
                  <span className="text-gray-400">{palace.position}</span>
                </div>

                {/* 八神（紫色小字） */}
                <div className="text-center text-xs text-purple-600 mb-0.5">
                  {palace.baShen}
                </div>

                {/* 九星（绿色小字） */}
                <div className="text-center text-xs text-green-700 mb-0.5">
                  {palace.jiuXing}
                </div>

                {/* 天盘干（大字，黑色加粗） */}
                <div className="text-center text-xl font-bold text-gray-800 mb-0.5">
                  {palace.tianGan}
                </div>

                {/* 八门（蓝色小字） */}
                <div className="text-center text-xs text-blue-600">
                  {palace.baMen}
                </div>

                {/* 值符/值使标记（琥珀色标签） */}
                {(isZhiFu || isZhiShi) && (
                  <div className="flex justify-center gap-1 mt-1">
                    {isZhiFu && (
                      <span className="text-xs text-amber-600 font-medium bg-amber-100 px-1.5 rounded">
                        值符
                      </span>
                    )}
                    {isZhiShi && (
                      <span className="text-xs text-amber-600 font-medium bg-amber-100 px-1.5 rounded">
                        值使
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ===== 宫位详解弹窗（引经据典） =====
  const renderPalacePopup = () => {
    if (!selectedPalace) return null
    const p = selectedPalace
    const d = p.detail

    return (
      <div
        className="fixed inset-0 z-50 flex items-end"
        onClick={() => setSelectedPalace(null)}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="relative bg-white w-full rounded-t-2xl max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 头部 */}
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />
            <div className="flex items-center justify-between px-4 pb-3">
              <h3 className={`text-lg font-bold ${getGongColor(p.number)}`}>
                {p.name}{p.number}宫（{p.position}方）
              </h3>
              <button onClick={() => setSelectedPalace(null)} className="p-1">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* 四要素网格（八神/九星/天干/八门，2x2布局） */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="text-xs text-purple-500 mb-1">八神</div>
                <div className="font-bold text-purple-700">{p.baShen}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-xs text-green-500 mb-1">九星</div>
                <div className="font-bold text-green-700">{p.jiuXing}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">天盘干</div>
                <div className="font-bold text-gray-800">{p.tianGan}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-xs text-blue-500 mb-1">八门</div>
                <div className="font-bold text-blue-700">{p.baMen}</div>
              </div>
            </div>

            {/* 值符/值使标记 */}
            {(p.isZhiFu || p.isZhiShi) && (
              <div className="flex gap-2">
                {p.isZhiFu && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    值符宫
                  </span>
                )}
                {p.isZhiShi && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    值使宫
                  </span>
                )}
              </div>
            )}

            {/* 格局判断标签 */}
            {d.geju.length > 0 && (
              <div>
                <div className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
                  <ScrollText className="w-4 h-4 text-red-500" /> 格局判断
                </div>
                <div className="flex flex-wrap gap-2">
                  {d.geju.map((g: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs border border-red-200"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 引经据典断语列表 */}
            <div>
              <div className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-red-500" /> 引经据典
              </div>
              <div className="space-y-3">
                {d.duanyu.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-lg p-3 border-l-4 border-red-400"
                  >
                    <div className="font-medium text-gray-800 text-sm mb-1">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {item.content}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">—— {item.chuchu}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 综合评断（含吉凶判断） */}
            <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-lg p-4 border border-red-100">
              <div className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-red-500" /> 综合评断
              </div>
              <div className="text-sm text-gray-700 leading-relaxed">{d.zonghe}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ===== 排盘结果页面 =====
  const renderResult = () => {
    if (!panResult) return null

    const gz = panResult.gz
    const xunKong = getXunKong(gz.shiGan, gz.shiZhi)
    const maXing = getMaXing(gz.dayZhi)

    return (
      <div className="min-h-screen bg-gray-100 pb-16">
        {/* 顶部导航栏 */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <button onClick={() => setActiveTab("input")} className="p-1">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <span className="font-bold text-gray-800 text-lg">奇门遁甲</span>
          <button
            onClick={doNowQiJu}
            className="text-sm text-red-600 font-medium px-2 py-1"
          >
            起局
          </button>
        </div>

        {resultTab === "jushi" ? (
          <div className="p-4 space-y-3">
            {/* 四柱信息卡片（年/月/日/时干支，横向四等分） */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="grid grid-cols-4 text-center divide-x divide-gray-100">
                {[
                  { label: "年柱", value: `${gz.yearGan}${gz.yearZhi}` },
                  { label: "月柱", value: `${gz.monthGan}${gz.monthZhi}` },
                  { label: "日柱", value: `${gz.dayGan}${gz.dayZhi}` },
                  { label: "时柱", value: `${gz.shiGan}${gz.shiZhi}` },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                    <div className="text-lg font-bold text-gray-800">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 局数信息卡片 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-400 mb-3">节气：{panResult.jieqi}</div>
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">遁向</div>
                  <div className="text-base font-bold text-gray-800">
                    {panResult.dunType}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">局数</div>
                  <div className="text-base font-bold text-red-600">
                    {panResult.ju}局
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">旬空</div>
                  <div className="text-base font-bold text-gray-700">{xunKong}空</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t text-center text-sm">
                <div>
                  <span className="text-gray-500">值符：</span>
                  <span className="text-amber-700 font-medium">{panResult.zhiFu}</span>
                  <span className="text-gray-400">（{panResult.zhiFuGong}宫）</span>
                </div>
                <div>
                  <span className="text-gray-500">值使：</span>
                  <span className="text-amber-700 font-medium">{panResult.zhiShi}</span>
                  <span className="text-gray-400">（{panResult.zhiShiGong}宫）</span>
                </div>
              </div>
            </div>

            {/* 九宫格排盘 */}
            {renderJiuGongGrid()}

            {/* 空亡与马星信息卡片 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm font-bold text-gray-800 mb-3">空亡与马星</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">旬空</div>
                  <div className="font-bold text-gray-800">{xunKong}空</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">马星</div>
                  <div className="font-bold text-red-600">{maXing}马</div>
                </div>
              </div>
            </div>

            {/* 九宫详解列表 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm font-bold text-gray-800 mb-3">九宫详解</div>
              <div className="space-y-2">
                {panResult.palaces?.map((palace: any) => {
                  const isZhiFu = palace.number === panResult.zhiFuGong
                  const isZhiShi = palace.number === panResult.zhiShiGong
                  return (
                    <div
                      key={palace.number}
                      onClick={() => handlePalaceClick(palace)}
                      className={`border rounded-lg p-3 cursor-pointer transition-all active:scale-[0.98] ${
                        isZhiFu || isZhiShi
                          ? "bg-amber-50 border-amber-200"
                          : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-bold ${getGongColor(palace.number)}`}>
                          {palace.name}{palace.number}宫（{palace.position}）
                        </span>
                        {(isZhiFu || isZhiShi) && (
                          <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                            {isZhiFu ? "值符" : "值使"}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-xs text-center">
                        <div>
                          <span className="text-purple-500">神</span>
                          <div className="font-medium text-purple-700">
                            {palace.baShen}
                          </div>
                        </div>
                        <div>
                          <span className="text-green-500">星</span>
                          <div className="font-medium text-green-700">
                            {palace.jiuXing}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">干</span>
                          <div className="font-medium text-gray-800">
                            {palace.tianGan}
                          </div>
                        </div>
                        <div>
                          <span className="text-blue-500">门</span>
                          <div className="font-medium text-blue-700">
                            {palace.baMen}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <BookOpen className="w-12 h-12 mb-3 text-gray-300" />
            <div className="text-sm">功能开发中</div>
          </div>
        )}

        {/* 底部导航栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="flex">
            {[
              { id: "jushi", label: "局式" },
              { id: "duoju", label: "多局" },
              { id: "yanxi", label: "研习" },
              { id: "anli", label: "案例" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setResultTab(tab.id as any)}
                className={`flex-1 py-3 text-sm transition-colors ${
                  resultTab === tab.id
                    ? "text-red-600 font-medium border-t-2 border-red-600 -mt-0.5"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 宫位详解弹窗 */}
        {renderPalacePopup()}
      </div>
    )
  }

  return activeTab === "input" ? renderInputForm() : renderResult()
}
