// ======================================================================
//                             core/send.ts
//          统一发送模块（主机器人 + 子机器人共享，适配 ctx）
// ======================================================================

import config from "../config.ts";

const BOT_TOKEN = config.bot.token;
const TG = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ======================================================================
//                         核心安全发送函数
// ======================================================================
async function safeRequest(url: string, body: any) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json().catch(() => ({}));

    if (!json.ok) {
      console.error("❌ Telegram send error:", json);
    }

    return json;
  } catch (err) {
    console.error("❌ Network error:", err);
    return null;
  }
}

// ======================================================================
//                       从 ctx 自动获取 chat_id
// ======================================================================
function getChatId(ctx: any): number {
  return ctx?.chat?.id || ctx?.from?.id;
}

// ======================================================================
//                          文本消息 sendText
// ======================================================================
export async function sendText(
  ctx: any,
  text: string,
  keyboard: any = null,
  silent = false
) {
  const chatId = getChatId(ctx);

  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_notification: silent,
  };

  if (keyboard) body.reply_markup = keyboard;

  return await safeRequest(`${TG}/sendMessage`, body);
}

// ======================================================================
//                      sendKeyboard（文本 + 按键）
// ======================================================================
export async function sendKeyboard(
  ctx: any,
  text: string,
  keyboard: any,
  silent = false
) {
  const chatId = getChatId(ctx);

  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_notification: silent,
    reply_markup: keyboard,
  };

  return await safeRequest(`${TG}/sendMessage`, body);
}

// ======================================================================
//                             sendPhoto
// ======================================================================
export async function sendPhoto(ctx: any, url: string, caption = "", keyboard: any = null) {
  const chatId = getChatId(ctx);

  co
