// ===================================================================
//                 plugins/subbot/menus/index.ts
//               子机器人主菜单（广播 / 按钮管理）
// ===================================================================

export function subbotMainMenu(lang = "en") {
  return {
    inline_keyboard: [
      [
        { text: "📢 Broadcast", callback_data: "sub_broadcast_menu" }
      ],
      [
        { text: "🎛 Buttons", callback_data: "sub_buttons_menu" }
      ],
      [
        { text: "📊 Stats", callback_data: "sub_stats" }
      ],
    ]
  };
}


// ===================================================================
//                     广播菜单
// ===================================================================
export function subbotBroadcastMenu() {
  return {
    inline_keyboard: [
      [
        { text: "📝 Text Broadcast", callback_data: "sub_broadcast_text" }
      ],
      [
        { text: "🖼 Photo Broadcast", callback_data: "sub_broadcast_photo" }
      ],
      [
        { text: "🎥 Video Broadcast", callback_data: "sub_broadcast_video" }
      ],
      [
        { text: "📄 File Broadcast", callback_data: "sub_broadcast_file" }
      ],
      [
        { text: "⬅️ Back", callback_data: "sub_main_menu" }
      ]
    ]
  };
}
