"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft } from "lucide-react"
import * as THREE from "three"
import TWEEN from "@tweenjs/tween.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

type LayerKey = "skin" | "muscle" | "bone" | "fascia" | "organ" | "vessel"
type ModuleTab = "anatomy" | "acupuncture" | "bone-setting"

type Acupoint = {
  id: string
  name: string
  meridian: string
  xyz: [number, number, number]
  depthMm: number
  retainMin: number
  compatibility: string[]
}

type MeridianRoute = {
  id: string
  name: string
  sourceRef: {
    work: string
    chapter: string
    edition: string
  }
  points: Array<[number, number, number]>
}

interface Tcm3DPageProps {
  onBack: () => void
  onNavigateToTool?: (toolId: string) => void
  initialTab?: ModuleTab
}

const LAYER_CONFIG: Array<{ key: LayerKey; label: string; color: string }> = [
  { key: "skin", label: "皮肤", color: "#f2c8a6" },
  { key: "muscle", label: "肌肉", color: "#cc5b5b" },
  { key: "bone", label: "骨骼", color: "#f4f4f4" },
  { key: "fascia", label: "筋膜", color: "#d4af37" },
  { key: "organ", label: "内脏", color: "#a855f7" },
  { key: "vessel", label: "血管", color: "#3b82f6" },
]

const SYMPTOM_OPTIONS = ["酸", "麻", "胀", "痛", "灼热", "刺痛", "活动受限"]

const ACU_SCHEMES = {
  classic: { label: "针灸大成", points: ["ST36", "LI4", "CV12", "GV20"] },
  dong: { label: "董氏奇穴", points: ["LI4", "LV3", "GV20"] },
  nihaixia: { label: "倪海厦方案", points: ["CV4", "ST36", "LI4"] },
} as const

function buildFallbackLayeredModel(scene: THREE.Scene): Record<LayerKey, THREE.Object3D[]> {
  const layers: Record<LayerKey, THREE.Object3D[]> = {
    skin: [],
    muscle: [],
    bone: [],
    fascia: [],
    organ: [],
    vessel: [],
  }

  const root = new THREE.Group()
  root.name = "fallback-human-root"

  const geometries = {
    torso: new THREE.CapsuleGeometry(0.32, 1.1, 8, 16),
    vessel: new THREE.CylinderGeometry(0.015, 0.015, 1.2, 12),
  }

  const meshByLayer = (layer: LayerKey, scale: number, opacity: number) => {
    const color = LAYER_CONFIG.find((i) => i.key === layer)?.color || "#cccccc"
    const mat = new THREE.MeshStandardMaterial({ color, transparent: true, opacity })
    const mesh = new THREE.Mesh(geometries.torso, mat)
    mesh.name = `${layer}-mesh`
    mesh.scale.setScalar(scale)
    mesh.userData.layerKey = layer
    mesh.userData.clickable = true
    layers[layer].push(mesh)
    root.add(mesh)
  }

  meshByLayer("skin", 1.0, 0.35)
  meshByLayer("muscle", 0.95, 0.32)
  meshByLayer("fascia", 0.9, 0.28)
  meshByLayer("organ", 0.8, 0.26)
  meshByLayer("bone", 0.7, 0.45)

  const vessel = new THREE.Mesh(
    geometries.vessel,
    new THREE.MeshStandardMaterial({ color: "#3b82f6", transparent: true, opacity: 0.6 })
  )
  vessel.position.set(0.06, 0, 0)
  vessel.name = "vessel-main"
  vessel.userData.layerKey = "vessel"
  vessel.userData.clickable = true
  layers.vessel.push(vessel)
  root.add(vessel)

  scene.add(root)
  return layers
}

function createCurveLine(points: Array<[number, number, number]>, color = "#d4af37") {
  const vectors = points.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
  const curve = new THREE.CatmullRomCurve3(vectors)
  const sampled = curve.getPoints(80)
  const geometry = new THREE.BufferGeometry().setFromPoints(sampled)
  const material = new THREE.LineBasicMaterial({ color })
  return new THREE.Line(geometry, material)
}

export function Tcm3DPage({ onBack, onNavigateToTool, initialTab = "anatomy" }: Tcm3DPageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<any>(null)
  const bodyLayersRef = useRef<Record<LayerKey, THREE.Object3D[]>>({
    skin: [],
    muscle: [],
    bone: [],
    fascia: [],
    organ: [],
    vessel: [],
  })
  const acupointMeshesRef = useRef<Record<string, THREE.Mesh>>({})
  const needleMeshRef = useRef<THREE.Mesh | null>(null)
  const boneMeshesRef = useRef<{ neck: THREE.Mesh | null; lumbar: THREE.Mesh | null }>({ neck: null, lumbar: null })
  const originalBonePoseRef = useRef<{ neck: THREE.Vector3; lumbar: THREE.Vector3 } | null>(null)

  const [activeTab, setActiveTab] = useState<ModuleTab>(initialTab)
  const [layerVisibility, setLayerVisibility] = useState<Record<LayerKey, boolean>>({
    skin: true,
    muscle: true,
    bone: true,
    fascia: true,
    organ: true,
    vessel: true,
  })
  const [acupoints, setAcupoints] = useState<Acupoint[]>([])
  const [routes, setRoutes] = useState<MeridianRoute[]>([])
  const [scheme, setScheme] = useState<keyof typeof ACU_SCHEMES>("classic")
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null)
  const [tissueHint, setTissueHint] = useState("等待针刺操作")

  const [showSymptomDialog, setShowSymptomDialog] = useState(false)
  const [pickedRegion, setPickedRegion] = useState("躯干")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [customSymptom, setCustomSymptom] = useState("")

  const selectedPoint = useMemo(
    () => acupoints.find((p) => p.id === selectedPointId) || null,
    [acupoints, selectedPointId]
  )

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#0f172a")

    const camera = new THREE.PerspectiveCamera(45, root.clientWidth / 420, 0.1, 100)
    camera.position.set(0, 1.2, 3)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(root.clientWidth, 420)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    root.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    scene.add(new THREE.AmbientLight("#ffffff", 0.8))
    const dir = new THREE.DirectionalLight("#ffffff", 1.1)
    dir.position.set(2, 4, 3)
    scene.add(dir)

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer
    controlsRef.current = controls

    const loader = new GLTFLoader()
    loader.load(
      "/models/tcm-human-base.glb",
      (gltf: any) => {
        const layers: Record<LayerKey, THREE.Object3D[]> = {
          skin: [],
          muscle: [],
          bone: [],
          fascia: [],
          organ: [],
          vessel: [],
        }

        gltf.scene.traverse((obj: THREE.Object3D) => {
          const name = obj.name.toLowerCase()
          if (!(obj instanceof THREE.Mesh)) return
          obj.userData.clickable = true
          if (name.includes("skin")) layers.skin.push(obj)
          else if (name.includes("muscle")) layers.muscle.push(obj)
          else if (name.includes("bone")) layers.bone.push(obj)
          else if (name.includes("fascia")) layers.fascia.push(obj)
          else if (name.includes("organ")) layers.organ.push(obj)
          else if (name.includes("vessel")) layers.vessel.push(obj)
        })

        scene.add(gltf.scene)
        const hasLayeredParts = Object.values(layers).some((arr) => arr.length > 0)
        bodyLayersRef.current = hasLayeredParts ? layers : buildFallbackLayeredModel(scene)
      },
      undefined,
      () => {
        bodyLayersRef.current = buildFallbackLayeredModel(scene)
      }
    )

    const needle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.006, 0.006, 0.35, 12),
      new THREE.MeshStandardMaterial({ color: "#e5e7eb", metalness: 0.85, roughness: 0.2 })
    )
    needle.visible = false
    needle.rotateX(Math.PI / 2)
    scene.add(needle)
    needleMeshRef.current = needle

    const neck = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.18, 0.24),
      new THREE.MeshStandardMaterial({ color: "#f8fafc", transparent: true, opacity: 0.65 })
    )
    neck.position.set(0, 0.55, -0.5)
    neck.visible = false
    scene.add(neck)

    const lumbar = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.16, 0.26),
      new THREE.MeshStandardMaterial({ color: "#f1f5f9", transparent: true, opacity: 0.65 })
    )
    lumbar.position.set(0, -0.15, -0.5)
    lumbar.visible = false
    scene.add(lumbar)

    boneMeshesRef.current = { neck, lumbar }
    originalBonePoseRef.current = {
      neck: neck.position.clone(),
      lumbar: lumbar.position.clone(),
    }

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onClick = (ev: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)

      const clickable: THREE.Object3D[] = []
      Object.values(bodyLayersRef.current).forEach((arr) => arr.forEach((obj) => clickable.push(obj)))
      Object.values(acupointMeshesRef.current).forEach((m) => clickable.push(m))

      const hit = raycaster.intersectObjects(clickable, true)[0]
      if (!hit) return

      const acupointId = hit.object.userData.acupointId as string | undefined
      if (acupointId && activeTab === "acupuncture") {
        setSelectedPointId(acupointId)
        return
      }

      if (activeTab === "anatomy") {
        setPickedRegion(hit.object.name || "躯干")
        setSelectedSymptoms([])
        setCustomSymptom("")
        setShowSymptomDialog(true)
      }
    }

    renderer.domElement.addEventListener("click", onClick)

    const animate = () => {
      controls.update()
      TWEEN.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      renderer.domElement.removeEventListener("click", onClick)
      controls.dispose()
      renderer.dispose()
      root.removeChild(renderer.domElement)
    }
  }, [activeTab])

  useEffect(() => {
    fetch("/data/acupoints.xyz.json")
      .then((r) => r.json())
      .then((data) => setAcupoints(Array.isArray(data.points) ? data.points : []))
      .catch(() => setAcupoints([]))

    fetch("/data/meridian-paths.json")
      .then((r) => r.json())
      .then((data) => setRoutes(Array.isArray(data.routes) ? data.routes : []))
      .catch(() => setRoutes([]))
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    Object.entries(layerVisibility).forEach(([key, visible]) => {
      bodyLayersRef.current[key as LayerKey].forEach((obj) => {
        obj.visible = visible
      })
    })
  }, [layerVisibility])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    Object.values(acupointMeshesRef.current).forEach((mesh) => {
      scene.remove(mesh)
      mesh.geometry.dispose()
      ;(mesh.material as THREE.Material).dispose()
    })
    acupointMeshesRef.current = {}

    acupoints.forEach((p) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.022, 16, 16),
        new THREE.MeshStandardMaterial({ color: "#fde047", emissive: "#f59e0b", emissiveIntensity: 0.8 })
      )
      mesh.position.set(p.xyz[0], p.xyz[1], p.xyz[2])
      mesh.visible = activeTab !== "bone-setting"
      mesh.userData.acupointId = p.id
      mesh.name = `acupoint-${p.id}`
      scene.add(mesh)
      acupointMeshesRef.current[p.id] = mesh
    })

    const routeLines = routes.map((r, idx) => {
      const line = createCurveLine(r.points, idx % 2 === 0 ? "#22d3ee" : "#d4af37")
      line.name = `route-${r.id}`
      line.visible = activeTab === "anatomy"
      scene.add(line)
      return line
    })

    return () => {
      routeLines.forEach((line) => {
        scene.remove(line)
        line.geometry.dispose()
        ;(line.material as THREE.Material).dispose()
      })
    }
  }, [acupoints, routes, activeTab])

  useEffect(() => {
    const { neck, lumbar } = boneMeshesRef.current
    if (neck) neck.visible = activeTab === "bone-setting"
    if (lumbar) lumbar.visible = activeTab === "bone-setting"

    Object.values(acupointMeshesRef.current).forEach((m) => {
      m.visible = activeTab !== "bone-setting"
    })
  }, [activeTab])

  const runNeedleSimulation = () => {
    const scene = sceneRef.current
    const needle = needleMeshRef.current
    if (!scene || !needle || !selectedPoint) return

    const start = new THREE.Vector3(selectedPoint.xyz[0], selectedPoint.xyz[1], selectedPoint.xyz[2] + 0.4)
    const end = new THREE.Vector3(selectedPoint.xyz[0], selectedPoint.xyz[1], selectedPoint.xyz[2] - 0.02)

    needle.position.copy(start)
    needle.visible = true

    const skin = bodyLayersRef.current.skin[0]
    const skinMesh = skin instanceof THREE.Mesh ? skin : null

    new TWEEN.Tween({ t: 0 })
      .to({ t: 1 }, 900)
      .onUpdate((state) => {
        needle.position.lerpVectors(start, end, state.t)
        if (skinMesh) {
          const s = 1 - state.t * 0.02
          skinMesh.scale.set(s, s, s)
        }

        if (state.t < 0.34) setTissueHint("组织层级：皮肤")
        else if (state.t < 0.75) setTissueHint("组织层级：皮肤 -> 肌肉")
        else setTissueHint("组织层级：皮肤 -> 肌肉；血管避让提示：已触发")
      })
      .onComplete(() => {
        if (skinMesh) skinMesh.scale.set(1, 1, 1)
      })
      .start()
  }

  const applyMisalignment = (segment: "neck" | "lumbar") => {
    const mesh = boneMeshesRef.current[segment]
    if (!mesh) return
    mesh.position.x += segment === "neck" ? 0.06 : -0.08
    mesh.rotation.z += segment === "neck" ? 0.12 : -0.1
  }

  const resetBones = () => {
    const origin = originalBonePoseRef.current
    const { neck, lumbar } = boneMeshesRef.current
    if (!origin || !neck || !lumbar) return

    new TWEEN.Tween(neck.position).to({ x: origin.neck.x, y: origin.neck.y, z: origin.neck.z }, 700).start()
    new TWEEN.Tween(lumbar.position).to({ x: origin.lumbar.x, y: origin.lumbar.y, z: origin.lumbar.z }, 700).start()
    new TWEEN.Tween(neck.rotation).to({ z: 0 }, 700).start()
    new TWEEN.Tween(lumbar.rotation).to({ z: 0 }, 700).start()
  }

  const submitSymptoms = () => {
    const merged = [...selectedSymptoms]
    if (customSymptom.trim()) merged.push(customSymptom.trim())
    setShowSymptomDialog(false)
    if (merged.length > 0) {
      window.localStorage.setItem("TCM_3D_TRIAGE", JSON.stringify({ region: pickedRegion, symptoms: merged }))
    }
    onNavigateToTool?.("jingluo")
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0f172a] text-[#f8fafc] pb-20">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f2937]">
        <button onClick={onBack} className="flex items-center gap-1 text-[#d4af37]">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <h1 className="font-medium">中医3D人体解剖</h1>
        <div className="w-12" />
      </div>

      <div className="px-4 py-3 flex gap-2">
        <button
          onClick={() => setActiveTab("anatomy")}
          className={`px-3 py-1.5 rounded-lg text-xs ${activeTab === "anatomy" ? "bg-[#0369a1]" : "bg-[#1f2937]"}`}
        >
          3D人体解剖
        </button>
        <button
          onClick={() => setActiveTab("acupuncture")}
          className={`px-3 py-1.5 rounded-lg text-xs ${activeTab === "acupuncture" ? "bg-[#0369a1]" : "bg-[#1f2937]"}`}
        >
          虚拟针灸模拟
        </button>
        <button
          onClick={() => setActiveTab("bone-setting")}
          className={`px-3 py-1.5 rounded-lg text-xs ${activeTab === "bone-setting" ? "bg-[#0369a1]" : "bg-[#1f2937]"}`}
        >
          正骨模拟
        </button>
      </div>

      <div className="px-4">
        <div ref={containerRef} className="rounded-xl overflow-hidden border border-[#1f2937]" />
      </div>

      <div className="px-4 pt-3 space-y-3">
        {activeTab === "anatomy" && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {LAYER_CONFIG.map((layer) => (
                <label key={layer.key} className="flex items-center gap-2 text-xs bg-[#111827] rounded-lg p-2 border border-[#1f2937]">
                  <input
                    type="checkbox"
                    checked={layerVisibility[layer.key]}
                    onChange={(e) => setLayerVisibility((prev) => ({ ...prev, [layer.key]: e.target.checked }))}
                  />
                  <span>{layer.label}</span>
                </label>
              ))}
            </div>
            <div className="bg-[#111827] rounded-lg p-3 text-xs border border-[#1f2937]">
              点击人体任意部位可发起病灶问诊，症状提交后将自动跳转六经辨证。
            </div>
          </>
        )}

        {activeTab === "acupuncture" && (
          <>
            <div className="flex gap-2">
              {(Object.keys(ACU_SCHEMES) as Array<keyof typeof ACU_SCHEMES>).map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    setScheme(k)
                    setSelectedPointId(ACU_SCHEMES[k].points[0] || null)
                  }}
                  className={`px-2 py-1.5 text-xs rounded ${scheme === k ? "bg-[#0369a1]" : "bg-[#1f2937]"}`}
                >
                  {ACU_SCHEMES[k].label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {ACU_SCHEMES[scheme].points.map((pid) => (
                <button
                  key={pid}
                  onClick={() => setSelectedPointId(pid)}
                  className={`px-2 py-1 text-xs rounded ${selectedPointId === pid ? "bg-[#d4af37] text-black" : "bg-[#1f2937]"}`}
                >
                  {pid}
                </button>
              ))}
            </div>

            {selectedPoint && (
              <div className="bg-[#111827] rounded-lg p-3 border border-[#1f2937] text-xs space-y-1">
                <div>穴位：{selectedPoint.name}（{selectedPoint.id}）</div>
                <div>取穴位置：XYZ {selectedPoint.xyz.join(", ")}</div>
                <div>进针深度：{selectedPoint.depthMm} mm</div>
                <div>留针时长：{selectedPoint.retainMin} 分钟</div>
                <div>配伍配穴：{selectedPoint.compatibility.join("、")}</div>
              </div>
            )}

            <button onClick={runNeedleSimulation} className="w-full py-2 rounded bg-[#0ea5e9] text-sm">
              执行3D针刺动画
            </button>
            <div className="bg-[#111827] rounded-lg p-3 text-xs border border-[#1f2937]">{tissueHint}</div>
          </>
        )}

        {activeTab === "bone-setting" && (
          <div className="space-y-2">
            <button onClick={() => applyMisalignment("neck")} className="w-full py-2 rounded bg-[#7c3aed] text-sm">
              颈椎一键错位
            </button>
            <button onClick={() => applyMisalignment("lumbar")} className="w-full py-2 rounded bg-[#7c3aed] text-sm">
              腰椎一键错位
            </button>
            <button onClick={resetBones} className="w-full py-2 rounded bg-[#10b981] text-sm">
              TWEEN平滑复位
            </button>
          </div>
        )}
      </div>

      {showSymptomDialog && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end">
          <div className="w-full bg-[#0b1220] rounded-t-2xl p-4 border-t border-[#1f2937]">
            <div className="text-sm mb-2">病灶问诊：{pickedRegion}</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {SYMPTOM_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    setSelectedSymptoms((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
                  }
                  className={`px-2 py-1 text-xs rounded ${selectedSymptoms.includes(s) ? "bg-[#d4af37] text-black" : "bg-[#1f2937]"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <input
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              placeholder="自定义症状"
              className="w-full rounded bg-[#111827] border border-[#1f2937] px-3 py-2 text-sm mb-3"
            />
            <div className="flex gap-2">
              <button onClick={() => setShowSymptomDialog(false)} className="flex-1 py-2 rounded bg-[#1f2937] text-sm">
                取消
              </button>
              <button onClick={submitSymptoms} className="flex-1 py-2 rounded bg-[#0ea5e9] text-sm">
                跳转辨证
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
