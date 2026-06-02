"use client"

import {
  Users,
  User,
  Search,
  Heart,
  MessageSquare,
  ChevronRight,
  Filter,
  MapPin,
  Calendar,
  Award,
  Star
} from "lucide-react"
import { useState } from "react"

interface UserProfile {
  id: string
  name: string
  avatar: string
  bio: string
  location: string
  tags: string[]
  followers: number
  isFollowing: boolean
  isOnline: boolean
}

const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "易道大师",
    avatar: "易",
    bio: "专注八字命理研究15年，喜欢探讨国学经典",
    location: "北京",
    tags: ["八字命理", "风水布局", "紫微斗数"],
    followers: 12880,
    isFollowing: false,
    isOnline: true
  },
  {
    id: "2",
    name: "墨香斋主",
    avatar: "墨",
    bio: "热爱中医，喜欢书法，愿与志同道合者交流",
    location: "上海",
    tags: ["中医养生", "书法艺术", "茶道"],
    followers: 8650,
    isFollowing: true,
    isOnline: false
  },
  {
    id: "3",
    name: "禅心居士",
    avatar: "禅",
    bio: "学习易经多年，喜欢打坐参禅，分享心得",
    location: "杭州",
    tags: ["易经", "禅宗", "打坐"],
    followers: 5200,
    isFollowing: false,
    isOnline: true
  },
  {
    id: "4",
    name: "医道传承",
    avatar: "医",
    bio: "中医临床实践，分享经方心得",
    location: "广州",
    tags: ["伤寒论", "针灸", "中药"],
    followers: 7530,
    isFollowing: false,
    isOnline: false
  },
  {
    id: "5",
    name: "紫微隐士",
    avatar: "隐",
    bio: "研究紫微斗数多年，擅长星曜解读",
    location: "成都",
    tags: ["紫微斗数", "星相学", "风水"],
    followers: 9200,
    isFollowing: true,
    isOnline: true
  }
]

export function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("recommend")
  const [followingIds, setFollowingIds] = useState<string[]>(["2", "5"])

  const handleToggleFollow = (id: string) => {
    setFollowingIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(fid => fid !== id)
      }
      return [...prev, id]
    })
  }

  const filteredUsers = mockUsers.filter(user => 
    user.name.includes(searchQuery) || 
    user.tags.some(tag => tag.includes(searchQuery))
  )

  const tabs = [
    { id: "recommend", label: "推荐", count: 5 },
    { id: "following", label: "关注", count: followingIds.length },
    { id: "nearby", label: "附近", count: 12 },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* 顶部搜索区域 */}
      <div className="px-4 pt-6 pb-4 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-xl font-bold text-gray-800">国学交友</h1>
          <span className="px-2 py-0.5 bg-[#d4af37]/10 text-[#d4af37] text-xs rounded-full">发现同道</span>
        </div>

        {/* 搜索栏 */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索同好、话题、地点..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0891b2]/20 focus:outline-none text-gray-800"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* 标签切换 */}
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#0891b2] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
              <span className={`ml-1 text-xs ${
                activeTab === tab.id ? "text-white/80" : "text-gray-500"
              }`}>({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 用户列表 */}
      <div className="px-4 py-4 space-y-3 pb-24">
        {filteredUsers.map(user => (
          <div
            key={user.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-start gap-3">
              {/* 头像 */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0891b2] to-[#d4af37] flex items-center justify-center text-white text-xl font-bold">
                  {user.avatar}
                </div>
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              {/* 用户信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">{user.name}</h3>
                    {user.isOnline && (
                      <span className="text-xs text-green-500">在线</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleToggleFollow(user.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      followingIds.includes(user.id)
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-[#0891b2] text-white hover:bg-[#0891b2]/90"
                    }`}
                  >
                    {followingIds.includes(user.id) ? "已关注" : "关注"}
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{user.bio}</p>

                <div className="flex items-center gap-3 mb-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{user.followers.toLocaleString()} 粉丝</span>
                  </div>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {user.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-[#d4af37]/10 text-[#d4af37] text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors">
                    <Heart className="w-4 h-4" />
                    打招呼
                  </button>
                  <button className="flex-1 py-2 bg-[#0891b2] hover:bg-[#0891b2]/90 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    私信
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 热门话题卡片 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">热门话题</h3>
            <button className="text-[#0891b2] text-sm">更多</button>
          </div>
          <div className="space-y-2">
            {[
              { topic: "#如何看懂八字盘#", count: "1.2万" },
              { topic: "#日常养生小技巧#", count: "8563" },
              { topic: "#新手学易经入门#", count: "5892" },
            ].map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-700">{item.topic}</span>
                <span className="text-xs text-gray-500">{item.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}