// plugins/subbot/broadcast/limits.ts

import { kv } from "../../../db/kv.ts";
import { isVIP } from "../../vip/perms.ts";

export async function checkSubbotVipLimit(uid: number) {
    const user = await kv.get(["users", uid]).then(r => r.value);

    if (isVIP(user)) {
        return { ok: true, msg: "VIP 用户允许无限广播" };
    }

    // 普通用户 → 限制每天 1 次
    const key = ["subbot_bc_limit", uid];
    const last = await kv.get(key).then(r => r.value);

    if (last && Date.now() - last < 24 * 3600 * 1000) {
        return { ok: false, msg: "❌ 今日广播次数已用完（开通 VIP 无限使用）" };
    }

    await kv.set(key, Date.now());
    return { ok: true, msg: "普通用户今日可广播 1 次" };
}

