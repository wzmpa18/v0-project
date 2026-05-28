"use client"

import { useState } from "react"
import { ChevronLeft, Search, ShoppingCart, Star, ChevronRight, MapPin, CreditCard, X, Check, Gift, Coins } from "lucide-react"

// 商品数据
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "《滴天髓》精装本",
    category: "古籍",
    price: 68,
    originalPrice: 98,
    image: "/placeholder.jpg",
    sales: 1280,
    rating: 4.9,
    desc: "命理经典，八字必读。精装收藏版，附详细注解。"
  },
  {
    id: 2,
    name: "专业罗盘（8寸）",
    category: "器具",
    price: 288,
    originalPrice: 368,
    image: "/placeholder.jpg",
    sales: 568,
    rating: 4.8,
    desc: "专业风水罗盘，铜质底盘，精准度高。"
  },
  {
    id: 3,
    name: "太极八卦挂件",
    category: "饰品",
    price: 128,
    originalPrice: 168,
    image: "/placeholder.jpg",
    sales: 2350,
    rating: 4.7,
    desc: "纯铜材质，手工打造，可挂车内或门口。"
  },
  {
    id: 4,
    name: "《周易》注疏合刊",
    category: "古籍",
    price: 158,
    originalPrice: 218,
    image: "/placeholder.jpg",
    sales: 856,
    rating: 4.9,
    desc: "群经之首，大道之源。多版本注疏合刊。"
  },
  {
    id: 5,
    name: "八字入门视频课程",
    category: "课程",
    price: 199,
    originalPrice: 399,
    image: "/placeholder.jpg",
    sales: 3200,
    rating: 4.8,
    desc: "名师讲解，从零开始学八字，30天入门。"
  },
  {
    id: 6,
    name: "艾灸条（50支装）",
    category: "养生",
    price: 88,
    originalPrice: 128,
    image: "/placeholder.jpg",
    sales: 4500,
    rating: 4.6,
    desc: "三年陈艾，温和灸感，家庭养生必备。"
  },
]

// 分类
const CATEGORIES = ["全部", "古籍", "课程", "器具", "饰品", "养生"]

// 积分商品
const POINTS_PRODUCTS = [
  { id: 1, name: "5元优惠券", points: 500, stock: 100 },
  { id: 2, name: "会员7天体验卡", points: 1000, stock: 50 },
  { id: 3, name: "精美书签套装", points: 800, stock: 200 },
]

interface ShopPageProps {
  onBack?: () => void
}

export function ShopPage({ onBack }: ShopPageProps) {
  const [activeCategory, setActiveCategory] = useState("全部")
  const [selectedProduct, setSelectedProduct] = useState<typeof MOCK_PRODUCTS[0] | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"alipay" | "wechat" | "crypto">("alipay")
  const [cartCount, setCartCount] = useState(0)
  const [showPointsShop, setShowPointsShop] = useState(false)
  const [userPoints] = useState(2580)

  // 过滤商品
  const filteredProducts = activeCategory === "全部" 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory)

  // 模拟支付
  const handlePayment = () => {
    setShowPayment(false)
    setShowCheckout(false)
    setSelectedProduct(null)
    alert("模拟支付成功！订单已生成")
  }

  // 商品详情页
  if (selectedProduct && !showCheckout) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] pb-24">
        {/* 头部 */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#3a3a3a]">
          <button onClick={() => setSelectedProduct(null)} className="p-1">
            <ChevronLeft className="w-6 h-6 text-[#c5c5c5]" />
          </button>
          <span className="text-[#f5f5f7] font-medium">商品详情</span>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-[#c5c5c5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c8102e] text-white text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {/* 商品图片 */}
        <div className="aspect-square bg-[#252525] flex items-center justify-center">
          <div className="text-[#555] text-6xl">📦</div>
        </div>

        {/* 商品信息 */}
        <div className="p-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-[#c8102e] text-2xl font-bold">¥{selectedProduct.price}</span>
            <span className="text-[#666] text-sm line-through">¥{selectedProduct.originalPrice}</span>
          </div>
          <h1 className="text-[#f5f5f7] text-lg font-medium mb-2">{selectedProduct.name}</h1>
          <div className="flex items-center gap-4 text-sm text-[#888] mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#d4af37] fill-current" />
              <span>{selectedProduct.rating}</span>
            </div>
            <span>销量 {selectedProduct.sales}</span>
          </div>

          {/* 商品描述 */}
          <div className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]">
            <div className="text-[#888] text-xs mb-2">商品介绍</div>
            <p className="text-[#c5c5c5] text-sm leading-relaxed">{selectedProduct.desc}</p>
          </div>
        </div>

        {/* 底部购买栏 */}
        <div className="fixed bottom-0 left-0 right-0 flex items-center gap-3 p-4 bg-[#1a1a1a] border-t border-[#3a3a3a]">
          <button
            onClick={() => setCartCount(cartCount + 1)}
            className="flex-1 py-3 bg-[#333] text-[#f5f5f7] rounded-xl font-medium"
          >
            加入购物车
          </button>
          <button
            onClick={() => setShowCheckout(true)}
            className="flex-1 py-3 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-medium"
          >
            立即购买
          </button>
        </div>
      </div>
    )
  }

  // 结算页面
  if (showCheckout && selectedProduct) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] pb-24">
        <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border-b border-[#3a3a3a]">
          <button onClick={() => setShowCheckout(false)} className="p-1">
            <ChevronLeft className="w-6 h-6 text-[#c5c5c5]" />
          </button>
          <span className="text-[#f5f5f7] font-medium">确认订单</span>
        </div>

        {/* 收货地址 */}
        <div className="p-4">
          <div className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#d4af37] mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#f5f5f7] font-medium">张三</span>
                  <span className="text-[#888]">138****8888</span>
                </div>
                <p className="text-[#888] text-sm">北京市朝阳区xxx街道xxx小区xxx号</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#555]" />
            </div>
          </div>
        </div>

        {/* 商品信息 */}
        <div className="px-4 mb-4">
          <div className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]">
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-[#333] rounded-lg flex items-center justify-center text-3xl">
                📦
              </div>
              <div className="flex-1">
                <div className="text-[#f5f5f7] text-sm mb-1">{selectedProduct.name}</div>
                <div className="text-[#888] text-xs mb-2">{selectedProduct.category}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[#c8102e] font-bold">¥{selectedProduct.price}</span>
                  <span className="text-[#888] text-sm">x1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 订单金额 */}
        <div className="px-4">
          <div className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#888]">商品金额</span>
              <span className="text-[#f5f5f7]">¥{selectedProduct.price}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#888]">运费</span>
              <span className="text-[#f5f5f7]">¥0</span>
            </div>
            <div className="h-px bg-[#333] my-3" />
            <div className="flex items-center justify-between">
              <span className="text-[#f5f5f7] font-medium">实付金额</span>
              <span className="text-[#c8102e] text-xl font-bold">¥{selectedProduct.price}</span>
            </div>
          </div>
        </div>

        {/* 提交订单 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1a1a1a] border-t border-[#3a3a3a]">
          <button
            onClick={() => setShowPayment(true)}
            className="w-full py-3 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-bold"
          >
            提交订单 · ¥{selectedProduct.price}
          </button>
        </div>

        {/* 支付方式选择弹窗 */}
        {showPayment && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
            <div className="w-full bg-[#1a1a1a] rounded-t-3xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#f5f5f7] font-medium">选择支付方式</span>
                <button onClick={() => setShowPayment(false)}>
                  <X className="w-5 h-5 text-[#888]" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {/* 支付宝 */}
                <button
                  onClick={() => setPaymentMethod("alipay")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    paymentMethod === "alipay"
                      ? "bg-[#d4af37]/10 border-[#d4af37]"
                      : "bg-[#252525] border-[#3a3a3a]"
                  }`}
                >
                  <div className="w-10 h-10 bg-[#1677FF] rounded-lg flex items-center justify-center text-white font-bold">
                    支
                  </div>
                  <span className="text-[#f5f5f7]">支付宝</span>
                  {paymentMethod === "alipay" && (
                    <Check className="w-5 h-5 text-[#d4af37] ml-auto" />
                  )}
                </button>

                {/* 微信支付 */}
                <button
                  onClick={() => setPaymentMethod("wechat")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    paymentMethod === "wechat"
                      ? "bg-[#d4af37]/10 border-[#d4af37]"
                      : "bg-[#252525] border-[#3a3a3a]"
                  }`}
                >
                  <div className="w-10 h-10 bg-[#07C160] rounded-lg flex items-center justify-center text-white font-bold">
                    微
                  </div>
                  <span className="text-[#f5f5f7]">微信支付</span>
                  {paymentMethod === "wechat" && (
                    <Check className="w-5 h-5 text-[#d4af37] ml-auto" />
                  )}
                </button>

                {/* 加密货币（境外显示） */}
                <button
                  onClick={() => setPaymentMethod("crypto")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    paymentMethod === "crypto"
                      ? "bg-[#d4af37]/10 border-[#d4af37]"
                      : "bg-[#252525] border-[#3a3a3a]"
                  }`}
                >
                  <div className="w-10 h-10 bg-[#F7931A] rounded-lg flex items-center justify-center text-white font-bold">
                    ₿
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[#f5f5f7]">加密货币</span>
                    <p className="text-[#888] text-xs">境外用户可用</p>
                  </div>
                  {paymentMethod === "crypto" && (
                    <Check className="w-5 h-5 text-[#d4af37] ml-auto" />
                  )}
                </button>
              </div>

              <button
                onClick={handlePayment}
                className="w-full py-3 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-bold"
              >
                确认支付 · ¥{selectedProduct.price}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // 积分商城
  if (showPointsShop) {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border-b border-[#3a3a3a]">
          <button onClick={() => setShowPointsShop(false)} className="p-1">
            <ChevronLeft className="w-6 h-6 text-[#c5c5c5]" />
          </button>
          <span className="text-[#f5f5f7] font-medium">积分商城</span>
        </div>

        {/* 积分信息 */}
        <div className="p-4">
          <div className="bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10 rounded-2xl p-4 border border-[#d4af37]/30">
            <div className="flex items-center gap-2 mb-1">
              <Coins className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#888] text-sm">我的积分</span>
            </div>
            <div className="text-[#d4af37] text-3xl font-bold">{userPoints}</div>
          </div>
        </div>

        {/* 积分商品 */}
        <div className="px-4">
          <div className="text-[#f5f5f7] font-medium mb-3">可兑换商品</div>
          <div className="space-y-3">
            {POINTS_PRODUCTS.map(product => (
              <div key={product.id} className="flex items-center gap-3 p-4 bg-[#252525] rounded-xl border border-[#3a3a3a]">
                <div className="w-12 h-12 bg-[#333] rounded-lg flex items-center justify-center">
                  <Gift className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div className="flex-1">
                  <div className="text-[#f5f5f7]">{product.name}</div>
                  <div className="flex items-center gap-1 text-[#d4af37] text-sm">
                    <Coins className="w-3 h-3" />
                    <span>{product.points}积分</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (userPoints >= product.points) {
                      alert("兑换成功！")
                    } else {
                      alert("积分不足")
                    }
                  }}
                  className={`px-4 py-1.5 rounded-lg text-sm ${
                    userPoints >= product.points
                      ? "bg-[#d4af37] text-[#1a1a1a]"
                      : "bg-[#333] text-[#888]"
                  }`}
                >
                  兑换
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 商城首页
  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-4">
      {/* 顶部搜索 */}
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3 bg-[#1a1a1a]">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-1">
              <ChevronLeft className="w-6 h-6 text-[#c5c5c5]" />
            </button>
          )}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <input
              type="text"
              placeholder="搜索商品..."
              className="w-full bg-[#252525] border border-[#3a3a3a] rounded-full pl-10 pr-4 py-2.5 text-sm text-[#f5f5f7] placeholder:text-[#666] focus:outline-none focus:border-[#d4af37]/50"
            />
          </div>
          <button
            onClick={() => setShowPointsShop(true)}
            className="p-2 bg-[#252525] rounded-full border border-[#3a3a3a]"
          >
            <Coins className="w-5 h-5 text-[#d4af37]" />
          </button>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-[#c5c5c5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c8102e] text-white text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 分类 */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[#d4af37] text-[#1a1a1a] font-medium"
                  : "bg-[#252525] text-[#888] border border-[#3a3a3a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 商品列表 */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map(product => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-[#252525] rounded-xl border border-[#3a3a3a] overflow-hidden text-left hover:border-[#d4af37]/30 transition-all"
            >
              <div className="aspect-square bg-[#333] flex items-center justify-center text-4xl">
                📦
              </div>
              <div className="p-3">
                <div className="text-[#f5f5f7] text-sm line-clamp-2 mb-2 h-10">
                  {product.name}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[#c8102e] font-bold">¥{product.price}</span>
                  <span className="text-[#666] text-xs line-through">¥{product.originalPrice}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-[#888]">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-[#d4af37] fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <span>已售{product.sales}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 底部合规声明 */}
      <div className="px-4 pt-6 pb-2">
        <p className="text-[#555] text-[10px] text-center leading-relaxed">
          本APP中医内容为理论学习，不构成医疗诊断；命理内容为学术交流，不做决策依据。
        </p>
      </div>
    </div>
  )
}
