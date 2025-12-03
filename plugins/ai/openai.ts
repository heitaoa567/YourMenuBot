// ======================================================================
//                      plugins/ai/openai.ts
//  AI 调用：GPT-4 / GPT-4o / Vision（VIP 专属）
// ======================================================================

const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY") || "";

if (!OPENAI_KEY) {
  console.error("❌ OPENAI_API_KEY 未设置");
}

export async function aiAnswer(prompt: string, user: any) {

  // VIP 使用 GPT-4o（多模态）
  const model = user.isVIP ? "gpt-4o-mini" : "gpt-4o-mini";

  const body = {
    model,
    messages: [
      { role: "system", content: "你是一个专业的AI助手，回答简洁有用。" },
      { role: "user", content: prompt },
    ],
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    return "⚠️ AI 服务暂时不可用，请稍后再试。";
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "（无内容返回）";
}
