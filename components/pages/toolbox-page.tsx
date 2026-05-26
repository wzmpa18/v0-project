// 热卜同款工具箱组件
"use client"

import { useState } from "react"
import { 
  Compass, BookOpen, Star, Moon, Sun, MapPin, Calendar, 
  User, Hexagon, CircleDot, Grid3X3, Mountain, Home,
  Ruler, RotateCcw, Smartphone, ChevronRight
} from "lucide-react"

interface ToolboxPageProps {
  onNavigate: (tool: string) => void
}

const TOOL_CATEGORIES = [
  {
    id: "mingli",
    name: "命理工具",
    icon: Star,
    tools: [
      { id: "bazi", name: "四柱工具", icon: "☰", desc: "八字排盘与详批" },
      { id: "ziwei", name: "紫微斗数", icon: "⭐", desc: "紫微命盘排盘" },
      { id: "jiuzi", name: "九紫详批", icon: "🔮", desc: "九星流年详批" },
      { id: "jiemeng", name: "周公解梦", icon: "🌙", desc: "古法解梦大全" },
    ]
  },
  {
    id: "qimen",
    name: "奇门工具",
    icon: Grid3X3,
    tools: [
      { id: "qimen-yin", name: "奇门阴盘", icon: "☯", desc: "阴遁奇门排盘" },
      { id: "qimen-yang", name: "奇门阳盘", icon: "☰", desc: "阳遁奇门排盘" },
      { id: "qimen-sanshi", name: "奇门三式", icon: "⚊", desc: "太乙六壬奇门" },
      { id: "qimen-shuzi", name: "数字奇门", icon: "🔢", desc: "数字起奇门局" },
    ]
  },
  {
    id: "qiming",
    name: "起名工具",
    icon: User,
    tools: [
      { id: "sancai", name: "三才六格", icon: "📝", desc: "三才五格分析" },
      { id: "wuge", name: "五格姓名", icon: "✍", desc: "五格数理详解" },
      { id: "kangxi", name: "康熙字典", icon: "📖", desc: "康熙笔画查询" },
      { id: "hanzi", name: "汉字筛选", icon: "字", desc: "取名用字筛选" },
    ]
  },
  {
    id: "zhanbu",
    name: "占筮工具",
    icon: Hexagon,
    tools: [
      { id: "liuyao", name: "六爻工具", icon: "⚊", desc: "六爻纳甲起卦" },
      { id: "liuren", name: "大六壬", icon: "壬", desc: "大六壬排盘" },
      { id: "xiaoliuren", name: "小六壬", icon: "⚌", desc: "小六壬速断" },
      { id: "jinkoujue", name: "金口诀", icon: "诀", desc: "六壬金口诀" },
      { id: "meihua", name: "梅花易数", icon: "🌸", desc: "梅花易数起卦" },
      { id: "zhuge", name: "诸葛神数", icon: "卦", desc: "三百八十四签" },
    ]
  },
  {
    id: "kanyu",
    name: "堪舆工具",
    icon: Compass,
    tools: [
      { id: "luopan", name: "电子罗盘", icon: "🧭", desc: "二十四山罗盘" },
      { id: "bazhai", name: "八宅排盘", icon: "☯", desc: "八宅风水排盘" },
      { id: "xuankong", name: "玄空飞星", icon: "⭐", desc: "九宫飞星排盘" },
      { id: "lubanchi", name: "鲁班尺", icon: "📏", desc: "门光尺吉凶" },
    ]
  },
  {
    id: "zeri",
    name: "择日工具",
    icon: Calendar,
    tools: [
      { id: "huangli", name: "黄历查询", icon: "📅", desc: "每日宜忌查询" },
      { id: "jixiong", name: "吉凶查询", icon: "✓", desc: "日期吉凶分析" },
      { id: "zeri", name: "择日助手", icon: "📆", desc: "嫁娶开业择日" },
      { id: "shunxing", name: "顺星助手", icon: "⭐", desc: "流年顺星化解" },
    ]
  },
]

export function ToolboxPage({ onNavigate }: ToolboxPageProps) {
  const [activeCategory, setActiveCategory] = useState("mingli")
  
  const currentCategory = TOOL_CATEGORIES.find(c => c.id === activeCategory)
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* 左侧分类菜单 */}
      <div className="w-20 bg-[#151515] border-r border-[#333] flex flex-col py-4">
        {TOOL_CATEGORIES.map((category) => {
          const Icon = category.icon
          const isActive = activeCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col items-center py-3 px-2 relative transition-all ${
                isActive 
                  ? "text-[#d4af37]" 
                  : "text-[#999] hover:text-[#ccc]"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#d4af37] rounded-r" />
              )}
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs whitespace-nowrap">{category.name.slice(0, 2)}</span>
            </button>
          )
        })}
      </div>
      
      {/* 右侧工具网格 */}
      <div className="flex-1 p-4 overflow-y-auto pb-24">
        <h2 className="text-lg font-medium text-[#d4af37] mb-4 flex items-center gap-2">
          {currentCategory && <currentCategory.icon className="w-5 h-5" />}
          {currentCategory?.name}
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {currentCategory?.tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="bg-[#1f1f1f] border border-[#333] rounded-xl p-4 text-left hover:border-[#d4af37]/50 hover:bg-[#252525] transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{tool.icon}</span>
                <ChevronRight className="w-4 h-4 text-[#666] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-[#f5f5f7] font-medium mb-1">{tool.name}</h3>
              <p className="text-xs text-[#888]">{tool.desc}</p>
            </button>
          ))}
        </div>
        
        {/* 热门推荐 */}
        <div className="mt-6">
          <h3 className="text-sm text-[#888] mb-3">常用工具</h3>
          <div className="flex gap-2 flex-wrap">
            {["四柱工具", "六壬工具", "电子罗盘", "六爻工具"].map((name) => (
              <button
                key={name}
                onClick={() => {
                  const toolId = name === "四柱工具" ? "bazi" 
                    : name === "六壬工具" ? "liuren"
                    : name === "电子罗盘" ? "luopan"
                    : "liuyao"
                  onNavigate(toolId)
                }}
                className="px-3 py-1.5 bg-[#252525] border border-[#444] rounded-full text-xs text-[#ccc] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
