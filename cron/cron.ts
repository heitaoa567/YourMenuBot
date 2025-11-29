// =====================================================
// 自动任务（每天执行）
// - 重置 ChatGPT 免费额度
// - 检查 VIP 到期并提示
// =====================================================

import { resetAllChatUsage } from "../db/kv.ts";
import { getUser, saveUser } from "../db/kv.ts";

// ----------------------------------------------
// VIP 到期检查
// ----------------------------------------------
async function checkVipExpiration() {
  const iter = await Deno.openKv().list({ prefix: ["user"] });

  for await (const entry of iter) {
    const user = entry.value;

    if (user.vipUntil && user.vipUntil < Date.now()) {
      user.vipUntil = 0;
      await saveUser(user);
    }
  }
}

// ----------------------------------------------
// Cron 主入口（被 main.ts 调用）
// ----------------------------------------------
export async function runDailyCron() {
  console.log("🔄 Running daily cron task...");

  // 重置普通用户 ChatGPT 时间
  await resetAllChatUsage();

  // 检查 VIP 是否过期
  await checkVipExpiration();

  console.log("✔ Daily cron finished.");
}

