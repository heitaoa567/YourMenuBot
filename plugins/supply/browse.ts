// plugins/supply/browse.ts
import { listSupply } from "../../db/supplydb.ts";

export async function browseSupply(page = 1) {
    const items = await listSupply();
    const pageSize = 5;

    const pageItems = items.slice((page - 1) * pageSize, page * pageSize);

    let txt = "🔍 *供需信息列表*\n\n";

    for (const item of pageItems) {
        txt += `📌 *${item.title}*\n分类：${item.category}\n热度：${item.views} 次\n\n➡️ 点击查看： /view_${item.id}\n\n`;
    }

    return txt;
}

