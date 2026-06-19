"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, BookOpen, Play, FileText, Award, ChevronRight, Clock, Eye, X } from "lucide-react"
import { createCacheKey, readCacheValue, saveCacheValue } from "@/lib/offline-cache"
import { fetchDuanziBatch, type DuanziDirection, type DuanziItem } from "@/lib/duanzi-service"
import { getRuntimeConfig } from "@/lib/app-config"

// 学习分类
const STUDY_CATEGORIES = [
  { id: "all", label: "精选" },
  { id: "classics", label: "经典" },
  { id: "lecture", label: "讲堂" },
  { id: "yixue", label: "易学" },
  { id: "tcm", label: "中医" },
  { id: "yangsheng", label: "养生" },
]

// 子分类标签
const SUB_TAGS: Record<string, string[]> = {
  all: ["全部", "入门", "进阶", "名家", "热门"],
  classics: ["全部", "方剂", "中基", "针灸", "周易", "黄帝内经", "伤寒论", "金匮要略", "神农本草经"],
  lecture: ["全部", "倪海厦", "张景明", "郝万山", "刘渡舟", "胡希恕", "黄煌"],
  yixue: ["全部", "八字", "紫微", "六爻", "奇门", "风水", "面相", "手相"],
  tcm: ["全部", "中药", "方剂", "中诊", "针灸", "推拿", "内科", "外科"],
  yangsheng: ["全部", "八段锦", "太极", "食疗", "艾灸", "经络"],
}

// 古籍书架数据
const CLASSICS_BOOKS = [
  // 命理类
  { id: "yuanhai", name: "渊海子平", author: "徐子平", category: "yixue", desc: "八字命理经典", views: 125000 },
  { id: "sanming", name: "三命通会", author: "万民英", category: "yixue", desc: "命理学大成之作", views: 98000 },
  { id: "ditianshui", name: "滴天髓", author: "京图", category: "yixue", desc: "命理精髓", views: 87000 },
  { id: "qiongtong", name: "穷通宝鉴", author: "余春台", category: "yixue", desc: "调候用神专著", views: 76000 },
  { id: "zipingzhenquan", name: "子平真诠", author: "沈孝瞻", category: "yixue", desc: "正统命理", views: 65000 },
  // 紫微类
  { id: "ziweidoushu", name: "紫微斗数全书", author: "陈希夷", category: "yixue", desc: "紫微斗数经典", views: 89000 },
  // 六爻类
  { id: "huangjinjing", name: "黄金策", author: "刘伯温", category: "yixue", desc: "六爻占卜", views: 54000 },
  { id: "zengshan", name: "增删卜易", author: "野鹤老人", category: "yixue", desc: "六爻入门必读", views: 67000 },
  // 奇门类
  { id: "yanbo", name: "烟波钓叟歌", author: "赵普", category: "yixue", desc: "奇门遁甲口诀", views: 45000 },
  { id: "qimentongzong", name: "奇门遁甲统宗", author: "佚名", category: "yixue", desc: "奇门大全", views: 38000 },
  // 六壬类
  { id: "liurendaquan", name: "六壬大全", author: "郭御青", category: "yixue", desc: "大六壬权威", views: 42000 },
  { id: "liurenzhiyin", name: "大六壬指南", author: "陈公献", category: "yixue", desc: "六壬入门", views: 35000 },
  // 风水类
  { id: "zangshujing", name: "葬书", author: "郭璞", category: "yixue", desc: "风水鼻祖", views: 56000 },
  { id: "qingnangjing", name: "青囊经", author: "黄石公", category: "yixue", desc: "风水秘籍", views: 48000 },
  // 周易类
  { id: "zhouyi", name: "周易", author: "伏羲/文王", category: "yixue", desc: "群经之首", views: 156000 },
  { id: "meihuayishu", name: "梅花易数", author: "邵康节", category: "yixue", desc: "象数易学", views: 78000 },
  // 中医类
  { id: "huangdineijing", name: "黄帝内经", author: "岐伯", category: "tcm", desc: "中医理论奠基", views: 187000 },
  { id: "shanghanlun", name: "伤寒论", author: "张仲景", category: "tcm", desc: "方书之祖", views: 245000 },
  { id: "jinkuiyaolue", name: "金匮要略", author: "张仲景", category: "tcm", desc: "杂病论治", views: 198000 },
  { id: "shennongbencao", name: "神农本草经", author: "神农氏", category: "tcm", desc: "本草学鼻祖", views: 156000 },
  { id: "bencaogangmu", name: "本草纲目", author: "李时珍", category: "tcm", desc: "本草学集大成", views: 134000 },
  { id: "zhenjiudacheng", name: "针灸大成", author: "杨继洲", category: "tcm", desc: "针灸学集成", views: 89000 },
  { id: "yizongbidu", name: "医宗必读", author: "李中梓", category: "tcm", desc: "中医入门必读", views: 67000 },
]

// 讲堂课程数据
const LECTURE_COURSES = [
  { id: 1, title: "倪海厦-人纪黄帝内经", teacher: "倪海厦", category: "tcm", duration: "38:31:14", views: 487000, free: true, tag: "经典" },
  { id: 2, title: "倪海厦-人纪伤寒论", teacher: "倪海厦", category: "tcm", duration: "28:49:08", views: 199000, free: true, tag: "经典" },
  { id: 3, title: "倪海厦-人纪针灸大成", teacher: "倪海厦", category: "tcm", duration: "39:17:34", views: 340000, free: true, tag: "经典" },
  { id: 4, title: "倪海厦-人纪金匮要略", teacher: "倪海厦", category: "tcm", duration: "38:33:48", views: 88000, free: true, tag: "经典" },
  { id: 5, title: "倪海厦-人纪神农本草经", teacher: "倪海厦", category: "tcm", duration: "29:48:32", views: 102000, free: true, tag: "经典" },
  { id: 6, title: "倪海厦-天纪", teacher: "倪海厦", category: "yixue", duration: "43:33:14", views: 102000, free: true, tag: "易学" },
  { id: 7, title: "郝万山精讲伤寒论", teacher: "郝万山", category: "tcm", duration: "150:04:00", views: 133000, free: true, tag: "经典" },
  { id: 8, title: "八纲辨证-倪海厦", teacher: "倪海厦", category: "tcm", duration: "02:49:13", views: 23000, free: true, tag: "诊断" },
  { id: 9, title: "张景明中医基础理论", teacher: "张景明", category: "tcm", duration: "45:20:00", views: 156000, free: true, tag: "入门" },
  { id: 10, title: "黄煌经方系列", teacher: "黄煌", category: "tcm", duration: "16:19:23", views: 26000, free: false, tag: "方剂" },
  { id: 11, title: "八字命理入门精讲", teacher: "命理学堂", category: "yixue", duration: "12:30:00", views: 45000, free: true, tag: "入门" },
  { id: 12, title: "紫微斗数系统课程", teacher: "紫微研究会", category: "yixue", duration: "28:00:00", views: 32000, free: false, tag: "进阶" },
]

const DUANZI_DIRECTIONS: Array<{ id: DuanziDirection; label: string; hint: string }> = [
  { id: "beginner", label: "入门方向", hint: "概念拆解" },
  { id: "classics", label: "经典方向", hint: "古籍场景化" },
  { id: "clinical", label: "临证方向", hint: "辨证落地" },
  { id: "yangsheng", label: "养生方向", hint: "生活化实践" },
  { id: "yixue", label: "易学方向", hint: "决策场景" },
]

const CATEGORY_TO_DIRECTION: Record<string, DuanziDirection> = {
  all: "beginner",
  classics: "classics",
  lecture: "clinical",
  yixue: "yixue",
  tcm: "clinical",
  yangsheng: "yangsheng",
}

interface DuzaniDirectionState {
  items: DuanziItem[]
  nextCursor: string | null
  hasMore: boolean
  loading: boolean
  loaded: boolean
  error: string
}

function createDirectionState(): DuzaniDirectionState {
  return {
    items: [],
    nextCursor: null,
    hasMore: true,
    loading: false,
    loaded: false,
    error: "",
  }
}

function mergeDuanziItems(existing: DuanziItem[], incoming: DuanziItem[]): DuanziItem[] {
  const map = new Map<string, DuanziItem>()
  for (const item of existing) {
    map.set(item.id, item)
  }
  for (const item of incoming) {
    map.set(item.id, item)
  }
  return Array.from(map.values())
}

interface StudyPageProps {
  onNavigateToClassic?: (bookId: string) => void
}

export function StudyPage({ onNavigateToClassic }: StudyPageProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeSubTag, setActiveSubTag] = useState("全部")
  const [searchText, setSearchText] = useState("")
  const [showBookDetail, setShowBookDetail] = useState<typeof CLASSICS_BOOKS[0] | null>(null)
  const [showCourseDetail, setShowCourseDetail] = useState<typeof LECTURE_COURSES[0] | null>(null)
  const [activeDuanziDirection, setActiveDuanziDirection] = useState<DuanziDirection>("beginner")
  const [duanziState, setDuanziState] = useState<Record<DuanziDirection, DuzaniDirectionState>>({
    beginner: createDirectionState(),
    classics: createDirectionState(),
    clinical: createDirectionState(),
    yangsheng: createDirectionState(),
    yixue: createDirectionState(),
  })

  const cacheKey = useMemo(() => createCacheKey(getRuntimeConfig().offlineCachePrefix, "study-duanzi-v1"), [])

  // 过滤书籍
  const filteredBooks = CLASSICS_BOOKS.filter(book => {
    if (activeCategory !== "all" && activeCategory !== "classics" && book.category !== activeCategory) return false
    if (searchText && !book.name.includes(searchText) && !book.author.includes(searchText)) return false
    return true
  })

  // 过滤课程
  const filteredCourses = LECTURE_COURSES.filter(course => {
    if (activeCategory !== "all" && activeCategory !== "lecture" && course.category !== activeCategory) return false
    if (searchText && !course.title.includes(searchText) && !course.teacher.includes(searchText)) return false
    if (activeSubTag !== "全部" && !course.tag.includes(activeSubTag) && !course.teacher.includes(activeSubTag)) return false
    return true
  })

  const currentDuanzi = duanziState[activeDuanziDirection]

  const updateDirectionState = (direction: DuanziDirection, patch: Partial<DuzaniDirectionState>) => {
    setDuanziState((previous) => ({
      ...previous,
      [direction]: {
        ...previous[direction],
        ...patch,
      },
    }))
  }

  const loadDuanzi = async (direction: DuanziDirection, mode: "initial" | "more" | "switch-refresh") => {
    const snapshot = duanziState[direction]
    if (snapshot.loading) {
      return
    }

    if (mode !== "initial" && !snapshot.hasMore) {
      return
    }

    updateDirectionState(direction, { loading: true, error: "" })

    try {
      const batch = await fetchDuanziBatch(direction, mode === "initial" ? null : snapshot.nextCursor, mode === "more" ? 6 : 4)
      const mergedItems = mergeDuanziItems(snapshot.items, batch.items)

      updateDirectionState(direction, {
        items: mergedItems,
        nextCursor: batch.nextCursor,
        hasMore: batch.hasMore,
        loaded: true,
        loading: false,
        error: "",
      })
    } catch (error) {
      updateDirectionState(direction, {
        loading: false,
        loaded: true,
        error: error instanceof Error ? error.message : "段子加载失败",
      })
    }
  }

  useEffect(() => {
    const cached = readCacheValue<Record<DuanziDirection, DuzaniDirectionState>>(cacheKey)
    if (!cached) {
      return
    }

    setDuanziState({
      beginner: cached.beginner ?? createDirectionState(),
      classics: cached.classics ?? createDirectionState(),
      clinical: cached.clinical ?? createDirectionState(),
      yangsheng: cached.yangsheng ?? createDirectionState(),
      yixue: cached.yixue ?? createDirectionState(),
    })
  }, [cacheKey])

  useEffect(() => {
    saveCacheValue(cacheKey, duanziState)
  }, [cacheKey, duanziState])

  useEffect(() => {
    const mappedDirection = CATEGORY_TO_DIRECTION[activeCategory] ?? "beginner"
    setActiveDuanziDirection(mappedDirection)
  }, [activeCategory])

  useEffect(() => {
    const directionState = duanziState[activeDuanziDirection]
    if (!directionState.loaded && !directionState.loading) {
      loadDuanzi(activeDuanziDirection, "initial")
      return
    }

    if (directionState.loaded && directionState.hasMore && !directionState.loading) {
      loadDuanzi(activeDuanziDirection, "switch-refresh")
    }
  }, [activeDuanziDirection])

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24 bg-[#1a1a1a]">
      {/* 搜索栏 */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="搜索古籍、课程、名师..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#252525] border border-[#333] rounded-full text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d4af37]/50"
          />
        </div>
      </div>

      {/* 分类导航 */}
      <div className="px-4 py-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {STUDY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setActiveSubTag("全部")
              }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition-all ${
                activeCategory === cat.id
                  ? "bg-[#d4af37] text-[#1a1a1a] font-medium"
                  : "bg-[#252525] text-gray-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 子分类标签 */}
      <div className="px-4 py-2">
        <div className="flex flex-wrap gap-2">
          {(SUB_TAGS[activeCategory] || SUB_TAGS.all).slice(0, 8).map(tag => (
            <button
              key={tag}
              onClick={() => setActiveSubTag(tag)}
              className={`px-3 py-1 rounded-md text-xs transition-all ${
                activeSubTag === tag
                  ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50"
                  : "bg-[#252525] text-gray-500 border border-transparent hover:text-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 古籍书架 */}
      {(activeCategory === "all" || activeCategory === "classics" || activeCategory === "yixue" || activeCategory === "tcm") && (
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#d4af37]" />
              古籍书城
            </h3>
            <button className="text-xs text-[#d4af37] flex items-center">
              更多 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {filteredBooks.slice(0, 8).map(book => (
              <button
                key={book.id}
                onClick={() => setShowBookDetail(book)}
                className="flex flex-col items-center"
              >
                <div className="w-full aspect-[3/4] bg-gradient-to-b from-[#3a2a1a] to-[#2a1a0a] rounded-lg flex items-center justify-center border border-[#d4af37]/20 mb-1.5 hover:border-[#d4af37]/50 transition-all">
                  <span className="text-[#d4af37] text-xs font-medium text-center leading-tight px-1">
                    {book.name.length > 4 ? book.name.slice(0, 2) + "\n" + book.name.slice(2) : book.name}
                  </span>
                </div>
                <span className="text-xs text-gray-400 truncate w-full text-center">{book.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 讲堂课程 */}
      {(activeCategory === "all" || activeCategory === "lecture" || activeCategory === "yixue" || activeCategory === "tcm") && (
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Play className="w-4 h-4 text-[#d4af37]" />
              名家讲堂
            </h3>
            <button className="text-xs text-[#d4af37] flex items-center">
              更多 <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredCourses.slice(0, 6).map(course => (
              <button
                key={course.id}
                onClick={() => setShowCourseDetail(course)}
                className="bg-[#252525] rounded-xl overflow-hidden text-left hover:bg-[#2a2a2a] transition-all"
              >
                {/* 封面 */}
                <div className="aspect-video bg-gradient-to-br from-[#2a3a4a] to-[#1a2a3a] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/80 text-sm font-medium text-center px-2">{course.title.slice(0, 8)}</span>
                  </div>
                  {/* 时长 */}
                  <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white">
                    {course.duration}
                  </div>
                  {/* 免费/付费标签 */}
                  <div className={`absolute top-1 right-1 px-1.5 py-0.5 rounded text-[10px] ${
                    course.free ? "bg-[#22c55e] text-white" : "bg-[#f59e0b] text-white"
                  }`}>
                    {course.free ? "免费" : "付费"}
                  </div>
                  {/* 播放量 */}
                  <div className="absolute bottom-1 left-1 flex items-center gap-1 text-[10px] text-white/70">
                    <Play className="w-2.5 h-2.5" />
                    {(course.views / 10000).toFixed(1)}万
                  </div>
                </div>
                {/* 信息 */}
                <div className="p-2">
                  <h4 className="text-xs text-white truncate mb-1">{course.title}</h4>
                  <p className="text-[10px] text-gray-500">{course.teacher}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 学习工具 */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium flex items-center gap-2">
            <Award className="w-4 h-4 text-[#d4af37]" />
            学习工具
          </h3>
        </div>
        
        <div className="grid grid-cols-5 gap-3">
          {[
            { icon: "导", name: "课程导图", color: "#0891b2" },
            { icon: "题", name: "题库练习", color: "#8b5cf6" },
            { icon: "背", name: "方药背诵", color: "#22c55e" },
            { icon: "识", name: "中药识别", color: "#f59e0b" },
            { icon: "算", name: "计量换算", color: "#ef4444" },
          ].map(tool => (
            <button key={tool.name} className="flex flex-col items-center gap-1.5">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: tool.color + "20", color: tool.color }}
              >
                {tool.icon}
              </div>
              <span className="text-[10px] text-gray-400">{tool.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 场景段子 */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#d4af37]" />
            场景段子
          </h3>
          <button
            onClick={() => loadDuanzi(activeDuanziDirection, "switch-refresh")}
            className="text-xs text-[#d4af37]"
          >
            拉取新段子
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {DUANZI_DIRECTIONS.map((direction) => (
            <button
              key={direction.id}
              onClick={() => setActiveDuanziDirection(direction.id)}
              className={`flex-shrink-0 rounded-full border px-3 py-1.5 text-xs transition-all ${
                activeDuanziDirection === direction.id
                  ? "border-[#d4af37]/60 bg-[#d4af37]/15 text-[#f5f5f7]"
                  : "border-[#333] bg-[#252525] text-gray-400"
              }`}
            >
              {direction.label}
            </button>
          ))}
        </div>

        <div className="space-y-2 pt-2">
          {currentDuanzi.items.length === 0 && currentDuanzi.loading && (
            <div className="rounded-lg border border-[#333] bg-[#252525] px-3 py-4 text-xs text-gray-400">
              正在按方向拉取段子...
            </div>
          )}

          {currentDuanzi.items.map((item) => (
            <article key={item.id} className="rounded-xl border border-[#333] bg-[#252525] p-3">
              <div className="mb-1 flex items-center justify-between">
                <h4 className="text-sm font-medium text-white">{item.title}</h4>
                <span className="text-[10px] text-gray-500">{DUANZI_DIRECTIONS.find((d) => d.id === item.direction)?.hint}</span>
              </div>
              <p className="text-xs leading-relaxed text-gray-300">{item.content}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span key={`${item.id}-${tag}`} className="rounded bg-[#1f1f1f] px-1.5 py-0.5 text-[10px] text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {currentDuanzi.error && (
          <div className="mt-2 rounded-lg border border-[#c8102e]/40 bg-[#c8102e]/10 px-3 py-2 text-xs text-[#f9b4bf]">
            {currentDuanzi.error}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-gray-500">切换方向会优先读取本地缓存，再增量拉取新内容</span>
          <button
            onClick={() => loadDuanzi(activeDuanziDirection, "more")}
            disabled={currentDuanzi.loading || !currentDuanzi.hasMore}
            className="rounded-md border border-[#d4af37]/40 px-3 py-1.5 text-xs text-[#d4af37] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {currentDuanzi.loading ? "加载中..." : currentDuanzi.hasMore ? "加载更多" : "已到底"}
          </button>
        </div>
      </div>

      {/* 免责声明 */}
      <div className="px-4 py-3">
        <div className="bg-[#252525] rounded-lg p-3 border border-[#333]">
          <p className="text-[10px] text-gray-500 leading-relaxed">
            声明：本平台所有内容仅供传统文化学习交流使用，易学类内容融合现代心理学与能量学视角解读，
            中医类内容仅供学习参考，不作为医疗诊断依据。如有疑问请咨询专业人士。
          </p>
        </div>
      </div>

      {/* 古籍详情弹窗 */}
      {showBookDetail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60">
          <div className="bg-[#1a1a1a] rounded-t-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1a1a1a] p-4 border-b border-[#333] flex items-center justify-between">
              <h3 className="text-white font-medium">{showBookDetail.name}</h3>
              <button onClick={() => setShowBookDetail(null)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-28 bg-gradient-to-b from-[#3a2a1a] to-[#2a1a0a] rounded-lg flex items-center justify-center border border-[#d4af37]/30">
                  <span className="text-[#d4af37] text-sm font-medium">{showBookDetail.name.slice(0, 2)}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{showBookDetail.name}</h4>
                  <p className="text-sm text-gray-400 mb-2">作者：{showBookDetail.author}</p>
                  <p className="text-xs text-gray-500 mb-2">{showBookDetail.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Eye className="w-3 h-3" />
                    <span>{(showBookDetail.views / 10000).toFixed(1)}万人阅读</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigateToClassic?.(showBookDetail.id)
                  setShowBookDetail(null)
                }}
                className="w-full py-3 bg-[#d4af37] text-[#1a1a1a] font-medium rounded-lg"
              >
                开始阅读
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 课程详情弹窗 */}
      {showCourseDetail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60">
          <div className="bg-[#1a1a1a] rounded-t-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1a1a1a] p-4 border-b border-[#333] flex items-center justify-between">
              <h3 className="text-white font-medium truncate pr-4">{showCourseDetail.title}</h3>
              <button onClick={() => setShowCourseDetail(null)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-gradient-to-br from-[#2a3a4a] to-[#1a2a3a] rounded-lg mb-4 flex items-center justify-center">
                <Play className="w-12 h-12 text-white/50" />
              </div>
              <h4 className="text-white font-medium mb-2">{showCourseDetail.title}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <span>主讲：{showCourseDetail.teacher}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {showCourseDetail.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {(showCourseDetail.views / 10000).toFixed(1)}万
                </span>
              </div>
              <button className="w-full py-3 bg-[#d4af37] text-[#1a1a1a] font-medium rounded-lg">
                {showCourseDetail.free ? "免费观看" : "购买观看"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
