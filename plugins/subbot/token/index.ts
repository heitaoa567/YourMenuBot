// =======================================
// plugins/subbot/token/index.ts
// 子机器人 Token 绑定主控制器（严格按你的结构）
// =======================================

import { Router } from "../../../core/router";
import { sendMsg } from "../../../core/send";
import { Users } from "../../../userdb";
import { showSubBotTokenMenu } from "./menu";
import { validateToken } from "./validate";
import { saveSubBot } from "./save";

export function setupSubBotTokenModule(router: Router) {
  
  // ================================
  // ① 回调：打开子机器人绑定菜单
  // ================================
  router.callback("subbot_token", async (ctx) => {
    await showSubBotTokenMenu(ctx);
  });

  // ================================
  // ② 回调：开始绑定新的子机器人
  // ================================
  router.callback("subbot_token_bind", async (ctx) => {
    const uid = ctx.from.id;

    Users.set(uid, { step: "await_subbot_token" });

    await sendMsg(ctx, "🔐 *请输入你的子机器人 Token*\n\n格式：`123456789:XXXXX`\n系统会自动验证有效性。", {
      parse_mode: "Markdown"
    });
  });

  // ================================
  // ③ 用户输入 Token
  // ================================
  router.text(async (ctx) => {
    const uid = ctx.from.id;
    const text = ctx.message.text.trim();

    const user = Users.get(uid);
    if (!user || user.step !== "await_subbot_token") return;

    // 粗校验
    if (!/^\d+:[A-Za-z0-9_-]+$/.test(text)) {
      return sendMsg(ctx, "❌ Token 格式不正确，请重新输入。");
    }

    await sendMsg(ctx, "⏳ 正在验证 Token…");

    const info = await validateToken(text);

    if (!info.ok) {
      return sendMsg(ctx, "❌ *Token 无效*\n请确认这是 @BotFather 创建的真实机器人 Token。", {
        parse_mode: "Markdown"
      });
    }

    // 保存到数据库
    saveSubBot({
      owner_id: uid,
      token: text,
      bot_id: info.bot_id!,
      username: info.username!,
      name: info.name!
    });

    // 清除步骤
    Users.set(uid, { step: null });

    // 返回成功信息
    await sendMsg(ctx,
      `✅ *绑定成功！*\n\n你已成功绑定：@${info.username}（${info.name}）`,
      { parse_mode: "Markdown" }
    );
  });

  // ================================
  // ④ 查看已绑定的子机器人
  // ================================
  router.callback("subbot_token_list", async (ctx) => {
    await showSubBotTokenMenu(ctx); // 这里复用 menu.ts 的列表显示
  });
}
