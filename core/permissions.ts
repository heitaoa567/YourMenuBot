// ======================================================================
//                         core/permissions.ts
//     全局权限系统（免费用户 VS VIP 用户的所有能力定义）
// ======================================================================

import type { UserData } from "../types.ts";

// ----------------------------------------------------
// VIP 套餐时长（与你确定过的价格对应）
// ----------------------------------------------------
export const VIP_PLANS = {
  weekly: 7,       // 5 USDT
  monthly: 30,     // 15 USDT
  season: 90,      // 38 USDT
  yearly: 365,     // 158 USDT
  lifetime: 36500, // 终身（100年）888 USDT
};


// ----------------------------------------------------
// 判断是否 VIP
// ----------------------------------------------------
export function isVIP(user: UserData): boolean {
  if (!user.vip_until) return false;
  return Date.now() < user.vip_until;
}


// ----------------------------------------------------
// 免费用户能力（基础）
// ----------------------------------------------------
export const FREE = {
  ai_minutes: 30,          // AI 每天 30 分钟
  ai_gpt4: false,
  ai_vision: false,

  listen_limit: 10,        // 子机器人监听次数/天
  broadcast_text_limit: 3, // 文本广播次数/天
  broadcast_media: false,  // 禁止媒体广播（避免发色情/病毒）

  hide_ads: false,         // 免费用户不能关闭广告
  supply_top: false,       // 不能置顶供需
  referral_rate: 0,        // 推广返佣 0%

  wallet_priority: false,  // 提现不优先处理
};


// ----------------------------------------------------
// VIP 用户能力（完全版）
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
  referral_rate: 0.40,     // VIP 推广返佣 40%

  wallet_priority: true,   // 提现优先处理
};


// ----------------------------------------------------
// 获取用户权限（汇总所有能力）
// ----------------------------------------------------
export function getPermissions(user: UserData) {
  if (isVIP(user)) {
    return {
      isVIP: true,
      ...VIP,
    };
  }

  return {
    isVIP: false,
    ...FREE,
  };
}


// ----------------------------------------------------
// 全局权限检查器：canUse(user, "ai_gpt4")
// ----------------------------------------------------
export function canUse(user: UserData, feature: string) {
  const P = getPermissions(user);

  switch (feature) {
    case "ai":
      return P.isVIP || P.ai_minutes > 0;

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

    case "referral_rate":
      return P.referral_rate;

    default:
      return false;
  }
}

