// ========================================
//         VIP 插件按钮事件 - callback.ts
// ========================================

import { VIP_PLANS } from "./plans.ts";
import { extendVIP } from "./perms.ts";
import { checkTxid, markPayment } from "./payment.ts";
import { sendPromotionInfo } from "./affiliate.ts";
import { getUser, saveUser } from "../../db/userdb.ts";
import { TG } from "../../main.ts";
import { vipMenu } from "./menu.ts";

// 全局发送函数
async function sendText(chatId: number, text: string, keyboard?: any) {
  await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    }),
  });
}

export async function vipOnCallback(chatId: number, data: string, cq: any) {

  // ==========================
  // 1. 用户选择套餐 vip_buy_xxx
  // ==========================
  if (data.startsWith("vip_buy_")) {
    const id = data.replace("vip_buy_", "");
    const plan = VIP_PLANS.find(p => p.id === id);

    if (!plan) {
      await sendText(chatId, "❌ 套餐不存在，请重试。");
      return "handled";
    }

    // 保存用户当前选择的套餐
    const user = await getUser(chatId);
    user.pending_plan = plan.id;
    await saveUser(chatId, user);

    await sendText(chatId,
      `💎 你选择了：*${plan.name}*\n\n` +
      `请支付 *${plan.price} USDT* 至下方地址：\n\n` +
      `\`${Deno.env.get("USDT_ADDRESS")}\`\n\n` +
      `支付完成后发送：\n` +
      `pay 你的TXID`,
    );

    return "handled";
  }

  // ==========================
  // 2. 用户提交支付凭证入口
  // ==========================
  if (data === "vip_pay") {
    await sendText(chatId,
      "💳 *请发送你的 USDT-TRC20 TxID*\n\n格式：\n`pay TxID_here`",
    );
    return "handled";
  }

  // ==========================
  // 3. 推广大裂变入口
  // ==========================
  if (data === "vip_aff") {
    const msg = await sendPromotionInfo(chatId);
    await sendText(chatId, msg);
    return "handled";
  }

  // ==========================
  // 4. 返回主菜单
  // ==========================
  if (data === "back") {
    const menu = await vipMenu(chatId);
    await sendText(chatId, menu.text, menu.keyboard);
    return "handled";
  }

  return "ok";
}

