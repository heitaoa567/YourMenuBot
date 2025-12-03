// ======================================================================
//                             db/userdb.ts
//      主机器人用户数据库（语言 / VIP / 推广 / 钱包 / AI 等）
// ======================================================================

import { UserData } from "../types.ts";

const FILE = "./db/data/users.json";

// 内存缓存（减少磁盘 I/O）
let cache: Record<number, UserData> = {};


// ======================================================================
//                        读取数据库文件
// ======================================================================
async function loadDB() {
  try {
    const text = await Deno.readTextFile(FILE);
    cache = JSON.parse(text);
  } catch {
    console.warn("⚠️ users.json 不存在，正在创建...");
    cache = {};
    saveDB();
  }
}


// ======================================================================
//                        保存数据库文件
// ======================================================================
export async function saveDB() {
  await Deno.writeTextFile(FILE, JSON.stringify(cache, null, 2));
}


// ======================================================================
//                        获取用户数据（自动初始化）
// ======================================================================
export async function getUser(uid: number): Promise<UserData> {
  if (Object.keys(cache).length === 0) {
    await loadDB();
  }

  if (!cache[uid]) {
    cache[uid] = {
      id: uid,
      lang: "en",
      created_at: 0,
      vip_until: 0,

      ai: { start: 0, used: 0 },
      daily: {},

      referral_code: "",
      ref_by: 0,
      referral_children: [],
      referral_income: 0,

      wallet: { balance: 0, ledger: [] },

      subbots: [],
    };
    saveDB();
  }

  return cache[uid];
}


// ======================================================================
//                       保存单个用户数据
// ======================================================================
export async function saveUser(uid: number, data: UserData) {
  cache[uid] = data;
  await saveDB();
}


// ======================================================================
//                     获取所有用户（用于广播）
// ======================================================================
export async function getAllUsers(): Promise<number[]> {
  if (Object.keys(cache).length === 0) {
    await loadDB();
  }
  return Object.keys(cache).map((x) => Number(x));
}

