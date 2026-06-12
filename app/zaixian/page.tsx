"use client"

import { useState } from "react"
import { MessageCircle, Send, Phone, Mail, Clock, HelpCircle, Star, User } from "lucide-react"

const FAQ_DATA = [
  {
    question: "八字命理分析需要提供哪些信息？",
    answer: "需要提供您的出生日期（年、月、日）、出生时间（小时）和性别。出生时间越准确，分析结果越精确。",
  },
  {
    question: "紫微斗数排盘与八字命理有什么区别？",
    answer: "八字命理以日主为核心，分析五行生克关系；紫微斗数以命宫为核心，分析星辰分布格局。两者是不同的命理体系，可相互参考。",
  },
  {
    question: "如何选择适合自己的合作伙伴？",
    answer: "可以使用我们的合伙人匹配功能，输入双方的生辰八字，系统会根据五行相生相克、生肖合冲等因素进行分析，给出匹配建议。",
  },
  {
    question: "中医体质辨识有什么作用？",
    answer: "体质辨识可以帮助您了解自己的身体特质，根据体质特点进行养生调理，选择适合的饮食、运动和生活方式，达到预防疾病、强身健体的目的。",
  },
  {
    question: "经络穴位如何查询？",
    answer: "在人体经络模型页面，您可以查看十二正经、奇经八脉和董氏奇穴的分布，点击穴位可查看详细信息，包括定位、功效、主治等。",
  },
]

export default function ZaiXianPage() {
  const [message, setMessage] = useState("")
  const [showFAQ, setShowFAQ] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!message.trim()) {
      alert("请输入您的咨询内容")
      return
    }
    setSubmitted(true)
    setTimeout(() => {
      setMessage("")
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-cyan-400">在线咨询</h1>
            <p className="text-xs text-cyan-200/60">专业命理咨询服务</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        {/* 服务介绍 */}
        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-4 border border-cyan-800/30 mb-4">
          <h3 className="text-sm font-medium text-cyan-400 mb-3">服务内容</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">八字命理咨询</span>
              </div>
              <p className="text-xs text-gray-400">专业八字排盘、大运流年分析、人生运势指导</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">紫微斗数咨询</span>
              </div>
              <p className="text-xs text-gray-400">紫微排盘、命宫分析、格局解读</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">奇门遁甲咨询</span>
              </div>
              <p className="text-xs text-gray-400">奇门预测、择吉选时、决策指导</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">中医健康咨询</span>
              </div>
              <p className="text-xs text-gray-400">体质辨识、经络调理、养生建议</p>
            </div>
          </div>
        </div>

        {/* FAQ切换 */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-4">
          <button
            onClick={() => setShowFAQ(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              showFAQ ? "bg-cyan-900/50 text-cyan-400" : "text-gray-400"
            }`}
          >
            常见问题
          </button>
          <button
            onClick={() => setShowFAQ(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              !showFAQ ? "bg-cyan-900/50 text-cyan-400" : "text-gray-400"
            }`}
          >
            联系我们
          </button>
        </div>

        {/* 常见问题 */}
        {showFAQ && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
            <div className="space-y-3">
              {FAQ_DATA.map((item, idx) => (
                <div key={idx} className="border-b border-white/10 pb-3 last:border-0">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white mb-1">{item.question}</div>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 联系我们 */}
        {!showFAQ && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-900/40 flex items-center justify-center">
                <Phone className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">咨询电话</div>
                <div className="text-lg font-bold text-white">400-888-8888</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-900/40 flex items-center justify-center">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">电子邮箱</div>
                <div className="text-lg font-bold text-white">support@example.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-900/40 flex items-center justify-center">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">服务时间</div>
                <div className="text-lg font-bold text-white">周一至周日 9:00-21:00</div>
              </div>
            </div>
          </div>
        )}

        {/* 在线留言 */}
        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-4 border border-cyan-800/30">
          <h3 className="text-sm font-medium text-cyan-400 mb-3">在线留言</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="请输入您的称呼"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="请输入您的咨询内容，我们会尽快回复..."
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
            />
            <button
              onClick={handleSubmit}
              disabled={!message.trim() || submitted}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                submitted
                  ? "bg-green-600 text-white"
                  : message.trim()
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {submitted ? (
                <>
                  <Star className="w-4 h-4" />
                  提交成功，我们会尽快回复
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  提交咨询
                </>
              )}
            </button>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <h3 className="text-sm font-medium text-amber-400 mb-2">温馨提示</h3>
          <ul className="space-y-1">
            <li className="text-xs text-amber-100/70">• 命理咨询仅供参考，不能替代专业医疗诊断和治疗</li>
            <li className="text-xs text-amber-100/70">• 请如实提供出生信息，以便获得更准确的分析结果</li>
            <li className="text-xs text-amber-100/70">• 我们承诺保护您的隐私，所有信息仅用于咨询服务</li>
            <li className="text-xs text-amber-100/70">• 在线留言一般在24小时内回复，请耐心等待</li>
          </ul>
        </div>
      </main>
    </div>
  )
}