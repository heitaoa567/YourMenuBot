// plugins/subbot/callback.ts
import { kv } from "../../db/kv.ts";
import { startBind } from "./token.ts";
import { subMenu } from "./menu.ts";

export async function handleSubCallback(update: any, reply: Function) {
    const data = update.callback_query.data;
    const chatId = update.callback_query.from.id;

    // 绑定子机器人
    if (data === "sub.bind") {
        await startBind(chatId);
        return reply(chatId, "🔑 请发送你的子机器人 Token：");
    }

    // 查看列表
    if (data === "sub.list") {
        const iter = kv.list({ prefix: ["subbots"] });
        let txt = "🤖 *我的子机器人列表*\n\n";

        for await (const { value } of iter) {
            if (value.uid !== chatId) continue;
            txt += `ID: ${value.id}\n用户名: ${value.username}\n到期: ${new Date(value.expire).toLocaleString()}\n\n`;
        }

        return reply(chatId, txt, subMenu());
    }

    // 子机器人广播
    if (data === "sub.broadcast") {
        return reply(chatId, "📢 请输入要广播的内容：");
    }

    // 九宫格管理
    if (data === "sub.menus") {
        return reply(chatId, "🧩 九宫格功能开发中…");
    }
}

