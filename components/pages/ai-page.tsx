"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, BookOpen, Stethoscope, Compass, Lightbulb, RotateCcw, Copy, Check } from "lucide-react"

// 预设问题
const QUICK_QUESTIONS = [
  { icon: Compass, label: "八字排盘", question: "帮我分析一下1990年5月15日上午10点出生的人的八字命盘" },
  { icon: Stethoscope, label: "中医问诊", question: "我最近容易疲劳、食欲不振、舌苔白腻，请帮我分析一下是什么证型" },
  { icon: BookOpen, label: "经典解读", question: "请解释《伤寒论》中\"太阳之为病，脉浮，头项强痛而恶寒\"这句话" },
  { icon: Lightbulb, label: "养生建议", question: "我是气虚体质，平时应该注意什么饮食和运动" },
]

// AI角色
const AI_ROLES = [
  { id: "general", name: "国学助手", desc: "综合解答易学、中医问题" },
  { id: "bazi", name: "命理师", desc: "专精八字、紫微斗数" },
  { id: "tcm", name: "中医顾问", desc: "专精中医辨证论治" },
  { id: "fengshui", name: "风水师", desc: "专精风水堪舆" },
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState("general")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // 模拟AI响应（实际项目中应调用AI API）
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
    
    const roleResponses: Record<string, string[]> = {
      general: [
        `感谢您的提问。根据传统国学智慧，我来为您分析：\n\n${userMessage.includes("八字") ? "八字命理是中国传统命理学的核心，通过年、月、日、时四柱八字来推演人生命运。建议您提供准确的出生时间以获得更精确的分析。" : ""}\n\n${userMessage.includes("中医") || userMessage.includes("症状") ? "从中医角度来看，您描述的症状可能与脾胃功能有关。建议进行详细的四诊（望闻问切）后再做判断。" : ""}\n\n如需进一步了解，请随时提问。\n\n**温馨提示**：本分析仅供参考，不能替代专业医师诊断或面对面咨询。`,
        `您好！这是一个很好的问题。\n\n从传统智慧的角度来看：\n\n1. **理论基础**：中国传统文化强调天人合一，认为人与自然息息相关。\n\n2. **实践应用**：无论是易学还是中医，都需要结合具体情况进行分析。\n\n3. **现代视角**：我们可以将传统智慧与现代科学相结合，取其精华。\n\n希望这个解答对您有所帮助！`,
      ],
      bazi: [
        `【命理分析】\n\n根据您提供的信息，我来进行八字命理分析：\n\n**四柱排盘**\n通过干支纪年法，我们可以推算出四柱八字，从而分析命主的先天格局。\n\n**五行分析**\n五行的平衡与否直接影响命主的性格特点和人生运势。\n\n**大运流年**\n结合大运和流年，我们可以看出不同人生阶段的运势起伏。\n\n**建议**\n请提供准确的出生年月日时（最好精确到时辰），以便进行更详细的分析。\n\n*注：命理分析仅供参考，人生还需靠自己努力。*`,
      ],
      tcm: [
        `【中医辨证分析】\n\n根据您描述的症状，初步分析如下：\n\n**主要表现**\n您提到的症状需要结合舌象、脉象综合判断。\n\n**可能证型**\n从症状来看，可能涉及以下几种证型：\n- 脾胃虚弱\n- 气血不足\n- 痰湿内蕴\n\n**调理建议**\n1. **饮食调理**：清淡饮食，避免生冷油腻\n2. **作息规律**：早睡早起，避免熬夜\n3. **适度运动**：太极、八段锦等柔和运动\n\n**推荐方药**（仅供参考）\n四君子汤加减：人参、白术、茯苓、甘草\n\n*重要提示：以上分析仅供学习参考，如有身体不适请及时就医。*`,
      ],
      fengshui: [
        `【风水堪舆分析】\n\n风水学是中国传统文化的重要组成部分，讲究人与环境的和谐统一。\n\n**基本原则**\n- 藏风聚气\n- 山环水抱\n- 明堂开阔\n\n**居家风水**\n住宅的朝向、格局、采光等都会影响居住者的运势。\n\n**化解方法**\n如有不利因素，可通过摆设、颜色等方式进行调整。\n\n如需详细分析，请提供房屋的朝向、户型图等信息。\n\n*温馨提示：风水学需结合实际情况综合分析，不可盲目迷信。*`,
      ],
    }
    
    const responses = roleResponses[selectedRole] || roleResponses.general
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    
    try {
      const response = await generateAIResponse(userMessage.content)
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
    setInputValue(question)
    inputRef.current?.focus()
  }

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleClearHistory = () => {
    setMessages([])
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#1a1a1a]">
      {/* 顶部标题栏 */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-[#333] bg-[#1a1a1a]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#c8102e] flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-[#f5f5f7] font-medium text-sm">国学AI助手</h1>
              <p className="text-[#888] text-xs">融合易学与中医智慧</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-lg bg-[#252525] text-[#888] hover:text-[#f5f5f7] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* AI角色选择 */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {AI_ROLES.map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs transition-all ${
                selectedRole === role.id
                  ? "bg-[#d4af37] text-[#1a1a1a] font-medium"
                  : "bg-[#252525] text-[#888] border border-[#333]"
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            {/* 欢迎界面 */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#c8102e]/20 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-[#d4af37]" />
            </div>
            <h2 className="text-[#f5f5f7] font-medium text-lg mb-2">欢迎使用国学AI助手</h2>
            <p className="text-[#888] text-sm text-center mb-6 max-w-xs">
              我可以帮您解答八字命理、中医养生、风水堪舆等传统国学问题
            </p>
            
            {/* 快捷问题 */}
            <div className="w-full max-w-sm space-y-2">
              <p className="text-[#888] text-xs text-center mb-3">试试这些问题</p>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q.question)}
                  className="w-full flex items-center gap-3 p-3 bg-[#252525] rounded-xl border border-[#333] hover:border-[#d4af37]/50 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <q.icon className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#f5f5f7] text-sm font-medium">{q.label}</div>
                    <div className="text-[#888] text-xs truncate">{q.question}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  message.role === "user" 
                    ? "bg-[#d4af37]" 
                    : "bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#d4af37]/30"
                }`}>
                  {message.role === "user" 
                    ? <User className="w-4 h-4 text-[#1a1a1a]" />
                    : <Bot className="w-4 h-4 text-[#d4af37]" />
                  }
                </div>
                <div className={`flex-1 max-w-[85%] ${message.role === "user" ? "text-right" : ""}`}>
                  <div className={`inline-block p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-[#d4af37] text-[#1a1a1a] rounded-tr-sm"
                      : "bg-[#252525] text-[#f5f5f7] rounded-tl-sm border border-[#333]"
                  }`}>
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mt-1 ml-1">
                      <button
                        onClick={() => handleCopy(message.content, message.id)}
                        className="p-1 text-[#888] hover:text-[#d4af37] transition-colors"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="text-[#555] text-xs">
                        {message.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* 加载状态 */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#d4af37]/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div className="bg-[#252525] rounded-2xl rounded-tl-sm p-3 border border-[#333]">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-[#333] bg-[#1a1a1a]">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-[#252525] rounded-2xl border border-[#333] focus-within:border-[#d4af37]/50 transition-colors">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="输入您的问题..."
              rows={1}
              className="w-full bg-transparent px-4 py-3 text-[#f5f5f7] text-sm placeholder:text-[#555] resize-none outline-none max-h-32"
              style={{ minHeight: "44px" }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="w-11 h-11 rounded-full bg-[#d4af37] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="w-5 h-5 text-[#1a1a1a]" />
          </button>
        </div>
        <p className="text-[#555] text-xs text-center mt-2">
          AI回复仅供参考，不能替代专业人士建议
        </p>
      </div>
    </div>
  )
}
