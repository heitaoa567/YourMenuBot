// ======================================================================
//                     plugins/vip/check.ts
//           VIP 判断 / 权限查询 / 剩余时间文本生成
// ======================================================================

import { getUser } from "../../db/userdb.ts";
import { isVIP, VIP_PLANS } from "../../core/permissions.ts";


// ======================================================================
//           判断用户是否 VIP（对外暴露，其他插件调用）
// ======================================================================
export async function checkVIP(uid: number): Promise<boolean> {
  const user = await getUser(uid);
  return isVIP(user);
}


// ======================================================================
//                     获取 VIP 到期时间（时间戳）
// ======================================================================
export async function getVipExpire(uid: number): Promise<number> {
  const user = await getUser(uid);
  return user.vip_until || 0;
}


// ======================================================================
//                   获取 VIP 剩余天数（返回数字）
// ======================================================================
export async function getVipDaysLeft(uid: number): Promise<number> {
  const user = await getUser(uid);

  if (!user.vip_until || Date.now() > user.vip_until) {
    return 0;
  }

  const diff = user.vip_until - Date.now();
  return Math.ceil(diff / (24 * 60 * 60 * 1000));
}


// ======================================================================
//           返回 VIP 状态文本（给界面显示用）
// ======================================================================
export async function getVipStatusText(uid: number): Promise<string> {
  const user = await getUser(uid);

  if (!user.vip_until || Date.now() > user.vip_until) {
    return "❌ 你还不是 VIP 用户";
  }

  const expire = new Date(user.vip_until).toLocaleDateString();
  const left = await getVipDaysLeft(uid);

  return `✅ VIP 用户\n到期时间：${expire}\n剩余：${left} 天`;
}


// ======================================================================
//       获取套餐中文名称（weekly/monthly/season/yearly/lifetime）
// ======================================================================
export function getPlanName(plan: string): string {
  return {
    weekly: "周卡（7天）",
    monthly: "月卡（30天）",
    season: "季卡（90天）",
    yearly: "年卡（365天）",
    lifetime: "永久 VIP"
  }[plan] || "未知套餐";
}


// ======================================================================
//           获取套餐天数（核心：升级 VIP 时要用到）
// ======================================================================
export function getPlanDays(plan: string): number {
  const d = VIP_PLANS[plan as keyof typeof VIP_PLANS];
  return d?.days || 0;
}

