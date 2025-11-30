// plugins/supply/types.ts

export interface SupplyItem {
    id: string;
    uid: number;
    type: "supply" | "demand";
    title: string;
    content: string;
    created: number;
    views: number;
    category: string;
    contact: string;
    ref_link: string; // 推广链接
    vip_boost: boolean;
}

