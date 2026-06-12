"use client"

import { useState, useMemo } from "react"
import { BookOpen, Search, User, Scale, ChevronRight, X, Pill, Leaf } from "lucide-react"
import { JING_FANG_DATA, BEN_CAO_DATA, type JingFang, type BenCao } from "@/lib/herbal-data"

// 体质类型
const TIZHI_OPTIONS = [
  { id: "pinghe", name: "平和质", desc: "体态适中，面色红润" },
  { id: "qixu", name: "气虚质", desc: "容易疲乏，气短懒言" },
  { id: "yangxu", name: "阳虚质", desc: "畏寒怕冷，手足不温" },
  { id: "yinxu", name: "阴虚质", desc: "手足心热，口燥咽干" },
  { id: "tanshi", name: "痰湿质", desc: "形体肥胖，腹部肥满" },
  { id: "shire", name: "湿热质", desc: "面垢油光，口苦口干" },
  { id: "xueyu", name: "血瘀质", desc: "肤色晦暗，舌质紫暗" },
  { id: "qiyu", name: "气郁质", desc: "情志抑郁，忧虑脆弱" },
]

// 症状分类
const SYMPTOM_CATEGORIES = [
  {
    name: "表证",
    symptoms: ["恶寒", "发热", "头痛", "身痛", "无汗", "汗出", "恶风", "项强"]
  },
  {
    name: "里证",
    symptoms: ["腹痛", "腹胀", "便秘", "下利", "呕吐", "口渴", "口苦", "咽干"]
  },
  {
    name: "寒热",
    symptoms: ["畏寒", "发热", "潮热", "往来寒热", "手足厥冷", "四肢不温"]
  },
  {
    name: "其他",
    symptoms: ["心悸", "失眠", "眩晕", "咳嗽", "气喘", "水肿", "小便不利"]
  }
]

// 六经辨证映射
const LIUJING_MAP: Record<string, { name: string; symptoms: string[]; formulas: string[] }> = {
  taiyang_zhongfeng: { name: "太阳中风", symptoms: ["发热", "汗出", "恶风", "脉浮缓"], formulas: ["guizhitang"] },
  taiyang_shanghan: { name: "太阳伤寒", symptoms: ["恶寒", "发热", "无汗", "身痛", "脉浮紧"], formulas: ["mahuangtang"] },
  yangming_jingre: { name: "阳明经热", symptoms: ["发热", "口渴", "汗出", "脉洪大"], formulas: ["baihu"] },
  yangming_fushi: { name: "阳明腑实", symptoms: ["便秘", "腹胀", "潮热", "谵语"], formulas: ["dachengqi"] },
  shaoyang: { name: "少阳病", symptoms: ["往来寒热", "口苦", "咽干", "目眩", "胸胁苦满"], formulas: ["xiaochaihu"] },
  taiyin: { name: "太阴病", symptoms: ["腹满", "呕吐", "下利", "食不下"], formulas: ["lizhong"] },
  shaoyin_han: { name: "少阴寒化", symptoms: ["畏寒", "四肢不温", "下利", "脉微"], formulas: ["sini"] },
  jueyin: { name: "厥阴病", symptoms: ["口渴", "心中疼热", "饥不欲食"], formulas: ["wumei"] },
}

type ViewMode = "search" | "bianzheng" | "fangji" | "bencao"

export function HerbalPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFang, setSelectedFang] = useState<JingFang | null>(null)
  const [selectedCao, setSelectedCao] = useState<BenCao | null>(null)
  
  // 辨证表单
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [tizhi, setTizhi] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [bianzhengResult, setBianzhengResult] = useState<any>(null)

  // 搜索结果
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { fangji: [], bencao: [] }
    
    const query = searchQuery.toLowerCase()
    
    const fangji = JING_FANG_DATA.filter(f => 
      f.name.includes(query) ||
      f.indication.includes(query) ||
      f.syndrome.some(s => s.includes(query)) ||
      f.composition.some(c => c.herb.includes(query))
    )
    
    const bencao = BEN_CAO_DATA.filter(c =>
      c.name.includes(query) ||
      c.effect.includes(query) ||
      c.indication.includes(query) ||
      c.meridian.some(m => m.includes(query))
    )
    
    return { fangji, bencao }
  }, [searchQuery])

  // 辨证分析
  const analyzeBianzheng = () => {
    if (selectedSymptoms.length === 0) return
    
    let bestMatch = { key: "", score: 0 }
    
    for (const [key, data] of Object.entries(LIUJING_MAP)) {
      const matchCount = data.symptoms.filter(s => selectedSymptoms.includes(s)).length
      const score = matchCount / data.symptoms.length
      if (score > bestMatch.score) {
        bestMatch = { key, score }
      }
    }
    
    if (bestMatch.key) {
      const liujing = LIUJING_MAP[bestMatch.key]
      const formulas = liujing.formulas.map(id => JING_FANG_DATA.find(f => f.id === id)).filter(Boolean) as JingFang[]
      
      setBianzhengResult({
        zhengxing: liujing.name,
        matchedSymptoms: liujing.symptoms.filter(s => selectedSymptoms.includes(s)),
        formulas,
        confidence: Math.round(bestMatch.score * 100)
      })
    }
  }

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24 overflow-y-auto">
      {/* 页面标题 */}
      <div className="text-center py-4 px-4">
        <div className="inline-flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#d4af37]/30">
          <BookOpen className="w-5 h-5 text-[#d4af37]" strokeWidth={1.5} />
        </div>
        <h1 className="text-lg font-semibold text-[#f5f5f7] tracking-wider">经方本草</h1>
      </div>

      {/* 功能切换 */}
      <div className="flex justify-center gap-2 px-4 mb-4">
        {[
          { id: "search", label: "智能检索", icon: Search },
          { id: "bianzheng", label: "六经辨证", icon: Scale },
          { id: "fangji", label: "经方库", icon: Pill },
          { id: "bencao", label: "本草库", icon: Leaf },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id as ViewMode)}
            className={`px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-1 ${
              viewMode === tab.id
                ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50"
                : "bg-[#252525] text-[#888] border border-[#333]"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 搜索模式 */}
      {viewMode === "search" && (
        <div className="px-4">
          {/* 搜索框 */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索症状、方剂、药材..."
              className="w-full bg-[#252525] border border-[#333] rounded-xl pl-10 pr-4 py-3 text-[#f5f5f7] text-sm placeholder:text-[#555] focus:outline-none focus:border-[#d4af37]/50"
            />
          </div>

          {/* 搜索结果 */}
          {searchQuery && (
            <div className="space-y-4">
              {searchResults.fangji.length > 0 && (
                <div>
                  <div className="text-[#888] text-xs mb-2">经方 ({searchResults.fangji.length})</div>
                  <div className="space-y-2">
                    {searchResults.fangji.slice(0, 5).map((fang) => (
                      <button
                        key={fang.id}
                        onClick={() => setSelectedFang(fang)}
                        className="w-full bg-[#252525] rounded-xl p-3 border border-[#333] text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[#d4af37] font-medium">{fang.name}</span>
                          <ChevronRight className="w-4 h-4 text-[#555]" />
                        </div>
                        <div className="text-[#888] text-xs mt-1 line-clamp-1">{fang.indication}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.bencao.length > 0 && (
                <div>
                  <div className="text-[#888] text-xs mb-2">本草 ({searchResults.bencao.length})</div>
                  <div className="space-y-2">
                    {searchResults.bencao.slice(0, 5).map((cao) => (
                      <button
                        key={cao.id}
                        onClick={() => setSelectedCao(cao)}
                        className="w-full bg-[#252525] rounded-xl p-3 border border-[#333] text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[#22c55e] font-medium">{cao.name}</span>
                          <ChevronRight className="w-4 h-4 text-[#555]" />
                        </div>
                        <div className="text-[#888] text-xs mt-1 line-clamp-1">{cao.effect}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.fangji.length === 0 && searchResults.bencao.length === 0 && (
                <div className="text-center text-[#555] py-8">无匹配结果</div>
              )}
            </div>
          )}

          {/* 快捷入口 */}
          {!searchQuery && (
            <div className="space-y-4">
              <div className="text-[#888] text-xs">常见证型快捷查询</div>
              <div className="grid grid-cols-2 gap-2">
                {["太阳中风", "太阳伤寒", "少阳病", "阳明腑实", "太阴虚寒", "少阴寒化"].map((zheng) => (
                  <button
                    key={zheng}
                    onClick={() => setSearchQuery(zheng)}
                    className="bg-[#252525] rounded-lg p-3 border border-[#333] text-[#f5f5f7] text-sm"
                  >
                    {zheng}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 六经辨证分析 */}
      {viewMode === "bianzheng" && (
        <div className="px-4 space-y-4">
          {/* 基本信息 */}
          <div className="bg-[#252525] rounded-xl p-4 border border-[#333]">
            <div className="text-[#888] text-xs mb-3">基本信息</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#888] text-xs mb-1 block">年龄</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="岁"
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-[#f5f5f7] text-sm"
                />
              </div>
              <div>
                <label className="text-[#888] text-xs mb-1 block">体重</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="kg"
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-[#f5f5f7] text-sm"
                />
              </div>
            </div>
          </div>

          {/* 体质选择 */}
          <div className="bg-[#252525] rounded-xl p-4 border border-[#333]">
            <div className="text-[#888] text-xs mb-3">体质类型</div>
            <div className="grid grid-cols-2 gap-2">
              {TIZHI_OPTIONS.map((tz) => (
                <button
                  key={tz.id}
                  onClick={() => setTizhi(tz.id)}
                  className={`p-2 rounded-lg text-left text-xs transition-all ${
                    tizhi === tz.id
                      ? "bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37]"
                      : "bg-[#1a1a1a] border border-[#333] text-[#888]"
                  }`}
                >
                  <div className="font-medium">{tz.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 症状选择 */}
          <div className="bg-[#252525] rounded-xl p-4 border border-[#333]">
            <div className="text-[#888] text-xs mb-3">症状选择（点击勾选）</div>
            {SYMPTOM_CATEGORIES.map((cat) => (
              <div key={cat.name} className="mb-3">
                <div className="text-[#555] text-xs mb-2">{cat.name}</div>
                <div className="flex flex-wrap gap-2">
                  {cat.symptoms.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-2 py-1 rounded text-xs transition-all ${
                        selectedSymptoms.includes(symptom)
                          ? "bg-[#c8102e] text-[#f5f5f7]"
                          : "bg-[#1a1a1a] text-[#888] border border-[#333]"
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 辨证按钮 */}
          <button
            onClick={analyzeBianzheng}
            disabled={selectedSymptoms.length === 0}
            className="w-full py-3 rounded-xl bg-[#c8102e] text-[#f5f5f7] font-medium text-sm disabled:opacity-50"
          >
            六经辨证分析
          </button>

          {/* 辨证结果 */}
          {bianzhengResult && (
            <div className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl border border-[#d4af37]/30 p-4">
              <div className="text-center mb-4">
                <div className="text-[#888] text-xs mb-1">辨证结果</div>
                <div className="text-[#d4af37] text-xl font-bold">{bianzhengResult.zhengxing}</div>
                <div className="text-[#888] text-xs mt-1">匹配度 {bianzhengResult.confidence}%</div>
              </div>
              
              <div className="mb-4">
                <div className="text-[#888] text-xs mb-2">匹配症状</div>
                <div className="flex flex-wrap gap-1">
                  {bianzhengResult.matchedSymptoms.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-[#22c55e]/20 text-[#22c55e] rounded text-xs">{s}</span>
                  ))}
                </div>
              </div>

              <div className="text-[#888] text-xs mb-2">参考方剂</div>
              {bianzhengResult.formulas.map((fang: JingFang) => (
                <button
                  key={fang.id}
                  onClick={() => setSelectedFang(fang)}
                  className="w-full bg-[#1a1a1a] rounded-lg p-3 border border-[#d4af37]/30 text-left mb-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#d4af37] font-medium">{fang.name}</span>
                    <span className="text-[#888] text-xs">{fang.source}</span>
                  </div>
                  <div className="text-[#f5f5f7] text-xs mt-2">
                    {fang.composition.map(c => `${c.herb}${c.dosage}`).join("、")}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 经方库 */}
      {viewMode === "fangji" && (
        <div className="px-4">
          <div className="space-y-2">
            {JING_FANG_DATA.map((fang) => (
              <button
                key={fang.id}
                onClick={() => setSelectedFang(fang)}
                className="w-full bg-[#252525] rounded-xl p-3 border border-[#333] text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#d4af37] font-medium">{fang.name}</span>
                    <span className="text-[#555] text-xs ml-2">{fang.source}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </div>
                <div className="text-[#888] text-xs mt-1 line-clamp-1">{fang.indication}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 本草库 */}
      {viewMode === "bencao" && (
        <div className="px-4">
          <div className="space-y-2">
            {BEN_CAO_DATA.map((cao) => (
              <button
                key={cao.id}
                onClick={() => setSelectedCao(cao)}
                className="w-full bg-[#252525] rounded-xl p-3 border border-[#333] text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#22c55e] font-medium">{cao.name}</span>
                    <span className="text-[#555] text-xs ml-2">{cao.nature}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </div>
                <div className="text-[#888] text-xs mt-1 line-clamp-1">{cao.effect}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 经方详情弹窗 */}
      {selectedFang && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
          <div className="w-full max-h-[85vh] bg-[#1a1a1a] rounded-t-2xl overflow-hidden">
            <div className="sticky top-0 bg-[#1a1a1a] p-4 border-b border-[#333] flex items-center justify-between">
              <div>
                <h2 className="text-[#d4af37] text-lg font-bold">{selectedFang.name}</h2>
                <p className="text-[#888] text-xs">{selectedFang.source}</p>
              </div>
              <button onClick={() => setSelectedFang(null)} className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center">
                <X className="w-4 h-4 text-[#888]" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(85vh-80px)] space-y-4">
              <div>
                <div className="text-[#888] text-xs mb-2">【组成】</div>
                <div className="bg-[#252525] rounded-lg p-3">
                  {selectedFang.composition.map((c, i) => (
                    <span key={i} className="text-[#f5f5f7] text-sm">
                      {c.herb}<span className="text-[#888]">（{c.dosage}）</span>
                      {i < selectedFang.composition.length - 1 && "、"}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-2">【主治】</div>
                <div className="bg-[#252525] rounded-lg p-3 text-[#f5f5f7] text-sm">{selectedFang.indication}</div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-2">【辨证要点】</div>
                <div className="flex flex-wrap gap-1">
                  {selectedFang.syndrome.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-[#d4af37]/20 text-[#d4af37] rounded text-xs">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-2">【煎服法】</div>
                <div className="bg-[#252525] rounded-lg p-3 text-[#888] text-sm leading-relaxed">{selectedFang.preparation}</div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-2">【原文】</div>
                <div className="bg-[#252525] rounded-lg p-3 text-[#d4af37] text-sm leading-relaxed italic">「{selectedFang.original}」</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 本草详情弹窗 */}
      {selectedCao && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
          <div className="w-full max-h-[85vh] bg-[#1a1a1a] rounded-t-2xl overflow-hidden">
            <div className="sticky top-0 bg-[#1a1a1a] p-4 border-b border-[#333] flex items-center justify-between">
              <div>
                <h2 className="text-[#22c55e] text-lg font-bold">{selectedCao.name}</h2>
                <p className="text-[#888] text-xs">{selectedCao.nature}</p>
              </div>
              <button onClick={() => setSelectedCao(null)} className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center">
                <X className="w-4 h-4 text-[#888]" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(85vh-80px)] space-y-4">
              <div>
                <div className="text-[#888] text-xs mb-2">【归经】</div>
                <div className="flex flex-wrap gap-1">
                  {selectedCao.meridian.map((m, i) => (
                    <span key={i} className="px-2 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded text-xs">{m}经</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-2">【功效】</div>
                <div className="bg-[#252525] rounded-lg p-3 text-[#f5f5f7] text-sm">{selectedCao.effect}</div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-2">【主治】</div>
                <div className="bg-[#252525] rounded-lg p-3 text-[#f5f5f7] text-sm">{selectedCao.indication}</div>
              </div>
              <div>
                <div className="text-[#888] text-xs mb-2">【用量】</div>
                <div className="bg-[#252525] rounded-lg p-3 text-[#d4af37] text-sm">{selectedCao.dosage}</div>
              </div>
              {selectedCao.caution && (
                <div>
                  <div className="text-[#888] text-xs mb-2">【禁忌】</div>
                  <div className="bg-[#c8102e]/10 rounded-lg p-3 text-[#c8102e] text-sm">{selectedCao.caution}</div>
                </div>
              )}
              {selectedCao.original && (
                <div>
                  <div className="text-[#888] text-xs mb-2">【本经原文】</div>
                  <div className="bg-[#252525] rounded-lg p-3 text-[#d4af37] text-sm leading-relaxed italic">「{selectedCao.original}」</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
