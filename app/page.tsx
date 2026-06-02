"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomePage } from "@/components/pages/home-page"
import { HerbalPage } from "@/components/pages/herbal-page"
import { TCMPage } from "@/components/pages/tcm-page"
import { StudyPage } from "@/components/pages/study-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { PaipanPage } from "@/components/pages/paipan-page"
import { LuRenPage } from "@/components/pages/luren-page"
import { LuoPanPage } from "@/components/pages/luopan-page"
import { ZiWeiPage } from "@/components/pages/ziwei-page"
import { XiaoLiuRenPage } from "@/components/pages/xiaoliuren-page"
import { JinKouJuePage } from "@/components/pages/jinkoujue-page"
import { MeiHuaPage } from "@/components/pages/meihua-page"
import { BaZhaiPage } from "@/components/pages/bazhai-page"
import { XuanKongPage } from "@/components/pages/xuankong-page"
import { ZhuGePage } from "@/components/pages/zhuge-page"

// 创建课堂页面占位组件
function ClassPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">📚</div>
        <div className="text-gray-600 text-lg">课堂功能开发中...</div>
      </div>
    </div>
  )
}

// 创建商城页面占位组件
function ShopPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🛒</div>
        <div className="text-gray-600 text-lg">商城功能开发中...</div>
      </div>
    </div>
  )
}

// 创建书籍页面占位组件
function BooksPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">📖</div>
        <div className="text-gray-600 text-lg">书籍功能开发中...</div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")
  const [activeTool, setActiveTool] = useState<string | null>(null)

  // 工具导航处理 - 从首页调用
  const handleToolNavigate = (toolId: string) => {
    if (toolId === "bazi") {
      setActiveTab("paipan")
      setActiveTool(null)
    } else if (toolId === "liuren" || toolId === "daliuren") {
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
    } else if (toolId === "zhuge" || toolId === "kongming") {
      setActiveTool("zhuge")
    } else if (toolId === "liuyao") {
      setActiveTab("paipan")
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
        default:
          return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 bg-gray-50">
              <div className="text-4xl mb-2">🔧</div>
              <div className="text-gray-700 text-lg font-medium mb-2">功能开发中</div>
              <div className="text-gray-500 text-sm text-center mb-6">该工具正在紧锣密鼓地开发中，敬请期待</div>
              <button
                onClick={handleBackToToolbox}
                className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm shadow-sm"
              >
                返回
              </button>
            </div>
          )
      }
    }

    // 主页面切换 - 热卜风格
    switch (activeTab) {
      case "home":
        return <HomePage onNavigateToTool={handleToolNavigate} />
      case "class":
        return <ClassPage />
      case "books":
        return <BooksPage />
      case "shop":
        return <ShopPage />
      case "profile":
        return <ProfilePage />
      case "paipan":
        return <PaipanPage onNavigateToTool={handleToolNavigate} />
      default:
        return <HomePage onNavigateToTool={handleToolNavigate} />
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* 顶部测试按钮 - 保留 */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <a 
          href="/demo"
          className="block w-full py-4 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] text-white rounded-xl text-lg font-medium text-center shadow-lg hover:opacity-90 transition-opacity"
        >
          🎯 点击这里测试八字排盘功能！
        </a>
      </div>

      {/* 页面内容区域 */}
      <div className="pt-20 pb-20">
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
