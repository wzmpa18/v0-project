"use client"

import { useState } from "react"
import { Heart, Check, ChevronRight, RefreshCw, Apple, Dumbbell, Moon, Utensils } from "lucide-react"

const CONSTITUTION_TYPES = [
  {
    id: "peaceful",
    name: "平和体质",
    description: "身体阴阳平衡，气血调和",
    traits: ["面色红润", "精力充沛", "睡眠良好", "食欲正常"],
    color: "#22c55e",
    food: ["五谷杂粮均衡搭配", "多吃新鲜蔬菜水果", "饮食有节，不偏食"],
    exercise: ["太极拳", "八段锦", "散步", "游泳"],
    lifestyle: ["早睡早起，规律作息", "保持乐观心态", "适当社交活动"],
  },
  {
    id: "yang-deficient",
    name: "阳虚体质",
    description: "阳气不足，畏寒怕冷",
    traits: ["畏寒怕冷", "手脚冰凉", "精神不振", "大便稀溏"],
    color: "#3b82f6",
    food: ["羊肉、牛肉等温补食物", "生姜、肉桂、韭菜", "核桃、栗子等坚果", "少吃生冷寒凉食物"],
    exercise: ["太极拳", "日光浴", "快走", "慢跑"],
    lifestyle: ["注意保暖，尤其腹部和足部", "多晒太阳", "避免熬夜", "艾灸关元、命门穴"],
  },
  {
    id: "yin-deficient",
    name: "阴虚体质",
    description: "阴液不足，口干咽燥",
    traits: ["口干咽燥", "手足心热", "潮热盗汗", "大便干结"],
    color: "#ec4899",
    food: ["银耳、百合、梨等滋阴食物", "鸭肉、甲鱼", "枸杞、桑葚", "少吃辛辣燥热食物"],
    exercise: ["瑜伽", "太极拳", "八段锦", "游泳"],
    lifestyle: ["避免熬夜伤阴", "保持充足睡眠", "避免过度劳累", "可按摩太溪、三阴交穴"],
  },
  {
    id: "phlegm-damp",
    name: "痰湿体质",
    description: "体内痰湿积聚，身体沉重",
    traits: ["身体沉重", "腹部肥胖", "口黏痰多", "大便黏腻"],
    color: "#f59e0b",
    food: ["薏苡仁、赤小豆利湿", "冬瓜、白萝卜化痰", "陈皮、茯苓健脾", "少吃甜腻肥甘食物"],
    exercise: ["跑步", "游泳", "健身", "有氧运动"],
    lifestyle: ["保持居住环境干燥通风", "控制体重", "避免久坐", "可按摩丰隆、中脘穴"],
  },
  {
    id: "qi-stagnant",
    name: "气郁体质",
    description: "气机郁滞，情绪不畅",
    traits: ["情绪抑郁", "胸闷叹气", "失眠多梦", "敏感多疑"],
    color: "#8b5cf6",
    food: ["玫瑰花茶、茉莉花茶", "柑橘类水果", "小米、大麦", "少吃油腻难消化食物"],
    exercise: ["跑步", "舞蹈", "瑜伽", "登山"],
    lifestyle: ["多参加社交活动", "培养兴趣爱好", "学习冥想放松", "可按摩太冲、膻中穴"],
  },
  {
    id: "blood-stasis",
    name: "血瘀体质",
    description: "血液瘀滞，脉络不畅",
    traits: ["面色暗沉", "皮肤瘀斑", "痛经血块", "肢体麻木"],
    color: "#ef4444",
    food: ["山楂、黑木耳活血", "红糖、醋", "茄子、洋葱", "少吃寒凉食物"],
    exercise: ["有氧运动", "跳舞", "太极剑", "快走"],
    lifestyle: ["注意保暖防寒", "保持心情舒畅", "避免久坐不动", "可按摩血海、三阴交穴"],
  },
  {
    id: "special-diet",
    name: "特禀体质",
    description: "先天禀赋特殊，易过敏",
    traits: ["容易过敏", "皮肤瘙痒", "喷嚏频繁", "不耐寒热"],
    color: "#06b6d4",
    food: ["清淡饮食，避免过敏原", "蜂蜜、红枣增强体质", "新鲜蔬菜水果", "忌食海鲜发物等"],
    exercise: ["太极拳", "瑜伽", "慢走", "气功"],
    lifestyle: ["保持居住环境清洁", "避免接触过敏原", "增强体质", "可按摩足三里、关元穴"],
  },
]

export default function ConstitutionPage() {
  const [selectedConstitutions, setSelectedConstitutions] = useState<string[]>([])
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  const toggleConstitution = (id: string) => {
    setSelectedConstitutions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const handleSubmit = () => {
    const results = CONSTITUTION_TYPES.filter(c => selectedConstitutions.includes(c.id))
    setResult(results)
    setShowResult(true)
  }

  const handleReset = () => {
    setSelectedConstitutions([])
    setResult(null)
    setShowResult(false)
  }

  if (showResult && result && result.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-red-500 to-pink-600 pt-12 pb-6 px-4">
          <h1 className="text-2xl font-bold text-center text-white">体质辨识结果</h1>
          <p className="text-white/80 text-center text-sm mt-1">您的体质分析报告</p>
        </div>

        <div className="px-4 py-4 space-y-4 pb-8">
          {result.map((constitution: typeof CONSTITUTION_TYPES[0]) => (
            <div key={constitution.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5" style={{ backgroundColor: `${constitution.color}15` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${constitution.color}30` }}>
                    <Heart className="w-6 h-6" style={{ color: constitution.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: constitution.color }}>{constitution.name}</h3>
                    <p className="text-sm text-gray-500">{constitution.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {constitution.traits.map((trait, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-white text-gray-700">{trait}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Apple className="w-4 h-4" style={{ color: constitution.color }} />
                    <span className="font-medium text-gray-700">饮食建议</span>
                  </div>
                  <div className="space-y-1">
                    {constitution.food.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-1">•</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="w-4 h-4" style={{ color: constitution.color }} />
                    <span className="font-medium text-gray-700">运动建议</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {constitution.exercise.map((item, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">{item}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-4 h-4" style={{ color: constitution.color }} />
                    <span className="font-medium text-gray-700">生活建议</span>
                  </div>
                  <div className="space-y-1">
                    {constitution.lifestyle.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-purple-500 mt-1">•</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleReset}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            重新辨识
          </button>

          <div className="text-center text-gray-400 text-xs">
            提示：体质辨识仅供参考，不能替代专业医疗诊断
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-500 to-pink-600 pt-12 pb-6 px-4">
        <h1 className="text-2xl font-bold text-center text-white">体质辨识</h1>
        <p className="text-white/80 text-center text-sm mt-1">了解您的体质类型</p>
      </div>

      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <p className="text-gray-600 text-sm">
            请根据您的身体状况，选择最符合您的体质特征（可多选）：
          </p>
        </div>

        {CONSTITUTION_TYPES.map((constitution) => (
          <div
            key={constitution.id}
            onClick={() => toggleConstitution(constitution.id)}
            className={`bg-white rounded-2xl shadow-sm p-4 mb-3 cursor-pointer transition-all ${
              selectedConstitutions.includes(constitution.id)
                ? "ring-2 ring-offset-2"
                : ""
            }`}
            style={{
              ringColor: selectedConstitutions.includes(constitution.id) ? constitution.color : "transparent",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: selectedConstitutions.includes(constitution.id) ? `${constitution.color}15` : "#f3f4f6",
                }}
              >
                {selectedConstitutions.includes(constitution.id) ? (
                  <Check className="w-5 h-5" style={{ color: constitution.color }} />
                ) : (
                  <Heart className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3
                    className="font-bold"
                    style={{ color: selectedConstitutions.includes(constitution.id) ? constitution.color : "#374151" }}
                  >
                    {constitution.name}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm mt-1">{constitution.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {constitution.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${constitution.color}10`,
                        color: constitution.color,
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={selectedConstitutions.length === 0}
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-3 rounded-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          提交辨识
        </button>

        <div className="text-center text-gray-400 text-xs mt-4">
          提示：体质辨识仅供参考，不能替代专业医疗诊断
        </div>
      </div>
    </div>
  )
}