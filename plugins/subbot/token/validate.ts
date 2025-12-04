// =======================================
// plugins/subbot/token/validate.ts
// 子机器人 Token 验证（严格按你之前的文件结构）
// =======================================

import fetch from "node-fetch";

export interface ValidateResult {
  ok: boolean;
  bot_id?: number;
  username?: string;
  name?: string;
}

/**
 * 校验 Telegram 子机器人 Token
 * @param token string
 * @returns ValidateResult
 */
export async function validateToken(token: string): Promise<ValidateResult> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);

    if (!res.ok) return { ok: false };

    const data = await res.json();
    if (!data.ok) return { ok: false };

    const bot = data.result;

    return {
      ok: true,
      bot_id: bot.id,
      username: bot.username,
      name: bot.first_name
    };

  } catch (err) {
    return { ok: false };
  }
}

