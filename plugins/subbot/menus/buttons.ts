// =======================================
// plugins/subbot/menus/buttons.ts
// 单个子机器人按钮菜单
// =======================================

import { sendMsg } from "../../../core/send";
import { SubBotDB } from "../../../subbotdb";

/**
 * 显示某个子机器人的管理按钮
 * @param ctx Telegram 上下文
 * @param botId number 子机器人 ID
 */
export async function showSubBotButtons(ctx: any, botId: number) {
  const uid = ctx.from.id;

  // 获取所有已绑定的子机器人
  const bots = SubBotDB.getBots(uid);
  const bot = bots.find((b: any) => b.bot_id === botId);

  if (!bot) {
    return sendMsg(ctx, "❌ 未找到该子机器人，请重新选择。");
  }

  const text = 
`🤖 *子机器人管理*
@${bot.username}（${bot.name}）

请选择你要对该子机器人执行的操作：`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "📢 群发消息", callback_data: `subbot_broadcast_${botId}` }
      ],
      [
        { text: "👁 监听设置", callback_data: `subbot_listener_${botId}` }
      ],
      [
        { text: "📊 数据统计", callback_data: `subbot_stats_${botId}` }
      ],
      [
        { text: "❌ 删除此子机器人", callback_data: `subbot_delete_${botId}` }
      ],
      [
        { text: "🔙 返回列表", callback_data: "subbot_token" }
      ]
    ]
  };

  await sendMsg(ctx, text, {
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
}

