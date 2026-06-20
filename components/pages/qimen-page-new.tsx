"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import { Solar, Lunar } from "lunar-javascript"
import {
  TIAN_GAN, DI_ZHI, JIU_GONG, BA_MEN, JIU_XING, BA_SHEN,
  calculateQimenPan, getDayGanZhi
} from "@/lib/qimen-data"

// 九宫顺序（按照排盘布局）
// 巽4 离9 坤2
// 震3 中5 兑7
// 艮8 坎1 乾6

const GONG_POSITIONS = [
  { num: 4, name: "巽", position: "东南" },
  { num: 9, name: "离", position: "南" },
  { num: 2, name: "坤", position: "西南" },
  { num: 3, name: "震", position: "东" },
  { num: 5, name: "中", position: "中" },
  { num: 7, name: "兑", position: "西" },
  { num: 8, name: "艮", position: "东北" },
  { num: 1, name: "坎", position: "北" },
  { num: 6, name: "乾", position: "西北" },
]

// 获取宫位颜色
const getGongColor = (num: number): string => {
  const colors: Record<number, string> = {
    1: "text-blue-600",   // 坎一宫 水
    2: "text-yellow-700", // 坤二宫 土
    3: "text-green-600",  // 震三宫 木
    4: "text-green-700",  // 巽四宫 木
    5: "text-amber-700",  // 中五宫 土
    6: "text-gray-600",   // 乾六宫 金
    7: "text-gray-500",   // 兑七宫 金
    8: "text-yellow-600", // 艮八宫 土
    9: "text-red-600",    // 离九宫 火
  }
  return colors[num] || "text-gray-700"
}

interface QimenPageStandaloneProps {
  onBack?: () => void
}

export function QimenPageStandalone({ onBack }: QimenPageStandaloneProps) {
  const [activeTab, setActiveTab] = useState<"input" | "result">("input")
  const [resultTab, setResultTab] = useState<"pan" | "geju" | "guji" | "yanxi">("pan")
  
  // 输入表单
  const [questionContent, setQuestionContent] = useState("")
  const [panType, setPanType] = useState<"maoshan" | "huizhi">("maoshan")
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(6)
  const [day, setDay] = useState(21)
  const [hour, setHour] = useState(0)
  const [useTrueSun, setUseTrueSun] = useState(false)
  
  // 计算结果
  const [panResult, setPanResult] = useState<any>(null)

  // 获取农历/干支信息
  const getGanZhiInfo = () => {
    const solar = Solar.fromYmd(year, month, day)
    const lunar = solar.getLunar()
    
    // 日干支
    const dayGZ = getDayGanZhi(new Date(year, month - 1, day))
    
    // 时干支（简化）
    const shiChenIndex = Math.floor(hour / 2) % 12
    const dayGanIndex = TIAN_GAN.indexOf(dayGZ.gan)
    const shiGanStart = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8][dayGanIndex % 10]
    const shiGan = TIAN_GAN[(shiGanStart + shiChenIndex) % 10]
    const shiZhi = DI_ZHI[shiChenIndex]
    
    return {
      yearGan: lunar.getYearGan(),
      yearZhi: lunar.getYearZhi(),
      monthGan: lunar.getMonthGan(),
      monthZhi: lunar.getMonthZhi(),
      dayGan: dayGZ.gan,
      dayZhi: dayGZ.zhi,
      shiGan,
      shiZhi,
    }
  }

  // 执行起局
  const doQiJu = () => {
    // 使用现有的奇门遁甲算法
    const date = new Date(year, month - 1, day, hour)
    const result = calculateQimenPan(date)
    
    const gz = getGanZhiInfo()
    
    // 构建九宫信息（根据转盘规则）
    const palaces = buildQimenPalaces(result, gz)
    
    setPanResult({
      ...result,
      palaces,
      gz,
    })
    setActiveTab("result")
  }

  // 即时起局
  const doNowQiJu = () => {
    const now = new Date()
    setYear(now.getFullYear())
    setMonth(now.getMonth() + 1)
    setDay(now.getDate())
    setHour(now.getHours())
    setTimeout(doQiJu, 0)
  }

  // 构建奇门九宫
  const buildQimenPalaces = (baseResult: any, gz: any) => {
    // 根据阳遁/阴遁局数来排布三奇六仪
    const isYangDun = baseResult.type === "阳遁" || baseResult.dunType === "阳遁"
    const juShu = baseResult.ju || baseResult.juShu || 1
    
    // 三奇六仪顺序：戊己庚辛壬癸丁丙乙
    const sanQiLiuYi = ["戊", "己", "庚", "辛", "壬", "癸", "丁", "丙", "乙"]
    
    // 地盘三奇六仪位置（根据洛书）
    // 简化的排布：根据局数确定起始位置
    let tianPaiMap: Record<number, string> = {}
    
    // 阳遁顺排，阴遁逆排
    const basePositions = isYangDun 
      ? [1, 8, 3, 4, 9, 2, 7, 6, 5]  // 阳遁宫位顺序
      : [9, 4, 3, 8, 1, 6, 7, 2, 5]  // 阴遁宫位顺序（简化）
    
    for (let i = 0; i < 9; i++) {
      const palaceNum = basePositions[i]
      tianPaiMap[palaceNum] = sanQiLiuYi[i]
    }
    
    // 八门原始位置
    const menBase = {
      1: "休门",
      2: "死门",
      3: "伤门",
      4: "杜门",
      9: "景门",
      7: "惊门",
      6: "开门",
      8: "生门",
      5: "死门",
    }
    
    // 九星原始位置
    const xingBase = {
      1: "天蓬",
      2: "天芮",
      3: "天冲",
      4: "天辅",
      9: "天英",
      7: "天柱",
      6: "天心",
      8: "天任",
      5: "天禽",
    }
    
    // 八神
    const shenBaseYang = ["值符", "螣蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天", "-"]
    const shenBaseYin = ["值符", "九天", "九地", "玄武", "白虎", "六合", "太阴", "螣蛇", "-"]
    const shenBase = isYangDun ? shenBaseYang : shenBaseYin
    
    // 值符/值使宫位
    const zhiFuGong = baseResult.zhiFuGong || 1
    const zhiShiGong = baseResult.zhiShiGong || 1
    const valueXing = baseResult.zhiFu || "天蓬"
    const valueMen = baseResult.zhiShi || "休门"
    
    // 根据值符值使位置进行旋转（简化）
    const palaces = GONG_POSITIONS.map(pos => {
      // 简化的星门神排布逻辑
      const tianGan = tianPaiMap[pos.num] || "戊"
      const men = menBase[pos.num as keyof typeof menBase] || "休门"
      const xing = xingBase[pos.num as keyof typeof xingBase] || "天蓬"
      const shen = shenBase[pos.num - 1] || "-"
      
      return {
        number: pos.num,
        name: pos.name,
        position: pos.position,
        tianGan: tianGan,      // 天盘干
        diGan: tianPaiMap[(pos.num % 9) + 1] || "戊",  // 地盘干（简化）
        men: men,              // 八门
        xing: xing,            // 九星
        shen: shen,            // 八神
        isZhiFu: pos.num === zhiFuGong,
        isZhiShi: pos.num === zhiShiGong,
        isValueXing: xing === valueXing,
        isValueMen: men === valueMen,
      }
    })
    
    return palaces
  }

  // 输入表单
  const renderInputForm = () => (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <span className="font-bold text-gray-800">奇门遁甲</span>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-4">
        {/* 问事内容 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-700 mb-2">问事内容（选填）</div>
          <textarea
            value={questionContent}
            onChange={(e) => setQuestionContent(e.target.value)}
            placeholder="请输入您想问的事..."
            className="w-full p-3 border rounded-lg text-sm text-gray-700 outline-none resize-none h-20"
          />
        </div>

        {/* 起局方式 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-700 mb-3">起局方式</div>
          <div className="flex gap-3">
            <button
              onClick={() => setPanType("maoshan")}
              className={`flex-1 py-3 rounded-lg text-sm border ${
                panType === "maoshan" 
                  ? "bg-red-500 text-white border-red-500 font-medium" 
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              时家茅山转盘
            </button>
            <button
              onClick={() => setPanType("huizhi")}
              className={`flex-1 py-3 rounded-lg text-sm border ${
                panType === "huizhi" 
                  ? "bg-red-500 text-white border-red-500 font-medium" 
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              时家阴盘奇门
            </button>
          </div>
        </div>

        {/* 日期时间选择 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-700 mb-3">日期时间</div>
          
          {/* 年 */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">年</span>
              <span className="text-sm text-gray-700">{year}年</span>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {Array.from({ length: 10 }, (_, i) => year - 5 + i).map(y => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                    y === year 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
          
          {/* 月 */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">月</span>
              <span className="text-sm text-gray-700">{month}月</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <button
                  key={m}
                  onClick={() => setMonth(m)}
                  className={`py-2 rounded-lg text-sm ${
                    m === month 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          
          {/* 日 */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">日</span>
              <span className="text-sm text-gray-700">{day}日</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={`py-2 rounded-lg text-sm ${
                    d === day 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          
          {/* 时 */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">时</span>
              <span className="text-sm text-gray-700">{DI_ZHI[Math.floor(hour / 2) % 12]}时 ({hour}时)</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {DI_ZHI.map((zhi, i) => {
                const h = i * 2
                return (
                  <button
                    key={zhi}
                    onClick={() => setHour(h)}
                    className={`py-2 rounded-lg text-sm ${
                      Math.floor(hour / 2) % 12 === i
                        ? "bg-red-500 text-white" 
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {zhi}
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* 真太阳时 */}
          <div className="flex justify-between items-center pt-3 border-t">
            <div>
              <span className="text-sm text-gray-700">真太阳时</span>
              <div className="text-xs text-gray-400 mt-0.5">根据出生地经度校正时间</div>
            </div>
            <button
              onClick={() => setUseTrueSun(!useTrueSun)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                useTrueSun ? "bg-red-500" : "bg-gray-300"
              }`}
            >
              <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${
                useTrueSun ? "left-6" : "left-1"
              }`} />
            </button>
          </div>
        </div>

        {/* 当前日期显示 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">起局时间</div>
            <div className="text-lg font-bold text-gray-800">
              {year}年{month}月{day}日 {DI_ZHI[Math.floor(hour / 2) % 12]}时
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {(() => {
                const gz = getGanZhiInfo()
                return `${gz.yearGan}${gz.yearZhi}年 ${gz.monthGan}${gz.monthZhi}月 ${gz.dayGan}${gz.dayZhi}日 ${gz.shiGan}${gz.shiZhi}时`
              })()}
            </div>
          </div>
        </div>

        {/* 起局按钮 */}
        <button
          onClick={doQiJu}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl text-lg font-medium shadow-md"
        >
          起 局
        </button>

        {/* 即时起局 */}
        <button
          onClick={doNowQiJu}
          className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-base"
        >
          即时起局（现在）
        </button>
      </div>
    </div>
  )

  // 渲染九宫格
  const renderJiuGongGrid = () => {
    if (!panResult?.palaces) return null
    
    // 九宫格布局
    // 巽4 离9 坤2
    // 震3 中5 兑7
    // 艮8 坎1 乾6
    
    const gridLayout = [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6],
    ]
    
    return (
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="grid grid-cols-3 gap-1.5">
          {gridLayout.flat().map((gongNum, i) => {
            const palace = panResult.palaces.find((p: any) => p.number === gongNum)
            if (!palace) return null
            
            const isZhiFu = palace.isZhiFu || false
            const isZhiShi = palace.isZhiShi || false
            
            return (
              <div
                key={i}
                className={`border rounded-lg p-2 min-h-[110px] transition-all ${
                  isZhiFu || isZhiShi 
                    ? "bg-amber-50 border-amber-300" 
                    : palace.number === 5
                    ? "bg-yellow-50 border-yellow-200"
                    : "border-gray-200 bg-white"
                }`}
              >
                {/* 宫位标题 */}
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-green-600 font-medium">{palace.tianGan}</span>
                  <span className={`font-bold ${getGongColor(palace.number)}`}>
                    {palace.name}{palace.number}宫
                  </span>
                  <span className="text-gray-400">{palace.position}</span>
                </div>
                
                {/* 八神 */}
                <div className="text-center text-xs text-purple-600 mb-0.5">
                  {palace.shen !== "-" ? palace.shen : ""}
                </div>
                
                {/* 九星 */}
                <div className="text-center text-xs text-green-700 mb-0.5">
                  {palace.xing}
                </div>
                
                {/* 天干（大） */}
                <div className="text-center text-lg font-bold text-gray-800 mb-0.5">
                  {palace.tianGan}
                </div>
                
                {/* 八门 */}
                <div className="text-center text-xs text-blue-600">
                  {palace.men}
                </div>
                
                {/* 值符/值使标记 */}
                {(isZhiFu || isZhiShi) && (
                  <div className="text-center text-xs text-amber-600 font-medium mt-0.5">
                    {isZhiFu ? "值符" : "值使"}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // 宫位详解弹窗内容
  const renderGongDetail = (palace: any) => {
    return (
      <div className="space-y-3 p-4">
        <div className="text-center">
          <div className={`text-xl font-bold ${getGongColor(palace.number)}`}>
            {palace.name}{palace.number}宫
          </div>
          <div className="text-sm text-gray-500 mt-1">方位：{palace.position}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-purple-50 rounded-lg p-2 text-center">
            <div className="text-xs text-purple-500">八神</div>
            <div className="font-bold text-purple-700">{palace.shen !== "-" ? palace.shen : "无"}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <div className="text-xs text-green-500">九星</div>
            <div className="font-bold text-green-700">{palace.xing}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500">天盘干</div>
            <div className="font-bold text-gray-800">{palace.tianGan}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <div className="text-xs text-blue-500">八门</div>
            <div className="font-bold text-blue-700">{palace.men}</div>
          </div>
        </div>
        
        {palace.isZhiFu && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
            <div className="font-bold text-amber-700 mb-1">值符宫位</div>
            <div className="text-gray-600">此宫为值符所在，主事之源，代表事物的核心和趋势</div>
          </div>
        )}
        
        {palace.isZhiShi && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
            <div className="font-bold text-amber-700 mb-1">值使宫位</div>
            <div className="text-gray-600">此宫为值使所在，主事之行，代表事物的执行和发展</div>
          </div>
        )}
      </div>
    )
  }

  // 结果页面
  const renderResult = () => {
    if (!panResult) return null
    
    const isYangDun = panResult.type === "阳遁" || panResult.dunType === "阳遁"
    
    return (
      <div className="min-h-screen bg-gray-100 pb-16">
        {/* 顶部导航 */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <button onClick={() => setActiveTab("input")} className="p-1">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <span className="font-bold text-gray-800">奇门遁甲</span>
          <button onClick={doNowQiJu} className="p-1 text-gray-500 text-sm">
            起局
          </button>
        </div>

        {/* 四柱信息 */}
        <div className="p-4 pb-2 space-y-3">
          {/* 四柱 */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="grid grid-cols-4 text-center">
              <div>
                <div className="text-xs text-gray-400">年</div>
                <div className="text-lg font-bold text-gray-800">
                  {panResult.gz.yearGan}{panResult.gz.yearZhi}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">月</div>
                <div className="text-lg font-bold text-gray-800">
                  {panResult.gz.monthGan}{panResult.gz.monthZhi}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">日</div>
                <div className="text-lg font-bold text-gray-800">
                  {panResult.gz.dayGan}{panResult.gz.dayZhi}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">时</div>
                <div className="text-lg font-bold text-gray-800">
                  {panResult.gz.shiGan}{panResult.gz.shiZhi}
                </div>
              </div>
            </div>
          </div>

          {/* 局数信息 */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xs text-gray-400">遁向</div>
                <div className="text-base font-bold text-gray-800">
                  {isYangDun ? "阳遁" : "阴遁"}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">局数</div>
                <div className="text-base font-bold text-red-600">
                  {panResult.ju || panResult.juShu || 1}局
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">旬空</div>
                <div className="text-base font-bold text-gray-700">
                  {panResult.xunKong || "戌亥"}
                </div>
              </div>
            </div>
            
            {/* 值符值使 */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t text-center text-sm">
              <div>
                <span className="text-gray-500">值符：</span>
                <span className="text-amber-700 font-medium">
                  {panResult.zhiFu || "天蓬"}
                </span>
                <span className="text-gray-400">
                  （{panResult.zhiFuGong || 1}宫）
                </span>
              </div>
              <div>
                <span className="text-gray-500">值使：</span>
                <span className="text-amber-700 font-medium">
                  {panResult.zhiShi || "休门"}
                </span>
                <span className="text-gray-400">
                  （{panResult.zhiShiGong || 1}宫）
                </span>
              </div>
            </div>
          </div>

          {/* 九宫排盘 */}
          {renderJiuGongGrid()}

          {/* 马星 / 空亡 */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="text-sm font-bold text-gray-800 mb-2">空亡与马星</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-500 mb-1">日空亡</div>
                <div className="font-bold text-gray-800">申酉空</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-500 mb-1">马星</div>
                <div className="font-bold text-red-600">寅 马</div>
              </div>
            </div>
          </div>

          {/* 宫位详解 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-sm font-bold text-gray-800 mb-3">九宫详解</div>
            <div className="space-y-3">
              {panResult.palaces?.map((palace: any) => (
                <div
                  key={palace.number}
                  className={`border rounded-lg p-3 ${
                    palace.isZhiFu || palace.isZhiShi
                      ? "bg-amber-50 border-amber-200"
                      : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-bold ${getGongColor(palace.number)}`}>
                      {palace.name}{palace.number}宫（{palace.position}）
                    </span>
                    {(palace.isZhiFu || palace.isZhiShi) && (
                      <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                        {palace.isZhiFu ? "值符" : "值使"}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-xs text-center">
                    <div>
                      <span className="text-purple-500">神</span>
                      <div className="font-medium text-purple-700">{palace.shen !== "-" ? palace.shen : "-"}</div>
                    </div>
                    <div>
                      <span className="text-green-500">星</span>
                      <div className="font-medium text-green-700">{palace.xing}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">干</span>
                      <div className="font-medium text-gray-800">{palace.tianGan}</div>
                    </div>
                    <div>
                      <span className="text-blue-500">门</span>
                      <div className="font-medium text-blue-700">{palace.men}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部标签栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="flex">
            {[
              { id: "pan", label: "局式" },
              { id: "geju", label: "多局" },
              { id: "guji", label: "研习" },
              { id: "yanxi", label: "案例" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setResultTab(tab.id as any)}
                className={`flex-1 py-3 text-sm ${resultTab === tab.id ? "text-red-600 font-medium border-t-2 border-red-600 -mt-0.5" : "text-gray-500"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return activeTab === "input" ? renderInputForm() : renderResult()
}
