// ==================================================================
//                    plugins/subbot/menus/stats.ts
//                     子机器人数据统计展示
// ==================================================================

import { getUser } from "../../../db/userdb.ts";
import { getSubBot } from "../../../db/subbotdb.ts";
import { sendText } from "../../../core/send.ts";
import { T } from "../../lang/index.ts";
import { getPermissions } from "../../../core/permissions.ts";


// ==================================================================
//                      显示子机器人统计页
// ==================================================================
export async function showSubBotStats(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";
  const perm = getPermissions(user);

  const sub = await getSubBot(uid);

  if (!sub || !sub.token) {
    await sendText(uid, T(lang, "subbot_no_token"));
    return;
  }

  // 初始化避免报错
  sub.stats = sub.stats || {
    total_users: 0,
    messages_today: 0,
    messages_total: 0,
    new_today: 0,
    new_week: 0,
    button_clicks: {}
  };

  const s = sub.stats;

  // =============================
  //    基础统计（所有用户可见）
  // =============================
  const lines = [];

  lines.push(`📊 <b>${T(lang, "subbot_stats_title")}</b>\n`);

  lines.push(`👥 <b>${T(lang, "subbot_stats_total_users")}:</b> ${s.total_users}`);
  lines.push(`📈 <b>${T(lang, "subbot_stats_new_today")}:</b> ${s.new_today}`);
  lines.push(`📆 <b>${T(lang, "subbot_stats_new_week")}:</b> ${s.new_week}`);

  lines.push("");
  lines.push(`💬 <b>${T(lang, "subbot_stats_msg_today")}:</b> ${s.messages_today}`);
  lines.push(`💬 <b>${T(lang, "subbot_stats_msg_total")}:</b> ${s.messages_total}`);
  lines.push("");

  // ===================================================
  //      VIP 扩展统计（按钮点击次数）
  // ===================================================
  if (perm.isVIP) {
    lines.push(`🎛 <b>${T(lang, "subbot_stats_button_clicks")}</b>`);

    const clicks = s.button_clicks || {};

    if (Object.keys(clicks).length === 0) {
      lines.push(`（No button clicks yet）`);
    } else {
      for (const key in clicks) {
        lines.push(`• ${key}: <b>${clicks[key]}</b>`);
      }
    }
  } else {
    lines.push(`🔒 <i>${T(lang, "subbot_stats_vip_only")}</i>`);
  }

  const keyboard = {
    inline_keyboard: [
      [{ text: T(lang, "back"), callback_data: "subbot_menu" }]
    ]
  };

  await sendText(uid, lines.join("\n"), keyboard);
}

