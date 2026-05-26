"use client"

import { useState } from "react"
import { ChevronLeft, Info, BookOpen, X } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"
import { 
  MAIN_STARS, LUCKY_STARS, UNLUCKY_STARS, SI_HUA, TWELVE_PALACES,
  TIAN_GAN_SI_HUA, ZIWEI_DUAN_YU, calculateZiWeiPan, getMingGongDuanYu
} from "@/lib/ziwei-data"

interface ZiWeiPageProps {
  onBack?: () => void
}

// 十二地支
const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 五行颜色
const WUXING_COLORS: Record<string, string> = {
  "金": "text-amber-600",
  "木": "text-green-600", 
  "水": "text-blue-600",
  "火": "text-red-600",
  "土": "text-yellow-700",
}

export function ZiWeiPage({ onBack }: ZiWeiPageProps) {
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
    <div className="p-4 space-y-4">
      {/* 姓名 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <span className="text-gray-700 font-medium">姓名</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入姓名"
            className="text-right text-gray-500 bg-transparent outline-none"
          />
        </div>
        
        {/* 性别与历法 */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setGender("male")}
              className={`px-4 py-1 rounded-full text-sm ${gender === "male" ? "bg-[#d4af37] text-white" : "text-gray-600"}`}
            >
              男
            </button>
            <button
              onClick={() => setGender("female")}
              className={`px-4 py-1 rounded-full text-sm ${gender === "female" ? "bg-[#d4af37] text-white" : "text-gray-600"}`}
            >
              女
            </button>
          </div>
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setCalendarType("solar")}
              className={`px-3 py-1 rounded-full text-sm ${calendarType === "solar" ? "bg-[#d4af37] text-white" : "text-gray-600"}`}
            >
              公历
            </button>
            <button
              onClick={() => setCalendarType("lunar")}
              className={`px-3 py-1 rounded-full text-sm ${calendarType === "lunar" ? "bg-[#d4af37] text-white" : "text-gray-600"}`}
            >
              农历
            </button>
          </div>
        </div>
        
        {/* 出生时间 */}
        <div className="border-t pt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">出生时间</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="p-2 border rounded text-gray-800 text-sm">
              {Array.from({ length: 100 }, (_, i) => 1940 + i).map(y => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="p-2 border rounded text-gray-800 text-sm">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>{m}月</option>
              ))}
            </select>
            <select value={day} onChange={(e) => setDay(Number(e.target.value))} className="p-2 border rounded text-gray-800 text-sm">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>{d}日</option>
              ))}
            </select>
            <select value={hour} onChange={(e) => setHour(Number(e.target.value))} className="p-2 border rounded text-gray-800 text-sm">
              {Array.from({ length: 12 }, (_, i) => i * 2).map(h => (
                <option key={h} value={h}>{DI_ZHI[Math.floor(h / 2) % 12]}时 ({h}:00)</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 排盘按钮 */}
      <button
        onClick={doPaiPan}
        className="w-full py-4 bg-[#1a1a1a] text-white rounded-xl text-lg font-medium"
      >
        开始排盘
      </button>

      {/* 即时排盘卡片 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {new Date().getHours() >= 11 && new Date().getHours() < 13 ? "午时" : 
               DI_ZHI[Math.floor(new Date().getHours() / 2) % 12] + "时"} {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-500 mt-1">
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
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700"
          >
            即时排盘
          </button>
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
      <div className="bg-white rounded-xl p-2 shadow-sm">
        <div className="grid grid-cols-4 gap-1">
          {gridOrder.flat().map((gongIndex, i) => {
            if (gongIndex === -1) {
              // 中央区域显示命盘信息
              if (i === 5) {
                return (
                  <div key={i} className="col-span-2 row-span-2 bg-[#1a1a1a] rounded-lg p-3 flex flex-col justify-center items-center text-white">
                    <div className="text-lg font-bold">{name || "紫微斗数"}</div>
                    <div className="text-xs text-gray-400 mt-1">{panResult.lunarDate}</div>
                    <div className="text-xs text-[#d4af37] mt-1">{panResult.wuxingJu}</div>
                    <div className="text-xs text-gray-400 mt-1">
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
                className={`border rounded-lg p-1.5 min-h-[80px] cursor-pointer transition-colors
                  ${isMing ? "bg-red-50 border-red-300" : isShen ? "bg-blue-50 border-blue-300" : "border-gray-200 hover:bg-gray-50"}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-medium ${isMing ? "text-red-600" : isShen ? "text-blue-600" : "text-gray-600"}`}>
                    {gong.name}
                  </span>
                  <span className="text-xs text-gray-400">{gong.diZhi}</span>
                </div>
                <div className="space-y-0.5">
                  {gong.mainStars.slice(0, 3).map((star: string) => {
                    const starInfo = MAIN_STARS[star as keyof typeof MAIN_STARS]
                    const colorClass = starInfo ? WUXING_COLORS[starInfo.wuxing] : "text-gray-800"
                    return (
                      <div key={star} className={`text-xs font-bold ${colorClass}`}>
                        {star}
                      </div>
                    )
                  })}
                  {gong.mainStars.length > 3 && (
                    <div className="text-xs text-gray-400">+{gong.mainStars.length - 3}</div>
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
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标签 */}
      <div className="bg-[#4a7c59] text-white">
        <div className="flex">
          {[
            { id: "basic", label: "基本信息" },
            { id: "detail", label: "命盘详解" },
            { id: "guji", label: "古籍参考" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setResultTab(tab.id as any)}
              className={`flex-1 py-3 text-sm font-medium ${resultTab === tab.id ? "text-white border-b-2 border-white" : "text-white/70"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 pb-24 space-y-4">
        {resultTab === "basic" && (
          <>
            {/* 基本信息卡片 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">姓名</span>
                  <span className="text-gray-800 font-medium">{name || "未填写"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">性别</span>
                  <span className="text-gray-800 font-medium">{gender === "male" ? "男" : "女"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">农历</span>
                  <span className="text-gray-800 font-medium">{panResult?.lunarDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">阳历</span>
                  <span className="text-gray-800 font-medium">{panResult?.solarDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">五行局</span>
                  <span className="text-[#d4af37] font-medium">{panResult?.wuxingJu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">命宫</span>
                  <span className="text-red-600 font-medium">{panResult?.mingGong}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">身宫</span>
                  <span className="text-blue-600 font-medium">{panResult?.shenGong}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">年干四化</span>
                  <span className="text-gray-800 font-medium">
                    禄{panResult?.siHua?.禄} 权{panResult?.siHua?.权}
                  </span>
                </div>
              </div>
            </div>

            {/* 命盘 */}
            {renderPanGrid()}
            
            {/* 图例 */}
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="text-xs text-gray-500 mb-2">星曜五行颜色</div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(WUXING_COLORS).map(([wx, color]) => (
                  <div key={wx} className="flex items-center gap-1">
                    <span className={`${color} font-bold`}>●</span>
                    <span className="text-gray-600 text-xs">{wx}</span>
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
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-bold ${gong.isMingGong ? "text-red-600" : gong.isShenGong ? "text-blue-600" : "text-gray-800"}`}>
                    {gong.name}（{gong.diZhi}）
                  </span>
                  {gong.isMingGong && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">命宫</span>}
                  {gong.isShenGong && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">身宫</span>}
                </div>
                <div className="text-sm text-gray-600 mb-2">{gong.desc}</div>
                {gong.mainStars.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {gong.mainStars.map((star: string) => {
                      const starInfo = MAIN_STARS[star as keyof typeof MAIN_STARS]
                      return (
                        <span key={star} className={`text-sm font-medium ${starInfo ? WUXING_COLORS[starInfo.wuxing] : "text-gray-800"}`}>
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
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-[#d4af37]" />
                <span className="font-bold text-gray-800">命宫主星断语</span>
              </div>
              {panResult?.gongInfos?.find((g: any) => g.isMingGong)?.mainStars?.map((star: string) => {
                const duanyu = getMingGongDuanYu(star)
                return (
                  <div key={star} className="border-l-4 border-[#d4af37] pl-3 mb-4">
                    <div className="text-[#d4af37] font-bold mb-1">{star}入命</div>
                    <div className="text-gray-800 text-sm mb-2">【原文】{duanyu.原文}</div>
                    <div className="text-gray-600 text-sm mb-1">【译文】{duanyu.译文}</div>
                    <div className="text-gray-400 text-xs">——{duanyu.出处}</div>
                  </div>
                )
              })}
            </div>

            {/* 四化分析 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="font-bold text-gray-800 mb-3">本命四化分析</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-green-600 font-bold">化禄</div>
                  <div className="text-gray-800">{panResult?.siHua?.禄}</div>
                  <div className="text-xs text-gray-500">主财禄、顺利</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-purple-600 font-bold">化权</div>
                  <div className="text-gray-800">{panResult?.siHua?.权}</div>
                  <div className="text-xs text-gray-500">主权势、掌控</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-blue-600 font-bold">化科</div>
                  <div className="text-gray-800">{panResult?.siHua?.科}</div>
                  <div className="text-xs text-gray-500">主名声、贵人</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-red-600 font-bold">化忌</div>
                  <div className="text-gray-800">{panResult?.siHua?.忌}</div>
                  <div className="text-xs text-gray-500">主阻碍、困扰</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  // 宫位详情弹窗
  const renderGujiModal = () => {
    if (!showGujiModal || !selectedGongInfo) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
        <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
            <span className="font-bold text-gray-800">{selectedGongInfo.name}详解</span>
            <button onClick={() => setShowGujiModal(false)}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="text-gray-600 text-sm">{selectedGongInfo.desc}</div>
            {selectedGongInfo.mainStars.map((star: string) => {
              const starInfo = MAIN_STARS[star as keyof typeof MAIN_STARS]
              const duanyu = getMingGongDuanYu(star)
              return (
                <div key={star} className="border rounded-lg p-3">
                  <div className={`font-bold mb-2 ${starInfo ? WUXING_COLORS[starInfo.wuxing] : "text-gray-800"}`}>
                    {star}（{starInfo?.wuxing}）- {starInfo?.nature}
                  </div>
                  <div className="text-gray-600 text-sm mb-2">{starInfo?.desc}</div>
                  <div className="bg-[#fffbeb] rounded p-2 text-sm">
                    <div className="text-[#d4af37] font-medium mb-1">古籍断语</div>
                    <div className="text-gray-800">{duanyu.原文}</div>
                    <div className="text-gray-500 text-xs mt-1">——{duanyu.出处}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack || (() => setActiveTab("input"))} className="p-1">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <span className="font-bold text-gray-800">紫微斗数</span>
        <div className="w-6" />
      </div>

      {activeTab === "input" ? renderInputForm() : renderResult()}
      {renderGujiModal()}
    </div>
  )
}
