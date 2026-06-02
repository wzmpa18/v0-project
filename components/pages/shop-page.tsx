"use client"

import {
  ShoppingBag,
  Search,
  Star,
  Heart,
  ShoppingCart,
  ChevronRight,
  Zap,
  Gift,
  TrendingUp,
  Package,
  Clock
} from "lucide-react"
import { useState } from "react"

interface Product {
  id: string
  title: string
  category: string
  cover: string
  price: string
  originalPrice: string
  rating: number
  sales: number
  isHot: boolean
  isNew: boolean
  isFlash: boolean
}

const products: Product[] = [
  {
    id: "1",
    title: "纯铜罗盘",
    category: "风水",
    cover: "罗",
    price: "¥299",
    originalPrice: "¥399",
    rating: 4.9,
    sales: 2580,
    isHot: true,
    isNew: true,
    isFlash: true
  },
  {
    id: "2",
    title: "仿古宣纸套装",
    category: "文具",
    cover: "宣",
    price: "¥168",
    originalPrice: "¥238",
    rating: 4.8,
    sales: 1860,
    isHot: true,
    isNew: false,
    isFlash: false
  },
  {
    id: "3",
    title: "五帝钱挂件",
    category: "风水",
    cover: "五",
    price: "¥88",
    originalPrice: "¥128",
    rating: 4.7,
    sales: 5280,
    isHot: false,
    isNew: true,
    isFlash: false
  },
  {
    id: "4",
    title: "紫砂壶",
    category: "茶具",
    cover: "紫",
    price: "¥688",
    originalPrice: "¥888",
    rating: 4.9,
    sales: 860,
    isHot: true,
    isNew: false,
    isFlash: true
  },
  {
    id: "5",
    title: "艾灸套装",
    category: "中医",
    cover: "艾",
    price: "¥128",
    originalPrice: "¥188",
    rating: 4.8,
    sales: 3280,
    isHot: false,
    isNew: true,
    isFlash: false
  },
  {
    id: "6",
    title: "毛笔套装",
    category: "文具",
    cover: "笔",
    price: "¥268",
    originalPrice: "¥358",
    rating: 4.6,
    sales: 2180,
    isHot: false,
    isNew: false,
    isFlash: true
  },
]

export function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "全部" },
    { id: "风水", label: "风水" },
    { id: "文具", label: "文具" },
    { id: "中医", label: "中医" },
    { id: "茶具", label: "茶具" },
    { id: "收藏", label: "收藏" },
  ]

  const carouselItems = [
    { id: "1", title: "年终大促 · 全场满减", color: "#c8102e" },
    { id: "2", title: "新品首发 · 限时优惠", color: "#d4af37" },
    { id: "3", title: "经典传承 · 精选好物", color: "#0891b2" }
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* 顶部搜索区域 */}
      <div className="px-4 pt-6 pb-4 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索商品..."
              className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#c8102e]/20 focus:outline-none text-gray-800"
            />
          </div>
          <ShoppingBag className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      {/* 轮播图 */}
      <div className="px-4 mb-4">
        <div className="h-32 bg-gradient-to-r from-[#c8102e] to-[#d4af37] rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-sm">
            年终大促 · 全场满减
        </div>
      </div>

      {/* 分类导航 */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[
            { id: "1", label: "限时闪购", icon: Zap, color: "#c8102e" },
            { id: "2", label: "风水法器", icon: Gift, color: "#d4af37" },
            { id: "3", label: "文房四宝", icon: Package, color: "#0891b2" },
            { id: "4", label: "中医养生", icon: Heart, color: "#10b981" },
            { id: "5", label: "收藏好物", icon: TrendingUp, color: "#8b5cf6" }
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className="flex flex-col items-center"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <span className="text-xs text-gray-700">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 分类切换 */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? "bg-[#c8102e] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* 商品列表 */}
      <div className="px-4 space-y-4 pb-24">
        {/* 限时闪购 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#c8102e]" />
              <h2 className="font-bold text-gray-800">限时闪购</h2>
              <span className="flex items-center gap-1 px-2 text-xs text-[#c8102e] bg-[#c8102e]/10 px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />
                23:45:30
              </span>
            </div>
            <button className="text-[#c8102e] text-sm flex items-center gap-1">
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.filter(p => p.isFlash).map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="relative">
                  <div className="h-32 bg-gradient-to-br from-[#c8102e]/10 to-[#d4af37]/10 flex items-center justify-center">
                    <span className="text-4xl">{product.cover}</span>
                  </div>
                  {product.isHot && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#c8102e] text-white text-xs rounded-full">
                      热销
                    </div>
                  )}
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{product.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-[#c8102e]">{product.price}</span>
                      <span className="text-xs text-gray-400 line-through ml-1">{product.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#d4af37] fill-current" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">已售 {product.sales.toLocaleString()}</span>
                    <button className="px-2.5 py-1 bg-[#c8102e] text-white text-xs font-medium rounded-lg flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      抢
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 热门商品 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">热门商品</h2>
            <button className="text-[#d4af37] text-sm flex items-center gap-1">
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="relative">
                  <div className="h-32 bg-gradient-to-br from-[#d4af37]/10 to-[#0891b2]/10 flex items-center justify-center">
                    <span className="text-4xl">{product.cover}</span>
                  </div>
                  {product.isNew && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#d4af37] text-white text-xs rounded-full">
                      新品
                    </div>
                  )}
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{product.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-[#d4af37]">{product.price}</span>
                      <span className="text-xs text-gray-400 line-through ml-1">{product.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#d4af37] fill-current" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">已售 {product.sales.toLocaleString()}</span>
                    <button className="px-2.5 py-1 bg-[#d4af37] text-white text-xs font-medium rounded-lg flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      加购
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}