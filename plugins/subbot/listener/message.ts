// ======================================================================
// plugins/subbot/listener/message.ts
// 子机器人收到文字后 → 转发到主控机器人（最终稳定版）
// ======================================================================

import { getSubBot } from "../../../db/subbotdb.ts";
import { sendText } from "../../../core/send.ts";

/**
 * 子机器人收到普通文本消息
 * @param ownerId 主机器人用户ID（机器人绑定者）
 * @param botId   子机器人ID
 * @param msg     Telegram 消息对象
 */
export async function handleSubBotMessage(ownerId: number, botId: number, msg: any) {
  const bot = await getSubBot(ownerId);

  // 子机器人不存在
  if (!bot || bot.bot_id !== botId) return;

  // 未开启监听
  if (!bot.listener_enabled) return;

  const text = msg.text || "(空消息)";

  // ================================
  // 若设置了监听规则，执行过滤
  // ================================
  if (bot.listener_rules) {
    const rules = bot.listener_rules.split("\n").map(r => r.trim()).filter(Boolean);

    const hit = rules.some(r => text.includes(r));
    if (!hit) return; // 不匹配规则 → 忽略
  }

  // ================================
  // 转发给主账号
  // ================================
  await sendText(
    ownerId,
    `📩 <b>子机器人消息</b>\n` +
    `机器人：@${bot.bot_user}\n` +
    `用户：${msg.from?.id}\n\n` +
    `${text}`
  );
}
