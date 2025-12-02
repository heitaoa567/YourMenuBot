// ===============================================================
//                        plugins/router.ts
//      YourMenuBot 插件总路由器（所有功能模块的统一入口）
// ===============================================================

import type { Message, CallbackQuery } from "../types.ts";

// 插件列表（自动注册）
import * as langPlugin from "./lang/index.ts";
import * as vipPlugin from "./vip/index.ts";
import * as walletPlugin from "./wallet/index.ts";
import * as subbotPlugin from "./subbot/index.ts";
import * as supplyPlugin from "./supply/index.ts";
import * as adsPlugin from "./ads/index.ts";
import * as aiPlugin from "./ai/index.ts";
import * as affiliatePlugin from "./affiliate/index.ts";

// ===============================================================
//               插件注册表（你要的插件全部列在这里）
// ===============================================================
const plugins = [
  langPlugin,
  vipPlugin,
  walletPlugin,
  subbotPlugin,
  supplyPlugin,
  adsPlugin,
  aiPlugin,
  affiliatePlugin,
];

// ===============================================================
//               插件路由器（外部调用）
// ===============================================================
export const routerPlugins = {
  
  // -------------------------------------------------------------
  //                         处理 Message
  // -------------------------------------------------------------
  async onMessage(uid: number, text: string, msg: Message) {
    for (const plugin of plugins) {
      if (plugin.onMessage) {
        const result = await plugin.onMessage(uid, text, msg);
        if (result === true || result === "OK" || result?.handled) {
          return true;
        }
      }
    }
    return false;
  },

  // -------------------------------------------------------------
  //                       处理 Callback 按钮
  // -------------------------------------------------------------
  async onCallback(uid: number, data: string, cq: CallbackQuery) {
    for (const plugin of plugins) {
      if (plugin.onCallback) {
        const result = await plugin.onCallback(uid, data, cq);
        if (result === true || result === "OK" || result?.handled) {
          return true;
        }
      }
    }
    return false;
  },
};


