// plugins/supply/menu.ts

export function supplyMenu() {
    return {
        inline_keyboard: [
            [{ text: "📝 发布供需", callback_data: "supply.new" }],
            [{ text: "🔍 浏览供需", callback_data: "supply.browse" }],
            [{ text: "📊 我的发布", callback_data: "supply.my" }],
            [{ text: "⬅ 返回", callback_data: "menu.back" }]
        ]
    };
}

