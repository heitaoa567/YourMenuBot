// ==========================================
// plugins/admin/menus/vip.ts
// VIP 系统后台菜单
// ==========================================

import { sendMsg } from "../../../core/send";
import { SubBotDB } from "../../../subbotdb";

export async function showAdminVipMenu(ctx: any) {

  const settings = SubBotDB.getVipSettings();

  const text = `💎 *VIP 系统后台*

当前 VIP 设置：
• 默认 VIP 天数：${settings.default_days}
• 价格（每月）：${settings.price_month} USDT
• 自动续费：${settings.auto_renew ? "🟩 开启" : "🟥 关闭"}

请选择你要调整的功能👇`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "✏️ 修改默认天数", callback_data: "admin_vip_edit_days" }
      ],
      [
        { text: "💰 设置月费价格", callback_data: "admin_vip_edit_price" }
      ],
      [
        { text: settings.auto_renew ? "🟥 关闭自动续费" : "🟩 开启自动续费", callback_data: "admin_vip_toggle_renew" }
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
