// ======================================================================
//                             core/main.ts
//       YourMenuBot 主入口 — Telegram Webhook 服务启动点
// ======================================================================

import { route } from "./router.ts";
import { BOT_TOKEN, HOST } from "../config.ts";
import type { Update } from "../types.ts";


// Telegram Webhook URL (自动生成，也可手动配置)
const WEBHOOK_URL = `${HOST}/webhook/${BOT_TOKEN}`;


// ======================================================================
//                      注册 Webhook（在后台打印）
// ======================================================================
async function setWebhook() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;

  const body = {
    url: WEBHOOK_URL,
    allowed_updates: ["message", "callback_query"],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    console.log("🔗 Webhook 设置结果:", json);
  } catch (err) {
    console.error("❌ 设置 Webhook 失败:", err);
  }
}


// ======================================================================
//                 Deno 主服务（Telegram 推送都走这里）
// ======================================================================
Deno.serve(async (req) => {
  try {
    // Telegram 必须 POST
    if (req.method !== "POST") {
      return new Response("YourMenuBot Running...", { status: 200 });
    }

    // 解析 update
    const update = (await req.json()) as Update;

    // 路由到插件系统
    await route(update);

    return new Response("OK");
  } catch (err) {
    console.error("❌ 全局错误:", err);
    return new Response("ERR", { status: 200 });
  }
});


// ======================================================================
//                      启动时立即注册 webhook
// ======================================================================
setWebhook();
console.log(`🚀 YourMenuBot 已启动：${WEBHOOK_URL}`);

