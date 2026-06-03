"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lunar, Solar } from "lunar-javascript"
import {
  Calendar,
  User,
  Compass,
  Star,
  Hexagon,
  Circle,
  BookOpen,
  Gem,
  Map,
  Smartphone,
  Users,
  Layers,
  Ruler,
  MapPin,
  Sparkles,
  Ghost,
  Search,
  UserCheck,
  GraduationCap,
  Coins,
  Headphones,
  Heart,
  ChevronRight,
} from "lucide-react"

interface HomePageProps {
  onNavigateToTool?: (toolId: string) => void
}

const YI_XUE_TOOLS = [
  { id: "bazi", name: "八字排盘", icon: Calendar, color: "#0891b2" },
  { id: "qimen", name: "奇门遁甲", icon: Compass, color: "#8b5cf6" },
  { id: "ziwei", name: "紫微斗数", icon: Star, color: "#ec4899" },
  { id: "liuyao", name: "六爻排盘", icon: Hexagon, color: "#f59e0b" },
  { id: "meihua", name: "梅花易数", icon: FlowerIcon, color: "#22c55e" },
  { id: "daliuren", name: "大六壬", icon: Layers, color: "#3b82f6" },
  { id: "xiaoliuren", name: "小六壬", icon: Gem, color: "#06b6d4" },
  { id: "jinkoujue", name: "金口诀", icon: BookOpen, color: "#ef4444" },
  { id: "qiming", name: "起名工具", icon: UserCheck, color: "#8b5cf6" },
  { id: "wannianli", name: "万年历", icon: Calendar, color: "#16a34a" },
]

const ZHONGYI_TOOLS = [
  { id: "jingluo", name: "经络穴位", icon: MapPin, color: "#0ea5e9" },
  { id: "jingfang", name: "经方本草", icon: BookOpen, color: "#16a34a" },
  { id: "zhongyi", name: "中医诊疗", icon: Heart, color: "#dc2626" },
  { id: "tizhi", name: "体质辨识", icon: User, color: "#f59e0b" },
  { id: "jflib", name: "经方传承", icon: GraduationCap, color: "#8b5cf6" },
  { id: "tcm-study", name: "中医题库", icon: BookOpen, color: "#0891b2" },
]

function FlowerIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3m10-10h-3M5 12H2m12.7-7.7l-2.1 2.1M8.4 17.6l-2.1 2.1m10.6 0l-2.1-2.1M8.4 6.4l-2.1-2.1" />
    </svg>
  )
}

export function HomePage({ onNavigateToTool }: HomePageProps = {}) {
  const router = useRouter()
  const [todayInfo, setTodayInfo] = useState<any>(null)

  useEffect(() => {
    const now = new Date()
    const solar = Solar.fromYmd(now.getFullYear(), now.getMonth() + 1, now.getDate())
    const lunar = solar.getLunar()
    const eightChar = lunar.getEightChar()
    
    setTodayInfo({
      solar: `${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日`,
      lunar: `农历${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
      week: `星期${['日', '一', '二', '三', '四', '五', '六'][solar.getWeek()]}`,
      yearGanZhi: `${eightChar.getYearGan()}${eightChar.getYearZhi()}`,
      monthGanZhi: `${eightChar.getMonthGan()}${eightChar.getMonthZhi()}`,
      dayGanZhi: `${eightChar.getDayGan()}${eightChar.getDayZhi()}`,
    })
  }, [])

  const handleToolClick = (toolId: string) => {
    const routeMap: Record<string, string> = {
      "bazi": "/bazi",
      "qimen": "/qimen",
      "ziwei": "/ziwei",
      "liuyao": "/liuyao",
      "meihua": "/meihua",
      "daliuren": "/daliuren",
      "xiaoliuren": "/xiaoliuren",
      "jinkoujue": "/jinkoujue",
      "qiming": "/qiming",
      "wannianli": "/wannianli",
      "jingluo": "/meridian",
      "jingfang": "/herbal",
      "zhongyi": "/tcm",
      "tizhi": "/constitution",
      "jflib": "/tcm-classics",
      "tcm-study": "/tcm-study",
    }
    const route = routeMap[toolId]
    if (route) {
      router.push(route)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 pt-12 pb-8 px-4">
        <h1 className="text-2xl font-bold text-center text-white mb-2">国学智慧</h1>
        <p className="text-white/80 text-center text-sm">传承千年 · 智慧人生</p>
        
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/60 text-xs">今日</div>
              <div className="text-white font-bold text-lg">
                {todayInfo?.solar}
              </div>
              <div className="text-white/70 text-xs">
                {todayInfo?.lunar} · {todayInfo?.week}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-xs">干支</div>
              <div className="text-yellow-300 font-bold text-lg">
                {todayInfo?.yearGanZhi}年
              </div>
              <div className="text-white/70 text-xs">
                {todayInfo?.monthGanZhi} · {todayInfo?.dayGanZhi}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-blue-500" />
            <h2 className="text-gray-800 font-bold">易学工具</h2>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {YI_XUE_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="flex flex-col items-center py-3 relative"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${tool.color}15` }}
                >
                  <tool.icon 
                    className="w-6 h-6"
                    style={{ color: tool.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-xs text-gray-700 text-center leading-tight">
                  {tool.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-red-500" />
            <h2 className="text-gray-800 font-bold">中医养生</h2>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {ZHONGYI_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="flex flex-col items-center py-3 relative"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${tool.color}15` }}
                >
                  <tool.icon 
                    className="w-6 h-6"
                    style={{ color: tool.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-xs text-gray-700 text-center leading-tight">
                  {tool.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg p-4 mb-4">
          <button
            onClick={() => handleToolClick("jflib")}
            className="w-full flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">经方传承库</h3>
              <p className="text-white/80 text-sm">倪海厦经方家 · 伤寒论 · 金匮要略</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 pb-24">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-gray-800 font-bold">更多工具</h2>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {[
              { id: "xingming", name: "姓名解析", icon: User, color: "#8b5cf6" },
              { id: "shoujihao", name: "手机号分析", icon: Smartphone, color: "#ef4444" },
              { id: "luopan", name: "电子罗盘", icon: Compass, color: "#06b6d4" },
              { id: "xuankong", name: "玄空飞星", icon: Sparkles, color: "#f59e0b" },
              { id: "kongming", name: "孔明神卦", icon: Ghost, color: "#22c55e" },
              { id: "bazhai", name: "八宅排盘", icon: Map, color: "#dc2626" },
              { id: "taiyi", name: "太乙神数", icon: Circle, color: "#3b82f6" },
              { id: "zhuge", name: "诸葛神数", icon: GraduationCap, color: "#0891b2" },
              { id: "jinqian", name: "金钱课", icon: Coins, color: "#f59e0b" },
              { id: "zidian", name: "字典查询", icon: Search, color: "#16a34a" },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="flex flex-col items-center py-3 relative"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${tool.color}15` }}
                >
                  <tool.icon 
                    className="w-6 h-6"
                    style={{ color: tool.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-xs text-gray-700 text-center leading-tight">
                  {tool.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
