// ======================================================================
//                           core/router.ts
//       全局路由中心（所有 update 都会先经过这里，再分发到插件）
// ======================================================================

import { handleMainMessage, handleMainCallback } from "./handler.ts";

// 插件模块（一个个按需导入）
import * as Lang from "../plugins/lang/index.ts";
import * as VIP from "../plugins/vip/index.ts";
import * as Wallet from "../plugins/wallet/index.ts";
import * as SubBot from "../plugins/subbot/index.ts";
import * as Broadcast from "../plugins/broadcast/index.ts";
import * as Supply from "../plugins/supply/index.ts";
import * as Ads from "../plugins/ads/index.ts";
import * as Referral from "../plugins/referral/index.ts";
import * as AI from "../plugins/ai/index.ts";

// 类型
import type { Update } from "../types.ts";


// ======================================================================
//                      主入口：处理 webhook update
// ======================================================================
export async function route(update: Update) {
  try {
    // ---------------------------
    //    Callback Query (按钮)
    // ---------------------------
    if (update.callback_query) {
      const cq = update.callback_query;
      const uid = cq.from.id;
      const data = cq.data || "";

      // 依次交给插件处理（true = 已处理）
      if (await Lang.onCallback(uid, data, cq)) return;
      if (await VIP.onCallback(uid, data, cq)) return;
      if (await Wallet.onCallback(uid, data, cq)) return;
      if (await SubBot.onCallback(uid, data, cq)) return;
      if (await Broadcast.onCallback(uid, data, cq)) return;
      if (await Supply.onCallback(uid, data, cq)) return;
      if (await Referral.onCallback(uid, data, cq)) return;
      if (await Ads.onCallback(uid, data, cq)) return;

      // 最后交给主机器人处理
      await handleMainCallback(uid, data, cq);
      return;
    }


    // ---------------------------
    //         Message
    // ---------------------------
    if (update.message) {
      const msg = update.message;
      const uid = msg.from.id;
      const text = msg.text || "";

      // 语言加载（用户第一次进来自动设英文）
      await Lang.loadLanguage(update);

      // 插件处理（按顺序，返回 true 表示已处理）
      if (await Lang.onMessage(uid, text, msg)) return;
      if (await VIP.onMessage(uid, text, msg)) return;
      if (await Wallet.onMessage(uid, text, msg)) return;
      if (await SubBot.onMessage(uid, text, msg)) return;
      if (await Broadcast.onMessage(uid, text, msg)) return;
      if (await Supply.onMessage(uid, text, msg)) return;
      if (await Referral.onMessage(uid, text, msg)) return;
      if (await Ads.onMessage(uid, text, msg)) return;
      if (await AI.onMessage(uid, text, msg)) return;

      // 最终 fallback
      await handleMainMessage(uid, text, msg);
      return;
    }

  } catch (err) {
    console.error("❌ Router Error:", err);
  }
}

