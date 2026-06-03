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
  MessageCircle,
  Heart,
  ChevronRight,
} from "lucide-react"

interface HomePageProps {
  onNavigateToTool?: (toolId: string) => void
}

const YI_XUE_TOOLS = [
  { id: "bazi", name: "八字排盘", icon: Calendar, color: "#0891b2" },
  { id: "bazijiexi", name: "八字解析", icon: User, color: "#3b82f6", badge: true },
  { id: "qimen", name: "奇门遁甲", icon: Compass, color: "#8b5cf6" },
  { id: "yinpanqimen", name: "阴盘奇门", icon: Circle, color: "#ec4899" },
  { id: "liuyao", name: "六爻排盘", icon: Hexagon, color: "#f59e0b" },
  { id: "meihua", name: "梅花易数", icon: FlowerIcon, color: "#22c55e" },
  { id: "yangpanmingli", name: "阳盘命理", icon: Star, color: "#ef4444" },
  { id: "mingliqimen", name: "命理奇门", icon: BookOpen, color: "#06b6d4" },
  { id: "ziwei", name: "紫微斗数", icon: Star, color: "#8b5cf6" },
  { id: "daliuren", name: "大六壬", icon: Layers, color: "#0891b2" },
  { id: "xiaoliuren", name: "小六壬", icon: Gem, color: "#f59e0b" },
  { id: "jinkoujue", name: "金口诀", icon: BookOpen, color: "#22c55e" },
  { id: "qiming", name: "起名工具", icon: UserCheck, color: "#3b82f6" },
  { id: "xingming", name: "姓名解析", icon: User, color: "#8b5cf6" },
  { id: "shoujihao", name: "手机号分析", icon: Smartphone, color: "#ef4444" },
  { id: "hepan", name: "合盘工具", icon: Users, color: "#ec4899" },
  { id: "luopan", name: "电子罗盘", icon: Compass, color: "#06b6d4" },
  { id: "lijichi", name: "立极尺", icon: Ruler, color: "#f59e0b" },
  { id: "shanxiang", name: "山向地图", icon: MapPin, color: "#22c55e" },
  { id: "xuankong", name: "玄空飞星", icon: Sparkles, color: "#8b5cf6" },
  { id: "kongming", name: "孔明神卦", icon: Ghost, color: "#0891b2" },
  { id: "bazhai", name: "八宅排盘", icon: Map, color: "#ef4444" },
  { id: "feigong", name: "飞宫小奇门", icon: Sparkles, color: "#3b82f6" },
  { id: "taiyi", name: "太乙神数", icon: Circle, color: "#ec4899" },
  { id: "zhuge", name: "诸葛神数", icon: GraduationCap, color: "#22c55e" },
  { id: "wannianli", name: "万年历", icon: Calendar, color: "#06b6d4" },
  { id: "jinqian", name: "金钱课", icon: Coins, color: "#f59e0b" },
  { id: "xiaocheng", name: "小成图", icon: Hexagon, color: "#8b5cf6" },
  { id: "qimenchuan", name: "奇门穿壬", icon: Compass, color: "#0891b2" },
  { id: "shanxiangqimen", name: "山向奇门", icon: MapPin, color: "#22c55e" },
  { id: "zidian", name: "字典查询", icon: Search, color: "#3b82f6" },
  { id: "hanzi", name: "汉字筛选", icon: Coins, color: "#ec4899" },
  { id: "jieqi", name: "节气查询", icon: Calendar, color: "#ef4444" },
  { id: "hehuoren", name: "合伙人", icon: Users, color: "#06b6d4" },
  { id: "xiaochengxu", name: "小程序开发", icon: Smartphone, color: "#8b5cf6" },
  { id: "zaixian", name: "在线客服", icon: Headphones, color: "#0891b2" },
]

// 中医板块工具
const ZHONGYI_TOOLS = [
  { id: "zhongyi", name: "中医诊疗", icon: Heart, color: "#dc2626" },
  { id: "jingfang", name: "经方本草", icon: BookOpen, color: "#16a34a" },
  { id: "jingluo", name: "经络穴位", icon: MapPin, color: "#0ea5e9" },
  { id: "tizhi", name: "体质辨识", icon: User, color: "#f59e0b" },
  { id: "tcm-study", name: "学习中心", icon: GraduationCap, color: "#8b5cf6", isNew: true },
]

// 经方传承库单独入口
const JINGFANG_LIBRARY = { id: "jflib", name: "经方传承库", icon: BookOpen, color: "#8b5cf6", isNew: true }

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
      "bazijiexi": "/bazi-jiexi",
      "qimen": "/qimen",
      "yinpanqimen": "/yinpan-qimen",
      "liuyao": "/liuyao",
      "meihua": "/meihua",
      "yangpanmingli": "/yangpan-mingli",
      "mingliqimen": "/mingli-qimen",
      "ziwei": "/ziwei",
      "daliuren": "/daliuren",
      "xiaoliuren": "/xiaoliuren",
      "jinkoujue": "/jinkoujue",
      "qiming": "/qiming",
      "xingming": "/xingming",
      "shoujihao": "/shoujihao",
      "hepan": "/hepan",
      "luopan": "/luopan",
      "lijichi": "/lijichi",
      "shanxiang": "/shanxiang",
      "xuankong": "/xuankong",
      "kongming": "/kongming",
      "bazhai": "/bazhai",
      "feigong": "/feigong",
      "taiyi": "/taiyi",
      "zhuge": "/zhuge",
      "wannianli": "/wannianli",
      "jinqian": "/jinqian",
      "xiaocheng": "/xiaocheng",
      "qimenchuan": "/qimenchuan",
      "shanxiangqimen": "/shanxiangqimen",
      "zidian": "/zidian",
      "hanzi": "/hanzi",
      "jieqi": "/jieqi",
      "hehuoren": "/hehuoren",
      "xiaochengxu": "/xiaochengxu",
      "zaixian": "/zaixian",
      "tcm-study": "/tcm-study",
      "jflib": "/tcm-classics",
    }
    const route = routeMap[toolId]
    if (route) {
      router.push(route)
    } else if (toolId === "zhongyi" || toolId === "jingfang" || toolId === "jingluo" || toolId === "tizhi") {
      if (onNavigateToTool) {
        onNavigateToTool(toolId)
      } else {
        router.push("/herbal")
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white overflow-y-auto">
      <div className="bg-white pt-12 pb-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">易学排盘</h1>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-[#0891b2]">今天</div>
              <div className="text-5xl font-bold text-gray-800 my-1">
                {todayInfo ? new Date().getDate() : '1'}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {todayInfo?.solar}
              </div>
              <div className="text-gray-600 mb-1">
                {todayInfo?.lunar}
              </div>
              <div className="text-gray-500 text-sm mb-2">
                {todayInfo?.week}
              </div>
              
              <div className="flex gap-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-red-500">{todayInfo?.yearGanZhi}</div>
                  <div className="text-xs text-gray-400">年</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-500">{todayInfo?.monthGanZhi}</div>
                  <div className="text-xs text-gray-400">月</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-600">{todayInfo?.dayGanZhi}</div>
                  <div className="text-xs text-gray-400">日</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mb-4">
        <button
          onClick={() => handleToolClick(JINGFANG_LIBRARY.id)}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-4 text-white shadow-lg hover:from-purple-600 hover:to-blue-700 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <JINGFANG_LIBRARY.icon className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{JINGFANG_LIBRARY.name}</h3>
                {JINGFANG_LIBRARY.isNew && (
                  <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-white/80 text-sm">
                倪海厦经方家 · 伤寒论 · 金匮要略 · 中医经典
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-white/80" />
          </div>
        </button>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-4 border border-red-100">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-red-500" />
            <h2 className="text-gray-800 font-bold">中医养生</h2>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {ZHONGYI_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="flex flex-col items-center py-2 relative"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
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
                {tool.isNew && (
                  <div className="absolute top-0 right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-sm">
                    NEW
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-24">
        <div className="flex items-center gap-2 mb-3">
          <Compass className="w-5 h-5 text-blue-500" />
          <h2 className="text-gray-800 font-bold">易学工具</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {YI_XUE_TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className="flex flex-col items-center py-3 relative"
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: `${tool.color}15` }}
              >
                <tool.icon 
                  className="w-7 h-7"
                  style={{ color: tool.color }}
                  strokeWidth={1.5}
                />
              </div>
              
              <span className="text-sm text-gray-700 text-center leading-tight">
                {tool.name}
              </span>
              
              {tool.badge && (
                <div className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center pb-8">
          <div className="flex justify-center gap-2 mb-2">
            <div className="text-2xl">🤖</div>
          </div>
          <div className="text-gray-400 text-sm">点击分享APP</div>
        </div>
      </div>
    </div>
  )
}
