// 完整穴位数据库索引
// 包含十二正经、奇经八脉、董氏奇穴

export * from './types'
export * from './meridian-colors'
export * from './lung-meridian'         // 手太阴肺经 11穴
export * from './large-intestine'       // 手阳明大肠经 20穴
export * from './stomach-meridian'      // 足阳明胃经 45穴
export * from './spleen-meridian'       // 足太阴脾经 21穴
export * from './heart-meridian'        // 手少阴心经 9穴
export * from './small-intestine'       // 手太阳小肠经 19穴
export * from './bladder-meridian'      // 足太阳膀胱经 67穴
export * from './kidney-meridian'       // 足少阴肾经 27穴
export * from './pericardium-meridian'  // 手厥阴心包经 9穴
export * from './sanjiao-meridian'      // 手少阳三焦经 23穴
export * from './gallbladder-meridian'  // 足少阳胆经 44穴
export * from './liver-meridian'        // 足厥阴肝经 14穴
export * from './du-meridian'           // 督脉 28穴
export * from './ren-meridian'          // 任脉 24穴
export * from './extra-meridians'       // 奇经八脉其他穴位
export * from './extra-points'          // 经外奇穴
export * from './dong-acupoints'        // 董氏奇穴

import { LUNG_MERIDIAN } from './lung-meridian'
import { LARGE_INTESTINE_MERIDIAN } from './large-intestine'
import { STOMACH_MERIDIAN } from './stomach-meridian'
import { SPLEEN_MERIDIAN } from './spleen-meridian'
import { HEART_MERIDIAN } from './heart-meridian'
import { SMALL_INTESTINE_MERIDIAN } from './small-intestine'
import { BLADDER_MERIDIAN } from './bladder-meridian'
import { KIDNEY_MERIDIAN } from './kidney-meridian'
import { PERICARDIUM_MERIDIAN } from './pericardium-meridian'
import { SANJIAO_MERIDIAN } from './sanjiao-meridian'
import { GALLBLADDER_MERIDIAN } from './gallbladder-meridian'
import { LIVER_MERIDIAN } from './liver-meridian'
import { DU_MERIDIAN } from './du-meridian'
import { REN_MERIDIAN } from './ren-meridian'
import { EXTRA_MERIDIAN_POINTS } from './extra-meridians'
import { EXTRA_POINTS } from './extra-points'
import { DONG_ACUPOINTS } from './dong-acupoints'

// 导出所有穴位合集
export const ALL_ACUPOINTS = [
  ...LUNG_MERIDIAN,
  ...LARGE_INTESTINE_MERIDIAN,
  ...STOMACH_MERIDIAN,
  ...SPLEEN_MERIDIAN,
  ...HEART_MERIDIAN,
  ...SMALL_INTESTINE_MERIDIAN,
  ...BLADDER_MERIDIAN,
  ...KIDNEY_MERIDIAN,
  ...PERICARDIUM_MERIDIAN,
  ...SANJIAO_MERIDIAN,
  ...GALLBLADDER_MERIDIAN,
  ...LIVER_MERIDIAN,
  ...DU_MERIDIAN,
  ...REN_MERIDIAN,
  ...EXTRA_MERIDIAN_POINTS,
  ...EXTRA_POINTS,
  ...DONG_ACUPOINTS,
]

// 十二正经穴位合集 (309穴)
export const TWELVE_MERIDIANS = [
  ...LUNG_MERIDIAN,
  ...LARGE_INTESTINE_MERIDIAN,
  ...STOMACH_MERIDIAN,
  ...SPLEEN_MERIDIAN,
  ...HEART_MERIDIAN,
  ...SMALL_INTESTINE_MERIDIAN,
  ...BLADDER_MERIDIAN,
  ...KIDNEY_MERIDIAN,
  ...PERICARDIUM_MERIDIAN,
  ...SANJIAO_MERIDIAN,
  ...GALLBLADDER_MERIDIAN,
  ...LIVER_MERIDIAN,
]

// 奇经八脉穴位合集
export const EIGHT_EXTRA_MERIDIANS = [
  ...DU_MERIDIAN,
  ...REN_MERIDIAN,
  ...EXTRA_MERIDIAN_POINTS,
]

// 统计信息
export const ACUPOINT_STATS = {
  twelveRegularMeridians: 309,
  eightExtraMeridians: 52,
  extraPoints: 48,
  dongAcupoints: 740,
  total: 1149,
}
