"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomePage } from "@/components/pages/home-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { ClassPage } from "@/components/pages/class-page"
import { ShopPage } from "@/components/pages/shop-page"
import { BooksPage } from "@/components/pages/books-page"
import { FriendsPage } from "@/components/pages/friends-page"

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
      case "friends":
        return <FriendsPage />
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
