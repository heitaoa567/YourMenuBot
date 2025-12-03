// =======================================
// plugins/admin/menus/index.ts
// 后台管理主菜单（与你现有结构完全一致）
// =======================================

import { sendMsg } from "../../../core/send";

export async function showAdminMainMenu(ctx: any) {
  const text =
`👑 *BotBrothers 管理员后台*

请选择你要管理的功能模块：`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "📊 数据统计", callback_data: "admin_stats" }
      ],
      [
        { text: "🤖 子机器人管理", callback_data: "admin_subbots" }
      ],
      [
        { text: "👥 用户管理", callback_data: "admin_users" }
      ],
      [
        { text: "💰 钱包系统", callback_data: "admin_wallet" }
      ],
      [
        { text: "🏷 VIP 系统", callback_data: "admin_vip" }
      ],
      [
        { text: "📢 全局广播", callback_data: "admin_broadcast" }
      ],
      [
        { text: "📰 广告系统", callback_data: "admin_ads" }
      ],
      [
        { text: "📦 供需管理", callback_data: "admin_supply" }
      ],
      [
        { text: "⚙️ 系统设置", callback_data: "admin_settings" }
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

