// ============================================
// plugins/broadcast/main.ts
// 广播主控制器
// （给 handler / callback / API 直接调用）
// ============================================

import { SubBotDB } from "../../subbotdb";

export const BroadcastMain = {

  // 添加文本广播
  addText(content: string) {
    return SubBotDB.broadcastToAllUsers({
      type: "text",
      content
    });
  },

  // 添加图片广播
  addPhoto(fileId: string, caption?: string) {
    return SubBotDB.broadcastToAllUsers({
      type: "photo",
      fileId,
      caption
    });
  },

  // 添加视频广播
  addVideo(fileId: string, caption?: string) {
    return SubBotDB.broadcastToAllUsers({
      type: "video",
      fileId,
      caption
    });
  },

  // 按钮广播
  addButton(content: string, buttons: any[]) {
    return SubBotDB.broadcastToAllUsers({
      type: "button",
      content,
      buttons
    });
  }
};

