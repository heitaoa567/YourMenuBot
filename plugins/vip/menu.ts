// ========================================
//           VIP 插件菜单 - menu.ts
// ========================================

import { getUser } from "../../db/userdb.ts";
import { VIP_PLANS } from "./plans.ts";

export async function vipMenu(chatId: number) {
  const user = await getUser(chatId);
  const isVIP = user.vip_until && user.vip_until > Date.now();

  const vipStatus = isVIP
    ? `🟢 你的VIP有效期至：\n${new Date(user.vip_until).toLocaleString()}`
    : `🔴 你当前不是VIP`;

  // VIP 套餐按钮
  const planButtons = VIP_PLANS.map(p => {
    return [{
      text: `${p.name} - ${p.price}U`,
      callback_data: `vip_buy_${p.id}`
    }];
  });

  // 额外功能按钮
  const extraButtons = [
    [{ text: "💳 提交支付凭证 (TxID)", callback_data: "vip_pay" }],
    [{ text: "📈 推广赚钱（最高40%返佣）", callback_data: "vip_aff" }],
    [{ text: "🔙 返回主菜单", callback_data: "back" }]
  ];

  return {
    text: `💎 *VIP 会员中心*\n\n${vipStatus}\n\n请选择套餐：`,
    keyboard: {
      inline_keyboard: [...planButtons, ...extraButtons]
    }
  };
}

