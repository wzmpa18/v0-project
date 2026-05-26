// 用户偏好设置管理系统
// 支持持久化存储用户的使用习惯和界面设置

export interface UserPreferences {
  // 大六壬设置
  liuren: {
    qikeMethod: string // 起课法：正时起课、活时起课等
    yuejiangMethod: string // 月将选取：自动、固定节气等
    guirenMethod: string // 贵人起法
    guirenSelect: string // 贵人选取
    shehaMethod: string // 涉害取法
    showShensha: boolean // 显示神煞
    colorTheme: "classic" | "modern" | "dark" // 配色主题
    fontSize: "small" | "medium" | "large" // 字体大小
  }
  
  // 八字设置
  bazi: {
    ganzhiDisplay: "traditional" | "simplified" // 干支显示方式
    showNayin: boolean // 显示纳音
    showShishen: boolean // 显示十神
    showKongwang: boolean // 显示空亡
    showShensha: boolean // 显示神煞
    paipanStyle: "vertical" | "horizontal" // 排盘样式
  }
  
  // 奇门遁甲设置
  qimen: {
    qipanType: "rotating" | "flying" // 转盘/飞盘
    yuanType: "auto" | "upper" | "middle" | "lower" // 三元选择
    hourSystem: "zhenshi" | "huoshi" // 时辰系统
    showMenPan: boolean // 显示门盘
    showXingPan: boolean // 显示星盘
    showShenPan: boolean // 显示神盘
  }
  
  // 六爻设置
  liuyao: {
    装卦Method: string // 装卦方法
    showShishen: boolean // 显示六亲
    showLiuShen: boolean // 显示六神
    showFuShen: boolean // 显示伏神
    animateShake: boolean // 摇卦动画
  }
  
  // 中医设置
  tcm: {
    showPinyin: boolean // 显示拼音
    showEnglish: boolean // 显示英文
    meridianColor: "classic" | "modern" // 经络颜色
    acupointSize: "small" | "medium" | "large" // 穴位大小
    enable3D: boolean // 启用3D模型
  }
  
  // 通用设置
  general: {
    theme: "light" | "dark" | "auto" // 主题
    language: "zh-CN" | "zh-TW" | "en" // 语言
    fontSize: number // 全局字体大小
    hapticFeedback: boolean // 触觉反馈
    soundEffect: boolean // 音效
    autoSave: boolean // 自动保存
    offlineMode: boolean // 离线模式
  }
  
  // 最近使用
  recentTools: string[] // 最近使用的工具
  favorites: string[] // 收藏的功能
  
  // 上次状态
  lastState: {
    activeTab: string
    activeTool: string | null
    scrollPositions: Record<string, number>
  }
}

// 默认偏好设置
export const DEFAULT_PREFERENCES: UserPreferences = {
  liuren: {
    qikeMethod: "正时起课",
    yuejiangMethod: "自动",
    guirenMethod: "甲戊庚牛羊(壬癸蛇兔)",
    guirenSelect: "自动",
    shehaMethod: "根据深度",
    showShensha: true,
    colorTheme: "classic",
    fontSize: "medium",
  },
  bazi: {
    ganzhiDisplay: "traditional",
    showNayin: true,
    showShishen: true,
    showKongwang: true,
    showShensha: true,
    paipanStyle: "vertical",
  },
  qimen: {
    qipanType: "rotating",
    yuanType: "auto",
    hourSystem: "zhenshi",
    showMenPan: true,
    showXingPan: true,
    showShenPan: true,
  },
  liuyao: {
    装卦Method: "手动摇卦",
    showShishen: true,
    showLiuShen: true,
    showFuShen: true,
    animateShake: true,
  },
  tcm: {
    showPinyin: true,
    showEnglish: false,
    meridianColor: "classic",
    acupointSize: "medium",
    enable3D: false, // 默认关闭，需要用户主动下载
  },
  general: {
    theme: "dark",
    language: "zh-CN",
    fontSize: 16,
    hapticFeedback: true,
    soundEffect: true,
    autoSave: true,
    offlineMode: false,
  },
  recentTools: [],
  favorites: [],
  lastState: {
    activeTab: "paipan",
    activeTool: null,
    scrollPositions: {},
  },
}

// 存储键名
const STORAGE_KEY = "yixue_user_preferences"

// 获取用户偏好
export function getUserPreferences(): UserPreferences {
  if (typeof window === "undefined") {
    return DEFAULT_PREFERENCES
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // 合并默认值，确保新增的字段也有默认值
      return deepMerge(DEFAULT_PREFERENCES, parsed)
    }
  } catch (error) {
    console.error("Failed to load user preferences:", error)
  }
  
  return DEFAULT_PREFERENCES
}

// 保存用户偏好
export function saveUserPreferences(preferences: Partial<UserPreferences>): void {
  if (typeof window === "undefined") return
  
  try {
    const current = getUserPreferences()
    const merged = deepMerge(current, preferences)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch (error) {
    console.error("Failed to save user preferences:", error)
  }
}

// 更新特定模块的偏好
export function updateModulePreferences<K extends keyof UserPreferences>(
  module: K,
  preferences: Partial<UserPreferences[K]>
): void {
  const current = getUserPreferences()
  saveUserPreferences({
    [module]: { ...current[module], ...preferences },
  } as Partial<UserPreferences>)
}

// 添加最近使用的工具
export function addRecentTool(toolId: string): void {
  const prefs = getUserPreferences()
  const recent = [toolId, ...prefs.recentTools.filter(id => id !== toolId)].slice(0, 10)
  saveUserPreferences({ recentTools: recent })
}

// 切换收藏
export function toggleFavorite(toolId: string): boolean {
  const prefs = getUserPreferences()
  const isFavorite = prefs.favorites.includes(toolId)
  const favorites = isFavorite
    ? prefs.favorites.filter(id => id !== toolId)
    : [...prefs.favorites, toolId]
  saveUserPreferences({ favorites })
  return !isFavorite
}

// 保存最后状态
export function saveLastState(state: Partial<UserPreferences["lastState"]>): void {
  const prefs = getUserPreferences()
  saveUserPreferences({
    lastState: { ...prefs.lastState, ...state },
  })
}

// 深度合并对象
function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target }
  
  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === "object" &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof target[key] === "object" &&
        target[key] !== null
      ) {
        result[key] = deepMerge(
          target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>
        ) as T[Extract<keyof T, string>]
      } else {
        result[key] = source[key] as T[Extract<keyof T, string>]
      }
    }
  }
  
  return result
}

// React Hook for user preferences
export function useUserPreferences() {
  if (typeof window === "undefined") {
    return {
      preferences: DEFAULT_PREFERENCES,
      updatePreferences: () => {},
      updateModule: () => {},
      addRecent: () => {},
      toggleFav: () => false,
      saveState: () => {},
    }
  }
  
  return {
    preferences: getUserPreferences(),
    updatePreferences: saveUserPreferences,
    updateModule: updateModulePreferences,
    addRecent: addRecentTool,
    toggleFav: toggleFavorite,
    saveState: saveLastState,
  }
}
