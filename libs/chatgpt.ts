// ===============================================
// ChatGPT 聊天模块（OpenAI 官方 API）
// - 普通用户每天限时 30 分钟
// - VIP 用户无限时
// ===============================================

import { OPENAI_API_KEY, AI_CONFIG } from "../config/config.ts";
import { getUser, saveUser } from "../db/kv.ts";
import { isVIP } from "./utils.ts";

// ------------------------------
// OpenAI 请求函数
// ------------------------------
async function askChatGPT(messages: any[]) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages,
    }),
  });

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "AI 无法回复，请稍后再试。";
}

// ------------------------------
// ChatGPT 聊天入口
// ------------------------------
export async function chatWithAI(userId: number, message: string): Promise<string> {
  const user = await getUser(userId);

  // VIP 用户无限制
  if (!isVIP(user.vipUntil)) {
    // 普通用户限时
    const now = Date.now();
    const today = new Date().toDateString();

    if (user.lastChatReset !== today) {
      // 新的一天 → 重置时间
      user.chatUsedToday = 0;
      user.lastChatReset = today;
    }

    if (user.chatUsedToday >= AI_CONFIG.timeoutFreeUser) {
      await saveUser(user);
      return "⏳ 今日 ChatGPT 免费额度（30 分钟）已用完，请明天再试或开通 VIP 获取无限使用！";
    }
  }

  // 保存开始时间
  const start = Date.now();

  // 调用 OpenAI
  const reply = await askChatGPT([
    { role: "user", content: message }
  ]);

  // 计算本次使用时长
  const used = Math.floor((Date.now() - start) / 1000);

  // 更新用户使用时间
  if (!isVIP(user.vipUntil)) {
    user.chatUsedToday += used;
  }

  await saveUser(user);

  return reply;
}

