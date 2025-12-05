// ======================================================================
//                         plugins/subbot/callback.ts
//           子机器人绑定相关的回调与 Token 处理（最终稳定版）
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts";

const PREFIX = "sub_";

// ======================================================================
//                       回调按钮处理
// ======================================================================
export async function handle(ctx: any, data: string) {
  const uid = ctx.from.id;

  const user = await getUser(uid);
  const lang = user.lang || "en";

  // ========================
  // 绑定子机器人 Token
  // ========================
  if (data === PREFIX + "bind") {
    user.waiting_subbot_token = true;
    await saveUser(uid, user);

    return await sendText(
      ctx,
      T(lang, "subbot_bind_guide")
    );
  }

  // ========================
  // 取消绑定
  // ========================
  if (data === PREFIX + "cancel") {
    user.waiting_subbot_token = false;
    await saveUser(uid, user);

    return await sendText(ctx, T(lang, "subbot_cancel"));
  }

  return;
}


// ======================================================================
//                    保存 Token（由 router.ts 调用）
// ======================================================================
export async function saveToken(ctx: any, token: string) {
  const uid = ctx.from.id;
  const user = await getUser(uid);
  const lang = user.lang || "en";

  if (!user.waiting_subbot_token) return;

  const trimmed = token.trim();

  // Telegram Bot Token 格式校验
  const tokenRegex = /^\d+:[A-Za-z0-9_\-]{20,100}$/;
  if (!tokenRegex.test(trimmed)) {
    return await sendText(ctx, T(lang, "subbot_token_invalid"));
  }

  user.waiting_subbot_token = false;
  (user as any).subbot_token = trimmed;

  await saveUser(uid, user);

  return await sendText(ctx, T(lang, "subbot_token_saved"));
}
