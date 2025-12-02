// ======================================
//                userdb.ts
//  用户数据库：保存所有用户的基础信息
// ======================================

export interface UserData {
  chat_id: number;

  // 基础信息
  lang: string;           // 用户语言
  created_at: number;     // 注册时间

  // AI
  ai_used_today: number;  // 今日使用AI分钟
  ai_last_reset: number;  // AI重置日期（每天自动清零）

  // VIP
  is_vip: boolean;
  vip_until: number;      

  // 推广
  ref_by?: number;        // 上级ID
  referrals: number;      
  referral_clicks: number;
  referral_income: number;

  // 子机器人
  subbot_token?: string;
  subbot_list?: string[]; 

  // 钱包
  wallet_balance: number;

  // 广告
  hide_ads: boolean;
}

const kv = await Deno.openKv();

// =============================
// 获取用户数据（自动初始化）
// =============================
export async function getUser(chatId: number): Promise<UserData> {
  const key = ["user", chatId];
  const res = await kv.get<UserData>(key);

  if (res.value) return res.value;

  // 初始化用户
  const user: UserData = {
    chat_id: chatId,
    lang: "en",
    created_at: Date.now(),

    ai_used_today: 0,
    ai_last_reset: Date.now(),

    is_vip: false,
    vip_until: 0,

    referrals: 0,
    referral_clicks: 0,
    referral_income: 0,

    wallet_balance: 0,

    hide_ads: false,
  };

  await kv.set(key, user);
  return user;
}

// =============================
// 保存用户数据
// =============================
export async function saveUser(chatId: number, data: UserData) {
  await kv.set(["user", chatId], data);
}

// =============================
// 更新用户字段（部分更新）
// =============================
export async function updateUser(chatId: number, patch: Partial<UserData>) {
  const user = await getUser(chatId);
  const updated = { ...user, ...patch };
  await kv.set(["user", chatId], updated);
}

// =============================
// 列出所有用户
// =============================
export async function listUsers(): Promise<UserData[]> {
  const users: UserData[] = [];
  for await (const entry of kv.list<UserData>({ prefix: ["user"] })) {
    if (entry.value) users.push(entry.value);
  }
  return users;
}

