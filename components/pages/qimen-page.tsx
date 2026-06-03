"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, TrendingUp } from "lucide-react"
import {
  JIE_QI_DUN,
  calculateQimenPan
} from "@/lib/qimen-data"

export function QimenPage() {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [resultTab, setResultTab] = useState<"pan" | "geju" | "guji">("pan")
  const [qimenData, setQimenData] = useState<any>(null)
  const [formData, setFormData] = useState({
    jieqi: "冬至",
    yuan: 0 as 0 | 1 | 2,
    hourGan: "甲"
  })

  const handleSubmit = () => {
    const result = calculateQimenPan(formData.jieqi, formData.yuan, formData.hourGan)
    setQimenData(result)
    setActiveTab("result")
  }

  const renderInputForm = () => (
    <div className="min-h-screen bg-gradient-to-b from-ink-900 to-ink-800">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-ink-900/90 backdrop-blur border-b border-ink-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <button className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-ink-300" />
          </button>
          <h1 className="text-lg font-bold text-ink-50">奇门遁甲</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 标题说明 */}
        <div className="bg-ink-800/50 border border-ink-700 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-gold-400 mb-2">奇门遁甲 · 帝王之学</h2>
          <p className="text-ink-400 text-sm">
            基于奇门遁甲经典，天盘地盘人盘神盘，九星八门八神三奇六仪
          </p>
        </div>

        {/* 输入表单 */}
        <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5 space-y-5">
          {/* 节气选择 */}
          <div>
            <label className="block text-sm font-medium text-ink-300 mb-3">选择节气</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(JIE_QI_DUN).map((jieqi) => (
                <button
                  key={jieqi}
                  onClick={() => setFormData(prev => ({ ...prev, jieqi }))}
                  className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${
                    formData.jieqi === jieqi
                      ? "bg-gold-500 text-ink-950"
                      : "bg-ink-700 text-ink-300 hover:bg-ink-600"
                  }`}
                >
                  {jieqi}
                </button>
              ))}
            </div>
          </div>

          {/* 元次选择 */}
          <div>
            <label className="block text-sm font-medium text-ink-300 mb-3">选择元次</label>
            <div className="flex gap-3">
              {[
                { value: 0, label: "上元" },
                { value: 1, label: "中元" },
                { value: 2, label: "下元" }
              ].map((yuan) => (
                <button
                  key={yuan.value}
                  onClick={() => setFormData(prev => ({ ...prev, yuan: yuan.value as 0 | 1 | 2 }))}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                    formData.yuan === yuan.value
                      ? "bg-vermilion-500 text-white"
                      : "bg-ink-700 text-ink-300 hover:bg-ink-600"
                  }`}
                >
                  {yuan.label}
                </button>
              ))}
            </div>
          </div>

          {/* 时干选择 */}
          <div>
            <label className="block text-sm font-medium text-ink-300 mb-3">选择时干</label>
            <div className="grid grid-cols-5 gap-2">
              {["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"].map((gan) => (
                <button
                  key={gan}
                  onClick={() => setFormData(prev => ({ ...prev, hourGan: gan }))}
                  className={`py-3 rounded-lg text-sm font-medium transition-all ${
                    formData.hourGan === gan
                      ? "bg-emerald-500 text-white"
                      : "bg-ink-700 text-ink-300 hover:bg-ink-600"
                  }`}
                >
                  {gan}
                </button>
              ))}
            </div>
          </div>

          {/* 起局按钮 */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-gold-500 to-amber-500 text-ink-950 rounded-xl font-bold text-lg shadow-lg hover:from-gold-400 hover:to-amber-400 transition-all active:scale-[0.98]"
          >
            起局
          </button>
        </div>

        {/* 古籍参考 */}
        <div className="bg-ink-800/30 border border-ink-700/50 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-ink-200 mb-1">经典理论依据</h3>
              <p className="text-sm text-ink-400 leading-relaxed">
                奇门遁甲为古代三式之首，源于《周易》，包含天盘、地盘、人盘、神盘，
                及九星、八门、八神、三奇六仪，为古代帝王行军布阵之学
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderResult = () => {
    if (!qimenData) return null

    return (
      <div className="min-h-screen bg-gradient-to-b from-ink-900 to-ink-800">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-ink-900/90 backdrop-blur border-b border-ink-700">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button onClick={() => setActiveTab("input")} className="p-2 -ml-2">
                <ArrowLeft className="w-6 h-6 text-ink-300" />
              </button>
              <h1 className="text-lg font-bold text-ink-50">奇门遁甲局</h1>
              <div className="w-10" />
            </div>
          </div>

          {/* 标签页 */}
          <div className="flex border-b border-ink-700 px-4">
            {[
              { id: "pan", label: "命盘" },
              { id: "geju", label: "格局" },
              { id: "guji", label: "古籍" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setResultTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                  resultTab === tab.id
                    ? "text-gold-400"
                    : "text-ink-400 hover:text-ink-200"
                }`}
              >
                {tab.label}
                {resultTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 pb-24 space-y-4">
          {/* 基本信息 */}
          <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-ink-50">
                {qimenData.dunType} · 阳{qimenData.ju}局
              </h2>
              <div className="flex justify-center gap-4 text-sm">
                <span className="text-ink-400">值符：{qimenData.zhiFu}</span>
                <span className="text-ink-400">值使：{qimenData.zhiShi}</span>
              </div>
            </div>
          </div>

          {/* 奇门盘 - 九宫格 */}
          {resultTab === "pan" && (
            <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-ink-50 mb-4 text-center">奇门遁甲盘</h3>
              
              {/* 九宫格布局 */}
              <div className="grid grid-cols-3 gap-2">
                {/* 第一行：巳午未 - 4 9 2 */}
                {[4, 9, 2].map((pos) => {
                  const palace = qimenData.palaces.find((p: any) => p.position === pos)
                  return palace ? (
                    <QimenPalace key={pos} palace={palace} />
                  ) : null
                })}
                
                {/* 第二行：辰 - 酉 - 3 中 7 */}
                {[3, 5, 7].map((pos) => {
                  const palace = qimenData.palaces.find((p: any) => p.position === pos)
                  return palace ? (
                    <QimenPalace key={pos} palace={palace} isMiddle={pos === 5} />
                  ) : null
                })}
                
                {/* 第三行：寅丑子亥 - 8 1 6 */}
                {[8, 1, 6].map((pos) => {
                  const palace = qimenData.palaces.find((p: any) => p.position === pos)
                  return palace ? (
                    <QimenPalace key={pos} palace={palace} />
                  ) : null
                })}
              </div>

              {/* 图例 */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gold-500/30 rounded"></div>
                  <span className="text-ink-400">天盘三奇六仪</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500/30 rounded"></div>
                  <span className="text-ink-400">地盘三奇六仪</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500/30 rounded"></div>
                  <span className="text-ink-400">九星</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500/30 rounded"></div>
                  <span className="text-ink-400">八门八神</span>
                </div>
              </div>
            </div>
          )}

          {/* 格局判断 */}
          {resultTab === "geju" && (
            <div className="space-y-4">
              {/* 吉格 */}
              <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  吉格
                </h3>
                <div className="space-y-3">
                  {QIMEN_GEJU.吉格.map((geju, idx) => (
                    <div key={idx} className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <div className="font-bold text-emerald-300 mb-2">{geju.name}</div>
                      <div className="text-sm text-ink-400">{geju.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 凶格 */}
              <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 rotate-180" />
                  凶格
                </h3>
                <div className="space-y-3">
                  {QIMEN_GEJU.凶格.map((geju, idx) => (
                    <div key={idx} className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                      <div className="font-bold text-red-300 mb-2">{geju.name}</div>
                      <div className="text-sm text-ink-400">{geju.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 古籍参考 */}
          {resultTab === "guji" && (
            <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-ink-50 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-400" />
                古籍参考
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                  <div className="text-xs font-bold text-blue-300 mb-2">《奇门遁甲》</div>
                  <div className="text-ink-200 italic mb-2">
                    "阴阳顺逆妙难穷，二至还乡一九宫。若能了达阴阳理，天地都在一掌中。"
                  </div>
                  <div className="text-ink-400 text-sm">
                    阴阳顺逆之理深奥难穷，冬至夏至是阴阳二气的转折点，
                    一宫九宫是阴阳的起点终点。如能明了阴阳变化之理，天地变化皆在掌握之中。
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                  <div className="text-xs font-bold text-purple-300 mb-2">《烟波钓叟歌》</div>
                  <div className="text-ink-200 italic mb-2">
                    "六甲元号六仪名，三奇即是乙丙丁。戊己庚辛壬癸配，六甲隐遁在其中。"
                  </div>
                  <div className="text-ink-400 text-sm">
                    六甲就是六仪，三奇是乙丙丁。戊己庚辛壬癸依次配合，
                    六甲隐藏在六仪之中，不显其形。
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                  <div className="text-xs font-bold text-emerald-300 mb-2">《遁甲演义》</div>
                  <div className="text-ink-200 italic mb-2">
                    "天有九星，地有九宫，人有八门，神有八神。四盘既定，吉凶可断。"
                  </div>
                  <div className="text-ink-400 text-sm">
                    天上有九星，地上有九宫，人间有八门，神界有八神。
                    天盘地盘人盘神盘四盘确定之后，吉凶祸福就可以判断了。
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return activeTab === "input" ? renderInputForm() : renderResult()
}

// 单个宫位组件
function QimenPalace({ palace, isMiddle = false }: { palace: any; isMiddle?: boolean }) {
  return (
    <div className={`
      p-3 rounded-xl border
      ${isMiddle 
        ? "bg-gold-500/20 border-gold-500/40" 
        : "bg-ink-700/50 border-ink-600"
      }
    `}>
      {/* 宫位信息 */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-ink-400">{palace.name}</span>
        <span className="text-xs text-ink-500">{palace.direction}</span>
      </div>

      {/* 八神 - 顶部 */}
      <div className="text-center mb-2">
        <span className="text-sm font-bold text-purple-300">{palace.baShen}</span>
      </div>

      {/* 天盘 */}
      <div className="text-center mb-1">
        <span className="text-lg font-bold text-gold-300 bg-gold-500/20 px-2 py-1 rounded">
          {palace.tianPan}
        </span>
      </div>

      {/* 九星 */}
      <div className="text-center mb-1">
        <span className="text-sm font-medium text-emerald-300">{palace.jiuXing}</span>
      </div>

      {/* 八门 */}
      <div className="text-center mb-1">
        <span className="text-sm font-medium text-blue-300">{palace.baMen}</span>
      </div>

      {/* 地盘 */}
      <div className="text-center">
        <span className="text-lg font-bold text-blue-300 bg-blue-500/20 px-2 py-1 rounded">
          {palace.diPan}
        </span>
      </div>
    </div>
  )
}
