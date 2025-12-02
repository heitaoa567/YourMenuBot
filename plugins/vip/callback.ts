// ======================================================================
//                  plugins/vip/callback.ts
//      VIP 插件：按钮回调（选择套餐 / 支付确认）
// ======================================================================

import { getUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";

import {
  onVIPMenu,
  onVIPSelect,
  onVIPPaid,
  onVIPExtend,
  VIP_PRICES
} from "./index.ts";

import type { CallbackQuery } from "../../types.ts";


// ======================================================================
//                 VIP 回调处理入口（在 router 调用）
// ======================================================================
export async function onVIPCallback(
  uid: number,
  data: string,
  cq: CallbackQuery
) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  // ================================
  //         打开 VIP 菜单
  // ================================
  if (data === "vip") {
    await onVIPMenu(uid, lang);
    return true;
  }

  // ================================
  //         用户选择套餐
  // ================================
  if (data.startsWith("vip_")) {
    const plan = data.replace("vip_", "");

    if (!VIP_PRICES[plan]) return false;

    // 显示付款提示
    const usdt = user.usdt_address || "未设置地址";
    await onVIPSelect(uid, plan, lang, usdt);

    return true;
  }

  // ================================
  //        用户已付款 → 等待 TXID
  // ================================
  if (data.startsWith("vip_paid_")) {
    const plan = data.replace("vip_paid_", "");

    await onVIPPaid(uid, plan, lang);

    return true;
  }

  return false;
}


