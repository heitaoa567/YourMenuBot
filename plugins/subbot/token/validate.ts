// =======================================
// plugins/subbot/token/validate.ts
// 子机器人 Token 验证（Deno 版本，无 node-fetch）
// =======================================

export interface ValidateResult {
  ok: boolean;
  bot_id?: number;
  username?: string;
  name?: string;
}

/**
 * 校验 Telegram 子机器人 Token
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
      name: bot.first_name,
    };
  } catch (_) {
    return { ok: false };
  }
}
