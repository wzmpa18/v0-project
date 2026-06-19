"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, Layers, Target, Activity, ArrowRight } from "lucide-react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

interface TCM3DAnatomyPageProps {
  onBack: () => void
  onNavigateToTool?: (toolId: string) => void
}

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
  points: [number, number, number][]
}

type SymptomGrade = "轻" | "中" | "重"

const DEFAULT_LAYERS = [
  { id: "skin", label: "皮肤", visible: true },
  { id: "muscle", label: "肌肉", visible: true },
  { id: "bone", label: "骨骼", visible: true },
  { id: "fascia", label: "筋膜", visible: true },
  { id: "organ", label: "内脏", visible: true },
  { id: "vessel", label: "血管", visible: true },
]

export function TCM3DAnatomyPage({ onBack, onNavigateToTool }: TCM3DAnatomyPageProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number | null>(null)
  const modelRef = useRef<THREE.Object3D | null>(null)

  const [layers, setLayers] = useState(DEFAULT_LAYERS)
  const [acupoints, setAcupoints] = useState<Acupoint[]>([])
  const [routes, setRoutes] = useState<MeridianRoute[]>([])
  const [selectedRegion, setSelectedRegion] = useState("前胸")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [symptomGrade, setSymptomGrade] = useState<SymptomGrade>("中")
  const [customInput, setCustomInput] = useState("")
  const [showTriage, setShowTriage] = useState(false)

  const symptoms = useMemo(() => ["酸", "麻", "胀", "痛", "灼热", "刺痛", "紧绷", "无力"], [])

  useEffect(() => {
    let disposed = false

    async function loadData() {
      const [pointsRes, routesRes] = await Promise.all([
        fetch("/tcm/acupoints.xyz.json"),
        fetch("/tcm/meridian-paths.json"),
      ])
      if (!pointsRes.ok || !routesRes.ok || disposed) {
        return
      }
      const pointsJson = await pointsRes.json()
      const routesJson = await routesRes.json()
      if (disposed) {
        return
      }
      setAcupoints(Array.isArray(pointsJson.points) ? pointsJson.points : [])
      setRoutes(Array.isArray(routesJson.routes) ? routesJson.routes : [])
    }

    loadData()

    return () => {
      disposed = true
    }
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#0f172a")
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / Math.max(mount.clientHeight, 1), 0.1, 100)
    camera.position.set(0, 0.3, 2.6)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    rendererRef.current = renderer
    mount.appendChild(renderer.domElement)

    const hemi = new THREE.HemisphereLight(0xffffff, 0x334155, 1)
    scene.add(hemi)
    const dir = new THREE.DirectionalLight(0xffffff, 1.2)
    dir.position.set(3, 4, 2)
    scene.add(dir)

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(1.2, 48),
      new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.9, metalness: 0 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -1
    scene.add(floor)

    const fallbackBody = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.34, 1.2, 12, 24),
      new THREE.MeshStandardMaterial({ color: "#f8b4b4", transparent: true, opacity: 0.95 })
    )
    fallbackBody.name = "skin"
    scene.add(fallbackBody)
    modelRef.current = fallbackBody

    const loader = new GLTFLoader()
    loader.load(
      "/models/tcm-human-base.glb",
      (gltf: any) => {
        if (!sceneRef.current) {
          return
        }
        const model = gltf.scene
        model.position.set(0, -0.3, 0)
        model.scale.setScalar(1)
        model.traverse((obj: THREE.Object3D) => {
          if (obj instanceof THREE.Mesh) {
            obj.castShadow = false
            obj.receiveShadow = false
            if (!obj.name) {
              obj.name = "skin"
            }
          }
        })
        scene.add(model)
      },
      undefined,
      () => {
        // 保留 fallback 几何体
      }
    )

    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()

    function onPointerDown(ev: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)
      if (intersects.length > 0) {
        const p = intersects[0].point
        const region = p.y > 0.3 ? "头颈" : p.y > -0.2 ? "胸腹" : "下肢"
        setSelectedRegion(region)
        setShowTriage(true)
      }
    }

    renderer.domElement.addEventListener("pointerdown", onPointerDown)

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      scene.rotation.y += 0.002
      renderer.render(scene, camera)
    }
    animate()

    function onResize() {
      if (!mount || !rendererRef.current) {
        return
      }
      camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1)
      camera.updateProjectionMatrix()
      rendererRef.current.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      renderer.domElement.removeEventListener("pointerdown", onPointerDown)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      scene.clear()
      sceneRef.current = null
      rendererRef.current = null
      modelRef.current = null
    }
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) {
      return
    }
    const stateMap = new Map(layers.map((l) => [l.id, l.visible]))
    scene.traverse((obj: THREE.Object3D) => {
      const key = obj.name.toLowerCase()
      const visible = stateMap.get(key)
      if (visible !== undefined) {
        obj.visible = visible
      }
    })
  }, [layers])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) {
      return
    }

    const previous = scene.getObjectByName("acupoints-group")
    if (previous) {
      scene.remove(previous)
    }
    const routePrev = scene.getObjectByName("meridian-routes-group")
    if (routePrev) {
      scene.remove(routePrev)
    }

    const pointsGroup = new THREE.Group()
    pointsGroup.name = "acupoints-group"
    acupoints.forEach((point) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 12, 12),
        new THREE.MeshBasicMaterial({ color: "#facc15" })
      )
      dot.position.set(point.xyz[0], point.xyz[1], point.xyz[2])
      pointsGroup.add(dot)
    })
    scene.add(pointsGroup)

    const routesGroup = new THREE.Group()
    routesGroup.name = "meridian-routes-group"
    routes.forEach((route) => {
      const vectors = route.points.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
      if (vectors.length < 2) {
        return
      }
      const curve = new THREE.CatmullRomCurve3(vectors)
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 64, 0.004, 8, false),
        new THREE.MeshBasicMaterial({ color: "#22d3ee", transparent: true, opacity: 0.88 })
      )
      routesGroup.add(tube)
    })
    scene.add(routesGroup)
  }, [acupoints, routes])

  function toggleLayer(id: string) {
    setLayers((prev) => prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item)))
  }

  function toggleSymptom(symptom: string) {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  function submitTriage() {
    setShowTriage(false)
    if (onNavigateToTool) {
      onNavigateToTool("jingluo")
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b1220] text-[#e2e8f0] pb-24">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f2a44]">
        <button onClick={onBack} className="flex items-center gap-1 text-[#d4af37]">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <h1 className="text-sm font-semibold">3D人体解剖</h1>
        <div className="w-16" />
      </div>

      <div className="px-4 pt-3 space-y-3">
        <div className="rounded-xl border border-[#24324f] bg-[#101a2e] p-3">
          <div className="flex items-center gap-2 text-xs text-[#9fb0d0] mb-2">
            <Layers className="w-4 h-4" />
            分层显隐
          </div>
          <div className="grid grid-cols-3 gap-2">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`px-2 py-1.5 rounded text-xs border ${
                  layer.visible ? "bg-[#1d4ed8]/30 border-[#3b82f6]" : "bg-[#111827] border-[#374151]"
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#24324f] bg-[#0a1426] overflow-hidden">
          <div ref={mountRef} className="h-[360px] w-full" />
          <div className="px-3 py-2 text-xs text-[#94a3b8] border-t border-[#1f2a44]">
            点击人体任意部位可触发病灶问诊，当前区域：{selectedRegion}
          </div>
        </div>

        <div className="rounded-xl border border-[#24324f] bg-[#101a2e] p-3">
          <div className="flex items-center gap-2 text-xs text-[#9fb0d0] mb-2">
            <Target className="w-4 h-4" />
            穴位/经络可视化
          </div>
          <div className="text-xs text-[#cbd5e1]">已加载穴位 {acupoints.length} 个，经络路径 {routes.length} 条（CatmullRomCurve3）。</div>
        </div>
      </div>

      {showTriage && (
        <div className="fixed inset-0 bg-black/65 z-50 flex items-end">
          <div className="w-full bg-[#111827] rounded-t-2xl p-4 border-t border-[#334155] max-h-[70vh] overflow-y-auto">
            <div className="text-sm font-semibold text-[#f8fafc] mb-1">病灶问诊</div>
            <div className="text-xs text-[#94a3b8] mb-3">部位：{selectedRegion}</div>

            <div className="mb-3">
              <div className="text-xs text-[#cbd5e1] mb-2">症状分级</div>
              <div className="flex gap-2">
                {(["轻", "中", "重"] as SymptomGrade[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSymptomGrade(g)}
                    className={`px-3 py-1 rounded text-xs border ${symptomGrade === g ? "border-[#22d3ee] bg-[#164e63]/40" : "border-[#334155]"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-xs text-[#cbd5e1] mb-2">多选症状</div>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    className={`px-2 py-1 rounded text-xs border ${selectedSymptoms.includes(s) ? "border-[#f59e0b] bg-[#78350f]/40" : "border-[#334155]"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-[#cbd5e1] mb-2">自定义描述</div>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="补充疼痛时间、诱因、持续时长等"
                className="w-full h-20 bg-[#0b1220] border border-[#334155] rounded p-2 text-sm"
              />
            </div>

            <button onClick={submitTriage} className="w-full py-2.5 rounded bg-gradient-to-r from-[#0891b2] to-[#0ea5e9] text-white text-sm font-medium flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              提交并跳转辨证
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
