"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomePage } from "@/components/pages/home-page"
import { YixuePage } from "@/components/pages/yixue-page"
import { PaipanPage } from "@/components/pages/paipan-page"
import { HerbalPage } from "@/components/pages/herbal-page"
import { TCMPage } from "@/components/pages/tcm-page"
import { StudyPage } from "@/components/pages/study-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { CommunityPage } from "@/components/pages/community-page"
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
import { ShopPage } from "@/components/pages/shop-page"
import { BaziPaipan } from "@/components/paipan/bazi-paipan"
import { YixueStudyPage } from "@/components/pages/yixue-study-page"
import { PaipanProvider } from "@/lib/paipan-context"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")
  const [activeTool, setActiveTool] = useState<string | null>(null)

  // 工具导航处理 - 从排盘页面或中医页面调用
  const handleToolNavigate = (toolId: string) => {
    // 八字排盘
    if (toolId === "bazi") {
      setActiveTool("bazi")
    } 
    // 易学学习分类
    else if (toolId.startsWith("study-")) {
      setActiveTool(toolId)
    }
    // 古籍阅读
    else if (toolId.startsWith("book-")) {
      setActiveTool(toolId)
    }
    // 其他排盘工具
    else if (toolId === "liuren") {
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
    } else if (toolId === "zhuge" || toolId === "zhugeshenshu") {
      setActiveTool("zhuge")
    } else if (toolId === "liuyao") {
      setActiveTool("liuyao")
    } else if (toolId === "qimen" || toolId === "qimen-yin" || toolId === "mingli-qimen" || toolId === "feigong-qimen" || toolId === "qimen-chuanren" || toolId === "shanxiang-qimen") {
      setActiveTool("qimen")
    } else if (toolId === "taiyi") {
      setActiveTool("taiyi")
    } else if (toolId === "jingdian") {
      // 从中医页面跳转到学习
      setActiveTab("study")
      setActiveTool(null)
    } else if (toolId === "jingluo") {
      setActiveTool("jingluo")
    } else if (toolId === "shop") {
      setActiveTool("shop")
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
      // 八字排盘
      if (activeTool === "bazi") {
        return <BaziPaipan onBack={handleBackToToolbox} onAIAnalysis={() => {
          setActiveTab("ai")
          setActiveTool(null)
        }} />
      }
      // 易学学习分类
      if (activeTool.startsWith("study-")) {
        const category = activeTool.replace("study-", "")
        return <YixueStudyPage category={category} onBack={handleBackToToolbox} />
      }
      // 古籍阅读
      if (activeTool.startsWith("book-")) {
        return <YixueStudyPage category="guji" onBack={handleBackToToolbox} />
      }
      
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
        case "shop":
          return <ShopPage onBack={handleBackToToolbox} />
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
      case "home":
        return <HomePage onNavigateToTab={setActiveTab} onNavigateToTool={handleToolNavigate} />
      case "yixue":
        return <YixuePage onNavigateToTool={handleToolNavigate} />
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
      case "community":
        return <CommunityPage />
      case "profile":
        return <ProfilePage />
      default:
        return <HomePage onNavigateToTab={setActiveTab} onNavigateToTool={handleToolNavigate} />
    }
  }

  return (
    <PaipanProvider>
      <main className="min-h-screen bg-[#1a1a1a] relative">
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
    </PaipanProvider>
  )
}
