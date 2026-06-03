"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lunar, Solar } from "lunar-javascript"
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
} from "lucide-react"

interface HomePageProps {
  onNavigateToTool?: (toolId: string) => void
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
      lunar: `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
      yearGanZhi: `${eightChar.getYearGan()}${eightChar.getYearZhi()}`,
      monthGanZhi: `${eightChar.getMonthGan()}${eightChar.getMonthZhi()}`,
      dayGanZhi: `${eightChar.getDayGan()}${eightChar.getDayZhi()}`,
      dayOfMonth: solar.getDay(),
    })
  }, [])

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-12 pb-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <span className="text-lg">易</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-400">医易命理</h1>
              <p className="text-xs text-amber-200/70">国学智慧 · 传承千年</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-900/40 flex items-center justify-center border border-amber-700/50">
            <User className="w-5 h-5 text-amber-300" />
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
          <input
            type="text"
            placeholder="搜索命理、经方、养生知识..."
            className="w-full bg-[#2d2420] border border-amber-900/50 rounded-full py-3 pl-12 pr-4 text-sm text-amber-100 placeholder-amber-700 outline-none focus:border-amber-600 transition-colors"
          />
        </div>

        <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-xl p-3 flex items-center justify-between border border-amber-800/30">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-amber-100/90">[公告] 医易命理APP v1.0正式上线，欢迎体验！</span>
          </div>
          <ChevronRight className="w-5 h-5 text-amber-600" />
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => handleNavigation("/bazi")}
            className="bg-gradient-to-br from-amber-800/80 to-amber-900/60 rounded-2xl p-5 flex flex-col items-center gap-2 border border-amber-700/30 shadow-lg shadow-amber-900/20"
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/15 flex items-center justify-center border border-amber-500/30">
              <BookOpen className="w-7 h-7 text-amber-400" />
            </div>
            <span className="text-lg font-bold text-amber-300">易学</span>
            <span className="text-xs text-amber-200/70">命理排盘</span>
          </button>
          <button
            onClick={() => handleNavigation("/herbal")}
            className="bg-gradient-to-br from-emerald-800/80 to-emerald-900/60 rounded-2xl p-5 flex flex-col items-center gap-2 border border-emerald-700/30 shadow-lg shadow-emerald-900/20"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/30">
              <Leaf className="w-7 h-7 text-emerald-400" />
            </div>
            <span className="text-lg font-bold text-emerald-300">中医</span>
            <span className="text-xs text-emerald-200/70">经方本草</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-2xl p-4 mb-4 border border-amber-800/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-amber-200">今日黄历</span>
            </div>
            <div className="flex gap-2 text-xs text-amber-400/60">
              <span>地母经</span>
              <span>·</span>
              <span>日课</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-300">{todayInfo?.dayOfMonth}</div>
              <div className="text-xs text-amber-200/60">{todayInfo?.lunar}</div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-amber-100 mb-1">
                {todayInfo?.yearGanZhi}年 {todayInfo?.monthGanZhi}月 {todayInfo?.dayGanZhi}日
              </div>
              <div className="text-xs text-amber-400/60">
                冲煞: 冲虎(甲寅)煞南
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <div className="text-xs text-emerald-400 mb-1">宜</div>
              <div className="flex flex-wrap gap-1">
                {["祭祀", "祈福", "入学", "出行", "开光", "纳财"].map((item) => (
                  <span key={item} className="text-xs bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded-full border border-emerald-700/30">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-red-400 mb-1">忌</div>
              <div className="flex flex-wrap gap-1">
                {["动土", "安葬", "嫁娶", "开业"].map((item) => (
                  <span key={item} className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded-full border border-red-700/30">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 rounded-2xl p-4 mb-4 border border-emerald-800/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-500" />
              <span className="font-bold text-emerald-200">每日养生</span>
            </div>
            <span className="text-xs text-emerald-400/60">《黄帝内经》指导</span>
          </div>
          
          <div className="text-sm text-emerald-100/90 leading-relaxed">
            <p className="mb-2"><span className="text-emerald-400">[今日养生]</span> {todayInfo?.yearGanZhi}年四月，木火当令，宜疏肝理气、清心安神。</p>
            <p>建议：晨起打太极拳15分钟，饮菊花枸杞茶，避免熬夜耗伤心阴。饮食宜清淡，多食绿叶蔬菜，少食辛辣。《内经》云："春夏养阳"，适当户外活动，接纳天地阳气。</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/60 rounded-2xl p-4 border border-purple-800/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-purple-200">五运六气</span>
            </div>
            <span className="text-xs text-purple-400/60">2025乙巳年</span>
          </div>

          <div className="space-y-3">
            <div className="bg-purple-800/30 rounded-xl p-3 border border-purple-700/20">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-200">岁运 · 金</span>
              </div>
              <div className="text-xs text-amber-400/60">全年</div>
              <div className="text-xs text-amber-100/80">金运不及，燥气流行，肺金偏弱</div>
            </div>

            <div className="bg-purple-800/30 rounded-xl p-3 border border-purple-700/20">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-200">司天 · 木</span>
              </div>
              <div className="text-xs text-red-400/60">上半年</div>
              <div className="text-xs text-red-100/80">厥阴风木司天，风气偏盛，肝气易亢</div>
            </div>

            <div className="bg-purple-800/30 rounded-xl p-3 border border-purple-700/20">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-200">在泉 · 火</span>
              </div>
              <div className="text-xs text-red-400/60">下半年</div>
              <div className="text-xs text-red-100/80">少阳相火在泉，暑热流行，心火偏旺</div>
            </div>

            <div className="bg-purple-800/30 rounded-xl p-3 border border-purple-700/20">
              <div className="flex items-center gap-2 mb-1">
                <Mountain className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-200">主运 · 土</span>
              </div>
              <div className="text-xs text-amber-400/60">长夏</div>
              <div className="text-xs text-amber-100/80">太阴湿土主运，湿气较重，脾胃易困</div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-amber-400/50">
            本APP中医内容为理论学习，不构成医疗诊断；命理内容为学术交流，不做决策依据。
          </div>
        </div>
      </main>
    </div>
  )
}