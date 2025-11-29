// ======================================================
// 推广系统（点击、注册、收益）
// ======================================================

import { getUser, saveUser } from "../db/kv.ts";

// ---------------------------------------------
// 处理 /start 参数里的推广 ID
// ---------------------------------------------
export async function handleReferralStart(myId: number, startPayload: string) {
  const inviterId = Number(startPayload);

  // 自己点自己的邀请链接 → 不计
  if (!inviterId || inviterId === myId) return;

  const inviter = await getUser(inviterId);

  // 点击数 +1
  inviter.referralClicks++;

  // 注册（唯一用户）
  const me = await getUser(myId);
  if (!me.referralUsers) {
    inviter.referralUsers++;
  }

  await saveUser(inviter);
}

// ---------------------------------------------
// 推广中心内容显示
// ---------------------------------------------
export async function getReferralPanel(userId: number, lang: string) {
  const user = await getUser(userId);

  const clicks = user.referralClicks;
  const users = user.referralUsers;
  const income = user.referralIncome;

  if (lang === "zh") {
    return `
📣 *推广中心*

您的专属推广链接：
https://t.me/ButtonMasterr_Bot?start=${userId}

🔹 推广点击：${clicks}
🔹 有效注册：${users}
🔹 推广收益：${income} USDT

将上方链接发送给朋友，好友注册 + 充值后即可获得返利。
`;
  }

  return `
📣 *Referral Center*

Your referral link:
https://t.me/ButtonMasterr_Bot?start=${userId}

🔹 Clicks: ${clicks}
🔹 Registered users: ${users}
🔹 Income: ${income} USDT

Share the above link with friends.
`;
}

// ---------------------------------------------
// 推广返利（用户充值后调用）
// ---------------------------------------------
export async function addReferralIncome(userId: number, amount: number) {
  const user = await getUser(userId);
  user.referralIncome += amount;
  await saveUser(user);
}

