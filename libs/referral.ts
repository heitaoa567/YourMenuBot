// ===============================
//       referral.ts — 推广中心
// ===============================

// 用户数据库（使用 KV 封装）
import { getUser, saveUser } from "../db/userdb.ts";

// 生成推广链接（适配 Deno Deploy）
export function generateReferralLink(userId: number): string {
  const base = Deno.env.get("PUBLIC_URL") || "https://example.com"; 
  return `${base}/start=${userId}`;
}

// 记录推广点击
export function recordReferralClick(referrerId: number) {
  const user = getUser(referrerId);
  user.referral_clicks = (user.referral_clicks || 0) + 1;
  saveUser(user);
}

// 用户成功注册（你要绑定子机器人时用）
export function recordReferralSuccess(referrerId: number) {
  const user = getUser(referrerId);
  user.referrals = (user.referrals || 0) + 1;
  saveUser(user);
}

// 获取推广信息
export function getReferralInfo(userId: number) {
  const user = getUser(userId);

  return {
    link: generateReferralLink(userId),
    clicks: user.referral_clicks || 0,
    successes: user.referrals || 0,
    income: user.referral_income || 0,
  };
}

// 增加推广返利
export function addReferralIncome(userId: number, amount: number) {
  const user = getUser(userId);
  user.referral_income = (user.referral_income || 0) + amount;
  saveUser(user);
}
