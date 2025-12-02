// ======================================
//             referraldb.ts
//     推广数据库（返利 / 点击 / 收益）
// ======================================

import { getUser, updateUser } from "./userdb.ts";
import { addBalance } from "./walletdb.ts";

export interface ReferralClick {
  id: string;
  promoter_id: number;   // 推广人
  user_id: number;       // 点击者
  created_at: number;
}

export interface ReferralIncomeRecord {
  id: string;
  promoter_id: number;
  from_user: number;     // 来自哪个用户的消费
  amount: number;
  created_at: number;
}

const kv = await Deno.openKv();

// ===============================
// 工具：生成ID
// ===============================
function genId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 99999)}`;
}

// ===============================
// 记录推广点击
// ===============================
export async function addReferralClick(promoterId: number, userId: number) {
  const id = genId("ref_click");

  const record: ReferralClick = {
    id,
    promoter_id: promoterId,
    user_id: userId,
    created_at: Date.now(),
  };

  await kv.set(["ref_click", id], record);

  // 更新推广人点击数据
  const promoter = await getUser(promoterId);
  promoter.referral_clicks++;
  await updateUser(promoterId, promoter);
}

// ===============================
// 绑定推广关系（注册时调用）
// ===============================
export async function bindReferral(userId: number, promoterId: number) {
  const user = await getUser(userId);

  if (user.ref_by) return; // 不能重复绑定

  await updateUser(userId, { ref_by: promoterId });

  // 增加推广人的成功邀请数
  const promoter = await getUser(promoterId);
  promoter.referrals++;
  await updateUser(promoterId, promoter);
}

// ===============================
// 推广返利（例如用户充值 VIP）
// 百分比：普通用户最高 40%
// ===============================
export async function addReferralIncome(
  fromUser: number,
  amount: number
) {
  const user = await getUser(fromUser);
  if (!user.ref_by) return; // 没有推广人

  const promoterId = user.ref_by;

  // 最高返利 40%
  const reward = amount * 0.40;

  // 记录返利
  const id = genId("ref_income");
  const record: ReferralIncomeRecord = {
    id,
    promoter_id: promoterId,
    from_user: fromUser,
    amount: reward,
    created_at: Date.now(),
  };

  await kv.set(["ref_income", id], record);

  // 给推广人钱包增加
  await addBalance(promoterId, reward);

  // 更新推广人总收益
  const promoter = await getUser(promoterId);
  promoter.referral_income += reward;
  await updateUser(promoterId, promoter);
}

// ===============================
// 列出某个推广人的所有收入
// ===============================
export async function listReferralIncome(promoterId: number) {
  const list: ReferralIncomeRecord[] = [];
  for await (const entry of kv.list<ReferralIncomeRecord>({ prefix: ["ref_income"] })) {
    const rec = entry.value;
    if (rec && rec.promoter_id === promoterId) list.push(rec);
  }
  return list.sort((a, b) => b.created_at - a.created_at);
}

// ===============================
// 推广排行榜（前100）
// ===============================
export async function referralLeaderboard(limit = 100) {
  const allUsers: any[] = [];

  for await (const entry of kv.list({ prefix: ["user"] })) {
    const user = entry.value;
    if (!user) continue;

    allUsers.push({
      chat_id: user.chat_id,
      referrals: user.referrals,
      clicks: user.referral_clicks,
      income: user.referral_income || 0,
    });
  }

  return allUsers
    .sort((a, b) => b.income - a.income)
    .slice(0, limit);
}

// ===============================
// 推广人是否绑定了当前用户
// ===============================
export async function checkReferral(userId: number) {
  const user = await getUser(userId);
  return user.ref_by || null;
}

