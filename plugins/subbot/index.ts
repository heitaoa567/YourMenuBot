// ======================================================================
//                    plugins/subbot/index.ts
//         子机器人系统主入口（完全适配你的 router.ts）
// ======================================================================

import { handle as handleCallback, saveToken } from "./callback.ts";

// ======================================================
//  被 router.ts 调用的统一入口
// ======================================================

// callback_query → sub_xxx
export function handle(ctx: any, data: string) {
  return handleCallback(ctx, data);
}

// 用户输入文本 → 等待 token
export function handleText(ctx: any, text: string, user: any) {
  if (user.waiting_subbot_token === true) {
    return saveToken(ctx, text);
  }
}
