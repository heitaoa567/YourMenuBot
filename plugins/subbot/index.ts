// =============================================================
//                   plugins/subbot/index.ts
//         子机器人系统主入口（统一导出 + 路由注册）
// =============================================================

import { Router } from "../../core/router.ts";

import { handleSubBotCallback } from "./callback.ts";
import { handleSubBotInput } from "./handler.ts";
import { renderSubBotView } from "./view.ts";
import { publishSupplyToSubBot } from "./publish.ts";

// =============================================================
//            子机器人主菜单触发：subbot_main
// =============================================================
export function setupSubBot(router: Router) {

  // 子机器人总菜单入口
  router.callback("subbot_main", async (ctx) => {
    await showSubBotMenu(ctx);
  });

  // 处理所有子机器人 callback_xxx
  router.callbackRegex(/^subbot_/, async (ctx) => {
    await handleSubBotCallback(ctx);
  });

  // 处理输入文字（子机器人备注名称等）
  router.text(async (ctx) => {
    await handleSubBotInput(ctx);
  });

  // 渲染供需内容推送到子机器人
  router.command("subbot_render_view", async (ctx) => {
    await renderSubBotView(ctx);
  });

  // 推送供需到子机器人
  router.command("subbot_publish", async (ctx) => {
    await publishSupplyToSubBot(ctx);
  });
}
