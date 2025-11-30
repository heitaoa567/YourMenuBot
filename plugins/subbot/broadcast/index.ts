// plugins/subbot/broadcast/index.ts

import { pushBroadcast } from "./queue.ts";
import { checkSubbotVipLimit } from "./limits.ts";

export async function startBroadcast(chatId: number, botId: string, text: string) {
    // 检查是否有权限广播
    const can = await checkSubbotVipLimit(chatId);
    if (!can.ok) return can.msg;

    await pushBroadcast(botId, {
        id: crypto.randomUUID(),
        text,
        type: "text",
        created: Date.now(),
        from_uid: chatId,
        status: "pending"
    });

    return "📢 广播已加入队列，正在发送中…";
}
