"use client"

import {
  User,
  Settings,
  Heart,
  Calendar,
  Bookmark,
  MessageSquare,
  Users,
  Award,
  Share2,
  LogOut,
  Bell,
  Moon,
  ChevronRight,
  Camera,
  Edit3
} from "lucide-react"

interface MenuItem {
  id: string
  label: string
  icon: any
  color: string
  badge?: string
}

const menuItems: MenuItem[] = [
  { id: "profile", label: "编辑资料", icon: Edit3, color: "#0891b2" },
  { id: "favorites", label: "我的收藏", icon: Heart, color: "#c8102e", badge: "12" },
  { id: "history", label: "浏览记录", icon: Calendar, color: "#10b981" },
  { id: "bookmarks", label: "保存内容", icon: Bookmark, color: "#8b5cf6" },
  { id: "messages", label: "消息中心", icon: MessageSquare, color: "#f59e0b", badge: "3" },
  { id: "friends", label: "好友列表", icon: Users, color: "#ec4899" },
  { id: "achievements", label: "成就徽章", icon: Award, color: "#d4af37" },
  { id: "share", label: "分享给好友", icon: Share2, color: "#06b6d4" },
  { id: "notifications", label: "通知设置", icon: Bell, color: "#f97316" },
  { id: "appearance", label: "外观设置", icon: Moon, color: "#64748b" },
  { id: "settings", label: "系统设置", icon: Settings, color: "#6b7280" },
]

export function ProfilePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* 顶部个人信息区域 */}
      <div className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2]/10 via-[#d4af37]/10 to-[#c8102e]/10" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#d4af37]/10 rounded-full blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#0891b2]/10 rounded-full blur-2xl" />

        <div className="relative px-4 pt-6 pb-8">
          {/* 个人信息卡片 */}
          <div className="flex items-center gap-4 mb-6">
            {/* 头像区域 */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0891b2] to-[#d4af37] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                国
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* 个人信息 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-800">国学爱好者</h2>
                <span className="px-2 py-0.5 bg-[#d4af37]/10 text-[#d4af37] text-xs rounded-full">VIP</span>
              </div>
              <p className="text-gray-500 text-sm mb-2">ID: 88886666</p>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-gray-800">128</div>
                  <div className="text-gray-500 text-xs">关注</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800">256</div>
                  <div className="text-gray-500 text-xs">粉丝</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800">520</div>
                  <div className="text-gray-500 text-xs">获赞</div>
                </div>
              </div>
            </div>

            {/* 编辑按钮 */}
            <button className="px-4 py-2 bg-[#0891b2] text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all">
              编辑
            </button>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: "连续打卡", value: "15", icon: "🔥", color: "#f97316" },
              { label: "总学习", value: "128h", icon: "📚", color: "#0891b2" },
              { label: "分享数", value: "23", icon: "✨", color: "#d4af37" },
              { label: "积分", value: "8888", icon: "🎁", color: "#c8102e" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="font-bold text-gray-800 text-sm">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 功能菜单区域 */}
      <div className="px-4 space-y-4 pb-24">
        {/* 第一组菜单 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <span className="text-gray-800">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="w-5 h-5 bg-[#c8102e] text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* 第二组菜单 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.slice(4, 8).map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <span className="text-gray-800">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="w-5 h-5 bg-[#c8102e] text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* 第三组菜单 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.slice(8).map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <span className="text-gray-800">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="w-5 h-5 bg-[#c8102e] text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* 退出登录按钮 */}
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white rounded-2xl shadow-sm border border-gray-100 text-[#c8102e] hover:bg-[#c8102e]/5 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">退出登录</span>
        </button>
      </div>
    </div>
  )
}