// ======================================================================
//                         plugins/subbot/handler.ts
//         子机器人文本输入处理（群发文本 / 群发按钮 / 监听规则）
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";

// 群发菜单与按钮菜单
import { showSubBotBroadcastMenu } from "./menus/broadcast.ts";
import { showSubBotButtons } from "./menus/buttons.ts";

// 群发发送器
import { sendSubBotBroadcastText, sendSubBotBroadcastButtons } from "./broadcast/sender.ts";

// 监听规则
import { saveListenerRules } from "./listener/index.ts";

// ======================================================================
//  处理纯文本输入（由 router.ts 触发）
//  router.ts 中调用方式：Subbot.handleText(ctx, text)
// ======================================================================
export async function handleText(ctx: any, text: string) {
  const uid = ctx.from.id;

  const user = await getUser(uid);
  const step = user.step;

  if (!step) return false;

  // ================================
  // 1. 群发文本
  // step: subbot_broadcast_text_<botId>
  // ================================
  if (step.startsWith("subbot_broadcast_text_")) {
    const botId = Number(step.replace("subbot_broadcast_text_", ""));

    await sendText(ctx, "⏳ 正在发送群发文本…");

    await sendSubBotBroadcastText(botId, text);

    user.step = null;
    await saveUser(user);

    return await showSubBotBroadcastMenu(ctx, botId);
  }

  // ================================
  // 2. 群发按钮 JSON
  // step: subbot_broadcast_buttons_<botId>
  // ================================
  if (step.startsWith("subbot_broadcast_buttons_")) {
    const botId = Number(step.replace("subbot_broadcast_buttons_", ""));

    let buttons;
    try {
      buttons = JSON.parse(text);
    } catch {
      return await sendText(ctx, "❌ JSON 格式错误，请重新输入有效的按钮 JSON！");
    }

    await sendText(ctx, "⏳ 正在发送带按钮的群发…");

    await sendSubBotBroadcastButtons(botId, buttons);

    user.step = null;
    await saveUser(user);

    return await showSubBotBroadcastMenu(ctx, botId);
  }

  // ================================
  // 3. 保存监听规则
  // step: subbot_listener_rules_<botId>
  // ================================
  if (step.startsWith("subbot_listener_rules_")) {
    const botId = Number(step.replace("subbot_listener_rules_", ""));

    await saveListenerRules(botId, text);

    user.step = null;
    await saveUser(user);

    return await showSubBotButtons(ctx, botId);
  }

  return false;
}
