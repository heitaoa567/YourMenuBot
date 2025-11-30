// =====================================
//       Plugin Engine - plugins.ts
//       插件注册中心（系统大脑）
// =====================================

export interface BotPlugin {
  name: string;                     // 插件名称
  onMessage?: Function;             // 处理普通消息
  onCallback?: Function;            // 处理按钮回调
  onMenu?: Function;                // 注册菜单
}

const plugins: BotPlugin[] = [];

// 注册插件（插件模块调用）
export function registerPlugin(plugin: BotPlugin) {
  plugins.push(plugin);
  console.log(`[PLUGIN] Loaded: ${plugin.name}`);
}

// 获取全部插件
export function getPlugins() {
  return plugins;
}

// 按名称查找插件
export function getPluginByName(name: string) {
  return plugins.find(p => p.name === name);
}

