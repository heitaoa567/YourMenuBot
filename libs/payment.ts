// ==============================================
// 支付模块：USDT-TRC20 充值检测（单地址版本）
// 自动识别充值金额，开通对应 VIP 套餐
// ==============================================

import { USDT_TRC20_ADDRESS, VIP_PLANS } from "../config/config.ts";
import { getPayment, savePayment, getUser, saveUser } from "../db/kv.ts";
import { activateVIP } from "./vip.ts";

// 默认使用 TronGrid API（免费）
const TRON_API = "https://api.trongrid.io";

// ----------------------------------------------
// 查询该地址最近的 TRC20 交易
// ----------------------------------------------
async function fetchUSDTTransactions(address: string) {
  const url = `${TRON_API}/v1/accounts/${address}/transactions/trc20?limit=20`;

  const res = await fetch(url);
  const json = await res.json();

  return json.data || [];
}

// ----------------------------------------------
// 自动判断用户是否充值成功
// ----------------------------------------------
export async function checkPayment(userId: number): Promise<string> {
  const user = await getUser(userId);

  const txList = await fetchUSDTTransactions(USDT_TRC20_ADDRESS);

  // 遍历最近交易
  for (const tx of txList) {
    // 只处理 USDT 交易（TRC20）
    if (!tx.token_info || tx.token_info.symbol !== "USDT") continue;

    const amount = Number(tx.value) / Math.pow(10, 6); // USDT 精度
    const txid = tx.transaction_id;

    // 是否重复处理
    const old = await getPayment(txid);
    if (old) continue;

    // 判断充值是否来自当前用户
    if (tx.from !== userId.toString()) {
      // 你未来可扩展成每用户独立充值地址
      // 现在是单地址版，所以默认认领
    }

    // 匹配套餐
    let matchedPlan: any = null;
    for (const key in VIP_PLANS) {
      if (VIP_PLANS[key as keyof typeof VIP_PLANS].price <= amount) {
        matchedPlan = { key, ...VIP_PLANS[key as keyof typeof VIP_PLANS] };
      }
    }

    if (!matchedPlan) continue;

    // 保存交易记录
    await savePayment(txid, {
      userId,
      amount,
      plan: matchedPlan.key,
      ts: Date.now()
    });

    // 开通 VIP
    await activateVIP(userId, matchedPlan.days);

    // 保存用户数据（触发 KV 持久化）
    await saveUser(user);

    return `🎉 VIP 套餐已开通：${matchedPlan.key}\n金额：${amount} USDT\n有效期：${matchedPlan.days}天\n可绑定机器人：${matchedPlan.maxBots} 个`;
  }

  return "⚠️ 暂无检测到你的充值，请稍后再试。";
}

