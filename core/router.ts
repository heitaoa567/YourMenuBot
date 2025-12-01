// ========================================================
//                      core/router.ts
//     YourMenuBot 的中心路由器（插件自动加载版）
// ========================================================

import { PluginModule, CallbackContext, MessageContext } from "./types.ts";

// 插件总目录
const PLUGIN_DIR = "./plugins";

// 自动加载插件
async function loadPlugins(): Promise<PluginModule[]> {
    const list: PluginModule[] = [];

    for await (const entry of Deno.readDir(PLUGIN_DIR)) {
        if (entry.isDirectory) {
            const pluginPath = `${PLUGIN_DIR}/${entry.name}/index.ts`;

            try {
                const pluginModule = await import(pluginPath);

                // 必须包含以下两个函数之一
                if (pluginModule.onMessage || pluginModule.onCallback) {
                    list.push({
                        name: entry.name,
                        onMessage: pluginModule.onMessage,
                        onCallback: pluginModule.onCallback
                    });
                    console.log(`🔌 插件加载成功: ${entry.name}`);
                }
            } catch (err) {
                console.error(`❌ 插件加载失败 ${entry.name}:`, err);
            }
        }
    }

    return list;
}

// 缓存插件列表（避免每条消息都重新加载）
let pluginsCache: PluginModule[] | null = null;

async function getPlugins() {
    if (!pluginsCache) {
        pluginsCache = await loadPlugins();
    }
    return pluginsCache;
}

// ========================================================
//                     Router 主入口
// ========================================================

export async function handleUpdate(update: any, reply: Function) {
    const plugins = await getPlugins();

    // ---------------------- 回调按钮 ----------------------
    if (update.callback_query) {
        const ctx: CallbackContext = {
            update,
            chatId: update.callback_query.message.chat.id,
            userId: update.callback_query.from.id,
            data: update.callback_query.data,
            reply
        };

        for (const p of plugins) {
            try {
                if (p.onCallback) {
                    const handled = await p.onCallback(ctx);
                    if (handled === true) return; // 插件已处理完成
                }
            } catch (err) {
                console.error(`❌ 插件(${p.name}) callback 错误`, err);
            }
        }

        return;
    }

    // ---------------------- 普通消息 ----------------------
    if (update.message && update.message.text) {
        const text = update.message.text;
        const ctx: MessageContext = {
            update,
            chatId: update.message.chat.id,
            userId: update.message.from.id,
            text,
            reply
        };

        for (const p of plugins) {
            try {
                if (p.onMessage) {
                    const handled = await p.onMessage(ctx);
                    if (handled === true) return; // 插件已处理
                }
            } catch (err) {
                console.error(`❌ 插件(${p.name}) message 错误`, err);
            }
        }
    }
}

