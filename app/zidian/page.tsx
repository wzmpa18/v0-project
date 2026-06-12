"use client"

import { useState } from "react"
import { BookOpen, Search, Info, Hash, Droplets, Star, Grid3X3 } from "lucide-react"

// 中华字典数据库
const ZI_DIAN_DATA: Record<string, {
  pinyin: string
  bihua: number
  buShou: string
  wuxing: string
  jiegou: string
  shiyi: string
  chuchu: string
}> = {
  "天": { pinyin: "tiān", bihua: 4, buShou: "大", wuxing: "金", jiegou: "上下结构", shiyi: "天空；至高无上；自然", chuchu: "《说文解字》：颠也。至高无上。" },
  "地": { pinyin: "dì", bihua: 6, buShou: "土", wuxing: "土", jiegou: "左右结构", shiyi: "大地；地方；地位", chuchu: "《说文解字》：元气初分，轻清阳为天，重浊阴为地。" },
  "人": { pinyin: "rén", bihua: 2, buShou: "人", wuxing: "金", jiegou: "独体结构", shiyi: "人类；别人；人品", chuchu: "《说文解字》：天地之性最贵者也。" },
  "山": { pinyin: "shān", bihua: 3, buShou: "山", wuxing: "土", jiegou: "独体结构", shiyi: "山脉；山峰；高山", chuchu: "《说文解字》：宣也。宣气散，生万物。" },
  "水": { pinyin: "shuǐ", bihua: 4, buShou: "水", wuxing: "水", jiegou: "独体结构", shiyi: "水流；液体；江河", chuchu: "《说文解字》：准也。北方之行，象众水并流。" },
  "火": { pinyin: "huǒ", bihua: 4, buShou: "火", wuxing: "火", jiegou: "独体结构", shiyi: "火焰；火灾；发怒", chuchu: "《说文解字》：毁也。南方之行，炎而上。" },
  "木": { pinyin: "mù", bihua: 4, buShou: "木", wuxing: "木", jiegou: "独体结构", shiyi: "树木；木材；质朴", chuchu: "《说文解字》：冒也。冒地而生。东方之行。" },
  "金": { pinyin: "jīn", bihua: 8, buShou: "金", wuxing: "金", jiegou: "上下结构", shiyi: "金属；黄金；贵重", chuchu: "《说文解字》：五色金也。黄为之长。" },
  "龙": { pinyin: "lóng", bihua: 5, buShou: "龙", wuxing: "火", jiegou: "独体结构", shiyi: "神兽；帝王；吉祥之兆", chuchu: "《说文解字》：鳞虫之长。能幽能明，能细能巨。" },
  "凤": { pinyin: "fèng", bihua: 4, buShou: "几", wuxing: "水", jiegou: "半包围结构", shiyi: "凤凰；吉祥鸟；高贵", chuchu: "《说文解字》：神鸟也。天老曰：凤之象也。" },
  "福": { pinyin: "fú", bihua: 13, buShou: "示", wuxing: "水", jiegou: "左右结构", shiyi: "幸福；福气；好运", chuchu: "《说文解字》：佑也。从示畐声。" },
  "寿": { pinyin: "shòu", bihua: 7, buShou: "寸", wuxing: "金", jiegou: "半包围结构", shiyi: "长寿；寿命；寿辰", chuchu: "《说文解字》：久也。从老省。" },
  "禄": { pinyin: "lù", bihua: 12, buShou: "示", wuxing: "火", jiegou: "左右结构", shiyi: "官禄；俸禄；富贵", chuchu: "《说文解字》：福也。从示录声。" },
  "喜": { pinyin: "xǐ", bihua: 12, buShou: "口", wuxing: "水", jiegou: "上下结构", shiyi: "欢喜；喜庆；爱好", chuchu: "《说文解字》：乐也。从口从壴。" },
  "乐": { pinyin: "lè", bihua: 5, buShou: "丿", wuxing: "火", jiegou: "独体结构", shiyi: "快乐；音乐；乐趣", chuchu: "《说文解字》：五声八音总名。" },
  "德": { pinyin: "dé", bihua: 15, buShou: "彳", wuxing: "火", jiegou: "左右结构", shiyi: "道德；品德；恩德", chuchu: "《说文解字》：升也。从彳㥁声。" },
  "仁": { pinyin: "rén", bihua: 4, buShou: "人", wuxing: "金", jiegou: "左右结构", shiyi: "仁爱；仁德；仁义", chuchu: "《说文解字》：亲也。从人从二。" },
  "义": { pinyin: "yì", bihua: 3, buShou: "丶", wuxing: "金", jiegou: "独体结构", shiyi: "正义；意义；情义", chuchu: "《说文解字》：己之威仪也。" },
  "礼": { pinyin: "lǐ", bihua: 5, buShou: "示", wuxing: "火", jiegou: "左右结构", shiyi: "礼仪；礼貌；礼物", chuchu: "《说文解字》：履也。所以事神致福也。" },
  "智": { pinyin: "zhì", bihua: 12, buShou: "日", wuxing: "火", jiegou: "上下结构", shiyi: "智慧；聪明；才智", chuchu: "《说文解字》：识词也。从白从亏从知。" },
  "信": { pinyin: "xìn", bihua: 9, buShou: "人", wuxing: "金", jiegou: "左右结构", shiyi: "诚信；信任；信息", chuchu: "《说文解字》：诚也。从人从言。" },
  "和": { pinyin: "hé", bihua: 8, buShou: "口", wuxing: "水", jiegou: "左右结构", shiyi: "和谐；和平；温和", chuchu: "《说文解字》：相应也。从口禾声。" },
  "明": { pinyin: "míng", bihua: 8, buShou: "日", wuxing: "火", jiegou: "左右结构", shiyi: "光明；明白；明天", chuchu: "《说文解字》：照也。从月从囧。" },
  "文": { pinyin: "wén", bihua: 4, buShou: "文", wuxing: "水", jiegou: "独体结构", shiyi: "文字；文化；文明", chuchu: "《说文解字》：错画也。象交文。" },
  "武": { pinyin: "wǔ", bihua: 8, buShou: "止", wuxing: "水", jiegou: "上下结构", shiyi: "武力；勇敢；军事", chuchu: "《说文解字》：楚庄王曰：夫武，定功戢兵。" },
  "康": { pinyin: "kāng", bihua: 11, buShou: "广", wuxing: "木", jiegou: "半包围结构", shiyi: "健康；安宁；广大", chuchu: "《说文解字》：糠谷皮也。今用为安乐义。" },
  "宁": { pinyin: "níng", bihua: 5, buShou: "宀", wuxing: "火", jiegou: "上下结构", shiyi: "安宁；宁静；愿意", chuchu: "《说文解字》：安也。从宀从心。" },
  "安": { pinyin: "ān", bihua: 6, buShou: "宀", wuxing: "土", jiegou: "上下结构", shiyi: "平安；安定；安心", chuchu: "《说文解字》：静也。从女在宀下。" },
  "富": { pinyin: "fù", bihua: 12, buShou: "宀", wuxing: "水", jiegou: "上下结构", shiyi: "富有；财富；丰富", chuchu: "《说文解字》：备也。一曰厚也。从宀畐声。" },
  "贵": { pinyin: "guì", bihua: 9, buShou: "贝", wuxing: "木", jiegou: "上下结构", shiyi: "高贵；贵重；重视", chuchu: "《说文解字》：物不贱也。从贝臾声。" },
  "博": { pinyin: "bó", bihua: 12, buShou: "十", wuxing: "水", jiegou: "左右结构", shiyi: "广博；博学；博大", chuchu: "《说文解字》：大通也。从十从尃。" },
  "学": { pinyin: "xué", bihua: 8, buShou: "子", wuxing: "水", jiegou: "上下结构", shiyi: "学习；学问；学校", chuchu: "《说文解字》：觉悟也。从教从冖。" },
  "道": { pinyin: "dào", bihua: 12, buShou: "辶", wuxing: "火", jiegou: "半包围结构", shiyi: "道理；道路；道义", chuchu: "《说文解字》：所行道也。从辵从首。" },
  "善": { pinyin: "shàn", bihua: 12, buShou: "口", wuxing: "金", jiegou: "上下结构", shiyi: "善良；擅长；友好", chuchu: "《说文解字》：吉也。从誩从羊。" },
  "美": { pinyin: "měi", bihua: 9, buShou: "羊", wuxing: "水", jiegou: "上下结构", shiyi: "美好；美丽；美满", chuchu: "《说文解字》：甘也。从羊从大。" },
  "真": { pinyin: "zhēn", bihua: 10, buShou: "目", wuxing: "金", jiegou: "上下结构", shiyi: "真实；真诚；真相", chuchu: "《说文解字》：仙人变形而登天也。" },
  "善": { pinyin: "shàn", bihua: 12, buShou: "口", wuxing: "金", jiegou: "上下结构", shiyi: "善良；擅长；友好", chuchu: "《说文解字》：吉也。从誩从羊。" },
  "慧": { pinyin: "huì", bihua: 15, buShou: "心", wuxing: "水", jiegou: "上下结构", shiyi: "智慧；聪明；慧眼", chuchu: "《说文解字》：儇也。从心彗声。" },
  "泰": { pinyin: "tài", bihua: 10, buShou: "水", wuxing: "火", jiegou: "上下结构", shiyi: "泰然；平安；通达", chuchu: "《说文解字》：滑也。从水大声。" },
  "清": { pinyin: "qīng", bihua: 11, buShou: "水", wuxing: "水", jiegou: "左右结构", shiyi: "清澈；清静；清白", chuchu: "《说文解字》：朗也。澄水之貌。" },
  "正": { pinyin: "zhèng", bihua: 5, buShou: "止", wuxing: "金", jiegou: "独体结构", shiyi: "正直；正好；正气", chuchu: "《说文解字》：是也。从止从一以止。" },
  "元": { pinyin: "yuán", bihua: 4, buShou: "儿", wuxing: "木", jiegou: "上下结构", shiyi: "元始；首要；元气", chuchu: "《说文解字》：始也。从一从兀。" },
  "亨": { pinyin: "hēng", bihua: 7, buShou: "亠", wuxing: "水", jiegou: "上下结构", shiyi: "亨通；顺利；通达", chuchu: "《说文解字》：献也。从高省。" },
  "利": { pinyin: "lì", bihua: 7, buShou: "刂", wuxing: "火", jiegou: "左右结构", shiyi: "利益；顺利；利润", chuchu: "《说文解字》：铦也。从刀从禾。" },
  "贞": { pinyin: "zhēn", bihua: 6, buShou: "贝", wuxing: "火", jiegou: "上下结构", shiyi: "坚贞；纯正；贞操", chuchu: "《说文解字》：卜问也。从卜从贝。" },
}

const WUXING_COLORS: Record<string, { text: string; bg: string }> = {
  "金": { text: "text-yellow-400", bg: "bg-yellow-900/30 border-yellow-700/30" },
  "木": { text: "text-green-400", bg: "bg-green-900/30 border-green-700/30" },
  "水": { text: "text-blue-400", bg: "bg-blue-900/30 border-blue-700/30" },
  "火": { text: "text-red-400", bg: "bg-red-900/30 border-red-700/30" },
  "土": { text: "text-amber-400", bg: "bg-amber-900/30 border-amber-700/30" },
}

const BIHUA_JIXIONG: Record<number, { level: string; color: string }> = {
  1: { level: "大吉", color: "text-green-400" },
  2: { level: "凶", color: "text-red-400" },
  3: { level: "大吉", color: "text-green-400" },
  4: { level: "凶", color: "text-red-400" },
  5: { level: "大吉", color: "text-green-400" },
  6: { level: "吉", color: "text-green-300" },
  7: { level: "吉", color: "text-green-300" },
  8: { level: "半吉", color: "text-amber-400" },
  9: { level: "凶", color: "text-red-400" },
  10: { level: "凶", color: "text-red-400" },
  11: { level: "大吉", color: "text-green-400" },
  12: { level: "凶", color: "text-red-400" },
  13: { level: "大吉", color: "text-green-400" },
  14: { level: "凶", color: "text-red-400" },
  15: { level: "大吉", color: "text-green-400" },
}

export default function ZiDianPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [result, setResult] = useState<any>(null)
  const [notFound, setNotFound] = useState(false)

  const searchZiDian = () => {
    if (!searchQuery.trim()) return
    
    const zi = searchQuery.charAt(0)
    const data = ZI_DIAN_DATA[zi]
    
    if (data) {
      setResult({ zi, ...data })
      setNotFound(false)
    } else {
      setResult(null)
      setNotFound(true)
    }
  }

  const wuxingInfo = result ? WUXING_COLORS[result.wuxing] || WUXING_COLORS["土"] : null
  const jixiongInfo = result ? (BIHUA_JIXIONG[result.bihua] || { level: "参考其他", color: "text-gray-400" }) : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-cyan-400">字典查询</h1>
            <p className="text-xs text-cyan-200/60">《说文解字》· 汉字字典</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-4 border border-cyan-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-cyan-200/80 mb-2 block">输入汉字</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchZiDian()}
                  placeholder="请输入一个汉字"
                  maxLength={1}
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-4 pl-10 pr-4 text-center text-4xl font-bold text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <button
              onClick={searchZiDian}
              disabled={!searchQuery.trim()}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-4 h-4" />
              查询字典
            </button>
          </div>
        </div>

        {notFound && (
          <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-5 border border-amber-800/30 text-center">
            <div className="text-amber-400 text-lg mb-2">未找到该字</div>
            <p className="text-sm text-amber-200/70">请尝试其他汉字，字典持续完善中</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/60 rounded-xl p-5 border border-cyan-800/30">
              <div className="text-center">
                <div className="text-7xl font-bold text-white mb-3">{result.zi}</div>
                <div className="text-lg text-cyan-300 mb-1">{result.pinyin}</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="px-2 py-0.5 bg-white/10 rounded text-sm text-gray-300">部首：{result.buShou}</span>
                  <span className="px-2 py-0.5 bg-white/10 rounded text-sm text-gray-300">结构：{result.jiegou}</span>
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br ${wuxingInfo?.bg || ''} rounded-xl p-5 border`}>
              <h3 className="text-sm font-medium text-cyan-400 mb-4 flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                基本信息
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">笔画数</div>
                  <div className="text-2xl font-bold text-white">{result.bihua}</div>
                  <div className={`text-xs ${jixiongInfo?.color}`}>{jixiongInfo?.level}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">五行</div>
                  <div className={`text-2xl font-bold ${wuxingInfo?.text}`}>{result.wuxing}</div>
                  <div className="text-xs text-gray-500">属性</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">部首</div>
                  <div className="text-2xl font-bold text-white">{result.buShou}</div>
                  <div className="text-xs text-gray-500">{result.jiegou}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-medium text-purple-400 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" />
                字义解释
              </h3>
              <p className="text-sm text-purple-100/80 leading-relaxed">{result.shiyi}</p>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
              <h3 className="text-sm font-medium text-amber-400 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                古籍出处
              </h3>
              <p className="text-sm text-amber-100/80 leading-relaxed italic">
                "{result.chuchu}"
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-cyan-400 mb-4 flex items-center gap-2">
            <Hash className="w-4 h-4" />
            常用汉字速查
          </h3>
          <div className="grid grid-cols-6 gap-2">
            {Object.keys(ZI_DIAN_DATA).slice(0, 30).map((zi) => (
              <button
                key={zi}
                onClick={() => {
                  setSearchQuery(zi)
                  const data = ZI_DIAN_DATA[zi]
                  setResult({ zi, ...data })
                  setNotFound(false)
                }}
                className="aspect-square bg-white/5 hover:bg-cyan-900/30 rounded-lg flex items-center justify-center text-lg font-bold text-white transition-all"
              >
                {zi}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">字典简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            本字典基于《说文解字》（东汉·许慎著）编纂。《说文解字》是中国第一部系统分析汉字字形
            和考究字源的字书，共收字9353个，重文1163个。此字典收录了常用汉字的拼音、笔画数、
            部首、五行属性、结构类型、字义解释和古籍出处等信息，为姓名学和测字等易学应用
            提供基础数据支持。
          </p>
        </div>
      </main>
    </div>
  )
}