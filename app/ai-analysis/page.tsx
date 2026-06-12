"use client"

import { ToolPageWrapper } from "@/components/tool-page-wrapper"
import { AIAnalysisSystem } from "@/components/pages/ai-analysis-system"

export default function AIAnalysisPage() {
  return (
    <ToolPageWrapper title="AI 智能分析" subtitle="辨证论治 · 智能辅助" theme="purple">
      <AIAnalysisSystem />
    </ToolPageWrapper>
  )
}