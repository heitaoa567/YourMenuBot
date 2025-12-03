// =====================================================
//                  router.ts
//        全局统一消息/回调 分发中心
// =====================================================

import { TG } from "./main.ts";

// 消息类型
import type { Update } from "./types.ts";

// 核心权限模块
import { checkPermissions } from "./core/permissions.ts";

// 数据库
import { getUser, saveUser } from "./db/userdb.ts";

// 主菜单键盘
import { mainMenu } from "./keyboards/mainMenu.ts";
import { languageKeyboard } from "./keyboards/language.ts";

// 插件入口
import * as PluginVIP from "./plugins/vip/callback.ts";
import * as PluginAI from "./plugins/ai/callback.ts";
import * as PluginSubBot from "./plugins/subbot/callback.ts";
import * as PluginWallet from "./plugins/wallet/callback.ts";
import * as PluginSupply from "./plugins/supply/callback.ts";
import * as PluginReferral from "./plugins/referral/callback.ts";
import * as PluginAds from "./plugins/ads/callback.ts";


// =========================
//      统一发送函数
// =========================
async function send(chatId: number, text: string, keyboard?: any) {
  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  };

  if (keyboard) body.reply_markup = keyboard;

  await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// =====================================================
//                  Router 主函数
// =====================================================
export async function Router(update: Update) {

  // ==========================================
  // 处理回调按钮
  // ==========================================
  if (update.callback_query) {
    const cq = update.callback_query;
    const uid = cq.from.id;
    const data = cq.data;
    const user = await getUser(uid);

    // 无记录则创建
    if (!user.created_at) {
      user.created_at = Date.now();
      user.lang = "zh";
      await saveUser(uid, user);
    }

    // 分发给插件处理
    if (data.startsWith("vip_")) return await PluginVIP.handle(uid, data);
    if (data.startsWith("ai_")) return await PluginAI.handle(uid, data);
    if (data.startsWith("sub_")) return await PluginSubBot.handle(uid, data);
    if (data.startsWith("wallet_")) return await PluginWallet.handle(uid, data);
    if (data.startsWith("supply_")) return await PluginSupply.handle(uid, data);
    if (data.startsWith("ref_")) return await PluginReferral.handle(uid, data);
    if (data.startsWith("ads_")) return await PluginAds.handle(uid, data);

    // 切换语言
    if (data === "lang_menu")
      return await send(uid, "请选择你的语言 / Choose your language", languageKeyboard());

    // 返回主菜单
    if (data === "back_main")
      return await send(uid, "主菜单", mainMenu(user));

    return new Response("OK");
  }


  // ==========================================
  // 处理普通消息
  // ==========================================
  if (update.message) {
    const msg = update.message;
    const uid = msg.from.id;
    const text = msg.text || "";

    let user = await getUser(uid);
    if (!user.created_at) {
      user = {
        created_at: Date.now(),
        lang: "zh",
      };
      await saveUser(uid, user);
    }

    // -------- START 带参数（推广） --------
    if (text.startsWith("/start")) {
      const arr = text.split(" ");
      if (arr.length > 1) {
        const refID = Number(arr[1]);
        if (refID !== uid) {
          await PluginReferral.click(refID, uid);
        }
      }
      return await send(uid, "欢迎来到 YourMenuBot", mainMenu(user));
    }

    // -------- AI 问答 --------
    if (text.startsWith("AI") || text.startsWith("问")) {
      return await PluginAI.ask(uid, text);
    }

    // -------- 子机器人 TOKEN 绑定 --------
    if (user.waiting_subbot_token === true) {
      return await PluginSubBot.saveToken(uid, text);
    }

    // -------- 默认主菜单 --------
    return await send(uid, "请选择功能", mainMenu(user));
  }

  return new Response("OK");
}

