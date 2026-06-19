// 大六壬排盘页面
"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, Copy, Check, Info } from "lucide-react"
import { 
  calcLuRenPan, TIAN_JIANG, DI_ZHI_12, DI_ZHI_WUXING,
  SHEN_SHA_LUREN, ZHAN_YAN, JING_DIAN, KE_TI, getTianJiangDuanYu
} from "@/lib/luren-data"

interface LuRenPageProps {
  onBack: () => void
}

// 五行颜色映射
const WUXING_COLOR: Record<string, string> = {
  木: "text-green-500",
  火: "text-red-500",
  土: "text-yellow-600",
  金: "text-gray-300",
  水: "text-blue-500",
}

export function LuRenPage({ onBack }: LuRenPageProps) {
  const [activeTab, setActiveTab] = useState<"panmian" | "fuzhu" | "shensha" | "pingzhu" | "dangan">("panmian")
  const [selectedGong, setSelectedGong] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  
  // 当前时间起课
  const now = new Date()
  const panData = useMemo(() => 
    calcLuRenPan(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours()),
    []
  )
  
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  // 获取地支五行颜色
  const getZhiColor = (zhi: string) => WUXING_COLOR[DI_ZHI_WUXING[zhi]] || "text-[#f5f5f7]"
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#1a1a1a] flex flex-col">
      {/* 顶部标题栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#333]">
        <button onClick={onBack} className="flex items-center gap-1 text-[#d4af37]">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <h1 className="text-[#f5f5f7] font-medium">大六壬排盘</h1>
        <div className="w-16" />
      </div>
      
      {/* 基础信息卡片 */}
      <div className="mx-4 mt-4 p-3 bg-[#1f1f1f] rounded-xl border border-[#333]">
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <div className="text-[#888]">日空</div>
            <div className="text-[#d4af37] font-medium">{panData.kongWang.join(" ")}</div>
          </div>
          <div className="text-center">
            <div className="text-[#888]">旬首</div>
            <div className="text-[#f5f5f7]">{panData.xunShou}</div>
          </div>
          <div className="text-center">
            <div className="text-[#888]">旬尾</div>
            <div className="text-[#f5f5f7]">{panData.xunWei}</div>
          </div>
          <div className="text-center">
            <div className="text-[#888]">太岁</div>
            <div className={getZhiColor(panData.taiSui)}>{panData.taiSui}</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs mt-2 pt-2 border-t border-[#333]">
          <div className="text-center">
            <div className="text-[#888]">日禄</div>
            <div className={getZhiColor(panData.riLu)}>{panData.riLu}</div>
          </div>
          <div className="text-center">
            <div className="text-[#888]">日马</div>
            <div className={getZhiColor(panData.riMa)}>{panData.riMa}</div>
          </div>
          <div className="text-center">
            <div className="text-[#888]">桃花</div>
            <div className={getZhiColor(panData.taoHua)}>{panData.taoHua}</div>
          </div>
          <div className="text-center">
            <div className="text-[#888]">月将</div>
            <div className={getZhiColor(panData.yueJiang)}>{panData.yueJiang}</div>
          </div>
        </div>
      </div>
      
      {/* 主内容区域 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === "panmian" && (
          <div className="p-4 space-y-4">
            {/* 三传 */}
            <div className="bg-[#1f1f1f] rounded-xl border border-[#333] p-3">
              <div className="text-xs text-[#888] mb-2">三传</div>
              <div className="flex justify-around">
                {[
                  { name: "初传", data: panData.sanChuan.chu },
                  { name: "中传", data: panData.sanChuan.zhong },
                  { name: "末传", data: panData.sanChuan.mo },
                ].map((chuan) => (
                  <div key={chuan.name} className="text-center">
                    <div className="text-xs text-[#666] mb-1">{chuan.name}</div>
                    <div className={`text-xl font-bold ${getZhiColor(chuan.data.zhi)}`}>
                      {chuan.data.zhi}
                    </div>
                    <div className="text-xs text-[#d4af37] mt-1">{chuan.data.jiang}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 四课 */}
            <div className="bg-[#1f1f1f] rounded-xl border border-[#333] p-3">
              <div className="text-xs text-[#888] mb-2">四课</div>
              <div className="flex justify-around">
                {panData.siKe.map((ke, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xs text-[#666] mb-1">{ke.name}</div>
                    <div className={`text-lg font-medium ${getZhiColor(ke.shang)}`}>{ke.shang}</div>
                    <div className="w-6 h-px bg-[#444] mx-auto my-1" />
                    <div className={`text-lg font-medium ${getZhiColor(ke.xia)}`}>{ke.xia}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 课体 */}
            <div className="bg-gradient-to-r from-[#c8102e]/20 to-[#d4af37]/20 rounded-xl border border-[#c8102e]/30 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#c8102e] font-bold text-lg">{panData.keTi.name}</div>
                  <div className="text-xs text-[#888] mt-1">{panData.keTi.desc}</div>
                </div>
                <div className="text-xs text-[#d4af37] max-w-[120px] text-right">{panData.keTi.hint}</div>
              </div>
            </div>
            
            {/* 天地盘 */}
            <div className="bg-[#1f1f1f] rounded-xl border border-[#333] p-3">
              <div className="text-xs text-[#888] mb-3">天地盘</div>
              <div className="grid grid-cols-4 gap-1">
                {/* 第一行：巳午未申 */}
                {[3, 4, 5, 6].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGong(DI_ZHI_12[i])}
                    className="bg-[#252525] rounded p-2 text-center hover:bg-[#333] transition-colors"
                  >
                    <div className="text-xs text-[#d4af37]">{TIAN_JIANG[i].name}</div>
                    <div className={`text-sm font-medium ${getZhiColor(panData.tianPan[i])}`}>
                      {panData.tianPan[i]}
                    </div>
                    <div className={`text-xs ${getZhiColor(DI_ZHI_12[i])}`}>{DI_ZHI_12[i]}</div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-1 mt-1">
                {/* 第二行：辰 中宫 中宫 酉 */}
                <button
                  onClick={() => setSelectedGong("辰")}
                  className="bg-[#252525] rounded p-2 text-center hover:bg-[#333]"
                >
                  <div className="text-xs text-[#d4af37]">{TIAN_JIANG[2].name}</div>
                  <div className={`text-sm font-medium ${getZhiColor(panData.tianPan[2])}`}>
                    {panData.tianPan[2]}
                  </div>
                  <div className={`text-xs ${getZhiColor("辰")}`}>辰</div>
                </button>
                <div className="col-span-2 bg-[#1a1a1a] rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-[#888]">日干</div>
                    <div className="text-xl font-bold text-[#d4af37]">{panData.dayGan}</div>
                    <div className="text-xs text-[#888]">{panData.dayZhi}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGong("酉")}
                  className="bg-[#252525] rounded p-2 text-center hover:bg-[#333]"
                >
                  <div className="text-xs text-[#d4af37]">{TIAN_JIANG[7].name}</div>
                  <div className={`text-sm font-medium ${getZhiColor(panData.tianPan[7])}`}>
                    {panData.tianPan[7]}
                  </div>
                  <div className={`text-xs ${getZhiColor("酉")}`}>酉</div>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1 mt-1">
                {/* 第三行：卯 中宫 中宫 戌 */}
                <button
                  onClick={() => setSelectedGong("卯")}
                  className="bg-[#252525] rounded p-2 text-center hover:bg-[#333]"
                >
                  <div className="text-xs text-[#d4af37]">{TIAN_JIANG[1].name}</div>
                  <div className={`text-sm font-medium ${getZhiColor(panData.tianPan[1])}`}>
                    {panData.tianPan[1]}
                  </div>
                  <div className={`text-xs ${getZhiColor("卯")}`}>卯</div>
                </button>
                <div className="col-span-2" />
                <button
                  onClick={() => setSelectedGong("戌")}
                  className="bg-[#252525] rounded p-2 text-center hover:bg-[#333]"
                >
                  <div className="text-xs text-[#d4af37]">{TIAN_JIANG[8].name}</div>
                  <div className={`text-sm font-medium ${getZhiColor(panData.tianPan[8])}`}>
                    {panData.tianPan[8]}
                  </div>
                  <div className={`text-xs ${getZhiColor("戌")}`}>戌</div>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1 mt-1">
                {/* 第四行：寅丑子亥 */}
                {[0, 11, 10, 9].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGong(DI_ZHI_12[i])}
                    className="bg-[#252525] rounded p-2 text-center hover:bg-[#333] transition-colors"
                  >
                    <div className="text-xs text-[#d4af37]">{TIAN_JIANG[i].name}</div>
                    <div className={`text-sm font-medium ${getZhiColor(panData.tianPan[i])}`}>
                      {panData.tianPan[i]}
                    </div>
                    <div className={`text-xs ${getZhiColor(DI_ZHI_12[i])}`}>{DI_ZHI_12[i]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "fuzhu" && (
          <div className="p-4 space-y-4">
            {/* 占验条目 */}
            {Object.entries(ZHAN_YAN).map(([category, items]) => (
              <div key={category} className="bg-[#1f1f1f] rounded-xl border border-[#333] p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-[#d4af37]">{category}</div>
                  <button
                    onClick={() => copyText(items.join("\n"))}
                    className="text-xs text-[#888] flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    复制
                  </button>
                </div>
                <div className="space-y-2">
                  {items.slice(0, 4).map((item, i) => (
                    <div key={i} className="text-xs text-[#ccc] leading-relaxed pl-2 border-l-2 border-[#333]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "shensha" && (
          <div className="p-4 space-y-4">
            {/* 岁煞 */}
            <div className="bg-[#1f1f1f] rounded-xl border border-[#333] p-3">
              <div className="text-sm text-[#d4af37] mb-3">岁煞</div>
              <div className="space-y-2">
                {SHEN_SHA_LUREN.岁煞.map((sha, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-[#f5f5f7]">{sha.name}</span>
                    <span className={getZhiColor(sha.zhi)}>{sha.zhi}</span>
                    <span className="text-[#888] flex-1 ml-4 text-right">{sha.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 干煞 */}
            <div className="bg-[#1f1f1f] rounded-xl border border-[#333] p-3">
              <div className="text-sm text-[#d4af37] mb-3">干煞</div>
              <div className="space-y-2">
                {SHEN_SHA_LUREN.干煞.map((sha, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-[#f5f5f7]">{sha.name}</span>
                    <span className={getZhiColor(sha.zhi)}>{sha.zhi}</span>
                    <span className="text-[#888] flex-1 ml-4 text-right">{sha.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "pingzhu" && (
          <div className="p-4 space-y-4">
            {Object.entries(JING_DIAN).map(([book, items]) => (
              <div key={book} className="bg-[#1f1f1f] rounded-xl border border-[#333] p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-[#d4af37]">《{book}》</div>
                  <button
                    onClick={() => copyText(items.join("\n"))}
                    className="text-xs text-[#888] flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    复制
                  </button>
                </div>
                <div className="space-y-2">
                  {items.map((item, i) => (
                    <div key={i} className="text-xs text-[#ccc] leading-relaxed pl-2 border-l-2 border-[#d4af37]/30">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "dangan" && (
          <div className="p-4">
            <div className="bg-[#1f1f1f] rounded-xl border border-[#333] p-4">
              <div className="text-sm text-[#888] text-center py-8">
                当前档案页用于整理排盘记录与参考断语，暂无新增内容。
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 底部子导航 */}
      <div className="fixed bottom-16 left-0 right-0 bg-[#1a1a1a] border-t border-[#333] px-4 py-2">
        <div className="flex justify-around">
          {[
            { id: "panmian", label: "盘面" },
            { id: "fuzhu", label: "辅助" },
            { id: "shensha", label: "神煞" },
            { id: "pingzhu", label: "评注" },
            { id: "dangan", label: "档案" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-[#d4af37]/20 text-[#d4af37]"
                  : "text-[#888] hover:text-[#ccc]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* 宫位详情弹窗 */}
      {selectedGong && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-end"
          onClick={() => setSelectedGong(null)}
        >
          <div 
            className="w-full bg-[#1f1f1f] rounded-t-2xl p-4 pb-8 max-h-[60vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-[#444] rounded-full mx-auto mb-4" />
            <div className="text-center mb-4">
              <div className={`text-3xl font-bold ${getZhiColor(selectedGong)}`}>{selectedGong}宫</div>
              <div className="text-sm text-[#888] mt-1">
                天盘：{panData.tianPan[DI_ZHI_12.indexOf(selectedGong)]} / 
                地盘：{selectedGong}
              </div>
            </div>
            <div className="bg-[#252525] rounded-xl p-3 mb-3">
              <div className="text-xs text-[#888] mb-2">天将</div>
              <div className="text-[#d4af37] font-bold">
                {TIAN_JIANG[DI_ZHI_12.indexOf(selectedGong)].name}
              </div>
              <div className="text-xs text-[#888] mt-2">
                五行属{TIAN_JIANG[DI_ZHI_12.indexOf(selectedGong)].wuxing}，
                {TIAN_JIANG[DI_ZHI_12.indexOf(selectedGong)].attr === "吉" ? "主吉" : "主凶"}
              </div>
            </div>
            
            {/* 古籍断语 */}
            <div className="bg-[#252525] rounded-xl p-3 mb-3">
              <div className="text-xs text-[#d4af37] mb-2">古籍断语</div>
              {(() => {
                const jiangName = TIAN_JIANG[DI_ZHI_12.indexOf(selectedGong)].name
                const duanyu = getTianJiangDuanYu(jiangName)
                return (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">【原文】{duanyu.原文}</div>
                    <div className="text-xs text-gray-400">【译文】{duanyu.译文}</div>
                    <div className="text-xs text-gray-500 mt-2">——{duanyu.出处}</div>
                  </div>
                )
              })()}
            </div>
            <button
              onClick={() => setSelectedGong(null)}
              className="w-full py-3 bg-[#333] rounded-xl text-[#f5f5f7] text-sm"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
