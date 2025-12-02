// ======================================
//               vipdb.ts
//     VIP 充值 / 套餐 / 激活 / 续费
// ======================================

import { getUser, saveUser, updateUser } from "./userdb.ts";

const kv = await Deno.openKv();

// ================================
// VIP 套餐定义（单位：毫秒）
// ================================
export const VIP_PLANS = {
  week:    { days: 7,   price: 5 },
  month:   { days: 30,  price: 15 },
  season:  { days: 90,  price: 38 },
  year:    { days: 365, price: 158 },
  lifetime:{ days: 99999, price: 388 }, // 约等于无期限
};

// ================================
// 获取套餐时长
// ================================
export function getVipDuration(plan: keyof typeof VIP_PLANS): number {
  return VIP_PLANS[plan].days * 24 * 60 * 60 * 1000;
}

// ================================
// 激活或续费 VIP
// ================================
export async function activateVIP(chatId: number, plan: keyof typeof VIP_PLANS) {
  const user = await getUser(chatId);

  const now = Date.now();
  const duration = getVipDuration(plan);

  let newExpires = now;

  // 如果当前已经VIP → 续费
  if (user.vip_until > now) {
    newExpires = user.vip_until + duration;
  } else {
    newExpires = now + duration;
  }

  user.is_vip = true;
  user.vip_until = newExpires;

  await saveUser(chatId, user);

  return newExpires;
}

// ================================
// 检查是否 VIP
// ================================
export async function isVIP(chatId: number): Promise<boolean> {
  const user = await getUser(chatId);
  const now = Date.now();
  return user.vip_until > now;
}

// ================================
// 获取 VIP 到期日期
// ================================
export async function getVipExpire(chatId: number): Promise<number> {
  const user = await getUser(chatId);
  return user.vip_until || 0;
}

// ================================
// 取消 VIP（手动操作）
// ================================
export async function removeVIP(chatId: number) {
  await updateUser(chatId, {
    is_vip: false,
    vip_until: 0,
  });
}

// ================================
// 列出所有 VIP 用户
// ================================
export async function listVIPUsers() {
  const vipList = [];
  for await (const entry of kv.list({ prefix: ["user"] })) {
    const u = entry.value;
    if (u && u.vip_until > Date.now()) {
      vipList.push(u);
    }
  }
  return vipList;
}

