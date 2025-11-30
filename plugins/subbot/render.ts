// plugins/subbot/menus/render.ts

import type { SubButton } from "./types.ts";

export function renderSubMenu(buttons: SubButton[]) {
    const rows = [];
    let line = [];

    for (let i = 0; i < buttons.length; i++) {
        line.push(buttons[i]);

        // 每 3 个换一行
        if (line.length === 3) {
            rows.push([...line.map(btn => convert(btn))]);
            line = [];
        }
    }

    if (line.length > 0) {
        rows.push([...line.map(btn => convert(btn))]);
    }

    return {
        inline_keyboard: rows
    };
}

function convert(btn: SubButton) {
    if (btn.type === "url") return { text: btn.text, url: btn.url };
    if (btn.type === "callback") return { text: btn.text, callback_data: btn.callback };
}

