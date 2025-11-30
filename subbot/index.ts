// plugins/subbot/index.ts
import type { BotPlugin } from "../../types.ts";
import { subMenu } from "./menu.ts";
import { handleSubCallback } from "./callback.ts";
import { handleSubMessage } from "./handler.ts";

export const subbotPlugin: BotPlugin = {
    name: "subbot",
    description: "子机器人系统（绑定 / 广播 / 按钮管理）",
    menu: subMenu,
    callbacks: handleSubCallback,
    commands: handleSubMessage
};

