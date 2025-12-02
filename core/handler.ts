// ======================================================================
//                            core/handler.ts
//         主控制器：调度所有插件（语言 / VIP / 子机器人 / AI / 广播）
// ======================================================================

import { loadLanguage } from "../plugins/lang/index.ts";
import * as LangPlugin from "../plugins/lang/index.ts";

import * as SubBot from "../plugins/subbot/main.ts";
import * as Wallet from "../plugins/wallet/main.ts";
import * as VIP from "../plugins/vip/main.ts";
import * as Supply from "../plugins/supply/main.ts";
import * as Ads from "../plugins/ads/main.ts";
import * as AI from "../plugins/ai/main.ts";
import * as Referral from "../plugins/referral/main.ts";

import { getUser, saveUser } from "../db/userdb.ts";
import { sendText } from "./send.ts";

import type { Message, CallbackQuery } from "../types.ts";


// ======================================================================
//                     插件注册（顺序即优先级）
// ======================================================================

const plugins = [
  LangPlugin,   // 语言插件最先执行
  VIP,
  Wallet,
  SubBot,
  Supply,
  Ads,
  AI,
  Referral,
];


// ======================================================================
//                      统一分发消息到插件
// ======================================================================
export async function handleMessage(message: Message) {
  const uid = message.chat.id;
  const text = message.text || "";

  // 自动为新用户加载语言
  await loadLanguage({ message });

  // 循环插件 onMessage
  for (const p of plugins) {
    if (typeof p.onMessage === "function") {
      const used = await p.onMessage(uid, text, message);
      if (used) return; // 插件已处理
    }
  }

  // 如果插件都没处理 → 显示主菜单
  await sendText(uid, "⚡ Please choose:", {
    keyboard: [
      [{ text: "🌍 Language" }],
      [{ text: "🤖 My Sub Bots" }],
      [{ text: "💰 Wallet" }],
      [{ text: "📢 Broadcast" }],
      [{ text: "🧠 AI" }],
      [{ text: "📄 Supply Market" }],
    ],
    resize_keyboard: true,
  });
}



// ======================================================================
//                     统一分发 CallbackQuery 给插件
// ======================================================================
export async function handleCallback(cq: CallbackQuery) {

  const uid = cq.from.id;
  const data = cq.data;

  for (const p of plugins) {
    if (typeof p.onCallback === "function") {
      const used = await p.onCallback(uid, data, cq);
      if (used) return;
    }
  }

  // 没插件处理
  await sendText(uid, "⚠ Unknown action.");
}



// ======================================================================
//                   Webhook 主入口（由 main.ts 调用）
// ======================================================================
export async function handleUpdate(update: any) {

  try {
    // 消息
    if (update.message) {
      await handleMessage(update.message);
      return;
    }

    // 回调按钮
    if (update.callback_query) {
      await handleCallback(update.callback_query);
      return;
    }

  } catch (e) {
    console.error("Handler ERROR:", e);
  }
}
