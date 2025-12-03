// ======================================================================
//                       plugins/ads/callback.ts
//                处理广告设置的所有按钮事件
// ======================================================================

import { updateAds, setAd, clearAd } from "../../db/addb.ts";
import { adsMenu } from "./menu.ts";
import { sendText } from "../../core/send.ts";

export async function onAdsCallback(uid: number, data: string) {

  // 开关广告
  if (data === "ads_toggle") {
    await updateAds({ enabled: false });
    const menu = await adsMenu();
    await sendText(uid, menu.text, menu.keyboard);
    return true;
  }

  // 设置横幅/弹窗（进入文本输入模式）
  if (data.startsWith("ads_edit_")) {
    const key = data.replace("ads_edit_", "banner_")
      .replace("banner_top", "banner_top")
      .replace("banner_bottom", "banner_bottom")
      .replace("banner_popup", "popup")
      .replace("banner_supply", "supply_banner");

    await sendText(uid, `📝 请发送新的广告内容（文本/HTML/链接均可）\n键：${key}`);
    globalThis.waitingAds = { uid, key };
    return true;
  }

  // 清空广告
  if (data === "ads_clear_all") {
    await updateAds({
      banner_top: "",
      banner_bottom: "",
      popup: "",
      supply_banner: ""
    });

    const menu = await adsMenu();
    await sendText(uid, "🧹 已清空所有广告。\n", menu.keyboard);
    return true;
  }

  return false;
}

