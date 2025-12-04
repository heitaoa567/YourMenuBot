// ======================================================================
//                       plugins/ads/index.ts
//                     广告模块主入口（开/关/设置）
// ======================================================================

import { onAdsMessage } from "./handler.ts";
import { onAdsCallback } from "./callback.ts";
import { adsMenu } from "./menu.ts";

// =====================================================
// 供 router.ts 调用的统一入口：处理 ads_xxx 按钮
// router.ts 使用方式：
// if (data.startsWith("ads_")) return await Ads.handle(uid, data, ctx);
// =====================================================
export async function handle(uid: number, data: string, ctx: any) {
  return await onAdsCallback(uid, data, ctx);
}

// =====================================================
// 文本消息入口（当用户发文字触发广告逻辑）
// =====================================================
export const onMessage = onAdsMessage;

// =====================================================
// 菜单入口（主菜单或 /ads 触发）
// =====================================================
export const menu = adsMenu;
