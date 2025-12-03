// ==========================================
// plugins/admin/menus/supply.ts
// 供需系统后台菜单
// ==========================================

import { sendMsg } from "../../../core/send";
import { SubBotDB } from "../../../subbotdb";

export async function showAdminSupplyMenu(ctx: any) {

  const config = SubBotDB.getSupplySettings();

  const text = `📦 *供需系统后台*

当前设置：
• 自动审核：${config.auto_check ? "🟩 开启" : "🟥 关闭"}
• 最大发布次数：${config.max_posts} 次/天

请选择你要调整👇`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "📝 修改最大发布次数", callback_data: "admin_supply_edit_max" }
      ],
      [
        { text: config.auto_check ? "🟥 关闭自动审核" : "🟩 开启自动审核", callback_data: "admin_supply_toggle_check" }
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
