// =======================================
// plugins/subbot/menus/broadcast.ts
// 子机器人群发菜单（与你现有结构完全一致）
// =======================================

import { sendMsg } from "../../../core/send";
import { SubBotDB } from "../../../subbotdb";

export async function showSubBotBroadcastMenu(ctx: any, botId: number) {
  const uid = ctx.from.id;

  // 获取已绑定子机器人
  const bots = SubBotDB.getBots(uid);
  const bot = bots.find((b: any) => b.bot_id === botId);

  if (!bot) {
    return sendMsg(ctx, "❌ 未找到该子机器人，请重试。");
  }

  const text =
`📢 *子机器人群发系统*
子机器人：@${bot.username}（${bot.name}）

请选择你要群发的消息类型：`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "📝 发送文本", callback_data: `subbot_broadcast_text_${botId}` }
      ],
      [
        { text: "🖼 发送图片 / 视频", callback_data: `subbot_broadcast_media_${botId}` }
      ],
      [
        { text: "🔘 文本 + 按钮", callback_data: `subbot_broadcast_buttons_${botId}` }
      ],
      [
        { text: "🔙 返回机器人菜单", callback_data: `subbot_manage_${botId}` }
      ]
    ]
  };

  await sendMsg(ctx, text, {
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
}

