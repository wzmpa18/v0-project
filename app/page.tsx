"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { PaipanPage } from "@/components/pages/paipan-page"
import { HerbalPage } from "@/components/pages/herbal-page"
import { TCMPage } from "@/components/pages/tcm-page"
import { StudyPage } from "@/components/pages/study-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { LuRenPage } from "@/components/pages/luren-page"
import { LuoPanPage } from "@/components/pages/luopan-page"
import { ZiWeiPage } from "@/components/pages/ziwei-page"
import { XiaoLiuRenPage } from "@/components/pages/xiaoliuren-page"
import { JinKouJuePage } from "@/components/pages/jinkoujue-page"
import { MeiHuaPage } from "@/components/pages/meihua-page"
import { BaZhaiPage } from "@/components/pages/bazhai-page"
import { XuanKongPage } from "@/components/pages/xuankong-page"
import { ZhuGePage } from "@/components/pages/zhuge-page"
import { AIPage } from "@/components/pages/ai-page"
import { JingluoPage } from "@/components/pages/jingluo-page"

export default function Home() {
  const [activeTab, setActiveTab] = useState("paipan")
  const [activeTool, setActiveTool] = useState<string | null>(null)

  // 工具导航处理 - 从排盘页面或中医页面调用
  const handleToolNavigate = (toolId: string) => {
    if (toolId === "bazi") {
      setActiveTab("paipan")
      setActiveTool(null)
    } else if (toolId === "liuren") {
      setActiveTool("liuren")
    } else if (toolId === "luopan") {
      setActiveTool("luopan")
    } else if (toolId === "ziwei") {
      setActiveTool("ziwei")
    } else if (toolId === "xiaoliuren") {
      setActiveTool("xiaoliuren")
    } else if (toolId === "jinkoujue") {
      setActiveTool("jinkoujue")
    } else if (toolId === "meihua") {
      setActiveTool("meihua")
    } else if (toolId === "bazhai" || toolId === "fengshuipan") {
      setActiveTool("bazhai")
    } else if (toolId === "xuankong") {
      setActiveTool("xuankong")
    } else if (toolId === "zhuge") {
      setActiveTool("zhuge")
    } else if (toolId === "liuyao") {
      setActiveTab("paipan")
      setActiveTool(null)
    } else if (toolId === "jingdian") {
      // 从中医页面跳转到学习
      setActiveTab("study")
      setActiveTool(null)
    } else if (toolId === "jingluo") {
      setActiveTool("jingluo")
    } else if (toolId === "jibing" || toolId === "yian" || toolId === "zhongyao") {
      // 中医百科相关 - 跳转到经方页面
      setActiveTab("herbal")
      setActiveTool(null)
    } else {
      setActiveTool(toolId)
    }
  }

  const handleBackToToolbox = () => {
    setActiveTool(null)
  }

  const renderPage = () => {
    // 子工具页面
    if (activeTool) {
      switch (activeTool) {
        case "liuren":
          return <LuRenPage onBack={handleBackToToolbox} />
        case "luopan":
          return <LuoPanPage onBack={handleBackToToolbox} />
        case "ziwei":
          return <ZiWeiPage onBack={handleBackToToolbox} />
        case "xiaoliuren":
          return <XiaoLiuRenPage onBack={handleBackToToolbox} />
        case "jinkoujue":
          return <JinKouJuePage onBack={handleBackToToolbox} />
        case "meihua":
          return <MeiHuaPage onBack={handleBackToToolbox} />
        case "bazhai":
          return <BaZhaiPage onBack={handleBackToToolbox} />
        case "xuankong":
          return <XuanKongPage onBack={handleBackToToolbox} />
        case "zhuge":
          return <ZhuGePage onBack={handleBackToToolbox} />
        case "jingluo":
          return <JingluoPage onBack={handleBackToToolbox} />
        default:
          return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 bg-[#1a1a1a]">
              <div className="text-4xl mb-4">🔧</div>
              <div className="text-[#d4af37] text-lg font-medium mb-2">功能开发中</div>
              <div className="text-[#888] text-sm text-center mb-6">该工具正在紧锣密鼓地开发中，敬请期待</div>
              <button
                onClick={handleBackToToolbox}
                className="px-6 py-2 bg-[#252525] border border-[#333] rounded-xl text-[#f5f5f7] text-sm"
              >
                返回
              </button>
            </div>
          )
      }
    }

    // 主页面切换
    switch (activeTab) {
      case "paipan":
        return <PaipanPage onNavigateToTool={handleToolNavigate} />
      case "tcm":
        return <TCMPage onNavigateToTool={handleToolNavigate} />
      case "herbal":
        return <HerbalPage />
      case "study":
        return <StudyPage />
      case "ai":
        return <AIPage />
      case "profile":
        return <ProfilePage />
      default:
        return <PaipanPage />
    }
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] relative overflow-hidden">
      {/* 顶部装饰渐变 */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a]/95 to-transparent pointer-events-none z-10" />
      
      {/* 页面内容区域 */}
      <div className="pb-20">
        {renderPage()}
      </div>

      {/* 底部导航 - 子工具页面时隐藏 */}
      {!activeTool && (
        <BottomNav activeTab={activeTab} onTabChange={(tab) => {
          setActiveTab(tab)
          setActiveTool(null)
        }} />
      )}
    </main>
  )
}
