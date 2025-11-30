// =======================================================================
//                      plugins/subbot/handler.ts
//     子机器人系统：Token 绑定 / 广播文本输入 / 扩展预留
// =======================================================================

import { kv } from "../../db/kv.ts";
import { saveToken } from "./token.ts";
import { startBroadcast } from "./broadcast/index.ts";
import { getUserSubBots, getSubBotById } from "./config.ts";

// 工具函数：回复文本
async function sendReply(reply: Function, chatId: number, msg: string) {
    return reply(chatId, msg);
}

// ========================================================
//                主文本处理入口（ALL-IN-ONE）
// ========================================================
export async function handleSubMessage(msg: any, reply: Function) {
    const chatId = msg.from.id;
    const text = msg.text || "";

    // ========================================================
    // 1）用户正在绑定 Token
    // ========================================================
    const isBinding = await kv.get(["bind_wait", chatId]).then(r => r.value);

    if (isBinding) {
        const result = await saveToken(chatId, text); // 保存 Token
        return sendReply(reply, chatId, result);
    }

    // ========================================================
    // 2）用户正在输入广播内容
    // ========================================================
    const bcBotId = await kv.get(["sub_bc_wait", chatId]).then(r => r.value);

    if (bcBotId) {
        await kv.delete(["sub_bc_wait", chatId]);

        const bot = await getSubBotById(bcBotId);
        if (!bot) return sendReply(reply, chatId, "❌ 子机器人不存在");

        const result = await startBroadcast(chatId, bcBotId, text); // 广播内容
        return sendReply(reply, chatId, result);
    }

    // ========================================================
    // 3）用户正在编辑九宫格按钮（名称）
    // ========================================================
    const menuEdit = await kv.get(["sub_menu_edit", chatId]).then(r => r.value);

    if (menuEdit) {
        const { botId, index } = menuEdit;
        const bot = await getSubBotById(botId);

        if (!bot) {
            await kv.delete(["sub_menu_edit", chatId]);
            return sendReply(reply, chatId, "❌ 子机器人不存在");
        }

        bot.menus[index] = { text };
        await kv.set(["subbots", botId], bot);

        await kv.delete(["sub_menu_edit", chatId]);

        return sendReply(reply, chatId, `🧩 按钮 ${index + 1} 已更新为：${text}`);
    }

    // ========================================================
    // 4）用户正在设置九宫格按钮 URL
    // ========================================================
    const urlEdit = await kv.get(["sub_menu_url", chatId]).then(r => r.value);

    if (urlEdit) {
        const { botId, index } = urlEdit;
        const bot = await getSubBotById(botId);

        if (!bot) {
            await kv.delete(["sub_menu_url", chatId]);
            return sendReply(reply, chatId, "❌ 子机器人不存在");
        }

        if (!bot.menus[index]) bot.menus[index] = {};
        bot.menus[index].url = text;

        await kv.set(["subbots", botId], bot);
        await kv.delete(["sub_menu_url", chatId]);

        return sendReply(reply, chatId, `🔗 URL 已设置为：${text}`);
    }

    // ========================================================
    // 5）监听关键词设置（VIP）
    // ========================================================
    const listenKey = await kv.get(["sub_listen_key", chatId]).then(r => r.value);

    if (listenKey) {
        const { botId } = listenKey;

        await kv.set(["sub_listen_reply", botId], text);
        await kv.delete(["sub_listen_key", chatId]);

        return sendReply(reply, chatId, `🎧 监听回复已设置为：${text}`);
    }

    // ========================================================
    // 6）监听系统（关键词 → 回复）
    // ========================================================
    const subbots = await getUserSubBots(chatId);

    if (subbots.length > 0 && !text.startsWith("/")) {
        for (const b of subbots) {
            const key = await kv.get(["sub_listen_key", b.id]).then(r => r.value);
            const replyMsg = await kv.get(["sub_listen_reply", b.id]).then(r => r.value);

            if (key && text.includes(key)) {
                // 这将来调用子机器人 API 回复
                return sendReply(reply, chatId, `🎧 触发监听回复：${replyMsg}`);
            }
        }
    }

    // ========================================================
    // 无匹配 → 不做处理
    // ========================================================
    return;
}
