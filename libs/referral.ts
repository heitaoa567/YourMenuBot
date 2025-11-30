// referral.ts
// ======================================================
// YourMenuBot 推广中心模块（支持 6 国多语言）
// ======================================================

import { LANG } from "../languages.ts";
import { getUser, saveUser } from "../db/userdb.ts";

/**
 * 生成推广中心内容
 * @param chatId
 */
export function handleReferral(chatId: number) {
  const user = getUser(chatId);
  const L = LANG[user.lang || "en"];

  // 用户第一次使用，初始化数据
  if (!user.referrals) user.referrals = 0;
  if (!user.referral_clicks) user.referral_clicks = 0;
  if (!user.referral_income) user.referral_income = 0;

  // 专属推广链接（你可以换成你自己的推广域名）
  const inviteLink = `https://t.me/ButtonMasterr_Bot?start=${chatId}`;

  // 推广内容（自动使用不同语言）
  const text = `
${L.ref_title}

${L.ref_desc}

🔗 *${L.ref_link}*
${inviteLink}

${L.ref_stats}
• 已邀请人数：${user.referrals}
• 点击次数：${user.referral_clicks}
• 推广收益：${user.referral_income} USDT
  `;

  saveUser(chatId, user);
  return text;
}

/**
 * 记录用户被邀请（用于 /start <id> ）
 * @param inviteId 邀请者
 */
export function recordReferral(inviteId: number) {
  const u = getUser(inviteId);
  if (!u) return;

  if (!u.referrals) u.referrals = 0;
  u.referrals += 1;

  saveUser(inviteId, u);
}

/**
 * 记录点击统计（用户点进机器人）
 * @param inviteId
 */
export function recordReferralClick(inviteId: number) {
  const u = getUser(inviteId);
  if (!u) return;

  if (!u.referral_clicks) u.referral_clicks = 0;
  u.referral_clicks += 1;

  saveUser(inviteId, u);
}
