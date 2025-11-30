// plugins/subbot/broadcast/sender.ts

import { kv } from "../../../db/kv.ts";
import { getUsersOfSubbot } from "../config.ts";

// 发送广播（文本版）
export async function sendBroadcastNow(botId: string, job: any) {
    const users = await getUsersOfSubbot(botId);

    let sent = 0;
    let failed = 0;

    for (const uid of users) {
        try {
            await sendSubBotMessage(botId, uid, job.text);
            sent++;
        } catch (_) {
            failed++;
        }

        await new Promise(r => setTimeout(r, 50)); // 防止 Telegram 429
    }

    // 更新结果
    job.status = "done";
    job.sent = sent;
    job.failed = failed;

    await kv.set(["subbot_bc", botId, job.id], job);
}

// 调用子机器人 API
async function sendSubBotMessage(botId: string, userId: number, text: string) {
    const sub = await kv.get(["subbots", botId]).then(r => r.value);
    if (!sub) throw new Error("Subbot not found");

    const url = `https://api.telegram.org/bot${sub.token}/sendMessage`;

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: userId, text })
    });
}
