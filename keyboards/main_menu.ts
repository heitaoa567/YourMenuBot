// =====================================================
//                  keyboards/mainMenu.ts
//              YourMenuBot 主菜单按钮 UI
// =====================================================

import { UserData } from "../types.ts";
import { isVIP } from "../core/permissions.ts";

export function mainMenu(user: UserData) {
  const vipTag = isVIP(user) ? "🌟 VIP" : "👤 普通用户";

  return {
    inline_keyboard: [
      [
        { text: "🤖 子机器人管理", callback_data: "sub_menu" },
      ],
      [
        { text: "💡 AI 智能助手", callback_data: "ai_menu" },
      ],
      [
        { text: "📢 供需市场", callback_data: "supply_menu" },
      ],
      [
        { text: "💰 钱包中心", callback_data: "wallet_menu" },
        { text: "🎁 推广中心", callback_data: "ref_menu" },
      ],
      [
        { text: "🔧 VIP 专区", callback_data: "vip_menu" },
        { text: "🌍 语言 Language", callback_data: "language_menu" },
      ],
      [
        { text: `${vipTag}`, callback_data: "vip_status" },
      ],
    ],
  };
}
