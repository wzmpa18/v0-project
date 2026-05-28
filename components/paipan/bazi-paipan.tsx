"use client"

import { useState, useMemo } from "react"
import { Calendar, MapPin, Sun, Moon, HelpCircle, ChevronDown, RefreshCw } from "lucide-react"
import { PaipanLayout, DetailPopup, DisplayMode } from "./paipan-layout"
import lunisolar from "lunisolar"

interface BaziPaipanProps {
  onBack: () => void
  onAIAnalysis?: () => void
}

// 天干
const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
// 地支
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
// 十神
const SHISHEN = ["比肩", "劫财", "食神", "伤官", "偏财", "正财", "七杀", "正官", "偏印", "正印"]
// 地支藏干
const DIZHI_CANGGAN: Record<string, string[]> = {
  "子": ["癸"],
  "丑": ["己", "癸", "辛"],
  "寅": ["甲", "丙", "戊"],
  "卯": ["乙"],
  "辰": ["戊", "乙", "癸"],
  "巳": ["丙", "庚", "戊"],
  "午": ["丁", "己"],
  "未": ["己", "丁", "乙"],
  "申": ["庚", "壬", "戊"],
  "酉": ["辛"],
  "戌": ["戊", "辛", "丁"],
  "亥": ["壬", "甲"],
}
// 纳音
const NAYIN: Record<string, string> = {
  "甲子": "海中金", "乙丑": "海中金",
  "丙寅": "炉中火", "丁卯": "炉中火",
  "戊辰": "大林木", "己巳": "大林木",
  "庚午": "路旁土", "辛未": "路旁土",
  "壬申": "剑锋金", "癸酉": "剑锋金",
  "甲戌": "山头火", "乙亥": "山头火",
  "丙子": "涧下水", "丁丑": "涧下水",
  "戊寅": "城头土", "己卯": "城头土",
  "庚辰": "白腊金", "辛巳": "白腊金",
  "壬午": "杨柳木", "癸未": "杨柳木",
  "甲申": "泉中水", "乙酉": "泉中水",
  "丙戌": "屋上土", "丁亥": "屋上土",
  "戊子": "霹雳火", "己丑": "霹雳火",
  "庚寅": "松柏木", "辛卯": "松柏木",
  "壬辰": "长流水", "癸巳": "长流水",
  "甲午": "砂石金", "乙未": "砂石金",
  "丙申": "山下火", "丁酉": "山下火",
  "戊戌": "平地木", "己亥": "平地木",
  "庚子": "壁上土", "辛丑": "壁上土",
  "壬寅": "金箔金", "癸卯": "金箔金",
  "甲辰": "覆灯火", "乙巳": "覆灯火",
  "丙午": "天河水", "丁未": "天河水",
  "戊申": "大驿土", "己酉": "大驿土",
  "庚戌": "钗钏金", "辛亥": "钗钏金",
  "壬子": "桑柘木", "癸丑": "桑柘木",
  "甲寅": "大溪水", "乙卯": "大溪水",
  "丙辰": "砂中土", "丁巳": "砂中土",
  "戊午": "天上火", "己未": "天上火",
  "庚申": "石榴木", "辛酉": "石榴木",
  "壬戌": "大海水", "癸亥": "大海水",
}

// 五行颜色
const WUXING_COLORS: Record<string, string> = {
  "木": "#4a9d5c",
  "火": "#c8102e",
  "土": "#d4af37",
  "金": "#f5f5f7",
  "水": "#4a90d9",
}

// 天干五行
const TIANGAN_WUXING: Record<string, string> = {
  "甲": "木", "乙": "木",
  "丙": "火", "丁": "火",
  "戊": "土", "己": "土",
  "庚": "金", "辛": "金",
  "壬": "水", "癸": "水",
}

// 地支五行
const DIZHI_WUXING: Record<string, string> = {
  "寅": "木", "卯": "木",
  "巳": "火", "午": "火",
  "辰": "土", "戌": "土", "丑": "土", "未": "土",
  "申": "金", "酉": "金",
  "亥": "水", "子": "水",
}

export function BaziPaipan({ onBack, onAIAnalysis }: BaziPaipanProps) {
  // 输入状态
  const [birthDate, setBirthDate] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  })
  const [birthHour, setBirthHour] = useState("12")
  const [isLunar, setIsLunar] = useState(false)
  const [earlyZi, setEarlyZi] = useState(false) // 早子时
  const [gender, setGender] = useState<"male" | "female">("male")
  const [city, setCity] = useState("北京")
  const [useTrueSolarTime, setUseTrueSolarTime] = useState(false)
  
  // 显示状态
  const [displayMode, setDisplayMode] = useState<DisplayMode>("normal")
  const [showDetail, setShowDetail] = useState(false)
  const [detailData, setDetailData] = useState<any>(null)
  const [detailTitle, setDetailTitle] = useState("")

  // 计算八字
  const baziData = useMemo(() => {
    try {
      const [year, month, day] = birthDate.split('-').map(Number)
      const hour = parseInt(birthHour)
      
      // 使用 lunisolar 计算
      const d = lunisolar(new Date(year, month - 1, day, hour))
      
      // 获取四柱
      const yearGan = d.char8.year.stem.toString()
      const yearZhi = d.char8.year.branch.toString()
      const monthGan = d.char8.month.stem.toString()
      const monthZhi = d.char8.month.branch.toString()
      const dayGan = d.char8.day.stem.toString()
      const dayZhi = d.char8.day.branch.toString()
      const hourGan = d.char8.hour.stem.toString()
      const hourZhi = d.char8.hour.branch.toString()

      // 计算十神（以日干为主）
      const dayGanIndex = TIANGAN.indexOf(dayGan)
      const getShishen = (gan: string) => {
        const ganIndex = TIANGAN.indexOf(gan)
        const diff = (ganIndex - dayGanIndex + 10) % 10
        return SHISHEN[diff]
      }

      // 计算神煞（简化版）
      const shensha = ["天乙贵人", "文昌", "驿马"]

      return {
        year: { gan: yearGan, zhi: yearZhi, shishen: getShishen(yearGan), canggan: DIZHI_CANGGAN[yearZhi] || [] },
        month: { gan: monthGan, zhi: monthZhi, shishen: getShishen(monthGan), canggan: DIZHI_CANGGAN[monthZhi] || [] },
        day: { gan: dayGan, zhi: dayZhi, shishen: "日主", canggan: DIZHI_CANGGAN[dayZhi] || [] },
        hour: { gan: hourGan, zhi: hourZhi, shishen: getShishen(hourGan), canggan: DIZHI_CANGGAN[hourZhi] || [] },
        nayin: NAYIN[`${dayGan}${dayZhi}`] || "未知",
        shensha,
        lunar: d.lunar,
      }
    } catch (e) {
      console.log("[v0] Error calculating bazi:", e)
      return null
    }
  }, [birthDate, birthHour])

  // 断语列表
  const duanyu = useMemo(() => {
    if (!baziData) return []
    return [
      `日主${baziData.day.gan}${TIANGAN_WUXING[baziData.day.gan]}，${baziData.nayin}命。`,
      `年柱${baziData.year.gan}${baziData.year.zhi}，主祖上基业，代表1-16岁运势。`,
      `月柱${baziData.month.gan}${baziData.month.zhi}，主父母宫，代表17-32岁运势。`,
      `日柱${baziData.day.gan}${baziData.day.zhi}，主自身与配偶，代表33-48岁运势。`,
      `时柱${baziData.hour.gan}${baziData.hour.zhi}，主子女宫，代表49岁以后运势。`,
    ]
  }, [baziData])

  // 处理双击/长按
  const handleCellPress = (pillar: string, type: "gan" | "zhi") => {
    if (!baziData) return
    const pillarData = baziData[pillar as keyof typeof baziData]
    if (!pillarData || typeof pillarData !== 'object') return
    
    const data = pillarData as { gan: string; zhi: string; shishen: string; canggan: string[] }
    
    setDetailTitle(type === "gan" ? data.gan : data.zhi)
    setDetailData({
      canggan: type === "zhi" ? data.canggan : undefined,
      shishen: data.shishen,
      changsheng: "长生",
      shensha: baziData.shensha,
      kongwang: "无",
      nayin: baziData.nayin,
    })
    setShowDetail(true)
  }

  // 时辰选项
  const hourOptions = [
    { value: "0", label: "子时 (23:00-01:00)" },
    { value: "1", label: "丑时 (01:00-03:00)" },
    { value: "3", label: "寅时 (03:00-05:00)" },
    { value: "5", label: "卯时 (05:00-07:00)" },
    { value: "7", label: "辰时 (07:00-09:00)" },
    { value: "9", label: "巳时 (09:00-11:00)" },
    { value: "11", label: "午时 (11:00-13:00)" },
    { value: "13", label: "未时 (13:00-15:00)" },
    { value: "15", label: "申时 (15:00-17:00)" },
    { value: "17", label: "酉时 (17:00-19:00)" },
    { value: "19", label: "戌时 (19:00-21:00)" },
    { value: "21", label: "亥时 (21:00-23:00)" },
  ]

  return (
    <PaipanLayout
      title="八字排盘"
      onBack={onBack}
      duanyu={displayMode !== "simple" ? duanyu : []}
      onAIAnalysis={onAIAnalysis}
      showModeSwitch={true}
      currentMode={displayMode}
      onModeChange={setDisplayMode}
    >
      {/* 输入区域 */}
      <div className="px-4 py-3 space-y-3">
        {/* 日期选择 */}
        <div className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span className="text-[#f5f5f7] text-sm">出生日期</span>
            <div className="flex-1" />
            <button
              onClick={() => setIsLunar(!isLunar)}
              className={`px-2 py-1 rounded text-xs ${isLunar ? "bg-[#d4af37] text-[#1a1a1a]" : "bg-[#333] text-[#888]"}`}
            >
              {isLunar ? "农历" : "公历"}
            </button>
          </div>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg px-3 py-2.5 text-[#f5f5f7] text-sm"
          />
        </div>

        {/* 时辰选择 */}
        <div className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]">
          <div className="flex items-center gap-2 mb-3">
            <Sun className="w-4 h-4 text-[#d4af37]" />
            <span className="text-[#f5f5f7] text-sm">出生时辰</span>
            <div className="flex-1" />
            <label className="flex items-center gap-1.5 text-xs text-[#888]">
              <input
                type="checkbox"
                checked={earlyZi}
                onChange={(e) => setEarlyZi(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-[#555]"
              />
              早子时
            </label>
          </div>
          <select
            value={birthHour}
            onChange={(e) => setBirthHour(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg px-3 py-2.5 text-[#f5f5f7] text-sm"
          >
            {hourOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* 性别和真太阳时 */}
        <div className="flex gap-3">
          <div className="flex-1 bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]">
            <div className="text-[#888] text-xs mb-2">性别</div>
            <div className="flex gap-2">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-2 rounded-lg text-sm ${gender === "male" ? "bg-[#4a90d9] text-white" : "bg-[#333] text-[#888]"}`}
              >
                男
              </button>
              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-2 rounded-lg text-sm ${gender === "female" ? "bg-[#c8102e] text-white" : "bg-[#333] text-[#888]"}`}
              >
                女
              </button>
            </div>
          </div>
          <div className="flex-1 bg-[#252525] rounded-xl p-4 border border-[#3a3a3a]">
            <div className="flex items-center gap-1 text-[#888] text-xs mb-2">
              <MapPin className="w-3 h-3" />
              真太阳时
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useTrueSolarTime}
                onChange={(e) => setUseTrueSolarTime(e.target.checked)}
                className="w-4 h-4 rounded border-[#555]"
              />
              <span className="text-[#c5c5c5] text-sm">启用校准</span>
            </label>
          </div>
        </div>
      </div>

      {/* 八字四柱表格 */}
      {baziData && (
        <div className="px-4 py-3">
          <div className="bg-[#252525] rounded-2xl border border-[#3a3a3a] overflow-hidden">
            {/* 表头 */}
            <div className="grid grid-cols-4 border-b border-[#3a3a3a]">
              {["年柱", "月柱", "日柱", "时柱"].map((label, i) => (
                <div key={label} className="py-2 text-center text-[#888] text-xs border-r border-[#3a3a3a] last:border-r-0">
                  {label}
                </div>
              ))}
            </div>

            {/* 十神行 */}
            {displayMode !== "simple" && (
              <div className="grid grid-cols-4 border-b border-[#3a3a3a]">
                {[baziData.year, baziData.month, baziData.day, baziData.hour].map((pillar, i) => (
                  <div key={i} className="py-2 text-center text-[#d4af37] text-xs border-r border-[#3a3a3a] last:border-r-0">
                    {pillar.shishen}
                  </div>
                ))}
              </div>
            )}

            {/* 天干行 */}
            <div className="grid grid-cols-4 border-b border-[#3a3a3a]">
              {[
                { pillar: "year", data: baziData.year },
                { pillar: "month", data: baziData.month },
                { pillar: "day", data: baziData.day },
                { pillar: "hour", data: baziData.hour },
              ].map(({ pillar, data }, i) => (
                <button
                  key={i}
                  onDoubleClick={() => handleCellPress(pillar, "gan")}
                  className="py-4 text-center border-r border-[#3a3a3a] last:border-r-0 hover:bg-[#2a2a2a] transition-colors"
                >
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: WUXING_COLORS[TIANGAN_WUXING[data.gan]] }}
                  >
                    {data.gan}
                  </span>
                </button>
              ))}
            </div>

            {/* 地支行 */}
            <div className="grid grid-cols-4 border-b border-[#3a3a3a]">
              {[
                { pillar: "year", data: baziData.year },
                { pillar: "month", data: baziData.month },
                { pillar: "day", data: baziData.day },
                { pillar: "hour", data: baziData.hour },
              ].map(({ pillar, data }, i) => (
                <button
                  key={i}
                  onDoubleClick={() => handleCellPress(pillar, "zhi")}
                  className="py-4 text-center border-r border-[#3a3a3a] last:border-r-0 hover:bg-[#2a2a2a] transition-colors"
                >
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: WUXING_COLORS[DIZHI_WUXING[data.zhi]] }}
                  >
                    {data.zhi}
                  </span>
                </button>
              ))}
            </div>

            {/* 藏干行 */}
            {displayMode !== "simple" && (
              <div className="grid grid-cols-4">
                {[baziData.year, baziData.month, baziData.day, baziData.hour].map((pillar, i) => (
                  <div key={i} className="py-2 text-center border-r border-[#3a3a3a] last:border-r-0">
                    <div className="flex justify-center gap-1">
                      {pillar.canggan.map((gan, j) => (
                        <span key={j} className="text-[#888] text-xs">{gan}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 纳音 */}
          <div className="mt-3 text-center">
            <span className="text-[#888] text-xs">纳音：</span>
            <span className="text-[#d4af37] text-sm ml-1">{baziData.nayin}</span>
          </div>
        </div>
      )}

      {/* 神煞列表 */}
      {displayMode === "detailed" && baziData && (
        <div className="px-4 py-3">
          <div className="text-[#888] text-xs mb-2">神煞</div>
          <div className="flex flex-wrap gap-2">
            {baziData.shensha.map((sha, i) => (
              <span key={i} className="px-3 py-1.5 bg-[#252525] rounded-lg text-[#c5c5c5] text-sm border border-[#3a3a3a]">
                {sha}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 断语区域 */}
      {displayMode !== "simple" && (
        <div className="px-4 py-3">
          <div className="text-[#888] text-xs mb-2">基础断语</div>
          <div className="space-y-2">
            {duanyu.slice(0, displayMode === "detailed" ? 5 : 2).map((text, i) => (
              <div key={i} className="p-3 bg-[#252525] rounded-xl border border-[#3a3a3a]">
                <p className="text-[#c5c5c5] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 详情弹窗 */}
      <DetailPopup
        visible={showDetail}
        onClose={() => setShowDetail(false)}
        title={detailTitle}
        data={detailData || {}}
        onViewTheory={() => {
          setShowDetail(false)
          // TODO: 跳转到学习页面
        }}
      />

      {/* 合规声明 */}
      <div className="px-4 py-3">
        <p className="text-[#888] text-[10px] text-center leading-relaxed">
          命理分析仅供参考，不应作为人生重大决策依据。
        </p>
      </div>
    </PaipanLayout>
  )
}
