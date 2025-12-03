// ======================================================================
//                           core/handler.ts
//       主机器人通用行为处理（/start、菜单、基础引导）
// ======================================================================

import { sendText } from "./send.ts";
import { getUser, saveUser } from "../db/userdb.ts";
import { T } from "../plugins/lang/index.ts";
import { MAIN_MENU } from "../keyboards/main_menu.ts";
import { HOST } from "../config.ts";

// 检查是否已绑定主机器人
function ensureFollowed(user) {
  return !!user.created_at;
}

// ======================================================================
//                           处理 /start 命令
// ======================================================================
export async function handleStart(uid: number, msg: any) {
  let user = await getUser(uid);
  const lang = user.lang || "en";

  // 新用户进入 → 自动初始化
  if (!user.created_at) {
    user.created_at = Date.now();
    await saveUser(uid, user);
  }

  // 是否携带推广参数
  const text: string = msg.text || "";
  if (text.startsWith("/start ")) {
    const ref = Number(text.split(" ")[1]);
    if (ref && ref !== uid) {
      // 交给推广系统处理（插件内）
      // 不在 handler 内做逻辑
    }
  }

  await sendText(uid, T(lang, "welcome"), MAIN_MENU(lang));
}


// ======================================================================
//                        主按钮 / 主菜单 fallback
// ======================================================================
export async function handleMainMessage(uid: number, text: string, msg: any) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  // 用户未关注主机器人 → 提示必须关注
  if (!ensureFollowed(user)) {
    await sendText(uid, T(lang, "must_follow_main"));
    return;
  }

  const lower = text.toLowerCase();

  // -------------------
  // 主菜单匹配
  // -------------------

  if (lower === "menu" || lower === "菜单" || lower === "主菜单") {
    await sendText(uid, T(lang, "menu"), MAIN_MENU(lang));
    return;
  }

  if (lower.includes("绑定") || lower.includes("subbot")) {
    await sendText(uid, T(lang, "bind_guide"), MAIN_MENU(lang));
    return;
  }

  if (lower.includes("供需") || lower.includes("市场")) {
    await sendText(uid, T(lang, "supply_enter"), MAIN_MENU(lang));
    return;
  }

  if (lower.includes("钱包") || lower.includes("wallet")) {
    await sendText(uid, T(lang, "wallet_enter"), MAIN_MENU(lang));
    return;
  }

  if (lower.startsWith("ai")) {
    await sendText(uid, T(lang, "ai_enter"), MAIN_MENU(lang));
    return;
  }

  if (lower.includes("vip")) {
    await sendText(uid, T(lang, "vip_enter"), MAIN_MENU(lang));
    return;
  }

  // -------------------
  // 默认：返回主菜单
  // -------------------
  await sendText(uid, T(lang, "menu"), MAIN_MENU(lang));
}


// ======================================================================
//                    处理回调按钮（fallback）
// ======================================================================
export async function handleMainCallback(uid: number, data: string, cq: any) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  if (data === "main_menu") {
    await sendText(uid, T(lang, "menu"), MAIN_MENU(lang));
    return;
  }

  // 所有未匹配的 callback → 默认返回菜单
  await sendText(uid, T(lang, "menu"), MAIN_MENU(lang));
}


