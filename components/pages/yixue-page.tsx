"use client"

import { useState } from "react"
import { 
  ChevronRight, ChevronLeft, Compass, Star, Sparkles, BookOpen, Clock, 
  Zap, Grid3X3, Wind, Eye, MapPin, Hexagon, Dice1, Mountain, Sun, Moon,
  Calculator, Phone, Users, Map, Calendar, Search, Type, Share2, Headphones,
  Code, UserPlus, Layers, Target, Flame, Droplet, TreePine
} from "lucide-react"
import { SHICHEN_JINGLUO, getCurrentShichen } from "@/lib/meridian-data"

interface YixuePageProps {
  onNavigateToTool: (toolId: string) => void
}

// Tab定义
type TabType = "paipan" | "study"

// 37项排盘工具
const PAIPAN_TOOLS = {
  paipan: {
    title: "排盘类",
    count: 22,
    tools: [
      { id: "bazi", name: "八字排盘", icon: Grid3X3, desc: "四柱八字命理分析", hot: true, color: "#d4af37" },
      { id: "bazi-jiexi", name: "八字解析", icon: Eye, desc: "八字详细解读分析", color: "#d4af37" },
      { id: "qimen", name: "奇门遁甲", icon: Compass, desc: "帝王之术，趋吉避凶", hot: true, color: "#c8102e" },
      { id: "qimen-yin", name: "阴盘奇门", icon: Moon, desc: "阴盘奇门遁甲", color: "#c8102e" },
      { id: "liuyao", name: "六爻排盘", icon: Hexagon, desc: "纳甲筮法，断吉凶", hot: true, color: "#4a90d9" },
      { id: "meihua", name: "梅花易数", icon: Sparkles, desc: "心易之学，随机起卦", color: "#4a90d9" },
      { id: "yangpan", name: "阳盘命理", icon: Sun, desc: "阳盘命理排盘", color: "#d4af37" },
      { id: "mingli-qimen", name: "命理奇门", icon: Target, desc: "命理与奇门结合", color: "#c8102e" },
      { id: "ziwei", name: "紫微斗数", icon: Star, desc: "帝王之学，精准推命", hot: true, color: "#9333ea" },
      { id: "liuren", name: "大六壬", icon: Clock, desc: "三式之首，占验之王", hot: true, color: "#059669" },
      { id: "xiaoliuren", name: "小六壬", icon: Dice1, desc: "快速占断，简便灵验", color: "#059669" },
      { id: "jinkoujue", name: "金口诀", icon: Zap, desc: "大六壬精华，速断神课", color: "#059669" },
      { id: "taiyi", name: "太乙神数", icon: Star, desc: "推演国运，预测大事", color: "#9333ea" },
      { id: "xuankong", name: "玄空飞星", icon: Wind, desc: "九宫飞星，时空合一", color: "#4a9d5c" },
      { id: "bazhai", name: "八宅排盘", icon: MapPin, desc: "东西四命，宅命相配", color: "#4a9d5c" },
      { id: "feigong-qimen", name: "飞宫小奇门", icon: Layers, desc: "飞宫奇门排盘", color: "#c8102e" },
      { id: "qimen-chuanren", name: "奇门穿壬", icon: Target, desc: "奇门与六壬结合", color: "#c8102e" },
      { id: "shanxiang-qimen", name: "山向奇门", icon: Mountain, desc: "山向奇门排盘", color: "#c8102e" },
      { id: "xiaochengtu", name: "小成图", icon: Grid3X3, desc: "小成图占卜", color: "#4a90d9" },
      { id: "zhuge", name: "孔明神卦", icon: Eye, desc: "诸葛亮神卦", color: "#4a90d9" },
      { id: "zhugeshenshu", name: "诸葛神数", icon: BookOpen, desc: "三百八十四签", color: "#4a90d9" },
      { id: "jinqianke", name: "金钱课", icon: Dice1, desc: "铜钱占卜", color: "#4a90d9" },
    ]
  },
  tools: {
    title: "工具类",
    count: 11,
    tools: [
      { id: "qiming", name: "起名工具", icon: Type, desc: "五行姓名分析", color: "#d4af37" },
      { id: "xingming", name: "姓名解析", icon: Search, desc: "姓名五格解析", color: "#d4af37" },
      { id: "shouji", name: "手机号分析", icon: Phone, desc: "手机号码吉凶", color: "#4a90d9" },
      { id: "hepan", name: "合盘工具", icon: Users, desc: "八字合婚合盘", color: "#c8102e" },
      { id: "luopan", name: "电子罗盘", icon: Compass, desc: "专业罗盘定向", hot: true, color: "#4a9d5c" },
      { id: "liji", name: "立极尺", icon: Target, desc: "风水立极工具", color: "#4a9d5c" },
      { id: "shanxiang", name: "山向地图", icon: Map, desc: "风水山向定位", color: "#4a9d5c" },
      { id: "wannianli", name: "万年历", icon: Calendar, desc: "农历公历转换", color: "#059669" },
      { id: "jieqi", name: "节气查询", icon: Sun, desc: "二十四节气", color: "#059669" },
      { id: "zidian", name: "字典查询", icon: BookOpen, desc: "汉字五行查询", color: "#4a90d9" },
      { id: "hanzi", name: "汉字筛选", icon: Type, desc: "起名用字筛选", color: "#4a90d9" },
    ]
  },
  other: {
    title: "其他服务",
    count: 4,
    tools: [
      { id: "hehuo", name: "合伙人", icon: UserPlus, desc: "成为合伙人", color: "#d4af37" },
      { id: "xiaochengxu", name: "小程序开发", icon: Code, desc: "定制小程序", color: "#4a90d9" },
      { id: "kefu", name: "在线客服", icon: Headphones, desc: "咨询客服", color: "#059669" },
      { id: "share", name: "分享APP", icon: Share2, desc: "分享给好友", color: "#c8102e" },
    ]
  }
}

// 易学学习分类
const STUDY_CATEGORIES = [
  {
    id: "shensha",
    title: "神煞歌诀",
    desc: "100+种神煞详解",
    icon: Star,
    color: "#d4af37",
    count: "100+"
  },
  {
    id: "changsheng",
    title: "十二长生",
    desc: "长生十二宫详解",
    icon: Flame,
    color: "#c8102e",
    count: "12"
  },
  {
    id: "shishen",
    title: "十神详解",
    desc: "十神定义与心性",
    icon: Users,
    color: "#4a90d9",
    count: "10"
  },
  {
    id: "canggan",
    title: "藏干与暗干",
    desc: "地支藏干详解",
    icon: Eye,
    color: "#9333ea",
    count: "12"
  },
  {
    id: "paipan-method",
    title: "排盘方法",
    desc: "各术数排盘步骤",
    icon: BookOpen,
    color: "#059669",
    count: "8"
  },
  {
    id: "guji",
    title: "古籍经典",
    desc: "易学古籍研读",
    icon: BookOpen,
    color: "#d4af37",
    count: "20+"
  },
]

// 显示模式类型
type DisplayMode = "simple" | "normal" | "detailed"

export function YixuePage({ onNavigateToTool }: YixuePageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("paipan")
  const [expandedCategory, setExpandedCategory] = useState<string>("paipan")
  const currentShichen = getCurrentShichen()
  const shichenInfo = SHICHEN_JINGLUO[currentShichen.index] || {
    meridian: "未知",
    organ: "未知",
    element: "未知",
    direction: "未知"
  }

  const handleToolClick = (toolId: string) => {
    onNavigateToTool(toolId)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-4">
      {/* 顶部时辰信息 */}
      <div className="px-4 pt-4 pb-3">
        <div className="bg-gradient-to-r from-[#252525] to-[#1e1e1e] rounded-2xl border border-[#3a3a3a] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#d4af37]" />
              </div>
              <div>
                <div className="text-[#f5f5f7] font-medium">
                  {currentShichen.name}时 · {shichenInfo.meridian}当令
                </div>
                <div className="text-[#888] text-xs mt-0.5">
                  {currentShichen.timeRange} · {shichenInfo.organ}养护时段
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#d4af37] text-sm">{shichenInfo.element}</div>
              <div className="text-[#666] text-xs">{shichenInfo.direction}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab切换 */}
      <div className="px-4 mb-4">
        <div className="flex bg-[#252525] rounded-xl p-1 border border-[#3a3a3a]">
          <button
            onClick={() => setActiveTab("paipan")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "paipan"
                ? "bg-[#d4af37] text-[#1a1a1a]"
                : "text-[#888] hover:text-[#f5f5f7]"
            }`}
          >
            排盘工具
          </button>
          <button
            onClick={() => setActiveTab("study")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "study"
                ? "bg-[#d4af37] text-[#1a1a1a]"
                : "text-[#888] hover:text-[#f5f5f7]"
            }`}
          >
            易学学习
          </button>
        </div>
      </div>

      {/* Tab1: 排盘工具 */}
      {activeTab === "paipan" && (
        <div className="px-4 space-y-4">
          {Object.entries(PAIPAN_TOOLS).map(([key, category]) => (
            <div key={key} className="bg-[#252525] rounded-2xl border border-[#3a3a3a] overflow-hidden">
              {/* 分类标题 */}
              <button
                onClick={() => setExpandedCategory(expandedCategory === key ? "" : key)}
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                    <Grid3X3 className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[#f5f5f7] font-medium">{category.title}</div>
                    <div className="text-[#888] text-xs">{category.count}项功能</div>
                  </div>
                </div>
                <ChevronRight 
                  className={`w-5 h-5 text-[#666] transition-transform ${
                    expandedCategory === key ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* 工具网格 */}
              {expandedCategory === key && (
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-4 gap-2">
                    {category.tools.map((tool) => {
                      const Icon = tool.icon
                      return (
                        <button
                          key={tool.id}
                          onClick={() => handleToolClick(tool.id)}
                          className="flex flex-col items-center gap-1.5 p-3 bg-[#1e1e1e] rounded-xl border border-[#333] hover:border-[#d4af37]/30 transition-all active:scale-95 relative"
                        >
                          {tool.hot && (
                            <span className="absolute -top-1 -right-1 px-1 py-0.5 bg-[#c8102e] text-white text-[8px] rounded">HOT</span>
                          )}
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${tool.color}15` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: tool.color }} />
                          </div>
                          <span className="text-[#c5c5c5] text-[10px] text-center leading-tight">{tool.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab2: 易学学习 */}
      {activeTab === "study" && (
        <div className="px-4 space-y-3">
          {STUDY_CATEGORIES.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => handleToolClick(`study-${category.id}`)}
                className="w-full flex items-center gap-4 p-4 bg-[#252525] rounded-2xl border border-[#3a3a3a] hover:border-[#d4af37]/30 transition-all"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[#f5f5f7] font-medium">{category.title}</div>
                  <div className="text-[#888] text-xs mt-0.5">{category.desc}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-[#333] text-[#888] text-xs rounded">{category.count}</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </div>
              </button>
            )
          })}

          {/* 古籍经典快捷入口 */}
          <div className="mt-4">
            <div className="text-[#888] text-xs mb-3 px-1">热门古籍</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "yuanhai", name: "渊海子平", category: "命理", color: "#d4af37" },
                { id: "sanming", name: "三命通会", category: "命理", color: "#d4af37" },
                { id: "ditianshui", name: "滴天髓", category: "命理", color: "#c8102e" },
                { id: "zipingzhengquan", name: "子平真诠", category: "命理", color: "#c8102e" },
                { id: "qimendunjia", name: "奇门遁甲全书", category: "奇门", color: "#4a90d9" },
                { id: "meihuayishu", name: "梅花易数", category: "占卜", color: "#4a90d9" },
                { id: "liurendaquan", name: "大六壬大全", category: "六壬", color: "#059669" },
                { id: "liurenzhinan", name: "大六壬指南", category: "六壬", color: "#059669" },
              ].map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleToolClick(`book-${book.id}`)}
                  className="flex items-center gap-3 p-3 bg-[#252525] rounded-xl border border-[#3a3a3a] hover:border-[#d4af37]/30 transition-all text-left"
                >
                  <BookOpen className="w-5 h-5" style={{ color: book.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[#f5f5f7] text-sm truncate">{book.name}</div>
                    <div className="text-[#666] text-[10px]">{book.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 底部合规声明 */}
      <div className="px-4 pt-6 pb-2">
        <p className="text-[#888] text-[10px] text-center leading-relaxed">
          本APP命理内容为学术交流，不做决策依据。
        </p>
      </div>
    </div>
  )
}
