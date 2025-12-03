// ======================================================================
//                      plugins/ai/index.ts
//  AI 主系统：30 分钟免费 / VIP无限 / GPT-4 / Vision
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";
import { canUse } from "../../core/permissions.ts";
import { aiAnswer } from "./openai.ts";
import type { Message } from "../../types.ts";


// 每日限制多少分钟
const FREE_MINUTES = 30;


// ======================================================================
//            用户每天AI使用时间 + VIP无限制判断
// ======================================================================
export function canUseAI(user: any) {
  // VIP 不限制
  if (canUse(user, "ai")) return true;

  const now = Date.now();

  // 初始化
  if (!user.ai_start) user.ai_start = 0;
  if (!user.ai_used) user.ai_used = 0;

  // 如果新的一天 → 重置
  const today = new Date().getDate();
  if (user.ai_day !== today) {
    user.ai_day = today;
    user.ai_used = 0;
  }

  // 检查是否超过30分钟
  return user.ai_used < FREE_MINUTES * 60 * 1000;
}


// ======================================================================
//                计算 AI 使用时间（非VIP扣时）
// ======================================================================
function countUsage(user: any, ms: number) {
  user.ai_used += ms;
}


// ======================================================================
//           主入口：当用户发送 "AI xxx" 或 "问 xxx" 时触发
// ======================================================================
export async function onMessage(uid: number, text: string, msg: Message) {
  if (!text.startsWith("AI") && !text.startsWith("问")) return false;

  const user = await getUser(uid);

  if (!canUseAI(user)) {
    await sendText(uid, "⚠️ 今日免费 AI 使用时间已用完，请明日再试或开通 VIP 无限使用。");
    return true;
  }

  const question = text.replace("AI", "").replace("问", "").trim();
  if (!question) {
    await sendText(uid, "请输入问题，例如：\nAI 如何学习编程？");
    return true;
  }

  const start = Date.now();
  const answer = await aiAnswer(question, user);
  const end = Date.now();

  // 免费用户扣掉使用时间
  if (!canUse(user, "ai_unlimited")) {
    countUsage(user, end - start);
  }

  await saveUser(uid, user);
  await sendText(uid, answer);

  return true;
}

