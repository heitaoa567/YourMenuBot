// ==========================================
//            chatgpt.ts
//      AI 智能助手 — OpenAI 官方接口
// ==========================================

const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY")!;

if (!OPENAI_KEY) {
  console.error("❌ ERROR: Missing OPENAI_API_KEY environment variable!");
}

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

/**
 * 清理文本（避免 Markdown 解析崩溃）
 */
function cleanText(text: string): string {
  return text
    .replace(/_/g, "\\_")
    .replace(/\*/g, "\\*")
    .replace(/`/g, "'")
    .trim();
}

/**
 * AI 回复主函数
 * main.ts 会调用：await aiReply(text)
 */
export async function aiReply(question: string): Promise<string> {
  try {
    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 500
    };

    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.choices || !data.choices[0]) {
      return "⚠️ AI 暂时没有回复，请稍后再试。";
    }

    let reply = data.choices[0].message.content || "（无回复）";
    reply = cleanText(reply);

    return reply;
  } catch (err) {
    console.error("AI Error:", err);
    return "⚠️ AI 出错了，请稍后再试。";
  }
}
