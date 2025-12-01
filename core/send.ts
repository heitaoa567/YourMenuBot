// =====================================================
//                     core/send.ts
//       全局统一发送模块（文本 / 图片 / 视频）
// =====================================================

import { TG } from "../main.ts";

// =====================================================
//                    发送文本消息
// =====================================================
export async function sendText(
  chatId: number,
  text: string,
  keyboard?: any,
) {
  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  };

  if (keyboard) body.reply_markup = keyboard;

  return await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// =====================================================
//                      发送照片
// =====================================================
export async function sendPhoto(
  chatId: number,
  photoUrl: string,
  caption = "",
  keyboard?: any,
) {
  const body: any = {
    chat_id: chatId,
    photo: photoUrl,
    caption,
    parse_mode: "HTML",
  };

  if (keyboard) body.reply_markup = keyboard;

  return await fetch(`${TG}/sendPhoto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}


// =====================================================
//                       发送视频
// =====================================================
export async function sendVideo(
  chatId: number,
  videoUrl: string,
  caption = "",
  keyboard?: any,
) {
  const body: any = {
    chat_id: chatId,
    video: videoUrl,
    caption,
    parse_mode: "HTML",
  };

  if (keyboard) body.reply_markup = keyboard;

  return await fetch(`${TG}/sendVideo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}



// =====================================================
//                发送带内联按钮的消息
// =====================================================
export async function sendWithButtons(
  chatId: number,
  text: string,
  buttons: any[],
) {
  const markup = {
    inline_keyboard: buttons,
  };

  return await sendText(chatId, text, markup);
}



// =====================================================
//                编辑消息（修改按钮）
// =====================================================
export async function editButtons(
  chatId: number,
  messageId: number,
  text: string,
  buttons: any[],
) {
  const body: any = {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons,
    },
  };

  return fetch(`${TG}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

