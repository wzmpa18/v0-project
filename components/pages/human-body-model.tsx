"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  RotateCw,
  MousePointer,
  Move,
  Layers
} from "lucide-react"
import {
  MERIDIANS_FULL,
  EXTRA_MERIDIANS,
  DONG_POINTS,
  ACUPOINTS_FULL
} from "@/lib/tcm-meridian-complete"

interface HumanBodyProps {
  onSelectAcupoint?: (acupoint: any) => void
}

export function HumanBodyModel({ onSelectAcupoint }: HumanBodyProps) {
  const [viewMode, setViewMode] = useState<"front" | "back">("front")
  const [activeMeridians, setActiveMeridians] = useState<string[]>(["LU", "HT", "SP", "PC", "LR", "KI"])
  const [activeDongPoints, setActiveDongPoints] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showLabels, setShowLabels] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [selectedAcupoint, setSelectedAcupoint] = useState<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 经络颜色映射
  const meridianColors: Record<string, string> = {
    LU: "#0891b2", // 肺经 - 青色
    HT: "#dc2626", // 心经 - 红色
    SP: "#f59e0b", // 脾经 - 黄色
    PC: "#ec4899", // 心包经 - 粉红
    LR: "#22c55e", // 肝经 - 绿色
    KI: "#8b5cf6", // 肾经 - 紫色
    LI: "#0891b2", // 大肠经 - 青色
    SI: "#dc2626", // 小肠经 - 红色
    ST: "#f59e0b", // 胃经 - 黄色
    BL: "#06b6d4", // 膀胱经 - 浅青
    GB: "#22c55e", // 胆经 - 绿色
    TE: "#8b5cf6", // 三焦经 - 紫色
    CV: "#d4af37", // 任脉 - 金色
    GV: "#dc2626", // 督脉 - 红色
  }

  // 经络路径数据（简化的SVG路径）
  const meridianPaths = {
    // 手太阴肺经（前）
    LU: {
      front: "M280,180 L280,200 L280,240 L280,280 L280,320 L280,360 L280,400 L280,440 L280,480 L260,520 L240,560",
      points: [
        { name: "中府", x: 280, y: 185, id: "LU1" },
        { name: "云门", x: 275, y: 190, id: "LU1" },
        { name: "尺泽", x: 280, y: 320, id: "LU5" },
        { name: "列缺", x: 280, y: 360, id: "LU7" },
        { name: "太渊", x: 280, y: 400, id: "LU9" },
        { name: "鱼际", x: 275, y: 440, id: "LU10" },
        { name: "少商", x: 270, y: 480, id: "LU11" },
      ]
    },
    // 手阳明大肠经（前）
    LI: {
      front: "M320,480 L340,520 L360,560 L380,600 L380,640 L360,660",
      points: [
        { name: "商阳", x: 320, y: 485, id: "LI1" },
        { name: "合谷", x: 340, y: 540, id: "LI4" },
        { name: "曲池", x: 380, y: 600, id: "LI11" },
        { name: "迎香", x: 320, y: 180, id: "LI20" },
      ]
    },
    // 足阳明胃经（前）
    ST: {
      front: "M320,180 L320,200 L320,240 L320,280 L320,320 L320,360 L340,400 L340,440 L360,480 L360,520 L380,560 L400,600 L420,640 L440,680",
      points: [
        { name: "承泣", x: 315, y: 195, id: "ST1" },
        { name: "四白", x: 310, y: 200, id: "ST2" },
        { name: "地仓", x: 305, y: 220, id: "ST4" },
        { name: "颊车", x: 295, y: 235, id: "ST6" },
        { name: "下关", x: 295, y: 245, id: "ST7" },
        { name: "头维", x: 300, y: 260, id: "ST8" },
        { name: "天枢", x: 320, y: 320, id: "ST25" },
        { name: "足三里", x: 400, y: 560, id: "ST36" },
        { name: "丰隆", x: 420, y: 620, id: "ST40" },
        { name: "内庭", x: 435, y: 665, id: "ST44" },
      ]
    },
    // 足太阴脾经（前）
    SP: {
      front: "M240,180 L240,200 L240,240 L240,280 L240,320 L240,360 L240,400 L260,440 L280,480 L300,520 L320,560 L340,600",
      points: [
        { name: "隐白", x: 235, y: 680, id: "SP1" },
        { name: "太白", x: 240, y: 660, id: "SP3" },
        { name: "公孙", x: 250, y: 630, id: "SP4" },
        { name: "三阴交", x: 290, y: 550, id: "SP6" },
        { name: "阴陵泉", x: 260, y: 490, id: "SP9" },
        { name: "血海", x: 250, y: 430, id: "SP10" },
      ]
    },
    // 手少阴心经（前）
    HT: {
      front: "M280,180 L280,200 L280,240 L280,280 L280,320 L280,360 L280,400 L280,440 L280,480 L260,520 L240,560",
      points: [
        { name: "极泉", x: 280, y: 300, id: "HT1" },
        { name: "少海", x: 280, y: 350, id: "HT3" },
        { name: "通里", x: 280, y: 380, id: "HT5" },
        { name: "神门", x: 280, y: 420, id: "HT7" },
        { name: "少府", x: 280, y: 450, id: "HT8" },
        { name: "少冲", x: 275, y: 485, id: "HT9" },
      ]
    },
    // 手太阳小肠经（前）
    SI: {
      front: "M320,480 L340,520 L360,560 L380,600 L400,640 L420,680",
      points: [
        { name: "少泽", x: 420, y: 685, id: "SI1" },
        { name: "后溪", x: 400, y: 660, id: "SI3" },
        { name: "腕骨", x: 380, y: 635, id: "SI4" },
        { name: "小海", x: 360, y: 580, id: "SI8" },
        { name: "肩贞", x: 340, y: 540, id: "SI9" },
        { name: "听宫", x: 330, y: 245, id: "SI19" },
      ]
    },
    // 足太阳膀胱经（后）
    BL: {
      front: "M320,180 L320,200 L320,240 L320,280 L320,320 L320,360 L320,400 L320,440 L320,480 L320,520 L320,560 L340,600 L360,640 L380,680",
      back: "M320,180 L320,200 L320,240 L320,280 L320,320 L320,360 L320,400 L320,440 L320,480 L320,520 L320,560 L320,600 L320,640 L320,680",
      points: [
        { name: "睛明", x: 315, y: 195, id: "BL1" },
        { name: "攒竹", x: 310, y: 200, id: "BL2" },
        { name: "天柱", x: 305, y: 260, id: "BL10" },
        { name: "大杼", x: 320, y: 280, id: "BL11" },
        { name: "肺俞", x: 320, y: 300, id: "BL13" },
        { name: "心俞", x: 320, y: 320, id: "BL15" },
        { name: "肝俞", x: 320, y: 340, id: "BL18" },
        { name: "脾俞", x: 320, y: 360, id: "BL20" },
        { name: "胃俞", x: 320, y: 380, id: "BL21" },
        { name: "肾俞", x: 320, y: 400, id: "BL23" },
        { name: "大肠俞", x: 320, y: 420, id: "BL25" },
        { name: "命门", x: 320, y: 440, id: "GV4" },
        { name: "腰俞", x: 320, y: 460, id: "GV2" },
        { name: "委中", x: 320, y: 540, id: "BL40" },
        { name: "承山", x: 320, y: 600, id: "BL57" },
        { name: "昆仑", x: 320, y: 650, id: "BL60" },
        { name: "至阴", x: 320, y: 685, id: "BL67" },
      ]
    },
    // 足少阴肾经（前）
    KI: {
      front: "M260,180 L260,200 L260,240 L260,280 L260,320 L260,360 L280,400 L300,440 L320,480 L340,520 L360,560 L380,600 L400,640 L420,680",
      points: [
        { name: "涌泉", x: 425, y: 685, id: "KI1" },
        { name: "太溪", x: 395, y: 650, id: "KI3" },
        { name: "照海", x: 370, y: 620, id: "KI6" },
        { name: "复溜", x: 340, y: 580, id: "KI7" },
        { name: "阴谷", x: 310, y: 530, id: "KI10" },
        { name: "横骨", x: 290, y: 450, id: "KI11" },
        { name: "肓俞", x: 280, y: 400, id: "KI16" },
      ]
    },
    // 手厥阴心包经（前）
    PC: {
      front: "M280,300 L280,340 L280,380 L280,420 L280,460 L280,500 L260,540 L240,580",
      points: [
        { name: "天池", x: 280, y: 305, id: "PC1" },
        { name: "天泉", x: 280, y: 320, id: "PC2" },
        { name: "曲泽", x: 280, y: 360, id: "PC3" },
        { name: "郄门", x: 280, y: 390, id: "PC4" },
        { name: "间使", x: 280, y: 420, id: "PC5" },
        { name: "内关", x: 280, y: 450, id: "PC6" },
        { name: "大陵", x: 280, y: 480, id: "PC7" },
        { name: "劳宫", x: 280, y: 510, id: "PC8" },
        { name: "中冲", x: 275, y: 540, id: "PC9" },
      ]
    },
    // 手少阳三焦经（前）
    TE: {
      front: "M320,480 L340,520 L360,560 L380,600 L400,640 L420,680",
      points: [
        { name: "关冲", x: 420, y: 685, id: "TE1" },
        { name: "液门", x: 400, y: 660, id: "TE2" },
        { name: "中渚", x: 380, y: 635, id: "TE3" },
        { name: "阳池", x: 360, y: 610, id: "TE4" },
        { name: "外关", x: 380, y: 580, id: "TE5" },
        { name: "支沟", x: 400, y: 550, id: "TE6" },
        { name: "天井", x: 370, y: 500, id: "TE10" },
        { name: "肩髎", x: 340, y: 460, id: "TE14" },
        { name: "翳风", x: 330, y: 285, id: "TE17" },
        { name: "耳门", x: 335, y: 250, id: "TE21" },
        { name: "丝竹空", x: 340, y: 220, id: "TE23" },
      ]
    },
    // 足少阳胆经（前/后）
    GB: {
      front: "M320,180 L320,200 L320,240 L320,280 L320,320 L320,360 L320,400 L320,440 L360,480 L400,520 L440,560 L480,600 L480,640",
      back: "M320,180 L320,200 L320,240 L320,280 L320,320 L320,360 L320,400 L320,440 L360,480 L400,520 L440,560 L480,600 L480,640",
      points: [
        { name: "瞳子髎", x: 325, y: 195, id: "GB1" },
        { name: "听会", x: 330, y: 210, id: "GB2" },
        { name: "上关", x: 335, y: 225, id: "GB3" },
        { name: "率谷", x: 335, y: 245, id: "GB8" },
        { name: "阳白", x: 330, y: 260, id: "GB14" },
        { name: "头临泣", x: 335, y: 275, id: "GB15" },
        { name: "风池", x: 325, y: 290, id: "GB20" },
        { name: "肩井", x: 320, y: 330, id: "GB21" },
        { name: "日月", x: 300, y: 360, id: "GB24" },
        { name: "京门", x: 300, y: 420, id: "GB25" },
        { name: "带脉", x: 290, y: 400, id: "GB26" },
        { name: "环跳", x: 320, y: 460, id: "GB30" },
        { name: "风市", x: 340, y: 490, id: "GB31" },
        { name: "阳陵泉", x: 380, y: 560, id: "GB34" },
        { name: "光明", x: 420, y: 610, id: "GB37" },
        { name: "悬钟", x: 450, y: 650, id: "GB39" },
        { name: "丘墟", x: 470, y: 680, id: "GB40" },
        { name: "足临泣", x: 475, y: 665, id: "GB41" },
        { name: "侠溪", x: 480, y: 650, id: "GB43" },
        { name: "足窍阴", x: 485, y: 635, id: "GB44" },
      ]
    },
    // 足厥阴肝经（前）
    LR: {
      front: "M280,180 L280,200 L280,240 L280,280 L280,320 L280,360 L280,400 L280,440 L280,480 L280,520 L280,560 L280,600 L280,640 L280,680",
      points: [
        { name: "大敦", x: 275, y: 685, id: "LR1" },
        { name: "行间", x: 280, y: 660, id: "LR2" },
        { name: "太冲", x: 285, y: 635, id: "LR3" },
        { name: "中封", x: 290, y: 610, id: "LR4" },
        { name: "蠡沟", x: 295, y: 585, id: "LR5" },
        { name: "曲泉", x: 300, y: 550, id: "LR8" },
        { name: "章门", x: 280, y: 420, id: "LR13" },
        { name: "期门", x: 280, y: 380, id: "LR14" },
      ]
    },
  }

  // 任脉（前）
  CV: {
    front: "M280,300 L280,340 L280,380 L280,420 L280,460 L280,500 L280,540 L280,580 L280,620 L280,660 L280,700",
    points: [
      { name: "会阴", x: 280, y: 620, id: "CV1" },
      { name: "曲骨", x: 280, y: 580, id: "CV2" },
      { name: "中极", x: 280, y: 540, id: "CV3" },
      { name: "关元", x: 280, y: 500, id: "CV4" },
      { name: "石门", x: 280, y: 460, id: "CV5" },
      { name: "气海", x: 280, y: 420, id: "CV6" },
      { name: "阴交", x: 280, y: 380, id: "CV7" },
      { name: "神阙", x: 280, y: 340, id: "CV8" },
      { name: "水分", x: 280, y: 300, id: "CV9" },
      { name: "下脘", x: 280, y: 260, id: "CV10" },
      { name: "中脘", x: 280, y: 220, id: "CV12" },
      { name: "上脘", x: 280, y: 190, id: "CV13" },
      { name: "巨阙", x: 280, y: 170, id: "CV14" },
      { name: "鸠尾", x: 280, y: 155, id: "CV15" },
      { name: "膻中", x: 280, y: 120, id: "CV17" },
      { name: "玉堂", x: 280, y: 100, id: "CV18" },
      { name: "紫宫", x: 280, y: 85, id: "CV19" },
      { name: "华盖", x: 280, y: 70, id: "CV20" },
      { name: "璇玑", x: 280, y: 55, id: "CV21" },
      { name: "天突", x: 280, y: 40, id: "CV22" },
      { name: "廉泉", x: 280, y: 25, id: "CV23" },
      { name: "承浆", x: 280, y: 10, id: "CV24" },
    ]
  },
  // 督脉（后）
  GV: {
    front: "M320,300 L320,340 L320,380 L320,420 L320,460 L320,500 L320,540 L320,580 L320,620 L320,660 L320,700",
    back: "M320,300 L320,340 L320,380 L320,420 L320,460 L320,500 L320,540 L320,580 L320,620 L320,660 L320,700",
    points: [
      { name: "长强", x: 320, y: 630, id: "GV1" },
      { name: "腰俞", x: 320, y: 580, id: "GV2" },
      { name: "腰阳关", x: 320, y: 540, id: "GV3" },
      { name: "命门", x: 320, y: 500, id: "GV4" },
      { name: "悬枢", x: 320, y: 460, id: "GV5" },
      { name: "脊中", x: 320, y: 420, id: "GV6" },
      { name: "中枢", x: 320, y: 380, id: "GV7" },
      { name: "筋缩", x: 320, y: 340, id: "GV8" },
      { name: "至阳", x: 320, y: 300, id: "GV9" },
      { name: "灵台", x: 320, y: 260, id: "GV10" },
      { name: "神道", x: 320, y: 220, id: "GV11" },
      { name: "身柱", x: 320, y: 180, id: "GV12" },
      { name: "陶道", x: 320, y: 140, id: "GV13" },
      { name: "大椎", x: 320, y: 100, id: "GV14" },
      { name: "哑门", x: 320, y: 60, id: "GV15" },
      { name: "风府", x: 320, y: 40, id: "GV16" },
      { name: "百会", x: 320, y: 20, id: "GV20" },
      { name: "上星", x: 320, y: 5, id: "GV23" },
      { name: "神庭", x: 320, y: -5, id: "GV24" },
      { name: "水沟", x: 320, y: -15, id: "GV26" },
      { name: "龈交", x: 320, y: -25, id: "GV28" },
    ]
  },
}

  // 获取当前显示的经络
  const getActiveMeridians = () => {
    const allMeridians = [...activeMeridians]
    if (viewMode === "back") {
      return allMeridians.filter(m => ["BL", "GV", "GB"].includes(m))
    }
    return allMeridians.filter(m => !["BL", "GV"].includes(m) || ["GB"].includes(m))
  }

  // 切换经络显示
  const toggleMeridian = (meridianId: string) => {
    setActiveMeridians(prev => {
      if (prev.includes(meridianId)) {
        return prev.filter(id => id !== meridianId)
      }
      return [...prev, meridianId]
    })
  }

  // 处理鼠标拖拽
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  // 缩放
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))

  // 重置视图
  const handleReset = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setRotation(0)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 顶部工具栏 */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("front")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "front"
                  ? "bg-[#0891b2] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              正面
            </button>
            <button
              onClick={() => setViewMode("back")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "back"
                  ? "bg-[#0891b2] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              背面
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`p-2 rounded-lg transition-all ${
                showLabels ? "bg-[#0891b2] text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className={`p-2 rounded-lg transition-all ${
                isAnimating ? "bg-[#d4af37] text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 经络选择 */}
        <div className="flex flex-wrap gap-2">
          {MERIDIANS_FULL.slice(0, 12).map(meridian => (
            <button
              key={meridian.id}
              onClick={() => toggleMeridian(meridian.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                activeMeridians.includes(meridian.id)
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor: activeMeridians.includes(meridian.id)
                  ? meridianColors[meridian.id]
                  : undefined
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: meridianColors[meridian.id],
                  opacity: activeMeridians.includes(meridian.id) ? 1 : 0.3
                }}
              />
              {meridian.nameAbbr}
            </button>
          ))}
        </div>
      </div>

      {/* 人体模型显示区域 */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden cursor-move relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transition: dragging ? "none" : "transform 0.2s"
          }}
        >
          <svg
            width="600"
            height="800"
            viewBox="-100 -50 600 800"
            className="w-full h-full max-w-full max-h-full"
          >
            {/* 背景网格 */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* 人体轮廓 */}
            <g className="human-body">
              {/* 头部 */}
              <ellipse cx="300" cy="80" rx="50" ry="60" fill="none" stroke="#d1d5db" strokeWidth="2" />
              <ellipse cx="300" cy="75" rx="45" ry="55" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1" />
              
              {/* 颈部 */}
              <rect x="285" y="130" width="30" height="30" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1" />
              
              {/* 躯干 */}
              <path
                d="M 240 160 Q 220 180 220 250 L 220 450 Q 220 480 250 500 L 350 500 Q 380 480 380 450 L 380 250 Q 380 180 360 160 Z"
                fill="#f9fafb"
                stroke="#9ca3af"
                strokeWidth="2"
              />
              
              {/* 四肢 - 左上肢 */}
              <path
                d="M 240 170 Q 200 200 180 280 L 180 400 Q 180 420 200 440 L 260 540"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M 240 170 Q 200 200 180 280 L 180 400 Q 180 420 200 440 L 260 540"
                fill="none"
                stroke="#f9fafb"
                strokeWidth="16"
                strokeLinecap="round"
              />
              
              {/* 四肢 - 右上肢 */}
              <path
                d="M 360 170 Q 400 200 420 280 L 420 400 Q 420 420 400 440 L 340 540"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M 360 170 Q 400 200 420 280 L 420 400 Q 420 420 400 440 L 340 540"
                fill="none"
                stroke="#f9fafb"
                strokeWidth="16"
                strokeLinecap="round"
              />
              
              {/* 四肢 - 左下肢 */}
              <path
                d="M 260 500 Q 250 550 250 600 L 250 680 Q 250 720 240 750"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M 260 500 Q 250 550 250 600 L 250 680 Q 250 720 240 750"
                fill="none"
                stroke="#f9fafb"
                strokeWidth="18"
                strokeLinecap="round"
              />
              
              {/* 四肢 - 右下肢 */}
              <path
                d="M 340 500 Q 350 550 350 600 L 350 680 Q 350 720 360 750"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M 340 500 Q 350 550 350 600 L 350 680 Q 350 720 360 750"
                fill="none"
                stroke="#f9fafb"
                strokeWidth="18"
                strokeLinecap="round"
              />

              {/* 经络线路 */}
              {getActiveMeridians().map(meridianId => {
                const meridian = MERIDIANS_FULL.find(m => m.id === meridianId)
                if (!meridian) return null
                
                const pathData = meridianPaths[meridianId as keyof typeof meridianPaths]
                if (!pathData) return null
                
                const path = viewMode === "back" && pathData.back ? pathData.back : pathData.front
                const color = meridianColors[meridianId]
                
                return (
                  <g key={meridianId}>
                    {/* 经络线 */}
                    <path
                      d={path}
                      fill="none"
                      stroke={color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={isAnimating ? "10 5" : "0"}
                      className={isAnimating ? "meridian-flow" : ""}
                      style={{
                        animation: isAnimating ? "flowAnimation 2s linear infinite" : "none"
                      }}
                    />
                    
                    {/* 穴位 */}
                    {showLabels && pathData.points.map((point, idx) => (
                      <g
                        key={idx}
                        onClick={() => {
                          const fullAcupoint = ACUPOINTS_FULL.find(a => a.id === point.id)
                          if (fullAcupoint) {
                            setSelectedAcupoint(fullAcupoint)
                            onSelectAcupoint?.(fullAcupoint)
                          }
                        }}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="6"
                          fill={color}
                          stroke="#fff"
                          strokeWidth="2"
                        />
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="3"
                          fill="#fff"
                        />
                        {showLabels && (
                          <text
                            x={point.x}
                            y={point.y - 12}
                            textAnchor="middle"
                            fill="#374151"
                            fontSize="10"
                            fontWeight="500"
                          >
                            {point.name}
                          </text>
                        )}
                      </g>
                    ))}
                  </g>
                )
              })}
            </g>

            {/* 动画样式 */}
            <style>
              {`
                @keyframes flowAnimation {
                  from {
                    stroke-dashoffset: 100;
                  }
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                .meridian-flow {
                  animation: flowAnimation 2s linear infinite;
                }
              `}
            </style>
          </svg>
        </div>

        {/* 缩放控制 */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50"
          >
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50"
          >
            <ZoomOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 图例 */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 max-w-xs">
          <div className="text-xs font-medium text-gray-700 mb-2">经络图例</div>
          <div className="space-y-1">
            {getActiveMeridians().slice(0, 6).map(meridianId => {
              const meridian = MERIDIANS_FULL.find(m => m.id === meridianId)
              if (!meridian) return null
              return (
                <div key={meridianId} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-4 h-1 rounded"
                    style={{ backgroundColor: meridianColors[meridianId] }}
                  />
                  <span className="text-gray-600">{meridian.nameAbbr}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 穴位详情弹窗 */}
      {selectedAcupoint && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setSelectedAcupoint(null)}>
          <div
            className="w-full bg-white rounded-t-3xl max-h-[70vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-4 py-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{selectedAcupoint.name}</h3>
                <p className="text-sm text-[#0891b2]">{selectedAcupoint.meridianName} · {selectedAcupoint.category}</p>
              </div>
              <button
                onClick={() => setSelectedAcupoint(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm font-medium text-gray-800 mb-2">定位</div>
                <div className="text-sm text-gray-600">{selectedAcupoint.location}</div>
                {selectedAcupoint.locationDesc && (
                  <div className="text-xs text-gray-500 mt-1">取穴：{selectedAcupoint.locationDesc}</div>
                )}
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm font-medium text-blue-900 mb-2">功效</div>
                <div className="flex flex-wrap gap-2">
                  {selectedAcupoint.functions.map((f: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{f}</span>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-sm font-medium text-green-900 mb-2">主治</div>
                <div className="text-sm text-green-700">{selectedAcupoint.indications.join('、')}</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="text-sm font-medium text-orange-900 mb-2">刺灸法</div>
                <div className="text-sm text-orange-700 mb-2">{selectedAcupoint.method}</div>
                <div className="text-sm text-orange-700">{selectedAcupoint.moxibustion}</div>
                {selectedAcupoint.caution && (
                  <div className="mt-2 text-xs text-red-600">注意：{selectedAcupoint.caution}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
