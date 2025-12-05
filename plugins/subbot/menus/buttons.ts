// ======================================================================
//                  plugins/subbot/menus/buttons.ts
//         单个子机器人按钮菜单（完全适配你的项目）
// ======================================================================

import { sendText } from "../../../core/send.ts";
import { getSubBot } from "../../../db/subbotdb.ts";

/**
 * 显示某个子机器人的管理按钮
 */
export async function showSubBotButtons(ctx: any, botId: number) {
  const uid = ctx.from.id;

  // 数据库中获取子机器人
  const bot = await getSubBot(uid);

  if (!bot || bot.bot_id !== botId) {
    return await sendText(ctx, "❌ 未找到该子机器人，请重试。");
  }

  const text = 
`🤖 <b>子机器人管理</b>
@${bot.bot_user}

请选择你要执行的操作：`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "📢 群发消息", callback_data: `sub_broadcast_${botId}` }
      ],
      [
        { text: "👁 监听设置", callback_data: `sub_listener_${botId}` }
      ],
      [
        { text: "📊 数据统计", callback_data: `sub_stats_${botId}` }
      ],
      [
        { text: "❌ 删除此子机器人", callback_data: `sub_delete_${botId}` }
      ],
      [
        { text: "🔙 返回列表", callback_data: "sub_list" }
      ]
    ]
  };

  return await sendText(ctx, text, keyboard);
}
