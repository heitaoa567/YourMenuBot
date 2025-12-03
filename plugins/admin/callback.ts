// =======================================
// plugins/admin/callback.ts
// 🔥 后台按钮事件总路由（终极整合版）
// =======================================

import { Router } from "../../core/router";
import { sendMsg } from "../../core/send";
import { Users } from "../../userdb";
import { SubBotDB } from "../../subbotdb";

// ===== 后台菜单 =====
import { showAdminMainMenu } from "./menus/index";
import { showAdminStatsMenu } from "./menus/stats";

import { showAdminBotsMenu, showAdminBotActions } from "./menus/bots";
import { showAdminUsersMenu, showAdminUserDetail } from "./menus/users";

import { showAdminSettingsMenu } from "./menus/settings";
import { showAdminAdsMenu, showAdminAdsDetail } from "./menus/ads";

import { showAdminVipMenu } from "./menus/vip";
import { showAdminWalletMenu } from "./menus/wallet";
import { showAdminSupplyMenu } from "./menus/supply";
import { showAdminBroadcastMenu } from "./menus/broadcast";

// =======================================
// 后台权限白名单（⚠️ 宝贝一定要换成你自己的）
// =======================================
const ADMIN_IDS = [123456789]; // 你的 Telegram UID


export function setupAdminCallbacks(router: Router) {


  // ======================================================
  // 🔐 后台统一权限校验（所有 admin_ 回调都经过这里）
  // ======================================================
  router.callbackRegex(/^admin_/, async (ctx) => {
    const uid = ctx.from.id;
    if (!ADMIN_IDS.includes(uid)) {
      return ctx.answerCbQuery("❌ 你没有后台权限");
    }
  });


  // ======================================================
  // 1️⃣ 后台主菜单
  // ======================================================
  router.callback("admin_main", async (ctx) => {
    await showAdminMainMenu(ctx);
  });


  // ======================================================
  // 2️⃣ 数据统计
  // ======================================================
  router.callback("admin_stats", async (ctx) => {
    await showAdminStatsMenu(ctx);
  });


  // ======================================================
  // 3️⃣ 子机器人管理
  // ======================================================
  router.callback("admin_subbots", async (ctx) => {
    await showAdminBotsMenu(ctx);
  });

  // 进入某个子机器人 admin_bot_<id>
  router.callbackRegex(/^admin_bot_(\d+)$/, async (ctx, match) => {
    const botId = Number(match[1]);
    await showAdminBotActions(ctx, botId);
  });

  // 修改子机器人备注 admin_edit_botname_<id>
  router.callbackRegex(/^admin_edit_botname_(\d+)$/, async (ctx, match) => {
    const botId = Number(match[1]);
    Users.set(ctx.from.id, { step: `admin_edit_botname:${botId}` });
    await sendMsg(ctx, "✏️ 请输入新的机器人备注名称：");
  });


  // ======================================================
  // 4️⃣ 用户管理
  // ======================================================
  router.callback("admin_users", async (ctx) => {
    await showAdminUsersMenu(ctx);
  });

  // 用户详情 admin_user_<id>
  router.callbackRegex(/^admin_user_(\d+)$/, async (ctx, match) => {
    const userId = Number(match[1]);
    await showAdminUserDetail(ctx, userId);
  });

  // 编辑用户备注
  router.callbackRegex(/^admin_edit_usernote_(\d+)$/, async (ctx, match) => {
    const id = Number(match[1]);
    Users.set(ctx.from.id, { step: `admin_edit_usernote:${id}` });
    await sendMsg(ctx, "✏️ 请输入新的用户备注：");
  });

  // 编辑用户 VIP 天数
  router.callbackRegex(/^admin_edit_vip_(\d+)$/, async (ctx, match) => {
    const id = Number(match[1]);
    Users.set(ctx.from.id, { step: `admin_edit_vipdays:${id}` });
    await sendMsg(ctx, "🏷 输入 VIP 天数：");
  });

  // 删除用户
  router.callbackRegex(/^admin_delete_user_(\d+)$/, async (ctx, match) => {
    const id = Number(match[1]);
    Users.remove(id);
    await sendMsg(ctx, `🗑 已删除用户 ${id}`);
    await showAdminUsersMenu(ctx);
  });

  // 搜索用户
  router.callback("admin_search_user", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_search_user" });
    await sendMsg(ctx, "🔍 输入用户 ID / 昵称关键词：");
  });

  // 搜索子机器人
  router.callback("admin_search_bot", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_search_bot" });
    await sendMsg(ctx, "🔍 输入子机器人名称关键词：");
  });


  // ======================================================
  // 5️⃣ 系统设置 admin_settings
  // ======================================================
  router.callback("admin_settings", async (ctx) => {
    await showAdminSettingsMenu(ctx);
  });

  router.callback("admin_setting_vipdays", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_edit_setting:default_vip_days" });
    await sendMsg(ctx, "🏷 输入新的默认 VIP 天数：");
  });

  router.callback("admin_setting_notice", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_edit_setting:global_notice" });
    await sendMsg(ctx, "📝 输入新的公告内容：");
  });

  router.callback("admin_setting_maintenance", async (ctx) => {
    const s = SubBotDB.getSystemSettings();
    SubBotDB.setSystemSetting("maintenance", !s.maintenance);
    await sendMsg(ctx, `⚙️ 维护模式已${!s.maintenance ? "开启" : "关闭"}`);
    await showAdminSettingsMenu(ctx);
  });

  router.callback("admin_setting_ads", async (ctx) => {
    const s = SubBotDB.getSystemSettings();
    SubBotDB.setSystemSetting("ads_enabled", !s.ads_enabled);
    await sendMsg(ctx, `📰 广告系统已${!s.ads_enabled ? "开启" : "关闭"}`);
    await showAdminSettingsMenu(ctx);
  });


  // ======================================================
  // 6️⃣ 广告系统 admin_ads
  // ======================================================
  router.callback("admin_ads", async (ctx) => {
    await showAdminAdsMenu(ctx);
  });

  router.callbackRegex(/^admin_ads_detail_(.+)$/, async (ctx, match) => {
    await showAdminAdsDetail(ctx, match[1]);
  });

  router.callbackRegex(/^admin_ads_edit_(.+)$/, async (ctx, match) => {
    Users.set(ctx.from.id, { step: `admin_edit_ads:${match[1]}` });
    await sendMsg(ctx, "📝 输入新的广告内容：");
  });

  router.callbackRegex(/^admin_ads_delete_(.+)$/, async (ctx, match) => {
    SubBotDB.deleteAd(match[1]);
    await sendMsg(ctx, `🗑 已删除广告位 ${match[1]}`);
    await showAdminAdsMenu(ctx);
  });

  router.callbackRegex(/^admin_ads_toggle_(.+)$/, async (ctx, match) => {
    const slot = match[1];
    const a = SubBotDB.getAd(slot);
    SubBotDB.updateAd(slot, { enabled: !a.enabled });
    await showAdminAdsDetail(ctx, slot);
  });

  router.callback("admin_ads_add", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_ads_addslot" });
    await sendMsg(ctx, "➕ 输入新广告位 ID（如 banner_1）：");
  });


  // ======================================================
  // 7️⃣ VIP 系统 admin_vip
  // ======================================================
  router.callback("admin_vip", async (ctx) => {
    await showAdminVipMenu(ctx);
  });

  router.callback("admin_vip_edit_days", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_vip_edit_days" });
    await sendMsg(ctx, "💎 输入默认 VIP 天数：");
  });

  router.callback("admin_vip_edit_price", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_vip_edit_price" });
    await sendMsg(ctx, "💰 输入 VIP 月费价格：");
  });

  router.callback("admin_vip_toggle_renew", async (ctx) => {
    const s = SubBotDB.getVipSettings();
    SubBotDB.setVipSettings({ auto_renew: !s.auto_renew });
    await showAdminVipMenu(ctx);
  });


  // ======================================================
  // 8️⃣ 钱包后台 admin_wallet
  // ======================================================
  router.callback("admin_wallet", async (ctx) => {
    await showAdminWalletMenu(ctx);
  });

  router.callback("admin_wallet_edit_mindep", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_wallet_mindep" });
    await sendMsg(ctx, "💰 输入最低充值金额：");
  });

  router.callback("admin_wallet_edit_minwd", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_wallet_minwd" });
    await sendMsg(ctx, "💸 输入最低提现金额：");
  });

  router.callback("admin_wallet_fee_dep", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_wallet_fee_dep" });
    await sendMsg(ctx, "💰 输入充值手续费（%）：");
  });

  router.callback("admin_wallet_fee_wd", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_wallet_fee_wd" });
    await sendMsg(ctx, "💸 输入提现手续费（%）：");
  });


  // ======================================================
  // 9️⃣ 供需系统 admin_supply
  // ======================================================
  router.callback("admin_supply", async (ctx) => {
    await showAdminSupplyMenu(ctx);
  });

  router.callback("admin_supply_edit_max", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_supply_edit_max" });
    await sendMsg(ctx, "📦 输入最大发布次数（每日）：");
  });

  router.callback("admin_supply_toggle_check", async (ctx) => {
    const s = SubBotDB.getSupplySettings();
    SubBotDB.setSupplySettings({ auto_check: !s.auto_check });
    await showAdminSupplyMenu(ctx);
  });


  // ======================================================
  // 🔟 全局广播 admin_broadcast
  // ======================================================
  router.callback("admin_broadcast", async (ctx) => {
    await showAdminBroadcastMenu(ctx);
  });

  router.callback("admin_broadcast_text", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_broadcast_text" });
    await sendMsg(ctx, "📝 输入广播文本内容：");
  });

  router.callback("admin_broadcast_photo", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_broadcast_photo" });
    await sendMsg(ctx, "🖼 请发送要广播的图片：");
  });

  router.callback("admin_broadcast_video", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_broadcast_video" });
    await sendMsg(ctx, "🎬 请发送视频文件：");
  });

  router.callback("admin_broadcast_button", async (ctx) => {
    Users.set(ctx.from.id, { step: "admin_broadcast_button" });
    await sendMsg(ctx, "🔗 请发送 广播文本+按钮JSON：");
  });


  // ======================================================
// 🧾 钱包系统子菜单（余额 / 充值 / 提现 / 账单）
// ======================================================

// 📊 用户余额总览
router.callback("admin_wallet_balance", async (ctx) => {
  await ctx.reply("📊 查询用户余额中…（对接 wallet/balance.ts）");
});

// 📥 充值记录
router.callback("admin_wallet_deposit", async (ctx) => {
  await ctx.reply("📥 查询充值记录中…（对接 wallet/deposit.ts）");
});

// 📤 提现记录
router.callback("admin_wallet_withdraw", async (ctx) => {
  await ctx.reply("📤 查询提现记录中…（对接 wallet/withdraw.ts）");
});

// 📑 钱包账单流水
router.callback("admin_wallet_ledger", async (ctx) => {
  await ctx.reply("📑 查询账单流水…（对接 wallet/ledger.ts）");
});


  // ======================================================
// 🧾 钱包后台 - 数据查询子菜单
// ======================================================

// 余额总览（对接 plugins/wallet/balance.ts）
router.callback("admin_wallet_balance", async (ctx) => {
  await ctx.reply("📊 正在查询用户余额...\n（请在这里对接 wallet/balance.ts）");
});

// 充值记录（对接 plugins/wallet/deposit.ts）
router.callback("admin_wallet_deposit", async (ctx) => {
  await ctx.reply("📥 正在查询充值记录...\n（请在这里对接 wallet/deposit.ts）");
});

// 提现记录（对接 plugins/wallet/withdraw.ts）
router.callback("admin_wallet_withdraw", async (ctx) => {
  await ctx.reply("📤 正在查询提现记录...\n（请在这里对接 wallet/withdraw.ts）");
});

// 账单流水（对接 plugins/wallet/ledger.ts）
router.callback("admin_wallet_ledger", async (ctx) => {
  await ctx.reply("📑 正在查询钱包账单流水...\n（请在这里对接 wallet/ledger.ts）");
});

// 返回后台主菜单
router.callback("admin_back", async (ctx) => {
  await showAdminMainMenu(ctx);
});

}
