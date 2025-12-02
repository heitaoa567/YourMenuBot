// ==================================================================
//                     plugins/subbot/token.ts
//           子机器人 Token 绑定 + Telegram 校验模块
// ==================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { getSubBot, saveSubBot } from "../../db/subbotdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts";


// Telegram API
async function checkBotToken(token: string) {
  try {
    const url = `https://api.telegram.org/bot${token}/getMe`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.ok && data.result) {
      return data.result;
    }
    return null;
  } catch {
    return null;
  }
}


// ==================================================================
//                    开始绑定子机器人流程
// ==================================================================
export async function startBindSubBot(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  user.subbot_waiting = {
    step: "enter_token"
  };

  await saveUser(uid, user);

  await sendText(uid, T(lang, "subbot_send_token"));
}


// ==================================================================
//                     保存 Token + 校验 + 入库
// ==================================================================
export async function bindSubBot(uid: number, token: string) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  // 1. 真实校验 Token
  const botInfo = await checkBotToken(token);

  if (!botInfo) {
    await sendText(uid, T(lang, "subbot_token_invalid"));
    return;
  }

  // bot 信息
  const bot_id = botInfo.id;
  const bot_username = botInfo.username;

  // 2. 读取旧子机器人资料
  let sub = await getSubBot(uid);
  if (!sub) {
    sub = {
      owner_id: uid,
      token: "",
      bot_id,
      bot_username,
      users: [],
      buttons: [],
      stats: {
        total_users: 0,
        messages_today: 0,
        messages_total: 0,
        new_today: 0,
        new_week: 0,
        button_clicks: {}
      },
      broadcast_today: 0,
      created_at: Date.now()
    };
  }

  // 3. 保存 token
  sub.token = token;
  sub.bot_id = bot_id;
  sub.bot_username = bot_username;

  await saveSubBot(uid, sub);

  // 4. 重置等待状态
  user.subbot_waiting = null;
  await saveUser(uid, user);

  // 5. 返回成功信息
  const text = [
    `🤖 <b>${T(lang, "subbot_token_success")}</b>`,
    ``,
    `机器人名称：<b>${bot_username}</b>`,
    `机器人 ID：<code>${bot_id}</code>`,
    ``,
    `你的子机器人已绑定成功！`,
    `你可以开始设置按钮、广播、查看统计。`
  ].join("\n");

  await sendText(uid, text);
}


// ==================================================================
//             主入口：当用户发送的消息疑似 Token 时
// ==================================================================
export async function tryHandleTokenMessage(uid: number, text: string) {
  const user = await getUser(uid);

  if (!user.subbot_waiting || user.subbot_waiting.step !== "enter_token") {
    return false;
  }

  // 常见 Token 格式： 123456:AAxxx
  if (!text.includes(":")) {
    return false;
  }

  await bindSubBot(uid, text);
  return true;
}


