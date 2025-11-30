// ==================================================
//                插件路由系统（核心）
//          所有消息与按钮都从这里经过
// ==================================================

import { Plugins } from "./plugins.ts";

// 按钮路由
export async function handleCallback(chatId: number, data: string) {
  for (const plugin of Plugins) {
    if (plugin.onCallback) {
      const result = await plugin.onCallback(chatId, data);
      if (result === "handled") return true;
    }
  }
  return false;
}

// 文本消息路由
export async function handleMessage(chatId: number, text: string) {
  for (const plugin of Plugins) {
    if (plugin.onMessage) {
      const result = await plugin.onMessage(chatId, text);
      if (result === "handled") return true;
    }
  }
  return false;
}

// 菜单路由（主菜单按钮）
export async function handleMenu(chatId: number, key: string) {
  for (const plugin of Plugins) {
    if (plugin.onMenu && plugin.menuName === key) {
      const menu = await plugin.onMenu(chatId);
      return menu;
    }
  }
  return null;
}
