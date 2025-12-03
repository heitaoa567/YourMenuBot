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

    // ======================================================
    // 5️⃣ 设置系统参数 admin_edit_setting:<key>
    // ======================================================
    if (step.startsWith("admin_edit_setting:")) {
      const key = step.split(":")[1];

      SubBotDB.setSystemSetting(key, text);

      await sendMsg(ctx, `⚙️ 已更新：${key} = ${text}`);
      clearStep();
      return showAdminSettingsMenu(ctx);
    }

    // ======================================================
    // 6️⃣ 广告内容编辑 admin_edit_ads:<slot>
    // ======================================================
    if (step.startsWith("admin_edit_ads:")) {
      const slot = step.split(":")[1];

      SubBotDB.updateAd(slot, { text });

      await sendMsg(ctx, `📰 广告位 ${slot} 已更新`);
      clearStep();
      return showAdminAdsMenu(ctx);
    }

    // 添加广告位
    if (step === "admin_ads_addslot") {
      const slot = text.trim();

      SubBotDB.createAd(slot);
      await sendMsg(ctx, `➕ 已添加广告位：${slot}`);

      clearStep();
      return showAdminAdsMenu(ctx);
    }

    // ======================================================
    // 7️⃣ 修改子机器人备注 admin_edit_botname:<id>
    // ======================================================
    if (step.startsWith("admin_edit_botname:")) {
      const id = Number(step.split(":")[1]);

      SubBotDB.updateBot(id, { remark: text });

      await sendMsg(ctx, `🤖 子机器人备注已更新`);
      clearStep();
      return showAdminBotActions(ctx, id);
    }

    // ======================================================
    // 8️⃣ VIP 系统设置
    // ======================================================

    if (step === "admin_vip_edit_days") {
      const days = Number(text);

      if (isNaN(days)) return sendMsg(ctx, "❌ 请输入数字");

      SubBotDB.setVipSettings({ default_days: days });
      await sendMsg(ctx, `💎 默认 VIP 天数已更新`);
      clearStep();
      return showAdminVipMenu(ctx);
    }

    if (step === "admin_vip_edit_price") {
      const price = Number(text);
      if (isNaN(price)) return sendMsg(ctx, "❌ 请输入数字");

      SubBotDB.setVipSettings({ price_month: price });
      await sendMsg(ctx, `💰 月费价格已更新`);
      clearStep();
      return showAdminVipMenu(ctx);
    }

    // ======================================================
    // 9️⃣ 钱包设置
    // ======================================================

    if (step === "admin_wallet_mindep") {
      const value = Number(text);
      if (isNaN(value)) return sendMsg(ctx, "❌ 请输入数字");

      SubBotDB.setWalletSettings({ min_deposit: value });
      await sendMsg(ctx, `💰 最低充值已更新`);
      clearStep();
      return showAdminWalletMenu(ctx);
    }

    if (step === "admin_wallet_minwd") {
      const value = Number(text);
      if (isNaN(value)) return sendMsg(ctx, "❌ 请输入数字");

      SubBotDB.setWalletSettings({ min_withdraw: value });
      await sendMsg(ctx, `💸 最低提现已更新`);
      clearStep();
      return showAdminWalletMenu(ctx);
    }

    if (step === "admin_wallet_fee_dep") {
      const value = Number(text);
      if (isNaN(value)) return sendMsg(ctx, "❌ 请输入数字");

      SubBotDB.setWalletSettings({ deposit_fee: value });
      await sendMsg(ctx, `💰 充值手续费已更新`);
      clearStep();
      return showAdminWalletMenu(ctx);
    }

    if (step === "admin_wallet_fee_wd") {
      const value = Number(text);
      if (isNaN(value)) return sendMsg(ctx, "❌ 请输入数字");

      SubBotDB.setWalletSettings({ withdraw_fee: value });
      await sendMsg(ctx, `💸 提现手续费已更新`);
      clearStep();
      return showAdminWalletMenu(ctx);
    }

    // ======================================================
    // 🔟 供需系统
    // ======================================================

    if (step === "admin_supply_edit_max") {
      const value = Number(text);
      if (isNaN(value)) return sendMsg(ctx, "❌ 请输入数字");

      SubBotDB.setSupplySettings({ max_posts: value });
      await sendMsg(ctx, `📦 每日发布上限已更新`);
      clearStep();
      return showAdminSupplyMenu(ctx);
    }


    // ======================================================
    // 1️⃣1️⃣ 全局广播系统
    // ======================================================

    if (step === "admin_broadcast_text") {
      await SubBotDB.broadcastToAllUsers({ type: "text", content: text });
      await sendMsg(ctx, "📣 广播已发送！");
      clearStep();
      return showAdminBroadcastMenu(ctx);
    }

    // 图片广播
    if (step === "admin_broadcast_photo") {
      if (!ctx.message.photo) {
        return sendMsg(ctx, "❌ 请发送图片文件");
      }

      const fileId = ctx.message.photo.pop().file_id;
      await SubBotDB.broadcastToAllUsers({ type: "photo", fileId });

      await sendMsg(ctx, "🖼 图片广播已发送！");
      clearStep();
      return showAdminBroadcastMenu(ctx);
    }

    // 视频广播
    if (step === "admin_broadcast_video") {
      if (!ctx.message.video) {
        return sendMsg(ctx, "❌ 请发送视频文件");
      }

      const fileId = ctx.message.video.file_id;
      await SubBotDB.broadcastToAllUsers({ type: "video", fileId });

      await sendMsg(ctx, "🎬 视频广播已发送！");
      clearStep();
      return showAdminBroadcastMenu(ctx);
    }

    // 文本 + 按钮广播
    if (step === "admin_broadcast_button") {
      try {
        const btnData = JSON.parse(text);
        await SubBotDB.broadcastToAllUsers({
          type: "button",
          content: btnData.text,
          buttons: btnData.buttons,
        });

        await sendMsg(ctx, "🔗 按钮广播已发送！");
      } catch (err) {
        return sendMsg(ctx, "❌ JSON 格式错误，请重新输入");
      }

      clearStep();
      return showAdminBroadcastMenu(ctx);
    }


    // ======================================================
    // 👇 如果有未匹配的 step
    // ======================================================
    await sendMsg(ctx, "⚠️ 输入未被处理，请返回后台菜单重试");
    clearStep();
  });

}
