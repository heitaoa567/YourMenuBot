// ======================================================================
//                           db/subbotdb.ts
//       子机器人数据库（Token / 用户 / 按钮 / 统计 / 广播）
// ======================================================================

import {
  SubBotData,
  SubBotButton,
  SubBotUser,
} from "../types.ts";

const FILE = "./db/data/subbots.json";

// 内存缓存
let cache: Record<number, SubBotData> = {};


// ======================================================================
//                      加载数据库
// ======================================================================
async function loadDB() {
  try {
    const text = await Deno.readTextFile(FILE);
    cache = JSON.parse(text);
  } catch {
    console.warn("⚠️ subbots.json 不存在，正在创建...");
    cache = {};
    await saveDB();
  }
}


// ======================================================================
//                      保存数据库
// ======================================================================
async function saveDB() {
  await Deno.writeTextFile(FILE, JSON.stringify(cache, null, 2));
}


// ======================================================================
//                   获取子机器人数据（自动初始化）
// ======================================================================
export async function getSubBot(owner_id: number): Promise<SubBotData | null> {
  if (Object.keys(cache).length === 0) await loadDB();
  return cache[owner_id] || null;
}


// ======================================================================
//                   创建 / 保存 子机器人
// ======================================================================
export async function saveSubBot(owner_id: number, data: SubBotData) {
  cache[owner_id] = data;
  await saveDB();
}


// ======================================================================
//                    新增子机器人（首次绑定）
// ======================================================================
export async function createSubBot(
  owner_id: number,
  bot_token: string,
  bot_username: string,
  bot_id: number
): Promise<SubBotData> {
  if (Object.keys(cache).length === 0) await loadDB();

  const bot: SubBotData = {
    owner_id,
    bot_token,
    bot_user: bot_username,
    bot_id,

    created_at: Date.now(),

    buttons: [],

    users: [],

    stats: {
      total_users: 0,
      new_users_today: 0,
      clicks: 0,
    },
  };

  cache[owner_id] = bot;
  await saveDB();

  return bot;
}


// ======================================================================
//                      子机器人：保存用户
// ======================================================================
export async function addSubBotUser(
  owner_id: number,
  u: SubBotUser
) {
  const bot = await getSubBot(owner_id);
  if (!bot) return;

  // 不重复添加
  if (bot.users.some((x) => x.id === u.id)) return;

  bot.users.push(u);

  // 更新统计
  bot.stats.total_users++;
  bot.stats.new_users_today++;

  await saveSubBot(owner_id, bot);
}


// ======================================================================
//                      子机器人：按钮管理
// ======================================================================
export async function setSubBotButtons(
  owner_id: number,
  list: SubBotButton[]
) {
  const bot = await getSubBot(owner_id);
  if (!bot) return;

  bot.buttons = list;
  await saveSubBot(owner_id, bot);
}


// ======================================================================
//                  子机器人：记录按钮点击统计
// ======================================================================
export async function addClick(owner_id: number) {
  const bot = await getSubBot(owner_id);
  if (!bot) return;

  bot.stats.clicks++;
  await saveSubBot(owner_id, bot);
}


// ======================================================================
//                  获取所有子机器人（后台用）
// ======================================================================
export async function getAllSubBots(): Promise<SubBotData[]> {
  if (Object.keys(cache).length === 0) await loadDB();
  return Object.values(cache);
}


// ======================================================================
//                    删除子机器人（可选接口）
// ======================================================================
export async function deleteSubBot(owner_id: number) {
  if (Object.keys(cache).length === 0) await loadDB();
  delete cache[owner_id];
  await saveDB();
}

