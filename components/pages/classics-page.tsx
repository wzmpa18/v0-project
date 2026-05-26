"use client"

import { useState } from "react"
import { Library, BookOpen, ChevronRight, X, ChevronLeft, Plus, Minus } from "lucide-react"
import { CLASSIC_BOOKS, SHANGHAN_CLAUSES, YANBO_DIAOSOU_GE, type ClassicBook, type ShanghanClause } from "@/lib/classics-data"

type ViewMode = "shelf" | "reading"
type AnnotationTab = "translation" | "annotation"

export function ClassicsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("shelf")
  const [selectedBook, setSelectedBook] = useState<ClassicBook | null>(null)
  const [selectedClause, setSelectedClause] = useState<ShanghanClause | null>(null)
  const [annotationTab, setAnnotationTab] = useState<AnnotationTab>("translation")
  const [fontSize, setFontSize] = useState(16)
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredBooks = filterCategory === "all" 
    ? CLASSIC_BOOKS 
    : CLASSIC_BOOKS.filter(b => b.category === filterCategory)

  const openBook = (book: ClassicBook) => {
    if (book.hasFullText) {
      setSelectedBook(book)
      setViewMode("reading")
    }
  }

  const closeBook = () => {
    setViewMode("shelf")
    setSelectedBook(null)
    setSelectedClause(null)
  }

  const adjustFontSize = (delta: number) => {
    setFontSize(prev => Math.max(12, Math.min(24, prev + delta)))
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24 overflow-y-auto">
      {/* 书架模式 */}
      {viewMode === "shelf" && (
        <>
          {/* 页面标题 */}
          <div className="text-center py-4 px-4">
            <div className="inline-flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#d4af37]/30">
              <Library className="w-5 h-5 text-[#d4af37]" strokeWidth={1.5} />
            </div>
            <h1 className="text-lg font-semibold text-[#f5f5f7] tracking-wider">古籍文献</h1>
            <p className="text-[#888] text-xs mt-1">典籍浩瀚 · 传承经典</p>
          </div>

          {/* 分类筛选 */}
          <div className="flex justify-center gap-2 px-4 mb-4">
            {[
              { id: "all", label: "全部" },
              { id: "医学", label: "医学" },
              { id: "命理", label: "命理" },
              { id: "术数", label: "术数" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs transition-all ${
                  filterCategory === cat.id
                    ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50"
                    : "bg-[#252525] text-[#888] border border-[#333]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 书架 */}
          <div className="px-4 space-y-3">
            {filteredBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => openBook(book)}
                className="w-full bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl p-4 border border-[#333] text-left group"
              >
                <div className="flex items-start gap-3">
                  {/* 书脊 */}
                  <div className="w-12 h-16 bg-gradient-to-b from-[#d4af37]/30 to-[#d4af37]/10 rounded border border-[#d4af37]/30 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#d4af37]" strokeWidth={1.5} />
                  </div>
                  
                  {/* 书籍信息 */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[#f5f5f7] font-medium">{book.name}</h3>
                      <div className="flex items-center gap-2">
                        {book.hasFullText && (
                          <span className="px-1.5 py-0.5 bg-[#22c55e]/20 text-[#22c55e] text-xs rounded">可读</span>
                        )}
                        <ChevronRight className="w-4 h-4 text-[#555] group-hover:text-[#d4af37] transition-colors" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#888] text-xs">【{book.dynasty}】{book.author}</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs ${
                        book.category === "医学" ? "bg-[#22c55e]/20 text-[#22c55e]" :
                        book.category === "命理" ? "bg-[#d4af37]/20 text-[#d4af37]" :
                        "bg-[#3b82f6]/20 text-[#3b82f6]"
                      }`}>
                        {book.category}
                      </span>
                    </div>
                    <p className="text-[#555] text-xs mt-2 line-clamp-2">{book.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* 阅读模式 */}
      {viewMode === "reading" && selectedBook && (
        <div className="min-h-screen bg-[#1a1a1a]">
          {/* 阅读顶栏 */}
          <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#333] px-4 py-3 flex items-center justify-between z-10">
            <button onClick={closeBook} className="flex items-center gap-1 text-[#888]">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">返回</span>
            </button>
            <h2 className="text-[#d4af37] font-medium">{selectedBook.name}</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => adjustFontSize(-2)} className="w-7 h-7 rounded bg-[#252525] flex items-center justify-center">
                <Minus className="w-3 h-3 text-[#888]" />
              </button>
              <button onClick={() => adjustFontSize(2)} className="w-7 h-7 rounded bg-[#252525] flex items-center justify-center">
                <Plus className="w-3 h-3 text-[#888]" />
              </button>
            </div>
          </div>

          {/* 阅读内容 */}
          <div className="px-4 py-6 pb-24">
            {selectedBook.id === "shanghanlun" && (
              <div className="space-y-4">
                {SHANGHAN_CLAUSES.map((clause) => (
                  <button
                    key={clause.id}
                    onClick={() => setSelectedClause(clause)}
                    className="w-full bg-[#252525] rounded-xl p-4 border border-[#333] text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#d4af37] text-xs font-mono shrink-0">第{clause.id}条</span>
                      <div className="flex-1">
                        <p 
                          className="text-[#f5f5f7] leading-relaxed group-hover:text-[#d4af37] transition-colors"
                          style={{ fontSize: `${fontSize}px` }}
                        >
                          {clause.original}
                        </p>
                        <p className="text-[#555] text-xs mt-2">{clause.chapter}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedBook.id === "yanbodiaosouge" && (
              <div className="bg-[#252525] rounded-xl p-4 border border-[#d4af37]/30">
                <pre 
                  className="text-[#f5f5f7] leading-loose whitespace-pre-wrap font-serif"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {YANBO_DIAOSOU_GE}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 条文注解弹窗 */}
      {selectedClause && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
          <div className="w-full max-h-[75vh] bg-[#1a1a1a] rounded-t-2xl overflow-hidden">
            {/* 弹窗顶栏 */}
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#333] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#d4af37] text-sm">第{selectedClause.id}条 · {selectedClause.chapter}</span>
                <button 
                  onClick={() => setSelectedClause(null)} 
                  className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-[#888]" />
                </button>
              </div>
              
              {/* 原文 */}
              <p className="text-[#f5f5f7] leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
                {selectedClause.original}
              </p>
            </div>

            {/* 切换标签 */}
            <div className="flex border-b border-[#333]">
              <button
                onClick={() => setAnnotationTab("translation")}
                className={`flex-1 py-3 text-sm transition-colors ${
                  annotationTab === "translation"
                    ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                    : "text-[#888]"
                }`}
              >
                白话直译
              </button>
              <button
                onClick={() => setAnnotationTab("annotation")}
                className={`flex-1 py-3 text-sm transition-colors ${
                  annotationTab === "annotation"
                    ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                    : "text-[#888]"
                }`}
              >
                名家注解
              </button>
            </div>

            {/* 注解内容 */}
            <div className="p-4 overflow-y-auto max-h-[calc(75vh-180px)]">
              {annotationTab === "translation" && (
                <div className="bg-[#252525] rounded-xl p-4">
                  <p 
                    className="text-[#f5f5f7] leading-loose"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {selectedClause.translation}
                  </p>
                </div>
              )}
              
              {annotationTab === "annotation" && (
                <div className="bg-[#252525] rounded-xl p-4">
                  <p 
                    className="text-[#d4af37] leading-loose italic"
                    style={{ fontSize: `${fontSize - 1}px` }}
                  >
                    {selectedClause.annotation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
