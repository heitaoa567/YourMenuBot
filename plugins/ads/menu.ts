// plugins/ads/menu.ts

export function adsMenu() {
    return {
        inline_keyboard: [
            [{ text: "📢 查看所有广告位", callback_data: "ads.list" }],
            [{ text: "➕ 新增广告", callback_data: "ads.add" }],
            [{ text: "⬅ 返回菜单", callback_data: "menu.back" }]
        ]
    };
}

