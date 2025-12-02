// ==========================================================
//                        main.ts
//            YourMenuBot — Telegram Bot入口文件
// ==========================================================

import { router } from "./core/router.ts";
import { loadLanguage } from "./plugins/lang/index.ts";

// 环境变量
const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ==========================================================
//                 统一请求函数（安全封装）
// ==========================================================
async function safeJson(req: Request) {
  try {
    return await req.json();
  } catch (_) {
    return null;
  }
}

// ==========================================================
//               Telegram 回复（基础封装）
// ==========================================================
export async function tgSend(chat_id: number, text: string, reply_markup: any = null) {
  const payload: any = { chat_id, text, parse_mode: "HTML" };
  if (reply_markup) payload.reply_markup = reply_markup;

  await fetch(`${TG_API}/sendMessage`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  }).catch(() => {});
}

// ==========================================================
//                    Webhook 主入口
// ==========================================================
Deno.serve(async (req) => {
  const update = await safeJson(req);
  if (!update) return new Response("OK");

  // 自动加载多语言（如果用户没设置语言）
  await loadLanguage(update);

  // 调用核心路由
  await router(update);

  return new Response("OK");
});
