// 电子罗盘组件
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, RotateCcw } from "lucide-react"

interface LuoPanPageProps {
  onBack: () => void
}

// 二十四山
const ER_SHI_SI_SHAN = [
  { name: "壬", degree: 337.5, wuxing: "水" },
  { name: "子", degree: 352.5, wuxing: "水" },
  { name: "癸", degree: 7.5, wuxing: "水" },
  { name: "丑", degree: 22.5, wuxing: "土" },
  { name: "艮", degree: 37.5, wuxing: "土" },
  { name: "寅", degree: 52.5, wuxing: "木" },
  { name: "甲", degree: 67.5, wuxing: "木" },
  { name: "卯", degree: 82.5, wuxing: "木" },
  { name: "乙", degree: 97.5, wuxing: "木" },
  { name: "辰", degree: 112.5, wuxing: "土" },
  { name: "巽", degree: 127.5, wuxing: "木" },
  { name: "巳", degree: 142.5, wuxing: "火" },
  { name: "丙", degree: 157.5, wuxing: "火" },
  { name: "午", degree: 172.5, wuxing: "火" },
  { name: "丁", degree: 187.5, wuxing: "火" },
  { name: "未", degree: 202.5, wuxing: "土" },
  { name: "坤", degree: 217.5, wuxing: "土" },
  { name: "申", degree: 232.5, wuxing: "金" },
  { name: "庚", degree: 247.5, wuxing: "金" },
  { name: "酉", degree: 262.5, wuxing: "金" },
  { name: "辛", degree: 277.5, wuxing: "金" },
  { name: "戌", degree: 292.5, wuxing: "土" },
  { name: "乾", degree: 307.5, wuxing: "金" },
  { name: "亥", degree: 322.5, wuxing: "水" },
]

const WUXING_COLOR: Record<string, string> = {
  木: "#22c55e",
  火: "#ef4444",
  土: "#d97706",
  金: "#fbbf24",
  水: "#3b82f6",
}

export function LuoPanPage({ onBack }: LuoPanPageProps) {
  const [heading, setHeading] = useState(0)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  
  useEffect(() => {
    // 尝试获取设备方向
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        // alpha 是相对于北方的角度
        setHeading(360 - event.alpha)
        setHasPermission(true)
      }
    }
    
    // 检查是否需要请求权限（iOS 13+）
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      // iOS 13+ 需要请求权限
      setHasPermission(false)
    } else {
      // 其他设备直接监听
      window.addEventListener('deviceorientation', handleOrientation)
      // 如果5秒后还没有数据，说明设备不支持
      setTimeout(() => {
        if (hasPermission === null) setHasPermission(false)
      }, 5000)
    }
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])
  
  const requestPermission = async () => {
    try {
      const permission = await (DeviceOrientationEvent as any).requestPermission()
      if (permission === 'granted') {
        window.addEventListener('deviceorientation', (event) => {
          if (event.alpha !== null) {
            setHeading(360 - event.alpha)
          }
        })
        setHasPermission(true)
      }
    } catch (error) {
      console.error('Permission denied', error)
    }
  }
  
  // 获取当前指向的山
  const getCurrentShan = () => {
    const normalizedHeading = ((heading % 360) + 360) % 360
    for (const shan of ER_SHI_SI_SHAN) {
      const start = (shan.degree - 7.5 + 360) % 360
      const end = (shan.degree + 7.5) % 360
      if (start > end) {
        // 跨越0度
        if (normalizedHeading >= start || normalizedHeading < end) return shan
      } else {
        if (normalizedHeading >= start && normalizedHeading < end) return shan
      }
    }
    return ER_SHI_SI_SHAN[0]
  }
  
  const currentShan = getCurrentShan()
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#1a1a1a] flex flex-col">
      {/* 顶部 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#333]">
        <button onClick={onBack} className="flex items-center gap-1 text-[#d4af37]">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <h1 className="text-[#f5f5f7] font-medium">电子罗盘</h1>
        <button onClick={() => setHeading(0)} className="text-[#888]">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
      
      {/* 当前方位显示 */}
      <div className="text-center py-4">
        <div className="text-6xl font-bold" style={{ color: WUXING_COLOR[currentShan.wuxing] }}>
          {currentShan.name}
        </div>
        <div className="text-[#888] text-sm mt-2">
          {heading.toFixed(1)}° · 五行属{currentShan.wuxing}
        </div>
      </div>
      
      {/* 罗盘主体 */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="relative w-72 h-72">
          {/* 外圈装饰 */}
          <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/30" />
          
          {/* 罗盘盘面 */}
          <div 
            className="absolute inset-2 rounded-full bg-[#1f1f1f] border-2 border-[#333] overflow-hidden"
            style={{ transform: `rotate(${-heading}deg)`, transition: 'transform 0.1s ease-out' }}
          >
            {/* 二十四山 */}
            {ER_SHI_SI_SHAN.map((shan, i) => (
              <div
                key={shan.name}
                className="absolute left-1/2 top-0 origin-bottom"
                style={{
                  transform: `translateX(-50%) rotate(${shan.degree}deg)`,
                  height: '50%',
                  width: '30px',
                }}
              >
                <div 
                  className="text-center text-sm font-medium pt-2"
                  style={{ 
                    color: WUXING_COLOR[shan.wuxing],
                    transform: `rotate(${-shan.degree + heading}deg)`,
                  }}
                >
                  {shan.name}
                </div>
              </div>
            ))}
            
            {/* 中心太极 */}
            <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-[#333] to-[#1a1a1a] border border-[#444] flex items-center justify-center">
              <div className="text-[#d4af37] text-2xl">☯</div>
            </div>
          </div>
          
          {/* 指针 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] border-b-[#c8102e]" />
          </div>
        </div>
      </div>
      
      {/* 权限请求 */}
      {hasPermission === false && (
        <div className="px-4 pb-24">
          <button
            onClick={requestPermission}
            className="w-full py-3 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-medium"
          >
            启用设备方向传感器
          </button>
          <p className="text-xs text-[#888] text-center mt-2">
            需要允许访问设备方向才能使用罗盘功能
          </p>
        </div>
      )}
      
      {/* 底部信息 */}
      <div className="px-4 pb-24">
        <div className="bg-[#1f1f1f] rounded-xl border border-[#333] p-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-[#888] text-xs">当前山向</div>
              <div className="text-[#f5f5f7]">{currentShan.name}山</div>
            </div>
            <div>
              <div className="text-[#888] text-xs">对宫</div>
              <div className="text-[#f5f5f7]">
                {ER_SHI_SI_SHAN[(ER_SHI_SI_SHAN.findIndex(s => s.name === currentShan.name) + 12) % 24].name}向
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
