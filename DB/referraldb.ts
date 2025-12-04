// ======================================================================
//                         db/referraldb.ts
//                     推广系统（点击 / 注册 / 收益）
// ======================================================================

import { ReferralData } from "../types.ts";

const FILE = "./db/data/referral.json";

// 全局缓存
let referral: Record<number, ReferralData> = {};


// ======================================================================
//                        读取数据库
// ======================================================================
async function loadDB() {
  try {
    const txt = await Deno.readTextFile(FILE);
    referral = JSON.parse(txt);
  } catch {
    console.warn("⚠️ referral.json 不存在，正在创建...");
    referral = {};
    await saveDB();
  }
}


// ======================================================================
//                        保存数据库
// ======================================================================
async function saveDB() {
  await Deno.writeTextFile(FILE, JSON.stringify(referral, null, 2));
}


// ======================================================================
//                        初始化用户推广数据
// ======================================================================
export async function initReferral(uid: number) {
  await loadDB();

  if (!referral[uid]) {
    referral[uid] = {
      uid,
      clicks: 0,           // 推广链接点击量
      invites: 0,          // 成功注册数量
      income: 0,           // 返利收益（USDT）
      children: [],        // 下级用户id
    };

    await saveDB();
  }

  return referral[uid];
}


// ======================================================================
//                 记录推广点击（用户点进 /start X）
// ======================================================================
export async function addReferralClick(uid: number) {
  await loadDB();

  if (!referral[uid]) await initReferral(uid);

  referral[uid].clicks += 1;
  await saveDB();

  return referral[uid];
}


// ======================================================================
//                 记录成功邀请（下级用户）
// ======================================================================
export async function addReferralInvite(parentUid: number, childUid: number) {
  await loadDB();

  if (!referral[parentUid]) await initReferral(parentUid);

  referral[parentUid].invites += 1;

  // 添加下级
  if (!referral[parentUid].children.includes(childUid)) {
    referral[parentUid].children.push(childUid);
  }

  await saveDB();
  return referral[parentUid];
}


// ======================================================================
//           增加返利收入（主机器人收到充值后调用）
// ======================================================================
export async function addReferralIncome(uid: number, amount: number) {
  await loadDB();

  if (!referral[uid]) await initReferral(uid);

  referral[uid].income += amount;
  await saveDB();

  return referral[uid];
}


// ======================================================================
//               获取用户推广数据（供前端调用）
// ======================================================================
export async function getReferral(uid: number) {
  await loadDB();
  return referral[uid] || null;
}


// ======================================================================
//                  管理员：获取所有推广数据
// ======================================================================
export async function getAllReferrals() {
  await loadDB();
  return Object.values(referral);
}

