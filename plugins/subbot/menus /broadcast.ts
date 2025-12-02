// ==================================================================
//                  plugins/subbot/menus/broadcast.ts
//      子机器人广播（文字 / 媒体）（限制：免费3次，VIP无限）
// ==================================================================

import { getUser, saveUser } from "../../../db/userdb.ts";
import { getSubBot, saveSubBot } from "../../../db/subbotdb.ts";
import { sendText } from "../../../core/send.ts";
import { T } from "../../lang/index.ts";
import { getPermissions } from "../../../core/permissions.ts";


// ==================================================================
//                     显示广播菜单
// ==================================================================
export async function showSubBotBroadcastMenu(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  const sub = await getSubBot(uid);
  if (!sub || !sub.token) {
    await sendText(uid, T(lang, "subbot_no_token"));
    return;
  }

  const perm = getPermissions(user);

  let text = `📢 <b>${T(lang, "subbot_broadcast_title")}</b>\n\n`;

  if (!perm.text_broadcast_unlimited) {
    const used = sub.broadcast_today || 0;
    text += `${T(lang, "subbot_broadcast_used")}: ${used}/3\n`;
  }

  text += `\n${T(lang, "subbot_broadcast_tip")}`;

  const keyboard = {
    inline_keyboard: [
      [{ text: T(lang, "subbot_broadcast_text"), callback_data: "subbot_bc_text" }],
      [
        {
          text: T(lang, "subbot_broadcast_media"),
          callback_data: "subbot_bc_media"
        }
      ],
      [{ text: T(lang, "back"), callback_data: "subbot_menu" }]
    ]
  };

  await sendText(uid, text, keyboard);
}



// ==================================================================
//                   开始文字广播流程
// ==================================================================
export async function startTextBroadcast(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";
  const perm = getPermissions(user);

  const sub = await getSubBot(uid);

  if (!perm.text_broadcast_unlimited) {
    if (sub.broadcast_today >= 3) {
      await sendText(uid, T(lang, "subbot_broadcast_limit"));
      return;
    }
  }

  user.subbot_waiting = {
    step: "broadcast_text"
  };
  await saveUser(uid, user);

  await sendText(uid, T(lang, "subbot_broadcast_enter_text"));
}



// ==================================================================
//                   执行文字广播
// ==================================================================
export async function processTextBroadcast(uid: number, text: string) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  const sub = await getSubBot(uid);
  const perm = getPermissions(user);

  if (!sub.users || sub.users.length === 0) {
    await sendText(uid, T(lang, "subbot_no_users"));
    return true;
  }

  // 广播文本
  const botToken = sub.token;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  let success = 0;

  for (const u of sub.users) {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: u,
        text,
        parse_mode: "HTML"
      })
    }).catch(() => {});
    success++;
  }

  // 免费用户扣次数
  if (!perm.text_broadcast_unlimited) {
    sub.broadcast_today++;
    await saveSubBot(uid, sub);
  }

  // 清除状态
  user.subbot_waiting = null;
  await saveUser(uid, user);

  await sendText(uid, `📢 ${T(lang, "subbot_broadcast_done")}: ${success}`);
  return true;
}




// ==================================================================
//              开始媒体广播（VIP 限制）
// ==================================================================
export async function startMediaBroadcast(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";
  const perm = getPermissions(user);

  if (!perm.media_broadcast) {
    await sendText(uid, T(lang, "subbot_broadcast_media_vip_only"));
    return;
  }

  user.subbot_waiting = {
    step: "broadcast_media"
  };
  await saveUser(uid, user);

  await sendText(uid, T(lang, "subbot_broadcast_send_media"));
}



// ==================================================================
//              处理媒体广播
// ==================================================================
export async function processMediaBroadcast(uid: number, msg: any) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  const sub = await getSubBot(uid);
  const perm = getPermissions(user);

  if (!perm.media_broadcast) {
    await sendText(uid, T(lang, "subbot_broadcast_media_vip_only"));
    return true;
  }

  const botToken = sub.token;
  const base = `https://api.telegram.org/bot${botToken}`;

  const targets = sub.users || [];
  if (targets.length === 0) {
    await sendText(uid, T(lang, "subbot_no_users"));
    return true;
  }

  let endpoint = "";
  let bodyKey = "";

  if (msg.photo) {
    endpoint = "sendPhoto";
    bodyKey = "photo";
  } else if (msg.video) {
    endpoint = "sendVideo";
    bodyKey = "video";
  } else if (msg.document) {
    endpoint = "sendDocument";
    bodyKey = "document";
  } else {
    await sendText(uid, T(lang, "subbot_broadcast_media_invalid"));
    return true;
  }

  let success = 0;

  for (const u of targets) {
    await fetch(`${base}/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({
        chat_id: u,
        [bodyKey]: msg[bodyKey][0].file_id
      }),
      headers: { "Content-Type": "application/json" }
    }).catch(() => {});
    success++;
  }

  // 清除状态
  user.subbot_waiting = null;
  await saveUser(uid, user);

  await sendText(uid, `🎬 ${T(lang, "subbot_broadcast_done")}: ${success}`);
  return true;
}
