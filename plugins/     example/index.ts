// ========================================
//      Example Plugin - index.ts
//      插件入口（注册插件 + 菜单）
// ========================================

import { registerPlugin } from "../../libs/core/plugins.ts";
import { registerMenu } from "../../libs/core/menu.ts";

import { exampleMenu } from "./menu.ts";
import { exampleOnMessage } from "./handler.ts";
import { exampleOnCallback } from "./callback.ts";

registerPlugin({
  name: "example",
  onMessage: exampleOnMessage,
  onCallback: exampleOnCallback,
  onMenu: exampleMenu,
});

// 注册菜单按钮（自动加入主菜单）
registerMenu("示例功能", exampleMenu);

console.log("[PLUGIN] Example plugin loaded");

