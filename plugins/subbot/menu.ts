// =======================================================================
//                           plugins/subbot/menu.ts
//          子机器人主菜单（绑定成功后进入的一级管理界面）
// =======================================================================

import { getSubBotById, safeUsername } from "./config.ts";

export async function subMenu(botId?: string) {
    if (!botId) {
        return {
            text: "⚙ 子机器人管理面板",
            keyboard: {
                inline_keyboard: [
                    [{ text: "🤖 我的子机器人", callback_data: "sub.list" }],
                    [{ text: "➕ 绑定新的子机器人", callback_data: "sub.bind" }],
                ]
            }
        };
    }

    const bot = await getSubBotById(botId);

    if (!bot) {
        return {
            text: "❌ 未找到该子机器人",
            keyboard: {
                inline_keyboard: [
                    [{ text: "⬅ 返回", callback_data: "sub.list" }]
                ]
            }
        };
    }

    const name = safeUsername(bot.username);

    const txt =
`🤖 *子机器人管理中心*

用户名：@${name}
本地 ID：\`${bot.id}\`
绑定账号：\`${bot.uid}\`
Token：\`${bot.token}\`

📅 到期时间：${new Date(bot.expire).toLocaleString()}

请选择要执行的操作：`;

    const keyboard = {
        inline_keyboard: [
            [{ text: "📢 群发广播", callback_data: `sub.bc.${bot.id}` }],
            [{ text: "🧩 九宫格菜单管理", callback_data: `sub.menu.${bot.id}` }],
            [{ text: "🎧 监听关键词", callback_data: `sub.listen.${bot.id}` }],
            [{ text: "⏳ 续费 / 升级 VIP", callback_data: `sub.renew.${bot.id}` }],
            [{ text: "🗑 删除子机器人", callback_data: `sub.del.${bot.id}` }],
            [{ text: "⬅ 返回列表", callback_data: `sub.list` }]
        ]
    };

    return { text: txt, keyboard };
}

