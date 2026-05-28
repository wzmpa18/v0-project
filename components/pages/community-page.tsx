"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Search, Plus, Heart, MessageCircle, Share2, MoreHorizontal, Image, Send, Users, UserPlus, MapPin, Settings, X, Camera } from "lucide-react"

// Mock数据
const MOCK_POSTS = [
  {
    id: 1,
    author: { name: "易道玄机", avatar: "🧙", level: "大师" },
    content: "今日六爻占卜心得：世应相生，诸事皆宜。但需注意官鬼持世，做事宜低调谨慎。",
    images: [],
    likes: 128,
    comments: 23,
    shares: 8,
    time: "2小时前",
    liked: false
  },
  {
    id: 2,
    author: { name: "杏林春暖", avatar: "👨‍⚕️", level: "中医师" },
    content: "分享一个养肝的小方子：枸杞菊花茶，每天一杯，清肝明目。春季正是养肝好时节！",
    images: ["/placeholder.jpg"],
    likes: 256,
    comments: 45,
    shares: 32,
    time: "3小时前",
    liked: true
  },
  {
    id: 3,
    author: { name: "命理研究者", avatar: "📚", level: "学者" },
    content: "八字中的食神生财格局，是最适合经商的命格之一。食神代表才华和口才，财星代表财富，两者相生，自然财源广进。",
    images: [],
    likes: 89,
    comments: 15,
    shares: 5,
    time: "5小时前",
    liked: false
  },
]

const MOCK_GROUPS = [
  { id: 1, name: "八字命理交流群", avatar: "🔮", members: 1280, desc: "探讨八字命理，交流学习心得" },
  { id: 2, name: "中医养生俱乐部", avatar: "🏥", members: 856, desc: "分享中医养生知识和经验" },
  { id: 3, name: "易经读书会", avatar: "📖", members: 562, desc: "一起研读易经，领悟大道" },
  { id: 4, name: "风水堪舆研究", avatar: "🧭", members: 423, desc: "交流风水知识，分享实战经验" },
]

const MOCK_NEARBY = [
  { id: 1, name: "道法自然", avatar: "🌿", distance: "1.2km", tags: ["中医", "养生"], intro: "热爱传统文化" },
  { id: 2, name: "紫微星君", avatar: "⭐", distance: "2.5km", tags: ["紫微", "八字"], intro: "命理爱好者" },
  { id: 3, name: "玄空居士", avatar: "🏠", distance: "3.8km", tags: ["风水", "奇门"], intro: "风水实践者" },
]

const SENSITIVE_WORDS = ["诈骗", "色情", "赌博", "毒品", "传销"]

interface CommunityPageProps {
  onBack?: () => void
}

export function CommunityPage({ onBack }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState<"posts" | "groups" | "chat" | "nearby">("posts")
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showChat, setShowChat] = useState<number | null>(null)
  const [newPostContent, setNewPostContent] = useState("")
  const [chatMessages, setChatMessages] = useState<{id: number, text: string, isMe: boolean, time: string}[]>([
    { id: 1, text: "您好，请问有什么可以帮助您的？", isMe: false, time: "10:00" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDesc, setNewGroupDesc] = useState("")

  // 敏感词过滤
  const filterContent = (content: string): { filtered: string, hasSensitive: boolean } => {
    let filtered = content
    let hasSensitive = false
    SENSITIVE_WORDS.forEach(word => {
      if (content.includes(word)) {
        hasSensitive = true
        filtered = filtered.replace(new RegExp(word, 'g'), '***')
      }
    })
    return { filtered, hasSensitive }
  }

  // 发帖
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return
    const { filtered, hasSensitive } = filterContent(newPostContent)
    if (hasSensitive) {
      alert("您的内容包含敏感词，已自动过滤")
    }
    const newPost = {
      id: Date.now(),
      author: { name: "我", avatar: "👤", level: "会员" },
      content: filtered,
      images: [],
      likes: 0,
      comments: 0,
      shares: 0,
      time: "刚刚",
      liked: false
    }
    setPosts([newPost, ...posts])
    setNewPostContent("")
    setShowCreatePost(false)
    
    // 保存到localStorage
    const savedPosts = JSON.parse(localStorage.getItem('community_posts') || '[]')
    savedPosts.unshift(newPost)
    localStorage.setItem('community_posts', JSON.stringify(savedPosts))
  }

  // 点赞
  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        }
      }
      return post
    }))
  }

  // 发送聊天消息
  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    const { filtered } = filterContent(newMessage)
    const msg = {
      id: Date.now(),
      text: filtered,
      isMe: true,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    setChatMessages([...chatMessages, msg])
    setNewMessage("")
    
    // 保存到localStorage
    const chatKey = `chat_${showChat}`
    const savedMessages = JSON.parse(localStorage.getItem(chatKey) || '[]')
    savedMessages.push(msg)
    localStorage.setItem(chatKey, JSON.stringify(savedMessages))

    // 模拟回复
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        text: "收到您的消息，稍后回复您~",
        isMe: false,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }])
    }, 1000)
  }

  // 创建群
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return
    alert(`群聊"${newGroupName}"创建成功！`)
    setShowCreateGroup(false)
    setNewGroupName("")
    setNewGroupDesc("")
  }

  // 私聊界面
  if (showChat !== null) {
    const chatUser = MOCK_NEARBY.find(u => u.id === showChat) || { name: "用户", avatar: "👤" }
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        {/* 聊天头部 */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#3a3a3a] bg-[#1a1a1a]">
          <button onClick={() => setShowChat(null)} className="p-1">
            <ChevronLeft className="w-6 h-6 text-[#c5c5c5]" />
          </button>
          <span className="text-2xl">{chatUser.avatar}</span>
          <span className="text-[#f5f5f7] font-medium">{chatUser.name}</span>
        </div>

        {/* 聊天内容 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                msg.isMe 
                  ? 'bg-[#d4af37] text-[#1a1a1a]' 
                  : 'bg-[#252525] text-[#f5f5f7]'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.isMe ? 'text-[#1a1a1a]/60' : 'text-[#888]'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 发送框 */}
        <div className="flex items-center gap-3 p-4 border-t border-[#3a3a3a] bg-[#1a1a1a]">
          <button className="p-2">
            <Image className="w-6 h-6 text-[#888]" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="输入消息..."
            className="flex-1 bg-[#252525] border border-[#3a3a3a] rounded-full px-4 py-2 text-sm text-[#f5f5f7] placeholder:text-[#666] focus:outline-none focus:border-[#d4af37]/50"
          />
          <button 
            onClick={handleSendMessage}
            className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center"
          >
            <Send className="w-5 h-5 text-[#1a1a1a]" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-4">
      {/* 顶部Tab */}
      <div className="sticky top-0 z-20 bg-[#1a1a1a] px-4 pt-4 pb-2">
        <div className="flex items-center gap-1 p-1 bg-[#252525] rounded-xl">
          {[
            { id: "posts", label: "动态" },
            { id: "groups", label: "群聊" },
            { id: "nearby", label: "附近" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-[#d4af37] text-[#1a1a1a] font-medium"
                  : "text-[#888]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 动态列表 */}
      {activeTab === "posts" && (
        <div className="px-4 space-y-4">
          {/* 发帖入口 */}
          <button
            onClick={() => setShowCreatePost(true)}
            className="w-full flex items-center gap-3 p-4 bg-[#252525] rounded-2xl border border-[#3a3a3a]"
          >
            <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-xl">
              👤
            </div>
            <span className="text-[#888] text-sm">分享你的见解...</span>
            <div className="ml-auto flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#888]" />
            </div>
          </button>

          {/* 帖子列表 */}
          {posts.map(post => (
            <div key={post.id} className="bg-[#252525] rounded-2xl border border-[#3a3a3a] p-4">
              {/* 作者信息 */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-xl">
                  {post.author.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#f5f5f7] font-medium">{post.author.name}</span>
                    <span className="px-1.5 py-0.5 bg-[#d4af37]/20 text-[#d4af37] text-[10px] rounded">{post.author.level}</span>
                  </div>
                  <span className="text-[#888] text-xs">{post.time}</span>
                </div>
                <button className="p-2">
                  <MoreHorizontal className="w-5 h-5 text-[#888]" />
                </button>
              </div>

              {/* 内容 */}
              <p className="text-[#c5c5c5] text-sm leading-relaxed mb-3">{post.content}</p>

              {/* 图片 */}
              {post.images.length > 0 && (
                <div className="mb-3 rounded-xl overflow-hidden">
                  <div className="aspect-video bg-[#333] flex items-center justify-center">
                    <Image className="w-8 h-8 text-[#666]" />
                  </div>
                </div>
              )}

              {/* 互动按钮 */}
              <div className="flex items-center gap-6 pt-3 border-t border-[#333]">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 ${post.liked ? 'text-[#c8102e]' : 'text-[#888]'}`}
                >
                  <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-[#888]">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-[#888]">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 群聊列表 */}
      {activeTab === "groups" && (
        <div className="px-4 space-y-3">
          {/* 创建群按钮 */}
          <button
            onClick={() => setShowCreateGroup(true)}
            className="w-full flex items-center justify-center gap-2 p-4 bg-[#d4af37]/10 rounded-2xl border border-[#d4af37]/30 text-[#d4af37]"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">创建新群聊</span>
          </button>

          {/* 搜索群 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <input
              type="text"
              placeholder="搜索群号或群名称..."
              className="w-full bg-[#252525] border border-[#3a3a3a] rounded-xl pl-10 pr-4 py-3 text-sm text-[#f5f5f7] placeholder:text-[#666] focus:outline-none focus:border-[#d4af37]/50"
            />
          </div>

          {/* 群列表 */}
          {MOCK_GROUPS.map(group => (
            <button
              key={group.id}
              className="w-full flex items-center gap-3 p-4 bg-[#252525] rounded-2xl border border-[#3a3a3a] hover:border-[#d4af37]/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#333] flex items-center justify-center text-2xl">
                {group.avatar}
              </div>
              <div className="flex-1 text-left">
                <div className="text-[#f5f5f7] font-medium">{group.name}</div>
                <div className="text-[#888] text-xs mt-0.5">{group.desc}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Users className="w-3 h-3 text-[#666]" />
                  <span className="text-[#666] text-xs">{group.members}人</span>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-xs rounded-lg">
                加入
              </button>
            </button>
          ))}
        </div>
      )}

      {/* 附近的人 */}
      {activeTab === "nearby" && (
        <div className="px-4 space-y-3">
          {/* 设置标签 */}
          <div className="bg-[#252525] rounded-2xl border border-[#3a3a3a] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#f5f5f7] font-medium">我的兴趣标签</span>
              <button className="text-[#d4af37] text-xs">编辑</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["八字", "中医", "养生", "风水"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 附近用户列表 */}
          {MOCK_NEARBY.map(user => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-4 bg-[#252525] rounded-2xl border border-[#3a3a3a]"
            >
              <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center text-2xl">
                {user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#f5f5f7] font-medium">{user.name}</span>
                  <div className="flex items-center gap-1 text-[#888] text-xs">
                    <MapPin className="w-3 h-3" />
                    {user.distance}
                  </div>
                </div>
                <p className="text-[#888] text-xs mt-0.5">{user.intro}</p>
                <div className="flex gap-1.5 mt-1.5">
                  {user.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-[#333] text-[#888] text-[10px] rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setShowChat(user.id)}
                className="px-3 py-1.5 bg-[#d4af37] text-[#1a1a1a] text-xs rounded-lg font-medium"
              >
                私聊
              </button>
            </div>
          ))}

          <p className="text-[#666] text-xs text-center pt-4">
            附近功能需开启定位权限，当前为模拟数据
          </p>
        </div>
      )}

      {/* 发帖弹窗 */}
      {showCreatePost && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
          <div className="w-full bg-[#1a1a1a] rounded-t-3xl p-4 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setShowCreatePost(false)} className="text-[#888]">取消</button>
              <span className="text-[#f5f5f7] font-medium">发布动态</span>
              <button 
                onClick={handleCreatePost}
                className="px-4 py-1.5 bg-[#d4af37] text-[#1a1a1a] text-sm rounded-full font-medium"
              >
                发布
              </button>
            </div>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="分享你的见解..."
              rows={5}
              className="w-full bg-[#252525] border border-[#3a3a3a] rounded-xl p-4 text-[#f5f5f7] text-sm placeholder:text-[#666] resize-none focus:outline-none focus:border-[#d4af37]/50"
            />
            <div className="flex items-center gap-4 mt-4">
              <button className="flex items-center gap-2 text-[#888]">
                <Image className="w-5 h-5" />
                <span className="text-sm">图片</span>
              </button>
              <p className="text-[#666] text-xs ml-auto">图片上传功能：云端存储7天</p>
            </div>
          </div>
        </div>
      )}

      {/* 创建群弹窗 */}
      {showCreateGroup && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1a1a1a] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#f5f5f7] font-medium">创建群聊</span>
              <button onClick={() => setShowCreateGroup(false)}>
                <X className="w-5 h-5 text-[#888]" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[#888] text-xs mb-1.5 block">群名称</label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="输入群名称"
                  className="w-full bg-[#252525] border border-[#3a3a3a] rounded-xl px-4 py-3 text-sm text-[#f5f5f7] placeholder:text-[#666] focus:outline-none focus:border-[#d4af37]/50"
                />
              </div>
              <div>
                <label className="text-[#888] text-xs mb-1.5 block">群公告</label>
                <textarea
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                  placeholder="输入群公告（选填）"
                  rows={3}
                  className="w-full bg-[#252525] border border-[#3a3a3a] rounded-xl px-4 py-3 text-sm text-[#f5f5f7] placeholder:text-[#666] resize-none focus:outline-none focus:border-[#d4af37]/50"
                />
              </div>
              <button
                onClick={handleCreateGroup}
                className="w-full py-3 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-medium"
              >
                创建群聊
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部合规声明 */}
      <div className="px-4 pt-6 pb-2">
        <p className="text-[#555] text-[10px] text-center leading-relaxed">
          本APP中医内容为理论学习，不构成医疗诊断；命理内容为学术交流，不做决策依据。
        </p>
      </div>
    </div>
  )
}
