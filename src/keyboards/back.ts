// =======================================================
// keyboards/back.ts
// 全局返回按钮键盘
// =======================================================

export function backKeyboard(target: string = "main_menu") {
  return {
    inline_keyboard: [
      [
        { text: "⬅️ 返回", callback_data: target }
      ]
    ]
  };
}
