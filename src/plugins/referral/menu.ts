// ======================================================================
//                       plugins/referral/menu.ts
//                  推广主菜单（显示个人专属链接）
// ======================================================================

import { getReferral } from "../../db/referraldb.ts";

export async function referralMenu(uid: number) {
  const r = await getReferral(uid);

  const link = `https://t.me/${Deno.env.get("BOT_USERNAME")}?start=${uid}`;

  let text =
    `👥 <b>推广中心</b>\n\n` +
    `🔗 你的推广链接：\n<code>${link}</code>\n\n` +
    `📊 数据统计：\n` +
    `• 点击次数：${r?.clicks || 0}\n` +
    `• 成功邀请：${r?.invites || 0}\n` +
    `• 总收益：${r?.income || 0} USDT\n\n` +
    `💰 VIP 推广奖励：40%\n` +
    `（推广用户开通 VIP → 你自动获得 40% USDT）\n`;

  return {
    text,
    keyboard: {
      inline_keyboard: [
        [
          { text: "📜 查看下级列表", callback_data: "ref_children" }
        ],
        [
          { text: "⬅️ 返回主菜单", callback_data: "back_main" }
        ]
      ]
    }
  };
}
