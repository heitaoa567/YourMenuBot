// ======================================================================
//                             db/vipdb.ts
//               VIP 订阅数据库（记录所有充值与套餐）
// ======================================================================

import { VipRecord } from "../types.ts";

const FILE = "./db/data/vip.json";

let cache: VipRecord[] = [];


// ======================================================================
//                            load DB
// ======================================================================
async function loadDB() {
  try {
    const text = await Deno.readTextFile(FILE);
    cache = JSON.parse(text);
  } catch {
    console.warn("⚠️ vip.json 不存在，正在创建...");
    cache = [];
    await saveDB();
  }
}


// ======================================================================
//                            save DB
// ======================================================================
async function saveDB() {
  await Deno.writeTextFile(FILE, JSON.stringify(cache, null, 2));
}


// ======================================================================
//                   新增一条 VIP 记录（充值成功）
// ======================================================================
export async function addVipRecord(rec: VipRecord) {
  if (cache.length === 0) await loadDB();
  cache.push(rec);
  await saveDB();
}


// ======================================================================
//                     获取用户所有 VIP 订阅记录
// ======================================================================
export async function getVipRecords(uid: number): Promise<VipRecord[]> {
  if (cache.length === 0) await loadDB();
  return cache.filter((x) => x.user_id === uid);
}


// ======================================================================
//                获取用户最近的一次 VIP 记录（常用）
// ======================================================================
export async function getLatestVip(uid: number): Promise<VipRecord | null> {
  const list = await getVipRecords(uid);
  if (list.length === 0) return null;

  return list.sort((a, b) => b.start - a.start)[0];
}


// ======================================================================
//                VIP 延期（重新计算 vip_until）
// ======================================================================
export async function extendVip(
  uid: number,
  days: number,
  txid: string | null = null
) {
  const now = Date.now();
  const end = now + days * 86400000;

  // 新纪录
  const rec: VipRecord = {
    user_id: uid,
    plan: `${days}_days`,
    amount: 0,
    start: now,
    end,
    txid: txid || undefined,
  };

  await addVipRecord(rec);
  return end;
}


// ======================================================================
//                  管理员：获取所有 VIP 订单
// ======================================================================
export async function getAllVipOrders(): Promise<VipRecord[]> {
  if (cache.length === 0) await loadDB();
  return cache;
}

