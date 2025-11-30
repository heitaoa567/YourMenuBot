// ==========================================
//           subbot/listen.ts
//      子机器人监听器（消息捕获）
// ==========================================

import { getSubBotConfig } from "./config.ts";
import { saveUserSubLog } from "../../db/userdb.ts";
import { TG } from "../../core/telegram.ts";

export async function handleSubBotUpdate(update: any, botId: number) {
  const cfg = await getSubBotConfig(botId);

  if (!cfg) return;

  const message = update.message;
  if (!message) return;

  const chatId = message.chat.id;
  const text = message.text || "";

  // 记录日志
  await saveUserSubLog(botId, {
    chatId,
    text,
    date: Date.now(),
  });

  // VIP 限制：是否允许用户使用子机器人？
  if (cfg.vip_only && !cfg.isVIP) {
    await TG.sendMessage(botId, chatId, "⚠ 此子机器人需要 VIP 资格才能继续使用");
    return;
  }

  // 如果配置了自动转发
  if (cfg.forward_to_admin) {
    await TG.sendMessage(cfg.forward_to_admin, `📩 子机器人消息：\n${text}`);
  }

  // 如果配置了自动关键字回复
  if (cfg.auto_reply) {
    const rule = cfg.auto_reply[text.trim()];
    if (rule) {
      await TG.sendMessage(botId, chatId, rule);
      return;
    }
  }

  // 如果需要广播（用于多用户监听）
  if (cfg.broadcast_enabled) {
    for (const uid of cfg.broadcast_users || []) {
      await TG.sendMessage(botId, uid, `📢（监听广播）用户消息：${text}`);
    }
  }

  // 默认提示用户
  await TG.sendMessage(botId, chatId, `🤖 我是子机器人：${cfg.name}\n你发送了：${text}`);
}

