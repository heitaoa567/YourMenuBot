// ======================================================================
// plugins/subbot/listener/index.ts
// 子机器人监听系统（完全适配你当前 subbotdb.ts 架构）
// ======================================================================

import { getSubBot, saveSubBot } from "../../../db/subbotdb.ts";
import { sendText } from "../../../core/send.ts";

// ======================================================
// 切换监听开关：callback_data = sub_listener_<botId>
// （由 router.ts 分发）
// ======================================================
export async function toggleListener(ctx: any, botId: number) {
  const uid = ctx.from.id;

  // 每个 owner 只有一个 SubBot 对象
  const bot = await getSubBot(uid);
  if (!bot || bot.bot_id !== botId) {
    return await sendText(ctx, "❌ 未找到该子机器人");
  }

  bot.listener_enabled = !bot.listener_enabled;

  await saveSubBot(uid, bot);

  return await sendText(
    ctx,
    bot.listener_enabled ? "👁 已开启监听" : "🚫 已关闭监听"
  );
}

// ======================================================
// 保存监听规则
// （handler.ts 在检测到 step=subbot_listener_rules_<botId> 时调用）
// ======================================================
export async function saveListenerRules(ownerId: number, rules: string) {
  const bot = await getSubBot(ownerId);
  if (!bot) return false;

  bot.listener_rules = rules;
  await saveSubBot(ownerId, bot);

  return true;
}
