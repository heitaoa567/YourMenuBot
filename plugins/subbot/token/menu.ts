// =======================================
// plugins/subbot/token/menu.ts
// 子机器人绑定菜单（完全适配你当前项目结构）
// =======================================

import { sendText } from "../../../core/send.ts";
import { getAllSubBots } from "../../../db/subbotdb.ts";

/**
 * 显示子机器人绑定菜单
 * @param uid number = ctx.from.id
 */
export async function showSubBotTokenMenu(uid: number) {
  // 获取所有子机器人，再过滤本用户的
  const bots = (await getAllSubBots()).filter((b) => b.owner_id === uid);

  let text = "🤖 <b>子机器人绑定</b>\n\n";
  text += "你可以将多个子机器人绑定到本主控机器人。\n\n";

  if (bots.length === 0) {
    text += "当前未绑定任何子机器人。\n\n";
  } else {
    text += "你已绑定以下子机器人：\n";

    bots.forEach((b, i) => {
      text += `\n${i + 1}. @${b.bot_user}（ID：${b.bot_id}）`;
    });

    text += "\n\n";
  }

  // 按钮
  const keyboard = {
    inline_keyboard: [
      [
        { text: "➕ 绑定新的子机器人", callback_data: "sub_bind" }
      ],
      bots.length > 0
        ? [{ text: "📋 已绑定列表", callback_data: "sub_list" }]
        : []
    ].filter(row => row.length > 0)
  };

  await sendText(uid, text, keyboard);
}
