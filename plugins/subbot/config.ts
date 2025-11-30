// =======================================================================
//                           plugins/subbot/config.ts
//     子机器人数据库管理（绑定 / 菜单 / 广播 / 监听 / 到期 / 用户数据）
// =======================================================================

import { kv } from "../../db/kv.ts";

// -------------------------------------------------------
// 子机器人结构定义
// -------------------------------------------------------
export interface SubBot {
    id: string;                // 子机器人本地唯一 ID（不是 Telegram Bot ID）
    uid: number;               // 主账号 Telegram ID（绑定者）
    token: string;             // 子机器人 Token
    username: string;          // 机器人 @username
    created: number;           // 创建时间
    expire: number;            // 到期时间（时间戳 ms）
    menus: any[];              // 九宫格菜单按钮
}

// -------------------------------------------------------
// 读取子机器人
// -------------------------------------------------------
export async function getSubBotById(id: string): Promise<SubBot | null> {
    const data = await kv.get(["subbots", id]);
    return data.value || null;
}

// -------------------------------------------------------
// 保存子机器人（覆盖全部字段）
// -------------------------------------------------------
export async function saveSubBot(bot: SubBot) {
    await kv.set(["subbots", bot.id], bot);
}

// -------------------------------------------------------
// 删除子机器人
// -------------------------------------------------------
export async function deleteSubBot(id: string) {
    await kv.delete(["subbots", id]);
}

// -------------------------------------------------------
// 获取某个用户的全部子机器人
// -------------------------------------------------------
export async function getUserSubBots(uid: number): Promise<SubBot[]> {
    const list: SubBot[] = [];

    const iter = kv.list({ prefix: ["subbots"] });

    for await (const item of iter) {
        const bot = item.value as SubBot;
        if (bot.uid === uid) list.push(bot);
    }

    return list;
}

// -------------------------------------------------------
// 获取子机器人的菜单（九宫格）
// -------------------------------------------------------
export async function getSubBotMenu(id: string): Promise<any[]> {
    const bot = await getSubBotById(id);
    return bot?.menus || [];
}

// -------------------------------------------------------
// 更新某个菜单按钮
// -------------------------------------------------------
export async function updateSubBotMenu(id: string, index: number, data: any) {
    const bot = await getSubBotById(id);
    if (!bot || !bot.menus[index]) return;

    bot.menus[index] = { ...bot.menus[index], ...data };
    await saveSubBot(bot);
}

// -------------------------------------------------------
// 删除菜单按钮
// -------------------------------------------------------
export async function deleteSubBotMenu(id: string, index: number) {
    const bot = await getSubBotById(id);
    if (!bot) return;

    bot.menus.splice(index, 1);
    await saveSubBot(bot);
}

// -------------------------------------------------------
// 添加菜单按钮
// -------------------------------------------------------
export async function appendSubBotMenu(id: string, btn: any) {
    const bot = await getSubBotById(id);
    if (!bot) return;

    bot.menus.push(btn);
    await saveSubBot(bot);
}

// -------------------------------------------------------
// 监听系统：读取关键词
// -------------------------------------------------------
export async function getListenWord(botId: string): Promise<string | null> {
    const res = await kv.get(["sub_listen_word", botId]);
    return res.value || null;
}

// -------------------------------------------------------
// 监听系统：读取回复内容
// -------------------------------------------------------
export async function getListenReply(botId: string): Promise<string | null> {
    const res = await kv.get(["sub_listen_reply", botId]);
    return res.value || null;
}

// -------------------------------------------------------
// 判断是否到期
// -------------------------------------------------------
export function isSubBotExpired(bot: SubBot): boolean {
    return Date.now() > bot.expire;
}

// -------------------------------------------------------
// 延长子机器人的 VIP / 时长
// -------------------------------------------------------
export async function extendSubBot(botId: string, days: number) {
    const bot = await getSubBotById(botId);
    if (!bot) return;

    bot.expire += days * 24 * 3600 * 1000;
    await saveSubBot(bot);
}

// -------------------------------------------------------
// 安全获取用户名（用于显示）
// -------------------------------------------------------
export function safeUsername(name: string) {
    return name?.replace("@", "") || "UnknownBot";
}

