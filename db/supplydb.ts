// db/supplydb.ts
import type { SupplyItem } from "../plugins/supply/types.ts";
import { kv } from "./kv.ts";

export async function saveSupply(item: SupplyItem) {
    await kv.set(["supply", item.id], item);
}

export async function listSupply(): Promise<SupplyItem[]> {
    const iter = kv.list({ prefix: ["supply"] });
    const arr: SupplyItem[] = [];
    for await (const { value } of iter) arr.push(value);
    return arr.sort((a, b) => b.created - a.created);
}

export async function newSupplyDraft(uid: number, init = true) {
    const key = ["supply_draft", uid];
    if (init === false) return await kv.get(key).then(r => r.value);

    const draft = {
        id: crypto.randomUUID(),
        uid,
        type: "supply",
        title: "",
        content: "",
        contact: "",
        category: "通用",
        created: 0,
        views: 0,
        ref_link: `https://t.me/YourMenuBot?start=supply_${uid}`,
        vip_boost: false
    };

    await kv.set(key, draft);
    return draft;
}

