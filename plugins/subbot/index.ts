// ======================================================================
//                    plugins/subbot/index.ts
//       子机器人系统主入口（完全适配你的 router.ts）
// ======================================================================

import { handle as handleCallback, saveToken } from "./callback.ts";
import { handleText as handleSubText } from "./handler.ts";
import { getUser } from "../../db/userdb.ts";

// ======================================================
//  被 router.ts 调用的统一接口
// ======================================================

// callback_query → sub_xxx
export async function handle(ctx: any, data: string) {
  return await handleCallback(ctx, data);
}

// message → 用户输入文本
export async function handleText(ctx: any, text: string) {
  const uid = ctx.from.id;
  const user = await getUser(uid);

  // ① 用户正在输入 Token
  if (user.waiting_subbot_token === true) {
    return await saveToken(ctx, text);
  }

  // ② 群发文本 / 群发按钮 / 监听规则
  return await handleSubText(ctx, text);
}
