// ========================================
//       Callback Dispatcher - callbacks.ts
//      回调按钮分发器（自动分发事件）
// ========================================

import { getPlugins } from "./plugins.ts";

export async function handleCallback(chatId: number, data: string, cq: any) {
  const plugins = getPlugins();

  for (const plugin of plugins) {
    if (plugin.onCallback) {
      try {
        const result = await plugin.onCallback(chatId, data, cq);
        if (result === "handled") return "handled";
      } catch (err) {
        console.error(`[Callback] Plugin ${plugin.name} error:`, err);
      }
    }
  }

  return "ok";
}

