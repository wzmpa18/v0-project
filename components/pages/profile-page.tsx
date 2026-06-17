"use client"

import { useState, useEffect } from "react"
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Send,
  ArrowRight,
  Users,
  LogOut,
  ChevronRight,
  Calendar,
  Heart,
  Bookmark,
  MessageSquare,
  Award,
  Share2,
  Bell,
  Moon,
  Settings,
  Edit3,
  QrCode,
  Link2,
  Copy,
  Check
} from "lucide-react"
import {
  sendVerificationCode,
  register,
  login,
  getInviteUrl,
  getDownlineStats,
  saveUserToStorage,
  getUserFromStorage,
  clearUserStorage,
  getUrlInviteCode,
  type UserInfo,
  type ApiResponse
} from "@/lib/api"

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
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [code, setCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [codeButtonText, setCodeButtonText] = useState("获取验证码")
  const [codeButtonDisabled, setCodeButtonDisabled] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(getUserFromStorage())
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  
  // 推广相关
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [inviteCode, setInviteCode] = useState("")
  const [inviteUrl, setInviteUrl] = useState("")
  const [downlineStats, setDownlineStats] = useState({ level1: 0, level2: 0, total: 0 })
  const [copied, setCopied] = useState(false)

  // 自动获取 URL 中的邀请码
  useEffect(() => {
    const urlInviteCode = getUrlInviteCode()
    if (urlInviteCode) {
      setIsLogin(false)
    }
  }, [])

  // 获取推广信息
  useEffect(() => {
    if (user && user.id) {
      fetchInviteInfo()
      fetchDownlineStats()
    }
  }, [user])

  const fetchInviteInfo = async () => {
    if (!user?.id) return
    const response: ApiResponse = await getInviteUrl(user.id)
    if (response.success && response.data) {
      setQrCodeUrl(response.data.qrCodeUrl)
      setInviteCode(response.data.inviteCode)
      setInviteUrl(response.data.inviteUrl)
    }
  }

  const fetchDownlineStats = async () => {
    if (!user?.id) return
    const response: ApiResponse = await getDownlineStats(user.id)
    if (response.success && response.data) {
      setDownlineStats(response.data)
    }
  }

  const handleSendCode = async () => {
    if (!email) {
      setMessage("请输入邮箱")
      setMessageType("error")
      return
    }

    const response: ApiResponse = await sendVerificationCode(email)
    if (response.success) {
      setMessage("验证码已发送到邮箱")
      setMessageType("success")
      setCodeButtonDisabled(true)
      setCodeButtonText("60秒后重新获取")
      let count = 60
      const timer = setInterval(() => {
        count--
        if (count <= 0) {
          clearInterval(timer)
          setCodeButtonDisabled(false)
          setCodeButtonText("获取验证码")
        } else {
          setCodeButtonText(`${count}秒后重新获取`)
        }
      }, 1000)
    } else {
      setMessage(response.message)
      setMessageType("error")
    }
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("请填写完整信息")
      setMessageType("error")
      return
    }

    const response: ApiResponse = await login(email, password)
    if (response.success) {
      const userData: UserInfo = {
        id: response.data.userId,
        email: response.data.email,
        createdAt: Date.now(),
        inviteCode: response.data.inviteCode,
        referrerId: null
      }
      saveUserToStorage(userData, response.data.token)
      setUser(userData)
      setMessage("登录成功")
      setMessageType("success")
    } else {
      setMessage(response.message)
      setMessageType("error")
    }
  }

  const handleRegister = async () => {
    if (!email || !password || !code) {
      setMessage("请填写完整信息")
      setMessageType("error")
      return
    }

    if (password !== confirmPassword) {
      setMessage("两次输入的密码不一致")
      setMessageType("error")
      return
    }

    // 从 URL 获取邀请码
    const urlInviteCode = getUrlInviteCode()
    
    const response: ApiResponse = await register(email, password, code, urlInviteCode)
    if (response.success) {
      const userData: UserInfo = {
        id: response.data.userId,
        email: response.data.email,
        createdAt: Date.now(),
        inviteCode: response.data.inviteCode,
        referrerId: null
      }
      saveUserToStorage(userData, "")
      setUser(userData)
      setMessage(urlInviteCode ? "注册成功！您已通过邀请链接注册" : "注册成功")
      setMessageType("success")
    } else {
      setMessage(response.message)
      setMessageType("error")
    }
  }

  const handleLogout = () => {
    clearUserStorage()
    setUser(null)
    setMessage("已退出登录")
    setMessageType("success")
  }

  const handleCopyInviteUrl = () => {
    if (inviteUrl) {
      navigator.clipboard.writeText(inviteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // 已登录状态显示个人中心
  if (user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
        {message && (
          <div className={`px-4 py-3 text-center ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2]/10 via-[#d4af37]/10 to-[#c8102e]/10" />
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#d4af37]/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#0891b2]/10 rounded-full blur-2xl" />

          <div className="relative px-4 pt-6 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0891b2] to-[#d4af37] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {user.email?.charAt(0).toUpperCase() || '国'}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-800">{user.email}</h2>
                  <span className="px-2 py-0.5 bg-[#d4af37]/10 text-[#d4af37] text-xs rounded-full">VIP</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">ID: {user.id.slice(-8)}</p>
                {user.inviteCode && (
                  <p className="text-xs text-gray-500">邀请码: {user.inviteCode}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: "连续打卡", value: "15", icon: "🔥", color: "#f97316" },
                { label: "总学习", value: "128h", icon: "📚", color: "#0891b2" },
                { label: "分享数", value: "23", icon: "✨", color: "#d4af37" },
                { label: "积分", value: "8888", icon: "🎁", color: "#c8102e" },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="font-bold text-gray-800 text-sm">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 推广二维码区域 */}
        <div className="px-4 mb-4">
          <div className="bg-gradient-to-br from-amber-500/10 to-yellow-600/10 rounded-2xl p-4 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-gray-800">我的推广</h3>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-200">
                {qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="推广二维码" className="w-20 h-20 rounded-lg" />
                ) : (
                  <QrCode className="w-12 h-12 text-gray-300" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">邀请码:</span>
                  <span className="font-bold text-amber-600">{inviteCode || '加载中...'}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center">
                    <div className="font-bold text-gray-800">{downlineStats.level1}</div>
                    <div className="text-xs text-gray-500">一级</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800">{downlineStats.level2}</div>
                    <div className="text-xs text-gray-500">二级</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-amber-600">{downlineStats.total}</div>
                    <div className="text-xs text-gray-500">总计</div>
                  </div>
                </div>
                
                <button 
                  onClick={handleCopyInviteUrl}
                  className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? '已复制' : '复制链接'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-4 pb-24">
          {[menuItems.slice(0, 4), menuItems.slice(4, 8), menuItems.slice(8)].map((group, groupIndex) => (
            <div key={groupIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {group.map((item) => (
                <button key={item.id} className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
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
          ))}

          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white rounded-2xl shadow-sm border border-gray-100 text-[#c8102e] hover:bg-[#c8102e]/5 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </div>
    )
  }

  // 未登录状态显示登录/注册表单
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#1a1410] via-[#1f1814] to-[#241c16] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${messageType === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-amber-400 mb-2">国学传承</h1>
          <p className="text-amber-200/60">传承千年智慧 · 国学综合平台</p>
        </div>

        <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-2xl p-6 border border-amber-800/30">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-center font-medium transition-colors ${isLogin ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-400'}`}
            >
              登录
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-center font-medium transition-colors ${!isLogin ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-400'}`}
            >
              注册
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-amber-200/80 mb-1.5">邮箱地址</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入邮箱"
                  className="w-full bg-amber-800/30 border border-amber-700/30 rounded-lg px-10 py-3 text-white placeholder-amber-400/50 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-amber-200/80 mb-1.5">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full bg-amber-800/30 border border-amber-700/30 rounded-lg px-10 py-3 text-white placeholder-amber-400/50 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-amber-500" /> : <Eye className="w-5 h-5 text-amber-500" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm text-amber-200/80 mb-1.5">确认密码</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="请再次输入密码"
                      className="w-full bg-amber-800/30 border border-amber-700/30 rounded-lg px-10 py-3 text-white placeholder-amber-400/50 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5 text-amber-500" /> : <Eye className="w-5 h-5 text-amber-500" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-amber-200/80 mb-1.5">验证码</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="请输入验证码"
                        className="w-full bg-amber-800/30 border border-amber-700/30 rounded-lg px-4 py-3 text-white placeholder-amber-400/50 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <button
                      onClick={handleSendCode}
                      disabled={codeButtonDisabled}
                      className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${codeButtonDisabled ? 'bg-gray-600 text-gray-400' : 'bg-amber-600 hover:bg-amber-500 text-white'}`}
                    >
                      <Send className="w-4 h-4" />
                      <span className="text-sm">{codeButtonText}</span>
                    </button>
                  </div>
                </div>

                {getUrlInviteCode() && (
                  <div className="p-3 bg-amber-600/20 rounded-lg border border-amber-500/30">
                    <div className="flex items-center gap-2 text-amber-400 text-sm">
                      <Link2 className="w-4 h-4" />
                      <span>您正在通过邀请链接注册</span>
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              onClick={isLogin ? handleLogin : handleRegister}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/25"
            >
              <span>{isLogin ? '登录' : '注册'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-center text-amber-400/60 text-sm mt-4">
          注册即表示同意《用户协议》和《隐私政策》
        </p>
      </div>
    </div>
  )
}
