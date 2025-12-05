// =======================================
// plugins/subbot/listener/message.ts
// Deno 版本，无 node-fetch
// =======================================

import { SubBotDB } from "../../../subbotdb";

export async function handleSubBotMessage(botId: number, msg: any) {
  const bot = SubBotDB.findBotById(botId);
  if (!bot || !bot.listener_enabled) return;

  const adminId = bot.owner_id;

  await forwardToAdmin(bot.token, adminId, `📩 子机器人 @${bot.username}:\n${msg.text || ""}`);
}

async function forwardToAdmin(token: string, admin: number, text: string) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: admin, text }),
  });
}
