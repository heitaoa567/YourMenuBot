// ======================================================================
//                    plugins/supply/index.ts
//                供需系统主入口（发布 / 浏览 / 置顶）
// ======================================================================

import { onSupplyMessage } from "./handler.ts";
import { onSupplyCallback } from "./callback.ts";
import { supplyMenu } from "./menu.ts";

export const Supply = {
  menu: supplyMenu,
  onMessage: onSupplyMessage,
  onCallback: onSupplyCallback,
};

