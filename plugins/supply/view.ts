// ======================================================================
//                   plugins/supply/view.ts
//               用户查看所有供需（自动排序）
// ======================================================================

import { getSupplyList, addView } from "../../db/supplydb.ts";
import { sendText } from "../../core/send.ts";
import { isVIP } from "../vip/check.ts";
import { getAdsForUser } from "../../db/addb.ts";

export async function showSupplyList(uid: number) {
  const list = await getSupplyList();
  const vip = await isVIP(uid);
  const ads = await getAdsForUser(vip);

  let txt = "📦 <b>供需列表</b>\n\n";

  if (!vip && ads.supply_banner) {
    txt += `<i>广告：</i>\n${ads.supply_banner}\n\n`;
  }

  if (list.length === 0) {
    await sendText(uid, txt + "暂无供需信息");
    return;
  }

  for (const it of list) {
    txt += `#${it.id} ${it.top ? "📌(置顶)" : ""}\n<b>${it.title}</b>\n${it.content}\n👁 ${it.views} 次浏览\n\n`;
    await addView(it.id);
  }

  await sendText(uid, txt);
}

