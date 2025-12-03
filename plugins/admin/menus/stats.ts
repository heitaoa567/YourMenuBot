// =======================================
// plugins/admin/menus/stats.ts
// 后台统计总览面板（与你现有结构完全一致）
// =======================================

import { sendMsg } from "../../../core/send";
import { Users } from "../../../userdb";
import { SubBotDB } from "../../../subbotdb";

export async function showAdminStatsMenu(ctx: any) {

  // 用户总数
  const allUsers = Users.getAll();
  const totalUsers = allUsers.length;

  // 今日新增用户
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();

  const todayUsers = allUsers.filter((u: any) => {
    return u.created_at && u.created_at >= todayTimestamp;
  }).length;

  // 子机器人数量
  const allBots = SubBotDB.getAllBots();
  const totalBots = allBots.length;

  // 子机器人总粉丝（累加）
  let totalFollowers = 0;
  allBots.forEach((b: any) => {
    const f = SubBotDB.getFollowers(b.bot_id);
    totalFollowers += f?.length || 0;
  });

  // 今日广播（你可以未来扩展，用 broadcastLogs）
  const todayBroadcasts = 0;

  const text =
`📊 *后台统计面板（BotBrothers）*

👥 *用户统计*
• 今日新增用户：${todayUsers}
• 总用户数：${totalUsers}

🤖 *子机器人统计*
• 子机器人数量：${totalBots}
• 全部子机器人粉丝合计：${totalFollowers}

📢 *广播数据*
• 今日广播次数：${todayBroadcasts}

请选择操作：`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "🔄 刷新", callback_data: "admin_stats" }
      ],
      [
        { text: "🔙 返回后台", callback_data: "admin_main" }
      ]
    ]
  };

  await sendMsg(ctx, text, {
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
}

