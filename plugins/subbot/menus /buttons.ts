// ======================================================================
//             plugins/subbot/menus/buttons.ts
//             子机器人按钮菜单管理（可编辑）
// ======================================================================

export function subbotButtonsMenu(id: string, buttons: any[]) {
  return {
    inline_keyboard: [
      ...buttons.map((row, i) => [
        { text: row.text, callback_data: `subbot_button_edit_${id}_${i}` }
      ]),

      [{ text: "➕ 添加按钮", callback_data: `subbot_button_add_${id}` }],
      [{ text: "🔙 返回", callback_data: `subbot_menu_${id}` }]
    ]
  };
}
