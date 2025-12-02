// ======================================================================
// core/send.ts
// 统一 Telegram 发送模块（主机器人 + 子机器人都能用）
// ======================================================================

import { md } from "./utils.ts";

const TG = (token: string) => `https://api.telegram.org/bot${token}`;

// ===============================================================
// 统一发送文本消息
// ===============================================================
export async function sendText(
  botToken: string,
  chatId: number,
  text: string,
  keyboard: any = null,
) {
  const body: any = {
    chat_id: chatId,
    text: text,
    parse_mode: "Markdown",
  };

  if (keyboard) body.reply_markup = keyboard;

  return await fetch(`${TG(botToken)}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => null);
}

// ===============================================================
// 发送照片（支持子机器人广播）
// ===============================================================
export async function sendPhoto(
  botToken: string,
  chatId: number,
  photo: string,
  caption: string = "",
  keyboard: any = null,
) {
  const body: any = {
    chat_id: chatId,
    photo,
    caption: md(caption),
    parse_mode: "Markdown",
  };
  if (keyboard) body.reply_markup = keyboard;

  return await fetch(`${TG(botToken)}/sendPhoto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => null);
}

// ===============================================================
// 发送视频
// ===============================================================
export async function sendVideo(
  botToken: string,
  chatId: number,
  video: string,
  caption: string = "",
  keyboard: any = null,
) {
  const body: any = {
    chat_id: chatId,
    video,
    caption: md(caption),
    parse_mode: "Markdown",
  };
  if (keyboard) body.reply_markup = keyboard;

  return await fetch(`${TG(botToken)}/sendVideo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => null);
}

// ===============================================================
// 统一编辑消息（用于菜单更新）
// ===============================================================
export async function editMessage(
  botToken: string,
  chatId: number,
  messageId: number,
  text: string,
  keyboard: any = null,
) {
  const body: any = {
    chat_id: chatId,
    message_id: messageId,
    text: md(text),
    parse_mode: "Markdown",
  };

  if (keyboard) body.reply_markup = keyboard;

  return await fetch(`${TG(botToken)}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => null);
}

// ===============================================================
// 删除消息（后台管理清理 / 子机器人广播）
// ===============================================================
export async function deleteMessage(
  botToken: string,
  chatId: number,
  messageId: number,
) {
  return await fetch(`${TG(botToken)}/deleteMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, message_id: messageId }),
  }).catch(() => null);
}

// ===============================================================
// 统一发送（自动识别类型）
// ===============================================================
export async function sendAuto(
  botToken: string,
  chatId: number,
  msg: any,
  keyboard: any = null,
) {
  if (msg.text) {
    return await sendText(botToken, chatId, msg.text, keyboard);
  }
  if (msg.photo) {
    const fileId = msg.photo[msg.photo.length - 1].file_id;
    return await sendPhoto(botToken, chatId, fileId, msg.caption || "", keyboard);
  }
  if (msg.video) {
    const fileId = msg.video.file_id;
    return await sendVideo(botToken, chatId, fileId, msg.caption || "", keyboard);
  }

  return await sendText(botToken, chatId, "❓ Unsupported message type.");
}

