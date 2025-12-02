// ==========================================
//               core/handler.ts
//    主消息处理器：文本、按钮、插件入口
// ==========================================

import { sendText } from "./send.ts";
import { routerPlugins } from "../plugins/router.ts";
import type { Message, CallbackQuery } from "../types.ts";

// message.text → 分发到插件处理器
export async function handleMessage(msg: Message) {
  const uid = msg.chat.id;
  const text = msg.text || "";

  // 进入插件系统
  const pluginResult = await routerPlugins.onMessage(uid, text, msg);
  if (pluginResult) return pluginResult;

  // 默认输出
  return await sendText(uid, "I received your message.");
}

// callback_query.data → 分发到插件处理器
export async function handleCallback(cq: CallbackQuery) {
  const uid = cq.message.chat.id;
  const data = cq.data;

  const pluginResult = await routerPlugins.onCallback(uid, data, cq);
  if (pluginResult) return pluginResult;

  return await sendText(uid, "OK");
}

