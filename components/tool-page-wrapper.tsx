"use client"

import { ChevronLeft } from "lucide-react"
import { navigateTo } from "@/lib/navigation"

interface ToolPageWrapperProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  theme?: "amber" | "emerald" | "purple"
  backUrl?: string
}

export function ToolPageWrapper({ title, subtitle, children, theme = "amber", backUrl = "/" }: ToolPageWrapperProps) {
  const themeColors = {
    amber: { header: "bg-amber-900/40", text: "text-amber-300", border: "border-amber-800/30", bg: "from-amber-500 to-yellow-600" },
    emerald: { header: "bg-emerald-900/40", text: "text-emerald-300", border: "border-emerald-800/30", bg: "from-emerald-500 to-teal-600" },
    purple: { header: "bg-purple-900/40", text: "text-purple-300", border: "border-purple-800/30", bg: "from-purple-500 to-violet-600" },
  }

  const colors = themeColors[theme]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      <header className="bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-4 px-4">
        <div className="flex items-center gap-3 mb-2">
          <button 
            onClick={() => navigateTo(backUrl)} 
            className={`w-10 h-10 rounded-full ${colors.header} flex items-center justify-center hover:opacity-80 transition-opacity`}
          >
            <ChevronLeft className={`w-5 h-5 ${colors.text}`} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-amber-400">{title}</h1>
            {subtitle && <p className="text-xs text-amber-200/60">{subtitle}</p>}
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}