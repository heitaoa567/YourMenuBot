// ==========================================
//        chatgpt.ts - 最新版 ChatGPT API
// ==========================================

const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY")!;
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export async function aiReply(question: string): Promise<string> {
  try {
    const body = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question }
      ],
      temperature: 0.7,
      max_tokens: 500
    };

    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (data?.choices?.length > 0) {
      return data.choices[0].message.content.trim();
    }

    return "⚠️ AI 无法生成回答，请稍后再试。";
  } catch (e) {
    console.error("GPT ERROR:", e);
    return "⚠️ AI 暂时无法连接，请稍后再试。";
  }
}
