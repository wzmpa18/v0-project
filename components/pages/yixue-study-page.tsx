"use client"

import { useState } from "react"
import { ChevronLeft, Search, BookOpen, Star, Users, Eye, Flame, Sun, Moon, ChevronRight, X } from "lucide-react"

interface StudyPageProps {
  category: string
  onBack: () => void
}

// 神煞数据
const SHENSHA_DATA = [
  { name: "天乙贵人", type: "吉", gejue: "甲戊庚牛羊，乙己鼠猴乡，丙丁猪鸡位，壬癸兔蛇藏，六辛逢马虎，此是贵人方。", meaning: "主人缘好，遇难呈祥，有贵人相助。", lookup: "以日干查年支或时支" },
  { name: "文昌贵人", type: "吉", gejue: "甲乙巳午报，丙戊申宫找，庚辛寻亥子，壬癸寅卯好。", meaning: "主聪明好学，文章出众，利于考试。", lookup: "以日干查年支或时支" },
  { name: "驿马", type: "中", gejue: "申子辰马在寅，寅午戌马在申，亥卯未马在巳，巳酉丑马在亥。", meaning: "主奔波劳碌，出行频繁，变动较多。", lookup: "以年支或日支查" },
  { name: "桃花", type: "中", gejue: "申子辰桃花在酉，寅午戌桃花在卯，亥卯未桃花在子，巳酉丑桃花在午。", meaning: "主人缘好，异性缘旺，也主风流。", lookup: "以年支或日支查" },
  { name: "华盖", type: "中", gejue: "申子辰见辰，寅午戌见戌，亥卯未见未，巳酉丑见丑。", meaning: "主孤独清高，适合宗教哲学研究。", lookup: "以年支或日支查" },
  { name: "羊刃", type: "凶", gejue: "甲刃在卯，乙刃在辰，丙戊刃在午，丁己刃在未，庚刃在酉，辛刃在戌，壬刃在子，癸刃在丑。", meaning: "主性格刚烈，易有血光之灾。", lookup: "以日干查" },
  { name: "劫煞", type: "凶", gejue: "申子辰见巳，寅午戌见亥，亥卯未见申，巳酉丑见寅。", meaning: "主意外灾祸，需防小人暗害。", lookup: "以年支或日支查" },
  { name: "亡神", type: "凶", gejue: "申子辰见亥，寅午戌见巳，亥卯未见寅，巳酉丑见申。", meaning: "主精神恍惚，易受惊吓。", lookup: "以年支或日支查" },
  { name: "天德贵人", type: "吉", gejue: "正月丁，二月申，三月壬，四月辛，五月亥，六月甲，七月癸，八月寅，九月丙，十月乙，十一月巳，十二月庚。", meaning: "主逢凶化吉，有贵人帮助。", lookup: "以月支查日干或年干" },
  { name: "月德贵人", type: "吉", gejue: "寅午戌月丙，申子辰月壬，亥卯未月甲，巳酉丑月庚。", meaning: "主品德高尚，有贵人相助。", lookup: "以月支查日干或年干" },
]

// 十二长生数据
const CHANGSHENG_DATA = [
  { name: "长生", meaning: "如人之初生，万物发生之象，主精力充沛，生机勃勃。", xingge: "性格开朗，朝气蓬勃，有冲劲。" },
  { name: "沐浴", meaning: "如人沐浴更衣，去旧迎新之象，主变化不定，易受诱惑。", xingge: "性格多变，好奇心强，易冲动。" },
  { name: "冠带", meaning: "如人穿衣戴冠，步入社会之象，主进取向上，初露锋芒。", xingge: "性格积极，有上进心，重视形象。" },
  { name: "临官", meaning: "如人当官任职，事业有成之象，主地位提升，名望渐起。", xingge: "性格稳重，有责任感，注重事业。" },
  { name: "帝旺", meaning: "如人登基称帝，权势滔天之象，主最强盛时，物极必反。", xingge: "性格强势，有魄力，但需防骄傲。" },
  { name: "衰", meaning: "如人年老体衰，精力不济之象，主气势减弱，需要休养。", xingge: "性格保守，行事谨慎，缺乏冲劲。" },
  { name: "病", meaning: "如人疾病缠身，身心俱疲之象，主困难重重，需要帮助。", xingge: "性格敏感，容易忧虑，需要关怀。" },
  { name: "死", meaning: "如人寿终正寝，生命终结之象，主静止不动，重新开始。", xingge: "性格沉稳，不喜变动，注重传统。" },
  { name: "墓", meaning: "如人入土为安，收藏积蓄之象，主收敛藏纳，蓄势待发。", xingge: "性格内敛，善于积累，不张扬。" },
  { name: "绝", meaning: "如种子入土，蛰伏待发之象，主断绝旧缘，等待新生。", xingge: "性格独立，善于断舍离，有决断力。" },
  { name: "胎", meaning: "如人受精成胎，孕育生命之象，主新的开始，充满希望。", xingge: "性格温和，有孕育之心，善于培养。" },
  { name: "养", meaning: "如人在母腹中养育，待产之象，主静待时机，蓄积力量。", xingge: "性格平和，有耐心，善于等待。" },
]

// 十神数据
const SHISHEN_DATA = [
  { name: "比肩", wuxing: "与日主同性同五行", liuqin: "兄弟、朋友", xinxing: "自尊心强，独立自主，不喜受制于人，有竞争意识。", jixiong: "旺则争夺，衰则助身。" },
  { name: "劫财", wuxing: "与日主异性同五行", liuqin: "异性兄弟姐妹", xinxing: "好胜心强，敢于冒险，但易冲动，有破财之象。", jixiong: "旺则夺财，衰则助身。" },
  { name: "食神", wuxing: "日主所生之同性", liuqin: "女命代表子女", xinxing: "温和善良，乐观开朗，有口福，喜享受。", jixiong: "吉神，主福禄寿。" },
  { name: "伤官", wuxing: "日主所生之异性", liuqin: "女命代表子女", xinxing: "聪明伶俐，才华横溢，但易自负，叛逆心强。", jixiong: "聪明但需防口舌是非。" },
  { name: "偏财", wuxing: "日主所克之异性", liuqin: "父亲、情人", xinxing: "慷慨大方，人缘好，但不擅理财，财来财去。", jixiong: "主意外之财，但不稳定。" },
  { name: "正财", wuxing: "日主所克之同性", liuqin: "妻子（男命）", xinxing: "勤俭持家，踏实稳重，善于理财，重视物质。", jixiong: "主正当收入，稳定可靠。" },
  { name: "七杀", wuxing: "克日主之异性", liuqin: "儿子（女命）", xinxing: "果断刚毅，有魄力，但性急易怒，有压力。", jixiong: "制化得宜则为权，否则为灾。" },
  { name: "正官", wuxing: "克日主之同性", liuqin: "丈夫（女命）", xinxing: "正直守法，有责任感，但易受约束，循规蹈矩。", jixiong: "吉神，主名誉地位。" },
  { name: "偏印", wuxing: "生日主之异性", liuqin: "继母、偏师", xinxing: "聪明机智，善于思考，但性格孤僻，不善表达。", jixiong: "又名枭神，需看组合。" },
  { name: "正印", wuxing: "生日主之同性", liuqin: "母亲", xinxing: "仁慈善良，重视学问，但依赖心强，优柔寡断。", jixiong: "吉神，主学业文书。" },
]

// 藏干数据
const CANGGAN_DATA = [
  { zhi: "子", canggan: ["癸"], shuoming: "子中藏癸水，为正位，水之本气。" },
  { zhi: "丑", canggan: ["己", "癸", "辛"], shuoming: "丑中藏己土（本气）、癸水（中气）、辛金（余气）。" },
  { zhi: "寅", canggan: ["甲", "丙", "戊"], shuoming: "寅中藏甲木（本气）、丙火（中气）、戊土（余气）。" },
  { zhi: "卯", canggan: ["乙"], shuoming: "卯中藏乙木，为正位，木之本气。" },
  { zhi: "辰", canggan: ["戊", "乙", "癸"], shuoming: "辰中藏戊土（本气）、乙木（中气）、癸水（余气）。" },
  { zhi: "巳", canggan: ["丙", "庚", "戊"], shuoming: "巳中藏丙火（本气）、庚金（中气）、戊土（余气）。" },
  { zhi: "午", canggan: ["丁", "己"], shuoming: "午中藏丁火（本气）、己土（中气）。" },
  { zhi: "未", canggan: ["己", "丁", "乙"], shuoming: "未中藏己土（本气）、丁火（中气）、乙木（余气）。" },
  { zhi: "申", canggan: ["庚", "壬", "戊"], shuoming: "申中藏庚金（本气）、壬水（中气）、戊土（余气）。" },
  { zhi: "酉", canggan: ["辛"], shuoming: "酉中藏辛金，为正位，金之本气。" },
  { zhi: "戌", canggan: ["戊", "辛", "丁"], shuoming: "戌中藏戊土（本气）、辛金（中气）、丁火（余气）。" },
  { zhi: "亥", canggan: ["壬", "甲"], shuoming: "亥中藏壬水（本气）、甲木（中气）。" },
]

// 古籍数据
const GUJI_DATA = {
  "liuren": [
    { id: "liurendaquan", name: "大六壬大全", author: "郭御青", dynasty: "明", chapters: 12 },
    { id: "liurenzhinan", name: "大六壬指南", author: "陈公献", dynasty: "清", chapters: 6 },
    { id: "liurenzhizhi", name: "六壬直指", author: "佚名", dynasty: "清", chapters: 4 },
    { id: "liurenshuoyue", name: "大六壬说约", author: "佚名", dynasty: "清", chapters: 8 },
    { id: "liurendazhan", name: "六壬大占", author: "佚名", dynasty: "明", chapters: 10 },
    { id: "liurenbifafu", name: "六壬毕法赋", author: "佚名", dynasty: "宋", chapters: 1 },
    { id: "liurenxinjing", name: "大六壬心镜", author: "佚名", dynasty: "唐", chapters: 3 },
    { id: "liurenjielu", name: "六壬捷录", author: "佚名", dynasty: "清", chapters: 5 },
    { id: "liurenyinhezhao", name: "大六壬银河棹", author: "佚名", dynasty: "清", chapters: 7 },
    { id: "jinkoujue", name: "六壬神课金口诀", author: "佚名", dynasty: "宋", chapters: 4 },
    { id: "liurenmiji", name: "六壬秘笈", author: "佚名", dynasty: "清", chapters: 6 },
    { id: "liurentanyuan", name: "大六壬探源", author: "袁树珊", dynasty: "民国", chapters: 8 },
  ],
  "bazi": [
    { id: "yuanhaizping", name: "渊海子平", author: "徐大升", dynasty: "宋", chapters: 5 },
    { id: "sanmingtonghui", name: "三命通会", author: "万民英", dynasty: "明", chapters: 12 },
    { id: "ditiansui", name: "滴天髓", author: "京图", dynasty: "明", chapters: 6 },
    { id: "zipingzhenquan", name: "子平真诠", author: "沈孝瞻", dynasty: "清", chapters: 8 },
  ],
  "qimen": [
    { id: "qimendunjia", name: "奇门遁甲全书", author: "诸葛亮", dynasty: "三国", chapters: 10 },
  ],
  "meihua": [
    { id: "meihuayishu", name: "梅花易数", author: "邵雍", dynasty: "宋", chapters: 5 },
  ],
}

export function YixueStudyPage({ category, onBack }: StudyPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [nightMode, setNightMode] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  // 获取分类标题
  const getCategoryTitle = () => {
    switch (category) {
      case "shensha": return "神煞歌诀"
      case "changsheng": return "十二长生"
      case "shishen": return "十神详解"
      case "canggan": return "藏干与暗干"
      case "paipan-method": return "排盘方法"
      case "guji": return "古籍经典"
      default: return "易学学习"
    }
  }

  // 过滤数据
  const getFilteredData = () => {
    switch (category) {
      case "shensha":
        return SHENSHA_DATA.filter(item => 
          item.name.includes(searchQuery) || item.meaning.includes(searchQuery)
        )
      case "changsheng":
        return CHANGSHENG_DATA.filter(item =>
          item.name.includes(searchQuery) || item.meaning.includes(searchQuery)
        )
      case "shishen":
        return SHISHEN_DATA.filter(item =>
          item.name.includes(searchQuery) || item.xinxing.includes(searchQuery)
        )
      case "canggan":
        return CANGGAN_DATA.filter(item =>
          item.zhi.includes(searchQuery) || item.canggan.some(g => g.includes(searchQuery))
        )
      default:
        return []
    }
  }

  // 渲染神煞列表
  const renderShenshaList = () => (
    <div className="space-y-3">
      {getFilteredData().map((item: any, i) => (
        <button
          key={i}
          onClick={() => setSelectedItem(item)}
          className="w-full p-4 bg-[#252525] rounded-xl border border-[#3a3a3a] text-left hover:border-[#d4af37]/30 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#f5f5f7] font-medium">{item.name}</span>
            <span className={`px-2 py-0.5 rounded text-xs ${
              item.type === "吉" ? "bg-[#4a9d5c]/20 text-[#4a9d5c]" :
              item.type === "凶" ? "bg-[#c8102e]/20 text-[#c8102e]" :
              "bg-[#d4af37]/20 text-[#d4af37]"
            }`}>
              {item.type}
            </span>
          </div>
          <p className="text-[#888] text-sm line-clamp-2">{item.meaning}</p>
        </button>
      ))}
    </div>
  )

  // 渲染十二长生列表
  const renderChangshengList = () => (
    <div className="space-y-3">
      {getFilteredData().map((item: any, i) => (
        <button
          key={i}
          onClick={() => setSelectedItem(item)}
          className="w-full p-4 bg-[#252525] rounded-xl border border-[#3a3a3a] text-left hover:border-[#d4af37]/30 transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 flex items-center justify-center">
              <span className="text-[#d4af37] font-bold">{i + 1}</span>
            </div>
            <span className="text-[#f5f5f7] font-medium text-lg">{item.name}</span>
          </div>
          <p className="text-[#888] text-sm">{item.meaning}</p>
        </button>
      ))}
    </div>
  )

  // 渲染十神列表
  const renderShishenList = () => (
    <div className="space-y-3">
      {getFilteredData().map((item: any, i) => (
        <button
          key={i}
          onClick={() => setSelectedItem(item)}
          className="w-full p-4 bg-[#252525] rounded-xl border border-[#3a3a3a] text-left hover:border-[#d4af37]/30 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#f5f5f7] font-medium">{item.name}</span>
            <span className="text-[#888] text-xs">{item.liuqin}</span>
          </div>
          <p className="text-[#666] text-xs mb-1">{item.wuxing}</p>
          <p className="text-[#888] text-sm line-clamp-2">{item.xinxing}</p>
        </button>
      ))}
    </div>
  )

  // 渲染藏干列表
  const renderCangganList = () => (
    <div className="grid grid-cols-3 gap-3">
      {getFilteredData().map((item: any, i) => (
        <button
          key={i}
          onClick={() => setSelectedItem(item)}
          className="p-3 bg-[#252525] rounded-xl border border-[#3a3a3a] text-center hover:border-[#d4af37]/30 transition-all"
        >
          <div className="text-[#d4af37] text-2xl font-bold mb-1">{item.zhi}</div>
          <div className="flex justify-center gap-1">
            {item.canggan.map((gan: string, j: number) => (
              <span key={j} className="text-[#888] text-sm">{gan}</span>
            ))}
          </div>
        </button>
      ))}
    </div>
  )

  // 渲染古籍列表
  const renderGujiList = () => (
    <div className="space-y-4">
      {Object.entries(GUJI_DATA).map(([key, books]) => (
        <div key={key}>
          <div className="text-[#888] text-xs mb-2 px-1">
            {key === "liuren" ? "大六壬类" :
             key === "bazi" ? "八字命理类" :
             key === "qimen" ? "奇门遁甲类" : "梅花易数类"}
          </div>
          <div className="space-y-2">
            {books.map((book) => (
              <button
                key={book.id}
                onClick={() => setSelectedItem(book)}
                className="w-full flex items-center gap-3 p-3 bg-[#252525] rounded-xl border border-[#3a3a3a] hover:border-[#d4af37]/30 transition-all"
              >
                <BookOpen className="w-5 h-5 text-[#d4af37]" />
                <div className="flex-1 text-left">
                  <div className="text-[#f5f5f7] text-sm">{book.name}</div>
                  <div className="text-[#666] text-xs">{book.author} · {book.dynasty}</div>
                </div>
                <span className="text-[#888] text-xs">{book.chapters}卷</span>
                <ChevronRight className="w-4 h-4 text-[#555]" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  // 渲染排盘方法
  const renderPaipanMethod = () => (
    <div className="space-y-3">
      {[
        { name: "八字排盘方法", desc: "年月日时四柱排法详解", steps: 8 },
        { name: "奇门遁甲排盘", desc: "九宫八卦排盘步骤", steps: 12 },
        { name: "大六壬排盘", desc: "天地盘、四课三传排法", steps: 10 },
        { name: "六爻排盘", desc: "起卦、装卦、定世应", steps: 6 },
        { name: "紫微斗数排盘", desc: "安命宫、排星曜", steps: 15 },
        { name: "玄空飞星排盘", desc: "九宫飞星入中宫", steps: 9 },
        { name: "八宅排盘", desc: "定宅卦、配吉凶方位", steps: 5 },
        { name: "梅花易数起卦", desc: "数字起卦、时间起卦", steps: 4 },
      ].map((method, i) => (
        <button
          key={i}
          className="w-full flex items-center gap-3 p-4 bg-[#252525] rounded-xl border border-[#3a3a3a] hover:border-[#d4af37]/30 transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-[#4a90d9]/10 flex items-center justify-center">
            <span className="text-[#4a90d9] font-bold">{method.steps}</span>
          </div>
          <div className="flex-1 text-left">
            <div className="text-[#f5f5f7] font-medium">{method.name}</div>
            <div className="text-[#888] text-xs">{method.desc}</div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#555]" />
        </button>
      ))}
    </div>
  )

  return (
    <div className={`min-h-screen ${nightMode ? "bg-[#0a0a0a]" : "bg-[#1a1a1a]"} pb-4`}>
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3a3a3a]">
        <button onClick={onBack} className="flex items-center gap-1 text-[#d4af37]">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <h1 className="text-[#f5f5f7] font-medium">{getCategoryTitle()}</h1>
        <div className="w-16" />
      </div>

      {/* 搜索栏 */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2.5 bg-[#252525] rounded-xl border border-[#3a3a3a]">
          <Search className="w-4 h-4 text-[#666]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索..."
            className="flex-1 bg-transparent text-[#f5f5f7] text-sm placeholder:text-[#555] outline-none"
          />
        </div>
      </div>

      {/* 内容区域 */}
      <div className="px-4">
        {category === "shensha" && renderShenshaList()}
        {category === "changsheng" && renderChangshengList()}
        {category === "shishen" && renderShishenList()}
        {category === "canggan" && renderCangganList()}
        {category === "guji" && renderGujiList()}
        {category === "paipan-method" && renderPaipanMethod()}
      </div>

      {/* 详情弹窗 */}
      {selectedItem && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedItem(null)} />
          <div className={`absolute bottom-0 left-0 right-0 max-h-[80vh] ${nightMode ? "bg-[#0a0a0a]" : "bg-[#1e1e1e]"} rounded-t-3xl overflow-hidden`}>
            <div className="flex justify-center py-2">
              <div className="w-10 h-1 bg-[#555] rounded-full" />
            </div>
            <div className="flex items-center justify-between px-4 pb-3 border-b border-[#3a3a3a]">
              <h3 className="text-[#f5f5f7] font-medium">{selectedItem.name}</h3>
              <div className="flex items-center gap-2">
                {category === "guji" && (
                  <>
                    <button
                      onClick={() => setNightMode(!nightMode)}
                      className="p-2 rounded-lg bg-[#333]"
                    >
                      {nightMode ? <Sun className="w-4 h-4 text-[#d4af37]" /> : <Moon className="w-4 h-4 text-[#888]" />}
                    </button>
                    <button
                      onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}
                      className="px-2 py-1 rounded-lg bg-[#333] text-[#888] text-sm"
                    >
                      A+
                    </button>
                    <button
                      onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
                      className="px-2 py-1 rounded-lg bg-[#333] text-[#888] text-sm"
                    >
                      A-
                    </button>
                  </>
                )}
                <button onClick={() => setSelectedItem(null)}>
                  <X className="w-5 h-5 text-[#888]" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-4" style={{ fontSize: `${fontSize}px` }}>
              {category === "shensha" && (
                <div className="space-y-4">
                  <div>
                    <div className="text-[#888] text-xs mb-1">歌诀</div>
                    <p className="text-[#d4af37] leading-relaxed">{selectedItem.gejue}</p>
                  </div>
                  <div>
                    <div className="text-[#888] text-xs mb-1">查法</div>
                    <p className="text-[#c5c5c5] leading-relaxed">{selectedItem.lookup}</p>
                  </div>
                  <div>
                    <div className="text-[#888] text-xs mb-1">命理意义</div>
                    <p className="text-[#c5c5c5] leading-relaxed">{selectedItem.meaning}</p>
                  </div>
                </div>
              )}
              {category === "changsheng" && (
                <div className="space-y-4">
                  <div>
                    <div className="text-[#888] text-xs mb-1">含义</div>
                    <p className="text-[#c5c5c5] leading-relaxed">{selectedItem.meaning}</p>
                  </div>
                  <div>
                    <div className="text-[#888] text-xs mb-1">性格特征</div>
                    <p className="text-[#c5c5c5] leading-relaxed">{selectedItem.xingge}</p>
                  </div>
                </div>
              )}
              {category === "shishen" && (
                <div className="space-y-4">
                  <div>
                    <div className="text-[#888] text-xs mb-1">五行关系</div>
                    <p className="text-[#d4af37] leading-relaxed">{selectedItem.wuxing}</p>
                  </div>
                  <div>
                    <div className="text-[#888] text-xs mb-1">六亲代表</div>
                    <p className="text-[#c5c5c5] leading-relaxed">{selectedItem.liuqin}</p>
                  </div>
                  <div>
                    <div className="text-[#888] text-xs mb-1">心性特征</div>
                    <p className="text-[#c5c5c5] leading-relaxed">{selectedItem.xinxing}</p>
                  </div>
                  <div>
                    <div className="text-[#888] text-xs mb-1">吉凶论断</div>
                    <p className="text-[#c5c5c5] leading-relaxed">{selectedItem.jixiong}</p>
                  </div>
                </div>
              )}
              {category === "canggan" && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <span className="text-[#d4af37] text-4xl font-bold">{selectedItem.zhi}</span>
                  </div>
                  <div>
                    <div className="text-[#888] text-xs mb-1">藏干</div>
                    <div className="flex justify-center gap-4">
                      {selectedItem.canggan.map((gan: string, i: number) => (
                        <span key={i} className="text-[#f5f5f7] text-2xl">{gan}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#888] text-xs mb-1">说明</div>
                    <p className="text-[#c5c5c5] leading-relaxed">{selectedItem.shuoming}</p>
                  </div>
                </div>
              )}
              {category === "guji" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#888]">作者：{selectedItem.author}</span>
                    <span className="text-[#888]">朝代：{selectedItem.dynasty}</span>
                    <span className="text-[#888]">共{selectedItem.chapters}卷</span>
                  </div>
                  <div className="border-t border-[#333] pt-4">
                    <p className="text-[#c5c5c5] leading-relaxed">
                      《{selectedItem.name}》是{selectedItem.dynasty}代{selectedItem.author}所著的重要典籍，全书共{selectedItem.chapters}卷。
                      <br /><br />
                      （古籍内容占位，后续替换完整原文）
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
