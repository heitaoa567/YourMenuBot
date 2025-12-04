// ============================================================
// plugins/subbot/token/index.ts
// 子机器人 Token 绑定（适配你真实项目架构）
// ============================================================

import { sendText } from "../../../core/send.ts";
import { getUser, saveUser } from "../../../db/userdb.ts";

// 打开“绑定子机器人”菜单
export async function openBindMenu(ctx: any) {
  await sendText(ctx,
    "🔐 请输入你的子机器人 Token：\n\n格式：`123456789:XXXXX`",
  );
}

// 处理用户输入 Token（由 router.ts 调用）
export async function processToken(ctx: any, text: string) {
  const uid = ctx.from.id;
  const user = await getUser(uid);

  // 是否在等待 token？
  if (!user.waiting_subbot_token) return;

  const token = text.trim();

  // 基础格式校验
  if (!/^\d+:[A-Za-z0-9_-]+$/.test(token)) {
    return await sendText(ctx, "❌ Token 格式不正确，请重新输入。");
  }

  // 保存
  user.waiting_subbot_token = false;
  user.subbot_token = token;
  await saveUser(user);

  return await sendText(ctx, "✅ Token 已成功绑定！");
}
