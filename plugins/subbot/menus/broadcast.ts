// ======================================================================
//                plugins/subbot/menus/broadcast.ts
//         子机器人群发菜单（完全适配你的项目结构）
// ======================================================================

import { sendText } from "../../../core/send.ts";
import { getSubBot } from "../../../db/subbotdb.ts";

export async function showSubBotBroadcastMenu(ctx: any, botId: number) {
  const uid = ctx.from.id;

  // 读取数据库里的子机器人
  const bot = await getSubBot(uid);
  if (!bot || bot.bot_id !== botId) {
    return await sendText(ctx, "❌ 未找到该子机器人，请重试。");
  }

  const text =
`📢 <b>子机器人群发系统</b>
机器人：@${bot.bot_user}

请选择你要群发的消息类型：`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "📝 发送文本", callback_data: `sub_broadcast_text_${botId}` }
      ],
      [
        { text: "🖼 发送媒体（图片/视频）", callback_data: `sub_broadcast_media_${botId}` }
      ],
      [
        { text: "🔘 文本 + 按钮", callback_data: `sub_broadcast_buttons_${botId}` }
      ],
      [
        { text: "🔙 返回菜单", callback_data: `sub_manage_${botId}` }
      ]
    ]
  };

  return await sendText(ctx, text, keyboard);
}
