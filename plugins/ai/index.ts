// ======================================================================
//                      plugins/ai/index.ts
//  AI 主系统：30 分钟免费 / VIP无限 / GPT-4 / Vision
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";
import { canUse } from "../../core/permissions.ts";
import { aiAnswer } from "./openai.ts";

// 免费使用 30 分钟
const FREE_MINUTES = 30;

// ======================================================================
//            判断用户是否可以使用 AI（VIP 不限制）
// ======================================================================
export function canUseAI(user: any) {
  // VIP 无限使用
  if (canUse(user, "ai")) return true;

  const now = Date.now();

  if (!user.ai_start) user.ai_start = 0;
  if (!user.ai_used) user.ai_used = 0;

  const today = new Date().getDate();

  if (user.ai_day !== today) {
    user.ai_day = today;
    user.ai_used = 0;
  }

  return user.ai_used < FREE_MINUTES * 60 * 1000;
}

// ======================================================================
//              非 VIP 用户：扣除 AI 使用时间
// ======================================================================
function countUsage(user: any, ms: number) {
  user.ai_used += ms;
}

// ======================================================================
//                   主入口：由 router.ts 调用
//           router.ts 中这样调用：AI.ask(ctx, text)
// ======================================================================
export async function ask(ctx: any, text: string) {
  const uid = ctx.from.id;
  const user = await getUser(uid);

  if (!text.startsWith("AI") && !text.startsWith("问")) return false;

  // 免费额度判断
  if (!canUseAI(user)) {
    await sendText(ctx, "⚠️ 今日免费 AI 使用时间已用完，请明日再试或开通 VIP 无限使用。");
    return true;
  }

  const question = text.replace("AI", "").replace("问", "").trim();

  if (!question) {
    await sendText(ctx, "请输入问题，例如：\nAI 如何学习编程？");
    return true;
  }

  const start = Date.now();
  const answer = await aiAnswer(question, user);
  const end = Date.now();

  if (!canUse(user, "ai_unlimited")) {
    countUsage(user, end - start);
  }

  await saveUser(user);
  await sendText(ctx, answer);

  return true;
}
