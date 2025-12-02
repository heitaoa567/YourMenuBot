// ======================================================================
//             plugins/subbot/menus/broadcast.ts
//      子机器人广播菜单（文本 / 媒体预留）
// ======================================================================

export const broadcastMenu = (id: string) => ({
  inline_keyboard: [
    [{ text: "📝 文本广播", callback_data: `subbot_broadcast_${id}` }],
    [{ text: "🖼 媒体广播（VIP）", callback_data: `subbot_broadcast_media_${id}` }],
    [{ text: "🔙 返回", callback_data: `subbot_menu_${id}` }]
  ]
});
