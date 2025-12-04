// ======================================================================
//                           core/handler.ts
//       主机器人通用行为处理（/start、菜单、基础引导）
// ======================================================================

import { sendText, sendKeyboard } from "./send.ts";
import { getUser, saveUser } from "../db/userdb.ts";
import { T } from "../plugins/lang/index.ts";
import { MAIN_MENU } from "../keyboards/main_menu.ts";

// 检查是否已绑定主机器人
function ensureFollowed(user: any) {
  return !!user.created_at;
}

// ======================================================================
//                           处理 /start 命令
// ======================================================================
export async function handleStart(ctx: any, msg: any) {
  const uid = ctx.from.id;
  let user = await getUser(uid);
  const lang = user.lang || "en";

  // 初始化用户
  if (!user.created_at) {
    user.created_at = Date.now();
    user.lang = lang;
    await saveUser(user);
  }

  // 推广参数支持
  const text: string = msg.text || "";
  if (text.startsWith("/start ")) {
    const ref = Number(text.split(" ")[1]);
    if (ref && ref !== uid) {
      // 交给推广系统处理
    }
  }

  // 返回欢迎菜单
  await sendKeyboard(ctx, T(lang, "welcome"), MAIN_MENU(lang));
}

// ======================================================================
//                        主按钮 / 主菜单 fallback
// ======================================================================
export async function handleMainMessage(ctx: any, text: string, msg: any) {
  const uid = ctx.from.id;
  const user = await getUser(uid);
  const lang = user.lang || "en";

  if (!ensureFollowed(user)) {
    await sendText(ctx, T(lang, "must_follow_main"));
    return;
  }

  const lower = text.toLowerCase();

  // 主菜单触发
  if (lower === "menu" || lower === "菜单" || lower === "主菜单") {
    return await sendKeyboard(ctx, T(lang, "menu"), MAIN_MENU(lang));
  }

  if (lower.includes("绑定") || lower.includes("subbot")) {
    return await sendKeyboard(ctx, T(lang, "bind_guide"), MAIN_MENU(lang));
  }

  if (lower.includes("供需") || lower.includes("市场")) {
    return await sendKeyboard(ctx, T(lang, "supply_enter"), MAIN_MENU(lang));
  }

  if (lower.includes("钱包") || lower.includes("wallet")) {
    return await sendKeyboard(ctx, T(lang, "wallet_enter"), MAIN_MENU(lang));
  }

  if (lower.startsWith("ai")) {
    return await sendKeyboard(ctx, T(lang, "ai_enter"), MAIN_MENU(lang));
  }

  if (lower.includes("vip")) {
    return await sendKeyboard(ctx, T(lang, "vip_enter"), MAIN_MENU(lang));
  }

  // 默认返回主菜单
  return await sendKeyboard(ctx, T(lang, "menu"), MAIN_MENU(lang));
}

// ======================================================================
//                    处理回调按钮（fallback）
// ======================================================================
export async function handleMainCallback(ctx: any, data: string) {
  const uid = ctx.from.id;
  const user = await getUser(uid);
  const lang = user.lang || "en";

  if (data === "main_menu") {
    return await sendKeyboard(ctx, T(lang, "menu"), MAIN_MENU(lang));
  }

  // 默认 fallback
  return await sendKeyboard(ctx, T(lang, "menu"), MAIN_MENU(lang));
}
