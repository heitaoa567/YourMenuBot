// ======================================================================
//                        plugins/vip/menu.ts
//                 VIP 主菜单（展示状态 + 购买入口）
// ======================================================================

import { getUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts"; // 多语言 T()
import { VIP_PLANS } from "../../core/permissions.ts";
import type { Message } from "../../types.ts";


// ======================================================================
//                     显示 VIP 主菜单
// ======================================================================
export async function showVIPMenu(uid: number, msg: Message) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  const isVip = user.vip_until && user.vip_until > Date.now();
  const vipText = isVip
    ? `⭐ VIP Active\nExpires: ${new Date(user.vip_until).toLocaleDateString()}`
    : `❌ Not VIP`;

  const text =
    `💎 <b>${T(lang, "vip_title")}</b>\n\n` +
    `${vipText}\n\n` +
    `🛒 ${T(lang, "vip_select_plan")}`;

  // 菜单按钮
  const menu = {
    inline_keyboard: [
      [
        { text: `🔹 Weekly - 5 USDT`, callback_data: "vip_buy_weekly" },
      ],
      [
        { text: `🔸 Monthly - 15 USDT`, callback_data: "vip_buy_monthly" },
      ],
      [
        { text: `🌟 Season (90d) - 38 USDT`, callback_data: "vip_buy_season" },
      ],
      [
        { text: `🏆 Yearly - 158 USDT`, callback_data: "vip_buy_yearly" },
      ],
      [
        { text: `💎 Lifetime - 888 USDT`, callback_data: "vip_buy_lifetime" },
      ],
      [
        { text: `⬅️ ${T(lang, "back")}`, callback_data: "menu_home" }
      ]
    ]
  };

  await sendText(uid, text, menu);
}

