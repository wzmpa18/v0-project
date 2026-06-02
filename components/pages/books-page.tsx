"use client"

import {
  BookOpen,
  Search,
  Star,
  BookMarked,
  FileText,
  ChevronRight,
  BookCheck,
  Clock
} from "lucide-react"
import { useState } from "react"

interface Book {
  id: string
  title: string
  author: string
  category: string
  cover: string
  rating: number
  readers: number
  description: string
  isNew: boolean
  isHot: boolean
}

const books: Book[] = [
  {
    id: "1",
    title: "黄帝内经",
    author: "古代医家",
    category: "中医",
    cover: "黄",
    rating: 4.9,
    readers: 52800,
    description: "中医学的理论源头，包含《素问》和《灵枢》，阐述了人与自然和谐统一的理念",
    isNew: false,
    isHot: true
  },
  {
    id: "2",
    title: "伤寒论",
    author: "张仲景",
    category: "中医",
    cover: "伤",
    rating: 4.8,
    readers: 38600,
    description: "经典方剂学巨著，确立了六经辨证论治体系，中医临床必读之作",
    isNew: true,
    isHot: true
  },
  {
    id: "3",
    title: "易经",
    author: "伏羲/文王",
    category: "易经",
    cover: "易",
    rating: 4.9,
    readers: 45200,
    description: "群经之首，大道之源，包含六十四卦，阐述宇宙万物变化规律",
    isNew: false,
    isHot: true
  },
  {
    id: "4",
    title: "滴天髓",
    author: "京图",
    category: "命理",
    cover: "滴",
    rating: 4.7,
    readers: 26800,
    description: "八字命理的经典著作，论述了五行生克、格局成败的理论",
    isNew: true,
    isHot: false
  },
  {
    id: "5",
    title: "神农本草经",
    author: "古代医家",
    category: "中医",
    cover: "神",
    rating: 4.8,
    readers: 32400,
    description: "中药学的开山之作，记载了365种药物的性味功效",
    isNew: false,
    isHot: false
  },
  {
    id: "6",
    title: "渊海子平",
    author: "徐子平",
    category: "命理",
    cover: "渊",
    rating: 4.6,
    readers: 28900,
    description: "八字命理的奠基之作，确立了以日干为主的分析体系",
    isNew: true,
    isHot: true
  },
]

export function BooksPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "全部" },
    { id: "中医", label: "中医" },
    { id: "易经", label: "易经" },
    { id: "命理", label: "命理" },
    { id: "风水", label: "风水" },
    { id: "艺术", label: "艺术" },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* 顶部搜索区域 */}
      <div className="px-4 pt-6 pb-4 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-[#d4af37]" />
          <h1 className="text-xl font-bold text-gray-800">经典书籍</h1>
        </div>

        {/* 搜索栏 */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索书名、作者..."
            className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0891b2]/20 focus:outline-none text-gray-800"
          />
        </div>

        {/* 分类切换 */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? "bg-[#d4af37] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* 书籍列表 */}
      <div className="px-4 py-4 space-y-4 pb-24">
        {/* 热门推荐 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">热门推荐</h2>
            <button className="text-[#d4af37] text-sm flex items-center gap-1">
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {books.filter(b => b.isHot).map(book => (
              <div
                key={book.id}
                className="w-32 flex-shrink-0"
              >
                <div className="relative mb-2">
                  <div className="h-40 bg-gradient-to-br from-[#d4af37]/10 to-[#c8102e]/10 rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                    <span className="text-4xl text-[#d4af37]">{book.cover}</span>
                  </div>
                  {book.isNew && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#c8102e] text-white text-xs rounded-full">
                      新书
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-xs text-gray-500 mb-1">{book.author}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#d4af37] fill-current" />
                  <span className="text-xs text-gray-600">{book.rating}</span>
                  <span className="text-xs text-gray-400">· {book.readers.toLocaleString()}人</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 全部书籍 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">全部书籍</h2>
          </div>
          <div className="space-y-3">
            {books.map(book => (
              <div
                key={book.id}
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-100"
              >
                <div className="relative w-20 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-[#d4af37]/10 to-[#c8102e]/10 flex items-center justify-center">
                    <span className="text-3xl text-[#d4af37]">{book.cover}</span>
                  </div>
                  {book.isNew && (
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#d4af37] text-white text-xs rounded-full">
                      新
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-800 line-clamp-1">{book.title}</h3>
                    <button className="p-1 text-gray-400 hover:text-[#d4af37]">
                      <BookMarked className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{book.author} · {book.category}</p>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{book.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#d4af37] fill-current" />
                        <span className="text-gray-600">{book.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <BookCheck className="w-3 h-3" />
                        <span>{book.readers.toLocaleString()}人</span>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-[#d4af37] text-white text-xs font-medium rounded-lg">
                      开始阅读
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 读书进度 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">我的书架</h2>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-16 bg-gradient-to-br from-[#0891b2]/10 to-[#d4af37]/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl text-[#0891b2]">易</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">易经</h3>
                  <p className="text-xs text-gray-500">伏羲/文王 · 已读 72%</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-[#0891b2] text-white text-xs font-medium rounded-lg">
                继续阅读
              </button>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-[72%] h-full bg-gradient-to-r from-[#0891b2] to-[#d4af37]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}