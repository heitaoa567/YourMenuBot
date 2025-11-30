// plugins/subbot/handler.ts

import { saveToken } from "./token.ts";

export async function handleSubMessage(msg: any, reply: Function) {
    const text = msg.text || "";
    const chatId = msg.from.id;

    // 尝试保存 Token
    if (text.includes(":")) {
        const result = await saveToken(chatId, text);
        return reply(chatId, result);
    }

    // 广播内容
    if (text.startsWith("/sub_bc ")) {
        const bc = text.replace("/sub_bc ", "");
        return reply(chatId, "📢（广播功能待写入子机器人 API）");
    }
}

