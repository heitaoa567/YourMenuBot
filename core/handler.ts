// =============================================================
//                        core/handler.ts
//   主消息处理器（Message / CallbackQuery → 插件系统入口）
// =============================================================

import { sendText } from "./send.ts";
import { routerPlugins } from "../plugins/router.ts";
import type { Message, CallbackQuery } from "../types.ts";

// =============================================================
//                     处理普通消息（text）
// =============================================================
export async function handleMessage(msg: Message) {
  const uid = msg.chat.id;
  const text = msg.text || "";

  // -------------------------
  // ① 分发到插件系统
  // -------------------------
  const pluginHandled = await routerPlugins.onMessage(uid, text, msg);
  if (pluginHandled) return pluginHandled;

  // -------------------------
  // ② 默认处理（没有插件接管）
  // -------------------------
  return await sendText(
    uid,
    "I received your message.\n(But no plugin handled it yet.)"
  );
}

// =============================================================
//                 处理按钮回调（callback_query）
// =============================================================
export async function handleCallback(cq: CallbackQuery) {
  const uid = cq.message.chat.id;
  const data = cq.data;

  // -------------------------
  // ① 分发到插件系统
  // -------------------------
  const pluginHandled = await routerPlugins.onCallback(uid, data, cq);
  if (pluginHandled) return pluginHandled;

  // -------------------------
  // ② 默认处理
  // -------------------------
  return await sendText(uid, "Button received, but no plugin handled it.");
}
