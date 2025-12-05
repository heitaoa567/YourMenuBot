// =======================================
// plugins/subbot/broadcast/sender.ts
// 子机器人群发发送器（最终稳定版本）
// =======================================

import fetch from "node-fetch";
import { getSubBot } from "../../../db/subbotdb.ts";
import { pushBroadcast, popBroadcast } from "./queue.ts";

/**
 * 给指定子机器人创建文本广播任务
 */
export async function sendSubBotBroadcastText(ownerId: number, botId: number, text: string) {
  pushBroadcast(ownerId, botId, "text", { text });
}

/**
 * 给指定子机器人创建“文本 + 按钮”广播任务
 */
export async function sendSubBotBroadcastButtons(ownerId: number, botId: number, payload: any) {
  pushBroadcast(ownerId, botId, "buttons", payload);
}

/**
 * 广播任务执行器（主程序定时调用）
 */
export async function processBroadcastQueue() {
  const task = popBroadcast();
  if (!task) return;

  const { ownerId, botId, type, payload } = task;

  // 查找子机器人
  const bot = await getSubBot(ownerId);
  if (!bot || bot.bot_id !== botId) return;

  const token = bot.bot_token;

  // 粉丝列表
  const followers = bot.users.map(u => u.id);

  for (const uid of followers) {
    if (type === "text") {
      await callBotAPI(token, "sendMessage", {
        chat_id: uid,
        text: payload.text,
      });
    }

    if (type === "buttons") {
      await callBotAPI(token, "sendMessage", {
        chat_id: uid,
        text: payload.text || "",
        reply_markup: payload.reply_markup,
      });
    }

    await delay(50); // 限流
  }
}

/**
 * Telegram API 调用封装
 */
async function callBotAPI(token: string, method: string, data: any) {
  await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch(() => {});
}

/**
 * 等待函数
 */
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
