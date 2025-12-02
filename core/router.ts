// ==========================================
//                 core/router.ts
//  统一路由分发器（所有插件、核心功能经过这里）
// ==========================================

import type { Update } from "./../types.ts";
import { handleMessage } from "./handler.ts";
import { handleCallback } from "./handler.ts";

export async function router(update: Update) {
  try {
    // 回调按钮（inline button）
    if (update.callback_query) {
      return await handleCallback(update.callback_query);
    }

    // 普通消息
    if (update.message) {
      return await handleMessage(update.message);
    }

    return "OK";
  } catch (err) {
    console.error("Router Error:", err);
    return "Router Error";
  }
}

