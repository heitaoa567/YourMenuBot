// plugins/vip/index.ts
import type { BotPlugin } from "../../types.ts";
import { vipMenu } from "./menu.ts";
import { handleVIPCallback } from "./callback.ts";
import { handleVIPCommand } from "./handler.ts";

export const vipPlugin: BotPlugin = {
    name: "vip",
    description: "VIP Subscription System",

    menu: vipMenu,
    callbacks: handleVIPCallback,
    commands: handleVIPCommand
};
