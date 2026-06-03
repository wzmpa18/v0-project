"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomePage } from "@/components/pages/home-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { ClassPage } from "@/components/pages/class-page"
import { ShopPage } from "@/components/pages/shop-page"
import { BooksPage } from "@/components/pages/books-page"
import { FriendsPage } from "@/components/pages/friends-page"
import YiXuePage from "./yi-xue/page"
import HerbalPage from "./herbal/page"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")
  const [showYiXue, setShowYiXue] = useState(false)
  const [showHerbal, setShowHerbal] = useState(false)

  const renderPage = () => {
    if (showYiXue) {
      return <YiXuePage onBack={() => setShowYiXue(false)} />
    }
    if (showHerbal) {
      return <HerbalPage onBack={() => setShowHerbal(false)} />
    }
    switch (activeTab) {
      case "home":
        return <HomePage onNavigateToYiXue={() => setShowYiXue(true)} onNavigateToHerbal={() => setShowHerbal(true)} />
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
        return <HomePage onNavigateToYiXue={() => setShowYiXue(true)} onNavigateToHerbal={() => setShowHerbal(true)} />
    }
  }

  const handleTabChange = (tab: string) => {
    setShowYiXue(false)
    setShowHerbal(false)
    setActiveTab(tab)
  }

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="pb-20">
        {renderPage()}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </main>
  )
}