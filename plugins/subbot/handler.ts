// =======================================================================
//                      plugins/subbot/handler.ts
// =======================================================================

import { kv } from "../../db/kv.ts";
import { saveToken } from "./token.ts";
import { startBroadcast } from "./broadcast/index.ts";
import { getSubBotById, getUserSubBots } from "./config.ts";

// 回复工具
async function sendReply(reply: Function, chatId: number, msg: string) {
    return reply(chatId, msg);
}

export async function handleSubMessage(msg: any, reply: Function) {
    const chatId = msg.from.id;
    const text = msg.text || "";

    // ========================================================
    // 1）正在绑定 Token
    // ========================================================
    const binding = await kv.get(["bind_wait", chatId]).then(r => r.value);
    if (binding) {
        await kv.delete(["bind_wait", chatId]);
        const result = await saveToken(chatId, text);
        return sendReply(reply, chatId, result);
    }

    // ========================================================
    // 2）正在输入广播内容
    // ========================================================
    const bcBotId = await kv.get(["sub_bc_wait", chatId]).then(r => r.value);
    if (bcBotId) {
        await kv.delete(["sub_bc_wait", chatId]);

        const res = await startBroadcast(chatId, bcBotId, text);
        return sendReply(reply, chatId, res);
    }

    // ========================================================
    // 3）编辑按钮文字
    // ========================================================
    const editing = await kv.get(["sub_menu_edit", chatId]).then(r => r.value);
    if (editing) {
        const { botId, index } = editing;

        const bot = await getSubBotById(botId);
        if (!bot) return sendReply(reply, chatId, "❌ 子机器人不存在");

        bot.menus[index].text = text;

        await kv.set(["subbots", botId], bot);
        await kv.delete(["sub_menu_edit", chatId]);

        return sendReply(reply, chatId, `✏️ 按钮 ${index + 1} 文案已更新！`);
    }

    // ========================================================
    // 4）编辑按钮 URL
    // ========================================================
    const urlEdit = await kv.get(["sub_menu_url", chatId]).then(r => r.value);
    if (urlEdit) {
        const { botId, index } = urlEdit;

        const bot = await getSubBotById(botId);
        if (!bot) return sendReply(reply, chatId, "❌ 子机器人不存在");

        bot.menus[index].url = text;
        bot.menus[index].type = "url";

        await kv.set(["subbots", botId], bot);
        await kv.delete(["sub_menu_url", chatId]);

        return sendReply(reply, chatId, `🔗 URL 已设置为：${text}`);
    }

    // ========================================================
    // 5）监听关键词（设置关键词）
    // ========================================================
    const setKey = await kv.get(["sub_listen_key", chatId]).then(r => r.value);
    if (setKey) {
        const { botId } = setKey;

        await kv.set(["sub_listen_word", botId], text);
        await kv.delete(["sub_listen_key", chatId]);

        await kv.set(["sub_listen_reply_wait", chatId], botId);

        return sendReply(reply, chatId, "请输入触发后的自动回复内容：");
    }

    // ========================================================
    // 6）监听回复（设置回复内容）
    // ========================================================
    const replyWait = await kv.get(["sub_listen_reply_wait", chatId]).then(r => r.value);
    if (replyWait) {
        const botId = replyWait;

        await kv.set(["sub_listen_reply", botId], text);
        await kv.delete(["sub_listen_reply_wait", chatId]);

        return sendReply(reply, chatId, `🎧 监听回复已设置为：${text}`);
    }

    // ========================================================
    // 7）触发监听系统（用户触发关键词）
    // ========================================================
    const bots = await getUserSubBots(chatId);
    for (const bot of bots) {
        const key = await kv.get(["sub_listen_word", bot.id]).then(r => r.value);
        const rep = await kv.get(["sub_listen_reply", bot.id]).then(r => r.value);

        if (key && rep && text.includes(key)) {
            return sendReply(reply, chatId, `🎧 自动回复：${rep}`);
        }
    }

    // ========================================================
    // 普通消息 → 不处理
    // ========================================================
    return;
}

