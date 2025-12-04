// ============================================
// plugins/broadcast/send.ts
// 统一消息发送（让 Worker 更干净）
// ============================================

import { sendMsg } from "../../core/send";

export async function sendText(chatId: number, text: string) {
  return sendMsg({ chat: { id: chatId } }, text);
}

export async function sendPhoto(chatId: number, fileId: string, caption?: string) {
  return sendMsg(
    { chat: { id: chatId } },
    caption || "",
    { photo: fileId }
  );
}

export async function sendVideo(chatId: number, fileId: string, caption?: string) {
  return sendMsg(
    { chat: { id: chatId } },
    caption || "",
    { video: fileId }
  );
}

export async function sendButton(chatId: number, content: string, buttons: any[]) {
  return sendMsg(
    { chat: { id: chatId } },
    content,
    { reply_markup: { inline_keyboard: buttons } }
  );
}

