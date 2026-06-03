"use client"

import { useRouter } from "next/navigation"
import {
  BookOpen,
  Sparkles,
  Wind,
  Hexagon,
  Star,
  Moon,
  Sun,
  Feather,
  Compass,
} from "lucide-react"

export default function YiXuePage() {
  const router = useRouter()

  const tools = [
    {
      id: "bazi",
      icon: BookOpen,
      title: "八字命理",
      subtitle: "排盘解析",
      color: "amber",
      description: "基于《渊海子平》《三命通会》《滴天髓》《子平真诠》",
    },
    {
      id: "ziwei",
      icon: Star,
      title: "紫微斗数",
      subtitle: "命运推演",
      color: "purple",
      description: "紫微斗数排盘与解读",
    },
    {
      id: "qimen",
      icon: Compass,
      title: "奇门遁甲",
      subtitle: "运筹决策",
      color: "blue",
      description: "奇门遁甲起局与应用",
    },
    {
      id: "liuyao",
      icon: Hexagon,
      title: "六爻纳甲",
      subtitle: "问事占卜",
      color: "green",
      description: "六爻卦象解析",
    },
    {
      id: "meihua",
      icon: Feather,
      title: "梅花易数",
      subtitle: "即时起卦",
      color: "pink",
      description: "梅花易数起卦方法",
    },
    {
      id: "wannianli",
      icon: Sun,
      title: "万年历",
      subtitle: "择吉择日",
      color: "orange",
      description: "黄历查询与择日",
    },
    {
      id: "fengshui",
      icon: Wind,
      title: "风水堪舆",
      subtitle: "环境调理",
      color: "cyan",
      description: "风水布局与化解",
    },
    {
      id: "bazi-name",
      icon: Moon,
      title: "姓名学",
      subtitle: "起名改名",
      color: "indigo",
      description: "姓名数理分析",
    },
  ]

  const colorClasses: Record<string, { bg: string; icon: string; border: string; shadow: string }> = {
    amber: {
      bg: "bg-gradient-to-br from-amber-800/80 to-amber-900/60",
      icon: "text-amber-400",
      border: "border-amber-700/30",
      shadow: "shadow-amber-900/20",
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-800/80 to-purple-900/60",
      icon: "text-purple-400",
      border: "border-purple-700/30",
      shadow: "shadow-purple-900/20",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-800/80 to-blue-900/60",
      icon: "text-blue-400",
      border: "border-blue-700/30",
      shadow: "shadow-blue-900/20",
    },
    green: {
      bg: "bg-gradient-to-br from-green-800/80 to-green-900/60",
      icon: "text-green-400",
      border: "border-green-700/30",
      shadow: "shadow-green-900/20",
    },
    pink: {
      bg: "bg-gradient-to-br from-pink-800/80 to-pink-900/60",
      icon: "text-pink-400",
      border: "border-pink-700/30",
      shadow: "shadow-pink-900/20",
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-800/80 to-orange-900/60",
      icon: "text-orange-400",
      border: "border-orange-700/30",
      shadow: "shadow-orange-900/20",
    },
    cyan: {
      bg: "bg-gradient-to-br from-cyan-800/80 to-cyan-900/60",
      icon: "text-cyan-400",
      border: "border-cyan-700/30",
      shadow: "shadow-cyan-900/20",
    },
    indigo: {
      bg: "bg-gradient-to-br from-indigo-800/80 to-indigo-900/60",
      icon: "text-indigo-400",
      border: "border-indigo-700/30",
      shadow: "shadow-indigo-900/20",
    },
  }

  const handleToolClick = (id: string) => {
    const routes: Record<string, string> = {
      bazi: "/bazi",
      ziwei: "/ziwei",
      qimen: "/qimen",
      liuyao: "/liuyao",
      meihua: "/meihua",
      wannianli: "/wannianli",
      fengshui: "/fengshui",
      "bazi-name": "/name-analysis",
    }
    router.push(routes[id] || "/bazi")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-400">易学工具</h1>
              <p className="text-xs text-amber-200/70">传承经典 · 智慧人生</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => {
            const colors = colorClasses[tool.color]
            const Icon = tool.icon
            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className={`${colors.bg} rounded-2xl p-4 border ${colors.border} shadow-lg ${colors.shadow} transition-all duration-200 hover:scale-105`}
              >
                <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-0.5">{tool.title}</h3>
                <p className="text-xs text-white/60 mb-2">{tool.subtitle}</p>
                <p className="text-xs text-white/40 line-clamp-2">{tool.description}</p>
              </button>
            )
          })}
        </div>

        <div className="mt-6 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-amber-200">易学经典</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["《渊海子平》", "《三命通会》", "《滴天髓》", "《子平真诠》", "《周易正义》", "《梅花易数》"].map((book) => (
              <div key={book} className="bg-amber-800/20 rounded-lg p-2 text-xs text-amber-100/80 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                {book}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}