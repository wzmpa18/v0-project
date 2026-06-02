"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, RefreshCw } from "lucide-react"
import { 
  GUA_64, 
  BA_GUA_NA_JIA, 
  LIU_QIN, 
  LIU_SHOU, 
  LIU_SHOU_START, 
  getLiuQin, 
  ZHI_WUXING, 
  GUA_GONG_WUXING, 
  generateLiuYao, 
  timeToGua 
} from "@/lib/liuyao-data"

const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

export function LiuYaoPageStandalone() {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [resultTab, setResultTab] = useState<"basic" | "detail" | "guji">("basic")
  
  // 输入状态
  const [dayGan, setDayGan] = useState("甲")
  const [method, setMethod] = useState<"manual" | "time" | "number">("manual")
  const [throws, setThrows] = useState<number[]>([0, 0, 0, 0, 0, 0])
  const [numbers, setNumbers] = useState({ shang: "", xia: "", dong: "" })
  const [guaResult, setGuaResult] = useState<any>(null)

  // 手动摇卦
  const throwCoin = (index: number) => {
    const newThrows = [...throws]
    // 模拟三枚铜钱: 6(老阴),7(少阳),8(少阴),9(老阳)
    newThrows[index] = [6,7,8,9][Math.floor(Math.random() * 4)]
    setThrows(newThrows)
  }

  const resetThrows = () => {
    setThrows([0,0,0,0,0,0])
  }

  // 开始起卦
  const startDivination = () => {
    let result
    if (method === "manual") {
      const validThrows = throws.filter(t => t > 0)
      if (validThrows.length < 6) {
        alert("请完成六次摇卦")
        return
      }
      result = generateLiuYao(throws, dayGan)
    } else if (method === "number") {
      const shang = parseInt(numbers.shang) || 1
      const xia = parseInt(numbers.xia) || 1
      const dong = parseInt(numbers.dong) || 1
      const guaThrows = timeToGua(shang, xia, dong)
      result = generateLiuYao(guaThrows, dayGan)
    } else {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()
      const hour = now.getHours()
      const guaThrows = timeToGua(year, month, day, hour)
      result = generateLiuYao(guaThrows, dayGan)
    }
    setGuaResult(result)
    setActiveTab("result")
  }

  const getYaoSymbol = (value: number) => {
    switch(value) {
      case 6: return "×" // 老阴
      case 7: return "━" // 少阳
      case 8: return "━ ━" // 少阴
      case 9: return "○" // 老阳
      default: return "?"
    }
  }

  const getYaoColor = (value: number) => {
    switch(value) {
      case 6: return "text-vermilion-400" // 老阴变红
      case 7: return "text-ink-100" // 少阳
      case 8: return "text-ink-100" // 少阴
      case 9: return "text-blue-400" // 老阳变阴
      default: return "text-ink-400"
    }
  }

  const isYaoMoving = (value: number) => value === 6 || value === 9

  const renderInputForm = () => (
    <div className="min-h-screen bg-gradient-to-b from-ink-900 to-ink-800">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-ink-900/90 backdrop-blur border-b border-ink-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-10" />
          <h1 className="text-lg font-bold text-ink-50">六爻纳甲</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 标题说明 */}
        <div className="bg-ink-800/50 border border-ink-700 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-gold-400 mb-2">增删卜易 · 卜筮正宗</h2>
          <p className="text-ink-400 text-sm">
            基于六爻纳甲古法，包含六十四卦、八卦纳甲、六亲、六兽、世应位置、动爻变卦
          </p>
        </div>

        {/* 起卦方法选择 */}
        <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
          <div className="flex gap-2 mb-4">
            {[
              { id: "manual", label: "手动摇卦" },
              { id: "time", label: "时间起卦" },
              { id: "number", label: "数字起卦" }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id as any)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                  method === m.id 
                    ? "bg-gold-500 text-ink-950" 
                    : "bg-ink-700 text-ink-300 hover:bg-ink-600"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* 日干支选择 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-ink-300 mb-2">日天干（定六兽）</label>
            <div className="flex flex-wrap gap-2">
              {TIAN_GAN.map((gan) => (
                <button
                  key={gan}
                  onClick={() => setDayGan(gan)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                    dayGan === gan 
                      ? "bg-gold-500 text-ink-950" 
                      : "bg-ink-700 text-ink-300 hover:bg-ink-600"
                  }`}
                >
                  {gan}
                </button>
              ))}
            </div>
          </div>

          {/* 手动摇卦 */}
          {method === "manual" && (
            <div className="space-y-3">
              <div className="text-sm text-ink-400 mb-2">点击铜钱摇卦（从初爻到上爻）</div>
              <div className="flex flex-col-reverse gap-2">
                {throws.map((value, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs text-ink-500 w-16">
                      {index === 0 ? "初爻" : index === 5 ? "上爻" : `${index + 1}爻`}
                    </span>
                    <button
                      onClick={() => throwCoin(index)}
                      disabled={value > 0}
                      className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all ${
                        value > 0 
                          ? `${getWuxingBg(value % 2 === 0 ? "火" : "水")} ${getYaoColor(value)}` 
                          : "bg-ink-700 text-ink-400 hover:bg-ink-600"
                      }`}
                    >
                      {value > 0 ? getYaoSymbol(value) : "🎲"}
                    </button>
                    {isYaoMoving(value) && (
                      <span className="text-xs text-vermilion-400">动</span>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={resetThrows}
                className="w-full py-2 bg-ink-700 text-ink-300 rounded-xl text-sm hover:bg-ink-600 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                重新摇卦
              </button>
            </div>
          )}

          {/* 数字起卦 */}
          {method === "number" && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="上卦数"
                  value={numbers.shang}
                  onChange={(e) => setNumbers({...numbers, shang: e.target.value})}
                  className="px-4 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 placeholder-ink-500 focus:outline-none focus:border-gold-500 text-center"
                />
                <input
                  type="number"
                  placeholder="下卦数"
                  value={numbers.xia}
                  onChange={(e) => setNumbers({...numbers, xia: e.target.value})}
                  className="px-4 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 placeholder-ink-500 focus:outline-none focus:border-gold-500 text-center"
                />
                <input
                  type="number"
                  placeholder="动爻数"
                  value={numbers.dong}
                  onChange={(e) => setNumbers({...numbers, dong: e.target.value})}
                  className="px-4 py-3 bg-ink-900 border border-ink-600 rounded-xl text-ink-50 placeholder-ink-500 focus:outline-none focus:border-gold-500 text-center"
                />
              </div>
            </div>
          )}

          {/* 时间起卦 */}
          {method === "time" && (
            <div className="text-center py-4 text-ink-400 text-sm">
              将使用当前时间自动起卦
            </div>
          )}

          {/* 起卦按钮 */}
          <button
            onClick={startDivination}
            className="w-full py-4 bg-gradient-to-r from-gold-500 to-amber-500 text-ink-950 rounded-xl font-bold text-lg shadow-lg hover:from-gold-400 hover:to-amber-400 transition-all active:scale-[0.98] mt-4"
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
                六爻纳甲源于京房易，以八卦纳甲、六亲、六兽、世应为核心，为卜筮正宗之法
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const getWuxingBg = (wuxing: string) => {
    const colors: Record<string, string> = {
      "木": "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30",
      "火": "bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30",
      "土": "bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30",
      "金": "bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-500/30",
      "水": "bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30"
    }
    return colors[wuxing] || colors["土"]
  }

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      "木": "text-emerald-400",
      "火": "text-red-400",
      "土": "text-amber-400",
      "金": "text-gray-300",
      "水": "text-blue-400"
    }
    return colors[wuxing] || colors["土"]
  }

  const renderResult = () => {
    if (!guaResult) return null

    return (
      <div className="min-h-screen bg-gradient-to-b from-ink-900 to-ink-800">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-ink-900/90 backdrop-blur border-b border-ink-700">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button onClick={() => setActiveTab("input")} className="p-2 -ml-2">
                <ArrowLeft className="w-6 h-6 text-ink-300" />
              </button>
              <h1 className="text-lg font-bold text-ink-50">六爻纳甲 · {guaResult.guaName}</h1>
              <div className="w-10" />
            </div>
          </div>

          {/* 标签页 */}
          <div className="flex border-b border-ink-700 px-4">
            {[
              { id: "basic", label: "卦象" },
              { id: "detail", label: "详解" },
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
          {/* 基本卦象 */}
          {resultTab === "basic" && (
            <>
              {/* 本卦变卦 */}
              <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-ink-400 mb-3">本卦</div>
                    <div className="text-3xl font-bold text-gold-400 mb-2">{guaResult.guaName}</div>
                    <div className="text-sm text-ink-300 mb-2">{guaResult.guaCi}</div>
                    {/* 画卦 */}
                    <div className="flex flex-col-reverse gap-1 mt-4">
                      {guaResult.yaoList.map((yao: any, index: number) => (
                        <div key={index} className="flex items-center justify-center gap-2">
                          <span className={`text-2xl font-bold ${getYaoColor(throws[index])}`}>
                            {getYaoSymbol(throws[index])}
                          </span>
                          {yao.shiYing && (
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              yao.shiYing === "世" ? "bg-vermilion-500/20 text-vermilion-400" : "bg-blue-500/20 text-blue-400"
                            }`}>
                              {yao.shiYing}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {guaResult.bianGua && (
                    <div className="text-center border-l border-ink-700 pl-4">
                      <div className="text-sm text-ink-400 mb-3">变卦</div>
                      <div className="text-2xl font-bold text-gold-400">{guaResult.bianGua}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* 基本信息 */}
              <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-400">卦宫</span>
                    <span className="text-gold-400 font-medium">{guaResult.guaGong}宫</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-400">五行</span>
                    <span className={`font-medium ${getWuxingColor(GUA_GONG_WUXING[guaResult.guaGong])}`}>
                      {GUA_GONG_WUXING[guaResult.guaGong]}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 纳甲详解 */}
          {resultTab === "detail" && (
            <div className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-ink-50 mb-4 text-center">纳甲详解</h3>
              <div className="space-y-3">
                {guaResult.yaoList.slice().reverse().map((yao: any, index: number) => {
                  const actualIndex = 5 - index
                  const actualYao = guaResult.yaoList[actualIndex]
                  return (
                    <div key={actualIndex} className={`p-4 rounded-xl ${getWuxingBg(actualYao.wuxing)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-ink-500 w-12">
                            {actualIndex === 0 ? "初爻" : actualIndex === 5 ? "上爻" : `${actualIndex + 1}爻`}
                          </span>
                          <span className={`text-2xl font-bold ${getYaoColor(throws[actualIndex])}`}>
                            {getYaoSymbol(throws[actualIndex])}
                          </span>
                        </div>
                        {actualYao.shiYing && (
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            actualYao.shiYing === "世" ? "bg-vermilion-500/20 text-vermilion-400" : "bg-blue-500/20 text-blue-400"
                          }`}>
                            {actualYao.shiYing}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <span className="text-ink-400 text-xs">六兽</span>
                          <div className="font-medium text-ink-200">{actualYao.liuShou}</div>
                        </div>
                        <div className="text-center">
                          <span className="text-ink-400 text-xs">纳甲</span>
                          <div className="font-medium text-ink-200">{actualYao.ganZhi}</div>
                        </div>
                        <div className="text-center">
                          <span className="text-ink-400 text-xs">六亲</span>
                          <div className={`font-medium ${getWuxingColor(actualYao.wuxing)}`}>{actualYao.liuQin}</div>
                        </div>
                      </div>
                      {isYaoMoving(throws[actualIndex]) && (
                        <div className="mt-2 text-xs text-vermilion-400 text-center">
                          动爻主变，为事之机
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 古籍参考 */}
          {resultTab === "guji" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gold-500/10 to-amber-500/10 border border-gold-500/30 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-gold-400 mb-3">增删卜易</h3>
                <div className="text-sm text-ink-200 leading-relaxed mb-3">
                  "卜筮之道，先明五行生克之理，次看六亲之用。世为己身，应为他人。
                  动为始，变为终。吉则动而弥吉，凶则动而弥凶。"
                </div>
                <div className="text-ink-400 text-xs">—— 野鹤老人《增删卜易》</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-blue-400 mb-3">卜筮正宗</h3>
                <div className="text-sm text-ink-200 leading-relaxed mb-3">
                  "八卦分宫，各有五行。纳甲之法，天地定位。六亲者，父母兄弟妻财官鬼子孙也。
                  世爻为体，应爻为用。动则有变，变则有占。"
                </div>
                <div className="text-ink-400 text-xs">—— 王洪绪《卜筮正宗》</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-purple-400 mb-3">火珠林</h3>
                <div className="text-sm text-ink-200 leading-relaxed mb-3">
                  "以钱代蓍，三变成爻。六爻既定，六亲可推。六兽者，青龙朱雀勾陈螣蛇白虎玄武也。
                  吉凶悔吝，生乎动者也。"
                </div>
                <div className="text-ink-400 text-xs">—— 《火珠林》</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return activeTab === "input" ? renderInputForm() : renderResult()
}
