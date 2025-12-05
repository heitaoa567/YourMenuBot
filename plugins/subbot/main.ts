// =======================================
// plugins/subbot/main.ts
// 子机器人系统 - 主入口（完全兼容你当前架构）
// =======================================

import { sendText } from "../../core/send.ts";

// 构建 InlineKeyboard
function buildMenu() {
  return {
    inline_keyboard: [
      [{ text: "📌 绑定子机器人", callback_data: "sub_bind" }],
      [{ text: "🧾 我的子机器人", callback_data: "sub_list" }],
    ],
  };
}

// =======================================
// 显示子机器人主菜单（必须使用 ctx）
// =======================================
export async function showSubBotMainMenu(ctx: any) {
  return await sendText(
    ctx,
    "🤖 子机器人系统\n请选择功能：",
    buildMenu()
  );
}

// =======================================
// 供 router.ts 调用的文字指令入口
// router.ts 会传 ctx 而不是 uid
// =======================================
export async function command(ctx: any, text: string) {
  if (text === "/subbot") {
    return await showSubBotMainMenu(ctx);
  }
}

// =======================================
// 点击按钮 sub_main 时触发
// router.ts → Subbot.handle(ctx, data)
// =======================================
export async function callback(ctx: any, data: string) {
  if (data === "sub_main") {
    return await showSubBotMainMenu(ctx);
  }
}
