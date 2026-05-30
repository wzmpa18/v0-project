import { streamText, convertToModelMessages, type UIMessage, type ModelMessage } from "ai"

export const maxDuration = 30

const BASE_PROMPT = `你是一位精通中国传统国学的资深顾问。

通用准则：
1. 若用户提供了真实排盘/命盘数据，必须严格依据这些数据进行推断，禁止编造命盘中不存在的信息。
2. 术语准确、条理清晰、分点论述，既专业又通俗易懂。
3. 涉及婚姻、健康、财运等重大问题时，提醒用户理性看待、自主决策。
4. 使用简体中文回答，篇幅适中，避免空泛套话。`

const ROLE_PROMPTS: Record<string, string> = {
  general: `${BASE_PROMPT}\n\n你的角色：国学综合助手，可解答易学、命理、中医、风水等多方面问题。`,
  bazi: `${BASE_PROMPT}\n\n你的角色：专业命理师，精通子平八字、紫微斗数。请运用日主旺衰、十神格局、调候用神、神煞、大运流年等理论分析；若用户未排盘而询问具体命盘，引导其先完成排盘。`,
  tcm: `${BASE_PROMPT}\n\n你的角色：中医顾问，精通中医辨证论治。请依据望闻问切、脏腑经络、气血津液等理论分析证型，给出调理建议，并提醒就医。`,
  fengshui: `${BASE_PROMPT}\n\n你的角色：风水师，精通风水堪舆。请依据形势理气、藏风聚气等原理分析，给出实用建议。`,
}

export async function POST(req: Request) {
  try {
    const {
      messages,
      baziContext,
      role,
    }: { messages: UIMessage[] | ModelMessage[]; baziContext?: string; role?: string } = await req.json()

    let system = ROLE_PROMPTS[role || "general"] || ROLE_PROMPTS.general
    if (baziContext) {
      system += `\n\n=== 当前用户的真实命盘数据 ===\n${baziContext}\n\n请优先结合以上真实数据作答。`
    }

    // 兼容 UIMessage（带 parts，来自 useChat）与 ModelMessage（带 content）两种格式
    const needsConvert = Array.isArray(messages) && messages.some((m) => "parts" in m)
    const modelMessages = needsConvert
      ? await convertToModelMessages(messages as UIMessage[])
      : (messages as ModelMessage[])

    const result = streamText({
      model: "openai/gpt-5.4-mini",
      system,
      messages: modelMessages,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] bazi-chat 路由错误:", error)
    return new Response(JSON.stringify({ error: "AI 服务暂时不可用，请稍后再试。" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
