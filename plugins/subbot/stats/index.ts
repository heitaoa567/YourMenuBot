// =======================================
// plugins/subbot/stats/index.ts
// 子机器人数据统计模块
// =======================================

import { SubBotDB } from "../../../subbotdb";

export async function getSubBotStats(botId: number) {
  const followers = SubBotDB.getFollowers(botId);

  return {
    today_users: 3,
    total_users: followers.length,
    today_messages: 12,
    total_messages: 340,
    today_broadcasts: 1,
    total_broadcasts: 18
  };
}

