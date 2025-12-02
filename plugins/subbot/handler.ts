// ======================================================================
//                    plugins/subbot/handler.ts
//     子机器人：处理用户普通消息、广播消息、按钮编辑等入口
// ======================================================================

import { sendText } from "../../core/send.ts";

import {
  getSubbot,
  saveSubbot,
  getAllSubbots
} from "../../db/subbotdb.ts";

import type { Message } from "../../types.ts";


// ======================================================================
//      自动检测：当前消息是否属于子机器人广播输入
// ======================================================================
export async function handleSubbotBroadcastInput(
  uid: number,
  text: string,
  msg: Message
) {
  const bots = await getAllSubbots();

  // 找到当前用户处于“广播模式”的子机器人
  const bot = Object.values(bots).find(
    (b) => b.owner === uid && b.broadcast_mode === true
  );

  if (!bot) return false; // 不属于 subbot 广播输入

  // 记录广播任务
  bot.broadcast_history.push({
    text,
    time: Date.now()
  });

  bot.broadcast_mode = false; // 关闭广播模式
  await saveSubbot(bot.id, bot);

  // ⚠（这里未来会加入真正群发功能）
  await sendText(uid, "📡 广播任务已保存（等待发送模块接入）。");

  return true;
}


// ======================================================================
//                子机器人按钮编辑入口（未来可扩展）
// ======================================================================
export async function handleSubbotButtonEdit(
  uid: number,
  text: string,
  msg: Message
) {
  // 这里你未来可以做：
  // 例如用户正在编辑按钮标题 → 保存
  // 例如等待用户输入 URL → 保存按钮跳转链接
  // 例如多个按钮行列 → 保存结构

  // 目前先返回 false，表示该消息不是按钮编辑
  return false;
}



// ======================================================================
//                       统计：自动更新
// ======================================================================
export async function updateSubbotStats(botId: string, event: "msg") {
  const bot = await getSubbot(botId);
  if (!bot) return;

  if (event === "msg") {
    bot.stats.messages++;
  }

  await saveSubbot(botId, bot);
}



// ======================================================================
//                       SubBot 消息主入口
// ======================================================================
export async function onSubbotMessage(
  uid: number,
  text: string,
  msg: Message
) {
  // 按照优先级依次处理：

  // ① 广播输入
  const b = await handleSubbotBroadcastInput(uid, text, msg);
  if (b) return true;

  // ② 按钮编辑输入
  const e = await handleSubbotButtonEdit(uid, text, msg);
  if (e) return true;

  // ③ 子机器人普通消息（未来专用子机器人群聊管理模块）
  // 暂时不处理，返回 false，让主系统继续处理
  return false;
}

