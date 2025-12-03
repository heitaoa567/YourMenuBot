// ======================================================================
//                       plugins/referral/index.ts
//                推广系统主入口（菜单 + 回调 + 文本）
// ======================================================================

import { referralMenu } from "./menu.ts";
import { onReferralCallback } from "./callback.ts";
import { onReferralMessage } from "./handler.ts";

export const Referral = {
  menu: referralMenu,
  onCallback: onReferralCallback,
  onMessage: onReferralMessage,
};
