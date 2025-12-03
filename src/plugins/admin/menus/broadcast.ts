// ==========================================
// plugins/admin/menus/broadcast.ts
// 全局广播后台菜单
// ==========================================

import { sendMsg } from "../../../core/send";

export async function showAdminBroadcastMenu(ctx: any) {

  const text = `📣 *全局广播后台*

请选择广播类型👇`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "📝 文本广播", callback_data: "admin_broadcast_text" }
      ],
      [
        { text: "🖼 图片广播", callback_data: "admin_broadcast_photo" }
      ],
      [
        { text: "🎬 视频广播", callback_data: "admin_broadcast_video" }
      ],
      [
        { text: "🔗 按钮+文本广播", callback_data: "admin_broadcast_button" }
      ],
      [
        { text: "🔙 返回后台", callback_data: "admin_main" }
      ]
    ]
  };

  await sendMsg(ctx, text, {
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
}
