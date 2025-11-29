// =============================================
// 主菜单键盘按钮（多语言 + VIP 自适应）
// =============================================

import { isVIP } from "../libs/utils.ts";

export function mainMenu(user: any) {
  const vip = isVIP(user.vipUntil);

  // ================
  // 多语言按钮文本
  // ================
  const txt = {
    zh: {
      chat: "🤖 ChatGPT智能助理",
      bind: "🤖 绑定子机器人",
      mybots: "🎛 我的子机器人",
      vip: vip ? "💎 VIP 面板（已开通）" : "💎 开通 VIP",
      referral: "📣 推广中心",
      lang: "🌐 切换语言",
      recharge: "💰 充值 USDT 开通 VIP",
    },
    en: {
      chat: "🤖 ChatGPT Assistant",
      bind: "🤖 Bind Sub Bot",
      mybots: "🎛 My Bots",
      vip: vip ? "💎 VIP Panel (Active)" : "💎 Get VIP",
      referral: "📣 Referral Center",
      lang: "🌐 Language",
      recharge: "💰 Recharge USDT for VIP",
    }
  };

  const t = txt[user.lang || "zh"];

  // ================
  // 动态按钮布局
  // ================
  const keyboard = {
    inline_keyboard: [
      [{ text: t.chat, callback_data: "chat" }],
      [{ text: t.bind, callback_data: "bind_bot" }],
      [{ text: t.mybots, callback_data: "my_bots" }],
      [{ text: t.vip, callback_data: "vip_panel" }],
      [{ text: t.referral, callback_data: "referral" }],
      [{ text: t.recharge, callback_data: "recharge" }],
      [{ text: t.lang, callback_data: "lang_menu" }],
    ],
  };

  return keyboard;
}

// =============
// 语言选择按钮
// =============
export function languageMenu() {
  return {
    inline_keyboard: [
      [{ text: "中文", callback_data: "lang_zh" }],
      [{ text: "English", callback_data: "lang_en" }]
    ],
  };
}

// =============
// VIP 套餐选择按钮
// =============
export function vipMenu() {
  return {
    inline_keyboard: [
      [{ text: "周卡（5U）", callback_data: "vip_week" }],
      [{ text: "月卡（10U）", callback_data: "vip_month" }],
      [{ text: "季卡（25U）", callback_data: "vip_quarter" }],
      [{ text: "年卡（80U）", callback_data: "vip_year" }],
    ],
  };
}

