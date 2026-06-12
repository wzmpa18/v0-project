"use client"

import { useState } from "react"
import { MessageSquare, Sparkles, Shuffle, Info } from "lucide-react"

const KONGMING_SIGNS = [
  {
    number: 1,
    name: "乾为天",
    gua: "☰",
    description: "大吉之卦，主贵人相助，事业有成",
    interpretation: "飞龙在天，利见大人。占得此卦，诸事顺遂，财运亨通，宜积极进取。",
  },
  {
    number: 2,
    name: "坤为地",
    gua: "☷",
    description: "吉卦，主厚德载物，安居乐业",
    interpretation: "地势坤，君子以厚德载物。占得此卦，宜静不宜动，守成待时。",
  },
  {
    number: 3,
    name: "水雷屯",
    gua: "☳☵",
    description: "平卦，主初始艰难，需耐心等待",
    interpretation: "屯者，物之始生也。占得此卦，凡事初起困难，需坚韧不拔，终能成功。",
  },
  {
    number: 4,
    name: "山水蒙",
    gua: "☵☶",
    description: "平卦，主蒙昧不明，宜求学问道",
    interpretation: "蒙以养正，圣功也。占得此卦，宜虚心学习，破除迷惑。",
  },
  {
    number: 5,
    name: "水天需",
    gua: "☰☵",
    description: "吉卦，主等待时机，必有收获",
    interpretation: "需者，待也。占得此卦，宜耐心等待，时机成熟自然成功。",
  },
  {
    number: 6,
    name: "天水讼",
    gua: "☵☰",
    description: "凶卦，主争讼是非，宜谨慎处事",
    interpretation: "讼者，争也。占得此卦，宜避免争端，以和为贵。",
  },
  {
    number: 7,
    name: "地水师",
    gua: "☳☷",
    description: "吉卦，主得人相助，众志成城",
    interpretation: "师者，众也。占得此卦，宜团结众人，共同成事。",
  },
  {
    number: 8,
    name: "水地比",
    gua: "☷☵",
    description: "吉卦，主亲比和合，人际关系良好",
    interpretation: "比者，比也。占得此卦，宜广结善缘，多得助力。",
  },
  {
    number: 9,
    name: "风天小畜",
    gua: "☰☴",
    description: "平卦，主小有积蓄，不宜贪多",
    interpretation: "小畜，柔得位而上下应之。占得此卦，宜积少成多，稳步前进。",
  },
  {
    number: 10,
    name: "天泽履",
    gua: "☱☰",
    description: "吉卦，主履行正道，吉祥如意",
    interpretation: "履道坦坦，幽人贞吉。占得此卦，宜循规蹈矩，稳步前行。",
  },
  {
    number: 11,
    name: "地天泰",
    gua: "☰☷",
    description: "大吉之卦，主否极泰来，诸事顺遂",
    interpretation: "泰，小往大来，吉亨。占得此卦，否极泰来，万事如意。",
  },
  {
    number: 12,
    name: "天地否",
    gua: "☷☰",
    description: "凶卦，主闭塞不通，诸事不顺",
    interpretation: "否之匪人，不利君子贞。占得此卦，宜守正待时，切勿妄动。",
  },
  {
    number: 13,
    name: "天火同人",
    gua: "☰☲",
    description: "吉卦，主与人合作，志同道合",
    interpretation: "同人于野，亨。占得此卦，宜与人合作，共创大业。",
  },
  {
    number: 14,
    name: "火天大有",
    gua: "☲☰",
    description: "大吉之卦，主富有丰盛，收获颇丰",
    interpretation: "大有，元亨。占得此卦，财源广进，事业兴旺。",
  },
  {
    number: 15,
    name: "地山谦",
    gua: "☶☷",
    description: "吉卦，主谦虚待人，必得福报",
    interpretation: "谦谦君子，卑以自牧也。占得此卦，宜谦虚谨慎，必有福报。",
  },
  {
    number: 16,
    name: "雷地豫",
    gua: "☷☳",
    description: "吉卦，主安乐喜悦，诸事称心",
    interpretation: "豫，利建侯行师。占得此卦，宜顺势而为，乐享其成。",
  },
  {
    number: 17,
    name: "泽雷随",
    gua: "☳☱",
    description: "吉卦，主随顺时势，自然得利",
    interpretation: "随，元亨利贞，无咎。占得此卦，宜顺势而为，水到渠成。",
  },
  {
    number: 18,
    name: "山风蛊",
    gua: "☴☶",
    description: "凶卦，主腐败滋生，需整治革新",
    interpretation: "蛊，元亨，利涉大川。占得此卦，宜除旧布新，整顿内部。",
  },
  {
    number: 19,
    name: "地泽临",
    gua: "☱☷",
    description: "吉卦，主临事决断，领导众人",
    interpretation: "临，元亨利贞。占得此卦，宜展现领导才能，造福众人。",
  },
  {
    number: 20,
    name: "风地观",
    gua: "☷☴",
    description: "平卦，主观察审视，明辨是非",
    interpretation: "观，盥而不荐，有孚颙若。占得此卦，宜静观其变，明辨是非。",
  },
]

export default function KongMingPage() {
  const [question, setQuestion] = useState("")
  const [selectedSign, setSelectedSign] = useState<number | null>(null)
  const [randomSign, setRandomSign] = useState<typeof KONGMING_SIGNS[0] | null>(null)

  const drawSign = () => {
    if (!question.trim()) {
      alert("请输入您要问的问题")
      return
    }
    
    const randomIndex = Math.floor(Math.random() * KONGMING_SIGNS.length)
    setRandomSign(KONGMING_SIGNS[randomIndex])
  }

  const selectSign = (number: number) => {
    setSelectedSign(selectedSign === number ? null : number)
    const sign = KONGMING_SIGNS.find(s => s.number === number)
    if (sign) {
      setRandomSign(sign)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white pb-20">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sky-400">孔明神卦</h1>
            <p className="text-xs text-sky-200/60">诸葛武侯 · 灵感神数</p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="bg-gradient-to-br from-sky-900/40 to-sky-950/60 rounded-xl p-4 border border-sky-800/30 mb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-sky-200/80 mb-2 block">您的问题</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="请输入您想占卜的问题..."
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none"
              />
            </div>

            <button
              onClick={drawSign}
              disabled={!question.trim()}
              className="w-full bg-gradient-to-r from-sky-600 to-blue-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              摇卦占卜
            </button>
          </div>
        </div>

        {randomSign && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-xl p-5 border border-amber-800/30">
              <div className="text-center">
                <div className="text-sm text-amber-200/70 mb-2">第 {randomSign.number} 签</div>
                <div className="text-4xl mb-2">{randomSign.gua}</div>
                <div className="text-2xl font-bold text-white mb-1">{randomSign.name}</div>
                <div className="text-sm text-amber-300">{randomSign.description}</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-4 border border-purple-800/30">
              <h3 className="text-sm font-medium text-purple-400 mb-3">签文解读</h3>
              <p className="text-sm text-purple-100/80 leading-relaxed">
                {randomSign.interpretation}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-sky-400">神卦列表</h3>
            <button
              onClick={() => {
                setQuestion("")
                setRandomSign(null)
                setSelectedSign(null)
              }}
              className="text-sm text-gray-400 flex items-center gap-1"
            >
              <Shuffle className="w-4 h-4" />
              重置
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {KONGMING_SIGNS.map((sign) => (
              <button
                key={sign.number}
                onClick={() => selectSign(sign.number)}
                className={`p-3 rounded-lg text-center transition-all ${
                  selectedSign === sign.number
                    ? "bg-sky-900/40 border border-sky-700/30"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="text-lg mb-1">{sign.gua}</div>
                <div className="text-xs text-white">#{sign.number}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-br from-amber-900/30 to-amber-950/50 rounded-xl p-4 border border-amber-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">诸葛神数简介</span>
          </div>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            诸葛神数又称武侯灵感神数，相传为三国时期诸葛亮所创。共有100签，
            每签对应一卦，卦辞皆出自《周易》。占卜时诚心祈祷，随意抽取一签，
            根据签文可判断吉凶祸福。此神数灵验异常，流传至今，深受世人推崇。
          </p>
        </div>
      </main>
    </div>
  )
}