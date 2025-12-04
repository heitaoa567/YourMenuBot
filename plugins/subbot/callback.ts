// ======================================================================
//                         plugins/subbot/callback.ts
//           子机器人绑定相关的回调与 Token 处理
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts"; // 从 subbot 目录到 lang 的正确相对路径

// 所有 subbot 回调按钮前缀
const PREFIX = "sub_";

// ======================================================================
//  Callback 统一入口（由 router.ts 调用）
//  建议在 router 里这样用：Subbot.handle(ctx, data)
// ======================================================================
export async function handle(ctx: any, data: string) {
  const uid = ctx.from.id;

  const user = await getUser(uid);
  const lang = user.lang || "en";

  // 开始绑定子机器人 Token
  if (data === PREFIX + "bind") {
    user.waiting_subbot_token = true;
    await saveUser(user);

    return await sendText(ctx, T(lang, "subbot_bind_guide"));
  }

  // 取消绑定
  if (data === PREFIX + "cancel") {
    user.waiting_subbot_token = false;
    await saveUser(user);

    return await sendText(ctx, T(lang, "subbot_cancel"));
  }

  // 其他 sub_ 前缀暂时不处理
  return;
}

// ======================================================================
//                  用户发送 Token 文本时调用
//  建议在 router 里这样用：Subbot.saveToken(ctx, text)
// ======================================================================
export async function saveToken(ctx: any, token: string) {
  const uid = ctx.from.id;

  const user = await getUser(uid);
  const lang = user.lang || "en";

  // 如果当前没有处于“等待 Token”状态，直接忽略
  if (!user.waiting_subbot_token) return;

  const trimmed = token.trim();

  // Telegram Bot Token 格式校验：1234567890:XXXX...
  const tokenRegex = /^\d+:[A-Za-z0-9_\-]{20,100}$/;
  if (!tokenRegex.test(trimmed)) {
    return await sendText(ctx, T(lang, "subbot_token_invalid"));
  }

  // 校验通过，保存 Token
  user.waiting_subbot_token = false;
  (user as any).subbot_token = trimmed; // 若 UserData 未声明该字段，用 any 绕过类型限制

  await saveUser(user);

  return await sendText(ctx, T(lang, "subbot_token_saved"));
}
