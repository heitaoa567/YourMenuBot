// ==========================================
//            db/userdb.ts
//     用户数据库（Deno KV 封装）
// ==========================================

/**
 * 用户结构：
 * {
 *   lang: "zh" | "en"
 *   created_at: number
 *   ai_start: number
 *   ai_used_today: number
 *   isVIP: boolean
 *   vip_until: number
 *   referrals: number
 *   referral_clicks: number
 *   referral_income: number
 *   subbots: [{ bot_id, token }]
 *   waiting_subbot_token: boolean
 *   buy_plan: string | null
 * }
 */

const kv = await Deno.openKv();

/** 获取用户数据 */
export async function getUser(userId: number): Promise<any> {
  const res = await kv.get(["user", userId]);
  return (
    res.value || {
      lang: "zh",
      created_at: Date.now(),
      ai_start: 0,
      ai_used_today: 0,
      isVIP: false,
      vip_until: 0,
      referrals: 0,
      referral_clicks: 0,
      referral_income: 0,
      subbots: [],
      waiting_subbot_token: false,
      buy_plan: null
    }
  );
}

/** 保存用户数据 */
export async function saveUser(userId: number, data: any) {
  await kv.set(["user", userId], data);
}

/** 更新单个字段 */
export async function updateUserField(userId: number, field: string, value: any) {
  const user = await getUser(userId);
  user[field] = value;
  await saveUser(userId, user);
}

/** 为 VIP 添加天数（按套餐） */
export async function addVipTime(userId: number, days: number) {
  const user = await getUser(userId);
  const now = Date.now();

  if (user.vip_until < now) {
    user.vip_until = now + days * 24 * 60 * 60 * 1000;
  } else {
    user.vip_until += days * 24 * 60 * 60 * 1000;
  }

  user.isVIP = true;

  await saveUser(userId, user);
}

/** 获取所有子机器人 */
export async function getSubBots(userId: number) {
  const user = await getUser(userId);
  return user.subbots || [];
}
