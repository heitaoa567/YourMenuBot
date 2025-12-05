// =======================================
// plugins/subbot/token/validate.ts
// 子机器人 Token 验证（Deno 运行环境最终稳定版）
// =======================================

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
    const url = `https://api.telegram.org/bot${token}/getMe`;

    const res = await fetch(url);
    if (!res.ok) return { ok: false };

    const data = await res.json();
    if (!data.ok) return { ok: false };

    return {
      ok: true,
      bot_id: data.result.id,
      username: data.result.username,
      name: data.result.first_name,
    };

  } catch (_e) {
    return { ok: false };
  }
}
