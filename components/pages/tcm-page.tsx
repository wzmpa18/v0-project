"use client"

import { useState } from "react"
import { 
  Search, ChevronLeft, Camera, Scan, User, Brain, 
  BookOpen, MapPin, Pill, FileText, Stethoscope,
  Heart, Dumbbell, Apple, Sparkles, GraduationCap,
  Calculator, Clock, Zap, Bot, Shield, AlertTriangle
} from "lucide-react"

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
  { id: "jingdian", name: "经典书城", icon: BookOpen, desc: "中医古籍原文与译文", color: "#0891b2" },
  { id: "jibing", name: "疾病百科", icon: Search, desc: "常见疾病辨证施治", color: "#0891b2" },
  { id: "yian", name: "医案查询", icon: FileText, desc: "名家医案实录", color: "#0891b2" },
  { id: "zhongyao", name: "中成药", icon: Pill, desc: "中成药查询与配伍", color: "#0891b2" },
]

// 养生调理功能
const YANGSHENG = [
  { id: "ai-tongue", name: "AI舌诊", icon: Camera, desc: "拍摄舌面照片，AI辅助诊断", color: "#f59e0b", isHot: false, isNew: true },
  { id: "ai-pulse", name: "AI把脉", icon: Scan, desc: "智能脉象分析系统", color: "#f59e0b", isHot: false, isNew: true },
  { id: "ai-constitution", name: "体质检测", icon: User, desc: "智能问答系统，检测自身体质", color: "#f59e0b", isHot: true },
  { id: "ai-face", name: "AI面诊", icon: Stethoscope, desc: "拍摄面部照片，AI辅助诊断", color: "#f59e0b", isHot: true },
  { id: "baduanjin", name: "八段锦", icon: Dumbbell, desc: "传统养生功法教学", color: "#f59e0b" },
  { id: "shicai", name: "食材", icon: Apple, desc: "食材功效与搭配", color: "#f59e0b" },
  { id: "yaosan", name: "药膳", icon: Heart, desc: "药膳食谱养生方", color: "#f59e0b" },
]

// 学习工具
const XUEXIGONGJU = [
  { id: "course-map", name: "课程导图", icon: Brain, desc: "中医学习路线图" },
  { id: "exam-bank", name: "医考题库", icon: GraduationCap, desc: "执业资格考试题库" },
  { id: "formula-recite", name: "方药背诵", icon: Sparkles, desc: "方剂速记与复习", isNew: true },
  { id: "smart-formula", name: "智能识方", icon: Zap, desc: "拍照识别方剂" },
  { id: "herb-identify", name: "中药识别", icon: Camera, desc: "AI中药图片识别" },
  { id: "calculator", name: "计量换算", icon: Calculator, desc: "古今药量换算" },
  { id: "wuyun", name: "五运六气", icon: Clock, desc: "运气学说推演" },
  { id: "ai-analysis", name: "AI综合分析", icon: Bot, desc: "结合易学的AI分析", isHot: true },
]

// AI分析类型
const AI_ANALYSIS_TYPES = [
  { id: "bazi-health", name: "八字看健康", desc: "根据八字分析易患疾病" },
  { id: "yijing-diagnosis", name: "易经辅助诊断", desc: "六爻占卜辅助病情分析" },
  { id: "wuxing-therapy", name: "五行调理建议", desc: "根据五行生克提供调理方案" },
  { id: "meridian-time", name: "子午流注开穴", desc: "根据时辰推荐最佳治疗穴位" },
]

interface TCMPageProps {
  onNavigateToTool?: (toolId: string) => void
}

export function TCMPage({ onNavigateToTool }: TCMPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [selectedAITool, setSelectedAITool] = useState<string | null>(null)
  const [aiResult, setAiResult] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const tabs = [
    { id: "all", name: "全部功能" },
    { id: "baike", name: "中医百科" },
    { id: "yangsheng", name: "养生调理" },
    { id: "xuexi", name: "学习工具" },
  ]

  // 模拟AI分析
  const handleAIAnalysis = async (type: string, input: string) => {
    setIsAnalyzing(true)
    setAiResult(null)
    
    // 模拟AI分析延迟
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 根据不同类型返回不同的分析结果
    const results: Record<string, string> = {
      "ai-tongue": `【舌诊分析结果】\n\n舌质：淡红\n舌苔：薄白\n舌形：正常\n\n【辨证提示】\n此舌象提示气血调和，脏腑功能正常。若有不适，建议结合其他四诊综合判断。\n\n【调理建议】\n1. 饮食清淡，避免辛辣油腻\n2. 作息规律，避免熬夜\n3. 适当运动，增强体质\n\n【古籍参考】\n《伤寒论》："舌上白滑苔者，里寒也。"\n《温病条辨》："舌绛而干，当滋阴清热。"`,
      "ai-constitution": `【体质检测结果】\n\n主要体质：气虚质（65%）\n兼夹体质：阳虚质（20%）、痰湿质（15%）\n\n【体质特征】\n- 容易疲劳，气短懒言\n- 容易感冒，抵抗力较弱\n- 舌淡红，边有齿痕\n\n【调理方案】\n1. 食疗：山药、黄芪、党参炖鸡\n2. 运动：八段锦、太极拳\n3. 穴位：足三里、气海、关元\n\n【推荐方剂】\n四君子汤加减：人参、白术、茯苓、甘草\n\n【易学关联】\n根据您的出生时辰，日主属木，需补土气，建议艾灸脾俞、胃俞穴。`,
      "ai-face": `【面诊分析结果】\n\n面色：偏白\n眼周：略有青黑\n唇色：淡红\n\n【脏腑提示】\n- 面白无华提示气血不足\n- 眼周青黑提示肾气不足或睡眠不佳\n- 唇色淡提示脾胃虚弱\n\n【调理建议】\n1. 补益气血：当归、黄芪、枸杞泡茶\n2. 改善睡眠：酸枣仁、远志、茯神\n3. 健脾养胃：四神汤（山药、芡实、莲子、茯苓）\n\n【穴位推荐】\n三阴交、血海、足三里`,
      "ai-pulse": `【脉象分析结果】\n\n脉位：中取\n脉率：正常（约72次/分）\n脉象特征：弦细\n\n【辨证分析】\n弦脉主肝胆病、痛证、痰饮\n细脉主气血两虚、湿证\n\n【可能证型】\n肝郁气滞兼气血不足\n\n【建议方剂】\n逍遥散加减：柴胡、当归、白芍、白术、茯苓、甘草、薄荷、生姜\n\n【古籍参考】\n《濒湖脉学》："弦脉端直以长，如按琴弦。"`,
    }
    
    setAiResult(results[type] || "分析完成，请结合实际情况综合判断。")
    setIsAnalyzing(false)
  }

  const handleToolClick = (toolId: string) => {
    if (toolId.startsWith("ai-") || toolId === "ai-analysis") {
      setSelectedAITool(toolId)
      setShowAIPanel(true)
    } else if (onNavigateToTool) {
      onNavigateToTool(toolId)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#e8f5f3] to-white pb-24">
      {/* 顶部搜索栏 */}
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

      {/* 快捷入口卡片 */}
      <div className="px-4 -mt-2">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex-shrink-0 w-32 bg-gradient-to-br from-[#0891b2] to-[#0891b2]/80 rounded-xl p-3 text-white shadow-lg">
            <div className="text-lg font-bold">中药</div>
            <div className="text-xs opacity-80">识本草懂药性</div>
            <div className="mt-2 text-xs bg-white/20 rounded-full px-2 py-0.5 inline-block">1.1万味</div>
          </div>
          <div className="flex-shrink-0 w-32 bg-gradient-to-br from-[#0891b2] to-[#0891b2]/80 rounded-xl p-3 text-white shadow-lg">
            <div className="text-lg font-bold">方剂</div>
            <div className="text-xs opacity-80">懂配伍精临证</div>
            <div className="mt-2 text-xs bg-white/20 rounded-full px-2 py-0.5 inline-block">1.8万首</div>
          </div>
          <div className="flex-shrink-0 w-32 bg-gradient-to-br from-[#f59e0b] to-[#f59e0b]/80 rounded-xl p-3 text-white shadow-lg">
            <div className="text-lg font-bold">名家讲堂</div>
            <div className="text-xs opacity-80">跟明师入医门</div>
            <div className="mt-2 text-xs bg-white/20 rounded-full px-2 py-0.5 inline-block">623个</div>
          </div>
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
          <div className="grid grid-cols-5 gap-3">
            {TCM_BAIKE.map(item => (
              <button
                key={item.id}
                onClick={() => handleToolClick(item.id)}
                className="flex flex-col items-center gap-1.5 p-2"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e0f2fe] flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#0891b2]" />
                </div>
                <span className="text-xs text-gray-800 font-medium text-center leading-tight">{item.name}</span>
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
          <div className="grid grid-cols-5 gap-3">
            {YANGSHENG.map(item => (
              <button
                key={item.id}
                onClick={() => handleToolClick(item.id)}
                className="flex flex-col items-center gap-1.5 p-2 relative"
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
                <span className="text-xs text-gray-800 font-medium text-center leading-tight">{item.name}</span>
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
          <div className="grid grid-cols-5 gap-3">
            {XUEXIGONGJU.map(item => (
              <button
                key={item.id}
                onClick={() => handleToolClick(item.id)}
                className="flex flex-col items-center gap-1.5 p-2 relative"
              >
                <div className="w-12 h-12 rounded-xl bg-[#ede9fe] flex items-center justify-center relative">
                  <item.icon className="w-6 h-6 text-[#8b5cf6]" />
                  {item.isHot && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded">HOT</span>
                  )}
                  {item.isNew && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] px-1 rounded">NEW</span>
                  )}
                </div>
                <span className="text-xs text-gray-800 font-medium text-center leading-tight">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI与易学结合分析入口 */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-[#d4af37] font-bold">AI智能分析</h3>
            <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded-full">易医结合</span>
          </div>
          <p className="text-[#9ca3af] text-xs mb-3">结合易学预测工具的断语，进行综合AI分析</p>
          <div className="grid grid-cols-2 gap-2">
            {AI_ANALYSIS_TYPES.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedAITool(item.id)
                  setShowAIPanel(true)
                }}
                className="bg-[#3a3a3a] rounded-lg p-3 text-left hover:bg-[#4a4a4a] transition-colors"
              >
                <div className="text-[#f5f5f7] text-sm font-medium">{item.name}</div>
                <div className="text-[#9ca3af] text-xs mt-1">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

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
                {selectedAITool === "bazi-health" && "八字看健康"}
                {selectedAITool === "yijing-diagnosis" && "易经辅助诊断"}
                {selectedAITool === "wuxing-therapy" && "五行调理建议"}
                {selectedAITool === "meridian-time" && "子午流注开穴"}
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
                      <div className="text-[#22c55e] text-xs font-medium mb-1">隐私保护声明</div>
                      <div className="text-[#9ca3af] text-[10px] leading-relaxed">
                        {selectedAITool === "ai-tongue" ? PRIVACY_NOTICE.tongueAnalysis : PRIVACY_NOTICE.faceAnalysis}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI功能描述 */}
              <div className="bg-[#252525] rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#0891b2]/20 rounded-xl flex items-center justify-center">
                    {selectedAITool?.startsWith("ai-") ? (
                      <Camera className="w-6 h-6 text-[#0891b2]" />
                    ) : (
                      <Bot className="w-6 h-6 text-[#d4af37]" />
                    )}
                  </div>
                  <div>
                    <div className="text-[#f5f5f7] font-medium">
                      {selectedAITool === "ai-tongue" && "拍摄舌面照片，AI辅助分析舌象"}
                      {selectedAITool === "ai-face" && "拍摄面部照片，AI辅助分析面色"}
                      {selectedAITool === "ai-constitution" && "回答问卷，AI判断中医体质"}
                      {selectedAITool === "ai-pulse" && "使用设备采集，AI分析脉象"}
                      {selectedAITool === "bazi-health" && "根据八字五行分析健康倾向"}
                      {selectedAITool === "yijing-diagnosis" && "结合六爻卦象辅助病情分析"}
                      {selectedAITool === "wuxing-therapy" && "根据五行生克制化调理方案"}
                      {selectedAITool === "meridian-time" && "根据当前时辰推荐开穴治疗"}
                    </div>
                    <div className="text-[#9ca3af] text-xs mt-1">AI分析仅供参考，不能替代专业医师诊断</div>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              {!aiResult && !isAnalyzing && (
                <div className="space-y-3">
                  {(selectedAITool === "ai-tongue" || selectedAITool === "ai-face") && (
                    <button
                      onClick={() => handleAIAnalysis(selectedAITool, "")}
                      className="w-full py-4 bg-[#0891b2] rounded-xl text-white font-medium flex items-center justify-center gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      拍照分析
                    </button>
                  )}
                  {selectedAITool === "ai-constitution" && (
                    <button
                      onClick={() => handleAIAnalysis(selectedAITool, "")}
                      className="w-full py-4 bg-[#f59e0b] rounded-xl text-white font-medium flex items-center justify-center gap-2"
                    >
                      <User className="w-5 h-5" />
                      开始测试
                    </button>
                  )}
                  {selectedAITool === "ai-pulse" && (
                    <button
                      onClick={() => handleAIAnalysis(selectedAITool, "")}
                      className="w-full py-4 bg-[#8b5cf6] rounded-xl text-white font-medium flex items-center justify-center gap-2"
                    >
                      <Scan className="w-5 h-5" />
                      开始采集
                    </button>
                  )}
                  {(selectedAITool === "bazi-health" || selectedAITool === "yijing-diagnosis" || selectedAITool === "wuxing-therapy" || selectedAITool === "meridian-time") && (
                    <div className="space-y-3">
                      <div className="bg-[#252525] rounded-xl p-3">
                        <div className="text-[#9ca3af] text-xs mb-2">请先在排盘工具中获取断语结果</div>
                        <textarea
                          placeholder="粘贴排盘结果或手动输入八字/卦象..."
                          className="w-full bg-[#1a1a1a] rounded-lg p-3 text-[#f5f5f7] text-sm resize-none h-24 outline-none border border-[#3a3a3a] focus:border-[#d4af37]"
                        />
                      </div>
                      <button
                        onClick={() => handleAIAnalysis("ai-constitution", "")}
                        className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#c8102e] rounded-xl text-white font-medium flex items-center justify-center gap-2"
                      >
                        <Bot className="w-5 h-5" />
                        AI综合分析
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 分析中 */}
              {isAnalyzing && (
                <div className="flex flex-col items-center py-12">
                  <div className="w-16 h-16 border-4 border-[#0891b2] border-t-transparent rounded-full animate-spin mb-4" />
                  <div className="text-[#f5f5f7]">AI正在分析中...</div>
                  <div className="text-[#9ca3af] text-sm mt-1">请稍候</div>
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

      {/* 底部合规声明 */}
      <div className="px-4 py-4 mb-8">
        <div className="bg-[#252525] rounded-xl p-4 border border-[#333]">
          <div className="flex items-start gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
            <span className="text-[#f59e0b] text-xs font-medium">重要声明</span>
          </div>
          <p className="text-[#6b7280] text-[10px] leading-relaxed">
            {PRIVACY_NOTICE.general}
          </p>
        </div>
      </div>
    </div>
  )
}
