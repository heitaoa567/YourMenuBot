// ============================================================
// plugins/subbot/menu.ts
// 子机器人系统 - 主菜单（完全适配你目前的架构）
// ============================================================

import { sendKeyboard } from "../../core/send.ts";

// 子机器人主菜单（供 main.ts 或回调打开）
export async function showSubBotMenu(ctx: any) {
  await sendKeyboard(ctx, "🤖 子机器人系统\n请选择功能：", [
    [
      { text: "📌 绑定子机器人", callback_data: "sub_bind" }
    ],
    [
      { text: "🧾 我的子机器人", callback_data: "sub_list" }
    ]
  ]);
}
