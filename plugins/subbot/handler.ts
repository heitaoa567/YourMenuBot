// =======================================
// plugins/subbot/handler.ts
// 子机器人模块文本输入处理（与你现有结构完全一致）
// =======================================

import { Router } from "../../core/router";
import { sendMsg } from "../../core/send";
import { Users } from "../../userdb";

import { showSubBotBroadcastMenu } from "./menus/broadcast";
import { showSubBotButtons } from "./menus/buttons";

// 群发功能
import { sendSubBotBroadcastText } from "./broadcast/sender";
import { sendSubBotBroadcastButtons } from "./broadcast/sender";

// 监听功能
import { saveListenerRules } from "./listener/index";

export function setupSubBotHandler(router: Router) {

  // =====================================================
  // 处理所有文本输入
  // =====================================================
  router.text(async (ctx) => {
    const uid = ctx.from.id;
    const text = ctx.message.text;

    const user = Users.get(uid);
    if (!user || !user.step) return; // 不是子机器人操作

    const step = user.step;

    // ================================
    // 1. 输入群发文本
    // step: subbot_broadcast_text_<id>
    // ================================
    if (step.startsWith("subbot_broadcast_text_")) {
      const botId = Number(step.replace("subbot_broadcast_text_", ""));

      await sendMsg(ctx, "⏳ 正在发送群发文本…");

      await sendSubBotBroadcastText(botId, text);

      Users.set(uid, { step: null });

      return showSubBotBroadcastMenu(ctx, botId);
    }


    // ================================
    // 2. 输入群发按钮 JSON
    // step: subbot_broadcast_buttons_<id>
    // ================================
    if (step.startsWith("subbot_broadcast_buttons_")) {
      const botId = Number(step.replace("subbot_broadcast_buttons_", ""));

      let buttons;
      try {
        buttons = JSON.parse(text);
      } catch {
        return sendMsg(ctx, "❌ JSON 格式错误，请重新输入有效的 JSON 按钮结构！");
      }

      await sendMsg(ctx, "⏳ 正在发送带按钮的群发…");

      await sendSubBotBroadcastButtons(botId, buttons);

      Users.set(uid, { step: null });

      return showSubBotBroadcastMenu(ctx, botId);
    }


    // ================================
    // 3. 输入监听规则
    // step: subbot_listener_rules_<id>
    // ================================
    if (step.startsWith("subbot_listener_rules_")) {
      const botId = Number(step.replace("subbot_listener_rules_", ""));

      await saveListenerRules(botId, text);

      Users.set(uid, { step: null });

      return showSubBotButtons(ctx, botId);
    }

  });
}

