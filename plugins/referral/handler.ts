// ======================================================================
//                    plugins/referral/handler.ts
//       文本触发：用户输入“推广” 或 “ref” 进入推广中心
// ======================================================================

import { referralMenu } from "./menu.ts";
import { sendText } from "../../core/send.ts";

export async function onReferralMessage(uid: number, text: string) {
  if (text.toLowerCase() !== "ref" && text !== "推广") return false;

  const menu = await referralMenu(uid);
  await sendText(uid, menu.text, menu.keyboard);

  return true;
}
