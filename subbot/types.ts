// plugins/subbot/types.ts

export interface SubBot {
    id: string;      // uuid
    uid: number;     // 属于哪个用户
    token: string;   // 子机器人 token
    username: string;
    created: number;
    expire: number;  // 到期时间（VIP 控制）
    menus: any[];    // 九宫格菜单
}

