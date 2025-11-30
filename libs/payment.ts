// ==========================================
//               payment.ts
//       YourMenuBot — USDT 充值系统
// ==========================================

import { getUser, saveUser } from "../db/userdb.ts";
import { extendVIP, getVipDays } from "./vip.ts";

// 使用的充值地址，从环境变量读取
const USDT_ADDRESS = Deno.env.get("USDT_ADDRESS") ||
  "TEJTdBXKK49CuSnoh2GnCgmXr6sbCDXJHh"; // 默认地址

/**
 * 验证 txid 格式是否正确
 * （这里只做基本验证，未来可以扩展链上校验）
 */
export function validateTxid(txid: string): boolean {
  // TRON 链 txid 长度 64 字符（Hex）
  return /^[A-Fa-f0-9]{64}$/.test(txid);
}

/**
 * 处理用户的 USDT 支付
 * 自动开通对应 VIP 套餐
 */
export async function handleUSDT(userId: number): Promise<string> {
  const user = await getUser(userId);

  if (!user.buy_plan) {
    return "⚠️ 你还没有选择 VIP 套餐，请先点击菜单选择。";
  }

  const days = getVipDays(user.buy_plan);
  if (days === 0) {
    return "⚠️ 套餐选择无效，请重新选择。";
  }

  // 自动延期 VIP
  const msg = await extendVIP(userId, days);

  // 清除已购买套餐记录
  user.buy_plan = null;
  await saveUser(userId, user);

  return msg;
}

/**
 * 返回付款地址（供菜单调用）
 */
export function getPayAddress(): string {
  return USDT_ADDRESS;
}
