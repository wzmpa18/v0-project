export interface SourceRef {
  sourceType: 'classic' | 'rule-engine' | 'api' | 'manual'
  sourceName: string
  sourceVersion: string
  citation?: {
    book?: string
    chapter?: string
    section?: string
    clause?: string
    uri?: string
  }
  updatedAt: string
}

export interface CommercialEnvelope<T> {
  data: T
  sourceRef: SourceRef
}

export interface BaziPillar {
  gan: string
  zhi: string
  tenGod?: string
  hiddenStems: string[]
  naYin: string
  sourceRef: SourceRef
}

export interface BaziShenShaItem {
  name: string
  level?: 'core' | 'extended'
  ruleId: string
  sourceRef: SourceRef
}

export interface DaYunItem {
  index: number
  startAge: number
  startYear: number
  gan: string
  zhi: string
  tenGod?: string
  sourceRef: SourceRef
}

export interface LiuNianItem {
  year: number
  gan: string
  zhi: string
  tenGod?: string
  linkedDaYunIndex?: number
  sourceRef: SourceRef
}

export interface BaziChartContract {
  chartId: string
  gender: 'male' | 'female'
  pillars: {
    year: BaziPillar
    month: BaziPillar
    day: BaziPillar
    hour: BaziPillar
  }
  kongWang: string[]
  shenSha: {
    year: BaziShenShaItem[]
    month: BaziShenShaItem[]
    day: BaziShenShaItem[]
    hour: BaziShenShaItem[]
  }
  daYun: DaYunItem[]
  liuNian: LiuNianItem[]
  meta: {
    ruleSetVersion: string
    generatedAt: string
  }
}
