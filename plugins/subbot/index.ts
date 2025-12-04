// ======================================================================
//                    plugins/subbot/index.ts
//         子机器人系统主入口（适配当前项目架构）
// ======================================================================

import { handle as handleCallback } from "./callback.ts";
import { saveToken } from "./callback.ts";

// 所有 subbot 相关前缀
const PREFIX = "sub_";

// ======================================================
// 提供给 router.ts 调用的统一接口
// ======================================================
export function handle(uid_or_ctx: any, data: string) {
  return handleCallback(uid_or_ctx, data);
}

export function handleText(ctx: any, text: string, user: any) {
  if (user.waiting_subbot_token === true) {
    return saveToken(ctx, text);
  }
}
