"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomePage } from "@/components/pages/home-page"
import { ProfilePage } from "@/components/pages/profile-page"

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

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />
      case "class":
        return <ClassPage />
      case "books":
        return <BooksPage />
      case "shop":
        return <ShopPage />
      case "profile":
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* 页面内容区域 */}
      <div className="pb-20">
        {renderPage()}
      </div>

      {/* 底部导航 */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  )
}
