'use client'

import { useState } from 'react'
import { TCMPage } from '@/components/pages/tcm-page'
import { HerbalPage } from '@/components/pages/herbal-page'
import { 
  Home, BookOpen, ChevronLeft, Stethoscope, Pill, 
  MapPin, GraduationCap, Bot
} from 'lucide-react'

interface HerbalPageRouteProps {
  onBack?: () => void
}

export default function HerbalPageRoute({ onBack }: HerbalPageRouteProps = {}) {
  const [activePage, setActivePage] = useState<'tcm' | 'herbal' | 'acupoint' | 'formula'>('tcm')
  
  const bottomTabs = [
    { id: 'tcm', label: '中医诊疗', icon: Stethoscope },
    { id: 'herbal', label: '经方本草', icon: BookOpen },
    { id: 'acupoint', label: '经络穴位', icon: MapPin },
    { id: 'formula', label: '经典方剂', icon: Pill },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-[#1a1410] to-transparent pt-10 pb-3 border-b border-emerald-800/30">
        <div className="flex items-center gap-2 px-4 mb-3">
          <a href="/" className="w-10 h-10 rounded-full bg-emerald-900/40 flex items-center justify-center hover:bg-emerald-900/60 transition-colors">
            <ChevronLeft className="w-5 h-5 text-emerald-300" />
          </a>
          <div>
            <h1 className="text-lg font-bold text-emerald-400">中医</h1>
            <p className="text-xs text-emerald-200/60">传承千年智慧 · 中医综合平台</p>
          </div>
        </div>
      </div>
      
      {/* 页面内容 */}
      <div className="pb-16">
        {activePage === 'tcm' && <TCMPage />}
        {activePage === 'herbal' && <HerbalPage />}
        {activePage === 'acupoint' && (
          <div className="p-4">
            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 rounded-xl p-4 border border-emerald-800/30">
              <p className="text-emerald-100/80 text-center text-sm">
                经络穴位功能请通过首页进入人体经络模型查看
              </p>
              <button
                onClick={() => window.location.href = '/meridian'}
                className="w-full mt-3 py-2.5 bg-emerald-700/50 text-emerald-200 rounded-xl text-sm font-medium hover:bg-emerald-700/70 transition-colors"
              >
                进入经络模型
              </button>
            </div>
          </div>
        )}
        {activePage === 'formula' && (
          <div className="p-4">
            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 rounded-xl p-4 border border-emerald-800/30">
              <p className="text-emerald-100/80 text-center text-sm">
                经典方剂功能请通过上方「经方本草」选项卡查看
              </p>
              <button
                onClick={() => setActivePage('herbal')}
                className="w-full mt-3 py-2.5 bg-emerald-700/50 text-emerald-200 rounded-xl text-sm font-medium hover:bg-emerald-700/70 transition-colors"
              >
                进入经方本草
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* 底部子导航 */}
      <div className="fixed bottom-16 left-0 right-0 bg-[#1a1410] border-t border-emerald-800/30 px-2 py-1.5">
        <div className="flex justify-around">
          {bottomTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activePage === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActivePage(tab.id as typeof activePage)}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all ${
                  isActive
                    ? 'text-emerald-400'
                    : 'text-gray-400 hover:text-emerald-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
