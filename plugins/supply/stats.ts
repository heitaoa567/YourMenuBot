// plugins/supply/stats.ts
import { listSupply } from "../../db/supplydb.ts";

export async function mySupplyList(uid: number) {
    const items = await listSupply();
    const mine = items.filter(i => i.uid === uid);

    if (mine.length === 0)
        return "你还没有发布任何供需信息。";

    let txt = "📊 *我的发布*\n\n";
    for (const i of mine) {
        txt += `📌 *${i.title}*\n点击：${i.views} 次\n创建：${new Date(i.created).toLocaleString()}\n\n`;
    }

    return txt;
}

