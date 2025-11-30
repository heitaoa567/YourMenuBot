// libs/chatgpt.ts
// ========================================================
// AI Assistant 模块（OpenAI 官方 API）
// 支持：每日使用时长限制、VIP无限制、多语言
// ========================================================

import { LANG } from "../languages.ts";
import { getUser, saveUser } from "../db/userdb.ts";

// 从环境变量读取 OpenAI Key
const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY") || "";

// 普通用户每日可使用 AI 的最大秒数（30分钟）
const FREE_AI_LIMIT = 30 * 60;

// OpenAI Chat API URL
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

/**
 * 检查用户是否可以继续使用 AI
 */
export async function checkAIAllow(chatId: number): Promise<string | null> {
  const user = await getUser(chatId);
  const L = LANG[user.lang || "en"];

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  // 第一次使用，初始化
  if (!user.ai_last_date) user.ai_last_date = today;
  if (!user.ai_usage_today) user.ai_usage_today = 0;

  // 日期变更 = 自动重置（cron.ts 里也会重置）
  if (user.ai_last_date !== today) {
    user.ai_usage_today = 0;
    user.ai_last_date = today;
    await saveUser(chatId, user);
  }

  // VIP 不限制
  const ts = Math.floor(Date.now() / 1000);
  if (user.vip_until && user.vip_until > ts) {
    return null; // VIP 可以无限使用
  }

  // 免费用户限制
  if (user.ai_usage_today >= FREE_AI_LIMIT) {
    return L.ai_limit;
  }

  return null; // 可以使用
}

/**
 * 调用 OpenAI 进行 AI 对话
 */
export async function askAI(chatId: number, prompt: string): Promise<string> {
  const user = await getUser(chatId);
  const L = LANG[user.lang || "en"];

  if (!OPENAI_KEY) {
    return "❌ OpenAI API Key 未配置（请在环境变量设置 OPENAI_API_KEY）";
  }

  // 检查使用限制
  const limitMsg = await checkAIAllow(chatId);
  if (limitMsg) return limitMsg;

  // 调用 OpenAI
  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: L.ai_system_prompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    return "❌ AI 服务请求失败，请稍后再试。";
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "（AI 未返回内容）";

  // 记录使用时长（估算 10 秒使用）
  user.ai_usage_today += 10;
  await saveUser(chatId, user);

  return reply;
}

/**
 * 分段发送长消息（避免 Telegram 限制）
 */
export function splitMessage(text: string, maxLength = 3900): string[] {
  const parts: string[] = [];

  while (text.length > maxLength) {
    parts.push(text.slice(0, maxLength));
    text = text.slice(maxLength);
  }
  parts.push(text);

  return parts;
}
