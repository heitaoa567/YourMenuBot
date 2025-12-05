// ======================================================================
//                      plugins/subbot/stats/index.ts
//              子机器人数据统计（完全适配你的项目）
// ======================================================================

import { getSubBot } from "../../../db/subbotdb.ts";

/**
 * 获取某个子机器人的统计数据
 * @param uid 主账号 ID（owner_id）
 * @returns 统计对象
 */
export async function getSubBotStats(uid: number) {
  const bot = await getSubBot(uid);

  if (!bot) {
    return {
      total_users: 0,
      new_users_today: 0,
      clicks: 0,
      total_messages: 0,
      today_messages: 0,
    };
  }

  return {
    total_users: bot.stats.total_users || 0,
    new_users_today: bot.stats.new_users_today || 0,

    // 你数据库里没有 message 统计，所以提供默认值
    total_messages: bot.stats.total_messages || 0,
    today_messages: bot.stats.today_messages || 0,

    clicks: bot.stats.clicks || 0,
  };
}
