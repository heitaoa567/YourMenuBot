// plugins/affiliate/menu.ts
export function affiliateMenu(userId: number) {
    const link = `https://t.me/YourMenuBot?start=${userId}`;
    
    return {
        inline_keyboard: [
            [{ text: "📣 复制推广链接", callback_data: "aff.link" }],
            [{ text: "📊 我的推广数据", callback_data: "aff.stats" }],
            [{ text: "🌳 我的下级结构", callback_data: "aff.tree" }],
            [{ text: "⬅ 返回", callback_data: "menu.back" }]
        ],
        link
    };
}

