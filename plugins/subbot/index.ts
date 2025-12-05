// ======================================================================
//                    plugins/subbot/index.ts
//       子机器人系统主入口（最终稳定版，完全适配 router.ts）
// ======================================================================

import { handle as handleCallback, saveToken } from "./callback.ts";
import { handleText as handleSubText } from "./handler.ts";
import { getUser } from "../../db/userdb.ts";

// ======================================================================
//  callback_query → sub_xxx
//  router.ts：if (data.startsWith("sub_")) → Subbot.handle(ctx, data)
// ======================================================================
export async function handle(ctx: any, data: string) {
  return await handleCallback(ctx, data);
}

// ======================================================================
//  普通消息 → Token 输入 / 广播输入 / 监听规则输入
//  router.ts：Subbot.handleText(ctx, text)
// ======================================================================
export async function handleText(ctx: any, text: string) {
  const uid = ctx.from.id;
  const user = await getUser(uid);

  // ======================================================
  // ① 用户正在绑定 Token → 直接保存 Token
  // ======================================================
  if (user.waiting_subbot_token === true) {
    return await saveToken(ctx, text);
  }

  // ======================================================
  // ② 子机器人其他输入（群发文本 / JSON / 监听规则）
  // ======================================================
  return await handleSubText(ctx, text);
}
