"use client"

import { useState } from "react"
import { 
  User, Settings, BookmarkIcon, History, Bell, Moon, Sun, 
  ChevronRight, Heart, Star, Clock, Shield, HelpCircle, 
  MessageCircle, FileText, Award, Zap
} from "lucide-react"

// 用户统计数据
const USER_STATS = [
  { label: "排盘次数", value: 128, icon: Zap },
  { label: "收藏内容", value: 45, icon: BookmarkIcon },
  { label: "学习时长", value: "36h", icon: Clock },
  { label: "成就徽章", value: 8, icon: Award },
]

// 功能菜单
const MENU_ITEMS = [
  {
    section: "我的内容",
    items: [
      { id: "favorites", name: "我的收藏", icon: Heart, desc: "收藏的方剂、古籍等" },
      { id: "history", name: "历史记录", icon: History, desc: "排盘和浏览历史" },
      { id: "notes", name: "学习笔记", icon: FileText, desc: "个人学习笔记" },
      { id: "achievements", name: "成就徽章", icon: Award, desc: "学习成就和徽章" },
    ]
  },
  {
    section: "设置",
    items: [
      { id: "notifications", name: "消息通知", icon: Bell, desc: "推送和提醒设置" },
      { id: "theme", name: "主题设置", icon: Moon, desc: "深色/浅色模式" },
      { id: "privacy", name: "隐私安全", icon: Shield, desc: "数据和隐私管理" },
      { id: "settings", name: "通用设置", icon: Settings, desc: "应用偏好设置" },
    ]
  },
  {
    section: "其他",
    items: [
      { id: "feedback", name: "意见反馈", icon: MessageCircle, desc: "提交建议和问题" },
      { id: "help", name: "帮助中心", icon: HelpCircle, desc: "使用指南和FAQ" },
      { id: "about", name: "关于我们", icon: Star, desc: "应用版本和信息" },
    ]
  },
]

// VIP会员特权
const VIP_BENEFITS = [
  "无限次排盘分析",
  "专属AI深度解读",
  "古籍全本阅读",
  "名师课程畅学",
]

export function ProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isVIP, setIsVIP] = useState(false)

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24 bg-[#1a1a1a]">
      {/* 用户信息卡片 */}
      <div className="px-4 pt-6 pb-4">
        <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-2xl p-4 border border-[#4a4a4a]">
          <div className="flex items-center gap-4">
            {/* 头像 */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#c8102e] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              {isVIP && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#d4af37] rounded-full flex items-center justify-center border-2 border-[#1a1a1a]">
                  <Star className="w-3 h-3 text-[#1a1a1a]" fill="currentColor" />
                </div>
              )}
            </div>
            
            {/* 用户信息 */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[#f5f5f7] font-bold text-lg">国学爱好者</h2>
                {isVIP && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-[#d4af37] to-[#c8102e] text-[#1a1a1a] text-xs font-medium rounded-full">
                    VIP
                  </span>
                )}
              </div>
              <p className="text-[#c5c5c5] text-sm mt-0.5">探索传统智慧，修身养性</p>
              <button className="mt-2 text-[#d4af37] text-xs flex items-center gap-1">
                编辑资料 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 用户统计 */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-[#4a4a4a]">
            {USER_STATS.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-[#d4af37] font-bold text-lg">{stat.value}</div>
                <div className="text-[#c5c5c5] text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VIP会员卡片 */}
      {!isVIP && (
        <div className="px-4 mb-4">
          <div className="bg-gradient-to-r from-[#2a2010] to-[#1a1510] rounded-2xl p-4 border border-[#d4af37]/30 relative overflow-hidden">
            {/* 装饰 */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/10 rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[#d4af37]" fill="currentColor" />
                <span className="text-[#d4af37] font-bold">开通VIP会员</span>
              </div>
              <p className="text-[#c5c5c5] text-xs mb-3">解锁全部高级功能，享受专属特权</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {VIP_BENEFITS.map((benefit, i) => (
                  <span key={i} className="text-xs text-[#d4af37]/80 bg-[#d4af37]/10 px-2 py-0.5 rounded">
                    {benefit}
                  </span>
                ))}
              </div>
              
              <button 
                onClick={() => setIsVIP(true)}
                className="w-full py-2.5 bg-gradient-to-r from-[#d4af37] to-[#c8102e] text-[#1a1a1a] font-medium rounded-xl text-sm"
              >
                立即开通 · 首月仅需 ¥9.9
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 功能菜单 */}
      {MENU_ITEMS.map(section => (
        <div key={section.section} className="px-4 mb-4">
          <div className="text-[#c5c5c5] text-xs mb-2 ml-1">{section.section}</div>
          <div className="bg-[#252525] rounded-2xl border border-[#4a4a4a] overflow-hidden">
            {section.items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "theme") {
                    setIsDarkMode(!isDarkMode)
                  }
                }}
                className={`w-full flex items-center gap-3 p-4 hover:bg-[#2a2a2a] transition-colors ${
                  i < section.items.length - 1 ? "border-b border-[#4a4a4a]" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#1a1a1a] flex items-center justify-center">
                  {item.id === "theme" ? (
                    isDarkMode ? (
                      <Moon className="w-4.5 h-4.5 text-[#d4af37]" />
                    ) : (
                      <Sun className="w-4.5 h-4.5 text-[#d4af37]" />
                    )
                  ) : (
                    <item.icon className="w-4.5 h-4.5 text-[#d4af37]" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[#f5f5f7] text-sm font-medium">{item.name}</div>
                  <div className="text-[#c5c5c5] text-xs">{item.desc}</div>
                </div>
                {item.id === "theme" ? (
                  <div className={`w-10 h-6 rounded-full transition-colors ${
                    isDarkMode ? "bg-[#d4af37]" : "bg-[#555]"
                  } relative`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      isDarkMode ? "right-1" : "left-1"
                    }`} />
                  </div>
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 版本信息 */}
      <div className="text-center py-4">
        <p className="text-[#888] text-xs">国学宝典 v1.0.0</p>
        <p className="text-[#777] text-xs mt-1">传承智慧，启迪人生</p>
      </div>
    </div>
  )
}
