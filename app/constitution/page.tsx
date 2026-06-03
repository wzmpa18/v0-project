"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, Check, ChevronRight } from "lucide-react"

const CONSTITUTION_TYPES = [
  {
    id: "peaceful",
    name: "平和体质",
    description: "身体阴阳平衡，气血调和",
    traits: ["面色红润", "精力充沛", "睡眠良好", "食欲正常"],
    color: "#22c55e",
    icon: Heart,
  },
  {
    id: "yang-deficient",
    name: "阳虚体质",
    description: "阳气不足，畏寒怕冷",
    traits: ["畏寒怕冷", "手脚冰凉", "精神不振", "大便稀溏"],
    color: "#3b82f6",
    icon: Heart,
  },
  {
    id: "yin-deficient",
    name: "阴虚体质",
    description: "阴液不足，口干咽燥",
    traits: ["口干咽燥", "手足心热", "潮热盗汗", "大便干结"],
    color: "#ec4899",
    icon: Heart,
  },
  {
    id: "phlegm-damp",
    name: "痰湿体质",
    description: "体内痰湿积聚，身体沉重",
    traits: ["身体沉重", "腹部肥胖", "口黏痰多", "大便黏腻"],
    color: "#f59e0b",
    icon: Heart,
  },
  {
    id: "qi-stagnant",
    name: "气郁体质",
    description: "气机郁滞，情绪不畅",
    traits: ["情绪抑郁", "胸闷叹气", "失眠多梦", "敏感多疑"],
    color: "#8b5cf6",
    icon: Heart,
  },
  {
    id: "blood-stasis",
    name: "血瘀体质",
    description: "血液瘀滞，脉络不畅",
    traits: ["面色暗沉", "皮肤瘀斑", "痛经血块", "肢体麻木"],
    color: "#ef4444",
    icon: Heart,
  },
  {
    id: "special-diet",
    name: "特禀体质",
    description: "先天禀赋特殊，易过敏",
    traits: ["容易过敏", "皮肤瘙痒", "喷嚏频繁", "不耐寒热"],
    color: "#06b6d4",
    icon: Heart,
  },
]

export default function ConstitutionPage() {
  const router = useRouter()
  const [selectedConstitutions, setSelectedConstitutions] = useState<string[]>([])

  const toggleConstitution = (id: string) => {
    setSelectedConstitutions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const handleSubmit = () => {
    alert(`您选择的体质类型：${selectedConstitutions.map(id => CONSTITUTION_TYPES.find(c => c.id === id)?.name).join('、')}`)
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
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selectedConstitutions.includes(constitution.id) ? "" : "bg-gray-100"
                }`}
                style={{
                  backgroundColor: selectedConstitutions.includes(constitution.id) ? `${constitution.color}15` : "bg-gray-100",
                }}
              >
                {selectedConstitutions.includes(constitution.id) ? (
                  <Check
                    className="w-5 h-5"
                    style={{ color: constitution.color }}
                  />
                ) : (
                  <constitution.icon className="w-5 h-5 text-gray-400" />
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