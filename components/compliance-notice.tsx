"use client"

export function ComplianceNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`px-4 py-3 ${className}`}>
      <p className="text-[#888] text-[10px] text-center leading-relaxed">
        本APP中医内容为理论学习，不构成医疗诊断；命理内容为学术交流，不做决策依据。
      </p>
    </div>
  )
}

export function ComplianceFooter() {
  return (
    <footer className="fixed bottom-16 left-0 right-0 bg-gradient-to-t from-[#1a1a1a] to-transparent pt-4 pb-2 pointer-events-none">
      <p className="text-[#777] text-[9px] text-center leading-relaxed px-4">
        本APP中医内容为理论学习，不构成医疗诊断；命理内容为学术交流，不做决策依据。
      </p>
    </footer>
  )
}

export function MedicalDisclaimer() {
  return (
    <div className="bg-[#2a2520] border border-[#d4af37]/20 rounded-lg p-3 mx-4 my-2">
      <p className="text-[#d4a574] text-[11px] text-center leading-relaxed">
        温馨提示：本内容仅供学术研究，不能替代专业医师诊断，如有健康问题请及时就医。
      </p>
    </div>
  )
}

export function DivinationDisclaimer() {
  return (
    <div className="bg-[#252530] border border-[#6366f1]/20 rounded-lg p-3 mx-4 my-2">
      <p className="text-[#a5b4fc] text-[11px] text-center leading-relaxed">
        免责声明：命理分析为传统文化研究，仅供参考交流，不应作为人生重大决策依据。
      </p>
    </div>
  )
}
