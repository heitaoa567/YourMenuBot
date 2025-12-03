// =======================================
// plugins/admin/handler.ts
// 🔥 后台文字输入处理（终极整合版）
// =======================================

import { Router } from "../../core/router";
import { sendMsg } from "../../core/send";

import { Users } from "../../userdb";
import { SubBotDB } from "../../subbotdb";

// 菜单
import { showAdminUsersMenu, showAdminUserDetail } from "./menus/users";
import { showAdminBotsMenu, showAdminBotActions } from "./menus/bots";

import { showAdminSettingsMenu } from "./menus/settings";
import { showAdminAdsMenu } from "./menus/ads";
import { showAdminVipMenu } from "./menus/vip";
import { showAdminWalletMenu } from "./menus/wallet";
import { showAdminSupplyMenu } from "./menus/supply";
import { showAdminBroadcastMenu } from "./menus/broadcast";

export function setupAdminHandler(router: Router) {

  router.text(async (ctx) => {

    const uid = ctx.from.id;
    const user = Users.get(uid);
    if (!user || !user.step) return;

    const step = user.step;
    const text = ctx.message.text;

    // 重置 step 的工具函数
    const clearStep = () => Users.set(uid, { step: null });


    // ======================================================
    // 1️⃣ 搜索用户
    // ======================================================
    if (step === "admin_search_user") {
      const results = Users.search(text);
      clearStep();
      return showAdminUsersMenu(ctx, results);
    }

    // ======================================================
    // 2️⃣ 搜索机器人
    // ======================================================
    if (step === "admin_search_bot") {
      const results = SubBotDB.searchBot(text);
      clearStep();
      return showAdminBotsMenu(ctx, results);
    }

    // ======================================================
    // 3️⃣ 修改用户备注 admin_edit_usernote:<id>
    // ======================================================
    if (step.startsWith("admin_edit_usernote:")) {
      const id = Number(step.split(":")[1]);

      Users.update(id, { note: text });
      await sendMsg(ctx, `✏️ 备注已修改`);

      clearStep();
      return showAdminUserDetail(ctx, id);
    }

    // ======================================================
    // 4️⃣ 修改用户 VIP 天数 admin_edit_vipdays:<id>
    // ======================================================
    if (step.startsWith("admin_edit_vipdays:")) {
      const id = Number(step.split(":")[1]);
      const days = Number(text);

      if (isNaN(days)) {
        return sendMsg(ctx, "❌ 请输入数字");
      }

      const until = Date.now() + days * 86400 * 1000;
      Users.update(id, { vip_until: until });

      await sendMsg(ctx, `💎 VIP 已设置为 ${days} 天`);
      clearStep();
      return showAdminUserDetail(ctx, id);
    }
