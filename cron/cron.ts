// cron/cron.ts
// ========================================================
// YourMenuBot 自动定时任务系统
// - 重置 AI 使用时间
// - 检查 VIP 到期
// ========================================================

import { getUser, saveUser } from "../db/userdb.ts";

// 每天执行一次（由 Deno Deploy CRON 触发）
export async function runDailyTasks() {
  console.log("⏰ Running daily tasks...");

  // 读取所有用户
  // Deno KV 支持遍历所有 key
  const iter = kv.list({ prefix: ["user"] });

  for await (const entry of iter) {
    const chatId = entry.key[1] as number;
    const user = entry.value;

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    // =========================
    // AI 使用额度每日重置
    // =========================
    if (user.ai_last_date !== today) {
      user.ai_usage_today = 0;
      user.ai_last_date = today;
    }

    // =========================
    // VIP 到期检查（未来可扩展）
    // =========================
    if (user.vip_until && user.vip_until < Math.floor(Date.now() / 1000)) {
      // VIP 到期处理（目前不降级，只作为标记）
      // 未来你可以加自动通知、自动关闭服务等
    }

    // 保存更新后的用户数据
    await saveUser(chatId, user);
  }

  console.log("✅ Daily tasks completed");
}
