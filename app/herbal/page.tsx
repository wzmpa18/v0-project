'use client'

import { useState } from 'react'
import { TCMPage } from '@/components/pages/tcm-page'
import { HerbalPage } from '@/components/pages/herbal-page'
import { Home, BookOpen, ChevronLeft } from 'lucide-react'

interface HerbalPageRouteProps {
  onBack?: () => void
}

export default function HerbalPageRoute({ onBack }: HerbalPageRouteProps = {}) {
  const [activePage, setActivePage] = useState<'tcm' | 'herbal'>('herbal')
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      {/* 页面切换导航 */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-[#1a1410] to-transparent border-b border-amber-800/30 pt-10">
        <div className="flex items-center gap-2 px-4 mb-3">
          {onBack && (
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-amber-900/40 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-amber-300" />
            </button>
          )}
        </div>
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <button
            onClick={() => setActivePage('tcm')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all ${
              activePage === 'tcm' 
                ? 'bg-amber-900/40 text-amber-400 border-b-2 border-amber-500' 
                : 'text-amber-200/60'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">中医诊疗</span>
          </button>
          <button
            onClick={() => setActivePage('herbal')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all ${
              activePage === 'herbal' 
                ? 'bg-emerald-900/40 text-emerald-400 border-b-2 border-emerald-500' 
                : 'text-amber-200/60'
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
