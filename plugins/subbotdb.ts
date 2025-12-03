// =======================================================
// subbotdb.ts
// 🔥 终极数据库：子机器人 + VIP + 钱包 + 广告 + 供需 + 广播 + 系统设置
// =======================================================

import * as fs from "fs";

const DB_FILE = "./subbotdb.json";

// ===============================
// 载入数据库
// ===============================
let DB: any = {
  subbots: {},          // 子机器人
  ads: {},              // 广告系统
  vip: {                // VIP 系统
    default_days: 30,
    price_month: 10,
    auto_renew: false
  },
  wallet: {             // 钱包系统
    min_deposit: 10,
    min_withdraw: 20,
    deposit_fee: 2,
    withdraw_fee: 3
  },
  supply: {             // 供需系统
    auto_check: false,
    max_posts: 10
  },
  settings: {           // 系统设置
    maintenance: false,
    global_notice: "",
    ads_enabled: true,
    default_vip_days: 0
  }
};

// —— 读取本地文件
if (fs.existsSync(DB_FILE)) {
  try {
    DB = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch (e) {
    console.log("❌ subbotdb.json 格式错误，已重置");
  }
}

// —— 保存
function saveDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(DB, null, 2));
}


// =======================================================
// 子机器人系统
// =======================================================
export const SubBotDB = {

  // 获取所有机器人
  getAllBots() {
    return Object.values(DB.subbots);
  },

  // 搜索机器人
  searchBot(keyword: string) {
    keyword = keyword.toLowerCase();
    return Object.values(DB.subbots).filter((b: any) => 
      b.remark?.toLowerCase().includes(keyword) ||
      b.username?.toLowerCase().includes(keyword)
    );
  },

  // 新增子机器人
  createBot(botId: number, data: any) {
    DB.subbots[botId] = { botId, ...data };
    saveDB();
  },

  // 更新子机器人
  updateBot(botId: number, data: any) {
    if (!DB.subbots[botId]) return;
    DB.subbots[botId] = { ...DB.subbots[botId], ...data };
    saveDB();
  },

  // 删除子机器人
  deleteBot(botId: number) {
    delete DB.subbots[botId];
    saveDB();
  },

  // 获取
  getBot(id: number) {
    return DB.subbots[id] || null;
  },


  // =======================================================
  // 广告系统
  // =======================================================
  getAllAds() {
    return Object.entries(DB.ads).map(([slot, ad]) => ({
      slot,
      ...ad
    }));
  },

  getAd(slot: string) {
    return DB.ads[slot] || null;
  },

  createAd(slot: string) {
    DB.ads[slot] = { text: "", enabled: true };
    saveDB();
  },

  updateAd(slot: string, data: any) {
    DB.ads[slot] = { ...DB.ads[slot], ...data };
    saveDB();
  },

  deleteAd(slot: string) {
    delete DB.ads[slot];
    saveDB();
  },


  // =======================================================
  // VIP 系统
  // =======================================================
  getVipSettings() {
    return DB.vip;
  },

  setVipSettings(data: any) {
    DB.vip = { ...DB.vip, ...data };
    saveDB();
  },


  // =======================================================
  // 钱包系统
  // =======================================================
  getWalletSettings() {
    return DB.wallet;
  },

  setWalletSettings(data: any) {
    DB.wallet = { ...DB.wallet, ...data };
    saveDB();
  },


  // =======================================================
  // 供需系统
  // =======================================================
  getSupplySettings() {
    return DB.supply;
  },

  setSupplySettings(data: any) {
    DB.supply = { ...DB.supply, ...data };
    saveDB();
  },


  // =======================================================
  // 系统设置（全局设置）
  // =======================================================
  getSystemSettings() {
    return DB.settings;
  },

  setSystemSetting(key: string, value: any) {
    DB.settings[key] = value;
    saveDB();
  },


  // =======================================================
  // 广播系统（对所有用户）
  // =======================================================
  async broadcastToAllUsers(payload: any) {

    // 🔥 在这里你可以接入真正的广播队列（Redis / RabbitMQ）
    // 目前简单保存本地
    if (!DB.broadcastQueue) DB.broadcastQueue = [];

    DB.broadcastQueue.push({
      time: Date.now(),
      ...payload
    });

    saveDB();

    console.log("📣 广播任务添加成功", payload);

    // 这里不直接发送，让你后台的广播 worker 去处理
    return true;
  }

};
