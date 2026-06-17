"use client"

import { navigateTo } from "@/lib/navigation"
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
  Eye,
  Hand,
  PenTool,
  Cloud,
  Calendar,
  Scroll,
  Map,
  Zap,
  Clock,
  Shield,
  Target,
  Heart,
  Brain,
  Waves,
  Mountain,
  TreePine,
  SunDim,
  Orbit,
  Atom,
  Globe,
  Leaf,
  Flame,
  Droplets,
  Crown,
  Swords,
  Gift,
  ChevronLeft,
} from "lucide-react"

interface YiXuePageProps {
  onBack?: () => void
}

export default function YiXuePage({ onBack }: YiXuePageProps = {}) {

  const tools = [
    { id: "bazi", icon: BookOpen, title: "八字命理", subtitle: "排盘解析", color: "amber", description: "基于《渊海子平》《三命通会》《滴天髓》《子平真诠》" },
    { id: "ziwei", icon: Star, title: "紫微斗数", subtitle: "命运推演", color: "purple", description: "紫微斗数排盘与解读" },
    { id: "qimen", icon: Compass, title: "奇门遁甲", subtitle: "运筹决策", color: "blue", description: "奇门遁甲起局与应用" },
    { id: "liuyao", icon: Hexagon, title: "六爻纳甲", subtitle: "问事占卜", color: "green", description: "六爻卦象解析" },
    { id: "meihua", icon: Feather, title: "梅花易数", subtitle: "即时起卦", color: "pink", description: "梅花易数起卦方法" },
    { id: "wannianli", icon: Calendar, title: "万年历", subtitle: "择吉择日", color: "orange", description: "黄历查询与择日" },
    { id: "fengshui", icon: Wind, title: "风水堪舆", subtitle: "环境调理", color: "cyan", description: "风水布局与化解" },
    { id: "xingming", icon: Moon, title: "姓名学", subtitle: "起名改名", color: "indigo", description: "姓名数理分析" },
    { id: "liuren", icon: Swords, title: "六壬神课", subtitle: "高级预测", color: "red", description: "六壬金口诀" },
    { id: "taiyi", icon: Sun, title: "太乙神数", subtitle: "帝王之学", color: "yellow", description: "太乙神数推演" },
    { id: "xiangmian", icon: Eye, title: "面相学", subtitle: "观相识人", color: "rose", description: "面部特征分析" },
    { id: "xiangshou", icon: Hand, title: "手相学", subtitle: "掌纹解读", color: "lime", description: "手掌纹路分析" },
    { id: "cezi", icon: PenTool, title: "测字", subtitle: "字中玄机", color: "teal", description: "汉字占卜预测" },
    { id: "jiemeng", icon: Cloud, title: "解梦", subtitle: "梦境解析", color: "sky", description: "周公解梦大全" },
    { id: "zeri", icon: SunDim, title: "择日", subtitle: "吉日查询", color: "amber", description: "黄道吉日选择" },
    { id: "fuzhou", icon: Scroll, title: "符咒", subtitle: "灵符秘法", color: "purple", description: "道家符咒文化" },
    { id: "luopan", icon: Map, title: "罗盘", subtitle: "方位测量", color: "blue", description: "风水罗盘使用" },
    { id: "yinpan", icon: Moon, title: "阴盘奇门", subtitle: "道家奇门", color: "green", description: "阴盘奇门遁甲" },
    { id: "yangpan", icon: Sun, title: "阳盘奇门", subtitle: "正统奇门", color: "orange", description: "阳盘奇门遁甲" },
    { id: "jinkoujue", icon: Zap, title: "金口诀", subtitle: "孙膑兵法", color: "cyan", description: "六壬金口诀" },
    { id: "xiaoliuren", icon: Clock, title: "小六壬", subtitle: "快速预测", color: "indigo", description: "马前课小六壬" },
    { id: "zhuge", icon: Shield, title: "诸葛神数", subtitle: "武侯灵感", color: "red", description: "诸葛亮神签" },
    { id: "tieban", icon: Target, title: "铁板神数", subtitle: "宿命通", color: "rose", description: "铁板神数推算" },
    { id: "shaozi", icon: Brain, title: "邵子神数", subtitle: "邵雍真传", color: "lime", description: "邵康节神数" },
    { id: "heluo", icon: Waves, title: "河洛理数", subtitle: "天地数理", color: "teal", description: "河图洛书" },
    { id: "huangji", icon: Mountain, title: "皇极经世", subtitle: "宇宙规律", color: "sky", description: "皇极经世" },
    { id: "qizheng", icon: Atom, title: "七政四余", subtitle: "天文历法", color: "purple", description: "七政四余推命" },
    { id: "zhanxing", icon: Globe, title: "占星术", subtitle: "西方占星", color: "blue", description: "星座运势分析" },
    { id: "sanyuan", icon: TreePine, title: "三元风水", subtitle: "时空风水", color: "green", description: "三元九运" },
    { id: "xuankong", icon: Sparkles, title: "玄空风水", subtitle: "理气风水", color: "orange", description: "玄空飞星" },
    { id: "bazhai", icon: Hexagon, title: "八宅风水", subtitle: "方位吉凶", color: "cyan", description: "八宅明镜" },
    { id: "yanggong", icon: Crown, title: "杨公风水", subtitle: "形势派", color: "indigo", description: "杨筠松风水" },
    { id: "qimenzeji", icon: Gift, title: "奇门择吉", subtitle: "最佳时机", color: "red", description: "奇门遁甲择日" },
    { id: "wuyunliuqi", icon: Flame, title: "五运六气", subtitle: "运气推算", color: "rose", description: "五运六气详解" },
    { id: "ziwuliu", icon: Droplets, title: "子午流注", subtitle: "针灸时辰", color: "lime", description: "子午流注针法" },
  ]

  const colorClasses: Record<string, { bg: string; icon: string; border: string; shadow: string }> = {
    amber: { bg: "bg-gradient-to-br from-amber-800/80 to-amber-900/60", icon: "text-amber-400", border: "border-amber-700/30", shadow: "shadow-amber-900/20" },
    purple: { bg: "bg-gradient-to-br from-purple-800/80 to-purple-900/60", icon: "text-purple-400", border: "border-purple-700/30", shadow: "shadow-purple-900/20" },
    blue: { bg: "bg-gradient-to-br from-blue-800/80 to-blue-900/60", icon: "text-blue-400", border: "border-blue-700/30", shadow: "shadow-blue-900/20" },
    green: { bg: "bg-gradient-to-br from-green-800/80 to-green-900/60", icon: "text-green-400", border: "border-green-700/30", shadow: "shadow-green-900/20" },
    pink: { bg: "bg-gradient-to-br from-pink-800/80 to-pink-900/60", icon: "text-pink-400", border: "border-pink-700/30", shadow: "shadow-pink-900/20" },
    orange: { bg: "bg-gradient-to-br from-orange-800/80 to-orange-900/60", icon: "text-orange-400", border: "border-orange-700/30", shadow: "shadow-orange-900/20" },
    cyan: { bg: "bg-gradient-to-br from-cyan-800/80 to-cyan-900/60", icon: "text-cyan-400", border: "border-cyan-700/30", shadow: "shadow-cyan-900/20" },
    indigo: { bg: "bg-gradient-to-br from-indigo-800/80 to-indigo-900/60", icon: "text-indigo-400", border: "border-indigo-700/30", shadow: "shadow-indigo-900/20" },
    red: { bg: "bg-gradient-to-br from-red-800/80 to-red-900/60", icon: "text-red-400", border: "border-red-700/30", shadow: "shadow-red-900/20" },
    yellow: { bg: "bg-gradient-to-br from-yellow-800/80 to-yellow-900/60", icon: "text-yellow-400", border: "border-yellow-700/30", shadow: "shadow-yellow-900/20" },
    rose: { bg: "bg-gradient-to-br from-rose-800/80 to-rose-900/60", icon: "text-rose-400", border: "border-rose-700/30", shadow: "shadow-rose-900/20" },
    lime: { bg: "bg-gradient-to-br from-lime-800/80 to-lime-900/60", icon: "text-lime-400", border: "border-lime-700/30", shadow: "shadow-lime-900/20" },
    teal: { bg: "bg-gradient-to-br from-teal-800/80 to-teal-900/60", icon: "text-teal-400", border: "border-teal-700/30", shadow: "shadow-teal-900/20" },
    sky: { bg: "bg-gradient-to-br from-sky-800/80 to-sky-900/60", icon: "text-sky-400", border: "border-sky-700/30", shadow: "shadow-sky-900/20" },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigateTo("/")} className="w-10 h-10 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-900/60 transition-colors">
            <ChevronLeft className="w-5 h-5 text-amber-300" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-400">易学工具</h1>
              <p className="text-xs text-amber-200/60">36项传统术数 · 传承千年智慧</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="grid grid-cols-4 gap-1.5">
          {tools.map((tool) => {
            const colors = colorClasses[tool.color] || colorClasses.amber
            const Icon = tool.icon
            const routeMap: Record<string, string> = {
              "bazi": "/bazi",
              "ziwei": "/ziwei",
              "qimen": "/qimen",
              "liuyao": "/liuyao",
              "meihua": "/meihua",
              "wannianli": "/wannianli",
              "fengshui": "/fengshui",
              "xingming": "/xingming",
              "liuren": "/daliuren",
              "taiyi": "/taiyi",
              "xiangmian": "/xiangmian",
              "xiangshou": "/xiangshou",
              "cezi": "/cezi",
              "jiemeng": "/jiemeng",
              "zeri": "/zeri",
              "fuzhou": "/fuzhou",
              "luopan": "/luopan",
              "yinpan": "/yinpan-qimen",
              "yangpan": "/yangpan-mingli",
              "jinkoujue": "/jinkoujue",
              "xiaoliuren": "/xiaoliuren",
              "zhuge": "/zhuge",
              "tieban": "/tieban",
              "shaozi": "/shaozi",
              "heluo": "/heluo",
              "huangji": "/huangji",
              "qizheng": "/qizheng",
              "zhanxing": "/zhanxing",
              "sanyuan": "/sanyuan",
              "xuankong": "/xuankong",
              "bazhai": "/bazhai",
              "yanggong": "/yanggong",
              "qimenzeji": "/qimenzeji",
              "wuyunliuqi": "/wuyunliuqi",
              "ziwuliu": "/ziwuliu",
            }
            const href = routeMap[tool.id] || "/yi-xue"
            return (
              <button
                key={tool.id}
                onClick={() => navigateTo(href)}
                className={`${colors.bg} rounded-lg p-2 border ${colors.border} transition-all duration-200 active:scale-95 w-full`}
              >
                <div className={`w-8 h-8 rounded-md bg-white/10 flex items-center justify-center mb-1.5 mx-auto`}>
                  <Icon className={`w-4 h-4 ${colors.icon}`} />
                </div>
                <h3 className="text-xs font-bold text-white text-center">{tool.title}</h3>
              </button>
            )
          })}
        </div>

        <div className="mt-3 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-2.5 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-amber-200">易学经典</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {["《渊海子平》", "《三命通会》", "《滴天髓》", "《子平真诠》", "《周易正义》", "《梅花易数》", "《奇门遁甲》", "《六壬大全》", "《太乙神数》"].map((book) => (
              <div key={book} className="bg-amber-800/20 rounded-md p-1.5 text-xs text-amber-100/80 text-center">
                {book}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-2.5 border border-purple-800/30">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-bold text-purple-200">热门工具</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { name: "八字排盘", desc: "命理解析" },
              { name: "紫微斗数", desc: "命运推演" },
              { name: "奇门遁甲", desc: "运筹决策" },
              { name: "六爻占卜", desc: "问事预测" },
              { name: "梅花易数", desc: "即时起卦" },
              { name: "万年历", desc: "择吉择日" },
            ].map((item) => (
              <div key={item.name} className="bg-purple-800/20 rounded-md p-2">
                <div className="text-xs font-medium text-purple-300">{item.name}</div>
                <div className="text-xs text-purple-200/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
