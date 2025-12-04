// ======================================================================
//                         plugins/subbot/callback.ts
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts";

// 所有 subbot 按钮前缀
const PREFIX = "sub_";

// 统一入口
export async function handle(uid: number, data: string) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  // 绑定子机器人 token
  if (data === PREFIX + "bind") {
    user.waiting_subbot_token = true;
    await saveUser(uid, user);

    return await sendText(uid, T(lang, "subbot_bind_guide"));
  }

  // 停止等待 token
  if (data === PREFIX + "cancel") {
    user.waiting_subbot_token = false;
    await saveUser(uid, user);

    return await sendText(uid, T(lang, "subbot_cancel"));
  }

  return;
}


// =========================================================
// 用户发送 token 文本
// =========================================================
export async function saveToken(uid: number, token: string) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  if (!user.waiting_subbot_token) return;

  // 简易校验
  if (!token.startsWith("6") || !token.includes(":")) {
    return await sendText(uid, T(lang, "subbot_token_invalid"));
  }

  user.waiting_subbot_token = false;
  user.subbot_token = token;
  await saveUser(uid, user);

  return await sendText(uid, T(lang, "subbot_token_saved"));
}
