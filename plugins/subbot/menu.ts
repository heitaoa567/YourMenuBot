// ============================================================
// plugins/subbot/menu.ts
// 子机器人系统 - 主菜单（完全适配你的 router.ts）
// ============================================================

import { sendText } from "../../core/send.ts";

// 构建 InlineKeyboard
function buildKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "📌 绑定子机器人", callback_data: "sub_bind" }
      ],
      [
        { text: "🧾 我的子机器人", callback_data: "sub_list" }
      ]
    ]
  };
}

// ==========================================
// 兼容你的 sendText(ctx, ...) 调用方式
// ==========================================
export async function showSubBotMenu(ctx: any) {
  return await sendText(
    ctx,
    "🤖 子机器人系统\n请选择功能：",
    buildKeyboard()
  );
}
