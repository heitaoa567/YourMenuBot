// ======================================================================
//                      plugins/ads/handler.ts
//       处理管理员输入广告内容（绑定 waitingAds）
// ======================================================================

import { setAd } from "../../db/addb.ts";
import { adsMenu } from "./menu.ts";
import { sendText } from "../../core/send.ts";

export async function onAdsMessage(uid: number, text: string) {

  if (!globalThis.waitingAds) return false;

  const { uid: targetUid, key } = globalThis.waitingAds;

  if (uid !== targetUid) return false;

  await setAd(key, text);

  delete globalThis.waitingAds;

  const menu = await adsMenu();
  await sendText(uid, "🎉 广告已更新！", menu.keyboard);

  return true;
}

