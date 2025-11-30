import { getUser, saveUser } from "../db/userdb.ts";

export async function recordReferralClick(ownerId: number) {
  const user = await getUser(ownerId);
  user.referral_clicks = (user.referral_clicks || 0) + 1;
  await saveUser(ownerId, user);
}

export async function recordReferral(ownerId: number) {
  const user = await getUser(ownerId);
  user.referrals = (user.referrals || 0) + 1;
  await saveUser(ownerId, user);
}

export function handleReferral(id: number) {
  const link = `https://t.me/${Deno.env.get("BOT_USERNAME")}?start=${id}`;

  return `
📣 *推广中心*

你的专属邀请链接：
👉 ${link}

每邀请 1 位新用户，可以获得返利收益。

📊 *你的数据：*
• 邀请访问：${0}
• 注册人数：${0}

快去分享你的链接，赚取奖励！
  `;
}
