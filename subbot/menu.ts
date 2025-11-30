// plugins/subbot/menu.ts

export function subMenu() {
    return {
        inline_keyboard: [
            [{ text: "➕ 绑定子机器人", callback_data: "sub.bind" }],
            [{ text: "🤖 我的子机器人", callback_data: "sub.list" }],
            [{ text: "📢 子机器人广播", callback_data: "sub.broadcast" }],
            [{ text: "🧩 九宫格菜单管理", callback_data: "sub.menus" }],
            [{ text: "⬅ 返回", callback_data: "menu.back" }]
        ]
    };
}

