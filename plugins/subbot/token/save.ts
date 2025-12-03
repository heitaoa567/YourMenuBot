// =======================================
// plugins/subbot/token/save.ts
// 保存子机器人信息到数据库（严格按你的结构）
// =======================================

import { SubBotDB } from "../../../subbotdb";

export interface SaveBotData {
  owner_id: number;   // 主机器人用户ID
  token: string;
  bot_id: number;
  username: string;
  name: string;
}

/**
 * 保存子机器人信息
 * @param data SaveBotData
 */
export function saveSubBot(data: SaveBotData) {

  // 写入数据库（自动管理多个子机器人）
  SubBotDB.addBot(data.owner_id, {
    token: data.token,
    bot_id: data.bot_id,
    username: data.username,
    name: data.name,
    created_at: Date.now()
  });

  return true;
}

