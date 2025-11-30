// plugins/ads/callback.ts
import { getAds, toggleAd } from "../../db/adsdb.ts";
import { adsMenu } from "./menu.ts";

export async function handleAdsCallback(update: any, reply: Function) {
    const data = update.callback_query.data;
    const chatId = update.callback_query.from.id;

    // 查看广告列表
    if (data === "ads.list") {
        const ads = await getAds();

        let text = "📢 *广告位列表*\n\n";
        for (const ad of ads) {
            text += `ID: ${ad.id}\n类型: ${ad.type}\n状态: ${ad.enabled ? "🟢 开启" : "🔴 关闭"}\n位置: ${ad.position}\n点击: ${ad.clicks}\n展示: ${ad.impressions}\n\n`;
        }

        return reply(chatId, text, adsMenu());
    }

    // 切换广告开关
    if (data.startsWith("ads.toggle.")) {
        const id = data.replace("ads.toggle.", "");
        await toggleAd(id);
        return reply(chatId, "🔄 已切换该广告状态", adsMenu());
    }
}

