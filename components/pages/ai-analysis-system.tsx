"use client"

import { useState, useRef, useEffect } from "react"
import {
  Sparkles,
  Brain,
  Heart,
  Activity,
  Stethoscope,
  Shield,
  Thermometer,
  Droplets,
  Wind,
  Moon,
  Sun,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Send,
  Loader2,
  RefreshCw,
  User,
  MessageSquare,
  Zap,
  FileText,
  TrendingUp,
  Clock
} from "lucide-react"
import {
  SYNDROME_PATTERNS,
  SYMPTOMS_DETAIL,
  getSymptomDetail
} from "@/lib/tcm-symptoms"
import {
  CLASSIC_FORMULAS,
  getFormulaDetail
} from "@/lib/tcm-classic-formulas"
import {
  MERIDIANS_FULL,
  ACUPOINTS_FULL
} from "@/lib/tcm-meridian-complete"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  type?: "text" | "analysis" | "prescription" | "advice"
  data?: any
}

interface AIAnalysisResult {
  syndrome: string
  syndromeType: string
  treatment: string
  prescription: string[]
  acupuncturePoints: string[]
  lifestyleAdvice: string[]
  prognosis: string
  relatedSymptoms: string[]
}

// AI分析结果展示组件
function AnalysisResultCard({ result }: { result: AIAnalysisResult }) {
  return (
    <div className="space-y-4">
      {/* 证型判断 */}
      <div className="bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-6 h-6" />
          <span className="text-sm opacity-80">AI辨证结果</span>
        </div>
        <div className="text-2xl font-bold mb-1">{result.syndrome}</div>
        <div className="text-sm opacity-90">{result.syndromeType}</div>
      </div>

      {/* 治疗原则 */}
      <div className="bg-green-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-800">治疗原则</span>
        </div>
        <p className="text-green-700">{result.treatment}</p>
      </div>

      {/* 推荐方剂 */}
      {result.prescription.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">推荐方剂</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.prescription.map((formula, i) => (
              <button
                key={i}
                className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-all"
              >
                {formula}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 推荐穴位 */}
      {result.acupuncturePoints.length > 0 && (
        <div className="bg-red-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-800">针灸配穴</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.acupuncturePoints.map((point, i) => (
              <span key={i} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm">
                {point}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 养生建议 */}
      <div className="bg-amber-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-amber-600" />
          <span className="font-medium text-amber-800">养生建议</span>
        </div>
        <ul className="space-y-2">
          {result.lifestyleAdvice.map((advice, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
              <span className="text-amber-500">{i + 1}.</span>
              {advice}
            </li>
          ))}
        </ul>
      </div>

      {/* 预后 */}
      <div className="bg-purple-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-purple-800">预后调养</span>
        </div>
        <p className="text-purple-700 text-sm">{result.prognosis}</p>
      </div>
    </div>
  )
}

export function AIAnalysisSystem() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 模拟AI分析
  const performAnalysis = async (symptoms: string[]) => {
    setIsAnalyzing(true)

    // 模拟分析过程
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 简单的分析逻辑
    const symptomSet = new Set(symptoms)

    // 匹配证型
    let matchedPattern: any = null
    let maxMatch = 0

    Object.entries(SYNDROME_PATTERNS).forEach(([key, pattern]) => {
      const matchCount = pattern.symptoms.filter((s: string) => symptomSet.has(s)).length
      if (matchCount > maxMatch) {
        maxMatch = matchCount
        matchedPattern = { key, ...pattern }
      }
    })

    // 收集相关信息
    const relatedMeridians = new Set<string>()
    const relatedPoints = new Set<string>()
    const relatedOrgans = new Set<string>()

    symptoms.forEach(name => {
      const detail = getSymptomDetail(name)
      if (detail) {
        detail.relatedMeridians.forEach(m => relatedMeridians.add(m))
        detail.relatedPoints.forEach(p => relatedPoints.add(p))
        detail.relatedOrgans.forEach(o => relatedOrgans.add(o))
      }
    })

    // 生成结果
    const result: AIAnalysisResult = {
      syndrome: matchedPattern?.name || "综合辨证",
      syndromeType: matchedPattern?.treatment || "调理为主",
      treatment: matchedPattern?.treatment || "调和阴阳，扶正祛邪",
      prescription: matchedPattern?.herbs?.slice(0, 5) || generateHerbs(symptomSet),
      acupuncturePoints: Array.from(relatedPoints).slice(0, 6),
      lifestyleAdvice: generateLifestyleAdvice(symptomSet),
      prognosis: generatePrognosis(symptomSet),
      relatedSymptoms: symptoms
    }

    setAnalysisResult(result)
    setIsAnalyzing(false)

    // 添加AI消息
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: "assistant",
      content: `根据您描述的症状（${symptoms.join("、")}），我进行了综合分析。`,
      type: "analysis",
      data: result
    }])
  }

  // 生成养生建议
  const generateLifestyleAdvice = (symptoms: Set<string>) => {
    const advice: string[] = []

    if (symptoms.has("失眠") || symptoms.has("疲劳")) {
      advice.push("保持规律作息，晚上11点前入睡，避免熬夜伤阴")
    }
    if (symptoms.has("腰痛") || symptoms.has("关节疼痛")) {
      advice.push("避免久坐久站，适当进行柔和运动如太极拳、八段锦")
    }
    if (symptoms.has("胃痛") || symptoms.has("腹胀")) {
      advice.push("饮食定时定量，忌食生冷油腻，可按摩足三里、中脘穴")
    }
    if (symptoms.has("胸闷") || symptoms.has("心悸")) {
      advice.push("保持情绪舒畅，避免精神紧张，可练习深呼吸或静坐冥想")
    }

    advice.push("饮食均衡，多吃新鲜蔬果，少食辛辣刺激食物")
    advice.push("适度运动，如散步、太极、瑜伽等舒缓运动")
    advice.push("保持乐观心态，避免情绪波动过大")

    return advice.slice(0, 5)
  }

  // 生成预后
  const generatePrognosis = (symptoms: Set<string>) => {
    let prognosis = "根据您的症状特点，通过中医调理"

    if (symptoms.has("失眠") || symptoms.has("疲劳")) {
      prognosis += "配合养生调节，预计1-2周可明显改善"
    } else if (symptoms.has("腰痛") || symptoms.has("关节疼痛")) {
      prognosis += "需要坚持调理，预计2-4周可见到效果"
    } else {
      prognosis += "配合合理的生活方式，预计可逐渐恢复"
    }

    return prognosis + "。建议定期复诊，根据病情变化调整方案。"
  }

  // 根据症状生成草药建议
  const generateHerbs = (symptoms: Set<string>) => {
    if (symptoms.has("失眠")) return ["酸枣仁", "茯神", "远志", "五味子", "百合"]
    if (symptoms.has("腰痛")) return ["杜仲", "续断", "桑寄生", "枸杞子", "菟丝子"]
    if (symptoms.has("胃痛")) return ["陈皮", "半夏", "茯苓", "甘草", "白术"]
    return ["当归", "川芎", "白芍", "熟地", "黄芪"]
  }

  // 发送消息
  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")

    // 检查是否包含症状关键词
    const symptomKeywords = Object.keys(SYMPTOMS_DETAIL)
    const foundSymptoms = symptomKeywords.filter(s =>
      inputMessage.toLowerCase().includes(s.toLowerCase())
    )

    if (foundSymptoms.length > 0) {
      await performAnalysis(foundSymptoms)
    } else {
      // 通用回复
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "您好！我是您的中医AI健康顾问。请告诉我您目前的不适症状，我可以帮您进行初步的中医辨证分析，并给出调养建议。\n\n例如您可以说：'我最近失眠多梦，还有些腰痛'，我会为您进行综合分析。"
      }])
    }
  }

  // 快速提问
  const quickQuestions = [
    "我最近失眠多梦怎么办？",
    "经常腰痛应该如何调理？",
    "胃不好吃什么中药？",
    "手脚冰凉是什么体质？",
    "如何提高免疫力？"
  ]

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 顶部 */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0891b2] to-[#0e7490] flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI智能辨证</h2>
            <p className="text-sm text-gray-500">基于中医经典的智能分析系统</p>
          </div>
        </div>
      </div>

      {/* 分析结果 */}
      {analysisResult && !messages.some(m => m.type === "analysis") && (
        <div className="p-4">
          <AnalysisResultCard result={analysisResult} />
        </div>
      )}

      {/* 聊天消息 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <>
            {/* 欢迎信息 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0891b2]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#0891b2]" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">欢迎使用中医AI辨证系统</div>
                  <div className="text-xs text-gray-500">我可以帮您分析症状、推荐方案</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                本系统基于《黄帝内经》《伤寒论》《金匮要略》等中医经典，
                结合倪海厦等经方家临床经验，为您提供专业的中医辨证分析和调养建议。
              </p>
            </div>

            {/* 快速提问 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="text-sm font-medium text-gray-700 mb-3">您可以这样问我：</div>
              <div className="space-y-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInputMessage(q)}
                    className="w-full p-3 bg-gray-50 rounded-xl text-left text-sm text-gray-600 hover:bg-[#0891b2]/10 hover:text-[#0891b2] transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* 功能说明 */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Stethoscope, title: "症状分析", desc: "分析您的不适症状", color: "text-blue-600 bg-blue-50" },
                { icon: Brain, title: "证型判断", desc: "辨别中医证型", color: "text-purple-600 bg-purple-50" },
                { icon: FileText, title: "方剂推荐", desc: "推荐经典方剂", color: "text-green-600 bg-green-50" },
                { icon: Activity, title: "配穴建议", desc: "针灸配穴指导", color: "text-red-600 bg-red-50" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-2`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="font-medium text-gray-800 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {messages.map(message => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-[#0891b2] flex items-center justify-center mr-2 flex-shrink-0">
                <Brain className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] ${message.role === "user" ? "bg-[#0891b2] text-white" : "bg-white"} rounded-2xl p-4 shadow-sm`}>
              {message.type === "analysis" && message.data ? (
                <AnalysisResultCard result={message.data} />
              ) : (
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              )}
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {isAnalyzing && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0891b2] flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                AI正在分析您的症状...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="输入您的症状，如：失眠、腰痛、胃痛..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isAnalyzing}
            className="px-6 py-3 bg-[#0891b2] text-white rounded-xl font-medium hover:bg-[#0e7490] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <AlertCircle className="w-3 h-3" />
          <span>AI分析仅供参考，如有不适请及时就医</span>
        </div>
      </div>
    </div>
  )
}

// 综合健康报告组件
export function HealthReport({
  symptoms,
  onClose
}: {
  symptoms: string[]
  onClose: () => void
}) {
  const [report, setReport] = useState<AIAnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟生成报告
    setTimeout(() => {
      const result: AIAnalysisResult = {
        syndrome: "综合辨证",
        syndromeType: "需进一步诊断",
        treatment: "建议咨询专业中医师",
        prescription: [],
        acupuncturePoints: [],
        lifestyleAdvice: [
          "保持规律作息",
          "均衡饮食",
          "适度运动",
          "调畅情志",
          "定期体检"
        ],
        prognosis: "请咨询专业中医师进行详细诊断",
        relatedSymptoms: symptoms
      }
      setReport(result)
      setLoading(false)
    }, 1500)
  }, [symptoms])

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white rounded-3xl max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0891b2]" />
            <h3 className="font-bold text-gray-800">健康报告</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-[#0891b2] mx-auto mb-3" />
              <p className="text-gray-600">正在生成健康报告...</p>
            </div>
          ) : report ? (
            <AnalysisResultCard result={report} />
          ) : null}
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}
