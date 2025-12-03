// ======================================================================
//                  plugins/referral/callback.ts
//               处理推广菜单的回调按钮事件
// ======================================================================

import { referralMenu } from "./menu.ts";
import { showChildren } from "./view.ts";
import { sendText } from "../../core/send.ts";

export async function onReferralCallback(uid: number, data: string) {
  if (data === "ref_menu") {
    const menu = await referralMenu(uid);
    await sendText(uid, menu.text, menu.keyboard);
    return true;
  }

  if (data === "ref_children") {
    await showChildren(uid);
    return true;
  }

  return false;
}
