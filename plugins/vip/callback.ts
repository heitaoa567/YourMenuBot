// plugins/vip/callback.ts
import { VIP_PLANS } from "./plans.ts";
import { addVIPDays } from "./perms.ts";
import { getUser, saveUser } from "../../db/userdb.ts";
import { ledgerAdd } from "../../wallet/ledger.ts";

export async function handleVIPCallback(update: any, reply: Function) {
    if (!update.callback_query) return;

    const cq = update.callback_query;
    const data = cq.data;
    const chatId = cq.from.id;

    if (!data.startsWith("vip.buy.")) return;

    const key = data.replace("vip.buy.", "");
    const plan = VIP_PLANS[key];
    if (!plan) return reply(chatId, "❌ 套餐不存在");

    const user = await getUser(chatId);

    // 扣费（检查余额）
    if ((user.balance || 0) < plan.price) {
        return reply(chatId,
            `💰 *余额不足*\n\n当前余额：${user.balance || 0} U\n套餐价格：${plan.price} U`,
            {
                inline_keyboard: [
                    [{ text: "💳 充值 USDT", callback_data: "wallet.deposit" }],
                    [{ text: "⬅ 返回", callback_data: "menu.back" }]
                ]
            }
        );
    }

    // 扣除余额
    user.balance -= plan.price;

    // 增加账单记录
    ledgerAdd(chatId, -plan.price, `购买VIP-${plan.name}`);

    // 增加 VIP 天数
    addVIPDays(user, plan.days);

    await saveUser(chatId, user);

    return reply(chatId,
        `🎉 *购买成功！*\n\n已为你开通：*${plan.name}*\n有效期至：${new Date(user.vip_until).toLocaleString()}`);
}
