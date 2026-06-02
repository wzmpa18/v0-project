"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  X,
  Stethoscope,
  Heart,
  Brain,
  Activity,
  AlertCircle,
  CheckCircle,
  Sparkles
} from "lucide-react"
import {
  SYMPTOM_CATEGORIES,
  SYMPTOMS_DETAIL,
  SYNDROME_PATTERNS,
  BODY_PART_SYMPTOMS,
  getSymptomDetail,
  getRelatedSymptoms,
  Symptom
} from "@/lib/tcm-symptoms"

interface SelectedSymptom {
  symptom: string
  severity: "mild" | "moderate" | "severe"
  duration: string
  notes: string
}

interface SymptomInputSystemProps {
  onSymptomsChange?: (symptoms: SelectedSymptom[]) => void
  onAnalysisComplete?: (analysis: any) => void
  selectedBodyPart?: string | null
}

export function SymptomInputSystem({
  onSymptomsChange,
  onAnalysisComplete,
  selectedBodyPart
}: SymptomInputSystemProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>([])
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [analysisMode, setAnalysisMode] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  // 搜索症状
  const searchSymptoms = (query: string) => {
    if (!query.trim()) return []
    const results: string[] = []
    Object.entries(SYMPTOMS_DETAIL).forEach(([key, symptom]) => {
      if (key.includes(query) || symptom.name.includes(query)) {
        results.push(key)
      }
    })
    return results
  }

  const searchResults = searchSymptoms(searchQuery)

  // 添加症状
  const addSymptom = (symptomName: string) => {
    if (selectedSymptoms.find(s => s.symptom === symptomName)) return
    const newSymptom: SelectedSymptom = {
      symptom: symptomName,
      severity: "moderate",
      duration: "",
      notes: ""
    }
    const updated = [...selectedSymptoms, newSymptom]
    setSelectedSymptoms(updated)
    onSymptomsChange?.(updated)
    setSearchQuery("")
    setShowResults(false)
  }

  // 移除症状
  const removeSymptom = (symptomName: string) => {
    const updated = selectedSymptoms.filter(s => s.symptom !== symptomName)
    setSelectedSymptoms(updated)
    onSymptomsChange?.(updated)
  }

  // 更新症状严重程度
  const updateSeverity = (symptomName: string, severity: "mild" | "moderate" | "severe") => {
    const updated = selectedSymptoms.map(s =>
      s.symptom === symptomName ? { ...s, severity } : s
    )
    setSelectedSymptoms(updated)
    onSymptomsChange?.(updated)
  }

  // 分析症状
  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return

    setAnalysisMode(true)

    // 简单的分析逻辑
    const symptomNames = selectedSymptoms.map(s => s.symptom)

    // 寻找匹配的证型
    let matchedPattern: any = null
    let maxMatch = 0

    Object.entries(SYNDROME_PATTERNS).forEach(([key, pattern]) => {
      const matchCount = pattern.symptoms.filter((s: string) => symptomNames.includes(s)).length
      if (matchCount > maxMatch) {
        maxMatch = matchCount
        matchedPattern = { key, ...pattern }
      }
    })

    // 收集所有相关的经络和穴位
    const relatedMeridians = new Set<string>()
    const relatedPoints = new Set<string>()
    const relatedOrgans = new Set<string>()

    symptomNames.forEach(name => {
      const detail = getSymptomDetail(name)
      if (detail) {
        detail.relatedMeridians.forEach(m => relatedMeridians.add(m))
        detail.relatedPoints.forEach(p => relatedPoints.add(p))
        detail.relatedOrgans.forEach(o => relatedOrgans.add(o))
      }
    })

    const result = {
      symptoms: selectedSymptoms,
      matchedPattern,
      relatedMeridians: Array.from(relatedMeridians),
      relatedPoints: Array.from(relatedPoints),
      relatedOrgans: Array.from(relatedOrgans),
      suggestions: generateSuggestions(symptomNames, matchedPattern)
    }

    setAnalysisResult(result)
    onAnalysisComplete?.(result)
  }

  // 生成建议
  const generateSuggestions = (symptoms: string[], pattern: any) => {
    const suggestions: string[] = []

    if (pattern) {
      suggestions.push(`根据您描述的症状，初步判断可能属于"${pattern.name}"证型`)
      suggestions.push(`治疗原则：${pattern.treatment}`)
      if (pattern.points.length > 0) {
        suggestions.push(`推荐穴位：${pattern.points.join("、")}`)
      }
      if (pattern.herbs.length > 0) {
        suggestions.push(`参考方剂药物：${pattern.herbs.join("、")}`)
      }
    }

    // 根据症状添加具体建议
    if (symptoms.includes("失眠")) {
      suggestions.push("建议：睡前避免使用电子设备，可配合神门、安眠穴按摩")
    }
    if (symptoms.includes("腰痛")) {
      suggestions.push("建议：避免久坐久站，睡硬板床，可热敷腰部")
    }
    if (symptoms.includes("肩周炎")) {
      suggestions.push("建议：进行肩部功能锻炼，如爬墙运动，注意肩部保暖")
    }

    suggestions.push("温馨提示：以上分析仅供参考，具体诊疗请咨询专业中医师")

    return suggestions
  }

  // 清除分析结果
  const clearAnalysis = () => {
    setAnalysisMode(false)
    setAnalysisResult(null)
  }

  // 获取症状颜色
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild": return "text-green-600 bg-green-50 border-green-200"
      case "moderate": return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "severe": return "text-red-600 bg-red-50 border-red-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 顶部标题 */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="w-6 h-6 text-[#0891b2]" />
          <h2 className="text-lg font-bold text-gray-800">症状辨证分析</h2>
        </div>

        {/* 搜索框 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowResults(true)
            }}
            onFocus={() => setShowResults(true)}
            placeholder="搜索症状，如：头痛、失眠、腰痛..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent"
          />

          {/* 搜索结果下拉 */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
              {searchResults.slice(0, 10).map(name => (
                <button
                  key={name}
                  onClick={() => addSymptom(name)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                >
                  <span className="text-gray-800">{name}</span>
                  <Plus className="w-4 h-4 text-[#0891b2]" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 已选症状标签 */}
        {selectedSymptoms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSymptoms.map(s => (
              <div
                key={s.symptom}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getSeverityColor(s.severity)} flex items-center gap-2`}
              >
                <span>{s.symptom}</span>
                <select
                  value={s.severity}
                  onChange={(e) => updateSeverity(s.symptom, e.target.value as any)}
                  className="bg-transparent border-none text-xs focus:outline-none cursor-pointer"
                >
                  <option value="mild">轻</option>
                  <option value="moderate">中</option>
                  <option value="severe">重</option>
                </select>
                <button
                  onClick={() => removeSymptom(s.symptom)}
                  className="hover:bg-black/10 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <button
            onClick={analyzeSymptoms}
            disabled={selectedSymptoms.length === 0}
            className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              selectedSymptoms.length > 0
                ? "bg-[#0891b2] text-white hover:bg-[#0e7490]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            AI智能辨证分析
          </button>
          {selectedSymptoms.length > 0 && (
            <button
              onClick={() => {
                setSelectedSymptoms([])
                onSymptomsChange?.([])
                clearAnalysis()
              }}
              className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
            >
              清除
            </button>
          )}
        </div>
      </div>

      {/* 分析结果 */}
      {analysisMode && analysisResult && (
        <div className="bg-white border-b border-gray-200 p-4 animate-slideIn">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-gray-800">辨证分析结果</h3>
            </div>
            <button
              onClick={clearAnalysis}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* 证型匹配 */}
          {analysisResult.matchedPattern && (
            <div className="bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white rounded-xl p-4 mb-4">
              <div className="text-sm opacity-80 mb-1">初步判断证型</div>
              <div className="text-xl font-bold mb-2">{analysisResult.matchedPattern.name}</div>
              <div className="text-sm opacity-90">治疗原则：{analysisResult.matchedPattern.treatment}</div>
            </div>
          )}

          {/* 相关经络 */}
          {analysisResult.relatedMeridians.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                相关经络
              </div>
              <div className="flex flex-wrap gap-2">
                {analysisResult.relatedMeridians.map((m: string) => (
                  <span key={m} className="px-3 py-1 bg-[#0891b2]/10 text-[#0891b2] rounded-full text-sm">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 推荐穴位 */}
          {analysisResult.relatedPoints.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                推荐穴位
              </div>
              <div className="flex flex-wrap gap-2">
                {analysisResult.relatedPoints.slice(0, 8).map((p: string) => (
                  <span key={p} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 建议 */}
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="text-sm font-medium text-amber-800 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              调理建议
            </div>
            <ul className="space-y-2">
              {analysisResult.suggestions.map((s: string, i: number) => (
                <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 症状分类列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-sm font-medium text-gray-700 mb-3">症状分类</div>

        {selectedBodyPart && BODY_PART_SYMPTOMS[selectedBodyPart] && (
          <div className="mb-4 bg-blue-50 rounded-xl p-3 border border-blue-200">
            <div className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              {selectedBodyPart}相关症状
            </div>
            <div className="flex flex-wrap gap-2">
              {BODY_PART_SYMPTOMS[selectedBodyPart].map(symptom => (
                <button
                  key={symptom}
                  onClick={() => addSymptom(symptom)}
                  disabled={selectedSymptoms.some(s => s.symptom === symptom)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedSymptoms.some(s => s.symptom === symptom)
                      ? "bg-blue-100 text-blue-400 cursor-not-allowed"
                      : "bg-white text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 证型快速选择 */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">常见证型</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(SYNDROME_PATTERNS).slice(0, 6).map(([key, pattern]) => (
              <button
                key={key}
                onClick={() => {
                  pattern.symptoms.forEach((s: string) => {
                    if (!selectedSymptoms.some(sym => sym.symptom === s)) {
                      addSymptom(s)
                    }
                  })
                }}
                className="p-3 bg-white rounded-xl border border-gray-200 text-left hover:border-[#0891b2] hover:bg-[#0891b2]/5 transition-all"
              >
                <div className="font-medium text-gray-800 text-sm">{pattern.name}</div>
                <div className="text-xs text-gray-500 mt-1">{pattern.treatment}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 症状分类 */}
        {Object.entries(SYMPTOM_CATEGORIES).map(([category, subCategories]) => (
          <div key={category} className="mb-3">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-[#0891b2] transition-all"
            >
              <span className="font-medium text-gray-800">{category}</span>
              {expandedCategory === category ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedCategory === category && (
              <div className="mt-2 pl-2 space-y-2">
                {Object.entries(subCategories).map(([subCategory, symptoms]) => (
                  <div key={subCategory} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-gray-600 mb-2">{subCategory}</div>
                    <div className="flex flex-wrap gap-1">
                      {symptoms.map(symptom => (
                        <button
                          key={symptom}
                          onClick={() => addSymptom(symptom)}
                          disabled={selectedSymptoms.some(s => s.symptom === symptom)}
                          className={`px-2 py-1 rounded text-xs transition-all ${
                            selectedSymptoms.some(s => s.symptom === symptom)
                              ? "bg-[#0891b2]/20 text-[#0891b2] cursor-not-allowed"
                              : "bg-white text-gray-700 hover:bg-[#0891b2] hover:text-white border border-gray-200"
                          }`}
                        >
                          {symptom}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 症状详情弹窗 */}
      {analysisMode && selectedSymptoms.length > 0 && analysisResult && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={clearAnalysis}>
          <div
            className="w-full bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* 内容已在上面显示 */}
          </div>
        </div>
      )}
    </div>
  )
}

// 症状详情弹窗组件
export function SymptomDetailModal({
  symptom,
  onClose
}: {
  symptom: string
  onClose: () => void
}) {
  const detail = getSymptomDetail(symptom)

  if (!detail) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={onClose}>
      <div
        className="w-full bg-white rounded-t-3xl max-h-[70vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">{detail.name}</h3>
            <p className="text-sm text-[#0891b2]">{detail.category} · {detail.subCategory}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* 症状描述 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm font-medium text-gray-800 mb-2">症状描述</div>
            {detail.descriptions.map((d, i) => (
              <div key={i} className="text-sm text-gray-600 mb-1">{d}</div>
            ))}
          </div>

          {/* 相关脏腑 */}
          <div className="bg-red-50 rounded-xl p-4">
            <div className="text-sm font-medium text-red-900 mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              相关脏腑
            </div>
            <div className="flex flex-wrap gap-2">
              {detail.relatedOrgans.map(o => (
                <span key={o} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">{o}</span>
              ))}
            </div>
          </div>

          {/* 相关经络 */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              相关经络
            </div>
            <div className="flex flex-wrap gap-2">
              {detail.relatedMeridians.map(m => (
                <span key={m} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{m}</span>
              ))}
            </div>
          </div>

          {/* 推荐配穴 */}
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              推荐配穴
            </div>
            <div className="flex flex-wrap gap-2">
              {detail.relatedPoints.map(p => (
                <span key={p} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{p}</span>
              ))}
            </div>
          </div>

          {/* 可能病因 */}
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="text-sm font-medium text-amber-900 mb-2">可能病因</div>
            <div className="flex flex-wrap gap-2">
              {detail.possibleCauses.map(c => (
                <span key={c} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">{c}</span>
              ))}
            </div>
          </div>

          {/* 舌象脉象 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="text-sm font-medium text-orange-900 mb-2">舌象</div>
              <div className="space-y-1">
                {detail.tongue.map((t, i) => (
                  <div key={i} className="text-sm text-orange-700">{t}</div>
                ))}
              </div>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="text-sm font-medium text-pink-900 mb-2">脉象</div>
              <div className="space-y-1">
                {detail.pulse.map((p, i) => (
                  <div key={i} className="text-sm text-pink-700">{p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
