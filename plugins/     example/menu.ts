// ========================================
//         Example Plugin - menu.ts
//      插件主菜单（按钮）
// ========================================

export function exampleMenu(chatId: number) {
  return {
    inline_keyboard: [
      [{ text: "🧪 示例按钮 1", callback_data: "example_btn1" }],
      [{ text: "📌 示例按钮 2", callback_data: "example_btn2" }]
    ]
  };
}

