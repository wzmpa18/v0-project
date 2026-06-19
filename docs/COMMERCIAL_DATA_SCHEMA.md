# 商用数据契约（V1）

## 1. 总体原则
- 前端页面只消费结构化数据，不内嵌演示文案。
- 每一个可展示字段必须携带可追溯来源。
- 数据层必须可版本化、可灰度、可回滚。

## 2. 通用溯源字段

```ts
export interface SourceRef {
  sourceType: 'classic' | 'rule-engine' | 'api' | 'manual';
  sourceName: string;
  sourceVersion: string;
  citation?: {
    book?: string;
    chapter?: string;
    section?: string;
    clause?: string;
    uri?: string;
  };
  updatedAt: string;
}
```

## 3. 易学（八字）契约

```ts
export interface BaziPillar {
  gan: string;
  zhi: string;
  tenGod?: string;
  hiddenStems: string[];
  naYin: string;
  sourceRef: SourceRef;
}

export interface BaziShenShaItem {
  name: string;
  level?: 'core' | 'extended';
  ruleId: string;
  sourceRef: SourceRef;
}

export interface DaYunItem {
  index: number;
  startAge: number;
  startYear: number;
  gan: string;
  zhi: string;
  tenGod?: string;
  sourceRef: SourceRef;
}

export interface LiuNianItem {
  year: number;
  gan: string;
  zhi: string;
  tenGod?: string;
  linkedDaYunIndex?: number;
  sourceRef: SourceRef;
}

export interface LiuYueItem {
  year: number;
  month: number;
  jieQi: string;
  gan: string;
  zhi: string;
  sourceRef: SourceRef;
}

export interface BaziChart {
  chartId: string;
  gender: 'male' | 'female';
  calendar: {
    solarDateTime: string;
    lunarDateTime: string;
    timezone: string;
    trueSolarTime?: string;
    calendarEngineVersion: string;
  };
  pillars: {
    year: BaziPillar;
    month: BaziPillar;
    day: BaziPillar;
    hour: BaziPillar;
  };
  kongWang: string[];
  shenSha: {
    year: BaziShenShaItem[];
    month: BaziShenShaItem[];
    day: BaziShenShaItem[];
    hour: BaziShenShaItem[];
  };
  daYun: DaYunItem[];
  liuNian: LiuNianItem[];
  liuYue: LiuYueItem[];
  meta: {
    ruleSetVersion: string;
    generatedAt: string;
    generatedBy: string;
  };
}
```

## 4. 中医契约（经典原文对照）

```ts
export interface ClassicalTextItem {
  textId: string;
  book: string;
  chapter: string;
  section?: string;
  clause: string;
  original: string;
  modernChinese?: string;
  notes?: string;
  keywords: string[];
  sourceRef: SourceRef;
}

export interface TcmEntity {
  entityId: string;
  type: 'herb' | 'formula' | 'acupoint' | 'syndrome';
  name: string;
  aliases?: string[];
  properties: Record<string, string | string[] | number>;
  evidence: ClassicalTextItem[];
  sourceRef: SourceRef;
}

export interface TcmKnowledgeBundle {
  bundleId: string;
  version: string;
  entities: TcmEntity[];
  updatedAt: string;
}
```

## 5. 前端最小接入要求
- 页面渲染仅从 BaziChart / TcmKnowledgeBundle 读取。
- 禁止组件内定义业务演示数据。
- UI 层统一使用 `sourceRef` 输出“数据来源说明”。

## 6. API 最小接口建议
- GET /api/v1/bazi/chart
- GET /api/v1/bazi/liu-nian
- GET /api/v1/tcm/classics/search
- GET /api/v1/tcm/entity/{id}

参数与返回体请严格遵循本文件 schema。
