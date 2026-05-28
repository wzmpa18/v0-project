"use client"

export function ComplianceNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`px-4 py-3 ${className}`}>
      <p className="text-[#555] text-[10px] text-center leading-relaxed">
        本APP中医内容为理论学习，不构成医疗诊断；命理内容为学术交流，不做决策依据。
      </p>
    </div>
  )
}

export function ComplianceFooter() {
  return (
    <footer className="fixed bottom-16 left-0 right-0 bg-gradient-to-t from-[#1a1a1a] to-transparent pt-4 pb-2 pointer-events-none">
      <p className="text-[#444] text-[9px] text-center leading-relaxed px-4">
        本APP中医内容为理论学习，不构成医疗诊断；命理内容为学术交流，不做决策依据。
      </p>
    </footer>
  )
}
