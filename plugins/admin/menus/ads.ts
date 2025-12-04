// =======================================
// plugins/admin/menus/ads.ts
// 广告后台管理界面（完整）
// =======================================

import { sendMsg } from "../../../core/send";
import { SubBotDB } from "../../../subbotdb";

export async function showAdminAdsMenu(ctx: any) {

  const ads = SubBotDB.getAllAds();  // 返回广告列表（未来你可以存在 DB）

  if (!ads || ads.length === 0) {
    await sendMsg(ctx, "📰 当前没有广告位，请添加一个。");
  }

  let text = `📰 *广告管理后台*\n\n共 ${ads.length} 个广告位：\n`;

  ads.forEach((ad: any, i: number) => {
    text += `
${i + 1}. *广告位：${ad.slot}*
内容预览：${ad.text?.slice(0, 30) || "无内容"}...
状态：${ad.enabled ? "🟩 开启" : "🟥 关闭"}
——————`;
  });

  const keyboard = {
    inline_keyboard: [
      [
        { text: "➕ 添加广告位", callback_data: "admin_ads_add" }
      ],
      [
        { text: "🔙 返回后台", callback_data: "admin_main" }
      ]
    ]
  };

  await sendMsg(ctx, text, {
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
}


// =======================================
// 展示单独广告位的操作菜单
// =======================================
export async function showAdminAdsDetail(ctx: any, slot: string) {

  const ad = SubBotDB.getAd(slot);

  if (!ad) {
    return sendMsg(ctx, "❌ 未找到此广告位");
  }

  const text =
`📰 *广告位：${slot}*

当前状态：${ad.enabled ? "🟩 开启" : "🟥 关闭"}
内容预览：
${ad.text || "（还没有内容）"}

请选择操作：`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "✏️ 修改广告内容", callback_data: `admin_ads_edit_${slot}` }
      ],
      [
        { text: ad.enabled ? "🟥 关闭广告" : "🟩 开启广告", callback_data: `admin_ads_toggle_${slot}` }
      ],
      [
        { text: "🗑 删除广告位", callback_data: `admin_ads_delete_${slot}` }
      ],
      [
        { text: "🔙 返回广告列表", callback_data: "admin_ads" }
      ]
    ]
  };

  await sendMsg(ctx, text, {
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
}
