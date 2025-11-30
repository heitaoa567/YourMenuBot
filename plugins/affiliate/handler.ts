// plugins/affiliate/handler.ts
import { affiliateMenu } from "./menu.ts";

export async function handleAffiliateText(msg: any, reply: Function) {
    if (!msg.text.startsWith("/aff")) return;

    const chatId = msg.from.id;
    await reply(chatId, "📣 *推广中心*", affiliateMenu(chatId));
}

