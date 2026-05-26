// 权限管理系统 - 功能开放等级控制

// 权限等级定义
export enum PermissionLevel {
  GUEST = 0,      // 游客 - 仅可查看基础内容
  FREE = 1,       // 免费用户 - 基础功能
  BASIC = 2,      // 基础会员 - 常用功能
  PREMIUM = 3,    // 高级会员 - 全部功能
  VIP = 4,        // VIP会员 - 全部功能+专属服务
  ADMIN = 5,      // 管理员 - 所有权限+后台管理
}

// 权限等级名称
export const PERMISSION_LEVEL_NAMES: Record<PermissionLevel, string> = {
  [PermissionLevel.GUEST]: "游客",
  [PermissionLevel.FREE]: "免费用户",
  [PermissionLevel.BASIC]: "基础会员",
  [PermissionLevel.PREMIUM]: "高级会员",
  [PermissionLevel.VIP]: "VIP会员",
  [PermissionLevel.ADMIN]: "管理员",
}

// 临时开放时间选项（分钟）
export const TEMP_ACCESS_DURATIONS = [
  { value: 30, label: "30分钟" },
  { value: 60, label: "1小时" },
  { value: 180, label: "3小时" },
  { value: 720, label: "12小时" },
  { value: 1440, label: "24小时" },
  { value: 4320, label: "3天" },
  { value: 10080, label: "7天" },
]

// 功能模块定义
export interface FeatureConfig {
  id: string
  name: string
  description: string
  category: "yixue" | "tcm" | "tools" | "ai" | "classics"
  requiredLevel: PermissionLevel
  isEnabled: boolean // 全局开关
  disclaimer?: string // 免责声明
  privacyNotice?: string // 隐私提示
}

// 功能模块配置
export const FEATURE_CONFIGS: FeatureConfig[] = [
  // 易学传统文化模块
  {
    id: "bazi",
    name: "四柱八字",
    description: "传统命理文化学习与性格分析参考",
    category: "yixue",
    requiredLevel: PermissionLevel.FREE,
    isEnabled: true,
    disclaimer: "本功能仅供传统文化学习交流，分析结果为性格倾向参考，不作为人生决策依据。",
  },
  {
    id: "ziwei",
    name: "紫微斗数",
    description: "传统命理文化学习与人格特质分析",
    category: "yixue",
    requiredLevel: PermissionLevel.BASIC,
    isEnabled: true,
    disclaimer: "本功能仅供传统文化学习交流，分析结果为人格特质参考，不作为人生决策依据。",
  },
  {
    id: "liuren",
    name: "大六壬",
    description: "传统占筮文化学习与决策思维训练",
    category: "yixue",
    requiredLevel: PermissionLevel.PREMIUM,
    isEnabled: true,
    disclaimer: "本功能仅供传统文化学习交流，不具有预测未来的功能。",
  },
  {
    id: "qimen",
    name: "奇门遁甲",
    description: "传统术数文化学习与空间能量分析",
    category: "yixue",
    requiredLevel: PermissionLevel.PREMIUM,
    isEnabled: true,
    disclaimer: "本功能仅供传统文化学习交流，分析结果仅作为空间布局参考。",
  },
  {
    id: "liuyao",
    name: "六爻纳甲",
    description: "传统易经文化学习与心理投射分析",
    category: "yixue",
    requiredLevel: PermissionLevel.BASIC,
    isEnabled: true,
    disclaimer: "本功能仅供传统文化学习交流，起卦结果为心理投射参考。",
  },
  {
    id: "meihua",
    name: "梅花易数",
    description: "传统易学文化学习与直觉思维训练",
    category: "yixue",
    requiredLevel: PermissionLevel.BASIC,
    isEnabled: true,
    disclaimer: "本功能仅供传统文化学习交流，分析结果为思维训练参考。",
  },
  {
    id: "shouxiang",
    name: "手相分析",
    description: "现代心理学与气场能量学视角的手部特征分析",
    category: "yixue",
    requiredLevel: PermissionLevel.PREMIUM,
    isEnabled: true,
    disclaimer: "本功能基于现代心理学和人体工程学原理，分析手部特征与性格倾向的关联性，仅供娱乐参考。",
    privacyNotice: "您的手相图片将在分析完成后立即从服务器删除，我们不会保存任何生物特征数据。数据即用即毁，保护您的隐私安全。",
  },
  {
    id: "mianxiang",
    name: "面相分析",
    description: "现代心理学与微表情学视角的面部特征分析",
    category: "yixue",
    requiredLevel: PermissionLevel.PREMIUM,
    isEnabled: true,
    disclaimer: "本功能基于现代心理学、微表情学和面部识别原理，分析面部特征与性格倾向的关联性，仅供娱乐参考。",
    privacyNotice: "您的面部图片将在分析完成后立即从服务器删除，我们不会保存任何生物特征数据。数据即用即毁，保护您的隐私安全。",
  },
  {
    id: "fengshui",
    name: "风水堪舆",
    description: "传统建筑美学与现代环境心理学分析",
    category: "yixue",
    requiredLevel: PermissionLevel.PREMIUM,
    isEnabled: true,
    disclaimer: "本功能结合传统建筑美学和现代环境心理学原理，提供空间布局参考建议。",
  },
  
  // 中医健康模块
  {
    id: "ai_shezhen",
    name: "AI舌诊",
    description: "基于中医理论的舌象分析辅助工具",
    category: "tcm",
    requiredLevel: PermissionLevel.BASIC,
    isEnabled: true,
    disclaimer: "本功能仅供中医学习参考，不能替代专业医师诊断，如有健康问题请及时就医。",
    privacyNotice: "您的舌象图片将在分析完成后立即删除，我们不会保存任何健康相关数据。",
  },
  {
    id: "ai_maizhen",
    name: "AI把脉",
    description: "基于中医理论的脉象分析学习工具",
    category: "tcm",
    requiredLevel: PermissionLevel.PREMIUM,
    isEnabled: true,
    disclaimer: "本功能仅供中医学习参考，不能替代专业医师诊断，如有健康问题请及时就医。",
  },
  {
    id: "ai_mianzhen",
    name: "AI面诊",
    description: "基于中医理论的面色分析辅助工具",
    category: "tcm",
    requiredLevel: PermissionLevel.PREMIUM,
    isEnabled: true,
    disclaimer: "本功能仅供中医学习参考，不能替代专业医师诊断，如有健康问题请及时就医。",
    privacyNotice: "您的面部图片将在分析完成后立即删除，我们不会保存任何健康相关数据。",
  },
  {
    id: "tizhi_jiance",
    name: "体质检测",
    description: "基于中医九种体质理论的自测工具",
    category: "tcm",
    requiredLevel: PermissionLevel.FREE,
    isEnabled: true,
    disclaimer: "本功能仅供健康参考，不能替代专业医师诊断。",
  },
  {
    id: "jingfang",
    name: "经方查询",
    description: "古代经典方剂学习查询工具",
    category: "tcm",
    requiredLevel: PermissionLevel.FREE,
    isEnabled: true,
    disclaimer: "方剂信息仅供学习参考，用药请遵医嘱。",
  },
  {
    id: "bencao",
    name: "本草查询",
    description: "中药材学习查询工具",
    category: "tcm",
    requiredLevel: PermissionLevel.FREE,
    isEnabled: true,
    disclaimer: "药材信息仅供学习参考，用药请遵医嘱。",
  },
  
  // AI分析模块
  {
    id: "ai_analysis",
    name: "AI综合分析",
    description: "结合传统文化与现代心理学的AI分析工具",
    category: "ai",
    requiredLevel: PermissionLevel.PREMIUM,
    isEnabled: true,
    disclaimer: "AI分析结果仅供参考，不能替代专业咨询服务。",
  },
  
  // 古籍模块
  {
    id: "guji_yixue",
    name: "易学古籍",
    description: "传统易学经典文献在线阅读",
    category: "classics",
    requiredLevel: PermissionLevel.FREE,
    isEnabled: true,
  },
  {
    id: "guji_tcm",
    name: "中医古籍",
    description: "传统中医经典文献在线阅读",
    category: "classics",
    requiredLevel: PermissionLevel.FREE,
    isEnabled: true,
  },
]

// 用户权限状态接口
export interface UserPermission {
  level: PermissionLevel
  tempAccess: {
    featureId: string
    expiresAt: number // 时间戳
  }[]
}

// 检查用户是否有权限访问功能
export function checkPermission(
  userPermission: UserPermission,
  featureId: string
): { hasAccess: boolean; reason?: string } {
  const feature = FEATURE_CONFIGS.find(f => f.id === featureId)
  
  if (!feature) {
    return { hasAccess: false, reason: "功能不存在" }
  }
  
  if (!feature.isEnabled) {
    return { hasAccess: false, reason: "该功能暂未开放" }
  }
  
  // 检查临时权限
  const tempAccess = userPermission.tempAccess.find(t => t.featureId === featureId)
  if (tempAccess && tempAccess.expiresAt > Date.now()) {
    return { hasAccess: true }
  }
  
  // 检查永久权限等级
  if (userPermission.level >= feature.requiredLevel) {
    return { hasAccess: true }
  }
  
  return { 
    hasAccess: false, 
    reason: `需要${PERMISSION_LEVEL_NAMES[feature.requiredLevel]}或以上等级` 
  }
}

// 获取功能的免责声明
export function getFeatureDisclaimer(featureId: string): string | undefined {
  const feature = FEATURE_CONFIGS.find(f => f.id === featureId)
  return feature?.disclaimer
}

// 获取功能的隐私提示
export function getFeaturePrivacyNotice(featureId: string): string | undefined {
  const feature = FEATURE_CONFIGS.find(f => f.id === featureId)
  return feature?.privacyNotice
}

// 全局免责声明
export const GLOBAL_DISCLAIMER = `
【重要声明】

本应用所有易学相关功能均基于中华传统文化进行学习交流，结合现代心理学、人格分析学、环境心理学等科学视角进行解读。

1. 所有分析结果仅供文化学习和娱乐参考，不具有预测未来、改变命运的功能。
2. 请勿将分析结果作为人生重大决策的依据。
3. 涉及健康问题请及时就医，本应用不提供医疗诊断服务。
4. 涉及法律问题请咨询专业律师，本应用不提供法律建议。
5. 涉及心理问题请咨询专业心理咨询师。

传承文化，理性看待，科学生活。
`

// 隐私政策要点
export const PRIVACY_POLICY_SUMMARY = `
【隐私保护承诺】

1. 手相、面相等生物特征图片在分析完成后立即从服务器删除，不做任何保存。
2. 您的个人信息仅用于提供服务，不会出售或分享给第三方。
3. 所有数据传输均采用加密技术保护。
4. 您可以随时要求删除您的账户和相关数据。
`
