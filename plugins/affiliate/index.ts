// plugins/affiliate/index.ts
import type { BotPlugin } from "../../types.ts";
import { affiliateMenu } from "./menu.ts";
import { handleAffiliateCallback } from "./callback.ts";
import { handleAffiliateText } from "./handler.ts";

export const affiliatePlugin: BotPlugin = {
    name: "affiliate",
    description: "Multi-level Affiliate System",
    menu: affiliateMenu,
    callbacks: handleAffiliateCallback,
    commands: handleAffiliateText
};

