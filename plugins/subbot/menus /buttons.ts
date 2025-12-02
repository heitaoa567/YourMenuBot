// ==================================================================
//                    plugins/subbot/menus/buttons.ts
//         子机器人 9 宫格按钮设置（支持添加 / 删除 / 编辑）
// ==================================================================

import { getUser, saveUser } from "../../../db/userdb.ts";
import { sendText } from "../../../core/send.ts";
import { T } from "../../lang/index.ts";


// 最大按钮数量
const MAX_BUTTONS = 12;


// ==================================================================
//                   显示按钮管理主界面
// ==================================================================
export async function showSubBotButtonsMenu(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";
  const bot = user.subbot || null;

  if (!bot) {
    await sendText(uid, T(lang, "subbot_no_token"));
    return;
  }

  const buttons = bot.buttons || [];

  let text = `🎛 <b>${T(lang, "subbot_buttons_title")}</b>\n\n`;
  if (buttons.length === 0) {
    text += `❗ ${T(lang, "subbot_buttons_empty")}`;
  } else {
    buttons.forEach((btn: any, i: number) => {
      text += `${i + 1}. <b>${btn.text}</b> ${btn.url ? `🔗` : ""}\n`;
    });
  }

  const keyboard = {
    inline_keyboard: [
      [{ text: T(lang, "subbot_add_button"), callback_data: "subbot_button_add" }],
      ...(buttons.length > 0
        ? [[{ text: T(lang, "subbot_edit_button"), callback_data: "subbot_button_edit" }]]
        : []),
      ...(buttons.length > 0
        ? [[{ text: T(lang, "subbot_delete_button"), callback_data: "subbot_button_delete" }]]
        : []),
      [{ text: T(lang, "back"), callback_data: "subbot_menu" }]
    ]
  };

  await sendText(uid, text, keyboard);
}



// ==================================================================
//                     添加按钮：开始流程
// ==================================================================
export async function startAddButton(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  const bot = user.subbot || null;
  if (!bot) {
    await sendText(uid, T(lang, "subbot_no_token"));
    return;
  }

  if (!bot.buttons) bot.buttons = [];
  if (bot.buttons.length >= MAX_BUTTONS) {
    await sendText(uid, T(lang, "subbot_buttons_full"));
    return;
  }

  // 保存状态 → 等待输入按钮文字
  user.subbot_waiting = {
    step: "add_text",
    data: {}
  };
  await saveUser(uid, user);

  await sendText(uid, T(lang, "subbot_add_button_text"));
}



// ==================================================================
//                   添加按钮：写入完整按钮
// ==================================================================
export async function processAddButton(uid: number, text: string) {
  const user = await getUser(uid);
  const lang = user.lang || "en";
  const state = user.subbot_waiting;

  if (!state || state.step !== "add_text") return false;

  // 保存按钮文字
  state.data.text = text;

  // 下一步需要用户输入 URL 或 留空
  state.step = "add_url";
  await saveUser(uid, user);

  await sendText(uid, T(lang, "subbot_add_button_url"));
  return true;
}



// ==================================================================
//                   完成按钮创建（保存到 DB）
// ==================================================================
export async function finishAddButton(uid: number, url: string | null) {
  const user = await getUser(uid);
  const lang = user.lang || "en";
  const bot = user.subbot;
  const state = user.subbot_waiting;

  if (!state || state.step !== "add_url") return false;

  const newBtn = {
    text: state.data.text,
    url: url?.length ? url : null,
  };

  bot.buttons.push(newBtn);

  // 清除状态
  user.subbot_waiting = null;
  await saveUser(uid, user);

  await sendText(uid, T(lang, "subbot_add_button_done"));
  return true;
}



// ==================================================================
//                     删除按钮：显示列表
// ==================================================================
export async function startDeleteButton(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";
  const bot = user.subbot;

  if (!bot || !bot.buttons || bot.buttons.length === 0) {
    await sendText(uid, T(lang, "subbot_buttons_empty"));
    return;
  }

  const keyboard = {
    inline_keyboard: bot.buttons.map((btn: any, i: number) => [
      {
        text: `${i + 1}. ${btn.text}`,
        callback_data: `subbot_button_delete_${i}`
      }
    ])
  };

  await sendText(uid, T(lang, "subbot_delete_select"), keyboard);
}



// ==================================================================
//                     删除按钮（执行）
// ==================================================================
export async function deleteButton(uid: number, index: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  if (!user.subbot?.buttons) return;

  const list = user.subbot.buttons;

  if (index < 0 || index >= list.length) {
    await sendText(uid, T(lang, "subbot_delete_invalid"));
    return;
  }

  const removed = list.splice(index, 1);

  await saveUser(uid, user);
  await sendText(uid, `${T(lang, "subbot_delete_done")} <b>${removed[0].text}</b>`);
}

