"use client"

import { useState } from "react"
import { 
  User, Settings, BookmarkIcon, History, Bell, Moon, Sun, 
  ChevronRight, Heart, Star, Clock, Shield, HelpCircle, 
  MessageCircle, FileText, Award, Zap, ChevronLeft, X,
  CreditCard, Smartphone, Mail, IdCard, ScanFace, QrCode,
  Wallet, TrendingUp, Package, Download, Headphones, Trash2,
  Check, Gift, Crown, Sparkles, Copy, Share2
} from "lucide-react"

// 用户统计数据
const USER_STATS = [
  { label: "排盘次数", value: 128, icon: Zap },
  { label: "收藏内容", value: 45, icon: BookmarkIcon },
  { label: "学习时长", value: "36h", icon: Clock },
  { label: "成就徽章", value: 8, icon: Award },
]

// 会员套餐
const VIP_PLANS = [
  { id: "once", name: "单次", price: 9.9, unit: "次", desc: "单次排盘解读" },
  { id: "month", name: "月卡", price: 29.9, unit: "月", desc: "当月无限使用", popular: true },
  { id: "year", name: "年卡", price: 199, unit: "年", desc: "全年无限使用", discount: "省159元" },
  { id: "forever", name: "永久", price: 399, unit: "永久", desc: "一次购买永久使用" },
]

// VIP权益
const VIP_BENEFITS = [
  { icon: Zap, title: "无限排盘", desc: "八字、六爻、奇门等全部排盘工具无限使用" },
  { icon: Sparkles, title: "AI深度解读", desc: "专属AI提供详细命理分析和建议" },
  { icon: FileText, title: "古籍全本", desc: "解锁所有古籍典籍的完整内容" },
  { icon: Crown, title: "名师课程", desc: "畅学平台所有名师课程" },
  { icon: Gift, title: "专属特权", desc: "会员专属活动和福利" },
]

// 订单数据
const MOCK_ORDERS = [
  { id: "20240101001", name: "月卡会员", price: 29.9, status: "已完成", time: "2024-01-01" },
  { id: "20240115002", name: "《滴天髓》电子书", price: 19.9, status: "已完成", time: "2024-01-15" },
  { id: "20240201003", name: "八字入门课程", price: 99, status: "已完成", time: "2024-02-01" },
]

// 分销数据
const DISTRIBUTION_DATA = {
  totalEarnings: 1280.50,
  availableBalance: 580.50,
  totalInvites: 28,
  directInvites: 15,
  indirectInvites: 13,
  commissionRate: { level1: 30, level2: 10 },
  withdrawThreshold: 100,
  withdrawRecords: [
    { id: 1, amount: 500, status: "已到账", time: "2024-01-20" },
    { id: 2, amount: 200, status: "处理中", time: "2024-02-15" },
  ]
}

// 积分数据
const POINTS_DATA = {
  total: 2580,
  history: [
    { desc: "每日签到", points: "+10", time: "今天" },
    { desc: "邀请好友", points: "+100", time: "昨天" },
    { desc: "消费返积分", points: "+30", time: "3天前" },
    { desc: "兑换商品", points: "-500", time: "5天前" },
  ]
}

export function ProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isVIP, setIsVIP] = useState(false)
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState("month")
  
  // 认证状态
  const [certifications, setCertifications] = useState({
    phone: true,
    email: false,
    idCard: false,
    face: false,
  })

  // 支付绑定状态
  const [payments, setPayments] = useState({
    bank: false,
    wechat: true,
    alipay: false,
  })

  // 返回主页面
  const handleBack = () => {
    setActiveSubPage(null)
  }

  // 子页面头部
  const SubPageHeader = ({ title }: { title: string }) => (
    <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border-b border-[#3a3a3a]">
      <button onClick={handleBack} className="p-1">
        <ChevronLeft className="w-6 h-6 text-[#c5c5c5]" />
      </button>
      <span className="text-[#f5f5f7] font-medium">{title}</span>
    </div>
  )

  // 实名认证页面
  if (activeSubPage === "certification") {
    const certItems = [
      { id: "phone", name: "手机号认证", icon: Smartphone, desc: "已绑定 138****8888", done: certifications.phone },
      { id: "email", name: "邮箱认证", icon: Mail, desc: "绑定邮箱获得更多功能", done: certifications.email },
      { id: "idCard", name: "身份证认证", icon: IdCard, desc: "实名认证享受更多权益", done: certifications.idCard },
      { id: "face", name: "人脸识别", icon: ScanFace, desc: "完成人脸识别保护账户安全", done: certifications.face },
    ]
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <SubPageHeader title="实名认证" />
        <div className="p-4 space-y-3">
          {certItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (!item.done) {
                  alert("认证功能即将开放，敬请期待")
                }
              }}
              className="w-full flex items-center gap-3 p-4 bg-[#252525] rounded-2xl border border-[#3a3a3a]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[#f5f5f7] text-sm font-medium">{item.name}</div>
                <div className="text-[#888] text-xs">{item.desc}</div>
              </div>
              {item.done ? (
                <div className="flex items-center gap-1 text-[#4a9d5c]">
                  <Check className="w-4 h-4" />
                  <span className="text-xs">已认证</span>
                </div>
              ) : (
                <span className="text-[#d4af37] text-xs">去认证</span>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // 支付绑定页面
  if (activeSubPage === "payment") {
    const payItems = [
      { id: "bank", name: "银行卡", icon: CreditCard, desc: payments.bank ? "已绑定" : "绑定银行卡", done: payments.bank },
      { id: "wechat", name: "微信支付", icon: MessageCircle, desc: payments.wechat ? "已绑定" : "绑定微信", done: payments.wechat },
      { id: "alipay", name: "支付宝", icon: Wallet, desc: payments.alipay ? "已绑定" : "绑定支付宝", done: payments.alipay },
    ]
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <SubPageHeader title="支付绑定" />
        <div className="p-4 space-y-3">
          {payItems.map(item => (
            <button
              key={item.id}
              onClick={() => alert("支付绑定功能即将开放")}
              className="w-full flex items-center gap-3 p-4 bg-[#252525] rounded-2xl border border-[#3a3a3a]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[#f5f5f7] text-sm font-medium">{item.name}</div>
                <div className="text-[#888] text-xs">{item.desc}</div>
              </div>
              {item.done ? (
                <div className="flex items-center gap-1 text-[#4a9d5c]">
                  <Check className="w-4 h-4" />
                  <span className="text-xs">已绑定</span>
                </div>
              ) : (
                <span className="text-[#d4af37] text-xs">去绑定</span>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // 会员订阅页面
  if (activeSubPage === "vip") {
    return (
      <div className="min-h-screen bg-[#1a1a1a] pb-24">
        <SubPageHeader title="会员订阅" />
        
        {/* 套餐选择 */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {VIP_PLANS.map(plan => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-4 rounded-2xl border transition-all ${
                  selectedPlan === plan.id
                    ? "bg-[#d4af37]/10 border-[#d4af37]"
                    : "bg-[#252525] border-[#3a3a3a]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2 right-2 px-2 py-0.5 bg-[#c8102e] text-white text-[10px] rounded-full">
                    推荐
                  </div>
                )}
                {plan.discount && (
                  <div className="absolute -top-2 left-2 px-2 py-0.5 bg-[#4a9d5c] text-white text-[10px] rounded-full">
                    {plan.discount}
                  </div>
                )}
                <div className="text-[#f5f5f7] font-medium mb-1">{plan.name}</div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[#d4af37] text-xl font-bold">¥{plan.price}</span>
                  <span className="text-[#888] text-xs">/{plan.unit}</span>
                </div>
                <div className="text-[#888] text-xs mt-1">{plan.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 权益列表 */}
        <div className="px-4 mb-4">
          <div className="text-[#f5f5f7] font-medium mb-3">会员权益</div>
          <div className="space-y-3">
            {VIP_BENEFITS.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#252525] rounded-xl border border-[#3a3a3a]">
                <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-[#f5f5f7] text-sm font-medium">{benefit.title}</div>
                  <div className="text-[#888] text-xs mt-0.5">{benefit.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 购买按钮 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1a1a1a] border-t border-[#3a3a3a]">
          <button
            onClick={() => {
              const plan = VIP_PLANS.find(p => p.id === selectedPlan)
              alert(`模拟支付成功！已开通${plan?.name}会员`)
              setIsVIP(true)
            }}
            className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#c8102e] text-[#1a1a1a] font-bold rounded-xl"
          >
            立即开通 · ¥{VIP_PLANS.find(p => p.id === selectedPlan)?.price}
          </button>
        </div>
      </div>
    )
  }

  // 订单管理页面
  if (activeSubPage === "orders") {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <SubPageHeader title="订单管理" />
        <div className="p-4 space-y-3">
          {MOCK_ORDERS.map(order => (
            <div key={order.id} className="p-4 bg-[#252525] rounded-2xl border border-[#3a3a3a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#888] text-xs">订单号：{order.id}</span>
                <span className="text-[#4a9d5c] text-xs">{order.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#f5f5f7]">{order.name}</span>
                <span className="text-[#d4af37] font-bold">¥{order.price}</span>
              </div>
              <div className="text-[#666] text-xs mt-2">{order.time}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 推广二维码页面
  if (activeSubPage === "qrcode") {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <SubPageHeader title="推广二维码" />
        <div className="p-4">
          <div className="bg-[#252525] rounded-2xl border border-[#3a3a3a] p-6 text-center">
            <div className="w-48 h-48 mx-auto bg-white rounded-xl p-4 mb-4">
              <div className="w-full h-full bg-[#1a1a1a] rounded flex items-center justify-center">
                <QrCode className="w-24 h-24 text-[#d4af37]" />
              </div>
            </div>
            <p className="text-[#f5f5f7] font-medium mb-1">我的推广二维码</p>
            <p className="text-[#888] text-xs mb-4">邀请好友扫码注册，双方都能获得奖励</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#888] text-xs">邀请码：</span>
              <span className="text-[#d4af37] font-mono">ABC123</span>
              <button onClick={() => alert("已复制邀请码")}>
                <Copy className="w-4 h-4 text-[#888]" />
              </button>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => alert("图片已保存")}
                className="flex-1 py-2.5 bg-[#d4af37] text-[#1a1a1a] rounded-xl text-sm font-medium"
              >
                保存图片
              </button>
              <button 
                onClick={() => alert("分享功能即将开放")}
                className="flex-1 py-2.5 bg-[#333] text-[#f5f5f7] rounded-xl text-sm font-medium flex items-center justify-center gap-1"
              >
                <Share2 className="w-4 h-4" />
                分享
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 分销中心页面
  if (activeSubPage === "distribution") {
    return (
      <div className="min-h-screen bg-[#1a1a1a] pb-4">
        <SubPageHeader title="分销中心" />
        
        {/* 收益概览 */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-[#2a2010] to-[#1a1510] rounded-2xl border border-[#d4af37]/30 p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-[#888] text-xs mb-1">累计收益</div>
                <div className="text-[#d4af37] text-2xl font-bold">¥{DISTRIBUTION_DATA.totalEarnings}</div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-1">可提现</div>
                <div className="text-[#f5f5f7] text-2xl font-bold">¥{DISTRIBUTION_DATA.availableBalance}</div>
              </div>
            </div>
            <button 
              onClick={() => {
                if (DISTRIBUTION_DATA.availableBalance >= DISTRIBUTION_DATA.withdrawThreshold) {
                  alert("提现申请已提交")
                } else {
                  alert(`提现门槛为¥${DISTRIBUTION_DATA.withdrawThreshold}`)
                }
              }}
              className="w-full py-2.5 bg-[#d4af37] text-[#1a1a1a] rounded-xl text-sm font-medium"
            >
              申请提现
            </button>
          </div>
        </div>

        {/* 邀请统计 */}
        <div className="px-4 mb-4">
          <div className="bg-[#252525] rounded-2xl border border-[#3a3a3a] p-4">
            <div className="text-[#f5f5f7] font-medium mb-3">邀请统计</div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[#d4af37] text-xl font-bold">{DISTRIBUTION_DATA.totalInvites}</div>
                <div className="text-[#888] text-xs">总邀请</div>
              </div>
              <div>
                <div className="text-[#f5f5f7] text-xl font-bold">{DISTRIBUTION_DATA.directInvites}</div>
                <div className="text-[#888] text-xs">一级</div>
              </div>
              <div>
                <div className="text-[#f5f5f7] text-xl font-bold">{DISTRIBUTION_DATA.indirectInvites}</div>
                <div className="text-[#888] text-xs">二级</div>
              </div>
            </div>
          </div>
        </div>

        {/* 佣金比例 */}
        <div className="px-4 mb-4">
          <div className="bg-[#252525] rounded-2xl border border-[#3a3a3a] p-4">
            <div className="text-[#f5f5f7] font-medium mb-3">佣金比例</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#888]">一级分佣</span>
              <span className="text-[#d4af37]">{DISTRIBUTION_DATA.commissionRate.level1}%</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-[#888]">二级分佣</span>
              <span className="text-[#d4af37]">{DISTRIBUTION_DATA.commissionRate.level2}%</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-[#888]">提现门槛</span>
              <span className="text-[#f5f5f7]">¥{DISTRIBUTION_DATA.withdrawThreshold}</span>
            </div>
          </div>
        </div>

        {/* 提现记录 */}
        <div className="px-4">
          <div className="text-[#f5f5f7] font-medium mb-3">提现记录</div>
          <div className="space-y-2">
            {DISTRIBUTION_DATA.withdrawRecords.map(record => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-[#252525] rounded-xl border border-[#3a3a3a]">
                <div>
                  <div className="text-[#f5f5f7]">提现 ¥{record.amount}</div>
                  <div className="text-[#888] text-xs">{record.time}</div>
                </div>
                <span className={`text-xs ${record.status === "已到账" ? "text-[#4a9d5c]" : "text-[#d4af37]"}`}>
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 微信客服页面
  if (activeSubPage === "kefu") {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <SubPageHeader title="联系客服" />
        <div className="p-4">
          <div className="bg-[#252525] rounded-2xl border border-[#3a3a3a] p-6 text-center">
            <div className="w-32 h-32 mx-auto bg-white rounded-xl p-2 mb-4">
              <div className="w-full h-full bg-[#4a9d5c] rounded flex items-center justify-center">
                <QrCode className="w-20 h-20 text-white" />
              </div>
            </div>
            <p className="text-[#f5f5f7] font-medium mb-1">微信客服</p>
            <p className="text-[#888] text-sm mb-2">扫码添加客服微信</p>
            <p className="text-[#d4af37] text-sm font-mono">微信号：guoxue_kefu</p>
            <p className="text-[#666] text-xs mt-4">工作时间：9:00-18:00</p>
          </div>
        </div>
      </div>
    )
  }

  // 系统设置页面
  if (activeSubPage === "settings") {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <SubPageHeader title="系统设置" />
        <div className="p-4 space-y-3">
          {/* 夜间模式 */}
          <div className="flex items-center justify-between p-4 bg-[#252525] rounded-2xl border border-[#3a3a3a]">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#f5f5f7]">夜间模式</span>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-12 h-7 rounded-full transition-colors ${isDarkMode ? "bg-[#d4af37]" : "bg-[#555]"} relative`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${isDarkMode ? "right-1" : "left-1"}`} />
            </button>
          </div>

          {/* 清理缓存 */}
          <button
            onClick={() => {
              localStorage.clear()
              alert("缓存已清理")
            }}
            className="w-full flex items-center justify-between p-4 bg-[#252525] rounded-2xl border border-[#3a3a3a]"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#f5f5f7]">清理缓存</span>
            </div>
            <span className="text-[#888] text-sm">12.5MB</span>
          </button>

          {/* 离线资料包 */}
          <button
            onClick={() => alert("即将开放下载")}
            className="w-full flex items-center justify-between p-4 bg-[#252525] rounded-2xl border border-[#3a3a3a]"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#f5f5f7]">离线资料包</span>
            </div>
            <span className="text-[#888] text-sm">即将开放</span>
          </button>
        </div>
      </div>
    )
  }

  // 关于页面
  if (activeSubPage === "about") {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <SubPageHeader title="关于我们" />
        <div className="p-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#d4af37] to-[#c8102e] rounded-2xl flex items-center justify-center mb-3">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-[#f5f5f7] text-xl font-bold">国学宝典</h2>
            <p className="text-[#888] text-sm mt-1">版本 1.0.0</p>
          </div>

          <div className="bg-[#252525] rounded-2xl border border-[#3a3a3a] p-4 mb-4">
            <p className="text-[#c5c5c5] text-sm leading-relaxed">
              国学宝典是一款集易学、中医于一体的传统文化学习应用。我们致力于传承中华优秀传统文化，让更多人了解和学习易学命理、中医养生等知识。
            </p>
          </div>

          {/* 合规声明 */}
          <div className="bg-[#1e1e1e] rounded-2xl border border-[#333] p-4">
            <p className="text-[#888] text-xs leading-relaxed">
              <strong className="text-[#c5c5c5]">免责声明：</strong>本APP中医内容为理论学习，不构成医疗诊断；命理内容为学术交流，不做决策依据。如有健康问题请咨询专业医师。
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 主页面
  const MENU_ITEMS = [
    {
      section: "账户管理",
      items: [
        { id: "certification", name: "实名认证", icon: IdCard, desc: "完成认证享受更多服务" },
        { id: "payment", name: "支付绑定", icon: CreditCard, desc: "绑定支付方式" },
        { id: "vip", name: "会员订阅", icon: Crown, desc: "开通VIP享受特权" },
        { id: "orders", name: "订单管理", icon: Package, desc: "查看订单记录" },
      ]
    },
    {
      section: "推广变现",
      items: [
        { id: "qrcode", name: "推广二维码", icon: QrCode, desc: "邀请好友赚佣金" },
        { id: "distribution", name: "分销中心", icon: TrendingUp, desc: "查看分销收益" },
      ]
    },
    {
      section: "我的内容",
      items: [
        { id: "favorites", name: "我的收藏", icon: Heart, desc: "收藏的方剂、古籍等" },
        { id: "history", name: "历史记录", icon: History, desc: "排盘和浏览历史" },
        { id: "notes", name: "学习笔记", icon: FileText, desc: "个人学习笔记" },
      ]
    },
    {
      section: "其他",
      items: [
        { id: "kefu", name: "微信客服", icon: Headphones, desc: "联系在线客服" },
        { id: "settings", name: "系统设置", icon: Settings, desc: "应用偏好设置" },
        { id: "about", name: "关于我们", icon: Star, desc: "应用版本和信息" },
      ]
    },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24 bg-[#1a1a1a]">
      {/* 用户信息卡片 */}
      <div className="px-4 pt-6 pb-4">
        <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-2xl p-4 border border-[#4a4a4a]">
          <div className="flex items-center gap-4">
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

      {/* VIP卡片 */}
      {!isVIP && (
        <div className="px-4 mb-4">
          <button
            onClick={() => setActiveSubPage("vip")}
            className="w-full bg-gradient-to-r from-[#2a2010] to-[#1a1510] rounded-2xl p-4 border border-[#d4af37]/30 text-left"
          >
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] font-bold">开通VIP会员</span>
              <ChevronRight className="w-4 h-4 text-[#d4af37] ml-auto" />
            </div>
            <p className="text-[#888] text-xs">解锁全部高级功能，首月仅需¥9.9</p>
          </button>
        </div>
      )}

      {/* 功能菜单 */}
      {MENU_ITEMS.map(section => (
        <div key={section.section} className="px-4 mb-4">
          <div className="text-[#888] text-xs mb-2 ml-1">{section.section}</div>
          <div className="bg-[#252525] rounded-2xl border border-[#4a4a4a] overflow-hidden">
            {section.items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActiveSubPage(item.id)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-[#2a2a2a] transition-colors ${
                  i < section.items.length - 1 ? "border-b border-[#3a3a3a]" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#1a1a1a] flex items-center justify-center">
                  <item.icon className="w-4.5 h-4.5 text-[#d4af37]" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[#f5f5f7] text-sm font-medium">{item.name}</div>
                  <div className="text-[#888] text-xs">{item.desc}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#555]" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 版本信息和合规声明 */}
      <div className="text-center py-4 px-4">
        <p className="text-[#777] text-xs">国学宝典 v1.0.0</p>
        <p className="text-[#555] text-[10px] mt-2 leading-relaxed">
          本APP中医内容为理论学习，不构成医疗诊断；命理内容为学术交流，不做决策依据。
        </p>
      </div>
    </div>
  )
}
