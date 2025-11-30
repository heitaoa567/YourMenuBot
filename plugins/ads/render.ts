// plugins/ads/render.ts
import { getAds, recordImpression, recordClick } from "../../db/adsdb.ts";
import { isVIP } from "../vip/perms.ts";

export async function renderAd(user: any, position: string) {
    if (isVIP(user)) return null; // VIP 自动无广告

    const ads = await getAds();
    const ad = ads.find(a => a.position === position && a.enabled);

    if (!ad) return null;

    await recordImpression(ad.id);

    let markup = {};
    if (ad.button) {
        markup = {
            inline_keyboard: [
                [{ text: ad.button.text, url: ad.button.url, callback_data: `ads.click.${ad.id}` }]
            ]
        };
    }

    return {
        type: ad.type,
        content: ad.content,
        keyboard: markup
    };
}

