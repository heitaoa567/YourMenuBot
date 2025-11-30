// ======================================================================
//                  plugins/subbot/config.ts
//   子机器人数据管理：读写子机器人、更新信息、用户列表
// ======================================================================

import { kv } from "../../db/kv.ts";

// ----------------------------------------------------------
// 结构：子机器人
// ----------------------------------------------------------
export interface SubBot {
    id: string;       // uuid
    uid: number;      // 属于哪个用户
    token: string;    // 子机器人 Token
    username: string; // 子机器人 @username（可自动获取）
    created: number;  // 绑定时间
    expire: number;   // 到期时间
    menus: any[];     // 九宫格菜单按钮
}

// 子机器人根路径
const ROOT = "subbots";

// ==========================================================
// 1）获取用户的所有子机器人
// ==========================================================
export async function getUserSubBots(uid: number): Promise<SubBot[]> {
    const iter = kv.list({ prefix: [ROOT] });

    const arr: SubBot[] = [];
    for await (const { value } of iter) {
        if (value.uid === uid) arr.push(value);
    }

    // 按时间排序（最新在前）
    arr.sort((a, b) => b.created - a.created);

    return arr;
}

// ==========================================================
// 2）根据 botId 获取子机器人
// ==========================================================
export async function getSubBotById(botId: string): Promise<SubBot | null> {
    const data = await kv.get([ROOT, botId]).then(r => r.value);
    return data || null;
}

// ==========================================================
// 3）保存子机器人（更新菜单/续费等）
// ==========================================================
export async function saveSubBot(bot: SubBot): Promise<void> {
    await kv.set([ROOT, bot.id], bot);
}

// ==========================================================
// 4）删除子机器人
// ==========================================================
export async function deleteSubBot(botId: string): Promise<void> {
    await kv.delete([ROOT, botId]);
}

// ==========================================================
// 5）子机器人用户列表（广播使用）
//    注意：此处你未来可以接子机器人 webhook 收集用户
// ==========================================================
export async function getUsersOfSubbot(botId: string): Promise<number[]> {
    const key = ["subbot_users", botId];

    const data = await kv.get(key).then(r => r.value);
    if (!data) return [];

    return data;
}

// 将用户加入子机器人用户列表（供广播用）
export async function addUserToSubbot(botId: string, uid: number): Promise<void> {
    const key = ["subbot_users", botId];
    const users: number[] = await kv.get(key).then(r => r.value || []);

    if (!users.includes(uid)) users.push(uid);

    await kv.set(key, users);
}

// ==========================================================
// 6）自动更新子机器人 username
// ==========================================================
export async function updateSubBotUsername(bot: SubBot): Promise<SubBot> {
    try {
        const tg = `https://api.telegram.org/bot${bot.token}/getMe`;
        const res = await fetch(tg);
        const data = await res.json();

        if (data.ok) {
            bot.username = data.result.username;
            await saveSubBot(bot);
        }
    } catch {
        // 忽略错误
    }

    return bot;
}

// ==========================================================
// 7）检查子机器人是否过期
// ==========================================================
export function isSubBotExpired(bot: SubBot): boolean {
    return Date.now() > bot.expire;
}

// ==========================================================
// 8）延长子机器人有效期
// ==========================================================
export async function extendSubBot(botId: string, days: number): Promise<void> {
    const bot = await getSubBotById(botId);
    if (!bot) return;

    bot.expire += days * 24 * 3600 * 1000;

    await saveSubBot(bot);
}

// ==========================================================
// 9）九宫格菜单：获取
// ==========================================================
export function getSubBotMenus(bot: SubBot): any[] {
    return bot.menus || [];
}

// ==========================================================
// 10）九宫格菜单：设置按钮
// ==========================================================
export async function setSubBotMenu(botId: string, index: number, button: any) {
    const bot = await getSubBotById(botId);
    if (!bot) return;

    if (!bot.menus) bot.menus = [];

    bot.menus[index] = button;

    await saveSubBot(bot);
}

// ==========================================================
// 11）九宫格菜单：删除某按钮
// ==========================================================
export async function deleteSubBotMenu(botId: string, index: number) {
    const bot = await getSubBotById(botId);
    if (!bot) return;

    if (!bot.menus) return;

    bot.menus.splice(index, 1);

    await saveSubBot(bot);
}

// ==========================================================
// 12）九宫格菜单：清空所有按钮
// ==========================================================
export async function clearSubBotMenus(botId: string) {
    const bot = await getSubBotById(botId);
    if (!bot) return;

    bot.menus = [];

    await saveSubBot(bot);
}

