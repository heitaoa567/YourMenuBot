// ========================================
//                YourMenuBot
//               main.ts（核心）
//   插件引擎 + 消息路由 + 回调分发 + 菜单系统
// ========================================

import { handleUpdate } from "./libs/core/router.ts";
import "./plugins/example/index.ts";      // 加载示例插件（未来会自动加载更多插件）

// ----------------------------------------
// 获取环境变量
// ----------------------------------------
const BOT_TOKEN = Deno.env.get("BOT_TOKEN");
if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN 未设置");
  Deno.exit(1);
}

// ----------------------------------------
// Telegram API 用于全局发送消息
// ----------------------------------------
export const TG = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ----------------------------------------
// 启动 Webhook 服务
// ----------------------------------------
console.log("🚀 YourMenuBot 已启动（插件引擎模式）");
console.log("等待 Telegram Webhook 调用...");

Deno.serve(async (req) => {
  const update = await req.json().catch(() => null);
  if (!update) return new Response("OK");

  await handleUpdate(update);
  return new Response("OK");
});
