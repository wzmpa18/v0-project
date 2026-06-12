"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Bell,
  BookOpen,
  Leaf,
  Calendar,
  ChevronRight,
  Star,
  Flame,
  Mountain,
  User,
  Zap,
  BookMarked,
  Compass,
  Hexagon,
  Feather,
  Moon,
} from "lucide-react"

interface HomePageProps {
  onNavigateToYiXue?: () => void
  onNavigateToHerbal?: () => void
}

export function HomePage({ onNavigateToYiXue, onNavigateToHerbal }: HomePageProps) {
  const router = useRouter()
  const [todayInfo, setTodayInfo] = useState<any>(null)

  // 确保 callbacks 有 fallback
  const handleYiXue = () => {
    if (onNavigateToYiXue) {
      onNavigateToYiXue()
    } else {
      router.push("/yi-xue")
    }
  }

  const handleHerbal = () => {
    if (onNavigateToHerbal) {
      onNavigateToHerbal()
    } else {
      router.push("/herbal")
    }
  }

  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const weekDay = ["日", "一", "二", "三", "四", "五", "六"][now.getDay()]
    
    const GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
    const ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
    const SHENGXIAO = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
    
    const yearIndex = (year - 4) % 10
    const yearZhiIndex = (year - 4) % 12
    const monthIndex = (yearIndex * 12 + month + 1) % 10
    const monthZhiIndex = (month + 1) % 12
    const dayIndex = (year * 365 + month * 31 + day) % 10
    const dayZhiIndex = (year * 365 + month * 31 + day) % 12
    
    const yearGanZhi = `${GAN[yearIndex]}${ZHI[yearZhiIndex]}`
    const monthGanZhi = `${GAN[monthIndex]}${ZHI[monthZhiIndex]}`
    const dayGanZhi = `${GAN[dayIndex]}${ZHI[dayZhiIndex]}`
    const yearShengXiao = SHENGXIAO[yearZhiIndex]
    
    const LUNAR_MONTHS = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"]
    const LUNAR_DAYS = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
                       "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
                       "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"]
    
    const lunarMonthIndex = (month + 2) % 12
    const lunarDayIndex = (day - 1) % 30
    const nongLi = `农历${LUNAR_MONTHS[lunarMonthIndex]}月${LUNAR_DAYS[lunarDayIndex]}`
    
    const YI_JI = {
      good: ["祭祀", "祈福", "求嗣", "开光", "出行", "嫁娶", "订盟", "纳采", "裁衣", "安床", "修造", "动土", "移徙", "入宅", "开市", "交易", "立券", "纳财", "安葬"],
      bad: ["破屋", "坏垣", "余事勿取", "嫁娶", "动土", "安葬"]
    }
    
    const dayHash = (year + month + day) % YI_JI.good.length
    const todayYi = YI_JI.good.slice(dayHash, dayHash + 4)
    const todayJi = YI_JI.bad.slice((dayHash * 2) % YI_JI.bad.length, ((dayHash * 2) % YI_JI.bad.length) + 3)
    
    const TWELVE_GODS = ["青龙", "明堂", "天刑", "朱雀", "金匮", "天德", "白虎", "玉堂", "天牢", "玄武", "司命", "勾陈"]
    const twelveGod = TWELVE_GODS[(dayZhiIndex + 1) % TWELVE_GODS.length]
    
    const yunNames = ["木", "火", "土", "金", "水"]
    const yunTais = ["太", "少"]
    const yunIndex = yearIndex % 5
    const yunTai = yunTais[yearIndex % 2]
    const yearYun = `${yunTai}${yunNames[yunIndex]}`
    
    const siTianZhi = ZHI[Math.floor(yearZhiIndex / 2)]
    const siTianMing = {
      "子": "少阴君火", "丑": "太阴湿土", "寅": "少阳相火",
      "卯": "阳明燥金", "辰": "太阳寒水", "巳": "厥阴风木",
      "午": "少阴君火", "未": "太阴湿土", "申": "少阳相火",
      "酉": "阳明燥金", "戌": "太阳寒水", "亥": "厥阴风木"
    }[siTianZhi] || "厥阴风木"
    
    const zaiQuanZhi = ZHI[(Math.floor(yearZhiIndex / 2) + 6) % 12]
    const zaiQuanMing = {
      "子": "阳明燥金", "丑": "太阳寒水", "寅": "厥阴风木",
      "卯": "少阴君火", "辰": "太阴湿土", "巳": "少阳相火",
      "午": "阳明燥金", "未": "太阳寒水", "申": "厥阴风木",
      "酉": "少阴君火", "戌": "太阴湿土", "亥": "少阳相火"
    }[zaiQuanZhi] || "少阳相火"
    
    const DIMUJING = {
      "2025": "乙巳年，太岁相蛇。头有角，尾有芒。春不雨，夏大旱。秋田熟，冬雪降。人民愁，病多伤。",
      "2026": "丙午年，太岁相马。兵戈起，万民苦。夏多雨，秋大熟。冬雪霜，春生寒。疾病疫，需防护。",
      "2027": "丁未年，太岁相羊。岁半熟，谷米丰。民安康，国太平。风雨顺，乐无穷。"
    }
    
    setTodayInfo({
      year, month, day, weekDay,
      yearGanZhi, monthGanZhi, dayGanZhi,
      yearShengXiao, nongLi,
      yi: todayYi, ji: todayJi, twelveGod,
      wuYunLiuQi: {
        yearYun, siTian: siTianMing, zaiQuan: zaiQuanMing, yearGanZhi
      },
      diMuJing: DIMUJING[year.toString()] || DIMUJING["2026"]
    })
  }, [])

  const quickTools = [
    { id: "bazi", icon: BookOpen, label: "八字", color: "amber" },
    { id: "ziwei", icon: Star, label: "紫微", color: "purple" },
    { id: "qimen", icon: Compass, label: "奇门", color: "blue" },
    { id: "liuyao", icon: Hexagon, label: "六爻", color: "green" },
    { id: "meihua", icon: Feather, label: "梅花", color: "pink" },
    { id: "wannianli", icon: Calendar, label: "黄历", color: "orange" },
  ]

  const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
    amber: { bg: "bg-amber-800/60", icon: "text-amber-400", border: "border-amber-700/30" },
    purple: { bg: "bg-purple-800/60", icon: "text-purple-400", border: "border-purple-700/30" },
    blue: { bg: "bg-blue-800/60", icon: "text-blue-400", border: "border-blue-700/30" },
    green: { bg: "bg-green-800/60", icon: "text-green-400", border: "border-green-700/30" },
    pink: { bg: "bg-pink-800/60", icon: "text-pink-400", border: "border-pink-700/30" },
    orange: { bg: "bg-orange-800/60", icon: "text-orange-400", border: "border-orange-700/30" },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-8 pb-3 px-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <span className="text-sm font-bold">易</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-amber-400">医易命理</h1>
              <p className="text-xs text-amber-200/60">国学智慧 · 传承千年</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center border border-amber-700/50">
            <User className="w-4 h-4 text-amber-300" />
          </div>
        </div>

        <div className="relative mb-2.5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
          <input
            type="text"
            placeholder="搜索命理、经方、养生知识..."
            className="w-full bg-[#2d2420] border border-amber-900/50 rounded-full py-2 pl-10 pr-4 text-xs text-amber-100 placeholder-amber-700 outline-none focus:border-amber-600"
          />
        </div>

        <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-lg p-2 flex items-center justify-between border border-amber-800/30">
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs text-amber-100/80">医易命理APP v1.0正式上线</span>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-600" />
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={handleYiXue}
            className="bg-gradient-to-br from-amber-800/80 to-amber-900/60 rounded-xl p-3.5 flex flex-col items-center gap-1 border border-amber-700/30 shadow-lg shadow-amber-900/20 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center border border-amber-500/30">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-sm font-bold text-amber-300">易学</span>
            <span className="text-xs text-amber-200/60">命理排盘</span>
          </button>
          <button
            onClick={handleHerbal}
            className="bg-gradient-to-br from-emerald-800/80 to-emerald-900/60 rounded-xl p-3.5 flex flex-col items-center gap-1 border border-emerald-700/30 shadow-lg shadow-emerald-900/20 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/30">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-sm font-bold text-emerald-300">中医</span>
            <span className="text-xs text-emerald-200/60">经方本草</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-3 mb-2.5 border border-amber-800/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-amber-200">今日黄历</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400/70">{todayInfo?.yearGanZhi}年</span>
              <span className="text-xs text-amber-400/50">·</span>
              <span className="text-xs text-amber-400/70">属{todayInfo?.yearShengXiao}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="text-center">
              <div className="text-2.5xl font-bold text-amber-300">{todayInfo?.day || new Date().getDate()}</div>
              <div className="text-xs text-amber-200/60">周{todayInfo?.weekDay}</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-amber-100 mb-0.5">
                {todayInfo?.year}年{todayInfo?.month}月{todayInfo?.day}日
              </div>
              <div className="text-xs text-amber-300">
                {todayInfo?.yearGanZhi}年 {todayInfo?.monthGanZhi}月 {todayInfo?.dayGanZhi}日
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-medium text-emerald-400">宜</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {todayInfo?.yi?.map((item: string, idx: number) => (
                  <span key={idx} className="text-xs bg-emerald-900/40 text-emerald-200 px-1.5 py-0.5 rounded-full border border-emerald-700/30">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-1 h-1 rounded-full bg-red-500"></div>
                <span className="text-xs font-medium text-red-400">忌</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {todayInfo?.ji?.map((item: string, idx: number) => (
                  <span key={idx} className="text-xs bg-red-900/40 text-red-200 px-1.5 py-0.5 rounded-full border border-red-700/30">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2.5">
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-3 border border-purple-800/30">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-bold text-purple-200">五运六气</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-amber-200/70">岁运</span>
                <span className="text-sm font-bold text-amber-300">{todayInfo?.wuYunLiuQi?.yearYun}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-red-200/70">司天</span>
                <span className="text-xs font-bold text-red-300">{todayInfo?.wuYunLiuQi?.siTian}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-200/70">在泉</span>
                <span className="text-xs font-bold text-blue-300">{todayInfo?.wuYunLiuQi?.zaiQuan}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-3 border border-green-800/30">
            <div className="flex items-center gap-1.5 mb-2">
              <BookMarked className="w-4 h-4 text-green-500" />
              <span className="text-sm font-bold text-green-200">地母经</span>
            </div>
            <div className="text-xs text-green-100/80 leading-relaxed line-clamp-3">
              {todayInfo?.diMuJing}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-3 border border-amber-800/30">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-bold text-amber-200">快捷工具</span>
            <button onClick={handleYiXue} className="flex items-center gap-0.5 text-xs text-amber-400/70">
              更多 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {quickTools.map((tool) => {
              const colors = colorClasses[tool.color] || colorClasses.amber
              const Icon = tool.icon
              return (
                <button
                  key={tool.id}
                  onClick={() => router.push(`/${tool.id}`)}
                  className={`${colors.bg} rounded-lg p-2 flex flex-col items-center gap-1 border ${colors.border} active:scale-95 transition-transform`}
                >
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                  <span className="text-xs text-white/80">{tool.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/50 rounded-xl p-3 border border-blue-800/30 mt-2.5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-bold text-blue-200">每日运势</span>
            <Moon className="w-4 h-4 text-blue-400" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-800/30 rounded-lg p-2 text-center border border-blue-700/30">
              <div className="text-xs text-blue-200/70 mb-1">财运</div>
              <div className="flex justify-center">
                {[1,2,3].map((i) => (
                  <Star key={i} className={`w-4 h-4 ${i <= 2 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
                ))}
              </div>
            </div>
            <div className="bg-blue-800/30 rounded-lg p-2 text-center border border-blue-700/30">
              <div className="text-xs text-blue-200/70 mb-1">事业</div>
              <div className="flex justify-center">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className={`w-4 h-4 ${i <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
                ))}
              </div>
            </div>
            <div className="bg-blue-800/30 rounded-lg p-2 text-center border border-blue-700/30">
              <div className="text-xs text-blue-200/70 mb-1">感情</div>
              <div className="flex justify-center">
                {[1,2,3].map((i) => (
                  <Star key={i} className={`w-4 h-4 ${i <= 1 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-900/30 to-rose-950/50 rounded-xl p-3 border border-rose-800/30 mt-2.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Flame className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-bold text-rose-200">国学经典</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["《易经》", "《道德经》", "《黄帝内经》", "《伤寒论》", "《金匮要略》", "《本草纲目》"].map((book) => (
              <div key={book} className="bg-rose-800/30 rounded-lg p-2 text-center border border-rose-700/30">
                <span className="text-xs text-rose-100/80">{book}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}