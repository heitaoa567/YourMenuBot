// ========================================================
//                    core/handler.ts
//   YourMenuBot 主调度层（封装 reply + 调用 router）
// ========================================================

import { handleUpdate } from "./router.ts";
import { ReplyFunction } from "./types.ts";

// Telegram Bot Token
const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// --------------------------------------------------------
// 统一的 reply() 函数（所有插件都用这个回复消息）
// --------------------------------------------------------
export const reply: ReplyFunction = async (chatId, text, keyboard) => {
    const body: any = {
        chat_id: chatId,
        text,
        parse_mode: "Markdown"
    };

    if (keyboard) body.reply_markup = keyboard;

    try {
        await fetch(TG_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error("❌ reply() 错误:", err);
    }
};

// --------------------------------------------------------
// Webhook 主入口（main.ts 将调用此函数）
// --------------------------------------------------------
export async function dispatch(req: Request): Promise<Response> {
    let update: any = null;

    try {
        update = await req.json();
    } catch {
        return new Response("INVALID JSON");
    }

    try {
        await handleUpdate(update, reply);
    } catch (err) {
        console.error("❌ Router 执行错误:", err);
    }

    return new Response("OK");
}

