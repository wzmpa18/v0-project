"use client"

import { useState } from "react"
import { Globe, Calendar, Heart, Coins, Briefcase, Sparkles, Info } from "lucide-react"
import {
  SHI_ER_XING_ZUO,
  XING_ZUO_YUN_SHI,
  XING_ZUO_PEI_DU,
  getXingZuo,
} from "@/lib/zhanxing-data"

export default function ZhanxingPage() {
  const [selectedXingZuo, setSelectedXingZuo] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  })
  const [myXingZuo, setMyXingZuo] = useState<string | null>(null)
  const [showPeiDu, setShowPeiDu] = useState(false)
  const [peiDuTarget, setPeiDuTarget] = useState<string | null>(null)

  const handleCalculate = () => {
    const xingZuo = getXingZuo(formData.month, formData.day)
    setMyXingZuo(xingZuo)
    setSelectedXingZuo(xingZuo)
  }

  const getElementColor = (element: string) => {
    const colors: Record<string, string> = {
      "火": "text-red-500",
      "土": "text-amber-600",
      "风": "text-cyan-500",
      "水": "text-blue-500",
    }
    return colors[element] || "text-gray-500"
  }

  const getXingZuoInfo = (name: string) => {
    return SHI_ER_XING_ZUO.find(x => x.name === name)
  }

  const getYunShi = (name: string) => {
    return XING_ZUO_YUN_SHI[name]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-400">占星术</h1>
            <p className="text-xs text-blue-200/60">西方占星 · 星座运势</p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 rounded-xl p-4 border border-blue-800/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-200/80">
              占星术源于西方，通过分析十二星座的性格特点和运势走向，
              帮助人们了解自己和他人，规划人生方向。
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">查询我的星座</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">出生月份</label>
              <select
                value={formData.month}
                onChange={(e) => setFormData(prev => ({ ...prev, month: Number(e.target.value) }))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">出生日期</label>
              <select
                value={formData.day}
                onChange={(e) => setFormData(prev => ({ ...prev, day: Number(e.target.value) }))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-500 hover:to-blue-600 transition-all"
          >
            查询星座
          </button>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">十二星座</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {SHI_ER_XING_ZUO.map((xingZuo) => (
              <button
                key={xingZuo.name}
                onClick={() => setSelectedXingZuo(xingZuo.name)}
                className={`bg-blue-800/30 rounded-lg p-3 text-center transition-all ${
                  selectedXingZuo === xingZuo.name ? "ring-2 ring-blue-500/50 bg-blue-700/40" : ""
                }`}
              >
                <div className="text-2xl mb-1">{xingZuo.symbol}</div>
                <div className="text-xs font-medium text-blue-300">{xingZuo.name}</div>
                <div className="text-xs text-blue-100/60">{xingZuo.date}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedXingZuo && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-800/60 to-blue-900/40 rounded-xl p-5 border border-blue-700/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/30 flex items-center justify-center">
                  <span className="text-3xl">{getXingZuoInfo(selectedXingZuo)?.symbol}</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{selectedXingZuo}</div>
                  <div className="text-sm text-blue-200/70">{getXingZuoInfo(selectedXingZuo)?.english}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xs text-blue-200/60 mb-1">日期范围</div>
                  <div className="text-sm text-white">{getXingZuoInfo(selectedXingZuo)?.date}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xs text-blue-200/60 mb-1">元素属性</div>
                  <div className={`text-sm font-medium ${getElementColor(getXingZuoInfo(selectedXingZuo)?.element || "")}`}>
                    {getXingZuoInfo(selectedXingZuo)?.element}象星座
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xs text-blue-200/60 mb-1">守护星</div>
                  <div className="text-sm text-white">{getXingZuoInfo(selectedXingZuo)?.ruler}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xs text-blue-200/60 mb-1">性格特点</div>
                  <div className="text-sm text-white">{getXingZuoInfo(selectedXingZuo)?.desc}</div>
                </div>
              </div>
            </div>

            {getYunShi(selectedXingZuo) && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">今日运势</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-blue-800/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-medium text-amber-300">综合运势</span>
                    </div>
                    <p className="text-xs text-blue-100/70">{getYunShi(selectedXingZuo)?.overall}</p>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-pink-400" />
                      <span className="text-sm font-medium text-pink-300">爱情运势</span>
                    </div>
                    <p className="text-xs text-blue-100/70">{getYunShi(selectedXingZuo)?.love}</p>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-300">事业运势</span>
                    </div>
                    <p className="text-xs text-blue-100/70">{getYunShi(selectedXingZuo)?.career}</p>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Coins className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-300">财富运势</span>
                    </div>
                    <p className="text-xs text-blue-100/70">{getYunShi(selectedXingZuo)?.wealth}</p>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-lg p-3 border border-amber-800/30">
                  <div className="text-xs text-amber-400 font-medium mb-2">幸运元素</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-amber-800/30 rounded-lg p-2 text-center">
                      <div className="text-xs text-amber-200/60">幸运数字</div>
                      <div className="text-lg font-bold text-amber-300">{getYunShi(selectedXingZuo)?.lucky.number}</div>
                    </div>
                    <div className="bg-amber-800/30 rounded-lg p-2 text-center">
                      <div className="text-xs text-amber-200/60">幸运颜色</div>
                      <div className="text-sm font-medium text-amber-300">{getYunShi(selectedXingZuo)?.lucky.color}</div>
                    </div>
                    <div className="bg-amber-800/30 rounded-lg p-2 text-center">
                      <div className="text-xs text-amber-200/60">幸运方位</div>
                      <div className="text-sm font-medium text-amber-300">{getYunShi(selectedXingZuo)?.lucky.direction}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowPeiDu(!showPeiDu)}
              className="w-full py-3 bg-white/10 text-blue-300 rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              {showPeiDu ? "隐藏配对分析" : "星座配对分析"}
            </button>

            {showPeiDu && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span className="text-sm font-medium text-pink-400">星座配对</span>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-gray-400 mb-2">选择配对星座</label>
                  <select
                    value={peiDuTarget || ""}
                    onChange={(e) => setPeiDuTarget(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2 px-3 text-white"
                  >
                    <option value="">请选择</option>
                    {SHI_ER_XING_ZUO.filter(x => x.name !== selectedXingZuo).map(x => (
                      <option key={x.name} value={x.name}>{x.name}</option>
                    ))}
                  </select>
                </div>

                {peiDuTarget && XING_ZUO_PEI_DU[selectedXingZuo]?.[peiDuTarget] && (
                  <div className="bg-gradient-to-br from-pink-900/40 to-pink-950/60 rounded-lg p-4 border border-pink-800/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getXingZuoInfo(selectedXingZuo)?.symbol}</span>
                        <span className="text-sm text-white">{selectedXingZuo}</span>
                      </div>
                      <Heart className="w-5 h-5 text-pink-400" />
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white">{peiDuTarget}</span>
                        <span className="text-2xl">{getXingZuoInfo(peiDuTarget)?.symbol}</span>
                      </div>
                    </div>
                    <div className="text-center mb-3">
                      <div className="text-3xl font-bold text-pink-400">
                        {XING_ZUO_PEI_DU[selectedXingZuo]?.[peiDuTarget]?.score}%
                      </div>
                      <div className="text-xs text-pink-200/60">配对指数</div>
                    </div>
                    <p className="text-xs text-pink-100/70 text-center">
                      {XING_ZUO_PEI_DU[selectedXingZuo]?.[peiDuTarget]?.desc}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
          <div className="text-sm font-medium text-purple-400 mb-3">占星术简介</div>
          <p className="text-xs text-purple-100/70 leading-relaxed">
            占星术是西方的一种古老预测学，通过分析天体运行规律和十二星座的性格特点，
            来预测人的命运和运势走向。十二星座按照元素属性分为火象、土象、风象、水象四大类，
            每类星座都有其独特的性格特点和运势规律。占星术可以帮助人们了解自己和他人，
            指导人生规划和情感关系。
          </p>
        </div>
      </main>
    </div>
  )
}