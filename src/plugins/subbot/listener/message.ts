// =======================================
// plugins/subbot/listener/message.ts
// 子机器人收到消息 → 转发到主机器人
// =======================================

import { SubBotDB } from "../../../subbotdb";
import fetch from "node-fetch";

export async function handleSubBotMessage(botId: number, msg: any) {
  const bot = SubBotDB.findBotById(botId);
  if (!bot || !bot.listener_enabled) return;

  const adminId = bot.owner_id;

  await forwardToAdmin(bot.token, adminId, `📩 来自子机器人 @${bot.username}:\n${msg.text || ""}`);
}

async function forwardToAdmin(token: string, admin: number, text: string) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    body: JSON.stringify({ chat_id: admin, text }),
    headers: { "Content-Type": "application/json" }
  });
}

