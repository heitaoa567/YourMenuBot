// =======================================
// plugins/admin/menus/bots.ts
// 后台子机器人管理界面（与你结构完全一致）
// =======================================

import { sendMsg } from "../../../core/send";
import { SubBotDB } from "../../../subbotdb";

export async function showAdminBotsMenu(ctx: any, filterList: any[] | null = null) {
  const uid = ctx.from.id;

  // 1. 获取全部子机器人
  const bots = filterList || SubBotDB.getAllBots();

  if (bots.length === 0) {
    return sendMsg(ctx, "🤖 当前没有子机器人，请先绑定一个机器人。");
  }

  let text = `🤖 *子机器人管理*\n\n共 ${bots.length} 个子机器人：\n`;

  bots.forEach((bot: any, i: number) => {
    text += `\n${i + 1}. @${bot.username}（${bot.name}）  
ID: \`${bot.bot_id}\`  
备注：${bot.remark || "无"}  
监听：${bot.listener_enabled ? "🟢 开启" : "🔴 关闭"}`;

    text += `\n——————`;
  });

  const keyboard = {
    inline_keyboard: [
      [
        { text: "🔍 搜索子机器人", callback_data: "admin_search_bot" }
      ],
      [
        { text: "🔙 返回后台", callback_data: "admin_main" }
      ],
      [
        { text: "查看管理按钮示例", callback_data: "admin_bots_demo" }
      ]
    ]
  };

  await sendMsg(ctx, text, {
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
}


// ==============================================
// 单个子机器人管理按钮（后台 → 子机器人）
// ==============================================
export async function showAdminBotActions(ctx: any, botId: number) {
  const bot = SubBotDB.findBotById(botId);

  if (!bot) {
    return sendMsg(ctx, "❌ 未找到该子机器人");
  }

  const text = 
`🤖 *管理子机器人 @${bot.username}*

名称：${bot.name}
备注：${bot.remark || "无"}
监听状态：${bot.listener_enabled ? "🟢 开启" : "🔴 关闭"}

请选择你要执行的操作：`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "✏️ 修改备注", callback_data: `admin_edit_botname_${botId}` }
      ],
      [
        { text: bot.listener_enabled ? "🔴 关闭监听" : "🟢 开启监听", callback_data: `subbot_listener_${botId}` }
      ],
      [
        { text: "📢 进入子机器人群发", callback_data: `subbot_broadcast_${botId}` }
      ],
      [
        { text: "📊 子机器人数据", callback_data: `subbot_stats_${botId}` }
      ],
      [
        { text: "🗑 删除子机器人", callback_data: `subbot_delete_${botId}` }
      ],
      [
        { text: "🔙 返回列表", callback_data: "admin_subbots" }
      ]
    ]
  };

  await sendMsg(ctx, text, {
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
}

