"use client"

import { useRef, useState, Suspense, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, Environment } from "@react-three/drei"
import * as THREE from "three"

// 穴位数据 - 主要经络穴位
const ACUPOINTS = [
  // 头部穴位
  { id: "baihui", name: "百会", position: [0, 2.35, 0.05], meridian: "督脉", effect: "醒脑开窍，升阳举陷" },
  { id: "yintang", name: "印堂", position: [0, 2.1, 0.45], meridian: "经外奇穴", effect: "清头明目，通鼻开窍" },
  { id: "taiyang", name: "太阳", position: [0.35, 2.0, 0.25], meridian: "经外奇穴", effect: "清热止痛，明目" },
  { id: "fengchi", name: "风池", position: [0.2, 1.95, -0.25], meridian: "胆经", effect: "祛风解表，清头明目" },
  
  // 颈肩穴位
  { id: "dazhui", name: "大椎", position: [0, 1.75, -0.18], meridian: "督脉", effect: "清热解表，通阳" },
  { id: "jianjing", name: "肩井", position: [0.3, 1.65, -0.05], meridian: "胆经", effect: "祛风活络，通乳" },
  
  // 胸腹穴位
  { id: "danzhong", name: "膻中", position: [0, 1.35, 0.22], meridian: "任脉", effect: "宽胸理气，降逆止呕" },
  { id: "zhongwan", name: "中脘", position: [0, 1.05, 0.2], meridian: "任脉", effect: "健脾和胃，降逆止呕" },
  { id: "qihai", name: "气海", position: [0, 0.78, 0.18], meridian: "任脉", effect: "补气益元，温阳固脱" },
  { id: "guanyuan", name: "关元", position: [0, 0.68, 0.17], meridian: "任脉", effect: "培补元气，回阳救逆" },
  
  // 手臂穴位
  { id: "quchi", name: "曲池", position: [0.55, 1.0, 0.05], meridian: "大肠经", effect: "清热解表，调和气血" },
  { id: "hegu", name: "合谷", position: [0.65, 0.6, 0.08], meridian: "大肠经", effect: "镇静止痛，通经活络" },
  { id: "neiguan", name: "内关", position: [0.5, 0.7, 0.12], meridian: "心包经", effect: "宁心安神，理气止痛" },
  { id: "shenmen", name: "神门", position: [0.45, 0.55, 0.1], meridian: "心经", effect: "安神定志，清心火" },
  
  // 背部穴位
  { id: "feishu", name: "肺俞", position: [0.1, 1.55, -0.2], meridian: "膀胱经", effect: "调补肺气，止咳平喘" },
  { id: "xinshu", name: "心俞", position: [0.1, 1.4, -0.22], meridian: "膀胱经", effect: "宁心安神，通络活血" },
  { id: "ganshu", name: "肝俞", position: [0.1, 1.2, -0.22], meridian: "膀胱经", effect: "疏肝利胆，明目" },
  { id: "pishu", name: "脾俞", position: [0.1, 1.1, -0.22], meridian: "膀胱经", effect: "健脾利湿，和胃" },
  { id: "shenshu", name: "肾俞", position: [0.12, 0.95, -0.2], meridian: "膀胱经", effect: "补肾益精，强腰" },
  { id: "mingmen", name: "命门", position: [0, 0.95, -0.18], meridian: "督脉", effect: "补肾壮阳，培元固本" },
  
  // 腿部穴位
  { id: "zusanli", name: "足三里", position: [0.22, 0.0, 0.12], meridian: "胃经", effect: "健脾和胃，扶正培元" },
  { id: "yanglingquan", name: "阳陵泉", position: [0.25, 0.1, 0.08], meridian: "胆经", effect: "疏肝利胆，舒筋活络" },
  { id: "sanyinjiao", name: "三阴交", position: [0.15, -0.35, 0.05], meridian: "脾经", effect: "健脾益血，调肝补肾" },
  { id: "taixi", name: "太溪", position: [0.12, -0.55, -0.02], meridian: "肾经", effect: "滋阴补肾，清虚热" },
  
  // 足部穴位
  { id: "yongquan", name: "涌泉", position: [0.1, -0.7, 0.08], meridian: "肾经", effect: "滋阴降火，开窍苏厥" },
  { id: "taichong", name: "太冲", position: [0.15, -0.68, 0.12], meridian: "肝经", effect: "疏肝解郁，平肝熄风" },
]

// 经络颜色映射
const MERIDIAN_COLORS: Record<string, string> = {
  "督脉": "#e63946",
  "任脉": "#f4a261",
  "胆经": "#2a9d8f",
  "肝经": "#264653",
  "肺经": "#e9c46a",
  "大肠经": "#f4a261",
  "胃经": "#e76f51",
  "脾经": "#ffc300",
  "心经": "#d62828",
  "小肠经": "#ff6b6b",
  "膀胱经": "#4361ee",
  "肾经": "#3a0ca3",
  "心包经": "#7209b7",
  "三焦经": "#f72585",
  "经外奇穴": "#06d6a0",
}

// 人体模型组件
function HumanBodyMesh({ selectedMeridian }: { selectedMeridian: string | null }) {
  const bodyRef = useRef<THREE.Group>(null)
  
  // 身体各部分
  const bodyParts = useMemo(() => {
    const parts: { geometry: THREE.BufferGeometry; position: [number, number, number]; scale: [number, number, number] }[] = []
    
    // 头部
    const headGeometry = new THREE.SphereGeometry(0.28, 32, 32)
    parts.push({ geometry: headGeometry, position: [0, 2.05, 0], scale: [1, 1.1, 0.95] })
    
    // 颈部
    const neckGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.18, 16)
    parts.push({ geometry: neckGeometry, position: [0, 1.82, 0], scale: [1, 1, 1] })
    
    // 躯干
    const torsoGeometry = new THREE.CylinderGeometry(0.28, 0.22, 0.85, 16)
    parts.push({ geometry: torsoGeometry, position: [0, 1.3, 0], scale: [1.1, 1, 0.7] })
    
    // 腹部
    const abdomenGeometry = new THREE.CylinderGeometry(0.22, 0.2, 0.35, 16)
    parts.push({ geometry: abdomenGeometry, position: [0, 0.78, 0], scale: [1.1, 1, 0.7] })
    
    // 髋部
    const hipGeometry = new THREE.SphereGeometry(0.24, 16, 16)
    parts.push({ geometry: hipGeometry, position: [0, 0.55, 0], scale: [1.2, 0.6, 0.8] })
    
    // 左大腿
    const leftThighGeometry = new THREE.CylinderGeometry(0.1, 0.08, 0.5, 12)
    parts.push({ geometry: leftThighGeometry, position: [0.15, 0.25, 0], scale: [1, 1, 1] })
    
    // 右大腿
    const rightThighGeometry = new THREE.CylinderGeometry(0.1, 0.08, 0.5, 12)
    parts.push({ geometry: rightThighGeometry, position: [-0.15, 0.25, 0], scale: [1, 1, 1] })
    
    // 左小腿
    const leftCalfGeometry = new THREE.CylinderGeometry(0.07, 0.05, 0.5, 12)
    parts.push({ geometry: leftCalfGeometry, position: [0.15, -0.25, 0], scale: [1, 1, 1] })
    
    // 右小腿
    const rightCalfGeometry = new THREE.CylinderGeometry(0.07, 0.05, 0.5, 12)
    parts.push({ geometry: rightCalfGeometry, position: [-0.15, -0.25, 0], scale: [1, 1, 1] })
    
    // 左脚
    const leftFootGeometry = new THREE.BoxGeometry(0.1, 0.06, 0.2)
    parts.push({ geometry: leftFootGeometry, position: [0.15, -0.53, 0.05], scale: [1, 1, 1] })
    
    // 右脚
    const rightFootGeometry = new THREE.BoxGeometry(0.1, 0.06, 0.2)
    parts.push({ geometry: rightFootGeometry, position: [-0.15, -0.53, 0.05], scale: [1, 1, 1] })
    
    // 左上臂
    const leftUpperArmGeometry = new THREE.CylinderGeometry(0.06, 0.05, 0.4, 12)
    parts.push({ geometry: leftUpperArmGeometry, position: [0.42, 1.4, 0], scale: [1, 1, 1] })
    
    // 右上臂
    const rightUpperArmGeometry = new THREE.CylinderGeometry(0.06, 0.05, 0.4, 12)
    parts.push({ geometry: rightUpperArmGeometry, position: [-0.42, 1.4, 0], scale: [1, 1, 1] })
    
    // 左前臂
    const leftForearmGeometry = new THREE.CylinderGeometry(0.045, 0.035, 0.38, 12)
    parts.push({ geometry: leftForearmGeometry, position: [0.5, 1.0, 0], scale: [1, 1, 1] })
    
    // 右前臂
    const rightForearmGeometry = new THREE.CylinderGeometry(0.045, 0.035, 0.38, 12)
    parts.push({ geometry: rightForearmGeometry, position: [-0.5, 1.0, 0], scale: [1, 1, 1] })
    
    // 左手
    const leftHandGeometry = new THREE.SphereGeometry(0.06, 12, 12)
    parts.push({ geometry: leftHandGeometry, position: [0.55, 0.75, 0], scale: [1, 1.5, 0.6] })
    
    // 右手
    const rightHandGeometry = new THREE.SphereGeometry(0.06, 12, 12)
    parts.push({ geometry: rightHandGeometry, position: [-0.55, 0.75, 0], scale: [1, 1.5, 0.6] })
    
    // 左肩
    const leftShoulderGeometry = new THREE.SphereGeometry(0.08, 12, 12)
    parts.push({ geometry: leftShoulderGeometry, position: [0.35, 1.62, 0], scale: [1, 0.7, 0.8] })
    
    // 右肩
    const rightShoulderGeometry = new THREE.SphereGeometry(0.08, 12, 12)
    parts.push({ geometry: rightShoulderGeometry, position: [-0.35, 1.62, 0], scale: [1, 0.7, 0.8] })
    
    return parts
  }, [])
  
  return (
    <group ref={bodyRef}>
      {bodyParts.map((part, index) => (
        <mesh
          key={index}
          geometry={part.geometry}
          position={part.position}
          scale={part.scale}
        >
          <meshStandardMaterial
            color="#e8d5b7"
            roughness={0.7}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}

// 穴位点组件
function AcupointMarker({ 
  point, 
  isSelected, 
  isHighlighted,
  onClick 
}: { 
  point: typeof ACUPOINTS[0]
  isSelected: boolean
  isHighlighted: boolean
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const color = MERIDIAN_COLORS[point.meridian] || "#d4af37"
  
  useFrame((state) => {
    if (meshRef.current) {
      if (isSelected || hovered) {
        meshRef.current.scale.setScalar(1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2)
      } else if (isHighlighted) {
        meshRef.current.scale.setScalar(1.3)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })
  
  return (
    <group position={point.position as [number, number, number]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={isSelected || hovered ? 0.8 : isHighlighted ? 0.5 : 0.3}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      
      {(isSelected || hovered) && (
        <Html center distanceFactor={3}>
          <div className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-[#d4af37]/50 rounded-xl px-3 py-2 whitespace-nowrap shadow-xl pointer-events-none">
            <div className="text-[#d4af37] font-bold text-sm">{point.name}</div>
            <div className="text-[#c5c5c5] text-xs">{point.meridian}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

// 场景组件
function Scene({ 
  selectedPoint, 
  selectedMeridian,
  onSelectPoint,
  autoRotate
}: { 
  selectedPoint: string | null
  selectedMeridian: string | null
  onSelectPoint: (id: string | null) => void
  autoRotate: boolean
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} />
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#ffd700" />
      
      <HumanBodyMesh selectedMeridian={selectedMeridian} />
      
      {ACUPOINTS.map((point) => (
        <AcupointMarker
          key={point.id}
          point={point}
          isSelected={selectedPoint === point.id}
          isHighlighted={selectedMeridian === point.meridian}
          onClick={() => onSelectPoint(selectedPoint === point.id ? null : point.id)}
        />
      ))}
      
      <OrbitControls 
        enablePan={false}
        minDistance={2}
        maxDistance={6}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.9}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
      />
      
      <Environment preset="studio" />
    </>
  )
}

// 主组件
interface HumanBody3DProps {
  onSelectPoint?: (point: typeof ACUPOINTS[0] | null) => void
  selectedMeridian?: string | null
  height?: string
}

export function HumanBody3D({ 
  onSelectPoint, 
  selectedMeridian = null,
  height = "400px" 
}: HumanBody3DProps) {
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [viewMode, setViewMode] = useState<"front" | "back" | "side">("front")
  
  const handleSelectPoint = (id: string | null) => {
    setSelectedPointId(id)
    setAutoRotate(false)
    if (onSelectPoint) {
      const point = id ? ACUPOINTS.find(p => p.id === id) || null : null
      onSelectPoint(point)
    }
  }
  
  const selectedPoint = selectedPointId ? ACUPOINTS.find(p => p.id === selectedPointId) : null
  
  // 获取当前经络的所有穴位
  const filteredPoints = selectedMeridian 
    ? ACUPOINTS.filter(p => p.meridian === selectedMeridian)
    : ACUPOINTS
  
  return (
    <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#252525] rounded-2xl overflow-hidden border border-[#4a4a4a]">
      {/* 3D Canvas */}
      <div style={{ height }}>
        <Canvas
          camera={{ position: [0, 1.2, 3.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene 
              selectedPoint={selectedPointId}
              selectedMeridian={selectedMeridian}
              onSelectPoint={handleSelectPoint}
              autoRotate={autoRotate}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* 控制面板 */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
            autoRotate 
              ? "bg-[#d4af37] text-[#1a1a1a]" 
              : "bg-[#252525]/90 text-[#e5e5e5] border border-[#4a4a4a]"
          }`}
        >
          {autoRotate ? "◉" : "○"}
        </button>
      </div>
      
      {/* 图例 */}
      <div className="absolute top-3 right-3 bg-[#1a1a1a]/90 backdrop-blur-sm rounded-lg p-2 border border-[#4a4a4a]">
        <div className="text-[10px] text-[#c5c5c5] mb-1.5">经络图例</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {Object.entries(MERIDIAN_COLORS).slice(0, 8).map(([name, color]) => (
            <div key={name} className="flex items-center gap-1.5">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] text-[#e5e5e5]">{name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* 选中穴位详情 */}
      {selectedPoint && (
        <div className="absolute bottom-3 left-3 right-3 bg-[#1a1a1a]/95 backdrop-blur-sm rounded-xl p-3 border border-[#d4af37]/50">
          <div className="flex items-start gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-[#1a1a1a]"
              style={{ backgroundColor: MERIDIAN_COLORS[selectedPoint.meridian] || "#d4af37" }}
            >
              {selectedPoint.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[#f5f5f5] font-bold">{selectedPoint.name}</span>
                <span 
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: `${MERIDIAN_COLORS[selectedPoint.meridian]}20`,
                    color: MERIDIAN_COLORS[selectedPoint.meridian]
                  }}
                >
                  {selectedPoint.meridian}
                </span>
              </div>
              <div className="text-[#c5c5c5] text-sm mt-1">{selectedPoint.effect}</div>
            </div>
            <button
              onClick={() => handleSelectPoint(null)}
              className="text-[#888] hover:text-[#f5f5f5] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      {/* 穴位数量提示 */}
      <div className="absolute bottom-3 right-3 text-[10px] text-[#888]">
        {selectedMeridian ? `${filteredPoints.length} 个穴位` : `共 ${ACUPOINTS.length} 个穴位`}
      </div>
    </div>
  )
}

// 导出穴位数据和颜色映射
export { ACUPOINTS, MERIDIAN_COLORS }
