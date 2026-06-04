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
} from "lucide-react"

interface HomePageProps {
  onNavigateToTool?: (toolId: string) => void
  onNavigateToYiXue?: () => void
  onNavigateToHerbal?: () => void
}

export function HomePage({ onNavigateToTool, onNavigateToYiXue, onNavigateToHerbal }: HomePageProps = {}) {
  const router = useRouter()
  const [todayInfo, setTodayInfo] = useState<any>(null)

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

  const handleYiXueClick = () => {
    console.log("HomePage handleYiXueClick called")
    if (onNavigateToYiXue) {
      onNavigateToYiXue()
    } else {
      router.push("/yi-xue")
    }
  }

  const handleHerbalClick = () => {
    console.log("HomePage handleHerbalClick called")
    if (onNavigateToHerbal) {
      onNavigateToHerbal()
    } else {
      router.push("/herbal")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <span className="text-base font-bold">易</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-400">医易命理</h1>
              <p className="text-xs text-amber-200/60">国学智慧 · 传承千年</p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-amber-900/40 flex items-center justify-center border border-amber-700/50">
            <User className="w-4 h-4 text-amber-300" />
          </div>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
          <input
            type="text"
            placeholder="搜索命理、经方、养生知识..."
            className="w-full bg-[#2d2420] border border-amber-900/50 rounded-full py-2.5 pl-10 pr-4 text-xs text-amber-100 placeholder-amber-700 outline-none focus:border-amber-600"
          />
        </div>

        <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-lg p-2.5 flex items-center justify-between border border-amber-800/30">
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs text-amber-100/80">[公告] 医易命理APP v1.0正式上线，欢迎体验！</span>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-600" />
        </div>
      </header>

      <main className="px-4 pb-16">
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <button
            onClick={handleYiXueClick}
            className="bg-gradient-to-br from-amber-800/80 to-amber-900/60 rounded-xl p-4 flex flex-col items-center gap-1.5 border border-amber-700/30 shadow-lg shadow-amber-900/20 active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center border border-amber-500/30">
              <BookOpen className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-base font-bold text-amber-300">易学</span>
            <span className="text-xs text-amber-200/60">命理排盘</span>
          </button>
          <button
            onClick={handleHerbalClick}
            className="bg-gradient-to-br from-emerald-800/80 to-emerald-900/60 rounded-xl p-4 flex flex-col items-center gap-1.5 border border-emerald-700/30 shadow-lg shadow-emerald-900/20 active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/30">
              <Leaf className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-base font-bold text-emerald-300">中医</span>
            <span className="text-xs text-emerald-200/60">经方本草</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-4 mb-3 border border-amber-800/30">
          <div className="flex items-center justify-between mb-3">
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
          
          <div className="flex items-center gap-4 mb-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-300">{todayInfo?.day || new Date().getDate()}</div>
              <div className="text-xs text-amber-200/60">周{todayInfo?.weekDay}</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-amber-100 mb-0.5">
                {todayInfo?.year}年{todayInfo?.month}月{todayInfo?.day}日
              </div>
              <div className="text-xs text-amber-200/70 mb-0.5">
                {todayInfo?.nongLi}
              </div>
              <div className="text-xs text-amber-300">
                {todayInfo?.yearGanZhi}年 {todayInfo?.monthGanZhi}月 {todayInfo?.dayGanZhi}日
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-medium text-emerald-400">宜</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {todayInfo?.yi?.map((item: string, idx: number) => (
                  <span key={idx} className="text-xs bg-emerald-900/40 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-700/30">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <span className="text-xs font-medium text-red-400">忌</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {todayInfo?.ji?.map((item: string, idx: number) => (
                  <span key={idx} className="text-xs bg-red-900/40 text-red-200 px-2 py-0.5 rounded-full border border-red-700/30">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {todayInfo?.twelveGod && (
            <div className="mt-2 pt-2 border-t border-amber-800/30">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500/30 flex items-center justify-center">
                  <Star className="w-2.5 h-2.5 text-purple-400" />
                </div>
                <span className="text-xs text-purple-200/80">
                  今日值神：<span className="text-purple-300 font-medium">{todayInfo.twelveGod}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-xl p-4 mb-3 border border-purple-800/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-bold text-purple-200">五运六气</span>
            </div>
            <span className="text-xs text-purple-400/70">{todayInfo?.wuYunLiuQi?.yearGanZhi}年</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-purple-800/30 rounded-lg p-2.5 border border-purple-700/30">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-3 h-3 text-amber-400" />
                <span className="text-xs font-medium text-amber-200">岁运</span>
              </div>
              <div className="text-sm font-bold text-amber-300">{todayInfo?.wuYunLiuQi?.yearYun}</div>
            </div>
            <div className="bg-purple-800/30 rounded-lg p-2.5 border border-purple-700/30">
              <div className="flex items-center gap-1.5 mb-1">
                <Flame className="w-3 h-3 text-red-400" />
                <span className="text-xs font-medium text-red-200">司天</span>
              </div>
              <div className="text-sm font-bold text-red-300">{todayInfo?.wuYunLiuQi?.siTian}</div>
            </div>
            <div className="bg-purple-800/30 rounded-lg p-2.5 border border-purple-700/30">
              <div className="flex items-center gap-1.5 mb-1">
                <Mountain className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-medium text-blue-200">在泉</span>
              </div>
              <div className="text-sm font-bold text-blue-300">{todayInfo?.wuYunLiuQi?.zaiQuan}</div>
            </div>
            <div className="bg-purple-800/30 rounded-lg p-2.5 border border-purple-700/30">
              <div className="flex items-center gap-1.5 mb-1">
                <Mountain className="w-3 h-3 text-green-400" />
                <span className="text-xs font-medium text-green-200">主运</span>
              </div>
              <div className="text-sm font-bold text-green-300">太{todayInfo?.wuYunLiuQi?.yearYun?.replace("太", "").replace("少", "") || "木"}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 to-green-950/60 rounded-xl p-4 border border-green-800/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-green-500" />
              <span className="text-sm font-bold text-green-200">地母经</span>
            </div>
            <span className="text-xs text-green-400/70">《黄帝内经》</span>
          </div>
          
          <div className="text-xs text-green-100/80 leading-relaxed">
            {todayInfo?.diMuJing}
          </div>
        </div>
      </main>
    </div>
  )
}
