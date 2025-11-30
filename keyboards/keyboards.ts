// keyboards.ts 按钮键盘模块

// 主菜单按钮
export function mainMenu(lang: string = "zh") {
  return {
    inline_keyboard: [
      [{ text: "🤖 ChatGPT智能助理", callback_data: "ai" }],
      [{ text: "🧩 绑定子机器人", callback_data: "bind_bot" }],
      [{ text: "📂 我的子机器人", callback_data: "my_bots" }],
      [{ text: "💎 开通 VIP", callback_data: "vip" }],
      [{ text: "📣 推广中心", callback_data: "referral" }],
      [{ text: "🔥 充值 USDT 开通 VIP", callback_data: "buy_vip" }],
      [{ text: "🌐 切换语言", callback_data: "lang" }],
    ]
  };
}

// 语言切换菜单
export function languageMenu() {
  return {
    inline_keyboard: [
      [{ text: "中文", callback_data: "set_lang_zh" }],
      [{ text: "English", callback_data: "set_lang_en" }],
      [{ text: "返回菜单", callback_data: "back" }],
    ]
  };
}

// VIP 套餐
export function vipMenu() {
  return {
    inline_keyboard: [
      [{ text: "周卡（5U）", callback_data: "vip_week" }],
      [{ text: "月卡（10U）", callback_data: "vip_month" }],
      [{ text: "季卡（25U）", callback_data: "vip_season" }],
      [{ text: "年卡（80U）", callback_data: "vip_year" }],
      [{ text: "返回菜单", callback_data: "back" }],
    ]
  };
}

// 推广中心菜单
export function referralMenu(refLink: string, total: number) {
  return {
    inline_keyboard: [
      [{ text: `你的推广链接`, url: refLink }],
      [{ text: `已邀请 ${total} 人`, callback_data: "none" }],
      [{ text: "返回菜单", callback_data: "back" }],
    ]
  };
}
