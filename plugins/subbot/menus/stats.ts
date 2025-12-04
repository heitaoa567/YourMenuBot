// =======================================
// plugins/subbot/menus/stats.ts
// 子机器人统计菜单（严格对齐你的结构）
// =======================================

import { sendMsg } from "../../../core/send";
import { SubBotDB } from "../../../subbotdb";
import { getSubBotStats } from "../../subbot/stats/index";  // 统计逻辑

export async function showSubBotStatsMenu(ctx: any, botId: number) {
  const uid = ctx.from.id;

  // 获取这个用户的所有子机器人
  const bots = SubBotDB.getBots(uid);
  const bot = bots.find((b: any) => b.bot_id === botId);

  if (!bot) {
    return sendMsg(ctx, "❌ 未找到该子机器人，请重试。");
  }

  // 获取统计数据
  const stats = await getSubBotStats(botId);

  const text =
`📊 *子机器人数据统计*
@${bot.username}（${bot.name}）

*今日新增用户：* ${stats.today_users}
*总用户数：* ${stats.total_users}

*今日消息量：* ${stats.today_messages}
*总消息量：* ${stats.total_messages}

*今日群发次数：* ${stats.today_broadcasts}
*总群发次数：* ${stats.total_broadcasts}

请选择操作：`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "🔄 刷新统计", callback_data: `subbot_stats_refresh_${botId}` }
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

