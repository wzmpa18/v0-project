"use client"

import { useState, useEffect } from "react"
import { Search, Bell, Compass, Stethoscope, Sun, Moon, Cloud, ChevronRight, Leaf, Calendar, Wind, Droplets } from "lucide-react"

interface HomePageProps {
  onNavigateToTab: (tab: string) => void
  onNavigateToTool?: (toolId: string) => void
}

// 地母经数据
const DIMU_DATA = {
  "2024": {
    year: "甲辰年",
    poem: "太岁甲辰年，稻麻一半空。春夏遭淹没，秋冬流不通。",
    meaning: "今年五谷收成一般，春夏多雨，秋冬干旱"
  },
  "2025": {
    year: "乙巳年", 
    poem: "太岁乙巳年，高低尽得丰。渐宜添种作，虫蝗一齐空。",
    meaning: "今年收成较好，适合多种植，虫害较少"
  },
  "2026": {
    year: "丙午年",
    poem: "太岁丙午年，高下皆偏颇。春夏多干旱，秋冬足流波。",
    meaning: "今年气候不均，春夏干旱，秋冬多雨"
  }
}

// 五运六气数据
const WUYUN_LIUQI = {
  year: "丙午年",
  suiyun: { name: "水运太过", element: "水", color: "#4a90d9" },
  zhuqi: { name: "太阳寒水", period: "初之气", color: "#1e3a5f" },
  keqi: { name: "少阴君火", period: "二之气", color: "#c8102e" },
  advice: "宜养肾防寒，少食生冷"
}

// 每日养生
const YANGSHENG_TIPS = [
  { title: "春季养肝", content: "宜早睡早起，多食绿色蔬菜，保持心情舒畅", season: "春" },
  { title: "夏季养心", content: "宜午休养神，多食苦味清心，避免大汗伤阳", season: "夏" },
  { title: "秋季养肺", content: "宜早睡早起，多食白色食物，保持室内湿润", season: "秋" },
  { title: "冬季养肾", content: "宜早睡晚起，多食黑色食物，避免过度劳累", season: "冬" },
]

// 公告数据
const ANNOUNCEMENTS = [
  "欢迎使用国学宝典APP，传承中华智慧",
  "新功能上线：AI命理解读，限时免费体验",
  "六爻排盘功能已更新，支持更多断语",
  "中医养生课程即将开放，敬请期待",
]

export function HomePage({ onNavigateToTab, onNavigateToTool }: HomePageProps) {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [lunarDate, setLunarDate] = useState("")

  useEffect(() => {
    // 公告轮播
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % ANNOUNCEMENTS.length)
    }, 4000)

    // 获取日期
    const now = new Date()
    setCurrentDate(`${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`)
    
    // 模拟农历日期
    const lunarMonths = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"]
    const lunarDays = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
                       "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
                       "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"]
    const mockLunarMonth = lunarMonths[(now.getMonth() + 10) % 12]
    const mockLunarDay = lunarDays[(now.getDate() + 15) % 30]
    setLunarDate(`农历${mockLunarMonth}月${mockLunarDay}`)

    return () => clearInterval(timer)
  }, [])

  const currentYear = new Date().getFullYear().toString()
  const dimu = DIMU_DATA[currentYear as keyof typeof DIMU_DATA] || DIMU_DATA["2026"]
  const currentSeason = (() => {
    const month = new Date().getMonth()
    if (month >= 2 && month <= 4) return "春"
    if (month >= 5 && month <= 7) return "夏"
    if (month >= 8 && month <= 10) return "秋"
    return "冬"
  })()
  const yangsheng = YANGSHENG_TIPS.find(t => t.season === currentSeason) || YANGSHENG_TIPS[0]

  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-4">
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-20 bg-[#1a1a1a] pt-4 px-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="搜索易学、中医内容..."
              className="w-full bg-[#252525] border border-[#3a3a3a] rounded-full pl-10 pr-4 py-2.5 text-sm text-[#f5f5f7] placeholder:text-[#666] focus:outline-none focus:border-[#d4af37]/50"
            />
          </div>
          <button className="w-10 h-10 rounded-full bg-[#252525] border border-[#3a3a3a] flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#c5c5c5]" />
          </button>
        </div>
      </div>

      {/* 公告栏 */}
      <div className="mx-4 mb-4 px-4 py-2.5 bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 rounded-xl border border-[#d4af37]/20">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
            <Bell className="w-3 h-3 text-[#d4af37]" />
          </div>
          <p className="text-sm text-[#d4af37] truncate flex-1 animate-pulse">
            {ANNOUNCEMENTS[currentAnnouncement]}
          </p>
        </div>
      </div>

      {/* 快捷入口宫格 */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-2 gap-4">
          {/* 易学入口 */}
          <button
            onClick={() => onNavigateToTab("yixue")}
            className="aspect-square bg-gradient-to-br from-[#2a2520] to-[#1e1c18] rounded-2xl border border-[#d4af37]/30 p-4 flex flex-col items-center justify-center gap-3 hover:border-[#d4af37]/60 transition-all active:scale-95"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 flex items-center justify-center">
              <Compass className="w-8 h-8 text-[#d4af37]" />
            </div>
            <div className="text-center">
              <div className="text-[#f5f5f7] font-medium">易学</div>
              <div className="text-[#888] text-xs mt-0.5">八字 六爻 奇门</div>
            </div>
          </button>

          {/* 中医入口 */}
          <button
            onClick={() => onNavigateToTab("tcm")}
            className="aspect-square bg-gradient-to-br from-[#1e2520] to-[#181e18] rounded-2xl border border-[#4a9d5c]/30 p-4 flex flex-col items-center justify-center gap-3 hover:border-[#4a9d5c]/60 transition-all active:scale-95"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4a9d5c]/20 to-[#4a9d5c]/10 flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-[#4a9d5c]" />
            </div>
            <div className="text-center">
              <div className="text-[#f5f5f7] font-medium">中医</div>
              <div className="text-[#888] text-xs mt-0.5">经络 本草 方剂</div>
            </div>
          </button>
        </div>
      </div>

      {/* 今日黄历 + 每日养生 */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-2 gap-3">
          {/* 今日黄历（地母经） */}
          <div className="bg-[#252525] rounded-2xl border border-[#3a3a3a] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-[#d4af37]" />
              <span className="text-[#d4af37] text-sm font-medium">今日黄历</span>
            </div>
            <div className="space-y-2">
              <div className="text-[#f5f5f7] text-xs">{currentDate}</div>
              <div className="text-[#c5c5c5] text-xs">{lunarDate}</div>
              <div className="h-px bg-[#3a3a3a] my-2" />
              <div className="text-[#d4af37] text-xs font-medium">{dimu.year}</div>
              <div className="text-[#888] text-[10px] leading-relaxed line-clamp-3">{dimu.poem}</div>
            </div>
          </div>

          {/* 每日养生 */}
          <div className="bg-[#252525] rounded-2xl border border-[#3a3a3a] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-4 h-4 text-[#4a9d5c]" />
              <span className="text-[#4a9d5c] text-sm font-medium">每日养生</span>
            </div>
            <div className="space-y-2">
              <div className="text-[#f5f5f7] text-sm font-medium">{yangsheng.title}</div>
              <div className="text-[#c5c5c5] text-xs leading-relaxed line-clamp-4">{yangsheng.content}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 五运六气 */}
      <div className="px-4 mb-5">
        <div className="bg-gradient-to-br from-[#1e2530] to-[#1a1e28] rounded-2xl border border-[#3a4a5a] p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-[#4a90d9]" />
              <span className="text-[#4a90d9] text-sm font-medium">五运六气</span>
            </div>
            <span className="text-[#888] text-xs">{WUYUN_LIUQI.year}</span>
          </div>
          
          <div className="space-y-3">
            {/* 岁运 */}
            <div className="flex items-center justify-between">
              <span className="text-[#888] text-xs w-12">岁运</span>
              <div className="flex-1 flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: WUYUN_LIUQI.suiyun.color }}
                />
                <span className="text-[#f5f5f7] text-sm">{WUYUN_LIUQI.suiyun.name}</span>
              </div>
            </div>
            
            {/* 主气 */}
            <div className="flex items-center justify-between">
              <span className="text-[#888] text-xs w-12">主气</span>
              <div className="flex-1 flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: WUYUN_LIUQI.zhuqi.color }}
                />
                <span className="text-[#f5f5f7] text-sm">{WUYUN_LIUQI.zhuqi.name}</span>
                <span className="text-[#666] text-xs">({WUYUN_LIUQI.zhuqi.period})</span>
              </div>
            </div>
            
            {/* 客气 */}
            <div className="flex items-center justify-between">
              <span className="text-[#888] text-xs w-12">客气</span>
              <div className="flex-1 flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: WUYUN_LIUQI.keqi.color }}
                />
                <span className="text-[#f5f5f7] text-sm">{WUYUN_LIUQI.keqi.name}</span>
                <span className="text-[#666] text-xs">({WUYUN_LIUQI.keqi.period})</span>
              </div>
            </div>

            <div className="h-px bg-[#3a4a5a] my-2" />
            
            {/* 养生建议 */}
            <div className="flex items-start gap-2">
              <Droplets className="w-4 h-4 text-[#4a90d9] mt-0.5 flex-shrink-0" />
              <span className="text-[#c5c5c5] text-xs leading-relaxed">{WUYUN_LIUQI.advice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 快捷功能入口 */}
      <div className="px-4 mb-4">
        <div className="text-[#888] text-xs mb-3">常用功能</div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: "🔮", label: "八字排盘", tab: null, tool: "bazi" },
            { icon: "📿", label: "六爻占卜", tab: null, tool: "liuyao" },
            { icon: "🧭", label: "奇门遁甲", tab: null, tool: "qimen" },
            { icon: "💊", label: "中药查询", tab: "tcm", tool: null },
            { icon: "📚", label: "经典研读", tab: "study", tool: null },
            { icon: "🤖", label: "AI解读", tab: "ai", tool: null },
            { icon: "👥", label: "易友圈", tab: "community", tool: null },
            { icon: "🛒", label: "文创商城", tab: null, tool: "shop" },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                console.log("[v0] Button clicked:", item.label, "tool:", item.tool, "tab:", item.tab)
                if (item.tool && onNavigateToTool) {
                  console.log("[v0] Navigating to tool:", item.tool)
                  onNavigateToTool(item.tool)
                } else if (item.tab) {
                  console.log("[v0] Navigating to tab:", item.tab)
                  onNavigateToTab(item.tab)
                }
              }}
              className="flex flex-col items-center gap-1.5 p-3 bg-[#252525] rounded-xl border border-[#3a3a3a] hover:border-[#d4af37]/30 transition-all active:scale-95"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[#c5c5c5] text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 底部合规声明 */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[#888] text-[10px] text-center leading-relaxed">
          本APP中医内容为理论学习，不构成医疗诊断；命理内容为学术交流，不做决策依据。
        </p>
      </div>
    </div>
  )
}
