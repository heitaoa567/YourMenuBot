// ===========================================
// 数据库统一服务（基于 Deno KV）
// 自动存储用户、VIP、推广、子机器人等数据
// ===========================================

// 打开数据库（Deno Deploy 自动持久化）
const kv = await Deno.openKv();

// ----------------------------
// 数据结构：User
// ----------------------------
export interface UserData {
  userId: number;            // Telegram 用户 ID
  lang: string;              // 语言：zh | en
  vipUntil: number;          // VIP 到期时间（时间戳）
  bots: string[];            // 已绑定子机器人 token 列表
  chatUsedToday: number;     // 当天 ChatGPT 使用秒数
  lastChatReset: number;     // 最近重置 ChatGPT 日期（按天）
  referralClicks: number;    // 推广点击数
  referralUsers: number;     // 推广注册数
  referralIncome: number;    // 推广收益
}

// ----------------------------
// 读取用户
// ----------------------------
export async function getUser(userId: number): Promise<UserData> {
  const key = ["user", userId];
  const res = await kv.get<UserData>(key);

  if (res.value) return res.value;

  // 默认用户数据
  const user: UserData = {
    userId,
    lang: "zh",
    vipUntil: 0,
    bots: [],
    chatUsedToday: 0,
    lastChatReset: 0,
    referralClicks: 0,
    referralUsers: 0,
    referralIncome: 0,
  };

  await kv.set(key, user);
  return user;
}

// ----------------------------
// 保存用户
// ----------------------------
export async function saveUser(user: UserData) {
  const key = ["user", user.userId];
  await kv.set(key, user);
}

// ----------------------------
// 获取子机器人 token
// ----------------------------
export async function getSubBotToken(userId: number): Promise<string | null> {
  const key = ["subbot", userId];
  const res = await kv.get<string>(key);
  return res.value ?? null;
}

// ----------------------------
// 保存子机器人 token
// ----------------------------
export async function saveSubBotToken(userId: number, token: string) {
  const key = ["subbot", userId];
  await kv.set(key, token);
}

// ----------------------------
// 获取 VIP 付款记录（可选）
// ----------------------------
export async function getPayment(txid: string) {
  const key = ["payment", txid];
  const res = await kv.get(key);
  return res.value ?? null;
}

// ----------------------------
// 保存 VIP 付款记录
// ----------------------------
export async function savePayment(txid: string, data: any) {
  const key = ["payment", txid];
  await kv.set(key, data);
}

// ----------------------------
// 清空所有用户 ChatGPT 用时（每日 cron 用）
// ----------------------------
export async function resetAllChatUsage() {
  const iter = kv.list<UserData>({ prefix: ["user"] });

  for await (const entry of iter) {
    const user = entry.value;

    user.chatUsedToday = 0;
    user.lastChatReset = Date.now();

    await kv.set(["user", user.userId], user);
  }
}

export default kv;

