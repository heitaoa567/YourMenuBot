// ======================================================================
//                       plugins/vip/callback.ts
//       处理 VIP 按钮回调（购买 / 续费 / 钱包支付）
// ======================================================================

import { vipMenu } from "./menu.ts";
import { VIP_PLANS } from "./plans.ts";
import { sendText } from "../../core/send.ts";
import { upgradeVIP } from "./upgrade.ts";

export async function onCallback(uid: number, data: string) {
  if (!data.startsWith("vip_")) return false;

  // vip_buy_xxx
  if (data.startsWith("vip_buy_")) {
    const plan = data.replace("vip_buy_", "");

    if (!VIP_PLANS[plan]) {
      await sendText(uid, "⚠️ 套餐不存在，请重新选择");
      return true;
    }

    const p = VIP_PLANS[plan];

    await sendText(
      uid,
      `请支付 <b>${p.price} USDT</b> 到下方地址：\n\n` +
      `<code>${Deno.env.get("USDT_ADDRESS")}</code>\n\n` +
      `付款后发送：\n<code>pay TXID</code>\n（例如：pay 123abc456）`
    );

    return true;
  }

  return false;
}

