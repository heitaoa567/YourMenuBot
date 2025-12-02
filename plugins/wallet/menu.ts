// ==================================================================
//                    plugins/wallet/menu.ts
//      钱包主菜单（余额 / 充值 / 提现 / 交易记录）
// ==================================================================

import type { InlineKeyboardMarkup } from "../../types.ts";
import { T } from "../lang/index.ts"; 
import { getUser } from "../../db/userdb.ts";

export async function walletMenu(uid: number): Promise<InlineKeyboardMarkup> {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  return {
    inline_keyboard: [
      [{ text: T(lang, "wallet_balance"), callback_data: "wallet_balance" }],
      [{ text: T(lang, "wallet_deposit"), callback_data: "wallet_deposit" }],
      [{ text: T(lang, "wallet_withdraw"), callback_data: "wallet_withdraw" }],
      [{ text: T(lang, "wallet_records"), callback_data: "wallet_records" }],
      [{ text: T(lang, "back"), callback_data: "back_main" }],
    ]
  };
}

