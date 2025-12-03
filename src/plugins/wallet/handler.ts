// ======================================================================
//                     plugins/wallet/handler.ts
//                   用户输入指令触发钱包功能
// ======================================================================

import { handleTxid } from "./deposit.ts";
import { handleWithdraw } from "./withdraw.ts";

export async function onWalletMessage(uid: number, text: string) {
  // pay xxx
  if (text.startsWith("pay")) {
    const txid = text.split(" ")[1];
    if (!txid) return true;
    await handleTxid(uid, txid);
    return true;
  }

  // withdraw 金额 地址
  if (text.startsWith("withdraw")) {
    const arr = text.split(" ");
    if (arr.length !== 3) return true;
    const amount = Number(arr[1]);
    const addr = arr[2];

    await handleWithdraw(uid, amount, addr);
    return true;
  }

  return false;
}
