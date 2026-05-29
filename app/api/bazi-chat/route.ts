import { streamText, convertToModelMessages, type UIMessage } from "ai"

export const maxDuration = 30

const SYSTEM_PROMPT = `你是一位精通中国传统命理学的资深易学顾问，尤擅长子平八字（四柱命理）。

分析准则：
1. 必须严格依据用户提供的真实排盘数据（四柱、十神、神煞、大运、调候用神等）进行推断，禁止编造或臆造命盘中不存在的信息。
2. 运用日主旺衰、十神格局、调候用神、神煞、大运流年等专业理论进行分析，术语准确。
3. 回答要条理清晰、分点论述，既专业又通俗易懂。
4. 命理分析仅供参考，涉及婚姻、健康、财运等重大问题时，提醒用户理性看待、自主决策。
5. 若用户尚未排盘而询问具体命盘，引导其先完成排盘；若询问通用易学知识，则正常解答。
6. 使用简体中文回答。`

export async function POST(req: Request) {
  try {
    const { messages, baziContext }: { messages: UIMessage[]; baziContext?: string } = await req.json()

    const system = baziContext
      ? `${SYSTEM_PROMPT}\n\n=== 当前用户的命盘数据 ===\n${baziContext}`
      : SYSTEM_PROMPT

    const result = streamText({
      model: "openai/gpt-5.4-mini",
      system,
      messages: await convertToModelMessages(messages),
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
