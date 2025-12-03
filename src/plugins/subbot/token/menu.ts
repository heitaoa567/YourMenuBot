// =======================================
// plugins/subbot/token/menu.ts
// 显示子机器人绑定菜单（严格按你的结构）
// =======================================

import { sendMsg } from "../../../core/send";
import { SubBotDB } from "../../../subbotdb";

export async function showSubBotTokenMenu(ctx: any) {
  const uid = ctx.from.id;

  // 获取用户已绑定的子机器人列表
  const bots = SubBotDB.getBots(uid);

  let text = "🤖 *子机器人绑定*\n\n";
  text += "你可以将多个子机器人绑定到本主控机器人。\n\n";

  if (bots.length === 0) {
    text += "当前未绑定任何子机器人。\n\n";
  } else {
    text += "你已绑定以下子机器人：\n";

    bots.forEach((b: any, i: number) => {
      text += `\n${i + 1}. @${b.username}（${b.name}）`;
    });

    text += "\n\n";
  }

  // 菜单按钮
  const keyboard = {
    inline_keyboard: [
      [
        { text: "➕ 绑定新的子机器人", callback_data: "subbot_token_bind" }
      ],
      bots.length > 0
        ? [{ text: "📋 已绑定机器人列表", callback_data: "subbot_token_list" }]
        : []
    ].filter(row => row.length > 0)
  };

  await sendMsg(ctx, text, {

