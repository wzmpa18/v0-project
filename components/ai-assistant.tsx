"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Sparkles } from "lucide-react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { usePaipanContext, formatPaipanForAI } from "@/lib/paipan-context"

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

// 预设问题
const PRESET_QUESTIONS = [
  { text: "解析我的八字命盘", icon: "🔮" },
  { text: "分析我的五行旺衰", icon: "🌊" },
  { text: "我的调候用神如何", icon: "📖" },
  { text: "今年流年运势如何", icon: "✨" },
  { text: "婚姻感情分析", icon: "💕" },
  { text: "事业财运分析", icon: "💰" },
]

// 从 UIMessage 提取纯文本
function getMessageText(msg: UIMessage): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ""
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const { lastResult } = usePaipanContext()
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/bazi-chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return
    const baziContext = lastResult ? formatPaipanForAI(lastResult) : ""
    sendMessage({ text }, { body: { baziContext } })
    setInput("")
  }

  if (!isOpen) return null

  const hasBazi = lastResult?.type === "bazi"

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center">
      <div className="bg-white w-full max-w-lg h-[85vh] sm:h-[600px] sm:rounded-2xl rounded-t-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-[#d4af37] to-[#c49b30] px-4 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-medium">易学AI助手</h2>
              <p className="text-white/70 text-xs">
                {hasBazi ? "已读取您的真实命盘数据" : "可为您解答易学问题"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            aria-label="关闭"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f5f0]">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-[85%]">
                <p className="text-[#333] text-sm leading-relaxed">
                  您好，我是易学AI助手。
                  {hasBazi ? (
                    <>
                      <br />
                      <br />
                      我已读取到您的真实排盘数据（四柱、十神、神煞、大运、调候用神等），可以据此为您：
                      <br />• 解析命盘格局与日主旺衰
                      <br />• 分析五行与调候用神
                      <br />• 结合大运流年推断运势
                    </>
                  ) : (
                    <>
                      <br />
                      <br />
                      建议先完成八字排盘，我便能依据您的真实命盘进行分析；也可直接向我提问易学知识。
                    </>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {PRESET_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q.text)}
                    className="bg-white rounded-xl p-3 text-left shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-lg">{q.icon}</span>
                    <p className="text-[#333] text-sm mt-1">{q.text}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => {
                const text = getMessageText(msg)
                return (
                  <div
                    key={msg.id}
                    className={`${
                      msg.role === "user"
                        ? "ml-auto bg-[#d4af37] text-white rounded-2xl rounded-tr-sm"
                        : "bg-white text-[#333] rounded-2xl rounded-tl-sm shadow-sm"
                    } p-4 max-w-[85%]`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
                  </div>
                )
              })}
              {status === "submitted" && (
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-[#999] text-sm">正在推演...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* 输入区域 */}
        <div className="bg-white border-t border-[#f0f0f0] p-4 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend(input)}
              placeholder="输入您的问题..."
              className="flex-1 bg-[#f8f5f0] rounded-full px-4 py-3 text-sm text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 bg-[#d4af37] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              aria-label="发送"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
