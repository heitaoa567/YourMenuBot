// ======================================================================
//                  plugins/subbot/callback.ts
//     子机器人：回调按钮处理（菜单 / 广播 / 管理功能）
// ======================================================================

import { sendText } from "../../core/send.ts";
import { getUser } from "../../db/userdb.ts";
import { getPermissions } from "../../core/permissions.ts";

import {
  getSubbot,
  saveSubbot
} from "../../db/subbotdb.ts";

import type { CallbackQuery } from "../../types.ts";


// 子菜单（与 main.ts 保持一致）
const subbotMenu = (id: string) => ({
  inline_keyboard: [
    [{ text: "📡 广播消息", callback_data: `subbot_broadcast_${id}` }],
    [{ text: "🎛 按钮菜单管理", callback_data: `subbot_buttons_${id}` }],
    [{ text: "📊 用户统计", callback_data: `subbot_stats_${id}` }],
    [{ text: "🔙 返回", callback_data: "back_main" }]
  ]
});


// ======================================================================
//                         回调主处理函数
// ======================================================================
export async function onSubbotCallback(
  uid: number,
  data: string,
  cq: CallbackQuery
) {
  const user = await getUser(uid);
  const p = getPermissions(user);

  // ==================================================
  //               进入子机器人菜单
  // ==================================================
  if (data.startsWith("subbot_menu_")) {
    const id = data.replace("subbot_menu_", "");
    const bot = await getSubbot(id);

    if (!bot || bot.owner !== uid) {
      await sendText(uid, "❌ 未找到此子机器人");
      return true;
    }

    await sendText(uid, `🧩 子机器人：${id}`, subbotMenu(id));
    return true;
  }


  // ==================================================
  //                     广播入口
  // ==================================================
  if (data.startsWith("subbot_broadcast_")) {
    const id = data.replace("subbot_broadcast_", "");
    const bot = await getSubbot(id);

    if (!bot || bot.owner !== uid) {
      await sendText(uid, "❌ 子机器人不存在或不属于你");
      return true;
    }

    // 免费用户广播限制
    if (!p.text_broadcast_unlimited) {
      const count = bot.broadcast_history?.length || 0;
      if (count >= 3) {
        await sendText(
          uid,
          "⚠ 今日免费用户广播次数已达上限（3 次）。升级 VIP 可无限制使用。"
        );
        return true;
      }
    }

    bot.broadcast_mode = true;
    await saveSubbot(id, bot);

    await sendText(uid, "📣 请发送你要广播的文本消息：");
    return true;
  }


  // ==================================================
  //               按钮菜单管理入口
  // ==================================================
  if (data.startsWith("subbot_buttons_")) {
    const id = data.replace("subbot_buttons_", "");
    const bot = await getSubbot(id);

    if (!bot || bot.owner !== uid) {
      await sendText(uid, "❌ 子机器人不存在或不属于你");
      return true;
    }

    await sendText(uid, "🎛 按钮菜单功能正在开发中（接口已预留）");
    return true;
  }


  // ==================================================
  //                     统计入口
  // ==================================================
  if (data.startsWith("subbot_stats_")) {
    const id = data.replace("subbot_stats_", "");
    const bot = await getSubbot(id);

    if (!bot || bot.owner !== uid) {
      await sendText(uid, "❌ 子机器人不存在或不属于你");
      return true;
    }

    await sendText(
      uid,
      `📊 子机器人统计\n\n` +
      `👥 总用户：${bot.stats.total_users}\n` +
      `🔥 今日活跃：${bot.stats.today_active}\n` +
      `💬 消息数：${bot.stats.messages}`
    );

    return true;
  }


  return false; // 未处理
}

