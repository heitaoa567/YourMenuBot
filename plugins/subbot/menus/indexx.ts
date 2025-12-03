// =======================================
// plugins/subbot/menus/index.ts
// 子机器人主菜单（严格按你当前结构）
// =======================================

import { sendMsg } from "../../../core/send";

export async function showSubBotMainMenu(ctx: any) {
  const text = 
`🤖 *子机器人管理系统*

请选择你要操作的功能：`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "➕ 绑定子机器人", callback_data: "subbot_token" }
      ],
      [
        { text: "📢 群发消息", callback_data: "subbot_broadcast" }
      ],
      [
        { text: "👁 监听设置", callback_data: "subbot_listener" }
      ],
      [
        { text: "📊 数据统计", callback_data: "subbot_stats" }
      ],
      [
        { text: "🔙 返回主菜单", callback_data: "main_menu" }
      ]
    ]
  };

  await sendMsg(ctx, text, {
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
}

