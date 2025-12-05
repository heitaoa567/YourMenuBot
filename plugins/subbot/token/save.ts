// =======================================
// plugins/subbot/token/save.ts
// 保存子机器人信息（适配你真实的 subbotdb 结构）
// =======================================

import { createSubBot } from "../../../db/subbotdb.ts";

export interface SaveBotData {
  owner_id: number;   // 主机器人用户 ID
  token: string;
  bot_id: number;
  username: string;
  name: string;
}

/**
 * 保存子机器人信息
 * （注意：你当前数据库结构是“一人一个子机器人”）
 */
export async function saveSubBot(data: SaveBotData) {
  return await createSubBot(
    data.owner_id,
    data.token,
    data.username,
    data.bot_id
  );
}
