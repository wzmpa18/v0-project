"use client"

import {
  GraduationCap,
  BookOpen,
  Play,
  Star,
  Clock,
  Users,
  ChevronRight,
  Search
} from "lucide-react"
import { useState } from "react"

interface Course {
  id: string
  title: string
  teacher: string
  cover: string
  category: string
  students: number
  duration: string
  rating: number
  isHot: boolean
  isNew: boolean
  price: string
}

const courses: Course[] = [
  {
    id: "1",
    title: "八字命理入门到精通",
    teacher: "易道大师",
    cover: "八",
    category: "命理",
    students: 12580,
    duration: "36课时",
    rating: 4.8,
    isHot: true,
    isNew: true,
    price: "免费"
  },
  {
    id: "2",
    title: "易经智慧与人生决策",
    teacher: "墨香斋主",
    cover: "易",
    category: "易经",
    students: 8650,
    duration: "24课时",
    rating: 4.9,
    isHot: true,
    isNew: false,
    price: "¥199"
  },
  {
    id: "3",
    title: "中医养生与健康管理",
    teacher: "医道传承",
    cover: "医",
    category: "中医",
    students: 7200,
    duration: "48课时",
    rating: 4.7,
    isHot: false,
    isNew: true,
    price: "¥299"
  },
  {
    id: "4",
    title: "紫微斗数实战应用",
    teacher: "紫微隐士",
    cover: "紫",
    category: "命理",
    students: 6890,
    duration: "32课时",
    rating: 4.6,
    isHot: true,
    isNew: false,
    price: "¥168"
  },
  {
    id: "5",
    title: "书法艺术与文化传承",
    teacher: "墨香斋主",
    cover: "书",
    category: "艺术",
    students: 5340,
    duration: "28课时",
    rating: 4.9,
    isHot: false,
    isNew: true,
    price: "免费"
  },
]

export function ClassPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "全部" },
    { id: "命理", label: "命理" },
    { id: "易经", label: "易经" },
    { id: "中医", label: "中医" },
    { id: "风水", label: "风水" },
    { id: "艺术", label: "艺术" },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* 顶部搜索区域 */}
      <div className="px-4 pt-6 pb-4 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-6 h-6 text-[#0891b2]" />
          <h1 className="text-xl font-bold text-gray-800">课堂学习</h1>
        </div>

        {/* 搜索栏 */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索课程、讲师..."
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
                  ? "bg-[#0891b2] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* 课程列表 */}
      <div className="px-4 py-4 space-y-4 pb-24">
        {/* 热门推荐卡片 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">热门推荐</h2>
            <button className="text-[#0891b2] text-sm flex items-center gap-1">
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {courses.filter(c => c.isHot).map(course => (
              <div
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="relative">
                  <div className="h-32 bg-gradient-to-br from-[#0891b2]/10 to-[#d4af37]/10 flex items-center justify-center">
                    <span className="text-4xl">{course.cover}</span>
                  </div>
                  {course.isNew && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#d4af37] text-white text-xs rounded-full">
                      新课
                    </div>
                  )}
                  {course.isHot && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#c8102e] text-white text-xs rounded-full">
                      热门
                    </div>
                  )}
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <BookOpen className="w-3 h-3" />
                    <span>{course.teacher}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#d4af37] fill-current" />
                      <span className="text-xs text-gray-600">{course.rating}</span>
                      <span className="text-xs text-gray-400">· {course.students.toLocaleString()}人</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      course.price === "免费" ? "text-[#0891b2]" : "text-[#c8102e]"
                    }`}>
                      {course.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 全部课程 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">全部课程</h2>
          </div>
          <div className="space-y-3">
            {courses.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-100"
              >
                <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-[#0891b2]/10 to-[#d4af37]/10 flex items-center justify-center">
                    <span className="text-2xl">{course.cover}</span>
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-[#0891b2] fill-current" />
                    </div>
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{course.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full">{course.category}</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">{course.teacher}</span>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-[#d4af37] fill-current" />
                        <span className="text-xs text-gray-600">{course.rating}</span>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${
                      course.price === "免费" ? "text-[#0891b2]" : "text-[#c8102e]"
                    }`}>
                      {course.price}
                    </span>
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