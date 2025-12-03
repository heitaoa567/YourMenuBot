// ======================================================================
//                     plugins/wallet/balance.ts
//                        查询钱包余额
// ======================================================================

import { getBalance } from "../../db/walletdb.ts";
import { sendText } from "../../core/send.ts";

export async function showBalance(uid: number) {
  const bal = await getBalance(uid);
  await sendText(uid, `💰 当前余额：<b>${bal} USDT</b>`);
}
