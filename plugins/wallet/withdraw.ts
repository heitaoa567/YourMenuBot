// ========================================
//             Wallet - 提现模块
//       /plugins/wallet/withdraw.ts
// ========================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { addLedgerRecord } from "./ledger.ts";
import { addBalance } from "./balance.ts";
import { TG } from "../../main.ts";

const ADMIN_ID = Number(Deno.env.get("ADMIN_ID") || "0");

// 通用发送函数
async function send(chatId: number, text: string) {
  await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });
}

// =============================
//  用户点击提现按钮 → 开始流程
// =============================
export async function startWithdrawFlow(chatId: number) {
  const user = await getUser(chatId);

  if ((user.balance || 0) <= 0) {
    await send(chatId, "❌ 你的余额不足，无法提现。");
    return;
  }

  user.withdraw_step = "await_address";
  await saveUser(chatId, user);

  await send(chatId, 
`💸 *提现申请开始*

请输入你的 USDT-TRC20 提现地址：`);
}

// =============================
// 用户输入提现地址
// =============================
export async function onWithdrawAddress(chatId: number, text: string) {
  const user = await getUser(chatId);

  user.withdraw_address = text.trim();
  user.withdraw_step = "await_amount";
  await saveUser(chatId, user);

  await send(chatId,
`请输入提现金额（USDT）：

当前余额：${user.balance} USDT`);
}

// =============================
// 用户输入提现金额
// =============================
export async function onWithdrawAmount(chatId: number, text: string) {
  const user = await getUser(chatId);
  const amount = Number(text.trim());

  if (isNaN(amount) || amount <= 0) {
    await send(chatId, "❌ 金额无效，请输入一个数字。");
    return;
  }

  if (amount > (user.balance || 0)) {
    await send(chatId, "❌ 提现金额不能超过余额。");
    return;
  }

  // 创建提现申请
  const request = {
    uid: chatId,
    amount,
    address: user.withdraw_address,
    timestamp: Date.now(),
    status: "pending",
  };

  if (!user.withdraw_requests) user.withdraw_requests = [];
  user.withdraw_requests.push(request);

  // 暂时冻结这笔钱（锁定余额）
  user.balance -= amount;
  await saveUser(chatId, user);

  // 通知用户
  await send(chatId,
`📝 *提现申请已提交*

金额：${amount} USDT
地址：\`${user.withdraw_address}\`

请等待管理员审核处理。`);

  // 通知管理员
  await send(ADMIN_ID,
`🔔 *新的提现审核*

用户：${chatId}
金额：${amount} USDT
地址：${user.withdraw_address}

使用指令：
approve_withdraw ${chatId} ${amount}`);
}

// =============================
//   管理员确认提现（手动）
// =============================
export async function adminApproveWithdraw(uid: number, amount: number) {
  const user = await getUser(uid);

  await send(uid, 
`💸 *提现已成功发送*

金额：${amount} USDT
请检查你的钱包。`);

  // 写入账单
  await addLedgerRecord(uid, {
    type: "withdraw",
    amount: -amount,
    detail: "提现成功",
    timestamp: Date.now(),
  });

  return "提现记录已完成。";
}

