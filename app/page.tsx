"use client"

import { useState, useEffect } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomePage } from "@/components/pages/home-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { ClassPage } from "@/components/pages/class-page"
import { ShopPage } from "@/components/pages/shop-page"
import { BooksPage } from "@/components/pages/books-page"
import YiXuePage from "./yi-xue/page"
import HerbalPage from "./herbal/page"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")
  const [showYiXue, setShowYiXue] = useState(false)
  const [showHerbal, setShowHerbal] = useState(false)

  useEffect(() => {
    console.log("Active tab changed:", activeTab)
    console.log("Show YiXue:", showYiXue)
    console.log("Show Herbal:", showHerbal)
  }, [activeTab, showYiXue, showHerbal])

  const handleTabChange = (tab: string) => {
    console.log("handleTabChange called with:", tab)
    setShowYiXue(false)
    setShowHerbal(false)
    setActiveTab(tab)
  }

  const handleNavigateToYiXue = () => {
    console.log("handleNavigateToYiXue called")
    setShowYiXue(true)
    setShowHerbal(false)
  }

  const handleNavigateToHerbal = () => {
    console.log("handleNavigateToHerbal called")
    setShowHerbal(true)
    setShowYiXue(false)
  }

  const renderPage = () => {
    if (showYiXue) {
      return <YiXuePage onBack={() => setShowYiXue(false)} />
    }
    if (showHerbal) {
      return <HerbalPage onBack={() => setShowHerbal(false)} />
    }
    switch (activeTab) {
      case "home":
        return (
          <HomePage 
            onNavigateToYiXue={handleNavigateToYiXue} 
            onNavigateToHerbal={handleNavigateToHerbal} 
          />
        )
      case "study":
        return <ClassPage />
      case "ai":
        return <BooksPage />
      case "shop":
        return <ShopPage />
      case "profile":
        return <ProfilePage />
      default:
        return (
          <HomePage 
            onNavigateToYiXue={handleNavigateToYiXue} 
            onNavigateToHerbal={handleNavigateToHerbal} 
          />
        )
    }
  }

  return (
    <main className="min-h-screen bg-[#1a1410] relative overflow-hidden">
      <div className="pb-20">
        {renderPage()}
      </div>
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onNavigateToYiXue={handleNavigateToYiXue}
        onNavigateToHerbal={handleNavigateToHerbal}
      />
    </main>
  )
}
