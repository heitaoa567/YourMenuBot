// ======================================================================
// plugins/subbot/listener/forward.ts
// 子机器人媒体转发到主机器人（最终稳定版）
// ======================================================================

import { getSubBot } from "../../../db/subbotdb.ts";
import { sendPhoto, sendVideo, sendText } from "../../../core/send.ts";

/**
 * 处理来自子机器人的媒体消息
 * @param ownerId 主机器人用户ID（绑定者）
 * @param botId   子机器人 bot_id
 * @param msg     原始 Telegram 消息对象
 */
export async function handleSubBotForward(ownerId: number, botId: number, msg: any) {
  // 找到子机器人
  const bot = await getSubBot(ownerId);
  if (!bot || bot.bot_id !== botId) {
    console.log("❌ forward: 子机器人未找到 → owner:", ownerId, "botId:", botId);
    return;
  }

  // 转发给主控机器人（ownerId）
  const target = ownerId;

  // ================================
  // 处理 Photo
  // ================================
  if (msg.photo) {
    const file = msg.photo[msg.photo.length - 1]; // 最大尺寸
    return await sendPhoto(target, file.file_id, "📷 来自子机器人用户的照片");
  }

  // ================================
  // 处理 Video
  // ================================
  if (msg.video) {
    return await sendVideo(
      target,
      msg.video.file_id,
      "🎬 来自子机器人用户的视频"
    );
  }

  // ================================
  // 处理 Document 文件
  // ================================
  if (msg.document) {
    return await sendText(
      target,
      `📄 子机器人用户发送了文件：<code>${msg.document.file_name}</code>\n暂不支持自动转存文件。`
    );
  }

  // ================================
  // 处理 Voice
  // ================================
  if (msg.voice) {
    return await sendText(target, "🎤 用户发送了语音消息（暂未转发语音文件）");
  }

  // ================================
  // 处理 Sticker
  // ================================
  if (msg.sticker) {
    return await sendText(target, "😄 用户发送了贴纸（暂不转发贴纸）");
  }

  // 默认情况
  return await sendText(target, "📨 子机器人用户发送了一个未知类型的媒体消息。");
}
