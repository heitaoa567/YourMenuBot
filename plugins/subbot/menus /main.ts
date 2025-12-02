// ======================================================================
//             plugins/subbot/menus/main.ts
//      子机器人主菜单（广播 / 按钮管理 / 统计）
// ======================================================================

export function subbotMainMenu(id: string) {
  return {
    inline_keyboard: [
      [{ text: "📡 广播消息", callback_data: `subbot_broadcast_${id}` }],
      [{ text: "🎛 按钮菜单管理", callback_data: `subbot_buttons_${id}` }],
      [{ text: "📊 用户统计", callback_data: `subbot_stats_${id}` }],
      [{ text: "🔙 返回主菜单", callback_data: "back_main" }]
    ]
  };
}

