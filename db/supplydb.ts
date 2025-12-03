// ======================================================================
//                           db/supplydb.ts
//                    供需系统（发布 / 置顶 / 浏览量）
// ======================================================================

import { SupplyItem } from "../types.ts";

const FILE = "./db/data/supply.json";

// 内存缓存
let supply: Record<number, SupplyItem> = {};


// ======================================================================
//                      加载数据库
// ======================================================================
async function loadDB() {
  try {
    const text = await Deno.readTextFile(FILE);
    supply = JSON.parse(text);
  } catch {
    console.warn("⚠️ supply.json 不存在，正在创建...");
    supply = {};
    await saveDB();
  }
}


// ======================================================================
//                      保存数据库
// ======================================================================
async function saveDB() {
  await Deno.writeTextFile(FILE, JSON.stringify(supply, null, 2));
}


// ======================================================================
//                    发布供需（新增）
// ======================================================================
export async function addSupply(item: SupplyItem) {
  if (Object.keys(supply).length === 0) await loadDB();

  const id = Date.now();
  supply[id] = {
    id,
    uid: item.uid,
    type: item.type,       // supply / demand
    title: item.title,
    content: item.content,
    created_at: Date.now(),
    views: 0,
    top: false,            // VIP 置顶
    top_until: 0,
  };

  await saveDB();
  return id;
}


// ======================================================================
//                    VIP 置顶（天数可扩展）
// ======================================================================
export async function setTop(id: number, days: number) {
  if (Object.keys(supply).length === 0) await loadDB();

  if (!supply[id]) return false;

  const now = Date.now();
  const ms = days * 24 * 60 * 60 * 1000;

  supply[id].top = true;
  supply[id].top_until = now + ms;

  await saveDB();
  return true;
}


// ======================================================================
//                    增加浏览次数（排序依据）
// ======================================================================
export async function addView(id: number) {
  if (Object.keys(supply).length === 0) await loadDB();

  if (!supply[id]) return false;

  supply[id].views += 1;
  await saveDB();
  return true;
}


// ======================================================================
//                    删除供需（用户或管理员）
// ======================================================================
export async function deleteSupply(id: number, uid?: number) {
  if (Object.keys(supply).length === 0) await loadDB();

  if (!supply[id]) return false;

  // 用户只能删除自己的
  if (uid && supply[id].uid !== uid) return false;

  delete supply[id];
  await saveDB();
  return true;
}


// ======================================================================
//         获取供需列表（根据置顶 + 时间 + 浏览量排序）
// ======================================================================
export async function getSupplyList() {
  if (Object.keys(supply).length === 0) await loadDB();

  const now = Date.now();

  const list = Object.values(supply).filter(item => {
    // 自动取消过期置顶
    if (item.top && item.top_until < now) {
      item.top = false;
      item.top_until = 0;
    }
    return true;
  });

  // 排序：置顶 > 浏览量 > 时间
  list.sort((a, b) => {
    if (a.top && !b.top) return -1;
    if (!a.top && b.top) return 1;

    if (b.views !== a.views) return b.views - a.views;

    return b.created_at - a.created_at;
  });

  return list;
}


// ======================================================================
//            按用户获取供需（个人中心 / 用户管理）
// ======================================================================
export async function getUserSupply(uid: number) {
  if (Object.keys(supply).length === 0) await loadDB();

  return Object.values(supply).filter(item => item.uid === uid);
}

