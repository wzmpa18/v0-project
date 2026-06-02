"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, Info } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"
import { 
  MAIN_STARS, LUCKY_STARS, UNLUCKY_STARS, SI_HUA, TWELVE_PALACES,
  TIAN_GAN_SI_HUA, ZIWEI_DUAN_YU, calculateZiWeiPan, getMingGongDuanYu
} from "@/lib/ziwei-data"

// 十二地支
const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 五行颜色
const WUXING_COLORS: Record<string, string> = {
  "金": "text-amber-400",
  "木": "text-emerald-400", 
  "水": "text-blue-400",
  "火": "text-red-400",
  "土": "text-amber-600",
}

export function ZiWeiPageStandalone() {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [resultTab, setResultTab] = useState<"basic" | "detail" | "guji">("basic")
  
  // 输入表单
  const [name, setName] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [calendarType, setCalendarType] = useState<"solar" | "lunar">("solar")
  const [year, setYear] = useState(1990)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [hour, setHour] = useState(0)
  
  // 计算结果
  const [panResult, setPanResult] = useState<any>(null)
  const [showGujiModal, setShowGujiModal] = useState(false)
  const [selectedGongInfo, setSelectedGongInfo] = useState<any>(null)

  // 执行排盘
  const doPaiPan = () => {
    let lunar: any
    if (calendarType === "solar") {
      const solar = Solar.fromYmd(year, month, day)
      lunar = solar.getLunar()
    } else {
      lunar = Lunar.fromYmd(year, month, day)
    }
    
    const lunarYear = lunar.getYear()
    const lunarMonth = lunar.getMonth()
    const lunarDay = lunar.getDay()
    const yearGan = lunar.getYearGan()
    
    // 计算命盘
    const pan = calculateZiWeiPan(lunarYear, lunarMonth, lunarDay, hour, gender)
    
    // 计算四化
    const siHua = TIAN_GAN_SI_HUA[yearGan]
    
    // 构建十二宫信息
    const gongInfos = TWELVE_PALACES.map((palace, index) => {
      const mainStars: string[] = []
      Object.entries(pan.mainStarPositions).forEach(([star, pos]) => {
        if (pos === index) mainStars.push(star)
      })
      
      return {
        ...palace,
        diZhi: DI_ZHI[index],
        mainStars,
        isMingGong: index === TWELVE_PALACES.findIndex(p => p.name === pan.mingGong),
        isShenGong: index === TWELVE_PALACES.findIndex(p => p.name === pan.shenGong),
      }
    })
    
    setPanResult({
      ...pan,
      gongInfos,
      siHua,
      yearGan,
      lunarDate: `${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
      solarDate: lunar.getSolar().toYmd(),
    })
    setActiveTab("result")
  }

  // 打开宫位详情
  const openGongDetail = (gong: any) => {
    if (gong.mainStars.length > 0) {
      setSelectedGongInfo(gong)
      setShowGujiModal(true)
    }
  }

  // 输入表单
  const renderInputForm = () => (
    <div className="min-h-screen bg-gradient-to-b from-ink-900 to-ink-800">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-ink-900/90 backdrop-blur border-b border-ink-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-10" />
          <h1 className="text-lg font-bold text-ink-50">紫微斗数</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 标题说明 */}
        <div className="bg-ink-800/50 border border-ink-700 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-gold-400 mb-2">紫微斗数全书</h2>
          <p className="text-ink-400 text-sm">
            基于紫微斗数全书，包含十四主星、辅星、四化、十二宫位、格局分析、五行局计算
          </p>
        </div>

        {/* 输入表单 */}
        <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5 space-y-4">
          {/* 姓名 */}
          <div>
            <label className="block text-sm font-medium text-ink-300 mb-2">姓名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入姓名"
              className="w-full px-4 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 placeholder-ink-500 focus:outline-none focus:border-gold-500"
            />
          </div>

          {/* 性别与历法 */}
          <div className="flex justify-between items-center">
            <div className="flex bg-ink-700 rounded-full p-1">
              <button
                onClick={() => setGender("male")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  gender === "male"
                    ? "bg-gold-500 text-ink-950"
                    : "text-ink-300 hover:text-ink-100"
                }`}
              >
                男
              </button>
              <button
                onClick={() => setGender("female")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  gender === "female"
                    ? "bg-gold-500 text-ink-950"
                    : "text-ink-300 hover:text-ink-100"
                }`}
              >
                女
              </button>
            </div>
            <div className="flex bg-ink-700 rounded-full p-1">
              <button
                onClick={() => setCalendarType("solar")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  calendarType === "solar"
                    ? "bg-vermilion-500 text-white"
                    : "text-ink-300 hover:text-ink-100"
                }`}
              >
                公历
              </button>
              <button
                onClick={() => setCalendarType("lunar")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  calendarType === "lunar"
                    ? "bg-vermilion-500 text-white"
                    : "text-ink-300 hover:text-ink-100"
                }`}
              >
                农历
              </button>
            </div>
          </div>

          {/* 出生时间 */}
          <div className="border-t border-ink-700 pt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-ink-300 font-medium">出生时间</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="px-3 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 text-sm focus:outline-none focus:border-gold-500">
                {Array.from({ length: 100 }, (_, i) => 1940 + i).map(y => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
              <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="px-3 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 text-sm focus:outline-none focus:border-gold-500">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
              <select value={day} onChange={(e) => setDay(Number(e.target.value))} className="px-3 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 text-sm focus:outline-none focus:border-gold-500">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
              <select value={hour} onChange={(e) => setHour(Number(e.target.value))} className="px-3 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 text-sm focus:outline-none focus:border-gold-500">
                {Array.from({ length: 12 }, (_, i) => i * 2).map(h => (
                  <option key={h} value={h}>{DI_ZHI[Math.floor(h / 2) % 12]}时 ({h}:00)</option>
                ))}
              </select>
            </div>
          </div>

          {/* 开始排盘按钮 */}
          <button
            onClick={doPaiPan}
            className="w-full py-4 bg-gradient-to-r from-gold-500 to-amber-500 text-ink-950 rounded-xl font-bold text-lg shadow-lg hover:from-gold-400 hover:to-amber-400 transition-all active:scale-[0.98]"
          >
            开始排盘
          </button>
        </div>

        {/* 即时排盘 */}
        <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold text-ink-100">
                {DI_ZHI[Math.floor(new Date().getHours() / 2) % 12]}时 {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}
              </div>
              <div className="text-sm text-ink-400 mt-1">
                公历：{new Date().getFullYear()}年{new Date().getMonth() + 1}月{new Date().getDate()}日
              </div>
            </div>
            <button
              onClick={() => {
                const now = new Date()
                setYear(now.getFullYear())
                setMonth(now.getMonth() + 1)
                setDay(now.getDate())
                setHour(Math.floor(now.getHours() / 2) * 2)
                doPaiPan()
              }}
              className="px-6 py-3 bg-ink-700 border border-ink-600 rounded-xl text-ink-300 hover:bg-ink-600 transition-all"
            >
              即时排盘
            </button>
          </div>
        </div>

        {/* 古籍参考 */}
        <div className="bg-ink-800/30 border border-ink-700/50 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-ink-200 mb-1">经典理论依据</h3>
              <p className="text-sm text-ink-400 leading-relaxed">
                紫微斗数以紫微垣为核心，配以其他十三主星分布于十二宫位，结合辅曜杂曜组成完整命盘，通过星曜组合断人吉凶祸福
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // 渲染命盘（十二宫格）
  const renderPanGrid = () => {
    if (!panResult) return null
    
    // 紫微斗数命盘按照特定顺序排列（3x4网格）
    // 顺序：巳午未申（顶部）、辰-酉（左右）、卯-戌（左右）、寅丑子亥（底部）
    const gridOrder = [
      [4, 5, 6, 7],   // 辰巳午未
      [3, -1, -1, 8], // 卯 中间 酉
      [2, -1, -1, 9], // 寅 中间 戌
      [1, 0, 11, 10], // 丑子亥戌
    ]
    
    return (
      <div className="bg-ink-800 border border-ink-700 rounded-2xl p-2">
        <div className="grid grid-cols-4 gap-1">
          {gridOrder.flat().map((gongIndex, i) => {
            if (gongIndex === -1) {
              // 中央区域显示命盘信息
              if (i === 5) {
                return (
                  <div key={i} className="col-span-2 row-span-2 bg-gradient-to-br from-gold-500/20 to-amber-500/20 rounded-lg p-3 flex flex-col justify-center items-center border border-gold-500/30">
                    <div className="text-lg font-bold text-gold-400">{name || "紫微斗数"}</div>
                    <div className="text-xs text-ink-400 mt-1">{panResult.lunarDate}</div>
                    <div className="text-xs text-gold-400 mt-1">{panResult.wuxingJu}</div>
                    <div className="text-xs text-ink-400 mt-1">
                      命宫：{panResult.mingGong} | 身宫：{panResult.shenGong}
                    </div>
                  </div>
                )
              }
              return null
            }
            
            const gong = panResult.gongInfos[gongIndex]
            const isMing = gong.isMingGong
            const isShen = gong.isShenGong
            
            return (
              <div
                key={i}
                onClick={() => openGongDetail(gong)}
                className={`border rounded-lg p-2 min-h-[80px] cursor-pointer transition-all hover:bg-ink-700/50
                  ${isMing 
                    ? "bg-vermilion-500/10 border-vermilion-500/30" 
                    : isShen 
                      ? "bg-blue-500/10 border-blue-500/30" 
                      : "bg-ink-700/30 border-ink-600"
                  }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-medium ${isMing ? "text-vermilion-400" : isShen ? "text-blue-400" : "text-ink-400"}`}>
                    {gong.name}
                  </span>
                  <span className="text-xs text-ink-500">{gong.diZhi}</span>
                </div>
                <div className="space-y-0.5">
                  {gong.mainStars.slice(0, 3).map((star: string, idx: number) => {
                    const starInfo = MAIN_STARS[star as keyof typeof MAIN_STARS]
                    const colorClass = starInfo ? WUXING_COLORS[starInfo.wuxing] : "text-gray-400"
                    return (
                      <div key={idx} className={`text-xs font-bold ${colorClass}`}>
                        {star}
                      </div>
                    )
                  })}
                  {gong.mainStars.length > 3 && (
                    <div className="text-xs text-ink-500">+{gong.mainStars.length - 3}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // 结果页面
  const renderResult = () => (
    <div className="min-h-screen bg-gradient-to-b from-ink-900 to-ink-800">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-ink-900/90 backdrop-blur border-b border-ink-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => setActiveTab("input")} className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-ink-300" />
            </button>
            <h1 className="text-lg font-bold text-ink-50">紫微斗数命盘</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* 标签页 */}
        <div className="flex border-b border-ink-700 px-4">
          {[
            { id: "basic", label: "基本信息" },
            { id: "detail", label: "命盘详解" },
            { id: "guji", label: "古籍参考" },
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
        {resultTab === "basic" && (
          <>
            {/* 基本信息卡片 */}
            <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-400">姓名</span>
                  <span className="text-ink-100 font-medium">{name || "未填写"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400">性别</span>
                  <span className="text-ink-100 font-medium">{gender === "male" ? "男" : "女"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400">农历</span>
                  <span className="text-ink-100 font-medium">{panResult?.lunarDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400">公历</span>
                  <span className="text-ink-100 font-medium">{panResult?.solarDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400">五行局</span>
                  <span className="text-gold-400 font-medium">{panResult?.wuxingJu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400">命宫</span>
                  <span className="text-vermilion-400 font-medium">{panResult?.mingGong}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400">身宫</span>
                  <span className="text-blue-400 font-medium">{panResult?.shenGong}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400">年干四化</span>
                  <span className="text-ink-100 font-medium">
                    禄{panResult?.siHua?.禄} 权{panResult?.siHua?.权}
                  </span>
                </div>
              </div>
            </div>

            {/* 命盘 */}
            {renderPanGrid()}
            
            {/* 图例 */}
            <div className="bg-ink-800 border border-ink-700 rounded-2xl p-4">
              <div className="text-xs text-ink-400 mb-2">星曜五行颜色</div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(WUXING_COLORS).map(([wx, color]) => (
                  <div key={wx} className="flex items-center gap-1">
                    <span className={`${color} font-bold`}>●</span>
                    <span className="text-ink-400 text-xs">{wx}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {resultTab === "detail" && (
          <>
            {/* 十二宫详解 */}
            {panResult?.gongInfos?.map((gong: any, index: number) => (
              <div key={index} className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-bold ${gong.isMingGong ? "text-vermilion-400" : gong.isShenGong ? "text-blue-400" : "text-ink-100"}`}>
                    {gong.name}（{gong.diZhi}）
                  </span>
                  {gong.isMingGong && <span className="text-xs bg-vermilion-500/20 text-vermilion-400 px-2 py-0.5 rounded">命宫</span>}
                  {gong.isShenGong && <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">身宫</span>}
                </div>
                <div className="text-sm text-ink-400 mb-3">{gong.desc}</div>
                {gong.mainStars.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {gong.mainStars.map((star: string) => {
                      const starInfo = MAIN_STARS[star as keyof typeof MAIN_STARS]
                      return (
                        <span key={star} className={`text-sm font-medium ${starInfo ? WUXING_COLORS[starInfo.wuxing] : "text-gray-400"}`}>
                          {star}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {resultTab === "guji" && (
          <>
            {/* 古籍断语参考 */}
            <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-gold-400" />
                <span className="font-bold text-ink-100">命宫主星断语</span>
              </div>
              {panResult?.gongInfos?.find((g: any) => g.isMingGong)?.mainStars?.map((star: string) => {
                const duanyu = getMingGongDuanYu(star)
                return (
                  <div key={star} className="border-l-4 border-gold-500 pl-4 mb-4 last:mb-0">
                    <div className="text-gold-400 font-bold mb-1">{star}入命</div>
                    <div className="text-ink-200 text-sm mb-2">【原文】{duanyu.原文}</div>
                    <div className="text-ink-400 text-sm mb-1">【译文】{duanyu.译文}</div>
                    <div className="text-ink-500 text-xs">——{duanyu.出处}</div>
                  </div>
                )
              })}
            </div>

            {/* 四化分析 */}
            <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
              <div className="font-bold text-ink-100 mb-4">本命四化分析</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                  <div className="text-emerald-400 font-bold">化禄</div>
                  <div className="text-ink-100">{panResult?.siHua?.禄}</div>
                  <div className="text-xs text-ink-400 mt-1">主财禄、顺利</div>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                  <div className="text-purple-400 font-bold">化权</div>
                  <div className="text-ink-100">{panResult?.siHua?.权}</div>
                  <div className="text-xs text-ink-400 mt-1">主权势、掌控</div>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="text-blue-400 font-bold">化科</div>
                  <div className="text-ink-100">{panResult?.siHua?.科}</div>
                  <div className="text-xs text-ink-400 mt-1">主名声、贵人</div>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                  <div className="text-red-400 font-bold">化忌</div>
                  <div className="text-ink-100">{panResult?.siHua?.忌}</div>
                  <div className="text-xs text-ink-400 mt-1">主阻碍、困扰</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 宫位详情弹窗 */}
      {showGujiModal && selectedGongInfo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
          <div className="bg-ink-900 w-full rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-ink-900 border-b border-ink-700 px-4 py-3 flex justify-between items-center">
              <span className="font-bold text-ink-100">{selectedGongInfo.name}详解</span>
              <button onClick={() => setShowGujiModal(false)}>
                <ArrowLeft className="w-6 h-6 text-ink-400 rotate-90" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-ink-400 text-sm">{selectedGongInfo.desc}</div>
              {selectedGongInfo.mainStars.map((star: string) => {
                const starInfo = MAIN_STARS[star as keyof typeof MAIN_STARS]
                const duanyu = getMingGongDuanYu(star)
                return (
                  <div key={star} className="border border-ink-700 rounded-xl p-4">
                    <div className={`font-bold mb-2 ${starInfo ? WUXING_COLORS[starInfo.wuxing] : "text-gray-400"}`}>
                      {star}（{starInfo?.wuxing}）- {starInfo?.nature}
                    </div>
                    <div className="text-ink-400 text-sm mb-2">{starInfo?.desc}</div>
                    <div className="bg-gold-500/10 rounded-lg p-3 text-sm">
                      <div className="text-gold-300 font-medium mb-1">古籍断语</div>
                      <div className="text-ink-200">{duanyu.原文}</div>
                      <div className="text-ink-500 text-xs mt-1">——{duanyu.出处}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return activeTab === "input" ? renderInputForm() : renderResult()
}
