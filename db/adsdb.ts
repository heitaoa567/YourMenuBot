// db/adsdb.ts
import { kv } from "./kv.ts";
import type { AdItem } from "../plugins/ads/types.ts";

export async function getAds(): Promise<AdItem[]> {
    const iter = kv.list({ prefix: ["ads"] });
    const res: AdItem[] = [];
    for await (const { value } of iter) res.push(value);
    return res;
}

export async function saveAd(ad: AdItem) {
    await kv.set(["ads", ad.id], ad);
}

export async function toggleAd(id: string) {
    const ad = await kv.get(["ads", id]).then(r => r.value);
    if (!ad) return;
    ad.enabled = !ad.enabled;
    await saveAd(ad);
}

export async function recordImpression(id: string) {
    const ad = await kv.get(["ads", id]).then(r => r.value);
    if (!ad) return;
    ad.impressions++;
    await saveAd(ad);
}

export async function recordClick(id: string) {
    const ad = await kv.get(["ads", id]).then(r => r.value);
    if (!ad) return;
    ad.clicks++;
    await saveAd(ad);
}
