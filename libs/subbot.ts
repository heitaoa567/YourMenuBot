// ==========================================
//               subbot.ts
//     YourMenuBot — 子机器人绑定系统
// ==========================================

import { getUser, saveUser } from "../db/userdb.ts";

/**
 * 用户点击“绑定子机器人”按钮时触发
 * main.ts 会调用它
 */
export async function startBindSubBot(userId: number) {
  const user = await getUser(userId);
  user.waiting_subbot_token = true;
  await saveUser(userId, user);
}

/**
 * 保存子机器人 Token
 * 用户发送内容时 main.ts 会调用 saveSubBotToken(chatId, text)
 */
export async function saveSubBotToken(userId: number, text: string): Promise<string> {
  const user = await getUser(userId);

  // Token 必须类似于：123456789:ABCDEF
  const parts = text.trim().split(":");
  if (parts.length !== 2) {
    user.waiting_subbot_token = false;
    await saveUser(userId, user);
    return "❌ Token 格式错误。\n\n正确格式示例：\n`123456789:ABCDEF`";
  }

  const bot_id = parts[0];
  const bot_token = parts[1];

  if (bot_id.length < 5 || bot_token.length < 10) {
    user.waiting_subbot_token = false;
    await saveUser(userId, user);
    return "❌ Token 无效，请检查后重新发送。";
  }

  // 确保 subbots 字段存在
  if (!Array.isArray(user.subbots)) {
    user.subbots = [];
  }

  // 保存子机器人
  user.subbots.push({
    bot_id,
    token: bot_token,
    bind_time: Date.now()
  });

  // 完成绑定流程
  user.waiting_subbot_token = false;
  await saveUser(userId, user);

  return "🤖 子机器人已成功绑定！\n你可以继续绑定更多机器人。";
}

/**
 * 获取一个用户所有绑定的子机器人
 */
export async function getSubBotsList(userId: number): Promise<string> {
  const user = await getUser(userId);
  const list = user.subbots || [];

  if (list.length === 0) {
    return "你还没有绑定任何子机器人。";
  }

  let txt = "🤖 *你的子机器人列表：*\n\n";
  for (let i = 0; i < list.length; i++) {
    txt += `#${i + 1}\nID: \`${list[i].bot_id}\`\nToken: \`${list[i].token}\`\n\n`;
  }

  return txt.trim();
}
