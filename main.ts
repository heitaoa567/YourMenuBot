// =====================================================
//                  YourMenuBot - MAIN
//     系统主入口（Webhook + Router + Admin + 子后台）
// =====================================================

import { Router } from "./router.ts";
import { handleAdminPanel } from "./admin/index.ts";
import { handleSubBotPanel } from "./subbot_web/index.ts";

// ===============================
//        环境变量读取
// ===============================
const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
const BOT_USERNAME = Deno.env.get("BOT_USERNAME") || "YourMenuBot";
const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const USDT_ADDRESS = Deno.env.get("USDT_ADDRESS") || "";
const PORT = Deno.env.get("PORT") || "8000";

console.log(`🚀 YourMenuBot 启动中…`);
console.log(`🤖 BOT: @${BOT_USERNAME}`);
console.log(`💰 USDT 地址: ${USDT_ADDRESS}`);
console.log(`🌐 监听端口: ${PORT}`);

// ===============================
//         TELEGRAM API
// ===============================
export const TG = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ===============================
//           WEBHOOK 入口
// ===============================
Deno.serve(
  {
    port: Number(PORT),
  },
  async (req) => {
    const url = new URL(req.url);
    const path = url.pathname;

    // ========== 1. 主后台 WEB 面板 ==========
    if (path.startsWith("/admin")) {
      return await handleAdminPanel(req);
    }

    // ========== 2. 子机器人 WEB 面板 ==========
    if (path.startsWith("/subbot_web")) {
      return await handleSubBotPanel(req);
    }

    // ========== 3. Telegram Webhook ==========
    if (req.method === "POST") {
      const update = await req.json().catch(() => null);
      if (!update) return new Response("OK");

      return await Router(update);
    }

    // ========== 4. 默认访问 ==========
    return new Response(
      `YourMenuBot Running\nBOT: @${BOT_USERNAME}`,
      { status: 200 },
    );
  },
);
