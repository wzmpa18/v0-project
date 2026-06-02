"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  User,
  Activity,
  Heart,
  Brain,
  Stethoscope,
  Pill,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Bookmark,
  Share2
} from "lucide-react"
import {
  FORMULA_CATEGORIES,
  CLASSIC_FORMULAS,
  PHYSICIAN_SCHOOLS,
  HERB_PROPERTIES,
  getFormulaDetail,
  searchFormulas,
  ClassicFormula
} from "@/lib/tcm-classic-formulas"

interface SelectedSymptoms {
  symptom: string
  severity: "mild" | "moderate" | "severe"
}

interface PrescriptionAnalysis {
  matchedFormula: ClassicFormula | null
  similarFormulas: { name: string; matchScore: number }[]
  modifications: string[]
  acupuncturePoints: string[]
  nursingAdvice: string[]
}

export function ClassicFormulaSystem() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedFormula, setSelectedFormula] = useState<ClassicFormula | null>(null)
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  // 搜索功能
  const searchResults = searchQuery ? searchFormulas(searchQuery) : []

  // 获取分类下的方剂
  const getFormulasByCategory = (category: string, subCategory: string) => {
    return FORMULA_CATEGORIES[category as keyof typeof FORMULA_CATEGORIES]?.[subCategory as keyof any] || []
  }

  // 展开所有分类
  const allCategories = Object.entries(FORMULA_CATEGORIES)

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 顶部标题 */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-[#0891b2]" />
          <h2 className="text-lg font-bold text-gray-800">经方辨证论治</h2>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索经典方剂，如：四君子汤、桂枝汤..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent"
          />
        </div>

        {/* 搜索结果 */}
        {searchQuery && searchResults.length > 0 && (
          <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map(name => (
              <button
                key={name}
                onClick={() => {
                  const formula = getFormulaDetail(name)
                  if (formula) {
                    setSelectedFormula(formula)
                    setShowDetail(true)
                  }
                  setSearchQuery("")
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between border-b last:border-b-0"
              >
                <div>
                  <div className="font-medium text-gray-800">{name}</div>
                  <div className="text-xs text-gray-500">{getFormulaDetail(name)?.origin}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 方剂分类列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* 医家流派快速入口 */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">经方医家</div>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(PHYSICIAN_SCHOOLS).map(([key, school]) => (
              <button
                key={key}
                className="p-3 bg-white rounded-xl border border-gray-200 text-left hover:border-[#0891b2] transition-all"
              >
                <div className="font-medium text-gray-800 text-sm">{school.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {school.representatives.slice(0, 2).join("、")}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 方剂分类 */}
        <div className="text-sm font-medium text-gray-700 mb-2">方剂分类</div>
        {allCategories.map(([category, subCategories]) => (
          <div key={category} className="mb-3">
            <button
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-[#0891b2] transition-all"
            >
              <span className="font-medium text-gray-800">{category}</span>
              {selectedCategory === category ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {selectedCategory === category && (
              <div className="mt-2 space-y-2 pl-2">
                {Object.entries(subCategories).map(([subCategory, formulas]) => (
                  <div key={subCategory} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-[#0891b2] mb-2">{subCategory}</div>
                    <div className="flex flex-wrap gap-2">
                      {formulas.map(formula => (
                        <button
                          key={formula}
                          onClick={() => {
                            const detail = getFormulaDetail(formula)
                            if (detail) {
                              setSelectedFormula(detail)
                              setShowDetail(true)
                            }
                          }}
                          className="px-3 py-1.5 bg-white rounded-full text-xs text-gray-700 border border-gray-200 hover:border-[#0891b2] hover:text-[#0891b2] transition-all"
                        >
                          {formula}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* 热门方剂 */}
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-2">热门经方</div>
          <div className="grid grid-cols-2 gap-2">
            {["桂枝汤", "麻黄汤", "小柴胡汤", "四君子汤", "四物汤", "六味地黄丸"].map(formula => (
              <button
                key={formula}
                onClick={() => {
                  const detail = getFormulaDetail(formula)
                  if (detail) {
                    setSelectedFormula(detail)
                    setShowDetail(true)
                  }
                }}
                className="p-3 bg-white rounded-xl border border-gray-200 text-left hover:border-[#0891b2] transition-all"
              >
                <div className="font-medium text-gray-800 text-sm">{formula}</div>
                <div className="text-xs text-gray-500 mt-1">{getFormulaDetail(formula)?.origin}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 方剂详情弹窗 */}
      {showDetail && selectedFormula && (
        <FormulaDetailModal
          formula={selectedFormula}
          onClose={() => {
            setShowDetail(false)
            setSelectedFormula(null)
          }}
        />
      )}
    </div>
  )
}

// 方剂详情弹窗组件
function FormulaDetailModal({
  formula,
  onClose
}: {
  formula: ClassicFormula
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = useState<"base" | "analysis" | "doctors">("base")

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto" onClick={onClose}>
      <div
        className="min-h-screen flex items-end justify-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
          {/* 头部 */}
          <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between z-10">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{formula.name}</h3>
              <p className="text-sm text-[#0891b2]">{formula.origin} · {formula.category}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          {/* 标签页 */}
          <div className="flex border-b">
            {[
              { key: "base", label: "基本信息", icon: BookOpen },
              { key: "analysis", label: "方解", icon: Brain },
              { key: "doctors", label: "医家论述", icon: User },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeTab === tab.key
                    ? "border-[#0891b2] text-[#0891b2]"
                    : "border-transparent text-gray-500"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* 内容 */}
          <div className="p-4">
            {activeTab === "base" && (
              <div className="space-y-4">
                {/* 组成 */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    组成
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formula.composition.map((herb, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {herb}
                        <span className="text-blue-500 ml-1">{formula.dosage[i]}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 功效 */}
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-sm font-medium text-green-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    功效
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formula.functions.map((f, i) => (
                      <span key={i} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm">{f}</span>
                    ))}
                  </div>
                </div>

                {/* 主治 */}
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    主治
                  </div>
                  <div className="space-y-1">
                    {formula.symptoms.map((s, i) => (
                      <div key={i} className="text-sm text-purple-700">{s}</div>
                    ))}
                  </div>
                </div>

                {/* 舌脉 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="text-sm font-medium text-orange-900 mb-1">舌象</div>
                    <div className="text-sm text-orange-700">{formula.tongue}</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4">
                    <div className="text-sm font-medium text-pink-900 mb-1">脉象</div>
                    <div className="text-sm text-pink-700">{formula.pulse}</div>
                  </div>
                </div>

                {/* 禁忌 */}
                {formula.contraindications.length > 0 && (
                  <div className="bg-red-50 rounded-xl p-4">
                    <div className="text-sm font-medium text-red-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      禁忌
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formula.contraindications.map((c, i) => (
                        <span key={i} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm">{c}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 加减法 */}
                {formula.modifications.length > 0 && (
                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="text-sm font-medium text-amber-900 mb-2 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      加减法
                    </div>
                    <div className="space-y-2">
                      {formula.modifications.map((mod, i) => (
                        <div key={i} className="text-sm">
                          <span className="text-amber-700 font-medium">{mod.condition}：</span>
                          <span className="text-amber-600">{mod.modification}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "analysis" && (
              <div className="space-y-4">
                {/* 方解 */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-sm font-medium text-blue-900 mb-3">方解</div>
                  <div className="space-y-3">
                    {formula.analysis.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <div className="text-sm text-blue-700 pt-0.5">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 药物详解 */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="text-sm font-medium text-gray-800 mb-3">药物详解</div>
                  <div className="space-y-3">
                    {formula.composition.map((herb, i) => {
                      const props = HERB_PROPERTIES[herb]
                      if (!props) return null
                      return (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-800 mb-1">{herb}</div>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">{props.nature}</span>
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded">{props.flavor}</span>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">{props.meridian}</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-2">
                            {props.functions.join("、")}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "doctors" && (
              <div className="space-y-4">
                {formula.physicianNotes && formula.physicianNotes.length > 0 ? (
                  <div className="space-y-3">
                    {formula.physicianNotes.map((note, i) => (
                      <div key={i} className="bg-gradient-to-r from-[#0891b2]/10 to-transparent rounded-xl p-4 border-l-4 border-[#0891b2]">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-[#0891b2]" />
                          <span className="font-medium text-[#0891b2]">倪海厦</span>
                        </div>
                        <div className="text-sm text-gray-700">{note}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>暂无医家论述</p>
                    <p className="text-sm">敬请期待更多经方医家的临床经验</p>
                  </div>
                )}

                {/* 相关医家 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm font-medium text-gray-800 mb-2">推荐阅读</div>
                  <div className="space-y-2">
                    {Object.entries(PHYSICIAN_SCHOOLS).map(([key, school]) => (
                      <div key={key} className="bg-white rounded-lg p-3">
                        <div className="font-medium text-gray-800 text-sm">{school.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          代表医家：{school.representatives.join("、")}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          特点：{school.特点.join("、")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 辨证论治分析组件
export function SyndromeAnalysis({
  symptoms,
  onAnalysisComplete
}: {
  symptoms: { symptom: string; severity: string }[]
  onAnalysisComplete?: (result: PrescriptionAnalysis) => void
}) {
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<PrescriptionAnalysis | null>(null)

  const analyze = () => {
    if (symptoms.length === 0) return

    setAnalyzing(true)

    // 模拟分析过程
    setTimeout(() => {
      const analysis: PrescriptionAnalysis = {
        matchedFormula: null,
        similarFormulas: [],
        modifications: [],
        acupuncturePoints: [],
        nursingAdvice: []
      }

      // 简单匹配逻辑
      const symptomSet = new Set(symptoms.map(s => s.symptom))

      // 根据症状匹配方剂
      Object.entries(CLASSIC_FORMULAS).forEach(([name, formula]) => {
        const matchCount = formula.symptoms.filter(s => symptomSet.has(s)).length
        if (matchCount > 0) {
          analysis.similarFormulas.push({ name, matchScore: matchCount })
        }
      })

      // 按匹配度排序
      analysis.similarFormulas.sort((a, b) => b.matchScore - a.matchScore)

      // 取最佳匹配
      if (analysis.similarFormulas.length > 0) {
        const bestMatch = analysis.similarFormulas[0]
        analysis.matchedFormula = CLASSIC_FORMULAS[bestMatch.name]
      }

      // 生成建议
      if (analysis.matchedFormula) {
        analysis.acupuncturePoints = analysis.matchedFormula.relatedPoints || []
        analysis.nursingAdvice = [
          "注意休息，避免劳累",
          "饮食清淡，忌辛辣油腻",
          "保持情绪舒畅",
          "遵医嘱按时服药"
        ]
        analysis.modifications = analysis.matchedFormula.modifications.map(m => `${m.condition}：${m.modification}`)
      }

      setResult(analysis)
      setAnalyzing(false)
      onAnalysisComplete?.(analysis)
    }, 1500)
  }

  if (symptoms.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>请先选择症状</p>
        <p className="text-sm">系统将根据症状匹配最佳方剂</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 已选症状 */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="text-sm font-medium text-gray-700 mb-2">已选症状</div>
        <div className="flex flex-wrap gap-2">
          {symptoms.map((s, i) => (
            <span key={i} className="px-3 py-1 bg-[#0891b2]/10 text-[#0891b2] rounded-full text-sm">
              {s.symptom}
            </span>
          ))}
        </div>
      </div>

      {/* 分析按钮 */}
      {!result && (
        <button
          onClick={analyze}
          disabled={analyzing}
          className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
            analyzing
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#0891b2] text-white hover:bg-[#0e7490]"
          }`}
        >
          {analyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-300 border-t-[#0891b2] rounded-full animate-spin" />
              分析中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              开始辨证分析
            </>
          )}
        </button>
      )}

      {/* 分析结果 */}
      {result && (
        <div className="space-y-4 animate-slideIn">
          {/* 匹配方剂 */}
          {result.matchedFormula && (
            <div className="bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white rounded-xl p-4">
              <div className="text-sm opacity-80 mb-1">推荐方剂</div>
              <div className="text-xl font-bold mb-2">{result.matchedFormula.name}</div>
              <div className="text-sm opacity-90">{result.matchedFormula.origin}</div>
            </div>
          )}

          {/* 相似方剂 */}
          {result.similarFormulas.length > 1 && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700 mb-2">其他参考方剂</div>
              <div className="space-y-2">
                {result.similarFormulas.slice(1, 4).map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <span className="text-gray-800">{f.name}</span>
                    <span className="text-xs text-gray-500">匹配度：{f.matchScore}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 推荐穴位 */}
          {result.acupuncturePoints.length > 0 && (
            <div className="bg-red-50 rounded-xl p-4">
              <div className="text-sm font-medium text-red-900 mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                推荐穴位
              </div>
              <div className="flex flex-wrap gap-2">
                {result.acupuncturePoints.map((p, i) => (
                  <span key={i} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm">{p}</span>
                ))}
              </div>
            </div>
          )}

          {/* 调理建议 */}
          {result.nursingAdvice.length > 0 && (
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-sm font-medium text-amber-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                调理建议
              </div>
              <ul className="space-y-1">
                {result.nursingAdvice.map((advice, i) => (
                  <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                    <span className="text-amber-500">{i + 1}.</span>
                    {advice}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
