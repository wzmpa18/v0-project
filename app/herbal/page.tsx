'use client'

import { useState } from 'react'
import { TCMPage } from '@/components/pages/tcm-page'
import { HerbalPage } from '@/components/pages/herbal-page'
import { Home, BookOpen } from 'lucide-react'

export default function HerbalPageRoute() {
  const [activePage, setActivePage] = useState<'tcm' | 'herbal'>('herbal')
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面切换导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <button
            onClick={() => setActivePage('tcm')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all ${
              activePage === 'tcm' 
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">中医诊疗</span>
          </button>
          <button
            onClick={() => setActivePage('herbal')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all ${
              activePage === 'herbal' 
                ? 'bg-green-50 text-green-600 border-b-2 border-green-600' 
                : 'text-gray-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">经方本草</span>
          </button>
        </div>
      </div>
      
      {/* 页面内容 */}
      <div className="pb-20">
        {activePage === 'tcm' ? <TCMPage /> : <HerbalPage />}
      </div>
    </div>
  )
}
