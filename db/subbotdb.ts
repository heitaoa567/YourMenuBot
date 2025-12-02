// ======================================
//              subbotdb.ts
//   子机器人数据库（Token + 菜单 + 广播 + 限制）
// ======================================

export interface SubBotData {
  owner_id: number;         // 主人 Telegram ID
  bot_token: string;        // 机器人 Token
  username?: string;        // 机器人 @username
  title?: string;           // 机器人名称

  // 菜单 & 按钮
  buttons: any[];           // 九宫格按钮配置（数组形式）
  menus: Record<string, any>; // 子机器人页面菜单配置

  // 广播
  broadcast_used: number;   // 当日广播次数
  last_broadcast_reset: number;

  // VIP 独立体系（可选）
  sub_vip_until?: number;   // 子机器人 VIP 到期时间（如果你以后想卖子bot VIP）

  // 监听状态
  listener_enabled: boolean;

  // 统计
  total_users: number;
  total_messages: number;
  total_clicks: number;

  // 创建时间
  created_at: number;
}

const kv = await Deno.openKv();

// ===============================
// 初始化子机器人
// ===============================
export function createEmptySubBot(chatId: number, token: string): SubBotData {
  return {
    owner_id: chatId,
    bot_token: token,

    buttons: [],
    menus: {},

    broadcast_used: 0,
    last_broadcast_reset: Date.now(),

    listener_enabled: false,

    total_users: 0,
    total_messages: 0,
    total_clicks: 0,

    created_at: Date.now(),
  };
}

// ===============================
// 获取子机器人（自动初始化）
// ===============================
export async function getSubBot(token: string): Promise<SubBotData | null> {
  const res = await kv.get<SubBotData>(["subbot", token]);
  return res.value || null;
}

// ===============================
// 保存子机器人
// ===============================
export async function saveSubBot(token: string, data: SubBotData) {
  await kv.set(["subbot", token], data);
}

// ===============================
// 绑定子机器人
// ===============================
export async function bindSubBot(chatId: number, token: string) {
  const bot = createEmptySubBot(chatId, token);
  await saveSubBot(token, bot);

  return bot;
}

// ===============================
// 更新子机器人（部分）
// ===============================
export async function updateSubBot(token: string, patch: Partial<SubBotData>) {
  const bot = await getSubBot(token);
  if (!bot) return;

  const updated = { ...bot, ...patch };
  await kv.set(["subbot", token], updated);
}

// ===============================
// 重置广播限制（每日）
// ===============================
export async function resetSubBotDaily(token: string) {
  const bot = await getSubBot(token);
  if (!bot) return;

  const now = Date.now();
  const last = bot.last_broadcast_reset;

  const isNewDay = new Date(now).getUTCDate() !== new Date(last).getUTCDate();

  if (isNewDay) {
    bot.broadcast_used = 0;
    bot.last_broadcast_reset = now;
    await saveSubBot(token, bot);
  }
}

// ===============================
// 列出所有子机器人
// ===============================
export async function listAllSubBots(): Promise<SubBotData[]> {
  const list: SubBotData[] = [];
  for await (const entry of kv.list<SubBotData>({ prefix: ["subbot"] })) {
    if (entry.value) list.push(entry.value);
  }
  return list;
}

// ===============================
// 增加统计数据
// ===============================
export async function addStat(token: string, field: "users" | "messages" | "clicks") {
  const bot = await getSubBot(token);
  if (!bot) return;

  if (field === "users") bot.total_users++;
  if (field === "messages") bot.total_messages++;
  if (field === "clicks") bot.total_clicks++;

  await saveSubBot(token, bot);
}

