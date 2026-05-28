// 完整穴位数据库索引
// 包含十二正经、奇经八脉、董氏奇穴

export * from './types'
export * from './meridian-colors'

// 十二正经
import { lungMeridian } from './lung-meridian'
import { largeIntestineMeridian } from './large-intestine'
import { stomachMeridian } from './stomach-meridian'
import { spleenMeridian } from './spleen-meridian'
import { heartMeridian } from './heart-meridian'
import { smallIntestineMeridian } from './small-intestine'
import { bladderMeridian } from './bladder-meridian'
import { kidneyMeridian } from './kidney-meridian'
import { pericardiumMeridian } from './pericardium-meridian'
import { tripleEnergizerMeridian } from './triple-energizer'
import { gallbladderMeridian } from './gallbladder-meridian'
import { liverMeridian } from './liver-meridian'

// 奇经八脉
import { governorVessel } from './governor-vessel'
import { conceptionVessel } from './conception-vessel'

// 董氏奇穴
import { dongshiAcupoints } from './dongshi-acupoints'

import { Acupoint } from './types'

// 导出各经络
export { lungMeridian } from './lung-meridian'
export { largeIntestineMeridian } from './large-intestine'
export { stomachMeridian } from './stomach-meridian'
export { spleenMeridian } from './spleen-meridian'
export { heartMeridian } from './heart-meridian'
export { smallIntestineMeridian } from './small-intestine'
export { bladderMeridian } from './bladder-meridian'
export { kidneyMeridian } from './kidney-meridian'
export { pericardiumMeridian } from './pericardium-meridian'
export { tripleEnergizerMeridian } from './triple-energizer'
export { gallbladderMeridian } from './gallbladder-meridian'
export { liverMeridian } from './liver-meridian'
export { governorVessel } from './governor-vessel'
export { conceptionVessel } from './conception-vessel'
export { dongshiAcupoints } from './dongshi-acupoints'

// 十二正经穴位合集
export const TWELVE_MERIDIANS: Acupoint[] = [
  ...lungMeridian,           // 11穴
  ...largeIntestineMeridian, // 20穴
  ...stomachMeridian,        // 45穴
  ...spleenMeridian,         // 21穴
  ...heartMeridian,          // 9穴
  ...smallIntestineMeridian, // 19穴
  ...bladderMeridian,        // 67穴
  ...kidneyMeridian,         // 27穴
  ...pericardiumMeridian,    // 9穴
  ...tripleEnergizerMeridian,// 23穴
  ...gallbladderMeridian,    // 44穴
  ...liverMeridian,          // 14穴
]

// 奇经八脉穴位合集
export const EIGHT_EXTRA_MERIDIANS: Acupoint[] = [
  ...governorVessel,    // 28穴
  ...conceptionVessel,  // 24穴
]

// 董氏奇穴
export const DONG_ACUPOINTS: Acupoint[] = dongshiAcupoints

// 所有穴位合集
export const ALL_ACUPOINTS: Acupoint[] = [
  ...TWELVE_MERIDIANS,
  ...EIGHT_EXTRA_MERIDIANS,
  ...DONG_ACUPOINTS,
]

// 按经络分组
export const ACUPOINTS_BY_MERIDIAN: Record<string, Acupoint[]> = {
  "手太阴肺经": lungMeridian,
  "手阳明大肠经": largeIntestineMeridian,
  "足阳明胃经": stomachMeridian,
  "足太阴脾经": spleenMeridian,
  "手少阴心经": heartMeridian,
  "手太阳小肠经": smallIntestineMeridian,
  "足太阳膀胱经": bladderMeridian,
  "足少阴肾经": kidneyMeridian,
  "手厥阴心包经": pericardiumMeridian,
  "手少阳三焦经": tripleEnergizerMeridian,
  "足少阳胆经": gallbladderMeridian,
  "足厥阴肝经": liverMeridian,
  "督脉": governorVessel,
  "任脉": conceptionVessel,
  "董氏奇穴": dongshiAcupoints,
}

// 经络巡行路线（用于动画）
export const MERIDIAN_PATHS: Record<string, { points: Acupoint[]; direction: 'up' | 'down'; description: string }> = {
  "手太阴肺经": { points: lungMeridian, direction: 'down', description: "起于中焦，下络大肠，还循胃口，上膈属肺，从肺系横出腋下，下循臑内，行少阴心主之前，下肘中，循臂内上骨下廉，入寸口，上鱼，循鱼际，出大指之端" },
  "手阳明大肠经": { points: largeIntestineMeridian, direction: 'up', description: "起于大指次指之端，循指上廉，出合谷两骨之间，上入两筋之中，循臂上廉，入肘外廉，上臑外前廉，上肩，出髃骨之前廉，上出于柱骨之会上，下入缺盆，络肺，下膈，属大肠" },
  "足阳明胃经": { points: stomachMeridian, direction: 'down', description: "起于鼻之交頞中，旁纳太阳之脉，下循鼻外，入上齿中，还出挟口，环唇，下交承浆，却循颐后下廉，出大迎，循颊车，上耳前，过客主人，循发际，至额颅" },
  "足太阴脾经": { points: spleenMeridian, direction: 'up', description: "起于大趾之端，循趾内侧白肉际，过核骨后，上内踝前廉，上踹内，循胫骨后，交出厥阴之前，上膝股内前廉，入腹，属脾，络胃" },
  "手少阴心经": { points: heartMeridian, direction: 'down', description: "起于心中，出属心系，下膈，络小肠；其支者，从心系上挟咽，系目系；其直者，复从心系却上肺，下出腋下，下循臑内后廉，行太阴心主之后，下肘内，循臂内后廉，抵掌后锐骨之端，入掌内后廉，循小指之内，出其端" },
  "手太阳小肠经": { points: smallIntestineMeridian, direction: 'up', description: "起于小指之端，循手外侧上腕，出踝中，直上循臂骨下廉，出肘内侧两骨之间，上循臑外后廉，出肩解，绑肩胛，交肩上，入缺盆，络心，循咽下膈，抵胃，属小肠" },
  "足太阳膀胱经": { points: bladderMeridian, direction: 'down', description: "起于目内眦，上额，交巅；其支者，从巅至耳上角；其直者，从巅入络脑，还出别下项，循肩膊内，挟脊抵腰中，入循膂，络肾，属膀胱" },
  "足少阴肾经": { points: kidneyMeridian, direction: 'up', description: "起于小趾之下，斜走足心，出于然谷之下，循内踝之后，别入跟中，以上踹内，出腘内廉，上股内后廉，贯脊属肾，络膀胱" },
  "手厥阴心包经": { points: pericardiumMeridian, direction: 'down', description: "起于胸中，出属心包络，下膈，历络三焦；其支者，循胸出胁，下腋三寸，上抵腋下，循臑内，行太阴少阴之间，入肘中，下臂，行两筋之间，入掌中，循中指，出其端" },
  "手少阳三焦经": { points: tripleEnergizerMeridian, direction: 'up', description: "起于小指次指之端，上出两指之间，循手表腕，出臂外两骨之间，上贯肘，循臑外上肩，而交出足少阳之后，入缺盆，布膻中，散络心包，下膈，遍属三焦" },
  "足少阳胆经": { points: gallbladderMeridian, direction: 'down', description: "起于目锐眦，上抵头角，下耳后，循颈，行手少阳之前，至肩上，却交出手少阳之后，入缺盆；其支者，从耳后入耳中，出走耳前，至目锐眦后" },
  "足厥阴肝经": { points: liverMeridian, direction: 'up', description: "起于大趾丛毛之际，上循足跗上廉，去内踝一寸，上踝八寸，交出太阴之后，上腘内廉，循股阴，入毛中，环阴器，抵小腹，挟胃，属肝，络胆" },
  "督脉": { points: governorVessel, direction: 'up', description: "起于小腹内，下出于会阴，向后行于脊柱内部，上达项后风府，进入脑内，上行巅顶，沿前额下行鼻柱" },
  "任脉": { points: conceptionVessel, direction: 'up', description: "起于小腹内，下出于会阴，向前上行于阴毛部，沿着腹部正中线上行，经过关元等穴，上达咽喉，环绕口唇，上行面部，进入目眶下" },
}

// 经络信息（含时辰）
export const MERIDIAN_INFO: Record<string, { 
  name: string
  code: string
  count: number
  flow: string
  time?: string
  element?: string
  color: string
}> = {
  "手太阴肺经": { name: "手太阴肺经", code: "LU", count: 11, flow: "胸→手", time: "寅时 03:00-05:00", element: "金", color: "#FFFFFF" },
  "手阳明大肠经": { name: "手阳明大肠经", code: "LI", count: 20, flow: "手→头", time: "卯时 05:00-07:00", element: "金", color: "#FFFFFF" },
  "足阳明胃经": { name: "足阳明胃经", code: "ST", count: 45, flow: "头→足", time: "辰时 07:00-09:00", element: "土", color: "#FFEB3B" },
  "足太阴脾经": { name: "足太阴脾经", code: "SP", count: 21, flow: "足→胸", time: "巳时 09:00-11:00", element: "土", color: "#FFEB3B" },
  "手少阴心经": { name: "手少阴心经", code: "HT", count: 9, flow: "胸→手", time: "午时 11:00-13:00", element: "火", color: "#F44336" },
  "手太阳小肠经": { name: "手太阳小肠经", code: "SI", count: 19, flow: "手→头", time: "未时 13:00-15:00", element: "火", color: "#F44336" },
  "足太阳膀胱经": { name: "足太阳膀胱经", code: "BL", count: 67, flow: "头→足", time: "申时 15:00-17:00", element: "水", color: "#2196F3" },
  "足少阴肾经": { name: "足少阴肾经", code: "KI", count: 27, flow: "足→胸", time: "酉时 17:00-19:00", element: "水", color: "#2196F3" },
  "手厥阴心包经": { name: "手厥阴心包经", code: "PC", count: 9, flow: "胸→手", time: "戌时 19:00-21:00", element: "火", color: "#E91E63" },
  "手少阳三焦经": { name: "手少阳三焦经", code: "TE", count: 23, flow: "手→头", time: "亥时 21:00-23:00", element: "火", color: "#FF9800" },
  "足少阳胆经": { name: "足少阳胆经", code: "GB", count: 44, flow: "头→足", time: "子时 23:00-01:00", element: "木", color: "#4CAF50" },
  "足厥阴肝经": { name: "足厥阴肝经", code: "LR", count: 14, flow: "足→胸", time: "丑时 01:00-03:00", element: "木", color: "#8BC34A" },
  "督脉": { name: "督脉", code: "GV", count: 28, flow: "尾→头", element: "阳", color: "#9C27B0" },
  "任脉": { name: "任脉", code: "CV", count: 24, flow: "会阴→颏", element: "阴", color: "#00BCD4" },
  "董氏奇穴": { name: "董氏奇穴", code: "DS", count: 72, flow: "特殊", color: "#FFD700" },
}

// 统计信息
export const ACUPOINT_STATS = {
  twelveRegularMeridians: TWELVE_MERIDIANS.length,
  eightExtraMeridians: EIGHT_EXTRA_MERIDIANS.length,
  dongAcupoints: DONG_ACUPOINTS.length,
  total: ALL_ACUPOINTS.length,
}
