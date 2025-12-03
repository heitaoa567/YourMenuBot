// ======================================================================
//                             core/send.ts
//          统一发送模块（主机器人 + 子机器人共享）
// ======================================================================

import { BOT_TOKEN } from "../config.ts";

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
//                          文本消息 sendText
// ======================================================================
export async function sendText(
  chatId: number,
  text: string,
  keyboard: any = null,
  silent = false
) {
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
//                             sendPhoto
// ======================================================================
export async function sendPhoto(
  chatId: number,
  url: string,
  caption = "",
  keyboard: any = null
) {
  const body: any = {
    chat_id: chatId,
    photo: url,
    caption,
    parse_mode: "HTML",
  };
  if (keyboard) body.reply_markup = keyboard;

  return await safeRequest(`${TG}/sendPhoto`, body);
}


// ======================================================================
//                             sendVideo
// ======================================================================
export async function sendVideo(
  chatId: number,
  url: string,
  caption = "",
  keyboard: any = null
) {
  const body: any = {
    chat_id: chatId,
    video: url,
    caption,
    parse_mode: "HTML",
  };
  if (keyboard) body.reply_markup = keyboard;

  return await safeRequest(`${TG}/sendVideo`, body);
}


// ======================================================================
//                             sendSticker
// ======================================================================
export async function sendSticker(chatId: number, sticker: string) {
  const body = { chat_id: chatId, sticker };

  return await safeRequest(`${TG}/sendSticker`, body);
}


// ======================================================================
//                         sendChatAction (typing...)
// ======================================================================
export async function sendAction(chatId: number, action: string) {
  const body = { chat_id: chatId, action };

  return await safeRequest(`${TG}/sendChatAction`, body);
}


// ======================================================================
//                    禁用 sendDocument（防止传播病毒）
// ======================================================================
export async function sendDocument() {
  console.error("⚠️ sendDocument 被禁用，为安全原因不允许发送文件。");
  return null;
}


// ======================================================================
//                           静默发送（不推送）
// ======================================================================
export async function sendSilentText(
  chatId: number,
  text: string,
  keyboard: any = null
) {
  return await sendText(chatId, text, keyboard, true);
}


