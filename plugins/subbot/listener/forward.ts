// ======================================================================
// plugins/subbot/listener/forward.ts
// 子机器人媒体转发到主机器人（最终稳定版 - 100% 适配你的结构）
// ======================================================================

import { SubBotDB } from "../../../subbotdb.ts";
import { sendPhoto, sendVideo, sendText } from "../../../core/send.ts";

/**
 * 处理来自子机器人的媒体消息
 * @param botId  子机器人 bot_id
 * @param msg    子机器人收到的原始消息
 */
export async function handleSubBotForward(botId: number, msg: any) {
  // 查找子机器人
  const bot = SubBotDB.findBotById(botId);
  if (!bot) {
    console.log("❌ forward: 未找到子机器人 botId =", botId);
    return;
  }

  const ownerId = bot.owner_id; // 主控机器人拥有者 TG ID

  // ================================
  // Photo
  // ================================
  if (msg.photo) {
    const file = msg.photo[msg.photo.length - 1]; // 最大分辨率
    return await sendPhoto(ownerId, file.file_id, "📷 子机器人用户发送的照片");
  }

  // ================================
  // Video
  // ================================
  if (msg.video) {
    return await sendVideo(
      ownerId,
      msg.video.file_id,
      "🎬 子机器人用户发送的视频"
    );
  }

  // ================================
  // Document
  // ================================
  if (msg.document) {
    return await sendText(
      ownerId,
      `📄 用户发送了文件：<code>${msg.document.file_name}</code>\n（暂不自动转存文件）`
    );
  }

  // ================================
  // Voice
  // ================================
  if (msg.voice) {
    return await sendText(ownerId, "🎤 子机器人用户发送了语音信息（暂未支持转发语音）");
  }

  // ================================
  // Sticker
  // ================================
  if (msg.sticker) {
    return await sendText(ownerId, "😄 子机器人发送了贴纸（暂未支持转发贴纸）");
  }

  // 默认处理
  return await sendText(ownerId, "📨 子机器人收到一个未知类型的媒体消息。");
}
