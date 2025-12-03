// =======================================
// plugins/subbot/callback.ts
// 子机器人模块 callback_data 事件总路由
// =======================================

import { Router } from "../../core/router";
import { showSubBotMainMenu } from "./menus/indexx";
import { showSubBotButtons } from "./menus/buttons";
import { showSubBotBroadcastMenu } from "./menus/broadcast";
import { showSubBotStatsMenu } from "./menus/stats";

import { setupSubBotTokenModule } from "./token/index";
import { setupSubBotListenerModule } from "./listener/index";
import { SubBotDB } from "../../subbotdb";

export function setupSubBotCallbacks(router: Router) {

  // ================
  // 0. 主菜单入口
  // ================
  router.callback("subbot_main", async (ctx) => {
    await showSubBotMainMenu(ctx);
  });


  // ================
  // 1. Token 模块（绑定子机器人）
  // ================
  setupSubBotTokenModule(router);  
  // 这里面会自动注册 subbot_token / bind / save / validate 的 callback


  // =================================================
  // 2. 管理子机器人（从列表进入某个子机器人）
  // callback_data: subbot_manage_<bot_id>
  // =================================================
  router.callbackRegex(/^subbot_manage_(\d+)$/, async (ctx, match) => {
    const botId = Number(match[1]);
    await showSubBotButtons(ctx, botId);
  });


  // =================================================
  // 3. 子机器人群发菜单
  // callback_data: subbot_broadcast_<bot_id>
  // =================================================
  router.callbackRegex(/^s

