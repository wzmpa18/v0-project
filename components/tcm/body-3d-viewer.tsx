"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import TWEEN from "@tweenjs/tween.js"
import { 
  MERIDIAN_LIST, 
  ACUPOINTS, 
  type AcupointData
} from "@/lib/acupoint-3d-data"

// 转换穴位数据为组件需要的格式
interface Acupoint {
  id: string
  name: string
  pinyin: string
  meridianId: string
  position: { x: number; y: number; z: number }
  location: string
  indications: string[]
  needlingMethod: string
  needlingDepth: string
}

interface Meridian {
  id: string
  name: string
  color: string
  pathPoints: { x: number; y: number; z: number }[]
}

// 将数据转换为组件需要的格式
const MERIDIANS: Meridian[] = MERIDIAN_LIST.map(m => ({
  id: m.id,
  name: m.name,
  color: m.color,
  pathPoints: ACUPOINTS.filter(p => p.meridian === m.id).map(p => p.position)
}))

const ACUPOINT_LIST: Acupoint[] = ACUPOINTS.map(p => ({
  id: p.id,
  name: p.name,
  pinyin: p.pinyin,
  meridianId: p.meridian,
  position: p.position,
  location: `进针深度: ${p.depth}寸, 角度: ${p.angle}度`,
  indications: p.indications,
  needlingMethod: p.methods.join("; "),
  needlingDepth: `${p.depth}寸`
}))

// 穴位点组件
function AcupointMarker({ 
  point, 
  isSelected, 
  onSelect 
}: { 
  point: Acupoint
  isSelected: boolean
  onSelect: (point: Acupoint) => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // 呼吸发光效果
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      meshRef.current.scale.setScalar(isSelected ? scale * 1.5 : hovered ? scale * 1.2 : scale)
    }
  })

  return (
    <group position={[point.position.x, point.position.y, point.position.z]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(point)
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? "#ff4444" : hovered ? "#ffaa00" : "#00ff88"}
          emissive={isSelected ? "#ff0000" : hovered ? "#ff8800" : "#00aa44"}
          emissiveIntensity={isSelected ? 2 : hovered ? 1.5 : 1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* 穴位名称标签 */}
      {(hovered || isSelected) && (
        <Html distanceFactor={10} position={[0, 0.03, 0]}>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            {point.name}
          </div>
        </Html>
      )}
    </group>
  )
}

// 经络线组件
function MeridianLine({ meridian, visible }: { meridian: Meridian; visible: boolean }) {
  const lineRef = useRef<THREE.Line>(null)

  if (!visible || meridian.pathPoints.length < 2) return null

  const points = meridian.pathPoints.map(
    p => new THREE.Vector3(p.x, p.y, p.z)
  )
  const curve = new THREE.CatmullRomCurve3(points)
  const curvePoints = curve.getPoints(50)
  const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints)

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={meridian.color}
        linewidth={2}
        transparent
        opacity={0.8}
      />
    </line>
  )
}

// 针灸针组件
function AcupunctureNeedle({ 
  targetPoint, 
  isInserting,
  insertionDepth,
  onInsertionComplete
}: { 
  targetPoint: Acupoint | null
  isInserting: boolean
  insertionDepth: number
  onInsertionComplete?: () => void
}) {
  const needleRef = useRef<THREE.Group>(null)
  const [currentDepth, setCurrentDepth] = useState(0)

  useEffect(() => {
    if (isInserting && targetPoint && needleRef.current) {
      // 使用TWEEN进行平滑进针动画
      const startDepth = { depth: 0 }
      const endDepth = { depth: insertionDepth }

      new TWEEN.Tween(startDepth)
        .to(endDepth, 2000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          setCurrentDepth(startDepth.depth)
        })
        .onComplete(() => {
          onInsertionComplete?.()
        })
        .start()
    }
  }, [isInserting, targetPoint, insertionDepth, onInsertionComplete])

  useFrame(() => {
    TWEEN.update()
  })

  if (!targetPoint) return null

  const needleLength = 0.15
  const needleStartY = targetPoint.position.y + needleLength / 2 - currentDepth

  return (
    <group 
      ref={needleRef}
      position={[targetPoint.position.x, needleStartY, targetPoint.position.z]}
    >
      {/* 针柄 */}
      <mesh position={[0, needleLength / 2 + 0.02, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.04, 16]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* 针身 */}
      <mesh>
        <cylinderGeometry args={[0.002, 0.001, needleLength, 16]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

// 简化人体模型（使用基础几何体代替真实模型）
function HumanBodySimple({ 
  showSkeleton,
  showMuscle,
  showSkin
}: { 
  showSkeleton: boolean
  showMuscle: boolean
  showSkin: boolean
}) {
  return (
    <group>
      {/* 头部 */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial 
          color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"} 
          transparent={showSkeleton}
          opacity={showSkeleton ? 0.3 : 1}
        />
      </mesh>

      {/* 颈部 */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.1, 16]} />
        <meshStandardMaterial 
          color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
          transparent={showSkeleton}
          opacity={showSkeleton ? 0.3 : 1}
        />
      </mesh>

      {/* 躯干 */}
      <mesh position={[0, 1.15, 0]}>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial 
          color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
          transparent={showSkeleton}
          opacity={showSkeleton ? 0.3 : 1}
        />
      </mesh>

      {/* 左臂 */}
      <group position={[-0.22, 1.3, 0]} rotation={[0, 0, Math.PI / 6]}>
        <mesh position={[0, -0.15, 0]}>
          <capsuleGeometry args={[0.04, 0.2, 8, 16]} />
          <meshStandardMaterial 
            color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
            transparent={showSkeleton}
            opacity={showSkeleton ? 0.3 : 1}
          />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.035, 0.2, 8, 16]} />
          <meshStandardMaterial 
            color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
            transparent={showSkeleton}
            opacity={showSkeleton ? 0.3 : 1}
          />
        </mesh>
      </group>

      {/* 右臂 */}
      <group position={[0.22, 1.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <mesh position={[0, -0.15, 0]}>
          <capsuleGeometry args={[0.04, 0.2, 8, 16]} />
          <meshStandardMaterial 
            color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
            transparent={showSkeleton}
            opacity={showSkeleton ? 0.3 : 1}
          />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.035, 0.2, 8, 16]} />
          <meshStandardMaterial 
            color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
            transparent={showSkeleton}
            opacity={showSkeleton ? 0.3 : 1}
          />
        </mesh>
      </group>

      {/* 骨盆 */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.25, 0.1, 0.12]} />
        <meshStandardMaterial 
          color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
          transparent={showSkeleton}
          opacity={showSkeleton ? 0.3 : 1}
        />
      </mesh>

      {/* 左腿 */}
      <group position={[-0.08, 0.75, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.06, 0.3, 8, 16]} />
          <meshStandardMaterial 
            color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
            transparent={showSkeleton}
            opacity={showSkeleton ? 0.3 : 1}
          />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
          <meshStandardMaterial 
            color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
            transparent={showSkeleton}
            opacity={showSkeleton ? 0.3 : 1}
          />
        </mesh>
      </group>

      {/* 右腿 */}
      <group position={[0.08, 0.75, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.06, 0.3, 8, 16]} />
          <meshStandardMaterial 
            color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
            transparent={showSkeleton}
            opacity={showSkeleton ? 0.3 : 1}
          />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
          <meshStandardMaterial 
            color={showSkin ? "#f5deb3" : showMuscle ? "#cd5c5c" : "#f0f0f0"}
            transparent={showSkeleton}
            opacity={showSkeleton ? 0.3 : 1}
          />
        </mesh>
      </group>

      {/* 骨骼层（仅在showSkeleton为true时显示） */}
      {showSkeleton && (
        <group>
          {/* 脊柱 */}
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh key={i} position={[0, 0.9 + i * 0.035, 0]}>
              <boxGeometry args={[0.03, 0.02, 0.03]} />
              <meshStandardMaterial color="#f5f5dc" />
            </mesh>
          ))}
          {/* 肋骨 */}
          {Array.from({ length: 12 }).map((_, i) => (
            <group key={`rib-${i}`}>
              <mesh position={[-0.08, 1.0 + i * 0.025, 0.02]} rotation={[0, 0, Math.PI / 4]}>
                <capsuleGeometry args={[0.005, 0.08, 4, 8]} />
                <meshStandardMaterial color="#f5f5dc" />
              </mesh>
              <mesh position={[0.08, 1.0 + i * 0.025, 0.02]} rotation={[0, 0, -Math.PI / 4]}>
                <capsuleGeometry args={[0.005, 0.08, 4, 8]} />
                <meshStandardMaterial color="#f5f5dc" />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  )
}

// 场景内容
function SceneContent({
  selectedMeridian,
  selectedPoint,
  onSelectPoint,
  showAcupoints,
  showMeridians,
  showSkeleton,
  showMuscle,
  showSkin,
  isNeedleInserting,
  insertionDepth,
  onInsertionComplete
}: {
  selectedMeridian: string | null
  selectedPoint: Acupoint | null
  onSelectPoint: (point: Acupoint) => void
  showAcupoints: boolean
  showMeridians: boolean
  showSkeleton: boolean
  showMuscle: boolean
  showSkin: boolean
  isNeedleInserting: boolean
  insertionDepth: number
  onInsertionComplete?: () => void
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

      {/* 人体模型 */}
      <HumanBodySimple 
        showSkeleton={showSkeleton}
        showMuscle={showMuscle}
        showSkin={showSkin}
      />

      {/* 经络线 */}
      {showMeridians && MERIDIANS.map(meridian => (
        <MeridianLine
          key={meridian.id}
          meridian={meridian}
          visible={!selectedMeridian || selectedMeridian === meridian.id}
        />
      ))}

      {/* 穴位点 */}
      {showAcupoints && ACUPOINT_LIST.map(point => {
        const shouldShow = !selectedMeridian || point.meridianId === selectedMeridian
        if (!shouldShow) return null
        return (
          <AcupointMarker
            key={point.id}
            point={point}
            isSelected={selectedPoint?.id === point.id}
            onSelect={onSelectPoint}
          />
        )
      })}

      {/* 针灸针 */}
      <AcupunctureNeedle
        targetPoint={selectedPoint}
        isInserting={isNeedleInserting}
        insertionDepth={insertionDepth}
        onInsertionComplete={onInsertionComplete}
      />

      <ContactShadows
        position={[0, -0.1, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={0.5}
        maxDistance={5}
        target={[0, 1, 0]}
      />
    </>
  )
}

// 加载提示
function LoadingIndicator() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="text-white text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm">加载3D模型中...</p>
      </div>
    </div>
  )
}

// 主组件
interface Body3DViewerProps {
  onClose?: () => void
}

export function Body3DViewer({ onClose }: Body3DViewerProps) {
  const [selectedMeridian, setSelectedMeridian] = useState<string | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<Acupoint | null>(null)
  const [showAcupoints, setShowAcupoints] = useState(true)
  const [showMeridians, setShowMeridians] = useState(true)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [showMuscle, setShowMuscle] = useState(false)
  const [showSkin, setShowSkin] = useState(true)
  const [isNeedleInserting, setIsNeedleInserting] = useState(false)
  const [insertionDepth, setInsertionDepth] = useState(0.03)
  const [showPointDetail, setShowPointDetail] = useState(false)

  const handleSelectPoint = (point: Acupoint) => {
    setSelectedPoint(point)
    setShowPointDetail(true)
  }

  const handleStartNeedling = () => {
    if (selectedPoint) {
      setIsNeedleInserting(true)
    }
  }

  const handleInsertionComplete = () => {
    setIsNeedleInserting(false)
  }

  return (
    <div className="relative w-full h-full min-h-[500px] bg-gradient-to-b from-[#1a1a2e] to-[#16213e] rounded-xl overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 1, 2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent
            selectedMeridian={selectedMeridian}
            selectedPoint={selectedPoint}
            onSelectPoint={handleSelectPoint}
            showAcupoints={showAcupoints}
            showMeridians={showMeridians}
            showSkeleton={showSkeleton}
            showMuscle={showMuscle}
            showSkin={showSkin}
            isNeedleInserting={isNeedleInserting}
            insertionDepth={insertionDepth}
            onInsertionComplete={handleInsertionComplete}
          />
        </Suspense>
      </Canvas>

      {/* 顶部控制栏 */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setShowSkin(!showSkin)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showSkin ? "bg-[#d4af37] text-black" : "bg-white/10 text-white"
            }`}
          >
            皮肤
          </button>
          <button
            onClick={() => setShowMuscle(!showMuscle)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showMuscle ? "bg-[#cd5c5c] text-white" : "bg-white/10 text-white"
            }`}
          >
            肌肉
          </button>
          <button
            onClick={() => setShowSkeleton(!showSkeleton)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showSkeleton ? "bg-white text-black" : "bg-white/10 text-white"
            }`}
          >
            骨骼
          </button>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center"
          >
            X
          </button>
        )}
      </div>

      {/* 经络选择器 */}
      <div className="absolute left-4 top-16 bottom-4 w-32 overflow-y-auto">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2">
          <div className="text-white text-xs font-medium mb-2">经络</div>
          <button
            onClick={() => setSelectedMeridian(null)}
            className={`w-full text-left px-2 py-1.5 rounded text-xs mb-1 ${
              !selectedMeridian ? "bg-[#d4af37] text-black" : "bg-white/10 text-white"
            }`}
          >
            全部显示
          </button>
          {MERIDIANS.map(meridian => (
            <button
              key={meridian.id}
              onClick={() => setSelectedMeridian(
                selectedMeridian === meridian.id ? null : meridian.id
              )}
              className={`w-full text-left px-2 py-1.5 rounded text-xs mb-1 flex items-center gap-1.5 ${
                selectedMeridian === meridian.id 
                  ? "bg-white/20 text-white" 
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: meridian.color }}
              />
              {meridian.name}
            </button>
          ))}
        </div>
      </div>

      {/* 显示控制 */}
      <div className="absolute right-4 top-16 bg-black/40 backdrop-blur-sm rounded-lg p-2">
        <div className="text-white text-xs font-medium mb-2">显示</div>
        <label className="flex items-center gap-2 text-white text-xs mb-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={showAcupoints}
            onChange={(e) => setShowAcupoints(e.target.checked)}
            className="w-3 h-3 rounded"
          />
          穴位点
        </label>
        <label className="flex items-center gap-2 text-white text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={showMeridians}
            onChange={(e) => setShowMeridians(e.target.checked)}
            className="w-3 h-3 rounded"
          />
          经络线
        </label>
      </div>

      {/* 穴位详情面板 */}
      {showPointDetail && selectedPoint && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-xl p-4 max-h-[40%] overflow-y-auto">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-white font-bold text-lg">{selectedPoint.name}</h3>
              <p className="text-white/60 text-xs">{selectedPoint.pinyin}</p>
            </div>
            <button
              onClick={() => setShowPointDetail(false)}
              className="text-white/60 hover:text-white"
            >
              X
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-[#d4af37] font-medium">所属经络：</span>
              <span className="text-white/80">
                {MERIDIANS.find(m => m.id === selectedPoint.meridianId)?.name}
              </span>
            </div>
            <div>
              <span className="text-[#d4af37] font-medium">定位：</span>
              <span className="text-white/80">{selectedPoint.location}</span>
            </div>
            <div>
              <span className="text-[#d4af37] font-medium">主治：</span>
              <span className="text-white/80">{selectedPoint.indications.join("、")}</span>
            </div>
            <div>
              <span className="text-[#d4af37] font-medium">刺法：</span>
              <span className="text-white/80">{selectedPoint.needlingMethod}</span>
            </div>
            <div>
              <span className="text-[#d4af37] font-medium">进针深度：</span>
              <span className="text-white/80">{selectedPoint.needlingDepth}</span>
            </div>

            {/* 针灸模拟按钮 */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleStartNeedling}
                disabled={isNeedleInserting}
                className="flex-1 bg-[#d4af37] text-black py-2 rounded-lg font-medium text-sm disabled:opacity-50"
              >
                {isNeedleInserting ? "进针中..." : "模拟进针"}
              </button>
              <button
                onClick={() => {
                  setSelectedPoint(null)
                  setShowPointDetail(false)
                }}
                className="px-4 bg-white/10 text-white py-2 rounded-lg font-medium text-sm"
              >
                关闭
              </button>
            </div>
          </div>

          {/* 安全提示 */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-yellow-500/80 text-xs">
              注意：本模拟仅供学习参考，实际针灸操作需由专业人士进行。
            </p>
          </div>
        </div>
      )}

      {/* 操作提示 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
        <p className="text-white/60 text-xs">
          拖动旋转 | 双指缩放 | 点击穴位查看详情
        </p>
      </div>
    </div>
  )
}
