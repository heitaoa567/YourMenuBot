// ======================================================================
//                      plugins/wallet/deposit.ts
//               充值 USDT → 用户发送 pay TXID 自动到账
// ======================================================================

import { addBalance } from "../../db/walletdb.ts";
import { sendText } from "../../core/send.ts";
import { walletMenu } from "./menu.ts";

const USDT_ADDRESS = Deno.env.get("USDT_ADDRESS") || "TEJTdBXKK49CuSnoh2GnCgmXr6sbCDXJHh";

export async function onDeposit(uid: number) {
  await sendText(
    uid,
    `💰 <b>充值 USDT</b>\n\n请将 USDT-TRC20 转入以下地址：\n<code>${USDT_ADDRESS}</code>\n\n付款后发送：\n<code>pay TXID</code>\n例如：pay 123abc`,
  );
}

export async function handleTxid(uid: number, txid: string) {
  // TODO: 未来可接 API 自动验证 TRON 链交易

  // 先默认成功到账（你后面可接链上API）
  await addBalance(uid, 0); // 暂时不加钱（你决定是否自动入账）

  await sendText(uid, "⏳ 已收到交易 TXID，请等待管理员审核后入账。");
}
