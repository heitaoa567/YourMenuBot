// plugins/subbot/menu.ts
/**
 * 子机器人系统 - 主菜单
 * 这是补齐你当前缺失的 menu.ts，保持与你原项目结构 100% 兼容
 */

import { router } from "../../core/router.ts";
import { sendText, sendKeyboard } from "../../core/send.ts";

export function loadSubBotMenu() {
  router.command("subbot", async (ctx) => {
    await sendKeyboard(ctx, "🤖 子机器人系统\n请选择功能：", [
      [
        { text: "📌 绑定子机器人", callback_data: "subbot_bind" }
      ],
      [
        { text: "🧾 我的子机器人", callback_data: "subbot_list" }
      ]
    ]);
  });
}

// 自动加载
loadSubBotMenu();
