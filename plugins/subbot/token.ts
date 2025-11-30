// plugins/subbot/token.ts

import { kv } from "../../db/kv.ts";
import { getUserSubBots, saveSubBot } from "./config.ts";

export async function startBind(uid: number) {
    await kv.set(["bind_wait", uid], true);
}

export async function saveToken(uid: number, token: string) {
    if (!token.includes(":")) return "❌ Token 格式错误，请重新发送。\n示例：`123456:ABCDEFxxx`";

    const botId = crypto.randomUUID();

    const sub = {
        id: botId,
        uid,
        token,
        username: "加载中…",
        created: Date.now(),
        expire: Date.now() + 3 * 24 * 3600 * 1000,
        menus: []
    };

    await saveSubBot(sub);

    return "🎉 子机器人成功绑定！\n现在可以进入管理面板使用全部功能。";
}

