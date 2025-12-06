// ======================================================================
//                           db/subbotdb.ts
//     完整子机器人数据库（支持多机器人 / 查找 / 粉丝 / 按钮 / 监听）
// ======================================================================

import {
  SubBotData,
  SubBotUser,
  SubBotButton,
} from "../types.ts";

const FILE = "./db/data/subbots.json";

// 内存缓存
// 结构：{ botId: SubBotData }
let cache: Record<number, SubBotData> = {};


// ======================================================================
// 加载数据库
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

// 保存
async function saveDB() {
  await Deno.writeTextFile(FILE, JSON.stringify(cache, null, 2));
}


// ======================================================================
// 创建新的子机器人
// ======================================================================
export async function addBot(
  owner_id: number,
  token: string,
  username: string,
  name: string,
  bot_id: number
) {

  if (Object.keys(cache).length === 0) await loadDB();

  cache[bot_id] = {
    owner_id,
    bot_token: token,
    bot_username: username,
    bot_name: name,
    bot_id,

    created_at: Date.now(),

    buttons: [],
    users: [],

    listener_enabled: false,
    listener_rules: "",

    stats: {
      total_users: 0,
      new_users_today: 0,
      clicks: 0,
    },
  };

  await saveDB();
  return cache[bot_id];
}


// ======================================================================
// 获取子机器人（通过 botId）
// ======================================================================
export async function findBotById(botId: number): Promise<SubBotData | null> {
  if (Object.keys(cache).length === 0) await loadDB();
  return cache[botId] || null;
}


// ======================================================================
// 获取某个用户绑定的所有子机器人
// ======================================================================
export async function getBots(owner_id: number): Promise<SubBotData[]> {
  if (Object.keys(cache).length === 0) await loadDB();
  return Object.values(cache).filter(b => b.owner_id === owner_id);
}


// ======================================================================
// 更新子机器人字段
// ======================================================================
export async function updateBot(botId: number, patch: Partial<SubBotData>) {
  if (Object.keys(cache).length === 0) await loadDB();
  if (!cache[botId]) return;

  Object.assign(cache[botId], patch);

  await saveDB();
}


// ======================================================================
// 删除一个子机器人
// ======================================================================
export async function deleteBot(botId: number) {
  if (Object.keys(cache).length === 0) await loadDB();
  delete cache[botId];
  await saveDB();
}


// ======================================================================
// 新增粉丝
// ======================================================================
export async function addFollower(botId: number, user: SubBotUser) {
  const bot = await findBotById(botId);
  if (!bot) return;

  if (!bot.users.some(u => u.id === user.id)) {
    bot.users.push(user);
    bot.stats.total_users++;
    bot.stats.new_users_today++;
    await saveDB();
  }
}


// ======================================================================
// 获取粉丝列表
// ======================================================================
export async function getFollowers(botId: number): Promise<number[]> {
  const bot = await findBotById(botId);
  if (!bot) return [];
  return bot.users.map(u => u.id);
}

export const SubBotDB = {
  addBot,
  findBotById,
  getBots,
  updateBot,
  deleteBot,
  addFollower,
  getFollowers,
};
