// ========================================
//           Wallet 插件入口
//    /plugins/wallet/index.ts
// ========================================

import { registerPlugin } from "../../libs/core/plugins.ts";
import { registerMenu } from "../../libs/core/menu.ts";

import { walletMenu } from "./menu.ts";
import { walletOnMessage } from "./handler.ts";
import { walletOnCallback } from "./callback.ts";

// 注册钱包插件
registerPlugin({
  name: "wallet",
  onMessage: walletOnMessage,
  onCallback: walletOnCallback,
  onMenu: walletMenu,
});

// 在主菜单注册按钮
registerMenu("钱包中心💰", walletMenu);

console.log("[PLUGIN] Wallet plugin loaded");

