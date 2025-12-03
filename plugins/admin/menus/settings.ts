// =======================================
// plugins/admin/menus/settings.ts
// 系统设置菜单（与你现有结构完全一致）
// =======================================

import { sendMsg } from "../../../core/send";
import { SubBotDB } from "../../../subbotdb";
import { Users } from "../../../userdb";

export async function showAdminSettingsMenu(ctx: any) {

  // 读取当前系统设置（你未来可以替换为 settingsDB）
  const settings = SubBotDB.getSystemSettings();

  const text =
`⚙️ *系统设置中心*

请选择你要管理的功能：

当前设置（示例）：
• 维护模式：${settings.maintenance ? "🟥 开启" : "🟩 关闭"}
• VIP 默认天数：${settings.default_vip_days || 0}
• 全局公告：${settings.global_notice || "无"}
• 广告开关：${settings.ads_enabled ? "🟩 开启" : "🟥 关闭"}

你可以修改下面这些系统参数👇`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "🛠 设置 VIP 默认天数", callback_data: "admin_setting_vipdays" }
      ],
      [
        { text: settings.maintenance ? "🟩 关闭维护模式" : "🟥 开启维护模式", callback_data: "admin_setting_maintenance" }
      ],
      [
        { text: "📝 编辑全局公告", callback_data: "admin_setting_notice" }
      ],
      [
        { text: settings.ads_enabled ? "🟥 关闭广告" : "🟩 开启广告", callback_data: "admin_setting_ads" }
      ],
      [
        { text: "🔙 返回后台

