"use client"

import { useState, useRef, useMemo, useEffect, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, Line, Sphere, Text } from "@react-three/drei"
import * as THREE from "three"
import {
  Search, Eye, EyeOff, Layers, RotateCcw, ZoomIn, ZoomOut,
  Activity, Heart, Brain, Bone, ChevronLeft, X, Target, Info
} from "lucide-react"
import {
  MERIDIAN_PATHS_3D, ACUPOINTS_3D, ORGANS_3D, BONES_3D, MUSCLES_3D, BODY_LANDMARKS,
  type Acupoint3D, type MeridianPath3D, type Organ3D
} from "@/lib/meridian-3d-data"

// 皮肤身体模型
function SkinBody({ opacity }: { opacity: number }) {
  return (
    <group>
      {/* 头部 */}
      <mesh position={[0, 0.72, 0.02]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      {/* 颈部 */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.12, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      {/* 躯干 */}
      <mesh position={[0, 0.18, 0.04]}>
        <capsuleGeometry args={[0.14, 0.5, 8, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      {/* 左臂 */}
      <mesh position={[-0.22, 0.28, 0.02]} rotation={[0, 0, 0.15]}>
        <capsuleGeometry args={[0.04, 0.45, 8, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      {/* 右臂 */}
      <mesh position={[0.22, 0.28, 0.02]} rotation={[0, 0, -0.15]}>
        <capsuleGeometry args={[0.04, 0.45, 8, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      {/* 左腿 */}
      <mesh position={[-0.12, -0.48, 0.03]} rotation={[0.05, 0, 0]}>
        <capsuleGeometry args={[0.05, 0.6, 8, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      {/* 右腿 */}
      <mesh position={[0.12, -0.48, 0.03]} rotation={[0.05, 0, 0]}>
        <capsuleGeometry args={[0.05, 0.6, 8, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      {/* 左手 */}
      <mesh position={[-0.22, -0.22, 0.04]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      {/* 右手 */}
      <mesh position={[0.22, -0.22, 0.04]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      {/* 左足 */}
      <mesh position={[-0.12, -0.82, 0.05]}>
        <boxGeometry args={[0.06, 0.04, 0.1]} />
        <meshPhysicalMaterial color="#F5D5C8" roughness={0.5} metalness={0} opacity={opacity} transparent />
      </mesh>
      {/* 右足 */}
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
      {/* 关节球 */}
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
function OrganLayer({ visible, selectedOrgan, onSelectOrgan }: { visible: boolean; selectedOrgan: string | null; onSelectOrgan: (id: string | null) => void }) {
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

// 经络流动线条
function MeridianFlowLine({ path, color, isActive }: { path: MeridianPath3D; color: string; isActive: boolean }) {
  const lineRef = useRef<THREE.Group>(null)
  const [progress, setProgress] = useState(0)
  const points = useMemo(() => path.points.map(p => new THREE.Vector3(...p)), [path.points])

  useFrame((_, delta) => {
    if (isActive) {
      setProgress(prev => (prev + delta * 0.3) % 1)
    }
  })

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])

  // 流动粒子
  const flowParticles = useMemo(() => {
    const particles = []
    for (let i = 0; i < 5; i++) {
      const t = ((progress + i * 0.2) % 1)
      const point = curve.getPointAt(t)
      particles.push(point)
    }
    return particles
  }, [progress, curve])

  if (!isActive) return null

  return (
    <group ref={lineRef}>
      {/* 经络线条 */}
      <Line
        points={points}
        color={color}
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      {/* 流动粒子 */}
      {flowParticles.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      {/* 发光管道效果 */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.008, 8, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

// 穴位点标记
function AcupointMarkers({ 
  meridianId, color, isActive, selectedPoint, onSelectPoint 
}: { 
  meridianId: string; color: string; isActive: boolean; 
  selectedPoint: string | null; onSelectPoint: (id: string | null) => void 
}) {
  const points = ACUPOINTS_3D.filter(p => p.meridian === meridianId)

  if (!isActive) return null

  return (
    <group>
      {points.map(point => {
        const isSelected = selectedPoint === point.id
        return (
          <group key={point.id}>
            <mesh
              position={point.position}
              onClick={(e) => { e.stopPropagation(); onSelectPoint(isSelected ? null : point.id) }}
            >
              <sphereGeometry args={[isSelected ? 0.018 : 0.01, 16, 16]} />
              <meshBasicMaterial color={isSelected ? "#FFD700" : color} />
            </mesh>
            {/* 选中发光环 */}
            {isSelected && (
              <mesh position={point.position}>
                <ringGeometry args={[0.02, 0.025, 32]} />
                <meshBasicMaterial color="#FFD700" side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}

// 3D场景内容
function SceneContent({ activeLayers, activeMeridians, selectedPoint, selectedOrgan, onSelectPoint, onSelectOrgan }: {
  activeLayers: { skin: boolean; muscle: boolean; bone: boolean; organ: boolean }
  activeMeridians: string[]
  selectedPoint: string | null
  selectedOrgan: string | null
  onSelectPoint: (id: string | null) => void
  onSelectOrgan: (id: string | null) => void
}) {
  return (
    <group>
      {/* 环境光 */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <directionalLight position={[-2, -1, -1]} intensity={0.3} />

      {/* 皮肤层 */}
      <SkinBody opacity={activeLayers.skin ? 0.4 : 0} />

      {/* 肌肉层 */}
      <MuscleLayer visible={activeLayers.muscle} />

      {/* 骨骼层 */}
      <SkeletonLayer visible={activeLayers.bone} />

      {/* 脏器层 */}
      <OrganLayer visible={activeLayers.organ} selectedOrgan={selectedOrgan} onSelectOrgan={onSelectOrgan} />

      {/* 经络线 */}
      {MERIDIAN_PATHS_3D.map(path => (
        <MeridianFlowLine
          key={path.id}
          path={path}
          color={path.color}
          isActive={activeMeridians.includes(path.id)}
        />
      ))}

      {/* 穴位点 */}
      {MERIDIAN_PATHS_3D.map(path => (
        <AcupointMarkers
          key={`points-${path.id}`}
          meridianId={path.id}
          color={path.color}
          isActive={activeMeridians.includes(path.id)}
          selectedPoint={selectedPoint}
          onSelectPoint={onSelectPoint}
        />
      ))}
    </group>
  )
}

// 相机控制器
function CameraController({ autoRotate }: { autoRotate: boolean }) {
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate
      controlsRef.current.autoRotateSpeed = 0.5
    }
  }, [autoRotate])

  return <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} minDistance={0.8} maxDistance={3} />
}

// 主组件
export function HumanBody3DModel() {
  const [activeLayers, setActiveLayers] = useState({
    skin: true,
    muscle: false,
    bone: false,
    organ: false,
  })
  const [activeMeridians, setActiveMeridians] = useState<string[]>(["LU", "LI", "ST", "SP", "HT", "SI", "BL", "KI", "PC", "TE", "GB", "LR", "CV", "GV"])
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showInfo, setShowInfo] = useState(false)

  const selectedPointData = ACUPOINTS_3D.find(p => p.id === selectedPoint)
  const selectedOrganData = ORGANS_3D.find(o => o.id === selectedOrgan)

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

  const resetView = () => {
    setActiveLayers({ skin: true, muscle: false, bone: false, organ: false })
    setActiveMeridians(MERIDIAN_PATHS_3D.map(m => m.id))
    setSelectedPoint(null)
    setSelectedOrgan(null)
    setAutoRotate(true)
  }

  const searchPoints = () => {
    if (!searchQuery) return
    const found = ACUPOINTS_3D.find(p => p.name.includes(searchQuery) || p.id.includes(searchQuery))
    if (found) {
      setSelectedPoint(found.id)
      if (!activeMeridians.includes(found.meridian)) {
        setActiveMeridians(prev => [...prev, found.meridian])
      }
    }
  }

  const meridianColors: Record<string, string> = {
    "LU": "#FFD700", "LI": "#FFA500", "ST": "#FFD700", "SP": "#8B4513",
    "HT": "#FF0000", "SI": "#FF6347", "BL": "#4169E1", "KI": "#000080",
    "PC": "#8B0000", "TE": "#9370DB", "GB": "#228B22", "LR": "#006400",
    "CV": "#FF69B4", "GV": "#FF1493"
  }

  const meridianNames: Record<string, string> = {
    "LU": "肺经", "LI": "大肠经", "ST": "胃经", "SP": "脾经",
    "HT": "心经", "SI": "小肠经", "BL": "膀胱经", "KI": "肾经",
    "PC": "心包经", "TE": "三焦经", "GB": "胆经", "LR": "肝经",
    "CV": "任脉", "GV": "督脉"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] text-white">
      {/* 顶部栏 */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-cyan-400">3D人体经络模型</h1>
            <p className="text-xs text-cyan-300/60">交互式经络穴位 · 对标知源中医</p>
          </div>
          <div className="flex items-center gap-2">
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
        <Canvas camera={{ position: [0, 0.1, 2.2], fov: 45 }} style={{ background: "linear-gradient(to bottom, #1a1a2e, #0f0f23)" }}>
          <SceneContent
            activeLayers={activeLayers}
            activeMeridians={activeMeridians}
            selectedPoint={selectedPoint}
            selectedOrgan={selectedOrgan}
            onSelectPoint={setSelectedPoint}
            onSelectOrgan={setSelectedOrgan}
          />
          <CameraController autoRotate={autoRotate} />
        </Canvas>
      </div>

      {/* 左侧图层控制 */}
      <div className="absolute left-3 top-24 z-10 space-y-1">
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

      {/* 底部经络选择 */}
      <div className="absolute bottom-20 left-0 right-0 z-10 px-4">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-3 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">经络显示</span>
            <button onClick={toggleAllMeridians} className="text-xs text-cyan-400">
              {activeMeridians.length === MERIDIAN_PATHS_3D.length ? "全部隐藏" : "全部显示"}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {MERIDIAN_PATHS_3D.map(path => (
              <button
                key={path.id}
                onClick={() => toggleMeridian(path.id)}
                className={`px-2 py-1 rounded-lg text-[11px] transition-all ${
                  activeMeridians.includes(path.id)
                    ? "bg-opacity-30 border"
                    : "bg-white/5 text-gray-500 border border-transparent"
                }`}
                style={{
                  backgroundColor: activeMeridians.includes(path.id) ? `${path.color}30` : undefined,
                  borderColor: activeMeridians.includes(path.id) ? path.color : undefined,
                  color: activeMeridians.includes(path.id) ? path.color : undefined,
                }}
              >
                {meridianNames[path.id]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧搜索 */}
      <div className="absolute right-3 top-24 z-10">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchPoints()}
            placeholder="搜索穴位..."
            className="w-32 bg-black/60 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button onClick={searchPoints} className="absolute right-1 top-1/2 -translate-y-1/2 p-1">
            <Search className="w-3 h-3 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* 穴位详情弹窗 */}
      {selectedPointData && (
        <div className="absolute bottom-44 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md bg-black/90 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-5 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${meridianColors[selectedPointData.meridian]}30`, color: meridianColors[selectedPointData.meridian] }}>
                  {meridianNames[selectedPointData.meridian]}
                </span>
                <h3 className="text-lg font-bold text-white">{selectedPointData.name}</h3>
              </div>
            </div>
            <button onClick={() => setSelectedPoint(null)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">采穴方法</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{selectedPointData.caiXueMethod}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">主治症状</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedPointData.symptoms.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 bg-red-900/20 text-red-300 text-xs rounded-full">{s}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">针刺方法</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{selectedPointData.technique}</p>
            </div>

            <div className="text-xs text-gray-500">
              针刺深度：{selectedPointData.depth}寸
            </div>
          </div>
        </div>
      )}

      {/* 脏器详情弹窗 */}
      {selectedOrganData && (
        <div className="absolute bottom-44 left-1/2 -translate-x-1/2 z-10 w-[80%] max-w-sm bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-4 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{selectedOrganData.name}</h3>
              <p className="text-sm text-purple-300">{selectedOrganData.description}</p>
            </div>
            <button onClick={() => setSelectedOrgan(null)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 底部提示 */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-10">
        <p className="text-[10px] text-gray-500">拖拽旋转 · 滚轮缩放 · 右键平移 · 点击穴位查看详情</p>
      </div>
    </div>
  )
}