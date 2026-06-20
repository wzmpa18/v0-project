"use client"

import { useState } from "react"
import { ChevronLeft, X, ChevronRight } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"
import { 
  MAIN_STARS, LUCKY_STARS, UNLUCKY_STARS, SI_HUA, TWELVE_PALACES,
  TIAN_GAN_SI_HUA, ZIWEI_DUAN_YU, calculateZiWeiPan, getMingGongDuanYu
} from "@/lib/ziwei-data"

// 十二地支
const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

// 星曜五行颜色
const getStarColor = (star: string, isMain: boolean = true): string => {
  const info = MAIN_STARS[star as keyof typeof MAIN_STARS] || 
               LUCKY_STARS[star as keyof typeof LUCKY_STARS] || 
               UNLUCKY_STARS[star as keyof typeof UNLUCKY_STARS]
  if (!info) return "text-gray-800"
  const colors: Record<string, string> = {
    "金": "text-amber-600",
    "木": "text-green-600", 
    "水": "text-blue-600",
    "火": "text-red-600",
    "土": "text-yellow-700",
  }
  return colors[info.wuxing] || "text-gray-800"
}

// 四化颜色
const SI_HUA_COLORS: Record<string, string> = {
  "禄": "text-green-600",
  "权": "text-blue-600",
  "科": "text-purple-600",
  "忌": "text-red-600",
}

interface ZiWeiPageStandaloneProps {
  onBack?: () => void
}

export function ZiWeiPageStandalone({ onBack }: ZiWeiPageStandaloneProps) {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [resultMode, setResultMode] = useState<"basic" | "sanhai" | "sihua" | "quick">("basic")
  
  // 输入表单
  const [name, setName] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(6)
  const [day, setDay] = useState(21)
  const [hour, setHour] = useState(0)
  
  // 计算结果
  const [panResult, setPanResult] = useState<any>(null)

  // 获取农历信息
  const getLunarInfo = () => {
    const solar = Solar.fromYmd(year, month, day)
    const lunar = solar.getLunar()
    return {
      year: lunar.getYear(),
      month: lunar.getMonth(),
      day: lunar.getDay(),
      yearGan: lunar.getYearGan(),
      yearZhi: lunar.getYearZhi(),
      monthGan: lunar.getMonthGan(),
      monthZhi: lunar.getMonthZhi(),
      dayGan: lunar.getDayGan(),
      dayZhi: lunar.getDayZhi(),
      lunarText: `${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
      solarText: `${year}年${month}月${day}日`,
    }
  }

  // 执行排盘
  const doPaiPan = () => {
    const lunarInfo = getLunarInfo()
    const pan = calculateZiWeiPan(lunarInfo.year, lunarInfo.month, lunarInfo.day, hour, gender)
    
    // 四化
    const siHua = TIAN_GAN_SI_HUA[lunarInfo.yearGan] || { 禄: "", 权: "", 科: "", 忌: "" }
    
    // 构建十二宫
    const gongInfos = TWELVE_PALACES.map((palace, index) => {
      const mainStars: string[] = []
      const luckyStars: string[] = []
      const unluckyStars: string[] = []
      
      Object.entries(pan.mainStarPositions || {}).forEach(([star, pos]) => {
        if (pos === index) mainStars.push(star)
      })
      
      // 添加辅星
      Object.entries(pan.luckyStarPositions || {}).forEach(([star, pos]) => {
        if (pos === index) luckyStars.push(star)
      })
      
      // 添加煞星
      Object.entries(pan.unluckyStarPositions || {}).forEach(([star, pos]) => {
        if (pos === index) unluckyStars.push(star)
      })
      
      // 四化标记
      let sihuaMark: { lu: boolean; quan: boolean; ke: boolean; ji: boolean } = {
        lu: false, quan: false, ke: false, ji: false
      }
      mainStars.forEach(star => {
        if (star === siHua.禄) sihuaMark.lu = true
        if (star === siHua.权) sihuaMark.quan = true
        if (star === siHua.科) sihuaMark.ke = true
        if (star === siHua.忌) sihuaMark.ji = true
      })
      
      return {
        ...palace,
        diZhi: DI_ZHI[index],
        tianGan: TIAN_GAN[(index + 2) % 10], // 简化天干
        mainStars,
        luckyStars,
        unluckyStars,
        sihuaMark,
        isMingGong: index === pan.mingGongIndex,
        isShenGong: index === pan.shenGongIndex,
        isZhiFu: index === (pan as any).zhiFuIndex,
        isZhiShi: index === (pan as any).zhiShiIndex,
      }
    })
    
    setPanResult({
      ...pan,
      gongInfos,
      siHua,
      yearGan: lunarInfo.yearGan,
      yearZhi: lunarInfo.yearZhi,
      monthGan: lunarInfo.monthGan,
      monthZhi: lunarInfo.monthZhi,
      dayGan: lunarInfo.dayGan,
      dayZhi: lunarInfo.dayZhi,
      lunarDate: lunarInfo.lunarText,
      solarDate: lunarInfo.solarText,
    })
    setActiveTab("result")
  }

  // 即时排盘
  const doNowPaiPan = () => {
    const now = new Date()
    setYear(now.getFullYear())
    setMonth(now.getMonth() + 1)
    setDay(now.getDate())
    setHour(Math.floor(now.getHours() / 2) * 2)
    setTimeout(doPaiPan, 0)
  }

  // 输入表单
  const renderInputForm = () => (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <span className="font-bold text-gray-800">紫微斗数 · 基础版</span>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-4">
        {/* 基本信息卡片 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 姓名 */}
          <div className="px-4 py-3 border-b flex justify-between items-center">
            <span className="text-gray-700">姓名</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入姓名"
              className="text-right text-gray-500 bg-transparent outline-none"
            />
          </div>
          
          {/* 性别 */}
          <div className="px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">性别</span>
              <div className="flex gap-4">
                <button
                  onClick={() => setGender("male")}
                  className={`text-sm ${gender === "male" ? "text-blue-600 font-medium" : "text-gray-400"}`}
                >
                  男
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`text-sm ${gender === "female" ? "text-pink-600 font-medium" : "text-gray-400"}`}
                >
                  女
                </button>
              </div>
            </div>
          </div>
          
          {/* 公历日期 */}
          <div className="px-4 py-3 border-b">
            <div className="flex justify-between items-center mb-3">
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
          <div className="px-4 py-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700">时辰</span>
              <span className="text-xs text-gray-400">{DI_ZHI[Math.floor(hour / 2) % 12]}时</span>
            </div>
            <select 
              value={hour} 
              onChange={(e) => setHour(Number(e.target.value))} 
              className="w-full p-2 border rounded-lg text-gray-800 text-sm text-center bg-gray-50"
            >
              {Array.from({ length: 12 }, (_, i) => i * 2).map(h => (
                <option key={h} value={h}>{DI_ZHI[Math.floor(h / 2) % 12]}时 ({h}:00-{h+1}:59)</option>
              ))}
            </select>
          </div>
        </div>

        {/* 排盘按钮 */}
        <button
          onClick={doPaiPan}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl text-lg font-medium shadow-md"
        >
          排 盘
        </button>

        {/* 即时排盘 */}
        <button
          onClick={doNowPaiPan}
          className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-base"
        >
          即时排盘（现在）
        </button>
      </div>
    </div>
  )

  // 渲染十二宫田字格
  const renderPanGrid = () => {
    if (!panResult) return null
    
    // 紫微斗数命盘传统布局：
    // 巳4 午5 未6 申7
    // 辰3           酉8
    // 卯2           戌9
    // 寅1 亥12 子11 丑10
    
    const gridLayout = [
      [5, 6, 7, 8],   // 巳午未申
      [4, -1, -1, 9], // 辰  酉
      [3, -1, -1, 10],// 卯  戌
      [2, 1, 12, 11], // 寅丑子亥
    ]
    
    return (
      <div className="bg-white rounded-xl p-2 shadow-sm">
        <div className="grid grid-cols-4 gap-0.5">
          {gridLayout.flat().map((gongIndex, i) => {
            if (gongIndex === -1) {
              // 中央区域
              if (i === 5) {
                return (
                  <div key={i} className="col-span-2 row-span-2 bg-gray-50 rounded-lg p-2 flex flex-col justify-center items-center min-h-[140px]">
                    <div className="text-base font-bold text-gray-800 mb-1">{name || "紫微斗数"}</div>
                    <div className="text-xs text-gray-500">{panResult.lunarDate}</div>
                    <div className="text-xs text-gray-400 mt-1">{panResult.wuxingJu}</div>
                    <div className="text-xs text-red-600 mt-1">命宫 {panResult.mingGong}</div>
                    <div className="text-xs text-blue-600">身宫 {panResult.shenGong}</div>
                  </div>
                )
              }
              return null
            }
            
            const idx = gongIndex - 1  // 转换为0-based索引
            const gong = panResult.gongInfos[idx]
            if (!gong) return null
            
            const isMing = gong.isMingGong
            const isShen = gong.isShenGong
            
            return (
              <div
                key={i}
                className={`border rounded-lg p-1.5 min-h-[80px] cursor-pointer transition-all
                  ${isMing ? "bg-red-50 border-red-300" : isShen ? "bg-blue-50 border-blue-300" : "border-gray-200 bg-white hover:bg-gray-50"}`}
              >
                {/* 宫位头部：天干 + 宫位名 + 地支 */}
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-green-600 font-medium">{gong.tianGan}</span>
                  <span className={`font-medium ${isMing ? "text-red-600" : isShen ? "text-blue-600" : "text-gray-600"}`}>
                    {gong.name}
                  </span>
                  <span className="text-gray-400">{gong.diZhi}</span>
                </div>
                
                {/* 星曜列表 */}
                <div className="space-y-0.5 text-center text-xs">
                  {/* 主星 */}
                  {gong.mainStars.map((star: string, si: number) => {
                    const hasLu = gong.sihuaMark.lu && star === panResult.siHua.禄
                    const hasQuan = gong.sihuaMark.quan && star === panResult.siHua.权
                    const hasKe = gong.sihuaMark.ke && star === panResult.siHua.科
                    const hasJi = gong.sihuaMark.ji && star === panResult.siHua.忌
                    
                    return (
                      <div key={si} className="flex items-center justify-center gap-0.5">
                        {hasLu && <span className="text-green-600 font-bold">禄</span>}
                        {hasQuan && <span className="text-blue-600 font-bold">权</span>}
                        {hasKe && <span className="text-purple-600 font-bold">科</span>}
                        {hasJi && <span className="text-red-600 font-bold">忌</span>}
                        <span className={`font-bold ${getStarColor(star, true)}`}>{star}</span>
                      </div>
                    )
                  })}
                  
                  {/* 辅星 */}
                  {gong.luckyStars.map((star: string, si: number) => (
                    <div key={`l${si}`} className={`${getStarColor(star, false)}`}>
                      {star}
                    </div>
                  ))}
                  
                  {/* 煞星 */}
                  {gong.unluckyStars.map((star: string, si: number) => (
                    <div key={`u${si}`} className={`${getStarColor(star, false)}`}>
                      {star}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // 大限时间轴
  const renderDaXianTimeline = () => {
    if (!panResult) return null
    
    // 简化大限计算
    const ages = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115]
    const startYear = year - (year % 10)
    
    return (
      <div className="bg-white rounded-xl p-3 shadow-sm overflow-x-auto">
        <div className="text-xs text-gray-500 mb-2">大限</div>
        <div className="flex gap-1 min-w-max">
          {panResult.gongInfos.slice(0, 6).map((gong: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center text-xs px-2 py-1 bg-gray-50 rounded min-w-[60px]">
              <span className="text-gray-800 font-medium">{gong.name}</span>
              <span className="text-gray-400">{startYear + idx * 10}</span>
              <span className="text-gray-500">{ages[idx]}岁</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 流年时间轴
  const renderLiuNianTimeline = () => {
    if (!panResult) return null
    const currentYear = new Date().getFullYear()
    
    return (
      <div className="bg-white rounded-xl p-3 shadow-sm overflow-x-auto">
        <div className="text-xs text-gray-500 mb-2">流年</div>
        <div className="flex gap-1 min-w-max">
          {Array.from({length: 10}, (_, i) => (
            <div key={i} className={`flex flex-col items-center text-xs px-2 py-1 rounded min-w-[50px] ${
              currentYear + i === currentYear ? "bg-red-100 border border-red-300" : "bg-gray-50"
            }`}>
              <span className="text-gray-800 font-medium">{DI_ZHI[(currentYear + i) % 12]}</span>
              <span className="text-gray-400">{currentYear + i}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 四化详解页面
  const renderSiHuaView = () => {
    if (!panResult) return null
    
    return (
      <div className="space-y-3">
        {/* 四化星显示 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm font-bold text-gray-800 mb-3">本命四化</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
              <span className="text-green-600 font-bold text-lg">禄</span>
              <span className="text-gray-800 font-medium">{panResult.siHua.禄}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <span className="text-blue-600 font-bold text-lg">权</span>
              <span className="text-gray-800 font-medium">{panResult.siHua.权}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
              <span className="text-purple-600 font-bold text-lg">科</span>
              <span className="text-gray-800 font-medium">{panResult.siHua.科}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
              <span className="text-red-600 font-bold text-lg">忌</span>
              <span className="text-gray-800 font-medium">{panResult.siHua.忌}</span>
            </div>
          </div>
        </div>
        
        {/* 四化关系线说明 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm font-bold text-gray-800 mb-3">四化关系</div>
          <div className="text-xs text-gray-500 space-y-2">
            <div>化禄：{panResult.siHua.禄} - 主财禄、顺利、贵人相助</div>
            <div>化权：{panResult.siHua.权} - 主权势、掌控、事业发展</div>
            <div>化科：{panResult.siHua.科} - 主名声、学业、贵人提携</div>
            <div>化忌：{panResult.siHua.忌} - 主阻碍、困扰、波折是非</div>
          </div>
        </div>
      </div>
    )
  }

  // 结果页面
  const renderResult = () => (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => setActiveTab("input")} className="p-1">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <span className="font-bold text-gray-800">紫微斗数 · 基础版</span>
        <button className="p-1 text-gray-500 text-sm">
          排盘
        </button>
      </div>

      {/* 四柱信息 */}
      <div className="p-4 pb-2 space-y-2">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="grid grid-cols-4 text-center">
            <div>
              <div className="text-xs text-gray-400">年柱</div>
              <div className="text-lg font-bold text-gray-800">{panResult?.yearGan}{panResult?.yearZhi}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">月柱</div>
              <div className="text-lg font-bold text-gray-800">{panResult?.monthGan}{panResult?.monthZhi}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">日柱</div>
              <div className="text-lg font-bold text-gray-800">{panResult?.dayGan}{panResult?.dayZhi}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">时柱</div>
              <div className="text-lg font-bold text-gray-800">子</div>
            </div>
          </div>
        </div>
        
        {/* 命盘 */}
        {renderPanGrid()}
        
        {/* 大限 */}
        {renderDaXianTimeline()}
        
        {/* 流年 */}
        {renderLiuNianTimeline()}
        
        {/* 宫位详解 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm font-bold text-gray-800 mb-3">十二宫详解</div>
          {panResult?.gongInfos?.map((gong: any, index: number) => (
            <div key={index} className={`mb-3 p-3 rounded-lg border ${
              gong.isMingGong ? "bg-red-50 border-red-200" : 
              gong.isShenGong ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-100"
            }`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`font-bold ${
                  gong.isMingGong ? "text-red-600" : 
                  gong.isShenGong ? "text-blue-600" : "text-gray-800"
                }`}>
                  {gong.tianGan}{gong.diZhi} | {gong.name}
                </span>
                {gong.isMingGong && <span className="text-xs bg-red-200 text-red-700 px-2 py-0.5 rounded">命宫</span>}
                {gong.isShenGong && <span className="text-xs bg-blue-200 text-blue-700 px-2 py-0.5 rounded">身宫</span>}
              </div>
              <div className="text-xs text-gray-600 mb-2">{gong.desc}</div>
              {gong.mainStars.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {gong.mainStars.map((star: string, si: number) => {
                    const isLu = star === panResult.siHua.禄
                    const isQuan = star === panResult.siHua.权
                    const isKe = star === panResult.siHua.科
                    const isJi = star === panResult.siHua.忌
                    return (
                      <span key={si} className="text-xs">
                        {isLu && <span className="text-green-600 font-bold">禄</span>}
                        {isQuan && <span className="text-blue-600 font-bold">权</span>}
                        {isKe && <span className="text-purple-600 font-bold">科</span>}
                        {isJi && <span className="text-red-600 font-bold">忌</span>}
                        <span className={`font-medium ${getStarColor(star, true)}`}>{star}</span>
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 底部标签栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex">
          {[
            { id: "basic", label: "常用功能" },
            { id: "sanhai", label: "三合" },
            { id: "sihua", label: "四化" },
            { id: "quick", label: "快速排盘" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setResultMode(tab.id as any)}
              className={`flex-1 py-3 text-sm ${resultMode === tab.id ? "text-red-600 font-medium border-t-2 border-red-600 -mt-0.5" : "text-gray-500"}`}
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
