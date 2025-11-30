// plugins/affiliate/callback.ts
import { getUser, saveUser } from "../../db/userdb.ts";
import { AFFILIATE_LEVELS } from "./rules.ts";
import { buildTree } from "./tree.ts";
import { affiliateMenu } from "./menu.ts";

export async function handleAffiliateCallback(update: any, reply: Function) {
    const cq = update.callback_query;
    if (!cq) return;

    const data = cq.data;
    const chatId = cq.from.id;

    if (data === "aff.link") {
        const link = `https://t.me/YourMenuBot?start=${chatId}`;
        return reply(chatId, `📣 *推广链接*\n\n${link}`);
    }

    if (data === "aff.stats") {
        const user = await getUser(chatId);
        const msg =
            `📊 *推广数据*\n\n` +
            `👥 下级人数：${user.referrals || 0}\n` +
            `📈 点击次数：${user.referral_clicks || 0}\n` +
            `💰 获得收益：${user.referral_income || 0}U\n`;

        return reply(chatId, msg, affiliateMenu(chatId));
    }

    if (data === "aff.tree") {
        const tree = await buildTree(chatId);
        return reply(chatId, `🌳 *推广结构图*\n\n${tree}`);
    }
}

