// =======================================
// plugins/subbot/token/index.ts
// 子机器人系统：Token 绑定主入口
// =======================================

import { Router } from "../../../core/router";
import { sendMsg } from "../../../core/send";
import { Users } from "../../../userdb";
import { SubBotDB } from "../../../subbotdb";
import { checkBotToken } from "./token_check";

export function setupSubBotTokenPlugin(router: Router) {

  // 用户发送 /bindbot 进入绑定流程
  router.cmd("/bindbot", async (ctx) => {
    const uid = ctx.from.id;

    // 设置步骤
    Users.set(uid, { step: "await_bot_token" });

    await sendMsg(ctx, "🔗 *请发送你要绑定的子机器人 Token*\n\n- 必须是 @BotFather 创建的 Token\n- 格式：`123456789:XXXXXXX`\n- 发送后系统将自动验证", { parse_mode: "Markdown" });
  });

  // 用户处于输入 Token 状态
  router.text(async (ctx) => {
    const uid = ctx.from.id;
    const text = ctx.message.text.trim();

    const user = Users.get(uid);
    if (!user || user.step !== "await_bot_token") return; // 非此状态忽略

    // 粗略校验 Token 格式
    if (!/^\d+:[A-Za-z0-9_-]+$/.test(text)) {
      return sendMsg(ctx, "❌ *Token 格式不正确*\n请重新输入正确的子机器人 Token", {
        parse_mode: "Markdown"
      });
    }

    await sendMsg(ctx, "⏳ 正在验证 Token，请稍等…");

    const info = await checkBotToken(text);

    // Token 无效
    if (!info.ok) {
      return sendMsg(ctx, "❌ *Token 无效*\n请确认你输入的是由 @BotFather 生成的真实 Token", {
        parse_mode: "Markdown"
      });
    }

    // 写入数据库
    SubBotDB.addBot(uid, {
      token: text,
      bot_id: info.bot_id,
      username: info.username,
      name: info.name,
      created_at: Date.now(),
    });

    // 清空步骤
    Users.set(uid, { step: null });

    return sendMsg(ctx, `✅ *绑定成功！*\n\n你的子机器人：\n- 🤖 名称：*${info.name}*\n- 🟦 用户名：@${info.username}\n\n你现在可以使用子机器人菜单继续配置。`, {
      parse_mode: "Markdown"
    });
  });
}

