// plugins/subbot/menus/index.ts

import { getSubBotById } from "../config.ts";
import { renderSubMenu } from "./render.ts";
import { startEditButton, startEditUrl, addNewButton, removeButton } from "./edit.ts";

export async function generateMenuEditor(botId: string) {
    const bot = await getSubBotById(botId);
    if (!bot) return { text: "❌ 子机器人不存在", keyboard: { inline_keyboard: [] } };

    const menuList = bot.menus || [];

    let txt = `🧩 *九宫格按钮管理*\nBot: ${bot.username}\n\n当前共有 ${menuList.length} 个按钮：\n\n`;

    const keyboard = { inline_keyboard: [] };

    // 列出按钮
    menuList.forEach((btn, i) => {
        txt += `${i + 1}. ${btn.text}\n`;

        keyboard.inline_keyboard.push([
            { text: `✏️ 编辑文字`, callback_data: `sub.menu.edit.${botId}.${i}` },
            { text: `🔗 链接`, callback_data: `sub.menu.url.${botId}.${i}` },
            { text: `🗑 删除`, callback_data: `sub.menu.del.${botId}.${i}` }
        ]);
    });

    // 添加新按钮
    keyboard.inline_keyboard.push([
        { text: "➕ 添加新按钮", callback_data: `sub.menu.add.${botId}` }
    ]);

    // 返回
    keyboard.inline_keyboard.push([
        { text: "⬅ 返回", callback_data: `sub.manage.${botId}` }
    ]);

    return { text: txt, keyboard };
}

