// =======================================
// VIP 管理模块
// 自动开通、续费、绑定数量限制
// =======================================

import { VIP_PLANS } from "../config/config.ts";
import { getUser, saveUser } from "../db/kv.ts";
import { isVIP } from "./utils.ts";

// ---------------------------------------
// 获取 VIP 套餐列表（用于按钮展示）
// ---------------------------------------
export function getVipPlanList(lang: string = "zh") {
  const namesZh = {
    week: "周卡 7 天（5U）",
    month: "月卡 30 天（10U）",
    quarter: "季卡 90 天（25U）",
    year: "年卡 365 天（80U）",
  };

  const namesEn = {
    week: "Weekly 7 days (5U)",
    month: "Monthly 30 days (10U)",
    quarter: "Quarterly 90 days (25U)",
    year: "Yearly 365 days (80U)",
  };

  return lang === "zh" ? namesZh : namesEn;
}

// ---------------------------------------
// 根据套餐名称返回价格 & 天数
// ---------------------------------------
export function getVipPlan(planKey: string) {
  return VIP_PLANS[planKey as keyof typeof VIP_PLANS] ?? null;
}

// ---------------------------------------
// 开通 VIP（自动续费）
// ---------------------------------------
export async function activateVIP(userId: number, days: number) {
  const user = await getUser(userId);

  const now = Date.now();
  const current = user.vipUntil > now ? user.vipUntil : now;

  // 自动累加天数
  user.vipUntil = current + days * 24 * 60 * 60 * 1000;

  await saveUser(user);
  return user.vipUntil;
}

// ---------------------------------------
// 获取用户剩余天数（显示用）
// ---------------------------------------
export function getVipRemaining(user: any): number {
  if (!isVIP(user.vipUntil)) return 0;
  return Math.ceil((user.vipUntil - Date.now()) / (86400000));
}

// ---------------------------------------
// 判断用户最多能绑定多少个子机器人
// ---------------------------------------
export function getUserMaxBots(user: any): number {
  // 如果 VIP
  if (isVIP(user.vipUntil)) {
    const remainDays = getVipRemaining(user);

    // 根据剩余天数判断当前套餐
    for (const key in VIP_PLANS) {
      const cfg = VIP_PLANS[key as keyof typeof VIP_PLANS];
      if (cfg.days === remainDays) return cfg.maxBots;
    }
    // 如果没完全匹配，就给最高档（安全）
    return 30;
  }

  // 普通用户只能绑定 1 个
  return 1;
}

// ---------------------------------------
// 判断用户是否还能绑定新 bot
// ---------------------------------------
export async function canBindMoreBots(userId: number): Promise<boolean> {
  const user = await getUser(userId);
  const max = getUserMaxBots(user);
  return user.bots.length < max;
}

