// ======================================================================
//                           db/walletdb.ts
//                     用户钱包系统（USDT）
// ======================================================================

import { WalletData, WalletRecord } from "../types.ts";

const FILE = "./db/data/wallet.json";

// 内存缓存
let cache: Record<number, WalletData> = {};


// ======================================================================
//                      加载数据库
// ======================================================================
async function loadDB() {
  try {
    const text = await Deno.readTextFile(FILE);
    cache = JSON.parse(text);
  } catch {
    console.warn("⚠️ wallet.json 不存在，正在创建...");
    cache = {};
    await saveDB();
  }
}


// ======================================================================
//                      保存数据库
// ======================================================================
async function saveDB() {
  await Deno.writeTextFile(FILE, JSON.stringify(cache, null, 2));
}


// ======================================================================
//                获取钱包（无则自动创建）
// ======================================================================
export async function getWallet(uid: number): Promise<WalletData> {
  if (Object.keys(cache).length === 0) await loadDB();

  if (!cache[uid]) {
    cache[uid] = {
      uid,
      balance: 0,
      records: [],       // 交易记录
      pending: [],       // 待审核提现
      created_at: Date.now(),
    };
    await saveDB();
  }

  return cache[uid];
}


// ======================================================================
//                  增加余额（充值 / 返点等）
// ======================================================================
export async function addBalance(
  uid: number,
  amount: number,
  note = "Recharge"
) {
  const w = await getWallet(uid);

  w.balance += amount;
  w.records.push({
    amount,
    note,
    type: "income",
    time: Date.now(),
  });

  await saveDB();
}


// ======================================================================
//                  扣除余额（购买 VIP / 提现）
// ======================================================================
export async function reduceBalance(
  uid: number,
  amount: number,
  note = "Payment"
): Promise<boolean> {
  const w = await getWallet(uid);

  if (w.balance < amount) return false;

  w.balance -= amount;
  w.records.push({
    amount: -amount,
    note,
    type: "expense",
    time: Date.now(),
  });

  await saveDB();
  return true;
}


// ======================================================================
//                    提现申请（进入待审核）
// ======================================================================
export async function addWithdrawRequest(
  uid: number,
  amount: number,
  address: string
): Promise<boolean> {
  const w = await getWallet(uid);

  if (w.balance < amount) return false;

  w.pending.push({
    uid,
    amount,
    address,
    status: "pending",
    time: Date.now(),
  });

  // 不立即扣除余额，管理员审核后再扣
  await saveDB();
  return true;
}


// ======================================================================
//              管理员：同意提现（正式扣费）
// ======================================================================
export async function approveWithdraw(uid: number, index: number) {
  const w = await getWallet(uid);
  const req = w.pending[index];

  if (!req) return false;

  if (w.balance < req.amount) return false;

  // 扣费
  w.balance -= req.amount;

  w.records.push({
    amount: -req.amount,
    note: "USDT Withdraw",
    type: "expense",
    time: Date.now(),
  });

  req.status = "done";
  await saveDB();
  return true;
}


// ======================================================================
//              管理员：拒绝提现（不扣费）
// ======================================================================
export async function rejectWithdraw(uid: number, index: number) {
  const w = await getWallet(uid);
  const req = w.pending[index];

  if (!req) return false;

  req.status = "rejected";
  await saveDB();
  return true;
}


// ======================================================================
//              获取所有提现申请（给后台用）
// ======================================================================
export async function getAllWithdrawRequests() {
  if (Object.keys(cache).length === 0) await loadDB();

  const all: any[] = [];
  for (const uid in cache) {
    const w = cache[uid];
    w.pending.forEach((p: any, idx: number) => {
      all.push({
        uid,
        index: idx,
        ...p,
      });
    });
  }
  return all;
}

