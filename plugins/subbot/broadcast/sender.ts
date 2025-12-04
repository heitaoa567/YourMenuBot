// =======================================
// plugins/subbot/broadcast/sender.ts
// 群发消息给子机器人的所有粉丝
// =======================================

import fetch from "node-fetch";
import { SubBotDB } from "../../../subbotdb";
import { pushBroadcast } from "./queue";

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function sendSubBotBroadcastText(botId: number, text: string) {
  pushBroadcast(botId, "text", { text });
}

export async function sendSubBotBroadcastButtons(botId: number, payload: any) {
  pushBroadcast(botId, "buttons", payload);
}

// =======================================
// 广播执行器（在主程序中定时调用）
// =======================================
export async function processBroadcastQueue() {
  const item = popBroadcast();
  if (!item) return;

  const { botId, type, payload } = item;

  // 找到机器人 Token
  const bot = SubBotDB.findBotById(botId);
  if (!bot) return;

  const token = bot.token;

  // 获取粉丝列表（你可以扩展）
  const followers = SubBotDB.getFollowers(botId);

  for (const uid of followers) {

    if (type === "text") {
      await callBotAPI(token, "sendMessage", {
        chat_id: uid,
        text: payload.text
      });
    }

    if (type === "buttons") {
      await callBotAPI(token, "sendMessage", {
        chat_id: uid,
        text: payload.text || "",
        reply_markup: payload.reply_markup
      });
    }

    await delay(50); // 防止限流
  }
}

async function callBotAPI(token: string, method: string, data: any) {
  await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

