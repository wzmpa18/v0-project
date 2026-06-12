"use client"

import { useState } from "react"
import { Filter, Info, Sparkles, Droplets, Hash } from "lucide-react"

// 汉字五行属性数据库
const WUXING_HANZI: Record<string, { hanzi: string; wuxing: string; bihua: number; jixiong: string; shiyi: string }[]> = {
  "金": [
    { hanzi: "金", wuxing: "金", bihua: 8, jixiong: "吉", shiyi: "黄金、贵重" },
    { hanzi: "鑫", wuxing: "金", bihua: 24, jixiong: "大吉", shiyi: "财富兴盛" },
    { hanzi: "铭", wuxing: "金", bihua: 14, jixiong: "凶", shiyi: "铭记、刻骨铭心" },
    { hanzi: "锐", wuxing: "金", bihua: 15, jixiong: "大吉", shiyi: "锐利、敏锐" },
    { hanzi: "钧", wuxing: "金", bihua: 9, jixiong: "凶", shiyi: "千钧之力" },
    { hanzi: "锦", wuxing: "金", bihua: 16, jixiong: "大吉", shiyi: "锦绣、美好" },
    { hanzi: "钟", wuxing: "金", bihua: 9, jixiong: "凶", shiyi: "钟爱、汇聚" },
    { hanzi: "钰", wuxing: "金", bihua: 13, jixiong: "大吉", shiyi: "珍宝、美玉" },
    { hanzi: "锋", wuxing: "金", bihua: 15, jixiong: "大吉", shiyi: "锋利、先锋" },
    { hanzi: "银", wuxing: "金", bihua: 14, jixiong: "凶", shiyi: "白银、宝贵" },
    { hanzi: "钢", wuxing: "金", bihua: 9, jixiong: "凶", shiyi: "刚强、坚硬" },
    { hanzi: "铠", wuxing: "金", bihua: 18, jixiong: "半吉", shiyi: "铠甲、保护" },
    { hanzi: "铮", wuxing: "金", bihua: 16, jixiong: "大吉", shiyi: "铮铮铁骨" },
    { hanzi: "锟", wuxing: "金", bihua: 16, jixiong: "大吉", shiyi: "宝剑名" },
    { hanzi: "锡", wuxing: "金", bihua: 16, jixiong: "大吉", shiyi: "赐予、锡命" },
    { hanzi: "铿", wuxing: "金", bihua: 18, jixiong: "半吉", shiyi: "铿锵有力" },
    { hanzi: "铄", wuxing: "金", bihua: 23, jixiong: "大吉", shiyi: "铄金、熔化" },
    { hanzi: "镕", wuxing: "金", bihua: 18, jixiong: "半吉", shiyi: "熔铸、铸造" },
  ],
  "木": [
    { hanzi: "林", wuxing: "木", bihua: 8, jixiong: "吉", shiyi: "树林、茂盛" },
    { hanzi: "森", wuxing: "木", bihua: 12, jixiong: "凶", shiyi: "森林、繁密" },
    { hanzi: "松", wuxing: "木", bihua: 8, jixiong: "吉", shiyi: "松树、长青" },
    { hanzi: "柏", wuxing: "木", bihua: 9, jixiong: "凶", shiyi: "柏树、坚贞" },
    { hanzi: "桐", wuxing: "木", bihua: 10, jixiong: "凶", shiyi: "梧桐、高贵" },
    { hanzi: "楠", wuxing: "木", bihua: 13, jixiong: "大吉", shiyi: "楠木、珍贵" },
    { hanzi: "楷", wuxing: "木", bihua: 13, jixiong: "大吉", shiyi: "楷模、榜样" },
    { hanzi: "栋", wuxing: "木", bihua: 12, jixiong: "凶", shiyi: "栋梁、支柱" },
    { hanzi: "材", wuxing: "木", bihua: 7, jixiong: "吉", shiyi: "材料、人才" },
    { hanzi: "杰", wuxing: "木", bihua: 8, jixiong: "吉", shiyi: "杰出、优秀" },
    { hanzi: "荣", wuxing: "木", bihua: 14, jixiong: "凶", shiyi: "繁荣、荣耀" },
    { hanzi: "枫", wuxing: "木", bihua: 13, jixiong: "大吉", shiyi: "枫树、红叶" },
    { hanzi: "桦", wuxing: "木", bihua: 10, jixiong: "凶", shiyi: "桦树、洁白" },
    { hanzi: "槐", wuxing: "木", bihua: 14, jixiong: "凶", shiyi: "槐树、文昌" },
    { hanzi: "梅", wuxing: "木", bihua: 11, jixiong: "大吉", shiyi: "梅花、高洁" },
  ],
  "水": [
    { hanzi: "海", wuxing: "水", bihua: 10, jixiong: "凶", shiyi: "大海、广阔" },
    { hanzi: "洋", wuxing: "水", bihua: 9, jixiong: "凶", shiyi: "海洋、宽广" },
    { hanzi: "涛", wuxing: "水", bihua: 18, jixiong: "半吉", shiyi: "波涛、气势" },
    { hanzi: "浩", wuxing: "水", bihua: 11, jixiong: "大吉", shiyi: "浩大、正气" },
    { hanzi: "涵", wuxing: "水", bihua: 12, jixiong: "凶", shiyi: "涵养、包容" },
    { hanzi: "淳", wuxing: "水", bihua: 12, jixiong: "凶", shiyi: "淳朴、纯真" },
    { hanzi: "源", wuxing: "水", bihua: 14, jixiong: "凶", shiyi: "源头、根源" },
    { hanzi: "润", wuxing: "水", bihua: 16, jixiong: "大吉", shiyi: "滋润、润泽" },
    { hanzi: "泽", wuxing: "水", bihua: 17, jixiong: "大吉", shiyi: "恩泽、光泽" },
    { hanzi: "泓", wuxing: "水", bihua: 8, jixiong: "吉", shiyi: "泓水、深广" },
    { hanzi: "清", wuxing: "水", bihua: 11, jixiong: "大吉", shiyi: "清澈、清白" },
    { hanzi: "洁", wuxing: "水", bihua: 16, jixiong: "大吉", shiyi: "清洁、高洁" },
    { hanzi: "沐", wuxing: "水", bihua: 8, jixiong: "吉", shiyi: "沐浴、润泽" },
    { hanzi: "沛", wuxing: "水", bihua: 8, jixiong: "吉", shiyi: "充沛、旺盛" },
    { hanzi: "泓", wuxing: "水", bihua: 8, jixiong: "吉", shiyi: "水深而广" },
  ],
  "火": [
    { hanzi: "炎", wuxing: "火", bihua: 8, jixiong: "吉", shiyi: "火焰、炎热" },
    { hanzi: "焱", wuxing: "火", bihua: 12, jixiong: "凶", shiyi: "火焰、光明" },
    { hanzi: "烨", wuxing: "火", bihua: 10, jixiong: "凶", shiyi: "光辉、灿烂" },
    { hanzi: "煜", wuxing: "火", bihua: 13, jixiong: "大吉", shiyi: "照耀、光明" },
    { hanzi: "炜", wuxing: "火", bihua: 8, jixiong: "吉", shiyi: "光明、辉煌" },
    { hanzi: "煌", wuxing: "火", bihua: 13, jixiong: "大吉", shiyi: "辉煌、盛大" },
    { hanzi: "焕", wuxing: "火", bihua: 11, jixiong: "大吉", shiyi: "焕发、光彩" },
    { hanzi: "辉", wuxing: "火", bihua: 15, jixiong: "大吉", shiyi: "光辉、荣耀" },
    { hanzi: "耀", wuxing: "火", bihua: 20, jixiong: "凶", shiyi: "照耀、显耀" },
    { hanzi: "灿", wuxing: "火", bihua: 7, jixiong: "吉", shiyi: "灿烂、明亮" },
    { hanzi: "灵", wuxing: "火", bihua: 24, jixiong: "大吉", shiyi: "灵气、聪明" },
    { hanzi: "炫", wuxing: "火", bihua: 9, jixiong: "凶", shiyi: "炫耀、炫目" },
    { hanzi: "炬", wuxing: "火", bihua: 9, jixiong: "凶", shiyi: "火炬、光明" },
    { hanzi: "炯", wuxing: "火", bihua: 9, jixiong: "凶", shiyi: "炯炯有神" },
    { hanzi: "炫", wuxing: "火", bihua: 9, jixiong: "凶", shiyi: "光彩炫目" },
  ],
  "土": [
    { hanzi: "坤", wuxing: "土", bihua: 8, jixiong: "吉", shiyi: "大地、坤德" },
    { hanzi: "垚", wuxing: "土", bihua: 9, jixiong: "凶", shiyi: "土山、高耸" },
    { hanzi: "坚", wuxing: "土", bihua: 11, jixiong: "大吉", shiyi: "坚定、坚强" },
    { hanzi: "堂", wuxing: "土", bihua: 11, jixiong: "大吉", shiyi: "殿堂、正大" },
    { hanzi: "培", wuxing: "土", bihua: 11, jixiong: "大吉", shiyi: "培养、培育" },
    { hanzi: "基", wuxing: "土", bihua: 11, jixiong: "大吉", shiyi: "基础、根基" },
    { hanzi: "域", wuxing: "土", bihua: 11, jixiong: "大吉", shiyi: "地域、领域" },
    { hanzi: "圣", wuxing: "土", bihua: 13, jixiong: "大吉", shiyi: "圣明、神圣" },
    { hanzi: "城", wuxing: "土", bihua: 10, jixiong: "凶", shiyi: "城池、坚固" },
    { hanzi: "坦", wuxing: "土", bihua: 8, jixiong: "吉", shiyi: "平坦、坦荡" },
    { hanzi: "均", wuxing: "土", bihua: 7, jixiong: "吉", shiyi: "平均、公平" },
    { hanzi: "佳", wuxing: "土", bihua: 8, jixiong: "吉", shiyi: "美好、佳人" },
    { hanzi: "坤", wuxing: "土", bihua: 8, jixiong: "吉", shiyi: "坤德、厚德载物" },
    { hanzi: "垚", wuxing: "土", bihua: 9, jixiong: "凶", shiyi: "山高、稳重" },
    { hanzi: "圣", wuxing: "土", bihua: 13, jixiong: "大吉", shiyi: "神圣、圣明" },
  ],
}

const BIHUA_JIXIONG: Record<number, string> = {
  1: "大吉 (天地开泰)", 2: "凶 (分离破败)", 3: "大吉 (进取如意)", 4: "凶 (破坏衰退)",
  5: "大吉 (福寿双全)", 6: "吉 (安稳余庆)", 7: "吉 (精悍刚毅)", 8: "半吉 (勤勉发展)",
  9: "凶 (利去功空)", 10: "凶 (万事终局)", 11: "大吉 (挽回家运)", 12: "凶 (意志薄弱)",
  13: "大吉 (智略超群)", 14: "凶 (沦落天涯)", 15: "大吉 (福寿双全)", 16: "大吉 (贵人得助)",
  17: "大吉 (突破万难)", 18: "半吉 (有志竟成)", 19: "凶 (风云蔽月)", 20: "凶 (非业破运)",
  21: "大吉 (明月中天)", 22: "凶 (秋草逢霜)", 23: "大吉 (旭日东升)", 24: "大吉 (家门余庆)",
  25: "半吉 (资性英敏)", 26: "凶 (变怪奇异)", 27: "凶 (欲望无止)", 28: "凶 (祸乱别离)",
  29: "大吉 (智谋优秀)", 30: "凶 (绝境逢生)", 31: "大吉 (智勇得志)", 32: "大吉 (侥幸多望)",
  33: "大吉 (旭日东升)", 34: "凶 (破家亡身)", 35: "大吉 (温和平安)", 36: "凶 (波澜重叠)",
  37: "大吉 (权威显达)", 38: "凶 (意志薄弱)", 39: "大吉 (富贵荣华)", 40: "凶 (智谋胆力)",
}

const WUXING_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  "金": { text: "text-yellow-400", bg: "bg-yellow-900/20", border: "border-yellow-700/30" },
  "木": { text: "text-green-400", bg: "bg-green-900/20", border: "border-green-700/30" },
  "水": { text: "text-blue-400", bg: "bg-blue-900/20", border: "border-blue-700/30" },
  "火": { text: "text-red-400", bg: "bg-red-900/20", border: "border-red-700/30" },
  "土": { text: "text-amber-400", bg: "bg-amber-900/20", border: "border-amber-700/30" },
}

export default function HanZiPage() {
  const [selectedWuxing, setSelectedWuxing] = useState<string>("")
  const [bihuaRange, setBihuaRange] = useState<[number, number]>([1, 50])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHanzi, setSelectedHanzi] = useState<any>(null)

  const allHanzi = Object.values(WUXING_HANZI).flat()
  
  const filtered = allHanzi.filter(h => {
    if (selectedWuxing && h.wuxing !== selectedWuxing) return false
    if (h.bihua < bihuaRange[0] || h.bihua > bihuaRange[1]) return false
    if (searchQuery && !h.hanzi.includes(searchQuery) && !h.shiyi.includes(searchQuery)) return false
    return true
  })

  // 去重
  const uniqueHanzi = filtered.filter((h, i, arr) => arr.findIndex(x => x.hanzi === h.hanzi) === i)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-emerald-400">汉字筛选</h1>
            <p className="text-xs text-emerald-200/60">起名用字 · 五行筛选 · 笔画吉凶</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 rounded-xl p-4 border border-emerald-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-emerald-200/80 mb-2 block">五行筛选</label>
              <div className="flex gap-2">
                {["金", "木", "水", "火", "土"].map((wx) => (
                  <button
                    key={wx}
                    onClick={() => setSelectedWuxing(selectedWuxing === wx ? "" : wx)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedWuxing === wx
                        ? `${WUXING_COLORS[wx].bg} ${WUXING_COLORS[wx].border} border ${WUXING_COLORS[wx].text}`
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {wx}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-emerald-200/80 mb-2 block">
                笔画范围：{bihuaRange[0]} - {bihuaRange[1]}画
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={bihuaRange[0]}
                  onChange={(e) => setBihuaRange([parseInt(e.target.value), bihuaRange[1]])}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400">至</span>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={bihuaRange[1]}
                  onChange={(e) => setBihuaRange([bihuaRange[0], parseInt(e.target.value)])}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-emerald-200/80 mb-2 block">搜索汉字</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="输入汉字或含义..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-emerald-400 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              筛选结果 ({uniqueHanzi.length}字)
            </h3>
          </div>
          {uniqueHanzi.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>没有匹配的汉字，请调整筛选条件</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {uniqueHanzi.map((h, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHanzi(h)}
                  className={`p-2 rounded-lg text-center transition-all ${
                    selectedHanzi?.hanzi === h.hanzi
                      ? `${WUXING_COLORS[h.wuxing].bg} ${WUXING_COLORS[h.wuxing].border} border`
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="text-2xl font-bold text-white">{h.hanzi}</div>
                  <div className="text-xs text-gray-400">{h.bihua}画</div>
                  <div className={`text-xs ${WUXING_COLORS[h.wuxing].text}`}>{h.wuxing}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedHanzi && (
          <div className={`bg-gradient-to-br ${WUXING_COLORS[selectedHanzi.wuxing].bg} rounded-xl p-5 ${WUXING_COLORS[selectedHanzi.wuxing].border} border`}>
            <div className="text-center mb-4">
              <div className="text-6xl font-bold text-white mb-2">{selectedHanzi.hanzi}</div>
              <div className="flex items-center justify-center gap-3">
                <span className={`text-sm font-medium ${WUXING_COLORS[selectedHanzi.wuxing].text}`}>
                  五行：{selectedHanzi.wuxing}
                </span>
                <span className="text-sm text-gray-400">笔画：{selectedHanzi.bihua}画</span>
                <span className={`text-sm font-medium ${
                  selectedHanzi.jixiong.includes("大吉") ? "text-green-400" :
                  selectedHanzi.jixiong.includes("吉") && !selectedHanzi.jixiong.includes("凶") ? "text-green-300" :
                  selectedHanzi.jixiong.includes("半吉") ? "text-amber-400" : "text-red-400"
                }`}>
                  {selectedHanzi.jixiong}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">字义</div>
                <div className="text-sm text-white">{selectedHanzi.shiyi}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">笔画数理</div>
                <div className="text-sm text-white">{BIHUA_JIXIONG[selectedHanzi.bihua] || "参考其他数理"}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">使用说明</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            汉字筛选工具用于起名时根据五行属性和笔画数筛选合适的汉字。五行属性判断依据
            《康熙字典》部首分类法，笔画数依据《康熙字典》笔画标准。笔画数理吉凶参考
            《五格剖象法》原理，1-81数各有吉凶含义。建议起名时五行搭配均衡，笔画数
            选择大吉或吉数，避免使用凶数文字。
          </p>
        </div>
      </main>
    </div>
  )
}