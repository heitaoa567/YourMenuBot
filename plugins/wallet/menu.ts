// ========================================
//             Wallet 主菜单
//        /plugins/wallet/menu.ts
// ========================================

import { getUser } from "../../db/userdb.ts";
import { formatBalance } from "./balance.ts";

export async function walletMenu(chatId: number) {
  const user = await getUser(chatId);

  const balance = formatBalance(user.balance || 0);
  const refIncome = formatBalance(user.ref_income || 0);

  const text = 
`💰 *钱包中心（USDT）*
──────────────────
余额：*${balance} USDT*
推广收益：*${refIncome} USDT*

你可以使用余额购买 VIP / 广告位 / 置顶 / 子机器人功能等。
`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "💳 充值 USDT", callback_data: "wallet_deposit" }
      ],
      [
        { text: "💸 提现 USDT", callback_data: "wallet_withdraw" }
      ],
      [
        { text: "📄 我的账单", callback_data: "wallet_ledger" }
      ],
      [
        { text: "📈 推广收益中心", callback_data: "wallet_aff" }
      ],
      [
        { text: "🔙 返回主菜单", callback_data: "back" }
      ]
    ]
  };

  return { text, keyboard };
}

