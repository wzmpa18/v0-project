"use client"

import { useState } from "react"
import { Link2, Sparkles, Info, Clock } from "lucide-react"

const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

const QIMEN_PALACES = ["坎一宫", "坤二宫", "震三宫", "巽四宫", "中五宫", "乾六宫", "兑七宫", "艮八宫", "离九宫"]

const LIUREN_DINGSHI = ["贵人", "螣蛇", "朱雀", "六合", "勾陈", "青龙", "天空", "白虎", "太常", "玄武", "太阴", "天后"]

export default function QiMenChuanPage() {
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateQiMenChuan = () => {
    if (!birthDate || !birthTime) {
      alert("请输入出生日期和时间")
      return
    }

    const [year, month, day] = birthDate.split('-').map(Number)
    const [hour] = birthTime.split(':').map(Number)

    const total = year + month + day + hour
    const qimenIndex = total % 9
    const liurenIndex = total % 12

    const qimenPalace = QIMEN_PALACES[qimenIndex]
    const liurenTianjiang = LIUREN_DINGSHI[liurenIndex]

    const dayGanIndex = (year + month + day) % 10
    const dayGan = TIANGAN[dayGanIndex]

    const hourZhiIndex = hour % 12
    const hourZhi = DIZHI[hourZhiIndex]

    const analysis = generateAnalysis(qimenPalace, liurenTianjiang, dayGan, hourZhi)

    setResult({
      birthDate,
      birthTime,
      qimenPalace,
      liurenTianjiang,
      dayGan,
      hourZhi,
      analysis,
    })
  }

  const generateAnalysis = (palace: string, tianjiang: string, dayGan: string, hourZhi: string) => {
    const analysis: string[] = []

    analysis.push(`奇门落${palace}，${getPalaceDescription(palace)}`)
    analysis.push(`六壬天将为${tianjiang}，${getTianjiangDescription(tianjiang)}`)
    analysis.push(`日干${dayGan}，${getGanDescription(dayGan)}`)
    analysis.push(`时支${hourZhi}，${getZhiDescription(hourZhi)}`)

    return analysis
  }

  const getPalaceDescription = (palace: string) => {
    const descriptions: Record<string, string> = {
      "坎一宫": "北方水，主智慧、流动",
      "坤二宫": "西南土，主柔顺、包容",
      "震三宫": "东方木，主行动、震动",
      "巽四宫": "东南木，主风、进退",
      "中五宫": "中央土，主稳定、汇聚",
      "乾六宫": "西北金，主刚健、尊贵",
      "兑七宫": "西方金，主口舌、喜悦",
      "艮八宫": "东北土，主静止、阻碍",
      "离九宫": "南方火，主光明、文采",
    }
    return descriptions[palace] || ""
  }

  const getTianjiangDescription = (tianjiang: string) => {
    const descriptions: Record<string, string> = {
      "贵人": "主贵人相助，诸事顺遂",
      "螣蛇": "主虚惊怪异，虚虚实实",
      "朱雀": "主文书口舌，信息传递",
      "六合": "主和合喜庆，婚姻合作",
      "勾陈": "主田土牢狱，迟滞不动",
      "青龙": "主财喜文书，吉庆之事",
      "天空": "主空亡虚诈，事多不成",
      "白虎": "主血光丧服，凶事降临",
      "太常": "主酒食宴会，衣冠礼仪",
      "玄武": "主盗贼遗失，阴谋暗昧",
      "太阴": "主阴私暗昧，妇女之事",
      "天后": "主阴私之事，妇人之象",
    }
    return descriptions[tianjiang] || ""
  }

  const getGanDescription = (gan: string) => {
    const descriptions: Record<string, string> = {
      "甲": "甲木参天，主旺盛之气",
      "乙": "乙木柔和，主仁慈之心",
      "丙": "丙火光明，主智慧显露",
      "丁": "丁火温暖，主文雅之气",
      "戊": "戊土厚重，主稳重踏实",
      "己": "己土柔顺，主包容之心",
      "庚": "庚金锐利，主果断决策",
      "辛": "辛金秀气，主精致细腻",
      "壬": "壬水流动，主灵活变通",
      "癸": "癸水滋润，主智慧深沉",
    }
    return descriptions[gan] || ""
  }

  const getZhiDescription = (zhi: string) => {
    const descriptions: Record<string, string> = {
      "子": "主水旺，智慧流动",
      "丑": "主土湿，收藏万物",
      "寅": "主木旺，生机盎然",
      "卯": "主木盛，阳气上升",
      "辰": "主土湿，万物萌芽",
      "巳": "主火旺，阳气鼎盛",
      "午": "主火极，阳光普照",
      "未": "主土暖，万物成熟",
      "申": "主金旺，肃杀之气",
      "酉": "主金盛，收获之时",
      "戌": "主土燥，万物收藏",
      "亥": "主水旺，万物归根",
    }
    return descriptions[zhi] || ""
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-400">奇门穿壬</h1>
            <p className="text-xs text-slate-200/60">奇门与六壬结合</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-slate-900/40 to-slate-950/60 rounded-xl p-4 border border-slate-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-200/80 mb-2 block">出生日期</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-500/50"
              />
            </div>

            <div>
              <label className="text-sm text-slate-200/80 mb-2 block">出生时间</label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-500/50"
              />
            </div>

            <button
              onClick={calculateQiMenChuan}
              disabled={!birthDate || !birthTime}
              className="w-full bg-gradient-to-r from-slate-600 to-gray-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              综合分析
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-slate-900/40 to-slate-950/60 rounded-xl p-4 border border-slate-800/30">
              <h3 className="text-sm font-medium text-slate-400 mb-4">奇门穿壬分析</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">奇门宫位</div>
                  <div className="text-xl font-bold text-white">{result.qimenPalace}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">六壬天将</div>
                  <div className="text-xl font-bold text-white">{result.liurenTianjiang}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">日干</div>
                  <div className="text-xl font-bold text-white">{result.dayGan}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">时支</div>
                  <div className="text-xl font-bold text-white">{result.hourZhi}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-medium text-purple-400 mb-3">综合解读</h3>
              <div className="space-y-2">
                {result.analysis.map((text: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span className="text-sm text-purple-100/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">奇门穿壬简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            奇门穿壬是一种将奇门遁甲与大六壬相结合的高级预测方法。
            它综合了奇门的时空模型和六壬的神将系统，通过分析奇门宫位、六壬天将、日干时支等要素，
            来进行更为精准的吉凶判断。这种方法融合了两种术数的优点，是一种非常高级的预测技术。
          </p>
        </div>
      </main>
    </div>
  )
}