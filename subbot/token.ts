// plugins/subbot/token.ts
import { kv } from "../../db/kv.ts";
import type { SubBot } from "./types.ts";

export async function startBind(chatId: number) {
    await kv.set(["bind_wait", chatId], true);
}

export async function saveToken(chatId: number, token: string): Promise<string> {
    const waiting = await kv.get(["bind_wait", chatId]).then(r => r.value);
    if (!waiting) return "❌ 当前不需要绑定 Token";

    // 检查是否是合法 Token
    if (!token.includes(":")) return "❌ Token 格式不正确，请重新发送";

    const botId = crypto.randomUUID();

    const subbot: SubBot = {
        id: botId,
        uid: chatId,
        token,
        username: "loading...",
        created: Date.now(),
        expire: Date.now() + 3 * 24 * 3600 * 1000, // 3 天试用
        menus: []
    };

    await kv.set(["subbots", botId], subbot);
    await kv.delete(["bind_wait", chatId]);

    return "✅ 子机器人已绑定成功！可进入管理界面设置九宫格菜单与功能。";
}

