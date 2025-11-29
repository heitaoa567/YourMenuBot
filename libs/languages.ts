// =============================
// 多语言系统（可无限扩展）
// =============================

export type LangCode = "zh" | "en";

// 所有语言文案配置
export const LANG: Record<LangCode, any> = {
  zh: {
    // --- 通用 ---
    start: "欢迎使用您的菜单机器人！\n请先绑定一个 Bot Token 才能开始使用。",
    need_bind: "❗你尚未绑定子机器人，请发送你的 Bot Token。",
    bind_success: "🎉 子机器人绑定成功！所有基础功能已解锁。",
    vip_only: "⚠️ 此功能为 VIP 专属，请先购买 VIP 套餐。",
    language_switched: "🌐 语言已切换为中文。",
    menu: "请选择一个功能：",
    chat_limit: "⏳ 今日 ChatGPT 免费额度已用完，请明天再试或升级 VIP 获取无限制使用。",

    // --- VIP ---
    vip_panel: "✨ VIP 套餐：请选择一个套餐开通高级功能。",
    vip_activated: "🎉 VIP 已开通！高级功能现已解锁。",
    vip_expired: "⚠️ 你的 VIP 已过期，高级功能已关闭。",

    // --- 子机器人绑定 ---
    ask_token: "请发送你的 Telegram Bot Token：\n格式类似：`123456:ABC-123`",
    invalid_token: "❗ Token 无效，请检查后重新发送。",
    max_bots_limit: "⚠️ 绑定数量已达上限，请升级更高 VIP 套餐。",

    // --- ChatGPT ---
    ai_replying: "🤖 正在思考中，请稍等…",

    // --- 推广 ---
    referral_info: (clicks: number, invited: number, income: number) =>
      `📣 推广中心\n\n点击：${clicks}\n注册：${invited}\n收益：${income} USDT`,
  },

  en: {
    // --- General ---
    start: "Welcome! Please bind your Bot Token first to begin.",
    need_bind: "❗ You haven't bound a bot yet. Please send your Bot Token.",
    bind_success: "🎉 Bot successfully bound! Basic functions unlocked.",
    vip_only: "⚠️ This feature is VIP only. Please purchase a VIP plan.",
    language_switched: "🌐 Language has been switched to English.",
    menu: "Please choose a function:",
    chat_limit: "⏳ Today's free ChatGPT quota is used up. Try again tomorrow or upgrade to VIP.",

    // --- VIP ---
    vip_panel: "✨ VIP Plans: Choose one to unlock advanced features.",
    vip_activated: "🎉 VIP Activated! All advanced functions unlocked.",
    vip_expired: "⚠️ Your VIP has expired. Advanced functions disabled.",

    // --- Bind Bot ---
    ask_token: "Please send your Telegram Bot Token:\nFormat: `123456:ABC-123`",
    invalid_token: "❗ Invalid Token. Please check and resend.",
    max_bots_limit: "⚠️ You have reached your binding limit. Upgrade VIP to add more bots.",

    // --- ChatGPT ---
    ai_replying: "🤖 Thinking… Please wait.",

    // --- Referral ---
    referral_info: (clicks: number, invited: number, income: number) =>
      `📣 Referral Center\n\nClicks: ${clicks}\nInvited: ${invited}\nIncome: ${income} USDT`,
  },
};

// 默认语言（可修改）
export const DEFAULT_LANG: LangCode = "zh";

