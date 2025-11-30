// plugins/supply/index.ts
import type { BotPlugin } from "../../types.ts";
import { supplyMenu } from "./menu.ts";
import { handleSupplyCallback } from "./callback.ts";
import { handleSupplyText } from "./post.ts";

export const supplyPlugin: BotPlugin = {
    name: "supply",
    description: "供需市场系统",
    menu: supplyMenu,
    callbacks: handleSupplyCallback,
    commands: handleSupplyText
};

