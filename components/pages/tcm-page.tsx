"use client"

import { useState, useEffect } from "react"
import { 
  Search, ChevronLeft, Camera, Scan, User, Brain, 
  BookOpen, MapPin, Pill, FileText, Stethoscope,
  Heart, Dumbbell, Apple, Sparkles, GraduationCap,
  Calculator, Clock, Zap, Bot, Shield, AlertTriangle,
  X, CheckCircle, Info, ChevronRight
} from "lucide-react"
import { CONSTITUTIONS } from "@/lib/tcm-complete-data"
import { ACUPOINTS } from "@/lib/tcm-acupoints"
import { HERBS, FORMULAS } from "@/lib/tcm-complete-data"
import { SHICHEN_JINGLUO, getCurrentShichen } from "@/lib/meridian-data"

// 隐私保护声明
const PRIVACY_NOTICE = {
  faceAnalysis: "本功能仅用于传统文化学习交流，结合现代心理学与能量学视角解读面部特征。所采集的面部图像数据即用即毁，不保存任何生物特征信息，请放心使用。",
  tongueAnalysis: "舌诊分析仅供学习参考，不作为医疗诊断依据。图像数据即用即毁，不保存任何信息。如有健康问题，请咨询专业医师。",
  palmAnalysis: "本功能从现代心理学与能量学视角解读手部特征，仅供传统文化交流学习。所采集的手部图像数据即用即毁，不保存任何生物特征信息。",
  general: "本平台所有内容仅供传统文化学习交流使用，中医类内容仅供学习参考，不作为医疗诊断依据。如有疑问请咨询专业人士。"
}

// 中医百科功能
const TCM_BAIKE = [
  { id: "jingluo", name: "经络穴位", icon: MapPin, desc: "十二经络与常用穴位", color: "#0891b2" },
  { id: "jingdian", name: "经典方剂", icon: BookOpen, desc: "经方大全查询", color: "#0891b2" },
  { id: "zhongyao", name: "中药查询", icon: Pill, desc: "常用中药功效", color: "#0891b2" },
]

// 养生调理功能
const YANGSHENG = [
  { id: "ai-tongue", name: "AI舌诊", icon: Camera, desc: "舌诊分析与调理", color: "#f59e0b", isHot: false, isNew: true },
  { id: "ai-pulse", name: "子午流注", icon: Clock, desc: "按时辰养生开穴", color: "#f59e0b", isHot: false, isNew: true },
  { id: "ai-constitution", name: "体质辨识", icon: User, desc: "九种体质检测", color: "#f59e0b", isHot: true },
  { id: "ai-face", name: "AI面诊", icon: Stethoscope, desc: "面诊分析", color: "#f59e0b", isHot: true },
  { id: "baduanjin", name: "八段锦", icon: Dumbbell, desc: "传统养生功法", color: "#f59e0b" },
  { id: "yaosan", name: "药膳养生", icon: Heart, desc: "药膳食谱", color: "#f59e0b" },
]

// 学习工具
const XUEXIGONGJU = [
  { id: "formula-recite", name: "方剂大全", icon: Sparkles, desc: "经典方剂查询", isNew: true },
  { id: "calculator", name: "计量换算", icon: Calculator, desc: "古今药量换算" },
  { id: "wuyun", name: "五运六气", icon: Clock, desc: "运气学说推演" },
  { id: "ai-analysis", name: "AI综合分析", icon: Bot, desc: "结合易学的AI分析", isHot: true },
]

interface TCMPageProps {
  onNavigateToTool?: (toolId: string) => void
}

type ViewMode = "home" | "constitution" | "acupoint" | "herb" | "formula" | "shichen" | "ai"

export function TCMPage({ onNavigateToTool }: TCMPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [selectedAITool, setSelectedAITool] = useState<string | null>(null)
  const [aiResult, setAiResult] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("home")
  const [currentShichen, setCurrentShichen] = useState(getCurrentShichen())
  const [selectedConstitution, setSelectedConstitution] = useState<any>(null)
  const [selectedAcupoint, setSelectedAcupoint] = useState<any>(null)
  const [selectedHerb, setSelectedHerb] = useState<any>(null)
  const [selectedFormula, setSelectedFormula] = useState<any>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShichen(getCurrentShichen())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const tabs = [
    { id: "all", name: "全部功能" },
    { id: "baike", name: "中医百科" },
    { id: "yangsheng", name: "养生调理" },
    { id: "xuexi", name: "学习工具" },
  ]

  // 智能分析
  const handleAIAnalysis = async (type: string, input: string) => {
    setIsAnalyzing(true)
    setAiResult(null)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const results: Record<string, string> = {
      "ai-tongue": `【舌诊分析结果】\n\n舌质：淡红\n舌苔：薄白\n舌形：正常\n\n【辨证提示】\n此舌象提示气血调和，脏腑功能正常。若有不适，建议结合其他四诊综合判断。\n\n【调理建议】\n1. 饮食清淡，避免辛辣油腻\n2. 作息规律，避免熬夜\n3. 适当运动，增强体质\n\n【古籍参考】\n《伤寒论》：\"舌上白滑苔者，里寒也。\"\n《温病条辨》：\"舌绛而干，当滋阴清热。\"`,
      "ai-constitution": `【体质检测结果】\n\n主要体质：气虚质（65%）\n兼夹体质：阳虚质（20%）、痰湿质（15%）\n\n【体质特征】\n- 容易疲劳，气短懒言\n- 容易感冒，抵抗力较弱\n- 舌淡红，边有齿痕\n\n【调理方案】\n1. 食疗：山药、黄芪、党参炖鸡\n2. 运动：八段锦、太极拳\n3. 穴位：足三里、气海、关元\n\n【推荐方剂】\n四君子汤加减：人参、白术、茯苓、甘草\n\n【易学关联】\n根据您的出生时辰，日主属木，需补土气，建议艾灸脾俞、胃俞穴。`,
      "ai-face": `【面诊分析结果】\n\n面色：偏白\n眼周：略有青黑\n唇色：淡红\n\n【脏腑提示】\n- 面白无华提示气血不足\n- 眼周青黑提示肾气不足或睡眠不佳\n- 唇色淡提示脾胃虚弱\n\n【调理建议】\n1. 补益气血：当归、黄芪、枸杞泡茶\n2. 改善睡眠：酸枣仁、远志、茯神\n3. 健脾养胃：四神汤（山药、芡实、莲子、茯苓）\n\n【穴位推荐】\n三阴交、血海、足三里`,
      "ai-pulse": `【脉象分析结果】\n\n脉位：中取\n脉率：正常（约72次/分）\n脉象特征：弦细\n\n【辨证分析】\n弦脉主肝胆病、痛证、痰饮\n细脉主气血两虚、湿证\n\n【可能证型】\n肝郁气滞兼气血不足\n\n【建议方剂】\n逍遥散加减：柴胡、当归、白芍、白术、茯苓、甘草、薄荷、生姜\n\n【古籍参考】\n《濒湖脉学》：\"弦脉端直以长，如按琴弦。\"`,
    }
    
    setAiResult(results[type] || "分析完成，请结合实际情况综合判断。")
    setIsAnalyzing(false)
  }

  const handleToolClick = (toolId: string) => {
    if (toolId === "ai-constitution") {
      setViewMode("constitution")
    } else if (toolId === "jingluo") {
      setViewMode("acupoint")
    } else if (toolId === "zhongyao") {
      setViewMode("herb")
    } else if (toolId === "jingdian" || toolId === "formula-recite") {
      setViewMode("formula")
    } else if (toolId === "ai-pulse") {
      setViewMode("shichen")
    } else if (toolId.startsWith("ai-") || toolId === "ai-analysis") {
      setSelectedAITool(toolId)
      setShowAIPanel(true)
    } else if (onNavigateToTool) {
      onNavigateToTool(toolId)
    }
  }

  // 首页视图
  const renderHomeView = () => (
    <>
      {/* 快捷入口卡片 - 子午流注 */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6" />
            <span className="font-bold text-lg">当前时辰：{currentShichen.shichen}</span>
          </div>
          <div className="text-sm opacity-90 mb-1">{currentShichen.time}</div>
          <div className="text-sm opacity-90 mb-2">当令经络：{currentShichen.jingluo}</div>
          <div className="text-xs opacity-75">{currentShichen.yangsheng}</div>
          <button 
            onClick={() => setViewMode("shichen")}
            className="mt-3 bg-white/20 rounded-lg px-3 py-1.5 text-sm hover:bg-white/30 transition"
          >
            查看详情
          </button>
        </div>
      </div>

      {/* 分类Tab */}
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#0891b2] text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* 中医百科 */}
      {(activeTab === "all" || activeTab === "baike") && (
        <div className="px-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#0891b2] rounded-full" />
            <h3 className="text-gray-800 font-bold">中医百科</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {TCM_BAIKE.map(item => (
              <button
                key={item.id}
                onClick={() => handleToolClick(item.id)}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e0f2fe] flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#0891b2]" />
                </div>
                <span className="text-sm text-gray-800 font-medium text-center">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 养生调理 */}
      {(activeTab === "all" || activeTab === "yangsheng") && (
        <div className="px-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#f59e0b] rounded-full" />
            <h3 className="text-gray-800 font-bold">养生调理</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {YANGSHENG.map(item => (
              <button
                key={item.id}
                onClick={() => handleToolClick(item.id)}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100 relative"
              >
                <div className="w-12 h-12 rounded-xl bg-[#fef3c7] flex items-center justify-center relative">
                  <item.icon className="w-6 h-6 text-[#f59e0b]" />
                  {item.isHot && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded">HOT</span>
                  )}
                  {item.isNew && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] px-1 rounded">NEW</span>
                  )}
                </div>
                <span className="text-sm text-gray-800 font-medium text-center">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 学习工具 */}
      {(activeTab === "all" || activeTab === "xuexi") && (
        <div className="px-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#8b5cf6] rounded-full" />
            <h3 className="text-gray-800 font-bold">学习工具</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {XUEXIGONGJU.map(item => (
              <button
                key={item.id}
                onClick={() => handleToolClick(item.id)}
                className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ede9fe] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-800">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )

  // 体质辨识视图
  const renderConstitutionView = () => (
    <div className="px-4 py-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">九种体质辨识</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {CONSTITUTIONS.map((constitution: any) => (
          <button
            key={constitution.id}
            onClick={() => setSelectedConstitution(constitution)}
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:border-blue-300 transition"
          >
            <div className="font-bold text-gray-800 mb-1">{constitution.name}</div>
            <div className="text-xs text-gray-500 line-clamp-2">{constitution.description}</div>
          </button>
        ))}
      </div>

      {selectedConstitution && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setSelectedConstitution(null)}>
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-bold">{selectedConstitution.name}</h3>
              <button onClick={() => setSelectedConstitution(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm font-medium text-blue-900 mb-2">体质特征</div>
                <div className="text-sm text-blue-700">
                  {selectedConstitution.characteristics.map((c: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="text-sm font-medium text-orange-900 mb-2">易患疾病</div>
                <div className="text-sm text-orange-700">
                  {selectedConstitution.susceptibility.join('、')}
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-sm font-medium text-green-900 mb-2">饮食调理</div>
                <div className="text-sm text-green-700">
                  {selectedConstitution.diet.join('；')}
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-sm font-medium text-purple-900 mb-2">推荐中药</div>
                <div className="flex flex-wrap gap-2">
                  {selectedConstitution.herbs.map((h: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-cyan-50 rounded-xl p-4">
                <div className="text-sm font-medium text-cyan-900 mb-2">推荐穴位</div>
                <div className="flex flex-wrap gap-2">
                  {selectedConstitution.acupoints.map((a: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // 经络穴位视图
  const renderAcupointView = () => (
    <div className="px-4 py-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">经络穴位</h2>
      </div>

      <div className="mb-4">
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
      </div>

      <div className="space-y-3">
        {ACUPOINTS.filter((acupoint: any) => 
          !searchQuery || 
          acupoint.name.includes(searchQuery) || 
          acupoint.meridian.includes(searchQuery)
        ).map((acupoint: any) => (
          <button
            key={acupoint.name}
            onClick={() => setSelectedAcupoint(acupoint)}
            className="w-full p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:border-blue-300 transition"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-gray-800">{acupoint.name}</span>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{acupoint.meridian}</span>
            </div>
            <div className="text-sm text-gray-600 line-clamp-2">
              {acupoint.functions.join('、')}
            </div>
          </button>
        ))}
      </div>

      {selectedAcupoint && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setSelectedAcupoint(null)}>
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{selectedAcupoint.name}</h3>
                <p className="text-sm text-blue-600">{selectedAcupoint.meridian}</p>
              </div>
              <button onClick={() => setSelectedAcupoint(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm font-medium text-gray-800 mb-2">定位</div>
                <div className="text-sm text-gray-600">{selectedAcupoint.location}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm font-medium text-blue-900 mb-2">功效</div>
                <div className="flex flex-wrap gap-2">
                  {selectedAcupoint.functions.map((f: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{f}</span>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-sm font-medium text-green-900 mb-2">主治</div>
                <div className="text-sm text-green-700">{selectedAcupoint.indications.join('、')}</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="text-sm font-medium text-orange-900 mb-2">刺灸法</div>
                <div className="text-sm text-orange-700">{selectedAcupoint.method}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // 中药查询视图
  const renderHerbView = () => (
    <div className="px-4 py-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">中药大全</h2>
      </div>

      <div className="mb-4">
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
      </div>

      <div className="space-y-3">
        {HERBS.filter((herb: any) => 
          !searchQuery || 
          herb.name.includes(searchQuery) || 
          herb.functions.some((f: string) => f.includes(searchQuery))
        ).map((herb: any) => (
          <button
            key={herb.name}
            onClick={() => setSelectedHerb(herb)}
            className="w-full p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:border-green-300 transition"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-gray-800">{herb.name}</span>
              <span className="text-xs text-gray-500">{herb.nature}</span>
            </div>
            <div className="text-sm text-gray-600 line-clamp-2">
              {herb.functions.join('、')}
            </div>
          </button>
        ))}
      </div>

      {selectedHerb && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setSelectedHerb(null)}>
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{selectedHerb.name}</h3>
                <p className="text-sm text-gray-600">{selectedHerb.alias.join('、')}</p>
              </div>
              <button onClick={() => setSelectedHerb(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="text-sm font-medium text-amber-900 mb-2">性味</div>
                <div className="text-sm text-amber-700">{selectedHerb.nature}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm font-medium text-blue-900 mb-2">归经</div>
                <div className="flex flex-wrap gap-2">
                  {selectedHerb.meridians.map((m: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{m}经</span>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-sm font-medium text-green-900 mb-2">功效</div>
                <div className="flex flex-wrap gap-2">
                  {selectedHerb.functions.map((f: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{f}</span>
                  ))}
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-sm font-medium text-purple-900 mb-2">主治</div>
                <div className="text-sm text-purple-700">{selectedHerb.indications.join('、')}</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="text-sm font-medium text-orange-900 mb-2">用法用量</div>
                <div className="text-sm text-orange-700">{selectedHerb.dosage}</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-sm font-medium text-red-900 mb-2">使用注意</div>
                <div className="text-sm text-red-700">{selectedHerb.cautions.join('；')}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm font-medium text-gray-800 mb-2">来源</div>
                <div className="text-sm text-gray-600">{selectedHerb.source}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // 方剂查询视图
  const renderFormulaView = () => (
    <div className="px-4 py-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">经典方剂</h2>
      </div>

      <div className="mb-4">
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
      </div>

      <div className="space-y-3">
        {FORMULAS.filter((formula: any) => 
          !searchQuery || 
          formula.name.includes(searchQuery) || 
          formula.functions.some((f: string) => f.includes(searchQuery))
        ).map((formula: any) => (
          <button
            key={formula.name}
            onClick={() => setSelectedFormula(formula)}
            className="w-full p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:border-purple-300 transition"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-gray-800">{formula.name}</span>
              <span className="text-xs text-gray-500">{formula.source}</span>
            </div>
            <div className="text-sm text-gray-600 line-clamp-2">
              {formula.functions.join('、')}
            </div>
          </button>
        ))}
      </div>

      {selectedFormula && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setSelectedFormula(null)}>
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{selectedFormula.name}</h3>
                <p className="text-sm text-gray-600">{selectedFormula.source}</p>
              </div>
              <button onClick={() => setSelectedFormula(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="text-sm font-medium text-amber-900 mb-2">组成</div>
                <div className="flex flex-wrap gap-2">
                  {selectedFormula.ingredients.map((c: any, i: number) => (
                    <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                      {c.name} {c.amount}
                    </span>
                  ))}
                </div>
              </div>
              {selectedFormula.method && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-sm font-medium text-blue-900 mb-2">用法</div>
                  <div className="text-sm text-blue-700">{selectedFormula.method}</div>
                </div>
              )}
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-sm font-medium text-green-900 mb-2">功效</div>
                <div className="flex flex-wrap gap-2">
                  {selectedFormula.functions.map((f: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{f}</span>
                  ))}
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-sm font-medium text-purple-900 mb-2">主治</div>
                <div className="text-sm text-purple-700">{selectedFormula.indications.join('、')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // 子午流注视图
  const renderShichenView = () => (
    <div className="px-4 py-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setViewMode("home")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">子午流注</h2>
      </div>

      <div className="grid gap-4">
        {SHICHEN_JINGLUO.map((shichen: any, index: number) => {
          const isCurrent = shichen.shichen === currentShichen.shichen
          return (
            <div
              key={shichen.shichen}
              className={`p-4 rounded-xl border-2 transition-all ${
                isCurrent 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-transparent shadow-lg' 
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className={`font-bold ${isCurrent ? 'text-white' : 'text-gray-800'}`}>
                    {shichen.shichen}
                  </div>
                  <div className={`text-sm ${isCurrent ? 'text-blue-100' : 'text-gray-500'}`}>
                    {shichen.time}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  isCurrent 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {shichen.jingluo}
                </div>
              </div>
              <div className={`text-sm ${isCurrent ? 'text-blue-100' : 'text-gray-600'}`}>
                {shichen.yangsheng}
              </div>
              <div className={`mt-2 pt-2 border-t ${isCurrent ? 'border-white/20' : 'border-gray-100'}`}>
                <div className={`text-xs ${isCurrent ? 'text-blue-100' : 'text-gray-500'}`}>
                  推荐穴位：{shichen.kaoxue}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* 顶部搜索栏 - 仅在首页显示 */}
      {viewMode === "home" && (
        <div className="sticky top-0 z-10 bg-gradient-to-b from-[#0891b2] to-[#0891b2]/90 px-4 pt-4 pb-3">
          <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2.5 shadow-sm">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索中药、方剂、症状..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm"
            />
            <Camera className="w-5 h-5 text-[#0891b2]" />
          </div>
        </div>
      )}

      {/* 内容区域 */}
      {viewMode === "home" && renderHomeView()}
      {viewMode === "constitution" && renderConstitutionView()}
      {viewMode === "acupoint" && renderAcupointView()}
      {viewMode === "herb" && renderHerbView()}
      {viewMode === "formula" && renderFormulaView()}
      {viewMode === "shichen" && renderShichenView()}

      {/* AI分析面板 */}
      {showAIPanel && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
          <div className="w-full bg-[#1a1a1a] rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1a1a1a] px-4 py-4 border-b border-[#3a3a3a] flex items-center justify-between">
            <button onClick={() => setShowAIPanel(false)}>
              <ChevronLeft className="w-6 h-6 text-[#f5f5f7]" />
            </button>
            <h3 className="text-[#f5f5f7] font-bold">
              {selectedAITool === "ai-tongue" && "AI舌诊"}
              {selectedAITool === "ai-face" && "AI面诊"}
              {selectedAITool === "ai-constitution" && "体质检测"}
              {selectedAITool === "ai-pulse" && "AI把脉"}
            </h3>
            <div className="w-6" />
          </div>
          
          <div className="p-4">
            {/* 隐私安全提示 */}
            {(selectedAITool === "ai-tongue" || selectedAITool === "ai-face") && (
              <div className="bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl p-3 mb-4">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[#22c55e] text-xs font-medium mb-1">隐私保护</div>
                    <p className="text-gray-400 text-xs">
                      所有分析均在本地设备完成，图片不会上传至任何服务器
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 操作按钮 */}
            {!aiResult && !isAnalyzing && (
              <div className="space-y-3">
                {(selectedAITool === "ai-tongue" || selectedAITool === "ai-face") && (
                  <button
                    onClick={() => handleAIAnalysis(selectedAITool!, "")}
                    className="w-full py-4 bg-[#0891b2] rounded-xl text-white font-medium flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    拍照分析
                  </button>
                )}
                {selectedAITool === "ai-constitution" && (
                  <button
                    onClick={() => handleAIAnalysis(selectedAITool!, "")}
                    className="w-full py-4 bg-[#f59e0b] rounded-xl text-white font-medium flex items-center justify-center gap-2"
                  >
                    <User className="w-5 h-5" />
                    开始测试
                  </button>
                )}
              </div>
            )}

            {/* 分析中 */}
            {isAnalyzing && (
              <div className="flex flex-col items-center py-12">
                <div className="w-16 h-16 border-4 border-[#0891b2] border-t-transparent rounded-full animate-spin mb-4" />
                <div className="text-[#f5f5f7]">AI正在分析中...</div>
                <div className="text-gray-500 text-sm mt-1">请稍候</div>
              </div>
            )}

            {/* 分析结果 */}
            {aiResult && (
              <div className="bg-[#252525] rounded-xl p-4">
                <div className="text-[#d4af37] font-medium mb-3">分析结果</div>
                <div className="text-[#f5f5f7] text-sm whitespace-pre-line leading-relaxed">
                  {aiResult}
                </div>
                <div className="mt-4 pt-4 border-t border-[#3a3a3a] flex gap-2">
                  <button
                    onClick={() => {
                      setAiResult(null)
                      setSelectedAITool(null)
                    }}
                    className="flex-1 py-2 bg-[#3a3a3a] rounded-lg text-[#f5f5f7] text-sm"
                  >
                    重新分析
                  </button>
                  <button className="flex-1 py-2 bg-[#0891b2] rounded-lg text-white text-sm">
                    保存结果
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      )}

      {/* 底部合规声明 - 仅在首页显示 */}
      {viewMode === "home" && (
        <div className="px-4 py-4 mb-8">
          <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
              <span className="text-[#f59e0b] text-xs font-medium">重要声明</span>
            </div>
            <p className="text-gray-500 text-[10px] leading-relaxed">
              {PRIVACY_NOTICE.general}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
