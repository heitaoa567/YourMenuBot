// ======================================================================
//                       plugins/vip/menu.ts
//                         VIP 菜单按钮
// ======================================================================

import { formatPlans } from "./plans.ts";

export function vipMenu() {
  return {
    text: formatPlans(),
    keyboard: {
      inline_keyboard: [
        [
          { text: "🎟 周卡 5U", callback_data: "vip_buy_weekly" },
          { text: "📅 月卡 15U", callback_data: "vip_buy_monthly" }
        ],
        [
          { text: "📆 季卡 38U", callback_data: "vip_buy_season" },
          { text: "📌 年卡 158U", callback_data: "vip_buy_yearly" }
        ],
        [
          { text: "💎 终身VIP 888U", callback_data: "vip_buy_lifetime" }
        ],
        [
          { text: "💰 使用钱包余额购买", callback_data: "vip_buy_wallet" }
        ],
        [
          { text: "⬅️ 返回菜单", callback_data: "back_main" }
        ]
      ]
    }
  };
}
