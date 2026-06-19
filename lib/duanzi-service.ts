import { buildApiUrl, getRuntimeConfig } from '@/lib/app-config'
import { fetchJsonWithResilience } from '@/lib/resilient-fetch'

export type DuanziDirection = 'beginner' | 'classics' | 'clinical' | 'yangsheng' | 'yixue'

export interface DuanziItem {
  id: string
  direction: DuanziDirection
  title: string
  content: string
  tags: string[]
  source?: string
  createdAt?: string
}

export interface DuanziBatchResult {
  items: DuanziItem[]
  nextCursor: string | null
  hasMore: boolean
}

interface RawBatchResponse {
  data?: {
    items?: unknown[]
    nextCursor?: string | null
    hasMore?: boolean
  }
  items?: unknown[]
  nextCursor?: string | null
  hasMore?: boolean
}

const DIRECTION_FALLBACKS: Record<DuanziDirection, Array<Pick<DuanziItem, 'title' | 'content' | 'tags'>>> = {
  beginner: [
    {
      title: '阴阳开场白',
      content: '同样一杯茶，白天提神叫阳，晚上醒脑叫阴。阴阳不是对立，而是场景切换。',
      tags: ['阴阳', '入门'],
    },
    {
      title: '五行记忆法',
      content: '木火土金水像班级分工：木策划、火宣发、土协调、金执行、水复盘。',
      tags: ['五行', '记忆'],
    },
  ],
  classics: [
    {
      title: '伤寒条文速记',
      content: '桂枝像和事佬，麻黄像行动派，小柴胡像协调员，配伍就是开会分工。',
      tags: ['经方', '条文'],
    },
    {
      title: '内经场景化',
      content: '春夏养阳像加油门，秋冬养阴像踩刹车，关键是跟着时令调节节奏。',
      tags: ['黄帝内经', '四时'],
    },
  ],
  clinical: [
    {
      title: '问诊四步',
      content: '先问主诉，再问寒热，接着看舌脉，最后落到可执行方案。',
      tags: ['临证', '问诊'],
    },
    {
      title: '辨证像侦探',
      content: '症状是线索，体质是背景，病机是动机，方药是行动方案。',
      tags: ['辨证', '方药'],
    },
  ],
  yangsheng: [
    {
      title: '作息养生',
      content: '晚上少刷 20 分钟视频，第二天脾胃少受 20 分钟情绪税。',
      tags: ['作息', '养生'],
    },
    {
      title: '饮食节律',
      content: '七分饱是给脾胃留工作余量，不是亏待自己，而是给修复留窗口。',
      tags: ['饮食', '脾胃'],
    },
  ],
  yixue: [
    {
      title: '命理视角',
      content: '命盘像地图，运势像天气，地图不改路况会变，策略比焦虑更重要。',
      tags: ['命理', '策略'],
    },
    {
      title: '奇门思路',
      content: '先看局势再选动作，和做项目一样，方向比速度更关键。',
      tags: ['奇门', '决策'],
    },
  ],
}

function toDirection(value: unknown): DuanziDirection {
  if (value === 'beginner' || value === 'classics' || value === 'clinical' || value === 'yangsheng' || value === 'yixue') {
    return value
  }
  return 'beginner'
}

function makeStableId(direction: DuanziDirection, text: string): string {
  let hash = 0
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i)
    hash |= 0
  }

  return `${direction}-${Math.abs(hash)}`
}

function normalizeOne(raw: unknown, direction: DuanziDirection): DuanziItem | null {
  if (!raw || typeof raw !== 'object') {
    return null
  }

  const obj = raw as Record<string, unknown>
  const content = String(obj.content || obj.text || '').trim()
  if (!content) {
    return null
  }

  const title = String(obj.title || obj.scene || '场景段子').trim()
  const tags = Array.isArray(obj.tags) ? obj.tags.map((v) => String(v)).filter(Boolean) : []
  const itemDirection = toDirection(obj.direction)

  return {
    id: String(obj.id || makeStableId(itemDirection || direction, `${title}-${content}`)),
    direction: itemDirection || direction,
    title,
    content,
    tags,
    source: obj.source ? String(obj.source) : undefined,
    createdAt: obj.createdAt ? String(obj.createdAt) : undefined,
  }
}

function normalizeResponse(raw: RawBatchResponse, direction: DuanziDirection): DuanziBatchResult {
  const itemsSource = raw.data?.items || raw.items || []
  const items = (Array.isArray(itemsSource) ? itemsSource : [])
    .map((item) => normalizeOne(item, direction))
    .filter((item): item is DuanziItem => Boolean(item))

  const nextCursor = raw.data?.nextCursor ?? raw.nextCursor ?? null
  const hasMore = raw.data?.hasMore ?? raw.hasMore ?? Boolean(nextCursor)

  return {
    items,
    nextCursor,
    hasMore,
  }
}

function buildFallback(direction: DuanziDirection, cursor: string | null): DuanziBatchResult {
  const fallback = DIRECTION_FALLBACKS[direction]
  const start = cursor ? Number.parseInt(cursor, 10) : 0
  const safeStart = Number.isNaN(start) ? 0 : start
  const slice = fallback.slice(safeStart, safeStart + 2)

  return {
    items: slice.map((item, index) => ({
      id: makeStableId(direction, `${item.title}-${safeStart + index}`),
      direction,
      title: item.title,
      content: item.content,
      tags: item.tags,
      source: 'fallback-local',
      createdAt: new Date().toISOString(),
    })),
    nextCursor: safeStart + slice.length < fallback.length ? String(safeStart + slice.length) : null,
    hasMore: safeStart + slice.length < fallback.length,
  }
}

export async function fetchDuanziBatch(direction: DuanziDirection, cursor: string | null, limit = 8): Promise<DuanziBatchResult> {
  const config = getRuntimeConfig()
  const url = buildApiUrl(config.duanziBatchApiPath)

  try {
    const response = await fetchJsonWithResilience<RawBatchResponse>(url, {
      method: 'POST',
      body: {
        direction,
        cursor,
        limit,
      },
      policy: {
        timeoutMs: config.apiTimeoutMs,
        retryTimes: config.apiRetryTimes,
        rateLimitPerMinute: config.apiRateLimitPerMinute,
        authToken: config.apiAuthToken,
        scope: `duanzi:${direction}`,
      },
    })

    const normalized = normalizeResponse(response, direction)
    if (normalized.items.length > 0) {
      return normalized
    }

    return buildFallback(direction, cursor)
  } catch {
    return buildFallback(direction, cursor)
  }
}
