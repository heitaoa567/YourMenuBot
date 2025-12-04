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
// 显示子机器人主菜单
// ctx → 换成 uid（与你当前 sendText 结构完全一致）
// =======================================
export async function showSubBotMainMenu(uid: number) {
  return await sendText(
    uid,
    "🤖 子机器人系统\n请选择功能：",
    buildMenu()
  );
}

// =======================================
// 被 router.ts 调用的文字指令入口
// router.ts 会传 (uid, text)
// =======================================
export async function command(uid: number, text: string) {
  if (text === "/subbot") {
    return await showSubBotMainMenu(uid);
  }
}

// =======================================
// 点击按钮 sub_main 时触发
// router.ts 会传 (uid, data)
// =======================================
export async function callback(uid: number, data: string) {
  if (data === "sub_main") {
    return await showSubBotMainMenu(uid);
  }
}
