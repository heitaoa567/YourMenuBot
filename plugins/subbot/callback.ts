// ======================================================================
//                         plugins/subbot/callback.ts
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../../plugins/lang/index.ts"; // 修正路径

// 所有 subbot 按钮前缀
const PREFIX = "sub_";

// Callback 统一入口（由 router.ts 调用）
export async function handle(ctx: any, data: string) {
  const uid = ctx.from.id;

  const user = await getUser(uid);
  const lang = user.lang || "en";

  // 绑定子机器人 token
  if (data === PREFIX + "bind") {
    user.waiting_subbot_token = true; // 修复字段逻辑
    await saveUser(user);             // 修复 saveUser 调用方式

    return await sendText(ctx, T(lang, "subbot_bind_guide"));
  }

  // 停止等待 token
  if (data === PREFIX + "cancel") {
    user.waiting_subbot_token = false;
    await saveUser(user);

    return await sendText(ctx, T(lang, "subbot_cancel"));
  }

  return;
}

// =========================================================
// 用户发送 token 文本
// =========================================================
export async function saveToken(ctx: any, token: string) {
  const uid = ctx.from.id;

  const user = await getUser(uid);
  const lang = user.lang || "en";

  // 用户是否正在绑定子机器人？
  if (!user.waiting_subbot_token) return;

  // 简易校验
  if (!token.startsWith("6") || !token.includes(":")) {
    return await sendText(ctx, T(lang, "subbot_token_invalid"));
  }

  user.waiting_subbot_token = false;
  user.subbot_token = token;
  await saveUser(user);

  return await sendText(ctx, T(lang, "subbot_token_saved"));
}
