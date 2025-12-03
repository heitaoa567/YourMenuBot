// ======================================================================
//                        plugins/referral/view.ts
//                   展示推广下级用户（child list）
// ======================================================================

import { getReferral, getAllReferrals } from "../../db/referraldb.ts";
import { sendText } from "../../core/send.ts";

export async function showChildren(uid: number) {
  const r = await getReferral(uid);
  if (!r || r.children.length === 0) {
    await sendText(uid, "📭 你还没有任何下级用户。");
    return;
  }

  let txt = "👥 <b>你的下级用户：</b>\n\n";

  r.children.forEach((id) => {
    txt += `• 用户 ID：${id}\n`;
  });

  await sendText(uid, txt);
}
