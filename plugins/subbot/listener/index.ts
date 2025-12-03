// =======================================
// plugins/subbot/listener/index.ts
// 控制监听开关 + 保存规则
// =======================================

import { SubBotDB } from "../../../subbotdb";
import { sendMsg } from "../../../core/send";

export function setupSubBotListenerModule(router: any) {

  // 开启监听
  router.callbackRegex(/^subbot_listener_(\d+)$/, async (ctx, m) => {
    const botId = Number(m[1]);

    const bot = SubBotDB.findBotById(botId);
    if (!bot) return sendMsg(ctx, "❌ 未找到该机器人");

    const enabled = !bot.listener_enabled;

    SubBotDB.updateBot(botId, { listener_enabled: enabled });

    await sendMsg(ctx, enabled ? "👁 已开启监听" : "🚫 已关闭监听");
  });
}

export async function saveListenerRules(botId: number, rules: string) {
  SubBotDB.updateBot(botId, { listener_rules: rules });
}

