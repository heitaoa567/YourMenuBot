// ==========================================
//                 vip.ts
//        YourMenuBot — VIP 权限系统
// ==========================================

import { getUser, saveUser, addVipTime } from "../db/userdb.ts";

/**
 * 判断是否为 VIP 用户
 */
export function checkUserVIP(user: any): boolean {
  const now = Date.now();
  return user.isVIP === true && user.vip_until > now;
}

/**
 * 检查 VIP 是否过期（每次使用 AI、菜单等会调用）
 */
export async function validateVIP(userId: number) {
  const user = await getUser(userId);
  const now = Date.now();

  if (user.vip_until <= now) {
    user.isVIP = false;
    await saveUser(userId, user);
  }

  return user;
}

/**
 * 给用户开通或延长 VIP
 * days = 套餐天数（如 7 / 30 / 90 / 365）
 */
export async function extendVIP(userId: number, days: number): Promise<string> {
  const user = await getUser(userId);
  const now = Date.now();

  // 如果用户已经过期 → 从当前时间开始计算
  if (user.vip_until < now) {
    user.vip_until = now + days * 24 * 60 * 60 * 1000;
  } else {
    // 未过期 → 在当前有效期基础上延长
    user.vip_until += days * 24 * 60 * 60 * 1000;
  }

  user.isVIP = true;

  await saveUser(userId, user);

  return `🎉 VIP 已开通/续费成功！有效期增加 *${days} 天*`;
}

/**
 * 根据用户选择的套餐返回对应天数
 */
export function getVipDays(plan: string): number {
  switch (plan) {
    case "7":
      return 7;
    case "30":
      return 30;
    case "90":
      return 90;
    case "365":
      return 365;
    default:
      return 0;
  }
}
