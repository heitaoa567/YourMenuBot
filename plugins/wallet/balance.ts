// ========================================
//          Wallet - 余额工具模块
//       /plugins/wallet/balance.ts
// ========================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { addLedgerRecord } from "./ledger.ts";

// 格式化数字（保留2位小数）
export function formatBalance(num: number) {
  return Number(num).toFixed(2);
}

// =============================
//     增加余额（充值 / 收益）
// =============================
export async function addBalance(uid: number, amount: number, detail: string = "余额增加") {
  const user = await getUser(uid);

  if (!user.balance) user.balance = 0;

  user.balance += amount;
  user.balance = Number(user.balance.toFixed(6)); // 避免浮点误差

  await saveUser(uid, user);

  // 写账单记录
  await addLedgerRecord(uid, {
    type: "deposit",
    amount,
    detail,
    timestamp: Date.now(),
  });
}

// =============================
//      扣除余额（消费）
// =============================
export async function subBalance(uid: number, amount: number, detail: string = "余额扣除") {
  const user = await getUser(uid);

  if (!user.balance || user.balance < amount) {
    throw new Error("余额不足");
  }

  user.balance -= amount;
  user.balance = Number(user.balance.toFixed(6)); // 避免浮点误差

  await saveUser(uid, user);

  // 写账单记录
  await addLedgerRecord(uid, {
    type: "spend",
    amount: -amount,
    detail,
    timestamp: Date.now(),
  });
}

// =============================
//     获取余额（工具方法）
// =============================
export async function getBalance(uid: number) {
  const user = await getUser(uid);
  return Number(user.balance || 0);
}

