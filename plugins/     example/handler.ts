// ========================================
//        Example Plugin - handler.ts
//          处理普通消息
// ========================================

export async function exampleOnMessage(chatId: number, text: string, msg: any) {

  // 示例功能：当用户输入 "test" 或 "example"
  if (text.toLowerCase() === "test" || text.toLowerCase() === "example") {

    await fetch(`https://api.telegram.org/bot${Deno.env.get("BOT_TOKEN")}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "这是来自插件 example 的回复 ✓",
      })
    });

    return "handled"; // 告诉 router 不要继续给其他插件处理
  }

  return "ok";
}

