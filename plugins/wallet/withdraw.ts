// ==================================================================
//                    plugins/wallet/withdraw.ts
//                    钱包提现（USDT - TRC20）
// ==================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { getWallet, saveWallet, pushRecord } from "../../db/walletdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts";
import { getPermissions } from "../../core/permissions.ts";


// ==================================================================
//               显示提现界面（回调：wallet_withdraw）
// ==================================================================
export async function showWithdraw(uid: number) {
  const user = await getUser(uid);
  const wallet = await getWallet(uid);
  const lang = user.lang || "en";

  const text = [
    `🏦 <b>${T(lang, "wallet_withdraw_title")}</b>`,
    ``,
    `${T(lang, "wallet_balance")}: <b>${wallet.balance} USDT</b>`,
    ``,
    `请输入提现指令：`,
    ``,
    `👉 <b>withdraw 金额 钱包地址</b>`,
    ``,
    `例如：`,
    `<code>withdraw 20 TJxxxxxxXY123...</code>`,
    ``,
    `将进入人工审核（VIP 优先处理）`,
  ].join("\n");

  const keyboard = {
    inline_keyboard: [
      [{ text: T(lang, "back"), callback_data: "back_main" }]
    ]
  };

  await sendText(uid, text, keyboard);
}



// ==================================================================
//                    处理提现请求 withdraw
//            用户发送： withdraw 20 TXXXXXXXXXXXXXXXX
// ==================================================================
export async function handleWithdraw(uid: number, parts: string[]) {
  const user = await getUser(uid);
  const wallet = await getWallet(uid);
  const lang = user.lang || "en";
  const perm = getPermissions(user); // 是否 VIP → 优先处理

  // 格式检查
  if (parts.length !== 3) {
    await sendText(uid, T(lang, "withdraw_format_error"));
    return;
  }

  const amount = Number(parts[1]);
  const address = parts[2];

  // 金额检查
  if (!amount || amount <= 0) {
    await sendText(uid, T(lang, "withdraw_invalid_amount"));
    return;
  }

  // 余额检查
  if (wallet.balance < amount) {
    await sendText(uid, T(lang, "withdraw_no_balance"));
    return;
  }

  // 地址格式（简单检查，未来可替换 Tron API）
  if (!address.startsWith("T") || address.length < 20) {
    await sendText(uid, T(lang, "withdraw_invalid_address"));
    return;
  }

  // 扣除余额
  wallet.balance -= amount;
  await saveWallet(uid, wallet);

  // 写入账单记录（状态：pending）
  await pushRecord(uid, {
    type: "withdraw",
    amount,
    address,
    status: "pending",
    vip_priority: perm.wallet_priority || false,
    time: Date.now(),
  });

  // 提现申请成功
  const text = [
    `📤 <b>${T(lang, "withdraw_submitted")}</b>`,
    ``,
    `金额：<b>${amount} USDT</b>`,
    `地址：<code>${address}</code>`,
    ``,
    perm.wallet_priority
      ? `⭐ VIP 用户 → <b>优先审核</b>`
      : `⏳ 普通用户 → 等待审核`,
    ``,
    `你可在【钱包 → 记录】查看状态。`
  ].join("\n");

  await sendText(uid, text);
}


