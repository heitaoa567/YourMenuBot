// plugins/subbot/menus/edit.ts

import { kv } from "../../../db/kv.ts";
import { getSubBotById, saveSubBotMenu, deleteSubBotMenu } from "../config.ts";

export async function startEditButton(chatId: number, botId: string, index: number) {
    await kv.set(["sub_menu_edit", chatId], { botId, index });
}

export async function startEditUrl(chatId: number, botId: string, index: number) {
    await kv.set(["sub_menu_url", chatId], { botId, index });
}

export async function addNewButton(botId: string) {
    const bot = await getSubBotById(botId);
    if (!bot) return;

    bot.menus.push({ text: "新按钮", type: "callback", callback: "none" });
    await kv.set(["subbots", botId], bot);
}

export async function removeButton(botId: string, index: number) {
    await deleteSubBotMenu(botId, index);
}

