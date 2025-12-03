// ======================================================================
//                       plugins/ads/index.ts
//                     广告模块主入口（开/关/设置）
// ======================================================================

import { onAdsMessage } from "./handler.ts";
import { onAdsCallback } from "./callback.ts";
import { adsMenu } from "./menu.ts";

export const Ads = {
  menu: adsMenu,
  onMessage: onAdsMessage,
  onCallback: onAdsCallback,
};

