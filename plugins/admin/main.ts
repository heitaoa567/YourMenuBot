// =======================================
// plugins/admin/main.ts
// 管理员后台入口（与你现有风格完全一致）
// =======================================

import { Router } from "../../core/router";
import { sendMsg } from "../../core/send";
import { showAdminMainMenu } from "./menus/index";

const ADMIN_IDS = [123456789]; 
// ⚠️ 宝贝你要把这里替换成你自己的 Telegram ID
// 后台只允许这些人进入

export function setupAdminMain(router: Router) {

  // ================================
  // ① /admin 命令入口
  // ================================
  router.cmd("/admin", async (ctx) => {
    const uid = ctx.from.id;

    if (!isAdmin(uid)) {
      return sendMsg(ctx, "❌ 你没有后台权限。");
    }

    await showAdminMainMenu(ctx);
  });

  // ================================
  // ② 按钮入口：callback_data = admin_main
  // ================================
  router.callback("admin_main", async (ctx) => {
    const uid = ctx.from.id;

    if (!isAdmin(uid)) {
      return ctx.answerCbQuery("你没有后台权限");
    }

    await showAdminMainMenu(ctx);
  });
}

// ================================
// 工具：判断是否管理员
// ================================
function isAdmin(uid: number): boolean {
  return ADMIN_IDS.includes(uid);
}

