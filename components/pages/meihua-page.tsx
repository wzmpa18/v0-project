"use client"

import { useState } from "react"
import { ChevronLeft, Clock, Hash, Shuffle } from "lucide-react"
import { 
  BA_GUA, GUA_64_MEIHUA, TI_YONG_SHENGKE, MEIHUA_DUANYU, 
  WAN_WU_LEI_XIANG, getGuaInfo, getTiYongGuanxi 
} from "@/lib/meihua-data"

interface MeiHuaPageProps {
  onBack: () => void
}

const GUA_NAMES = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"]

export function MeiHuaPage({ onBack }: MeiHuaPageProps) {
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

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <div className="bg-[#1a1a1a] text-white px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-medium">梅花易数</span>
        <div className="w-6" />
      </div>
      
      {/* 起卦方式选择 */}
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          {[
            { id: "time", label: "时间起卦", icon: Clock },
            { id: "number", label: "数字起卦", icon: Hash },
            { id: "manual", label: "随机起卦", icon: Shuffle },
          ].map((method) => (
            <button
              key={method.id}
              onClick={() => setQiGuaMethod(method.id as any)}
              className={`flex-1 py-3 rounded-lg flex flex-col items-center gap-1 ${
                qiGuaMethod === method.id
                  ? "bg-[#d4af37] text-white"
                  : "bg-gray-100 text-gray-800"
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
                className="flex-1 px-4 py-3 border rounded-lg text-gray-800 font-medium"
              />
              <input
                type="number"
                placeholder="下卦数"
                value={numbers.xia}
                onChange={(e) => setNumbers({ ...numbers, xia: e.target.value })}
                className="flex-1 px-4 py-3 border rounded-lg text-gray-800 font-medium"
              />
              <input
                type="number"
                placeholder="动爻数"
                value={numbers.dong}
                onChange={(e) => setNumbers({ ...numbers, dong: e.target.value })}
                className="flex-1 px-4 py-3 border rounded-lg text-gray-800 font-medium"
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
          className="w-full py-4 bg-[#c8102e] text-white rounded-xl font-medium text-lg"
        >
          开始起卦
        </button>
      </div>
      
      {/* 结果显示 */}
      {result && (
        <div className="border-t">
          {/* Tab切换 */}
          <div className="flex border-b bg-[#1a1a1a]">
            {[
              { id: "basic", label: "卦象信息" },
              { id: "tiyong", label: "体用分析" },
              { id: "guji", label: "古籍断语" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? "text-[#22c55e] border-b-2 border-[#22c55e]"
                    : "text-gray-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* 卦象信息 */}
          {activeTab === "basic" && (
            <div className="p-4 space-y-4">
              {/* 本卦变卦 */}
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-600 mb-2">本卦</div>
                  <div className="text-3xl font-bold text-[#d4af37] mb-2">
                    {result.shangGua}{result.xiaGua}
                  </div>
                  <div className="text-lg text-gray-800 font-medium">{result.guaInfo.name}</div>
                  <div className="text-sm text-[#c8102e] mt-2">动{result.dongYao}爻</div>
                </div>
                <div className="flex items-center text-gray-600">→</div>
                <div className="flex-1 bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-600 mb-2">变卦</div>
                  <div className="text-3xl font-bold text-[#d4af37] mb-2">
                    {result.bianShangGua}{result.bianXiaGua}
                  </div>
                  <div className="text-lg text-gray-800 font-medium">{result.bianGuaInfo.name}</div>
                </div>
              </div>
              
              {/* 卦辞象辞 */}
              <div className="bg-[#fffef0] border border-[#d4af37]/30 rounded-xl p-4">
                <div className="text-sm text-[#a16207] mb-2">卦辞</div>
                <div className="text-gray-800 font-medium">{result.guaInfo.guaCi}</div>
                <div className="text-sm text-[#a16207] mt-3 mb-2">象辞</div>
                <div className="text-gray-800 font-medium">{result.guaInfo.xiangCi}</div>
              </div>
              
              {/* 万物类象 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-[#a16207] mb-3 font-medium">万物类象 - {result.tiGua}卦（体）</div>
                {WAN_WU_LEI_XIANG[result.tiGua as keyof typeof WAN_WU_LEI_XIANG] && (
                  <div className="space-y-2 text-sm">
                    {Object.entries(WAN_WU_LEI_XIANG[result.tiGua as keyof typeof WAN_WU_LEI_XIANG]).map(([key, values]) => (
                      <div key={key} className="flex">
                        <span className="w-16 text-gray-600">{key}:</span>
                        <span className="text-gray-800 font-medium">{(values as string[]).join("、")}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* 体用分析 */}
          {activeTab === "tiyong" && (
            <div className="p-4 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">体卦</div>
                    <div className="text-2xl font-bold text-[#22c55e]">{result.tiGua}</div>
                    <div className="text-sm text-gray-700">五行：{result.tiWuxing}</div>
                  </div>
                  <div className="text-center px-4">
                    <div className={`text-lg font-bold ${
                      result.jixiong?.jixiong.includes("吉") ? "text-[#22c55e]" : "text-[#c8102e]"
                    }`}>
                      {result.guanxi}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{result.jixiong?.jixiong}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">用卦</div>
                    <div className="text-2xl font-bold text-[#c8102e]">{result.yongGua}</div>
                    <div className="text-sm text-gray-700">五行：{result.yongWuxing}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-800 bg-white p-3 rounded-lg">
                  {result.jixiong?.desc}
                </div>
              </div>
              
              {/* 体用口诀 */}
              <div className="bg-[#fffef0] border border-[#d4af37]/30 rounded-xl p-4">
                <div className="text-sm text-[#a16207] mb-2 font-medium">体用总诀</div>
                <div className="text-gray-800">{MEIHUA_DUANYU.体用诀.原文}</div>
                <div className="text-sm text-gray-600 mt-2">{MEIHUA_DUANYU.体用诀.译文}</div>
                <div className="text-xs text-gray-700 mt-2 text-right">——{MEIHUA_DUANYU.体用诀.出处}</div>
              </div>
            </div>
          )}
          
          {/* 古籍断语 */}
          {activeTab === "guji" && (
            <div className="p-4 space-y-4">
              {Object.entries(MEIHUA_DUANYU).map(([key, value]) => (
                <div key={key} className="bg-[#fffef0] border border-[#d4af37]/30 rounded-xl p-4">
                  <div className="text-sm text-[#a16207] mb-2 font-medium">{key}</div>
                  <div className="text-gray-800 font-medium">{value.原文}</div>
                  <div className="text-sm text-gray-700 mt-2">【译文】{value.译文}</div>
                  <div className="text-xs text-gray-600 mt-2 text-right">——{value.出处}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
