// ======================================================================
//             plugins/subbot/menus/stats.ts
//                      子机器人统计菜单
// ======================================================================

export function subbotStatsMenu(id: string) {
  return {
    inline_keyboard: [
      [{ text: "📊 刷新统计", callback_data: `subbot_stats_${id}` }],
      [{ text: "🔙 返回", callback_data: `subbot_menu_${id}` }]
    ]
  };
}
