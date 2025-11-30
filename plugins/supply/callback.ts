// plugins/supply/callback.ts
import { browseSupply } from "./browse.ts";
import { mySupplyList } from "./stats.ts";
import { supplyMenu } from "./menu.ts";

export async function handleSupplyCallback(update: any, reply: Function) {
    const data = update.callback_query.data;
    const chatId = update.callback_query.from.id;

    if (data === "supply.new") {
        return reply(chatId, "📝 发送 /post 开始发布供需", supplyMenu());
    }

    if (data === "supply.browse") {
        const txt = await browseSupply(1);
        return reply(chatId, txt, supplyMenu());
    }

    if (data === "supply.my") {
        const txt = await mySupplyList(chatId);
        return reply(chatId, txt, supplyMenu());
    }
}

