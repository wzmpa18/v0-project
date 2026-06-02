"use client"

import { useState } from "react"
import {
  BookOpen,
  User,
  Award,
  Quote,
  ChevronRight,
  ChevronDown,
  Star,
  Heart,
  Brain,
  FlaskConical,
  Scroll,
  Search,
  Filter
} from "lucide-react"
import {
  NI_APPROVED_PHYSICIANS,
  NI_HAI_XIA_FOUR_CLASSICS,
  getPhysicianDetail,
  getAllPhysicians,
  getClassicBooks,
  getNiHaiXiaFourClassics
} from "@/lib/tcm-classics-complete"

export function ClassicalPhysiciansPage() {
  const [selectedPhysician, setSelectedPhysician] = useState<any>(null)
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null)
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const physicians = getAllPhysicians()
  const filteredPhysicians = searchQuery
    ? physicians.filter(p => p.name.includes(searchQuery))
    : physicians

  const fourClassics = getNiHaiXiaFourClassics()

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 顶部标题 */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-[#0891b2]" />
          <h2 className="text-lg font-bold text-gray-800">中医经典典籍与医家</h2>
        </div>

        {/* 搜索 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索医家或典籍..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 倪海厦四件套 */}
        <div className="bg-gradient-to-r from-[#0891b2] to-[#0e7490] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5" />
            <h3 className="font-bold">倪海厦四件套</h3>
          </div>
          <p className="text-sm opacity-90 mb-3">倪海厦老师认为这是中医入门的必读经典</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(fourClassics).map(([key, book]: [string, any]) => (
              <button
                key={key}
                onClick={() => setSelectedBook(book)}
                className="p-3 bg-white/20 rounded-xl text-left hover:bg-white/30 transition-all"
              >
                <div className="font-medium text-sm">{book.name}</div>
                <div className="text-xs opacity-80">{book.author}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 医家流派 */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3">倪海厦认可的经方医家</h3>
          
          {Object.entries(NI_APPROVED_PHYSICIANS).map(([key, school]: [string, any]) => (
            <div key={key} className="mb-3">
              <button
                onClick={() => setSelectedSchool(selectedSchool === key ? null : key)}
                className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200"
              >
                <div className="text-left">
                  <div className="font-medium text-gray-800">{school.name}</div>
                  <div className="text-xs text-gray-500">{school.description}</div>
                </div>
                {selectedSchool === key ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {selectedSchool === key && (
                <div className="mt-2 pl-2 space-y-2">
                  {school.representatives.map((physician: any) => (
                    <button
                      key={physician.name}
                      onClick={() => setSelectedPhysician(physician)}
                      className="w-full p-3 bg-white rounded-xl border border-gray-200 text-left hover:border-[#0891b2] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-800">{physician.name}</div>
                          <div className="text-xs text-[#0891b2]">{physician.title}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 所有医家 */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3">全部医家</h3>
          <div className="grid grid-cols-2 gap-2">
            {filteredPhysicians.map((physician) => (
              <button
                key={physician.name}
                onClick={() => setSelectedPhysician(physician)}
                className="p-3 bg-white rounded-xl border border-gray-200 text-left hover:border-[#0891b2] transition-all"
              >
                <div className="font-medium text-gray-800 text-sm">{physician.name}</div>
                <div className="text-xs text-gray-500">{physician.title || physician.dynasty}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 医家详情弹窗 */}
      {selectedPhysician && (
        <PhysicianDetailModal
          physician={selectedPhysician}
          onClose={() => setSelectedPhysician(null)}
        />
      )}

      {/* 典籍详情弹窗 */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  )
}

// 医家详情弹窗
function PhysicianDetailModal({
  physician,
  onClose
}: {
  physician: any
  onClose: () => void
}) {
  const detail = getPhysicianDetail(physician.name)

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto" onClick={onClose}>
      <div
        className="min-h-screen flex items-end justify-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
          {/* 头部 */}
          <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0891b2] to-[#0e7490] flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{physician.name}</h3>
                <p className="text-sm text-[#0891b2]">{physician.title} · {physician.dynasty}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          {/* 内容 */}
          <div className="p-4 space-y-4">
            {/* 简介 */}
            {detail && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">{detail.description}</p>
              </div>
            )}

            {/* 代表贡献 */}
            {physician.contributions && physician.contributions.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">代表贡献</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {physician.contributions.map((c: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 名言警句 */}
            {physician.quotes && physician.quotes.length > 0 && (
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Quote className="w-5 h-5 text-amber-600" />
                  <span className="font-medium text-amber-800">经典语录</span>
                </div>
                <div className="space-y-3">
                  {physician.quotes.map((quote: string, i: number) => (
                    <div key={i} className="border-l-4 border-amber-300 pl-3">
                      <p className="text-sm text-amber-700 italic">"{quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 所属流派 */}
            {detail && (
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">所属流派</span>
                </div>
                <div className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm inline-block">
                  {detail.school}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 典籍详情弹窗
function BookDetailModal({
  book,
  onClose
}: {
  book: any
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto" onClick={onClose}>
      <div
        className="min-h-screen flex items-end justify-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
          {/* 头部 */}
          <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0891b2] to-[#0e7490] flex items-center justify-center">
                <Scroll className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{book.name}</h3>
                <p className="text-sm text-[#0891b2]">{book.author} · {book.dynasty}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          {/* 内容 */}
          <div className="p-4 space-y-4">
            {/* 简介 */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 leading-relaxed">{book.description}</p>
            </div>

            {/* 核心理论 */}
            {book.coreTheory && book.coreTheory.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">核心理论</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {book.coreTheory.map((t: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 代表方剂 */}
            {book.famousFormulas && book.famousFormulas.length > 0 && (
              <div className="bg-red-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">代表方剂</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {book.famousFormulas.map((f: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 重要概念 */}
            {book.keyConcepts && book.keyConcepts.length > 0 && (
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">重要论述</span>
                </div>
                <div className="space-y-2">
                  {book.keyConcepts.map((k: string, i: number) => (
                    <div key={i} className="text-sm text-green-700 leading-relaxed">
                      {k}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 内容章节 */}
            {book.content && typeof book.content === 'object' && (
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">主要篇章</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(book.content).slice(0, 8).map(([key, value]: [string, any]) => (
                    <div key={key} className="bg-purple-100 rounded-lg p-2">
                      <div className="font-medium text-purple-800 text-sm">{key}</div>
                      {Array.isArray(value) && (
                        <div className="text-xs text-purple-600 mt-1">
                          {value.slice(0, 3).join("、")}...
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
