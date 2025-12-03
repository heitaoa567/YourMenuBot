// ======================================================================
//                        plugins/ads/menu.ts
//                        广告后台菜单（管理员）
// ======================================================================

import { getAds } from "../../db/addb.ts";

export async function adsMenu() {
  const ads = await getAds();

  return {
    text:
      `🖼 <b>广告管理</b>\n\n` +
      `状态：${ads.enabled ? "🟢 开启" : "🔴 关闭"}\n\n` +
      `• 顶部横幅：${ads.banner_top ? "✔" : "❌"}\n` +
      `• 底部横幅：${ads.banner_bottom ? "✔" : "❌"}\n` +
      `• 弹窗广告：${ads.popup ? "✔" : "❌"}\n` +
      `• 供需广告：${ads.supply_banner ? "✔" : "❌"}\n`,
    keyboard: {
      inline_keyboard: [
        [
          { text: ads.enabled ? "🔴 关闭广告" : "🟢 开启广告", callback_data: "ads_toggle" }
        ],
        [
          { text: "📝 设置顶部横幅", callback_data: "ads_edit_top" }
        ],
        [
          { text: "📝 设置底部横幅", callback_data: "ads_edit_bottom" }
        ],
        [
          { text: "📝 设置弹窗", callback_data: "ads_edit_popup" }
        ],
        [
          { text: "📝 设置供需广告", callback_data: "ads_edit_supply" }
        ],
        [
          { text: "🧹 清空所有广告", callback_data: "ads_clear_all" }
        ],
        [
          { text: "⬅️ 返回菜单", callback_data: "back_main" }
        ]
      ]
    }
  };
}

