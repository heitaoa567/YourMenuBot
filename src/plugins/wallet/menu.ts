// ======================================================================
//                      plugins/wallet/menu.ts
//                           钱包主菜单
// ======================================================================

export function walletMenu(balance: number = 0) {
  return {
    text: `💰 <b>我的钱包</b>\n\n可用余额：<b>${balance} USDT</b>`,
    keyboard: {
      inline_keyboard: [
        [
          { text: "➕ 充值 USDT", callback_data: "wallet_deposit" },
          { text: "📤 提现", callback_data: "wallet_withdraw" }
        ],
        [
          { text: "📜 财务明细", callback_data: "wallet_ledger" }
        ],
        [
          { text: "⬅️ 返回菜单", callback_data: "back_main" }
        ]
      ]
    }
  };
}
