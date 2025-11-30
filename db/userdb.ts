// userdb.ts
// ========================================================
// YourMenuBot 用户数据库模块（使用 Deno KV）
// 支持：语言 / VIP / 推广 / 子机器人 / Token 流程
// ========================================================

// 打开 Deno KV 数据库
const kv = await Deno.openKv();

export interface UserData {
  lang: string;                // 用户语言
  step: string | null;         // 当前步骤（如等待输入子bot token）
  sub_token: string | null;    // 绑定的子机器人 Token

  // VIP 系统
  vip_until: number;           // VIP 到期时间（Unix timestamp）

  // 推广系统
  referrals: number;           // 成功邀请的人数
  referral_clicks: number;     // 推广链接点击次数
  referral_income: number;     // 推广收益（未来扩展）

  // AI 使用统计（未来使用）
  ai_usage_today: number;      // 今日 AI 使用秒数
  ai_last_date: string;        // 用于每日重置
}

/**
 * 初始化一个新用户
 */
function defaultUser(): UserData {
  return {
    lang: "en",
    step: null,
    sub_token: null,
    vip_until: 0,

    referrals: 0,
    referral_clicks: 0,
    referral_income: 0,

    ai_usage_today: 0,
    ai_last_date: "",
  };
}

/**
 * 获取用户数据（不存在则自动创建）
 */
export function getUser(chatId: number): UserData {
  return kv.get<UserData>(["user", chatId]).then((res) => {
    if (!res.value) {
      const initUser = defaultUser();
      kv.set(["user", chatId], initUser);
      return initUser;
    }
    return res.value;
  });
}

/**
 * 保存用户数据
 */
export async function saveUser(chatId: number, data: UserData) {
  await kv.set(["user", chatId], data);
}

/**
 * 清空数据库中某个用户（未来可用）
 */
export async function deleteUser(chatId: number) {
  await kv.delete(["user", chatId]);
}

