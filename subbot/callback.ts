// =======================================================================
//                      plugins/subbot/callback.ts
//     子机器人系统完整 ALL-IN-ONE 版（绑定 / 广播 / 续费 / 九宫格 / 删除）
// =======================================================================

import { kv } from "../../db/kv.ts";
import { startBind } from "./token.ts";
import { subMenu } from "./menu.ts";
import { getUserSubBots, getSubBotById } from "./config.ts";
import { startBroadcast } from "./broadcast/index.ts";

// 回复工具（附带默认子机器人菜单）
async function sendReply(reply: Function, chatId: number, msg: string, menu?: any) {
    return reply(chatId, msg, menu || subMenu());
}

// =========================================================
//                        主入口
// =========================================================
export async function handleSubCallback(update: any, reply: Function) {
    const data = update.callback_query.data;
    const chatId = update.callback_query.from.id;

    // =========================================================
    // 1）绑定子机器人 Token
    // =========================================================
    if (data === "sub.bind") {
        await startBind(chatId);
        return sendReply(reply, chatId,
            "🔑 *请输入你的子机器人 Token：*\n格式类似：`123456:ABCDEFxxxx`");
    }

    // =========================================================
    // 2）查看我的子机器人列表
    // =========================================================
    if (data === "sub.list") {
        const bots = await getUserSubBots(chatId);

        if (bots.length === 0) {
            return sendReply(reply, chatId, "❌ 当前账号没有绑定任何子机器人");
        }

        let txt = "🤖 *你的子机器人*\n\n";
        const keyboard = { inline_keyboard: [] };

        for (const b of bots) {
            txt += `• *${b.username || "未获取"}*\n`;
            txt += `ID：\`${b.id}\`\n`;
            txt += `到期：${new Date(b.expire).toLocaleString()}\n\n`;

            keyboard.inline_keyboard.push([
                { text: `⚙ 管理：${b.username}`, callback_data: `sub.manage.${b.id}` }
            ]);
        }

        keyboard.inline_keyboard.push([{ text: "⬅ 返回", callback_data: "menu.back" }]);

        return reply(chatId, txt, keyboard);
    }

    // =========================================================
    // 3）进入管理页面（单个子机器人）
    // =========================================================
    if (data.startsWith("sub.manage.")) {
        const botId = data.replace("sub.manage.", "");
        const bot = await getSubBotById(botId);

        if (!bot) return sendReply(reply, chatId, "❌ 该子机器人不存在");

        const txt =
`🤖 *子机器人管理*
用户名：${bot.username}
ID：\`${bot.id}\`
Token：\`${bot.token}\`

到期时间：${new Date(bot.expire).toLocaleString()}

请选择你要执行的操作：`;

        const keyboard = {
            inline_keyboard: [
                [{ text: "📢 群发广播", callback_data: `sub.bc.${botId}` }],
                [{ text: "🧩 九宫格菜单管理", callback_data: `sub.menu.${botId}` }],
                [{ text: "🎧 开启监听功能", callback_data: `sub.listen.${botId}` }],
                [{ text: "⏳ 续费 / 升级 VIP", callback_data: `sub.renew.${botId}` }],
                [{ text: "🗑 删除子机器人", callback_data: `sub.del.${botId}` }],
                [{ text: "⬅ 返回列表", callback_data: "sub.list" }]
            ]
        };

        return reply(chatId, txt, keyboard);
    }

    // =========================================================
    // 4）广播入口（设置为等待输入）
    // =========================================================
    if (data.startsWith("sub.bc.")) {
        const botId = data.replace("sub.bc.", "");

        await kv.set(["sub_bc_wait", chatId], botId);

        return sendReply(
            reply,
            chatId,
            "📢 请输入你要广播的内容：\n\n*普通用户每天 1 次，VIP 无限次*"
        );
    }

    // =========================================================
    // 5）九宫格菜单入口（功能预留）
    // =========================================================
    if (data.startsWith("sub.menu.")) {
        const botId = data.replace("sub.menu.", "");

        return sendReply(reply, chatId,
`🧩 *九宫格菜单管理（即将开放）*
Bot ID: ${botId}

功能将包括：
- 添加按钮
- 删除按钮
- 设置按钮文字 / 链接 / 回调
- 调整顺序
- 保存到子机器人`);
    }

    // =========================================================
    // 6）监听系统（VIP 专属功能）
    // =========================================================
    if (data.startsWith("sub.listen.")) {
        const botId = data.replace("sub.listen.", "");

        return sendReply(reply, chatId,
`🎧 *监听系统（VIP 功能）*
Bot ID: ${botId}

可监听：
- 群消息
- 私聊输入
- 用户触达
- 关键词自动回复

⚠ 即将在 VIP 高级版上线`);
    }

    // =========================================================
    // 7）续费入口
    // =========================================================
    if (data.startsWith("sub.renew.")) {
        const botId = data.replace("sub.renew.", "");

        return sendReply(
            reply,
            chatId,
            "⏳ *请选择续费时长：*",
            {
                inline_keyboard: [
                    [{ text: "7 天（$2）", callback_data: `sub.pay.7.${botId}` }],
                    [{ text: "30 天（$5）", callback_data: `sub.pay.30.${botId}` }],
                    [{ text: "90 天（$10）", callback_data: `sub.pay.90.${botId}` }],
                    [{ text: "365 天（$30）", callback_data: `sub.pay.365.${botId}` }],
                    [{ text: "⬅ 返回", callback_data: `sub.manage.${botId}` }]
                ]
            }
        );
    }

    // =========================================================
    // 8）续费支付处理（直接延长 expire）
    // =========================================================
    if (data.startsWith("sub.pay.")) {
        const [, , daysStr, botId] = data.split(".");
        const days = Number(daysStr);
        const bot = await getSubBotById(botId);

        if (!bot) return sendReply(reply, chatId, "❌ 子机器人不存在");

        bot.expire += days * 24 * 3600 * 1000;

        await kv.set(["subbots", botId], bot);

        return sendReply(reply, chatId, `🎉 已成功续费 *${days} 天*！`);
    }

    // =========================================================
    // 9）删除子机器人
    // =========================================================
    if (data.startsWith("sub.del.")) {
        const botId = data.replace("sub.del.", "");

        await kv.delete(["subbots", botId]);

        return sendReply(reply, chatId, "🗑 已删除子机器人");
    }
}
