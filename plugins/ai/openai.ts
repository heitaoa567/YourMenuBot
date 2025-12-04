// ======================================================================
//                      plugins/ai/openai.ts
//      AI 调用：GPT-4o（VIP） / GPT-4o-mini（免费） + Vision
// ======================================================================

const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY") || "";

if (!OPENAI_KEY) {
  console.error("❌ OPENAI_API_KEY 未设置");
}

export async function aiAnswer(prompt: string, user: any) {
  try {

    // ===============================
    //  VIP 用户 → 高级模型 GPT-4o
    //  免费用户 → gpt-4o-mini
    // ===============================
    const isVip = user.vip_until && user.vip_until > Date.now();
    const model = isVip ? "gpt-4o" : "gpt-4o-mini";

    const body = {
      model,
      messages: [
        { role: "system", content: "你是一个专业的AI助手，回答简洁、准确、有帮助。" },
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
      const text = await res.text();
      console.error("❌ OpenAI 请求失败：", res.status, text);
      return "⚠️ AI 服务暂时不可用，请稍后再试。";
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "（无内容返回）";

  } catch (err) {
    console.error("❌ AI 调用异常：", err);
    return "⚠️ 服务器开小差了，请稍后再试。";
  }
}
