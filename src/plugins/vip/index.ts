// ======================================================================
//                        plugins/vip/index.ts
//                            VIP 主入口
// ======================================================================

import { vipMenu } from "./menu.ts";
import { onCallback as vipCallback } from "./callback.ts";
import { isVIP } from "./check.ts";

export const VIP = {
  menu: vipMenu,
  callback: vipCallback,
  isVIP,
};

