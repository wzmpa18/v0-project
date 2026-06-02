"use client"

import { useState } from "react"

export default function YangpanMingliPage() {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white pb-24">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-blue-400">阳盘命理</h1>
          <p className="text-gray-400 text-sm mt-1">基于阳盘命理经典理论</p>
        </div>
        
        <div className="bg-gray-800/50 rounded-2xl p-4 text-center">
          <p className="text-gray-300">阳盘命理功能开发中...</p>
          <p className="text-amber-400 text-sm mt-2">基于《渊海子平》《滴天髓》等古籍</p>
        </div>
      </div>
    </div>
  )
}
