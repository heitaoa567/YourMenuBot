// ======================================================================
//                    plugins/supply/index.ts
//                供需系统主入口（发布 / 浏览 / 置顶）
// ======================================================================

import { onSupplyMessage } from "./handler.ts";
import { onSupplyCallback } from "./callback.ts";
import { supplyMenu } from "./menu.ts";

// =====================================================
// 供需按钮入口：由 router.ts 调用
// router.ts 用法：
// if (data.startsWith("supply_")) return await Supply.handle(uid, data, ctx);
// =====================================================
export async function handle(uid: number, data: string, ctx: any) {
  return await onSupplyCallback(uid, data, ctx);
}

// =====================================================
// 消息入口（用户发文字触发供需）
// =====================================================
export const onMessage = onSupplyMessage;

// =====================================================
// 菜单入口（例如 /supply 或主菜单按钮）
// =====================================================
export const menu = supplyMenu;
