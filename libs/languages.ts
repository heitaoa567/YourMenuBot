// ==========================================
//            languages.ts
//      YourMenuBot 多语言系统
// ==========================================

export const LANG: any = {
  zh: {
    // ========================== 基本 ==========================
    welcome: `
👋 *欢迎来到 YourMenuBot*

我是一个多功能机器人，提供以下能力：

✨ AI 智能聊天（普通用户每天 30 分钟）
👑 VIP 无限聊天服务
🤖 子机器人绑定系统（生成你自己的机器人）
💰 USDT 充值开通 VIP
📣 推广中心（分享即可赚钱）
🌍 多语言支持（中/英）

点击菜单开始体验👇
    `,
    menu: "请选择你需要的功能：",

    // ========================== 语言 ==========================
    choose_lang: "请选择语言：",
    lang_switched: "语言切换成功 ✓",

    // ========================== AI ==========================
    ai_limit: `
⏱️ 你的 AI 使用时间已用完（普通用户每天 30 分钟）

🔥 开通 VIP 即可无限畅聊  
输入 /vip 查看套餐
    `,

    // ========================== VIP ==========================
    vip_title: `
👑 *YourMenuBot VIP 套餐*

选择你想开通的 VIP 时长：
    `,

    vip_pay_tip: (address: string) => `
💳 *USDT 充值说明（TRC20）*

请将 USDT 发送到以下地址：

\`${address}\`

发送成功后复制交易哈希（txid）发送给我：

格式示例：
\`pay your_txid_here\`

系统会自动为你开通对应 VIP 套餐。
    `,

    pay_format_error: "❌ 请使用正确格式：`pay txid`",
    tx_invalid: "❌ 无效的交易哈希（txid），请检查后重新发送",

    vip_extended: (days: number) => `🎉 VIP 已成功开通！有效期增加：${days} 天`,

    // ========================== 推广 ==========================
    referral_panel: (info: any) => `
📣 *推广中心*

这是你的专属推广链接👇
${info.link}

📊 推广数据：
• 点击次数：*${info.clicks}*
• 注册成功：*${info.regs}*
• 推广收益：*${info.income} U*

发送你的邀请链接并分享给朋友即可获得更多收益！
    `,

    // ========================== 子机器人 ==========================
    send_token: `
🔧 请发送你子机器人的 Token：

格式示例：
\`123456789:ABCDEF...\`

绑定成功后将出现在你的子机器人列表中。
    `,

    token_invalid: "❌ Token 格式错误，请重新发送",
    subbot_bind_success: "🤖 子机器人绑定成功！",

    // ========================== 充值 ==========================
    recharge_title: "💳 USDT 充值开通 VIP：",
    recharge_wait: "请稍等，正在验证交易...",

    // ========================== 返回 ==========================
    back: "返回主菜单"
  },

  // ================================================================
  //                         英文语言包
  // ================================================================
  en: {
    welcome: `
👋 *Welcome to YourMenuBot*

This bot offers:

✨ AI Chat (30 minutes/day for free users)
👑 Unlimited VIP AI Chat
🤖 Sub-Bot Binding (create your own bot)
💰 USDT Recharge for VIP
📣 Referral Center (earn income)
🌍 Multi-language support (EN/CN)

Use the menu below to start:
    `,
    menu: "Choose an option below:",

    choose_lang: "Choose your language:",
    lang_switched: "Language switched ✓",

    ai_limit: `
⏱️ Your free AI usage limit has been reached (30 min/day).

🔥 Upgrade to VIP for unlimited access.
Type /vip to view plans.
    `,

    vip_title: `
👑 *YourMenuBot VIP Plans*

Select the VIP duration you wish to purchase:
    `,

    vip_pay_tip: (address: string) => `
💳 *USDT Payment Instructions (TRC20)*

Please send USDT to the following address:

\`${address}\`

After payment, send your transaction hash (txid) in this format:

\`pay your_txid_here\`

VIP will be activated automatically after verification.
    `,

    pay_format_error: "❌ Please use correct format: `pay txid`",
    tx_invalid: "❌ Invalid txid. Please check and resend.",
    vip_extended: (days: number) => `🎉 VIP extended successfully! +${days} days added.`,

    referral_panel: (info: any) => `
📣 *Referral Center*

Your personal referral link:
${info.link}

📊 Statistics:
• Clicks: *${info.clicks}*
• Registrations: *${info.regs}*
• Earnings: *${info.income} U*

Share your link to earn more!
    `,

    send_token: `
🔧 Please send your Sub-Bot Token:

Example:
\`123456789:ABCDEF...\`

It will appear in your bot list after binding.
    `,

    token_invalid: "❌ Invalid token format. Please send again.",
    subbot_bind_success: "🤖 Sub-Bot successfully linked!",

    recharge_title: "💳 USDT Recharge & VIP Activation:",
    recharge_wait: "Please wait, verifying transaction...",

    back: "Back to main menu"
  }
};
