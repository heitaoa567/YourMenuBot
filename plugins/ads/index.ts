// plugins/ads/index.ts
import type { BotPlugin } from "../../types.ts";
import { adsMenu } from "./menu.ts";
import { handleAdsCallback } from "./callback.ts";
import { renderAd } from "./render.ts";

export const adsPlugin: BotPlugin = {
    name: "ads",
    description: "广告中心（可关闭/开启）",

    menu: adsMenu,
    callbacks: handleAdsCallback,
    renderAd
};

