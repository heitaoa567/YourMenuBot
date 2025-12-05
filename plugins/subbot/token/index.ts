// ============================================================
// plugins/subbot/token/index.ts
// 子机器人 Token 绑定（适配当前 Deno 架构版）
// ============================================================

import { sendText } from "../../../core/send.ts";
import { getUser, saveUser } from "../../../db/userdb.ts";

// 打开“绑定子机器人”菜单（可选使用）
// 你也可以仅用 callback.ts 里的 sub_bind 按钮逻辑
export async function openBindMenu(uid: number) {
  // 标记为等待 Token
  const user = await getUser(uid);
  (user as any).waiting_subbot_token = true;
  await saveUser(uid, user);

  await sendText(
    uid,
    "🔐 请输入你的子机器人 Token：\n\n格式：<code>123456789:xxxxxxxxxxxxxxxxxxxxxxxx</code>",
  );
}

// 处理用户输入 Token（如果你手动调用的话）
// 一般 router 里直接用 Subbot.saveToken(uid, text) 即可
export async function processToken(uid: number, text: string) {
  const user = await getUser(uid);

  if (!(user as any).waiting_subbot_token) return;

  const token = text.trim();

  // Telegram Bot Token 格式：一串数字 + 冒号 + 一串字符
  const tokenRegex = /^\d+:[A-Za-z0-9_\-]{20,100}$/;
  if (!tokenRegex.test(token)) {
    await sendText(uid, "❌ Token 格式不正确，请重新输入。");
    return;
  }

  (user as any).waiting_subbot_token = false;
  (user as any).subbot_token = token;
  await saveUser(uid, user);

  await sendText(uid, "✅ Token 已成功绑定！");
}
