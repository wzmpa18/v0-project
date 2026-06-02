"use client"

import { useState } from "react"
import { 
  BookOpen, ChevronLeft, ChevronRight, ChevronDown, Search,
  FileText, Brain, Heart, Activity, Shield, Zap, Star, Quote
} from "lucide-react"
import { 
  CLASSIC_BOOKS, 
  CLASSIC_QUOTES, 
  SIZHEN, 
  BAGANG, 
  ZANGFU_BIANZHENG, 
  JINJI 
} from "@/lib/tcm-classics"
import { CONSTITUTIONS, HERBS, FORMULAS, ACUPOINTS } from "@/lib/tcm-complete-data"
import { MERIDIANS, ACUPOINTS as ACUPOINTS_DATA } from "@/lib/tcm-acupoints"

interface StudyPageProps {
  onBack?: () => void
}

type ViewMode = 
  | "home" 
  | "classics" 
  | "quotes" 
  | "sizhen" 
  | "bagang" 
  | "zangfu" 
  | "jinji"
  | "herbs" 
  | "formulas" 
  | "acupoints"
  | "meridians"
  | "constitutions"

export function TCMStudyPage({ onBack }: StudyPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // 学习模块配置
  const studyModules = [
    {
      id: "classics",
      name: "经典典籍",
      icon: BookOpen,
      color: "#dc2626",
      description: "黄帝内经、伤寒论等经典",
      count: CLASSIC_BOOKS.length
    },
    {
      id: "quotes",
      name: "经典名句",
      icon: Quote,
      color: "#f59e0b",
      description: "古籍精选语录与释义",
      count: CLASSIC_QUOTES.length
    },
    {
      id: "sizhen",
      name: "四诊要诀",
      icon: Activity,
      color: "#10b981",
      description: "望闻问切诊断方法",
      count: 4
    },
    {
      id: "bagang",
      name: "八纲辨证",
      icon: Brain,
      color: "#8b5cf6",
      description: "阴阳表里寒热虚实",
      count: 8
    },
    {
      id: "zangfu",
      name: "脏腑辨证",
      icon: Heart,
      color: "#ec4899",
      description: "五脏六腑辨证论治",
      count: 5
    },
    {
      id: "jinji",
      name: "配伍禁忌",
      icon: Shield,
      color: "#ef4444",
      description: "十八反十九畏等禁忌",
      count: 3
    },
    {
      id: "herbs",
      name: "中药学",
      icon: Star,
      color: "#14b8a6",
      description: "常用中药详解",
      count: HERBS.length
    },
    {
      id: "formulas",
      name: "方剂学",
      icon: Zap,
      color: "#f97316",
      description: "经典方剂配伍",
      count: FORMULAS.length
    },
    {
      id: "acupoints",
      name: "穴位详解",
      icon: Activity,
      color: "#06b6d4",
      description: "全身穴位定位功效",
      count: ACUPOINTS_DATA.length
    },
    {
      id: "meridians",
      name: "经络学",
      icon: Activity,
      color: "#8b5cf6",
      description: "十二正经奇经八脉",
      count: MERIDIANS.length
    },
    {
      id: "constitutions",
      name: "体质学说",
      icon: Brain,
      color: "#84cc16",
      description: "九种体质辨识与调理",
      count: CONSTITUTIONS.length
    }
  ]

  // 首页
  const renderHome = () => (
    <div className="p-4 space-y-6">
      {/* 顶部标题 */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">中医学习中心</h1>
        <p className="text-gray-500 text-sm">传承经典 · 学以致用</p>
      </div>

      {/* 搜索栏 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="搜索中医知识..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:border-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* 学习模块网格 */}
      <div className="grid grid-cols-2 gap-4">
        {studyModules
          .filter(m => !searchQuery || m.name.includes(searchQuery) || m.description.includes(searchQuery))
          .map(module => (
            <button
              key={module.id}
              onClick={() => setViewMode(module.id as ViewMode)}
              className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${module.color}15` }}
              >
                <module.icon className="w-6 h-6" style={{ color: module.color }} />
              </div>
              <div className="font-bold text-gray-800 mb-1">{module.name}</div>
              <div className="text-xs text-gray-500 mb-2 line-clamp-2">{module.description}</div>
              <div className="text-xs" style={{ color: module.color }}>
                {module.count} 个内容
              </div>
            </button>
          ))}
      </div>
    </div>
  )

  // 经典典籍
  const renderClassics = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">经典典籍</h2>
      </div>

      <div className="space-y-4">
        {CLASSIC_BOOKS.map(book => (
          <div key={book.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <button
              onClick={() => setExpandedSection(expandedSection === book.id ? null : book.id)}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{book.name}</h3>
                  <p className="text-sm text-gray-500">{book.author} · {book.dynasty} · {book.year}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === book.id ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {expandedSection === book.id && (
              <div className="mt-4 space-y-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm">{book.description}</p>
                
                <div>
                  <div className="text-sm font-medium text-gray-800 mb-2">篇章结构</div>
                  <div className="flex flex-wrap gap-2">
                    {book.chapters.map((ch, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-800 mb-2">核心理论</div>
                  <div className="flex flex-wrap gap-2">
                    {book.keyConcepts.map((kc, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 rounded-full text-xs text-blue-700">
                        {kc}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-800 mb-2">经典引用</div>
                  <div className="space-y-2">
                    {book.quotes.map((q, i) => (
                      <div key={i} className="p-3 bg-amber-50 rounded-lg text-sm text-gray-700 italic">
                        "{q}"
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  // 经典名句
  const renderQuotes = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">经典名句</h2>
      </div>

      <div className="space-y-4">
        {CLASSIC_QUOTES.map(quote => (
          <div key={quote.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600">{quote.bookName}</span>
              <span className="text-xs text-gray-400">· {quote.chapter}</span>
            </div>
            <p className="text-gray-800 mb-3 leading-relaxed">{quote.content}</p>
            {quote.translation && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-xs font-medium text-blue-600 mb-1">释义</div>
                <p className="text-sm text-gray-700">{quote.translation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  // 四诊
  const renderSizhen = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">四诊要诀</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(SIZHEN).map(([name, data]) => (
          <div key={name} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <button
              onClick={() => setExpandedSection(expandedSection === name ? null : name)}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{data.description}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === name ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {expandedSection === name && (
              <div className="mt-4 space-y-3 pt-4 border-t border-gray-100">
                {data.contents.map((item, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-800 mb-2">{item.title}</div>
                    <p className="text-sm text-gray-600">{item.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  // 八纲辨证
  const renderBagang = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">八纲辨证</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(BAGANG).map(([name, data]) => (
          <button
            key={name}
            onClick={() => setExpandedSection(expandedSection === name ? null : name)}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-left"
          >
            <h3 className="font-bold text-gray-800 mb-2">{name}证</h3>
            <p className="text-xs text-gray-500 line-clamp-3">{data.description}</p>
            <div className="mt-2 text-xs text-blue-600">查看详情 →</div>
          </button>
        ))}
      </div>

      {expandedSection && BAGANG[expandedSection as keyof typeof BAGANG] && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setExpandedSection(null)}>
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-bold">{expandedSection}证</h3>
              <button onClick={() => setExpandedSection(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm font-medium text-blue-900 mb-2">证候特征</div>
                <p className="text-sm text-blue-800">{BAGANG[expandedSection as keyof typeof BAGANG].description}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-sm font-medium text-green-900 mb-2">常见症状</div>
                <div className="flex flex-wrap gap-2">
                  {BAGANG[expandedSection as keyof typeof BAGANG].symptoms.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{s}</span>
                  ))}
                </div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="text-sm font-medium text-orange-900 mb-2">治法</div>
                <p className="text-sm text-orange-800">{BAGANG[expandedSection as keyof typeof BAGANG].treatment}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // 脏腑辨证
  const renderZangfu = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">脏腑辨证</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(ZANGFU_BIANZHENG).map(([zang, data]) => (
          <div key={zang} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <button
              onClick={() => setExpandedSection(expandedSection === zang ? null : zang)}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{zang}辨证</h3>
                  <p className="text-sm text-gray-500 mt-1">生理：{data.生理}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === zang ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {expandedSection === zang && (
              <div className="mt-4 space-y-4 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-sm font-medium text-gray-800 mb-3">常见证型</div>
                  <div className="space-y-3">
                    {Object.entries(data.常见证型).map(([type, info]) => (
                      <div key={type} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-blue-600 mb-2">{type}</div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-gray-500">症状：</span>
                            <span className="text-sm text-gray-700">{info.症状.join('、')}</span>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">治法：</span>
                            <span className="text-sm text-green-600">{info.治法}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  // 配伍禁忌
  const renderJinji = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">配伍禁忌</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(JINJI).map(([name, items]) => (
          <div key={name} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-3">{name}</h3>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="p-3 bg-red-50 rounded-lg text-sm text-gray-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // 中药
  const renderHerbs = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">中药学</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="搜索中药..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        {HERBS.filter(h => !searchQuery || h.name.includes(searchQuery)).map(herb => (
          <div key={herb.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">{herb.name}</h3>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{herb.category}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">性味：{herb.nature}</p>
            <p className="text-sm text-gray-600 mb-2">归经：{herb.meridians.join('、')}</p>
            <p className="text-sm text-gray-600 mb-2">功效：{herb.functions.join('、')}</p>
            <p className="text-xs text-gray-400">来源：{herb.source}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // 方剂
  const renderFormulas = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">方剂学</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="搜索方剂..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        {FORMULAS.filter(f => !searchQuery || f.name.includes(searchQuery)).map(formula => (
          <div key={formula.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">{formula.name}</h3>
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">{formula.category}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">出处：{formula.source}</p>
            <p className="text-sm text-gray-600 mb-2">组成：{formula.ingredients.map(i => `${i.name}${i.dosage}`).join('、')}</p>
            <p className="text-sm text-gray-600">功效：{formula.functions.join('、')}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // 穴位
  const renderAcupoints = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">穴位详解</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="搜索穴位..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        {ACUPOINTS_DATA.filter(a => !searchQuery || a.name.includes(searchQuery) || a.pinyin.includes(searchQuery.toLowerCase())).map(acupoint => (
          <div key={acupoint.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">{acupoint.name}</h3>
              <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded">{acupoint.meridianName}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">定位：{acupoint.location}</p>
            <p className="text-sm text-gray-600 mb-2">功效：{acupoint.functions.join('、')}</p>
            <p className="text-sm text-gray-600">主治：{acupoint.indications.join('、')}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // 经络
  const renderMeridians = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">经络学</h2>
      </div>

      <div className="space-y-4">
        {MERIDIANS.map(meridian => (
          <div key={meridian.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg text-gray-800">{meridian.name}</h3>
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">{meridian.type}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">属{meridian.organ}，共{meridian.pointsCount}穴</p>
            <p className="text-sm text-gray-500 mb-2">当令时辰：{meridian.circulationTime}</p>
            <details className="mt-3">
              <summary className="text-sm text-blue-600 cursor-pointer">查看经脉循行</summary>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">{meridian.description}</p>
            </details>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-sm text-gray-500">重点穴位：</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {meridian.keyPoints.map((p, i) => (
                  <span key={i} className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm">{p}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // 体质
  const renderConstitutions = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">体质学说</h2>
      </div>

      <div className="space-y-3">
        {CONSTITUTIONS.map(constitution => (
          <div key={constitution.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-2">{constitution.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{constitution.description}</p>
            <div className="flex flex-wrap gap-2">
              {constitution.herbs.slice(0, 3).map((h, i) => (
                <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">{h}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // 渲染视图
  const renderView = () => {
    switch (viewMode) {
      case "classics": return renderClassics()
      case "quotes": return renderQuotes()
      case "sizhen": return renderSizhen()
      case "bagang": return renderBagang()
      case "zangfu": return renderZangfu()
      case "jinji": return renderJinji()
      case "herbs": return renderHerbs()
      case "formulas": return renderFormulas()
      case "acupoints": return renderAcupoints()
      case "meridians": return renderMeridians()
      case "constitutions": return renderConstitutions()
      default: return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航栏 */}
      {viewMode !== "home" && (
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => setViewMode("home")}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-800">中医学习</h1>
          </div>
        </div>
      )}

      {renderView()}
    </div>
  )
}
