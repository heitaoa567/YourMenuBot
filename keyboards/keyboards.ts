// keyboards.ts
// ======================================================
// YourMenuBot 统一键盘按钮系统（主菜单 + 交互按钮）
// 支持 6 国多语言 + 返回按钮 + 子机器人 + VIP + 推广
// ======================================================

import { LANG } from "../languages.ts";

// 🔙 返回按钮
export function backButton(lang: string) {
  const L = LANG[lang];
  return {
    inline_keyboard: [
      [{ text: L.btn_back, callback_data: "back" }],
      [{ text: L.btn_menu, callback_data: "menu" }],
    ],
  };
}

// 🏠 主菜单按钮
export function mainMenu(user: any) {
  const L = LANG[user.lang || "en"];

  return {
    inline_keyboard: [
      [
        { text: L.btn_ai, callback_data: "ai" },
        { text: L.btn_vip, callback_data: "vip" },
      ],
      [
        { text: L.btn_ref, callback_data: "ref" },
        { text: L.btn_subbot, callback_data: "subbot" },
      ],
      [
        { text: L.btn_lang + " ▾", callback_data: "lang_menu" }
      ]
    ],
  };
}

// 🌐 多语言选择菜单
export function languageMenu() {
  return {
    inline_keyboard: [
      [
        { text: "🇨🇳 中文", callback_data: "lang_zh" },
        { text: "🇺🇸 English", callback_data: "lang_en" }
      ],
      [
        { text: "🇹🇭 ไทย", callback_data: "lang_th" },
        { text: "🇻🇳 Tiếng Việt", callback_data: "lang_vi" }
      ],
      [
        { text: "🇮🇩 Bahasa Indonesia", callback_data: "lang_id" },
        { text: "🇲🇲 မြန်မာစာ", callback_data: "lang_mm" }
      ],
      [
        { text: "⬅️ 返回", callback_data: "menu" }
      ]
    ],
  };
}

// 👑 VIP 购买菜单（选择时长）
export function vipBuyMenu(user: any) {
  const L = LANG[user.lang];

  return {
    inline_keyboard: [
      [{ text: L.vip_week, callback_data: "vip_week" }],
      [{ text: L.vip_month, callback_data: "vip_month" }],
      [{ text: L.vip_quarter, callback_data: "vip_quarter" }],
      [{ text: L.vip_year, callback_data: "vip_year" }],
      [{ text: L.btn_back, callback_data: "menu" }],
    ],
  };
}

// 📢 推广中心返回按钮
export function referralMenu(user: any) {
  const L = LANG[user.lang];

  return {
    inline_keyboard: [
      [{ text: L.btn_back, callback_data: "menu" }],
    ],
  };
}

// 🤖 绑定子机器人菜单
export function subBotMenu(user: any) {
  const L = LANG[user.lang];

  return {
    inline_keyboard: [
      [
        { text: "➕ 绑定新机器人", callback_data: "bind_subbot" }
      ],
      [
        { text: L.btn_back, callback_data: "menu" }
      ]
    ],
  };
}

