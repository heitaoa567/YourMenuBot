// =======================================
// plugins/admin/handler.ts
// 后台管理员输入处理（最终整合版）
// =======================================

import { Router } from "../../core/router";
import { sendMsg } from "../../core/send";
import { Users } from "../../userdb";
import { SubBotDB } from "../../subbotdb";

// menus（返回界面）
import { showAdminUsersMenu, showAdminUserDetail } from "./menus/users";
import { showAdminBotsMenu, showAdminBotActions } from "./menus/bots";
import { showAdminSettingsMenu } from "./menus/settings";

export function setupAdminHandler(router: Router) {

  router.text(async (ctx) => {
    const uid = ctx.from.id;
    const text = ctx.message.text;

    const user = Users.get(uid);
    if (!user || !user.step) return;

    const step = user.step;

    // ======================================================
    // 1️⃣ 搜索用户 admin_search_user
    // ======================================================
    if (step === "admin_search_user") {

      const results = Users.search(text); // 按用户名 / ID 模糊搜索

      Users.set(uid, { step: null });

      return showAdminUsersMenu(ctx, results);
    }


    // ======================================================
    // 2️⃣ 搜索子机器人 admin_search_bot
    // ======================================================
    if (step === "admin_search_bot") {

      const results = SubBotDB.searchBot(text);

      Users.set(uid, { step: null });

      return showAdminBotsMenu(ctx, results);
    }


    // ======================================================
    // 3️⃣ 修改用户备注 admin_edit_usernote:<userId>
    // ======================================================
    if (step.startsWith("admin_edit_usernote:")) {

      const userId = Number(step.split(":")[1]);

      Users.update(userId, { note: text });

      await sendMsg(ctx, `✏️ 用户 ${userId} 的备注已更新：${text}`);

      Users.set(uid, { step: null });

      return showAdminUserDetail(ctx, userId);
    }


    // ======================================================
    // 4️⃣ 设置用户 VIP 天数 admin_edit_vipdays:<userId>
    // ======================================================
    if (step.startsWith("admin_edit_vipdays:")) {

      const targetId = Number(step.split(":")[1]);
      const days = Number(text);

      if (isNaN(days) || days < 0) {
        return sendMsg(ctx, "❌ 请输入正确的数字天数");
      }

      const now = Date.now();
      const vipUntil = now + days * 24 * 60 * 60 * 1000;

      Users.update(targetId, { vip_until: vipUntil });

      await sendMsg(ctx, `🏷 已将用户 ${targetId} 设置 VIP ${days} 天`);

      Users.set(uid, { step: null });

      return showAdminUserDetail(ctx, targetId);
    }


    // ======================================================
    // 5️⃣ 设置系统配置 admin_edit_setting:<key>
    // ======================================================
    if (step.startsWith("admin_edit_setting:")) {

      const key = step.split(":")[1];

      // 保存系统设置值
      SubBotDB.setSystemSetting(key, text);

      await sendMsg(ctx, `⚙️ 系统设置已更新：\n${key} = ${text}`);

      Users.set(uid, { step: null });

      return showAdminSettingsMenu(ctx);
    }


    // ======================================================
    // 6️⃣ 修改子机器人备注 admin_edit_botname:<botId>
    // ======================================================
    if (step.startsWith("admin_edit_botname:")) {

      const botId = Number(step.split(":")[1]);

      SubBotDB.updateBot(botId, { remark: text });

      await sendMsg(ctx, `🤖 子机器人备注已更新`);

      Users.set(uid, { step: null });

      return showAdminBotActions(ctx, botId);
    }


    // ======================================================
    // 7️⃣ 广告管理 admin_edit_ads:<slot>
    // ======================================================
    if (step.startsWith("admin_edit_ads:")) {

      const slot = step.split(":")[1];

      SubBotDB.updateAd(slot, text);

      await sendMsg(ctx, `📰 广告位 ${slot} 已更新`);

      Users.set(uid, { step: null });

      return; // 你未来可以跳回广告菜单
    }


    // ======================================================
    // 📌（未来可新增功能在这里继续增加 step）
// ======================================================
  });

}
