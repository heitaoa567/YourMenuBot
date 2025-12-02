// ======================================================================
//                      plugins/subbot/main.ts
//    子机器人核心：绑定 token / 管理菜单 / 广播 / 权限调度
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import {
  getSubbot,
  saveSubbot,
  getAllSubbots
} from "../../db/subbotdb.ts";

import { sendText } from "../../core/send.ts";
import { getPermissions } from "../../core/permissions.ts";

import type { Message, CallbackQuery } from "../../types.ts";


// 子机器人功能菜单（以后可以拆分成独立文件）
const subbotMenu = (id: string) => ({
  inline_keyboard: [
    [{ text: "📡 广播消息", callback_data: `subbot_broadcast_${id}` }],
    [{ text: "🎛 按钮菜单管理", callback_data: `subbot_buttons_${id}` }],
    [{ text: "📊 用户统计", callback_data: `subbot_stats_${id}` }],
    [{ text: "🔙 返回", callback_data: "back_main" }]
  ]
});


// ======================================================================
//                      用户发送 token → 开始绑定
// ======================================================================
export async function onMessage(uid: number, text: string, msg: Message) {
  const user = await getUser(uid);

  // 正在等待 subbot token
  if (user.waiting_subbot_token) {
    const token = text.trim();

    // token 校验基础（格式判断）
    if (!token.includes(":") || token.length < 20) {
      await sendText(uid, "❌ Token 格式不正确，请重新发送。");
      return true;
    }

    // 保存到数据库
    const botId = String(Date.now()); // 用时间戳作为唯一 ID

    await saveSubbot(botId, {
      id: botId,
      owner: uid,
      token,
      created_at: Date.now(),
      menu: [],
      broadcast_history: [],
      stats: {
        total_users: 0,
        today_active: 0,
        messages: 0,
      }
    });

    // 清除等待状态
    user.waiting_subbot_token = false;
    await saveUser(uid, user);

    await sendText(
      uid,
      `✅ 子机器人绑定成功！\n\nID: <code>${botId}</code>`,
      subbotMenu(botId)
    );

    return true;
  }

  return false;
}



// ======================================================================
//                      回调按钮入口 onCallback
// ======================================================================
export async function onCallback(uid: number, data: string, cq: CallbackQuery) {
  const user = await getUser(uid);
  const p = getPermissions(user);

  // ===============================
  //         创建子机器人
  // ===============================
  if (data === "subbot_create") {
    user.waiting_subbot_token = true;
    await saveUser(uid, user);

    await sendText(uid, "🧩 请发送你的子机器人 Token：\n\n格式：123456:ABCDEFxxxxx");
    return true;
  }

  // ===============================
  //         子机器人菜单入口
  // ===============================
  if (data.startsWith("subbot_menu_")) {
    const id = data.replace("subbot_menu_", "");
    const bot = await getSubbot(id);

    if (!bot || bot.owner !== uid) {
      await sendText(uid, "❌ 未找到此子机器人。");
      return true;
    }

    await sendText(uid, `🧩 子机器人：${id}`, subbotMenu(id));
    return true;
  }

  // ===============================
  //         子机器人广播
  // ===============================
  if (data.startsWith("subbot_broadcast_")) {
    const id = data.replace("subbot_broadcast_", "");
    const bot = await getSubbot(id);

    if (!bot || bot.owner !== uid) {
      await sendText(uid, "❌ 未找到子机器人。");
      return true;
    }

    // 免费用户限制
    if (!p.text_broadcast_unlimited) {
      const count = bot.broadcast_history?.length || 0;
      if (count >= 3) {
        await sendText(uid, "⚠ 今日免费用户广播次数已用完（3次）。升级 VIP 可无限制。");
        return true;
      }
    }

    bot.broadcast_mode = true;
    await saveSubbot(id, bot);

    await sendText(uid, "📣 请发送你要广播的文本消息：");
    return true;
  }


  // ===============================
  //         子机器人按钮菜单管理
  // ===============================
  if (data.startsWith("subbot_buttons_")) {
    const id = data.replace("subbot_buttons_", "");
    const bot = await getSubbot(id);

    if (!bot || bot.owner !== uid) {
      await sendText(uid, "❌ 未找到子机器人。");
      return true;
    }

    await sendText(uid, "🎛 按钮菜单管理功能开发中（已经预留接口）。");
    return true;
  }

  return false;
}



// ======================================================================
//                      子机器人广播消息处理
// ======================================================================
export async function onSubbotBroadcast(uid: number, text: string) {
  const bots = await getAllSubbots();

  const bot = Object.values(bots).find(b => b.owner === uid && b.broadcast_mode);
  if (!bot) return false;

  // 记录历史
  bot.broadcast_history.push({
    text,
    time: Date.now()
  });

  bot.broadcast_mode = false;
  await saveSubbot(bot.id, bot);

  await sendText(uid, "✅ 广播任务已经提交（代码中还未实现真正发送）。");

  // ❗ 广播真正发送功能会在未来版本加入
  return true;
}

