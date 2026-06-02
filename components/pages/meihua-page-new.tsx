"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Hash, Shuffle, BookOpen } from "lucide-react"
import { 
  BA_GUA, GUA_64_MEIHUA, TI_YONG_SHENGKE, MEIHUA_DUANYU, 
  WAN_WU_LEI_XIANG, getGuaInfo, getTiYongGuanxi 
} from "@/lib/meihua-data"

const GUA_NAMES = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"]

export function MeiHuaPageStandalone() {
  const [qiGuaMethod, setQiGuaMethod] = useState<"time" | "number" | "manual">("time")
  const [numbers, setNumbers] = useState({ shang: "", xia: "", dong: "" })
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"basic" | "tiyong" | "guji">("basic")
  
  // 时间起卦
  const qiGuaByTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const hour = now.getHours()
    
    // 上卦 = (年+月+日) % 8
    const shangNum = (year + month + day) % 8 || 8
    // 下卦 = (年+月+日+时) % 8
    const xiaNum = (year + month + day + hour) % 8 || 8
    // 动爻 = (年+月+日+时) % 6
    const dongYao = (year + month + day + hour) % 6 || 6
    
    calculateResult(shangNum, xiaNum, dongYao)
  }
  
  // 数字起卦
  const qiGuaByNumber = () => {
    const shang = parseInt(numbers.shang) || 1
    const xia = parseInt(numbers.xia) || 1
    const dong = parseInt(numbers.dong) || 1
    
    const shangNum = shang % 8 || 8
    const xiaNum = xia % 8 || 8
    const dongYao = dong % 6 || 6
    
    calculateResult(shangNum, xiaNum, dongYao)
  }
  
  // 手动摇卦
  const qiGuaManual = () => {
    const shangNum = Math.floor(Math.random() * 8) + 1
    const xiaNum = Math.floor(Math.random() * 8) + 1
    const dongYao = Math.floor(Math.random() * 6) + 1
    
    calculateResult(shangNum, xiaNum, dongYao)
  }
  
  // 计算结果
  const calculateResult = (shangNum: number, xiaNum: number, dongYao: number) => {
    const shangGua = GUA_NAMES[shangNum - 1]
    const xiaGua = GUA_NAMES[xiaNum - 1]
    
    // 变卦：动爻所在卦变化
    const isShangDong = dongYao > 3
    const bianShangGua = isShangDong ? GUA_NAMES[(shangNum + dongYao - 1) % 8] : shangGua
    const bianXiaGua = !isShangDong ? GUA_NAMES[(xiaNum + dongYao - 1) % 8] : xiaGua
    
    // 体用判断：动爻所在为用，不动为体
    const tiGua = isShangDong ? xiaGua : shangGua
    const yongGua = isShangDong ? shangGua : xiaGua
    
    const tiWuxing = BA_GUA[tiGua as keyof typeof BA_GUA].wuxing
    const yongWuxing = BA_GUA[yongGua as keyof typeof BA_GUA].wuxing
    const guanxi = getTiYongGuanxi(tiWuxing, yongWuxing)
    
    const guaInfo = getGuaInfo(shangGua, xiaGua)
    const bianGuaInfo = getGuaInfo(bianShangGua, bianXiaGua)
    
    setResult({
      shangGua,
      xiaGua,
      bianShangGua,
      bianXiaGua,
      dongYao,
      tiGua,
      yongGua,
      tiWuxing,
      yongWuxing,
      guanxi,
      guaInfo,
      bianGuaInfo,
      jixiong: TI_YONG_SHENGKE[guanxi as keyof typeof TI_YONG_SHENGKE]
    })
  }

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "木": "text-emerald-400",
      "火": "text-red-400",
      "土": "text-amber-400",
      "金": "text-gray-300",
      "水": "text-blue-400"
    }
    return colors[wuxing] || "text-gray-300"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink-900 to-ink-800">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-ink-900/90 backdrop-blur border-b border-ink-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-10" />
          <h1 className="text-lg font-bold text-ink-50">梅花易数</h1>
          <div className="w-10" />
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* 标题说明 */}
        <div className="bg-ink-800/50 border border-ink-700 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-gold-400 mb-2">梅花易数 · 观梅占</h2>
          <p className="text-ink-400 text-sm">
            源于邵康节观梅见雀相争而起卦，包含起卦方法、体用分析、互卦变卦、八卦万物类象
          </p>
        </div>
        
        {/* 起卦方式选择 */}
        <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
          <div className="flex gap-2 mb-4">
            {[
              { id: "time", label: "时间起卦", icon: Clock },
              { id: "number", label: "数字起卦", icon: Hash },
              { id: "manual", label: "随机起卦", icon: Shuffle },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setQiGuaMethod(method.id as any)}
                className={`flex-1 py-3 rounded-lg flex flex-col items-center gap-1 transition-all ${
                  qiGuaMethod === method.id
                    ? "bg-gold-500 text-ink-950"
                    : "bg-ink-700 text-ink-300 hover:bg-ink-600"
                }`}
              >
                <method.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{method.label}</span>
              </button>
            ))}
          </div>
          
          {/* 数字起卦输入 */}
          {qiGuaMethod === "number" && (
            <div className="space-y-3 mb-4">
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="上卦数"
                  value={numbers.shang}
                  onChange={(e) => setNumbers({ ...numbers, shang: e.target.value })}
                  className="flex-1 px-4 py-3 bg-ink-900 border border-ink-600 rounded-lg text-ink-50 placeholder-ink-500 focus:outline-none focus:border-gold-500"
                />
                <input
                  type="number"
                  placeholder="下卦数"
                  value={numbers.xia}
                  onChange={(e) => setNumbers({ ...numbers, xia: e.target.value })}
                  className="flex-1 px-4 py-3 bg-ink-900 border border-ink-600 rounded-lg text-ink-50 placeholder-ink-500 focus:outline-none focus:border-gold-500"
                />
                <input
                  type="number"
                  placeholder="动爻数"
                  value={numbers.dong}
                  onChange={(e) => setNumbers({ ...numbers, dong: e.target.value })}
                  className="flex-1 px-4 py-3 bg-ink-900 border border-ink-600 rounded-lg text-ink-50 placeholder-ink-500 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          )}
          
          {/* 起卦按钮 */}
          <button
            onClick={
              qiGuaMethod === "time" ? qiGuaByTime :
              qiGuaMethod === "number" ? qiGuaByNumber : qiGuaManual
            }
            className="w-full py-4 bg-gradient-to-r from-gold-500 to-amber-500 text-ink-950 rounded-xl font-bold text-lg shadow-lg hover:from-gold-400 hover:to-amber-400 transition-all active:scale-[0.98]"
          >
            开始起卦
          </button>
        </div>
        
        {/* 古籍参考 */}
        <div className="bg-ink-800/30 border border-ink-700/50 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-ink-200 mb-1">经典理论依据</h3>
              <p className="text-sm text-ink-400 leading-relaxed">
                梅花易数为宋代邵康节所创，以先天八卦为基础，通过时间、数字、声音、方位等起卦，观体用生克断吉凶
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 结果显示 */}
      {result && (
        <div className="border-t border-ink-700">
          {/* Tab切换 */}
          <div className="flex border-b border-ink-700 bg-ink-900/90 backdrop-blur">
            {[
              { id: "basic", label: "卦象信息" },
              { id: "tiyong", label: "体用分析" },
              { id: "guji", label: "古籍断语" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? "text-gold-400"
                    : "text-ink-400 hover:text-ink-200"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />
                )}
              </button>
            ))}
          </div>
          
          <div className="p-4 pb-24 space-y-4">
            {/* 卦象信息 */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                {/* 本卦变卦 */}
                <div className="flex gap-4">
                  <div className="flex-1 bg-ink-800 border border-ink-700 rounded-xl p-4 text-center">
                    <div className="text-sm text-ink-400 mb-2">本卦</div>
                    <div className="text-3xl font-bold text-gold-400 mb-2">
                      {result.shangGua}{result.xiaGua}
                    </div>
                    <div className="text-lg text-ink-100 font-medium">{result.guaInfo.name}</div>
                    <div className="text-sm text-vermilion-400 mt-2">动{result.dongYao}爻</div>
                  </div>
                  <div className="flex items-center text-ink-400">→</div>
                  <div className="flex-1 bg-ink-800 border border-ink-700 rounded-xl p-4 text-center">
                    <div className="text-sm text-ink-400 mb-2">变卦</div>
                    <div className="text-3xl font-bold text-gold-400 mb-2">
                      {result.bianShangGua}{result.bianXiaGua}
                    </div>
                    <div className="text-lg text-ink-100 font-medium">{result.bianGuaInfo.name}</div>
                  </div>
                </div>
                
                {/* 卦辞象辞 */}
                <div className="bg-gradient-to-r from-gold-500/10 to-amber-500/10 border border-gold-500/30 rounded-xl p-4">
                  <div className="text-sm text-gold-300 mb-2">卦辞</div>
                  <div className="text-ink-100 font-medium">{result.guaInfo.guaCi}</div>
                  <div className="text-sm text-gold-300 mt-3 mb-2">象辞</div>
                  <div className="text-ink-100 font-medium">{result.guaInfo.xiangCi}</div>
                </div>
                
                {/* 万物类象 */}
                <div className="bg-ink-800 border border-ink-700 rounded-xl p-4">
                  <div className="text-sm text-gold-400 mb-3 font-medium">万物类象 - {result.tiGua}卦（体）</div>
                  {WAN_WU_LEI_XIANG[result.tiGua as keyof typeof WAN_WU_LEI_XIANG] && (
                    <div className="space-y-2 text-sm">
                      {Object.entries(WAN_WU_LEI_XIANG[result.tiGua as keyof typeof WAN_WU_LEI_XIANG]).map(([key, values]) => (
                        <div key={key} className="flex">
                          <span className="w-16 text-ink-400">{key}:</span>
                          <span className="text-ink-200 font-medium">{(values as string[]).join("、")}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* 体用分析 */}
            {activeTab === "tiyong" && (
              <div className="space-y-4">
                <div className="bg-ink-800 border border-ink-700 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <div className="text-sm text-ink-400 mb-1">体卦</div>
                      <div className={`text-2xl font-bold ${getWuxingColor(result.tiWuxing)}`}>{result.tiGua}</div>
                      <div className="text-sm text-ink-300">五行：{result.tiWuxing}</div>
                    </div>
                    <div className="text-center px-4">
                      <div className={`text-lg font-bold ${
                        result.jixiong?.jixiong.includes("吉") ? "text-emerald-400" : "text-vermilion-400"
                      }`}>
                        {result.guanxi}
                      </div>
                      <div className="text-sm text-ink-300 mt-1">{result.jixiong?.jixiong}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-ink-400 mb-1">用卦</div>
                      <div className={`text-2xl font-bold ${getWuxingColor(result.yongWuxing)}`}>{result.yongGua}</div>
                      <div className="text-sm text-ink-300">五行：{result.yongWuxing}</div>
                    </div>
                  </div>
                  <div className="text-sm text-ink-200 bg-ink-900/50 p-3 rounded-lg">
                    {result.jixiong?.desc}
                  </div>
                </div>
                
                {/* 体用口诀 */}
                <div className="bg-gradient-to-r from-gold-500/10 to-amber-500/10 border border-gold-500/30 rounded-xl p-4">
                  <div className="text-sm text-gold-300 mb-2 font-medium">体用总诀</div>
                  <div className="text-ink-100">{MEIHUA_DUANYU.体用诀.原文}</div>
                  <div className="text-sm text-ink-400 mt-2">{MEIHUA_DUANYU.体用诀.译文}</div>
                  <div className="text-xs text-ink-500 mt-2 text-right">——{MEIHUA_DUANYU.体用诀.出处}</div>
                </div>
              </div>
            )}
            
            {/* 古籍断语 */}
            {activeTab === "guji" && (
              <div className="space-y-4">
                {Object.entries(MEIHUA_DUANYU).map(([key, value]) => (
                  <div key={key} className="bg-gradient-to-r from-gold-500/10 to-amber-500/10 border border-gold-500/30 rounded-xl p-4">
                    <div className="text-sm text-gold-300 mb-2 font-medium">{key}</div>
                    <div className="text-ink-100 font-medium">{value.原文}</div>
                    <div className="text-sm text-ink-400 mt-2">【译文】{value.译文}</div>
                    <div className="text-xs text-ink-500 mt-2 text-right">——{value.出处}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
