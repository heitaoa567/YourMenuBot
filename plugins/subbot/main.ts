// =======================================
// plugins/subbot/main.ts
// 子机器人系统 - 主入口（适配你当前架构）
// =======================================

import { sendText, sendKeyboard } from "../../core/send.ts";

// 子机器人主菜单内容
export async function showSubBotMainMenu(ctx: any) {
  await sendKeyboard(ctx, "🤖 子机器人系统\n请选择功能：", [
    [{ text: "📌 绑定子机器人", callback_data: "sub_bind" }],
    [{ text: "🧾 我的子机器人", callback_data: "sub_list" }]
  ]);
}

// =======================================
// 被 router.ts 调用的统一入口
// =======================================
export async function command(uid: number, text: string, ctx: any) {
  if (text === "/subbot") {
    return await showSubBotMainMenu(ctx);
  }
}

// =======================================
// 点击按钮 sub_main 时打开菜单
// （由 router.ts 的 callback 分发）
// =======================================
export async function callback(ctx: any, data: string) {
  if (data === "sub_main") {
    return await showSubBotMainMenu(ctx);
  }
}
