"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Sparkles, BookOpen, MessageCircle } from "lucide-react"
import { usePaipanContext, formatPaipanForAI } from "@/lib/paipan-context"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: number
}

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

// 预设问题
const PRESET_QUESTIONS = [
  { text: "解析我的八字命盘", icon: "🔮" },
  { text: "分析我的五行旺衰", icon: "🌊" },
  { text: "解释十神的含义", icon: "📖" },
  { text: "今年运势如何", icon: "✨" },
  { text: "婚姻感情分析", icon: "💕" },
  { text: "事业财运分析", icon: "💰" }
]

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const { lastResult } = usePaipanContext()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 当有新的排盘结果时，添加系统提示
  useEffect(() => {
    if (lastResult && isOpen) {
      const contextText = formatPaipanForAI(lastResult)
      if (contextText) {
        // 检查是否已经有相同的系统消息
        const hasExistingContext = messages.some(
          (m) => m.role === "system" && m.timestamp === lastResult.timestamp
        )
        if (!hasExistingContext) {
          setMessages((prev) => [
            ...prev,
            {
              role: "system",
              content: `📊 已获取到您的排盘数据，可以为您解读分析。`,
              timestamp: lastResult.timestamp
            }
          ])
        }
      }
    }
  }, [lastResult, isOpen])

  // 发送消息
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: Date.now()
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // 构建上下文
      const contextInfo = lastResult ? formatPaipanForAI(lastResult) : ""
      
      // 模拟AI响应（实际项目中应调用AI API）
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // 生成响应
      let response = generateResponse(text, lastResult)

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: Date.now()
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] AI响应错误:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "抱歉，处理您的请求时出现了问题，请稍后再试。",
          timestamp: Date.now()
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // 生成响应（模拟）
  const generateResponse = (query: string, result: typeof lastResult): string => {
    if (!result || result.type !== "bazi") {
      if (query.includes("八字") || query.includes("命盘")) {
        return "您还没有进行八字排盘，请先使用八字排盘功能生成您的命盘，然后我可以为您进行详细分析。\n\n点击【排盘工具】→【八字排盘】开始。"
      }
      if (query.includes("十神")) {
        return `**十神**是八字命理中的重要概念，根据日干与其他天干的关系确定：\n\n• **比肩**：与日干同性同五行\n• **劫财**：与日干异性同五行\n• **食神**：日干所生之同性\n• **伤官**：日干所生之异性\n• **偏财**：日干所克之同性\n• **正财**：日干所克之异性\n• **七杀**：克日干之同性\n• **正官**：克日干之异性\n• **偏印**：生日干之同性\n• **正印**：生日干之异性`
      }
      return "欢迎使用易学AI助手！我可以帮您解读八字、分析运势、解答易学问题。\n\n请先进行排盘，或直接向我提问易学相关问题。"
    }

    const bazi = result.data
    const dayGan = bazi.day?.gan || "日干"
    const monthZhi = bazi.month?.zhi || "月支"

    if (query.includes("八字") || query.includes("命盘") || query.includes("解析")) {
      return `**您的八字命盘分析**\n\n` +
        `四柱：${bazi.year?.gan}${bazi.year?.zhi} ${bazi.month?.gan}${bazi.month?.zhi} ${bazi.day?.gan}${bazi.day?.zhi} ${bazi.hour?.gan}${bazi.hour?.zhi}\n\n` +
        `**日主分析**\n` +
        `您的日主为「${dayGan}」，${getDayGanDescription(dayGan)}\n\n` +
        `**月令分析**\n` +
        `生于「${monthZhi}」月，${getMonthZhiDescription(monthZhi)}\n\n` +
        `如需更详细的分析，请告诉我您想了解哪个方面（事业、婚姻、财运等）。`
    }

    if (query.includes("五行")) {
      return `**五行旺衰分析**\n\n` +
        `根据您的八字 ${bazi.year?.gan}${bazi.year?.zhi} ${bazi.month?.gan}${bazi.month?.zhi} ${bazi.day?.gan}${bazi.day?.zhi} ${bazi.hour?.gan}${bazi.hour?.zhi}：\n\n` +
        `• 日主「${dayGan}」五行属${getTianGanWuxing(dayGan)}\n` +
        `• 生于「${monthZhi}」月，${getMonthWuxingStatus(dayGan, monthZhi)}\n\n` +
        `**调候建议**\n` +
        `${getTiaohouSuggestion(dayGan, monthZhi)}`
    }

    if (query.includes("运势") || query.includes("今年")) {
      const currentYear = new Date().getFullYear()
      return `**${currentYear}年运势分析**\n\n` +
        `基于您的八字命盘，今年的整体运势分析如下：\n\n` +
        `• 事业方面：适合稳中求进，不宜冒险\n` +
        `• 财运方面：正财稳定，偏财需谨慎\n` +
        `• 感情方面：单身者有桃花运，已婚者注意沟通\n` +
        `• 健康方面：注意休息，避免过度劳累\n\n` +
        `*此为简要分析，详细运势需结合大运流年具体推算*`
    }

    if (query.includes("婚姻") || query.includes("感情")) {
      return `**婚姻感情分析**\n\n` +
        `根据您的八字「${bazi.day?.gan}${bazi.day?.zhi}」日柱分析：\n\n` +
        `日主「${dayGan}」的婚姻特点：\n` +
        `• ${getMarriageDescription(dayGan)}\n\n` +
        `建议：多沟通、多理解、多包容，感情需要双方共同经营。`
    }

    if (query.includes("事业") || query.includes("财运")) {
      return `**事业财运分析**\n\n` +
        `根据您的八字命盘分析：\n\n` +
        `**适合的行业方向**\n` +
        `• ${getCareerSuggestion(dayGan)}\n\n` +
        `**财运特点**\n` +
        `• 正财为主，宜稳定收入\n` +
        `• 投资理财需谨慎，不宜投机\n\n` +
        `*具体建议需结合大运流年综合分析*`
    }

    return `我理解您想了解关于"${query}"的内容。\n\n` +
      `基于您的八字 ${bazi.year?.gan}${bazi.year?.zhi} ${bazi.month?.gan}${bazi.month?.zhi} ${bazi.day?.gan}${bazi.day?.zhi} ${bazi.hour?.gan}${bazi.hour?.zhi}，我可以为您分析：\n\n` +
      `• 命盘整体格局\n• 五行旺衰\n• 十神分布\n• 大运流年\n• 婚姻事业财运\n\n` +
      `请告诉我您具体想了解哪个方面？`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center">
      <div className="bg-white w-full max-w-lg h-[80vh] sm:h-[600px] sm:rounded-2xl rounded-t-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-[#d4af37] to-[#c49b30] px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-medium">易学AI助手</h2>
              <p className="text-white/70 text-xs">
                {lastResult ? "已获取排盘数据" : "可以为您解答易学问题"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f5f0]">
          {messages.length === 0 ? (
            <div className="space-y-4">
              {/* 欢迎消息 */}
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-[85%]">
                <p className="text-[#333] text-sm leading-relaxed">
                  您好！我是易学AI助手 ✨
                  {lastResult?.type === "bazi" ? (
                    <>
                      <br /><br />
                      我已获取到您的八字排盘数据，可以为您：
                      <br />• 解析命盘格局
                      <br />• 分析五行旺衰
                      <br />• 预测运势变化
                      <br />• 解答易学问题
                    </>
                  ) : (
                    <>
                      <br /><br />
                      我可以帮您解读八字命盘、分析运势、解答易学问题。
                      <br /><br />
                      请先进行排盘，或选择下方的快捷问题开始。
                    </>
                  )}
                </p>
              </div>

              {/* 预设问题 */}
              <div className="grid grid-cols-2 gap-2">
                {PRESET_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q.text)}
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
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`${
                    msg.role === "user"
                      ? "ml-auto bg-[#d4af37] text-white rounded-2xl rounded-tr-sm"
                      : msg.role === "system"
                      ? "mx-auto bg-[#e8e5e0] text-[#666] rounded-full px-4 py-2 text-xs"
                      : "bg-white text-[#333] rounded-2xl rounded-tl-sm shadow-sm"
                  } ${msg.role !== "system" ? "p-4 max-w-[85%]" : ""}`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-[#999] text-sm">正在思考...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* 输入区域 */}
        <div className="bg-white border-t border-[#f0f0f0] p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
              placeholder="输入您的问题..."
              className="flex-1 bg-[#f8f5f0] rounded-full px-4 py-3 text-sm text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 bg-[#d4af37] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 辅助函数
function getDayGanDescription(gan: string): string {
  const descriptions: Record<string, string> = {
    "甲": "如参天大树，正直向上，有领导才能",
    "乙": "如藤蔓花草，柔韧灵活，善于适应",
    "丙": "如太阳光辉，热情开朗，具有感染力",
    "丁": "如烛火星光，细腻温和，聪明敏锐",
    "戊": "如高山大地，稳重可靠，包容大度",
    "己": "如田园沃土，温和务实，善于经营",
    "庚": "如刀剑锐器，刚强果断，重情重义",
    "辛": "如珠宝首饰，精致敏感，追求完美",
    "壬": "如江河大海，智慧深邃，变通能力强",
    "癸": "如雨露甘霖，聪慧细腻，善解人意"
  }
  return descriptions[gan] || "性格独特，各有所长"
}

function getMonthZhiDescription(zhi: string): string {
  const descriptions: Record<string, string> = {
    "子": "冬月水旺，宜火暖身",
    "丑": "腊月湿土，金水进气",
    "寅": "正月木旺，万物萌发",
    "卯": "二月木旺，草木繁茂",
    "辰": "三月湿土，水木余气",
    "巳": "四月火旺，阳气盛极",
    "午": "五月火旺，炎炎夏日",
    "未": "六月燥土，火气余存",
    "申": "七月金旺，秋风送爽",
    "酉": "八月金旺，金气纯粹",
    "戌": "九月燥土，金火余气",
    "亥": "十月水旺，万物收藏"
  }
  return descriptions[zhi] || "季节特点明显"
}

function getTianGanWuxing(gan: string): string {
  const map: Record<string, string> = {
    "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土",
    "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水"
  }
  return map[gan] || "未知"
}

function getMonthWuxingStatus(gan: string, zhi: string): string {
  const ganWuxing = getTianGanWuxing(gan)
  const monthWuxing: Record<string, string> = {
    "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火",
    "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水"
  }
  const mw = monthWuxing[zhi] || "土"
  
  if (ganWuxing === mw) return "得令，日主有力"
  return "月令为" + mw + "，需看整体配合"
}

function getTiaohouSuggestion(gan: string, zhi: string): string {
  return `根据「${gan}」日主生于「${zhi}」月的特点，调候用神建议参考古籍《穷通宝鉴》相关章节进行详细分析。`
}

function getMarriageDescription(gan: string): string {
  const descriptions: Record<string, string> = {
    "甲": "性格直率，婚姻宜找温柔体贴之人",
    "乙": "温和浪漫，感情细腻，重视精神交流",
    "丙": "热情主动，婚姻生活丰富多彩",
    "丁": "内敛深情，对感情专一执着",
    "戊": "稳重可靠，婚姻重视责任和承诺",
    "己": "温和体贴，善于照顾家庭",
    "庚": "重情重义，对伴侣有保护欲",
    "辛": "追求完美，对感情有高标准",
    "壬": "智慧变通，婚姻需要新鲜感",
    "癸": "敏感细腻，重视心灵契合"
  }
  return descriptions[gan] || "婚姻需要双方共同经营"
}

function getCareerSuggestion(gan: string): string {
  const suggestions: Record<string, string> = {
    "甲": "适合管理、教育、环保、木材等行业",
    "乙": "适合文化、艺术、服装、花卉等行业",
    "丙": "适合能源、娱乐、传媒、餐饮等行业",
    "丁": "适合科技、教育、文化、心理等行业",
    "戊": "适合建筑、房产、农业、矿业等行业",
    "己": "适合农业、服务、陶瓷、畜牧等行业",
    "庚": "适合金融、法律、机械、交通等行业",
    "辛": "适合金融、珠宝、医疗、精密仪器等行业",
    "壬": "适合物流、旅游、贸易、水利等行业",
    "癸": "适合教育、咨询、心理、医疗等行业"
  }
  return suggestions[gan] || "可从事多种行业，关键在于发挥自身优势"
}
