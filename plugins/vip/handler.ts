// plugins/vip/handler.ts
import { vipMenu } from "./menu.ts";
import { getUser } from "../../db/userdb.ts";
import { isVIP } from "./perms.ts";

export async function handleVIPCommand(msg: any, reply: Function) {
    if (!msg.text) return;
    if (!msg.text.startsWith("/vip")) return;

    const chatId = msg.from.id;
    const user = await getUser(chatId);

    const status = isVIP(user)
        ? `✅ 已开通 VIP\n到期时间：${new Date(user.vip_until).toLocaleString()}`
        : "❌ 未开通 VIP";

    return reply(chatId,
        `💎 *VIP 状态*\n\n${status}\n\n请选择套餐：`,
        vipMenu(user.lang)
    );
}

