// ======================================
//               walletdb.ts
//   USDT 钱包数据库（余额 / 充值 / 提现 / 账本）
// ======================================

import { getUser, updateUser } from "./userdb.ts";

export interface DepositRecord {
  id: string;
  chat_id: number;
  txid: string;
  amount: number;
  confirmed: boolean;
  created_at: number;
}

export interface WithdrawRecord {
  id: string;
  chat_id: number;
  address: string;
  amount: number;
  fee: number;
  status: "pending" | "approved" | "rejected";
  created_at: number;
}

export interface LedgerRecord {
  id: string;
  chat_id: number;
  type: "deposit" | "withdraw" | "vip" | "reward";
  amount: number;
  created_at: number;
}

const kv = await Deno.openKv();

// =============================
// 生成订单编号
// =============================
function genId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 99999)}`;
}

// =============================
// 获取用户余额
// =============================
export async function getBalance(chatId: number) {
  const user = await getUser(chatId);
  return user.wallet_balance || 0;
}

// =============================
// 更新余额
// =============================
export async function setBalance(chatId: number, amount: number) {
  await updateUser(chatId, { wallet_balance: amount });
}

// =============================
// 增加余额（充值成功）
// =============================
export async function addBalance(chatId: number, amount: number) {
  const bal = await getBalance(chatId);
  await updateUser(chatId, { wallet_balance: bal

