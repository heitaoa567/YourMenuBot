// ========================================
//               VIP 插件入口
//           /plugins/vip/index.ts
// ========================================

import { registerPlugin } from "../../libs/core/plugins.ts";
import { registerMenu } from "../../libs/core/menu.ts";

import { vipMenu } from "./menu.ts";
import { vipOnMessage } from "./handler.ts";
import { vipOnCallback } from "./callback.ts";

// 注册插件
registerPlugin({
  name: "vip",
  onMessage: vipOnMessage,
  onCallback: vipOnCallback,
  onMenu: vipMenu,
});

// 注册菜单（主菜单按钮）
// 会自动显示： "VIP会员"
registerMenu("VIP会员", vipMenu);

console.log("[PLUGIN] VIP plugin loaded");

