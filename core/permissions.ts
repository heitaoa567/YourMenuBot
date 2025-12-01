// =====================================================
//                  core/permissions.ts
//       VIP / 免费 用户权限系统（全局权限中心）
// =====================================================

import { UserData } from "../types.ts";

// VIP 定义（你的价格：周5 / 月15 / 季38 / 年158 / 永久888）
export const VIP_PLANS = {
  weekly: { days: 7 },
  monthly: { days: 30 },
  season: { days: 90 },
  yearly: { days: 365 },
  lifetime: { days: 365 * 100 }, // 100年，等同永久
};


// =====================================================
//                判断用户是否 VIP
// =====================================================
export function isVIP(user: UserData): boolean {
  if (!user.vip_until) return false;
  return Date.now() < user.vip_until;
}


// =====================================================
//              免费用户的限制参数
// =====================================================
export const FREE_LIMITS = {
  ai_minutes: 30,          // 每天 AI 30 分钟
  ai_reset_hour: 0,        // 每日凌晨重置

  listen_limit: 10,        // 子机器人监听：每天 10 次
  text_broadcast_limit: 3, // 文本广播：每天 3 次

  media_broadcast: false,  // 免费用户禁止媒体广播
  hide_ads: false,         // 免费用户不能去广告
  supply_top: false,       // 免费用户供需不能置顶
  referral_rate: 0,        // 免费用户推广分成 0%
};


// =====================================================
//              VIP 用户无限权限（你的设定）
// =====================================================
export const VIP_PERMISSIONS = {
  ai_unlimited: true,
  ai_gpt4: true,
  ai_vision: true,

  listen_unlimited: true,
  text_broadcast_unlimited: true,
  media_broadcast: true,

  hide_ads: true,
  supply_top: true,
  referral_rate: 0.40,  // VIP 推广40%

  wallet_priority: true,
};


// =====================================================
//         获取用户权限（返回一整套能力）
// =====================================================
export function getPermissions(user: UserData) {
  if (isVIP(user)) {
    return {
      isVIP: true,
      ...VIP_PERMISSIONS,
    };
  }

  // 免费用户
  return {
    isVIP: false,
    ...FREE_LIMITS,
  };
}



// =====================================================
//        检查功能是否允许（统一判断）
// =====================================================
export function canUse(user: UserData, feature: string) {
  const p = getPermissions(user);

  switch (feature) {

    // AI 限制
    case "ai":
      return p.ai_unlimited || true; // 免费可用，但时间限制在 AI 模块检查

    case "ai_gpt4":
      return p.ai_gpt4 || false;

    case "ai_vision":
      return p.ai_vision || false;


    // 监听
    case "listen":
      return p.listen_unlimited || true; // 免费可用但限制次数

    // 广播文字
    case "broadcast_text":
      return p.text_broadcast_unlimited || true;

    // 广播媒体
    case "broadcast_media":
      return p.media_broadcast;

    // 去广告
    case "hide_ads":
      return p.hide_ads;

    // 供需置顶
    case "supply_top":
      return p.supply_top;

    // 推广分成
    case "referral_rate":
      return p.referral_rate;

    // 钱包优先处理
    case "wallet_priority":
      return p.wallet_priority;

    default:
      return false;
  }
}

