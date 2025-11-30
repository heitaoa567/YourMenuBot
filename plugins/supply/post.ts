// plugins/supply/post.ts
import { saveSupply, newSupplyDraft } from "../../db/supplydb.ts";
import { supplyMenu } from "./menu.ts";

export async function handleSupplyText(msg: any, reply: Function) {
    const text = msg.text || "";
    const chatId = msg.from.id;

    // 发布供需流程
    if (text.startsWith("/post")) {
        await newSupplyDraft(chatId);
        return reply(chatId, "📝 请输入供需标题：");
    }

    // 记录标题
    const draft = await newSupplyDraft(chatId, false);
    if (draft && !draft.title) {
        draft.title = text;
        await newSupplyDraft(chatId, draft);
        return reply(chatId, "请输入供需内容（详细描述）：");
    }

    // 记录内容
    if (draft && !draft.content) {
        draft.content = text;
        await newSupplyDraft(chatId, draft);
        return reply(chatId, "请输入联系方式：");
    }

    // 联系方式 + 完成发布
    if (draft && !draft.contact) {
        draft.contact = text;
        draft.created = Date.now();
        draft.views = 0;

        await saveSupply(draft);

        return reply(
            chatId,
            `🎉 发布成功！\n\n标题：${draft.title}\n\n供需信息已上线，可通过推广链接赚收益！`,
            supplyMenu()
        );
    }
}

