// ========================================
//         Wallet 按钮事件处理
//     /plugins/wallet/callback.ts
// ========================================

import { walletMenu } from "./menu.ts";
import { getUser, saveUser } from "../../db/userdb.ts";
import { addDepositRequest } from "./deposit.ts";
import { startWithdrawFlow } from "./withdraw.ts";
import { getLedgerPage } from "./ledger.ts";
import { getPromotionCenter } from "../affiliate/center.ts"; 
import { TG } from "../../main.ts";

async function send(chatId: number, text: string, keyboard?: any) {
  await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    }),
  });
}

export async function walletOnCallback(chatId: number, data: string) {
  
  // ============= 钱包首页 =============
  if (data === "wallet") {
    const menu = await walletMenu(chatId);
    await send(chatId, menu.text, menu.keyboard);
    return "handled";
  }

  // ============= 充值 =============
  if (data === "wallet_deposit") {
    const address = Deno.env.get("USDT_ADDRESS") || "未设置地址";

    const msg = 
`💳 *充值 USDT（TRC20）*

请向下方地址支付任意数量 USDT：

\`${address}\`

支付完成后发送：

\`pay 你的TxID\``;

    await send(chatId, msg);
    return "handled";
  }

  // ============= 提现（开启流程） =============
  if (data === "wallet_withdraw") {
    await startWithdrawFlow(chatId);
    return "handled";
  }

  // ============= 账单中心 =============
  if (data === "wallet_ledger") {
    const page = await getLedgerPage(chatId);
    await send(chatId, page.text, page.keyboard);
    return "handled";
  }

  // ============= 推广收益中心 =============
  if (data === "wallet_aff") {
    const msg = await getPromotionCenter(chatId);
    await send(chatId, msg.text, msg.keyboard);
    return "handled";
  }

  return "ok";
}

