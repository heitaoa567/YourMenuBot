// =======================================
// plugins/subbot/broadcast/sender.ts
// Deno 版本，无 node-fetch
// =======================================

import { SubBotDB } from "../../../subbotdb";
import { pushBroadcast, popBroadcast } from "./queue";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function sendSubBotBroadcastText(botId: number, text: string) {
  pushBroadcast(botId, "text", { text });
}

export async function sendSubBotBroadcastButtons(botId: number, payload: any) {
  pushBroadcast(botId, "buttons", payload);
}

export async function processBroadcastQueue() {
  const item = popBroadcast();
  if (!item) return;

  const { botId, type, payload } = item;

  const bot = SubBotDB.findBotById(botId);
  if (!bot) return;

  const token = bot.token;
  const followers = SubBotDB.getFollowers(botId);

  for (const uid of followers) {
    await sendToBot(token, uid, type, payload);
    await delay(50);
  }
}

async function sendToBot(token: string, uid: number, type: string, payload: any) {
  if (type === "text") {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: uid, text: payload.text }),
    });
  }

  if (type === "buttons") {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: uid,
        text: payload.text || "",
        reply_markup: payload.reply_markup,
      }),
    });
  }
}
