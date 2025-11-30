// ==========================================
//               cron.ts
//  YourMenuBot — 自动任务（每日执行）
// ==========================================

import { getUser, saveUser } from "../db/userdb.ts";

const kv = await Deno.openKv();

/**
 * 每日任务：
 * 1）重置普通用户 AI 时间
 * 2）检查 VIP 是否过期
 * 3）预留未来任务位置
 */
export async function dailyCron() {
  console.log("⏰ Running Daily Cron Task...");

  const iter = kv.list({ prefix: ["user"] });
  const now = Date.now();

  for await (const entry of iter) {
    const userId = entry.key[1];
    const user = entry.value;

    let changed = false;

    // -------- 1. 重置普通用户 AI 使用时间 --------
    if (!user.isVIP) {
      user.ai_start = 0;
      user.ai_used_today = 0;
      changed = true;
    }

    // -------- 2. 检查 VIP 是否过期 --------
    if (user.isVIP && user.vip_until <= now) {
      user.isVIP = false;
      changed = true;
    }

    // -------- 3. 可扩展任务（积分/奖励/返利统计）--------
    // 未来可以在这里添加 weeklyCron/monthlyCron

    if (changed) {
      await saveUser(userId, user);
    }
  }

  return "Daily Cron Completed";
}
