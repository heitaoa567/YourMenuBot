// ======================================================================
//                      plugins/vip/index.ts
//                VIP 套餐系统（购买 / 开通 / 查询）
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { addVIPDays, getVIPLeftDays } from "../../db/vipdb.ts";

import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts";
import type { Message, CallbackQuery } from "../../types.ts";


// ======================================================================
//                      VIP 套餐定义
// ======================================================================

export const VIP_PRICES = {
  weekly: 5,
  monthly: 15,
  season: 38,
  yearly: 158,
  lifetime: 888,
};

export const VIP_PLANS = {
  weekly: { days: 7 },
  monthly: { days: 30 },
  season: { days: 90 },
  yearly: { days: 365 },
  lifetime: { days: 36500 }, // 100年当永久
};


// ======================================================================
//                   显示所有 VIP 套餐菜单
// ======================================================================

export function vipMenu(lang: string) {
  return {
    inline_keyboard: [
      [{ text: `🗓 7 天 / $${VIP_PRICES.weekly}`, callback_data: "vip_weekly" }],
      [{ text: `📅 30 天 / $${VIP_PRICES.monthly}`, callback_data: "vip_monthly" }],
      [{ text: `🎁 90 天 / $${VIP_PRICES.season}`, callback_data: "vip_season" }],
      [{ text: `📆 365 天 / $${VIP_PRICES.yearly}`, callback_data: "vip_yearly" }],
      [{ text: `💎 终身版 / $${VIP_PRICES.lifetime}`, callback_data: "vip_lifetime" }],
      [{ text: T(lang, "back"), callback_data: "back_main" }]
    ]
  };
}


// ======================================================================
//                        用户打开 VIP 菜单
// ======================================================================

export async function onVIPMenu(uid: number, lang: string) {
  await sendText(uid, T(lang, "vip_title"), vipMenu(lang));
}


// ======================================================================
//                用户选择 VIP 套餐 → 等待支付
// ======================================================================

export async function onVIPSelect(uid: number, plan: string, lang: string, usdt: string) {
  const price = VIP_PRICES[plan];
  const days = VIP_PLANS[plan].days;

  await sendText(
    uid,
    T(lang, "vip_pay", { price, days, usdt }),
    {
      inline_keyboard: [
        [{ text: T(lang, "i_paid"), callback_data: `vip_paid_${plan}` }],
        [{ text: T(lang, "back"), callback_data: "back_main" }]
      ]
    }
  );
}


// ======================================================================
//   用户付款后点击 “我已支付” → 等待输入 TXID（由 wallet 插件验证）
// ======================================================================

export async function onVIPPaid(uid: number, plan: string, lang: string) {
  const user = await getUser(uid);

  user.waiting_txid_for_vip = plan;
  await saveUser(uid, user);

  await sendText(
    uid,
    T(lang, "vip_send_txid")
  );
}


// ======================================================================
//              用户发送 TXID → 由 wallet 插件验证
// ======================================================================

export async function onVIPTxid(uid: number, txid: string, lang: string) {
  const user = await getUser(uid);
  const plan = user.waiting_txid_for_vip;

  if (!plan) return false;

  // 钱包插件验证是否收款
  // 这里 wallet 插件会返回 true/false
  return {
    plan,
    txid
  };
}


// ======================================================================
//              USDT 验证成功 → 正式开通 VIP
// ======================================================================

export async function onVIPExtend(uid: number, plan: string, lang: string) {
  const days = VIP_PLANS[plan].days;

  // 延长 VIP
  const until = await addVIPDays(uid, days);

  // 清理等待状态
  const user = await getUser(uid);
  user.waiting_txid_for_vip = null;
  await saveUser(uid, user);

  await sendText(
    uid,
    T(lang, "vip_success", {
      days,
      date: new Date(until).toLocaleDateString(),
    })
  );

  return true;
}


// ======================================================================
//                        查询 VIP 剩余时间
// ======================================================================

export async function onVIPStatus(uid: number, lang: string) {
  const left = await getVIPLeftDays(uid);

  if (left <= 0) {
    await sendText(uid, T(lang, "vip_none"));
    return;
  }

  await sendText(uid, T(lang, "vip_left", { left }));
}

