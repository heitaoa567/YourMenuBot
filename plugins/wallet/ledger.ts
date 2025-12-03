// ======================================================================
//                      plugins/wallet/ledger.ts
//                      财务记录（充值 / 消费）
// ======================================================================

import { getLedger } from "../../db/walletdb.ts";
import { sendText } from "../../core/send.ts";

export async function showLedger(uid: number) {
  const list = await getLedger(uid);

  if (list.length === 0) {
    await sendText(uid, "📄 暂无财务记录");
    return;
  }

  let txt = "📜 <b>财务明细</b>\n\n";

  list.forEach((it) => {
    txt += `${new Date(it.time).toLocaleString()} - ${it.type} - ${it.amount} USDT\n`;
  });

  await sendText(uid, txt);
}

