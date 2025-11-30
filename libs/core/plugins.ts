// ==================================================
//                插件管理中心
//      所有插件都通过此文件注册到系统
// ==================================================

export const Plugins: any[] = [];

export function registerPlugin(plugin: any) {
  Plugins.push(plugin);
  console.log(`🔌 Plugin loaded: ${plugin.name}`);
}

export function registerMenu(name: string, handler: any) {
  Plugins.push({
    name,
    menuName: name,
    onMenu: handler
  });
}
