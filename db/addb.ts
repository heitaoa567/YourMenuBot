// ======================================================================
//                           db/addb.ts
//         广告系统：支持多广告位 / 开关 / VIP 去广告
// ======================================================================

import { AdsConfig } from "../types.ts";

const FILE = "./db/data/ads.json";

// 全局广告缓存
let ads: AdsConfig = {
  enabled: true,          // 全局广告开关
  supply_ads_enabled: true, // 供需板块广告开关
  banner_top: "",         // 顶部横幅
  banner_bottom: "",      // 底部横幅
  popup: "",              // 弹窗广告
  supply_banner: "",      // 供需广告
};


// ======================================================================
//                          读取广告文件
// ======================================================================
async function loadDB() {
  try {
    const txt = await Deno.readTextFile(FILE);
    ads = JSON.parse(txt);
  } catch {
    console.warn("⚠️ ads.json 不存在，正在创建...");
    await saveDB();
  }
}


// ======================================================================
//                          保存广告文件
// ======================================================================
async function saveDB() {
  await Deno.writeTextFile(FILE, JSON.stringify(ads, null, 2));
}


// ======================================================================
//                       获取广告配置（前台调用）
// ======================================================================
export async function getAds() {
  await loadDB();
  return ads;
}


// ======================================================================
//                    设置某个广告位（后台可用）
// ======================================================================
export async function setAd(key: keyof AdsConfig, value: string | boolean) {
  await loadDB();

  // 防止恶意 key
  if (!(key in ads)) return false;

  // @ts-ignore
  ads[key] = value;

  await saveDB();
  return true;
}


// ======================================================================
//                    批量更新广告位（后台使用）
// ======================================================================
export async function updateAds(newAds: Partial<AdsConfig>) {
  await loadDB();

  ads = {
    ...ads,
    ...newAds,
  };

  await saveDB();
  return true;
}


// ======================================================================
//                     清空某个广告位
// ======================================================================
export async function clearAd(key: keyof AdsConfig) {
  await loadDB();

  if (!(key in ads)) return false;

  // @ts-ignore
  ads[key] = typeof ads[key] === "string" ? "" : false;

  await saveDB();
  return true;
}


// ======================================================================
//        VIP 去广告：用户进入供需时调用，判断是否隐藏广告
// ======================================================================
export async function getAdsForUser(isVIP: boolean) {
  await loadDB();

  if (isVIP) {
    return {
      ...ads,
      enabled: false,
      supply_ads_enabled: false,
      banner_top: "",
      banner_bottom: "",
      popup: "",
      supply_banner: ""
    };
  }

  return ads;
}
