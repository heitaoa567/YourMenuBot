// ==================================================================
//                    plugins/wallet/balance.ts
//              显示钱包余额 / VIP 到期 / 推广收益
// ==================================================================

import { getUser } from "../../db/userdb.ts";
import { getWallet } from "../../db/walletdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts";
import { isVIP } from "../../core/permissions.ts";

export async function showBalance(uid: number) {
  const user = await getUser(uid);
  const wallet = await getWallet(uid);

  const lang = user.lang || "en";

  const vip = isVIP(user)
    ? `✅ VIP\n⏳ Expire: ${new Date(user.vip_until).toLocaleString()}`
    : `❌ Not VIP`;

  const text = [
    `💰 <b>${T(lang, "wallet_balance_title")}</b>`,
    "",
    `💵 <b>${T(lang, "wallet_balance")}: ${wallet.balance.toFixed(2)} USDT</b>`,
    "",
    `⭐ VIP Status:`,
    vip,
    "",
    `🪙 ${T(lang, "wallet_referral_income")}: ${wallet.referral_income.toFixed(2)} USDT`,
    "",
    `📜 ${T(lang, "wallet_records_tip")}`,
  ].join("\n");

  const keyboard = {
    inline_keyboard: [
      [{ text: T(lang, "wallet_records"), callback_data: "wallet_records" }],
      [{ text: T(lang, "wallet_deposit"), callback_data: "wallet_deposit" }],
      [{ text: T(lang, "wallet_withdraw"), callback_data: "wallet_withdraw" }],
      [{ text: T(lang, "back"), callback_data: "back_main" }]
    ]
  };

  await sendText(uid, text, keyboard);
}

