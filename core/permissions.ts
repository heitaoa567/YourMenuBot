// ======================================================================
//                      core/permissions.ts
//     全局权限系统（免费用户 VS VIP 用户的所有能力定义）
// ======================================================================

import type { UserData } from "../types.ts";

// ----------------------------------------------------
// VIP 套餐时长（天数）
// ----------------------------------------------------
export const VIP_PLANS = {
  weekly: 7,
  monthly: 30,
  season: 90,
  yearly: 365,
  lifetime: 36500,
};

// ----------------------------------------------------
// 判断 VIP
// ----------------------------------------------------
export function isVIP(user: UserData): boolean {
  return user.vip_until && Date.now() < user.vip_until;
}

// ----------------------------------------------------
// 免费用户基础权限
// ----------------------------------------------------
export const FREE = {
  ai_minutes: 30,

  ai_gpt4: false,
  ai_vision: false,

  listen_limit: 10,
  broadcast_text_limit: 3,
  broadcast_media: false,

  hide_ads: false,
  supply_top: false,

  referral_rate: 0, // 数字，不能用于 canUse()

  wallet_priority: false,
};

// ----------------------------------------------------
// VIP 权限
// ----------------------------------------------------
export const VIP = {
  ai_unlimited: true,
  ai_gpt4: true,
  ai_vision: true,

  listen_unlimited: true,
  broadcast_text_unlimited: true,
  broadcast_media: true,

  hide_ads: true,
  supply_top: true,

  referral_rate: 0.40,

  wallet_priority: true,
};

// ----------------------------------------------------
// 合并用户权限
// ----------------------------------------------------
export function getPermissions(user: UserData) {
  if (isVIP(user)) {
    return { isVIP: true, ...VIP };
  }
  return { isVIP: false, ...FREE };
}

// ----------------------------------------------------
// 权限检查器（返回布尔）
// ----------------------------------------------------
export function canUse(user: UserData, feature: string): boolean {
  const P = getPermissions(user);

  switch (feature) {
    case "ai":
      return P.isVIP || user.ai_used < FREE.ai_minutes * 60 * 1000;

    case "ai_gpt4":
      return P.ai_gpt4;

    case "ai_vision":
      return P.ai_vision;

    case "listen":
      return P.listen_unlimited || P.listen_limit > 0;

    case "broadcast_text":
      return P.broadcast_text_unlimited || P.broadcast_text_limit > 0;

    case "broadcast_media":
      return P.broadcast_media;

    case "hide_ads":
      return P.hide_ads;

    case "supply_top":
      return P.supply_top;

    case "wallet_priority":
      return P.wallet_priority;

    default:
      return false;
  }
}
