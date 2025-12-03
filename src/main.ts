// ==========================================================
//                        main.ts
// ==========================================================

import { router } from "./core/router.ts";

// ====== 自动加载所有插件 ======
import "./plugins/admin/main.ts";
import "./plugins/subbot/main.ts";
import "./plugins/wallet/main.ts";
import "./plugins/vip/main.ts";
import "./plugins/ads/main.ts";
import "./plugins/supply/main.ts";
import "./plugins/referral/main.ts";
import "./plugins/ai/main.ts";
import "./plugins/broadcast/main.ts";

// ====== 加载语言系统 ======
import { loadLanguage } from "./plugins/lang/index.ts";

// ====== 读取环境变量 ======
const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ==========================================================
//                 安全 JSON
// ==========================================================
async function safeJson(req: Request) {
  try {
    return await req.json();
  } catch (_) {
    return null;
  }
}

// ==========================================================
//                         Webhook
// ==========================================================
Deno.serve(async (req) => {
  const update = await safeJson(req);
  if (!update) return new Response("OK");

  // 初始化语言
  await loadLanguage(update);

  // 处理 Telegram 更新
  await router(update);

  return new Response("OK");
});

console.log("🚀 YourMenuBot running on Deno Deploy!");
