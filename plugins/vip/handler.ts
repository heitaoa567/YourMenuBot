// ======================================================================
//                        plugins/vip/handler.ts
//            当用户发送 “VIP” 或点击菜单 → 进入 VIP 菜单
// ======================================================================

import { vipMenu } from "./menu.ts";
import { sendText } from "../../core/send.ts";

export async function onMessage(uid: number, text: string) {
  if (text.toLowerCase() !== "vip") return false;

  const { text: menuText, keyboard } = vipMenu();
  await sendText(uid, menuText, keyboard);
  return true;
}
