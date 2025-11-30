// ========================================
//           Router - router.ts
//     消息路由器（自动分发给插件）
// ========================================

import { getPlugins } from "./plugins.ts";

export async function handleUpdate(update: any) {

  // =======================
  // 1. 普通消息（text）处理
  // =======================
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text || "";

    const plugins = getPlugins();

    for (const plugin of plugins) {
      if (plugin.onMessage) {
        try {
          const result = await plugin.onMessage(chatId, text, msg);
          if (result === "handled") return new Response("OK");
        } catch (err) {
          console.error(`[Router] Plugin ${plugin.name} error onMessage:`, err);
        }
      }
    }

    return new Response("OK");
  }

  // =======================
  // 2. 按钮回调 callback 查询
  // =======================
  if (update.callback_query) {
    const cq = update.callback_query;
    const chatId = cq.message.chat.id;
    const data = cq.data;

    const plugins = getPlugins();

    for (const plugin of plugins) {
      if (plugin.onCallback) {
        try {
          const result = await plugin.onCallback(chatId, data, cq);
          if (result === "handled") return new Response("OK");
        } catch (err) {
          console.error(`[Router] Plugin ${plugin.name} error onCallback:`, err);
        }
      }
    }

    return new Response("OK");
  }

  return new Response("OK");
}

