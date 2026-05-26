"use client"

import { useState } from "react"
import { Play, Eye, ChevronRight, BookOpen, Video, GraduationCap } from "lucide-react"

// Mock Data - 精选推荐轮播数据
const bannerData = [
  {
    id: 1,
    title: "伤寒论精讲系列",
    subtitle: "名师带你深入理解经典",
    tag: "热门推荐",
  },
  {
    id: 2,
    title: "中医入门必修课",
    subtitle: "零基础也能轻松入门",
    tag: "新手必看",
  },
  {
    id: 3,
    title: "本草纲目导读",
    subtitle: "系统学习中药知识",
    tag: "经典课程",
  },
]

// Mock Data - 分类标签
const categories = [
  { id: "beginner", label: "小白入门", icon: GraduationCap },
  { id: "classics", label: "经典带读", icon: BookOpen },
  { id: "video", label: "视频讲座", icon: Video },
]

// Mock Data - 学习资料列表
const coursesData = {
  beginner: [
    {
      id: 1,
      title: "中医基础理论入门",
      instructor: "李明轩",
      views: 12580,
      type: "PDF",
      duration: "32讲",
    },
    {
      id: 2,
      title: "阴阳五行快速理解",
      instructor: "王德华",
      views: 8920,
      type: "视频",
      duration: "15讲",
    },
    {
      id: 3,
      title: "经络穴位速记法",
      instructor: "陈雅琴",
      views: 15600,
      type: "PDF",
      duration: "28讲",
    },
  ],
  classics: [
    {
      id: 4,
      title: "伤寒论硬核导读",
      instructor: "张仲景研究会",
      views: 28900,
      type: "PDF",
      duration: "48讲",
    },
    {
      id: 5,
      title: "金匮要略精讲",
      instructor: "刘志明",
      views: 19200,
      type: "视频",
      duration: "36讲",
    },
    {
      id: 6,
      title: "黄帝内经逐句解读",
      instructor: "国医馆",
      views: 35600,
      type: "PDF",
      duration: "120讲",
    },
  ],
  video: [
    {
      id: 7,
      title: "名老中医临床经验",
      instructor: "北京中医药大学",
      views: 42300,
      type: "视频",
      duration: "24讲",
    },
    {
      id: 8,
      title: "方剂学系统精讲",
      instructor: "赵国栋",
      views: 18700,
      type: "视频",
      duration: "56讲",
    },
    {
      id: 9,
      title: "中药学实战应用",
      instructor: "广州中医药大学",
      views: 22100,
      type: "视频",
      duration: "40讲",
    },
  ],
}

export function AcademyPage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [activeCategory, setActiveCategory] = useState("beginner")

  const formatViews = (views: number) => {
    if (views >= 10000) {
      return (views / 10000).toFixed(1) + "万"
    }
    return views.toString()
  }

  return (
    <div className="min-h-screen pb-4">
      {/* 页面标题 */}
      <header className="pt-12 px-4 pb-4">
        <h1 className="text-2xl font-bold text-[#f5f5f7] tracking-wide">
          中医学堂
        </h1>
        <p className="text-sm text-[#a0a0a0] mt-1">传承经典，启迪智慧</p>
      </header>

      {/* 精选推荐 Banner 轮播 */}
      <section className="px-4 mb-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#3a3a3a]">
          {/* 装饰元素 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#c8102e]/5 rounded-full blur-2xl" />
          
          <div className="relative p-5">
            {/* 标签 */}
            <span className="inline-block px-2 py-0.5 text-xs bg-[#c8102e] text-[#f5f5f7] rounded mb-3">
              {bannerData[currentBanner].tag}
            </span>
            
            <h2 className="text-xl font-bold text-[#f5f5f7] mb-2">
              {bannerData[currentBanner].title}
            </h2>
            <p className="text-sm text-[#a0a0a0] mb-4">
              {bannerData[currentBanner].subtitle}
            </p>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#1a1a1a] rounded-lg text-sm font-medium transition-all hover:bg-[#e5c048]">
              <Play className="w-4 h-4" />
              立即学习
            </button>
          </div>

          {/* 轮播指示器 */}
          <div className="flex justify-center gap-2 pb-4">
            {bannerData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentBanner === index
                    ? "bg-[#d4af37] w-6"
                    : "bg-[#3a3a3a]"
                }`}
                aria-label={`切换到第${index + 1}个推荐`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 分类标签切卡 */}
      <section className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#d4af37] text-[#1a1a1a]"
                    : "bg-[#2a2a2a] text-[#a0a0a0] border border-[#3a3a3a]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* 分隔装饰线 */}
      <div className="mx-4 mb-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
      </div>

      {/* 学习资料列表 */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#f5f5f7]">
            {categories.find(c => c.id === activeCategory)?.label}
          </h3>
          <button className="flex items-center gap-1 text-sm text-[#d4af37]">
            查看全部
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 资料卡片列表 */}
        <div className="space-y-4">
          {coursesData[activeCategory as keyof typeof coursesData].map((course) => (
            <article
              key={course.id}
              className="flex gap-4 p-3 bg-[#2a2a2a]/50 rounded-xl border border-[#3a3a3a] transition-all hover:border-[#d4af37]/30"
            >
              {/* 封面图占位 */}
              <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <BookOpen className="w-8 h-8 text-[#d4af37]/60 mx-auto mb-1" />
                  <span className="text-[10px] text-[#a0a0a0]">{course.type}</span>
                </div>
              </div>

              {/* 资料信息 */}
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <h4 className="text-[#f5f5f7] font-medium text-sm line-clamp-2 mb-1">
                    {course.title}
                  </h4>
                  <p className="text-xs text-[#a0a0a0]">
                    {course.instructor} · {course.duration}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#a0a0a0]">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{formatViews(course.views)}人学习</span>
                  </div>

                  <button className="px-3 py-1.5 bg-[#c8102e] text-[#f5f5f7] text-xs font-medium rounded-md transition-all hover:bg-[#d92038]">
                    开始学习
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 底部装饰 */}
      <div className="mt-6 px-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#3a3a3a] to-transparent" />
        <p className="text-center text-xs text-[#a0a0a0]/50 mt-4">
          — 学海无涯，医道传承 —
        </p>
      </div>
    </div>
  )
}
