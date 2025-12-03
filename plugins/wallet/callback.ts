// ======================================================================
//                   plugins/wallet/callback.ts
//               钱包菜单回调（充值 / 提现 / 明细）
// ======================================================================

import { onDeposit } from "./deposit.ts";
import { onWithdraw } from "./withdraw.ts";
import { showLedger } from "./ledger.ts";
import { walletMenu } from "./menu.ts";
import { getBalance } from "../../db/walletdb.ts";
import { sendText } from "../../core/send.ts";

export async function onWalletCallback(uid: number, data: string) {
  if (data === "wallet_menu") {
    const bal = await getBalance(uid);
    const { text, keyboard } = walletMenu(bal);
    await sendText(uid, text, keyboard);
    return true;
  }

  if (data === "wallet_deposit") {
    await onDeposit(uid);
    return true;
  }

  if (data === "wallet_withdraw") {
    await onWithdraw(uid);
    return true;
  }

  if (data === "wallet_ledger") {
    await showLedger(uid);
    return true;
  }

  return false;
}

