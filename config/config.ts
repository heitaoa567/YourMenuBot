// ========================
// 全局配置中心（支持环境变量）
// ========================

// 主机器人 Token（从环境变量读取）
export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") ?? "";

// OpenAI API Key（从环境变量读取）
export const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";

// 主控机器人部署 URL，用于自动设置子机器人 webhook
export const BASE_URL = Deno.env.get("BASE_URL") ?? "";

// 固定 USDT-TRC20 充值地址（从环境变量读取）
export const USDT_TRC20_ADDRESS = Deno.env.get("USDT_TRC20_ADDRESS") ?? "";

// ChatGPT 相关配置
export const AI_CONFIG = {
  model: "gpt-4o-mini", // ChatGPT 模型，可随时更改
  timeoutFreeUser: 30 * 60, // 普通用户每天 30 分钟（单位：秒）
};

// VIP 套餐配置（你可以随时修改价格/时间/可绑定子机器人数）
export const VIP_PLANS = {
  week: {
    price: 5,            // 5 USDT
    days: 7,             // 7 天
    maxBots: 2           // 可绑定 2 个子机器人
  },
  month: {
    price: 10,           // 10 USDT
    days: 30,
    maxBots: 5
  },
  quarter: {
    price: 25,           // 25 USDT
    days: 90,
    maxBots: 10
  },
  year: {
    price: 80,           // 80 USDT
    days: 365,
    maxBots: 30
  }
};

