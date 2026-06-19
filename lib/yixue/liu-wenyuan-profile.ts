export interface LiuWenyuanProfile {
  theoryId: string
  displayName: string
  corePrinciples: string[]
  references: Array<{
    title: string
    isbn?: string
    note: string
  }>
}

export const LIU_WENYUAN_PROFILE: LiuWenyuanProfile = {
  theoryId: 'liuwenyuan-v1',
  displayName: '刘文元四柱命理体系',
  corePrinciples: [
    '用神不变论：在原命局中定用神后全局一致',
    '排盘优先使用真太阳时',
    '以气的流通路线判断五行旺衰与组合走向',
    '食生忘克：同盘出现生我与我生时优先论生',
    '天干与地支并重，干干作用、支支作用分别判断',
  ],
  references: [
    {
      title: '四柱命理正源',
      isbn: '9787504464200',
      note: '作为四柱判局与用神判定的理论依据',
    },
    {
      title: '奇门启悟',
      isbn: '9787511718235',
      note: '作为时家奇门遁甲起局方法参考',
    },
  ],
}
