// ===================================================================
//                  plugins/subbot/handler.ts
//        子机器人主控制器（消息监听 / 上报 / 统计）
// ===================================================================

import { getUser } from "../../db/userdb.ts";
import { getSubBot, saveSubBot } from "../../db/subbotdb.ts";
import { sendText } from "../../core/send.ts";
import { getPermissions } from "../../core/permissions.ts";
import { ADMIN_ID } from "../../config.ts";   // 你自己的 Telegram ID
import { T } from "../lang/index.ts";


// =============== 工具：发送到子机器人 ===============
async function sendToSubBot(sub: any, body: any) {
  const url = `https://api.telegram.org/bot${sub.token}/${body.method}`;
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body.data),
  });
}


// ===================================================================
//            监听子机器人收到的所有消息（用户发消息）
// ===================================================================
export async function onSubBotMessage(owner_id: number, update: any) {
  const sub = await getSubBot(owner_id);
  if (!sub) return;

  const msg = update.message;
  if (!msg) return;

  const from = msg.from;
  const user_id = from.id;
  const first_name = from.first_name || "";
  const text = msg.text || "";

  // ----------- 记录用户进入（放入广播列表）-----------
  if (!sub.users.includes(user_id)) {
    sub.users.push(user_id);
    sub.stats.total_users++;
    sub.stats.new_today++;
  }

  sub.stats.messages_total++;
  sub.stats.messages_today++;

  await saveSubBot(owner_id, sub);

  // ----------- 上报给主机器人（管理员版监听）-----------
  await sendText(
    ADMIN_ID,
    `📥 <b>用户消息（子机器人监听）</b>\n` +
    `来自：${first_name} (${user_id})\n` +
    `子机器人：@${sub.bot_username}\n` +
    `内容：${text}`
  );

  // ----------- 上报给 owner（免费用户有次数限制）-----------
  const owner = await getUser(owner_id);
  const p = getPermissions(owner);

  if (!p.listen_unlimited) {
    owner.listen_used = (owner.listen_used || 0) + 1;
    if (owner.listen_used > 10) {
      // 免费用户超过监听次数
      await sendText(
        owner_id,
        T(owner.lang, "listen_limit_reached")
      );
      return;
    }
  }

  await sendText(
    owner_id,
    `👤 用户消息\n` +
    `来自 ${first_name} (${user_id})\n\n` +
    `${text}`
  );
}



// ===================================================================
//           监听按钮点击（InlineKeyboard 的回调查询）
// ===================================================================
export async function onSubBotCallback(owner_id: number, update: any) {
  const sub = await getSubBot(owner_id);
  if (!sub) return;

  const cq = update.callback_query;
  if (!cq) return;

  const data = cq.data || "";
  const user = cq.from;
  const user_id = user.id;
  const first_name = user.first_name || "";

  // ----------- 统计按钮点击 ----------
  sub.stats.button_clicks[data] = (sub.stats.button_clicks[data] || 0) + 1;
  await saveSubBot(owner_id, sub);

  // ----------- 上报管理员 ----------
  await sendText(
    ADMIN_ID,
    `🔘 <b>按钮点击（子机器人监听）</b>\n` +
    `按钮：${data}\n` +
    `来自：${first_name} (${user_id})\n` +
    `子机器人：@${sub.bot_username}`
  );


  // ----------- 上报 owner（VIP 才无限制） ----------
  const owner = await getUser(owner_id);
  const p = getPermissions(owner);

  if (!p.listen_unlimited) {
    owner.listen_used = (owner.listen_used || 0) + 1;
    if (owner.listen_used > 10) {
      await sendText(owner_id, T(owner.lang, "listen_limit_reached"));
      return;
    }
  }

  await sendText(
    owner_id,
    `🔘 用户点击按钮\n` +
    `按钮：${data}\n` +
    `用户：${first_name} (${user_id})`
  );
}



// ===================================================================
//        子机器人收到任何 update（消息、callback 全部入口）
// ===================================================================
export async function handleSubBotUpdate(owner_id: number, update: any) {
  if (update.message) {
    return await onSubBotMessage(owner_id, update);
  }

  if (update.callback_query) {
    return await onSubBotCallback(owner_id, update);
  }

  return;
}

