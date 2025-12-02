// ======================================
//                 addb.ts
//     广告系统数据库（支持多广告位）
// ======================================

export interface AdItem {
  id: string;           // 广告ID
  slot: string;         // 广告位（如: home, menu, subbot etc）
  title: string;        // 标题
  content: string;      // 文字内容
  image?: string;       // 图片 URL（可选）
  url?: string;         // 跳转链接
  enabled: boolean;     // 是否启用

  views: number;        // 展示次数
  clicks: number;       // 点击次数

  created_at: number;
}

const kv = await Deno.openKv();

// ================================
// 工具：生成广告ID
// ================================
function genAdId() {
  return `ad_${Date.now()}_${Math.floor(Math.random() * 99999)}`;
}

// ================================
// 创建广告
// ================================
export async function createAd(
  slot: string,
  title: string,
  content: string,
  image?: string,
  url?: string
): Promise<AdItem> {
  const ad: AdItem = {
    id: genAdId(),
    slot,
    title,
    content,
    image,
    url,
    enabled: true,

    views: 0,
    clicks: 0,

    created_at: Date.now(),
  };

  await kv.set(["ad", ad.id], ad);
  return ad;
}

// ================================
// 获取广告
// ================================
export async function getAd(id: string): Promise<AdItem | null> {
  const res = await kv.get<AdItem>(["ad", id]);
  return res.value || null;
}

// ================================
// 增加展示次数
// ================================
export async function addAdView(id: string) {
  const ad = await getAd(id);
  if (!ad) return;

  ad.views++;
  await kv.set(["ad", id], ad);
}

// ================================
// 增加点击次数
// ================================
export async function addAdClick(id: string) {
  const ad = await getAd(id);
  if (!ad) return;

  ad.clicks++;
  await kv.set(["ad", id], ad);
}

// ================================
// 更新广告（部分更新）
// ================================
export async function updateAd(id: string, patch: Partial<AdItem>) {
  const ad = await getAd(id);
  if (!ad) return;

  const updated = { ...ad, ...patch };
  await kv.set(["ad", id], updated);
}

// ================================
// 删除广告
// ================================
export async function deleteAd(id: string) {
  await kv.delete(["ad", id]);
}

// ================================
// 列出某个广告位的广告
// ================================
export async function listAds(slot?: string): Promise<AdItem[]> {
  const list: AdItem[] = [];

  for await (const entry of kv.list<AdItem>({ prefix: ["ad"] })) {
    const ad = entry.value;
    if (!ad) continue;

    if (slot && ad.slot !== slot) continue;

    list.push(ad);
  }

  // 排序：启用的 > 创建时间
  return list.sort((a, b) => {
    if (a.enabled !== b.enabled) return a.enabled ? -1 : 1;
    return b.created_at - a.created_at;
  });
}

// ================================
// VIP 自动隐藏广告判断逻辑（供主程序使用）
// ================================
export async function getAdsForUser(slot: string, isVIP: boolean) {
  if (isVIP) return []; // VIP 不显示广告

  const ads = await listAds(slot);
  return ads.filter(a => a.enabled);
}

