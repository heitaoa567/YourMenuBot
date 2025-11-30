// ========================================
//        Example Plugin - callback.ts
//         处理按钮回调事件
// ========================================

export async function exampleOnCallback(chatId: number, data: string, cq: any) {

  if (data === "example_btn1") {
    await sendText(chatId, "你点击了按钮 1 ✓");
    return "handled";
  }

  if (data === "example_btn2") {
    await sendText(chatId, "你点击了按钮 2 ✓");
    return "handled";
  }

  return "ok";
}

// 通用发送函数（仅供本插件使用）
async function sendText(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${Deno.env.get("BOT_TOKEN")}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

