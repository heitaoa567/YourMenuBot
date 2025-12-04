// =======================================
// plugins/subbot/main.ts
// 子机器人系统 - 总入口菜单（严格按你当前架构）
// =======================================

import { Router } from "../../core/router";
import { sendMsg } from "../../core/send";
import { showSubBotMainMenu } from "./menus/index";

export function setupSubBotMain(router: Router) {

  // ======================================
  // ① /subbot 命令入口
  // ======================================
  router.cmd("/subbot", async (ctx) => {
    await showSubBotMainMenu(ctx);
  });

  // ======================================
  // ② 主菜单按钮入口
  //    callback_data: "subbot_main"
  // ======================================
  router.callback("subbot_main", async (ctx) => {
    await showSubBotMainMenu(ctx);
  });

  // ======================================
  // ③ 在这里你也可以预留未来入口（如 /manager）
  // ======================================
  router.cmd("/manager", async (ctx) => {
    await showSubBotMainMenu(ctx);
  });
}
