// =======================================
// plugins/admin/handler.ts
// 后台管理员输入文本处理（与你现有结构完全一致）
// =======================================

import { Router } from "../../core/router";
import { sendMsg } from "../../core/send";
import { Users } from "../../userdb";

import { SubBotDB } from "../../subbotdb";
import { showAdminUsersMenu } from "./menus/users";
import { showAdminBotsMenu } from "./menus/bots";
import { showAdminSettingsMenu } from "./menus/settings";

export function setupAdminHandler(router: Router) {

  router.text(async (ctx) => {
    const uid = ctx.from.id;
    const text = ctx.message.text;

    const user = Users.get(uid);
    if (!user) return;

    const step = user.step;
    if (!step) return; // 管理员未处于输入模式

    // ===============================
    // 1. 搜索用户
    // step: admin_search_user
    // ===============================
    if (step === "admin_search_user") {

      // 模糊搜索用户（可扩展）
      const results = SubBotDB.searchUser(text);

      Users.set(uid, { step: null });

      return showAdminUsersMenu(ctx, results);
    }

    // ===============================
    // 2. 搜索子机器人
    // step: admin_search_bot
    // ===============================
    if (step === "admin_search_bot") {

      const results = SubBotDB.searchBot(text);

      Users.set(uid, { step: null });

      return showAdminBotsMenu(ctx, results);
    }

    // ===============================
    // 3. 设置系统某项配置
    // step: admin_edit_setting:<key>
    // ===============================
    if (step.startsWith("admin_edit_setting:")) {
      const key = step.split(":")[1];

      // 保存设置值
      // ⚠️ 宝贝这里你可以换成你的 settingsDB
      SubBotDB.setSystemSetting(key, text);

      await sendMsg(ctx, `✅ 已更新设置：${key} = ${text}`);

      Users.set(uid, { step: null });

      return showAdminSettingsMenu(ctx);
    }

    // ===============================
    // 4. 修改子机器人备注
    // step: admin_edit_botname:<bot_id>
    // ===============================
    if (step.startsWith("admin_edit_botname:")) {
      const botId = Number(step.split(":")[1]);

      SubBotDB.updateBot(botId, { remark: text });

      await sendMsg(ctx, "✅ 已更新子机器人备注名称");

      Users.set(uid, { step: null });

      return showAdminBotsMenu(ctx);
    }

    // ===============================
    // 5. 修改广告内容
    // step: admin_edit_ads:<slot>
    // ===============================
    if (step.startsWith("admin_edit_ads:")) {
      const slot = step.split(":")[1];

      SubBotDB.updateAd(slot, text);

      await sendMsg(ctx, `📰 广告位 ${slot} 已更新`);

      Users.set(uid, { step: null });

      return; // 你未来可跳到广告菜单
    }

    // ===============================
    // 6. 修改 VIP 天数
    // step: admin_edit_vipdays:<user_id>
    // ===============================
    if (step.startsWith("admin_edit_vipdays:")) {
      const target = Number(step.split(":")[1]);

      const days = Number(text);
      if (isNaN(days)) {
        return sendMsg(ctx, "❌ 请输入数字天数");
      }

      SubBotDB.setVIP(target, days);

      await sendMsg(ctx, `🏷 已为用户 ${target} 设置 VIP ${days} 天`);

      Users.set(uid, { step: null });
    }

  });
}

