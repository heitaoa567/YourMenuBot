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
  desc?: string;
  created_at: number;
}

const kv = await Deno.openKv();

// ======================================
// 工具：生成订单 ID
// ======================================
function genId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 99999)}`;
}

// ======================================
// 基础余额功能
// ======================================
export async function getBalance(chatId: number): Promise<number> {
  const user = await getUser(chatId);
  return user.wallet_balance || 0;
}

export async function setBalance(chatId: number, amount: number) {
  await updateUser(chatId, { wallet_balance: amount });
}

export async function addBalance(chatId: number, amount: number) {
  const bal = await getBalance(chatId);
  await updateUser(chatId, { wallet_balance: bal + amount });
}

export async function subBalance(chatId: number, amount: number) {
  const bal = await getBalance(chatId);
  await updateUser(chatId, { wallet_balance: Math.max(0, bal - amount) });
}

// ======================================
// 充值记录（Deposit）
// ======================================
export async function createDeposit(
  chatId: number,
  txid: string,
  amount: number
): Promise<DepositRecord> {
  const id = genId("deposit");
  const record: DepositRecord = {
    id,
    chat_id: chatId,
    txid,
    amount,
    confirmed: false,
    created_at: Date.now(),
  };

  await kv.set(["deposit", id], record);
  return record;
}

// 防止重复提交 TXID
export async function findDepositByTx(txid: string) {
  for await (const entry of kv.list<DepositRecord>({ prefix: ["deposit"] })) {
    if (entry.value && entry.value.txid === txid) return entry.value;
  }
  return null;
}

// 充值确认成功
export async function confirmDeposit(id: string) {
  const res = await kv.get<DepositRecord>(["deposit", id]);
  if (!res.value) return;

  const record = res.value;
  record.confirmed = true;

  await kv.set(["deposit", id], record);

  // 充值到账
  await addBalance(record.chat_id, record.amount);

  // 写入账本
  await addLedger(record.chat_id, "deposit", record.amount, "USDT充值到账");

  return true;
}

// 查询该用户所有充值
export async function listDeposits(chatId: number) {
  const list: DepositRecord[] = [];
  for await (const entry of kv.list<DepositRecord>({ prefix: ["deposit"] })) {
    if (entry.value && entry.value.chat_id === chatId) list.push(entry.value);
  }
  return list;
}

// ======================================
// 提现（Withdraw）
// ======================================
export async function createWithdraw(
  chatId: number,
  address: string,
  amount: number,
  fee = 1
): Promise<WithdrawRecord> {
  const id = genId("withdraw");

  const record: WithdrawRecord = {
    id,
    chat_id: chatId,
    address,
    amount,
    fee,
    status: "pending",
    created_at: Date.now(),
  };

  await kv.set(["withdraw", id], record);

  // 提现扣款（冻结）  
  await subBalance(chatId, amount + fee);

  // 账本
  await addLedger(chatId, "withdraw", -(amount + fee), "提现申请提交");

  return record;
}

// 审核提现
export async function updateWithdrawStatus(id: string, status: "approved" | "rejected") {
  const res = await kv.get<WithdrawRecord>(["withdraw", id]);
  if (!res.value) return;

  const record = res.value;
  record.status = status;
  await kv.set(["withdraw", id], record);

  if (status === "rejected") {
    // 退回余额
    await addBalance(record.chat_id, record.amount + record.fee);
    await addLedger(record.chat_id, "withdraw", record.amount + record.fee, "提现退回");
  }

  return record;
}

// 列出用户全部提现记录
export async function listWithdraws(chatId: number) {
  const list: WithdrawRecord[] = [];
  for await (const entry of kv.list<WithdrawRecord>({ prefix: ["withdraw"] })) {
    if (entry.value && entry.value.chat_id === chatId) list.push(entry.value);
  }
  return list;
}

// ======================================
// 账本 Ledger（每一笔资金变动）
// ======================================
export async function addLedger(
  chatId: number,
  type: LedgerRecord["type"],
  amount: number,
  desc?: string
) {
  const id = genId("ledger");
  const record: LedgerRecord = {
    id,
    chat_id: chatId,
    type,
    amount,
    desc,
    created_at: Date.now(),
  };

  await kv.set(["ledger", id], record);
}

export async function listLedger(chatId: number): Promise<LedgerRecord[]> {
  const list: LedgerRecord[] = [];
  for await (const entry of kv.list<LedgerRecord>({ prefix: ["ledger"] })) {
    if (entry.value && entry.value.chat_id === chatId) list.push(entry.value);
  }
  return list;
}

// ======================================
// 后台：列出所有余额不为0的用户
// ======================================
export async function listAllWallets() {
  const result: { chat_id: number; balance: number }[] = [];

  for await (const entry of kv.list({ prefix: ["user"] })) {
    const user = entry.value;
    if (user && user.wallet_balance && user.wallet_balance > 0) {
      result.push({ chat_id: user.chat_id, balance: user.wallet_balance });
    }
  }

  return result;
}
