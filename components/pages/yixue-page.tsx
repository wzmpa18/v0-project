"use client"

import { useState } from "react"
import { ChevronRight, Compass, Star, Sparkles, BookOpen, Clock, TrendingUp, Zap, Grid3X3, Wind, Eye, MapPin, Hexagon, Dice1 } from "lucide-react"
import { SHICHEN_JINGLUO, getCurrentShichen } from "@/lib/meridian-data"

interface YixuePageProps {
  onNavigateToTool: (toolId: string) => void
}

// 易学工具分类
const YIXUE_CATEGORIES = [
  {
    id: "mingli",
    title: "命理推算",
    desc: "探索命运轨迹",
    color: "#d4af37",
    tools: [
      { id: "bazi", name: "八字排盘", icon: Grid3X3, desc: "四柱八字命理分析", hot: true },
      { id: "ziwei", name: "紫微斗数", icon: Star, desc: "帝王之学，精准推命", hot: true },
      { id: "qimen", name: "奇门遁甲", icon: Compass, desc: "帝王之术，趋吉避凶" },
    ]
  },
  {
    id: "zhanbu",
    title: "占卜预测",
    desc: "洞察未来先机",
    color: "#c8102e",
    tools: [
      { id: "liuyao", name: "六爻占卜", icon: Hexagon, desc: "纳甲筮法，断吉凶", hot: true },
      { id: "meihua", name: "梅花易数", icon: Sparkles, desc: "心易之学，随机起卦" },
      { id: "xiaoliuren", name: "小六壬", icon: Dice1, desc: "快速占断，简便灵验" },
      { id: "jinkoujue", name: "金口诀", icon: Zap, desc: "大六壬精华，速断神课" },
    ]
  },
  {
    id: "fengshui",
    title: "风水堪舆",
    desc: "调理环境气场",
    color: "#4a9d5c",
    tools: [
      { id: "bazhai", name: "八宅风水", icon: MapPin, desc: "东西四命，宅命相配" },
      { id: "xuankong", name: "玄空飞星", icon: Wind, desc: "九宫飞星，时空合一" },
      { id: "luopan", name: "罗盘测向", icon: Compass, desc: "专业罗盘，精准定向" },
    ]
  },
  {
    id: "other",
    title: "其他术数",
    desc: "更多预测方法",
    color: "#4a90d9",
    tools: [
      { id: "liuren", name: "大六壬", icon: Clock, desc: "三式之首，占验之王" },
      { id: "zhuge", name: "诸葛神数", icon: Eye, desc: "三百八十四签，指点迷津" },
      { id: "taiyi", name: "太乙神数", icon: Star, desc: "推演国运，预测大事" },
    ]
  },
]

// 经典典籍
const CLASSICS = [
  { id: "zhouyi", name: "周易", desc: "群经之首，大道之源", category: "易经" },
  { id: "huangdi", name: "黄帝内经", desc: "中医经典，养生之道", category: "医典" },
  { id: "dijing", name: "滴天髓", desc: "命理经典，八字要义", category: "命理" },
  { id: "qimenjichu", name: "奇门遁甲基础", desc: "帝王之术入门", category: "奇门" },
]

export function YixuePage({ onNavigateToTool }: YixuePageProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("mingli")
  const currentShichen = getCurrentShichen()
  const shichenInfo = SHICHEN_JINGLUO[currentShichen.index]

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

      {/* 工具分类 */}
      <div className="px-4 space-y-4">
        {YIXUE_CATEGORIES.map((category) => (
          <div key={category.id} className="bg-[#252525] rounded-2xl border border-[#3a3a3a] overflow-hidden">
            {/* 分类标题 */}
            <button
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Compass className="w-5 h-5" style={{ color: category.color }} />
                </div>
                <div className="text-left">
                  <div className="text-[#f5f5f7] font-medium">{category.title}</div>
                  <div className="text-[#888] text-xs">{category.desc}</div>
                </div>
              </div>
              <ChevronRight 
                className={`w-5 h-5 text-[#666] transition-transform ${
                  expandedCategory === category.id ? "rotate-90" : ""
                }`}
              />
            </button>

            {/* 工具列表 */}
            {expandedCategory === category.id && (
              <div className="px-4 pb-4 space-y-2">
                {category.tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <button
                      key={tool.id}
                      onClick={() => onNavigateToTool(tool.id)}
                      className="w-full flex items-center gap-3 p-3 bg-[#1e1e1e] rounded-xl border border-[#333] hover:border-[#d4af37]/30 transition-all"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-[#f5f5f7] text-sm">{tool.name}</span>
                          {tool.hot && (
                            <span className="px-1.5 py-0.5 bg-[#c8102e]/20 text-[#c8102e] text-[10px] rounded">HOT</span>
                          )}
                        </div>
                        <div className="text-[#888] text-xs">{tool.desc}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#555]" />
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 经典研读入口 */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[#f5f5f7] font-medium">经典研读</div>
          <button className="text-[#d4af37] text-xs flex items-center gap-1">
            查看全部 <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CLASSICS.map((classic) => (
            <button
              key={classic.id}
              onClick={() => onNavigateToTool("jingdian")}
              className="p-3 bg-[#252525] rounded-xl border border-[#3a3a3a] hover:border-[#d4af37]/30 transition-all text-left"
            >
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[#f5f5f7] text-sm">{classic.name}</span>
              </div>
              <div className="text-[#888] text-xs line-clamp-1">{classic.desc}</div>
              <div className="mt-2">
                <span className="px-2 py-0.5 bg-[#333] text-[#888] text-[10px] rounded">{classic.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 底部合规声明 */}
      <div className="px-4 pt-6 pb-2">
        <p className="text-[#555] text-[10px] text-center leading-relaxed">
          本APP命理内容为学术交流，不做决策依据。
        </p>
      </div>
    </div>
  )
}
