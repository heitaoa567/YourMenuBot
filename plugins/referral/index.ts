// ======================================================================
//                       plugins/referral/index.ts
//                推广系统主入口（菜单 + 回调 + 文本）
// ======================================================================

import { referralMenu } from "./menu.ts";
import { onReferralCallback } from "./callback.ts";
import { onReferralMessage } from "./handler.ts";

// =====================================================
// 供 router.ts 调用的统一入口
// router.ts 中写的是：
// if (data.startsWith("ref_")) return await Referral.handle(uid, data, ctx);
// =====================================================
export async function handle(uid: number, data: string, ctx: any) {
  return await onReferralCallback(uid, data, ctx);
}

// =====================================================
// 推广菜单入口（/ref 或主菜单按钮）
// =====================================================
export const menu = referralMenu;

// =====================================================
// 文本消息入口（用户发送消息触发推广逻辑）
// =====================================================
export const onMessage = onReferralMessage;
