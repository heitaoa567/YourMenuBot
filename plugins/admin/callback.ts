// =======================================
// plugins/admin/callback.ts
// 后台按钮事件总路由（最终整合版）
// =======================================

import { Router } from "../../core/router";
import { sendMsg } from "../../core/send";

import { showAdminMainMenu } from "./menus/index";
import { showAdminBotsMenu, showAdminBotActions } from "./menus/bots";
import { showAdminUsersMenu, showAdminUserDetail } from "./menus/users";
import { showAdminStatsMenu } from "./menus/stats";
import { showAdminSettingsMenu } from "./menus/settings";

import { Users } from "../../userdb";
import { SubBotDB } from "../../subbotdb";

const ADMIN_IDS = [123456789]; 
// ⚠️ 宝贝记得把这里换成你自己的 Telegram ID

export function setupAdminCallbacks(router: Router) {

  // ======================================================
  // 🔐 统一权限拦截器
  // ======================================================
  router.callbackRegex(/^admin_/, async (ctx) => {
    const uid = ctx.from.id;
    if (!ADMIN_IDS.includes(uid)) {
      return ctx.answerCbQuery("❌ 你没有后台权限");
    }
  });


  // ======================================================
  // 1️⃣ 后台主菜单入口 admin_main
  // ======================================================
  router.callback("admin_main", async (ctx) => {
    await showAdminMainMenu(ctx);
  });


  // ======================================================
  // 2️⃣ 后台统计 admin_stats
  // ======================================================
  router.callback("admin_stats", async (ctx) => {
    await showAdminStatsMenu(ctx);
  });


  // ======================================================
  // 3️⃣ 子机器人管理 admin_subbots
  // ======================================================
  router.callback("admin_subbots", async (ctx) => {
    await showAdminBotsMenu(ctx);
  });

  // 单个子机器人管理界面 admin_bot_<id>
  router.callbackRegex(/^admin_bot_(\d+)$/, async (ctx, match) => {
    const botId = Number(match[1]);
    await showAdminBotActions(ctx, botId);
  });


  // ======================================================
  // 4️⃣ 用户管理 admin_users
  // ======================================================
  router.callback("admin_users", async (ctx) => {
    await showAdminUsersMenu(ctx);
  });

  // 用户详情 admin_user_<id>
  router.callbackRegex(/^admin_user_(\d+)$/, async (ctx, match) => {
    const userId = Number(match[1]);
    await showAdminUserDetail(ctx, userId);
  });

  // 设置用户 VIP admin_edit_vip_<id>
  router.callbackRegex(/^admin_edit_vip_(\d+)$/, async (ctx, match) => {
    const userId = Number(match[1]);

    Users.set(ctx.from.id, { step: `admin_edit_vipdays:${userId}` });

    await sendMsg(ctx, `🏷 请输入要设置的 VIP 天数（数字）`);
  });

  // 修改用户备注 admin_edit_usernote_<id>
  router.callbackRegex(/^admin_edit_usernote_(\d+)$/, async (ctx, match) => {
    const userId = Number(match[1]);

    Users.set(ctx.from.id, { step: `admin_edit_usernote:${userId}` });

    await sendMsg(ctx, `✏️ 请输入新的用户备注：`);
  });

  // 删除用户 admin_delete_user_<id>
  router.callbackRegex(/^admin_delete_user_(\d+)$/, async (ctx, match) => {
    const userId = Number(match[1]);

    Users.remove(userId);

    await sendMsg(ctx, `🗑 已删除用户：${userId}`);
    await showAdminUsersMenu(ctx);
  });


  // ======================================================
  // 5️⃣ 系统设置 admin_settings
  // ======================================================
  router.callback("admin_settings", async (ctx) => {
    await showAdminSettingsMenu(ctx);
  });


  // ======================================================
  // 6️⃣ 系统设置：VIP 默认天数 admin_setting_vipdays
  // ======================================================
  router.callback("admin_setting_vipdays", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_edit_setting:default_vip_days" });
    await sendMsg(ctx, "🏷 请输入新的 VIP 默认天数（数字）：");
  });


  // ======================================================
  // 7️⃣ 系统设置：维护模式 admin_setting_maintenance
  // ======================================================
  router.callback("admin_setting_maintenance", async (ctx) => {
    const settings = SubBotDB.getSystemSettings();
    const newState = !settings.maintenance;

    SubBotDB.setSystemSetting("maintenance", newState);

    await sendMsg(ctx, `⚙️ 维护模式已${newState ? "开启 🟥" : "关闭 🟩"}`);

    await showAdminSettingsMenu(ctx);
  });


  // ======================================================
  // 8️⃣ 系统设置：修改全局公告 admin_setting_notice
  // ======================================================
  router.callback("admin_setting_notice", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_edit_setting:global_notice" });
    await sendMsg(ctx, "📝 请输入新的全局公告内容：");
  });


  // ======================================================
  // 9️⃣ 系统设置：广告开关 admin_setting_ads
  // ======================================================
  router.callback("admin_setting_ads", async (ctx) => {
    const settings = SubBotDB.getSystemSettings();

    const newState = !settings.ads_enabled;

    SubBotDB.setSystemSetting("ads_enabled", newState);

    await sendMsg(ctx, `📰 广告系统已${newState ? "开启 🟩" : "关闭 🟥"}`);

    await showAdminSettingsMenu(ctx);
  });

}
