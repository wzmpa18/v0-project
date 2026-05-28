"use client"

import { useRef, useState, Suspense, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Environment } from "@react-three/drei"
import * as THREE from "three"
import { 
  ALL_ACUPOINTS, 
  ACUPOINTS_BY_MERIDIAN, 
  MERIDIAN_INFO,
  MERIDIAN_PATHS,
  Acupoint 
} from "@/lib/acupoints"
import { MERIDIAN_COLORS } from "@/lib/acupoints/meridian-colors"

// 经络流动粒子组件
function MeridianFlowParticle({ 
  points, 
  color, 
  speed = 1,
  direction = 'down',
  index = 0 
}: { 
  points: Acupoint[]
  color: string
  speed?: number
  direction?: 'up' | 'down'
  index?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [progress, setProgress] = useState(index * 0.1) // 错开起始位置
  
  // 构建经络路径
  const path = useMemo(() => {
    if (points.length < 2) return null
    
    const sortedPoints = direction === 'down' 
      ? [...points].sort((a, b) => (b.position?.[1] || 0) - (a.position?.[1] || 0))
      : [...points].sort((a, b) => (a.position?.[1] || 0) - (b.position?.[1] || 0))
    
    const curve = new THREE.CatmullRomCurve3(
      sortedPoints.map(p => new THREE.Vector3(
        (p.position?.[0] || 0) * 1.5,
        (p.position?.[1] || 0) * 1.5,
        (p.position?.[2] || 0) * 1.5
      ))
    )
    return curve
  }, [points, direction])
  
  useFrame((state, delta) => {
    if (!path || !meshRef.current) return
    
    // 更新进度
    setProgress(prev => {
      const newProgress = prev + delta * speed * 0.15
      return newProgress > 1 ? 0 : newProgress
    })
    
    // 获取路径上的位置
    const position = path.getPoint(progress)
    meshRef.current.position.copy(position)
    
    // 脉冲效果
    const pulse = 0.8 + Math.sin(state.clock.elapsedTime * 5 + index * 2) * 0.4
    meshRef.current.scale.setScalar(pulse)
  })
  
  if (!path) return null
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial 
        color={color}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// 经络线条组件
function MeridianLine({ 
  points, 
  color, 
  isActive,
  direction = 'down'
}: { 
  points: Acupoint[]
  color: string
  isActive: boolean
  direction?: 'up' | 'down'
}) {
  const lineRef = useRef<THREE.Line>(null)
  const [flowOffset, setFlowOffset] = useState(0)
  
  // 构建线条几何体
  const geometry = useMemo(() => {
    if (points.length < 2) return null
    
    const sortedPoints = direction === 'down' 
      ? [...points].sort((a, b) => (b.position?.[1] || 0) - (a.position?.[1] || 0))
      : [...points].sort((a, b) => (a.position?.[1] || 0) - (b.position?.[1] || 0))
    
    const curve = new THREE.CatmullRomCurve3(
      sortedPoints.map(p => new THREE.Vector3(
        (p.position?.[0] || 0) * 1.5,
        (p.position?.[1] || 0) * 1.5,
        (p.position?.[2] || 0) * 1.5
      ))
    )
    
    const linePoints = curve.getPoints(50)
    const geo = new THREE.BufferGeometry().setFromPoints(linePoints)
    return geo
  }, [points, direction])
  
  // 动画流动效果
  useFrame((state, delta) => {
    if (isActive) {
      setFlowOffset(prev => (prev + delta * 0.5) % 1)
    }
  })
  
  if (!geometry) return null
  
  return (
    <group>
      {/* 主线条 */}
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial 
          color={color}
          transparent
          opacity={isActive ? 0.8 : 0.3}
          linewidth={2}
        />
      </line>
      
      {/* 流动粒子 */}
      {isActive && points.length >= 2 && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <MeridianFlowParticle 
              key={i}
              points={points}
              color={color}
              speed={1.2}
              direction={direction}
              index={i}
            />
          ))}
        </>
      )}
    </group>
  )
}

// 人体模型组件
function HumanBodyMesh() {
  const bodyRef = useRef<THREE.Group>(null)
  
  const bodyParts = useMemo(() => {
    const parts: { geometry: THREE.BufferGeometry; position: [number, number, number]; scale: [number, number, number]; rotation?: [number, number, number] }[] = []
    
    // 头部
    parts.push({ geometry: new THREE.SphereGeometry(0.28, 32, 32), position: [0, 2.05, 0], scale: [1, 1.1, 0.95] })
    // 颈部
    parts.push({ geometry: new THREE.CylinderGeometry(0.1, 0.12, 0.18, 16), position: [0, 1.82, 0], scale: [1, 1, 1] })
    // 躯干
    parts.push({ geometry: new THREE.CylinderGeometry(0.28, 0.22, 0.85, 16), position: [0, 1.3, 0], scale: [1.1, 1, 0.7] })
    // 腹部
    parts.push({ geometry: new THREE.CylinderGeometry(0.22, 0.2, 0.35, 16), position: [0, 0.78, 0], scale: [1.1, 1, 0.7] })
    // 髋部
    parts.push({ geometry: new THREE.SphereGeometry(0.24, 16, 16), position: [0, 0.55, 0], scale: [1.2, 0.6, 0.8] })
    // 左大腿
    parts.push({ geometry: new THREE.CylinderGeometry(0.1, 0.08, 0.5, 12), position: [0.15, 0.25, 0], scale: [1, 1, 1] })
    // 右大腿
    parts.push({ geometry: new THREE.CylinderGeometry(0.1, 0.08, 0.5, 12), position: [-0.15, 0.25, 0], scale: [1, 1, 1] })
    // 左小腿
    parts.push({ geometry: new THREE.CylinderGeometry(0.07, 0.05, 0.5, 12), position: [0.15, -0.25, 0], scale: [1, 1, 1] })
    // 右小腿
    parts.push({ geometry: new THREE.CylinderGeometry(0.07, 0.05, 0.5, 12), position: [-0.15, -0.25, 0], scale: [1, 1, 1] })
    // 左脚
    parts.push({ geometry: new THREE.BoxGeometry(0.1, 0.06, 0.2), position: [0.15, -0.53, 0.05], scale: [1, 1, 1] })
    // 右脚
    parts.push({ geometry: new THREE.BoxGeometry(0.1, 0.06, 0.2), position: [-0.15, -0.53, 0.05], scale: [1, 1, 1] })
    // 左上臂
    parts.push({ geometry: new THREE.CylinderGeometry(0.06, 0.05, 0.4, 12), position: [0.42, 1.4, 0], scale: [1, 1, 1], rotation: [0, 0, 0.2] })
    // 右上臂
    parts.push({ geometry: new THREE.CylinderGeometry(0.06, 0.05, 0.4, 12), position: [-0.42, 1.4, 0], scale: [1, 1, 1], rotation: [0, 0, -0.2] })
    // 左前臂
    parts.push({ geometry: new THREE.CylinderGeometry(0.045, 0.035, 0.38, 12), position: [0.5, 1.0, 0], scale: [1, 1, 1] })
    // 右前臂
    parts.push({ geometry: new THREE.CylinderGeometry(0.045, 0.035, 0.38, 12), position: [-0.5, 1.0, 0], scale: [1, 1, 1] })
    // 左手
    parts.push({ geometry: new THREE.SphereGeometry(0.06, 12, 12), position: [0.55, 0.75, 0], scale: [1, 1.5, 0.6] })
    // 右手
    parts.push({ geometry: new THREE.SphereGeometry(0.06, 12, 12), position: [-0.55, 0.75, 0], scale: [1, 1.5, 0.6] })
    // 左肩
    parts.push({ geometry: new THREE.SphereGeometry(0.08, 12, 12), position: [0.35, 1.62, 0], scale: [1, 0.7, 0.8] })
    // 右肩
    parts.push({ geometry: new THREE.SphereGeometry(0.08, 12, 12), position: [-0.35, 1.62, 0], scale: [1, 0.7, 0.8] })
    
    return parts
  }, [])
  
  return (
    <group ref={bodyRef} scale={[1.5, 1.5, 1.5]} position={[0, -1.5, 0]}>
      {bodyParts.map((part, index) => (
        <mesh
          key={index}
          geometry={part.geometry}
          position={part.position}
          scale={part.scale}
          rotation={part.rotation || [0, 0, 0]}
        >
          <meshStandardMaterial
            color="#e8d5b7"
            roughness={0.7}
            metalness={0.1}
            transparent
            opacity={0.75}
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
  showLabel,
  onClick 
}: { 
  point: Acupoint
  isSelected: boolean
  isHighlighted: boolean
  showLabel?: boolean
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const color = MERIDIAN_COLORS[point.meridian] || "#d4af37"
  const position = point.position || [0, 0, 0]
  
  useFrame((state) => {
    if (meshRef.current) {
      if (isSelected || hovered) {
        meshRef.current.scale.setScalar(1.8 + Math.sin(state.clock.elapsedTime * 4) * 0.3)
      } else if (isHighlighted) {
        meshRef.current.scale.setScalar(1.4 + Math.sin(state.clock.elapsedTime * 3) * 0.15)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
    
    // 发光效果
    if (glowRef.current && (isSelected || isHighlighted)) {
      glowRef.current.scale.setScalar(2.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5)
    }
  })
  
  return (
    <group position={[position[0] * 1.5, position[1] * 1.5 - 1.5, position[2] * 1.5]}>
      {/* 发光效果 */}
      {(isSelected || isHighlighted) && (
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial 
            color={color}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
      
      {/* 穴位点 */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={isSelected || hovered ? 1 : isHighlighted ? 0.6 : 0.3}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      
      {/* 标签 */}
      {(isSelected || hovered || showLabel) && (
        <Html center distanceFactor={4}>
          <div className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-[#d4af37]/50 rounded-lg px-2 py-1 whitespace-nowrap shadow-xl pointer-events-none">
            <div className="text-[#d4af37] font-bold text-xs">{point.name}</div>
            {(isSelected || hovered) && (
              <div className="text-[#c5c5c5] text-[10px]">{point.meridian}</div>
            )}
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
  autoRotate,
  showFlow,
  showAllPoints
}: { 
  selectedPoint: string | null
  selectedMeridian: string | null
  onSelectPoint: (id: string | null) => void
  autoRotate: boolean
  showFlow: boolean
  showAllPoints: boolean
}) {
  // 获取当前显示的穴位
  const displayPoints = useMemo(() => {
    if (selectedMeridian && ACUPOINTS_BY_MERIDIAN[selectedMeridian]) {
      return ACUPOINTS_BY_MERIDIAN[selectedMeridian]
    }
    return showAllPoints ? ALL_ACUPOINTS : ALL_ACUPOINTS.slice(0, 100) // 限制默认显示数量
  }, [selectedMeridian, showAllPoints])
  
  // 获取经络路径信息
  const meridianPath = selectedMeridian ? MERIDIAN_PATHS[selectedMeridian] : null
  const meridianInfo = selectedMeridian ? MERIDIAN_INFO[selectedMeridian] : null
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />
      <pointLight position={[0, 3, 2]} intensity={0.4} color="#ffd700" />
      
      <HumanBodyMesh />
      
      {/* 经络线条和流动动画 */}
      {selectedMeridian && meridianPath && (
        <group position={[0, -1.5, 0]}>
          <MeridianLine 
            points={meridianPath.points}
            color={meridianInfo?.color || "#d4af37"}
            isActive={showFlow}
            direction={meridianPath.direction}
          />
        </group>
      )}
      
      {/* 穴位点 */}
      {displayPoints.map((point) => (
        <AcupointMarker
          key={point.id}
          point={point}
          isSelected={selectedPoint === point.id}
          isHighlighted={selectedMeridian === point.meridian}
          showLabel={selectedMeridian === point.meridian}
          onClick={() => onSelectPoint(selectedPoint === point.id ? null : point.id)}
        />
      ))}
      
      <OrbitControls 
        enablePan={false}
        minDistance={2}
        maxDistance={8}
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
  onSelectPoint?: (point: Acupoint | null) => void
  selectedMeridian?: string | null
  height?: string
  showControls?: boolean
}

export function HumanBody3D({ 
  onSelectPoint, 
  selectedMeridian = null,
  height = "500px",
  showControls = true
}: HumanBody3DProps) {
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showFlow, setShowFlow] = useState(true)
  const [showAllPoints, setShowAllPoints] = useState(false)
  
  const handleSelectPoint = (id: string | null) => {
    setSelectedPointId(id)
    setAutoRotate(false)
    if (onSelectPoint) {
      const point = id ? ALL_ACUPOINTS.find(p => p.id === id) || null : null
      onSelectPoint(point)
    }
  }
  
  const selectedPoint = selectedPointId ? ALL_ACUPOINTS.find(p => p.id === selectedPointId) : null
  const meridianInfo = selectedMeridian ? MERIDIAN_INFO[selectedMeridian] : null
  
  // 统计当前显示的穴位数量
  const displayCount = selectedMeridian && ACUPOINTS_BY_MERIDIAN[selectedMeridian] 
    ? ACUPOINTS_BY_MERIDIAN[selectedMeridian].length 
    : (showAllPoints ? ALL_ACUPOINTS.length : Math.min(100, ALL_ACUPOINTS.length))
  
  return (
    <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#252525] rounded-2xl overflow-hidden border border-[#4a4a4a]">
      {/* 3D Canvas */}
      <div style={{ height }}>
        <Canvas
          camera={{ position: [0, 0.5, 4], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene 
              selectedPoint={selectedPointId}
              selectedMeridian={selectedMeridian}
              onSelectPoint={handleSelectPoint}
              autoRotate={autoRotate}
              showFlow={showFlow}
              showAllPoints={showAllPoints}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* 控制面板 */}
      {showControls && (
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs transition-all ${
              autoRotate 
                ? "bg-[#d4af37] text-[#1a1a1a]" 
                : "bg-[#252525]/90 text-[#e5e5e5] border border-[#4a4a4a]"
            }`}
            title={autoRotate ? "停止旋转" : "自动旋转"}
          >
            {autoRotate ? "⟳" : "○"}
          </button>
          
          {selectedMeridian && (
            <button
              onClick={() => setShowFlow(!showFlow)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs transition-all ${
                showFlow 
                  ? "bg-[#4CAF50] text-white" 
                  : "bg-[#252525]/90 text-[#e5e5e5] border border-[#4a4a4a]"
              }`}
              title={showFlow ? "关闭流动" : "显示流动"}
            >
              {showFlow ? "〰" : "—"}
            </button>
          )}
          
          {!selectedMeridian && (
            <button
              onClick={() => setShowAllPoints(!showAllPoints)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs transition-all ${
                showAllPoints 
                  ? "bg-[#2196F3] text-white" 
                  : "bg-[#252525]/90 text-[#e5e5e5] border border-[#4a4a4a]"
              }`}
              title={showAllPoints ? "显示部分穴位" : "显示全部穴位"}
            >
              {showAllPoints ? "◉" : "◎"}
            </button>
          )}
        </div>
      )}
      
      {/* 经络信息 */}
      {meridianInfo && (
        <div className="absolute top-3 right-3 bg-[#1a1a1a]/95 backdrop-blur-sm rounded-xl p-3 border border-[#4a4a4a] max-w-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: meridianInfo.color }}
            />
            <span className="text-[#f5f5f5] text-sm font-medium">{meridianInfo.name}</span>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="text-[#c5c5c5]">穴位数: <span className="text-[#d4af37]">{meridianInfo.count}穴</span></div>
            <div className="text-[#c5c5c5]">巡行: <span className="text-[#e5e5e5]">{meridianInfo.flow}</span></div>
            {meridianInfo.time && (
              <div className="text-[#c5c5c5]">当令: <span className="text-[#d4af37]">{meridianInfo.time}</span></div>
            )}
            {meridianInfo.element && (
              <div className="text-[#c5c5c5]">五行: <span className="text-[#e5e5e5]">{meridianInfo.element}</span></div>
            )}
          </div>
          {showFlow && (
            <div className="mt-2 pt-2 border-t border-[#4a4a4a]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: meridianInfo.color }} />
                <span className="text-[10px] text-[#c5c5c5]">气血流动中</span>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* 图例（无选中经络时显示） */}
      {!selectedMeridian && (
        <div className="absolute top-3 right-3 bg-[#1a1a1a]/90 backdrop-blur-sm rounded-lg p-2 border border-[#4a4a4a]">
          <div className="text-[10px] text-[#c5c5c5] mb-1.5">经络图例</div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {Object.entries(MERIDIAN_COLORS).slice(0, 10).map(([name, color]) => (
              <div key={name} className="flex items-center gap-1.5">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[9px] text-[#e5e5e5] truncate max-w-[60px]">{name.replace('手', '').replace('足', '')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 选中穴位详情 */}
      {selectedPoint && (
        <div className="absolute bottom-3 left-3 right-3 bg-[#1a1a1a]/95 backdrop-blur-sm rounded-xl p-3 border border-[#d4af37]/50">
          <div className="flex items-start gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-[#1a1a1a] flex-shrink-0"
              style={{ backgroundColor: MERIDIAN_COLORS[selectedPoint.meridian] || "#d4af37" }}
            >
              {selectedPoint.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#f5f5f5] font-bold">{selectedPoint.name}</span>
                <span className="text-[#c5c5c5] text-xs">{selectedPoint.pinyin}</span>
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
              {selectedPoint.location && (
                <div className="text-[#888] text-xs mt-1">定位: {selectedPoint.location}</div>
              )}
              {selectedPoint.indication && (
                <div className="text-[#c5c5c5] text-xs mt-1 line-clamp-2">功效: {selectedPoint.indication}</div>
              )}
            </div>
            <button
              onClick={() => handleSelectPoint(null)}
              className="text-[#888] hover:text-[#f5f5f5] transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      {/* 穴位数量提示 */}
      <div className="absolute bottom-3 right-3 text-[10px] text-[#888]">
        {displayCount} 个穴位
        {!selectedMeridian && !showAllPoints && ALL_ACUPOINTS.length > 100 && (
          <span className="text-[#666]"> / {ALL_ACUPOINTS.length}</span>
        )}
      </div>
    </div>
  )
}

export { ALL_ACUPOINTS, MERIDIAN_COLORS }
