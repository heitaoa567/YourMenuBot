// ===================================================================
//                  plugins/subbot/broadcast.ts
//       子机器人广播执行器（文本 / 图片 / 视频 / 文件）
// ===================================================================

import { getSubBot, saveSubBot } from "../../db/subbotdb.ts";
import { getUser } from "../../db/userdb.ts";
import { getPermissions } from "../../core/permissions.ts";
import { sendText, sendPhoto, sendVideo, sendDocument } from "../../core/send.ts";
import { T } from "../lang/index.ts";


// ===================================================================
//                  向单个用户发送消息
// ===================================================================
async function sendToUser(bot_token: string, method: string, data: any) {
  const url = `https://api.telegram.org/bot${bot_token}/${method}`;

  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}


// ===================================================================
//                     执行文本广播
// ===================================================================
export async function broadcastText(owner_id: number, text: string) {
  const sub = await getSubBot(owner_id);
  if (!sub) return "❌ No subbot found.";

  const owner = await getUser(owner_id);
  const p = getPermissions(owner);

  // 免费用户限制（每日3次）
  if (!p.text_broadcast_unlimited) {
    owner.text_broadcast_used = (owner.text_broadcast_used || 0) + 1;

    if (owner.text_broadcast_used > 3) {
      return T(owner.lang, "broadcast_limit_reached");
    }
  }

  let success = 0;
  let failed = 0;

  for (const uid of sub.users) {
    const res = await sendToUser(sub.token, "sendMessage", {
      chat_id: uid,
      text: text,
    });

    if (res.ok) success++;
    else failed++;

    await new Promise(r => setTimeout(r, 60)); // 安全延迟
  }

  sub.stats.broadcast_text_total += success;
  await saveSubBot(owner_id, sub);

  return `📢 文本广播完成\n成功：${success}\n失败：${failed}`;
}



// ===================================================================
//                     执行照片广播
// ===================================================================
export async function broadcastPhoto(owner_id: number, photo_url: string, caption = "") {
  const sub = await getSubBot(owner_id);
  if (!sub) return "❌ No subbot found.";

  const owner = await getUser(owner_id);
  const p = getPermissions(owner);

  if (!p.media_broadcast) {
    return T(owner.lang, "broadcast_media_not_allowed");
  }

  let success = 0;
  let failed = 0;

  for (const uid of sub.users) {
    const res = await sendToUser(sub.token, "sendPhoto", {
      chat_id: uid,
      photo: photo_url,
      caption,
    });

    if (res.ok) success++;
    else failed++;

    await new Promise(r => setTimeout(r, 80));
  }

  sub.stats.broadcast_media_total += success;
  await saveSubBot(owner_id, sub);

  return `🖼 图片广播完成\n成功：${success}\n失败：${failed}`;
}




// ===================================================================
//                     执行视频广播
// ===================================================================
export async function broadcastVideo(owner_id: number, video_url: string, caption = "") {
  const sub = await getSubBot(owner_id);
  if (!sub) return "❌ No subbot found.";

  const owner = await getUser(owner_id);
  const p = getPermissions(owner);

  if (!p.media_broadcast) {
    return T(owner.lang, "broadcast_media_not_allowed");
  }

  let success = 0;
  let failed = 0;

  for (const uid of sub.users) {
    const res = await sendToUser(sub.token, "sendVideo", {
      chat_id: uid,
      video: video_url,
      caption,
    });

    if (res.ok) success++;
    else failed++;

    await new Promise(r => setTimeout(r, 120));
  }

  sub.stats.broadcast_media_total += success;
  await saveSubBot(owner_id, sub);

  return `🎥 视频广播完成\n成功：${success}\n失败：${failed}`;
}



// ===================================================================
//                     文件广播（PDF/ZIP/DOC…）
// ===================================================================
export async function broadcastDocument(owner_id: number, file_url: string, caption = "") {
  const sub = await getSubBot(owner_id);
  if (!sub) return "❌ No subbot found.";

  const owner = await getUser(owner_id);
  const p = getPermissions(owner);

  if (!p.media_broadcast) {
    return T(owner.lang, "broadcast_media_not_allowed");
  }

  let success = 0;
  let failed = 0;

  for (const uid of sub.users) {
    const res = await sendToUser(sub.token, "sendDocument", {
      chat_id: uid,
      document: file_url,
      caption,
    });

    if (res.ok) success++;
    else failed++;

    await new Promise(r => setTimeout(r, 150));
  }

  sub.stats.broadcast_media_total += success;
  await saveSubBot(owner_id, sub);

  return `📄 文件广播完成\n成功：${success}\n失败：${failed}`;
}


