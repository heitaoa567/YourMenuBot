// plugins/subbot/broadcast/queue.ts

import { kv } from "../../../db/kv.ts";
import { sendBroadcastNow } from "./sender.ts";

export async function pushBroadcast(botId: string, job: any) {
    await kv.set(["subbot_bc", botId, job.id], job);

    // 立即发送（也可以以后改成 Cron）
    sendBroadcastNow(botId, job);
}

export async function listBroadcast(botId: string) {
    const iter = kv.list({ prefix: ["subbot_bc", botId] });
    const arr = [];
    for await (const { value } of iter) arr.push(value);
    return arr;
}
