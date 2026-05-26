"use client"

import { useState, useEffect } from "react"
import { 
  Download, Trash2, HardDrive, Wifi, WifiOff,
  Check, X, Loader2, FolderOpen, FileText, 
  BookOpen, Box, Music, Image as ImageIcon
} from "lucide-react"

// 可下载资源类型
interface DownloadableResource {
  id: string
  name: string
  category: string
  size: string // 文件大小
  sizeBytes: number
  icon: typeof Download
  description: string
  isDownloaded: boolean
  downloadProgress?: number
  isRequired?: boolean // 是否必需
}

// 资源分类
const RESOURCE_CATEGORIES = [
  { id: "classics", name: "古籍经典", icon: BookOpen },
  { id: "tcm", name: "中医资料", icon: FileText },
  { id: "3d", name: "3D模型", icon: Box },
  { id: "audio", name: "音频资源", icon: Music },
  { id: "images", name: "图片素材", icon: ImageIcon },
]

// 模拟可下载资源列表
const DOWNLOADABLE_RESOURCES: DownloadableResource[] = [
  // 古籍经典
  { id: "yijing", name: "周易原文与注解", category: "classics", size: "2.3 MB", sizeBytes: 2411724, icon: BookOpen, description: "周易六十四卦原文、译文及历代注解", isDownloaded: false },
  { id: "huangdi", name: "黄帝内经", category: "classics", size: "5.1 MB", sizeBytes: 5347737, icon: BookOpen, description: "素问、灵枢原文与白话译文", isDownloaded: false },
  { id: "shanghan", name: "伤寒论", category: "classics", size: "3.2 MB", sizeBytes: 3355443, icon: BookOpen, description: "张仲景伤寒论原文与方剂", isDownloaded: false },
  { id: "jinkui", name: "金匮要略", category: "classics", size: "2.8 MB", sizeBytes: 2936012, icon: BookOpen, description: "张仲景金匮要略原文与方剂", isDownloaded: false },
  { id: "bencao", name: "神农本草经", category: "classics", size: "1.5 MB", sizeBytes: 1572864, icon: BookOpen, description: "365味中药的性味归经", isDownloaded: false },
  { id: "ditiansu", name: "滴天髓", category: "classics", size: "1.2 MB", sizeBytes: 1258291, icon: BookOpen, description: "命理学经典著作", isDownloaded: false },
  { id: "qianziwen", name: "渊海子平", category: "classics", size: "1.8 MB", sizeBytes: 1887436, icon: BookOpen, description: "八字命理经典", isDownloaded: false },

  // 中医资料
  { id: "acupoints", name: "经络穴位数据库", category: "tcm", size: "4.5 MB", sizeBytes: 4718592, icon: FileText, description: "361个经穴+奇穴定位与主治", isDownloaded: true, isRequired: true },
  { id: "formulas", name: "方剂数据库", category: "tcm", size: "8.2 MB", sizeBytes: 8598323, icon: FileText, description: "1.8万首经典方剂", isDownloaded: false },
  { id: "herbs", name: "中药数据库", category: "tcm", size: "12.5 MB", sizeBytes: 13107200, icon: FileText, description: "1.1万味中药详细信息", isDownloaded: false },
  { id: "diseases", name: "疾病辨证库", category: "tcm", size: "6.3 MB", sizeBytes: 6606028, icon: FileText, description: "常见疾病的中医辨证施治", isDownloaded: false },
  { id: "tongue", name: "舌诊图谱", category: "tcm", size: "15.8 MB", sizeBytes: 16567706, icon: ImageIcon, description: "舌象分析参考图库", isDownloaded: false },

  // 3D模型
  { id: "body-basic", name: "基础人体模型", category: "3d", size: "45 MB", sizeBytes: 47185920, icon: Box, description: "人体皮肤、骨骼基础模型", isDownloaded: false },
  { id: "body-full", name: "完整解剖模型", category: "3d", size: "180 MB", sizeBytes: 188743680, icon: Box, description: "包含肌肉、血管、内脏的高清模型", isDownloaded: false },
  { id: "meridian-3d", name: "3D经络模型", category: "3d", size: "25 MB", sizeBytes: 26214400, icon: Box, description: "十四经络三维可视化", isDownloaded: false },
  { id: "needle-anim", name: "针灸动画资源", category: "3d", size: "8 MB", sizeBytes: 8388608, icon: Box, description: "进针手法动画演示", isDownloaded: false },

  // 音频资源
  { id: "baduanjin", name: "八段锦配乐", category: "audio", size: "35 MB", sizeBytes: 36700160, icon: Music, description: "八段锦完整配乐与口令", isDownloaded: false },
  { id: "meditation", name: "静心冥想音乐", category: "audio", size: "50 MB", sizeBytes: 52428800, icon: Music, description: "养生冥想背景音乐", isDownloaded: false },
]

// 格式化文件大小
function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB"
  return (bytes / 1073741824).toFixed(2) + " GB"
}

interface OfflineManagerProps {
  onClose?: () => void
}

export function OfflineManager({ onClose }: OfflineManagerProps) {
  const [resources, setResources] = useState<DownloadableResource[]>(DOWNLOADABLE_RESOURCES)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isOnline, setIsOnline] = useState(true)
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set())

  // 监听网络状态
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    setIsOnline(navigator.onLine)
    
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // 计算存储统计
  const totalDownloaded = resources.filter(r => r.isDownloaded).reduce((acc, r) => acc + r.sizeBytes, 0)
  const totalAvailable = resources.reduce((acc, r) => acc + r.sizeBytes, 0)

  // 模拟下载
  const handleDownload = async (resourceId: string) => {
    if (!isOnline) {
      alert("当前处于离线状态，无法下载")
      return
    }

    setDownloadingIds(prev => new Set(prev).add(resourceId))

    // 模拟下载进度
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setResources(prev => prev.map(r => 
        r.id === resourceId ? { ...r, downloadProgress: progress } : r
      ))
    }

    // 完成下载
    setResources(prev => prev.map(r => 
      r.id === resourceId ? { ...r, isDownloaded: true, downloadProgress: undefined } : r
    ))
    setDownloadingIds(prev => {
      const next = new Set(prev)
      next.delete(resourceId)
      return next
    })
  }

  // 删除下载
  const handleDelete = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId)
    if (resource?.isRequired) {
      alert("此资源为必需资源，无法删除")
      return
    }
    
    if (confirm(`确定要删除"${resource?.name}"吗？`)) {
      setResources(prev => prev.map(r => 
        r.id === resourceId ? { ...r, isDownloaded: false } : r
      ))
    }
  }

  // 批量下载
  const handleDownloadAll = async (category?: string) => {
    const toDownload = resources.filter(r => 
      !r.isDownloaded && 
      !downloadingIds.has(r.id) &&
      (category === "all" || !category || r.category === category)
    )
    
    for (const resource of toDownload) {
      await handleDownload(resource.id)
    }
  }

  // 过滤资源
  const filteredResources = selectedCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === selectedCategory)

  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-24">
      {/* 顶部状态栏 */}
      <div className="sticky top-0 z-10 bg-[#252525] border-b border-[#333] px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-[#d4af37]" />
            <span className="text-white font-medium">离线资源管理</span>
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <div className="flex items-center gap-1 text-green-500 text-xs">
                <Wifi className="w-4 h-4" />
                <span>在线</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-500 text-xs">
                <WifiOff className="w-4 h-4" />
                <span>离线</span>
              </div>
            )}
            {onClose && (
              <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* 存储统计 */}
        <div className="bg-[#333] rounded-xl p-3">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">已下载</span>
            <span className="text-white">{formatSize(totalDownloaded)} / {formatSize(totalAvailable)}</span>
          </div>
          <div className="h-2 bg-[#444] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#d4af37] rounded-full transition-all"
              style={{ width: `${(totalDownloaded / totalAvailable) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 分类选择器 */}
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm ${
              selectedCategory === "all" 
                ? "bg-[#d4af37] text-black" 
                : "bg-[#333] text-gray-300"
            }`}
          >
            全部
          </button>
          {RESOURCE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 ${
                selectedCategory === cat.id 
                  ? "bg-[#d4af37] text-black" 
                  : "bg-[#333] text-gray-300"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 批量操作 */}
      <div className="px-4 mb-3">
        <button
          onClick={() => handleDownloadAll(selectedCategory)}
          disabled={!isOnline || filteredResources.every(r => r.isDownloaded)}
          className="w-full py-2.5 bg-[#333] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          下载{selectedCategory === "all" ? "全部" : "当前分类"}资源
        </button>
      </div>

      {/* 资源列表 */}
      <div className="px-4 space-y-2">
        {filteredResources.map(resource => {
          const isDownloading = downloadingIds.has(resource.id)
          const CategoryIcon = RESOURCE_CATEGORIES.find(c => c.id === resource.category)?.icon || FolderOpen

          return (
            <div 
              key={resource.id}
              className="bg-[#252525] rounded-xl p-3 border border-[#333]"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#333] flex items-center justify-center flex-shrink-0">
                  <CategoryIcon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium text-sm truncate">{resource.name}</h3>
                    {resource.isRequired && (
                      <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-1.5 py-0.5 rounded">必需</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{resource.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-gray-600 text-xs">{resource.size}</span>
                    {resource.isDownloaded && (
                      <span className="text-green-500 text-xs flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        已下载
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {isDownloading ? (
                    <div className="w-10 h-10 rounded-lg bg-[#333] flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-[#d4af37] animate-spin" />
                    </div>
                  ) : resource.isDownloaded ? (
                    <button
                      onClick={() => handleDelete(resource.id)}
                      disabled={resource.isRequired}
                      className="w-10 h-10 rounded-lg bg-[#333] flex items-center justify-center text-gray-400 hover:text-red-500 disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDownload(resource.id)}
                      disabled={!isOnline}
                      className="w-10 h-10 rounded-lg bg-[#d4af37] flex items-center justify-center disabled:opacity-50"
                    >
                      <Download className="w-5 h-5 text-black" />
                    </button>
                  )}
                </div>
              </div>

              {/* 下载进度 */}
              {isDownloading && resource.downloadProgress !== undefined && (
                <div className="mt-2">
                  <div className="h-1.5 bg-[#333] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#d4af37] rounded-full transition-all"
                      style={{ width: `${resource.downloadProgress}%` }}
                    />
                  </div>
                  <p className="text-[#d4af37] text-xs mt-1 text-right">{resource.downloadProgress}%</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 底部提示 */}
      <div className="px-4 mt-6">
        <div className="bg-[#252525] rounded-xl p-4 border border-[#333]">
          <h4 className="text-white font-medium text-sm mb-2">关于离线资源</h4>
          <ul className="text-gray-500 text-xs space-y-1.5">
            <li>- 3D模型文件较大，建议在WiFi环境下下载</li>
            <li>- 古籍和中医资料下载后可离线阅读使用</li>
            <li>- 视频资源需要在线观看，暂不支持离线下载</li>
            <li>- 已下载资源存储在本地，可随时删除以释放空间</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
