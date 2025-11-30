// ========================================
//        Menu Manager - menu.ts
//   动态菜单系统（插件自动注册按钮）
// ========================================

import { getPlugins } from "./plugins.ts";

// 每个插件可以注册一个菜单（返回 InlineKeyboard）
export interface MenuItem {
  name: string;             // 菜单名字
  keyboard: Function;       // 返回按钮 keyboard
}

const menuList: MenuItem[] = [];

// 注册菜单（由插件调用）
export function registerMenu(name: string, keyboard: Function) {
  menuList.push({ name, keyboard });
  console.log(`[MENU] Registered: ${name}`);
}

// 获取主菜单（自动拼接全部插件菜单）
export function getMainMenu(lang = "zh") {
  const buttons = menuList.map(menu => {
    return [{ text: menu.name, callback_data: `menu_${menu.name}` }];
  });

  return {
    inline_keyboard: buttons
  };
}

// 自动分发菜单点击
export async function dispatchMenu(chatId: number, data: string) {
  if (!data.startsWith("menu_")) return false;

  const menuName = data.replace("menu_", "");

  const targetMenu = menuList.find(m => m.name === menuName);
  if (!targetMenu) return false;

  const keyboard = await targetMenu.keyboard(chatId);
  return keyboard;
}

