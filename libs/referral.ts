// ==========================================
//              referral.ts
//      YourMenuBot — 推广返利系统
// ==========================================

import { getUser, saveUser } from "../db/userdb.ts";

// 从环境变量读取机器人用户名
// 在 Deno Deploy 里设置：BOT_USERNAME = YourMenuBot 或 @YourMenuBot
const BOT_USERNAME = (Deno.env.get("BOT_USERNAME") || "YourMenuBot").replace("@", "");

/**
 * 生成推广链接
 * 格式：https://t.me/YourMenuBot?start=123456
 */
export function buildReferralLink(userId: number): string {
  return `https://t.me/${BOT_USERNAME}?start=${userId}`;
}

/**
 * 记录推广点击（任何带参数 /start 打开机器人）
 */
export async function recordReferralClick(referrerId: number) {
  const user = await getUser(referrerId);

  if (!user.referral_clicks) user.referral_clicks = 0;
  user.referral_clicks += 1;

  await saveUser(referrerId, user);
}

/**
 * 记录成功邀请（你决定什么时候算是成功）
 */
export async function recordReferralSuccess(referrerId: number) {
  const user = await getUser(referrerId);

  if (!user.referrals) user.referrals = 0;
  user.referrals += 1;

  await saveUser(referrerId, user);
}

/**
 * 推广中心面板
 * main.ts 调用：
 * const panel = await handleReferralPanel(chatId)
 */
export async function handleReferralPanel(userId: number): Promise<string> {
  const user = await getUser(userId);

  const link = buildReferralLink(userId);
  const clicks = user.referral_clicks || 0;
  const regs = user.referrals || 0;
  const income = user.referral_income || 0; // 可未来扩展分佣

  return `
📣 *推广中心*

这是你的专属推广链接👇
${link}

📊 *数据统计：*
• 推广访问：*${clicks}*
• 成功邀请：*${regs}*
• 推广收益：*${income} U*（未来可启用自动分佣）

将以上链接分享给朋友，即可开始赚取收益！
  `.trim();
}
