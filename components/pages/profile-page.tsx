"use client"

import { useState } from "react"
import { 
  User, ChevronRight, Download, Settings, Bell, 
  Shield, HelpCircle, Star, Crown, Moon, Sun,
  BookOpen, History, Heart, Share2, MessageCircle,
  LogOut, Smartphone, Database, Trash2, Info
} from "lucide-react"
import dynamic from "next/dynamic"

// 动态导入离线管理器
const OfflineManager = dynamic(
  () => import("@/components/offline-manager").then(mod => ({ default: mod.OfflineManager })),
  { ssr: false }
)

// 用户信息
interface UserInfo {
  name: string
  avatar?: string
  level: string
  vipExpiry?: string
  studyDays: number
  collections: number
  history: number
}

// 模拟用户数据
const mockUser: UserInfo = {
  name: "国学爱好者",
  level: "VIP会员",
  vipExpiry: "2026-12-31",
  studyDays: 128,
  collections: 56,
  history: 234,
}

// 功能菜单项
const MENU_SECTIONS = [
  {
    title: "学习数据",
    items: [
      { id: "history", name: "浏览历史", icon: History, badge: "234" },
      { id: "favorites", name: "我的收藏", icon: Heart, badge: "56" },
      { id: "notes", name: "学习笔记", icon: BookOpen },
      { id: "progress", name: "学习进度", icon: Star },
    ],
  },
  {
    title: "资源管理",
    items: [
      { id: "offline", name: "离线资源", icon: Download, desc: "管理已下载内容" },
      { id: "storage", name: "存储空间", icon: Database, desc: "45.2 MB / 500 MB" },
      { id: "cache", name: "清理缓存", icon: Trash2, desc: "释放存储空间" },
    ],
  },
  {
    title: "应用设置",
    items: [
      { id: "notification", name: "消息通知", icon: Bell },
      { id: "display", name: "显示设置", icon: Sun },
      { id: "privacy", name: "隐私设置", icon: Shield },
      { id: "device", name: "设备管理", icon: Smartphone },
    ],
  },
  {
    title: "帮助支持",
    items: [
      { id: "feedback", name: "意见反馈", icon: MessageCircle },
      { id: "share", name: "分享应用", icon: Share2 },
      { id: "help", name: "帮助中心", icon: HelpCircle },
      { id: "about", name: "关于我们", icon: Info },
    ],
  },
]

export function ProfilePage() {
  const [showOfflineManager, setShowOfflineManager] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const user = mockUser

  const handleMenuClick = (itemId: string) => {
    switch (itemId) {
      case "offline":
        setShowOfflineManager(true)
        break
      case "cache":
        if (confirm("确定要清理缓存吗？这不会删除已下载的离线资源。")) {
          alert("缓存已清理")
        }
        break
      case "display":
        setIsDarkMode(!isDarkMode)
        break
      default:
        console.log("点击了:", itemId)
    }
  }

  // 离线资源管理页面
  if (showOfflineManager) {
    return <OfflineManager onClose={() => setShowOfflineManager(false)} />
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] pb-24">
      {/* 用户信息卡片 */}
      <div className="px-4 pt-6 pb-4">
        <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-2xl p-4 border border-[#333]">
          <div className="flex items-center gap-4">
            {/* 头像 */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            
            {/* 用户信息 */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-white text-lg font-bold">{user.name}</h2>
                <div className="flex items-center gap-1 bg-[#d4af37]/20 px-2 py-0.5 rounded-full">
                  <Crown className="w-3 h-3 text-[#d4af37]" />
                  <span className="text-[#d4af37] text-xs font-medium">{user.level}</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                VIP有效期至 {user.vipExpiry}
              </p>
            </div>
            
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>

          {/* 统计数据 */}
          <div className="flex justify-around mt-4 pt-4 border-t border-[#333]">
            <div className="text-center">
              <div className="text-[#d4af37] text-xl font-bold">{user.studyDays}</div>
              <div className="text-gray-500 text-xs mt-0.5">学习天数</div>
            </div>
            <div className="text-center">
              <div className="text-[#d4af37] text-xl font-bold">{user.collections}</div>
              <div className="text-gray-500 text-xs mt-0.5">收藏内容</div>
            </div>
            <div className="text-center">
              <div className="text-[#d4af37] text-xl font-bold">{user.history}</div>
              <div className="text-gray-500 text-xs mt-0.5">浏览记录</div>
            </div>
          </div>
        </div>
      </div>

      {/* VIP特权提示 */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-[#d4af37]/20 to-[#b8860b]/10 rounded-xl p-3 border border-[#d4af37]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#d4af37]" />
              <span className="text-white text-sm font-medium">VIP专属特权</span>
            </div>
            <button className="text-[#d4af37] text-xs font-medium">
              查看全部 &gt;
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-1.5">
            无限制使用AI功能 | 3D模型高清版 | 去除广告 | 专属客服
          </p>
        </div>
      </div>

      {/* 功能菜单 */}
      {MENU_SECTIONS.map((section, sectionIndex) => (
        <div key={sectionIndex} className="px-4 mb-4">
          <h3 className="text-gray-500 text-xs font-medium mb-2 px-1">{section.title}</h3>
          <div className="bg-[#252525] rounded-xl overflow-hidden border border-[#333]">
            {section.items.map((item, itemIndex) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#2a2a2a] transition-colors ${
                  itemIndex < section.items.length - 1 ? "border-b border-[#333]" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#333] flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-white text-sm">{item.name}</span>
                  {item.desc && (
                    <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                  )}
                </div>
                {item.badge && (
                  <span className="text-[#d4af37] text-xs font-medium">{item.badge}</span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 退出登录 */}
      <div className="px-4 mt-6">
        <button className="w-full py-3 bg-[#252525] rounded-xl text-red-500 text-sm font-medium border border-[#333] flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          退出登录
        </button>
      </div>

      {/* 版本信息 */}
      <div className="text-center mt-6 pb-4">
        <p className="text-gray-600 text-xs">版本 1.0.0</p>
        <p className="text-gray-700 text-xs mt-1">传承经典 · 启迪智慧</p>
      </div>
    </div>
  )
}
