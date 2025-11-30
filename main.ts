// ==========================================
//              YourMenuBot main.ts
// ==========================================

import { handleCallback, handleMessage, handleMenu } from "./libs/core/router.ts";
import { Plugins } from "./libs/core/plugins.ts";

// 自动加载所有插件
import "./plugins/wallet/index.ts";
import "./plugins/vip/index.ts";
import "./plugins/affiliate/index.ts";
import "./plugins/ads/index.ts";
import "./plugins/supply/index.ts";
import "./plugins/subbot/index.ts";
import "./plugins/ai/index.ts";
import "./plugins/lang/index.ts";

import { TG } from "./config.ts";
import { getUser, saveUser } from "./db/userdb.ts";
import { addDepositRequest } from "./plugins/wallet/deposit.ts";
import { onWithdrawAddress, onWithdrawAmount } from "./plugins/wallet/withdraw.ts";

// ==========================================
//         统一发送函数（全局可调用）
// ==========================================
export async function send(chatId: number, text: string, keyboard?: any) {
  await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      reply_markup: keyboard
    }),
  });
}

// ==========================================
//             Webhook 主入口
// ==========================================
Deno.serve(async (req) => {

  const update = await req.json().catch(() => null);
  if (!update) return new Response("OK");

  // ===============================
  //       Callback 按钮事件
  // ===============================
  if (update.callback_query) {
    const cq = update.callback_query;
    const chatId = cq.message.chat.id;
    const data = cq.data;

    await handleCallback(chatId, data);
    return new Response("OK");
  }

  // ===============================
  //       普通消息事件
  // ===============================
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text || "";

    const user = await getUser(chatId);

    // 提现流程状态机
    if (user.withdraw_step === "await_address") {
      await onWithdrawAddress(chatId, text);
      return new Response("OK");
    }

    if (user.withdraw_step === "await_amount") {
      await onWithdrawAmount(chatId, text);
      return new Response("OK");
    }

    // 充值：pay TxID
    if (text.startsWith("pay ")) {
      const txid = text.split(" ")[1];
      const msg = await addDepositRequest(chatId, txid);
      await send(chatId, msg);
      return new Response("OK");
    }

    // 其他文本 → 交给插件
    await handleMessage(chatId, text);
    return new Response("OK");
  }

  return new Response("OK");
});
