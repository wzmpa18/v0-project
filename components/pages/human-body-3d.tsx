"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, Line } from "@react-three/drei"
import * as THREE from "three"
import {
  Search, Eye, Layers, RotateCcw, Activity, Heart, Bone,
  X, Target, Info, Sparkles, MapPin, Stethoscope, ChevronRight
} from "lucide-react"
import {
  MERIDIAN_PATHS_3D, ORGANS_3D, BONES_3D, MUSCLES_3D, BODY_LANDMARKS,
  type MeridianPath3D
} from "@/lib/meridian-3d-data"
import {
  ALL_ACUPOINTS, MERIDIAN_NAMES, MERIDIAN_COLORS, SYMPTOMS,
  searchAcupoints, recommendAcupoints, getAcupointCombination, getAcupointStats,
  type UnifiedAcupoint, type Recommendation
} from "@/lib/acupoints-engine"

// ═══════════════════════════════════════════════════════════
// 常量定义
// ═══════════════════════════════════════════════════════════

const SYSTEM_LABELS: Record<string, string> = {
  fourteen: "十四经穴",
  extra: "经外奇穴",
  dong: "董氏奇穴",
}

// 身体部位3D热点（12个区域）
const BODY_PART_HOTSPOTS: { id: string; name: string; position: [number, number, number] }[] = [
  { id: "head", name: "头面部", position: [0, 0.78, 0.06] },
  { id: "neck", name: "颈项部", position: [0, 0.52, 0.0] },
  { id: "chest", name: "胸腹部", position: [0, 0.2, 0.1] },
  { id: "back", name: "腰背部", position: [0, 0.2, -0.14] },
  { id: "shoulder", name: "肩臂部", position: [0.22, 0.42, 0.0] },
  { id: "arm", name: "上肢部", position: [0.25, 0.15, 0.03] },
  { id: "hand", name: "手部", position: [0.22, -0.24, 0.05] },
  { id: "hip", name: "髋臀部", position: [0.12, -0.18, 0.02] },
  { id: "thigh", name: "大腿部", position: [0.12, -0.35, 0.05] },
  { id: "knee", name: "膝部", position: [0.13, -0.48, 0.05] },
  { id: "leg", name: "小腿部", position: [0.12, -0.65, 0.04] },
  { id: "foot", name: "足部", position: [0.12, -0.85, 0.05] },
]

// ═══════════════════════════════════════════════════════════
// 辅助函数
// ═══════════════════════════════════════════════════════════

function getPointColor(point: UnifiedAcupoint): string {
  if (point.system === "extra") return "#00CED1"
  if (point.system === "dong") return "#FF8C00"
  return MERIDIAN_COLORS[point.meridian] || "#FFFFFF"
}

function getStrategyInfo(strategy: Recommendation["strategy"]): { label: string; color: string } {
  switch (strategy) {
    case "meridian": return { label: "循经取穴", color: "#4169E1" }
    case "biaoli": return { label: "表里配伍", color: "#228B22" }
    case "symptom": return { label: "对症选穴", color: "#FF8C00" }
  }
}

// ═══════════════════════════════════════════════════════════
// 3D 模型组件
// ═══════════════════════════════════════════════════════════

// 皮肤身体模型
function SkinBody({ opacity }: { opacity: number }) {
  if (opacity <= 0) return null
  return (
    <group>
      <mesh position={[0, 0.72, 0.02]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.12, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      <mesh position={[0, 0.18, 0.04]}>
        <capsuleGeometry args={[0.14, 0.5, 8, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      <mesh position={[-0.22, 0.28, 0.02]} rotation={[0, 0, 0.15]}>
        <capsuleGeometry args={[0.04, 0.45, 8, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      <mesh position={[0.22, 0.28, 0.02]} rotation={[0, 0, -0.15]}>
        <capsuleGeometry args={[0.04, 0.45, 8, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      <mesh position={[-0.12, -0.48, 0.03]} rotation={[0.05, 0, 0]}>
        <capsuleGeometry args={[0.05, 0.6, 8, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      <mesh position={[0.12, -0.48, 0.03]} rotation={[0.05, 0, 0]}>
        <capsuleGeometry args={[0.05, 0.6, 8, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      <mesh position={[-0.22, -0.22, 0.04]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      <mesh position={[0.22, -0.22, 0.04]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      <mesh position={[-0.12, -0.82, 0.05]}>
        <boxGeometry args={[0.06, 0.04, 0.1]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      <mesh position={[0.12, -0.82, 0.05]}>
        <boxGeometry args={[0.06, 0.04, 0.1]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
    </group>
  )
}

// 骨骼层
function SkeletonLayer({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <group>
      {BONES_3D.map(bone => {
        const start = new THREE.Vector3(...bone.start)
        const end = new THREE.Vector3(...bone.end)
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
        const dir = new THREE.Vector3().subVectors(end, start)
        const length = dir.length()
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.normalize()
        )
        return (
          <mesh key={bone.id} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[bone.thickness, bone.thickness, length, 8]} />
            <meshStandardMaterial color={bone.color} roughness={0.3} />
          </mesh>
        )
      })}
      {Object.entries(BODY_LANDMARKS).map(([key, pos]) => {
        if (key.includes("Shoulder") || key.includes("Elbow") || key.includes("Wrist") ||
            key.includes("Hip") || key.includes("Knee") || key.includes("Ankle") || key === "neck") {
          return (
            <mesh key={key} position={pos}>
              <sphereGeometry args={[0.025, 16, 16]} />
              <meshStandardMaterial color="#FFF8DC" roughness={0.2} />
            </mesh>
          )
        }
        return null
      })}
    </group>
  )
}

// 肌肉层
function MuscleLayer({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <group>
      {MUSCLES_3D.map(muscle => (
        <mesh key={muscle.id} position={muscle.position}>
          <boxGeometry args={muscle.size} />
          <meshStandardMaterial color={muscle.color} roughness={0.6} opacity={0.7} transparent />
        </mesh>
      ))}
    </group>
  )
}

// 脏器层
function OrganLayer({ visible, selectedOrgan, onSelectOrgan }: {
  visible: boolean
  selectedOrgan: string | null
  onSelectOrgan: (id: string | null) => void
}) {
  if (!visible) return null
  return (
    <group>
      {ORGANS_3D.map(organ => {
        const isSelected = selectedOrgan === organ.id
        const color = isSelected ? "#FFD700" : organ.color
        return (
          <mesh
            key={organ.id}
            position={organ.position}
            onClick={(e) => { e.stopPropagation(); onSelectOrgan(isSelected ? null : organ.id) }}
          >
            <boxGeometry args={organ.size} />
            <meshStandardMaterial color={color} roughness={0.5} opacity={isSelected ? 1 : 0.8} transparent />
            {isSelected && (
              <Html distanceFactor={2} position={[0, organ.size[1] / 2 + 0.05, 0]}>
                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">{organ.name}</div>
              </Html>
            )}
          </mesh>
        )
      })}
    </group>
  )
}

// 经络线条
function MeridianLine({ path, isActive }: { path: MeridianPath3D; isActive: boolean }) {
  const points = useMemo(() => path.points.map(p => new THREE.Vector3(...p)), [path.points])
  if (!isActive) return null
  return <Line points={points} color={path.color} lineWidth={2} transparent opacity={0.5} />
}

// 穴位 InstancedMesh（高性能渲染619个穴位）
function AcupointInstances({
  points, onSelect
}: {
  points: UnifiedAcupoint[]
  onSelect: (id: string) => void
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const geometry = useMemo(() => new THREE.SphereGeometry(0.012, 12, 12), [])
  const material = useMemo(() => new THREE.MeshBasicMaterial({ toneMapped: false }), [])

  useEffect(() => () => {
    geometry.dispose()
    material.dispose()
  }, [geometry, material])

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh || points.length === 0) return
    const dummy = new THREE.Object3D()
    const color = new THREE.Color()
    for (let i = 0; i < points.length; i++) {
      const p = points[i]
      dummy.position.set(p.coordinates[0], p.coordinates[1], p.coordinates[2])
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      color.set(getPointColor(p))
      mesh.setColorAt(i, color)
    }
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [points])

  if (points.length === 0) return null

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, points.length]}
      dispose={null}
      onClick={(e) => {
        e.stopPropagation()
        if (e.instanceId !== undefined && e.instanceId < points.length) {
          onSelect(points[e.instanceId].id)
        }
      }}
    />
  )
}

// 选中穴位高亮（金色球 + 发光环 + 标签）
function SelectedPointHighlight({ point }: { point: UnifiedAcupoint | undefined }) {
  if (!point) return null
  const [x, y, z] = point.coordinates
  return (
    <group position={[x, y, z]}>
      <mesh>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial color="#FFD700" toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.028, 0.038, 32]} />
        <meshBasicMaterial color="#FFD700" side={THREE.DoubleSide} transparent opacity={0.8} toneMapped={false} />
      </mesh>
      <Html distanceFactor={3} position={[0, 0.045, 0]} center>
        <div
          className="bg-black/90 text-amber-300 text-xs px-2 py-0.5 rounded whitespace-nowrap border border-amber-500/50"
          style={{ pointerEvents: "none" }}
        >
          {point.name}
        </div>
      </Html>
    </group>
  )
}

// 身体部位热点（点击触发智能推荐）
function BodyPartHotspots({ onSelectPart }: { onSelectPart: (id: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <group>
      {BODY_PART_HOTSPOTS.map(spot => (
        <group key={spot.id} position={spot.position}>
          <mesh
            onClick={(e) => { e.stopPropagation(); onSelectPart(spot.id) }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(spot.id) }}
            onPointerOut={() => setHovered(null)}
          >
            <sphereGeometry args={[hovered === spot.id ? 0.035 : 0.022, 16, 16]} />
            <meshBasicMaterial color="#00CED1" transparent opacity={hovered === spot.id ? 0.6 : 0.3} toneMapped={false} />
          </mesh>
          {hovered === spot.id && (
            <Html distanceFactor={3} position={[0, 0.05, 0]} center>
              <div
                className="bg-cyan-900/90 text-cyan-200 text-xs px-2 py-0.5 rounded whitespace-nowrap border border-cyan-500/50"
                style={{ pointerEvents: "none" }}
              >
                {spot.name} · 点击推荐
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}

// 3D场景内容
function SceneContent({
  activeLayers, activeMeridians, visiblePoints,
  selectedPointData, selectedOrgan, onSelectPoint, onSelectOrgan, onSelectBodyPart
}: {
  activeLayers: { skin: boolean; muscle: boolean; bone: boolean; organ: boolean }
  activeMeridians: string[]
  visiblePoints: UnifiedAcupoint[]
  selectedPointData: UnifiedAcupoint | undefined
  selectedOrgan: string | null
  onSelectPoint: (id: string) => void
  onSelectOrgan: (id: string | null) => void
  onSelectBodyPart: (id: string) => void
}) {
  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <directionalLight position={[-2, -1, -1]} intensity={0.3} />

      <SkinBody opacity={activeLayers.skin ? 0.4 : 0} />
      <MuscleLayer visible={activeLayers.muscle} />
      <SkeletonLayer visible={activeLayers.bone} />
      <OrganLayer visible={activeLayers.organ} selectedOrgan={selectedOrgan} onSelectOrgan={onSelectOrgan} />

      {/* 经络线 */}
      {MERIDIAN_PATHS_3D.map(path => (
        <MeridianLine key={path.id} path={path} isActive={activeMeridians.includes(path.id)} />
      ))}

      {/* 穴位点（InstancedMesh） */}
      <AcupointInstances points={visiblePoints} onSelect={onSelectPoint} />

      {/* 选中穴位高亮 */}
      <SelectedPointHighlight point={selectedPointData} />

      {/* 身体部位热点 */}
      <BodyPartHotspots onSelectPart={onSelectBodyPart} />
    </group>
  )
}

// 相机控制器（支持自动旋转、聚焦、重置）
function CameraController({
  autoRotate, focusTarget, resetSignal
}: {
  autoRotate: boolean
  focusTarget: [number, number, number] | null
  resetSignal: number
}) {
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const targetVec = useRef(new THREE.Vector3())
  const focusingRef = useRef(false)

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate
      controlsRef.current.autoRotateSpeed = 0.5
    }
  }, [autoRotate])

  useEffect(() => {
    if (resetSignal > 0 && controlsRef.current) {
      camera.position.set(0, 0.1, 2.5)
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
      focusingRef.current = false
    }
  }, [resetSignal, camera])

  useEffect(() => {
    if (focusTarget && controlsRef.current) {
      targetVec.current.set(focusTarget[0], focusTarget[1], focusTarget[2])
      focusingRef.current = true
    }
  }, [focusTarget])

  useFrame(() => {
    if (controlsRef.current && focusingRef.current) {
      controlsRef.current.target.lerp(targetVec.current, 0.15)
      if (controlsRef.current.target.distanceTo(targetVec.current) < 0.01) {
        controlsRef.current.target.copy(targetVec.current)
        focusingRef.current = false
      }
      controlsRef.current.update()
    }
  })

  return <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} minDistance={0.5} maxDistance={4} />
}

// ═══════════════════════════════════════════════════════════
// 主组件
// ═══════════════════════════════════════════════════════════

export function HumanBody3DModel() {
  // 图层状态
  const [activeLayers, setActiveLayers] = useState({
    skin: true, muscle: false, bone: false, organ: false,
  })
  // 经络筛选
  const [activeMeridians, setActiveMeridians] = useState<string[]>(
    MERIDIAN_PATHS_3D.map(m => m.id)
  )
  // 体系筛选
  const [systemFilter, setSystemFilter] = useState<"all" | "fourteen" | "extra" | "dong">("all")
  // 选中状态
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null)
  // 自动旋转
  const [autoRotate, setAutoRotate] = useState(true)
  // 搜索
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<UnifiedAcupoint[]>([])
  // 智能推荐
  const [symptomModalPart, setSymptomModalPart] = useState<string | null>(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  // 相机控制
  const [focusTarget, setFocusTarget] = useState<[number, number, number] | null>(null)
  const [resetSignal, setResetSignal] = useState(0)

  // 统计信息
  const stats = useMemo(() => getAcupointStats(), [])

  // 选中穴位数据
  const selectedPointData = useMemo(() => {
    if (!selectedPoint) return undefined
    return ALL_ACUPOINTS.find(p => p.id === selectedPoint)
  }, [selectedPoint])

  // 配伍建议
  const combinations = useMemo(() => {
    if (!selectedPointData) return []
    return getAcupointCombination(selectedPointData.id)
  }, [selectedPointData])

  // 可见穴位（性能优化：按体系+经络筛选，始终包含高亮穴位）
  const visiblePoints = useMemo(() => {
    const highlightIds = new Set<string>()
    if (selectedPoint) highlightIds.add(selectedPoint)
    searchResults.forEach(r => highlightIds.add(r.id))
    recommendations.forEach(r => highlightIds.add(r.acupoint.id))

    return ALL_ACUPOINTS.filter(p => {
      if (highlightIds.has(p.id)) return true
      if (systemFilter === "all") {
        if (p.system === "fourteen") return activeMeridians.includes(p.meridian)
        return true
      }
      if (systemFilter === "fourteen") {
        return p.system === "fourteen" && activeMeridians.includes(p.meridian)
      }
      if (systemFilter === "extra") return p.system === "extra"
      if (systemFilter === "dong") return p.system === "dong"
      return false
    })
  }, [systemFilter, activeMeridians, selectedPoint, searchResults, recommendations])

  // === 事件处理 ===

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }))
  }

  const toggleMeridian = (id: string) => {
    setActiveMeridians(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  const toggleAllMeridians = () => {
    if (activeMeridians.length === MERIDIAN_PATHS_3D.length) {
      setActiveMeridians([])
    } else {
      setActiveMeridians(MERIDIAN_PATHS_3D.map(m => m.id))
    }
  }

  const handleSelectPoint = (id: string) => {
    setSelectedPoint(prev => prev === id ? null : id)
  }

  const handleSelectOrgan = (id: string | null) => {
    setSelectedOrgan(id)
  }

  const handleBodyPartClick = (id: string) => {
    setSymptomModalPart(id)
    setSelectedSymptoms([])
  }

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleRecommend = () => {
    if (!symptomModalPart || selectedSymptoms.length === 0) return
    const recs = recommendAcupoints(symptomModalPart, selectedSymptoms)
    setRecommendations(recs)
    setSymptomModalPart(null)
    setSelectedSymptoms([])
  }

  const handleRecommendationClick = (point: UnifiedAcupoint) => {
    setSelectedPoint(point.id)
    setFocusTarget([point.coordinates[0], point.coordinates[1], point.coordinates[2]])
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setSearchResults(searchAcupoints(query))
    } else {
      setSearchResults([])
    }
  }

  const selectFromSearch = (point: UnifiedAcupoint) => {
    setSelectedPoint(point.id)
    setFocusTarget([point.coordinates[0], point.coordinates[1], point.coordinates[2]])
    setSearchResults([])
    setSearchQuery("")
    if (point.system === "fourteen" && !activeMeridians.includes(point.meridian)) {
      setActiveMeridians(prev => [...prev, point.meridian])
    }
  }

  const selectCombination = (point: UnifiedAcupoint) => {
    setSelectedPoint(point.id)
    setFocusTarget([point.coordinates[0], point.coordinates[1], point.coordinates[2]])
    if (point.system === "fourteen" && !activeMeridians.includes(point.meridian)) {
      setActiveMeridians(prev => [...prev, point.meridian])
    }
  }

  const resetView = () => {
    setActiveLayers({ skin: true, muscle: false, bone: false, organ: false })
    setActiveMeridians(MERIDIAN_PATHS_3D.map(m => m.id))
    setSystemFilter("all")
    setSelectedPoint(null)
    setSelectedOrgan(null)
    setAutoRotate(true)
    setSearchQuery("")
    setSearchResults([])
    setRecommendations([])
    setSelectedSymptoms([])
    setSymptomModalPart(null)
    setFocusTarget(null)
    setResetSignal(s => s + 1)
  }

  const bodyPartName = BODY_PART_HOTSPOTS.find(s => s.id === symptomModalPart)?.name || ""
  const selectedMeridianColor = selectedPointData
    ? (selectedPointData.system === "extra" ? "#00CED1"
       : selectedPointData.system === "dong" ? "#FF8C00"
       : MERIDIAN_COLORS[selectedPointData.meridian] || "#FFFFFF")
    : "#FFFFFF"
  const selectedMeridianName = selectedPointData
    ? (selectedPointData.system === "extra" ? "经外奇穴"
       : selectedPointData.system === "dong" ? "董氏奇穴"
       : MERIDIAN_NAMES[selectedPointData.meridian] || selectedPointData.meridian)
    : ""

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] text-white overflow-hidden">
      {/* 顶部栏 */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-cyan-400">3D人体穴位解剖模型</h1>
            <p className="text-xs text-cyan-300/60">619穴位 · 14经络 · 经外奇穴 · 董氏奇穴 · 智能推荐</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">共{stats.total}穴</span>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 rounded-lg text-xs ${autoRotate ? "bg-cyan-700/50 text-cyan-300" : "bg-white/10 text-gray-400"}`}
            >
              {autoRotate ? "自动旋转:开" : "自动旋转:关"}
            </button>
            <button
              onClick={resetView}
              className="px-3 py-1.5 rounded-lg text-xs bg-white/10 hover:bg-white/20 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              重置
            </button>
          </div>
        </div>
      </div>

      {/* 3D画布 */}
      <div className="w-full h-screen">
        <Canvas
          camera={{ position: [0, 0.1, 2.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          onPointerMissed={() => setSelectedPoint(null)}
          style={{ background: "linear-gradient(to bottom, #1a1a2e, #0f0f23)" }}
        >
          <SceneContent
            activeLayers={activeLayers}
            activeMeridians={activeMeridians}
            visiblePoints={visiblePoints}
            selectedPointData={selectedPointData}
            selectedOrgan={selectedOrgan}
            onSelectPoint={handleSelectPoint}
            onSelectOrgan={handleSelectOrgan}
            onSelectBodyPart={handleBodyPartClick}
          />
          <CameraController autoRotate={autoRotate} focusTarget={focusTarget} resetSignal={resetSignal} />
        </Canvas>
      </div>

      {/* 左侧：图层控制 + 体系筛选 */}
      <div className="absolute left-3 top-24 z-10 space-y-3">
        {/* 图层 */}
        <div className="space-y-1">
          <div className="text-[10px] text-gray-500 px-1 flex items-center gap-1">
            <Layers className="w-3 h-3" /> 图层
          </div>
          {[
            { key: "skin", label: "皮肤", icon: Eye },
            { key: "muscle", label: "肌肉", icon: Activity },
            { key: "bone", label: "骨骼", icon: Bone },
            { key: "organ", label: "脏器", icon: Heart },
          ].map(layer => (
            <button
              key={layer.key}
              onClick={() => toggleLayer(layer.key as keyof typeof activeLayers)}
              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-[10px] transition-all ${
                activeLayers[layer.key as keyof typeof activeLayers]
                  ? "bg-cyan-600/40 border border-cyan-500/30 text-cyan-300"
                  : "bg-white/5 border border-white/10 text-gray-500"
              }`}
            >
              <layer.icon className="w-4 h-4" />
              {layer.label}
            </button>
          ))}
        </div>

        {/* 体系筛选 */}
        <div className="space-y-1">
          <div className="text-[10px] text-gray-500 px-1">体系</div>
          {[
            { key: "all", label: "全部", count: stats.total, color: "#FFFFFF" },
            { key: "fourteen", label: "十四经", count: stats.fourteen, color: "#FFD700" },
            { key: "extra", label: "奇穴", count: stats.extra, color: "#00CED1" },
            { key: "dong", label: "董氏", count: stats.dong, color: "#FF8C00" },
          ].map(sys => (
            <button
              key={sys.key}
              onClick={() => setSystemFilter(sys.key as typeof systemFilter)}
              className={`w-12 rounded-xl flex flex-col items-center justify-center py-1.5 text-[10px] transition-all ${
                systemFilter === sys.key
                  ? "bg-white/15 border text-white"
                  : "bg-white/5 border border-white/10 text-gray-500"
              }`}
              style={systemFilter === sys.key ? { borderColor: sys.color, color: sys.color } : {}}
            >
              <span>{sys.label}</span>
              <span className="text-[8px] opacity-60">{sys.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 右侧：搜索 + 穴位详情 */}
      <div className="absolute right-3 top-24 z-10 w-72 space-y-2">
        {/* 搜索框 */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="搜索穴位名称/拼音/病症..."
            className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 pr-8 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-cyan-400 absolute right-3 top-1/2 -translate-y-1/2" />
          {/* 搜索结果下拉 */}
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-1 w-full max-h-60 overflow-y-auto bg-black/90 backdrop-blur-xl rounded-lg border border-cyan-500/30 shadow-2xl">
              {searchResults.map(r => {
                const c = getPointColor(r)
                return (
                  <button
                    key={r.id}
                    onClick={() => selectFromSearch(r)}
                    className="w-full text-left px-3 py-2 hover:bg-cyan-900/30 border-b border-white/5 last:border-0 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c }} />
                    <span className="text-white text-xs font-medium">{r.name}</span>
                    <span className="text-gray-500 text-[10px]">{r.pinyin}</span>
                    <span className="ml-auto text-gray-400 text-[10px]">
                      {r.system === "fourteen" ? MERIDIAN_NAMES[r.meridian] : SYSTEM_LABELS[r.system]}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* 穴位信息卡片 */}
        {selectedPointData && (
          <div className="bg-black/85 backdrop-blur-xl rounded-xl border border-cyan-500/30 p-4 shadow-2xl max-h-[60vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">{selectedPointData.name}</h3>
                  <span className="text-xs text-gray-400">{selectedPointData.pinyin}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className="px-2 py-0.5 rounded text-[10px]"
                    style={{ backgroundColor: `${selectedMeridianColor}30`, color: selectedMeridianColor }}
                  >
                    {selectedMeridianName}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-gray-300">
                    {SYSTEM_LABELS[selectedPointData.system]}
                  </span>
                  {selectedPointData.category && selectedPointData.category !== "普通穴" && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-900/30 text-amber-300">
                      {selectedPointData.category}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => setSelectedPoint(null)} className="text-gray-400 hover:text-white flex-shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* 定位 */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-400">定位</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{selectedPointData.locationDesc}</p>
              </div>

              {/* 主治 */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-xs font-medium text-red-400">主治</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedPointData.indications.map((s, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-red-900/20 text-red-300 text-[10px] rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              {/* 针刺方法 */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-medium text-amber-400">针刺方法</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{selectedPointData.needling}</p>
              </div>

              {/* 配伍建议 */}
              {combinations.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-xs font-medium text-purple-400">配伍建议</span>
                  </div>
                  <div className="space-y-1">
                    {combinations.map(c => {
                      const cColor = getPointColor(c)
                      return (
                        <button
                          key={c.id}
                          onClick={() => selectCombination(c)}
                          className="w-full text-left px-2 py-1.5 rounded-lg bg-white/5 hover:bg-purple-900/30 border border-white/5 flex items-center gap-2 transition-colors"
                        >
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cColor }} />
                          <span className="text-xs text-white">{c.name}</span>
                          <span className="text-[10px] text-gray-500">
                            {c.system === "fourteen" ? MERIDIAN_NAMES[c.meridian] : SYSTEM_LABELS[c.system]}
                          </span>
                          <ChevronRight className="w-3 h-3 text-gray-600 ml-auto" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 底部：经络筛选 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-3xl">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-3 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">经络显示（仅影响十四经穴）</span>
            <button onClick={toggleAllMeridians} className="text-xs text-cyan-400">
              {activeMeridians.length === MERIDIAN_PATHS_3D.length ? "全部隐藏" : "全部显示"}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {MERIDIAN_PATHS_3D.map(path => {
              const isActive = activeMeridians.includes(path.id)
              return (
                <button
                  key={path.id}
                  onClick={() => toggleMeridian(path.id)}
                  className={`px-2 py-1 rounded-lg text-[11px] transition-all border ${
                    isActive ? "bg-opacity-30" : "bg-white/5 text-gray-500 border-transparent"
                  }`}
                  style={{
                    backgroundColor: isActive ? `${path.color}30` : undefined,
                    borderColor: isActive ? path.color : undefined,
                    color: isActive ? path.color : undefined,
                  }}
                >
                  {MERIDIAN_NAMES[path.id]?.replace(/手|足/g, "") || path.id}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 症状选择弹窗 */}
      {symptomModalPart && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900/95 rounded-2xl border border-cyan-500/30 p-5 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-cyan-300">选择症状 - {bodyPartName}</h3>
              </div>
              <button onClick={() => setSymptomModalPart(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-3">请选择当前部位的症状（可多选），系统将智能推荐穴位</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {SYMPTOMS.map(s => {
                const isSelected = selectedSymptoms.includes(s.id)
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSymptom(s.id)}
                    className={`px-2 py-2 rounded-lg text-xs transition-all border ${
                      isSelected
                        ? "bg-cyan-600/40 border-cyan-500/50 text-cyan-300"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {s.name}
                  </button>
                )
              })}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSymptomModalPart(null)}
                className="px-4 py-1.5 rounded-lg text-xs bg-white/10 text-gray-400 hover:bg-white/20"
              >
                取消
              </button>
              <button
                onClick={handleRecommend}
                disabled={selectedSymptoms.length === 0}
                className="px-4 py-1.5 rounded-lg text-xs bg-cyan-600/50 text-cyan-200 hover:bg-cyan-600/70 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                推荐穴位
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 推荐结果弹窗 */}
      {recommendations.length > 0 && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900/95 rounded-2xl border border-amber-500/30 p-5 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-amber-300">
                  推荐穴位{bodyPartName ? ` - ${bodyPartName}` : ""}
                </h3>
              </div>
              <button onClick={() => setRecommendations([])} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {recommendations.map((r, i) => {
                const info = getStrategyInfo(r.strategy)
                const c = getPointColor(r.acupoint)
                return (
                  <button
                    key={`${r.acupoint.id}-${i}`}
                    onClick={() => handleRecommendationClick(r.acupoint)}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-amber-900/20 border border-white/5 hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c }} />
                      <span className="text-sm font-bold text-white">{r.acupoint.name}</span>
                      <span className="text-[10px] text-gray-500">{r.acupoint.pinyin}</span>
                      <span
                        className="ml-auto px-1.5 py-0.5 rounded text-[9px]"
                        style={{ backgroundColor: `${info.color}30`, color: info.color }}
                      >
                        {info.label}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 mb-1">
                      {r.acupoint.system === "fourteen"
                        ? MERIDIAN_NAMES[r.acupoint.meridian]
                        : SYSTEM_LABELS[r.acupoint.system]}
                      {r.acupoint.category && r.acupoint.category !== "普通穴" ? ` · ${r.acupoint.category}` : ""}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed mb-1">{r.reason}</p>
                    <p className="text-[10px] text-amber-300/70">针刺：{r.acupoint.needling}</p>
                  </button>
                )
              })}
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={() => setRecommendations([])}
                className="text-xs text-gray-500 hover:text-gray-300"
              >
                关闭推荐结果
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部提示 */}
      <div className="absolute bottom-20 left-0 right-0 text-center z-10 pointer-events-none">
        <p className="text-[10px] text-gray-600">拖拽旋转 · 滚轮缩放 · 右键平移 · 点击穴位查看详情 · 点击青色热点智能推荐</p>
      </div>
    </div>
  )
}
