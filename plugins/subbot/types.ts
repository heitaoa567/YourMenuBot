// plugins/subbot/menus/types.ts

export interface SubButton {
    text: string;          // 按钮文字
    url?: string;          // 可选：打开链接
    callback?: string;     // 可选：调用主系统 callback
    type: "url" | "callback";
}

