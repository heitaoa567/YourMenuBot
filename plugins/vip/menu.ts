// plugins/vip/menu.ts
import { VIP_PLANS } from "./plans.ts";

export function vipMenu(lang = "zh") {
    const buttons = Object.keys(VIP_PLANS).map(k => {
        const p = VIP_PLANS[k];
        return [{ text: `${p.icon} ${p.name}（${p.price}U）`, callback_data: `vip.buy.${k}` }];
    });

    buttons.push([{ text: "⬅ 返回菜单", callback_data: "menu.back" }]);

    return {
        inline_keyboard: buttons
    };
}
