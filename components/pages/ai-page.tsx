"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, BookOpen, Stethoscope, Compass, Lightbulb, RotateCcw, Copy, Check, X } from "lucide-react"
import { usePaipanContext, formatPaipanForAI } from "@/lib/paipan-context"

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
  const [showPaipanHint, setShowPaipanHint] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  // 获取排盘上下文
  const { lastResult, clearResult } = usePaipanContext()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    // 构建发往 API 的历史（ModelMessage 格式）
    const history = [...messages, userMessage].map((m) => ({ role: m.role, content: m.content }))
    const baziContext = lastResult ? formatPaipanForAI(lastResult) : ""

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    const assistantId = (Date.now() + 1).toString()
    let assistantCreated = false

    try {
      const res = await fetch("/api/bazi-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, role: selectedRole, baziContext }),
      })

      if (!res.ok || !res.body) throw new Error("请求失败")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      let fullText = ""

      const pushDelta = (delta: string) => {
        fullText += delta
        if (!assistantCreated) {
          assistantCreated = true
          setMessages((prev) => [
            ...prev,
            { id: assistantId, role: "assistant", content: fullText, timestamp: new Date() },
          ])
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: fullText } : m)),
          )
        }
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""
        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith("data:")) continue
          const data = trimmed.slice(5).trim()
          if (data === "[DONE]") continue
          try {
            const chunk = JSON.parse(data)
            if ((chunk.type === "text-delta" || chunk.type === "text") && chunk.delta) {
              pushDelta(chunk.delta)
            }
          } catch {
            /* 忽略无法解析的片段 */
          }
        }
      }

      if (!assistantCreated) {
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "（未收到回复，请重试）", timestamp: new Date() },
        ])
      }
    } catch (error) {
      console.error("[v0] AI response error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "抱歉，AI 服务暂时不可用，请稍后再试。",
          timestamp: new Date(),
        },
      ])
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
      <div className="flex-shrink-0 px-4 py-3 border-b border-[#4a4a4a] bg-[#1a1a1a]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#c8102e] flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-[#f5f5f7] font-medium text-sm">国学AI助手</h1>
              <p className="text-[#c5c5c5] text-xs">融合易学与中医智慧</p>
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
                  : "bg-[#252525] text-[#c5c5c5] border border-[#4a4a4a]"
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* 排盘上下文提示卡片 */}
        {lastResult && showPaipanHint && (
          <div className="mb-4 p-3 bg-gradient-to-r from-[#d4af37]/10 to-[#c8102e]/10 rounded-xl border border-[#d4af37]/30">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-[#d4af37] text-sm font-medium">
                    检测到排盘结果
                  </span>
                </div>
                <p className="text-[#c5c5c5] text-xs mb-2">
                  {lastResult.type === "bazi" && `四柱：${lastResult.data.year?.gan}${lastResult.data.year?.zhi} ${lastResult.data.month?.gan}${lastResult.data.month?.zhi} ${lastResult.data.day?.gan}${lastResult.data.day?.zhi} ${lastResult.data.hour?.gan}${lastResult.data.hour?.zhi}`}
                </p>
                <button
                  onClick={() => {
                    const prompt = lastResult.type === "bazi" 
                      ? `请帮我分析这个八字命盘：${lastResult.data.year?.gan}${lastResult.data.year?.zhi}年 ${lastResult.data.month?.gan}${lastResult.data.month?.zhi}月 ${lastResult.data.day?.gan}${lastResult.data.day?.zhi}日 ${lastResult.data.hour?.gan}${lastResult.data.hour?.zhi}时，日主${lastResult.data.day?.gan}，请从格局、用神、性格、事业、财运、婚姻等方面进行分析。`
                      : "请帮我分析这个排盘结果"
                    setInputValue(prompt)
                    inputRef.current?.focus()
                  }}
                  className="px-3 py-1.5 bg-[#d4af37] text-[#1a1a1a] text-xs font-medium rounded-lg"
                >
                  让AI分析此命盘
                </button>
              </div>
              <button
                onClick={() => {
                  setShowPaipanHint(false)
                  clearResult()
                }}
                className="p-1 text-[#888] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            {/* 欢迎界面 */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#c8102e]/20 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-[#d4af37]" />
            </div>
            <h2 className="text-[#f5f5f7] font-medium text-lg mb-2">欢迎使用国学AI助手</h2>
            <p className="text-[#c5c5c5] text-sm text-center mb-6 max-w-xs">
              我可以帮您解答八字命理、中医养生、风水堪舆等传统国学问题
            </p>
            
            {/* 快捷问题 */}
            <div className="w-full max-w-sm space-y-2">
              <p className="text-[#c5c5c5] text-xs text-center mb-3">试试这些问题</p>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q.question)}
                  className="w-full flex items-center gap-3 p-3 bg-[#252525] rounded-xl border border-[#4a4a4a] hover:border-[#d4af37]/50 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <q.icon className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#f5f5f7] text-sm font-medium">{q.label}</div>
                    <div className="text-[#c5c5c5] text-xs truncate">{q.question}</div>
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
      <div className="flex-shrink-0 px-4 py-3 border-t border-[#4a4a4a] bg-[#1a1a1a]">
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
              className="w-full bg-transparent px-4 py-3 text-[#f5f5f7] text-sm placeholder:text-[#888] resize-none outline-none max-h-32"
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
        <p className="text-[#888] text-xs text-center mt-2">
          AI回复仅供参考，不能替代专业人士建议
        </p>
      </div>
    </div>
  )
}
