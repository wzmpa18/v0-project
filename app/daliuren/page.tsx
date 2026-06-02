"use client"

import { useState } from "react"

export default function DaLiuRenPage() {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 to-gray-900 text-white pb-24">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-teal-400">大六壬</h1>
          <p className="text-gray-400 text-sm mt-1">基于大六壬古籍经典</p>
        </div>
        
        <div className="bg-gray-800/50 rounded-2xl p-4 text-center">
          <p className="text-gray-300">大六壬功能开发中...</p>
          <p className="text-amber-400 text-sm mt-2">基于《大六壬金口诀》《六壬大全》</p>
        </div>
      </div>
    </div>
  )
}
