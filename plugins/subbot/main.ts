// ======================================================================
//                     plugins/subbot/main.ts
//       子机器人系统主入口（绑定 / 菜单 / 监听 / 广播）
// ======================================================================

import { sendText } from "../../core/send.ts";
import { getUser, saveUser } from "../../db/userdb.ts";
import { getSubBot, saveSubBot } from "../../db/subbotdb.ts";
import { T } from "../lang/index.ts"; // 多语言
import { handleTokenBinding } from "./token/index.ts";
import { subbotMenu } from "./menus/index.ts";
import { handleSubbotCallback } from "./callback.ts";
import { handleSubbotMessage } from "./handler.ts";

import type { Message, CallbackQuery } from "../../types.ts";


// ======================================================================
//                   子机器人消息总入口（主机器人调用）
// ======================================================================
export async function onSubBotMessage(
  ownerId: number,
  msg: Message
) {
  const uid = msg.from?.id;
  if (!uid) return;

  // 记录监听（VIP 无限 / 免费限制）
  await handleSubbotMessage(ownerId, msg);
}


// ======================================================================
//                   子机器人按钮点击监听入口
// ======================================================================
export async function onSubBotCallback(
  ownerId: number,
  cq: CallbackQuery
) {
  const uid = cq.from?.id;
  if (!uid) return;

  await handleSubbotCallback(ownerId, cq);
}


// ======================================================================
//                   主机器人内：/subbot 入口
// ======================================================================
export async function enterSubBotPanel(ownerId: number) {
  const user = await getUser(ownerId);

  if (!user.subbots || user.subbots.length === 0) {
    await sendText(ownerId,
      "🤖 你还没有绑定任何子机器人\n\n请发送子机器人 Token：",
      {
        inline_keyboard: [[
          { text: "🔗 绑定子机器人", callback_data: "subbot_bind" }
        ]]
      }
    );
    return;
  }

  // 显示子机器人主菜单
  await sendText(ownerId, "🤖 子机器人后台", subbotMenu());
}


// ======================================================================
//                    主机器人回调按钮入口
// ======================================================================
export async function onMainBotCallback(ownerId: number, data: string) {
  
  // 绑定 Token
  if (data === "subbot_bind") {
    await handleTokenBinding(ownerId);
    return true;
  }

  // 进入子机器人后台菜单
  if (data === "subbot_menu") {
    await enterSubBotPanel(ownerId);
    return true;
  }

  return false;
}


// ======================================================================
//                   主机器人消息入口（监听 Token）
// ======================================================================
export async function onMainBotMessage(
  uid: number,
  text: string,
  msg: Message
) {
  const user = await getUser(uid);

  // 是否正在等待子机器人 TOKEN？
  if (user.waiting_for_token) {
    await handleTokenBinding(uid, text);
    return true;
  }

  return false;
}


