// ======================================================================
//                        plugins/vip/plans.ts
//                VIP 套餐列表（用于菜单显示）
// ======================================================================

import { T } from "../lang/index.ts";

// 你的 VIP 套餐价格（USDT）
export const VIP_PRICES = {
  weekly: 5,      // 7 天
  monthly: 15,    // 30 天
  season: 38,     // 90 天
  yearly: 158,    // 365 天
  lifetime: 888,  // 永久
};


// 为用户展示 VIP 套餐菜单
export function buildVipPlansMenu(lang: string) {
  const txt = T(lang, "vip_plans_title");

  return {
    text: txt,
    keyboard: {
      inline_keyboard: [
        [{ text: `⭐ 7 Days — ${VIP_PRICES.weekly} USDT`, callback_data: "vip_buy_weekly" }],
        [{ text: `🌙 30 Days — ${VIP_PRICES.monthly} USDT`, callback_data: "vip_buy_monthly" }],
        [{ text: `🌤️ 90 Days — ${VIP_PRICES.season} USDT`, callback_data: "vip_buy_season" }],
        [{ text: `📅 365 Days — ${VIP_PRICES.yearly} USDT`, callback_data: "vip_buy_yearly" }],
        [{ text: `💎 Lifetime — ${VIP_PRICES.lifetime} USDT`, callback_data: "vip_buy_lifetime" }],

        [{ text: "⬅ Back", callback_data: "back_to_main" }],
      ]
    }
  };
}

