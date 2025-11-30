// ========================================
//        VIP 套餐配置 - plans.ts
// ========================================

// VIP 套餐定义（以后直接修改这里即可）
export const VIP_PLANS = [
  {
    id: "week",
    name: "⭐️ 周卡 VIP",
    days: 7,
    price: 5
  },
  {
    id: "month",
    name: "🌙 月卡 VIP",
    days: 30,
    price: 15
  },
  {
    id: "season",
    name: "🍀 季卡 VIP",
    days: 90,
    price: 40
  },
  {
    id: "year",
    name: "🌟 年卡 VIP",
    days: 365,
    price: 100
  },
  {
    id: "life",
    name: "💎 终身 VIP（旗舰）",
    days: 36500,   // 100 年
    price: 199
  }
];

