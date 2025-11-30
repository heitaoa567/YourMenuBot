// ==========================================
//            keyboards.ts
//      YourMenuBot 全按钮管理系统
// ==========================================

/**
 * 本文件统一管理所有键盘按钮
 */

export function mainMenu(lang: string = "zh") {
  return {
    inline_keyboard: [
      [
        { text: lang === "zh" ? "🤖 AI 智能助手" : "🤖 AI Assistant", callback_data: "ai" }
      ],
      [
        { text: lang === "zh" ? "👑 开通 VIP" : "👑 Buy VIP", callback_data: "vip" }
      ],
      [
        { text: lang === "zh" ? "📣 推广中心" : "📣 Referral", callback_data: "ref" }
      ],
      [
        { text: lang === "zh" ? "🤖 绑定子机器人" : "🤖 Bind Sub-Bot", callback_data: "bind_subbot" }
      ],
      [
        { text: lang === "zh" ? "🌍 切换语言" : "🌍 Language", callback_data: "change_lang" }
      ]
    ]
  };
}

// =============================
//      语言选择菜单
// =============================
export function languageMenu() {
  return {
    inline_keyboard: [
      [
        { text: "中文 🇨🇳", callback_data: "set_lang_zh" }
      ],
      [
        { text: "English 🇺🇸", callback_data: "set_lang_en" }
      ],
      [
        { text: "⬅️ 返回", callback_data: "back" }
      ]
    ]
  };
}

// =============================
//         VIP 套餐菜单
// =============================
export function vipMenu() {
  return {
    inline_keyboard: [
      [
        { text: "🎟 7 天（¥20）", callback_data: "vip_7" }
      ],
      [
        { text: "🎟 30 天（¥50）", callback_data: "vip_30" }
      ],
      [
        { text: "🎟 90 天（¥100）", callback_data: "vip_90" }
      ],
      [
        { text: "🎟 365 天（¥300）", callback_data: "vip_365" }
      ],
      [
        { text: "⬅️ 返回", callback_data: "back" }
      ]
    ]
  };
}

// =============================
//       推广中心（返回按钮）
// =============================
export function referralMenu() {
  return {
    inline_keyboard: [
      [{ text: "⬅️ 返回", callback_data: "back" }]
    ]
  };
}

// =============================
//     子机器人绑定成功菜单
// =============================
export function subBotMenu() {
  return {
    inline_keyboard: [
      [{ text: "⬅️ 返回主菜单", callback_data: "back" }]
    ]
  };
}
