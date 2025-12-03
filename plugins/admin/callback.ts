// =======================================
// plugins/admin/callback.ts
// 后台按钮事件总路由（与你现有结构完全一致）
// =======================================

import { Router } from "../../core/router";
import { sendMsg } from "../../core/send";

import { showAdminMainMenu } from "./menus/index";
import { showAdminBotsMenu } from "./menus/bots";
import { showAdminUsersMenu } from "./menus/users";
import { showAdminStatsMenu } from "./menus/stats";
import { showAdminSettingsMenu } from "./menus/settings";

// 如果你有钱包、VIP、供需、广告模块，未来继续扩展这里
// import { showAdminWalletMenu } from "./menus/wallet";
// ……

const ADMIN_IDS = [123456789]; 
// ⚠️ 宝贝这里要换成你的 Telegram ID

export function setupAdminCallbacks(router: Router) {

  // ================================
  // 权限检查
  // ================================
  router.callbackRegex(/^admin_/, async (ctx, match) => {
    const uid = ctx.from.id;

    if (!ADMIN_IDS.includes(uid)) {
      return ctx.answerCbQuery("❌ 你没有后台权限");
    }
  });

  // ================================
  // ① admin_main → 打开后台主菜单
  // ================================
  router.callback("admin_main", async (ctx) => {
    await showAdminMainMenu(ctx);
  });

  // ================================
  // ② admin_stats → 后台数据统计
  // ================================
  router.callback("admin_stats", async (ctx) => {
    await showAdminStatsMenu(ctx);
  });

  // ================================
  // ③ admin_subbots → 子机器人管理
  // ================================
  router.callback("admin_subbots", async (ctx) => {
    await showAdminBotsMenu(ctx);
  });

  // ================================
  // ④ admin_users → 用户管理
  // ================================
  router.callback("admin_users", async (ctx) => {
    await showAdminUsersMenu(ctx);
  });

  // ================================
  // ⑤ admin_wallet（未来扩展）
  // ================================
  router.callback("admin_wallet", async (ctx) => {
    await sendMsg(ctx, "💰 钱包系统暂未实现");
  });

  // ================================
  // ⑥ admin_vip（未来扩展）
  // ================================
  router.callback("admin_vip", async (ctx) => {
    await sendMsg(ctx, "🏷 VIP 系统暂未实现");
  });

  // ================================
  // ⑦ admin_broadcast（未来扩展）
  // ================================
  router.callback("admin_broadcast", async (ctx) => {
    await sendMsg(ctx, "📢 全局广播暂未实现");
  });

  // ================================
  // ⑧ admin_ads（未来扩展）
  // ================================
  router.callback("admin_ads", async (ctx) => {
    await sendMsg(ctx, "📰 广告系统暂未实现");
  });

  // ================================
  // ⑨ admin_supply（未来扩展）
  // ================================
  router.callback("admin_supply", async (ctx) => {
    await sendMsg(ctx, "📦 供需系统暂未实现");
  });

  // ================================
  // ⑩ admin_settings → 系统设置菜单
  // ================================
  router.callback("admin_settings", async (ctx) => {
    await showAdminSettingsMenu(ctx);
  });
}

