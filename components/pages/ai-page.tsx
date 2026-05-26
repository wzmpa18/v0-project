"use client"

import { useState, useRef } from "react"
import { 
  Sparkles, Send, Mic, Camera, Image, Copy, 
  RotateCcw, ChevronDown, BookOpen, Stethoscope,
  Compass, Calculator, History, Star, Shield
} from "lucide-react"

// AI助手类型
const AI_MODES = [
  { id: "general", name: "通用助手", icon: Sparkles, desc: "解答任何问题", color: "#d4af37" },
  { id: "yixue", name: "易学解读", icon: Compass, desc: "八字、奇门、六爻分析", color: "#8b5cf6" },
  { id: "tcm", name: "中医助手", icon: Stethoscope, desc: "经方、穴位、养生咨询", color: "#22c55e" },
  { id: "classics", name: "古籍解读", icon: BookOpen, desc: "古文翻译与注解", color: "#0891b2" },
]

// 快捷问题
const QUICK_QUESTIONS: Record<string, string[]> = {
  general: ["这个功能怎么使用？", "帮我解释一下这个概念", "有什么学习建议？"],
  yixue: ["帮我分析这个八字格局", "这个卦象有什么含义？", "如何理解十神关系？"],
  tcm: ["这个方剂的配伍原理是什么？", "这个穴位有什么作用？", "如何辨别寒热虚实？"],
  classics: ["帮我翻译这段古文", "这句话出自哪本书？", "古人这样说是什么意思？"],
}

// 隐私声明
const PRIVACY_NOTICE = "本AI助手仅供传统文化学习交流使用，所有内容仅供参考。中医相关建议不作为医疗诊断依据，如有健康问题请咨询专业医师。"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIPageProps {
  contextData?: {
    type: string
    content: string
    source: string
  }
}

export function AIPage({ contextData }: AIPageProps) {
  const [mode, setMode] = useState<string>("general")
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showModeSelector, setShowModeSelector] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentMode = AI_MODES.find(m => m.id === mode) || AI_MODES[0]

  // 模拟AI响应
  const generateResponse = async (question: string): Promise<string> => {
    // 根据模式生成不同的响应
    const responses: Record<string, string[]> = {
      general: [
        "这是一个很好的问题。让我为您详细解答...\n\n根据您的问题，我建议您可以从以下几个方面来理解：\n\n1. 首先，要明确核心概念\n2. 其次，结合实际应用场景\n3. 最后，多加练习和总结\n\n如果您还有其他疑问，随时可以继续问我。",
        "感谢您的提问！这个问题涉及到传统文化的核心内容。\n\n从学习的角度来看，建议您：\n- 先掌握基础理论\n- 再通过实践加深理解\n- 最后形成自己的知识体系",
      ],
      yixue: [
        "【八字分析】\n\n从您提供的信息来看，这个命局有以下特点：\n\n1. 日主强弱：需要综合月令、通根、透干等因素判断\n2. 格局取用：首先要确定格局，再定喜用神\n3. 十神配置：分析各十神的旺衰和作用关系\n\n【古籍参考】\n《滴天髓》云：何知其人富，财气通门户。\n\n建议结合大运流年综合分析。",
        "【卦象解读】\n\n此卦象显示：\n- 体用关系：体卦为主，用卦为宾\n- 生克分析：观察体用之间的五行生克\n- 应期推断：结合动爻和变卦判断时间\n\n【梅花易数】有云：体用生克，吉凶立判。",
      ],
      tcm: [
        "【方剂解析】\n\n从中医理论角度分析：\n\n1. 君臣佐使配伍：\n   - 君药：主治病证的核心药物\n   - 臣药：辅助君药加强疗效\n   - 佐药：制约或引导药性\n   - 使药：调和诸药或引经报使\n\n2. 辨证要点：\n   - 八纲辨证：阴阳、表里、寒热、虚实\n   - 六经辨证：太阳、阳明、少阳、太阴、少阴、厥阴\n\n【经典参考】\n《伤寒论》原文及历代名家注解可供深入学习。\n\n提示：以上内容仅供学习参考，不作为医疗诊断依据。",
        "【穴位功效】\n\n根据《针灸甲乙经》记载：\n\n1. 定位：该穴位于...\n2. 主治：善治...\n3. 配伍：常与...穴配合使用\n4. 刺法：直刺或斜刺...\n\n【子午流注】\n根据时辰不同，经气流注有所变化，最佳针灸时间为...\n\n提示：针灸操作需由专业人士进行。",
      ],
      classics: [
        "【原文】\n您提供的这段文字出自...\n\n【白话译文】\n这段话的意思是...\n\n【注解】\n历代名家对此有不同解读：\n1. 某某认为：...\n2. 某某则云：...\n\n【学习建议】\n理解古文需要结合时代背景和作者意图，建议多读多思。",
        "【典籍考证】\n\n这句话最早见于某书一书，原文为：\n...\n\n【历史背景】\n此书成书于...时期，作者...，主要论述...\n\n【现代应用】\n古人的智慧在今天依然有重要的参考价值...",
      ],
    }

    const modeResponses = responses[mode] || responses.general
    return modeResponses[Math.floor(Math.random() * modeResponses.length)]
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 1500))
      const response = await generateResponse(input)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("AI response error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#1a1a1a]">
      {/* 顶部模式选择器 */}
      <div className="flex-shrink-0 bg-[#252525] border-b border-[#333] px-4 py-3">
        <button
          onClick={() => setShowModeSelector(!showModeSelector)}
          className="flex items-center gap-2 px-3 py-2 bg-[#333] rounded-xl"
        >
          <currentMode.icon className="w-5 h-5" style={{ color: currentMode.color }} />
          <span className="text-white font-medium">{currentMode.name}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showModeSelector ? "rotate-180" : ""}`} />
        </button>

        {/* 模式下拉选择 */}
        {showModeSelector && (
          <div className="absolute left-4 right-4 mt-2 bg-[#333] rounded-xl border border-[#444] shadow-xl z-50">
            {AI_MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id)
                  setShowModeSelector(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#444] first:rounded-t-xl last:rounded-b-xl ${
                  mode === m.id ? "bg-[#444]" : ""
                }`}
              >
                <m.icon className="w-5 h-5" style={{ color: m.color }} />
                <div className="text-left">
                  <div className="text-white font-medium">{m.name}</div>
                  <div className="text-gray-500 text-xs">{m.desc}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${currentMode.color}20` }}
            >
              <currentMode.icon className="w-8 h-8" style={{ color: currentMode.color }} />
            </div>
            <h2 className="text-white text-xl font-bold mb-2">
              {currentMode.name}
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              {currentMode.desc}，有任何问题都可以问我
            </p>

            {/* 快捷问题 */}
            <div className="w-full max-w-sm space-y-2">
              <p className="text-gray-600 text-xs mb-2">快捷提问：</p>
              {QUICK_QUESTIONS[mode]?.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="w-full text-left px-4 py-3 bg-[#252525] rounded-xl text-gray-300 text-sm hover:bg-[#333] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* 隐私提示 */}
            <div className="mt-6 px-4">
              <div className="flex items-start gap-2 bg-[#252525] rounded-xl p-3">
                <Shield className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <p className="text-gray-500 text-xs leading-relaxed">
                  {PRIVACY_NOTICE}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-[#d4af37] text-black"
                      : "bg-[#252525] text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <div className={`text-xs mt-2 ${msg.role === "user" ? "text-black/60" : "text-gray-500"}`}>
                    {msg.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#252525] rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 底部输入区域 */}
      <div className="flex-shrink-0 bg-[#252525] border-t border-[#333] px-4 py-3">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-[#333] rounded-2xl px-4 py-2.5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="输入您的问题..."
              rows={1}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none resize-none text-sm"
              style={{ maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  )
}
