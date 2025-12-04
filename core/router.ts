// =====================================================
//                  core/router.ts
//           全局统一消息 / 回调 分发中心
// =====================================================

import { handleMainMessage, handleMainCallback } from "./handler.ts";

// 插件模块入口
import * as Lang from "../plugins/lang/index.ts";
import * as VIP from "../plugins/vip/index.ts";
import * as Wallet from "../plugins/wallet/index.ts";
import * as Subbot from "../plugins/subbot/index.ts";
import * as Broadcast from "../plugins/broadcast/index.ts";
import * as Supply from "../plugins/supply/index.ts";
import * as Ads from "../plugins/ads/index.ts";
import * as Referral from "../plugins/referral/index.ts";
import * as AI from "../plugins/ai/index.ts";

// 类型
import type { Update } from "../types.ts";

// 用户数据库
import { getUser, saveUser } from "../db/userdb.ts";

// =====================================================
//                    Router 主入口
// =====================================================

export async function router(update: Update, ctx: any) {
  // ==================================================
  // 回调按钮 =========================================
  // ==================================================
  if (update.callback_query) {
    const cq = update.callback_query;
    const uid = cq.from.id;
    const data = cq.data;

    const user = await getUser(uid);
    const lang = user.lang || "en";

    // ========= 修复点 ①：给 callback.ts 传 ctx =========
    if (data.startsWith("sub_"))
      return await Subbot.handle(ctx, data);

    // ========= 其他插件保持原有逻辑 =========
    if (data.startsWith("lang_")) return await Lang.handle(uid, data);
    if (data.startsWith("vip_")) return await VIP.handle(uid, data);
    if (data.startsWith("wallet_")) return await Wallet.handle(uid, data);
    if (data.startsWith("broadcast_")) return await Broadcast.handle(uid, data);
    if (data.startsWith("supply_")) return await Supply.handle(uid, data);
    if (data.startsWith("ads_")) return await Ads.handle(uid, data);
    if (data.startsWith("ref_")) return await Referral.handle(uid, data);
    if (data.startsWith("ai_")) return await AI.handle(uid, data);

    // fallback
    return await handleMainCallback(uid, data, cq);
  }

  // ==================================================
  // 普通消息 =========================================
  // ==================================================
  if (update.message) {
    const msg = update.message;
    const uid = msg.from.id;
    const text = msg.text || "";

    let user = await getUser(uid);

    // 第一次进入自动初始化
    if (!user.created_at) {
      user.created_at = Date.now();
      user.lang = "en";
      await saveUser(user); // 修复 saveUser 调用
    }

    // /start 处理
    if (text.startsWith("/start")) {
      return await Lang.welcome(uid);
    }

    // Text → AI
    if (text.startsWith("AI") || text.startsWith("问")) {
      return await AI.ask(uid, text);
    }

    // ==================================================
    // 修复点②：子机器人 token 采集（给 saveToken 传 ctx）
    // ==================================================
    if (user.waiting_subbot_token === true) {
      return await Subbot.saveToken(ctx, text);
    }

    // fallback 主菜单
    return await handleMainMessage(uid, text, msg);
  }

  return new Response("OK");
}
