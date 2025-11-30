// plugins/ads/types.ts

export interface AdItem {
    id: string;
    enabled: boolean;
    type: "text" | "image" | "video";
    content: string;
    button?: { text: string; url: string };
    impressions: number;
    clicks: number;
    position: "menu" | "bottom" | "supply" | "ai"; // 广告位
}

